/* Figure 3D (three.js): stessa logica di posa di figure.js, ma il manichino è un vero modello 3D
   che si può ruotare col dito/mouse. Se three.js non è disponibile, si usa la figura 2D. */
const FIG3 = (() => {
  const R = Math.PI / 180, FLOOR = 222, UA = 36, FA = 38, TH = 52, SH = 52;
  const dir = a => [Math.sin(a * R), Math.cos(a * R)];
  const add = (p, l, a) => { const d = dir(a); return [p[0] + l * d[0], p[1] + l * d[1]]; };
  const C = {body:'#d7dfec', far:'#8190aa', acc:'#ff7a30', plate:'#5d6b85', cable:'#2fc4f5', tower:'#3a4764', bench:'#4a5876', skin:'#e9c9a8'};
  const ST = {
    stand:{h:[150,118],t:180,th:0,sh:0}, hinge:{h:[130,120],t:115,th:18,sh:-8},
    seat:{h:[120,172],t:180,th:90,sh:0,bench:'seat'}, lie:{h:[215,178],t:-90,th:100,sh:2,bench:'flat'},
    inc:{h:[190,170],t:225,th:95,sh:2,bench:'inc'}, kneel:{h:[150,162],t:180,th:0,sh:-90,bench:'kneel'},
    hang:{h:[150,150],t:180,th:10,sh:-70}
  };
  const KEYS = ['t','th','sh','tl','lift','ft','hd','ua','fa','ab'];
  const resolve = (ex, fr) => Object.assign({tl:58, lift:0, ft:0, hd:0, ab:0}, ST[ex.st], fr[2] || {}, {ua:fr[0], fa:fr[1]});
  const lerp = (a, b, k) => { const r = {h:[a.h[0]+(b.h[0]-a.h[0])*k, a.h[1]+(b.h[1]-a.h[1])*k]}; KEYS.forEach(n => r[n] = (a[n]??0) + ((b[n]??0)-(a[n]??0))*k); return r; };
  function ik(h, t, l1, l2) {
    let dx = t[0]-h[0], dy = t[1]-h[1], d0 = Math.hypot(dx, dy), d = Math.min(d0, l1+l2-0.5);
    const a = (l1*l1 - l2*l2 + d*d)/(2*d), hh = Math.sqrt(Math.max(0, l1*l1 - a*a)), ux = dx/d0, uy = dy/d0;
    const c1 = [h[0]+a*ux-hh*uy, h[1]+a*uy+hh*ux], c2 = [h[0]+a*ux+hh*uy, h[1]+a*uy-hh*ux];
    return c1[1] > c2[1] ? c1 : c2;
  }

  /* ---- costruzione primitive (coordinate "px" 2D + profondità z) ---- */
  const cyl = (a, b, r, col, rx, rz) => ({k:'c', a, b, rx: rx ?? r, rz: rz ?? r, col});
  const sph = (p, r, col) => ({k:'s', p, r, col});
  const box = (a, b, th, dp, col) => ({k:'b', a, b, th, dp, col}); // parallelepipedo lungo a->b
  const pt3 = (p, z) => [p[0], p[1], z];

  function limb(P, pts, r, col) {
    for (let i = 0; i < pts.length - 1; i++) P.push(cyl(pts[i], pts[i+1], r, col));
    pts.forEach((p, i) => P.push(sph(p, r, col)));
  }

  function benchPrims(P, ex) {
    const st = ex.benchSt || ST[ex.st].bench, h = ST[ex.st].h, c = C.bench, D = 40;
    if (st === 'ht') { P.push(box(pt3([56,190],0), pt3([140,190],0), 9, D, c)); P.push(cyl(pt3([68,195],-12), pt3([68,FLOOR],-12), 2.5, c)); P.push(cyl(pt3([128,195],12), pt3([128,FLOOR],12), 2.5, c)); }
    else if (st === 'seat') { P.push(box(pt3([h[0]-26,h[1]+10],0), pt3([h[0]+46,h[1]+10],0), 9, D, c)); P.push(box(pt3([h[0]-14,h[1]+8],0), pt3([h[0]-14,h[1]-74],0), 9, D, c)); P.push(cyl(pt3([h[0]+8,h[1]+15],0), pt3([h[0]+8,FLOOR],0), 3, c)); }
    else if (st === 'flat') { P.push(box(pt3([100,h[1]+11],0), pt3([250,h[1]+11],0), 9, D, c)); P.push(cyl(pt3([120,h[1]+16],-12), pt3([120,FLOOR],-12), 2.5, c)); P.push(cyl(pt3([230,h[1]+16],12), pt3([230,FLOOR],12), 2.5, c)); }
    else if (st === 'inc') { const a = [h[0]-4, h[1]+10]; P.push(box(pt3(a,0), pt3(add(a,88,225),0), 9, D, c)); P.push(box(pt3([h[0]-20,h[1]+12],0), pt3([h[0]+44,h[1]+12],0), 9, D, c)); P.push(cyl(pt3([h[0]+10,h[1]+17],0), pt3([h[0]+10,FLOOR],0), 3, c)); }
    else if (st === 'kneel') { P.push(box(pt3([60,FLOOR-2],0), pt3([200,FLOOR-2],0), 4, 46, c)); }
    if (ex.bench === 'bulg') { P.push(box(pt3([36,188],0), pt3([90,188],0), 9, D, c)); P.push(cyl(pt3([48,193],-12), pt3([48,FLOOR],-12), 2.5, c)); P.push(cyl(pt3([80,193],12), pt3([80,FLOOR],12), 2.5, c)); }
  }

  function cableTo(P, from, an) {
    P.push(cyl(pt3([an[0], 6], 0), pt3([an[0], FLOOR], 0), 3.2, C.tower));
    P.push(sph(pt3(an, 0), 6.5, C.plate));
    P.push(cyl(from, pt3(an, 0), 1.3, C.cable));
    P.push(sph(from, 3.6, C.cable));
  }

  function geoSide(ex, p) {
    const P = [], ZN = 17, ZF = -17, LN = 11, LF = -11;
    const H = [p.h[0], p.h[1] - p.lift], S = add(H, p.tl, p.t), head = add(S, 22, p.t);
    const K = add(H, TH, p.th), A = add(K, SH, p.sh), foot = add(A, 16, p.sh + 90 + p.ft);
    let E = add(S, UA, p.ua), W = add(E, FA, p.fa);
    let grip = ex.hand ? add(W, 14, p.fa + p.hd) : W;
    if (ex.eq === 'barh') { grip = H; E = ik(S, H, UA, FA); W = H; }
    benchPrims(P, ex);
    // gamba lontana
    let K2, A2, f2;
    if (ex.rl) { K2 = ik(H, ex.rl, TH, SH); A2 = ex.rl; f2 = add(A2, 16, 90); }
    else if (ex.sup) { K2 = add(H, TH, 0); A2 = add(K2, SH, 0); f2 = add(A2, 16, 90); }
    else { K2 = K; A2 = A; f2 = foot; }
    limb(P, [pt3(H, LF), pt3(K2, LF), pt3(A2, LF)], 6.5, C.far); P.push(cyl(pt3(A2, LF), pt3(f2, LF), 4.5, C.far));
    // braccio lontano
    const Ef = ex.one ? add(S, UA, 5) : E, Wf = ex.one ? add(Ef, FA, 5) : W;
    limb(P, [pt3(S, ZF), pt3(Ef, ZF), pt3(Wf, ZF)], 5, C.far);
    // tronco, bacino, spalle, testa
    P.push(cyl(pt3(H, 0), pt3(S, 0), 11, C.body, 11, 19));
    P.push(cyl(pt3(H, LF - 2), pt3(H, LN + 2), 7.5, C.body));
    P.push(cyl(pt3(S, ZF - 1), pt3(S, ZN + 1), 7, C.body));
    P.push(sph(pt3(add(S, 10, p.t), 0), 6, C.body));
    P.push(sph(pt3(head, 0), 11.5, C.skin));
    // gamba vicina
    limb(P, [pt3(H, LN), pt3(K, LN), pt3(A, LN)], 7, C.body); P.push(cyl(pt3(A, LN), pt3(foot, LN), 4.8, C.body));
    // braccio vicino
    limb(P, [pt3(S, ZN), pt3(E, ZN), pt3(W, ZN)], 5.4, C.acc);
    if (ex.hand) P.push(cyl(pt3(W, ZN), pt3(grip, ZN), 4.2, C.acc));
    // pavimento-linea e attrezzi
    const g1 = pt3(grip, ZN), g2 = pt3(grip, ex.one ? ZN : ZF);
    if (ex.eq === 'cable' && ex.an) {
      const an = Array.isArray(ex.an[0]) ? ex.an[0] : ex.an;
      const from = ex.cp === 'ankle' ? pt3(A, LN) : pt3(grip, ex.one ? ZN : 0);
      cableTo(P, from, an);
      if (ex.cp !== 'ankle' && !ex.one) { P.push(cyl(g1, g2, 2.4, C.plate)); }
      else if (ex.cp === 'ankle') P.push(cyl(pt3(A, LN - 4), pt3(A, LN + 4), 6.5, C.plate, 6.5, 6.5));
    } else if (ex.eq === 'jam' && ex.an) {
      P.push(cyl(pt3(ex.an, 0), g1, 3.6, C.tower)); P.push(sph(pt3(ex.an, 0), 7, C.plate));
      if (!ex.one) P.push(cyl(pt3(ex.an, 0), g2, 3.6, C.tower));
      P.push(cyl(pt3(grip, ZN - 4), pt3(grip, ZN + 6), 7, C.plate));
    } else if (ex.eq === 'bar' || ex.eq === 'barh') {
      P.push(cyl(pt3(grip, -56), pt3(grip, 56), 2.4, '#aab4c8'));
      [-46, 40].forEach(z => P.push(cyl(pt3(grip, z), pt3(grip, z + 7), 12, C.plate)));
    } else if (ex.eq === 'db') {
      const zs = ex.one ? [ZN] : [ZN, ZF];
      zs.forEach(z => { P.push(cyl(pt3(grip, z - 9), pt3(grip, z + 9), 2.2, '#aab4c8')); P.push(cyl(pt3(grip, z - 10), pt3(grip, z - 5), 7, C.plate)); P.push(cyl(pt3(grip, z + 5), pt3(grip, z + 10), 7, C.plate)); });
    } else if (ex.eq === 'hb') {
      P.push(cyl(pt3([150, 20], -60), pt3([150, 20], 60), 3, C.tower)); P.push(cyl(pt3([150, 20], -60), pt3([150, FLOOR], -60), 3, C.tower)); P.push(cyl(pt3([150, 20], 60), pt3([150, FLOOR], 60), 3, C.tower));
    } else if (ex.eq === 'pad') {
      P.push(cyl(pt3(A, LN - 14), pt3(A, LN + 14), 6.5, C.plate)); P.push(cyl(pt3(A, LF - 3), pt3(A, LF + 3), 6.5, C.plate));
    }
    return P;
  }

  function geoFront(ex, p) {
    const P = [], seatF = ex.st === 'seat', sy = seatF ? 114 : 62, hy = sy + 58, cx = 150;
    const Ls = [cx - 27, sy + 4], Rs = [cx + 27, sy + 4];
    const arm = (S, sg, ua, fa) => { const E = [S[0] + sg*UA*Math.sin(ua*R), S[1] + UA*Math.cos(ua*R)]; return {E, W: [E[0] + sg*FA*Math.sin(fa*R), E[1] + FA*Math.cos(fa*R)]}; };
    const rA = arm(Rs, 1, p.ua, p.fa), lA = ex.one ? arm(Ls, -1, 5, 5) : arm(Ls, -1, p.ua, p.fa);
    let rAnk = [cx + 14, hy + 104];
    if (seatF) {
      P.push(box(pt3([cx - 46, hy + 7], 0), pt3([cx + 46, hy + 7], 0), 9, 44, C.bench));
      P.push(cyl(pt3([cx - 30, hy + 12], 0), pt3([cx - 30, FLOOR], 0), 3, C.bench)); P.push(cyl(pt3([cx + 30, hy + 12], 0), pt3([cx + 30, FLOOR], 0), 3, C.bench));
      limb(P, [[cx - 14, hy, 0], [cx - 18, hy + 14, 18], [cx - 26, FLOOR - 2, 34]], 7, C.body);
      limb(P, [[cx + 14, hy, 0], [cx + 18, hy + 14, 18], [cx + 26, FLOOR - 2, 34]], 7, C.body);
      rAnk = [cx + 26, FLOOR - 2];
    } else if (ex.legs) {
      const hip = [cx + 10, hy], a = add(hip, 104, p.ab), km = [(hip[0] + a[0]) / 2, (hip[1] + a[1]) / 2];
      limb(P, [pt3([cx - 10, hy], 0), pt3([cx - 12, hy + 52], 0), pt3([cx - 14, FLOOR - 2], 0)], 7, C.body);
      limb(P, [pt3(hip, 0), pt3(km, 0), pt3(a, 0)], 7, C.body); rAnk = a;
      P.push(cyl(pt3(a, 0), pt3([a[0], a[1]], 16), 4.6, C.body));
    } else {
      limb(P, [pt3([cx - 10, hy], 0), pt3([cx - 18, hy + 52], 0), pt3([cx - 26, FLOOR - 2], 0)], 7, C.body);
      limb(P, [pt3([cx + 10, hy], 0), pt3([cx + 18, hy + 52], 0), pt3([cx + 26, FLOOR - 2], 0)], 7, C.body);
      P.push(cyl(pt3([cx - 26, FLOOR - 2], 0), pt3([cx - 26, FLOOR - 2], 18), 4.6, C.body)); P.push(cyl(pt3([cx + 26, FLOOR - 2], 0), pt3([cx + 26, FLOOR - 2], 18), 4.6, C.body));
    }
    P.push(cyl(pt3([cx, hy], 0), pt3([cx, sy + 2], 0), 12, C.body, 23, 11));
    P.push(cyl(pt3(Ls, 0), pt3(Rs, 0), 7, C.body)); P.push(cyl(pt3([cx - 14, hy], 0), pt3([cx + 14, hy], 0), 8, C.body));
    P.push(cyl(pt3([cx, sy + 2], 0), pt3([cx, sy - 8], 0), 5.5, C.skin)); P.push(sph(pt3([cx, sy - 21], 0), 11.5, C.skin));
    limb(P, [pt3(Ls, 0), pt3(lA.E, 0), pt3(lA.W, 0)], 5.4, ex.one ? C.far : C.acc);
    limb(P, [pt3(Rs, 0), pt3(rA.E, 0), pt3(rA.W, 0)], 5.4, C.acc);
    const an = ex.an || [], wr = pt3(rA.W, 0), wl = pt3(lA.W, 0);
    if (ex.bar) {
      P.push(cyl(wl, wr, 3, '#aab4c8')); const m = [(wl[0] + wr[0]) / 2, (wl[1] + wr[1]) / 2, 0]; cableTo(P, m, an[0]);
    } else if (ex.eq === 'cable') {
      const rg = ex.cp === 'ankle' ? pt3(rAnk, 0) : wr;
      if (an.length === 1) cableTo(P, rg, an[0]);
      else if (ex.cross) { cableTo(P, wr, an[0]); cableTo(P, wl, an[1]); }
      else { cableTo(P, wl, an[0]); cableTo(P, wr, an[1]); }
    }
    return P;
  }
  const geo = (ex, p) => ex.v === 'f' ? geoFront(ex, p) : geoSide(ex, p);

  /* ---- rendering three.js ---- */
  let active = null;
  const S3 = 100;
  function destroy(o) {
    if (!o) return; o.dead = true; cancelAnimationFrame(o.raf);
    try { o.renderer.dispose(); o.renderer.forceContextLoss(); } catch (e) {}
  }
  const mats = {};
  const mat = col => mats[col] || (mats[col] = new THREE.MeshStandardMaterial({color: col, roughness: .55, metalness: .08}));

  function mount(el, ex, fallback) {
    if (!window.THREE) return fallback(el, ex);
    destroy(active);
    let renderer;
    try {
      const cv = document.createElement('canvas');
      renderer = new THREE.WebGLRenderer({canvas: cv, antialias: true, alpha: true});
    } catch (e) { return fallback(el, ex); }
    el.innerHTML = '<div class="stage"><span class="hint3d">trascina per ruotare</span></div><div class="figcap"></div><div class="figbtns"><button data-k="0">1 Partenza</button><button data-k="1">2 Arrivo</button><button data-k="a" class="on">▶ Animazione</button></div>';
    const stage = el.querySelector('.stage'); stage.prepend(renderer.domElement);
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 1, .1, 50);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, .95));
    const dl = new THREE.DirectionalLight(0xffffff, .9); dl.position.set(2.5, 4, 3); scene.add(dl);
    const dl2 = new THREE.DirectionalLight(0x88aaff, .35); dl2.position.set(-3, 2, -2); scene.add(dl2);
    const floor = new THREE.Mesh(new THREE.CircleGeometry(1.9, 48), new THREE.MeshStandardMaterial({color: 0x1b2540, roughness: 1}));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -.005; scene.add(floor);
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.86, 1.9, 64), new THREE.MeshBasicMaterial({color: 0xff7a30})); ring.rotation.x = -Math.PI / 2; scene.add(ring);
    const gCyl = new THREE.CylinderGeometry(1, 1, 1, 14), gSph = new THREE.SphereGeometry(1, 16, 12), gBox = new THREE.BoxGeometry(1, 1, 1);
    const group = new THREE.Group(); scene.add(group); const pool = [];
    const pose = [resolve(ex, ex.fr[0]), resolve(ex, ex.fr[1])];
    const cap = el.querySelector('.figcap'), btns = el.querySelectorAll('.figbtns button');
    const o = {el, renderer, hold: null, t0: performance.now(), az: 0, el2: .22, drag: false, idle: 0, dead: false, lastW: 0};
    active = o;
    const V = (p) => new THREE.Vector3((p[0] - 150) / S3, (FLOOR - p[1]) / S3, (p[2] || 0) / S3);
    const up = new THREE.Vector3(0, 1, 0), q = new THREE.Quaternion(), d = new THREE.Vector3();
    function place(i, pr) {
      let m = pool[i];
      const type = pr.k;
      if (!m || m.userData.k !== type) {
        if (m) group.remove(m);
        m = new THREE.Mesh(type === 'c' ? gCyl : type === 's' ? gSph : gBox, mat(pr.col)); m.userData.k = type; group.add(m); pool[i] = m;
      }
      m.material = mat(pr.col);
      if (pr.k === 'c') {
        const a = V(pr.a), b = V(pr.b); d.subVectors(b, a); const len = Math.max(d.length(), 1e-4);
        m.position.copy(a).add(b).multiplyScalar(.5); q.setFromUnitVectors(up, d.normalize()); m.quaternion.copy(q); m.scale.set(pr.rx / S3, len, pr.rz / S3);
      } else if (pr.k === 's') { m.position.copy(V(pr.p)); m.quaternion.identity(); m.scale.setScalar(pr.r / S3); }
      else { const a = V(pr.a), b = V(pr.b); d.subVectors(b, a); const len = d.length(); m.position.copy(a).add(b).multiplyScalar(.5); m.rotation.set(0, 0, Math.atan2(d.y, d.x)); m.scale.set(len, pr.th / S3, pr.dp / S3); }
    }
    function resize() {
      const w = stage.clientWidth || 320, h = Math.round(Math.min(w * .9, 360));
      if (w === o.lastW) return; o.lastW = w; stage.style.height = h + 'px';
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setSize(w, h, false); renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';
      cam.aspect = w / h; cam.updateProjectionMatrix();
    }
    // interazione
    let lx = 0, ly = 0;
    stage.addEventListener('pointerdown', e => { o.drag = true; lx = e.clientX; ly = e.clientY; stage.setPointerCapture(e.pointerId); stage.querySelector('.hint3d').style.opacity = 0; });
    stage.addEventListener('pointermove', e => { if (!o.drag) return; o.az -= (e.clientX - lx) * .012; o.el2 = Math.max(-.1, Math.min(1.1, o.el2 + (e.clientY - ly) * .01)); lx = e.clientX; ly = e.clientY; o.idle = performance.now(); });
    const end = () => { o.drag = false; o.idle = performance.now(); };
    stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
    btns.forEach(b => b.onclick = () => { btns.forEach(x => x.classList.remove('on')); b.classList.add('on'); o.hold = b.dataset.k === 'a' ? null : +b.dataset.k; o.t0 = performance.now(); });
    let lastK = -1;
    function frame(t) {
      if (o.dead) return;
      o.raf = requestAnimationFrame(frame);
      if (!el.isConnected) { destroy(o); return; }
      if (el.offsetParent === null) return;
      resize();
      let k;
      if (o.hold !== null) k = o.hold;
      else { const ph = ((t - o.t0) / 1000) % 4; k = ph < .6 ? 0 : ph < 2 ? (ph - .6) / 1.4 : ph < 2.6 ? 1 : 1 - (ph - 2.6) / 1.4; k = k*k*(3-2*k); }
      if (k !== lastK) {
        lastK = k; const prims = geo(ex, lerp(pose[0], pose[1], k)); prims.forEach((pr, i) => place(i, pr));
        while (pool.length > prims.length) group.remove(pool.pop());
        cap.textContent = k < .5 ? ex.cap[0] : ex.cap[1];
      }
      if (!o.drag && t - o.idle > 2500) o.az = .75 * Math.sin(t / 2600) - (ex.v === 'f' ? 0 : .35);
      const r = o.ct[2], cx = o.ct[0], cy = o.ct[1]; cam.position.set(cx + Math.sin(o.az) * Math.cos(o.el2) * r, cy + .05 + Math.sin(o.el2) * r * .6, Math.cos(o.az) * Math.cos(o.el2) * r);
      cam.lookAt(cx, cy, 0); renderer.render(scene, cam);
    }
    const CT = {lie:[.42,.42,4.5], inc:[.3,.7,4.4], kneel:[.05,.75,4.2], hang:[0,1.1,4.6], seat:[.05,.85,4.2]}[ex.st] || [0,.95,4.15];
    o.ct = CT;
    o.az = ex.v === 'f' ? 0 : -.35; o.raf = requestAnimationFrame(frame);
    return o;
  }
  return {mount};
})();
