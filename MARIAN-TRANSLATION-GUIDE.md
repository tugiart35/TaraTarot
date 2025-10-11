# 🌍 MarianMT ile Ücretsiz Çeviri Sistemi

Helsinki-NLP'nin MarianMT modelleri ile **%100 ücretsiz** tr.json → en.json + sr.json çevirisi.

## ✨ Özellikler

- ✅ **%100 Ücretsiz** - API key gerekmez
- ✅ **Offline Çalışır** - İnternet bağlantısı sadece model indirme için gerekli
- ✅ **GitHub Actions Uyumlu** - Otomatik çeviri pipeline'ı
- ✅ **Yüksek Kalite** - Özellikle kısa/orta metinlerde çok iyi sonuç
- ✅ **Açık Kaynak** - Tüm modeller MIT lisanslı

## 🚀 Hızlı Başlangıç

### 1️⃣ Kütüphaneleri Yükle

```bash
pip install -r requirements-translate.txt
```

İlk kurulum yaklaşık **300-500 MB** model indirir (sadece ilk seferde).

### 2️⃣ Çeviriyi Başlat

```bash
python scripts/translate-with-marian.py
```

Ekranda şu seçenekler çıkar:

```
1️⃣  Türkçe -> İngilizce (tr -> en)
2️⃣  Türkçe -> Sırpça (tr -> sr)
3️⃣  Her ikisi de (tr -> en + sr)
```

### 3️⃣ Sonuçları Kontrol Et

Çevrilen dosyalar:
- `messages/en.json` (İngilizce)
- `messages/sr.json` (Sırpça)

Log dosyası: `translation-marian.log`

## 🤖 GitHub Actions ile Otomatik Çeviri

`.github/workflows/translate.yml` dosyası oluşturuldu.

### Manuel Tetikleme

GitHub repo → Actions → "Auto Translate with MarianMT" → Run workflow

### Otomatik Tetikleme

`messages/tr.json` dosyası değiştiğinde otomatik çalışır:

```bash
git add messages/tr.json
git commit -m "TR çevirileri güncellendi"
git push
```

GitHub Actions:
1. Python ve bağımlılıkları kurar
2. MarianMT modellerini indirir (~300 MB, cache'lenir)
3. tr.json → en.json + sr.json çevirir
4. Değişiklikleri otomatik commit eder

## 📊 Model Detayları

| Dil Çifti | Model | Boyut | Kalite |
|-----------|-------|-------|--------|
| tr → en | `Helsinki-NLP/opus-mt-tr-en` | ~300 MB | ⭐⭐⭐⭐⭐ |
| tr → sr | `Helsinki-NLP/opus-mt-tr-sr` | ~300 MB | ⭐⭐⭐⭐ |
| en → sr | `Helsinki-NLP/opus-mt-en-sh` | ~300 MB | ⭐⭐⭐⭐⭐ |

### Alternatif Yol (tr → sr yoksa)

Eğer `tr-sr` modeli bulunamazsa, script otomatik olarak şu yolu dener:

```
tr.json → (tr-en) → temp_en → (en-sh) → sr.json
```

## 🔧 İleri Seviye Kullanım

### Sadece Belirli Anahtarları Çevir

Script'i düzenleyerek belirli path'leri filtreleyebilirsiniz:

```python
def translate_dict(self, data: Dict[str, Any], lang_pair: str, path: str = "") -> Dict[str, Any]:
    # Örnek: Sadece "blog" anahtarını çevir
    if not path.startswith("blog"):
        return data
    # ... çeviri kodu
```

### Batch İşleme

Büyük dosyalar için batch işleme:

```python
# 100 key'lik batchler halinde işle
BATCH_SIZE = 100
```

### Cache Sistemi

İlk çeviri yavaş olabilir (model indirme). Sonraki çeviriler çok hızlıdır:

- İlk çeviri: ~30-60 dakika (21k satır)
- Sonraki çeviriler: ~5-10 dakika

## 💡 İpuçları

1. **Model Cache**: `~/.cache/huggingface/` klasöründe saklanır
2. **GPU Desteği**: Eğer CUDA varsa otomatik kullanılır (10x hızlı)
3. **Memory**: ~2GB RAM yeterli
4. **Paralelleştirme**: Batch çeviri için `multiprocessing` kullanılabilir

## 🆚 Diğer Servislerle Karşılaştırma

| Servis | Maliyet | Kalite | Hız | Offline |
|--------|---------|--------|-----|---------|
| **MarianMT** | ✅ Ücretsiz | ⭐⭐⭐⭐ | Orta | ✅ Evet |
| Google Translate | 💰 $20/1M char | ⭐⭐⭐⭐⭐ | Çok Hızlı | ❌ Hayır |
| DeepL | 💰 $25/1M char | ⭐⭐⭐⭐⭐ | Hızlı | ❌ Hayır |
| Argos Translate | ✅ Ücretsiz | ⭐⭐⭐ | Yavaş | ✅ Evet |

## 🐛 Sorun Giderme

### Model İndirilemiyor

```bash
# Manuel indirme
python -c "from transformers import MarianMTModel, MarianTokenizer; \
MarianTokenizer.from_pretrained('Helsinki-NLP/opus-mt-tr-en'); \
MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-tr-en')"
```

### Memory Hatası

`torch.cuda.OutOfMemoryError` alıyorsanız:

```python
# Batch size'ı küçült
BATCH_SIZE = 50  # varsayılan 100 yerine
```

### Çeviri Kalitesi Düşük

Özel terimler için glossary ekleyin:

```python
GLOSSARY = {
    "tarot": "tarot",
    "açılım": "spread",
    # ... diğer terimler
}
```

## 📚 Kaynaklar

- [Hugging Face Transformers](https://huggingface.co/docs/transformers)
- [Helsinki-NLP Models](https://huggingface.co/Helsinki-NLP)
- [MarianMT Paper](https://arxiv.org/abs/1804.00344)

## 🎉 Sonuç

Artık tamamen **ücretsiz** bir şekilde:

1. Yerel bilgisayarınızda çeviri yapabilirsiniz
2. GitHub Actions'ta otomatik çeviri pipeline'ı çalıştırabilirsiniz
3. API limiti veya maliyet endişesi olmadan istediğiniz kadar çeviri yapabilirsiniz

**Toplam Maliyet: $0** 💰✨

