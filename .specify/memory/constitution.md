<!--
Sync Impact Report:
- Version change: Initial → 1.0.0
- Modified principles: N/A (initial constitution)
- Added sections: All core principles, multilingual requirements, SEO standards, development workflow, governance
- Removed sections: None
- Templates requiring updates:
  ✅ plan-template.md - Constitution Check section references this document
  ✅ spec-template.md - Requirements align with constitution principles
  ✅ tasks-template.md - Task ordering follows TDD and quality principles
- Follow-up TODOs: None
-->

# busbuskimki (BüşBüşKimKi) Constitution

## Core Principles

### I. Multilingual-First Architecture

The application MUST support Turkish (tr), English (en), and Serbian (sr)
locales throughout all features. Every user-facing string, SEO metadata, URL
structure, and content MUST have complete translations for all three languages
before a feature is considered complete. Hardcoded UI strings are strictly
prohibited.

**Rationale**: The project serves a multilingual audience across Turkey,
English-speaking markets, and Serbian-speaking regions. Incomplete translations
create broken user experiences and harm SEO performance in target markets.

### II. SEO Excellence (NON-NEGOTIABLE)

Every public-facing page MUST include:

- Localized meta titles and descriptions (150-160 characters)
- Canonical URLs with proper hreflang tags for all three locales
- Structured data (JSON-LD) including Organization, Website, Service,
  Breadcrumb, and FAQ schemas
- Sitemap entries with appropriate priority and change frequency
- SEO-friendly URLs matching the locale's natural language patterns

**Rationale**: The application's business model depends on organic search
traffic. SEO is not optional polish—it's a core functional requirement that
directly impacts user acquisition and revenue.

### III. Test-Driven Development (NON-NEGOTIABLE)

All new features MUST follow strict TDD:

1. Write failing tests first (contract tests, integration tests, unit tests)
2. Get user/stakeholder approval of test scenarios
3. Verify tests fail for the right reasons
4. Implement minimal code to make tests pass
5. Refactor while keeping tests green

**Rationale**: The application handles user payments, personal data (birth
dates, names), and mystical services where accuracy builds trust. Bugs in
calculations (numerology), card selections (tarot), or payment flows directly
harm user trust and revenue.

### IV. Component-Driven Architecture

Features MUST be organized into self-contained feature modules under
`src/features/[feature-name]/` containing:

- `components/` - React components for the feature
- `lib/` - Business logic, calculations, and utilities (platform-independent)
- `index.ts` - Public API exports

Shared utilities live in `src/features/shared/`. Features MUST NOT import from
other feature directories except `shared`.

**Rationale**: This structure enables independent testing, reusability, and
clear boundaries. It prevents the creation of tightly coupled "god components"
and makes features portable across different contexts (e.g., dashboard vs.
public pages).

### V. Type Safety & Quality Gates

The codebase MUST maintain:

- TypeScript strict mode enabled (`strict: true`)
- Zero TypeScript errors before merging (`npm run typecheck` passes)
- ESLint compliance (`npm run lint` passes)
- Prettier formatting (`npm run format:check` passes)
- All code quality checks passing (`npm run code-quality`)

**Rationale**: With complex data flows (Supabase auth, payment webhooks, i18n
routing), type safety catches bugs at compile time that would otherwise manifest
as runtime errors affecting real users and revenue.

### VI. Progressive Web App Standards

The application MUST function as a PWA:

- Responsive design for mobile, tablet, and desktop
- Offline-capable where feasible
- Fast load times (optimized images, code splitting)
- Touch-friendly interfaces with appropriate hit targets
- Consistent theme system (mystik/modern) across all features

**Rationale**: Tarot and numerology users often access services on mobile
devices in various contexts. PWA capabilities ensure the app works reliably
regardless of connection quality or device type.

### VII. Security & Privacy First

All features handling sensitive data MUST:

- Use Supabase Row Level Security (RLS) policies
- Sanitize user inputs (DOMPurify for HTML, validation for forms)
- Implement proper CSP headers (configured in `next.config.js`)
- Log security events without exposing sensitive data
- Comply with GDPR/KVKK requirements (documented in legal pages)

**Rationale**: The app stores birth dates, names, payment information, and
reading history. Regulatory compliance is mandatory, and user trust depends on
demonstrable security practices.

## Multilingual Requirements

### URL Structure Standards

Each route MUST have locale-specific, SEO-friendly URLs:

- **Turkish**: Natural Turkish words (e.g., `/tr/anasayfa`, `/tr/tarot-okuma`,
  `/tr/panel`)
