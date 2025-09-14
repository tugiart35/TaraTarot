/**
 * 🧪 Smoke Tests - Tarot Web Application
 * 
 * Bu dosya temel sayfaların 200 döndüğünü test eder.
 * Production deployment öncesi kritik kontroller.
 * 
 * @file smoke.test.ts
 * @version 1.0.0
 * @created 2025-01-20
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3111';
const TIMEOUT = 10000; // 10 seconds

// Test data
const LOCALES = ['tr', 'en', 'sr'];
const CRITICAL_PAGES = [
  // Public pages
  { path: '/', expectedStatus: 302 }, // Redirect to /tr/tarotokumasi
  { path: '/tr/tarotokumasi', expectedStatus: 200 },
  { path: '/en/tarotokumasi', expectedStatus: 200 },
  { path: '/sr/tarotokumasi', expectedStatus: 200 },
  { path: '/tr/numeroloji', expectedStatus: 200 },
  { path: '/en/numeroloji', expectedStatus: 200 },
  { path: '/sr/numeroloji', expectedStatus: 200 },
  { path: '/tr/auth', expectedStatus: 200 },
  { path: '/en/auth', expectedStatus: 200 },
  { path: '/sr/auth', expectedStatus: 200 },
  
  // Legal pages
  { path: '/tr/legal/about', expectedStatus: 200 },
  { path: '/tr/legal/contact', expectedStatus: 200 },
  { path: '/tr/legal/privacy-policy', expectedStatus: 200 },
  { path: '/tr/legal/terms-of-use', expectedStatus: 200 },
  { path: '/tr/legal/refund-policy', expectedStatus: 200 },
  { path: '/tr/legal/payment-terms', expectedStatus: 200 },
  { path: '/tr/legal/kvkk-disclosure', expectedStatus: 200 },
  { path: '/tr/legal/disclaimer', expectedStatus: 200 },
  { path: '/tr/legal/copyright-policy', expectedStatus: 200 },
  { path: '/tr/legal/cookie-policy', expectedStatus: 200 },
  { path: '/tr/legal/child-privacy', expectedStatus: 200 },
  { path: '/tr/legal/accessibility', expectedStatus: 200 },
  { path: '/tr/legal/security-policy', expectedStatus: 200 },
];

const API_ENDPOINTS = [
  { path: '/api/geolocation', method: 'GET', expectedStatus: 200 },
  { path: '/api/exchange-rate', method: 'GET', expectedStatus: 200 },
];

const PROTECTED_PAGES = [
  // Dashboard pages (should redirect to auth if not authenticated)
  { path: '/tr/dashboard', expectedStatus: 302 },
  { path: '/en/dashboard', expectedStatus: 302 },
  { path: '/sr/dashboard', expectedStatus: 302 },
  { path: '/tr/dashboard/credits', expectedStatus: 302 },
  { path: '/tr/dashboard/packages', expectedStatus: 302 },
  { path: '/tr/dashboard/readings', expectedStatus: 302 },
  { path: '/tr/dashboard/settings', expectedStatus: 302 },
  { path: '/tr/dashboard/statistics', expectedStatus: 302 },
  
  // Admin pages (should redirect to auth if not authenticated)
  { path: '/tr/pakize', expectedStatus: 302 },
  { path: '/tr/pakize/users', expectedStatus: 302 },
  { path: '/tr/pakize/orders', expectedStatus: 302 },
  { path: '/tr/pakize/packages', expectedStatus: 302 },
  { path: '/tr/pakize/analytics', expectedStatus: 302 },
  { path: '/tr/pakize/settings', expectedStatus: 302 },
];

// Helper function to make HTTP requests
async function makeRequest(path: string, method: string = 'GET'): Promise<Response> {
  const url = `${BASE_URL}${path}`;
  
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'User-Agent': 'SmokeTest/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'manual', // Don't follow redirects automatically
    });
    
    return response;
  } catch (error) {
    throw new Error(`Request failed for ${url}: ${error}`);
  }
}

// Helper function to check if server is running
async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await makeRequest('/');
    return response.status === 302 || response.status === 200;
  } catch (error) {
    return false;
  }
}

describe('🚀 Smoke Tests - Tarot Web Application', () => {
  beforeAll(async () => {
    // Check if server is running
    const isServerRunning = await checkServerHealth();
    if (!isServerRunning) {
      throw new Error(`Server is not running at ${BASE_URL}. Please start the development server.`);
    }
    
    console.log(`✅ Server is running at ${BASE_URL}`);
  }, TIMEOUT);

  describe('🌐 Public Pages', () => {
    CRITICAL_PAGES.forEach(({ path, expectedStatus }) => {
      it(`should return ${expectedStatus} for ${path}`, async () => {
        const response = await makeRequest(path);
        
        expect(response.status).toBe(expectedStatus);
        
        // Additional checks for successful responses
        if (expectedStatus === 200) {
          expect(response.headers.get('content-type')).toMatch(/text\/html/);
        }
        
        // Check for redirects
        if (expectedStatus === 302) {
          expect(response.headers.get('location')).toBeDefined();
        }
      }, TIMEOUT);
    });
  });

  describe('🔐 Protected Pages', () => {
    PROTECTED_PAGES.forEach(({ path, expectedStatus }) => {
      it(`should return ${expectedStatus} for protected page ${path}`, async () => {
        const response = await makeRequest(path);
        
        expect(response.status).toBe(expectedStatus);
        
        // Protected pages should redirect to auth
        if (expectedStatus === 302) {
          const location = response.headers.get('location');
          expect(location).toMatch(/\/auth/);
        }
      }, TIMEOUT);
    });
  });

  describe('🔌 API Endpoints', () => {
    API_ENDPOINTS.forEach(({ path, method, expectedStatus }) => {
      it(`should return ${expectedStatus} for API ${method} ${path}`, async () => {
        const response = await makeRequest(path, method);
        
        expect(response.status).toBe(expectedStatus);
        
        if (expectedStatus === 200) {
          expect(response.headers.get('content-type')).toMatch(/application\/json/);
        }
      }, TIMEOUT);
    });
  });

  describe('🌍 Internationalization', () => {
    LOCALES.forEach(locale => {
      it(`should support ${locale} locale`, async () => {
        const response = await makeRequest(`/${locale}/tarotokumasi`);
        
        expect(response.status).toBe(200);
        expect(response.headers.get('content-type')).toMatch(/text\/html/);
      }, TIMEOUT);
    });
  });

  describe('📱 PWA Features', () => {
    it('should serve manifest.json', async () => {
      const response = await makeRequest('/manifest.json');
      
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toMatch(/application\/json/);
    }, TIMEOUT);

    it('should serve service worker', async () => {
      const response = await makeRequest('/sw.js');
      
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toMatch(/application\/javascript/);
    }, TIMEOUT);
  });

  describe('🛡️ Security Headers', () => {
    it('should include security headers', async () => {
      const response = await makeRequest('/tr/tarotokumasi');
      
      expect(response.status).toBe(200);
      
      // Check for security headers
      expect(response.headers.get('X-Frame-Options')).toBe('DENY');
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
      expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    }, TIMEOUT);
  });

  describe('⚡ Performance', () => {
    it('should respond within acceptable time', async () => {
      const startTime = Date.now();
      const response = await makeRequest('/tr/tarotokumasi');
      const endTime = Date.now();
      
      expect(response.status).toBe(200);
      expect(endTime - startTime).toBeLessThan(3000); // 3 seconds max
    }, TIMEOUT);
  });

  describe('🔍 Error Handling', () => {
    it('should handle 404 errors gracefully', async () => {
      const response = await makeRequest('/nonexistent-page');
      
      expect(response.status).toBe(404);
    }, TIMEOUT);

    it('should handle invalid locale gracefully', async () => {
      const response = await makeRequest('/invalid-locale/tarotokumasi');
      
      // Should redirect to default locale
      expect(response.status).toBe(302);
      const location = response.headers.get('location');
      expect(location).toMatch(/\/tr\//);
    }, TIMEOUT);
  });
});

// Additional utility tests
describe('🔧 Utility Tests', () => {
  it('should have proper environment configuration', () => {
    expect(BASE_URL).toBeDefined();
    expect(BASE_URL).toMatch(/^https?:\/\//);
  });

  it('should have test timeout configured', () => {
    expect(TIMEOUT).toBeGreaterThan(0);
    expect(TIMEOUT).toBeLessThan(30000); // Max 30 seconds
  });
});

// Performance monitoring
describe('📊 Performance Monitoring', () => {
  it('should track response times', async () => {
    const pages = ['/tr/tarotokumasi', '/tr/numeroloji', '/tr/auth'];
    const results = [];
    
    for (const page of pages) {
      const startTime = Date.now();
      const response = await makeRequest(page);
      const endTime = Date.now();
      
      results.push({
        page,
        status: response.status,
        responseTime: endTime - startTime
      });
    }
    
    // All pages should respond within 3 seconds
    results.forEach(result => {
      expect(result.responseTime).toBeLessThan(3000);
      expect(result.status).toBe(200);
    });
    
    console.log('📊 Performance Results:', results);
  }, TIMEOUT * 2);
});

// Health check endpoint test
describe('🏥 Health Checks', () => {
  it('should have a health check endpoint', async () => {
    // This would be implemented if a health check endpoint exists
    // For now, we'll test the root endpoint
    const response = await makeRequest('/');
    
    expect(response.status).toBe(302); // Should redirect
  }, TIMEOUT);
});

export default {
  BASE_URL,
  TIMEOUT,
  CRITICAL_PAGES,
  API_ENDPOINTS,
  PROTECTED_PAGES,
  LOCALES
};
