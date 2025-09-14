/*
 * Supabase Server Client
 * 
 * Bağlı dosyalar:
 * - src/app/api/analytics/route.ts (API endpoint)
 * - src/lib/supabase/client.ts (client-side client)
 * 
 * Dosya amacı:
 * Server-side API route'ları için Supabase client'ı
 * Admin işlemleri ve güvenli veri erişimi için
 * 
 * Supabase değişkenleri ve tablolar:
 * - profiles: kullanıcı bilgileri
 * - transactions: gelir ve kredi işlemleri
 * - readings: okuma istatistikleri
 * - packages: paket satış verileri
 * - audit_logs: sistem logları
 * 
 * Geliştirme önerileri:
 * - Service role key kullanımı
 * - Admin yetkileri ile veri erişimi
 * - Güvenli server-side işlemler
 * 
 * Tespit edilen hatalar:
 * - Environment variable kontrolü
 * - Error handling
 * 
 * Kullanım durumları:
 * - Gerekli: API route'ları için
 * - Gereksiz: Client-side kullanım
 * - Silinebilir: Yok
 * - Birleştirilebilir: Client ile ortak yapılandırma
 * 
 * Deployment durumu: Hazır
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

// Server-side client with service role key for admin operations
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Default export for convenience
export default createClient;
