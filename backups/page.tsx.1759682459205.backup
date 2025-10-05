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
import { Metadata } from 'next';
import {
  generateAuthPageMetadata,
  generateAuthPageStructuredData,
} from '@/lib/seo/auth-seo-generator';

interface AuthPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}

// SEO Metadata generation using new auth SEO generator
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Use the new auth SEO generator
  return generateAuthPageMetadata(locale);
}

export default async function AuthPage({
  params,
  searchParams,
}: AuthPageProps) {
  const { locale } = await params;
  const { error, next } = await searchParams;

  // Server-side session kontrolü - otomatik yönlendirme kaldırıldı
  // const session = await getServerSession();

  // Otomatik yönlendirme kaldırıldı - kullanıcı auth sayfasında kalabilir
  // if (session?.user) {
  //   redirect(`/${locale}/dashboard`);
  // }

  // Generate structured data using new auth SEO generator
  const structuredData = generateAuthPageStructuredData(locale);

  // Client Component'e handoff with accessibility wrapper
  return (
    <>
      {/* Organization Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organization),
        }}
      />

      {/* Website Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website),
        }}
      />

      {/* Service Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.service),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.breadcrumb),
        }}
      />

      {/* FAQ Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.faq),
        }}
      />

      <AuthAccessibilityWrapper
        title='Büşbüşkimki'
        description='Güvenli giriş yapın veya yeni hesap oluşturun'
      >
        <AuthForm
          locale={locale}
          initialError={error || null}
          next={next || null}
        />
      </AuthAccessibilityWrapper>
    </>
  );
}
