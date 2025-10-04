#!/usr/bin/env node
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const {
  SHOPIER_LOCAL_URL = 'http://localhost:3003/api/shopier/callback',
  SHOPIER_SECRET,
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  TEST_MERCHANT_ORDER_ID = `local-test-${Date.now()}`,
  USER_ID,
  AMOUNT = '5.00',
  EXPECTED_TABLE = 'shopier_payments',
  EXPECTED_COLUMN = 'merchant_order_id',
  POLL_TIMEOUT = 15,
  POLL_INTERVAL = 2000,
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_KEY are required as env vars.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, { auth: { persistSession: false } });

function sign(bodyStr, secret) {
  if (!secret) return null;
  return crypto.createHmac('sha256', secret).update(bodyStr).digest('hex');
}

async function postWebhook(payload) {
  const body = JSON.stringify(payload);
  const headers = { 'Content-Type': 'application/json' };
  if (SHOPIER_SECRET) headers['x-shopier-signature'] = sign(body, SHOPIER_SECRET);
  console.log('POSTing to', SHOPIER_LOCAL_URL);
  const res = await fetch(SHOPIER_LOCAL_URL, { method: 'POST', headers, body });
  const text = await res.text();
  return { ok: res.ok, status: res.status, body: text };
}

async function pollRecord(column, value, timeoutSec = POLL_TIMEOUT, intervalMs = POLL_INTERVAL) {
  const deadline = Date.now() + timeoutSec * 1000;
  while (Date.now() < deadline) {
    const { data, error } = await supabase.from(EXPECTED_TABLE).select('*').eq(column, value).limit(1);
    if (error) {
      console.warn('Supabase query error:', error.message || error);
    } else if (data && data.length) return { found: true, row: data[0] };
    await new Promise(r => setTimeout(r, intervalMs));
  }
  return { found: false };
}

(async () => {
  const payload = {
    merchant_oid: TEST_MERCHANT_ORDER_ID,
    status: 'success',
    total_amount: AMOUNT,
    buyer_email: 'local-test@example.com',
    buyer_name: 'Local Tester',
    user_id: USER_ID ?? null
  };

  try {
    const postRes = await postWebhook(payload);
    console.log('Webhook POST result:', postRes.status, 'ok:', postRes.ok);
    console.log('Response (first 100 chars):', postRes.body?.slice?.(0,100));

    if (!postRes.ok) {
      console.error('Callback endpoint returned non-2xx -> aborting.');
      process.exit(1);
    }

    console.log(`Polling Supabase for table=${EXPECTED_TABLE} column=${EXPECTED_COLUMN} value=${TEST_MERCHANT_ORDER_ID} ...`);
    const poll = await pollRecord(EXPECTED_COLUMN, TEST_MERCHANT_ORDER_ID);
    if (!poll.found) {
      console.error('FAIL: No DB record found for test payment.');
      process.exit(1);
    }
    console.log('SUCCESS: Found DB record:', poll.row);

    // Optional: check user credits if user_id present
    if (poll.row.user_id || USER_ID) {
      const uid = poll.row.user_id ?? USER_ID;
      const { data: udata, error: uerr } = await supabase.from('users').select('credits').eq('id', uid).limit(1);
      if (uerr) console.warn('User lookup error:', uerr.message || uerr);
      else console.log('User credits:', udata && udata[0] ? udata[0] : 'not found');
    }

    console.log('Email send check: (if you persist mail logs) querying email_logs ...');
    try {
      const { data: mailData } = await supabase.from('email_logs').select('*').eq('merchant_order_id', TEST_MERCHANT_ORDER_ID).limit(1);
      if (mailData && mailData.length) console.log('Email log found:', mailData[0]); else console.log('No email log found (may be normal).');
    } catch (err) {
      console.warn('Email-log check skipped (table may not exist):', err.message || err);
    }

    console.log('--- Local webhook test: SUCCESS ---');
    process.exit(0);
  } catch (err) {
    console.error('Error during local webhook test:', err);
    process.exit(1);
  }
})();