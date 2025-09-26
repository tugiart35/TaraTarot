# 🏗️ Modül Konsolidasyon Planı - Büşbüşkimki Tarot

**Tarih:** 2025-01-27  
**Hedef:** Aynı isimli modülleri tek kaynak haline getirerek tutarlı yapı oluşturma  
**Durum:** Analiz Tamamlandı ✅

---

## 📊 Envanter & Bağımlılık Haritası

### 🔍 Tespit Edilen Modül Çakışmaları

#### 1. **Admin Modülü** - 3 Farklı Konum
| Konum | Rol | Export Sayısı | Import Sayısı | Durum |
|-------|-----|----------------|----------------|-------|
| `src/lib/admin/` | Backend services | 7 dosya | 25+ import | ✅ Ana kaynak |
| `src/components/admin/` | UI components | 12 dosya | 15+ import | ✅ UI katmanı |
| `src/hooks/admin/` | Custom hooks | 2 dosya | 8+ import | ✅ Hook katmanı |
| `src/app/[locale]/admin/` | Pages | 9 dosya | 20+ import | ✅ Route katmanı |

**Çakışma Analizi:** ❌ **ÇAKIŞMA YOK** - Farklı katmanlar, birleştirilemez

#### 2. **Auth Modülü** - 4 Farklı Konum  
| Konum | Rol | Export Sayısı | Import Sayısı | Durum |
|-------|-----|----------------|----------------|-------|
| `src/lib/auth/` | Backend services | 4 dosya | 30+ import | ✅ Ana kaynak |
| `src/components/auth/` | UI components | 2 dosya | 10+ import | ✅ UI katmanı |
| `src/hooks/auth/` | Custom hooks | 2 dosya | 40+ import | ✅ Hook katmanı |
| `src/app/[locale]/auth/` | Pages | 3 dosya | 5+ import | ✅ Route katmanı |

**Çakışma Analizi:** ❌ **ÇAKIŞMA YOK** - Farklı katmanlar, birleştirilemez

#### 3. **Shared Modülü** - 2 Farklı Konum
| Konum | Rol | Export Sayısı | Import Sayısı | Durum |
|-------|-----|----------------|----------------|-------|
| `src/features/shared/` | Feature components | 20+ dosya | 50+ import | ✅ Ana kaynak |
| `src/components/shared/` | Legacy components | 3 dosya | 5+ import | ⚠️ **ÇAKIŞMA** |

**Çakışma Analizi:** ⚠️ **ÇAKIŞMA VAR** - Aynı amaç, farklı konumlar

#### 4. **Tarot Modülü** - 2 Farklı Konum
| Konum | Rol | Export Sayısı | Import Sayısı | Durum |
|-------|-----|----------------|----------------|-------|
| `src/features/tarot/` | Feature components | 118+ dosya | 100+ import | ✅ Ana kaynak |
| `src/lib/constants/tarotSpreads.ts` | Constants | 1 dosya | 15+ import | ⚠️ **ÇAKIŞMA** |

**Çakışma Analizi:** ⚠️ **ÇAKIŞMA VAR** - Constants yanlış konumda

---

## 🎯 Hedef Dizin Yapısı

### Önerilen Konsolidasyon

