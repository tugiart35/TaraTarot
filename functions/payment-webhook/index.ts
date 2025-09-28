// Supabase Edge Function: payment-webhook
// Purpose: process provider webhooks securely with idempotency
// Notes: configure route secret in Supabase; restrict to providers’ IPs if possible

// deno-lint-ignore-file no-explicit-any
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

type Json = Record<string, any>;

const PROVIDER = 'shopier'; // adjust per deployment

async function getSupabaseClient(req: Request) {
  // Use service role for Edge Functions
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const { createClient } = await import(
    'https://esm.sh/@supabase/supabase-js@2'
  );
  return createClient(url, key, {
    global: {
      headers: { Authorization: req.headers.get('Authorization') || '' },
    },
  });
}

function badRequest(message: string, status = 400) {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function ok(body: Json = {}) {
  return new Response(JSON.stringify({ success: true, ...body }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

serve(async req => {
  if (req.method !== 'POST') {
    return badRequest('Method not allowed', 405);
  }

  const signature = req.headers.get('x-webhook-signature') || '';
  const secret = Deno.env.get('WEBHOOK_SECRET') || '';
  const raw = await req.text();

  // Simple HMAC validation (replace with provider algorithm)
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const digest = await crypto.subtle.sign('HMAC', key, encoder.encode(raw));
  const expected = Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  if (expected !== signature) {
    return badRequest('Invalid signature', 401);
  }

  let payload: Json;
  try {
    payload = JSON.parse(raw);
  } catch {
    return badRequest('Invalid JSON');
  }

  const eventId = String(
    payload.transactionId || payload.id || payload.event_id || ''
  );
  if (!eventId) {
    return badRequest('Missing event id');
  }

  const supabase = await getSupabaseClient(req);

  // Idempotency via webhook_events
  const { data: existing } = await supabase
    .from('webhook_events')
    .select('id')
    .eq('provider', PROVIDER)
    .eq('event_id', eventId)
    .maybeSingle();

  if (existing) {
    return ok({ idempotent: true });
  }

  // Insert event
  const { error: evErr } = await supabase
    .from('webhook_events')
    .insert({ provider: PROVIDER, event_id: eventId, payload });
  if (evErr) {
    return badRequest('Event insert failed: ' + evErr.message);
  }

  // Map payload -> insert into user_transactions / update subscriptions
  try {
    const userId = String(payload.userId);
    const amount = Number(payload.amount);
    const currency = String(payload.currency || 'TRY');
    const status = String(payload.status || 'succeeded');
    const providerTransactionId = String(payload.transactionId);
    const description = String(payload.description || 'Payment');
    const subscriptionId = null;

    if (!userId || !providerTransactionId || !Number.isFinite(amount)) {
      return badRequest('Missing required fields');
    }

    const { error: txErr } = await supabase.from('user_transactions').insert({
      user_id: userId,
      subscription_id: subscriptionId,
      provider: PROVIDER,
      provider_transaction_id: providerTransactionId,
      type: 'one_time',
      status,
      amount,
      currency,
      description,
      metadata: payload,
    });
    if (txErr) {
      return badRequest('user_transactions insert failed: ' + txErr.message);
    }

    // Credit the user in the ledger (transactions) and profile balance
    const { error: awardErr } = await supabase.rpc('fn_award_bonus_credits', {
      p_user_id: userId,
      p_delta: Number(payload.credits || 0),
      p_reason: description,
      p_ref_type: 'shopier_payment',
      p_ref_id: providerTransactionId,
    });
    if (awardErr) {
      return badRequest('Credit award failed: ' + awardErr.message);
    }

    return ok({ recorded: true });
  } catch (e: any) {
    return badRequest('Processing failed: ' + (e?.message || 'Unknown'));
  }
});
