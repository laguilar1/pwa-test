'use stirct';
/* 
*Con esta técnica, puede mostrar imágenes más pequeñas a sus usuarios y acelerar los tiempos de carga de su página.
*Si soporta imagenes webp entonces se la muestra, si no usa los jpg o png
*/
//Escuchando el evento fetch
self.addEventListener('fetch', function(event){
    //Comprobar si la solicitud entrante es para imagen JPG o PNG
    // if (/\.jpg$|.png$/.test(event.request.url)) {
    if (/\.jpg$/.test(event.request.url)) {
        var supportsWebp = false;
        console.log('Peticion original: ', event.request.url);
        // inspecciona el header de aceptacion para obtener valor de compatibilidad
        if (event.request.headers.has('accept')){
            supportsWebp=event.request.headers
                .get('accept')
                .includes('webp');
            console.log('Compatibilidad:', supportsWebp);
        }
        // Soporta WebP?
        if(supportsWebp){
            var req = event.request.clone();
            // Forma la url de regreso
            console.log(req.url.substr(0, req.url.lastIndexOf(".")));//Url sin extensión
            var returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + ".webp";
            console.log('Regreso de url completa:',returnUrl);
            event.respondWith(
                fetch(returnUrl, {
                    mode: 'no-cors' // no-cors, *cors, same-origin
                })
            );
        }
    }
});