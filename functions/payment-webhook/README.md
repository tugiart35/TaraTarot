Payment Webhook (Edge Function)

Purpose
- Securely accept payment provider webhooks, ensure idempotency, record provider transaction, and credit user balance via RPC.

Auth & Security
- Set env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `WEBHOOK_SECRET`.
- Validate signature per provider docs (replace HMAC example as needed).
- Idempotency: `webhook_events(provider,event_id)` unique; also `user_transactions.provider_transaction_id` unique.

Flow
- Verify signature -> upsert webhook_events -> insert user_transactions -> rpc fn_award_bonus_credits (also writes transactions ledger and updates balance).

Local testing
- curl -X POST -H "x-webhook-signature: <sig>" -d '{"transactionId":"T1","userId":"<uuid>","amount":10,"credits":100,"currency":"TRY","status":"succeeded"}' http://localhost:<port>

