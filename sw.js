const CACHE_NAME = "ia-hub-v1";
const ASSETS = [
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Installation : mise en cache de tous les assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Mise en cache des assets...");
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch : stratégie Cache First, puis réseau
self.addEventListener("fetch", event => {
  // On ne gère que les requêtes GET
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // Mise en cache des nouvelles ressources locales
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Fallback offline : retourner le HTML principal
          if (event.request.destination === "document") {
            return caches.match("./index.html");
          }
        });
    })
  );
});
