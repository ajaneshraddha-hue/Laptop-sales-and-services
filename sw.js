const CACHE_NAME = 'lapro-v5';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './state.js',
  './products.js',
  './lapro-logo.png',
  './logo.png',
  './manifest.json'
];

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network first, fallback to cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
