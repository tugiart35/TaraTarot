# i18n Translation Keys: Tarot Kart Bilgi Sayfaları

**Feature**: 001-i-in-projeyi **Date**: 2025-10-05 **Purpose**: Tüm UI metinleri
için translation key tanımları

---

## Translation Key Structure

**Naming Convention**: `{section}.{component}.{element}`

**Example**: `cards.cta.getProfessionalReading` → "Profesyonel Okuma Al"

---

## Required Translation Keys

### 1. Card Page - General Labels

```json
{
  "cards": {
    "hero": {
      "readingTime": "Okuma: {minutes} dk"
    },
    "breadcrumb": {
      "home": "Anasayfa",
      "cards": "Kartlar",
      "majorArcana": "Major Arcana",
      "minorArcana": "Minor Arcana",
      "cups": "Kupalar",
      "swords": "Kılıçlar",
      "wands": "Asalar",
      "pentacles": "Tılsımlar"
    }
  }
}
```

### 2. Card Meanings Section

```json
{
  "cards": {
    "meanings": {
      "uprightTitle": "Düz Anlam",
      "reversedTitle": "Ters Anlam",
      "keywordsTitle": "Anahtar Kelimeler"
    }
  }
}
```

### 3. Keywords (Love, Career, Money, Spiritual)

```json
{
  "cards": {
    "keywords": {
      "loveTitle": "Aşkta {cardName}",
      "careerTitle": "Kariyerde {cardName}",
      "moneyTitle": "Finansta {cardName}",
      "spiritualTitle": "Ruhsal Mesaj"
    }
  }
}
```

### 4. Story/Mythology Section

```json
{
  "cards": {
    "story": {
      "title": "Hikaye ve Mitoloji",
      "positionsTitle": "Kartın Pozisyonları"
    }
  }
}
```

### 5. CTA Buttons

```json
{
  "cards": {
    "cta": {
      "getProfessionalReading": "Profesyonel Okuma Al",
      "bookAppointment": "Randevu Al",
      "quickInterpretation": "1 Karta Hızlı Yorum Al",
      "voiceReading": "Sesli Okuma Al",
      "writtenReading": "Yazılı Okuma Al"
    }
  }
}
```

### 6. FAQ Section

```json
{
  "cards": {
    "faq": {
      "title": "Sık Sorulan Sorular",
      "showMore": "Daha Fazla Göster",
      "showLess": "Daha Az Göster"
    }
  }
}
```

### 7. Related Cards Section

```json
{
  "cards": {
    "related": {
      "title": "İlgili Kartlar",
      "subtitle": "Benzer Anlam ve Enerji Taşıyan Kartlar",
      "viewDetails": "Detay Gör",
      "noRelatedCards": "İlgili kart bulunamadı"
    }
  }
}
```

### 8. Social Sharing

```json
{
  "cards": {
    "share": {
      "title": "Paylaş",
      "facebook": "Facebook'ta Paylaş",
      "twitter": "Twitter'da Paylaş",
      "whatsapp": "WhatsApp'ta Paylaş",
      "copyLink": "Linki Kopyala",
      "linkCopied": "Link kopyalandı!"
    }
  }
}
```

### 9. 404 Error Page

```json
{
  "cards": {
    "notFound": {
      "title": "Kart Bulunamadı",
      "message": "Aradığınız tarot kartı mevcut değil.",
      "suggestedTitle": "Benzer Kartlar",
      "backToCards": "Tüm Kartlara Dön"
    }
  }
}
```

### 10. Loading & Error States

```json
{
  "cards": {
    "loading": {
      "loadingCard": "Kart yükleniyor...",
      "loadingImage": "Görsel yükleniyor...",
      "loadingRelated": "İlgili kartlar yükleniyor..."
    },
    "error": {
      "imageLoadFailed": "Görsel yüklenemedi",
      "contentLoadFailed": "İçerik yüklenemedi",
      "tryAgain": "Tekrar Dene"
    }
  }
}
```

---

## Complete TR Translation File

**File**: `src/messages/tr.json`

