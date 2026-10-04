const V='88',C='sks-v'+V,F=['./','index.html','style.css','data.js','videos.js','calib.js','covers.js','figure.js','figure3d.js','rig.js','body.glb','app.js','icon.svg','icon-192.png','icon-512.png','apple-touch-icon.png','favicon-64.png','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(f=>fetch(f,{cache:'no-store'}).then(r=>{if(r.ok)return c.put(f,r)}).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
// rete prima (sempre aggiornata); se la rete non risponde si usa la copia in cache, ignorando il ?v= della richiesta
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
 e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(C).then(ch=>ch.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||(e.request.mode==='navigate'?caches.match('./'):undefined))))});
