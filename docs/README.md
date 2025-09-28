# 📚 Tarot Dokümantasyon Merkezi

**Oluşturulma Tarihi:** 20 Ocak 2025  
**Versiyon:** 2.0  
**Güncelleyen:** AI Assistant

---

## 🎯 Genel Bakış

Bu dokümantasyon merkezi, Tarot bileşenlerinin modüler sistemine geçiş sürecini
ve yeni yapıyı detaylı olarak açıklar. Eski monolitik sistemden (v1.0) yeni
modüler sisteme (v2.0) geçiş yapılmıştır.

---

## 📋 Dokümantasyon Listesi

### 🏗️ Ana Dokümantasyonlar

1. **[TAROT_FILE_STRUCTURE.md](./TAROT_FILE_STRUCTURE.md)**
   - Genel dosya yapısı
   - Bileşen açıklamaları
   - Migration rehberi
   - Performans karşılaştırması

2. **[TAROT_FILE_STRUCTURE_ASCII.md](./TAROT_FILE_STRUCTURE_ASCII.md)**
   - ASCII diyagramlar
   - Görsel dosya yapısı
   - Bileşen ilişkileri
   - Geliştirme akışı

3. **[TAROT_COMPONENTS_API.md](./TAROT_COMPONENTS_API.md)**
   - API referansı
   - TypeScript tipleri
   - Kullanım örnekleri
   - Best practices

---

## 🚀 Hızlı Başlangıç

### Yeni Açılım Türü Ekleme

```bash
# 1. Yeni klasör oluştur
mkdir -p src/features/tarot/components/spreads/new-spread

# 2. Ana bileşeni oluştur
touch src/features/tarot/components/spreads/new-spread/NewSpreadReading.tsx

# 3. Tema konfigürasyonu ekle
# 4. Shared bileşenleri kullan
# 5. Test et
```

### Mevcut Açılımı Güncelleme

```bash
# 1. Backup al
cp LoveTarot.tsx LoveTarot.tsx.backup

# 2. Yeni bileşeni oluştur
# 3. Import'ları güncelle
# 4. Test et
```

---

## 📊 Sistem Karşılaştırması

| Özellik                | Eski Sistem (v1.0) | Yeni Sistem (v2.0) |
| ---------------------- | ------------------ | ------------------ |
| **Dosya Boyutu**       | 1123 satır         | 200 satır          |
| **Maintainability**    | Düşük              | Yüksek             |
| **Test Edilebilirlik** | Zor                | Kolay              |
| **Yeniden Kullanım**   | Yok                | Tam                |
| **Bundle Size**        | Büyük              | Küçük              |
| **Development Speed**  | Yavaş              | Hızlı              |

---

## 🔧 Geliştirme Araçları

### Gerekli Paketler

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0"
  },
  "devDependencies": {
    "@testing-library/react": "^13.0.0",
    "@testing-library/jest-dom": "^5.0.0"
  }
}
```

### Komutlar

```bash
# Development server
npm run dev

# Build
npm run build

# Test
npm run test

# Lint
npm run lint
```

---

## 🎨 Tema Sistemi

### Önceden Tanımlı Temalar

- **Love Theme:** Pink/Purple (Aşk açılımı)
- **Career Theme:** Blue/Gray (Kariyer açılımı)
- **General Theme:** Green/Teal (Genel açılım)

### Özel Tema Oluşturma

```typescript
const customTheme: FormTheme = {
  primary: 'purple',
  secondary: 'indigo',
  // ... diğer özellikler
};
```

---

## 🧪 Testing

### Test Stratejisi

1. **Unit Tests:** Bileşen seviyesinde
2. **Integration Tests:** Bileşen etkileşimleri
3. **E2E Tests:** Kullanıcı akışları

### Test Örnekleri

```typescript
// Unit test
describe('TarotFormModal', () => {
  it('should render form when open', () => {
    // Test implementation
  });
});
```

---

## 📈 Performans

### Optimizasyonlar

- **Code Splitting:** Lazy loading
- **Bundle Size:** Tree shaking
- **Render:** Memoization
- **Images:** Optimization

### Metrikler

- **First Load:** < 2s
- **Bundle Size:** < 500KB
- **Lighthouse Score:** > 90

---

## 🔒 Güvenlik

### Güvenlik Önlemleri

- **Input Validation:** Form verileri
- **XSS Protection:** Sanitization
- **CSRF Protection:** Token validation
- **Rate Limiting:** API koruması

---

## 🌐 Internationalization (i18n)

### Desteklenen Diller

- **Türkçe (tr):** Ana dil
- **İngilizce (en):** İkinci dil
- **Sırpça (sr):** Üçüncü dil

### Kullanım

```typescript
const { t } = useTranslations();
return <h1>{t('tarot.title')}</h1>;
```

---

## 📱 Responsive Design

### Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Mobile-First Yaklaşım

```css
/* Mobile first */
.component {
  width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    width: 50%;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    width: 33.333%;
  }
}
```

---

## ♿ Accessibility

### ARIA Labels

```tsx
<TarotFormModal
  aria-label="Tarot reading form"
  role="dialog"
  aria-modal="true"
/>
```

### Keyboard Navigation

- **Tab:** Form elemanları arası geçiş
- **Enter:** Form gönderimi
- **Escape:** Modal kapatma

---

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 📞 Destek

### Sorun Bildirimi

- **GitHub Issues:** Bug reports
- **Code Review:** Pull requests
- **Documentation:** Wiki updates

### Geliştirme

- **Feature Branch:** Yeni özellikler
- **Pull Request:** Code review
- **Testing:** Test coverage

---

## 📚 Kaynaklar

### Dokümantasyon

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

### Araçlar

- [Testing Library](https://testing-library.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## 🎉 Başarılar

### Tamamlanan Görevler

- ✅ **Rate limiting** aktif edildi
- ✅ **Console.log'lar** temizlendi
- ✅ **ESLint hataları** düzeltildi
- ✅ **TypeScript any types** düzeltildi
- ✅ **Image optimization** aktif edildi
- ✅ **Gereksiz React import'ları** kaldırıldı
- ✅ **ESLint build'de** aktif edildi
- ✅ **TarotCard interface duplikasyonu** çözüldü
- ✅ **Kullanılmayan değişkenler** temizlendi
- ✅ **Hardcoded strings'ler** i18n'e taşındı
- ✅ **God Files'ları böl** (LoveTarot.tsx) - Modüler sistem oluşturuldu

### İlerleme

- **Toplam Görev:** 12
- **Tamamlanan:** 11
- **Kalan:** 1
- **İlerleme:** %92

---

**Son Güncelleme:** 20 Ocak 2025  
**Versiyon:** 2.0  
**Durum:** ✅ Tamamlandı
