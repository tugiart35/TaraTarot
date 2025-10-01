/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + '.js', parentUri).href;
    return (
      registry[uri] ||
      new Promise(resolve => {
        if ('document' in self) {
          const script = document.createElement('script');
          script.src = uri;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          nextDefineUri = uri;
          importScripts(uri);
          resolve();
        }
      }).then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri =
      nextDefineUri ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require,
    };
    registry[uri] = Promise.all(
      depsNames.map(depName => specialDeps[depName] || require(depName))
    ).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-e43f5367'], function (workbox) {
  'use strict';

  importScripts();
  
  // Service Worker version management
  const SW_VERSION = '1.2.0';
  const CACHE_NAME = `tarot-sw-v${SW_VERSION}`;
  
  console.log(`🔧 Service Worker v${SW_VERSION} activated`);
  
  self.skipWaiting();
  workbox.clientsClaim();
  
  // Clean up old caches
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName.startsWith('tarot-sw-v')) {
              console.log(`🗑️ Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  // Cache static assets with StaleWhileRevalidate
  workbox.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        {
          cacheWillUpdate: async ({ request, response }) => {
            return response.status === 200 ? response : null;
          },
        },
      ],
    }),
    'GET'
  );

  // Cache fonts with CacheFirst
  workbox.registerRoute(
    ({ request }) => request.destination === 'font',
    new workbox.CacheFirst({
      cacheName: 'fonts',
      plugins: [
        {
          cacheWillUpdate: async ({ request, response }) => {
            return response.status === 200 ? response : null;
          },
        },
      ],
    }),
    'GET'
  );

  // Cache API responses with NetworkFirst
  workbox.registerRoute(
    ({ url }) => url.pathname.startsWith('/api/'),
    new workbox.NetworkFirst({
      cacheName: 'api',
      networkTimeoutSeconds: 3,
      plugins: [
        {
          cacheWillUpdate: async ({ request, response }) => {
            return response.status === 200 ? response : null;
          },
        },
      ],
    }),
    'GET'
  );

  // Cache pages with NetworkFirst and offline fallback
  workbox.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.NetworkFirst({
      cacheName: 'pages',
      networkTimeoutSeconds: 3,
      plugins: [
        {
          handlerDidError: async () => {
            return await caches.match('/offline') || new Response(
              '<html><body><h1>Offline</h1></body></html>',
              {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'text/html' }
              }
            );
          },
        },
      ],
    }),
    'GET'
  );

  // Cache static resources with CacheFirst
  workbox.registerRoute(
    ({ request }) => 
      request.destination === 'script' || 
      request.destination === 'style',
    new workbox.CacheFirst({
      cacheName: 'static-resources',
      plugins: [
        {
          cacheWillUpdate: async ({ request, response }) => {
            return response.status === 200 ? response : null;
          },
        },
      ],
    }),
    'GET'
  );

  // Start URL cache
  workbox.registerRoute(
    '/',
    new workbox.NetworkFirst({
      cacheName: 'start-url',
      plugins: [
        {
          cacheWillUpdate: async ({ request, response, event, state }) => {
            if (response && response.type === 'opaqueredirect') {
              return new Response(response.body, {
                status: 200,
                statusText: 'OK',
                headers: response.headers,
              });
            }
            return response;
          },
        },
      ],
    }),
    'GET'
  );
});
//# sourceMappingURL=sw.js.map
