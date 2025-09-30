# i18n Otomatik Çeviri Scriptleri

Bu klasörde i18n key hatalarını otomatik olarak yakalayıp Türkçe'ye çeviren scriptler bulunmaktadır.

## Scriptler

### 1. `auto-translate-missing-keys.mjs`
**Amaç:** Mevcut tr.json ve en.json dosyalarını karşılaştırıp eksik key'leri bulur ve çevirir.

**Kullanım:**
```bash
npm run i18n:auto-translate
```

**Özellikler:**
- tr.json ve en.json dosyalarını karşılaştırır
- Eksik key'leri tespit eder
- Google Translate API ile çeviri yapar
- tr.json dosyasını günceller
- Yedek oluşturur

### 2. `auto-translate-console-watcher.mjs`
**Amaç:** Next.js uygulamasını başlatır ve console log'larını izleyerek i18n key hatalarını yakalar.

**Kullanım:**
```bash
npm run i18n:watch
```

**Özellikler:**
- Next.js uygulamasını otomatik başlatır
- Console log'ları izler
- i18n key hatalarını yakalar
- Otomatik çeviri yapar
- tr.json dosyasını günceller

### 3. `simple-i18n-translator.mjs`
**Amaç:** Sadece console log'ları izleyerek i18n key hatalarını yakalar (en basit versiyon).

**Kullanım:**
```bash
npm run i18n:simple
```

**Özellikler:**
- Console log'ları izler
- i18n key hatalarını yakalar
- Otomatik çeviri yapar
- tr.json dosyasını günceller
- Manuel olarak uygulamayı başlatmanız gerekir

## Kullanım Senaryoları

### Senaryo 1: Mevcut Eksik Key'leri Toplu Çevirme
```bash
npm run i18n:auto-translate
```
Bu komut tr.json ve en.json dosyalarını karşılaştırıp eksik key'leri bulur ve çevirir.

### Senaryo 2: Geliştirme Sırasında Otomatik Çeviri
```bash
npm run i18n:watch
```
Bu komut Next.js uygulamasını başlatır ve console log'larını izleyerek i18n key hatalarını yakalar.

### Senaryo 3: Manuel Uygulama ile Otomatik Çeviri
```bash
# Terminal 1: Çeviri scriptini başlat
npm run i18n:simple

# Terminal 2: Uygulamanızı başlat
npm run dev
```

## Özellikler

### Otomatik Yedekleme
Tüm scriptler çalışmaya başlamadan önce tr.json dosyasının yedeğini oluşturur.

### Google Translate API
Ücretsiz Google Translate API kullanarak çeviri yapar.

### Log Sistemi
Tüm işlemler log dosyasına kaydedilir:
- `logs/auto-translate.log`
- `logs/auto-translate-watcher.log`
- `logs/simple-translator.log`

### Hata Yakalama
Scriptler çeşitli i18n key hata formatlarını yakalar:
- `i18n key "..." does not exist`
- `Missing translation for key: "..."`
- `Translation missing: "..."`
- `Key "..." not found`

## Gereksinimler

- Node.js 18+
- İnternet bağlantısı (Google Translate API için)
- tr.json ve en.json dosyaları

## Sorun Giderme

### Çeviri Hatası
Eğer çeviri hatası alırsanız:
1. İnternet bağlantınızı kontrol edin
2. Google Translate API erişimini kontrol edin
3. Log dosyalarını inceleyin

### Key Bulunamadı
Eğer key EN dosyasında bulunamazsa:
1. EN dosyasında key'in varlığını kontrol edin
2. Key path'inin doğru olduğundan emin olun
3. Log dosyalarını inceleyin

### Dosya Yazma Hatası
Eğer tr.json dosyası yazılamazsa:
1. Dosya izinlerini kontrol edin
2. Dosyanın başka bir uygulama tarafından kullanılmadığından emin olun
3. Yedek dosyalarını kontrol edin

## Gelişmiş Kullanım

### Özel Çeviri
Eğer belirli key'ler için özel çeviri istiyorsanız, script'i düzenleyebilirsiniz:

```javascript
// Özel çeviri kuralları
const customTranslations = {
  'auth.login': 'Giriş Yap',
  'auth.logout': 'Çıkış Yap',
  // ... diğer özel çeviriler
};
```

### Rate Limiting
Google Translate API rate limit'i vardır. Script'te 100ms bekleme süresi eklenmiştir.

## Destek

Sorun yaşarsanız:
1. Log dosyalarını inceleyin
2. Console çıktısını kontrol edin
3. Yedek dosyalarını kontrol edin
4. Script'i yeniden başlatın
