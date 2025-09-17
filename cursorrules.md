# 🔧 Cursor Rules - Tarot Web Application

**Framework:** Next.js 15.4.4 + TypeScript + Supabase  
**Branch:** refactor/structure-v1  
**Last Updated:** December 2024  
**Status:** Production Ready

---

## 🎯 Project Overview

This is a modern Tarot reading web application built with Next.js 15, TypeScript, and Supabase. The project follows a modular architecture with strict coding standards and security practices.

---

## 🏗️ Architecture Rules

### 1. **Next.js App Router Structure**
- Use App Router with `[locale]` segments
- Route groups: `(marketing)`, `(auth)`, `(protected)`, `(api)`
- Server Components by default, Client Components only when necessary
- Use `'use client'` directive explicitly for client components

### 2. **TypeScript Configuration**
- Strict mode enabled (`exactOptionalPropertyTypes`, `noUnusedLocals`, `noUnusedParameters`)
- No `any` types allowed - use `unknown` instead
- Type guards required for runtime type checking
- Interface over type preference
- Generic types for reusable components

### 3. **File Organization**
```
src/
├── app/                    # Next.js App Router pages
├── components/             # Shared UI components
├── features/              # Feature-based modules
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── providers/             # React context providers
├── server/                # Server-side utilities
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

---

## 🔒 Security Rules

### 1. **Supabase Security**
- **NEVER** use `service_role` client on client-side or edge runtime
- Always use Row Level Security (RLS) policies
- Validate all user inputs with Zod schemas
- Use proper authentication checks in middleware
- Sanitize all database queries

### 2. **API Security**
- All API routes must have `export const runtime = 'nodejs'` for database operations
- Input validation required for all endpoints
- Rate limiting implemented in middleware
- CORS headers properly configured
- Security headers enforced

### 3. **Authentication & Authorization**
- Dashboard routes protected with auth guards
- Role-based access control implemented
- Session validation in middleware
- Secure redirects after authentication

---

## 📝 Code Quality Rules

### 1. **Import/Export Standards**
- Use barrel exports (`index.ts` files) for public APIs
- Path aliases required (`@/` for src root)
- No circular dependencies allowed
- No duplicate exports
- Clean up unused imports

### 2. **Component Standards**
- Server Components by default
- Client Components only for interactivity
- Props validation with TypeScript
- Error boundaries for all major components
- Loading states for async operations
- Accessibility attributes required

### 3. **Form Handling**
- React Hook Form (RHF) + Zod validation required
- Schema separation in `/schemas` directory
- Client and server-side validation
- Proper error handling and display
- i18n support for error messages

---

## 🌐 Internationalization Rules

### 1. **i18n Configuration**
- Use `next-intl` for internationalization
- Supported locales: `tr` (default), `en`, `sr` (Latin script)
- Fallback strategy: `tr` → `en` → `sr`
- Message keys organized in `/messages` directory
- Locale routing with `[locale]` segments

### 2. **Message Management**
- All UI strings must be in message files
- No hardcoded strings in components
- Message key validation required
- Fallback messages for missing translations

---

## 🧪 Testing & Quality Assurance

### 1. **Code Quality**
- ESLint strict mode enabled
- Prettier formatting enforced
- No `console.log` in production code
- Unused variables/imports removed
- Consistent naming conventions

### 2. **Build Requirements**
- TypeScript compilation must pass
- ESLint checks must pass
- Production build must succeed
- No runtime errors in build process

---

## 🚫 Dead Weight Rules

### 1. **File Management**
- Unused files moved to `/archive` directory
- No backup files in source code
- No duplicate utilities
- Clean import statements
- Remove unused dependencies

### 2. **Code Cleanup**
- No commented-out code blocks
- No TODO comments in production
- Remove development-only code
- Optimize bundle size

---

## 🔄 Development Workflow

### 1. **Git Workflow**
- Feature branches for new development
- Atomic commits with clear messages
- Tag releases with semantic versioning
- Code review required for merges

### 2. **Refactor Safety**
- Legacy aliases for backward compatibility
- Gradual migration strategy
- Rollback plans for major changes
- Testing at each step

---

## 📋 Component Patterns

### 1. **Server Components**
```typescript
// Default - no 'use client' needed
export default function ServerComponent() {
  // Data fetching, no client-side hooks
  return <div>Server rendered content</div>;
}
```

### 2. **Client Components**
```typescript
'use client';

import { useState } from 'react';

export default function ClientComponent() {
  // Client-side interactivity
  const [state, setState] = useState();
  return <div>Interactive content</div>;
}
```

### 3. **API Routes**
```typescript
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Required for DB operations

export async function POST(request: NextRequest) {
  // Input validation with Zod
  // Database operations
  // Proper error handling
  return NextResponse.json({ success: true });
}
```

---

## 🎨 UI/UX Standards

### 1. **Design System**
- Consistent color palette
- Responsive design required
- Dark theme support
- Accessibility compliance (WCAG 2.1)
- Mobile-first approach

### 2. **Component Library**
- Reusable UI components
- Consistent styling patterns
- Loading states and error handling
- Animation and transitions
- Touch-friendly interfaces

---

## 📊 Performance Rules

### 1. **Optimization**
- Code splitting implemented
- Lazy loading for heavy components
- Image optimization with Next.js Image
- Bundle size monitoring
- Performance budgets enforced

### 2. **Caching Strategy**
- Static generation where possible
- ISR for dynamic content
- Client-side caching with React Query
- CDN optimization

---

## 🔧 Development Tools

### 1. **Required Scripts**
- `npm run dev` - Development server (port 3111)
- `npm run build` - Production build
- `npm run typecheck` - TypeScript validation
- `npm run lint` - ESLint checking
- `npm run format` - Prettier formatting

### 2. **Code Quality Tools**
- TypeScript strict mode
- ESLint with custom rules
- Prettier for formatting
- Husky for git hooks
- Lint-staged for pre-commit checks

---

## 🚨 Error Handling

### 1. **Error Boundaries**
- Implement error boundaries for all major sections
- Graceful fallback UI for errors
- Error logging and monitoring
- User-friendly error messages

### 2. **API Error Handling**
- Consistent error response format
- Proper HTTP status codes
- Error logging and tracking
- Client-side error handling

---

## 📚 Documentation Standards

### 1. **Code Documentation**
- JSDoc comments for complex functions
- README files for major features
- API documentation for endpoints
- Component documentation with examples

### 2. **File Headers**
- Multi-line info blocks at file top
- Purpose, dependencies, and usage status
- Turkish comments for main functions
- Backend connection notes where applicable

---

## 🔐 Production Readiness

### 1. **Deployment Checklist**
- [ ] TypeScript compilation passes
- [ ] ESLint checks pass
- [ ] Production build succeeds
- [ ] All tests pass
- [ ] Security headers configured
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Performance optimized

### 2. **Monitoring**
- Error tracking with Sentry
- Performance monitoring
- User analytics
- Security monitoring
- Uptime monitoring

---

## 🎯 Success Criteria

### 1. **Code Quality**
- Zero TypeScript errors
- Zero ESLint errors
- 100% build success rate
- Consistent code formatting
- Proper error handling

### 2. **Performance**
- Fast page load times
- Optimized bundle size
- Efficient database queries
- Proper caching strategy
- Mobile performance

### 3. **Security**
- No security vulnerabilities
- Proper authentication
- Data validation
- Secure API endpoints
- Privacy compliance

---

**Bu kurallar, Tarot Web uygulamasının kaliteli, güvenli ve sürdürülebilir kod yazımı için tasarlanmıştır. Tüm geliştiriciler bu kurallara uymalıdır.**
