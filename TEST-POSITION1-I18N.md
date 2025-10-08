# 🧪 Position-1 i18n Test Rehberi

## ✅ Veriler Hazır!

**78 kart** için **3 dilde** çeviriler hazır:
- 🇹🇷 Türkçe
- 🇬🇧 İngilizce
- 🇷🇸 Sırpça

---

## 🎮 NASIL TEST EDERSİNİZ?

### Yöntem 1: Manuel Test (Tarayıcıda)

1. **Uygulamayı başlatın:**
   ```bash
   npm run dev
   ```

2. **Tarayıcıda açın:**
   ```
   http://localhost:3111
   ```

3. **Aşk açılımı sayfasına gidin:**
   - Ana menüden "Aşk Açılımı" veya
   - Direkt: `http://localhost:3111/tr/tarotokumasi` (spread seçimi)

4. **Dil değiştirin:**
   - Sağ üst köşede dil seçici var
   - Türkçe → İngilizce → Sırpça arasında geçiş yapın
   - Position-1 kartlarının metinleri otomatik değişecek!

---

## 🔍 Kod Üzerinden Test

### Test Script'i

```typescript
// test-love-position1.ts
import { useI18nPosition1Meanings } from '@/features/tarot/lib/love/position-1-ilgi-duydugun-kisi';

// Kullanıcı dilini Türkçe'ye ayarlarsa
const meanings = useI18nPosition1Meanings(); // Türkçe metinler gelir

// The Fool kartını bul
const fool = meanings.find(m => m.card === 'The Fool');

console.log('Türkçe:', fool.upright);
// "İlgi duyduğun kişi, hayata karşı çocuksu bir merak..."

// Kullanıcı dilini İngilizce'ye değiştirirse
// Aynı kod otomatik olarak İngilizce metinleri döner!
console.log('English:', fool.upright);
// "The person you are attracted to is full of childlike curiosity..."
```

---

## 📊 Veri Kontrolü (Terminal)

### Tüm Kartları Listele

```bash
# Türkçe'de kaç kart var?
python3 -c "import json; data = json.load(open('messages/tr.json')); print('TR:', len(data['love']['meanings']))"

# İngilizce'de kaç kart var?
python3 -c "import json; data = json.load(open('messages/en.json')); print('EN:', len(data['love']['meanings']))"

# Sırpça'da kaç kart var?
python3 -c "import json; data = json.load(open('messages/sr.json')); print('SR:', len(data['love']['meanings']))"
```

**Beklenen çıktı:**
```
TR: 78
EN: 78
SR: 78
```

### Belirli Bir Kartı Görüntüle

```bash
python3 -c "
import json
tr = json.load(open('messages/tr.json'))
en = json.load(open('messages/en.json'))
sr = json.load(open('messages/sr.json'))

# The Magician kartı
magician_tr = tr['love']['meanings']['themagician']['position1']
magician_en = en['love']['meanings']['themagician']['position1']
magician_sr = sr['love']['meanings']['themagician']['position1']

print('🎩 THE MAGICIAN')
print()
print('🇹🇷 TR:', magician_tr['upright'][:80])
print('🇬🇧 EN:', magician_en['upright'][:80])
print('🇷🇸 SR:', magician_sr['upright'][:80])
"
```

---

## 🗂️ Tüm Kartların Listesi

Position-1 için i18n destekli 78 kart:

### Majör Arkana (22 kart)
1. thefool - The Fool / Joker / Будала
2. themagician - The Magician / Büyücü / Мађионичар
3. thehighpriestess - The High Priestess / Yüksek Rahibe / Висока свештеница
4. theempress - The Empress / İmparatoriçe / Царица
5. theemperor - The Emperor / İmparator / Цар
6. thehierophant - The Hierophant / Aziz / Хијерофант
7. thelovers - The Lovers / Aşıklar / Љубавници
8. thechariot - The Chariot / Savaş Arabası / Кочија
9. strength - Strength / Güç / Снага
10. thehermit - The Hermit / Ermiş / Пустињак
11. thewheeloffortune - Wheel of Fortune / Kader Çarkı / Точак среће
12. justice - Justice / Adalet / Правда
13. thehangedman - The Hanged Man / Asılan Adam / Обешени човек
14. death - Death / Ölüm / Смрт
15. temperance - Temperance / Denge / Умереност
16. thedevil - The Devil / Şeytan / Ђаво
17. thetower - The Tower / Kule / Торањ
18. thestar - The Star / Yıldız / Звезда
19. themoon - The Moon / Ay / Месец
20. thesun - The Sun / Güneş / Сунце
21. judgement - Judgement / Mahşer / Суд
22. theworld - The World / Dünya / Свет

