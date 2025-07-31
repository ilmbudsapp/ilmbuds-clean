const CACHE_NAME = 'ilmbuds-v7.4';
const urlsToCache = [
  './',
  './index.html',
  './assets/ALLAHU EKBER.mp3',
  './assets/BISMILLAH.mp3',
  './assets/SUBHANALLAH.mp3',
  './images/ILMBUDS LOGO 1.png',
  './images/01.QUIZ.png',
  './images/02.ISLAMIC STORIES.png',
  './images/03.QURAN.png',
  './images/04.CATECHISM ILMIHAL.png',
  './images/05.CARTOONS.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});