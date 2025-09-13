-- Supabase PostgreSQL schema for Tarot/Numerology app
-- Focus: lean, indexed for hot paths, RLS-first, RPC for atomic ops

-- Extensions
create extension if not exists pgcrypto;        -- gen_random_uuid()
create extension if not exists pg_trgm;         -- trigram indexes for ilike

-- Types
do $$ begin
  if not exists (select 1 from pg_type where typname = 'reading_type_enum') then
    create type reading_type_enum as enum ('tarot','numerology','love','career','general');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'reading_status_enum') then
    create type reading_status_enum as enum ('pending','reviewed','completed','failed');
  end if;
end $$;

-- Tables

-- profiles: one row per auth user
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text not null default 'Kullanıcı',
  full_name text,
  first_name text,
  last_name text,
  username text,
  avatar_url text,
  credit_balance integer not null default 0,
  timezone text,
  last_sign_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure username uniqueness when provided
create unique index if not exists profiles_username_unique on public.profiles(username) where username is not null;
create index if not exists profiles_created_at_idx on public.profiles(created_at);
create index if not exists profiles_last_sign_in_at_idx on public.profiles(last_sign_in_at);

-- admins: optional admin marking for RLS/admin UIs
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- readings: user’s saved readings
create table if not exists public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  reading_type reading_type_enum not null,
  spread_name text,
  title text,
  interpretation text not null,
  cards jsonb,
  questions jsonb,
  cost_credits integer not null default 0,
  status reading_status_enum not null default 'pending',
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists readings_user_created_idx on public.readings(user_id, created_at desc);
create index if not exists readings_type_idx on public.readings(reading_type);
create index if not exists readings_status_idx on public.readings(status);

-- Back-compat view for legacy scripts expecting tarot_readings
create or replace view public.tarot_readings as
select
  r.id,
  r.user_id,
  r.reading_type::text as reading_type,
  r.cards,
  r.interpretation,
  r.questions as question,
  null::text as admin_notes,
  r.status::text as status,
  r.created_at,
  r.updated_at,
  r.title,
  left(coalesce(r.interpretation,''), 100) || case when length(coalesce(r.interpretation,'')) > 100 then '…' else '' end as summary,
  r.cost_credits,
  r.spread_name
from public.readings r;

-- transactions: credits ledger (and purchase metadata)
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text check (type in ('purchase','refund','bonus','deduction','reading')),
  amount numeric(12,2), -- monetary amount when applicable
  delta_credits integer not null default 0,
  reason text not null default '',
  description text,
  ref_type text,
  ref_id text,
  idempotency_key text,
  created_at timestamptz not null default now()
);

create index if not exists transactions_user_created_idx on public.transactions(user_id, created_at desc);
create index if not exists transactions_type_idx on public.transactions(type);
create index if not exists transactions_ref_idx on public.transactions(ref_type, ref_id);
create unique index if not exists transactions_idemp_unique on public.transactions(idempotency_key) where idempotency_key is not null;
-- Optional search index, enable only if ilike(reason) becomes hot path
-- create index if not exists transactions_reason_trgm on public.transactions using gin (reason gin_trgm_ops);

-- packages: credit packs (admin-managed)
create table if not exists public.packages (
  id bigserial primary key,
  name text not null,
  description text,
  credits integer not null,
  price_eur numeric(10,2) not null,
  price_try numeric(10,2) not null,
  active boolean not null default true,
  shopier_product_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists packages_active_idx on public.packages(active);
create index if not exists packages_created_at_idx on public.packages(created_at desc);

-- spreads: tarot layout configurations
create table if not exists public.spreads (
  id bigserial primary key,
  name_tr text not null,
  name_en text not null,
  name_sr text not null,
  description_tr text,
  description_en text,
  description_sr text,
  positions jsonb not null default '[]'::jsonb,
  card_count integer generated always as (jsonb_array_length(positions)) stored,
  cost_credits integer not null default 0,
  category text check (category in ('general','love','career','spiritual','health')),
  difficulty_level text check (difficulty_level in ('beginner','intermediate','advanced')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists spreads_active_idx on public.spreads(active);
create index if not exists spreads_category_idx on public.spreads(category);

-- Public-safe view for spreads
create or replace view public.spreads_public as
select id, name_tr, name_en, name_sr, positions, card_count, cost_credits, category, difficulty_level, active
from public.spreads
where active = true;

-- audit_logs: admin-only security/compliance logs (written client/edge)
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  user_email text,
  action text not null,
  resource_type text not null,
  resource_id text,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  user_agent text,
  metadata jsonb,
  timestamp timestamptz not null default now(),
  severity text not null check (severity in ('low','medium','high','critical')),
  status text not null check (status in ('success','failure','pending'))
);

create index if not exists audit_logs_time_idx on public.audit_logs(timestamp desc);
create index if not exists audit_logs_user_idx on public.audit_logs(user_id);
create index if not exists audit_logs_action_idx on public.audit_logs(action);

-- Payment-related tables matching usePayment hook
create table if not exists public.pricing_tiers (
  id text primary key,
  name text not null,
  type text not null, -- matches SubscriptionType in code
  description text,
  price numeric(10,2) not null,
  currency text not null,
  billing_interval text not null, -- day/week/month/year
  features jsonb,
  limits jsonb,
  is_popular boolean,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pricing_tiers_active_idx on public.pricing_tiers(is_active);

create table if not exists public.user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null,
  provider_subscription_id text not null,
  type text not null,
  status text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  trial_start timestamptz,
  trial_end timestamptz,
  billing_interval text not null,
  amount numeric(10,2) not null,
  currency text not null,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider_subscription_id)
);

create index if not exists user_subscriptions_user_idx on public.user_subscriptions(user_id);
create index if not exists user_subscriptions_status_idx on public.user_subscriptions(status);

create table if not exists public.user_payment_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null,
  provider_payment_method_id text not null,
  type text not null,
  is_default boolean not null default false,
  card_last_four text,
  card_brand text,
  card_exp_month int,
  card_exp_year int,
  billing_details jsonb,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, provider_payment_method_id)
);

