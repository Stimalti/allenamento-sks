/* Illustrazioni procedurali: figura a segmenti animata tra due pose (partenza -> arrivo).
   Vista laterale (default) o frontale (ex.v === 'f'). Nessuna immagine esterna. */
const FIG = (() => {
  const R = Math.PI / 180, FLOOR = 222;
  const dir = a => [Math.sin(a * R), Math.cos(a * R)];
  const add = (p, l, a) => { const d = dir(a); return [p[0] + l * d[0], p[1] + l * d[1]]; };
  const f1 = n => Math.round(n * 10) / 10;
  const P = p => f1(p[0]) + ',' + f1(p[1]);
  const UA = 36, FA = 38, TH = 52, SH = 52;

  const ST = {
    stand: {h:[150,118], t:180, th:0, sh:0},
    hinge: {h:[130,120], t:115, th:18, sh:-8},
    seat:  {h:[120,172], t:180, th:90, sh:0, bench:'seat'},
    lie:   {h:[215,178], t:-90, th:100, sh:2, bench:'flat'},
    inc:   {h:[190,170], t:225, th:95, sh:2, bench:'inc'},
    kneel: {h:[150,162], t:180, th:0, sh:-90, bench:'kneel'},
    hang:  {h:[150,150], t:180, th:10, sh:-70}
  };
  const KEYS = ['t','th','sh','tl','lift','ft','hd','ua','fa','ab'];

  function resolve(ex, fr) {
    const b = ST[ex.st];
    const o = fr[2] || {};
    const r = Object.assign({tl:58, lift:0, ft:0, hd:0, ab:0}, b, o, {ua:fr[0], fa:fr[1]}); if (ex.st === 'inc' && ex.inc && o.t === undefined) r.t = 270 - ex.inc; return r;
  }
  function lerpPose(a, b, k) {
    const r = {h:[a.h[0] + (b.h[0]-a.h[0])*k, a.h[1] + (b.h[1]-a.h[1])*k]};
    KEYS.forEach(n => r[n] = (a[n] ?? 0) + ((b[n] ?? 0) - (a[n] ?? 0)) * k);
    return r;
  }
  // ginocchio per IK (sceglie la soluzione piu' bassa)
  function ik(h, t, l1, l2) {
    let dx = t[0]-h[0], dy = t[1]-h[1], d = Math.hypot(dx, dy);
    d = Math.min(d, l1 + l2 - 0.5);
    const a = (l1*l1 - l2*l2 + d*d) / (2*d), hh = Math.sqrt(Math.max(0, l1*l1 - a*a));
    const ux = dx / Math.hypot(dx, dy), uy = dy / Math.hypot(dx, dy);
    const c1 = [h[0] + a*ux - hh*uy, h[1] + a*uy + hh*ux], c2 = [h[0] + a*ux + hh*uy, h[1] + a*uy - hh*ux];
    return c1[1] > c2[1] ? c1 : c2;
  }
  const line = (a, b, w, c, o='') => `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${o}/>`;
  const poly = (pts, w, c) => `<polyline points="${pts.map(P).join(' ')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const circ = (p, r, fill, stroke='none', sw=0) => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

  function equip(ex, grip, ankle) {
    let s = '';
    const g = ex.cp === 'ankle' ? ankle : grip;
    if (ex.eq === 'cable' && ex.an) {
      const an = Array.isArray(ex.an[0]) ? ex.an[0] : ex.an;
      s += line([an[0], 8], [an[0], FLOOR], 3, 'var(--tower)') + circ(an, 6, 'var(--bg)', 'var(--cable)', 2);
      s += line(g, an, 2, 'var(--cable)', 'stroke-dasharray="none"') + circ(g, 4.5, 'var(--cable)');
    } else if (ex.eq === 'jam' && ex.an) {
      s += line(ex.an, grip, 6, 'var(--tower)') + circ(ex.an, 6, 'var(--bg)', 'var(--cable)', 2.5) + circ(grip, 6, 'var(--plate)', 'var(--body)', 1.5);
    } else if (ex.eq === 'bar' || ex.eq === 'barh') {
      s += circ(grip, 11, 'var(--plate)', 'var(--body)', 1.5) + circ(grip, 3, 'var(--body)');
    } else if (ex.eq === 'db') {
      s += `<rect x="${f1(grip[0]-9)}" y="${f1(grip[1]-5)}" width="18" height="10" rx="3" fill="var(--plate)" stroke="var(--body)" stroke-width="1.5"/>`;
    } else if (ex.eq === 'hb') {
      s += line([98,20],[202,20], 5, 'var(--tower)') + line([98,20],[98,FLOOR],3,'var(--tower)') + line([202,20],[202,FLOOR],3,'var(--tower)');
    } else if (ex.eq === 'dip') {
      s += line([112,131],[196,131], 5, 'var(--tower)') + line([120,131],[120,FLOOR],3,'var(--tower)') + line([188,131],[188,FLOOR],3,'var(--tower)');
    } else if (ex.eq === 'pad') {
      s += `<rect x="${f1(ankle[0]-6)}" y="${f1(ankle[1]-16)}" width="12" height="14" rx="5" fill="var(--plate)" stroke="var(--body)" stroke-width="1.5"/>`;
    }
    return s;
  }

  function bench(st, h, ex) {
    let s = '';
    const c = 'var(--bench)';
    if (ex.benchSt) st = ex.benchSt;
    if (st === 'ht') {
      s += `<rect x="56" y="186" width="84" height="9" rx="3" fill="${c}"/>` + line([68,195],[68,FLOOR],5,c) + line([128,195],[128,FLOOR],5,c);
    } else if (st === 'seat') {
      s += `<rect x="${h[0]-26}" y="${h[1]+6}" width="72" height="9" rx="3" fill="${c}"/>` + line([h[0]-12,h[1]+8],[h[0]-12,h[1]-72], 9, c) + line([h[0]+8,h[1]+15],[h[0]+8,FLOOR],5,c);
    } else if (st === 'flat') {
      s += `<rect x="100" y="${h[1]+7}" width="150" height="9" rx="3" fill="${c}"/>` + line([120,h[1]+16],[120,FLOOR],5,c) + line([230,h[1]+16],[230,FLOOR],5,c);
    } else if (st === 'inc') {
      s += line([h[0]-4,h[1]+8],add([h[0]-4,h[1]+8],86,270 - ((ex && ex.inc) || 45)), 9, c) + `<rect x="${h[0]-20}" y="${h[1]+8}" width="62" height="9" rx="3" fill="${c}"/>` + line([h[0]+10,h[1]+17],[h[0]+10,FLOOR],5,c);
    } else if (st === 'kneel') {
      s += `<rect x="60" y="${FLOOR-2}" width="140" height="5" rx="2" fill="${c}" opacity=".6"/>`;
    }
    if (ex.bench === 'bulg') s += `<rect x="36" y="184" width="54" height="9" rx="3" fill="${c}"/>` + line([48,193],[48,FLOOR],5,c) + line([80,193],[80,FLOOR],5,c);
    return s;
  }

  function side(ex, p) {
    const H = [p.h[0], p.h[1] - p.lift];
    const S = add(H, p.tl, p.t), head = add(S, 21, p.t);
    const K = add(H, TH, p.th), A = add(K, SH, p.sh);
    const foot = add(A, 15, p.sh + 90 + p.ft);
    let E = add(S, UA, p.ua), W = add(E, FA, p.fa);
    let grip = ex.hand ? add(W, 14, p.fa + p.hd) : W;
    if (ex.eq === 'barh') { grip = H; E = ik(S, H, UA, FA); W = H; }
    let s = bench(ST[ex.st].bench, ST[ex.st].h, ex) + line([10,FLOOR+3],[290,FLOOR+3], 2, 'var(--floor)');
    s += equip({...ex, eq: ex.eq === 'cable' || ex.eq === 'jam' ? ex.eq : null}, grip, A); // torri/cavi dietro al corpo
    // gamba lontana / d'appoggio
    if (ex.rl) {
      const K2 = ik(H, ex.rl, TH, SH); s += poly([H, K2, ex.rl], 8, 'var(--far)');
    } else if (ex.sup) {
      s += poly([H, add(H,TH,0), add(add(H,TH,0),SH,0)], 8, 'var(--far)') + line(add(add(H,TH,0),SH,0), add(add(add(H,TH,0),SH,0),14,90), 6, 'var(--far)');
    } else {
      const d = -5; s += poly([[H[0]+d,H[1]],[K[0]+d,K[1]],[A[0]+d,A[1]]], 8, 'var(--far)');
    }
    // braccio lontano
    if (!ex.one) { const o = [-6,-2], E2 = add([S[0]+o[0],S[1]+o[1]], UA, p.ua), W2 = add(E2, FA, p.fa); s += poly([[S[0]+o[0],S[1]+o[1]],E2,W2], 8, 'var(--far)'); }
    // corpo
    s += poly([H, S], 13, 'var(--body)') + circ(head, 11, 'var(--body)');
    s += poly([H, K, A], 10, 'var(--body)') + line(A, foot, 7, 'var(--body)');
    s += poly([S, E, W], 8, 'var(--acc)');
    if (ex.hand) s += line(W, grip, 6, 'var(--acc)');
    // attrezzo davanti
    s += equip({...ex, eq: (ex.eq === 'cable' || ex.eq === 'jam') ? null : ex.eq}, grip, A);
    if (ex.eq === 'cable' || ex.eq === 'jam') {
      const g = ex.cp === 'ankle' ? A : grip; s += circ(g, ex.eq==='cable'?4.5:5, 'var(--cable)');
    }
    return s;
  }

  function front(ex, p) {
    const seatF = ex.st === 'seat', sy = seatF ? 114 : 62, hy = sy + 58, cx = 150;
    const Ls = [cx-26, sy+4], Rs = [cx+26, sy+4];
    const mir = a => [300 - a[0], a[1]];
    const arm = (S, sgn, ua, fa) => {
      const E = [S[0] + sgn*UA*Math.sin(ua*R), S[1] + UA*Math.cos(ua*R)];
      const W = [E[0] + sgn*FA*Math.sin(fa*R), E[1] + FA*Math.cos(fa*R)];
      return {E, W};
    };
    const rArm = arm(Rs, 1, p.ua, p.fa);
    const lArm = ex.one ? arm(Ls, -1, 5, 5) : arm(Ls, -1, p.ua, p.fa);
    // gambe
    let rAnk = [cx+14, hy+104];
    let legs = '';
    if (seatF) {
      legs += `<rect x="${cx-46}" y="${hy+2}" width="92" height="9" rx="3" fill="var(--bench)"/>` + line([cx-30,hy+11],[cx-30,FLOOR],5,'var(--bench)') + line([cx+30,hy+11],[cx+30,FLOOR],5,'var(--bench)');
      legs += line([cx-14,hy],[cx-26,FLOOR-2], 10, 'var(--body)') + line([cx+14,hy],[cx+26,FLOOR-2], 10, 'var(--body)');
      rAnk = [cx+26, FLOOR-2];
    } else if (ex.legs) {
      const hip = [cx+10, hy], a = add(hip, 104, p.ab); rAnk = a;
      legs += line([cx-10,hy],[cx-14,FLOOR-2], 10, 'var(--body)') + line(hip, a, 10, 'var(--body)');
    } else {
      legs += line([cx-10,hy],[cx-26,FLOOR-2], 10, 'var(--body)') + line([cx+10,hy],[cx+26,FLOOR-2], 10, 'var(--body)');
    }
    let s = line([10,FLOOR+3],[290,FLOOR+3], 2, 'var(--floor)');
    // cavi
    const ans = ex.an || [];
    const wr = rArm.W, wl = lArm.W;
    const cab = (from, an) => line([an[0],8],[an[0],FLOOR],3,'var(--tower)') + circ(an, 6, 'var(--bg)', 'var(--cable)', 2) + line(from, an, 2, 'var(--cable)') + circ(from, 4.5, 'var(--cable)');
    if (ex.bar) {
      s += line(wl, wr, 6, 'var(--plate)');
      const m = [(wl[0]+wr[0])/2, (wl[1]+wr[1])/2];
      s += line([ans[0][0],8],[ans[0][0],FLOOR],3,'var(--tower)') + circ(ans[0], 6, 'var(--bg)', 'var(--cable)', 2) + line(m, ans[0], 2, 'var(--cable)');
    } else if (ex.eq === 'cable') {
      const rg = ex.cp === 'ankle' ? rAnk : wr;
      if (ans.length === 1) s += cab(rg, ans[0]);
      else if (ex.cross) { s += cab(wr, ans[0]) + cab(wl, ans[1]); }
      else { s += cab(wl, ans[0]) + cab(wr, ans[1]); }
    }
    s += legs;
    s += poly([[cx,hy],[cx,sy]], 12, 'var(--body)');
    s += `<path d="M${cx-26},${sy+2} L${cx+26},${sy+2} L${cx+16},${hy} L${cx-16},${hy} Z" fill="var(--body)"/>`;
    s += circ([cx, sy-20], 11, 'var(--body)');
    s += poly([Ls, lArm.E, lArm.W], 8, ex.one ? 'var(--far)' : 'var(--acc)') + poly([Rs, rArm.E, rArm.W], 8, 'var(--acc)');
    return s;
  }

  function svg(ex, p) {
    return `<svg viewBox="0 -34 300 270" role="img" aria-label="${ex.n}">${ex.v === 'f' ? front(ex, p) : side(ex, p)}</svg>`;
  }
  function poses(ex) { return [resolve(ex, ex.fr[0]), resolve(ex, ex.fr[1])]; }

  const live = new Set(); let raf = 0;
  function tick(t) {
    live.forEach(o => {
      if (!o.el.isConnected) { live.delete(o); return; }
      if (o.el.offsetParent === null) return;
      let k;
      if (o.hold !== null) k = o.hold;
      else { const ph = ((t - o.t0) / 1000) % 4; k = ph < 0.6 ? 0 : ph < 2 ? (ph-0.6)/1.4 : ph < 2.6 ? 1 : 1 - (ph-2.6)/1.4; k = k*k*(3-2*k); }
      if (k !== o.last) {
        o.last = k; o.svgHost.innerHTML = svg(o.ex, lerpPose(o.p[0], o.p[1], k));
        if (o.cap) o.cap.textContent = k < .5 ? o.ex.cap[0] : o.ex.cap[1];
        if (o.btns) o.btns.forEach((b, i) => b.classList.toggle('on', o.hold === null ? false : i === Math.round(k)));
      }
    });
    raf = live.size ? requestAnimationFrame(tick) : 0;
  }
  function mount(el, ex) {
    el.innerHTML = '<div class="figsvg"></div><div class="figcap"></div><div class="figbtns"><button data-k="0">1 Partenza</button><button data-k="1">2 Arrivo</button><button data-k="a" class="on">▶ Animazione</button></div>';
    const o = {el, ex, p: poses(ex), hold: null, last: -1, t0: performance.now(), svgHost: el.querySelector('.figsvg'), cap: el.querySelector('.figcap')};
    o.btns = [...el.querySelectorAll('.figbtns button')].slice(0, 2);
    el.querySelectorAll('.figbtns button').forEach(b => b.onclick = () => {
      el.querySelectorAll('.figbtns button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      o.hold = b.dataset.k === 'a' ? null : +b.dataset.k; o.last = -1; o.t0 = performance.now();
    });
    o.btns = null;
    o.svgHost.innerHTML = svg(ex, o.p[0]); o.cap.textContent = ex.cap[0];
    live.add(o); if (!raf) raf = requestAnimationFrame(tick);
    return o;
  }
  return {mount, svg, poses, lerpPose};
})();
