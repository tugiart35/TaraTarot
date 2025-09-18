/*
 * Supabase Server Client - Next.js 14 App Router için
 *
 * Bağlı dosyalar:
 * - src/lib/supabase/client.ts (browser client)
 * - src/middleware.ts (middleware client)
 *
 * Dosya amacı:
 * Server-side işlemler için Supabase client'ı
 * SSR, API routes ve server actions için
 *
 * Supabase değişkenleri ve tablolar:
 * - profiles: kullanıcı profilleri
 * - auth.users: Supabase auth tablosu
 *
 * Geliştirme önerileri:
 * - Server-side session yönetimi
 * - RLS policy desteği
 * - Cookie-based auth
 *
 * Tespit edilen hatalar:
 * - ✅ SSR uyumlu client oluşturuldu
 * - ✅ Cookie yönetimi eklendi
 *
 * Kullanım durumu:
 * - ✅ Gerekli: Server Components ve API routes için
 * - ✅ Production-ready: Next.js 14 App Router uyumlu
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './client';

export async function getServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export async function getServerSession() {
  const supabase = await getServerClient();
  
  try {
    // Güvenli user kontrolü için getUser() kullan
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Server user error:', error);
      return null;
    }

    // User varsa sadece user'ı döndür
    if (user) {
      return { user, session: null };
    }

    return null;
  } catch (error) {
    console.error('Server auth error:', error);
    return null;
  }
}

// Legacy export for backward compatibility
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }

  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  // Server-side client with service role key for admin operations
  return createServerClient<Database>(
    supabaseUrl,
    supabaseServiceKey,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op for service role client
        },
      },
    }
  );
};