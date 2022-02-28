const CACHE_FILE = "version-1";
const urlTochache = ["index.html", "offline.html"];

const self = this;

//install sw
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_FILE).then((cache) => {
      console.log("open chache");
      return cache.addAll(urlTochache);
    })
  );
});
//listen sw
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//activate sw
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_FILE);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
