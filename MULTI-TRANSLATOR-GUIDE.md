# 🌍 Multi-Translator Batch System - Kullanım Kılavuzu

Production-ready, multi-tier fallback çeviri sistemi.

## ✨ Özellikler

### 🔄 Multi-Tier Fallback Chain
```
MarianMT (Primary) → Google Translate → Argos → MarianMT (Retry) → Original Text
     ↓ timeout/fail      ↓ timeout/fail    ↓ fail      ↓ fail          ↓
   60 saniye            60 saniye        60 saniye   60 saniye    (son çare)
```

### 🛡️ Güvenlik ve Dayanıklılık
- ✅ **2000'lik Batch'ler**: Güvenlik için küçük batch'ler
- ✅ **Her Batch Kaydedilir**: Hata durumunda veri kaybı yok
- ✅ **Checkpoint System**: Kaldığı yerden devam eder
- ✅ **Graceful Shutdown**: Ctrl+C güvenli şekilde yakalanır
- ✅ **60 Saniye Timeout**: Takılan translator'lar atlanır

### 📊 Canlı İzleme
- Progress bar ile anlık ilerleme
- Her batch için translator dağılımı
- ETA (Estimated Time of Arrival) hesaplama
- Detaylı istatistik raporları

### 🌐 Desteklenen Diller
- 🇹🇷 → 🇬🇧 (Türkçe → İngilizce)
- 🇹🇷 → 🇷🇸 (Türkçe → Sırpça/Latin)

## 🚀 Kurulum

### 1️⃣ Temel Kurulum (Zorunlu)
```bash
pip install transformers torch sentencepiece tqdm
```

### 2️⃣ Fallback Translator'lar (Opsiyonel)
```bash
# Google Translate API (ücretli, hızlı)
pip install googletrans==4.0.0-rc1

# Argos Translate (ücretsiz, offline)
pip install argostranslate
```

### 3️⃣ Tüm Paketleri Bir Arada
```bash
pip install -r requirements-translate.txt
```

## 📖 Kullanım

### Temel Kullanım
```bash
cd /Users/tugi/Desktop/TaraTarot
python scripts/translate-multi-batch.py
```

### Menü Seçenekleri

```
1️⃣  tr → en (Türkçe → İngilizce)
2️⃣  tr → sr (Türkçe → Sırpça/Latin)
3️⃣  Her ikisi de (tr → en + sr)
4️⃣  Sadece batch'leri birleştir
5️⃣  State'i temizle
q: Çıkış
```

### Örnek 1: İngilizce Çeviri
```bash
$ python scripts/translate-multi-batch.py
Seçim: 1

# Çeviri başlar
# Batch'ler oluşturulur: batch_0001_en.json, batch_0002_en.json, ...
# Sonunda otomatik birleştirilir: messages/en.json
```

### Örnek 2: Her İki Dil
```bash
$ python scripts/translate-multi-batch.py
Seçim: 3

# Önce EN çevirisi yapılır
# Sonra SR çevirisi yapılır
# Her ikisi de birleştirilir
```

### Örnek 3: Kaldığı Yerden Devam
```bash
# Çeviri yarıda kesildi (Ctrl+C veya hata)
$ python scripts/translate-multi-batch.py
Seçim: 1

🔄 KALDIĞI YERDEN DEVAM EDİLEBİLİR
✅ Tamamlanan: 5 batch
🔄 Son batch: 6

🤔 Kaldığınız yerden devam etmek istiyor musunuz? (E/H): E

# Batch 6'dan devam eder
```

## 📊 Çıktı Örnekleri

### Batch İşleme
```
════════════════════════════════════════════════════════════════════
🔄 Batch 0005/0020
📊 2,000 key çevrilecek
════════════════════════════════════════════════════════════════════

Batch 0005/0020 |████████████████████| 2000/2000 [02:15<00:00, 14.8key/s] Primary: marian

✅ Batch 5 tamamlandı!
⏱️  Süre: 135.2s (14.8 key/s)
🎯 Kullanılan translatorlar:
  • marian: 1950 (97.5%)
  • google: 45 (2.3%)
  • argos: 5 (0.3%)

📍 Kalan: 15 batch (~33.8 dakika)
```

### İstatistik Raporu
```
══════════════════════════════════════════════════════════════════════
📊 TRANSLATOR İSTATİSTİKLERİ
══════════════════════════════════════════════════════════════════════
🤖 MarianMT    : ✅ 19250 ❌   0 ⏱️  15 (avg:  0.45s)
🌐 Google      : ✅   600 ❌   5 ⏱️   3 (avg:  1.20s)
🔷 Argos       : ✅   150 ❌   2 ⏱️   0 (avg:  2.10s)

💡 KULLANIM DAĞILIMI:
  • marian       :  19,250 (96.3%)
  • google       :     600 ( 3.0%)
  • argos        :     150 ( 0.8%)

✅ Toplam başarılı: 20,000
❌ Toplam başarısız: 0
══════════════════════════════════════════════════════════════════════
```

## 🗂️ Dosya Yapısı

### Çeviri Sırasında
```
messages/
├── tr.json (kaynak)
├── batches/
│   ├── batch_0001_en.json (2000 key)
│   ├── batch_0002_en.json (2000 key)
│   ├── batch_0003_en.json (2000 key)
│   ├── batch_0001_sr.json (2000 key)
│   └── ...
├── translation-state.json (checkpoint)
└── en.json (henüz birleştirilmemiş)
```

