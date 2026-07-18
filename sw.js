/* Master Web App — service worker (network-first, cache fallback) */
const CACHE = 'mwa-v2';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html']).catch(() => {})));
});
self.addEventListener('activate', e => {
  e.waitUntil(Promise.all([
    clients.claim(),
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  ]));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r && r.status === 200 && r.type === 'basic') {
        const rc = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, rc));
      }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
