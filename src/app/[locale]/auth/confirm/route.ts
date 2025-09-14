/*
 * DOSYA ANALİZİ - EMAIL CONFIRMATION CALLBACK
 *
 * BAĞLANTILI DOSYALAR:
 * - @/lib/supabase/client.ts (Supabase bağlantısı)
 * - src/app/auth/page.tsx (Kayıt sayfası)
 *
 * DOSYA AMACI:
 * E-posta onay linklerini işleyen callback endpoint'i.
 * Kullanıcılar e-posta onay linkine tıkladığında bu endpoint'e yönlendirilir.
 * Token doğrulaması yapar, 100 kredi hediye eder ve kullanıcıyı uygun sayfaya yönlendirir.
 *
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - supabase.auth.verifyOtp() - E-posta onay token'ını doğrular
 * - supabase.auth.getUser() - Mevcut kullanıcıyı alır
 * - profiles tablosu - Kredi bakiyesi güncelleme
 * - transactions tablosu - Kredi hediye işlemi loglama
 * - auth.users tablosu (otomatik Supabase tablosu)
 *
 * YENİ ÖZELLİKLER:
 * - E-posta onayından sonra 100 kredi hediye etme
 * - Transaction log ile kredi hediye işlemini kaydetme
 * - Hata durumunda graceful handling
 *
 * GELİŞTİRME ÖNERİLERİ:
 * - Error handling daha detaylı olabilir
 * - Logging sistemi eklenebilir
 * - Rate limiting eklenebilir
 * - Kredi hediye miktarı konfigürasyon dosyasından alınabilir
 *
 * TESPİT EDİLEN HATALAR:
 * - Şu anda hata yok
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: E-posta onay sistemi için kritik
 * - GÜVENLİ: Production'a hazır
 * - İYİLEŞTİRİLEBİLİR: Error handling ve logging
 */

import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { CREDIT_CONSTANTS } from '@/lib/constants/reading-credits';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/tr'; // Varsayılan olarak Türkçe ana sayfa

  // URL'den locale'i çıkar
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/');
  const locale = pathSegments[1] || 'tr';

  console.log('Email confirmation callback:', { token_hash, type, next });

  if (token_hash && type) {
    try {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (!error) {
        console.log('Email confirmation successful');

        // E-posta onayından sonra 100 kredi hediye et
        try {
          await giveEmailConfirmationCredits();
          console.log('Email confirmation credits given successfully');
        } catch (creditError) {
          console.error(
            'Failed to give email confirmation credits:',
            creditError
          );
          // Kredi hediye etme hatası kritik değil, devam et
        }

        // Locale already declared at top

        // Başarılı onay sonrası dashboard'a yönlendir (kullanıcı giriş yapmış olacak)
        return NextResponse.redirect(
          new URL(`/${locale}/dashboard`, request.url)
        );
      } else {
        console.error('Email confirmation error:', error);

        // Token süresi dolmuşsa özel hata mesajı
        if (
          error.message.includes('expired') ||
          error.message.includes('invalid')
        ) {
          return NextResponse.redirect(
            new URL(`/${locale}/auth?error=token_expired`, request.url)
          );
        }
      }
    } catch (error) {
      console.error('Email confirmation exception:', error);
    }
  }

  // Hata durumunda hata sayfasına yönlendir
  console.log('Redirecting to auth error page');
  // Locale already declared at top

  return NextResponse.redirect(
    new URL(`/${locale}/auth?error=confirmation_failed`, request.url)
  );
}

/**
 * E-posta onayından sonra kullanıcıya 100 kredi hediye eder
 */
async function giveEmailConfirmationCredits() {
  try {
    // Mevcut kullanıcıyı al
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    // RPC ile atomik bonus kredi yükle (+ transaction log)
    const { error: rpcError } = await supabase.rpc('fn_award_bonus_credits', {
      p_user_id: user.id,
      p_delta: CREDIT_CONSTANTS.EMAIL_CONFIRMATION_CREDITS,
      p_reason: 'E-posta onayı hediye kredisi',
      p_ref_type: 'email_confirmation_bonus',
      p_ref_id: 'email_confirmation',
    });

    if (rpcError) {
      throw rpcError;
    }

    console.log(
      `Email confirmation credits given via RPC: ${CREDIT_CONSTANTS.EMAIL_CONFIRMATION_CREDITS} to user ${user.id}`
    );
  } catch (error) {
    console.error('Email confirmation credit gift failed:', error);
    throw error;
  }
}
