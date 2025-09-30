# 📦 File tree (drop-in)

```
src/
  app/
    (marketing)/
      [locale]/
        (legal)/
          layout.tsx
          refund/page.tsx
          privacy/page.tsx
          delivery/page.tsx
          terms/page.tsx
    api/
  lib/
    i18n/
      routing.ts
  messages/
    en/
      legal.json
    tr/
      legal.json
  providers/
    IntlProvider.tsx
  styles/
    globals.css
```

---

# 🔧 `src/lib/i18n/routing.ts`
```ts
// Minimal next-intl routing helper (App Router)
export const locales = ["tr", "en"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = "tr";
```

---

# 🌍 `src/providers/IntlProvider.tsx`
```tsx
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

export default function IntlProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

---

# 🧭 `src/app/(marketing)/[locale]/(legal)/layout.tsx`
```tsx
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  const title = t('seo.title');
  const description = t('seo.description');
  return {
    title,
    description,
    alternates: { canonical: `/${params.locale}/legal` },
    openGraph: { title, description },
  };
}

export default async function LegalLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  const links = [
    { href: `/${params.locale}/legal/privacy`, label: t('nav.privacy') },
    { href: `/${params.locale}/legal/refund`, label: t('nav.refund') },
    { href: `/${params.locale}/legal/delivery`, label: t('nav.delivery') },
    { href: `/${params.locale}/legal/terms`, label: t('nav.terms') },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-neutral-200">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">{t('header.title')}</h1>
        <p className="mt-1 text-sm text-neutral-400">{t('header.subtitle')}</p>
        <nav className="mt-6 flex flex-wrap gap-3 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full border border-neutral-700 px-3 py-1 hover:bg-neutral-800">
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="prose prose-invert prose-neutral max-w-none prose-headings:scroll-mt-24">
        {children}
      </main>
    </div>
  );
}
```

---

# 🔁 Shared sections (helper)
> Basit tutmak için sayfa içine yazıyoruz; isterseniz MDX’e alabiliriz.

---

# 🔐 `src/app/(marketing)/[locale]/(legal)/privacy/page.tsx`
```tsx
import { getTranslations } from 'next-intl/server';

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  return (
    <article>
      <h2>{t('privacy.title')}</h2>
      <p className="text-sm opacity-70">{t('common.lastUpdated')} 30.09.2025</p>

      <h3>{t('privacy.sections.dataWeCollect.title')}</h3>
      <p>{t('privacy.sections.dataWeCollect.body')}</p>

      <h3>{t('privacy.sections.usage.title')}</h3>
      <p>{t('privacy.sections.usage.body')}</p>

      <h3>{t('privacy.sections.cookies.title')}</h3>
      <p>{t('privacy.sections.cookies.body')}</p>

      <h3>{t('privacy.sections.thirdParties.title')}</h3>
      <p>{t('privacy.sections.thirdParties.body')}</p>

      <h3>{t('privacy.sections.rights.title')}</h3>
      <p>{t('privacy.sections.rights.body')}</p>

      <h3>{t('privacy.sections.contact.title')}</h3>
      <p>{t('privacy.sections.contact.body')}</p>
    </article>
  );
}
```

---

# 💳 `src/app/(marketing)/[locale]/(legal)/refund/page.tsx`
```tsx
import { getTranslations } from 'next-intl/server';

export default async function RefundPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  return (
    <article>
      <h2>{t('refund.title')}</h2>
      <p className="text-sm opacity-70">{t('common.lastUpdated')} 30.09.2025</p>

      <h3>{t('refund.sections.scope.title')}</h3>
      <p>{t('refund.sections.scope.body')}</p>

      <h3>{t('refund.sections.satisfaction.title')}</h3>
      <ul>
        <li>{t('refund.sections.satisfaction.items.0')}</li>
        <li>{t('refund.sections.satisfaction.items.1')}</li>
        <li>{t('refund.sections.satisfaction.items.2')}</li>
      </ul>

      <h3>{t('refund.sections.delivery.title')}</h3>
      <p>{t('refund.sections.delivery.body')}</p>

      <h3>{t('refund.sections.subscriptions.title')}</h3>
      <p>{t('refund.sections.subscriptions.body')}</p>

      <h3>{t('refund.sections.contact.title')}</h3>
      <p>{t('refund.sections.contact.body')}</p>

      <blockquote className="border-l-2 pl-3 text-sm opacity-80">
        {t('refund.sections.note')}
      </blockquote>
    </article>
  );
}
```

---

# 📦 `src/app/(marketing)/[locale]/(legal)/delivery/page.tsx`
```tsx
import { getTranslations } from 'next-intl/server';