- **English**: Natural English words (e.g., `/en/home`, `/en/tarot-reading`,
  `/en/dashboard`)
- **Serbian**: Natural Serbian (Latin) words (e.g., `/sr/pocetna`,
  `/sr/tarot-citanje`, `/sr/panel`)

Redirects and rewrites MUST be configured in `next.config.js` to maintain
backward compatibility while presenting SEO-friendly URLs.

### Translation Management

- All UI strings MUST use next-intl with proper namespace organization
- Translation files live in `src/messages/[locale].json`
- New translation keys MUST be added to all three locales simultaneously
- Scripts (`npm run i18n:check`, `npm run i18n:validate`) MUST pass before
  merging

### SEO Content

Each locale requires independent SEO content:

- Meta titles/descriptions reflecting local search patterns
- Keywords relevant to the locale's market
- Structured data with localized text
- FAQ schemas with locale-appropriate questions/answers

## Development Workflow

### Feature Development Lifecycle

1. **Specification** (`/specify` command): Define requirements without
   implementation details
2. **Planning** (`/plan` command): Research technical approaches, create data
   models, contracts
3. **Task Generation** (`/tasks` command): Break down into TDD-ordered,
   parallelizable tasks
4. **Implementation**: Execute tasks following TDD, commit after each task
5. **Validation**: Run tests, check SEO elements, validate i18n completeness

### Code Organization

- **Feature modules**: `src/features/[feature]/` (tarot, numerology, shared)
- **App routes**: `src/app/[locale]/(main|dashboard|admin)/` using Next.js App
  Router
- **Libraries**: `src/lib/` for framework-agnostic utilities (seo, i18n,
  analytics)
- **Tests**: `src/__tests__/` and `src/features/*/lib/__tests__/` co-located
  with code
- **Types**: `src/types/` for shared TypeScript definitions

### Testing Requirements

- **Unit tests**: For calculations (numerology formulas, tarot interpretations)
- **Integration tests**: For user flows (registration, payment, readings)
- **Component tests**: Using React Testing Library for UI components
- **E2E tests**: Playwright for critical paths (purchase flow, reading
  generation)

Minimum coverage: 80% for business logic, 60% for UI components.

## Performance Standards

### Page Load Performance

- **Lighthouse Score**: ≥90 for Performance, Accessibility, Best Practices, SEO
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Time to Interactive**: <3s on 4G mobile connections
- **Bundle Size**: Initial JS <200KB gzipped

### Runtime Performance

- **API Response Time**: <200ms p95 for backend endpoints
- **Client Rendering**: <16ms per frame for animations (60 fps)
- **Memory Usage**: <100MB heap for typical user sessions
- **Image Optimization**: Next.js Image component for all user-facing images

### Optimization Techniques

- Code splitting via dynamic imports for heavy features
- Package optimization (`experimental.optimizePackageImports` in next.config.js)
- Lazy loading for below-the-fold content
- Caching strategies for static assets and API responses

## Governance

### Constitution Authority

This constitution supersedes all other development practices, style guides, and
technical preferences. Any feature implementation, refactoring, or architectural
decision MUST comply with these principles. Deviations require explicit
justification documented in the Complexity Tracking section of implementation
plans.

### Amendment Process

1. **Proposal**: Document proposed change with rationale and impact analysis
2. **Review**: Assess impact on existing features, templates, and workflows
3. **Approval**: Requires stakeholder sign-off for MAJOR or MINOR changes
4. **Migration**: Update dependent templates, documentation, and in-flight
   features
5. **Version Bump**: Follow semantic versioning (MAJOR.MINOR.PATCH)

### Versioning Policy

- **MAJOR**: Breaking changes to principles (e.g., removing a language, changing
  TDD requirements)
- **MINOR**: New principles or significant expansions (e.g., adding
  accessibility standards)
- **PATCH**: Clarifications, typo fixes, non-semantic improvements

### Compliance Review

All implementation plans (`plan.md`) and task lists (`tasks.md`) MUST include a
Constitution Check section verifying compliance with relevant principles.
Violations MUST be justified in the Complexity Tracking section or the feature
MUST be redesigned.

### Agent Guidance

Runtime development guidance for AI agents (Claude Code, GitHub Copilot, etc.)
is maintained separately in agent-specific files (e.g., `CLAUDE.md`,
`.github/copilot-instructions.md`). These files reference this constitution and
provide tactical implementation guidance that aligns with constitutional
principles.

---

**Version**: 1.0.0 | **Ratified**: 2025-10-05 | **Last Amended**: 2025-10-05
