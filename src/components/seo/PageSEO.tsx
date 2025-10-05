/**
 * PAGE SEO COMPONENT - Her sayfa için reusable SEO component
 *
 * Bu component, her sayfa için SEO metadata'sını dinamik olarak oluşturur.
 * Ana sayfa için optimize edilmiş, diğer sayfalar için genişletilebilir.
 */

'use client';

import React from 'react';
import { generateHomepageStructuredData } from '@/lib/seo/page-seo-generator';

interface PageSEOProps {
  locale: string;
  pageType?:
    | 'homepage'
    | 'tarot'
    | 'numerology'
    | 'dashboard'
    | 'auth'
    | 'legal';
  customData?: any;
}

export function PageSEO({ locale }: PageSEOProps) {
  // Ana sayfa için structured data oluştur
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
    </>
  );
}

export default PageSEO;