```
src/
├── modules/                          # 🆕 Tekil modül kaynakları
│   ├── admin/                        # Admin modülü (lib + components + hooks)
│   │   ├── services/                 # Backend services (lib/admin/*)
│   │   │   ├── admin-users.ts
│   │   │   ├── api-keys.ts
│   │   │   ├── email-system.ts
│   │   │   ├── maintenance-system.ts
│   │   │   ├── shopier-system.ts
│   │   │   ├── admin-performance.ts
│   │   │   └── admin-error-service.ts
│   │   ├── components/               # UI components (components/admin/*)
│   │   │   ├── UserDetailModal.tsx
│   │   │   ├── CreditManagementModal.tsx
│   │   │   ├── AdminUserModals.tsx
│   │   │   ├── AutoReporting.tsx
│   │   │   ├── AuditLogViewer.tsx
│   │   │   ├── TransactionHistory.tsx
│   │   │   ├── ReadingHistory.tsx
│   │   │   ├── PaymentHistory.tsx
│   │   │   ├── EmailTemplateModals.tsx
│   │   │   ├── AdminLazyComponents.tsx
│   │   │   ├── SimpleAdminLogin.tsx
│   │   │   └── SpreadEditor.tsx
│   │   ├── hooks/                    # Custom hooks (hooks/admin/*)
│   │   │   ├── useAdminData.ts
│   │   │   └── useAdminFilter.ts
│   │   ├── types/                    # Admin-specific types
│   │   │   └── admin.types.ts
│   │   └── index.ts                  # Barrel export
│   │
│   ├── auth/                         # Auth modülü (lib + components + hooks)
│   │   ├── services/                 # Backend services (lib/auth/*)
│   │   │   ├── auth-service.ts
│   │   │   ├── auth-validation.ts
│   │   │   ├── auth-error-messages.ts
│   │   │   ├── auth-accessibility.ts
│   │   │   ├── auth-security.ts
│   │   │   └── auth-seo.ts
│   │   ├── components/               # UI components (components/auth/*)
│   │   │   ├── AuthForm.tsx
│   │   │   └── AuthAccessibilityWrapper.tsx
│   │   ├── hooks/                    # Custom hooks (hooks/auth/*)
│   │   │   ├── useAuth.ts
│   │   │   └── useRememberMe.ts
│   │   ├── types/                    # Auth-specific types
│   │   │   └── auth.types.ts
│   │   └── index.ts                  # Barrel export
│   │
│   ├── shared/                       # Shared modülü (consolidated)
│   │   ├── ui/                       # UI components (features/shared/ui/*)
│   │   │   ├── BaseCardRenderer.tsx
│   │   │   ├── BaseCardDetails.tsx
│   │   │   ├── BaseCardGallery.tsx
│   │   │   ├── BaseCardPosition.tsx
│   │   │   ├── BaseInterpretation.tsx
│   │   │   ├── BaseReadingTypeSelector.tsx
│   │   │   ├── CardDetails.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── LazyComponents.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── PDFExport.tsx
│   │   │   ├── ReadingDetailModal.tsx
│   │   │   └── Toast.tsx
│   │   ├── layout/                   # Layout components (features/shared/layout/*)
│   │   │   ├── BottomNavigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeadTags.tsx
│   │   │   └── RootLayout.tsx
│   │   ├── components/               # Legacy shared components (components/shared/*)
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ConfirmationDialog.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   └── index.ts                  # Barrel export
│   │
│   └── tarot/                        # Tarot modülü (consolidated)
│       ├── components/               # Feature components (features/tarot/components/*)
│       │   ├── Love-Spread/
│       │   │   ├── love-config.ts
│       │   │   ├── LoveCardRenderer.tsx
│       │   │   ├── LoveGuidanceDetail.tsx
│       │   │   ├── LoveInterpretation.tsx
│       │   │   ├── LoveReadingLazy.tsx
│       │   │   └── LoveTarot.tsx
│       │   ├── Career-Spread/
│       │   │   ├── career-config.ts
│       │   │   ├── CareerReadingTypeSelector.tsx
│       │   │   ├── CareerTarot.tsx
│       │   │   └── CareerTarot.tsx.backup
│       │   ├── Marriage/
│       │   │   ├── marriage-config.ts
│       │   │   └── MarriageTarot.tsx
│       │   ├── Money-Spread/
│       │   │   ├── money-config.ts
│       │   │   └── MoneyTarot.tsx
│       │   ├── New-Lover/
│       │   │   ├── new-lover-config.ts
│       │   │   └── NewLoverTarot.tsx
│       │   ├── Problem-Solving/
│       │   │   ├── problem-solving-config.ts
│       │   │   └── ProblemSolvingTarot.tsx
│       │   ├── Relationship-Analysis/
│       │   │   ├── relationship-analysis-config.ts
│       │   │   └── RelationshipAnalysisTarot.tsx
│       │   ├── Relationship-Problems/
│       │   │   ├── relationship-problems-config.ts
│       │   │   └── RelationshipProblemsTarot.tsx
│       │   ├── Situation-Analysis/
│       │   │   ├── situation-analysis-config.ts
│       │   │   ├── SituationAnalysisTarot.tsx
│       │   │   ├── SituationAnalysisTarot.tsx.backup
│       │   │   └── SituationAnalysisTarot.tsx.backup2
│       │   ├── shared/
│       │   │   ├── forms/
│       │   │   │   └── TarotFormModal.tsx
│       │   │   ├── layouts/
│       │   │   │   └── TarotReadingLayout.tsx
│       │   │   ├── modals/
│       │   │   │   ├── CreditConfirmModal.tsx
│       │   │   │   └── SuccessModal.tsx
│       │   │   ├── utils/
│       │   │   │   └── TarotReadingSaver.tsx
│       │   │   └── index.ts
│       │   ├── spreads/
│       │   │   └── love/
│       │   │       └── LoveReadingRefactored.tsx
│       │   ├── standard/
│       │   │   ├── LastReadingSummary.tsx
│       │   │   └── TarotSpreadSelector.tsx
│       │   └── index.ts
│       ├── lib/                      # Business logic (features/tarot/lib/*)
│       │   ├── a-tarot-helpers.ts
│       │   ├── full-tarot-deck.ts
│       │   ├── career/
│       │   │   ├── position-1-gercekten-istedigim-kariyer-bumu.ts
│       │   │   ├── position-2-kariyer-gelistirmek-icin-hangi-adımlar-atabilirim.ts
│       │   │   ├── position-3-kariyerimde-degisteremediğim-taraflar.ts
│       │   │   ├── position-4-kariyerimde-elimden-gelenin-en-iyisi-yapıyormuyum.ts
│       │   │   ├── position-5-kariyerimde-yardimci-olacak-ne-gibi-degisikler.ts
│       │   │   ├── position-6-gecmisimdeki-hangi-engeller.ts
│       │   │   ├── position-7-sonuc-ne-olacak.ts
│       │   │   └── position-meanings-index.ts
│       │   ├── love/
│       │   │   ├── card-name-mapping.ts
│       │   │   ├── i18n-helper.ts
│       │   │   ├── position-1-ilgi-duydugun-kisi.ts
│       │   │   ├── position-2-fiziksel.ts
│       │   │   ├── position-3-baglanti.ts
│       │   │   ├── position-4-uzun-vadeli-surec.ts
│       │   │   └── position-meanings-index.ts
│       │   ├── marriage/
│       │   │   ├── position-1-sonuc-ne-olacak.ts
│       │   │   ├── position-10-evlenebilecek-miyim.ts
│       │   │   ├── position-2-esimi-beklerken-benim-ne-yapmam-gerekiyor.ts
│       │   │   ├── position-3-mali-kaynaklarimizi-birbirimizle-paylasacakmiyiz.ts
│       │   │   ├── position-4-her-ikimizde-baglanmak-isteyecekmiyiz.ts
│       │   │   ├── position-5-benzer-yanlarimiz-olacak-mi.ts
│       │   │   ├── position-6-bu-kisinin-ailesi-beni-kabul-edecek-mi.ts
│       │   │   ├── position-7-birbirimizi-nasil-bulacagiz.ts
│       │   │   ├── position-8-anlasabilecek-miyim.ts
│       │   │   ├── position-9-benim-icin-nasil-bir-es-uygundur.ts
│       │   │   └── position-meanings-index.ts
│       │   ├── money/
│       │   │   ├── position-1-mevcut-finansal-durum.ts
│       │   │   ├── position-2-para-akisi.ts
│       │   │   ├── position-3-finansal-engeller.ts
│       │   │   ├── position-4-firsatlar.ts
│       │   │   ├── position-5-yakin-gelecek.ts
│       │   │   ├── position-6-yeni-mali-planlar.ts
│       │   │   ├── position-7-gelecek-para-planlari.ts
│       │   │   ├── position-8-para-kazanma-yetenekleri.ts
│       │   │   └── position-meanings-index.ts
│       │   ├── new-lover/
│       │   │   ├── position-1-yakinda-yeni-bir-iliskiye.ts
│       │   │   ├── position-2-bu-kisi-hangi-burçtan.ts
│       │   │   ├── position-3-birbirimize-uyumlu-olabilecekmiyiz.ts
│       │   │   ├── position-4-uzun-sureli-iliskim-olacak-mi.ts
│       │   │   ├── position-5-bu-kisi-ruh-esim-olabilirmi.ts
│       │   │   ├── position-6-dilegim-gerceklesecek-mi.ts
│       │   │   └── position-meanings-index.ts
│       │   ├── problem-solving/
│       │   │   ├── position-1-sorulan-soru.ts
│       │   │   ├── position-10-olayin-sonucu.ts
│       │   │   ├── position-2-sorunun-engeli.ts
│       │   │   ├── position-3-suur-alti-konu.ts
│       │   │   ├── position-4-en-iyi-potansiyel.ts
│       │   │   ├── position-5-yakin-gecmiste.ts
│       │   │   ├── position-6-yakin-gelecek.ts
│       │   │   ├── position-7-mevcut-durum.ts
│       │   │   ├── position-8-dis-etkeler.ts
│       │   │   ├── position-9-korkular-endiseler.ts
│       │   │   └── position-meanings-index.ts
│       │   ├── relationship-analysis/
│       │   │   ├── position-1-mevcut-durum.ts
│       │   │   ├── position-2-sizin-hisleriniz.ts
│       │   │   ├── position-3-sizin-beklentileriniz.ts
│       │   │   ├── position-4-tavsiyeler.ts
│       │   │   ├── position-5-yol-haritasi.ts
│       │   │   ├── position-6-partnerinizin-beklentileri.ts
│       │   │   ├── position-7-partnerinizin-hisleri.ts
│       │   │   └── position-meanings-index.ts
│       │   ├── relationship-problems/
│       │   │   ├── position-1-mevcut-durum.ts
│       │   │   ├── position-2-sizin-hisleriniz.ts
│       │   │   ├── position-3-sizin-beklentileriniz.ts
│       │   │   ├── position-4-tavsiyeler.ts
│       │   │   ├── position-5-yol-haritasi.ts
│       │   │   ├── position-6-partnerinizin-beklentileri.ts
│       │   │   ├── position-7-partnerinizin-hisleri.ts
│       │   │   ├── position-8-dis-etkeler.ts
│       │   │   ├── position-9-korkular-endiseler.ts
│       │   │   └── position-meanings-index.ts
│       │   └── situation-analysis/
│       │       ├── position-1-gecmis-sebepler.ts
│       │       ├── position-2-suanki-durum.ts
│       │       ├── position-3-gizli-etkenler.ts
│       │       ├── position-4-merkez-kart.ts
│       │       ├── position-5-dis-etkenler.ts
│       │       ├── position-6-tavsiye.ts
│       │       ├── position-7-olasi-gelecek-sonuc.ts
│       │       └── position-meanings-index.ts
│       ├── constants/                # Constants (lib/constants/tarotSpreads.ts)
│       │   └── tarotSpreads.ts
│       ├── types/                    # Tarot-specific types
│       │   └── tarot.ts
│       └── index.ts                  # Barrel export
│
├── features/                         # Feature-specific modules
│   ├── numerology/                   # Numerology feature (unchanged)
│   │   ├── components/
│   │   │   ├── NumberMeaning.tsx
│   │   │   ├── NumerologyForm.tsx
│   │   │   └── NumerologyResult.tsx
│   │   └── index.ts
│   └── dashboard/                    # Dashboard feature (new)
│       ├── components/
│       │   ├── CreditPackages.tsx
│       │   ├── DashboardContainer.tsx
│       │   ├── NavigationHeader.tsx
│       │   ├── ProfileManagement.tsx
│       │   ├── ProfileModal.tsx
│       │   ├── RecentActivity.tsx
│       │   ├── StatsCards.tsx
│       │   └── WelcomeSection.tsx
│       └── index.ts
│
├── lib/                             # Global utilities (unchanged)
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── utils/
│   │   ├── environment-utils.ts
│   │   ├── geolocation.ts
│   │   ├── index.ts
│   │   ├── ip-utils.ts
│   │   ├── locale-utils.ts
│   │   ├── profile-utils.ts
│   │   ├── rate-limiting.ts
│   │   ├── redirect-utils.ts
│   │   ├── storage.ts
│   │   └── user-id-utils.ts
│   ├── constants/
│   │   ├── credit-packages.ts
│   │   ├── reading-credits.ts
│   │   └── tarotSpreads.ts
│   ├── config/
│   │   ├── app-config.ts
│   │   └── metadata.ts
│   ├── email/
│   │   ├── email-service.ts
│   │   └── shopier-email-templates.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── paths.ts
│   │   └── validation.ts
│   ├── mobile/
│   │   ├── mobile-utils.ts
│   │   └── utils.ts
│   ├── numerology/
│   │   ├── calculators.ts
│   │   ├── meanings.ts
│   │   ├── normalize.ts
│   │   └── types.ts
│   ├── payment/
│   │   ├── payment-types.ts
│   │   ├── payment-utils.ts
│   │   ├── shopier-config.ts
│   │   └── types.ts
│   ├── pdf/
│   │   ├── pdf-generator.ts
│   │   └── tarot-okuma-144f879b-2025-09-12 (1).pdf
│   ├── reporting/
│   │   └── export-utils.ts
│   ├── security/
│   │   ├── 2fa.ts
│   │   ├── audit-logger.ts
│   │   ├── audit-types.ts
│   │   ├── rate-limiter.ts
│   │   └── two-factor-auth.ts
│   ├── services/
│   │   ├── admin-detection-service.ts
│   │   └── auth-error-service.ts
│   ├── theme/
│   │   └── theme-config.ts
│   ├── tarotspread/
│   │   └── Tarot-Spread-career-and-money.webp
│   ├── api/
│   │   ├── email-cors.ts
│   │   ├── error-responses.ts
│   │   ├── geolocation-cors.ts
│   │   └── geolocation-responses.ts
│   ├── cache/
│   ├── audit-logger.ts
│   ├── error-handler.ts
│   ├── logger.ts
│   ├── rate-limiter.ts
│   ├── seo.ts
│   └── session-manager.ts
│
├── hooks/                           # Global hooks (unchanged)
│   ├── __tests__/
│   │   ├── test-utils.tsx
│   │   ├── useErrorBoundary.test.ts
│   │   └── useInputValidation.test.ts
│   ├── utils/
│   │   ├── useAsyncState.ts
│   │   ├── useLocalStorage.ts
│   │   └── usePrevious.ts
│   ├── useAuthAdmin.ts
│   ├── useDashboardActions.ts
│   ├── useDashboardData.ts
│   ├── useDebounce.ts
│   ├── useErrorBoundary.ts
│   ├── useFocusTrap.ts
│   ├── useGeolocation.ts
│   ├── useInputValidation.ts
│   ├── useNavigation.ts
│   ├── usePageMeta.ts
│   ├── usePageTracking.ts
│   ├── usePayment.ts
│   ├── usePerformanceMonitoring.ts
│   ├── useReadingCredits.ts
│   ├── useShopier.ts
│   ├── useSimpleAdmin.ts
│   ├── useTarotReading.ts
│   ├── useToast.ts
│   ├── useTouchScroll.ts
│   └── useTranslations.ts
│
├── types/                           # Global types (unchanged)
│   ├── admin.types.ts
│   ├── auth.types.ts
│   ├── dashboard.types.ts
│   ├── layout.ts
│   ├── reading.types.ts
│   ├── tarot.ts
│   └── ui.ts
│
├── components/                      # Legacy components (unchanged)
│   ├── admin/
│   │   ├── __tests__/
│   │   │   ├── SimpleAdminLogin.test.tsx
│   │   │   └── UserDetailModal.test.tsx
│   │   ├── AdminLazyComponents.tsx
│   │   ├── AdminUserModals.tsx
│   │   ├── AuditLogViewer.tsx
│   │   ├── AutoReporting.tsx
│   │   ├── CreditManagementModal.tsx
│   │   ├── EmailTemplateModals.tsx
│   │   ├── PaymentHistory.tsx
│   │   ├── ReadingHistory.tsx
│   │   ├── SimpleAdminLogin.tsx
│   │   ├── SpreadEditor.tsx
│   │   ├── TransactionHistory.tsx
│   │   └── UserDetailModal.tsx
│   ├── auth/
│   │   ├── __tests__/
│   │   │   └── AuthForm.test.tsx
│   │   ├── AuthAccessibilityWrapper.tsx
│   │   └── AuthForm.tsx
│   ├── dashboard/
│   │   ├── CreditPackages.tsx
│   │   ├── DashboardContainer.tsx
│   │   ├── NavigationHeader.tsx
│   │   ├── ProfileManagement.tsx
│   │   ├── ProfileModal.tsx
│   │   ├── RecentActivity.tsx
│   │   ├── StatsCards.tsx
│   │   └── WelcomeSection.tsx
│   ├── layout/
│   │   └── LayoutErrorBoundary.tsx
│   ├── numerology/
│   │   └── NumerologyErrorBoundary.tsx
│   ├── payment/
│   │   └── PaymentErrorBoundary.tsx
│   ├── seo/
│   │   └── StructuredData.tsx
│   ├── shared/
│   │   └── ui/
│   │       ├── ConfirmationDialog.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── LoadingSpinner.tsx
│   └── PageTrackingProvider.tsx
│
├── providers/                       # React providers (unchanged)
│   ├── IntlProvider.tsx
│   ├── MinimalAuthProvider.tsx
│   └── PWAAuthProvider.tsx
│
├── middleware/                      # Middleware (unchanged)
│   └── maintenance.ts
│
├── middleware.ts                    # Main middleware
│
├── i18n/                           # Internationalization (unchanged)
│   └── request.ts
│
├── utils/                          # Global utilities (unchanged)
│   ├── colorContrast.ts
│   ├── dashboard/
│   │   ├── routing-utils.ts
│   │   └── user-level-utils.ts
│   ├── dashboard-utils.ts
│   └── security.ts
│
└── app/                            # Next.js App Router (unchanged)
    ├── [locale]/
    │   ├── (main)/
    │   │   ├── legal/
    │   │   │   ├── about/page.tsx
    │   │   │   ├── accessibility/page.tsx
    │   │   │   ├── child-privacy/page.tsx
    │   │   │   ├── contact/page.tsx
    │   │   │   ├── cookie-policy/page.tsx
    │   │   │   ├── copyright-policy/page.tsx
    │   │   │   ├── disclaimer/page.tsx
    │   │   │   ├── kvkk-disclosure/page.tsx
    │   │   │   ├── payment-terms/page.tsx
    │   │   │   ├── privacy-policy/page.tsx
    │   │   │   ├── refund-policy/page.tsx
    │   │   │   ├── security-policy/page.tsx
    │   │   │   └── terms-of-use/page.tsx
    │   │   ├── numeroloji/
    │   │   │   ├── [type]/page.tsx
    │   │   │   └── page.tsx
    │   │   └── tarotokumasi/page.tsx
    │   ├── admin/
    │   │   ├── analytics/page.tsx
    │   │   ├── auth/page.tsx
    │   │   ├── dashboard/ (empty)
    │   │   ├── layout.tsx
    │   │   ├── orders/page.tsx
    │   │   ├── packages/page.tsx
    │   │   ├── page.tsx
    │   │   ├── readings/page.tsx
    │   │   ├── settings/page.tsx
    │   │   └── users/page.tsx
    │   ├── auth/
    │   │   ├── confirm/route.ts
    │   │   ├── page.tsx
    │   │   └── reset-password/page.tsx
    │   ├── dashboard/
    │   │   ├── credits/page.tsx
    │   │   ├── dashboard.md
    │   │   ├── dashboarddosyayapisi.md
    │   │   ├── packages/page.tsx
    │   │   ├── page.tsx
    │   │   ├── readings/page.tsx
    │   │   ├── settings/page.tsx
    │   │   └── statistics/page.tsx
    │   ├── HomePageClient.tsx
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── payment/
    │       ├── cancel/page.tsx
    │       └── success/page.tsx
    ├── api/
    │   ├── email/
    │   │   ├── email.md
    │   │   ├── enhanced/route.ts
    │   │   ├── reading/route.ts
    │   │   ├── send/route.ts
    │   │   └── test/route.ts
    │   ├── exchange-rate/route.ts
    │   ├── geolocation/route.ts
    │   ├── send-email/route.ts
    │   ├── send-reading-email/route.ts
    │   ├── test-email/route.ts
    │   ├── test-enhanced-email/route.ts
    │   └── webhook/shopier/route.ts
    ├── auth/callback/route.ts
    ├── globals.css
    ├── layout.tsx
    ├── maintenance/page.tsx
    ├── sitemap.ts
    └── test-reading/page.tsx
```

