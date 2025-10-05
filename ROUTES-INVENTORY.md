# ROUTES INVENTORY

This document provides an overview of all existing routes in the busbuskimki
application, including their current paths and locale configurations.

## Default Locale Configuration

- Default locale: `tr` (Turkish)
- Supported locales: `tr` (Turkish), `en` (English), `sr` (Serbian Latin)

## Routing Structure

The application uses Next.js App Router with the `[locale]` pattern in the URL
structure.

## Current Route Inventory

### Home Page

- **Path**: `/[locale]` (e.g., `/tr`, `/en`, `/sr`)
- **Description**: Main landing page
- **Purpose**: Entry point to the application with tarot and numerology services

### Tarot Services

- **Path**: `/[locale]/tarotokumasi` (Turkish), `/[locale]/tarot` (English),
  `/[locale]/tarot` (Serbian)
- **Description**: Tarot reading services page
- **Purpose**: Access to various tarot spreads and readings

### Numerology Services

- **Path**: `/[locale]/numeroloji` (Turkish), `/[locale]/numerology` (English),
  `/[locale]/numerologija` (Serbian)
- **Description**: Numerology analysis services page
- **Purpose**: Access to numerology calculations and analyses
- **Dynamic Route**: `/[locale]/numeroloji/[type]` - Specific numerology
  calculations

### Legal Pages

- **Path**: `/[locale]/legal/[page]`
- **Sub-pages**:
  - `about` - About us page
  - `accessibility` - Accessibility information
  - `child-privacy` - Child privacy policy
  - `contact` - Contact information
  - `cookie-policy` - Cookie policy
  - `copyright-policy` - Copyright policy
  - `disclaimer` - Disclaimer
  - `kvkk-disclosure` - KVKK disclosure (Turkish only)
  - `payment-terms` - Payment terms
  - `privacy-policy` - Privacy policy
  - `refund-policy` - Refund policy
  - `security-policy` - Security policy
  - `terms-of-use` - Terms of use

### Admin Section

- **Path**: `/[locale]/admin`
- **Sub-pages**:
  - `analytics` - Analytics dashboard
  - `auth` - Authentication management
  - `orders` - Order management
  - `packages` - Credit packages management
  - `readings` - Tarot reading management
  - `settings` - Admin settings
  - `users` - User management

### Authentication

- **Path**: `/[locale]/auth`
- **Sub-pages**:
  - `confirm` - Email confirmation
  - `reset-password` - Password reset

### Dashboard

- **Path**: `/[locale]/dashboard`
- **Sub-pages**:
  - `credits` - Credit management
  - `packages` - Credit packages
  - `readings` - Reading history
  - `settings` - User settings
  - `statistics` - User statistics

### Payment

- **Path**: `/[locale]/payment`
- **Sub-pages**:
  - `cancel` - Payment cancellation
  - `success` - Payment success confirmation

### API Routes

- **Path**: `/api/[...routes]` - Various API endpoints
- **Sitemap**: `/sitemap.ts` - Dynamic sitemap generation
- **Robots**: `/robots.txt` - Search engine instructions

## Current Locale-Specific Routing Pattern

The application currently uses locale prefixes in URLs as follows:

- Turkish: `/tr/...`
- English: `/en/...`
- Serbian: `/sr/...`

## Known Issues

- Some services have different URL slugs per locale (e.g., numerology:
  `numeroloji` vs `numerology` vs `numerologija`)
- The current routing doesn't have SEO-friendly names in all locales
- Some paths are duplicated across locales but with different slugs

## SEO Considerations

- Sitemap is generated with locale-specific URLs
- Current implementation uses `localePrefix: 'as-needed'` in middleware
- Each locale has its own URL structure but not necessarily SEO-optimized names
