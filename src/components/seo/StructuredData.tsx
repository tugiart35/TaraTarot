/*
info:
Structured data (JSON-LD) component for SEO optimization.
Provides search engines with structured information about the website.

Bağlantılı dosyalar:
- @/lib/config/app-config: App configuration
- @/lib/config/metadata: Metadata configuration

Dosyanın amacı:
- JSON-LD structured data for search engines
- Website schema markup
- Navigation schema
- Organization schema
- Service schema

Backend bağlantısı:
- Bu dosya sadece frontend structured data içerir
- Backend ile doğrudan bağlantısı yoktur

Geliştirme ve öneriler:
- Schema.org standards compliance
- Rich snippets optimization
- Search engine visibility enhancement
- Performance optimization
*/

'use client';

import { APP_INFO } from '@/lib/config/app-config';

interface StructuredDataProps {
  type?: 'website' | 'navigation' | 'organization' | 'service';
  currentPath?: string;
}

export default function StructuredData({
  type = 'website',
}: StructuredDataProps) {
  const baseUrl = 'https://busbuskimki.com';

  const getWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: APP_INFO.name,
    alternateName: APP_INFO.shortName,
    url: baseUrl,
    description:
      'Profesyonel tarot okumaları ve numeroloji hesaplamaları. Uzman falcılar ile kişisel rehberlik.',
    inLanguage: 'tr',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: APP_INFO.name,
      url: baseUrl,
    },
  });

  const getNavigationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Ana Navigasyon',
    url: baseUrl,
    hasPart: [
      {
        '@type': 'SiteNavigationElement',
        name: 'Tarot',
        url: `${baseUrl}/tarotokumasi`,
        description: 'Tarot kartları ile kişisel rehberlik',
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Numeroloji',
        url: `${baseUrl}/numeroloji`,
        description: 'Numeroloji hesaplamaları ve analizi',
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Ana Sayfa',
        url: baseUrl,
        description: 'Ana sayfa',
      },
    ],
  });

  const getOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_INFO.name,
    alternateName: APP_INFO.shortName,
    url: baseUrl,
    logo: `${baseUrl}/icons/icon-512x512.png`,
    description: 'Profesyonel tarot okumaları ve numeroloji hesaplamaları',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Turkish', 'English', 'Serbian'],
    },
    sameAs: [
      'https://www.instagram.com/busbuskimki',
      'https://www.facebook.com/busbuskimki',
    ],
  });

  const getServiceSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tarot ve Numeroloji Hizmetleri',
    description: 'Profesyonel tarot okumaları ve numeroloji hesaplamaları',
    provider: {
      '@type': 'Organization',
      name: APP_INFO.name,
      url: baseUrl,
    },
    serviceType: 'Spiritual Guidance',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    availableLanguage: ['Turkish', 'English', 'Serbian'],
    offers: {
      '@type': 'Offer',
      description: 'Online tarot ve numeroloji hizmetleri',
      price: '0',
      priceCurrency: 'TRY',
    },
  });

  const getSchema = () => {
    switch (type) {
      case 'navigation':
        return getNavigationSchema();
      case 'organization':
        return getOrganizationSchema();
      case 'service':
        return getServiceSchema();
      default:
        return getWebsiteSchema();
    }
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema(), null, 2),
      }}
    />
  );
}
