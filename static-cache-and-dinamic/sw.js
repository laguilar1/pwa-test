// https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker#2_cache_the_application_shell
const staticCacheName = 'static-homework-v1';
const dinamicCacheName = 'dinamic-homework-v1';
const offlineUrl='404.html';
const filesToCache = [
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
          cache.addAll(filesToCache); //array 
      })
  );
});

//We can intercept request for those files from the network and respond with the files from the cache
self.addEventListener('fetch', event => {
  
  event.respondWith(
    caches.match(event.request)
      
    //ESTATICO
     .then(response => {
        if(response){

          console.log('Encontrado', event.request.url, 'en cache');
          return response.clone();
        }
        return fetch(event.request)


      })
      .then(response => {


        let hasImg= event.request.url.includes('/img/');
        
        if(hasImg){
          
          return caches.open(dinamicCacheName).then(cache=> {
            console.log('Guardado dinámico de: ', event.request.url)
            cache.put(event.request.url, response.clone());
            return response;
          });
          
        }
        
        return response;
      })  
      .catch(error=>{
        
        // TODO 6: Respond with custom offline page
        console.log('Respondiendo con pagina fuera de linea')

      })
  );
});



