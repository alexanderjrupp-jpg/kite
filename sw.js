/* Kite service worker — the app works with zero internet after first visit */
var CACHE = "kite-v1";
self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(["./", "./index.html"]); })
      .then(function(){ return self.skipWaiting(); })
  );
});
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
self.addEventListener("fetch", function(e){
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  /* app shell: serve cached instantly, refresh cache in background */
  if (url.origin === location.origin){
    e.respondWith(
      caches.match(e.request).then(function(cached){
        var fetched = fetch(e.request).then(function(resp){
          if (resp && resp.ok){
            var copy = resp.clone();
            caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
          }
          return resp;
        }).catch(function(){ return cached; });
        return cached || fetched;
      })
    );
    return;
  }
  /* ARASAAC symbols: cache once seen, so symbols survive offline */
  if (url.hostname === "static.arasaac.org"){
    e.respondWith(
      caches.match(e.request).then(function(cached){
        return cached || fetch(e.request).then(function(resp){
          if (resp && resp.ok){
            var copy = resp.clone();
            caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
          }
          return resp;
        });
      })
    );
  }
  /* firebase & everything else: straight through */
});
