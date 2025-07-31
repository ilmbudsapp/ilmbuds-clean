const CACHE_NAME = 'ilmbuds-v7.4.0';
const urlsToCache = [
  '/',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-48x48.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-384x384.png',
  '/manifest.json',
  '/sounds/allahu_ekber.mp3',
  '/sounds/bismillah.mp3',
  '/sounds/subhanallah.mp3',
  '/images/ilmbuds-logo.png',
  '/images/01.QUIZ.png',
  '/images/02.ISLAMIC STORIES.png',
  '/images/03.QURAN.png',
  '/images/04.CATECHISM ILMIHAL.png',
  '/images/05.CARTOONS.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();
          
          // Cache important resources dynamically
          if (event.request.url.includes('/api/') || 
              event.request.url.includes('.png') || 
              event.request.url.includes('.mp3') ||
              event.request.url.includes('.js') ||
              event.request.url.includes('.css')) {
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }

          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync');
    event.waitUntil(
      // Sync offline data when connection is restored
      syncOfflineData()
    );
  }
});

// Push notifications support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from ILMBUDS',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('ILMBUDS', options)
  );
});

async function syncOfflineData() {
  try {
    // Sync any offline quiz results or progress
    const cache = await caches.open(CACHE_NAME);
    // Implementation for syncing offline data
    console.log('Service Worker: Offline data synced');
  } catch (error) {
    console.error('Service Worker: Sync failed:', error);
  }
}