-- Row-Level Security (RLS) policies
-- Note: Supabase service role bypasses RLS; client roles `anon` and `authenticated` are enforced.

-- Helper notes
-- auth.uid() returns current user id (uuid) for authenticated role
-- auth.role() returns token role: 'anon' | 'authenticated' | 'service_role'

-- PROFILES
alter table public.profiles enable row level security;

-- Read own profile
create policy if not exists profiles_select_self
on public.profiles for select
using (auth.uid() = id);

-- Insert own profile (upsert on sign-up)
create policy if not exists profiles_insert_self
on public.profiles for insert
with check (auth.uid() = id);

-- Update own profile
create policy if not exists profiles_update_self
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- Admins can read all profiles
create policy if not exists profiles_admin_read
on public.profiles for select
using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- ADMINS
alter table public.admins enable row level security;
-- Only admins can see admins
create policy if not exists admins_read_self
on public.admins for select
using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- READINGS
alter table public.readings enable row level security;

-- Owner can CRUD own readings
create policy if not exists readings_owner_all
on public.readings for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- TRANSACTIONS (credits ledger)
alter table public.transactions enable row level security;

-- Owner can read own transactions
create policy if not exists transactions_owner_select
on public.transactions for select
using (auth.uid() = user_id);

-- Owner can insert own negative usage (reading usage) and see positive from purchases
create policy if not exists transactions_owner_insert
on public.transactions for insert
with check (auth.uid() = user_id);

-- PACKAGES (public product catalog)
alter table public.packages enable row level security;

-- Anyone authenticated can read packages
create policy if not exists packages_read_auth
on public.packages for select
to authenticated
using (true);

-- Admins manage packages
create policy if not exists packages_admin_write
on public.packages for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- SPREADS (public-safe read of active spreads)
alter table public.spreads enable row level security;

-- Authenticated read spreads
create policy if not exists spreads_read_auth
on public.spreads for select
to authenticated
using (active = true);

-- Public read for active spreads
create policy if not exists spreads_read_anon
on public.spreads for select
to anon
using (active = true);

-- Admin manage spreads
create policy if not exists spreads_admin_write
on public.spreads for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- AUDIT LOGS (admin only)
alter table public.audit_logs enable row level security;

create policy if not exists audit_logs_admin_all
on public.audit_logs for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- PRICING
alter table public.pricing_tiers enable row level security;

create policy if not exists pricing_tiers_public_read
on public.pricing_tiers for select
to anon, authenticated
using (is_active = true);

create policy if not exists pricing_tiers_admin_write
on public.pricing_tiers for all
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- SUBSCRIPTIONS
alter table public.user_subscriptions enable row level security;

create policy if not exists user_subscriptions_owner_read
on public.user_subscriptions for select
using (auth.uid() = user_id);

-- Allow inserts/updates by owner (or service role bypasses RLS)
create policy if not exists user_subscriptions_owner_write
on public.user_subscriptions for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- PAYMENT METHODS
alter table public.user_payment_methods enable row level security;

create policy if not exists user_payment_methods_owner_all
on public.user_payment_methods for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- PROVIDER TRANSACTIONS (monetary)
alter table public.user_transactions enable row level security;

create policy if not exists user_transactions_owner_read
on public.user_transactions for select
using (auth.uid() = user_id);

-- Allow owner insert (edge creates) and updates for status
create policy if not exists user_transactions_owner_write
on public.user_transactions for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Admin can read all financial data
create policy if not exists finance_admin_read
on public.user_transactions for select
using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

