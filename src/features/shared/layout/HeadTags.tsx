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
    </>
  );
}
