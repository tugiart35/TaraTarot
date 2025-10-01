# 🛡️ Security Headers Configuration - Tarot Web Application

**Framework:** Next.js 15.4.4  
**Security Level:** Production-Ready  
**Last Updated:** January 2025

---

## 📋 Current Security Headers

### ✅ Implemented Headers

| Header | Value | Status | Purpose |
|--------|-------|--------|---------|
| `X-Frame-Options` | `DENY` | ✅ Active | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | ✅ Active | Prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ Active | Controls referrer info |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | ✅ Active | Restricts permissions |
| `X-XSS-Protection` | `1; mode=block` | ✅ Active | XSS protection |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | ✅ Conditional | HTTPS enforcement |
| `Content-Security-Policy` | Complex policy | ⚠️ Needs hardening | Content security |

---

## 🔧 Recommended Next.js Middleware Configuration

### File: `src/middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers configuration
  const securityHeaders = {
    // Prevent clickjacking attacks
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Control referrer information
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Restrict browser features
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()', // FLoC blocking
      'usb=()',
      'serial=()',
      'bluetooth=()',
      'payment=()',
      'accelerometer=()',
      'gyroscope=()',
      'magnetometer=()',
    ].join(', '),
    
    // XSS protection
    'X-XSS-Protection': '1; mode=block',
    
    // DNS prefetch control
    'X-DNS-Prefetch-Control': 'off',
    
    // Download options for IE
    'X-Download-Options': 'noopen',
    
    // IE compatibility mode
    'X-UA-Compatible': 'IE=edge',
  };

  // HSTS only in production
  if (process.env.NODE_ENV === 'production') {
    securityHeaders['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  // Content Security Policy - Hardened
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
    "block-all-mixed-content",
  ];

  // Add nonce for inline scripts in production
  if (process.env.NODE_ENV === 'production') {
    const nonce = generateNonce();
    cspDirectives[1] = `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com`;
    response.headers.set('X-Nonce', nonce);
  }

  securityHeaders['Content-Security-Policy'] = cspDirectives.join('; ');

  // Apply all headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// Generate cryptographically secure nonce
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

---

## 🔒 Enhanced CSP Policy

### Current CSP Issues
- `'unsafe-inline'` allows all inline scripts/styles
- `'unsafe-eval'` allows dynamic code execution
- Missing `nonce` or `hash` for inline content

### Recommended CSP Policy

```typescript
const cspDirectives = [
  // Default source
  "default-src 'self'",
  
  // Scripts - Use nonce for inline scripts
  "script-src 'self' 'nonce-{NONCE}' https://www.googletagmanager.com https://www.google-analytics.com",
  
  // Styles - Use nonce for inline styles
  "style-src 'self' 'nonce-{NONCE}' https://fonts.googleapis.com",
  
  // Images
  "img-src 'self' data: https: blob:",
  
  // Fonts
  "font-src 'self' https://fonts.gstatic.com data:",
  
  // Connections
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
  
  // Frames
  "frame-src 'none'",
  
  // Objects
  "object-src 'none'",
  
  // Base URI
  "base-uri 'self'",
  
  // Form actions
  "form-action 'self'",
  
  // Frame ancestors
  "frame-ancestors 'none'",
  
  // Upgrade insecure requests
  "upgrade-insecure-requests",
  
  // Block mixed content
  "block-all-mixed-content",
  
  // Manifest
  "manifest-src 'self'",
  
  // Media
  "media-src 'self' data:",
  
  // Worker
  "worker-src 'self' blob:",
  
  // Child source
  "child-src 'self' blob:",
];
```

---

## 🛠️ Implementation Steps

### 1. Update Middleware
```bash
# Replace src/middleware.ts with the enhanced configuration above
```

### 2. Add Nonce Support to Pages
```typescript
// In your page components
import { headers } from 'next/headers';

export default function Page() {
  const nonce = headers().get('x-nonce');
  
  return (
    <div>
      <script nonce={nonce}>
        // Your inline script here
      </script>
    </div>
  );
}
```

### 3. Update Next.js Config
```javascript
// next.config.js
const nextConfig = {
  // Security headers are handled in middleware
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // These will be overridden by middleware
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};
```

---

## 🔍 Security Header Testing

### 1. Manual Testing
```bash
# Test headers with curl
curl -I https://your-domain.com

# Expected headers:
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-...'
```

### 2. Automated Testing
```javascript
// Add to your test suite
describe('Security Headers', () => {
  it('should include all required security headers', async () => {
    const response = await fetch('/');
    const headers = response.headers;
    
    expect(headers.get('X-Frame-Options')).toBe('DENY');
    expect(headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headers.get('Content-Security-Policy')).toBeTruthy();
    // ... more assertions
  });
});
```

### 3. Online Testing Tools
- [SecurityHeaders.com](https://securityheaders.com)
- [Mozilla Observatory](https://observatory.mozilla.org)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com)

---

## 📊 Security Score Targets

| Header | Current | Target | Status |
|--------|---------|--------|--------|
| X-Frame-Options | ✅ | ✅ | Complete |
| X-Content-Type-Options | ✅ | ✅ | Complete |
| Referrer-Policy | ✅ | ✅ | Complete |
| Permissions-Policy | ✅ | ✅ | Complete |
| X-XSS-Protection | ✅ | ✅ | Complete |
| Strict-Transport-Security | ✅ | ✅ | Complete |
| Content-Security-Policy | ⚠️ | ✅ | Needs hardening |

**Overall Security Score:** 85/100 → **Target:** 95/100

---

## 🚨 Common CSP Violations & Fixes

### 1. Inline Scripts
```typescript
// ❌ Bad - Will be blocked
<script>console.log('Hello');</script>

// ✅ Good - Use nonce
<script nonce={nonce}>console.log('Hello');</script>

// ✅ Better - Move to external file
<script src="/js/script.js"></script>
```

### 2. Inline Styles
```typescript
// ❌ Bad - Will be blocked
<div style="color: red;">Text</div>

// ✅ Good - Use nonce
<div style="color: red;" nonce={nonce}>Text</div>

// ✅ Better - Use CSS classes
<div className="text-red-500">Text</div>
```

### 3. External Resources
```typescript
// ❌ Bad - Domain not allowed
<img src="https://malicious-site.com/image.jpg" />

// ✅ Good - Domain in CSP
<img src="https://trusted-cdn.com/image.jpg" />
```

---

## 🔧 Troubleshooting

### CSP Violations
1. Check browser console for CSP violation reports
2. Use `report-uri` directive to collect violations
3. Gradually tighten policy based on reports

### Header Conflicts
1. Check Next.js config headers vs middleware headers
2. Middleware headers take precedence
3. Remove duplicate headers from config

### Performance Impact
1. CSP parsing has minimal performance impact
2. Nonce generation is fast (crypto.getRandomValues)
3. Monitor with performance tools

---

## 📞 Support

**Security Issues:** Security Team  
**Implementation Issues:** DevOps Team  
**CSP Violations:** Frontend Team

**Note:** Security headers should be tested in staging before production deployment.
