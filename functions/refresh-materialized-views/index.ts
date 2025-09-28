// Supabase Edge Function: refresh-materialized-views
// Purpose: scheduled job to refresh heavy MVs (templates below)
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

async function getClient() {
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const { createClient } = await import(
    'https://esm.sh/@supabase/supabase-js@2'
  );
  return createClient(url, key);
}

serve(async () => {
  const supabase = await getClient();
  // Execute SQL to refresh; keep short runtime
  const sql = `
    -- Example: REFRESH MATERIALIZED VIEW CONCURRENTLY public.mv_daily_revenue;
    -- Example: REFRESH MATERIALIZED VIEW CONCURRENTLY public.mv_user_reading_stats;
    select now() as refreshed_at;
  `;
  const { data, error } = await supabase
    .rpc('exec_sql', { p_sql: sql })
    .single();
  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
  return new Response(JSON.stringify({ success: true, data }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
