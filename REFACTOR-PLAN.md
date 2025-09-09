# 🚀 REFACTOR PLAN - Busbuskimki Tarot Uygulaması

**Plan Tarihi:** 20 Ocak 2025  
**Versiyon:** 1.0.0  
**Kapsam:** Uzun vadeli mimari iyileştirme ve modülerleştirme planı

---

## 📋 EXECUTIVE SUMMARY

Bu refactor planı, Busbuskimki Tarot uygulamasının mevcut durumundan modern, ölçeklenebilir ve sürdürülebilir bir mimariye geçişini hedefler. Plan, 3 fazda uygulanacak ve her faz belirli hedeflere odaklanacaktır.

### Hedefler
- **Modülerlik:** Feature-based architecture
- **Performans:** Bundle size %50 azaltma
- **Güvenlik:** Enterprise-level security
- **Sürdürülebilirlik:** Test coverage %80+
- **Developer Experience:** Modern tooling ve best practices

---

## 🎯 PHASE 1: FOUNDATION (1-2 Hafta)

### 1.1 Critical Fixes
**Süre:** 2-3 gün  
**Öncelik:** Yüksek

#### Type Safety Improvements
```typescript
// Öncesi: Duplicate interfaces
// src/types/tarot.ts - TarotCard interface
// src/types/reading.types.ts - Duplicate TarotCard interface

// Sonrası: Single source of truth
// src/types/tarot.ts - Master TarotCard interface
// src/types/reading.types.ts - Import from master
```

#### Console.log Cleanup
```bash
# Tüm console.log'ları temizle
find src -name "*.ts" -o -name "*.tsx" | xargs grep -l "console\.log" | wc -l
# Hedef: 0 console.log
```

#### Environment Variables
```env
# .env.local - Eksik değişkenleri ekle
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_PHONE=+90 (555) 123 45 67
NEXT_PUBLIC_APP_NAME=TarotNumeroloji
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=development
```

### 1.2 Security Hardening
**Süre:** 2-3 gün  
**Öncelik:** Yüksek

#### Rate Limiting Implementation
```typescript
// src/middleware.ts
const RATE_LIMIT_CONFIG = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP'
};

// IP-based rate limiting
const rateLimitMap = new Map();
```

#### XSS Protection
```typescript
// src/lib/security/sanitizer.ts
import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input);
};

export const validateEmail = (email: string): boolean => {
  const sanitized = sanitizeInput(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) && sanitized === email;
};
```

#### CSRF Protection
```typescript
// src/lib/security/csrf.ts
import { randomBytes } from 'crypto';

export const generateCSRFToken = (): string => {
  return randomBytes(32).toString('hex');
};

export const validateCSRFToken = (token: string, sessionToken: string): boolean => {
  return token === sessionToken;
};
```

### 1.3 Performance Optimization
**Süre:** 3-4 gün  
**Öncelik:** Orta

#### Bundle Size Reduction
```typescript
// Lazy loading implementation
const LoveInterpretation = lazy(() => import('./LoveInterpretation'));
const LoveCardRenderer = lazy(() => import('./LoveCardRenderer'));

// Code splitting
const TarotPage = dynamic(() => import('./TarotPage'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

#### Image Optimization
```typescript
// Next.js Image component usage
import Image from 'next/image';

<Image
  src="/cards/rws/0.jpg"
  alt="Tarot Card"
  width={200}
  height={300}
  priority={false}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

---

## 🏗️ PHASE 2: ARCHITECTURE (2-3 Hafta)

### 2.1 God Files Refactoring
**Süre:** 1 hafta  
**Öncelik:** Yüksek

#### LoveTarot.tsx Refactoring (1000+ satır)
```typescript
// Öncesi: Monolithic component
// src/features/tarot/components/Love-Spread/LoveTarot.tsx (1000+ satır)

// Sonrası: Modular architecture
// src/features/tarot/components/Love-Spread/
//   ├── LoveTarotContainer.tsx (state management)
//   ├── LoveTarotUI.tsx (UI components)
//   ├── LoveTarotLogic.tsx (business logic)
//   ├── LoveTarotHooks.ts (custom hooks)
//   └── LoveTarotTypes.ts (type definitions)
```

#### Dashboard Page Refactoring (1155 satır)
```typescript
// Öncesi: Monolithic page
// src/app/[locale]/dashboard/page.tsx (1155 satır)

// Sonrası: Modular architecture
// src/app/[locale]/dashboard/
//   ├── page.tsx (main page)
//   ├── components/
//   │   ├── DashboardHeader.tsx
//   │   ├── DashboardStats.tsx
//   │   ├── DashboardProfile.tsx
//   │   └── DashboardActivity.tsx
//   ├── hooks/
//   │   ├── useDashboardData.ts
//   │   └── useDashboardActions.ts
//   └── types/
//       └── dashboard.types.ts
```

