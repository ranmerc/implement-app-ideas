const fontsCacheVersion = 'v1';
const fontCacheName = '-font-cache';
let allClients = [];

self.addEventListener('install', (installEvent) => {
  self.skipWaiting();
});

self.addEventListener('activate', async (activateEvent) => {
  activateEvent.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      cacheNames.forEach((cacheName) => {
        if (
          cacheName.endsWith(fontCacheName) &&
          cacheName !== fontsCacheVersion + fontCacheName
        ) {
          caches.delete(cacheName);
        }
      });

      self.clients.claim();
      allClients = await self.clients.matchAll();
    })()
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  const request = fetchEvent.request;
  const requestURL = new URL(request.url);
  const clientURL = new URL(allClients[0].url);
  if (requestURL.host === clientURL.host) {
    if (requestURL.pathname.startsWith('/fonts/')) {
      fetchEvent.respondWith(
        (async () => {
          const responseFromCache = await caches.match(request);
          if (responseFromCache) return responseFromCache;
          const responseFromNetwork = await fetch(request);
          const responseFromNetworkClone = responseFromNetwork.clone();
          if (responseFromNetwork.ok) {
            const fontCache = await caches.open(
              fontsCacheVersion + fontCacheName
            );
            fontCache.put(request, responseFromNetworkClone);
          }
          return responseFromNetwork;
        })()
      );
    } else {
      const cached = caches.match(request);
      const fetched = fetch(request);
      const fetchedCopy = fetched.then((res) => res.clone());

      fetchEvent.respondWith(
        Promise.race([fetched.catch((_) => cached), cached])
          .then((res) => res || fetched)
          .catch((_) => new Response(null, { status: 404 }))
      );

      fetchEvent.waitUntil(
        Promise.all([
          fetchedCopy,
          caches.open(clientURL.pathname.match('.*/(.*)/')[1]),
        ])
          .then(([response, cache]) => cache.put(request, response))
          .catch((_) => {})
      );
    }
  }
});
