# Performance Targets - Tarot Cards Feature

Bu doküman, tarot kartları özelliği için belirlenen performance hedeflerini ve
bunların nasıl ölçüldüğünü açıklar.

## 🎯 Performance Hedefleri

### Bundle Size

- **Hedef**: < 500KB initial load
- **Ölçüm**: First Load JS boyutu
- **Komut**: `npm run analyze`

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTFB (Time to First Byte)**: < 600ms

### Lighthouse Scores

- **SEO**: ≥ 90
- **Performance**: ≥ 80
- **Accessibility**: ≥ 80
- **Best Practices**: ≥ 80

### Build Performance

- **Build Time**: < 5 dakika (234 sayfa için)
- **Memory Usage**: < 2GB peak
- **Static Generation**: Tüm 234 sayfa için optimize edilmiş

## 📊 Monitoring Araçları

### 1. Bundle Analysis

```bash
# Bundle boyutunu analiz et
npm run analyze

# Server-side bundle analizi
npm run analyze:server

# Browser-side bundle analizi
npm run analyze:browser
```

### 2. Performance Monitoring

```bash
# Performance hedeflerini kontrol et
npm run performance:check

# Build + performance kontrolü
npm run performance:build
```

### 3. Lighthouse Testing

```bash
# Lighthouse CLI ile test
npx lighthouse http://localhost:3000/tr/kartlar/joker --config-path=lighthouse.config.js
```

## 🔧 Optimizasyon Stratejileri

### Bundle Size Optimization

- **Tree Shaking**: Kullanılmayan kodları kaldır
- **Code Splitting**: Route-based ve component-based splitting
- **Dynamic Imports**: Lazy loading için
- **Bundle Analysis**: Büyük paketleri tespit et

### Image Optimization

- **WebP Format**: Modern format kullanımı
- **Lazy Loading**: Intersection Observer ile
- **Responsive Images**: Farklı ekran boyutları için
- **Compression**: Kalite/size dengesi

### Caching Strategy

- **Static Generation**: 234 sayfa için ISG
- **CDN Caching**: Image ve static assets için
- **Browser Caching**: API responses için
- **Memory Caching**: Frequently accessed data için

### Core Web Vitals Optimization

- **LCP**: Critical images optimize et
- **FID**: JavaScript execution optimize et
- **CLS**: Layout shift'i önle
- **FCP**: Critical CSS inline et

## 📈 Performance Metrics

### Bundle Size Metrics

```javascript
// Target: < 500KB
const bundleSize = {
  initial: '< 500KB',
  vendor: '< 200KB',
  common: '< 100KB',
  pages: '< 50KB per page',
};
```

### Core Web Vitals Metrics

```javascript
// Performance targets
const targets = {
  lcp: 2500, // 2.5s
  fid: 100, // 100ms
  cls: 0.1, // 0.1
  fcp: 1800, // 1.8s
  ttfb: 600, // 600ms
};
```

### Build Performance Metrics

```javascript
// Build targets
const buildTargets = {
  totalTime: 300000, // 5 minutes
  memoryPeak: 2147483648, // 2GB
  pagesPerSecond: 1, // 1 page/second
  cacheHitRate: 0.8, // 80%
};
```

## 🚀 Implementation

### 1. Next.js Configuration

```javascript
// next.config.js optimizations
const nextConfig = {
  swcMinify: true,
  compress: true,
  experimental: {
    optimizePackageImports: [...],
    optimizeCss: true,
  },
  webpack: (config) => {
    // Bundle splitting
    config.optimization.splitChunks = {...};
    return config;
  }
};
```

### 2. Performance Monitoring

```typescript
// WebVitals component
import { WebVitals, useWebVitals } from '@/components/performance/WebVitals';

// Layout'ta kullanım
<WebVitals onPerfEntry={(metric) => console.log(metric)} />
```

### 3. Bundle Optimization

```typescript
// Code splitting
const LazyComponent = lazy(() => import('./Component'));

// Dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

## 📋 Checklist

### Bundle Size

- [ ] Initial bundle < 500KB
- [ ] Vendor chunks < 200KB
- [ ] Common chunks < 100KB
- [ ] Tree shaking enabled
- [ ] Dead code elimination

### Core Web Vitals

- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] FCP < 1.8s
- [ ] TTFB < 600ms

### Lighthouse Scores

- [ ] SEO ≥ 90
- [ ] Performance ≥ 80
- [ ] Accessibility ≥ 80
- [ ] Best Practices ≥ 80

### Build Performance

- [ ] Build time < 5 minutes
- [ ] Memory usage < 2GB
- [ ] All 234 pages generated
- [ ] Cache hit rate > 80%

## 🔍 Monitoring Commands

```bash
# Tüm performance hedeflerini kontrol et
npm run performance:check

# Bundle analizi
npm run analyze

# Build + performance
npm run performance:build

# Lighthouse test
npx lighthouse http://localhost:3000/tr/kartlar/joker

# Core Web Vitals test
npm run test:performance
```

## 📊 Performance Report

Performance monitoring sonuçları `performance-report.json` dosyasında saklanır:

```json
{
  "timestamp": "2025-01-27T...",
  "targets": {...},
  "results": {
    "bundleSize": 450000,
    "buildTime": 240000,
    "coreWebVitals": {...},
    "lighthouse": {...}
  },
  "allTargetsMet": true
}
```

## 🎯 Success Criteria

Tüm performance hedefleri karşılandığında:

- ✅ Bundle size < 500KB
- ✅ Core Web Vitals met
- ✅ Lighthouse SEO ≥ 90
- ✅ Build time < 5 minutes
- ✅ All 234 pages optimized

Bu hedefler karşılandığında, tarot kartları özelliği production-ready kabul
edilir.
