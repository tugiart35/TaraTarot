# Tarot Cards API Documentation

Bu dokümantasyon, tarot kartları için kullanılan API endpoint'lerini ve veri
yapılarını açıklar.

## 📋 İçindekiler

- [Genel Bakış](#genel-bakış)
- [API Endpoints](#api-endpoints)
- [Veri Yapıları](#veri-yapıları)
- [Hata Kodları](#hata-kodları)
- [Örnekler](#örnekler)
- [Rate Limiting](#rate-limiting)

## 🌐 Genel Bakış

Tarot Cards API, 78 tarot kartı için çok dilli (TR/EN/SR) veri sağlar. RESTful
API tasarımı kullanır ve JSON formatında yanıt döner.

### Base URL

```
https://busbuskimki.com/api/cards
```

### Desteklenen Diller

- `tr` - Türkçe
- `en` - İngilizce
- `sr` - Sırpça

## 🔗 API Endpoints

### 1. Kart Listesi

**Endpoint**: `GET /api/cards/{locale}`

**Açıklama**: Belirtilen dildeki tüm tarot kartlarının listesini döner.

**Parametreler**:

- `locale` (string, required): Dil kodu (tr/en/sr)

**Yanıt**:

```json
{
  "success": true,
  "data": [
    {
      "id": "the-fool",
      "name": "Joker",
      "slug": "joker",
      "imageUrl": "/cards/rws/TheFool.jpg",
      "arcanaType": "major",
      "number": 0,
      "element": "Air",
      "keywords": ["new beginnings", "innocence", "spontaneity"]
    }
  ],
  "meta": {
    "total": 78,
    "locale": "tr"
  }
}
```

### 2. Kart Detayı

**Endpoint**: `GET /api/cards/{locale}/{slug}`

**Açıklama**: Belirli bir kartın detaylı bilgilerini döner.

**Parametreler**:

- `locale` (string, required): Dil kodu (tr/en/sr)
- `slug` (string, required): Kart slug'ı

**Yanıt**:

```json
{
  "success": true,
  "data": {
    "card": {
      "id": "the-fool",
      "name": "Joker",
      "slug": "joker",
      "imageUrl": "/cards/rws/TheFool.jpg",
      "arcanaType": "major",
      "number": 0,
      "suit": null,
      "element": "Air",
      "planet": "Uranus",
      "zodiac": "Aquarius",
      "keywords": ["new beginnings", "innocence", "spontaneity"],
      "description": "The Fool represents new beginnings and infinite potential.",
      "uprightMeaning": "New beginnings, spontaneity, innocence, and infinite potential await you.",
      "reversedMeaning": "Recklessness, lack of direction, and missed opportunities.",
      "relatedCards": ["the-magician", "the-world"]
    },
    "content": {
      "id": "the-fool-content",
      "cardId": "the-fool",
      "locale": "tr",
      "title": "Joker Kartı",
      "description": "Joker kartı yeni başlangıçları ve sonsuz potansiyeli temsil eder.",
      "uprightMeaning": "Yeni başlangıçlar, spontanlık, masumiyet ve sonsuz potansiyel sizi bekliyor.",
      "reversedMeaning": "Düşüncesizlik, yön eksikliği ve kaçırılan fırsatlar.",
      "keywords": ["yeni başlangıçlar", "masumiyet", "spontanlık"],
      "loveInterpretation": "Aşk hayatınızda yeni bir başlangıç yapma zamanı.",
      "careerInterpretation": "Kariyerinizde yeni fırsatlar ve yollar açılacak.",
      "moneyInterpretation": "Finansal konularda dikkatli olun, yeni yatırımlar yapabilirsiniz.",
      "spiritualInterpretation": "Ruhsal yolculuğunuzda yeni bir dönem başlıyor.",
      "story": "Joker kartı, masumiyet ve yeni başlangıçların sembolüdür.",
      "readingTime": 5
    },
    "seo": {
      "id": "the-fool-seo",
      "cardId": "the-fool",
      "locale": "tr",
      "metaTitle": "Joker Kartı - Tarot Anlamları ve Yorumları | Busbuskimki",
      "metaDescription": "Joker kartının anlamları, yorumları ve tarot okumalarında nasıl yorumlanacağı hakkında detaylı bilgiler.",
      "keywords": ["joker kartı", "tarot", "anlamlar", "yorumlar"],
      "faq": [
        {
          "question": "Joker kartı ne anlama gelir?",
          "answer": "Joker kartı yeni başlangıçları, masumiyeti ve sonsuz potansiyeli temsil eder."
        }
      ]
    },
    "relatedCards": [
      {
        "id": "the-magician",
        "name": "Büyücü",
        "slug": "buyucu",
        "imageUrl": "/cards/rws/TheMagician.jpg",
        "arcanaType": "major",
        "number": 1
      }
    ]
  }
}
```

### 3. İlgili Kartlar

**Endpoint**: `GET /api/cards/{cardId}/related`

**Açıklama**: Belirli bir kartla ilgili diğer kartları döner.

**Parametreler**:

- `cardId` (string, required): Kart ID'si

**Yanıt**:

```json
{
  "success": true,
  "data": [
    {
      "id": "the-magician",
      "name": "Büyücü",
      "slug": "buyucu",
      "imageUrl": "/cards/rws/TheMagician.jpg",
      "arcanaType": "major",
      "number": 1,
      "relevanceScore": 0.85
    }
  ],
  "meta": {
    "cardId": "the-fool",
    "total": 3
  }
}
```

## 📊 Veri Yapıları

### TarotCard Interface

```typescript
interface TarotCard {
  id: string; // Benzersiz kart ID'si
  name: string; // Kart adı (TR)
  nameEn: string; // Kart adı (EN)
  nameSr: string; // Kart adı (SR)
  slug: string; // URL slug (TR)
  slugEn: string; // URL slug (EN)
  slugSr: string; // URL slug (SR)
  imageUrl: string; // Kart görseli URL'i
  arcanaType: 'major' | 'minor'; // Arcana türü
  number: number; // Kart numarası
  suit: string | null; // Takım (Minor Arcana için)
  element: string; // Element
  planet: string; // Gezegen
  zodiac: string; // Burç
  keywords: string[]; // Anahtar kelimeler
  description: string; // Kısa açıklama
  uprightMeaning: string; // Düz anlam
  reversedMeaning: string; // Ters anlam
  relatedCards: string[]; // İlgili kart ID'leri
  createdAt: Date; // Oluşturulma tarihi
  updatedAt: Date; // Güncellenme tarihi
}
```

### CardContent Interface

```typescript
interface CardContent {
  id: string; // İçerik ID'si
  cardId: string; // Kart ID'si
  locale: 'tr' | 'en' | 'sr'; // Dil kodu
  title: string; // Başlık
  description: string; // Açıklama
  uprightMeaning: string; // Düz anlam
  reversedMeaning: string; // Ters anlam
  keywords: string[]; // Anahtar kelimeler
  loveInterpretation: string; // Aşk yorumu
  careerInterpretation: string; // Kariyer yorumu
  moneyInterpretation: string; // Para yorumu
  spiritualInterpretation: string; // Ruhsal yorum
  story: string; // Kart hikayesi
  readingTime: number; // Okuma süresi (dakika)
  createdAt: Date; // Oluşturulma tarihi
  updatedAt: Date; // Güncellenme tarihi
}
```

### CardSEO Interface

```typescript
interface CardSEO {
  id: string; // SEO ID'si
  cardId: string; // Kart ID'si
  locale: 'tr' | 'en' | 'sr'; // Dil kodu
  metaTitle: string; // Meta başlık
  metaDescription: string; // Meta açıklama
  keywords: string[]; // SEO anahtar kelimeler
  faq: Array<{
    // Sıkça sorulan sorular
    question: string;
    answer: string;
  }>;
  structuredData: Record<string, any>; // Yapılandırılmış veri
  createdAt: Date; // Oluşturulma tarihi
  updatedAt: Date; // Güncellenme tarihi
}
```

## ❌ Hata Kodları

### HTTP Status Kodları

| Kod | Açıklama       |
| --- | -------------- |
| 200 | Başarılı       |
| 400 | Geçersiz istek |
| 404 | Bulunamadı     |
| 500 | Sunucu hatası  |

### Hata Yanıt Formatı

```json
{
  "success": false,
  "error": {
    "code": "CARD_NOT_FOUND",
    "message": "Kart bulunamadı",
    "details": "Belirtilen slug ile kart bulunamadı"
  },
  "meta": {
    "timestamp": "2025-01-27T10:00:00Z",
    "requestId": "req_123456"
  }
}
```

### Hata Kodları Listesi

| Kod                       | Açıklama                  |
| ------------------------- | ------------------------- |
| `INVALID_LOCALE`          | Geçersiz dil kodu         |
| `CARD_NOT_FOUND`          | Kart bulunamadı           |
| `INVALID_SLUG`            | Geçersiz slug             |
| `CONTENT_NOT_FOUND`       | İçerik bulunamadı         |
| `SEO_NOT_FOUND`           | SEO verisi bulunamadı     |
| `RELATED_CARDS_NOT_FOUND` | İlgili kartlar bulunamadı |

## 💡 Örnekler

### JavaScript Fetch

```javascript
// Kart listesi al
const response = await fetch('/api/cards/tr');
const data = await response.json();

// Kart detayı al
const cardResponse = await fetch('/api/cards/tr/joker');
const cardData = await cardResponse.json();

// İlgili kartlar al
const relatedResponse = await fetch('/api/cards/the-fool/related');
const relatedData = await relatedResponse.json();
```

### cURL

```bash
# Kart listesi
curl -X GET "https://busbuskimki.com/api/cards/tr"

# Kart detayı
curl -X GET "https://busbuskimki.com/api/cards/tr/joker"

# İlgili kartlar
curl -X GET "https://busbuskimki.com/api/cards/the-fool/related"
```

### React Hook

```typescript
import { useState, useEffect } from 'react';

function useTarotCard(locale: string, slug: string) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCard() {
      try {
        const response = await fetch(`/api/cards/${locale}/${slug}`);
        const data = await response.json();

        if (data.success) {
          setCard(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCard();
  }, [locale, slug]);

  return { card, loading, error };
}
```

## ⚡ Rate Limiting

### Limitler

- **Genel**: 1000 istek/saat
- **Kart Detayı**: 500 istek/saat
- **İlgili Kartlar**: 200 istek/saat

### Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

### Rate Limit Aşıldığında

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit aşıldı",
    "details": "Lütfen daha sonra tekrar deneyin"
  },
  "meta": {
    "retryAfter": 3600,
    "resetTime": "2025-01-27T11:00:00Z"
  }
}
```

## 🔒 Güvenlik

### CORS

- **Allowed Origins**: `https://busbuskimki.com`
- **Allowed Methods**: `GET, OPTIONS`
- **Allowed Headers**: `Content-Type, Authorization`

### Authentication

- **Public API**: Kimlik doğrulama gerekmez
- **Rate Limiting**: IP bazlı sınırlama
- **HTTPS**: Tüm istekler HTTPS üzerinden

## 📈 Performance

### Cache Headers

```
Cache-Control: public, max-age=3600
ETag: "card-123-v1"
Last-Modified: Wed, 27 Jan 2025 10:00:00 GMT
```

### Response Times

- **Kart Listesi**: < 100ms
- **Kart Detayı**: < 200ms
- **İlgili Kartlar**: < 150ms

## 🧪 Testing

### Test Endpoints

```
# Development
http://localhost:3000/api/cards/tr

# Staging
https://staging.busbuskimki.com/api/cards/tr

# Production
https://busbuskimki.com/api/cards/tr
```

### Test Data

```json
{
  "testCards": [
    {
      "id": "the-fool",
      "slug": "joker",
      "locale": "tr"
    },
    {
      "id": "the-magician",
      "slug": "buyucu",
      "locale": "tr"
    }
  ]
}
```

## 📞 Destek

### İletişim

- **Email**: api@busbuskimki.com
- **GitHub**: [API Issues](https://github.com/busbuskimki/api/issues)
- **Documentation**: [API Docs](https://docs.busbuskimki.com)

### Changelog

- **v1.0.0** (2025-01-27): İlk sürüm
- **v1.1.0** (2025-02-01): İlgili kartlar endpoint'i eklendi
- **v1.2.0** (2025-02-15): SEO verisi eklendi

---

**Son Güncelleme**: 2025-01-27  
**API Versiyon**: v1.0.0  
**Durum**: Production Ready ✅