### 2.2 Feature-Based Architecture
**Süre:** 1 hafta  
**Öncelik:** Orta

#### Current Structure
```
src/
├── app/
├── features/
│   ├── shared/
│   └── tarot/
├── hooks/
├── lib/
└── types/
```

#### Target Structure
```
src/
├── app/ (Next.js App Router)
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── tarot/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── shared/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── lib/
│   ├── config/
│   ├── security/
│   ├── utils/
│   └── constants/
└── types/
    └── global.types.ts
```

### 2.3 State Management
**Süre:** 3-4 gün  
**Öncelik:** Orta

#### Zustand Implementation
```typescript
// src/lib/stores/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        // Login logic
      },
      logout: async () => {
        // Logout logic
      },
      updateProfile: async (updates) => {
        // Profile update logic
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

#### Tarot Reading Store
```typescript
// src/lib/stores/tarot.store.ts
interface TarotState {
  selectedCards: TarotCard[];
  currentReading: Reading | null;
  readingHistory: Reading[];
  selectCard: (card: TarotCard, position: number) => void;
  clearSelection: () => void;
  saveReading: (reading: Reading) => Promise<void>;
}

export const useTarotStore = create<TarotState>((set, get) => ({
  selectedCards: [],
  currentReading: null,
  readingHistory: [],
  selectCard: (card, position) => {
    // Card selection logic
  },
  clearSelection: () => {
    // Clear selection logic
  },
  saveReading: async (reading) => {
    // Save reading logic
  },
}));
```

---

## 🧪 PHASE 3: QUALITY & TESTING (2-3 Hafta)

### 3.1 Testing Infrastructure
**Süre:** 1 hafta  
**Öncelik:** Orta

#### Testing Setup
```json
// package.json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "vitest": "^1.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

#### Test Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    globals: true,
  },
});
```

### 3.2 Unit Tests
**Süre:** 1 hafta  
**Öncelik:** Orta

#### Component Tests
```typescript
// src/__tests__/components/LoveTarot.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoveTarot } from '@/features/tarot/components/Love-Spread/LoveTarot';

describe('LoveTarot Component', () => {
  test('should render card selection interface', () => {
    render(<LoveTarot />);
    expect(screen.getByText('Kartları Seçin')).toBeInTheDocument();
  });

  test('should handle card selection', async () => {
    render(<LoveTarot />);
    const cardButton = screen.getByTestId('card-0');
    fireEvent.click(cardButton);
    expect(screen.getByText('Kart Seçildi')).toBeInTheDocument();
  });
});
```

#### Hook Tests
```typescript
// src/__tests__/hooks/useReadingCredits.test.ts
import { renderHook, act } from '@testing-library/react';
import { useReadingCredits } from '@/hooks/useReadingCredits';

describe('useReadingCredits Hook', () => {
  test('should check credits correctly', async () => {
    const { result } = renderHook(() => useReadingCredits('LOVE_SPREAD'));
    
    await act(async () => {
      await result.current.checkCredits();
    });
    
    expect(result.current.creditStatus.hasEnoughCredits).toBe(true);
  });
});
```

### 3.3 Integration Tests
**Süre:** 1 hafta  
**Öncelik:** Düşük

#### API Integration Tests
```typescript
// src/__tests__/integration/supabase.test.ts
import { supabase } from '@/lib/supabase/client';

describe('Supabase Integration', () => {
  test('should connect to Supabase', async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    expect(error).toBeNull();
    expect(data).toBeDefined();
  });
});
```

#### E2E Tests
```typescript
// src/__tests__/e2e/tarot-reading.spec.ts
import { test, expect } from '@playwright/test';

test('complete tarot reading flow', async ({ page }) => {
  await page.goto('/tr/tarotokumasi');
  
  // Select reading type
  await page.click('[data-testid="love-spread"]');
  
  // Select cards
  await page.click('[data-testid="card-0"]');
  await page.click('[data-testid="card-1"]');
  await page.click('[data-testid="card-2"]');
  await page.click('[data-testid="card-3"]');
  
  // Submit reading
  await page.click('[data-testid="submit-reading"]');
  
  // Verify interpretation
  await expect(page.locator('[data-testid="interpretation"]')).toBeVisible();
});
```

---

## 🔧 DEVELOPMENT TOOLS & WORKFLOW

### 4.1 Modern Tooling
**Süre:** 3-4 gün  
**Öncelik:** Düşük

#### ESLint Configuration
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

#### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### Husky Git Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### 4.2 CI/CD Pipeline
**Süre:** 2-3 gün  
**Öncelik:** Düşük

#### GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

---

## 📊 PERFORMANCE OPTIMIZATION

### 5.1 Bundle Analysis
**Süre:** 2-3 gün  
**Öncelik:** Orta

#### Bundle Analyzer
```bash
# Bundle size analysis
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

