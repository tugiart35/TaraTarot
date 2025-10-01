# Admin Kullanıcı Kurulumu

## Development (Test) Admin
Sadece development modunda çalışır:
- Email: `admin@test.com`
- Şifre: `admin123`

## Production Admin Kurulumu

### Yöntem 1: Supabase Dashboard (Önerilen)
1. Supabase Dashboard'a gidin: https://app.supabase.com
2. Authentication > Users sekmesine gidin
3. "Add user" butonuna tıklayın
4. Email: `admin@yourdomain.com`
5. Password: Güçlü bir şifre belirleyin
6. "Auto Confirm User" seçeneğini işaretleyin
7. Kullanıcıyı oluşturun

### Yöntem 2: SQL ile Admin Yetkisi Verme
Mevcut bir kullanıcıya admin yetkisi vermek için:

```sql
-- 1. Kullanıcının ID'sini bulun
SELECT id, email FROM auth.users WHERE email = 'user@example.com';

-- 2. Profiles tablosunda is_admin'i true yapın
UPDATE profiles 
SET is_admin = true 
WHERE id = 'user-id-buraya-gelecek';
```

### Yöntem 3: Şifre Resetleme
Mevcut admin kullanıcısı için şifre resetlemek:

1. Supabase Dashboard > Authentication > Users
2. Admin kullanıcıyı bulun (tugi94@admin.com)
3. "..." menüsünden "Send password reset email" seçin
4. Email'den şifreyi resetleyin

## Güvenlik Notları

⚠️ **ÖNEMLİ**: Production'a çıkmadan önce:
1. Development test admin'i devre dışı bırakın
2. `useAuthAdmin.ts` dosyasındaki `process.env.NODE_ENV === 'development'` kontrolünü kaldırın
3. Sadece Supabase authentication kullanın
4. Güçlü şifreler kullanın
5. 2FA (Two-Factor Authentication) aktif edin

## Mevcut Admin Kullanıcıları

### Development
- Email: `admin@test.com`
- Şifre: `admin123`
- **Not**: Sadece development modunda çalışır

### Production
- Email: `tugi94@admin.com`
- Şifre: Supabase'de kayıtlı (resetlenmeli)
- ID: `823347bb-a7d7-4645-b080-b811953b45bd`

## Production'a Çıkmadan Önce Kontrol Listesi

- [ ] Test admin'i kaldır veya devre dışı bırak
- [ ] Gerçek admin kullanıcısı oluştur
- [ ] Güçlü şifre belirle
- [ ] Email doğrulaması yap
- [ ] is_admin yetkisini kontrol et
- [ ] Giriş testi yap
- [ ] Console.log'ları temizle (production'da debug logları istemezsiniz)

---

# Admin Panel Kullanım Kılavuzu

## Siparişler (Orders) Sayfası

### Genel Bilgiler
- Siparişler sayfası, tüm işlemleri (transactions) görüntülemek ve yönetmek için kullanılır.
- Her kart, bir işlemi temsil eder ve kullanıcı bilgisi, okuma tipi, referans ID ve durum bilgisini içerir.
- İşlemler filtrelenebilir, sıralanabilir ve dışa aktarılabilir.

### İşlem Durumları
İşlemler üç durumda olabilir:
1. **Tamamlandı (Completed)**: İşlem başarıyla tamamlandı
2. **Beklemede (Pending)**: İşlem henüz tamamlanmadı, beklemede
3. **İptal Edildi (Cancelled)**: İşlem iptal edildi

### Durum Güncelleme
İşlem durumlarını güncellemek için:
1. İşlem kartına tıklayarak detay modalını açın
2. Modal alt kısmındaki durum butonlarından birini seçin:
   - **Onayla**: İşlemi "completed" durumuna getirir
   - **Beklet**: İşlemi "pending" durumuna getirir
   - **İptal Et**: İşlemi "cancelled" durumuna getirir

### Teknik Bilgiler
- İşlem durumları hem veritabanında hem de tarayıcı önbelleğinde (localStorage) saklanır
- Veritabanı güncellemesi başarısız olursa, durum sadece tarayıcıda güncellenir ve bir uyarı gösterilir
- Tarayıcı önbelleğindeki durumlar, sayfa yenilendiğinde bile korunur

## Veritabanı Yapısı

### Transactions Tablosu
- `id`: İşlem ID'si (UUID)
- `user_id`: Kullanıcı ID'si
- `type`: İşlem tipi (purchase, refund, bonus, deduction, reading)
- `amount`: İşlem tutarı
- `delta_credits`: Kredi değişimi
- `description`: İşlem açıklaması
- `ref_type`: Referans tipi (package, reading, admin_adjustment)
- `ref_id`: Referans ID'si
- `status`: İşlem durumu (completed, pending, cancelled)

### RPC Fonksiyonları
- `update_transaction_status(p_transaction_id UUID, p_status TEXT)`: İşlem durumunu güncellemek için kullanılır

## Sorun Giderme

### İşlem Durumu Güncellenmiyor
1. Tarayıcı konsolunda hata mesajlarını kontrol edin
2. Admin hesabınızın yetki seviyesini doğrulayın
3. Supabase bağlantısını kontrol edin

### Sayfanın Açılmaması Durumunda
1. Terminal'de `lsof -ti:3111 | xargs kill -9` komutunu çalıştırın
2. `npm run dev` ile uygulamayı yeniden başlatın

### Verilerin Görüntülenmemesi
1. Supabase bağlantı bilgilerini kontrol edin
2. RLS politikalarının doğru yapılandırıldığından emin olun
3. Admin hesabınızın doğru yapılandırıldığından emin olun
