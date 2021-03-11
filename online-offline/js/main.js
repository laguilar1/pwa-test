
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

// Fuente: https://developer.mozilla.org/es/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", function(event) {
  
  console.log("DOM fully loaded and parsed:");
  
  var offlineNotification = document.getElementById('offline');
  
  // Alert offline
  function showIndicator() {
    offlineNotification.innerHTML = 'You are currently offline.';

    offlineNotification.classList.remove('alert-info');
    offlineNotification.classList.add('alert-warning');
    console.log('Tu es tas offline')
  }
  
  // Alerte online
  function hideIndicator() {
      offlineNotification.innerHTML = 'You are online.';
      offlineNotification.classList.remove('alert-warning');
      offlineNotification.classList.add('alert-info');  
      console.log('Tu es tas online')  
  }
  
  // LISTENERS
  window.addEventListener('online', hideIndicator);
  window.addEventListener('offline', showIndicator);

});


