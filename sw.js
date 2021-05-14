var CACHE_NAME = 'wb-cache-v4';
var urlsToCache = [
  '/wb/',
  '/wb/css/style.css',
  '/wb/js/graph.js',
  '/wb/core.js',
  '/wb/sw.js',
  '/wb/manifest.json',
  'https://cdn.plot.ly/plotly-latest.min.js'  
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        } else {
          return fetch(event.request);
		}
      }
    )
  );
});