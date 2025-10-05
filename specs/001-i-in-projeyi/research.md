# Research: Tarot Kart Bilgi Sayfaları

**Feature**: Tarot Kart Bilgi Sayfaları (Blog/SEO)  
**Date**: 2025-01-27  
**Status**: Complete

## Research Findings

### 1. Next.js App Router Dynamic Routes

**Decision**: `src/app/[locale]/(main)/kartlar/[slug]/page.tsx` yapısı
kullanılacak

**Rationale**:

- Next.js 13+ App Router ile dinamik route'lar
- Locale-based routing (tr/en/sr) için `[locale]` segment
- SEO-friendly URL'ler için `[slug]` parametresi
- Mevcut proje yapısına uygun

**Alternatives considered**:

- Static generation: 78 kart × 3 dil = 234 sayfa için çok fazla build time
- API routes: SEO için server-side rendering gerekli
- Middleware routing: Karmaşık, App Router daha basit

### 2. Multilingual URL Structure

**Decision**: Dile özgü doğal kelimeler kullanılacak

**Rationale**:

- TR: `/tr/kartlar/joker`, `/tr/kartlar/yuksek-rahibe`
- EN: `/en/cards/the-fool`, `/en/cards/the-high-priestess`
- SR: `/sr/kartice/joker`, `/sr/kartice/visoka-svestenica`

**Alternatives considered**:

- Tek URL yapısı: SEO performansı düşük
- ID-based routing: Kullanıcı dostu değil
- Hybrid approach: Karmaşık, tutarlılık sorunu

### 3. SEO Optimization Strategy

**Decision**: Comprehensive SEO approach

**Rationale**:

- Meta titles: "[Kart Adı] — Anlamı, Aşk & Kariyer | BüşBüşKimKi"
- Meta descriptions: 120-155 karakter, anahtar kelimeler
- Canonical URLs: Self-referencing
- Hreflang tags: Tüm diller arası link
- JSON-LD structured data: FAQPage, Article, Breadcrumb

**Alternatives considered**:

- Basic meta tags: Yetersiz SEO performansı
- Over-optimization: Spam riski
- Manual SEO: Ölçeklenemez

### 4. Data Architecture

**Decision**: Supabase PostgreSQL + TypeScript types

**Rationale**:

- Mevcut Supabase altyapısı kullanılacak
- TypeScript strict typing
- RLS policies ile güvenlik
- Real-time capabilities (gelecekte)

**Alternatives considered**:

- File-based data: Ölçeklenemez
- External CMS: Karmaşık, maliyetli
- Database migration: Mevcut yapıyı bozar

### 5. Component Architecture

**Decision**: Feature-based modular structure

**Rationale**:

- `src/features/tarot-cards/` modülü
- Self-contained components
- Shared utilities
- Testable architecture

**Alternatives considered**:

- Monolithic components: Bakım zorluğu
- Page-based structure: Tekrar kullanım zorluğu
- Atomic design: Bu proje için aşırı

### 6. Image Optimization

**Decision**: Next.js Image component + WebP format

**Rationale**:

- Automatic optimization
- Lazy loading
- Responsive images
- 4:5 aspect ratio (tarot kartları için ideal)

**Alternatives considered**:

- Manual optimization: Zaman alıcı
- External CDN: Maliyetli
- Base64 encoding: Performance sorunu

### 7. Performance Strategy

**Decision**: Core Web Vitals optimization

**Rationale**:

- LCP <2.5s: Optimized images + lazy loading
- FID <100ms: Minimal JavaScript
- CLS <0.1: Proper image dimensions
- Lighthouse SEO ≥90: Comprehensive meta tags

**Alternatives considered**:

- Client-side rendering: SEO sorunu
- Server-side only: Interactivity sorunu
- Hybrid approach: Karmaşık

### 8. Testing Strategy

**Decision**: TDD approach with multiple test types

**Rationale**:

- Contract tests: API endpoints
- Integration tests: User flows
- Component tests: React Testing Library
- E2E tests: Playwright (critical paths)

**Alternatives considered**:

- Manual testing: Ölçeklenemez
- Unit tests only: Integration sorunları
- E2E only: Yavaş, flaky

### 9. Content Management

**Decision**: Structured data approach

**Rationale**:

- TypeScript interfaces ile type safety
- Validation ile data integrity
- Version control ile change tracking
- Automated content generation

**Alternatives considered**:

- CMS integration: Karmaşık, maliyetli
- Manual content: Ölçeklenemez
- External API: Dependency riski

### 10. MVP Strategy

**Decision**: 2 kart ile başlama (The Fool, The High Priestess)

**Rationale**:

- Risk azaltma
- Performance test
- User feedback
- Iterative improvement

**Alternatives considered**:

- Tüm kartlar: Risk yüksek
- 1 kart: Yetersiz test
- 5+ kart: Karmaşık

## Technical Dependencies

### Core Dependencies

- **Next.js 15.5.4**: App Router, SSR, optimization
- **React 18.3.1**: Component library
- **TypeScript 5.9.2**: Type safety
- **next-intl 4.3.6**: Internationalization
- **Supabase**: Database, auth, storage

### UI Dependencies

- **Tailwind CSS**: Styling
- **React Hook Form**: Form handling
- **Zod**: Validation
- **Framer Motion**: Animations

### Testing Dependencies

- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing

### SEO Dependencies

- **next-seo**: SEO optimization
- **structured-data**: JSON-LD generation

## Implementation Notes

### URL Mapping Strategy

- Card name mapping için `card-name-mapping.ts` kullanılacak
- Slug generation için URL-friendly string conversion
- Locale-specific routing için next-intl routing

### SEO Content Strategy

- Her kart için 3 dilde tam içerik
- FAQ şeması minimum 3, maksimum 6 soru/cevap
- Breadcrumb navigation
- Related cards önerisi

### Performance Considerations

- Image lazy loading
- Code splitting
- Bundle optimization
- Caching strategies

### Security Considerations

- Input sanitization (DOMPurify)
- XSS protection
- CSRF protection
- Content Security Policy

## Success Metrics

### Technical Metrics

- Lighthouse SEO score ≥90
- Core Web Vitals compliance
- TypeScript strict mode compliance
- Test coverage ≥80%

### Business Metrics

- Organic search traffic increase
- User engagement (time on page)
- Conversion rate (CTA clicks)
- International reach (3 languages)

## Risk Assessment

### High Risk

- Content quality across 3 languages
- SEO performance in different markets
- Performance with 234 pages

### Medium Risk

- URL structure complexity
- Image optimization
- Testing coverage

### Low Risk

- Technical implementation
- Component architecture
- Database design

## Next Steps

1. **Phase 1**: Data model ve contracts oluştur
2. **Phase 2**: Task generation
3. **Phase 3**: Implementation
4. **Phase 4**: Testing ve optimization
5. **Phase 5**: Launch ve monitoring

---

**Research Status**: ✅ Complete  
**Ready for**: Phase 1 (Design & Contracts)
