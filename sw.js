const cacheName = 'cacheSite'
self.addEventListener ('install', function(event){

    event.waitUntil(

        caches.open(cacheName).then(function(cache){

            cache.addAll ([
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/./',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/index.html',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/sw.js',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/index.js',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/style.css',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/img/iconlogo.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/manifest.json',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-48x48.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-72x72.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-96x96.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-128x128.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-144x144.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-152x152.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-192x192.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-256x256.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-384x384.png',
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/icons/icon-512x512.png'


            ])

        })

    ) .then(() => self.skipWaiting())

})

self.addEventListener('activate', e =>{

    self.clients.claim()

})

self.addEventListener ('fetch', async e => {

    const req = e.request
    const url = new URL(req.url)

    if(url.origin === location.origin){


        e.respondWith(cacheFirst(req))

    } else {

        e.respondWith(networkAndCache(req))

    }

})

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req) 

    return cached || fetch(req)
    
}

async function networkAndCache(req) {

    const cache = await caches.open(cacheName)

    try {
        const refresh = await fetch(req)
        await cache.put(req, refresh.clone())
        return refresh
    } catch(e) {
        const cached = await cache.match(req)
        return cached
    }
    
}
