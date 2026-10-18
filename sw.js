// INI-CET Quest Service Worker - Offline Caching & PWA
const CACHE_NAME = 'inicet-quest-cache-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './ini-questv2.html',
  './inicet-quest.html',
  './manifest.json',
  './favicon.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Pre-cache partial failure:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests; pass through cloud API/realtime streaming requests directly
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Exclude Firebase, Google APIs, GitHub APIs, and analytics from service worker cache
  if (
    url.origin.includes('firestore') ||
    url.origin.includes('googleapis') ||
    url.origin.includes('github.com') ||
    url.origin.includes('githubusercontent')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cached index.html for navigation requests when offline
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