### Çeviri Sonrası
```
messages/
├── tr.json (kaynak)
├── en.json (✅ birleştirilmiş)
├── sr.json (✅ birleştirilmiş)
└── batches/ (opsiyonel, silinebilir)
```

## 🛠️ İleri Seviye

### Batch Boyutunu Değiştirme
Script içinde `BATCH_SIZE` değişkenini düzenleyin:
```python
BATCH_SIZE = 1000  # Daha küçük batch'ler
BATCH_SIZE = 5000  # Daha büyük batch'ler
```

### Timeout Süresini Ayarlama
```python
TIMEOUT_SECONDS = 30   # Daha kısa timeout
TIMEOUT_SECONDS = 120  # Daha uzun timeout
```

### Sadece MarianMT Kullanma
Opsiyonel paketleri kurmayın. Fallback zinciri otomatik devre dışı kalır.

### Manuel Batch Birleştirme
```bash
python scripts/translate-multi-batch.py
Seçim: 4

# Mevcut batch'leri birleştirir
# Çeviri yapmaz
```

## 🐛 Sorun Giderme

### Model İndirme Hatası
```bash
# Manuel indirme
python -c "from transformers import MarianMTModel, MarianTokenizer; \
MarianTokenizer.from_pretrained('Helsinki-NLP/opus-mt-tr-en'); \
MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-tr-en')"
```

### Memory Hatası
- Batch boyutunu küçültün: `BATCH_SIZE = 1000`
- Diğer uygulamaları kapatın
- Swap alanını artırın

### Timeout Çok Sık Oluyor
- Internet bağlantınızı kontrol edin
- Timeout süresini artırın: `TIMEOUT_SECONDS = 120`
- Sadece offline translator kullanın (MarianMT, Argos)

### Google Translate Çalışmıyor
```bash
# Doğru versiyonu yükleyin
pip uninstall googletrans
pip install googletrans==4.0.0-rc1
```

### Argos Paketi Bulunamıyor
```bash
# Argos'u yeniden yükleyin
pip install --upgrade argostranslate

# Paketleri manuel indirin
python -c "import argostranslate.package; \
argostranslate.package.update_package_index(); \
available = argostranslate.package.get_available_packages(); \
[argostranslate.package.install_from_path(p.download()) \
for p in available if p.from_code == 'tr' and p.to_code == 'en']"
```

## 📈 Performans İpuçları

### En Hızlı Yapılandırma
```bash
# GPU varsa
# Otomatik CUDA kullanılır (10x hızlı)

# Sadece MarianMT kullan (opsiyonel paketleri yükleme)
# Google/Argos fallback overhead'i olmaz
```

### En Güvenli Yapılandırma
```bash
# Küçük batch'ler
BATCH_SIZE = 1000

# Uzun timeout
TIMEOUT_SECONDS = 120

# Tüm fallback'leri yükle
pip install googletrans==4.0.0-rc1 argostranslate
```

### En Ucuz Yapılandırma
```bash
# Sadece ücretsiz translator'lar
pip install transformers torch sentencepiece tqdm argostranslate

# Google Translate'i yükleme
# MarianMT → Argos → MarianMT zinciri kullanılır
```

## 🔍 Log Dosyaları

Her çalıştırmada yeni log dosyası oluşturulur:
```
translation-multi-20251011-143052.log
```

Log seviyelerini değiştirmek için:
```python
logging.basicConfig(level=logging.DEBUG)  # Daha detaylı
logging.basicConfig(level=logging.WARNING)  # Daha az
```

## 💾 Backup Stratejisi

Script otomatik backup almaz. Manual backup:
```bash
# Çeviri öncesi
cp messages/tr.json messages/tr.backup.json
cp messages/en.json messages/en.backup.json
cp messages/sr.json messages/sr.backup.json

# Veya tarih ile
cp messages/tr.json messages/tr.backup-$(date +%Y%m%d).json
```

## 🎯 Best Practices

1. **İlk Çalıştırma**: Küçük bir test dosyası ile deneyin
2. **Batch Boyutu**: 2000 güvenli bir başlangıç
3. **Fallback**: En az 2 translator yükleyin (MarianMT + Argos)
4. **Log Kontrolü**: İlk batch'ten sonra loglara bakın
5. **Backup**: Önemli veriler için önceden backup alın

## 📞 Destek

Log dosyasını kontrol edin: `translation-multi-*.log`

Hata raporu için log'da şunları arayın:
- `ERROR`: Kritik hatalar
- `WARNING`: Uyarılar
- `Timeout`: Timeout sorunları
- `Failed`: Başarısız çeviriler

## 🎉 Sonuç

Artık production-ready, fault-tolerant bir çeviri sisteminiz var:

✅ **Güvenli**: Her batch kaydedilir  
✅ **Hızlı**: Multi-tier fallback ile maksimum hız  
✅ **Güvenilir**: Timeout ve hata yönetimi  
✅ **İzlenebilir**: Canlı progress tracking  
✅ **Sürdürülebilir**: Kaldığı yerden devam eder  

**Happy Translating! 🚀**