```json
{
  "cards": {
    "hero": {
      "readingTime": "Okuma: {minutes} dk"
    },
    "breadcrumb": {
      "home": "Anasayfa",
      "cards": "Kartlar",
      "majorArcana": "Major Arcana",
      "minorArcana": "Minor Arcana",
      "cups": "Kupalar",
      "swords": "Kılıçlar",
      "wands": "Asalar",
      "pentacles": "Tılsımlar"
    },
    "meanings": {
      "uprightTitle": "Düz Anlam",
      "reversedTitle": "Ters Anlam",
      "keywordsTitle": "Anahtar Kelimeler"
    },
    "keywords": {
      "loveTitle": "Aşkta {cardName}",
      "careerTitle": "Kariyerde {cardName}",
      "moneyTitle": "Finansta {cardName}",
      "spiritualTitle": "Ruhsal Mesaj"
    },
    "story": {
      "title": "Hikaye ve Mitoloji",
      "positionsTitle": "Kartın Pozisyonları"
    },
    "cta": {
      "getProfessionalReading": "Profesyonel Okuma Al",
      "bookAppointment": "Randevu Al",
      "quickInterpretation": "1 Karta Hızlı Yorum Al",
      "voiceReading": "Sesli Okuma Al",
      "writtenReading": "Yazılı Okuma Al"
    },
    "faq": {
      "title": "Sık Sorulan Sorular",
      "showMore": "Daha Fazla Göster",
      "showLess": "Daha Az Göster"
    },
    "related": {
      "title": "İlgili Kartlar",
      "subtitle": "Benzer Anlam ve Enerji Taşıyan Kartlar",
      "viewDetails": "Detay Gör",
      "noRelatedCards": "İlgili kart bulunamadı"
    },
    "share": {
      "title": "Paylaş",
      "facebook": "Facebook'ta Paylaş",
      "twitter": "Twitter'da Paylaş",
      "whatsapp": "WhatsApp'ta Paylaş",
      "copyLink": "Linki Kopyala",
      "linkCopied": "Link kopyalandı!"
    },
    "notFound": {
      "title": "Kart Bulunamadı",
      "message": "Aradığınız tarot kartı mevcut değil.",
      "suggestedTitle": "Benzer Kartlar",
      "backToCards": "Tüm Kartlara Dön"
    },
    "loading": {
      "loadingCard": "Kart yükleniyor...",
      "loadingImage": "Görsel yükleniyor...",
      "loadingRelated": "İlgili kartlar yükleniyor..."
    },
    "error": {
      "imageLoadFailed": "Görsel yüklenemedi",
      "contentLoadFailed": "İçerik yüklenemedi",
      "tryAgain": "Tekrar Dene"
    }
  }
}
```

---

## Complete EN Translation File

**File**: `src/messages/en.json`

```json
{
  "cards": {
    "hero": {
      "readingTime": "Reading time: {minutes} min"
    },
    "breadcrumb": {
      "home": "Home",
      "cards": "Cards",
      "majorArcana": "Major Arcana",
      "minorArcana": "Minor Arcana",
      "cups": "Cups",
      "swords": "Swords",
      "wands": "Wands",
      "pentacles": "Pentacles"
    },
    "meanings": {
      "uprightTitle": "Upright Meaning",
      "reversedTitle": "Reversed Meaning",
      "keywordsTitle": "Keywords"
    },
    "keywords": {
      "loveTitle": "{cardName} in Love",
      "careerTitle": "{cardName} in Career",
      "moneyTitle": "{cardName} in Finances",
      "spiritualTitle": "Spiritual Message"
    },
    "story": {
      "title": "Story and Mythology",
      "positionsTitle": "Card Positions"
    },
    "cta": {
      "getProfessionalReading": "Get Professional Reading",
      "bookAppointment": "Book Appointment",
      "quickInterpretation": "Get Quick 1-Card Interpretation",
      "voiceReading": "Get Voice Reading",
      "writtenReading": "Get Written Reading"
    },
    "faq": {
      "title": "Frequently Asked Questions",
      "showMore": "Show More",
      "showLess": "Show Less"
    },
    "related": {
      "title": "Related Cards",
      "subtitle": "Cards with Similar Meaning and Energy",
      "viewDetails": "View Details",
      "noRelatedCards": "No related cards found"
    },
    "share": {
      "title": "Share",
      "facebook": "Share on Facebook",
      "twitter": "Share on Twitter",
      "whatsapp": "Share on WhatsApp",
      "copyLink": "Copy Link",
      "linkCopied": "Link copied!"
    },
    "notFound": {
      "title": "Card Not Found",
      "message": "The tarot card you're looking for doesn't exist.",
      "suggestedTitle": "Similar Cards",
      "backToCards": "Back to All Cards"
    },
    "loading": {
      "loadingCard": "Loading card...",
      "loadingImage": "Loading image...",
      "loadingRelated": "Loading related cards..."
    },
    "error": {
      "imageLoadFailed": "Image failed to load",
      "contentLoadFailed": "Content failed to load",
      "tryAgain": "Try Again"
    }
  }
}
```

