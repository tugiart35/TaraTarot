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
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { RedirectUtils } from '@/lib/utils/redirect-utils';
import { extractLocaleFromRequest } from '@/lib/utils/locale-utils';
import { AdminDetectionService } from '@/lib/services/admin-detection-service';
import { AuthErrorService } from '@/lib/services/auth-error-service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const locale = extractLocaleFromRequest(request);

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
        // Kullanıcı bilgilerini al
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Admin kontrolü yap
          const isUserAdmin = await AdminDetectionService.isUserAdmin(user.id);
          AdminDetectionService.logAdminAccess(user.id, isUserAdmin);
          
          // Yönlendirme kararı
          const redirectPath = AdminDetectionService.getRedirectPath(isUserAdmin, locale);
          
          // Başarılı giriş - admin durumuna göre yönlendir
          return RedirectUtils.createRedirectResponse(request, redirectPath);
        } else {
          // User yoksa normal dashboard'a yönlendir
          return RedirectUtils.createDashboardRedirect(request, locale);
        }
      }
    } catch (error) {
      return AuthErrorService.handleCallbackError(error, locale);
    }
  }

  // Hata durumunda auth sayfasına yönlendir
  return AuthErrorService.handleCallbackError(new Error('No code provided'), locale);
}
