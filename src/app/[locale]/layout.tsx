import { Metadata } from 'next';
import {
  generateHomepageMetadata,
  generateHomepageStructuredData,
} from '@/lib/seo/page-seo-generator';
import { LocaleLayoutClient } from './LocaleLayoutClient';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Yeni SEO generator kullan
  return generateHomepageMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Yeni SEO generator ile structured data oluştur
  const structuredData = generateHomepageStructuredData(locale);

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

      <LocaleLayoutClient locale={locale}>{children}</LocaleLayoutClient>
    </>
  );
}
