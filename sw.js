const CACHE_NAME = "forge-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./style.css",
  "./exercise-library.js",
  "./exercise-updates.js",
  "./bodyweight-fallback.js",
  "./muscle-diagram.js",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800;900&family=JetBrains+Mono:wght@500;700&display=swap"
];

// Install — cache all assets
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean up old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — serve from cache, fall back to network
self.addEventListener("fetch", e => {
  const url = e.request.url;

  // Only handle GET requests over http/https — skip POST, chrome-extension://, etc.
  if (e.request.method !== "GET") return;
  if (!url.startsWith("http://") && !url.startsWith("https://")) return;

  // Let ALL Vercel infrastructure and analytics requests go straight to network — never cache
  if (url.includes("/_vercel/") || url.includes("va.vercel-scripts.com")) {
    e.respondWith(fetch(e.request));
    return;
  }

  e.respondWith(
    caches.match(e.request)
      .then(cached => cached || fetch(e.request)
        .then(response => {
          // Only cache valid same-origin or CORS responses
          if (!response || response.status !== 200 || response.type === "opaque") {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
          return response;
        })
      ).catch(() => caches.match("./index.html"))
  );
});
