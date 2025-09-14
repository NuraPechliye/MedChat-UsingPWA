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
                'https://github.com/NuraPechliye/MedChat-UsingPWA.git/manifest.json'

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