---

## 🔄 Geçiş Planı (Kırılmasız)

### Aşama 1: Yeni Konumlarda Kanonik Modülleri Oluştur
1. **Admin Modülü Konsolidasyonu**
   ```bash
   # Yeni admin modülü oluştur
   mkdir -p src/modules/admin/{services,components,hooks,types}
   
   # Mevcut dosyaları kopyala
   cp src/lib/admin/* src/modules/admin/services/
   cp src/components/admin/* src/modules/admin/components/
   cp src/hooks/admin/* src/modules/admin/hooks/
   cp src/types/admin.types.ts src/modules/admin/types/
   ```

2. **Auth Modülü Konsolidasyonu**
   ```bash
   # Yeni auth modülü oluştur
   mkdir -p src/modules/auth/{services,components,hooks,types}
   
   # Mevcut dosyaları kopyala
   cp src/lib/auth/* src/modules/auth/services/
   cp src/components/auth/* src/modules/auth/components/
   cp src/hooks/auth/* src/modules/auth/hooks/
   cp src/types/auth.types.ts src/modules/auth/types/
   ```

3. **Shared Modülü Konsolidasyonu**
   ```bash
   # Yeni shared modülü oluştur
   mkdir -p src/modules/shared/{ui,layout,components}
   
   # Mevcut dosyaları kopyala
   cp -r src/features/shared/ui/* src/modules/shared/ui/
   cp -r src/features/shared/layout/* src/modules/shared/layout/
   cp src/components/shared/* src/modules/shared/components/
   ```