create index if not exists user_payment_methods_user_idx on public.user_payment_methods(user_id);

create table if not exists public.user_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subscription_id uuid references public.user_subscriptions(id) on delete set null,
  provider text not null,
  provider_transaction_id text not null,
  type text not null, -- subscription | one_time | setup
  status text not null, -- succeeded | failed | refunded |
  amount numeric(12,2) not null,
  currency text not null,
  description text,
  metadata jsonb,
  failure_reason text,
  receipt_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider_transaction_id)
);

create index if not exists user_transactions_user_created_idx on public.user_transactions(user_id, created_at desc);

-- Optional: webhook events registry to ensure idempotency
create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text not null,
  received_at timestamptz not null default now(),
  payload jsonb,
  unique (provider, event_id)
);

-- Triggers for updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'trg_profiles_updated_at') then
    create trigger trg_profiles_updated_at before update on public.profiles
    for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_readings_updated_at') then
    create trigger trg_readings_updated_at before update on public.readings
    for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_packages_updated_at') then
    create trigger trg_packages_updated_at before update on public.packages
    for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_spreads_updated_at') then
    create trigger trg_spreads_updated_at before update on public.spreads
    for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_pricing_tiers_updated_at') then
    create trigger trg_pricing_tiers_updated_at before update on public.pricing_tiers
    for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_user_subscriptions_updated_at') then
    create trigger trg_user_subscriptions_updated_at before update on public.user_subscriptions
    for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_user_payment_methods_updated_at') then
    create trigger trg_user_payment_methods_updated_at before update on public.user_payment_methods
    for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'trg_user_transactions_updated_at') then
    create trigger trg_user_transactions_updated_at before update on public.user_transactions
    for each row execute function public.set_updated_at();
  end if;
end $$;

-- RPC: Atomic reading creation with credit debit and transaction log
create or replace function public.fn_create_reading_with_debit(
  p_user_id uuid,
  p_reading_type reading_type_enum,
  p_spread_name text,
  p_title text,
  p_interpretation text,
  p_cards jsonb,
  p_questions jsonb,
  p_cost_credits integer,
  p_metadata jsonb default '{}'::jsonb,
  p_idempotency_key text default null
)
returns public.readings
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance integer;
  v_reading public.readings;
begin
  -- Optional idempotency: ensure not previously processed
  if p_idempotency_key is not null then
    if exists (select 1 from public.transactions t where t.user_id = p_user_id and t.idempotency_key = p_idempotency_key) then
      -- return most recent matching reading (best-effort)
      select r.* into v_reading from public.readings r
      where r.user_id = p_user_id
      order by created_at desc
      limit 1;
      return v_reading;
    end if;
  end if;

  -- Lock profile row for update to avoid race
  select credit_balance into v_balance from public.profiles where id = p_user_id for update;
  if v_balance is null then
    raise exception 'profile not found';
  end if;
  if coalesce(p_cost_credits,0) > v_balance then
    raise exception 'insufficient_credits';
  end if;

  -- Deduct credits
  update public.profiles
     set credit_balance = v_balance - coalesce(p_cost_credits,0)
   where id = p_user_id;

  -- Log transaction (credits ledger)
  insert into public.transactions (
    user_id, type, amount, delta_credits, reason, ref_type, ref_id, idempotency_key
  ) values (
    p_user_id, 'reading', null, -coalesce(p_cost_credits,0), 'Tarot okuması', 'reading_usage', null, p_idempotency_key
  );

  -- Create reading
  insert into public.readings (
    user_id, reading_type, spread_name, title, interpretation, cards, questions, cost_credits, status, metadata
  ) values (
    p_user_id, p_reading_type, p_spread_name, p_title, p_interpretation, p_cards, p_questions, coalesce(p_cost_credits,0), 'completed', p_metadata
  ) returning * into v_reading;

  return v_reading;
end $$;

comment on function public.fn_create_reading_with_debit is 'Atomically deduct credits, log transaction, and insert reading. Use p_idempotency_key to avoid duplicates.';

-- Bonus credit award helper (e.g., email confirmation)
create or replace function public.fn_award_bonus_credits(
  p_user_id uuid,
  p_delta integer,
  p_reason text,
  p_ref_type text default null,
  p_ref_id text default null
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_balance integer; begin
  select credit_balance into v_balance from public.profiles where id = p_user_id for update;
  if v_balance is null then raise exception 'profile not found'; end if;
  update public.profiles set credit_balance = v_balance + coalesce(p_delta,0) where id = p_user_id;
  insert into public.transactions(user_id, type, amount, delta_credits, reason, ref_type, ref_id)
  values (p_user_id, case when p_delta >= 0 then 'bonus' else 'deduction' end, null, p_delta, p_reason, p_ref_type, p_ref_id);
end $$;

-- Enable RLS (policies in policies.sql)
alter table public.profiles enable row level security;
alter table public.readings enable row level security;
alter table public.transactions enable row level security;
alter table public.packages enable row level security;
alter table public.spreads enable row level security;
alter table public.audit_logs enable row level security;
alter table public.pricing_tiers enable row level security;
alter table public.user_subscriptions enable row level security;
alter table public.user_payment_methods enable row level security;
alter table public.user_transactions enable row level security;
alter table public.admins enable row level security;

-- Notes:
-- - Views `tarot_readings` and `spreads_public` inherit base table RLS behavior. We will add explicit policies in policies.sql for public view access where safe.

