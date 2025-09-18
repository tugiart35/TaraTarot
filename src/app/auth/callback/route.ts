/*
 * OAuth/Email Callback Route - Next.js 14 App Router
 *
 * Bağlı dosyalar:
 * - src/lib/supabase/server.ts (server client)
 * - src/middleware.ts (auth middleware)
 *
 * Dosya amacı:
 * OAuth ve email confirmation callback'lerini işler
 * Supabase auth flow'unu tamamlar
 *
 * Supabase değişkenleri ve tablolar:
 * - auth.users: Supabase auth tablosu
 * - profiles: kullanıcı profilleri (opsiyonel)
 *
 * Geliştirme önerileri:
 * - Error handling iyileştirilebilir
 * - Logging eklenebilir
 * - Rate limiting eklenebilir
 *
 * Tespit edilen hatalar:
 * - ✅ Callback route oluşturuldu
 * - ✅ Locale-aware redirect eklendi
 *
 * Kullanım durumu:
 * - ✅ Gerekli: OAuth ve email confirmation için
 * - ✅ Production-ready: Next.js 14 App Router uyumlu
 */

import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const locale = searchParams.get('locale') ?? 'tr';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
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
              // Server Component'ten çağrıldığında ignore edilebilir
            }
          },
        },
      }
    );

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (!error) {
        // Başarılı giriş - dashboard'a yönlendir
        const forwardedHost = request.headers.get('x-forwarded-host');
        const isLocalEnv = process.env.NODE_ENV === 'development';
        
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}/${locale}/dashboard`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}/${locale}/dashboard`);
        } else {
          return NextResponse.redirect(`${origin}/${locale}/dashboard`);
        }
      }
    } catch (error) {
      console.error('Auth callback error:', error);
    }
  }

  // Hata durumunda auth sayfasına yönlendir
  return NextResponse.redirect(`${origin}/${locale}/auth?error=callback_failed`);
}
