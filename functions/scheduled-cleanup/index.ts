/*
 * SCHEDULED CLEANUP - EDGE FUNCTION
 *
 * Bu fonksiyon günlük temizlik işlemlerini yapar:
 * - Eski audit logları temizler
 * - Materialized view'ları yeniler
 * - Geçici verileri temizler
 */

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

// Environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * Clean old audit logs (keep last 90 days)
 */
async function cleanOldAuditLogs(): Promise<number> {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90);

    const { data, error } = await supabase
      .from('audit_logs')
      .delete()
      .lt('created_at', cutoffDate.toISOString())
      .select('id');

    if (error) {
      console.error('Error cleaning audit logs:', error);
      return 0;
    }

    const deletedCount = data?.length || 0;
    console.log(`Cleaned ${deletedCount} old audit logs`);
    return deletedCount;
  } catch (error) {
    console.error('Error in cleanOldAuditLogs:', error);
    return 0;
  }
}

/**
 * Refresh materialized views
 */
async function refreshMaterializedViews(): Promise<boolean> {
  try {
    // Refresh user stats
    const { error: userStatsError } = await supabase.rpc('refresh_user_stats');

    if (userStatsError) {
      console.error('Error refreshing user stats:', userStatsError);
      return false;
    }

    // Refresh reading stats
    const { error: readingStatsError } = await supabase.rpc(
      'refresh_reading_stats'
    );

    if (readingStatsError) {
      console.error('Error refreshing reading stats:', readingStatsError);
      return false;
    }

    // Refresh daily transaction stats
    const { error: transactionStatsError } = await supabase.rpc(
      'refresh_daily_transaction_stats'
    );

    if (transactionStatsError) {
      console.error(
        'Error refreshing transaction stats:',
        transactionStatsError
      );
      return false;
    }

    console.log('All materialized views refreshed successfully');
    return true;
  } catch (error) {
    console.error('Error refreshing materialized views:', error);
    return false;
  }
}

/**
 * Clean failed readings older than 7 days
 */
async function cleanFailedReadings(): Promise<number> {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);

    const { data, error } = await supabase
      .from('readings')
      .delete()
      .eq('status', 'failed')
      .lt('created_at', cutoffDate.toISOString())
      .select('id');

    if (error) {
      console.error('Error cleaning failed readings:', error);
      return 0;
    }

    const deletedCount = data?.length || 0;
    console.log(`Cleaned ${deletedCount} failed readings`);
    return deletedCount;
  } catch (error) {
    console.error('Error in cleanFailedReadings:', error);
    return 0;
  }
}

/**
 * Clean old admin notes for deleted readings
 */
async function cleanOrphanedAdminNotes(): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('admin_notes')
      .delete()
      .not('reading_id', 'in', supabase.from('readings').select('id'))
      .select('id');

    if (error) {
      console.error('Error cleaning orphaned admin notes:', error);
      return 0;
    }

    const deletedCount = data?.length || 0;
    console.log(`Cleaned ${deletedCount} orphaned admin notes`);
    return deletedCount;
  } catch (error) {
    console.error('Error in cleanOrphanedAdminNotes:', error);
    return 0;
  }
}

/**
 * Update user login statistics
 */
async function updateUserLoginStats(): Promise<boolean> {
  try {
    // Update last login for users who haven't logged in for a while
    const { error } = await supabase.rpc('update_user_login_stats');

    if (error) {
      console.error('Error updating user login stats:', error);
      return false;
    }

    console.log('User login statistics updated');
    return true;
  } catch (error) {
    console.error('Error in updateUserLoginStats:', error);
    return false;
  }
}

/**
 * Log cleanup results
 */
async function logCleanupResults(results: {
  auditLogsDeleted: number;
  failedReadingsDeleted: number;
  orphanedNotesDeleted: number;
  viewsRefreshed: boolean;
  loginStatsUpdated: boolean;
}): Promise<void> {
  try {
    await supabase.rpc('log_audit_event', {
      p_user_id: null,
      p_action: 'scheduled_cleanup_completed',
      p_resource_type: 'system',
      p_details: results,
    });
  } catch (error) {
    console.error('Error logging cleanup results:', error);
  }
}

/**
 * Main cleanup function
 */
async function performCleanup(): Promise<{
  success: boolean;
  results: any;
}> {
  const results = {
    auditLogsDeleted: 0,
    failedReadingsDeleted: 0,
    orphanedNotesDeleted: 0,
    viewsRefreshed: false,
    loginStatsUpdated: false,
  };

  try {
    // Clean old audit logs
    results.auditLogsDeleted = await cleanOldAuditLogs();

    // Clean failed readings
    results.failedReadingsDeleted = await cleanFailedReadings();

    // Clean orphaned admin notes
    results.orphanedNotesDeleted = await cleanOrphanedAdminNotes();

    // Refresh materialized views
    results.viewsRefreshed = await refreshMaterializedViews();

    // Update login statistics
    results.loginStatsUpdated = await updateUserLoginStats();

    // Log results
    await logCleanupResults(results);

    console.log('Cleanup completed successfully:', results);
    return { success: true, results };
  } catch (error) {
    console.error('Cleanup failed:', error);
    return { success: false, results };
  }
}

/**
 * Main handler function
 */
Deno.serve(async (req: Request) => {
  try {
    // Only allow POST requests (for scheduled triggers)
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify request is from Supabase (optional security check)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Perform cleanup
    const { success, results } = await performCleanup();

    if (success) {
      return new Response(
        JSON.stringify({
          message: 'Cleanup completed successfully',
          results,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: 'Cleanup failed',
          results,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Cleanup handler error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
