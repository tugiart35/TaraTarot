/*
 * SHOPIER WEBHOOK HANDLER - EDGE FUNCTION
 * 
 * Bu fonksiyon Shopier ödeme webhook'larını işler.
 * Güvenli, idempotent ve production-ready.
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SHOPIER_SECRET_KEY = Deno.env.get("SHOPIER_SECRET_KEY")!;

// Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Shopier webhook payload interface
interface ShopierWebhookPayload {
  orderId: string;
  status: string;
  amount: number;
  currency: string;
  hash: string;
  [key: string]: any;
}

// Credit package mapping
const CREDIT_PACKAGES = {
  'starter': { credits: 100, bonus: 0 },
  'popular': { credits: 300, bonus: 30 },
  'premium': { credits: 500, bonus: 100 }
} as const;

/**
 * Verify Shopier webhook signature
 */
function verifyShopierSignature(payload: ShopierWebhookPayload): boolean {
  try {
    // Extract hash from payload
    const receivedHash = payload.hash;
    delete payload.hash;
    
    // Create signature string
    const signatureData = Object.keys(payload)
      .sort()
      .map(key => `${key}=${payload[key]}`)
      .join('&');
    
    // Generate expected hash
    const expectedHash = btoa(signatureData + SHOPIER_SECRET_KEY);
    
    return receivedHash === expectedHash;
  } catch (error) {
    return false;
  }
}

/**
 * Extract user ID from order ID
 */
function extractUserIdFromOrderId(orderId: string): string | null {
  try {
    // Order ID format: user_{userId}_package_{packageType}_{timestamp}
    const parts = orderId.split('_');
    if (parts.length >= 2 && parts[0] === 'user') {
      return parts[1];
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Process successful payment
 */
async function processPayment(
  userId: string,
  packageType: string,
  amount: number,
  orderId: string
): Promise<boolean> {
  try {
    // Get package details
    const packageDetails = CREDIT_PACKAGES[packageType as keyof typeof CREDIT_PACKAGES];
    if (!packageDetails) {
      console.error(`Unknown package type: ${packageType}`);
      return false;
    }
    
    // Calculate total credits (base + bonus)
    const totalCredits = packageDetails.credits + packageDetails.bonus;
    
    // Get current user balance
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credit_balance')
      .eq('user_id', userId)
      .single();
    
    if (profileError || !profile) {
      console.error('Error fetching user profile:', profileError);
      return false;
    }
    
    const currentBalance = profile.credit_balance;
    const newBalance = currentBalance + totalCredits;
    
    // Update user credit balance
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ credit_balance: newBalance })
      .eq('user_id', userId);
    
    if (updateError) {
      console.error('Error updating credit balance:', updateError);
      return false;
    }
    
    // Create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: 'purchase',
        amount: totalCredits,
        description: `${packageType} paketi satın alma`,
        reference_type: 'package',
        reference_id: packageType,
        balance_before: currentBalance,
        balance_after: newBalance
      });
    
    if (transactionError) {
      console.error('Error creating transaction:', transactionError);
      return false;
    }
    
    // Log audit event
    await supabase.rpc('log_audit_event', {
      p_user_id: userId,
      p_action: 'package_purchased',
      p_resource_type: 'package',
      p_resource_id: packageType,
      p_details: {
        orderId,
        packageType,
        credits: totalCredits,
        amount,
        bonus: packageDetails.bonus
      }
    });
    
    console.log(`Payment processed successfully for user ${userId}: +${totalCredits} credits`);
    return true;
    
  } catch (error) {
    console.error('Error processing payment:', error);
    return false;
  }
}

/**
 * Check if payment already processed (idempotency)
 */
async function isPaymentAlreadyProcessed(orderId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('id')
      .eq('reference_type', 'package')
      .eq('description', `package_purchase_${orderId}`)
      .limit(1);
    
    if (error) {
      console.error('Error checking payment status:', error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Error in idempotency check:', error);
    return false;
  }
}

/**
 * Main handler function
 */
Deno.serve(async (req: Request) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Parse webhook payload
    const payload: ShopierWebhookPayload = await req.json();
    
    // Verify signature
    if (!verifyShopierSignature(payload)) {
      console.error('Invalid webhook signature');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if payment is successful
    if (payload.status !== 'success') {
      console.log(`Payment not successful: ${payload.status}`);
      return new Response(
        JSON.stringify({ message: 'Payment not successful' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check idempotency
    if (await isPaymentAlreadyProcessed(payload.orderId)) {
      console.log(`Payment already processed: ${payload.orderId}`);
      return new Response(
        JSON.stringify({ message: 'Payment already processed' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Extract user ID from order ID
    const userId = extractUserIdFromOrderId(payload.orderId);
    if (!userId) {
      console.error(`Invalid order ID format: ${payload.orderId}`);
      return new Response(
        JSON.stringify({ error: 'Invalid order ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Extract package type from order ID
    const orderParts = payload.orderId.split('_');
    const packageType = orderParts[3]; // user_{userId}_package_{packageType}_{timestamp}
    
    // Process payment
    const success = await processPayment(
      userId,
      packageType,
      payload.amount,
      payload.orderId
    );
    
    if (success) {
      return new Response(
        JSON.stringify({ message: 'Payment processed successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to process payment' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
  } catch (error) {
    console.error('Webhook handler error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
