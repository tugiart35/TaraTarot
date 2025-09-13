Refresh Materialized Views (Edge Function)

Purpose
- Simple scheduled function to refresh heavy MVs with CONCURRENTLY.

Setup
- Add a Postgres RPC `exec_sql(text)` helper or replace with specific RPCs.
- Schedule via Supabase Dashboard (daily/hourly as needed).

Security
- Uses service role; ensure the function is not publicly exposed.

