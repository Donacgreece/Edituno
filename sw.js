const CACHE = 'edituno-live-v1.0.2'
const CORE = [
  './',
  './index.html',
  './assets/app-v102.css',
  './assets/app-v102.js',
  './manifest.webmanifest',
  './icons/icon-192-v102.png',
  './icons/icon-512-v102.png',
  './icons/apple-touch-icon-v102.png',
  './icons/maskable-512-v102.png'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return

  const isAppAsset =
    event.request.mode === 'navigate' ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.webmanifest') ||
    url.pathname.endsWith('.png')

  if (isAppAsset) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone()
            caches.open(CACHE).then(cache => cache.put(event.request, copy))
          }
          return response
        })
        .catch(() => caches.match(event.request).then(hit => hit || caches.match('./')))
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then(hit => hit || fetch(event.request))
  )
})
