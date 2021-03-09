 // Register the service worker
 if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
    });
  }