export default async function DeliveryPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  return (
    <article>
      <h2>{t('delivery.title')}</h2>
      <p className="text-sm opacity-70">{t('common.lastUpdated')} 30.09.2025</p>

      <h3>{t('delivery.sections.howItWorks.title')}</h3>
      <p>{t('delivery.sections.howItWorks.body')}</p>

      <h3>{t('delivery.sections.timeline.title')}</h3>
      <p>{t('delivery.sections.timeline.body')}</p>

      <h3>{t('delivery.sections.failures.title')}</h3>
      <p>{t('delivery.sections.failures.body')}</p>

      <h3>{t('delivery.sections.contact.title')}</h3>
      <p>{t('delivery.sections.contact.body')}</p>
    </article>
  );
}
```

---

# 📜 `src/app/(marketing)/[locale]/(legal)/terms/page.tsx`
```tsx
import { getTranslations } from 'next-intl/server';

export default async function TermsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  return (
    <article>
      <h2>{t('terms.title')}</h2>
      <p className="text-sm opacity-70">{t('common.lastUpdated')} 30.09.2025</p>

      <h3>{t('terms.sections.use.title')}</h3>
      <p>{t('terms.sections.use.body')}</p>

      <h3>{t('terms.sections.pricing.title')}</h3>
      <p>{t('terms.sections.pricing.body')}</p>

      <h3>{t('terms.sections.billing.title')}</h3>
      <p>{t('terms.sections.billing.body')}</p>

      <h3>{t('terms.sections.liability.title')}</h3>
      <p>{t('terms.sections.liability.body')}</p>

      <h3>{t('terms.sections.contact.title')}</h3>
      <p>{t('terms.sections.contact.body')}</p>
    </article>
  );
}
```

---

# 🌐 Messages — `src/messages/tr/legal.json`
```json
{
  "seo": {
    "title": "Yasal Bilgiler — Gizlilik, İade, Teslimat ve Şartlar",
    "description": "Büşbüşkimki'nin gizlilik, iade/iptal, teslimat ve kullanım şartları politikaları. Dijital hizmetlerde şeffaflık ve güvenlik."
  },
  "common": { "lastUpdated": "Son güncelleme:" },
  "nav": {
    "privacy": "Gizlilik",
    "refund": "İade/İptal",
    "delivery": "Teslimat",
    "terms": "Şartlar"
  },
  "header": {
    "title": "Yasal Bilgiler",
    "subtitle": "Şeffaflık, güven ve etik ilkelere bağlıyız."
  },
  "privacy": {
    "title": "Gizlilik Politikası",
    "sections": {
      "dataWeCollect": {
        "title": "Topladığımız Veriler",
        "body": "Ad-soyad, e‑posta, ödeme sağlayıcılarıyla paylaşılan işlem bilgileri ve talebe bağlı olarak doğum tarihi gibi danışmanlık için gerekli içerikler. Çerezler üzerinden anonim analitik veriler toplanabilir."
      },
      "usage": {
        "title": "Veri Kullanımı",
        "body": "Siparişinizi işlemek, dijital içeriği teslim etmek, müşteri desteği sağlamak ve yasal yükümlülükleri yerine getirmek amacıyla kullanırız."
      },
      "cookies": {
        "title": "Çerezler",
        "body": "Deneyimi iyileştirmek için zorunlu ve analitik çerezler kullanabiliriz. Tarayıcınızdan çerez tercihlerinizi yönetebilirsiniz."
      },
      "thirdParties": {
        "title": "Üçüncü Taraflar",
        "body": "Ödemeler 2Checkout (Verifone) veya diğer işlemciler aracılığıyla alınabilir; bu tarafların kendi gizlilik politikaları geçerlidir."
      },
      "rights": {
        "title": "Haklarınız",
        "body": "Verilerinize erişme, düzeltme, silme ve işlemeyi kısıtlama haklarına sahipsiniz. Talepler için iletişime geçebilirsiniz."
      },
      "contact": {
        "title": "İletişim",
        "body": "Sorularınız için support@busbuskimki.com adresine yazabilirsiniz."
      }
    }
  },
  "refund": {
    "title": "İade/İptal Politikası",
    "sections": {
      "scope": { "title": "Kapsam", "body": "Bu politika, Büşbüşkimki tarafından sunulan dijital rehberlik hizmetleri (tarot okuması, numeroloji analizi, PDF/SES teslimleri vb.) için geçerlidir." },
      "satisfaction": {
        "title": "Memnuniyet ve İade",
        "items": [
          "Satın alma tarihinden itibaren 14 gün içinde bize yazın; inceleme sonrası tam iade veya kredi sunabiliriz.",
          "Teslim edilmemiş ya da hizmet başlatılmamış siparişler için koşulsuz iade yapılır.",
          "Kişiselleştirilmiş içerik teslim edildiyse iade talepleri hizmetin niteliği gereği duruma göre değerlendirilir."
        ]
      },
      "delivery": { "title": "Teslimat", "body": "Dijital teslimatlar genellikle 24 saat içinde e‑posta ile yapılır. Gecikme yaşanırsa iade veya kredi seçeneği sunarız." },
      "subscriptions": { "title": "Abonelikler (Varsa)", "body": "Yinelenen ödemelerde, yenilemeden önce iptal eden müşteriler bir sonraki dönem için ücretlendirilmez. Yenilenmiş dönemler için kısmi iade yapılmaz." },
      "contact": { "title": "İletişim", "body": "Tüm iade talepleri için sipariş numaranızla birlikte support@busbuskimki.com adresine yazın." },
      "note": "Not: 2Checkout, iade taleplerini öncelikle satıcıya yönlendirir; ancak gerekli durumlarda doğrudan iade yapma hakkını saklı tutar."
    }
  },
  "delivery": {
    "title": "Teslimat Bilgisi",
    "sections": {
      "howItWorks": { "title": "Nasıl Çalışır?", "body": "Ödeme onayından sonra siparişiniz kuyruğa alınır. İçerik hazırlandığında kayıtlı e‑postanıza PDF ve/veya ses dosyası olarak gönderilir." },
      "timeline": { "title": "Zamanlama", "body": "Standart teslim süremiz 24 saattir. Yoğun dönemlerde kısa gecikmeler olabilir; bu durumda bilgilendirme yapılır." },
      "failures": { "title": "Teslim Sorunları", "body": "E‑posta kutunuzda görünmüyorsa spam klasörünü kontrol edin. Yine ulaşmadıysa bizimle iletişime geçin; gerekirse alternatif teslim yöntemleri sunarız." },
      "contact": { "title": "İletişim", "body": "Teslimatla ilgili tüm sorular için support@busbuskimki.com." }
    }
  },
  "terms": {
    "title": "Kullanım Şartları",
    "sections": {
      "use": { "title": "Hizmetin Kullanımı", "body": "Hizmetler kişisel kullanım içindir; yasa dışı, taciz edici veya fikri hakları ihlal eden faaliyetlerde kullanılamaz." },
      "pricing": { "title": "Fiyatlandırma ve Vergiler", "body": "Fiyatlar EUR cinsindendir; geçerli vergiler ödeme sırasında görüntülenir." },
      "billing": { "title": "Faturalandırma ve Ödemeler", "body": "Ödemeler üçüncü taraf işlemciler (örn. 2Checkout) üzerinden güvenli şekilde alınır. Başarısız ödemelerde sipariş işleme alınmayabilir." },
      "liability": { "title": "Sorumluluk Sınırlaması", "body": "Dolaylı zararlar veya veri kaybından sorumlu değiliz; zorunlu tüketici hakları saklıdır." },
      "contact": { "title": "İletişim", "body": "Şartlarla ilgili sorular için support@busbuskimki.com." }
    }
  }
}
```

---

# 🌐 Messages — `src/messages/en/legal.json`
```json
{
  "seo": {
    "title": "Legal — Privacy, Refund, Delivery & Terms",
    "description": "Büşbüşkimki policies: privacy, refund/cancellation, delivery and terms for digital services."
  },
  "common": { "lastUpdated": "Last updated:" },
  "nav": {
    "privacy": "Privacy",
    "refund": "Refund/Cancellation",
    "delivery": "Delivery",
    "terms": "Terms"
  },
  "header": {
    "title": "Legal Information",
    "subtitle": "We value transparency, trust and ethics."
  },
  "privacy": {
    "title": "Privacy Policy",
    "sections": {
      "dataWeCollect": {
        "title": "Data We Collect",
        "body": "Name, email, transaction details shared with payment processors, and—when provided—context needed for guidance (e.g., birth date). Anonymous analytics via cookies may be used."
      },
      "usage": {
        "title": "How We Use Data",
        "body": "We use your data to process orders, deliver digital content, provide support, and meet legal obligations."
      },
      "cookies": {
        "title": "Cookies",
        "body": "We may use essential and analytics cookies to improve your experience. You can manage preferences in your browser."
      },
      "thirdParties": {
        "title": "Third Parties",
        "body": "Payments may be processed by 2Checkout (Verifone) or others; their privacy policies apply."
      },
      "rights": {
        "title": "Your Rights",
        "body": "You may request access, correction, deletion, or restriction of your personal data."
      },
      "contact": {
        "title": "Contact",
        "body": "Email support@busbuskimki.com for any privacy questions."
      }
    }
  },
  "refund": {
    "title": "Refund/Cancellation Policy",
    "sections": {
      "scope": { "title": "Scope", "body": "This policy applies to digital guidance services provided by Büşbüşkimki (tarot readings, numerology analyses, PDF/VOICE deliveries, etc.)." },
      "satisfaction": {
        "title": "Satisfaction & Refunds",
        "items": [
          "Contact us within 14 days of purchase; after review, we may offer a full refund or store credit.",
          "Orders not delivered or not started are fully refundable.",
          "For personalized content already delivered, refunds are assessed case-by-case due to the nature of the service."
        ]
      },
      "delivery": { "title": "Delivery", "body": "Digital orders are typically delivered via email within 24 hours. In case of delays, we will offer a refund or credit." },
      "subscriptions": { "title": "Subscriptions (If Any)", "body": "Cancel before renewal to avoid future charges. No partial refunds on already-renewed periods." },
      "contact": { "title": "Contact", "body": "Email support@busbuskimki.com with your order number for any refund request." },
      "note": "Note: 2Checkout endeavors to refer refund requests to the seller but reserves the right to issue a refund when necessary."
    }
  },
  "delivery": {
    "title": "Delivery Information",
    "sections": {
      "howItWorks": { "title": "How It Works", "body": "After payment confirmation, your order enters our queue. Once prepared, it is sent to your registered email as a PDF and/or audio file." },
      "timeline": { "title": "Timeline", "body": "Standard delivery is within 24 hours. Minor delays may occur during peak times; we will inform you." },
      "failures": { "title": "Delivery Issues", "body": "If you can’t find it, check spam. If still missing, contact us and we’ll provide an alternative delivery method." },
      "contact": { "title": "Contact", "body": "For delivery-related questions, email support@busbuskimki.com." }
    }
  },
  "terms": {
    "title": "Terms of Use",
    "sections": {
      "use": { "title": "Use of Service", "body": "Services are for personal use and must not be used for unlawful, abusive, or IP-infringing activities." },
      "pricing": { "title": "Pricing & Taxes", "body": "Prices are in EUR; applicable taxes are shown at checkout." },
      "billing": { "title": "Billing & Payments", "body": "Payments are processed via third-party processors (e.g., 2Checkout). Orders may not be fulfilled if payment fails." },
      "liability": { "title": "Limitation of Liability", "body": "We are not liable for indirect damages or data loss; mandatory consumer rights remain unaffected." },
      "contact": { "title": "Contact", "body": "For questions about these terms, email support@busbuskimki.com." }
    }
  }
}
```

---

# 🧩 Footer link örneği (RSC component)
```tsx
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function LegalFooter({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  return (
    <div className="mt-10 text-xs text-neutral-400">
      <div className="flex flex-wrap gap-4">
        <Link href={`/${params.locale}/legal/privacy`}>{t('nav.privacy')}</Link>
        <span>•</span>
        <Link href={`/${params.locale}/legal/refund`}>{t('nav.refund')}</Link>
        <span>•</span>
        <Link href={`/${params.locale}/legal/delivery`}>{t('nav.delivery')}</Link>
        <span>•</span>
        <Link href={`/${params.locale}/legal/terms`}>{t('nav.terms')}</Link>
      </div>
      <p className="mt-2">© {new Date().getFullYear()} Büşbüşkimki</p>
    </div>
  );
}
```

---

# ✅ Kurulum notları
1) **Paketler**
```bash
pnpm add next-intl
```

2) **Middleware** (zaten varsa düzenleyin)
```ts
// src/middleware.ts (örnek)
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/lib/i18n/routing';

export default createMiddleware({
  locales,
  defaultLocale
});

export const config = {
  matcher: ['/', '/(tr|en)/:path*']
};
```

3) **Provider kullanımı**
- (marketing) layout’unuzda `IntlProvider` ile `getMessages()` kullanabilirsiniz. Örn:
```tsx
// src/app/(marketing)/[locale]/layout.tsx
import { getMessages } from 'next-intl/server';
import IntlProvider from '@/providers/IntlProvider';
import './globals.css';

export default async function MarketingLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages();
  return (
    <html lang={params.locale}>
      <body className="bg-[#0B1220] text-white">
        <IntlProvider locale={params.locale} messages={messages}>
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}
```

4) **A11y & Stil**
- Renkler Tarot UX paletinize uygun (bg `#0B1220`).
- Linkler belirgin, fokus stilleri Tailwind ile görünür.

5) **Stripe/2CO için görünürlük**
- Footer’dan linkli dört sayfa zorunlu/önerilen: **Privacy**, **Refund**, **Delivery**, **Terms**.
- “İade notu” 2CO beklentisiyle uyumlu tutuldu.

> İsterseniz bu sayfaları MDX’e taşıyıp (içerik ekibi rahat güncellesin diye) CMS entegrasyonuna da hazırlayabiliriz.
