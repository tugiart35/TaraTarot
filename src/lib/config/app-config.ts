/*
info:
Bağlantılı dosyalar:
- Doğrudan import edilen bir dosya yok, ancak bu dosya genellikle uygulamanın ana giriş noktası, tema, dil ve PWA ayarlarını kullanan tüm sayfa ve bileşenlerde import edilir (örn. layout, tema sağlayıcıları, dil yönetimi, PWA servis worker).

Dosyanın amacı:
- Uygulamanın genel ayarlarını, sabitlerini ve meta bilgilerini merkezi olarak tanımlamak. Dil, tema, mobil viewport ve PWA ayarları ile uygulama adı, kısa adı ve açıklaması gibi bilgileri tek noktadan yönetmek.

firebase değişkenleri ve tablolar:
- firebase ile doğrudan bir bağlantı veya değişken yoktur. Sadece frontend konfigürasyon dosyasıdır.

Geliştirme ve öneriler:
- Açıklamalar yeterli ve Türkçe, okunabilirlik yüksek.
- Tüm ayarlar as const ile sabitlenmiş, bu iyi bir pratik.
- Mobil viewport ayarları sade ve anlaşılır, ancak ileride farklı cihazlar için genişletilebilir.
- Tema renkleri ve PWA ayarları merkezi olarak yönetildiği için uygulama genelinde tutarlılık sağlar.
- Eğer uygulama çoklu dil desteği sunacaksa, desteklenen diller dizisi eklenebilir.
- PWA ayarları ileride daha fazla seçenekle (ör. offline desteği, update stratejisi) genişletilebilir.
- Gereksiz satır veya tekrar yok, kod sade ve amacına uygun.

Hatalar ve geliştirmeye açık noktalar:
- Şu an için hata veya kötü pratik yok.
- Mobil viewport ayarlarında userScalable 'no' olarak ayarlanmış, erişilebilirlik için bazı durumlarda 'yes' yapılması önerilebilir.
- Tema renkleri hardcoded, ileride tema switcher eklenirse dinamik hale getirilebilir.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik ve sade yapı çok iyi.
- Tekrarsız, modüler ve merkezi yönetim sağlanmış.
- Güvenlik açısından risk yok, sadece frontend sabitleri içeriyor.

Gereklilik ve Kullanım Durumu:
- APP_CONFIG: Gerekli, uygulamanın tüm genel ayarları için ana kaynak.
- APP_INFO: Gerekli, uygulama meta bilgileri için kullanılır.
*/
/*
  Uygulama Konfigürasyonu
  Bu dosya uygulamanın genel ayarlarını ve sabitlerini barındırır.
  Dil ayarları, tema renkleri ve mobil ayarlar burada tanımlanır.
*/

// Dil ayarları
export const APP_CONFIG = {
  // Ana dil ayarı
  defaultLanguage: 'tr',

  // Mobil ayarları
  mobile: {
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: 'no',
    },
  },

  // Tema ayarları
  theme: {
    primaryColor: '#6366f1',
    backgroundColor: '#0f172a',
    textColor: '#1f2937',
  },

  // PWA ayarları
  pwa: {
    enabled: true,
    manifestPath: '/manifest.json',
  },
} as const;

// Uygulama bilgileri
export const APP_INFO = {
  name: 'Mystik Tarot',
  shortName: 'Mystik',
  version: '2.0.0',
  description: 'Ruhani Rehberlik Uygulaması',
} as const;
