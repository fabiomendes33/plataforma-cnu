const CACHE_NAME = "plataforma-cnu-v1";

const urlsToCache = [
  "./plataformaestudoscnu2025.html",
  "./manifest.json",
  "./style.css",
  "./meu-script.js",
  "./img/logo.png"
];

// Instalação do service worker (armazenando no cache)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativação (limpa caches antigos se houver atualização de versão)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercepta requisições e serve do cache se possível
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
