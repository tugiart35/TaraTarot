/*
 * EMAIL CONFIRMATION ROUTE - Locale-specific
 *
 * BAĞLANTILI DOSYALAR:
 * - @/lib/supabase/client.ts (Supabase bağlantısı)
 * - src/app/auth/callback/route.ts (Ana callback logic)
 *
 * DOSYA AMACI:
 * Supabase e-posta template'inden gelen locale-specific confirmation linklerini işler.
 * Template: {{ .SiteURL }}/tr/auth/confirm?token_hash={{ .TokenHash }}&type=signup
 *
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - supabase.auth.verifyOtp() - E-posta onay token'ını doğrular
 * - supabase.auth.getUser() - Mevcut kullanıcıyı alır
 * - profiles tablosu - Kullanıcı profilleri
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Supabase e-posta template'i için
 * - GÜVENLİ: Production-ready
 */

import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { RedirectUtils } from '@/lib/utils/redirect-utils';
import { extractLocaleFromRequest } from '@/lib/utils/locale-utils';
import { AdminDetectionService } from '@/lib/services/admin-detection-service';
import { AuthErrorService } from '@/lib/services/auth-error-service';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const locale = extractLocaleFromRequest(request);

  logger.info('Email confirmation callback', {
    token_hash,
    type,
    locale,
  } as any);

  if (token_hash && type) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(
            cookiesToSet: Array<{ name: string; value: string; options?: any }>
          ) {
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
      // PKCE flow - email confirmation için
      const result = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (!result.error) {
        logger.info('Email confirmation successful');

        // Kullanıcı bilgilerini al
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // Profile kontrolü ve oluşturma
          try {
            const { ensureProfileExists } = await import(
              '@/lib/utils/profile-utils'
            );
            const profileResult = await ensureProfileExists(user);

            if (!profileResult.success) {
              // Profile sorunu giriş işlemini etkilemez
            }
          } catch (profileError) {
            // Profile hatası giriş işlemini etkilemez
          }

          // Admin kontrolü yap
          const isUserAdmin = await AdminDetectionService.isUserAdmin(user.id);
          AdminDetectionService.logAdminAccess(user.id, isUserAdmin);

          // Yönlendirme kararı
          const redirectPath = AdminDetectionService.getRedirectPath(
            isUserAdmin,
            locale
          );

          // Başarılı giriş - admin durumuna göre yönlendir
          return RedirectUtils.createRedirectResponse(request, redirectPath);
        } else {
          // User yoksa normal dashboard'a yönlendir
          return RedirectUtils.createDashboardRedirect(request, locale);
        }
      } else {
        logger.error('Email confirmation error', result.error);

        // Token süresi dolmuşsa özel hata mesajı
        if (
          result.error.message.includes('expired') ||
          result.error.message.includes('invalid')
        ) {
          return AuthErrorService.handleConfirmationError(result.error, locale);
        } else {
          return AuthErrorService.handleConfirmationError(result.error, locale);
        }
      }
    } catch (error) {
      logger.error('Email confirmation exception', error);
      return AuthErrorService.handleConfirmationError(error, locale);
    }
  }

  // Hata durumunda auth sayfasına yönlendir
  logger.info('Redirecting to auth error page - missing parameters');
  return NextResponse.redirect(
    new URL(`/${locale}/auth?error=confirmation_failed`, request.url)
  );
}
