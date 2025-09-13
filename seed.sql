-- Minimal seed data (safe)
-- Note: Replace UUIDs with real user ids in local/dev if desired

-- Packages
insert into public.packages (name, description, credits, price_eur, price_try, active)
values
  ('Başlangıç Paketi', 'Temel okumalar için ideal', 100, 2.99, 29.99, true),
  ('Popüler Paket', 'En çok tercih edilen paket', 300, 6.99, 79.99, true),
  ('Premium Paket', 'Sınırsız okuma deneyimi', 500, 9.99, 119.99, true)
on conflict do nothing;

-- Pricing tiers
insert into public.pricing_tiers (id, name, type, description, price, currency, billing_interval, features, limits, is_popular, is_active)
values
  ('free', 'Free', 'free', 'Basic tarot readings', 0, 'USD', 'month',
    '["3 tarot readings per month","Basic card interpretations","Community support"]'::jsonb,
    '{"tarot_readings_per_month":3,"premium_features":false,"priority_support":false,"analytics_access":false}'::jsonb,
    false, true),
  ('premium', 'Premium', 'premium', 'Enhanced tarot experience', 9.99, 'USD', 'month',
    '["Unlimited tarot readings","Advanced interpretations","Love tarot spreads","Priority support","Reading history"]'::jsonb,
    '{"tarot_readings_per_month":-1,"premium_features":true,"priority_support":true,"analytics_access":false}'::jsonb,
    true, true),
  ('pro', 'Pro', 'pro', 'Professional tarot guidance', 19.99, 'USD', 'month',
    '["Everything in Premium","Personal tarot advisor","Custom spreads","Analytics dashboard","Export readings","API access"]'::jsonb,
    '{"tarot_readings_per_month":-1,"premium_features":true,"priority_support":true,"analytics_access":true}'::jsonb,
    false, true)
on conflict do nothing;

-- Spreads
insert into public.spreads (name_tr, name_en, name_sr, positions, cost_credits, category, difficulty_level, active)
values
  ('Geçmiş-Şimdi-Gelecek', 'Past-Present-Future', 'Prošlost-Sadašnjost-Budućnost',
   '[{"id":1,"x":33,"y":50},{"id":2,"x":50,"y":50},{"id":3,"x":67,"y":50}]'::jsonb,
   2, 'general', 'beginner', true)
on conflict do nothing;

