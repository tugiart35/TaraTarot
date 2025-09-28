# 🃏 Tarot Bileşenleri API Referansı

**Oluşturulma Tarihi:** 20 Ocak 2025  
**Versiyon:** 2.0  
**Güncelleyen:** AI Assistant

---

## 📋 İçindekiler

1. [Shared Bileşenler](#shared-bileşenler)
2. [Tema Sistemi](#tema-sistemi)
3. [TypeScript Tipleri](#typescript-tipleri)
4. [Kullanım Örnekleri](#kullanım-örnekleri)
5. [Best Practices](#best-practices)

---

## 🔧 Shared Bileşenler

### 1. TarotFormModal

**Dosya:** `src/features/tarot/components/shared/forms/TarotFormModal.tsx`

#### Props Interface

```typescript
interface TarotFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  theme: FormTheme;
  loading?: boolean;
  error?: string;
}
```

#### FormData Interface

```typescript
interface FormData {
  name: string;
  birthDate: string;
  question: string;
}
```

#### Kullanım Örneği

```tsx
<TarotFormModal
  isOpen={showForm}
  onClose={() => setShowForm(false)}
  onSubmit={handleFormSubmit}
  theme={loveFormTheme}
  loading={isSubmitting}
  error={formError}
/>
```

#### Tema Konfigürasyonu

```typescript
const loveFormTheme: FormTheme = {
  primary: 'pink',
  secondary: 'purple',
  accent: 'rose',
  background: 'white',
  text: 'gray-900',
  border: 'gray-200',
  focus: 'pink-500',
  error: 'red-500',
  success: 'green-500',
};
```

---

### 2. CreditConfirmModal

**Dosya:** `src/features/tarot/components/shared/modals/CreditConfirmModal.tsx`

#### Props Interface

```typescript
interface CreditConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  creditCost: number;
  theme: ModalTheme;
  loading?: boolean;
  userCredits?: number;
}
```

#### Kullanım Örneği

```tsx
<CreditConfirmModal
  isOpen={showCreditModal}
  onClose={() => setShowCreditModal(false)}
  onConfirm={handleCreditConfirm}
  creditCost={LOVE_CREDIT_COST}
  theme={loveModalTheme}
  loading={isProcessing}
  userCredits={userCredits}
/>
```

#### Tema Konfigürasyonu

```typescript
const loveModalTheme: ModalTheme = {
  primary: 'pink',
  secondary: 'purple',
  background: 'white',
  overlay: 'black/50',
  border: 'gray-200',
  text: 'gray-900',
  button: {
    primary: 'pink-500',
    secondary: 'gray-500',
    hover: 'pink-600',
  },
};
```

---

### 3. SuccessModal

**Dosya:** `src/features/tarot/components/shared/modals/SuccessModal.tsx`

#### Props Interface

```typescript
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewReading: () => void;
  theme: SuccessModalTheme;
  readingId?: string;
  shareUrl?: string;
}
```

#### Kullanım Örneği

```tsx
<SuccessModal
  isOpen={showSuccessModal}
  onClose={() => setShowSuccessModal(false)}
  onNewReading={() => handleNewReading()}
  theme={loveSuccessTheme}
  readingId={reading.id}
  shareUrl={`/reading/${reading.id}`}
/>
```

#### Tema Konfigürasyonu

```typescript
const loveSuccessTheme: SuccessModalTheme = {
  primary: 'pink',
  secondary: 'purple',
  background: 'white',
  overlay: 'black/50',
  border: 'gray-200',
  text: 'gray-900',
  success: 'green-500',
  button: {
    primary: 'pink-500',
    secondary: 'gray-500',
    hover: 'pink-600',
  },
};
```

---

### 4. TarotReadingLayout

**Dosya:** `src/features/tarot/components/shared/layouts/TarotReadingLayout.tsx`

#### Props Interface

```typescript
interface TarotReadingLayoutProps {
  theme: LayoutTheme;
  isLoading?: boolean;
  header?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}
```

#### Kullanım Örneği

```tsx
<TarotReadingLayout
  theme={loveLayoutTheme}
  isLoading={isLoading}
  header={<ReadingHeader />}
  content={<ReadingContent />}
  footer={<ReadingFooter />}
  className="min-h-screen"
/>
```

#### Tema Konfigürasyonu

```typescript
const loveLayoutTheme: LayoutTheme = {
  primary: 'pink',
  secondary: 'purple',
  background: 'gradient-to-br from-pink-50 to-purple-50',
  header: {
    background: 'white',
    border: 'gray-200',
    text: 'gray-900',
  },
  content: {
    background: 'transparent',
    padding: '2rem',
  },
  footer: {
    background: 'white',
    border: 'gray-200',
    text: 'gray-600',
  },
};
```

---

### 5. TarotReadingSaver

**Dosya:** `src/features/tarot/components/shared/utils/TarotReadingSaver.tsx`

#### Props Interface

```typescript
interface TarotReadingSaverProps {
  reading: TarotReading;
  onSave: (reading: TarotReading) => void;
  onError: (error: string) => void;
  autoSave?: boolean;
  delay?: number;
}
```

#### TarotReading Interface

```typescript
interface TarotReading {
  id: string;
  type: ReadingType;
  cards: TarotCard[];
  positions: CardPosition[];
  interpretation: string;
  createdAt: Date;
  userId: string;
}
```

#### Kullanım Örneği

```tsx
<TarotReadingSaver
  reading={readingData}
  onSave={handleSave}
  onError={handleError}
  autoSave={true}
  delay={2000}
/>
```

---

## 🎨 Tema Sistemi

### Tema Tipleri

#### FormTheme

```typescript
interface FormTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
  focus: string;
  error: string;
  success: string;
}
```

#### ModalTheme

```typescript
interface ModalTheme {
  primary: string;
  secondary: string;
  background: string;
  overlay: string;
  border: string;
  text: string;
  button: {
    primary: string;
    secondary: string;
    hover: string;
  };
}
```

#### SuccessModalTheme

```typescript
interface SuccessModalTheme extends ModalTheme {
  success: string;
}
```

#### LayoutTheme

```typescript
interface LayoutTheme {
  primary: string;
  secondary: string;
  background: string;
  header: {
    background: string;
    border: string;
    text: string;
  };
  content: {
    background: string;
    padding: string;
  };
  footer: {
    background: string;
    border: string;
    text: string;
  };
}
```

### Önceden Tanımlı Temalar

#### Love Theme (Pink/Purple)

```typescript
const loveFormTheme: FormTheme = {
  primary: 'pink',
  secondary: 'purple',
  accent: 'rose',
  background: 'white',
  text: 'gray-900',
  border: 'gray-200',
  focus: 'pink-500',
  error: 'red-500',
  success: 'green-500',
};
```

#### Career Theme (Blue/Gray)

```typescript
const careerFormTheme: FormTheme = {
  primary: 'blue',
  secondary: 'gray',
  accent: 'indigo',
  background: 'white',
  text: 'gray-900',
  border: 'gray-200',
  focus: 'blue-500',
  error: 'red-500',
  success: 'green-500',
};
```

#### General Theme (Green/Teal)

```typescript
const generalFormTheme: FormTheme = {
  primary: 'green',
  secondary: 'teal',
  accent: 'emerald',
  background: 'white',
  text: 'gray-900',
  border: 'gray-200',
  focus: 'green-500',
  error: 'red-500',
  success: 'green-500',
};
```

---

## 📝 Kullanım Örnekleri

### Yeni Açılım Türü Oluşturma

```tsx
// 1. Tema konfigürasyonu
const newSpreadFormTheme: FormTheme = {
  primary: 'purple',
  secondary: 'indigo',
  accent: 'violet',
  background: 'white',
  text: 'gray-900',
  border: 'gray-200',
  focus: 'purple-500',
  error: 'red-500',
  success: 'green-500',
};

// 2. Ana bileşen
const NewSpreadReading = () => {
  const [showForm, setShowForm] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <TarotReadingLayout theme={newSpreadLayoutTheme}>
      <TarotFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        theme={newSpreadFormTheme}
      />

      <CreditConfirmModal
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        onConfirm={handleCreditConfirm}
        creditCost={NEW_SPREAD_CREDIT_COST}
        theme={newSpreadModalTheme}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onNewReading={() => handleNewReading()}
        theme={newSpreadSuccessTheme}
      />

      {/* Özel içerik */}
      <div className="new-spread-content">
        {/* Yeni açılım özel bileşenleri */}
      </div>
    </TarotReadingLayout>
  );
};
```

### Tema Özelleştirme

```tsx
// Özel tema oluşturma
const customTheme: FormTheme = {
  primary: 'custom-color',
  secondary: 'another-color',
  // ... diğer özellikler
};

// CSS değişkenleri ile
const customThemeWithCSS: FormTheme = {
  primary: 'var(--custom-primary)',
  secondary: 'var(--custom-secondary)',
  // ... diğer özellikler
};
```

---

## 🏆 Best Practices

### 1. Tema Kullanımı

- Her açılım türü için uygun tema seç
- Tutarlı renk paleti kullan
- Accessibility standartlarına uy

### 2. Error Handling

```tsx
// Error boundary kullan
<ErrorBoundary fallback={<ErrorFallback />}>
  <TarotFormModal {...props} />
</ErrorBoundary>;

// Try-catch ile error yakalama
try {
  await handleFormSubmit(data);
} catch (error) {
  setFormError(error.message);
}
```

### 3. Loading States

```tsx
// Loading state göster
<TarotFormModal {...props} loading={isSubmitting} />;

// Skeleton loader kullan
{
  isLoading ? <SkeletonLoader /> : <Content />;
}
```

### 4. Responsive Design

```tsx
// Mobile-first yaklaşım
<div className="w-full md:w-1/2 lg:w-1/3">
  <TarotFormModal {...props} />
</div>
```

### 5. Accessibility

```tsx
// ARIA labels ekle
<TarotFormModal {...props} aria-label="Tarot reading form" role="dialog" />
```

---

## 🧪 Testing

### Unit Test Örneği

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { TarotFormModal } from './TarotFormModal';

describe('TarotFormModal', () => {
  it('should render form when open', () => {
    render(
      <TarotFormModal
        isOpen={true}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
        theme={loveFormTheme}
      />
    );

    expect(screen.getByLabelText('Ad Soyad')).toBeInTheDocument();
  });

  it('should call onSubmit when form is submitted', () => {
    const mockSubmit = jest.fn();
    render(
      <TarotFormModal
        isOpen={true}
        onClose={jest.fn()}
        onSubmit={mockSubmit}
        theme={loveFormTheme}
      />
    );

    fireEvent.click(screen.getByText('Okumaya Başla'));
    expect(mockSubmit).toHaveBeenCalled();
  });
});
```

---

## 📚 Kaynaklar

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Testing Library](https://testing-library.com/)

---

**Son Güncelleme:** 20 Ocak 2025  
**Versiyon:** 2.0  
**Durum:** ✅ Tamamlandı