4. **Tarot Modülü Konsolidasyonu**
   ```bash
   # Yeni tarot modülü oluştur
   mkdir -p src/modules/tarot/{components,lib,constants,types}
   
   # Mevcut dosyaları kopyala
   cp -r src/features/tarot/components/* src/modules/tarot/components/
   cp -r src/features/tarot/lib/* src/modules/tarot/lib/
   cp src/lib/constants/tarotSpreads.ts src/modules/tarot/constants/
   cp src/types/tarot.ts src/modules/tarot/types/
   ```

### Aşama 2: Re-export Shim'leri Ekle
1. **Admin Shim'leri**
   ```typescript
   // src/lib/admin/index.ts (shim)
   export * from '@/modules/admin';
   
   // src/components/admin/index.ts (shim)
   export * from '@/modules/admin/components';
   
   // src/hooks/admin/index.ts (shim)
   export * from '@/modules/admin/hooks';
   ```

2. **Auth Shim'leri**
   ```typescript
   // src/lib/auth/index.ts (shim)
   export * from '@/modules/auth';
   
   // src/components/auth/index.ts (shim)
   export * from '@/modules/auth/components';
   
   // src/hooks/auth/index.ts (shim)
   export * from '@/modules/auth/hooks';
   ```

3. **Shared Shim'leri**
   ```typescript
   // src/features/shared/index.ts (shim)
   export * from '@/modules/shared';
   
   // src/components/shared/index.ts (shim)
   export * from '@/modules/shared/components';
   ```

