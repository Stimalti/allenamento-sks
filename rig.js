/* Corpo 3D anatomico (modello "Male base muscular anatomy" di Harshit Prajapati, CC-BY 4.0,
   https://sketchfab.com/3d-models/male-base-muscular-anatomy-0954aa04666d45aab9633009318f7b66)
   Il modello non ha scheletro: lo costruiamo qui (ossa + pesi di skinning per distanza) e lo pilotiamo
   con le posizioni delle articolazioni calcolate da figure3d.js. I muscoli in rosso sono zone calcolate
   sulla forma del corpo, con intensità animata. */
const RIG = (() => {
  const K = 0.1107; // unità mesh -> unità mondo (px/100)
  const LM = {P0:[0,-7.3,-0.3], Pm:[0,-5.1,-0.35], N:[0,-2.0,-0.5], HB:[0,-1.0,-0.3], HT:[0,1.4,-0.1],
    S:[2.3,-2.6,-0.2], E:[5.4,-2.5,-0.05], W:[8.0,-2.45,0.1], F:[9.95,-2.55,0.1],
    H:[1.3,-7.3,-0.3], Kn:[1.75,-11.25,0.12], A:[2.3,-15.4,-0.05], T:[2.4,-16.0,2.25]};
  const mir = p => [-p[0], p[1], p[2]];
  // nome, da, a, lato (+1 = sinistra anatomica = x+), raggio, vettore "davanti" a riposo
  // dita: catena di punti (mesh, mano sinistra) MCP -> falangi -> punta; indice, medio, anulare, mignolo, pollice
  const FY = -2.55, fp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, FY, a[1] + (b[1] - a[1]) * t];
  const FING = [['fi', [8.6, .52], [9.82, .70]], ['fm', [8.6, .27], [9.97, .25]], ['fr', [8.6, -.02], [9.82, -.15]], ['fp', [8.55, -.27], [9.5, -.5]]]
    .map(([n, a, b]) => ({n, th: 0, q: [fp(a, b, 0), fp(a, b, .45), fp(a, b, .75), fp(a, b, 1)], A: [0, .45, .75].map(t => t * Math.hypot(b[0] - a[0], b[1] - a[1]))}));
  FING.push({n: 'ft', th: 1, q: [[8.15, FY, .72], [8.55, FY, .9], [8.93, FY, 1.1]], A: [0, Math.hypot(.4, .18)]});
  const DEF = [['pelvis', LM.P0, LM.Pm, 0, 1.6], ['chest', LM.Pm, LM.N, 0, 2.2], ['neck', LM.N, LM.HB, 0, .6], ['head', LM.HB, LM.HT, 0, 1.0]];
  [[1, 'L', x => x], [-1, 'R', mir]].forEach(([sd, s, f]) => {
    FING.forEach(F => F.q.forEach((q, k) => { if (k < F.q.length - 1) DEF.push([F.n + s + k, f(q), f(F.q[k + 1]), sd, .13]); }));
    DEF.push(['clav' + s, LM.N, f(LM.S), sd, .5], ['armU' + s, f(LM.S), f(LM.E), sd, .8], ['armF' + s, f(LM.E), f(LM.W), sd, .55], ['hand' + s, f(LM.W), f(LM.F), sd, .35],
      ['legU' + s, f(LM.H), f(LM.Kn), sd, 1.1], ['legL' + s, f(LM.Kn), f(LM.A), sd, .8], ['foot' + s, f(LM.A), f(LM.T), sd, .5]);
  });
  const NB = DEF.length, IDX = {}; DEF.forEach((d, i) => IDX[d[0]] = i);

  const sm = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  function segDist(p, a, b) {
    const ab = [b[0]-a[0], b[1]-a[1], b[2]-a[2]], ap = [p[0]-a[0], p[1]-a[1], p[2]-a[2]];
    const L2 = ab[0]*ab[0] + ab[1]*ab[1] + ab[2]*ab[2]; let t = (ap[0]*ab[0] + ap[1]*ab[1] + ap[2]*ab[2]) / L2; t = Math.max(0, Math.min(1, t));
    return Math.hypot(ap[0] - ab[0]*t, ap[1] - ab[1]*t, ap[2] - ab[2]*t);
  }

  // gruppi muscolari -> 16 canali (4 attributi vec4)
  const GROUPS = ['pecs', 'abs', 'obliques', 'delts', 'biceps', 'triceps', 'forearms', 'traps', 'lats', 'lowerback', 'glutes', 'quads', 'hams', 'calves', 'adductors', 'x'];
  function muscleMask(x, y, z, nx, ny, nz) {
    const ax = Math.abs(x), front = sm(0.05, 0.45, nz), back = sm(0.05, 0.45, -nz), m = new Array(16).fill(0);
    const band = (v, a0, a1, e) => sm(a0 - e, a0 + e, v) * (1 - sm(a1 - e, a1 + e, v));
    m[0] = front * band(y, -4.35, -2.35, .25) * (1 - sm(2.9, 3.3, ax)) * sm(0.05, .35, ax);          // pettorali
    m[1] = front * band(y, -7.0, -4.3, .3) * (1 - sm(1.6, 2.1, ax));                                   // addominali
    m[2] = band(y, -6.9, -4.0, .3) * sm(1.5, 2.0, ax) * (1 - sm(3.0, 3.6, ax)) * (1 - front * .6);   // obliqui
    m[3] = Math.max(0, 1 - Math.hypot(ax - 2.7, y + 2.55, z + .1) / 1.75) * (ax < 4.4 ? 1 : 0);      // deltoidi
    const arm = ax > 3.0 && y > -3.6 && y < -1.6;
    m[4] = arm ? sm(3.2, 3.8, ax) * (1 - sm(5.0, 5.6, ax)) * front : 0;                              // bicipiti
    m[5] = arm ? sm(3.2, 3.8, ax) * (1 - sm(5.0, 5.6, ax)) * back : 0;                               // tricipiti
    m[6] = arm ? sm(5.3, 5.9, ax) * (1 - sm(7.6, 8.1, ax)) : 0;                                      // avambracci
    m[7] = band(y, -3.0, -0.9, .25) * back * (1 - sm(3.2, 3.8, ax)) + (ax > 2.2 && ax < 3.4 && y > -2.5 && y < -1.6 ? sm(0.1, 0.5, ny) * .8 : 0); // trapezi
    m[8] = back * band(y, -6.2, -3.0, .3) * sm(0.6, 1.2, ax) * (1 - sm(3.3, 3.8, ax)) * (1 - m[7]);  // dorsali
    m[9] = back * band(y, -7.4, -5.2, .3) * (1 - sm(1.7, 2.2, ax));                                  // lombari
    m[10] = back * band(y, -8.9, -6.6, .3) * (1 - sm(2.9, 3.3, ax));                                 // glutei
    const leg = y < -7.4 && y > -11.3 && ax < 3.0;
    m[11] = leg ? front * sm(7.4, 8.2, -y) * (1 - sm(10.9, 11.4, -y)) : 0;                         // quadricipiti
    m[12] = leg ? back * sm(8.4, 9.1, -y) * (1 - sm(10.9, 11.4, -y)) : 0;                          // femorali
    m[13] = y < -11.5 && y > -15.2 && ax < 3.3 ? back * sm(11.5, 12.2, -y) * (1 - sm(14.4, 15.1, -y)) : 0; // polpacci
    m[14] = leg ? sm(0.15, 0.6, -Math.sign(x) * nx * -1) * (ax < 1.6 ? 1 : 0) * (1 - front) : 0;     // adduttori
    return m;
  }

  let cache = null;
  function parseModel(buf) {
    return new Promise((res, rej) => new THREE.GLTFLoader().parse(buf, '', g => res(g), rej));
  }
  async function loadBuffer() {
    if (window.BODY_B64) { const s = atob(window.BODY_B64), u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u.buffer; }
    const r = await fetch('body.glb?v=1'); if (!r.ok) throw new Error('body.glb'); return r.arrayBuffer();
  }
  function ready() {
    if (cache) return cache;
    cache = (async () => {
      if (!window.THREE || !THREE.GLTFLoader) throw new Error('three');
      const gltf = await parseModel(await loadBuffer());
      gltf.scene.updateMatrixWorld(true);
      const parts = [];
      gltf.scene.traverse(m => { if (m.isMesh) { const g = m.geometry.clone(); g.applyMatrix4(m.matrixWorld); g.scale(100, 100, 100); parts.push({name: m.name, g, mat: m.material}); } });
      const body = parts.find(p => p.name.startsWith('body'));
      const pos = body.g.attributes.position, nor = body.g.attributes.normal, n = pos.count;
      // pesi per distanza dalle ossa
      const si = new Uint16Array(n * 4), sw = new Float32Array(n * 4), mu = [0, 1, 2, 3].map(() => new Float32Array(n * 4));
      const cand = new Array(NB);
      for (let v = 0; v < n; v++) {
        const p = [pos.getX(v), pos.getY(v), pos.getZ(v)];
        let c = [];
        for (let b = 0; b < NB; b++) {
          const d = DEF[b]; const side = d[3]; let f = 1;
          if (/^f[imrpt][LR]\d/.test(d[0])) continue;
          const name = d[0];
          if (side !== 0 && p[0] * side < -0.35 && !name.startsWith('clav')) continue;
          if (/^arm|^hand/.test(name) && Math.abs(p[0]) < 3.4 && p[1] < -2.6) f *= sm(1.6, 3.2, Math.abs(p[0]));
          const de = Math.max(0, segDist(p, d[1], d[2]) - d[4]);
          c.push([b, f / Math.pow(de + .15, 3)]);
        }
        { let t0 = 0; c.forEach(e => t0 += e[1]); c.forEach(e => e[1] /= t0);
          ['L', 'R'].forEach(s => { const sg = s === 'L' ? 1 : -1, hb = IDX['hand' + s], e = c.find(x => x[0] === hb);
            if (!e || p[0] * sg < 8.1) return;
            const px = p[0] * sg, pz = p[2], fw = [];
            FING.forEach(F => { const qa = F.q, n = qa.length - 1; let best = 1e9, aa = 0;
              for (let k = 0; k < n; k++) { const ax = qa[k + 1][0] - qa[k][0], az = qa[k + 1][2] - qa[k][2], L2 = ax * ax + az * az;
                let t = ((px - qa[k][0]) * ax + (pz - qa[k][2]) * az) / L2, tc = Math.max(0, Math.min(1, t));
                const d = Math.hypot(px - qa[k][0] - ax * tc, pz - qa[k][2] - az * tc); if (d < best) { best = d; aa = F.A[k] + t * Math.sqrt(L2); } }
              const aEnd = aa; fw.push({F, d: best, a: aEnd}); });
            let tw = 0; fw.forEach(o => { o.w = 1 / Math.pow(o.d + .06, 4); tw += o.w; });
            const dmin = Math.min(...fw.map(o => o.d)), gate = (1 - sm(.3, .5, dmin));
            const add = [], kept = [];
            let wh = 0; fw.forEach(o => { const F = o.F, a = o.a, w = o.w / tw, ws = [];
              if (F.th) { const J1 = F.A[1]; const h0 = 1 - sm(-.05, .3, a); ws.push(h0, (1 - h0) * (1 - sm(J1 - .1, J1 + .12, a)), (1 - h0) * sm(J1 - .1, J1 + .12, a)); }
              else { const h0 = 1 - sm(-.25, .12, a), p1 = F.A[1], p2 = F.A[2]; ws.push(h0, (1 - h0) * (1 - sm(p1 - .12, p1 + .12, a)), (1 - h0) * sm(p1 - .12, p1 + .12, a) * (1 - sm(p2 - .1, p2 + .1, a)), (1 - h0) * sm(p2 - .1, p2 + .1, a)); }
              wh += w * ws[0]; for (let k = 1; k < ws.length; k++) add.push([IDX[F.n + s + (k - 1)], w * ws[k]]); });
            const tot0 = e[1], mv = tot0 * gate; e[1] = tot0 - mv * (1 - wh); add.forEach(a2 => c.push([a2[0], a2[1] * mv])); }); }
        c.sort((a, b) => b[1] - a[1]); c = c.slice(0, 4); let tot = 0; c.forEach(e => tot += e[1]);
        for (let k = 0; k < 4; k++) { si[v*4 + k] = c[k] ? c[k][0] : 0; sw[v*4 + k] = c[k] ? c[k][1] / tot : 0; }
        const m = muscleMask(p[0], p[1], p[2], nor.getX(v), nor.getY(v), nor.getZ(v));
        for (let g = 0; g < 16; g++) mu[g >> 2][v*4 + (g & 3)] = Math.max(0, Math.min(1, m[g]));
      }
      body.g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
      body.g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
      mu.forEach((a, i) => body.g.setAttribute('mu' + i, new THREE.BufferAttribute(a, 4)));
      parts.forEach(p => { if (p !== body) { const c = p.g.attributes.position.count, a = new Uint16Array(c * 4), w = new Float32Array(c * 4); for (let i = 0; i < c; i++) { a[i*4] = IDX.head; w[i*4] = 1; } p.g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(a, 4)); p.g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(w, 4)); } });
      return {parts, body};
    })();
    return cache;
  }

  const V3 = (a) => new THREE.Vector3(a[0], a[1], a[2]);
  function basis(aim, front) {
    const y = aim.clone().normalize(); let z = front.clone().sub(y.clone().multiplyScalar(front.dot(y)));
    if (z.lengthSq() < 1e-8) z = Math.abs(y.z) < .9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0), z.sub(y.clone().multiplyScalar(z.dot(y)));
    z.normalize(); const x = new THREE.Vector3().crossVectors(y, z).normalize();
    return new THREE.Matrix4().makeBasis(x, y, z);
  }

  async function create(opts) {
    const {parts, body} = await ready();
    const root = new THREE.Group(), bones = [], inv = [], rest = [];
    const uMu = [0, 1, 2, 3].map(() => new THREE.Vector4());
    DEF.forEach((d, i) => {
      const b = new THREE.Bone(); b.name = d[0]; root.add(b); bones.push(b);
      const a = V3(d[1]), bb = V3(d[2]); const front = d[0].startsWith('foot') ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1);
      const Mr = basis(bb.clone().sub(a), front); const M = Mr.clone().setPosition(a);
      inv.push(M.clone().invert()); rest.push({len: a.distanceTo(bb)});
      b.position.copy(a); b.quaternion.setFromRotationMatrix(Mr);
    });
    const skel = new THREE.Skeleton(bones, inv);
    const bodyMat = new THREE.MeshStandardMaterial({color: opts && opts.color || 0xd9dde6, map: body.mat.map, normalMap: body.mat.normalMap, roughness: .62, metalness: 0});
    bodyMat.skinning = true;
    if (bodyMat.normalMap) bodyMat.normalScale = new THREE.Vector2(1.15, 1.15);
    bodyMat.onBeforeCompile = sh => {
      sh.uniforms.uM0 = {value: uMu[0]}; sh.uniforms.uM1 = {value: uMu[1]}; sh.uniforms.uM2 = {value: uMu[2]}; sh.uniforms.uM3 = {value: uMu[3]};
      sh.vertexShader = 'attribute vec4 mu0;attribute vec4 mu1;attribute vec4 mu2;attribute vec4 mu3;varying vec4 vM0;varying vec4 vM1;varying vec4 vM2;varying vec4 vM3;\n' +
        sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvM0=mu0;vM1=mu1;vM2=mu2;vM3=mu3;');
      sh.fragmentShader = 'uniform vec4 uM0;uniform vec4 uM1;uniform vec4 uM2;uniform vec4 uM3;varying vec4 vM0;varying vec4 vM1;varying vec4 vM2;varying vec4 vM3;\n' +
        sh.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
        float mm = clamp(dot(vM0,uM0)+dot(vM1,uM1)+dot(vM2,uM2)+dot(vM3,uM3),0.0,1.0);
        float lum = dot(diffuseColor.rgb, vec3(0.333));
        vec3 red = vec3(0.80,0.03,0.07) * (0.40 + 0.95 * lum);
        diffuseColor.rgb = mix(diffuseColor.rgb, red, mm * 0.80);
        `).replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance += vec3(0.45,0.0,0.02) * mm * 0.22;`);
    };
    const meshes = [];
    parts.forEach(p => {
      const isBody = p === body; const mat = isBody ? bodyMat : p.mat.clone(); mat.skinning = true;
      const m = new THREE.SkinnedMesh(p.g, mat); m.frustumCulled = false; m.bind(skel, new THREE.Matrix4()); root.add(m); meshes.push(m);
    });
    root.add(skel.bones[0]);
    const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3(), lastSg = {}, lastHf = {}, sgnHf = {};
    const lastZ = {}, sgnZ = {};
    function setBone(name, a, b, front) {
      const i = IDX[name], bn = bones[i];
      tmpA.copy(a); tmpB.copy(b); const dv = tmpB.clone().sub(tmpA), len = Math.max(dv.length(), 1e-5);
      // se il "fronte" e' quasi parallelo all'osso (es. tibia orizzontale), si tiene l'orientamento del fotogramma precedente: niente rotazioni a scatto
      const y = dv.clone().normalize(); let fz = front.clone().addScaledVector(y, -front.dot(y)).multiplyScalar(sgnZ[name] || 1); const L = fz.length();
      if (lastZ[name]) { const pz = lastZ[name].clone().addScaledVector(y, -lastZ[name].dot(y));
        if (pz.lengthSq() > 1e-6) { if (L < .6 && fz.dot(pz) < 0) { sgnZ[name] = -(sgnZ[name] || 1); fz.negate(); }   // attraversando la configurazione degenere il verso si conserva
          const w = Math.min(1, L / .35); fz = pz.normalize().multiplyScalar(1 - w).add(fz.normalize().multiplyScalar(w)); } }
      if (fz.lengthSq() < 1e-8) fz = front.clone();
      const Mt = basis(dv, fz); lastZ[name] = new THREE.Vector3(0, 0, 1).applyMatrix4(Mt).normalize(); const sy = len / rest[i].len, lat = Math.sqrt(K * sy);
      bn.position.copy(a); bn.quaternion.setFromRotationMatrix(Mt); bn.scale.set(lat, sy, lat);
    }
    // J: {H,S,up,front, sh:{L,R}, el, wr(palma), armF, hip, kn, an, toe, legF, footUp}
    function pose(J) {
      const up = J.up, H = J.H, S = J.S, front = J.front;
      const N = S.clone().addScaledVector(up, 0.6 * K), Pm = H.clone().lerp(S, .468), HB = N.clone().addScaledVector(up, 1.0 * K), HT = HB.clone().addScaledVector(up, 2.4 * K);
      setBone('pelvis', H, Pm, front); setBone('chest', Pm, N, front); setBone('neck', N, HB, front); setBone('head', HB, HT, J.headFront || front);
      ['L', 'R'].forEach(s => {
        const sh = J.sh[s], el = J.el[s], wr = J.wr[s], u = wr.clone().sub(el).normalize();
        const wrist = el.clone().lerp(wr, .84); /* wr = centro del pugno (attrezzo); il polso sta 5-6 cm prima */ let tip = wrist.clone().addScaledVector(u, 1.95 * K);
        if (J.tip && J.tip[s]) { const td = J.tip[s].clone().sub(wrist); if (td.lengthSq() > 1e-6) tip = wrist.clone().addScaledVector(td.normalize(), 1.95 * K); }   // flessione del polso (wrist curl / estensioni)
        // presa: la direzione del pollice (asse z dell'osso mano) decide come e' girato il palmo.
        // prona = pollici verso l'interno, supina = pollici verso l'esterno, neutra = palmi che si guardano
        let hf = J.armF[s];
        if (J.presa) { const mid = J.sh.L.clone().add(J.sh.R).multiplyScalar(.5), lat = J.sh[s].clone().sub(mid).normalize();
          if (J.presa === 'pro') hf = lat.clone().negate(); else if (J.presa === 'sup') hf = lat.clone();
          else { const med = lat.clone().negate(); hf = s === 'L' ? med.clone().cross(u) : u.clone().cross(med); }
          hf.addScaledVector(u, -hf.dot(u));
          { // braccio aperto di lato: la direzione laterale coincide con l'avambraccio e non dice piu' nulla -> si sfuma verso "pollice avanti" (palmo in giu'; supina = palmo in su), senza scatti
            const w = Math.min(1, Math.max(0, (hf.length() - .2) / .35)), alt = J.front.clone().multiplyScalar(J.presa === 'sup' ? -1 : 1); alt.addScaledVector(u, -alt.dot(u));
            if (alt.lengthSq() > 1e-6) { alt.normalize(); hf.multiplyScalar(sgnHf[s] || 1); const ref = lastHf[s] || alt; if (w < 1 && hf.dot(ref) < 0) { sgnHf[s] = -(sgnHf[s] || 1); hf.negate(); } if (w < 1 && alt.dot(ref) < 0) alt.negate();   // nella zona ambigua il verso del pollice resta quello del fotogramma precedente (e si conserva anche dopo)
              hf = hf.lengthSq() > 1e-6 ? hf.normalize().multiplyScalar(w).add(alt.multiplyScalar(1 - w)) : alt; } }
          if (hf.lengthSq() < 1e-6) hf = lastHf[s] || J.armF[s]; else hf.normalize(); }
        lastHf[s] = hf.clone();
        if (J.obj && J.obj[s]) { const hd0 = tip.clone().sub(wrist).normalize(), pn0 = (s === 'R' ? hf.clone().cross(hd0) : hd0.clone().cross(hf)).normalize().multiplyScalar(.013); wrist.add(pn0); tip.add(pn0); }   // l'attrezzo sta dentro il pugno, sul lato del palmo
        setBone('clav' + s, N, sh, front); setBone('armU' + s, sh, el, J.armF[s]); setBone('armF' + s, el, wrist, J.presa ? hf : J.armF[s]); setBone('hand' + s, wrist, tip, hf); // l'avambraccio ruota con la presa (prono-supinazione)
        { const hbI = IDX['hand' + s], hb = bones[hbI]; hb.updateMatrix();
          const Mm = hb.matrix.clone().multiply(inv[hbI]), obj = J.obj && J.obj[s], target = obj || J.H;
          const hd = tip.clone().sub(wrist).normalize(), ax = hf.clone().addScaledVector(hd, -hf.dot(hd)).normalize();
          const mapP = q => V3(s === 'L' ? q : [-q[0], q[1], q[2]]).applyMatrix4(Mm);
          const CURL = obj ? {fi: [58, 88, 52], fm: [64, 95, 55], fr: [70, 100, 55], fp: [76, 100, 58], ft: [38, 46]} : {fi: [10, 16, 10], fm: [13, 18, 12], fr: [16, 20, 12], fp: [20, 22, 14], ft: [8, 10]};
          const chain = (F, sg) => { const ang = CURL[F.n], pts = F.q.map(mapP), out = [pts[0]]; let cum = 0, dir = null;
            for (let k = 0; k < pts.length - 1; k++) { const d0 = pts[k + 1].clone().sub(pts[k]), L = d0.length();
              cum += ang[k] * Math.PI / 180 * sg; const d = d0.normalize().applyAxisAngle(ax, cum); out.push(out[k].clone().addScaledVector(d, L)); }
            return out; };
          const mid = FING[1], ps = chain(mid, 1), ms = chain(mid, -1);
          const pn = (s === 'R' ? hf.clone().cross(hd) : hd.clone().cross(hf)).normalize(), b0 = ps[0];   // -pn = lato del palmo: le dita si chiudono sempre verso il palmo, mai verso il dorso
          const sg = ps[3].clone().sub(b0).dot(pn) <= ms[3].clone().sub(b0).dot(pn) ? 1 : -1;
          FING.forEach(F => { const o = chain(F, sg); for (let k = 0; k < o.length - 1; k++) setBone(F.n + s + k, o[k], o[k + 1], hf); }); }
        setBone('legU' + s, J.hip[s], J.kn[s], J.legF[s]); setBone('legL' + s, J.kn[s], J.an[s], (J.legFL || J.legF)[s]); setBone('foot' + s, J.an[s], J.toe[s], J.footUp[s]);
      });
      root.updateMatrixWorld(true);
    }
    function setMuscles(act) { // act: {gruppo: 0..1}
      uMu.forEach(v => v.set(0, 0, 0, 0));
      GROUPS.forEach((g, i) => { if (act && act[g]) uMu[i >> 2].setComponent(i & 3, act[g]); });
    }
    function dispose() { skel.dispose && skel.dispose(); }
    return {root, pose, setMuscles, dispose, meshes, K};
  }
  return {ready, create, GROUPS};
})();
