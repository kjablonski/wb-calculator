var CACHE_NAME = 'wb-cache-v5';
var urlsToCache = [
  '/wb-calculator/',
  '/wb-calculator/css/style.css',
  '/wb-calculator/js/graph.js',
  '/wb-calculator/core.js',
  '/wb-calculator/sw.js',
  '/wb-calculator/manifest.json',
  '/wb-calculator/js/aircraft.js',
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
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
  event.waitUntil(update(event.request));
});

function update(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
