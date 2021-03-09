// https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker#2_cache_the_application_shell
var staticCacheName = 'homework-v1';
var offlineUrl='404.html';
var filesToCache = [
        './',
        '404.html',
        'index.html',
        'css/main.css',
        'css/bootstrap.min.css',
        'css/normalize.css',
        'js/main.js',
        'js/modernizr.min.js' 
];
// Cache our known resources during install
self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache estatic assets')
    event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
          cache.addAll(filesToCache)
          // cache.addAll(offlineUrl)
      })
  );
});

//We can intercept request for those files from the network and respond with the files from the cache
// INTERCEPTANDO LAS PETICIONES
self.addEventListener('fetch', event => {
  // console.log('Evento fetch por: ', event.request.url);
  event.respondWith(
    caches.match(event.request)
      
    //ESTATICO
     .then(response => {
        if(response){
          console.log('Encontrado', event.request.url, 'en cache');
          return response;
        }
        console.log ('Network request for', event.request.url);
        return fetch(event.request)

        // TODO 4: Add fetched files to the cache  
      })   
      .catch(error=>{

        // TODO 6: Respond with custom offline page
        // console.log('Pagina offline:', error);
        console.log('Respondiendo con pagina fuera de linea')

      })
  );
});



