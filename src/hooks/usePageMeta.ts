'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

interface UsePageMetaReturn {
  setPageMeta: (meta: PageMeta) => void;
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  updateKeywords: (keywords: string) => void;
  updateCanonical: (canonical: string) => void;
  updateOpenGraph: (
    og: Partial<
      Pick<PageMeta, 'ogTitle' | 'ogDescription' | 'ogImage' | 'ogUrl'>
    >
  ) => void;
  updateTwitter: (
    twitter: Partial<
      Pick<
        PageMeta,
        'twitterCard' | 'twitterTitle' | 'twitterDescription' | 'twitterImage'
      >
    >
  ) => void;
}

/**
 * SEO meta management hook
 * Provides dynamic meta tag management for better SEO
 */
export function usePageMeta(): UsePageMetaReturn {
  const pathname = usePathname();

  // Update document title
  const updateTitle = useCallback((title: string) => {
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  }, []);

  // Update meta description
  const updateDescription = useCallback((description: string) => {
    if (typeof document !== 'undefined') {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, []);

  // Update meta keywords
  const updateKeywords = useCallback((keywords: string) => {
    if (typeof document !== 'undefined') {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
  }, []);

  // Update canonical URL
  const updateCanonical = useCallback((canonical: string) => {
    if (typeof document !== 'undefined') {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
  }, []);

  // Update Open Graph meta tags
  const updateOpenGraph = useCallback(
    (
      og: Partial<
        Pick<PageMeta, 'ogTitle' | 'ogDescription' | 'ogImage' | 'ogUrl'>
      >
    ) => {
      if (typeof document === 'undefined') {
        return;
      }

      const ogTags = [
        { property: 'og:title', content: og.ogTitle },
        { property: 'og:description', content: og.ogDescription },
        { property: 'og:image', content: og.ogImage },
        { property: 'og:url', content: og.ogUrl },
      ];

      ogTags.forEach(({ property, content }) => {
        if (!content) {
          return;
        }

        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('property', property);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', content);
      });
    },
    []
  );

  // Update Twitter Card meta tags
  const updateTwitter = useCallback(
    (
      twitter: Partial<
        Pick<
          PageMeta,
          'twitterCard' | 'twitterTitle' | 'twitterDescription' | 'twitterImage'
        >
      >
    ) => {
      if (typeof document === 'undefined') {
        return;
      }

      const twitterTags = [
        { name: 'twitter:card', content: twitter.twitterCard },
        { name: 'twitter:title', content: twitter.twitterTitle },
        { name: 'twitter:description', content: twitter.twitterDescription },
        { name: 'twitter:image', content: twitter.twitterImage },
      ];

      twitterTags.forEach(({ name, content }) => {
        if (!content) {
          return;
        }

        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('name', name);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', content);
      });
    },
    []
  );

  // Set comprehensive page meta
  const setPageMeta = useCallback(
    (meta: PageMeta) => {
      if (meta.title) {
        updateTitle(meta.title);
      }
      if (meta.description) {
        updateDescription(meta.description);
      }
      if (meta.keywords) {
        updateKeywords(meta.keywords);
      }
      if (meta.canonical) {
        updateCanonical(meta.canonical);
      }

      if (meta.ogTitle || meta.ogDescription || meta.ogImage || meta.ogUrl) {
        updateOpenGraph({
          ogTitle: meta.ogTitle,
          ogDescription: meta.ogDescription,
          ogImage: meta.ogImage,
          ogUrl: meta.ogUrl,
        });
      }

      if (
        meta.twitterCard ||
        meta.twitterTitle ||
        meta.twitterDescription ||
        meta.twitterImage
      ) {
        updateTwitter({
          twitterCard: meta.twitterCard,
          twitterTitle: meta.twitterTitle,
          twitterDescription: meta.twitterDescription,
          twitterImage: meta.twitterImage,
        });
      }
    },
    [
      updateTitle,
      updateDescription,
      updateKeywords,
      updateCanonical,
      updateOpenGraph,
      updateTwitter,
    ]
  );

  // Auto-update meta based on pathname
  useEffect(() => {
    const baseUrl = 'https://busbuskimki.com';
    const currentUrl = `${baseUrl}${pathname}`;

    // Default meta for different pages
    const defaultMeta: Record<string, PageMeta> = {
      '/tr/dashboard': {
        title: 'Dashboard - Busbuskimki Tarot',
        description:
          'Tarot okumalarınızı yönetin, kredi bakiyenizi görün ve yeni okumalar yapın.',
        keywords: 'tarot dashboard, kredi bakiyesi, okuma geçmişi',
        canonical: currentUrl,
        ogTitle: 'Dashboard - Busbuskimki Tarot',
        ogDescription:
          'Tarot okumalarınızı yönetin, kredi bakiyenizi görün ve yeni okumalar yapın.',
        ogUrl: currentUrl,
        twitterCard: 'summary',
        twitterTitle: 'Dashboard - Busbuskimki Tarot',
        twitterDescription:
          'Tarot okumalarınızı yönetin, kredi bakiyenizi görün ve yeni okumalar yapın.',
      },
      '/tr/tarotokumasi': {
        title: 'Tarot Okuması - Busbuskimki Tarot',
        description:
          'Profesyonel tarot okumaları ile geleceğinizi keşfedin. Uzman falcılar ile online tarot kartları.',
        keywords: 'tarot okuması, tarot kartları, fal, gelecek',
        canonical: currentUrl,
        ogTitle: 'Tarot Okuması - Busbuskimki Tarot',
        ogDescription: 'Profesyonel tarot okumaları ile geleceğinizi keşfedin.',
        ogUrl: currentUrl,
        twitterCard: 'summary_large_image',
        twitterTitle: 'Tarot Okuması - Busbuskimki Tarot',
        twitterDescription:
          'Profesyonel tarot okumaları ile geleceğinizi keşfedin.',
      },
      '/tr/numeroloji': {
        title: 'Numeroloji Hesaplama - Busbuskimki Tarot',
        description:
          'Numeroloji ile kişilik analizi yapın. Doğum tarihinizden numeroloji hesaplaması.',
        keywords:
          'numeroloji, numeroloji hesaplama, kişilik analizi, doğum tarihi',
        canonical: currentUrl,
        ogTitle: 'Numeroloji Hesaplama - Busbuskimki Tarot',
        ogDescription: 'Numeroloji ile kişilik analizi yapın.',
        ogUrl: currentUrl,
        twitterCard: 'summary',
        twitterTitle: 'Numeroloji Hesaplama - Busbuskimki Tarot',
        twitterDescription: 'Numeroloji ile kişilik analizi yapın.',
      },
    };

    const meta = defaultMeta[pathname];
    if (meta) {
      setPageMeta(meta);
    }
  }, [pathname, setPageMeta]);

  return {
    setPageMeta,
    updateTitle,
    updateDescription,
    updateKeywords,
    updateCanonical,
    updateOpenGraph,
    updateTwitter,
  };
}
