/*
info:
Bağlantılı dosyalar:
- ../config.ts: i18n yapılandırması için (gerekli)
- ../../../messages/*.json: Validation mesajları için (gerekli)

Dosyanın amacı:
- Form validation mesajlarını çok dilli hale getirir
- Zod validation ile entegre çalışır
- Server ve client-side validation desteği

Supabase değişkenleri ve tabloları:
- Yok (validation helper)

Geliştirme önerileri:
- Yeni validation kuralları eklemek için bu dosyayı güncelle
- Custom validation mesajları eklenebilir

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Aktif kullanımda
*/

import { z } from 'zod';
import { getTranslations } from 'next-intl/server';

// Validation mesaj anahtarları
export const validationKeys = {
  required: 'validation.required',
  email: 'validation.email',
  minLength: 'validation.minLength',
  passwordRules: 'validation.password.rules',
  pattern: 'validation.pattern',
} as const;

// Validation mesaj mapper
export async function getValidationMessages(locale: string) {
  const t = await getTranslations({ locale, namespace: 'validation' });

  return {
    required: t('required'),
    email: t('email'),
    minLength: t('minLength'),
    passwordRules: t('password.rules'),
    pattern: t('pattern'),
  };
}

// Zod validation şemaları
export function createValidationSchema(_locale: string) {
  return {
    email: z.string().email(),
    password: z.string().min(8),
    required: z.string().min(1),
  };
}

// Server-side validation helper
export async function validateWithMessages<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  locale: string
): Promise<{ success: boolean; data?: T; errors?: Record<string, string> }> {
  try {
    const result = schema.safeParse(data);

    if (result.success) {
      return { success: true, data: result.data };
    }

    const messages = await getValidationMessages(locale);
    const errors: Record<string, string> = {};

    result.error.issues.forEach(error => {
      const path = error.path.join('.');
      errors[path] =
        messages[error.code as keyof typeof messages] || error.message;
    });

    return { success: false, errors };
  } catch (error) {
    return { success: false, errors: { general: 'Validation error' } };
  }
}
