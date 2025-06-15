//adding push noticication
// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('Push Received:', data);
// eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(data.title, {
    body: data.body,
    vibrate: [200,100,200],
    icon: './favcon1.png', // optional, you can set an icon for the notification
  });
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('static-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',   
  
          '/script.js',
          './favcon1.png',
          // Add other static assets here
        ]);
      })
    );
  });
  /*
  // eslint-disable-next-line no-restricted-globals
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
  
        return fetch(event.request).then((networkResponse)=> {
          if (event.request.method === 'GET') {
            caches.open('static-cache').then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      })
    );
  });

  */