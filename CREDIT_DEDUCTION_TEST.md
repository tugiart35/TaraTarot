# 🔧 Kredi Düşme İşlemi Test Rehberi

## Sorun
Tarot okuma sırasında "Kaydet Devam Et" butonuna basıldığında kredi düşme işlemi gerçekleşmiyordu.

## Çözüm
`LoveTarot.tsx` dosyasında kredi düşme işlemi geri eklendi.

## Yapılan Değişiklikler

### 1. Import'lar Eklendi
```typescript
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { useAuth } from '@/hooks/useAuth';
```

### 2. Hook'lar Eklendi
```typescript
const { user } = useAuth();
const detailedCredits = useReadingCredits('LOVE_SPREAD_DETAILED');
```

### 3. Kredi Düşme İşlemi Geri Eklendi
```typescript
const saveDetailedForm = async () => {
  if (!user) {
    showToast('Okuma için giriş yapmalısınız.', 'error');
    return;
  }

  setIsSaving(true);
  try {
    // Kredi düşme işlemi - sesli okuma için
    const deductResult = await detailedCredits.deductCredits();
    if (!deductResult) {
      showToast('Kredi kesintisi yapılamadı. Yetersiz kredi.', 'error');
      return;
    }

    // Kredi kesintisi başarılı - kart seçimine geç
    showToast('Kredi kesildi. Kart seçimine geçiliyor.', 'success');
    setDetailedFormSaved(true);
    setShowCreditConfirm(false);
  } catch (error) {
    showToast('Kredi kesintisi sırasında bir hata oluştu.', 'error');
  } finally {
    setIsSaving(false);
  }
};
```

## Test Adımları

### 1. Giriş Yap
- Dashboard'a git
- Giriş yap
- Kredi bakiyesini not et (örn: 100)

### 2. Tarot Okuma Başlat
- Ana sayfadan "Tarot Okuma" butonuna tıkla
- "Aşk Açılımı" seç
- "Sesli Okuma" seç

### 3. Form Doldur
- Kişisel bilgileri doldur
- Soruları yanıtla
- "Kaydet Devam Et" butonuna tıkla

### 4. Kredi Onayı
- Kredi onay modalı açılacak
- "Evet, Devam Et" butonuna tıkla

### 5. Sonuç Kontrolü
- Kredi düşme işlemi gerçekleşmeli
- Dashboard'a geri dön
- Kredi bakiyesi güncellenmiş olmalı (örn: 91)

## Beklenen Sonuçlar

✅ **Başarılı Senaryo:**
- Kredi düşme işlemi gerçekleşir
- Dashboard'da kredi bakiyesi güncellenir
- Kredi geçmişi sayfasında işlem görünür
- Kart seçimine geçilir

❌ **Hata Senaryoları:**
- Giriş yapmamış kullanıcı: "Okuma için giriş yapmalısınız" hatası
- Yetersiz kredi: "Kredi kesintisi yapılamadı. Yetersiz kredi" hatası
- Sistem hatası: "Kredi kesintisi sırasında bir hata oluştu" hatası

## Debug Bilgileri

### Console Log'ları
- Kredi düşme işlemi başladığında log
- Başarılı/başarısız sonuç log'ları
- Hata durumlarında detaylı log

### Network İstekleri
- `profiles` tablosu güncelleme isteği
- `transactions` tablosu insert isteği
- Event dispatch işlemi

## Sorun Giderme

### Kredi Düşmüyor
1. Console'da hata var mı kontrol et
2. Network sekmesinde Supabase istekleri başarılı mı kontrol et
3. `useReadingCredits` hook'u doğru çalışıyor mu kontrol et

### Dashboard Güncellenmiyor
1. `creditBalanceChanged` event'i dispatch ediliyor mu kontrol et
2. Dashboard'da event listener çalışıyor mu kontrol et
3. `refreshCreditBalance` fonksiyonu çağrılıyor mu kontrol et
