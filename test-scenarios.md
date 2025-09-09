# Test Senaryoları - Profiles Tablosu

## 🧪 Test 1: Kayıt İşlemi
**Amaç:** Yeni kullanıcı kaydının profiles tablosuna doğru veri eklemesi

**Adımlar:**
1. `/auth` sayfasına git
2. "Kayıt Ol" moduna geç
3. Formu doldur:
   - Email: test@example.com
   - Şifre: Test123!
   - Ad/Soyad: Test Kullanıcı
   - Doğum Tarihi: 1990-01-01
   - Cinsiyet: Erkek
4. "Kayıt Ol" butonuna tıkla

**Beklenen Sonuç:**
- ✅ Kayıt başarılı
- ✅ Profiles tablosunda yeni kayıt oluştu
- ✅ display_name: "Test Kullanıcı"
- ✅ credit_balance: 100
- ✅ full_name: "Test Kullanıcı"

## 🧪 Test 2: Dashboard Profil Oluşturma
**Amaç:** Mevcut kullanıcının dashboard'da profil oluşturması

**Adımlar:**
1. Test kullanıcısı ile giriş yap
2. `/dashboard` sayfasına git
3. Profil bilgilerinin yüklendiğini kontrol et

**Beklenen Sonuç:**
- ✅ Dashboard yüklendi
- ✅ Profil bilgileri görünüyor
- ✅ Kredi bakiyesi: 100
- ✅ Display name görünüyor

## 🧪 Test 3: Kredi Sistemi
**Amaç:** Kredi sisteminin çalışması

**Adımlar:**
1. Dashboard'da kredi bakiyesini kontrol et
2. Tarot okuma yapmaya çalış
3. Kredi harcamasını kontrol et

**Beklenen Sonuç:**
- ✅ Kredi bakiyesi görünüyor
- ✅ Tarot okuma yapılabiliyor
- ✅ Kredi düşüyor

## 🧪 Test 4: RLS Güvenlik
**Amaç:** Kullanıcıların sadece kendi profillerini görebilmesi

**Adımlar:**
1. Farklı kullanıcı ile giriş yap
2. Başka kullanıcının profilini görmeye çalış

**Beklenen Sonuç:**
- ✅ Sadece kendi profili görünüyor
- ✅ Başka kullanıcı profilleri erişilemez

## 🔍 Hata Durumları

### Hata 1: "column display_name does not exist"
**Çözüm:** fix-profiles-table.sql çalıştır

### Hata 2: "column credit_balance does not exist"
**Çözüm:** fix-profiles-table.sql çalıştır

### Hata 3: "relation profiles does not exist"
**Çözüm:** Profiles tablosu oluştur

### Hata 4: RLS hatası
**Çözüm:** RLS politikalarını kontrol et