4. **Tarot Shim'leri**
   ```typescript
   // src/features/tarot/index.ts (shim)
   export * from '@/modules/tarot';
   
   // src/lib/constants/tarotSpreads.ts (shim)
   export * from '@/modules/tarot/constants/tarotSpreads';
   ```

### Aşama 3: Import'ları Güncelle (Codemod)
1. **Admin Import'ları**
   ```bash
   # Eski: import { AdminUser } from '@/lib/admin/admin-users'
   # Yeni: import { AdminUser } from '@/modules/admin'
   
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/lib/admin/|@/modules/admin/|g'
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/components/admin/|@/modules/admin/components/|g'
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/hooks/admin/|@/modules/admin/hooks/|g'
   ```

2. **Auth Import'ları**
   ```bash
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/lib/auth/|@/modules/auth/|g'
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/components/auth/|@/modules/auth/components/|g'
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/hooks/auth/|@/modules/auth/hooks/|g'
   ```

3. **Shared Import'ları**
   ```bash
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/features/shared/|@/modules/shared/|g'
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/components/shared/|@/modules/shared/components/|g'
   ```

4. **Tarot Import'ları**
   ```bash
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/features/tarot/|@/modules/tarot/|g'
   find src -name "*.ts" -o -name "*.tsx" | xargs sed -i 's|@/lib/constants/tarotSpreads|@/modules/tarot/constants/tarotSpreads|g'
   ```

