# Implementation Plan: Tarot Kart Bilgi Sayfaları (Blog/SEO)

**Branch**: `001-i-in-projeyi` | **Date**: 2025-01-27 | **Spec**:
`/specs/001-i-in-projeyi/spec.md` **Input**: Feature specification from
`/specs/001-i-in-projeyi/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code, or `AGENTS.md` for all other agents).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by
other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

Her tarot kartı için SEO optimize edilmiş, çok dilli (TR/EN/SR) bilgi sayfaları
oluşturma. Next.js App Router ile dinamik route'lar, next-intl ile çok dilli
destek, Supabase ile veri yönetimi ve structured data ile SEO optimizasyonu.

## Technical Context

**Language/Version**: TypeScript 5.9.2, React 18.3.1, Next.js 15.5.4  
**Primary Dependencies**: next-intl, Supabase, Tailwind CSS, React Hook Form,
Zod  
**Storage**: Supabase PostgreSQL (existing database)  
**Testing**: Jest, React Testing Library, Playwright  
**Target Platform**: Web (PWA), Mobile-first responsive  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Lighthouse SEO ≥90, LCP <2.5s, FID <100ms, CLS <0.1  
**Constraints**: 3 dil desteği (TR/EN/SR), SEO optimize URL'ler, structured
data, responsive tasarım  
**Scale/Scope**: 78 tarot kartı, 3 dil = 234 sayfa, MVP: 2 kart (6 sayfa)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Multilingual-First Architecture ✅

- Her kart sayfası 3 dilde (TR/EN/SR) tam içeriğe sahip olacak
- URL yapısı dile özgü doğal kelimeler içerecek
- Hardcoded UI string'ler yasak, next-intl kullanılacak

### SEO Excellence ✅

- Her sayfa localized meta title/description içerecek
- Canonical URL'ler ve hreflang tag'leri olacak
- JSON-LD structured data (FAQPage, Article, Breadcrumb) eklenecek
- SEO-friendly URL'ler (dile özgü doğal kelimeler)

### Test-Driven Development ✅

- Contract testler (API endpoints için)
- Integration testler (user flow'lar için)
- Component testler (React Testing Library)
- E2E testler (Playwright - critical paths)

### Component-Driven Architecture ✅

- Feature modülü: `src/features/tarot-cards/`
- Shared utilities: `src/features/shared/`
- Self-contained components ve business logic

### Type Safety & Quality Gates ✅

- TypeScript strict mode
- ESLint + Prettier compliance
- Zero TypeScript errors before merge

### Progressive Web App Standards ✅

- Mobile-first responsive design
- Optimized images (WebP, lazy load)
- Fast load times (Core Web Vitals)

### Security & Privacy First ✅

- Supabase RLS policies
- Input sanitization (DOMPurify)
- CSP headers
- GDPR/KVKK compliance

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
src/
├── app/
│   └── [locale]/
│       └── (main)/
│           └── kartlar/
│               └── [slug]/
│                   └── page.tsx          # Dynamic card pages
├── features/
│   ├── tarot-cards/                      # New feature module
│   │   ├── components/
│   │   │   ├── CardPage.tsx
│   │   │   ├── CardHero.tsx
│   │   │   ├── CardMeanings.tsx
│   │   │   ├── CardKeywords.tsx
│   │   │   ├── CardStory.tsx
│   │   │   ├── CardCTA.tsx
│   │   │   ├── CardFAQ.tsx
│   │   │   └── RelatedCards.tsx
│   │   ├── lib/
│   │   │   ├── card-data.ts
│   │   │   ├── card-seo.ts
│   │   │   └── card-mapping.ts
│   │   └── index.ts
│   └── shared/
│       ├── layout/
│       └── ui/
├── lib/
│   ├── seo/
│   │   ├── card-seo-generator.ts
│   │   └── structured-data.ts
│   └── i18n/
│       └── paths.ts
├── types/
│   └── tarot-cards.ts
└── __tests__/
    ├── features/
    │   └── tarot-cards/
    └── integration/
        └── card-pages.test.ts
```

**Structure Decision**: Web application (Next.js App Router) - Mevcut proje
yapısına uygun olarak `src/features/tarot-cards/` modülü eklenecek. Dinamik
route'lar `src/app/[locale]/(main)/kartlar/[slug]/page.tsx` altında
oluşturulacak.

## Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts

_Prerequisites: research.md complete_

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh claude` **IMPORTANT**:
     Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/\*, failing tests, quickstart.md,
agent-specific file

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during
/plan_

**Task Generation Strategy**:

- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P]
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:

- TDD order: Tests before implementation
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional
principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance
validation)

## Complexity Tracking

_Fill ONLY if Constitution Check has violations that must be justified_

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [ ] Phase 0: Research complete (/plan command)
- [ ] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [ ] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---

_Based on Constitution v2.1.1 - See `/memory/constitution.md`_
