
// Saber si el navegador soporta Service Worker
 if ('serviceWorker' in navigator) {
  
  window.addEventListener('load', function(){
    
        navigator.serviceWorker.register('./sw.js').
        then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function(error){
          console.log('ServiceWorker registration failed: ', err);
        })

  });

}