### Aşama 4: Shim'leri Kaldır
1. **Eski dosyaları sil**
   ```bash
   # Admin eski dosyaları
   rm -rf src/lib/admin/
   rm -rf src/components/admin/
   rm -rf src/hooks/admin/
   
   # Auth eski dosyaları
   rm -rf src/lib/auth/
   rm -rf src/components/auth/
   rm -rf src/hooks/auth/
   
   # Shared eski dosyaları
   rm -rf src/features/shared/
   rm -rf src/components/shared/
   
   # Tarot eski dosyaları
   rm -rf src/features/tarot/
   rm src/lib/constants/tarotSpreads.ts
   ```

---

## 🎯 Teknik Ayrıntılar

### TypeScript Path Alias Güncellemeleri
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/modules/*": ["./src/modules/*"],
      "@/modules/admin/*": ["./src/modules/admin/*"],
      "@/modules/auth/*": ["./src/modules/auth/*"],
      "@/modules/shared/*": ["./src/modules/shared/*"],
      "@/modules/tarot/*": ["./src/modules/tarot/*"]
    }
  }
}
```

### CI/CD Kontrol Listesi
- [ ] `pnpm typecheck` - TypeScript type checking
- [ ] `pnpm lint` - ESLint validation
- [ ] `pnpm build` - Production build test
- [ ] `pnpm test` - Unit tests
- [ ] Smoke test - Critical user flows

### Test Kontrol Listesi
- [ ] Admin login flow
- [ ] Auth guard functionality  
- [ ] SSR/CSR session management
- [ ] Tarot reading functionality
- [ ] Shared component rendering

---

## 📈 Beklenen Faydalar

### 1. **Modülerlik**
- Tek kaynak prensibi
- Temiz import yolları
- Kolay bakım

### 2. **Performans**
- Daha iyi tree-shaking
- Optimize edilmiş bundle
- Lazy loading desteği

### 3. **Geliştirici Deneyimi**
- Net dosya organizasyonu
- Kolay refactoring
- Daha iyi IDE desteği

### 4. **Sürdürülebilirlik**
- Tekil sorumluluk
- Kolay test yazma
- Minimal coupling

---

## ⚠️ Riskler ve Önlemler

### Yüksek Risk
- **Import path değişiklikleri** → Codemod ile otomatik güncelleme
- **Build kırılması** → Aşamalı geçiş + shim'ler
- **Type errors** → TypeScript strict mode kontrolü

### Orta Risk  
- **Performance impact** → Bundle analyzer ile kontrol
- **Test failures** → Test suite güncelleme

### Düşük Risk
- **Developer confusion** → Dokümantasyon güncelleme
- **Git history** → Dosya taşıma yerine kopyalama

---

## 🚀 Uygulama Sırası

1. **Hafta 1:** Admin modülü konsolidasyonu
2. **Hafta 2:** Auth modülü konsolidasyonu  
3. **Hafta 3:** Shared modülü konsolidasyonu
4. **Hafta 4:** Tarot modülü konsolidasyonu
5. **Hafta 5:** Shim'leri kaldırma ve temizlik

**Toplam Süre:** 5 hafta  
**Risk Seviyesi:** Orta  
**Beklenen Fayda:** Yüksek
