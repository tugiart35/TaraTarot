# E-posta Onay Sistemi Kurulum Rehberi

Bu rehber, projenizde e-posta onay sistemini aktifleştirmek için gerekli adımları açıklar.

## ✅ Tamamlanan Adımlar

### 1. Kod Değişiklikleri
- ✅ Auth sayfasında e-posta onay mesajı eklendi
- ✅ E-posta onay callback endpoint'i oluşturuldu (`/auth/confirm`)
- ✅ Çeviri dosyalarına e-posta onay mesajları eklendi

## 🔧 Supabase Dashboard Konfigürasyonu

### Adım 1: E-posta Onayını Etkinleştirin

1. [Supabase Dashboard](https://supabase.com/dashboard)'a gidin
2. Projenizi seçin
3. **Authentication** > **Providers** sayfasına gidin
4. **Email** bölümünde:
   - ✅ **Enable email confirmations** seçeneğini işaretleyin
   - ✅ **Enable email change confirmations** seçeneğini işaretleyin

### Adım 2: E-posta Template'lerini Yapılandırın

1. **Authentication** > **Email Templates** sayfasına gidin
2. **Confirm signup** template'ini düzenleyin:

```html
<h2>Hesabınızı Onaylayın</h2>
<p>Merhaba,</p>
<p>Hesabınızı oluşturduğunuz için teşekkürler. Hesabınızı aktifleştirmek için aşağıdaki bağlantıya tıklayın:</p>
<p><a href="{{ .ConfirmationURL }}">Hesabımı Onayla</a></p>
<p>Bu bağlantı 24 saat geçerlidir.</p>
<p>Teşekkürler,<br>Tarot Uygulaması Ekibi</p>
```

### Adım 3: Redirect URL'lerini Yapılandırın

1. **Authentication** > **URL Configuration** sayfasına gidin
2. **Redirect URLs** bölümüne şu URL'leri ekleyin:
   ```
   http://localhost:3000/auth/confirm
   https://yourdomain.com/auth/confirm
   ```

### Adım 4: Site URL'ini Ayarlayın

1. **Authentication** > **URL Configuration** sayfasında
2. **Site URL** alanını güncelleyin:
   - Geliştirme: `http://localhost:3111`
   - Production: `https://yourdomain.com`

## 📧 E-posta Gönderimi

### Varsayılan SMTP (Geliştirme)
- Supabase varsayılan SMTP servisi kullanılır
- Saatte 3 e-posta limiti vardır
- Sadece geliştirme için uygundur

### Özel SMTP (Production)
Production için özel SMTP servisi kullanmanız önerilir:

1. **Authentication** > **SMTP Settings** sayfasına gidin
2. SMTP sağlayıcınızın bilgilerini girin:
   - **Host**: smtp.gmail.com (Gmail için)
   - **Port**: 587
   - **Username**: your-email@gmail.com
   - **Password**: your-app-password
   - **Sender email**: your-email@gmail.com
   - **Sender name**: Tarot Uygulaması

## 🧪 Test Etme

### 1. Yerel Geliştirme
```bash
# Projeyi başlatın
npm run dev

# Mailpit ile e-postaları kontrol edin
supabase status
# Mailpit URL'ini tarayıcıda açın
```

### 2. Kayıt Testi
1. `/auth` sayfasına gidin
2. Yeni bir e-posta ile kayıt olun
3. "E-posta adresinizi kontrol edin" mesajını görün
4. E-posta kutunuzu kontrol edin
5. Onay bağlantısına tıklayın
6. Ana sayfaya yönlendirildiğinizi doğrulayın

## 🔍 Sorun Giderme

### E-posta Gelmiyor
- Spam klasörünü kontrol edin
- SMTP ayarlarını doğrulayın
- Rate limit kontrolü yapın

### Onay Bağlantısı Çalışmıyor
- Redirect URL'lerin doğru olduğunu kontrol edin
- Site URL'inin doğru olduğunu kontrol edin
- Console'da hata mesajlarını kontrol edin

### Token Süresi Dolmuş
- Varsayılan süre 24 saattir
- Yeni onay e-postası isteyin

## 📝 Önemli Notlar

1. **Güvenlik**: Production'da mutlaka özel SMTP kullanın
2. **Rate Limiting**: E-posta gönderim limitlerini kontrol edin
3. **Template**: E-posta template'lerini markanıza uygun şekilde özelleştirin
4. **Monitoring**: E-posta gönderim loglarını takip edin

## 🚀 Production Hazırlığı

1. ✅ Özel SMTP servisi yapılandırın
2. ✅ E-posta template'lerini özelleştirin
3. ✅ Redirect URL'lerini production domain'i ile güncelleyin
4. ✅ Site URL'ini production domain'i ile güncelleyin
5. ✅ Rate limiting ayarlarını kontrol edin

Bu adımları tamamladıktan sonra e-posta onay sistemi tam olarak çalışacaktır!