---

## Complete SR Translation File

**File**: `src/messages/sr.json`

```json
{
  "cards": {
    "hero": {
      "readingTime": "Vreme čitanja: {minutes} min"
    },
    "breadcrumb": {
      "home": "Početna",
      "cards": "Kartice",
      "majorArcana": "Major Arcana",
      "minorArcana": "Minor Arcana",
      "cups": "Pehare",
      "swords": "Mačevi",
      "wands": "Štapovi",
      "pentacles": "Pentakli"
    },
    "meanings": {
      "uprightTitle": "Uspravno Značenje",
      "reversedTitle": "Obrnuto Značenje",
      "keywordsTitle": "Ključne Reči"
    },
    "keywords": {
      "loveTitle": "{cardName} u Ljubavi",
      "careerTitle": "{cardName} u Karijeri",
      "moneyTitle": "{cardName} u Finansijama",
      "spiritualTitle": "Duhovna Poruka"
    },
    "story": {
      "title": "Priča i Mitologija",
      "positionsTitle": "Pozicije Kartice"
    },
    "cta": {
      "getProfessionalReading": "Dobijte Profesionalno Čitanje",
      "bookAppointment": "Zakazite Termin",
      "quickInterpretation": "Brza Interpretacija 1 Kartice",
      "voiceReading": "Glasovno Čitanje",
      "writtenReading": "Pisano Čitanje"
    },
    "faq": {
      "title": "Često Postavljana Pitanja",
      "showMore": "Prikaži Više",
      "showLess": "Prikaži Manje"
    },
    "related": {
      "title": "Povezane Kartice",
      "subtitle": "Kartice sa Sličnim Značenjem i Energijom",
      "viewDetails": "Vidi Detalje",
      "noRelatedCards": "Nema povezanih kartica"
    },
    "share": {
      "title": "Podeli",
      "facebook": "Podeli na Facebook-u",
      "twitter": "Podeli na Twitter-u",
      "whatsapp": "Podeli na WhatsApp-u",
      "copyLink": "Kopiraj Link",
      "linkCopied": "Link kopiran!"
    },
    "notFound": {
      "title": "Kartica Nije Pronađena",
      "message": "Tarot kartica koju tražite ne postoji.",
      "suggestedTitle": "Slične Kartice",
      "backToCards": "Nazad na Sve Kartice"
    },
    "loading": {
      "loadingCard": "Učitavanje kartice...",
      "loadingImage": "Učitavanje slike...",
      "loadingRelated": "Učitavanje povezanih kartica..."
    },
    "error": {
      "imageLoadFailed": "Slika nije učitana",
      "contentLoadFailed": "Sadržaj nije učitan",
      "tryAgain": "Pokušaj Ponovo"
    }
  }
}
```

---

## Usage in Components

### Example: CardCTA Component

**Bad (Hardcoded)**:

```tsx
<button>Profesyonel Okuma Al</button>
```

**Good (i18n key)**:

```tsx
import { useTranslations } from 'next-intl';

function CardCTA() {
  const t = useTranslations('cards.cta');

  return <button>{t('getProfessionalReading')}</button>;
}
```

### Example: Card Hero with Dynamic Values

```tsx
const t = useTranslations('cards.hero');

<span>{t('readingTime', { minutes: card.readingTime })}</span>;
```

---

## Implementation Checklist

- [ ] Create `src/messages/tr.json` with all keys
- [ ] Create `src/messages/en.json` with all keys
- [ ] Create `src/messages/sr.json` with all keys
- [ ] Update all components to use `useTranslations()` hook
- [ ] Remove all hardcoded strings
- [ ] Test language switching
- [ ] Validate with `npm run i18n:validate`
- [ ] Verify no missing keys in console

---

## Validation

**Command**: `npm run i18n:check`

This should detect any hardcoded UI strings and flag them as errors.

**Expected Result**: Zero hardcoded strings, all text via translation keys.
