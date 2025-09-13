-- Core tables (see schema.sql for full comments)
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

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

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

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text check (type in ('purchase','refund','bonus','deduction','reading')),
  amount numeric(12,2),
  delta_credits integer not null default 0,
  reason text not null default '',
  description text,
  ref_type text,
  ref_id text,
  idempotency_key text,
  created_at timestamptz not null default now()
);

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

create table if not exists public.pricing_tiers (
  id text primary key,
  name text not null,
  type text not null,
  description text,
  price numeric(10,2) not null,
  currency text not null,
  billing_interval text not null,
  features jsonb,
  limits jsonb,
  is_popular boolean,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create table if not exists public.user_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subscription_id uuid references public.user_subscriptions(id) on delete set null,
  provider text not null,
  provider_transaction_id text not null,
  type text not null,
  status text not null,
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

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text not null,
  received_at timestamptz not null default now(),
  payload jsonb,
  unique (provider, event_id)
);