#### Performance Monitoring
```typescript
// src/lib/analytics/performance.ts
export const trackWebVitals = (metric: any) => {
  // Send to analytics service
  if (metric.label === 'web-vital') {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
    });
  }
};
```

### 5.2 Caching Strategy
**Süre:** 2-3 gün  
**Öncelik:** Düşük

#### Service Worker
```typescript
// public/sw.js
const CACHE_NAME = 'tarot-app-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/cards/rws/0.jpg',
  // ... other assets
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

#### API Caching
```typescript
// src/lib/cache/api-cache.ts
class APICache {
  private cache = new Map();
  private ttl = 5 * 60 * 1000; // 5 minutes

  get(key: string) {
    const item = this.cache.get(key);
    if (item && Date.now() - item.timestamp < this.ttl) {
      return item.data;
    }
    return null;
  }

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }
}
```

---

## 🔒 SECURITY ENHANCEMENTS

### 6.1 Advanced Security
**Süre:** 1 hafta  
**Öncelik:** Orta

#### Content Security Policy
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co;"
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];
```

#### Input Validation
```typescript
// src/lib/validation/schemas.ts
import { z } from 'zod';

export const tarotReadingSchema = z.object({
  question: z.string().min(10).max(500),
  readingType: z.enum(['LOVE_SPREAD', 'GENERAL_SPREAD']),
  cards: z.array(z.object({
    id: z.number(),
    position: z.number(),
    isReversed: z.boolean()
  })).length(4)
});

export const userProfileSchema = z.object({
  displayName: z.string().min(2).max(50),
  email: z.string().email(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'])
});
```

### 6.2 Authentication Security
**Süre:** 3-4 gün  
**Öncelik:** Orta

#### Session Management
```typescript
// src/lib/security/session.ts
export class SessionManager {
  private sessions = new Map();
  private maxAge = 24 * 60 * 60 * 1000; // 24 hours

  createSession(userId: string): string {
    const sessionId = crypto.randomUUID();
    this.sessions.set(sessionId, {
      userId,
      createdAt: Date.now(),
      lastActivity: Date.now()
    });
    return sessionId;
  }

  validateSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    
    if (Date.now() - session.lastActivity > this.maxAge) {
      this.sessions.delete(sessionId);
      return false;
    }
    
    session.lastActivity = Date.now();
    return true;
  }
}
```

---

## 📱 PWA ENHANCEMENTS

### 7.1 Offline Support
**Süre:** 1 hafta  
**Öncelik:** Düşük

#### Offline-First Architecture
```typescript
// src/lib/offline/offline-manager.ts
export class OfflineManager {
  private db: IDBDatabase;
  
  async init() {
    this.db = await this.openDB();
  }
  
  async saveReading(reading: Reading) {
    if (navigator.onLine) {
      await this.syncToServer(reading);
    } else {
      await this.saveToLocalDB(reading);
    }
  }
  
  async syncWhenOnline() {
    if (navigator.onLine) {
      const pendingReadings = await this.getPendingReadings();
      for (const reading of pendingReadings) {
        await this.syncToServer(reading);
      }
    }
  }
}
```

#### Background Sync
```typescript
// public/sw.js
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncReadings());
  }
});

async function syncReadings() {
  const pendingReadings = await getPendingReadings();
  for (const reading of pendingReadings) {
    try {
      await syncReading(reading);
      await removePendingReading(reading.id);
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }
}
```

### 7.2 Push Notifications
**Süre:** 3-4 gün  
**Öncelik:** Düşük

#### Notification Service
```typescript
// src/lib/notifications/notification-service.ts
export class NotificationService {
  async requestPermission(): Promise<boolean> {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  async subscribeToNotifications(userId: string) {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY
    });
    
    await this.sendSubscriptionToServer(userId, subscription);
  }
  
  async sendNotification(title: string, body: string) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }
}
```

---

## 📈 MONITORING & ANALYTICS

### 8.1 Error Tracking
**Süre:** 2-3 gün  
**Öncelik:** Orta

#### Sentry Integration
```typescript
// src/lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

export const captureException = (error: Error, context?: any) => {
  Sentry.captureException(error, { extra: context });
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error') => {
  Sentry.captureMessage(message, level);
};
```

