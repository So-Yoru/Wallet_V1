const CACHE_NAME = 'wallet-pro-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// Install Event: Cache all essential files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
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
  self.self.clientsClaim();
});

// Fetch Event: Serve from cache when offline, fallback to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request).catch(() => {
        // If both fail, you could return a custom offline page here
      });
    })
  );
});
