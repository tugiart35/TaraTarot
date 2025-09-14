# Refactor Changelog

## Phase: Infra-0 - Infrastructure Setup

### Step 0.1: Branch Creation
- ✅ Created branch: `refactor/structure-v1`
- ✅ Tagged: `refactor-step-0`

### Step 0.2: tsconfig + eslint/prettier normalization
- 🔄 In progress: Normalize path aliases
- 🔄 In progress: Update lint/prettier configs minimally
- ⏳ Pending: No code moves yet

---

## Phase: Imports & Exports

### Step 1.1: Fix duplicate exports
- ⏳ Pending: Resolve duplicate exports from analysis

### Step 1.2: Resolve circular dependencies
- ⏳ Pending: Apply circular dependency fixes

### Step 1.3: Apply barrel exports
- ⏳ Pending: Implement barrel export strategy

---

## Phase: Directory Moves

### Step 2.1: Apply approved moves from refactor-moves.plan.json
- ⏳ Pending: Only apply approved moves
- ⏳ Pending: Add temporary legacy alias files

---

## Phase: RSC Fixes

### Step 3.1: Apply RSC violation fixes
- ⏳ Pending: Fix 23 RSC violation files
- ⏳ Pending: Add 'use client' or adapter components

---

## Phase: API Layer

### Step 4.1: Fix build-breaking route
- ⏳ Pending: Fix src/app/api/test-improved-numerology/route.ts

### Step 4.2: Standardize API schemas
- ⏳ Pending: Apply Zod schemas to API routes

---

## Phase: Forms & i18n

### Step 5.1: Split schemas
- ⏳ Pending: Move schemas to /schemas directory

### Step 5.2: Enforce RHF + Zod
- ⏳ Pending: Apply RHF + Zod to all forms

### Step 5.3: Add missing i18n keys
- ⏳ Pending: Add missing i18n keys with placeholders

---

## Phase: Code Quality

### Step 6.1: Remove console.log and unused imports
- ⏳ Pending: Run codemods for cleanup

### Step 6.2: ESLint strict rules
- ⏳ Pending: Apply strict ESLint configuration

---

## Phase: Dead Weight Cleanup

### Step 7.1: Remove approved files
- ⏳ Pending: Remove files from dead-weight.md

### Step 7.2: Bundle analyzer check
- ⏳ Pending: Verify bundle size improvements

---

## Phase: Tests

### Step 8.1: Implement smoke & routing tests
- ⏳ Pending: Playwright smoke tests

### Step 8.2: Unit tests with Vitest
- ⏳ Pending: Utils unit tests

### Step 8.3: Coverage targets
- ⏳ Pending: 40→60→80% coverage

---

## Acceptance Gates Status

- ⏳ `pnpm typecheck` clean
- ⏳ `pnpm lint` clean  
- ⏳ Smoke tests green
- ⏳ /dashboard guard works
- ⏳ Auth acceptance criteria met
- ⏳ i18n fallback works (tr default)
