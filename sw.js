/* ============================================================
   Universal AI Chat — Service Worker
   Provides offline support, caching, and PWA install capability
   ============================================================ */

const CACHE_NAME = 'ai-chat-v1';
const CACHE_VERSION = '1.0.0';

// Resources to cache immediately on install (App Shell)
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json'
];

// CDN resources to cache on first use
const CDN_CACHE_NAME = 'ai-chat-cdn-v1';
const CDN_HOSTS = [
  'cdn.tailwindcss.com',
  'cdn.jsdelivr.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// ─── Install: cache app shell ───────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[SW] Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(function() {
        // Activate immediately without waiting for old SW to die
        return self.skipWaiting();
      })
      .catch(function(err) {
        console.warn('[SW] Precache failed (may be running locally):', err);
        return self.skipWaiting();
      })
  );
});

// ─── Activate: clean old caches ─────────────────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function(name) {
              return name !== CACHE_NAME && name !== CDN_CACHE_NAME;
            })
            .map(function(name) {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(function() {
        return self.clients.claim();
      })
  );
});

// ─── Fetch: smart cache strategy ────────────────────────────
self.addEventListener('fetch', function(event) {
  var url;
  try { url = new URL(event.request.url); } catch(e) { return; }

  // Skip non-GET and API calls (never cache API responses)
  if (event.request.method !== 'GET') return;
  if (url.href.includes('openrouter.ai')) return;
  if (url.href.includes('api/v1/')) return;

  var isCDN = CDN_HOSTS.some(function(host) { return url.hostname === host; });
  var isLocal = url.origin === self.location.origin;

  if (isLocal) {
    // Cache-first for local app files
    event.respondWith(cacheFirst(event.request, CACHE_NAME));
  } else if (isCDN) {
    // Stale-while-revalidate for CDN assets
    event.respondWith(staleWhileRevalidate(event.request, CDN_CACHE_NAME));
  }
  // For everything else (OpenRouter, etc.), fall through to network
});

// ─── Cache Strategies ───────────────────────────────────────

function cacheFirst(request, cacheName) {
  return caches.open(cacheName).then(function(cache) {
    return cache.match(request).then(function(cached) {
      if (cached) return cached;
      return fetch(request).then(function(response) {
        if (response && response.status === 200 && response.type !== 'opaque') {
          cache.put(request, response.clone());
        }
        return response;
      }).catch(function() {
        // Offline fallback
        return caches.match('./index.html');
      });
    });
  });
}

function staleWhileRevalidate(request, cacheName) {
  return caches.open(cacheName).then(function(cache) {
    return cache.match(request).then(function(cached) {
      var fetchPromise = fetch(request).then(function(response) {
        if (response && response.status === 200) {
          cache.put(request, response.clone());
        }
        return response;
      }).catch(function() { return cached; });

      return cached || fetchPromise;
    });
  });
}

// ─── Message handler (for cache invalidation from app) ──────
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(function(names) {
      names.forEach(function(name) { caches.delete(name); });
    });
  }
});
