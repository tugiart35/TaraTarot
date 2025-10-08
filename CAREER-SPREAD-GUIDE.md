# 💼 CAREER SPREAD i18n UYGULAMA REHBERİ

**Tarih:** 2025-10-08  
**Pozisyon Sayısı:** 7  
**Toplam Kart:** 546 (78 × 7)  
**Tahmini Süre:** ~3-4 saat

---

## 📋 HAZIRLIK

✅ **14 script oluşturuldu:**
- 7 extraction script (extract-career-position{1-7}-tr.js)
- 7 translation script (translate-career-position{1-7}.py)

✅ **Pipeline script hazır:**
- `career-position-pipeline.sh` → Tek pozisyonu baştan sona işler

---

## 🚀 KULLANIM

### Seçenek A: Tek Tek Manuel (Önerilen)

Her pozisyonu sırayla çalıştırın, sonuçları kontrol edin:

```bash
# Position-1
node scripts/extract-career-position1-tr.js
python3 scripts/translate-career-position1.py  # ~25-30 dk
python3 scripts/fix-keywords-to-json-string.py
python3 scripts/transliterate-serbian.py
python3 scripts/fix-sentence-spacing.py
python3 scripts/fix-embedded-code-in-json.py

# Doğrula
python3 -c "
import json
en = json.load(open('messages/en.json'))
print(f'Position-1: {len([k for k,v in en.get(\"career\",{}).get(\"meanings\",{}).items() if \"position1\" in v])}/78 kart')
"

# Position-2
node scripts/extract-career-position2-tr.js
python3 scripts/translate-career-position2.py  # ~25-30 dk
... (aynı cleanup script'leri)

# ... Position-3, 4, 5, 6, 7 için tekrarla
```

---

### Seçenek B: Pipeline Script ile (Otomatik)

Tek komutla her pozisyonu işle:

```bash
# Position-1
bash scripts/career-position-pipeline.sh 1

# Çıktıyı kontrol et, sorun yoksa devam et
bash scripts/career-position-pipeline.sh 2

# ... 7'ye kadar devam et
bash scripts/career-position-pipeline.sh 7
```

---

### Seçenek C: Gece Toplu (Tüm 7 Pozisyon)

Tüm pozisyonları sırayla otomatik işle:

```bash
# Tek komut
for i in {1..7}; do
  echo "🔮 Position-${i} başlıyor..."
  bash scripts/career-position-pipeline.sh $i
  echo "✅ Position-${i} tamamlandı!"
  sleep 5
done

# Veya arka planda
nohup bash -c 'for i in {1..7}; do bash scripts/career-position-pipeline.sh $i; done' > /tmp/career-all.log 2>&1 &

# İzlemek için
tail -f /tmp/career-all.log
```

**Tahmini süre:** ~3-4 saat (7 × ~25-35 dk)

---

## 📊 İLERLEME TAKİBİ

### Career Spread Pozisyonları

| # | Dosya | TR | EN | SR | Durum |
|---|-------|----|----|----|----|
| 1 | gercekten-istedigim-kariyer-bumu | ⏳ | ⏳ | ⏳ | ⏳ |
| 2 | kariyer-gelistirmek-icin-hangi-adımlar | ⏳ | ⏳ | ⏳ | ⏳ |
| 3 | kariyerimde-degisteremedigigim-taraflar | ⏳ | ⏳ | ⏳ | ⏳ |
| 4 | elimden-gelenin-en-iyisi-yapıyormuyum | ⏳ | ⏳ | ⏳ | ⏳ |
| 5 | yardimci-olacak-ne-gibi-degisikler | ⏳ | ⏳ | ⏳ | ⏳ |
| 6 | gecmisimdeki-hangi-engeller | ⏳ | ⏳ | ⏳ | ⏳ |
| 7 | sonuc-ne-olacak | ⏳ | ⏳ | ⏳ | ⏳ |

**İlerleme:** %0 (0/7)

---

## ⚙️ HER POZİSYON İÇİN YAPILACAKLAR

### 1. Extraction (~2 dk)
```bash
node scripts/extract-career-position{X}-tr.js
```
**Beklenen:** 78 kart extract edildi

### 2. Translation (~25-30 dk)
```bash
python3 scripts/translate-career-position{X}.py
```
**Beklenen:** EN ve SR çeviriler tamamlandı

### 3. Cleanup Pipeline (~3 dk)
```bash
python3 scripts/fix-keywords-to-json-string.py
python3 scripts/transliterate-serbian.py
python3 scripts/fix-sentence-spacing.py
python3 scripts/fix-embedded-code-in-json.py
```
**Beklenen:** Tüm kalite kontrolleri geçti

### 4. Doğrulama
```python
import json
en = json.load(open('messages/en.json'))
p_count = len([k for k,v in en.get('career',{}).get('meanings',{}).items() if 'position{X}' in v])
print(f'Position-{X}: {p_count}/78 kart')
```

### 5. Commit
```bash
git add messages/*.json scripts/*career*
git commit -m "feat(tarot): add career position-{X} i18n"
```

---

## 🎯 TAHMİNLER

### Süre
- Extraction: 7 × 2 dk = 14 dk
- Translation: 7 × 27 dk = 189 dk (~3 saat)
- Cleanup: 7 × 3 dk = 21 dk
- **TOPLAM: ~3.5-4 saat**

### i18n Anahtarları
- 7 pozisyon × 78 kart × 4 alan × 3 dil = **6,552 anahtar**

### Maliyet
- **$0** (Google Translate ücretsiz)

---

## ✅ BAŞARI KRİTERLERİ

Her pozisyon için:
- [ ] 78/78 kart 3 dilde
- [ ] Keywords string formatında
- [ ] Sırpça Latin alfabesinde
- [ ] Embedded kod yok
- [ ] Cümle boşlukları doğru

---

## 💡 İPUCU

**En hızlı yöntem:**
1. Gece başlat: `nohup bash -c 'for i in {1..7}; do bash scripts/career-position-pipeline.sh $i; done' > /tmp/career.log 2>&1 &`
2. Sabah kontrol et: `tail -100 /tmp/career.log`
3. Kalite kontrolü yap
4. Commit

**Güvenli yöntem:**
1. Position-1'i yap, test et
2. Sorun yoksa devam et
3. Her pozisyonu teker teker kontrol et

---

**Hazırlayan:** AI Agent  
**Tarih:** 2025-10-08  
**Durum:** ✅ Script'ler hazır, kullanıma açık
