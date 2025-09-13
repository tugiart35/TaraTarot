-- Hot-path indexes

-- profiles
create unique index if not exists profiles_username_unique on public.profiles(username) where username is not null;
create index if not exists profiles_created_at_idx on public.profiles(created_at);
create index if not exists profiles_last_sign_in_at_idx on public.profiles(last_sign_in_at);

-- readings
create index if not exists readings_user_created_idx on public.readings(user_id, created_at desc);
create index if not exists readings_type_idx on public.readings(reading_type);
create index if not exists readings_status_idx on public.readings(status);

-- transactions
create index if not exists transactions_user_created_idx on public.transactions(user_id, created_at desc);
create index if not exists transactions_type_idx on public.transactions(type);
create index if not exists transactions_ref_idx on public.transactions(ref_type, ref_id);
create unique index if not exists transactions_idemp_unique on public.transactions(idempotency_key) where idempotency_key is not null;
-- Optional trigram index; enable when needed:
-- create index if not exists transactions_reason_trgm on public.transactions using gin (reason gin_trgm_ops);

-- packages
create index if not exists packages_active_idx on public.packages(active);
create index if not exists packages_created_at_idx on public.packages(created_at desc);

-- spreads
create index if not exists spreads_active_idx on public.spreads(active);
create index if not exists spreads_category_idx on public.spreads(category);

-- audit_logs
create index if not exists audit_logs_time_idx on public.audit_logs(timestamp desc);
create index if not exists audit_logs_user_idx on public.audit_logs(user_id);
create index if not exists audit_logs_action_idx on public.audit_logs(action);

-- subscriptions/payments
create index if not exists pricing_tiers_active_idx on public.pricing_tiers(is_active);
create index if not exists user_subscriptions_user_idx on public.user_subscriptions(user_id);
create index if not exists user_subscriptions_status_idx on public.user_subscriptions(status);
create index if not exists user_payment_methods_user_idx on public.user_payment_methods(user_id);
create index if not exists user_transactions_user_created_idx on public.user_transactions(user_id, created_at desc);

