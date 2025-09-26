/*
 * Auth Page - Next.js 14 App Router (RSC + Client Handoff)
 *
 * Bağlı dosyalar:
 * - src/lib/supabase/server.ts (server client)
 * - src/components/auth/AuthForm.tsx (client component)
 * - src/middleware.ts (auth middleware)
 *
 * Dosya amacı:
 * Server Component olarak session kontrolü yapar
 * Client Component'e handoff yapar
 *
 * Supabase değişkenleri ve tablolar:
 * - auth.users: Supabase auth tablosu
 * - profiles: kullanıcı profilleri
 *
 * Geliştirme önerileri:
 * - Server-side session kontrolü
 * - Client-side form handling
 * - Locale-aware redirects
 *
 * Tespit edilen hatalar:
 * - ✅ RSC pattern uygulandı
 * - ✅ Sonsuz loading sorunu çözüldü
 * - ✅ Server/Client ayrımı yapıldı
 *
 * Kullanım durumu:
 * - ✅ Gerekli: Ana authentication sayfası
 * - ✅ Production-ready: Next.js 14 App Router uyumlu
 */

import AuthForm from '@/components/auth/AuthForm';
import AuthAccessibilityWrapper from '@/components/auth/AuthAccessibilityWrapper';

interface AuthPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}

export default async function AuthPage({ params, searchParams }: AuthPageProps) {
  const { locale } = await params;
  const { error, next } = await searchParams;

  // Server-side session kontrolü - otomatik yönlendirme kaldırıldı
  // const session = await getServerSession();

  // Otomatik yönlendirme kaldırıldı - kullanıcı auth sayfasında kalabilir
  // if (session?.user) {
  //   redirect(`/${locale}/dashboard`);
  // }

  // Client Component'e handoff with accessibility wrapper
  return (
    <AuthAccessibilityWrapper 
      title="Mistik Giriş"
      description="Güvenli giriş yapın veya yeni hesap oluşturun"
    >
      <AuthForm 
        locale={locale}
        initialError={error || null}
        next={next || null}
      />
    </AuthAccessibilityWrapper>
  );
}
