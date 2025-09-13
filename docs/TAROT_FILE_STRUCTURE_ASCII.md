# 🃏 Tarot Dosya Yapısı - ASCII Diyagram

## 📁 Dosya Yapısı Görselleştirmesi

```
src/features/tarot/components/
│
├── 🆕 shared/                          # Yeniden kullanılabilir bileşenler
│   ├── forms/
│   │   └── TarotFormModal.tsx          # 📝 Kişisel bilgi formu
│   ├── modals/
│   │   ├── CreditConfirmModal.tsx      # 💳 Kredi onay modalı
│   │   └── SuccessModal.tsx            # ✅ Başarı modalı
│   ├── layouts/
│   │   └── TarotReadingLayout.tsx      # 🎨 Ana layout wrapper
│   ├── utils/
│   │   └── TarotReadingSaver.tsx       # 💾 Okuma kaydetme
│   └── index.ts                        # 📦 Export dosyası
│
├── 🆕 spreads/                         # Açılım türleri
│   └── love/
│       └── LoveReadingRefactored.tsx   # 💕 Yeni aşk açılımı (200 satır)
│
└── 🔄 Love-Spread/                     # Mevcut dosyalar (korundu)
    ├── LoveTarot.tsx                   # 🎯 Yeni refactor edilmiş (33 satır)
    ├── LoveTarot.tsx.backup            # 📦 Eski versiyon (1123 satır)
    ├── LoveCardRenderer.tsx            # 🃏 Kart render bileşeni
    ├── LoveInterpretation.tsx          # 📖 Yorumlama bileşeni
    ├── LoveGuidanceDetail.tsx          # 🧭 Rehberlik detay bileşeni
    └── love-config.ts                  # ⚙️ Konfigürasyon dosyası
```

## 🔄 Migration Süreci

```
ESKİ SİSTEM (v1.0)                    YENİ SİSTEM (v2.0)
┌─────────────────────┐               ┌─────────────────────┐
│ LoveTarot.tsx       │               │ LoveTarot.tsx       │
│ (1123 satır)        │    ──────►    │ (33 satır)          │
│                     │               │                     │
│ - Tüm kod tek yerde │               │ - Sadece export     │
│ - Maintainability   │               │ - Modüler yapı      │
│   düşük             │               │ - Yeniden kullanım  │
│ - Test zor          │               │ - Test kolay        │
└─────────────────────┘               └─────────────────────┘
```

## 🎯 Bileşen İlişkileri

```
LoveReadingRefactored.tsx
│
├── 🎨 TarotReadingLayout
│   ├── 📝 TarotFormModal
│   ├── 💳 CreditConfirmModal
│   ├── ✅ SuccessModal
│   └── 💾 TarotReadingSaver
│
├── 🃏 LoveCardRenderer
├── 📖 LoveInterpretation
├── 🧭 LoveGuidanceDetail
└── ⚙️ love-config.ts
```

## 🚀 Gelecek Açılım Türleri

```
spreads/
├── love/                              # ✅ Tamamlandı
│   └── LoveReadingRefactored.tsx
├── career/                            # 🔄 Planlanıyor
│   └── CareerReadingRefactored.tsx
├── general/                           # 🔄 Planlanıyor
│   └── GeneralReadingRefactored.tsx
└── future/                            # 🔄 Planlanıyor
    └── FutureReadingRefactored.tsx
```

## 📊 Performans Karşılaştırması

```
ESKİ SİSTEM                    YENİ SİSTEM
┌─────────────────┐            ┌─────────────────┐
│ 1123 satır      │            │ 200 satır       │
│ Monolitik       │            │ Modüler         │
│ Tekrar eden kod │            │ DRY prensibi    │
│ Test zor        │            │ Test kolay      │
│ Maintain zor    │            │ Maintain kolay  │
└─────────────────┘            └─────────────────┘
        │                              │
        └─────────── 82% azalma ───────┘
```

## 🔧 Geliştirme Akışı

```
1. 📋 Planlama
   ├── Tema belirleme
   ├── Bileşen tasarımı
   └── API entegrasyonu

2. 🏗️ Geliştirme
   ├── Shared bileşenler
   ├── Özel bileşenler
   └── Konfigürasyon

3. 🧪 Test
   ├── Unit testler
   ├── Integration testler
   └── E2E testler

4. 🚀 Deployment
   ├── Build optimizasyonu
   ├── Performance test
   └── Production deploy
```

## 📚 Dokümantasyon Yapısı

```
docs/
├── TAROT_FILE_STRUCTURE.md           # Ana dokümantasyon
├── TAROT_FILE_STRUCTURE_ASCII.md     # ASCII diyagramlar
├── TAROT_COMPONENTS_API.md           # Bileşen API'leri
├── TAROT_THEMING_GUIDE.md            # Tema rehberi
└── TAROT_TESTING_GUIDE.md            # Test rehberi
```

---

**Son Güncelleme:** 20 Ocak 2025  
**Versiyon:** 2.0  
**Durum:** ✅ Tamamlandı
