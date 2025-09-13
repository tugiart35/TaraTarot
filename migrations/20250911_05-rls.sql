-- Enable RLS and add policies (see policies.sql for full set)

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

-- Minimal owner policies to prevent lock-outs (detailed in policies.sql)
create policy if not exists profiles_select_self on public.profiles for select using (auth.uid() = id);
create policy if not exists profiles_insert_self on public.profiles for insert with check (auth.uid() = id);
create policy if not exists profiles_update_self on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy if not exists readings_owner_all on public.readings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy if not exists transactions_owner_select on public.transactions for select using (auth.uid() = user_id);
create policy if not exists transactions_owner_insert on public.transactions for insert with check (auth.uid() = user_id);

