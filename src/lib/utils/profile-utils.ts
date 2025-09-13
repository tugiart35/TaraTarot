/*
 * DOSYA ANALİZİ - PROFILE UTILS
 *
 * BAĞLANTILI DOSYALAR:
 * - src/app/[locale]/auth/page.tsx (Kayıt ol profil oluşturma)
 * - src/app/[locale]/dashboard/page.tsx (Dashboard profil oluşturma)
 * - src/lib/supabase/client.ts (Supabase bağlantısı)
 *
 * DOSYA AMACI:
 * Profil oluşturma ve yönetimi için ortak utility fonksiyonları.
 * Tutarlı profil yönetimi sağlar.
 * 
 * ÖNEMLİ DEĞİŞİKLİK:
 * - Kredi ataması kaldırıldı (credit_balance: 0)
 * - Yeni kullanıcılar artık 0 kredi ile başlar
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Profil yönetimi standardizasyonu için
 * - GÜVENLİ: Production'a hazır
 * - TUTARLI: Tüm modüllerde aynı mantık
 */

import { supabase } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// Profil oluşturma için gerekli veri türü
export interface CreateProfileData {
  userId: string;
  firstName?: string;
  lastName?: string;
  fullName?: string; // Geriye uyumluluk için
  email?: string | undefined;
  birthDate?: string;
  gender?: string;
  bio?: string;
  timezone?: string;
}

// Profil oluşturma sonucu
export interface CreateProfileResult {
  success: boolean;
  profile?: any;
  error?: string;
}

/**
 * Kullanıcı için display name oluşturur
 * Öncelik sırası: fullName > email kullanıcı adı > varsayılan
 */
export function generateDisplayName(
  fullName?: string,
  email?: string,
  fallback: string = 'Mistik Kullanıcı'
): string {
  if (fullName && fullName.trim()) {
    return fullName.trim();
  }
  
  if (email) {
    const username = email.split('@')[0];
    if (username && username.length > 0) {
      return username;
    }
  }
  
  return fallback;
}

/**
 * Profil oluşturma verilerini hazırlar
 */
export function prepareProfileData(data: CreateProfileData) {
  // firstName ve lastName varsa birleştir, yoksa fullName kullan
  const fullName = data.firstName && data.lastName 
    ? `${data.firstName} ${data.lastName}`
    : data.fullName;
  
  const displayName = generateDisplayName(fullName, data.email);
  
  return {
    id: data.userId,
    first_name: data.firstName || null,
    last_name: data.lastName || null,
    full_name: fullName || displayName,
    display_name: displayName,
    credit_balance: 0, // Kredi ataması kaldırıldı
    birth_date: data.birthDate || null,
    gender: data.gender || null,
    bio: data.bio || null,
    timezone: data.timezone || null,
    created_at: new Date().toISOString(),
  };
}

/**
 * Supabase'de profil oluşturur veya günceller
 */
export async function createOrUpdateProfile(
  data: CreateProfileData
): Promise<CreateProfileResult> {
  try {
    const profileData = prepareProfileData(data);
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .upsert(profileData, {
        onConflict: 'id',
      })
      .select()
      .single();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      profile,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
    };
  }
}

/**
 * Mevcut profili kontrol eder ve yoksa oluşturur
 */
export async function ensureProfileExists(user: User): Promise<CreateProfileResult> {
  try {
    // Önce mevcut profili kontrol et
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (fetchError && fetchError.code === 'PGRST116') {
      // Profil yoksa oluştur
      const createData: CreateProfileData = {
        userId: user.id,
        firstName: user.user_metadata?.first_name,
        lastName: user.user_metadata?.last_name,
        fullName: user.user_metadata?.full_name, // Geriye uyumluluk
        email: user.email || undefined,
        birthDate: user.user_metadata?.birth_date,
        gender: user.user_metadata?.gender,
        bio: user.user_metadata?.bio,
        timezone: user.user_metadata?.timezone,
      };

      return await createOrUpdateProfile(createData);
    }

    if (fetchError) {
      return {
        success: false,
        error: fetchError.message,
      };
    }

    return {
      success: true,
      profile: existingProfile,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
    };
  }
}
