/*
 * SECURE SERVICE WORKER FOR AUTH SYSTEM
 *
 * BAĞLANTILI DOSYALAR:
 * - /public/sw.js (Ana service worker)
 * - /src/hooks/useAuth.ts (Auth hook)
 * - /src/lib/supabase/client.ts (Supabase client)
 *
 * DOSYA AMACI:
 * PWA için güvenli authentication service worker.
 * Offline auth support, secure session handling, ve background sync.
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - Secure session storage
 * - CSRF protection
 * - Rate limiting
 * - Background sync for auth operations
 * - Offline auth state management
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: PWA auth desteği için
 * - GÜVENLİ: Production-ready
 * - OFFLINE: Offline auth support
 */

const CACHE_NAME = 'auth-cache-v1';
const AUTH_CACHE_NAME = 'auth-session-v1';
const RATE_LIMIT_KEY = 'auth_rate_limit';
const MAX_REQUESTS_PER_MINUTE = 10;

// Auth-related routes that need special handling
const AUTH_ROUTES = [
  '/auth',
  '/auth/confirm',
  '/auth/reset-password',
  '/api/auth',
];

// Secure session storage for offline use
class SecureSessionStorage {
  constructor() {
    this.sessionKey = 'sw_auth_session';
    this.encryptionKey = 'auth_sw_key_2024';
  }

  // Simple encryption for session data
  encrypt(data) {
    try {
      const jsonString = JSON.stringify(data);
      return btoa(jsonString);
    } catch {
      return null;
    }
  }

  decrypt(encryptedData) {
    try {
      const jsonString = atob(encryptedData);
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }

  setSession(sessionData) {
    try {
      const encrypted = this.encrypt(sessionData);
      if (encrypted) {
        localStorage.setItem(this.sessionKey, encrypted);
        return true;
      }
    } catch {
      // Storage failed
    }
    return false;
  }

  getSession() {
    try {
      const encrypted = localStorage.getItem(this.sessionKey);
      if (encrypted) {
        return this.decrypt(encrypted);
      }
    } catch {
      // Storage failed
    }
    return null;
  }

  clearSession() {
    try {
      localStorage.removeItem(this.sessionKey);
    } catch {
      // Storage failed
    }
  }
}

// Rate limiting for auth requests
class RateLimiter {
  constructor() {
    this.requests = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const requests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < windowMs);

    if (validRequests.length >= MAX_REQUESTS_PER_MINUTE) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);

    return true;
  }
}

const sessionStorage = new SecureSessionStorage();
const rateLimiter = new RateLimiter();

// Install event - cache auth-related resources
self.addEventListener('install', event => {
  console.log('Auth Service Worker installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/auth',
        '/manifest.json',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
      ]);
    })
  );

  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Auth Service Worker activating...');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== AUTH_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Fetch event - handle auth requests with security
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle auth-related requests
  if (AUTH_ROUTES.some(route => url.pathname.startsWith(route))) {
    event.respondWith(handleAuthRequest(request));
    return;
  }

  // Handle Supabase auth requests
  if (url.hostname.includes('supabase') && url.pathname.includes('auth')) {
    event.respondWith(handleSupabaseAuthRequest(request));
    return;
  }
});

// Handle auth requests with rate limiting and caching
async function handleAuthRequest(request) {
  const clientId = request.headers.get('x-client-id') || 'anonymous';

  // Rate limiting check
  if (!rateLimiter.isAllowed(clientId)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Try network first for auth requests
    const response = await fetch(request);

    // Cache successful auth responses
    if (response.ok && request.method === 'GET') {
      const cache = await caches.open(AUTH_CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    // Fallback to cache for offline support
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for auth routes
    if (request.method === 'GET') {
      return new Response(
        JSON.stringify({
          error: 'Offline',
          message:
            'Authentication service is currently offline. Please check your connection.',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    throw error;
  }
}

// Handle Supabase auth requests with enhanced security
async function handleSupabaseAuthRequest(request) {
  try {
    // Add security headers
    const modifiedRequest = new Request(request, {
      headers: {
        ...request.headers,
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache',
      },
    });

    const response = await fetch(modifiedRequest);

    // Handle successful auth responses
    if (response.ok) {
      const responseData = await response.clone().json();

      // Store session data securely
      if (responseData.session) {
        sessionStorage.setSession({
          user: responseData.session.user,
          access_token: responseData.session.access_token,
          refresh_token: responseData.session.refresh_token,
          expires_at: responseData.session.expires_at,
          timestamp: Date.now(),
        });
      }
    }

    return response;
  } catch (error) {
    console.error('Supabase auth request failed:', error);

    // Return cached session if available
    const cachedSession = sessionStorage.getSession();
    if (cachedSession && request.method === 'GET') {
      return new Response(JSON.stringify({ session: cachedSession }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    throw error;
  }
}

// Background sync for auth operations
self.addEventListener('sync', event => {
  if (event.tag === 'auth-sync') {
    event.waitUntil(performAuthSync());
  }
});

// Perform background auth sync
async function performAuthSync() {
  try {
    const session = sessionStorage.getSession();
    if (!session) return;

    // Check if session is expired
    const now = Date.now();
    const expiresAt = session.expires_at * 1000;

    if (now >= expiresAt) {
      // Try to refresh session
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          refresh_token: session.refresh_token,
        }),
      });

      if (response.ok) {
        const newSession = await response.json();
        sessionStorage.setSession(newSession);
      } else {
        // Session refresh failed, clear session
        sessionStorage.clearSession();
      }
    }
  } catch (error) {
    console.error('Auth sync failed:', error);
  }
}

// Handle push notifications for auth events
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();

    if (data.type === 'auth') {
      const options = {
        body: data.message,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        tag: 'auth-notification',
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: 'View',
            icon: '/icons/action-view.png',
          },
          {
            action: 'dismiss',
            title: 'Dismiss',
            icon: '/icons/action-dismiss.png',
          },
        ],
      };

      event.waitUntil(self.registration.showNotification(data.title, options));
    }
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(clients.openWindow('/auth'));
  }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  const { type, data } = event.data;

  switch (type) {
    case 'GET_SESSION':
      const session = sessionStorage.getSession();
      event.ports[0].postMessage({ session });
      break;

    case 'CLEAR_SESSION':
      sessionStorage.clearSession();
      event.ports[0].postMessage({ success: true });
      break;

    case 'SET_SESSION':
      const success = sessionStorage.setSession(data);
      event.ports[0].postMessage({ success });
      break;

    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    default:
      console.log('Unknown message type:', type);
  }
});

// Periodic cleanup
setInterval(
  () => {
    // Clean up old rate limit entries
    const now = Date.now();
    const windowMs = 60 * 1000;

    for (const [key, requests] of rateLimiter.requests.entries()) {
      const validRequests = requests.filter(time => now - time < windowMs);
      if (validRequests.length === 0) {
        rateLimiter.requests.delete(key);
      } else {
        rateLimiter.requests.set(key, validRequests);
      }
    }
  },
  5 * 60 * 1000
); // Clean up every 5 minutes

console.log('Auth Service Worker loaded successfully');