### Kupalar (14 kart)
23. aceofcups - Ace of Cups
24. twoofcups - Two of Cups
... (14 kart)

### Kılıçlar (14 kart)
37. aceofswords - Ace of Swords
... (14 kart)

### Asalar (14 kart)
51. aceofwands - Ace of Wands
... (14 kart)

### Tılsımlar (14 kart)
65. aceofpentacles - Ace of Pentacles
... (14 kart)

**TOPLAM: 78 KART × 3 DİL = 234 TAM ÇEVİRİ**

---

## ✅ Doğrulama Kontrolleri

### 1. Veri Bütünlüğü
```bash
# Her dilde aynı sayıda kart var mı?
python3 -c "
import json
tr = json.load(open('messages/tr.json'))['love']['meanings']
en = json.load(open('messages/en.json'))['love']['meanings']
sr = json.load(open('messages/sr.json'))['love']['meanings']

print('✓ TR:', len(tr), 'kart')
print('✓ EN:', len(en), 'kart')  
print('✓ SR:', len(sr), 'kart')
print()
print('Aynı mı?', len(tr) == len(en) == len(sr) == 78)
"
```

### 2. Çeviri Kalitesi
Rastgele bir kartı kontrol edin:

```bash
python3 -c "
import json, random
tr = json.load(open('messages/tr.json'))
en = json.load(open('messages/en.json'))
sr = json.load(open('messages/sr.json'))

# Rastgele bir kart seç
cards = list(tr['love']['meanings'].keys())
card = random.choice(cards)

print(f'🎴 Rastgele Kart: {card}')
print()
print('TR upright:', tr['love']['meanings'][card]['position1']['upright'][:60])
print('EN upright:', en['love']['meanings'][card]['position1']['upright'][:60])
print('SR upright:', sr['love']['meanings'][card]['position1']['upright'][:60])
"
```

### 3. cardGroups Kontrolü
```bash
python3 -c "
import json
tr = json.load(open('messages/tr.json'))
en = json.load(open('messages/en.json'))
sr = json.load(open('messages/sr.json'))

print('TR cardGroups:', tr['love']['cardGroups'])
print()
print('EN cardGroups:', en['love']['cardGroups'])
print()
print('SR cardGroups:', sr['love']['cardGroups'])
"
```

---

## 🐛 Sorun Giderme

### "i18n anahtarı gösterilmiyor" Hatası

**Belirti:** Ekranda `love.meanings.thefool.position1.upright` şeklinde anahtar görünüyor

**Çözüm:**
1. Dev server'ı yeniden başlatın: `npm run dev`
2. Tarayıcı cache'ini temizleyin (Ctrl+Shift+R veya Cmd+Shift+R)
3. messages/*.json dosyalarının doğru yüklendiğini kontrol edin

### "Çeviriler görünmüyor" Hatası

**Çözüm:**
```bash
# i18n-helper.ts dosyasının doğru çalıştığını kontrol et
grep -n "useLoveTranslations" src/features/tarot/lib/love/i18n-helper.ts

# position-1 dosyasının "use client" direktifini kontrol et
head -5 src/features/tarot/lib/love/position-1-ilgi-duydugun-kisi.ts
```

---

## 🎯 Beklenen Sonuç

Uygulamayı açtığınızda:

1. **Türkçe modda:**
   - "İlgi duyduğun kişi, hayata karşı..." tarzı metinler görürsünüz

2. **İngilizce modda:**
   - "The person you are attracted to..." tarzı metinler görürsünüz

3. **Sırpça modda:**
   - "Особа коју сте заинтересовани..." tarzı metinler görürsünüz

**Hepsi otomatik olarak, aynı kod ile!** ✨

---

**Hazırlayan:** AI Asistan  
**Tarih:** 2025-10-08  
**Durum:** ✅ Test Edilebilir

