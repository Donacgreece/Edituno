const CACHE = 'edituno-studio-v2.7.0'
const CORE = [
  './',
  './manifest.webmanifest',
  './vendor/pixi.min.js',
  './vendor/pixi-filters.min.js',
  './vendor/smartcrop.js',
  './vendor/meyda.min.js',
  './vendor/konva.min.js',
  './vendor/mediabunny.min.cjs',
  './vendor/mediabunny-aac-encoder.min.js',
  './vendor/mp4-muxer.js',
  './vendor/mp4box.all.mjs',
  './vendor/gl-transitions/CrossZoom.glsl',
  './vendor/gl-transitions/AdvancedMosaic.glsl',
  './vendor/gl-transitions/CircleCrop.glsl',
  './vendor/gl-transitions/Directional.glsl',
  './vendor/gl-transitions/Dreamy.glsl',
  './vendor/gl-transitions/Swirl.glsl',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/maskable-512.png'
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
      .then(keys => Promise.all(keys.filter(key => key.startsWith('edituno-') && key !== CACHE).map(key => caches.delete(key))))
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

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE).then(cache => cache.put('./', copy))
          }
          return response
        })
        .catch(() => caches.match('./'))
    )
    return
  }

  if (url.pathname.includes('/icons/') || url.pathname.includes('/splash/') || url.pathname.endsWith('.webmanifest') || url.pathname.includes('/vendor/') || url.pathname.endsWith('.glsl')) {
    event.respondWith(
      caches.match(event.request)
        .then(hit => hit || fetch(event.request).then(response => {
          if (response.ok) {
            const copy=response.clone()
            caches.open(CACHE).then(cache=>cache.put(event.request,copy))
          }
          return response
        }))
    )
  }
})
