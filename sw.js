const C='sks-v18',F=['./','index.html','style.css','data.js','videos.js','calib.js','covers.js','figure.js','figure3d.js','rig.js','body.glb','app.js','icon.svg','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(C).then(ch=>ch.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
