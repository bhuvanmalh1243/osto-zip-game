const C='osto-zip-v9';
const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>
    fetch(u,{cache:'reload'}).then(r=>r.ok?c.put(u,r):null).catch(()=>null)
  ))));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith((async()=>{
    try{
      const r=await fetch(u.href,{cache:'reload'});
      if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});}
      return r;
    }catch(err){
      const m=await caches.match(e.request);
      return m||await caches.match('index.html');
    }
  })());
});
