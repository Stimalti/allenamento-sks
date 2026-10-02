/* Figure 3D (three.js): stessa logica di posa di figure.js, ma il manichino è un vero modello 3D
   che si può ruotare col dito/mouse. Se three.js non è disponibile, si usa la figura 2D. */
const FIG3 = (() => {
  const R = Math.PI / 180, FLOOR = 222, esc3 = s => String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  let UA = 36, FA = 38, TH = 52, SH = 52;
  const dir = a => [Math.sin(a * R), Math.cos(a * R)];
  const add = (p, l, a) => { const d = dir(a); return [p[0] + l * d[0], p[1] + l * d[1]]; };
  const C = {body:'#d7dfec', far:'#8190aa', acc:'#ff7a30', plate:'#5d6b85', cable:'#2fc4f5', tower:'#3a4764', bench:'#4a5876', skin:'#e9c9a8'};
  const ST = {
    stand:{h:[150,118],t:180,th:0,sh:0}, hinge:{h:[130,120],t:115,th:18,sh:-8},
    seat:{h:[120,172],t:180,th:90,sh:0,bench:'seat'}, lie:{h:[215,178],t:-90,th:100,sh:2,bench:'flat'},
    inc:{h:[190,170],t:225,th:95,sh:2,bench:'inc'}, kneel:{h:[150,162],t:180,th:0,sh:-90,bench:'kneel'},
    hang:{h:[150,150],t:180,th:6,sh:-28}, floor:{h:[112,210],t:180,th:90,sh:82,bench:'floor'}
  };
  const ST_PRIM = JSON.parse(JSON.stringify(ST));
  const ST_RIG = JSON.parse(JSON.stringify(ST)); ST_RIG.seat.h = [120, 165]; ST_RIG.lie.h = [215, 172]; ST_RIG.kneel.h = [150, 168];
  function rigMode(on) { UA = on ? 35 : 36; FA = on ? 34 : 38; /* nel 3D il punto 'mano' e' l'attrezzo stretto nel pugno: gomito->pugno = 34 (polso a 28.5 + 5.5 dentro la mano) */ TH = on ? 46 : 52; SH = on ? 48 : 52; const src = on ? ST_RIG : ST_PRIM; Object.keys(src).forEach(k => { ST[k].h = src[k].h.slice(); }); }
  const KEYS = ['t','th','sh','tl','lift','ft','hd','ua','fa','ab'];
  const resolve = (ex, fr) => { const r = Object.assign({tl:58, lift:0, ft:0, hd:0, ab:0}, ST[ex.st], fr[2] || {}, {ua:fr[0], fa:fr[1]}); if (ex.st === 'inc' && ex.inc && !(fr[2] && fr[2].t !== undefined)) r.t = 270 - ex.inc; return r; };   // ex.inc = inclinazione della panca in gradi dall'orizzontale: il busto la segue
  const lerp = (a, b, k) => { const r = {h:[a.h[0]+(b.h[0]-a.h[0])*k, a.h[1]+(b.h[1]-a.h[1])*k]}; KEYS.forEach(n => r[n] = (a[n]??0) + ((b[n]??0)-(a[n]??0))*k); r.k = k; return r; };
  function ik(h, t, l1, l2) {
    let dx = t[0]-h[0], dy = t[1]-h[1], d0 = Math.hypot(dx, dy), d = Math.min(d0, l1+l2-0.5);
    const a = (l1*l1 - l2*l2 + d*d)/(2*d), hh = Math.sqrt(Math.max(0, l1*l1 - a*a)), ux = dx/d0, uy = dy/d0;
    const c1 = [h[0]+a*ux-hh*uy, h[1]+a*uy+hh*ux], c2 = [h[0]+a*ux+hh*uy, h[1]+a*uy-hh*ux];
    return c1[1] > c2[1] ? c1 : c2;
  }

  /* ---- costruzione primitive (coordinate "px" 2D + profondità z) ---- */
  const SK = '#d9a27e', SKF = '#b98560', TOP = '#1d2742', SHO = '#2c3658', SHOE = '#f4f6fa', HAIR = '#2b1f19', STEEL = '#8b96ac', BLK = '#1b2030', TW = '#8f9ab1';
  const cyl = (a, b, r, col, rx, rz) => ({k:'c', a, b, rx: rx ?? r, rz: rz ?? r, rr: 1, col});
  const seg = (a, b, r0, r1, col, zs) => ({k:'c', a, b, rx: r0, rz: r0 * (zs || 1), rr: r1 / r0, col});
  const sph = (p, r, col) => ({k:'s', p, r, col});
  const lerp3 = (a, b, t) => [a[0] + (b[0]-a[0])*t, a[1] + (b[1]-a[1])*t, (a[2]||0) + ((b[2]||0)-(a[2]||0))*t];
  const ell = (a, b, t, rw, rl, col) => { const c = lerp3(a, b, t), d = [b[0]-a[0], b[1]-a[1], (b[2]||0)-(a[2]||0)]; return {k:'e', a: c, b: [c[0]+d[0], c[1]+d[1], c[2]+d[2]], rw, rl, col}; };
  const box = (a, b, th, dp, col) => ({k:'b', a, b, th, dp, col});
  const pt3 = (p, z) => [p[0], p[1], z];

  function arm(P, S, E, W, col, handCol) {
    P.push(seg(S, E, 6.2, 4.9, col), seg(E, W, 4.9, 3.5, col), sph(E, 4.9, col), sph(S, 7.2, col));
    P.push(ell(S, E, .38, 6.9, 15, col), ell(E, W, .28, 5.4, 15, col), sph(W, 4.3, handCol || col));
  }
  function leg(P, H, K, A, F, col, shortsCol, z) {
    const zz = Array.isArray(z) ? z : [z, z, z, z], h = pt3(H, zz[0]), k = pt3(K, zz[1]), a = pt3(A, zz[2]), f = pt3(F, zz[3]);
    P.push(seg(h, k, 10.2, 6.6, col), sph(k, 6.5, col), seg(k, a, 6.5, 4.3, col), ell(h, k, .38, 10.6, 22, col), ell(k, a, .3, 6.6, 18, col));
    P.push(seg(h, lerp3(h, k, .55), 11, 9, shortsCol), sph(h, 10.4, shortsCol));
    P.push(seg(a, f, 5.4, 4.8, SHOE), sph(f, 4.8, SHOE), sph(a, 5.2, SHOE));
  }

  /* ---- vettori 3D, IK del braccio con gomito che si apre di lato ---- */
  const vs = (a, b) => [a[0]-b[0], a[1]-b[1], a[2]-b[2]], va = (a, b) => [a[0]+b[0], a[1]+b[1], a[2]+b[2]], vm = (a, k) => [a[0]*k, a[1]*k, a[2]*k];
  const vl = a => Math.hypot(a[0], a[1], a[2]), vn = a => { const l = vl(a) || 1; return [a[0]/l, a[1]/l, a[2]/l]; };
  const vd = (a, b) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2], vc = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
  // memoria del gomito per lato: il polo dell'IK viene miscelato con la posizione precedente, così il gomito non "salta" di lato
  let EL = {};
  const ikReset = () => { EL = {}; };
  function ik3(S, W, l1, l2, pole, key, hint) {   // hint: gomito 2D già coerente; usato quando la mano passa vicinissima alla spalla (direzione S->W instabile)
    const dv = vs(W, S); let d = vl(dv); const dc = Math.min(d, l1 + l2 - .5), u = d > 1e-6 ? vn(dv) : [0, -1, 0];
    const a = (l1*l1 - l2*l2 + dc*dc) / (2*dc), h = Math.sqrt(Math.max(0, l1*l1 - a*a));
    let pv = vs(pole, vm(u, vd(pole, u))); const pl = vl(pv); pv = pl > 1e-6 ? vm(pv, 1 / pl) : [0, -1, 0];
    if (key && EL[key]) { const pe = vs(EL[key], S), pp = vs(pe, vm(u, vd(pe, u))), ppl = vl(pp); if (ppl > 1e-3) { const mix = va(pv, vm(pp, 1.4 / ppl)); const ml = vl(mix); if (ml > 1e-6) pv = vm(mix, 1 / ml); } }
    const Ei = va(va(S, vm(u, a)), vm(pv, h)); let E = Ei;
    if (hint && d < 30) { const w = Math.min(1, (30 - d) / 16); E = va(vm(Ei, 1 - w), vm(hint, w)); }
    if (key) EL[key] = Ei;   // la memoria segue la soluzione IK pura, cosi' il suggerimento non la perturba
    return E;
  }

  /* ---- muscoli in rosso con fibre ---- */
  const MUS = '#e11d2e', FIB = '#ff9aa2';
  const musOf = ex => {
    const t = (ex.m + ' ' + ex.n).toLowerCase(), r = [];
    const has = (...k) => k.some(x => t.includes(x));
    if (has('pettoral', 'petto')) r.push('pecs');
    if (has('deltoid', 'spalle', 'cuffia')) r.push('delts');
    if (has('bicipit', 'brachiale')) r.push('biceps');
    if (has('tricip')) r.push('triceps');
    if (has('avambracc', 'flessori', 'estensori', 'brachioradiale')) r.push('forearms');
    if (has('dorsal', 'romboid')) r.push('lats');
    if (has('trapez')) r.push('traps');
    if (has('erettori', 'lombar')) r.push('lowerback');
    if (has('addominal', 'retto dell', 'core', 'obliqui')) r.push('abs');
    if (has('obliqui')) r.push('obliques');
    if (has('quadric')) r.push('quads');
    if (has('femoral')) r.push('hams');
    if (has('glute', 'gluteo')) r.push('glutes');
    if (has('polpacc', 'gastrocn')) r.push('calves');
    if (has('adduttori')) r.push('quads');
    return [...new Set(r)];
  };
  const mpatch = (P, c, axis, rw, rl) => P.push({k:'e', a:c, b:va(c, axis), rw, rl, col:MUS, m:1});
  const fib = (P, a, b, r) => P.push({k:'c', a, b, rx: r || .85, rz: r || .85, rr: 1, col:FIB, m:2});
  function limbMus(P, a, b, fwd, off, rw, rl, t0, nf) {
    t0 = t0 ?? .5; nf = nf || 3;
    const ax = vn(vs(b, a)), c0 = va(a, vm(vs(b, a), t0)), c = va(c0, vm(fwd, off));
    mpatch(P, c, ax, rw, rl);
    const lat = vn(vc(ax, fwd));
    for (let i = 0; i < nf; i++) {
      const o = (i - (nf - 1) / 2) * (rw * 1.15 / Math.max(nf - 1, 1));
      const base = va(c0, vm(fwd, off + rw * .92));
      fib(P, va(va(base, vm(ax, -rl * .86)), vm(lat, o)), va(va(base, vm(ax, rl * .86)), vm(lat, o * .5)));
    }
  }
  function torsoMus(P, m, F) {       // F: {H,S,fwd,lat,z}
    const tv = vs(F.S, F.H), tn = vn(tv), L = t => va(F.H, vm(tv, t)), fw = F.fwd, bk = vm(fw, -1), z = F.lat;
    const sides = [1, -1];
    if (m.includes('pecs')) sides.forEach(sg => {
      mpatch(P, va(va(L(.77), vm(fw, 10)), vm(z, sg * 11)), z, 10.5, 8.5);
      for (let i = 0; i < 4; i++) fib(P, va(va(L(.70 + .05 * i), vm(fw, 13.2)), vm(z, sg * 2)), va(va(F.S, vm(tn, -i * 3.2)), va(vm(fw, 8.5), vm(z, sg * 20))));
    });
    if (m.includes('lats')) sides.forEach(sg => {
      mpatch(P, va(va(L(.52), vm(bk, 9)), vm(z, sg * 12)), tn, 7.5, 17);
      for (let i = 0; i < 4; i++) fib(P, va(va(L(.16 + .03 * i), vm(bk, 12)), vm(z, sg * 3)), va(va(L(.78 + .03 * i), vm(bk, 9.5)), vm(z, sg * (15 + i))));
    });
    if (m.includes('traps')) {
      mpatch(P, va(L(.95), vm(bk, 7)), z, 6.5, 19);
      sides.forEach(sg => { for (let i = 0; i < 3; i++) fib(P, va(va(L(1.04), vm(bk, 6.5)), vm(z, sg * 2)), va(va(L(.85 - i * .06), vm(bk, 8.5)), vm(z, sg * 18))); });
    }
    if (m.includes('abs')) {
      mpatch(P, va(L(.3), vm(fw, 10)), tn, 8.5, 15);
      [-5, 0, 5].forEach(o => fib(P, va(va(L(.14), vm(fw, 12)), vm(z, o)), va(va(L(.46), vm(fw, 12)), vm(z, o))));
    }
    if (m.includes('obliques')) sides.forEach(sg => { mpatch(P, va(va(L(.36), vm(fw, 4)), vm(z, sg * 14)), tn, 6, 13); for (let i = 0; i < 3; i++) fib(P, va(va(L(.22 + .06 * i), vm(fw, 4)), vm(z, sg * 17)), va(va(L(.42 + .06 * i), vm(fw, 4)), vm(z, sg * 11))); });
    if (m.includes('lowerback')) sides.forEach(sg => { mpatch(P, va(va(L(.22), vm(bk, 8)), vm(z, sg * 5)), tn, 5, 12); [-1.5, 1.5].forEach(o => fib(P, va(va(L(.1), vm(bk, 11)), vm(z, sg * 5 + o)), va(va(L(.36), vm(bk, 11)), vm(z, sg * 5 + o)))); });
    if (m.includes('glutes')) sides.forEach(sg => {
      const c = va(va(F.H, vm(bk, 8)), vm(z, sg * 8.5)); P.push({k:'s', p:c, r:10.5, col:MUS, m:1});
      for (let i = 0; i < 3; i++) fib(P, va(va(F.H, vm(bk, 12 - i)), va(vm(z, sg * 2), vm(tn, -2 + i * 3))), va(va(F.H, vm(bk, 10)), va(vm(z, sg * 14), vm(tn, -8 + i * 2))));
    });
    if (m.includes('delts')) sides.forEach(sg => {
      const c = va(F.S, vm(z, sg * (F.dz || 17))); P.push({k:'s', p:c, r:8.8, col:MUS, m:1});
      for (let i = 0; i < 3; i++) fib(P, va(c, va(vm(tn, 7), vm(z, (i - 1) * 3))), va(c, va(vm(tn, -8), vm(z, (i - 1) * 3.5))));
    });
  }
  function limbsMus(P, m, arms, legs) {   // arms/legs: [{a,b,c?, fwd}]
    arms.forEach(A => {
      if (m.includes('biceps')) limbMus(P, A.S, A.E, A.fwd, 5.4, 5.8, 14.5);
      if (m.includes('triceps')) limbMus(P, A.S, A.E, vm(A.fwd, -1), 5.4, 5.8, 14.5);
      if (m.includes('forearms')) limbMus(P, A.E, A.W, A.ffwd || A.fwd, 4, 4.5, 14, .35);
    });
    legs.forEach(Lg => {
      if (m.includes('quads')) limbMus(P, Lg.H, Lg.K, Lg.fwd, 6, 9.4, 21);
      if (m.includes('hams')) limbMus(P, Lg.H, Lg.K, vm(Lg.fwd, -1), 6, 9.4, 21);
      if (m.includes('calves')) limbMus(P, Lg.K, Lg.A, vm(Lg.sfwd || Lg.fwd, -1), 4.4, 6.3, 15, .3);
    });
  }

  function benchPrims(P, ex) {
    const st = ex.benchSt || ST[ex.st].bench, h = ST[ex.st].h, c = '#8792a9', pad = '#4f5973', D = 40;
    const padBox = (a, b) => { P.push(box(a, b, 9, D, pad)); };
    if (st === 'ht') { padBox(pt3([56,190],0), pt3([140,190],0)); P.push(cyl(pt3([68,195],-12), pt3([68,FLOOR],-12), 2.5, c), cyl(pt3([128,195],12), pt3([128,FLOOR],12), 2.5, c)); }
    else if (st === 'seat') { padBox(pt3([h[0]-26,h[1]+10],0), pt3([h[0]+46,h[1]+10],0)); padBox(pt3([h[0]-14,h[1]+8],0), pt3([h[0]-14,h[1]-74],0)); P.push(cyl(pt3([h[0]+8,h[1]+15],0), pt3([h[0]+8,FLOOR],0), 3, c)); }
    else if (st === 'flat') { padBox(pt3([100,h[1]+11],0), pt3([250,h[1]+11],0)); P.push(cyl(pt3([120,h[1]+16],-12), pt3([120,FLOOR],-12), 2.5, c), cyl(pt3([230,h[1]+16],12), pt3([230,FLOOR],12), 2.5, c)); }
    else if (st === 'inc') { const a = [h[0]-4, h[1]+10]; padBox(pt3(a,0), pt3(add(a,88,270 - (ex.inc || 45)),0)); padBox(pt3([h[0]-20,h[1]+12],0), pt3([h[0]+44,h[1]+12],0)); P.push(cyl(pt3([h[0]+10,h[1]+17],0), pt3([h[0]+10,FLOOR],0), 3, c)); }
    else if (st === 'floor') { P.push(box(pt3([50,FLOOR-2],0), pt3([230,FLOOR-2],0), 4, 46, '#2a7fb8'), box(pt3([218,FLOOR-34],0), pt3([218,FLOOR],0), 5, 46, pad)); }
    else if (st === 'kneel') { P.push(box(pt3([60,FLOOR-2],0), pt3([200,FLOOR-2],0), 4, 46, '#2a7fb8')); }
    if (ex.bench === 'bulg') { padBox(pt3([36,188],0), pt3([90,188],0)); P.push(cyl(pt3([48,193],-12), pt3([48,FLOOR],-12), 2.5, c), cyl(pt3([80,193],12), pt3([80,FLOOR],12), 2.5, c)); }
  }

  /* torre del cavo ai lati del corpo (z), cavo dalla mano alla puleggia: non attraversa mai il corpo */
  function cableTo(P, from, an, tz) {
    const t = pt3(an, tz);
    P.push(cyl(pt3([an[0], 4], tz), pt3([an[0], FLOOR], tz), 3.4, TW));
    P.push(box(pt3([an[0] - 9, FLOOR - 62], tz - 14), pt3([an[0] + 9, FLOOR - 62], tz - 14), 110, 20, '#8a95ad'));
    P.push(sph(t, 6.5, '#b5bfd2'));
    P.push(cyl(from, t, 1.2, STEEL));
    P.push(cyl([from[0], from[1], from[2] - 4], [from[0], from[1], from[2] + 4], 2.6, BLK));
  }
  const sideZ = (z, one) => z >= 0 ? 62 : -62;

  const W3 = p => new THREE.Vector3((p[0] - 150) / 100, (FLOOR - p[1]) / 100, (p[2] || 0) / 100);
  const Wv = (x, y, z) => new THREE.Vector3(x, y, z);
  function bendFront(S, E, Wr, fb) {   // lato verso cui si piega l'avambraccio (= lato del bicipite); a braccio quasi teso sfuma verso fb senza scatti
    const u = E.clone().sub(S).normalize(), w = Wr.clone().sub(S), perp = w.sub(u.clone().multiplyScalar(w.dot(u)));
    const L = perp.length(), k = Math.max(0, Math.min(1, (L - .02) / .06));
    let f2 = fb.clone().sub(u.clone().multiplyScalar(fb.dot(u))); if (f2.lengthSq() < 1e-8) f2 = new THREE.Vector3(0, 0, 1); f2.normalize();
    if (k <= 0) return f2; const pn = perp.clone().normalize(); if (f2.dot(pn) < 0) f2.negate();
    const out = pn.multiplyScalar(k).add(f2.multiplyScalar(1 - k)); return out.lengthSq() < 1e-8 ? pn : out.normalize();
  }
  const fw2 = a => { const d = dir(a); return [d[0], -d[1], 0]; };
  const tzSide = (an, sg) => an[1] < 60 ? 0 : 80 * sg;
  const ankleOf = q => [q.h[0] + TH * Math.sin(q.th * R) + SH * Math.sin(q.sh * R), q.h[1] + TH * Math.cos(q.th * R) + SH * Math.cos(q.sh * R)];
  function anchorFeet(ex, p, rig) {
    if (!rig || !['stand', 'hinge'].includes(ex.st) || ex.legs || ex.cp === 'ankle') return p;
    const a0 = ankleOf(resolve(ex, ex.fr[0])), a1 = ankleOf(p);
    return Object.assign({}, p, {h: [p.h[0] + (a0[0] - a1[0]), p.h[1] + (a0[1] - a1[1])]});
  }
  // bilanciere su binari (Smith) o stacco/squat ben eseguiti: la barra sale e scende in verticale. Con i piedi fermi, il busto si inclina quanto serve per tenere le mani sulla stessa verticale della partenza
  function verticalBar(ex, p, rig) {
    if (!rig || !ex.vbar || (ex.lin && ex.vref === undefined)) return p;
    const p0 = anchorFeet(ex, resolve(ex, ex.fr[ex.vref || 0]), rig), H0 = [p0.h[0], p0.h[1] - p0.lift], S0 = add(H0, p0.tl, p0.t), W0 = add(add(S0, UA, p0.ua), FA, p0.fa);
    const H = [p.h[0], p.h[1] - p.lift], armX = UA * Math.sin(p.ua * R) + FA * Math.sin(p.fa * R), v = Math.max(-1, Math.min(1, (W0[0] - armX - H[0]) / p.tl));
    let t = 180 - Math.asin(v) / R;   // sin(t) = v: t < 180 inclina avanti, t > 180 indietro
    t = Math.max(p.t - 45, Math.min(p.t + 45, t));
    return Object.assign({}, p, {t});
  }
  function geoSide(ex, p, rig) {
    p = verticalBar(ex, anchorFeet(ex, p, rig), rig);
    const P = [], B = rig ? [] : P, ZN = rig ? 25 : 17, ZF = -ZN, LN = rig ? 14 : 11, LF = -LN;
    const H = [p.h[0], p.h[1] - p.lift], S = add(H, p.tl, p.t), head = add(S, 22, p.t);
    const K = add(H, TH, p.th), A = add(K, SH, p.sh), foot = rig ? add(A, 25, p.sh + 90 + p.ft - 16) : add(A, 17, p.sh + 90 + p.ft);
    let E = add(S, UA, p.ua), W = add(E, FA, p.fa);
    let grip = ex.hand ? add(add(E, FA * .84, p.fa), rig ? 6 : 14, p.fa + p.hd) : W;   // polso flesso: l'impugnatura sta poco oltre il polso, nella direzione della mano
    const GZ = ex.gz ?? (rig ? (ex.eq === 'bar' ? 40 : ex.eq === 'hb' ? 30 : 30) : (ex.eq === 'bar' ? 27 : 21)), presses = ['lie', 'inc'].includes(ex.st) || (ex.st === 'seat' && p.ua > 120), latW = ex.lat ?? (presses ? 2.1 : 1.0);
    if (ex.eq === 'hb') { W = [150, 20]; E = ik(S, W, UA, FA); grip = W; }
    const pe = vn([E[0] - S[0], E[1] - S[1], 0]);
    let E3n, W3n, E3f, W3f, g3n, g3f;
    if (ex.eq === 'barh') { E = ik(S, H, UA, FA); W = H; grip = H; E3n = pt3(E, ZN); W3n = pt3(W, ZN); E3f = pt3(E, ZF); W3f = pt3(W, ZF); g3n = pt3(grip, ZN); g3f = pt3(grip, ZF); }
    else {
      W3n = [W[0], W[1], GZ]; E3n = ik3(pt3(S, ZN), W3n, UA, FA, [pe[0], pe[1], latW], 'n', pt3(E, ZN + 6 * latW)); g3n = [grip[0], grip[1], GZ];
      if (ex.one) { const Ef = add(S, UA, 5), Wf = add(Ef, FA, 5); E3f = pt3(Ef, ZF); W3f = pt3(Wf, ZF); g3f = g3n; }
      else { W3f = [W[0], W[1], -GZ]; E3f = ik3(pt3(S, ZF), W3f, UA, FA, [pe[0], pe[1], -latW], 'f', pt3(E, ZF - 6 * latW)); g3f = [grip[0], grip[1], -GZ]; }
    }
    benchPrims(P, ex);
    // gamba lontana
    let K2, A2, f2;
    const fl = rig ? (a => add(a, 25, 74)) : (a => add(a, 17, 90));
    if (ex.rl) { K2 = ik(H, ex.rl, TH, SH); A2 = ex.rl; f2 = fl(A2); }
    else if (ex.sup) { K2 = add(H, TH, 0); A2 = add(K2, SH, 0); f2 = fl(A2); }
    else { K2 = K; A2 = A; f2 = foot; }
    const amt0 = Math.min(1, Math.abs(p.th) / 80), kz0 = (ex.ko || 0) * amt0;
    leg(B, H, K2, A2, f2, SKF, '#1f2742', (ex.rl || ex.sup) ? LF : [LF, LF - kz0, LF - kz0 * .6, LF - kz0 * 1.25]);
    // braccio lontano
    arm(B, pt3(S, ZF), E3f, W3f, SKF);
    // tronco: bacino (pantaloncini), addome e torace (canotta), collo, testa, capelli
    const mid = lerp3(pt3(H, 0), pt3(S, 0), .5);
    B.push(seg(pt3(H, 0), mid, 10.5, 10.8, SHO, 1.75));
    B.push(seg(mid, pt3(S, 0), 11, 12.4, TOP, 1.62));
    B.push(ell(pt3(H, 0), pt3(S, 0), .78, 13, 11, TOP));
    B.push(seg(pt3(S, ZF - 1), pt3(S, ZN + 1), 7.4, 7.4, TOP));
    B.push(seg(pt3(S, 0), pt3(head, 0), 5.2, 4.6, SK));
    B.push(sph(pt3([head[0] + 1.5, head[1] + 1.5], 0), 10.6, SK));
    B.push(sph(pt3([head[0] - 2.6, head[1] - 2.8], 0), 11.6, HAIR));
    // gamba vicina e braccio vicino
    const amt = Math.min(1, Math.abs(p.th) / 80), kz = (ex.ko || 0) * amt;
    leg(B, H, K, A, foot, SK, SHO, [LN, LN + kz, LN + kz * .6, LN + kz * 1.25]);
    arm(B, pt3(S, ZN), E3n, W3n, SK);
    if (ex.hand) B.push(seg(W3n, g3n, 3.6, 3.2, SK));
    // attrezzi
    const g1 = g3n, g2 = ex.one ? g3n : g3f;
    if (ex.eq === 'cable' && ex.an) {
      const an = Array.isArray(ex.an[0]) ? ex.an[0] : ex.an;
      if (ex.cp === 'ankle') { cableTo(P, pt3(A, LN), an, tzSide(an, 1)); P.push(cyl(pt3(A, LN - 4), pt3(A, LN + 4), 6.6, BLK)); }
      else if (ex.one) cableTo(P, g1, an, tzSide(an, 1));
      else { cableTo(P, g1, an, tzSide(an, 1)); cableTo(P, g2, an, tzSide(an, -1)); P.push(cyl(g1, g2, 1.4, BLK)); }
    } else if (ex.eq === 'jam' && ex.an) {
      const pv = pt3(ex.an, 0);
      [ZN, ex.one ? null : ZF].forEach(z => { if (z === null) return; P.push(cyl(pt3(ex.an, z * 1.6), pt3(grip, z), 3.6, TW), sph(pt3(ex.an, z * 1.6), 6.5, '#8d99b3')); });
      P.push(cyl(pt3(ex.an, -40), pt3(ex.an, 40), 2.6, TW));
      P.push(cyl(pt3(grip, ZN - 6), pt3(grip, ZN + 6), 8.5, BLK), cyl(pt3(grip, ZN - 7), pt3(grip, ZN - 5), 9.4, '#6b7693'));
    } else if (ex.eq === 'bar' || ex.eq === 'barh') {
      const gw = Math.max(GZ, rig ? 40 : 27); P.push(cyl(pt3(grip, -gw - 26), pt3(grip, gw + 26), 2.4, STEEL));
      [[-gw - 24, -gw - 17], [gw + 17, gw + 24]].forEach(([z0, z1]) => { P.push(cyl(pt3(grip, z0), pt3(grip, z1), 12.5, BLK), cyl(pt3(grip, z0 - .3), pt3(grip, z1 + .3), 4.5, '#5b6580')); });
      if (ex.sm) { // Smith machine: due binari verticali, la barra scorre su carrelli
        const rx = grip[0], zs = [-gw - 34, gw + 34];
        zs.forEach(z => { P.push(cyl(pt3([rx, FLOOR], z), pt3([rx, FLOOR - 285], z), 3.4, TW), cyl(pt3([rx - 7, FLOOR], z), pt3([rx + 7, FLOOR], z), 5, BLK), cyl(pt3(grip, z > 0 ? gw + 26 : -gw - 26), pt3(grip, z), 3, TW), cyl(pt3([rx, grip[1] - 7], z), pt3([rx, grip[1] + 7], z), 6, BLK)); });
        P.push(cyl(pt3([rx, FLOOR - 285], zs[0]), pt3([rx, FLOOR - 285], zs[1]), 3.4, TW));
      }
    } else if (ex.eq === 'db') {
      const zs = ex.one ? [ZN] : [ZN, ZF];
      zs.forEach(zz => { const z = zz === ZN ? GZ : -GZ; P.push(cyl(pt3(grip, z - 9), pt3(grip, z + 9), 2.2, STEEL), cyl(pt3(grip, z - 11), pt3(grip, z - 5), 7.4, BLK), cyl(pt3(grip, z + 5), pt3(grip, z + 11), 7.4, BLK)); });
    } else if (ex.eq === 'hb') {
      P.push(cyl(pt3([150, 20], -62), pt3([150, 20], 62), 3, STEEL), cyl(pt3([150, 20], -62), pt3([150, FLOOR], -62), 4, TW), cyl(pt3([150, 20], 62), pt3([150, FLOOR], 62), 4, TW));
    } else if (ex.eq === 'pad') {
      P.push(cyl(pt3(A, LN - 14), pt3(A, LN + 14), 6.5, BLK));
    }
    const tilt = Math.abs((((p.t % 360) + 360) % 360) - 180);
    if (rig && !window.FIG3_ICON && tilt > 5 && tilt < 80) {   // guida: verticale + asse del busto + arco dell'angolo, accanto al corpo
      const GZ2 = 48, ORG = '#ff6b35'; P.push(cyl(pt3(H, GZ2), pt3(add(H, 78, 180), GZ2), .8, ORG));
      P.push(cyl(pt3(H, GZ2), pt3(add(H, 78, p.t), GZ2), 1.1, ORG));
      let prev = add(H, 54, 180); for (let i = 1; i <= 10; i++) { const a = 180 + (p.t - 180) * i / 10, pt = add(H, 54, a); P.push(cyl(pt3(prev, GZ2), pt3(pt, GZ2), .8, ORG)); prev = pt; }
      P.tilt = Math.round(tilt);
    }
    P.tiltAll = Math.round(tilt); P.st = ex.st;
    P.gp = ex.cp === 'ankle' ? pt3(A, LN) : (ex.one ? g3n : [g3n[0], g3n[1], 0]);
    if (rig) {
      const fT = Wv(...fw2(p.t - 90)), up = W3(pt3(S, 0)).sub(W3(pt3(H, 0))).normalize(), fwd = a => Wv(...fw2(a + 90));
      const fS = (Sx, Ex, Wx, fb) => bendFront(W3(Sx), W3(Ex), W3(Wx), fb);
      const aimF = (a, b) => { const d = W3(b).sub(W3(a)).normalize(); return Wv(-d.y, d.x, 0); };
      const thF = Wv(...fw2(p.th + 90)), shF = Wv(...fw2(p.sh + 90)), up0 = Wv(0, 1, 0);
      const sFar = ex.one ? 5 : p.ua, fFar = ex.one ? 5 : p.fa;
      const J = {H: W3(pt3(H, 0)), S: W3(pt3(S, 0)), up, front: fT,
        sh: {R: W3(pt3(S, ZN)), L: W3(pt3(S, ZF))}, el: {R: W3(E3n), L: W3(E3f)}, wr: {R: W3(W3n), L: W3(W3f)},
        armF: {R: fS(pt3(S, ZN), E3n, W3n, fwd(p.ua)), L: fS(pt3(S, ZF), E3f, W3f, fwd(sFar))},
        presa: ex.presa,
        hip: {R: W3(pt3(H, LN)), L: W3(pt3(H, LF))}, kn: {R: W3(pt3(K, LN + kz)), L: W3(pt3(K2, (ex.rl || ex.sup) ? LF : LF - kz0))}, an: {R: W3(pt3(A, LN + kz * .6)), L: W3(pt3(A2, (ex.rl || ex.sup) ? LF : LF - kz0 * .6))},
        toe: {R: W3(pt3(foot, LN + kz * 1.25)), L: W3(pt3(f2, (ex.rl || ex.sup) ? LF : LF - kz0 * 1.25))}, legF: {R: thF, L: (ex.rl || ex.sup) ? Wv(1, 0, 0) : thF}, legFL: {R: shF, L: (ex.rl || ex.sup) ? Wv(1, 0, 0) : shF},
        footUp: {R: aimF(A, foot), L: aimF(A2, f2)}};
      const holds = ['bar', 'db', 'jam', 'hb'].includes(ex.eq) || (ex.eq === 'cable' && ex.cp !== 'ankle');
      if (holds) { J.obj = {R: W3(g3n)}; if (!ex.one) J.obj.L = W3(g3f); }
      if (ex.hand) J.tip = {R: W3(g3n), L: W3(g3f)};   // polso flesso/esteso: la mano punta verso l'impugnatura
      P.J = J;
    }
    if (p.showM && !rig) {
      const m = musOf(ex), fwT = [...dir(p.t - 90), 0], fwD = th => [...dir(th + 90), 0];
      torsoMus(P, m, {H: pt3(H, 0), S: pt3(S, 0), fwd: fwT, lat: [0, 0, 1], dz: ZN});
      limbsMus(P, m,
        [{S: pt3(S, ZN), E: E3n, W: W3n, fwd: fwD(p.ua), ffwd: fwD(p.fa)}, {S: pt3(S, ZF), E: E3f, W: W3f, fwd: fwD(ex.one ? 5 : p.ua), ffwd: fwD(ex.one ? 5 : p.fa)}],
        [{H: pt3(H, LN), K: pt3(K, LN), A: pt3(A, LN), fwd: fwD(p.th), sfwd: fwD(p.sh)}, {H: pt3(H, LF), K: pt3(K2, LF), A: pt3(A2, LF), fwd: fwD(ex.rl || ex.sup ? 0 : p.th), sfwd: fwD(ex.rl || ex.sup ? 0 : p.sh)}]);
    }
    return P;
  }

  function geoFront(ex, p, rig) {
    const P = [], B = rig ? [] : P, seatF = ex.st === 'seat', sy = seatF ? (rig ? 107 : 114) : 62, hy = sy + 58, cx = 150, SW = rig ? 25 : 27, HW = rig ? 14 : 10;
    const Ls = [cx - SW, sy + 4], Rs = [cx + SW, sy + 4];
    const armF = (S, sg, ua, fa) => { const E = [S[0] + sg*UA*Math.sin(ua*R), S[1] + UA*Math.cos(ua*R)]; return {E, W: [E[0] + sg*FA*Math.sin(fa*R), E[1] + FA*Math.cos(fa*R)]}; };
    const rA = armF(Rs, 1, p.ua, p.fa), lA = ex.one ? armF(Ls, -1, 5, 5) : armF(Ls, -1, p.ua, p.fa);
    // ex.hs = {a, b, r}: la mano si muove su un arco di sfera attorno alla spalla (direzione a -> b, vettori relativi alla spalla destra, x>0 = verso l'esterno), quindi il gomito resta sempre alla stessa flessione
    const hsp = ex.hs && rig && p.k !== undefined ? (() => { const n = v => { const l = Math.hypot(...v); return v.map(c => c / l); }, a = n(ex.hs.a), b = n(ex.hs.b), k = p.k, dt = Math.max(-1, Math.min(1, a[0]*b[0] + a[1]*b[1] + a[2]*b[2])), om = Math.acos(dt), so = Math.sin(om) || 1;
      const w0 = Math.sin((1 - k) * om) / so, w1 = Math.sin(k * om) / so, d = [0, 1, 2].map(i => w0 * a[i] + w1 * b[i]), r = ex.hs.r || 71;
      const hp = (S, sg) => [S[0] + sg * r * d[0], S[1] + r * d[1], r * d[2]]; return {R: hp(Rs, 1), L: hp(Ls, -1)}; })() : null;
    if (hsp) { rA.W = [hsp.R[0], hsp.R[1]]; if (!ex.one) lA.W = [hsp.L[0], hsp.L[1]]; }
    // ex.he = {a, b}: il gomito resta fermo (angolo ua) e la mano percorre un arco attorno al gomito, con profondita' (x>0 esterno, y giu', z avanti)
    const hep = ex.he && rig && p.k !== undefined ? (() => { const n = v => { const l = Math.hypot(...v); return v.map(c => c / l); }, a = n(ex.he.a), b = n(ex.he.b), k = p.k, dt = Math.max(-1, Math.min(1, a[0]*b[0] + a[1]*b[1] + a[2]*b[2])), om = Math.acos(dt), so = Math.sin(om) || 1;
      const w0 = Math.sin((1 - k) * om) / so, w1 = Math.sin(k * om) / so, d = [0, 1, 2].map(i => w0 * a[i] + w1 * b[i]);
      const hp = (A, sg) => ({E: [A.E[0], A.E[1], 0], W: [A.E[0] + sg * FA * d[0], A.E[1] + FA * d[1], FA * d[2]]}); return {R: hp(rA, 1), L: hp(lA, -1)}; })() : null;
    // mani con profondità reale (croci, alzate posteriori, upright row, lat): il gomito si piega con IK 3D e le mani passano DAVANTI al corpo
    const hz = ex.hz || [0, 0];
    const hand3 = (A, S, sg) => {
      const xh = Math.abs(A.W[0] - cx), t = Math.max(0, Math.min(1, (SW + 12 - xh) / (SW + 12))), z = hsp ? hsp.R[2] : hz[0] + hz[1] * t;
      const Wp = [A.W[0], A.W[1], z]; return {E: ik3([S[0], S[1], 0], Wp, UA, FA, [sg, .55, -.25], 'F' + sg, [A.E[0], A.E[1], z * .5 - 6]), W: Wp};
    };
    const R3 = hep ? hep.R : (ex.hz || hsp) && rig ? hand3(rA, Rs, 1) : {E: [rA.E[0], rA.E[1], 0], W: [rA.W[0], rA.W[1], 0]};
    const L3 = ex.one ? {E: [lA.E[0], lA.E[1], 0], W: [lA.W[0], lA.W[1], 0]} : hep ? hep.L : ((ex.hz || hsp) && rig ? hand3(lA, Ls, -1) : {E: [lA.E[0], lA.E[1], 0], W: [lA.W[0], lA.W[1], 0]});
    let rAnk = [cx + 14, hy + 104];
    const frontLeg = (hip, knee, ank, toe, col) => { leg(P, hip, knee, ank, toe, col, SHO, 0); };
    if (seatF) {
      P.push(box(pt3([cx - 46, hy + 7], 0), pt3([cx + 46, hy + 7], 0), 9, 44, '#232b42'));
      P.push(cyl(pt3([cx - 30, hy + 12], 0), pt3([cx - 30, FLOOR], 0), 3, '#3b4668'), cyl(pt3([cx + 30, hy + 12], 0), pt3([cx + 30, FLOOR], 0), 3, '#3b4668'));
      leg(B, [cx - 14, hy, 0], [cx - 18, hy + 14, 26], [cx - 26, FLOOR - 2, 40], [cx - 26, FLOOR - 2, 56], SK, SHO, 0);
      leg(B, [cx + 14, hy, 0], [cx + 18, hy + 14, 26], [cx + 26, FLOOR - 2, 40], [cx + 26, FLOOR - 2, 56], SK, SHO, 0);
      rAnk = [cx + 26, FLOOR - 2];
    } else if (ex.legs) {
      const hip = [cx + 10, hy], a = add(hip, rig ? 94 : 104, p.ab), km = [(hip[0] + a[0]) / 2, (hip[1] + a[1]) / 2];
      const lz = -(ex.lb || 0) * Math.min(1, Math.abs(p.ab) / 35);
      leg(B, [cx - 10, hy, 0], [cx - 12, hy + 52, 0], [cx - 14, FLOOR - 2, 0], [cx - 14, FLOOR - 2, 17], SK, SHO, 0);
      leg(B, [hip[0], hip[1], 0], [km[0], km[1], lz * .45], [a[0], a[1], lz], [a[0], a[1], lz + 17], SK, SHO, 0); rAnk = [a[0], a[1], lz];
    } else {
      leg(B, [cx - 10, hy, 0], [cx - 18, hy + 52, 0], [cx - 26, FLOOR - 2, 0], [cx - 26, FLOOR - 2, 17], SK, SHO, 0);
      leg(B, [cx + 10, hy, 0], [cx + 18, hy + 52, 0], [cx + 26, FLOOR - 2, 0], [cx + 26, FLOOR - 2, 17], SK, SHO, 0);
    }
    const hc = [cx, hy, 0], sc = [cx, sy + 2, 0], md = lerp3(hc, sc, .5);
    B.push(seg(hc, md, 15, 14, SHO, .62));
    B.push(seg(md, sc, 14.5, 22, TOP, .58));
    B.push(seg([cx - 25, sy + 3, 0], [cx + 25, sy + 3, 0], 8.6, 8.6, TOP));
    B.push(seg(sc, [cx, sy - 8, 0], 5.4, 4.8, SK));
    B.push(sph([cx, sy - 21, 1], 10.8, SK), sph([cx, sy - 24, -2.5], 11.7, HAIR));
    arm(B, [Ls[0], Ls[1], 0], [lA.E[0], lA.E[1], 0], [lA.W[0], lA.W[1], 0], ex.one ? SKF : SK);
    arm(B, [Rs[0], Rs[1], 0], [rA.E[0], rA.E[1], 0], [rA.W[0], rA.W[1], 0], SK);
    const an = ex.an || [], wr = R3.W, wl = L3.W;
    if (ex.bar) {
      P.push(cyl(wl, wr, 2.8, STEEL)); const m = [(wl[0] + wr[0]) / 2, (wl[1] + wr[1]) / 2, (wl[2] + wr[2]) / 2]; cableTo(P, m, an[0], 78);
      if (seatF) { P.push(cyl([cx - 34, hy - 8, 20], [cx + 34, hy - 8, 20], 7.5, BLK)); P.push(cyl([cx - 30, hy - 8, 20], [cx - 30, hy + 7, 4], 2.5, TW), cyl([cx + 30, hy - 8, 20], [cx + 30, hy + 7, 4], 2.5, TW)); }
    } else if (ex.eq === 'cable') {
      const rg = ex.cp === 'ankle' ? (rAnk.length > 2 ? rAnk : pt3(rAnk, 0)) : wr;
      if (an.length === 1) cableTo(P, rg, an[0], ex.tzf ?? (Math.abs(an[0][0] - 150) < 40 ? 78 : 0));
      else if (ex.cross) { cableTo(P, wr, an[0], ex.tzf ?? 0); cableTo(P, wl, an[1], ex.tzf ?? 0); }
      else { cableTo(P, wl, an[0], 0); cableTo(P, wr, an[1], 0); }
    }
    P.gp = ex.cp === 'ankle' ? (rAnk.length > 2 ? rAnk : pt3(rAnk, 0)) : (ex.bar ? [(wl[0] + wr[0]) / 2, (wl[1] + wr[1]) / 2, (wl[2] + wr[2]) / 2] : wr);
    if (!ex.one && !ex.bar && ex.cp !== 'ankle') P.gp2 = wl;
    if (rig) {
      const Fz = Wv(0, 0, 1), up0 = Wv(0, 1, 0), p3 = (x, y, z) => W3([x, y, z || 0]);
      const fa = (S, E, Wr) => bendFront(p3(...S), p3(...E), p3(...Wr), Fz);
      const toe = (a, dz) => p3(a[0], a[1] + 7, (a[2] || 0) + dz);
      let hipL, hipR, knL, knR, anL, anR, tL, tR;
      hipL = [cx + HW, hy, 0]; hipR = [cx - HW, hy, 0];
      if (seatF) { knL = [cx + 18, hy, 46]; knR = [cx - 18, hy, 46]; anL = [cx + 22, hy + SH, 46]; anR = [cx - 22, hy + SH, 46]; }
      else if (ex.legs) { const lz2 = -(ex.lb || 0) * Math.min(1, Math.abs(p.ab) / 35); anL = add(hipL, TH + SH, p.ab).concat(lz2); knL = [(hipL[0] + anL[0]) / 2, (hipL[1] + anL[1]) / 2, lz2 * .45]; knR = [cx - 19, hy + TH, 0]; anR = [cx - 26, hy + TH + SH, 0]; }
      else { knL = [cx + 19, hy + TH, 0]; knR = [cx - 19, hy + TH, 0]; anL = [cx + 26, hy + TH + SH, 0]; anR = [cx - 26, hy + TH + SH, 0]; }
      if (!anL[2] && anL[2] !== 0) anL[2] = 0;
      const J = {H: p3(cx, hy, 0), S: p3(cx, sy + 4, 0), up: up0, front: Fz,
        sh: {L: p3(Rs[0], Rs[1], 0), R: p3(Ls[0], Ls[1], 0)}, el: {L: p3(...R3.E), R: p3(...L3.E)}, wr: {L: p3(...R3.W), R: p3(...L3.W)},
        armF: {L: fa([Rs[0], Rs[1], 0], R3.E, R3.W), R: fa([Ls[0], Ls[1], 0], L3.E, L3.W)},
        presa: ex.presa,
        hip: {L: p3(...hipL), R: p3(...hipR)}, kn: {L: p3(...knL), R: p3(...knR)}, an: {L: p3(...anL), R: p3(...anR)},
        toe: {L: toe(anL, 25), R: toe(anR, 25)}, legF: {L: Fz, R: Fz}, footUp: {L: up0, R: up0}};
      if (seatF) { J.legF = {L: Wv(0, 1, 0), R: Wv(0, 1, 0)}; }
      if (['bar', 'db', 'jam'].includes(ex.eq) || ex.bar || (ex.eq === 'cable' && ex.cp !== 'ankle')) { J.obj = {L: p3(...R3.W)}; if (!ex.one) J.obj.R = p3(...L3.W); }
      P.J = J;
    }
    if (p.showM && !rig) {
      const m = musOf(ex), F = [0, 0, 1], Z = v => [v[0], v[1], 0];
      torsoMus(P, m, {H: [cx, hy, 0], S: [cx, sy + 2, 0], fwd: F, lat: [1, 0, 0], dz: 26});
      limbsMus(P, m,
        [{S: [Rs[0], Rs[1], 0], E: [rA.E[0], rA.E[1], 0], W: [rA.W[0], rA.W[1], 0], fwd: F}, {S: [Ls[0], Ls[1], 0], E: [lA.E[0], lA.E[1], 0], W: [lA.W[0], lA.W[1], 0], fwd: F}],
        [{H: [cx + 10, hy, 0], K: [cx + 18, hy + 52, 0], A: [cx + 26, FLOOR - 2, 0], fwd: F}, {H: [cx - 10, hy, 0], K: [cx - 18, hy + 52, 0], A: [cx - 26, FLOOR - 2, 0], fwd: F}]);
    }
    return P;
  }
  const geo = (ex, p, rig) => ex.v === 'f' ? geoFront(ex, p, rig) : geoSide(ex, p, rig);

  /* ---- rendering three.js ---- */
  let active = null;
  const S3 = 100;
  function destroy(o) {
    if (!o) return; o.dead = true; cancelAnimationFrame(o.raf);
    try { if (o.rig) o.rig.dispose(); o.renderer.dispose(); o.renderer.forceContextLoss(); } catch (e) {}
  }
  const mats = {};
  const matM = () => new THREE.MeshStandardMaterial({color: 0xd6121f, emissive: 0xff1030, emissiveIntensity: .55, roughness: .5, transparent: true, opacity: .6, depthWrite: false});
  const mat = col => mats[col] || (mats[col] = new THREE.MeshStandardMaterial({color: col, roughness: .55, metalness: .08}));

  function mount(el, ex, fallback) {
    ikReset();
    if (!window.THREE) return fallback(el, ex);
    destroy(active);
    let renderer;
    try {
      const cv = document.createElement('canvas');
      renderer = new THREE.WebGLRenderer({canvas: cv, antialias: true, alpha: true});
    } catch (e) { return fallback(el, ex); }
    el.innerHTML = '<div class="stage"><span class="hint3d">trascina per ruotare</span></div><div class="figcap"></div><div class="figbtns"><button data-k="0">1 Partenza</button><button data-k="1">2 Arrivo</button><button data-k="a" class="on">▶ Animazione</button></div><div class="figbtns"><button data-k="m" class="on mbtn">● Muscoli in rosso</button><button data-k="t" class="on tbtn">↗ Traiettoria</button></div><div class="figbtns views"><button data-w="s" class="on">Di lato</button><button data-w="f">Di fronte</button><button data-w="q">3/4</button><button data-w="r">⟳ Ruota</button></div><div class="legend3d"></div>';
    const stage = el.querySelector('.stage'); stage.prepend(renderer.domElement);
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 1, .1, 50);
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8f9ab3, .85));
    const dl = new THREE.DirectionalLight(0xffffff, .95); dl.position.set(2.2, 4.5, 3.2); dl.castShadow = true; dl.shadow.mapSize.set(1024, 1024);
    Object.assign(dl.shadow.camera, {left: -2.6, right: 2.6, top: 3, bottom: -2, near: .5, far: 14}); dl.shadow.bias = -.0008; scene.add(dl);
    const dl2 = new THREE.DirectionalLight(0xbcd0ff, .4); dl2.position.set(-3, 2, -2); scene.add(dl2);
    const floor = new THREE.Mesh(new THREE.CircleGeometry(2.0, 64), new THREE.MeshStandardMaterial({color: 0xe9edf5, roughness: .95}));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -.005; floor.receiveShadow = true; scene.add(floor);
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.97, 2.0, 64), new THREE.MeshBasicMaterial({color: 0xff6b35})); ring.rotation.x = -Math.PI / 2; scene.add(ring);
    const mM = matM(), mF = new THREE.MeshBasicMaterial({color: 0xff9aa2, transparent: true, opacity: .95});
    const cylG = {}; const gCylR = rr => { const k = Math.round(rr * 20); return cylG[k] || (cylG[k] = new THREE.CylinderGeometry(k / 20, 1, 1, 16)); };
    const gSph = new THREE.SphereGeometry(1, 16, 12), gBox = new THREE.BoxGeometry(1, 1, 1);
    const group = new THREE.Group(); scene.add(group); const pool = [];
    let pose = null, rigInst = null;
    const trail = new THREE.Group(); scene.add(trail);
    if (window.FIG3_ICON) { floor.visible = false; ring.visible = false; trail.visible = false; }
    const tMat = new THREE.MeshBasicMaterial({color: 0x22c7ff, depthTest: false, transparent: true, opacity: .95}), sMat = new THREE.MeshBasicMaterial({color: 0x22c55e, depthTest: false}), eMat = new THREE.MeshBasicMaterial({color: 0xff6b35, depthTest: false});
    function buildTrail() {
      while (trail.children.length) trail.remove(trail.children[0]);
      const N = 28, lines = [[], []];
      for (let i = 0; i <= N; i++) {
        const k = i / N, pp = lerp(pose[0], pose[1], k); pp.showM = false; if (ex.lin && o.lw) linearize(pp, k);
        const P = geo(ex, pp, !!rigInst); if (P.gp) lines[0].push(P.gp); if (P.gp2) lines[1].push(P.gp2);
      }
      if (lines[0].length > 1) { const p0 = V(lines[0][0]), pl = new THREE.Mesh(gCylR(1), new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: .75, depthTest: false})); pl.position.set(p0.x, 1.1, p0.z); pl.scale.set(.55 / S3, 2.4, .55 / S3); pl.renderOrder = 18; trail.add(pl); }
      ikReset(); o.lastUa = undefined;   // la memoria del gomito non deve passare dalla traiettoria al primo fotogramma
      lines.forEach(L => { if (L.length < 2) return;
        for (let i = 0; i < L.length; i++) { const m = new THREE.Mesh(gSph, i === 0 ? sMat : i === L.length - 1 ? eMat : tMat); m.position.copy(V(L[i])); m.scale.setScalar((i === 0 || i === L.length - 1 ? 3.4 : 1.7) / S3 * 1.0); m.renderOrder = 20; trail.add(m); }
        for (let i = 0; i < L.length - 1; i++) { const a = V(L[i]), b = V(L[i + 1]), d = b.clone().sub(a), len = d.length(); if (len < 1e-4) continue; const c = new THREE.Mesh(gCylR(1), tMat); c.position.copy(a).add(b).multiplyScalar(.5); c.quaternion.setFromUnitVectors(up, d.normalize()); c.scale.set(.9 / S3, len, .9 / S3); c.renderOrder = 20; trail.add(c); }
      });
    }
    // traiettoria della mano in linea retta (panca, military...): la posizione del polso si interpola in linea
    // e le braccia si adattano con un IK piano, così il bilanciere non disegna un arco
    const sOf = p => ex.v === 'f' ? [175, (ex.st === 'seat' ? 107 : 62) + 4] : add([p.h[0], p.h[1] - p.lift], p.tl, p.t);
    const handOf = p => { const S = sOf(p), E = add(S, UA, p.ua); return {S, E, W: add(E, FA, p.fa)}; };
    function linearize(pp, k) {
      const S = sOf(pp), W0 = o.lw[0].W, W1 = o.lw[1].W, Wt = [W0[0] + (W1[0] - W0[0]) * k, W0[1] + (W1[1] - W0[1]) * k];
      const dx = Wt[0] - S[0], dy = Wt[1] - S[1]; let d = Math.min(Math.hypot(dx, dy), UA + FA - .5); d = Math.max(d, Math.abs(UA - FA) + .5);
      const base = Math.atan2(dx, dy) / R, cosA = Math.max(-1, Math.min(1, (UA * UA + d * d - FA * FA) / (2 * UA * d))), A = Math.acos(cosA) / R;
      const Er = o.lastUa === undefined ? add(S, UA, pp.ua) : add(S, UA, o.lastUa), ea = add(S, UA, base + A), eb = add(S, UA, base - A);   // il gomito resta sul ramo del fotogramma precedente: niente salti
      const ua = Math.hypot(ea[0] - Er[0], ea[1] - Er[1]) <= Math.hypot(eb[0] - Er[0], eb[1] - Er[1]) ? base + A : base - A, E = add(S, UA, ua);
      o.lastUa = ua; pp.ua = ua; pp.fa = Math.atan2(Wt[0] - E[0], Wt[1] - E[1]) / R;
    }
    const cap = el.querySelector('.figcap'), btns = el.querySelectorAll('.figbtns button[data-k]:not([data-k=m]):not([data-k=t])'), mb = el.querySelector('.mbtn'), tb = el.querySelector('.tbtn'), vbtn = el.querySelectorAll('.views button'), leg = el.querySelector('.legend3d');
    const legTxt = 'In rosso i muscoli che lavorano: ' + ex.m + '. Linea azzurra: percorso della mano, della barra o del piede (verde = partenza, arancione = arrivo). Linea bianca: verticale di riferimento, per capire se il movimento è dritto, in diagonale o ad arco.';
    leg.textContent = legTxt;
    const o = {el, renderer, showM: true, hold: null, t0: performance.now(), az: 0, el2: .22, drag: false, idle: 0, dead: false, lastW: 0};
    active = o;
    const V = (p) => new THREE.Vector3((p[0] - 150) / S3, (FLOOR - p[1]) / S3, (p[2] || 0) / S3);
    const up = new THREE.Vector3(0, 1, 0), q = new THREE.Quaternion(), d = new THREE.Vector3();
    function place(i, pr) {
      let m = pool[i];
      const type = pr.k;
      if (m && type === 'c') { const g = gCylR(pr.rr); if (m.geometry !== g) m.geometry = g; }
      if (!m || m.userData.k !== type) {
        if (m) group.remove(m);
        m = new THREE.Mesh(type === 'c' ? gCylR(pr.rr) : (type === 's' || type === 'e') ? gSph : gBox, mat(pr.col)); m.userData.k = type; m.castShadow = true; group.add(m); pool[i] = m;
      }
      m.material = pr.m === 1 ? mM : pr.m === 2 ? mF : mat(pr.col);
      if (pr.k === 'c') {
        const a = V(pr.a), b = V(pr.b); d.subVectors(b, a); const len = Math.max(d.length(), 1e-4);
        m.position.copy(a).add(b).multiplyScalar(.5); q.setFromUnitVectors(up, d.normalize()); m.quaternion.copy(q); m.scale.set(pr.rx / S3, len, pr.rz / S3);
      } else if (pr.k === 'e') {
        const a = V(pr.a), b = V(pr.b); d.subVectors(b, a); m.position.copy(a); q.setFromUnitVectors(up, d.normalize()); m.quaternion.copy(q); m.scale.set(pr.rw / S3, pr.rl / S3, pr.rw / S3);
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
    mb.onclick = () => { o.showM = !o.showM; mb.classList.toggle('on', o.showM); lastK = -1; };
    tb.onclick = () => { trail.visible = !trail.visible; tb.classList.toggle('on', trail.visible); };
    function frame(t) {
      if (o.dead) return;
      o.raf = requestAnimationFrame(frame);
      if (!el.isConnected) { destroy(o); return; }
      if (el.offsetParent === null) return;
      resize();
      let k;
      if (o.hold !== null) k = o.hold;
      else { const ph = ((t - o.t0) / 1000) % 4.6; k = ph < .5 ? 0 : ph < 1.9 ? (ph - .5) / 1.4 : ph < 2.4 ? 1 : 1 - (ph - 2.4) / 2.2; k = k*k*(3-2*k); }
      if (k !== lastK) {
        if (lastK >= 0 && Math.abs(k - lastK) > .25) { ikReset(); o.lastUa = undefined; }   // salto (pulsanti Partenza/Arrivo): si riparte da una soluzione pulita
        lastK = k; const pp = lerp(pose[0], pose[1], k); pp.showM = o.showM; if (ex.lin && o.lw) linearize(pp, k); const prims = geo(ex, pp, !!rigInst); prims.forEach((pr, i) => place(i, pr));
        if (rigInst && prims.J) {
          rigInst.pose(prims.J);
          const act = {}; if (o.showM) musOf(ex).forEach(g => { act[g] = .35 + .65 * k; }); rigInst.setMuscles(act);
        }
        while (pool.length > prims.length) group.remove(pool.pop());
        const PR = {pro: 'prona (palmi in giù / in avanti, pollici verso l’interno)', sup: 'supina (palmi in su / verso di te, pollici verso l’esterno)', neu: 'neutra (palmi che si guardano)'}[ex.presa];
        const back = ['lie', 'inc'].includes(ex.st) ? 'schiena appoggiata alla panca' : (prims.tiltAll > 5 ? 'busto inclinato di circa ' + prims.tiltAll + '° dalla verticale, schiena dritta (neutra)' : 'busto verticale, schiena dritta');
        cap.innerHTML = '<b>' + esc3(k < .5 ? ex.cap[0] : ex.cap[1]) + '</b><br>' + (PR ? 'Presa ' + esc3(PR) + ' · ' : '') + esc3(back);
      }
      if (!rigInst) { mM.opacity = .28 + .34 * k; mM.emissiveIntensity = .35 + .5 * k; }
      if (o.spin && !o.drag) o.az += .006;
      const r = o.ct[2], cx = o.ct[0], cy = o.ct[1]; cam.position.set(cx + Math.sin(o.az) * Math.cos(o.el2) * r, cy + .05 + Math.sin(o.el2) * r * .6, Math.cos(o.az) * Math.cos(o.el2) * r);
      cam.lookAt(cx, cy, 0); renderer.render(scene, cam);
    }
    const CT = {lie:[.42,.4,4.1], inc:[.3,.65,4.0], kneel:[.05,.78,4.0], hang:[0,1.05,4.5], seat:[.05,.85,4.0]}[ex.st] || [0,1.0,4.3];
    const over = ex.fr.some(f => f[0] > 125);
    o.ct = over ? [CT[0], CT[1] + .3, CT[2] * 1.3] : CT;
    const towerFront = ex.v === 'f' && (ex.bar || (ex.an && ex.an.length === 1 && Math.abs(ex.an[0][0] - 150) < 40));
    o.base = ex.az ?? (ex.v === 'f' ? (towerFront ? .9 : 0) : (ex.eq === 'hb' ? .95 : 0));
    const sideAz = ex.v === 'f' ? 1.5708 : 0, frontAz = ex.v === 'f' ? 0 : 1.5708;
    o.spin = false;
    vbtn.forEach(b => b.onclick = () => { vbtn.forEach(x => x.classList.remove('on')); b.classList.add('on'); const w = b.dataset.w; o.spin = w === 'r'; if (w === 's') o.az = o.tgt = sideAz; else if (w === 'f') o.az = o.tgt = frontAz; else if (w === 'q') o.az = o.tgt = (sideAz + frontAz) / 2 + (ex.v === 'f' ? 0 : .15); o.el2 = .22; o.idle = performance.now(); });
    o.az = o.base;
    cap.textContent = 'Carico il modello 3D…';
    (async () => {
      if (typeof RIG !== 'undefined' && THREE.GLTFLoader) { try { rigInst = await RIG.create(); } catch (e) { rigInst = null; } }
      if (o.dead) { if (rigInst) rigInst.dispose(); return; }
      rigMode(!!rigInst); pose = [resolve(ex, ex.fr[0]), resolve(ex, ex.fr[1])]; if (ex.lin) o.lw = pose.map(handOf);
      buildTrail();
      if (rigInst) { scene.add(rigInst.root); rigInst.meshes.forEach(m => { m.castShadow = true; }); o.rig = rigInst; }
      o.raf = requestAnimationFrame(frame);
    })();
    return o;
  }
  // analisi della traiettoria della mano (px): scostamento massimo dalla retta / lunghezza della retta
  function path(ex) {
    rigMode(true); ikReset();
    const pose = [resolve(ex, ex.fr[0]), resolve(ex, ex.fr[1])], pts = [];
    const sOf = p => add([p.h[0], p.h[1] - p.lift], p.tl, p.t);
    const hand = p => { const S = sOf(p), E = add(S, UA, p.ua); return add(E, FA, p.fa); };
    const W0 = hand(pose[0]), W1 = hand(pose[1]);
    for (let i = 0; i <= 10; i++) { const k = i / 10; pts.push(ex.lin ? [W0[0] + (W1[0] - W0[0]) * k, W0[1] + (W1[1] - W0[1]) * k] : hand(lerp(pose[0], pose[1], k))); }
    const ch = Math.hypot(W1[0] - W0[0], W1[1] - W0[1]); let dev = 0;
    pts.forEach(p => { const d = Math.abs((W1[0] - W0[0]) * (W0[1] - p[1]) - (W0[0] - p[0]) * (W1[1] - W0[1])) / (ch || 1); dev = Math.max(dev, d); });
    return {chord: ch, dev, ratio: ch ? dev / ch : 0, W0, W1};
  }
  // controllo geometrico: il cavo attraversa il corpo?
  function cableCheck(ex) {
    rigMode(true); ikReset();
    const pose = [resolve(ex, ex.fr[0]), resolve(ex, ex.fr[1])], hits = [];
    const toPx = v => [v.x * 100 + 150, 222 - v.y * 100, v.z * 100];
    const dseg = (p, a, b) => { const ab = vs(b, a), ap = vs(p, a), t = Math.max(0, Math.min(1, vd(ap, ab) / (vd(ab, ab) || 1))); return vl(vs(ap, vm(ab, t))); };
    for (let i = 0; i <= 10; i++) {
      const k = i / 10, pp = lerp(pose[0], pose[1], k); pp.showM = false;
      const P = geo(ex, pp, true), J = P.J; if (!J) continue;
      const H = toPx(J.H), S = toPx(J.S), up = vs(S, H);
      const caps = [['torso', H, S, 14], ['testa', va(S, vm(up, .3)), va(S, vm(up, .55)), 11]];
      ['L', 'R'].forEach(sd => caps.push(['braccio' + sd, toPx(J.sh[sd]), toPx(J.el[sd]), 6], ['gamba' + sd, toPx(J.hip[sd]), toPx(J.kn[sd]), 9], ['stinco' + sd, toPx(J.kn[sd]), toPx(J.an[sd]), 6.5]));
      P.filter(p => p.k === 'c' && p.rx === 1.2 && p.col === STEEL).forEach(c => {
        const L = vl(vs(c.b, c.a)); let worst = null;
        for (let t = 0; t <= 1; t += .04) {
          if (t * L < 16) continue; const pt = va(c.a, vm(vs(c.b, c.a), t));
          caps.forEach(cp => { const dd = dseg(pt, cp[1], cp[2]) - cp[3]; if (dd < -1 && (!worst || dd < worst.d)) worst = {part: cp[0], d: Math.round(dd)}; });
        }
        if (worst) hits.push({k, part: worst.part, pen: -worst.d});
      });
    }
    return hits;
  }
  // angoli (gradi) di una posa, per il confronto con i video: busto da verticale, spalla, gomito, anca, ginocchio
  const wrap = a => ((a + 540) % 360) - 180;
  function feat(ex) {
    rigMode(true);
    return [0, 1].map(i => {
      const p = resolve(ex, ex.fr[i]);
      return {lean: Math.abs(wrap(p.t - 180)), S: Math.abs(wrap(p.ua - (p.t + 180))), E: 180 - Math.abs(wrap(p.fa - p.ua)), H: Math.abs(wrap(p.th - p.t)), K: 180 - Math.abs(wrap(p.sh - p.th)),
        sgn: {t: Math.sign(wrap(p.t - 180)) || 1, S: Math.sign(wrap(p.ua - (p.t + 180))) || 1, E: Math.sign(wrap(p.fa - p.ua)) || 1, H: Math.sign(wrap(p.th - p.t)) || 1, K: Math.sign(wrap(p.sh - p.th)) || 1}};
    });
  }
  return {mount, path, cableCheck, feat};
})();