#### Performance Monitoring
```typescript
// src/lib/monitoring/performance.ts
export const trackPerformance = () => {
  if (typeof window !== 'undefined') {
    // Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};
```

### 8.2 User Analytics
**Süre:** 2-3 gün  
**Öncelik:** Düşük

#### Custom Analytics
```typescript
// src/lib/analytics/analytics.ts
export class Analytics {
  private events: AnalyticsEvent[] = [];
  
  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
      userId: this.getCurrentUserId()
    };
    
    this.events.push(analyticsEvent);
    this.sendToAnalytics(analyticsEvent);
  }
  
  trackTarotReading(readingType: string, cards: TarotCard[]) {
    this.track('tarot_reading_completed', {
      reading_type: readingType,
      card_count: cards.length,
      cards: cards.map(c => c.id)
    });
  }
}
```

---

## 📋 IMPLEMENTATION TIMELINE

### Phase 1: Foundation (1-2 Hafta)
**Hafta 1:**
- [ ] Type safety improvements
- [ ] Console.log cleanup
- [ ] Environment variables
- [ ] Security hardening (rate limiting, XSS)

**Hafta 2:**
- [ ] Performance optimization
- [ ] Bundle size reduction
- [ ] Image optimization
- [ ] Lazy loading implementation

### Phase 2: Architecture (2-3 Hafta)
**Hafta 3:**
- [ ] LoveTarot.tsx refactoring
- [ ] Dashboard page refactoring
- [ ] God files elimination

**Hafta 4:**
- [ ] Feature-based architecture
- [ ] State management (Zustand)
- [ ] Component modularization

**Hafta 5:**
- [ ] Service layer implementation
- [ ] Hook optimization
- [ ] Type system improvements

### Phase 3: Quality & Testing (2-3 Hafta)
**Hafta 6:**
- [ ] Testing infrastructure setup
- [ ] Unit tests (components, hooks)
- [ ] Integration tests

**Hafta 7:**
- [ ] E2E tests
- [ ] Test coverage optimization
- [ ] CI/CD pipeline

**Hafta 8:**
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] Analytics implementation

---

## 🎯 SUCCESS METRICS

### Performance Metrics
- **Bundle Size:** <1MB (from 2.5MB)
- **First Contentful Paint:** <1.5s
- **Largest Contentful Paint:** <2.5s
- **Cumulative Layout Shift:** <0.1

### Quality Metrics
- **Test Coverage:** >80%
- **TypeScript Errors:** 0
- **ESLint Warnings:** <5
- **Console.log Count:** 0

### Security Metrics
- **Security Score:** 9/10
- **Vulnerability Count:** 0
- **Rate Limiting:** Active
- **XSS Protection:** 100%

### Developer Experience
- **Build Time:** <30s
- **Hot Reload:** <1s
- **Type Checking:** <5s
- **Linting:** <3s

---

## 🚀 DEPLOYMENT STRATEGY

### Blue-Green Deployment
```yaml
# docker-compose.yml
version: '3.8'
services:
  app-blue:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DEPLOYMENT_COLOR=blue
  
  app-green:
    build: .
    ports:
      - "3001:3000"
    environment:
      - DEPLOYMENT_COLOR=green
  
  nginx:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

### Feature Flags
```typescript
// src/lib/feature-flags/feature-flags.ts
export const featureFlags = {
  newTarotUI: process.env.NEXT_PUBLIC_FEATURE_NEW_TAROT_UI === 'true',
  advancedAnalytics: process.env.NEXT_PUBLIC_FEATURE_ADVANCED_ANALYTICS === 'true',
  offlineMode: process.env.NEXT_PUBLIC_FEATURE_OFFLINE_MODE === 'true'
};
```

---

## 📞 MAINTENANCE & SUPPORT

### Code Review Process
1. **Automated Checks:** ESLint, Prettier, TypeScript
2. **Test Coverage:** Minimum 80% coverage
3. **Performance:** Bundle size and performance budgets
4. **Security:** Vulnerability scanning

### Monitoring & Alerting
1. **Error Tracking:** Sentry integration
2. **Performance Monitoring:** Web Vitals tracking
3. **Uptime Monitoring:** Health checks
4. **Security Monitoring:** Rate limiting and attack detection

### Documentation
1. **API Documentation:** OpenAPI/Swagger
2. **Component Documentation:** Storybook
3. **Architecture Documentation:** ADRs (Architecture Decision Records)
4. **Deployment Documentation:** Runbooks

---

**Refactor Plan Tamamlandı:** 20 Ocak 2025  
**Sonraki Adım:** Kritik dosyaları güncelle ve düzelt
