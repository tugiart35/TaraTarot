-- DB Smoke Test for the Tarot/Numerology schema
-- 1) Paste into Supabase SQL Editor.
-- 2) Replace YOUR_USER_UUID below with a real auth user id.

-- Ensure your profile exists
insert into public.profiles (id, email, display_name)
select 'YOUR_USER_UUID'::uuid, 'test@example.com', 'Test User'
where not exists (
  select 1 from public.profiles where id = 'YOUR_USER_UUID'::uuid
);

-- Give starting credits
update public.profiles
   set credit_balance = 100
 where id = 'YOUR_USER_UUID'::uuid;

-- Award a small bonus via RPC (also writes a transaction row)
select public.fn_award_bonus_credits('YOUR_USER_UUID'::uuid, 5, 'smoke_bonus', 'bonus_test', 'smoke1');

-- Create a reading atomically via RPC (deducts 2 credits)
select (public.fn_create_reading_with_debit(
  p_user_id => 'YOUR_USER_UUID'::uuid,
  p_reading_type => 'love',
  p_spread_name => 'Aşk Yayılımı',
  p_title => 'Smoke Test Reading',
  p_interpretation => 'Short interpretation',
  p_cards => '[]'::jsonb,
  p_questions => '{"personalInfo":{"name":"A","surname":"B","birthDate":"2000-01-01","email":"x@y"},"userQuestions":{"concern":"c","understanding":"u","emotional":"e"}}'::jsonb,
  p_cost_credits => 2,
  p_metadata => '{"platform":"sql"}'::jsonb,
  p_idempotency_key => 'reading_YOUR_USER_UUID_smoke1'
)).id as reading_id;

-- Verify balance decreased by 2 (from 105 -> 103)
select id, credit_balance from public.profiles where id = 'YOUR_USER_UUID'::uuid;

-- Verify transaction rows (one bonus + one deduction)
select type, delta_credits, reason, created_at
from public.transactions
where user_id = 'YOUR_USER_UUID'::uuid
order by created_at desc
limit 5;

-- Verify reading exists
select id, user_id, reading_type, cost_credits, created_at
from public.readings
where user_id = 'YOUR_USER_UUID'::uuid
order by created_at desc
limit 5;

