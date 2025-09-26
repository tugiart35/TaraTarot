/*
 info:
 Bağlantılı dosyalar:
- ../../config/app-config: Uygulama genel ayarları ve kısa adı gibi bilgileri almak için (gerekli)
- ../../config/metadata: PWA manifest, favicon ve tema rengi gibi meta verileri almak için (gerekli)
- Bu dosya genellikle layout veya sayfa bileşenlerinde import edilerek <head> içeriğini merkezi olarak yönetmek için kullanılır (gerekli)

Dosyanın amacı:
- HTML <head> bölümünde mobil uyumluluk, PWA desteği, favicon ve platforma özel meta tag'leri merkezi ve dinamik şekilde yönetmek. Mobil öncelikli ve PWA uyumlu bir web uygulaması için temel meta ayarlarını sağlar.

Backend bağlantısı:
- Bu dosyada backend ile ilgili herhangi bir değişken, fonksiyon veya tablo kullanılmamaktadır.

Geliştirme ve öneriler:
- Dosyanın başında kısa bir açıklama mevcut, ancak info bloğu ile daha kapsamlı ve standart bir açıklama sağlanmalı
- Meta tag içerikleri (ör. başlık, açıklama, sosyal paylaşım etiketleri) ileride dinamikleştirilebilir veya i18n desteği eklenebilir
- PWA ve mobil uyumluluk için temel gereksinimler eksiksiz, ancak sosyal medya paylaşım (Open Graph, Twitter Card) meta tag'leri eklenebilir
- Kod sade ve fonksiyonel, gereksiz satır veya tekrar yok
- Okunabilirlik yüksek, prop ve değişken isimleri açık
- Güvenlik açısından herhangi bir açık yok, meta ve link tag'leri doğru kullanılmış

Hatalar:
- Eksik açıklama yok, kodun tamamı amacına uygun
- Potansiyel hata veya kötü pratik bulunmuyor
- Tekrar eden kod veya gereksiz satır yok

Gereklilik ve Kullanım Durumu:
- HeadTags bileşeni: Gerekli, tüm sayfalarda merkezi <head> yönetimi için kullanılmalı
- app-config ve metadata importları: Gerekli
- Kodun tamamı sade, silinebilir veya birleştirilebilir bir parça bulunmuyor

Okunabilirlik, Optimizasyon, Yeniden Kullanılabilirlik ve Güvenlik:
- Kod okunabilir, fonksiyonel ve modüler
- Farklı projelerde de kolayca kullanılabilir
- Güvenlik açısından herhangi bir risk yok
- Yeniden kullanılabilirlik ve merkezi yönetim açısından iyi bir örnek
*/

import { APP_CONFIG, APP_INFO } from '@/lib/config/app-config';
import { pwaMetadata, viewport } from '@/lib/config/metadata';
import StructuredData from '@/components/seo/StructuredData';

export default function HeadTags() {
  return (
    <>
      {/* Mobil uyumluluk için viewport ayarları */}
      <meta
        name='viewport'
        content={`width=${APP_CONFIG.mobile.viewport.width}, initial-scale=${APP_CONFIG.mobile.viewport.initialScale}, maximum-scale=${APP_CONFIG.mobile.viewport.maximumScale}, user-scalable=${APP_CONFIG.mobile.viewport.userScalable}`}
      />

      {/* PWA desteği için manifest */}
      <link rel='manifest' href={pwaMetadata.manifest} />

      {/* Favicons */}
      <link rel='icon' href={pwaMetadata.icons.favicon} />
      <link rel='apple-touch-icon' href={pwaMetadata.icons.appleTouchIcon} />

      {/* iOS Safari için meta tag'ler */}
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={APP_INFO.shortName} />

      {/* Android Chrome için meta tag'ler */}
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='theme-color' content={viewport.themeColor as string} />

      {/* Microsoft Tiles için meta tag'ler */}
      <meta
        name='msapplication-TileColor'
        content={viewport.themeColor as string}
      />
      <meta name='msapplication-tap-highlight' content='no' />

      {/* SEO Meta Tags */}
      <meta name="description" content="Tarot okumaları, numeroloji hesaplamaları ve kişisel gelişim rehberliği. Uzman falcılar ile online tarot kartları ve numeroloji analizi." />
      <meta name="keywords" content="tarot, numeroloji, fal, kart okuma, kişisel gelişim, online tarot, tarot kartları, numeroloji hesaplama" />
      <meta name="author" content="Busbuskimki Tarot" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Turkish" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Busbuskimki Tarot - Online Tarot ve Numeroloji" />
      <meta property="og:description" content="Profesyonel tarot okumaları ve numeroloji hesaplamaları. Uzman falcılar ile kişisel rehberlik." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://busbuskimki.com" />
      <meta property="og:image" content="https://busbuskimki.com/images/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Busbuskimki Tarot" />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Busbuskimki Tarot - Online Tarot ve Numeroloji" />
      <meta name="twitter:description" content="Profesyonel tarot okumaları ve numeroloji hesaplamaları. Uzman falcılar ile kişisel rehberlik." />
      <meta name="twitter:image" content="https://busbuskimki.com/images/twitter-card.jpg" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://busbuskimki.com" />
      
      {/* Structured Data */}
      <StructuredData type="website" />
      <StructuredData type="organization" />
      <StructuredData type="navigation" />
      
      {/* Security Headers */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com; frame-ancestors 'none';" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), interest-cohort=()" />
    </>
  );
}
