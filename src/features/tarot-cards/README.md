# Tarot Cards Feature Module

Bu modül, tarot kartları için SEO optimize edilmiş, çok dilli bilgi sayfaları
oluşturur. Next.js App Router, next-intl ve Supabase kullanarak 78 tarot kartı
için dinamik sayfalar sağlar.

## 🎯 Özellikler

- **78 Tarot Kartı**: Major Arcana (22) + Minor Arcana (56) tam desteği
- **Çok Dilli Destek**: Türkçe (TR), İngilizce (EN), Sırpça (SR)
- **SEO Optimizasyonu**: Meta tags, structured data, sitemap
- **Responsive Tasarım**: Mobile-first yaklaşım
- **Performance**: Core Web Vitals uyumlu
- **Type Safety**: TypeScript strict mode

## 📁 Dosya Yapısı

```
src/features/tarot-cards/
├── components/
│   ├── CardPage.tsx          # Ana sayfa component'i
│   ├── CardHero.tsx          # Hero section
│   ├── CardMeanings.tsx      # Kart anlamları
│   ├── CardKeywords.tsx      # Anahtar kelimeler
│   ├── CardStory.tsx         # Kart hikayesi
│   ├── CardCTA.tsx           # Call-to-action
│   ├── CardFAQ.tsx           # Sıkça sorulan sorular
│   └── RelatedCards.tsx     # İlgili kartlar
├── lib/
│   ├── card-data.ts          # Veri servisi
│   ├── card-seo.ts           # SEO servisi
│   └── card-mapping.ts       # Kart eşleştirme
└── index.ts                  # Export dosyası
```

## 🚀 Kullanım

### Temel Kullanım

```tsx
import { CardPage } from '@/features/tarot-cards/components/CardPage';
import { CardPageData } from '@/types/tarot-cards';

const cardData: CardPageData = {
  card: tarotCard,
  content: cardContent,
  seo: cardSEO,
  relatedCards: relatedCardsArray,
};

<CardPage card={cardData} locale="tr" />;
```

### Component'leri Ayrı Ayrı Kullanma

```tsx
import { CardHero } from '@/features/tarot-cards/components/CardHero';
import { CardMeanings } from '@/features/tarot-cards/components/CardMeanings';

<CardHero card={card} content={content} locale="tr" />
<CardMeanings content={content} locale="tr" />
```

## 🌐 Çok Dilli Destek

### Desteklenen Diller

- **Türkçe (tr)**: Ana dil
- **İngilizce (en)**: Uluslararası erişim
- **Sırpça (sr)**: Balkan pazarı

### URL Yapısı

```
/tr/kartlar/joker          # Türkçe
/en/cards/the-fool         # İngilizce
/sr/kartice/budala         # Sırpça
```

## 📊 SEO Özellikleri

### Meta Tags

- **Title**: Kart adı + açıklama (max 60 karakter)
- **Description**: Detaylı açıklama (120-160 karakter)
- **Keywords**: İlgili anahtar kelimeler

### Structured Data

- **Article**: Kart bilgileri için
- **FAQPage**: Sıkça sorulan sorular için
- **BreadcrumbList**: Navigasyon için

### Performance

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

## 🧪 Testler

### Test Kategorileri

- **Unit Tests**: Component'ler için
- **Integration Tests**: API entegrasyonu için
- **Performance Tests**: Core Web Vitals için
- **SEO Tests**: Lighthouse audit için

### Test Çalıştırma

```bash
# Tüm testler
npm test

# Sadece component testleri
npm test -- --testPathPattern=components

# Performance testleri
npm test -- --testPathPattern=performance

# SEO testleri
npm test -- --testPathPattern=seo
```

## 📈 Performance Optimizasyonu

### Image Optimization

- **Next.js Image**: Otomatik optimizasyon
- **WebP Format**: Modern format desteği
- **Lazy Loading**: Görüntü yükleme optimizasyonu

### Code Splitting

- **Dynamic Imports**: Component'ler için
- **Route-based**: Sayfa bazlı bölme
- **Bundle Analysis**: Paket boyutu analizi

### Caching

- **Static Generation**: Build-time oluşturma
- **ISR**: Incremental Static Regeneration
- **CDN**: Content Delivery Network

## 🔧 Geliştirme

### Gereksinimler

- Node.js 18+
- Next.js 15.5.4+
- TypeScript 5.9.2+
- React 18.3.1+

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

### Yeni Kart Ekleme

1. `messages/tr.json` dosyasına kart bilgilerini ekle
2. `BlogCardService`'i güncelle
3. `generateStaticParams`'ı güncelle
4. Testleri çalıştır

## 📝 API Referansı

### CardPageData Interface

```typescript
interface CardPageData {
  card: TarotCard;
  content: CardContent;
  seo: CardSEO;
  relatedCards: TarotCard[];
}
```

### TarotCard Interface

```typescript
interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  nameSr: string;
  slug: string;
  slugEn: string;
  slugSr: string;
  imageUrl: string;
  arcanaType: 'major' | 'minor';
  number: number;
  suit: string | null;
  element: string;
  planet: string;
  zodiac: string;
  keywords: string[];
  description: string;
  uprightMeaning: string;
  reversedMeaning: string;
  relatedCards: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### CardContent Interface

```typescript
interface CardContent {
  id: string;
  cardId: string;
  locale: 'tr' | 'en' | 'sr';
  title: string;
  description: string;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  loveInterpretation: string;
  careerInterpretation: string;
  moneyInterpretation: string;
  spiritualInterpretation: string;
  story: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### CardSEO Interface

```typescript
interface CardSEO {
  id: string;
  cardId: string;
  locale: 'tr' | 'en' | 'sr';
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  structuredData: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🐛 Sorun Giderme

### Yaygın Sorunlar

#### 1. Kart Görüntülenmiyor

- `imageUrl` yolunu kontrol et
- `public/cards/rws/` klasöründe dosya var mı?
- Next.js Image component kullanılıyor mu?

#### 2. SEO Meta Tags Eksik

- `CardSEO` servisini kontrol et
- Structured data doğru mu?
- Meta title/description uzunluğu uygun mu?

#### 3. Çok Dilli İçerik Eksik

- `messages/tr.json` dosyasında veri var mı?
- Locale doğru mu?
- `CardMapping` servisi çalışıyor mu?

#### 4. Performance Sorunları

- Image optimization aktif mi?
- Code splitting yapılmış mı?
- Bundle size kontrol edildi mi?

### Debug Araçları

```bash
# Bundle analyzer
npm run analyze

# Lighthouse audit
npm run lighthouse

# Performance profiling
npm run profile
```

## 📚 Kaynaklar

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına
bakın.

## 📞 İletişim

- **Proje**: [Busbuskimki.com](https://busbuskimki.com)
- **Email**: info@busbuskimki.com
- **GitHub**: [Repository](https://github.com/busbuskimki/tarot-cards)

---

**Son Güncelleme**: 2025-01-27  
**Versiyon**: 1.0.0  
**Durum**: Production Ready ✅
