/* App allenamento — tutto locale: i pesi si salvano nel telefono (localStorage) a ogni modifica. */
(() => {
const KEY = 'sks_allenamento_v1';
const $ = s => document.querySelector(s);
const byId = Object.fromEntries(EX.map(e => [e.id, e]));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

let DB = {cur: {}, hist: {}, mia: []};
try { const r = JSON.parse(localStorage.getItem(KEY)); if (r && r.cur && r.hist) DB = r; } catch (e) {}
const CUST = ['g1', 'g2', 'g3', 'g4', 'gA', 'mia', 'dom'];
function fixDB(d) { if (!d.hiddenRef || typeof d.hiddenRef !== 'object') d.hiddenRef = {}; if (!d.myv || typeof d.myv !== 'object') d.myv = {}; if (!d.names || typeof d.names !== 'object') d.names = {}; if (!d.rt || typeof d.rt !== 'object') d.rt = {}; CUST.forEach(id => { if (!Array.isArray(d.rt[id])) d.rt[id] = []; });
  delete d.mia;
  if (d.v !== 3) { d.v = 3; d.names = {}; CUST.forEach(id => d.rt[id] = []); }
  return d; }
fixDB(DB);
let saveTimer;
let remote = null, cloudTimer;
function save() {
  DB.ts = Date.now();
  let ok = false;
  try { localStorage.setItem(KEY, JSON.stringify(DB)); ok = true; } catch (e) {}
  if (remote) { clearTimeout(cloudTimer); cloudTimer = setTimeout(pushCloud, 700); ok = true; }
  flash(ok ? '✓ Salvato' : '⚠ Non riesco a salvare: fai un backup');
}
function pushCloud() { remote.set({json: JSON.stringify(DB), ts: DB.ts}).catch(() => flash('⚠ Salvataggio online non riuscito')); }
async function initCloud() {
  try {
    if (!window.claude || !window.claude.use) return;
    const [db, user] = await Promise.all([claude.use('db'), claude.use('user')]);
    if (!db || !user) return;
    const ref = db.collection('data/users/' + await user.id()).doc('allenamento');
    const snap = await ref.get();
    if (snap.exists) {
      const r = JSON.parse(snap.data().json || 'null');
      if (r && r.cur && r.hist && (r.ts || 0) > (DB.ts || 0)) { DB = fixDB(r); try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) {} applyLogo(); if ($('#modal').hidden) render(true); }
    }
    remote = ref;
    if ((DB.ts || 0) > 0 && !snap.exists) pushCloud();
  } catch (e) {}
}
function flash(t) { const s = $('#saved'); s.textContent = t; s.classList.add('on'); clearTimeout(saveTimer); saveTimer = setTimeout(() => s.classList.remove('on'), 2200); }

const FIN = {forza: 'Forza', massa: 'Massa', tonificare: 'Tonificare'};
// serie (n), intervallo serie, ripetizioni, recupero, % del massimale (p = valore medio), ripetizioni in riserva
const PRESC = {
  comp: {forza: {s: 4, sr: '4-5', r: '3-5', rec: '3 min', pct: '85-90%', p: .87, rir: '1-2'}, massa: {s: 4, sr: '3-4', r: '6-10', rec: '90-120 s', pct: '70-80%', p: .75, rir: '1-2'}, tonificare: {s: 3, sr: '2-3', r: '12-15', rec: '60 s', pct: '55-65%', p: .6, rir: '2-3'}},
  semi: {massa: {s: 3, sr: '3-4', r: '8-12', rec: '90 s', pct: '65-75%', p: .7, rir: '1-2'}, tonificare: {s: 3, sr: '2-3', r: '12-15', rec: '45-60 s', pct: '50-60%', p: .55, rir: '2-3'}},
  iso: {massa: {s: 3, sr: '3-4', r: '10-15', rec: '60-90 s', pct: '60-70%', p: .65, rir: '0-2'}, tonificare: {s: 3, sr: '2-3', r: '15-20', rec: '30-45 s', pct: '40-55%', p: .48, rir: '2-3'}},
  pol: {massa: {s: 4, sr: '4', r: '10-15', rec: '60 s', pct: '60-70%', p: .65, rir: '0-2'}, tonificare: {s: 3, sr: '3', r: '15-20', rec: '30-45 s', pct: '40-55%', p: .48, rir: '2-3'}},
  core: {tonificare: {s: 3, sr: '3', r: '12-20', rec: '30-45 s', pct: 'solo corpo libero o carico leggero', p: 0, rir: '2-3'}, massa: {s: 3, sr: '3-4', r: '8-12', rec: '60-90 s', pct: 'carico medio', p: 0, rir: '1-2'}}
};
const presOf = (ex, f) => (PRESC[ex.tipo] || PRESC.iso)[f] || null;
// massimale stimato (formula di Epley) dalle serie che hai già registrato
function est1RM(id) {
  let best = 0;
  Object.entries(DB.hist).forEach(([k, arr]) => { if (k.split(':')[1] !== id) return; arr.forEach(h => (h.sets || []).forEach(st => { const kg = num(st.kg), r = num(st.reps); if (kg > 0 && r >= 1 && r <= 12) best = Math.max(best, kg * (1 + r / 30)); })); });
  return best || null;
}
function pesoTxt(ex, f) {
  const p = presOf(ex, f); if (!p) return '';
  const e = est1RM(ex.id);
  if (e && p.p) { const kg = Math.round(e * p.p / 2.5) * 2.5; return `peso indicativo ≈ ${kg} kg (${p.pct} del tuo massimale stimato)`; }
  if (p.p) return `peso: ${p.pct} del tuo massimale (se non lo conosci, scegli un carico che ti lasci ${p.rir} ripetizioni in riserva)`;
  return `carico: ${p.pct}; ${p.rir} ripetizioni in riserva`;
}
const finLine = (ex, f) => { const p = presOf(ex, f); return p ? `<li><b>${FIN[f]}</b>: ${p.sr} serie × ${p.r} ripetizioni, recupero ${p.rec}. ${esc(pesoTxt(ex, f))}.</li>` : ''; };
const GCOL = {petto:'#ef476f', spalle:'#f59e0b', schiena:'#3b82f6', bicipiti:'#10b981', tricipiti:'#8b5cf6', avambracci:'#14b8a6', gambe:'#ff6b35', addome:'#06b6d4'};
const ICON_LIB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/></svg>';
const DAYS = [['g1', 'Lun', 'Lunedì'], ['g2', 'Mar', 'Martedì'], ['g3', 'Mer', 'Mercoledì'], ['g4', 'Gio', 'Giovedì'], ['giulia', 'Ven', 'Venerdì'], ['mia', 'Sab', 'Sabato'], ['dom', 'Dom', 'Domenica']];
const TABS = [{id:'lib', a:['Esercizi'], b:ICON_LIB, full:'Esercizi'}, ...DAYS.map(([id, sh, full], i) => ({id, a:[sh], b:String(i + 1), full}))];
const dayName = id => (DAYS.find(d => d[0] === (id === 'gA' ? 'giulia' : id)) || [])[2] || 'Scheda';
const tabPlan = id => id === 'giulia' ? 'gA' : id;

const rtList = id => DB.rt[id] || (DB.rt[id] = []);
const customPlan = id => { const base = PLAN.find(p => p.id === id);
  return {id, custom: true, profilo: id === 'mia' ? 'mia' : id[0] === 'g' && id.length === 2 && id[1] > '9' ? 'giulia' : 'io', nome: DB.names[id] ? (DB.names[id].n || 'Senza nome') : dayName(id), sotto: DB.names[id] ? (DB.names[id].m || '') : '',
    obiettivo: 'Esercizi scelti da te: aggiungili o toglili dalla Libreria con il tasto + e riordinali qui sotto.',
    ex: rtList(id).filter(x => byId[x.e]).map(x => ({...x, ruolo: 'Scelto da te'}))}; };
const planOf = id => CUST.includes(id) ? customPlan(id) : PLAN.find(p => p.id === id);
const inRt = (rid, id) => rtList(rid).some(x => x.e === id);
const inAny = id => CUST.some(r => inRt(r, id));
function toggleRt(rid, id) {
  if (inRt(rid, id)) DB.rt[rid] = rtList(rid).filter(x => x.e !== id);
  else { let d = {s: 3, r: '8-12', rec: '90 s'}; for (const p of PLAN) { const x = p.ex.find(x => x.e === id); if (x) { d = {s: x.s, r: x.r, rec: x.rec}; break; } } rtList(rid).push({e: id, ...d}); }
  save();
}
function renameRt(id) {
  const cp = customPlan(id);
  modal(`<h2 style="padding-right:44px">Rinomina scheda</h2>
   <label class="fl">Nome (es. Giorno 1, Pausa)<input id="rn-n" maxlength="30" value="${esc(cp.nome)}"></label>
   <label class="fl">Muscoli o descrizione (separa con la virgola, es. Petto, Tricipiti)<input id="rn-m" maxlength="60" value="${esc(cp.sotto)}"></label>
   <div class="sbar" style="padding:12px 0 0"><button class="ghost" data-act="renreset" data-id="${id}">Ripristina</button><button class="primary" style="width:auto;padding:10px 18px" data-act="rensave" data-id="${id}">Salva</button></div>`);
}
function pickRt(id) {
  const rows = () => CUST.map(r => { const cp = customPlan(r), pre = ''; return `<button class="rtrow ${inRt(r, id) ? 'on' : ''}" data-act="rtpick" data-r="${r}" data-id="${id}"><span>${inRt(r, id) ? '✓' : '+'}</span>${esc(pre + cp.nome + (cp.sotto ? ': ' + cp.sotto : ''))}</button>`; }).join('');
  modal(`<h2 style="padding-right:44px">Aggiungi a…</h2><p style="color:var(--mut);margin:0 0 10px">${esc(byId[id].n)}</p><div id="rtrows">${rows()}</div>`);
  pickRt.rows = rows;
}
let tab = (location.hash || '#lib').slice(1); if (!TABS.some(t => t.id === tab)) tab = 'lib';
let giuliaSub = 'gA';
const lib = {q: '', g: '', a: '', f: ''};

const pk = (prof, id) => prof + ':' + id;
const today = () => new Date().toISOString().slice(0, 10);
const fmtD = d => d.split('-').reverse().slice(0, 2).join('/');
const upper = r => { const m = String(r).match(/\d+/g); return m ? +m[m.length - 1] : 0; };
const num = v => { const n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? 0 : n; };
const lastHist = k => { const h = DB.hist[k]; return h && h.length ? h[h.length - 1] : null; };
const planCount = id => { let n = 0; PLAN.forEach(p => p.ex.forEach(x => { if (x.e === id) n++; })); return n; };

function curFor(k, n) {
  let c = DB.cur[k];
  if (!c) c = DB.cur[k] = {sets: []};
  while (c.sets.length < n) c.sets.push({kg: '', reps: '', done: false});
  return c;
}

/* ---------- blocchi HTML ---------- */
/* ---- video dell'esercizio: link alla fonte + video personale salvato solo sul dispositivo (IndexedDB) ---- */
const VDB = {
  open() { return new Promise((res, rej) => { try { const r = indexedDB.open('sks_video', 1); r.onupgradeneeded = () => r.result.createObjectStore('v'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); } catch (e) { rej(e); } }); },
  async get(id) { const db = await this.open(); return new Promise((res, rej) => { const q = db.transaction('v').objectStore('v').get(id); q.onsuccess = () => res(q.result || null); q.onerror = () => rej(q.error); }); },
  async set(id, blob) { const db = await this.open(); return new Promise((res, rej) => { const t = db.transaction('v', 'readwrite'); t.objectStore('v').put(blob, id); t.oncomplete = () => res(); t.onerror = () => rej(t.error); }); },
  async clear() { const db = await this.open(); return new Promise((res, rej) => { const t = db.transaction('v', 'readwrite'); t.objectStore('v').clear(); t.oncomplete = () => res(); t.onerror = () => rej(t.error); }); },
  async del(id) { const db = await this.open(); return new Promise((res, rej) => { const t = db.transaction('v', 'readwrite'); t.objectStore('v').delete(id); t.oncomplete = () => res(); t.onerror = () => rej(t.error); }); }
};
const GLU = new Set('g-hip-thrust sm-hip-thrust g-kickback g-kickback-flesso g-kickback-diag g-abd-cavo g-add-cavo g-pullthrough g-bulgaro g-split g-rdl g-rdl-cavo g-squat-cavo g-sumo g-squat sm-squat sm-rdl g-front-squat sm-front-squat'.split(' '));
const ytSearch = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
function creatorLinks(ex) {
  const cr = ex.sm ? [['Team Underground Physique / Gianluca Olgiati', 'Underground Physique Gianluca Olgiati'], ['Sly05 / Team Synergic', 'Sly05 Team Synergic']]
    : [['Niko_In_Forma Team', 'Niko In Forma Team'], ['Underground Physique', 'Underground Physique Gianluca Olgiati'], ['Filippo Rispoli / IronManager', 'Filippo Rispoli IronManager']];
  const a = (l, q) => `<a class="vlink2" href="${ytSearch(q)}" target="_blank" rel="noopener noreferrer">🔎 ${esc(l)}</a>`;
  return `<div class="vcr"><h4>Cerca su YouTube i video dei canali consigliati</h4><div class="vcrl">${cr.map(([l, q]) => a(l, ex.n + ' ' + q + ' shorts')).join('')}${GLU.has(ex.id) ? a('Shorts glutei di donne', ex.n + ' glutei shorts donna') : ''}</div><p class="vnote">Si apre la ricerca su YouTube per questo esercizio: scegli tu il video.</p></div>`;
}
function videoBlock(ex) {
  const l = DB.hideRef ? [] : ((typeof VIDEOS !== 'undefined' && VIDEOS[ex.id]) || []).filter(x => !DB.hiddenRef[x.u]);
  const links = l.length ? `<div class="vlinks">${l.map((x, i) => `<div class="vrow"><a class="vlink" href="${esc(x.u)}" target="_blank" rel="noopener noreferrer">▶ ${x.s ? 'Video trovato online' : (i ? 'Altro video' : 'Guarda il video originale')}<small>${esc(x.n)}${x.s ? ' · scelto dal titolo, non verificato' : ''}</small></a><button class="ghost danger" data-act="vrefdel" data-id="${ex.id}" data-u="${esc(x.u)}" aria-label="Togli questo video">Togli</button></div>`).join('')}</div>` : '<p class="vnone">' + (DB.hideRef ? 'I video di riferimento sono nascosti (puoi mostrarli da ⚙).' : 'Per questo esercizio non c’è un video di riferimento.') + '</p>';
  return `<div class="vbox" data-vid="${ex.id}"><h3>Video</h3>${links}${creatorLinks(ex)}
   <div class="vmine"><h3>I tuoi video</h3><div class="vmy"></div>
   <div class="vbtns"><label class="ghost vadd">⬆ Aggiungi un video dal telefono<input type="file" accept="video/*" hidden data-vfile="${ex.id}"></label></div>
   <div class="vurl"><input type="url" class="vurlin" inputmode="url" placeholder="Oppure incolla il link di un video online" autocomplete="off" aria-label="Link del video"><button class="ghost" data-act="vurl" data-id="${ex.id}">＋ Aggiungi link</button></div>
   <p class="vnote">I video caricati dal telefono restano solo su questo dispositivo. I link si salvano con i tuoi dati. Puoi aggiungerne quanti vuoi.</p></div></div>`;
}
async function loadMine(root) {
  const box = root.querySelector('.vbox'); if (!box) return; const id = box.dataset.vid, host = box.querySelector('.vmy');
  const list = DB.myv[id] = DB.myv[id] || [];
  try { if (!list.some(x => x.k === id) && !DB.myv['_m' + id]) { DB.myv['_m' + id] = 1; const old = await VDB.get(id); if (old) { list.unshift({t: 'f', k: id, n: 'Il tuo video'}); save(); } } } catch (e) {}
  host.innerHTML = '';
  for (const x of list) {
    const row = document.createElement('div'); row.className = 'vitem';
    const del = `<button class="ghost danger" data-act="vdel" data-id="${id}" data-k="${esc(x.k)}">Rimuovi</button>`;
    if (x.t === 'u') { row.innerHTML = `<a class="vlink" href="${esc(x.u)}" target="_blank" rel="noopener noreferrer">▶ Apri il video<small>${esc(x.n || x.u)}</small></a>${del}`; }
    else {
      row.innerHTML = `<div class="vplay"></div><div class="vcap"><span>${esc(x.n || 'Il tuo video')}</span>${del}</div>`;
      try { const b = await VDB.get(x.k); if (b) { const v = document.createElement('video'); v.controls = true; v.playsInline = true; v.preload = 'metadata'; v.src = URL.createObjectURL(b); row.querySelector('.vplay').appendChild(v); } else row.querySelector('.vplay').innerHTML = '<p class="vnone">Video non più presente su questo dispositivo.</p>'; }
      catch (e) { row.querySelector('.vplay').innerHTML = '<p class="vnone">Il tuo browser non permette di salvare video qui.</p>'; }
    }
    host.appendChild(row);
  }
  if (!list.length) host.innerHTML = '<p class="vnone">Nessun video aggiunto.</p>';
}
function techHtml(ex) {
  const li = a => a.map(x => `<li>${esc(x)}</li>`).join('');
  return `<div class="fig" data-fig="${ex.id}"></div>
  <p class="warn">⚠ Le animazioni sono schematiche e non sostituiscono un allenatore: se non sei sicuro della tecnica, fatti guardare da un professionista e parti con pesi leggeri.</p>
  <p class="cue"><b>💡 Come pensarlo:</b> ${esc(ex.cue)}</p>
  ${ex.trj ? `<h3>Traiettoria</h3><p>${esc(ex.trj)}</p>` : ''}
  ${videoBlock(ex)}
  <h3>Muscoli</h3><p>${esc(ex.m)}</p>
  ${ex.fin ? `<h3>Finalità e carichi consigliati</h3><p>Adatto a: <b>${ex.fin.map(f => FIN[f]).join(' · ')}</b></p><ul>${ex.fin.map(f => finLine(ex, f)).join('')}</ul><p class="vnote">Indicazioni generali, non personalizzate. “Ripetizioni in riserva” = quante ne potresti ancora fare a fine serie. Per <b>tonificare</b> (muscolo più definito) servono carichi moderati e ripetizioni alte, ma il risultato dipende anche da alimentazione e dal grasso corporeo.</p>` : ''}
  <h3>Impostazione (attrezzo, cavi, altezza)</h3><p>${esc(ex.set)}</p>
  <h3>Posizione del corpo</h3><p>${esc(ex.pos)}</p>
  <h3>Esecuzione</h3><ol>${li(ex.ese)}</ol>
  <h3>Perché lo fai</h3><p>${esc(ex.why)}</p>
  <h3>Errori da evitare</h3><ul>${li(ex.err)}</ul>`;
}

function lastLine(k) {
  const h = lastHist(k); if (!h) return '';
  return `<div class="last">Ultima volta (${fmtD(h.d)}): ${h.sets.map(s => `${s.kg || '–'} kg × ${s.reps || '–'}`).join(' · ')}</div>`;
}
function hintLine(k, target) {
  const h = lastHist(k), u = upper(target); if (!h || !u) return '';
  const ok = h.sets.length && h.sets.every(s => num(s.reps) >= u && num(s.kg) > 0);
  return ok ? `<div class="hint">↑ Hai chiuso tutte le serie a ${u} ripetizioni: oggi prova +2,5 kg.</div>` : '';
}
function setsHtml(k, n, target) {
  const c = curFor(k, n), h = lastHist(k);
  const rows = c.sets.map((s, i) => {
    const ph = h && h.sets[i] ? h.sets[i] : (h && h.sets.length ? h.sets[h.sets.length - 1] : {});
    return `<div class="set"><span>${i + 1}</span>
      <label class="f"><input inputmode="decimal" data-k="${k}" data-i="${i}" data-f="kg" value="${esc(s.kg)}" placeholder="${esc(ph.kg || '0')}" aria-label="Peso serie ${i + 1}"><u>kg</u></label>
      <label class="f"><input inputmode="numeric" data-k="${k}" data-i="${i}" data-f="reps" value="${esc(s.reps)}" placeholder="${esc(ph.reps || String(upper(target) || ''))}" aria-label="Ripetizioni serie ${i + 1}"><u>rip</u></label>
      <button class="chk ${s.done ? 'on' : ''}" data-k="${k}" data-i="${i}" data-act="done" aria-label="Serie completata">✓</button></div>`;
  }).join('');
  return `<div class="sets" data-sets="${k}">${rows}</div>
    <div class="sbar"><button data-act="addset" data-k="${k}" data-n="${n}">+ serie</button><button data-act="delset" data-k="${k}" data-n="${n}">− serie</button>
    <button data-act="hist" data-k="${k}">Storico</button></div>`;
}

const cov = (id, cls) => (typeof COVERS !== 'undefined' && COVERS[id]) ? `<img class="${cls}" src="${COVERS[id]}" alt="" loading="lazy">` : '';
const cab = ex => ex.a === 'Cavi' ? '<span class="tag cav">Cavi</span>' : `<span class="tag" style="background:var(--in);color:var(--mut)">${esc(ex.a)}</span>`;
const gtag = ex => `<span class="tag" style="background:color-mix(in srgb,${GCOL[ex.g]} 16%,transparent);color:${GCOL[ex.g]}">${esc(GRUPPI[ex.g])}</span>`;
function exCard(x, idx, prof, pl) {
  const cu = pl && pl.custom, pid = pl && pl.id;
  const ex = byId[x.e], k = pk(prof, ex.id), c = curFor(k, x.s);
  const done = c.sets.filter(s => s.done).length;
  return `<article class="card ex" style="--gc:${GCOL[ex.g]}" id="c-${k.replace(':', '-')}">
   ${cov(ex.id, 'cover')}${cu ? `<div class="mctl"><button data-act="mup" data-pid="${pid}" data-id="${ex.id}" aria-label="Sposta su"${idx === 0 ? ' disabled' : ''}>↑</button><button data-act="mdn" data-pid="${pid}" data-id="${ex.id}" aria-label="Sposta giù">↓</button><button class="rm" data-act="mrm" data-pid="${pid}" data-id="${ex.id}">Togli</button></div>` : ''}<div class="exh"><span class="num ${done >= c.sets.length ? 'done' : ''}">${idx + 1}</span>
    <div style="min-width:0"><h2>${esc(ex.n)}${x.opt ? '<span class="opt">opzionale</span>' : ''}</h2><div class="meta">${gtag(ex)}${cab(ex)}</div></div></div>
   ${cu ? `<div class="presc edit"><b><span class="n">${c.sets.length}</span> ×</b><input class="ed" data-mf="r" data-pid="${pid}" data-id="${ex.id}" value="${esc(x.r)}" placeholder="8-12" maxlength="12" aria-label="Ripetizioni previste"><span>recupero</span><input class="ed" data-mf="rec" data-pid="${pid}" data-id="${ex.id}" value="${esc(x.rec)}" placeholder="90 s" maxlength="12" aria-label="Recupero"></div>` : `<div class="presc"><b>${c.sets.length} × ${esc(x.r)}</b><span>recupero ${esc(x.rec)}</span></div>`}
   ${cu && ex.fin ? `<div class="objrow"><span>Obiettivo</span>${ex.fin.map(f => `<button class="${x.obj === f ? 'on' : ''}" data-act="objset" data-pid="${pid}" data-id="${ex.id}" data-f="${f}">${FIN[f]}</button>`).join('')}</div>${x.obj && presOf(ex, x.obj) ? `<div class="objtip">Consigliato per ${FIN[x.obj].toLowerCase()}: ${presOf(ex, x.obj).sr} × ${presOf(ex, x.obj).r}, recupero ${presOf(ex, x.obj).rec} · ${esc(pesoTxt(ex, x.obj))}</div>` : ''}` : `<div class="role">${esc(x.ruolo)}</div>`}
   ${setsHtml(k, x.s, x.r)}${lastLine(k)}${hintLine(k, x.r)}
   <details class="tech"><summary>Tecnica 3D, cavi e spiegazione</summary><div class="tb">${techHtml(ex)}</div></details>
  </article>`;
}

const secs = rec => { const m = String(rec).match(/(\d+)\s*min/), t = String(rec).match(/(\d+)\s*s\b/); return m ? +m[1] * 60 : t ? +t[1] : 20; };
function planView(p, prof) {
  let tot = 0, dn = 0, mins = 0;
  p.ex.forEach(x => { const c = curFor(pk(prof, x.e), x.s); tot += c.sets.length; dn += c.sets.filter(s => s.done).length; mins += c.sets.length * (40 + secs(x.rec)); });
  const cav = p.ex.filter(x => byId[x.e].a === 'Cavi').length;
  return `<section class="hero"><div class="eyebrow">${p.custom ? 'Allenamento' : prof === 'giulia' ? 'Giulia' : 'Forza · 4 giorni'}</div><h2>${esc(p.nome)}</h2><div class="sub">${esc(p.sotto)}</div><p>${esc(p.obiettivo)}</p>
   <div class="stats"><div class="stat"><b>${p.ex.length}</b><span>esercizi</span></div><div class="stat"><b>${tot}</b><span>serie</span></div><div class="stat"><b>~${Math.round(mins / 600) * 10}</b><span>minuti</span></div><div class="stat"><b>${cav}</b><span>ai cavi</span></div></div>
   <div class="prog"><i style="width:${tot ? Math.round(dn / tot * 100) : 0}%"></i></div><div class="progt">${dn}/${tot} serie completate</div></section>
   ${p.custom ? custTools(p) : ''}
   ${p.ex.map((x, i) => exCard(x, i, prof, p)).join('')}
   ${p.custom ? '<button class="ghost addmore" data-act="ptoggle" onclick="setTimeout(()=>window.scrollTo(0,0),30)">+ Aggiungi altri esercizi</button>' : ''}
   <button class="primary" data-act="finish" data-p="${p.id}" data-prof="${prof}">Fine allenamento · salva nello storico</button>`;
}

const pick = {open: false, q: '', g: '', a: '', f: ''};
const filt = st => { const q = norm(st.q).split(/\s+/).filter(Boolean);
  return EX.filter(e => { if (st.g && e.g !== st.g) return false; if (st.a && e.a !== st.a) return false; if (st.f && !(e.fin || []).includes(st.f)) return false;
    const hay = norm([e.n, e.g, GRUPPI[e.g], e.a, e.m, e.cue, e.why, e.set].join(' ')); return q.every(t => hay.includes(t)); }); };
const exRow = (e, act, rid) => { const on = rid ? inRt(rid, e.id) : inAny(e.id);
  return `<div class="lw"><button class="li" style="--gc:${GCOL[e.g]}" data-act="open" data-id="${e.id}">${cov(e.id, 'thumb') || `<span class="dot">${esc(GRUPPI[e.g][0])}</span>`}<span class="t"><b>${esc(e.n)}</b><small>${esc(GRUPPI[e.g])} · ${esc(e.m.split(',')[0])}${e.fin ? ' · ' + e.fin.map(f => FIN[f]).join('/') : ''}</small></span>${e.a === 'Cavi' ? '<span class="tag cav">Cavi</span>' : `<span class="tag" style="background:var(--in);color:var(--mut)">${esc(e.a)}</span>`}</button><button class="add ${on ? 'on' : ''}" data-act="${act}" data-id="${e.id}"${rid ? ` data-r="${rid}"` : ''} aria-label="${on ? 'Togli' : 'Aggiungi'}">${on ? '✓' : '+'}</button></div>`; };
function filters(st, sid, qid) {
  const atts = [...new Set(EX.map(e => e.a))];
  return `<input class="search" id="${qid}" type="search" placeholder="Cerca: es. tricipiti, cavo alto, squat…" value="${esc(st.q)}" autocomplete="off">
  <div class="chips">${chip('g', '', 'Tutti i muscoli', sid)}${Object.entries(GRUPPI).map(([k, v]) => chip('g', k, v, sid)).join('')}</div>
  <div class="chips">${chip('f', '', 'Ogni obiettivo', sid)}${Object.entries(FIN).map(([k, v]) => chip('f', k, v === 'Tonificare' ? 'Per tonificare' : v === 'Forza' ? 'Per la forza' : 'Per la massa', sid)).join('')}</div>
  <div class="chips">${chip('a', '', 'Ogni attrezzo', sid)}${atts.map(a => chip('a', a, a, sid)).join('')}</div>`;
}
function libView() {
  const list = filt(lib);
  return `${filters(lib, 'lib', 'q')}<div class="count">${list.length} di ${EX.length} esercizi</div>
  <div id="list">${list.map(e => exRow(e, 'mtog')).join('') || '<p class="count">Nessun risultato.</p>'}</div>`;
}
const custView = cp => cp.ex.length ? planView(cp, cp.profilo) : `<section class="hero"><div class="eyebrow">Allenamento</div><h2>${esc(cp.nome)}</h2><div class="sub">${esc(cp.sotto)}</div><p>Scheda vuota: scegli il muscolo e l'attrezzo qui sotto e tocca + sugli esercizi che vuoi fare. Puoi anche rinominarla (es. “Pausa”).</p></section>${custTools(cp)}`;
function custTools(cp) {
  const open = pick.open || !cp.ex.length, list = open ? filt(pick) : [];
  return `<div class="ctools"><button class="ghost" data-act="ren" data-id="${cp.id}">✏ Rinomina scheda</button><button class="ghost" data-act="ptoggle">${open && cp.ex.length ? '▲ Chiudi elenco' : '＋ Aggiungi esercizi'}</button></div>` +
    (open ? `<section class="picker"><h3>Scegli muscolo e attrezzo, poi tocca + per aggiungere</h3>${filters(pick, 'pk', 'pq')}<div class="count">${list.length} di ${EX.length} esercizi</div>${list.map(e => exRow(e, 'ptog', cp.id)).join('') || '<p class="count">Nessun risultato.</p>'}</section>` : '');
}
const chip = (t, v, l, sid) => { const st = sid === 'pk' ? pick : lib; return `<button class="chip ${st[t] === v ? 'on' : ''}" style="--gc:${t === 'g' && GCOL[v] ? GCOL[v] : 'transparent'}" data-act="chip" data-s="${sid}" data-t="${t}" data-v="${esc(v)}">${t === 'g' && GCOL[v] ? '<u></u>' : ''}${esc(l)}</button>`; };

/* ---------- render ---------- */
function render(keep) {
  const y = window.scrollY;
  const t = TABS.find(x => x.id === tab);
  $('#ttl').innerHTML = tab === 'lib' ? 'Esercizi<small>Libreria ricercabile · ' + EX.length + ' esercizi</small>' : esc(planOf(tabPlan(tab)).nome) + '<small>' + (planOf(tabPlan(tab)).sotto ? esc(planOf(tabPlan(tab)).sotto) + ' · ' : '') + rtList(tabPlan(tab)).length + ' esercizi scelti da te</small>';
  $('#nav').innerHTML = TABS.map(x => { let a = x.a, full = x.full; const nm = DB.names[tabPlan(x.id)]; if (nm) { a = (nm.m || '').split(/[,+·\/]/).map(v => v.trim()).filter(Boolean).slice(0, 4); if (!a.length) a = [(nm.n || 'Scheda').trim()]; full = nm.n + (nm.m ? ': ' + nm.m : ''); if (!nm.m && nm.n.length > 7) a = [nm.n.slice(0, 7) + '.']; }
    return `<button class="${x.id === tab ? 'on' : ''}" data-act="tab" data-id="${x.id}" aria-label="${esc(full)}"><i>${x.b}</i><span>${a.map(esc).join('<br>')}</span></button>`; }).join('');
  let h;
  if (tab === 'lib') h = libView();
  else if (tab === 'giulia') {
    h = custView(planOf('gA'));
  } else if (CUST.includes(tab)) {
    h = custView(planOf(tab));
  } else h = planView(planOf(tab), 'io');
  $('#main').innerHTML = h;
  if (keep) window.scrollTo(0, y);
}
function go(id) { tab = id; location.hash = id; render(); window.scrollTo(0, 0); }

/* ---------- modali ---------- */
function ask(msg, label, cb) {
  modal(`<h2 style="padding-right:44px">${esc(msg)}</h2><div class="sbar" style="padding:12px 0 0"><button class="ghost" data-act="no">Annulla</button><button class="primary" style="width:auto;padding:10px 18px" data-act="yes">${esc(label)}</button></div>`);
  $('#mbody [data-act=yes]').onclick = () => { closeModal(); cb(); };
  $('#mbody [data-act=no]').onclick = closeModal;
}
function modal(html) { $('#mbody').innerHTML = html; $('#modal').hidden = false; document.body.style.overflow = 'hidden'; $('.sheet').scrollTop = 0; }
function closeModal() { $('#modal').hidden = true; $('#mbody').innerHTML = ''; document.body.style.overflow = ''; if (tab === 'lib') render(true); }
$('#mx').onclick = closeModal;
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });

function openEx(id) {
  const ex = byId[id], k = pk('io', id);
  modal(`<h2 style="padding-right:44px">${esc(ex.n)}</h2><p style="color:var(--mut);margin:0 0 8px">${esc(GRUPPI[ex.g])} · ${esc(ex.a)}</p>
   <div class="card" style="padding:8px">${techHtml(ex)}</div>
   <div class="card"><button class="ghost" data-act="mtog" data-id="${ex.id}">${inAny(id) ? '✓ Nelle tue schede · modifica' : '＋ Aggiungi a una scheda'}</button></div>
   <div class="card"><h2>I tuoi pesi</h2>${setsHtml(k, 3, '')}${lastLine(k)}</div>`);
  const f = $('#mbody [data-fig]'); if (f) FIG3.mount(f, ex, FIG.mount);
  loadMine($('#mbody'));
}
function histView(k) {
  const [prof, id] = k.split(':'), ex = byId[id], h = (DB.hist[k] || []).slice().reverse();
  const best = h.reduce((m, e) => Math.max(m, ...e.sets.map(s => num(s.kg))), 0);
  modal(`<h2 style="padding-right:44px">Storico · ${esc(ex.n)}</h2>
   <p style="color:var(--mut)">${h.length ? `Peso massimo registrato: <b>${best} kg</b>` : 'Ancora nessuna sessione salvata. Usa “Fine allenamento” per archiviare la seduta.'}</p>
   <div class="card hist">${h.map(e => `<div><b>${fmtD(e.d)}/${e.d.slice(2, 4)}</b> — ${e.sets.map(s => `${s.kg || '–'}×${s.reps || '–'}`).join(' · ')}</div>`).join('')}</div>`);
}
/* ---------- storico: stampa / PDF / condivisione ---------- */
function reportData() {
  const by = {};
  Object.entries(DB.hist).forEach(([k, arr]) => { const id = k.split(':')[1]; if (!byId[id]) return; (by[id] = by[id] || []).push(...arr.filter(h => h.sets && h.sets.length)); });
  return Object.entries(by).map(([id, arr]) => ({ex: byId[id], h: arr.sort((a, b) => a.d < b.d ? -1 : 1)})).filter(x => x.h.length)
    .sort((a, b) => (Object.keys(GRUPPI).indexOf(a.ex.g) - Object.keys(GRUPPI).indexOf(b.ex.g)) || a.ex.n.localeCompare(b.ex.n));
}
const fmtFull = d => d.split('-').reverse().join('/');
function reportText(data) {
  let t = 'STORICO ALLENAMENTI · ' + fmtFull(today()) + '\n';
  data.forEach(({ex, h}) => { t += '\n' + ex.n + ' (' + GRUPPI[ex.g] + ')\n'; h.forEach(e => { t += '  ' + fmtFull(e.d) + ': ' + e.sets.map(s => (s.kg || '–') + ' kg × ' + (s.reps || '–')).join(' · ') + '\n'; }); });
  return t;
}
function reportHtml(data) {
  if (!data.length) return '<p>Nessun allenamento archiviato: usa “Fine allenamento” per salvarlo nello storico.</p>';
  return data.map(({ex, h}) => { const best = Math.max(0, ...h.flatMap(e => e.sets.map(s => num(s.kg))));
    return `<section class="rp"><h3>${esc(ex.n)} <small>${esc(GRUPPI[ex.g])}${best ? ' · massimo ' + best + ' kg' : ''}</small></h3><table>${h.map(e => `<tr><td>${fmtFull(e.d)}</td><td>${e.sets.map(s => `${esc(s.kg || '–')} kg × ${esc(s.reps || '–')}`).join(' · ')}</td></tr>`).join('')}</table></section>`; }).join('');
}
function reportView() {
  const data = reportData();
  modal(`<h2 style="padding-right:44px">Storico da stampare o condividere</h2>
   <div class="sbar" style="padding:0 0 10px"><button class="ghost" data-act="rprint">🖨 Stampa / Salva PDF</button><button class="ghost" data-act="rshare">📤 Condividi</button><button class="ghost" data-act="rcopy">Copia testo</button></div>
   <p class="vnote" style="margin:0 0 10px">“Stampa / Salva PDF”: nella finestra che si apre scegli <b>Salva come PDF</b> (su telefono: Condividi → Salva in File) e poi invialo a chi vuoi.</p>
   <div class="rpbox">${reportHtml(data)}</div>`);
}
function reportPrint() {
  const pa = document.createElement('div'); pa.id = 'printarea';
  pa.innerHTML = `<h1>Storico allenamenti</h1><p>Aggiornato al ${fmtFull(today())}</p>` + reportHtml(reportData());
  document.body.appendChild(pa); document.body.classList.add('printing');
  const done = () => { document.body.classList.remove('printing'); pa.remove(); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  try { window.print(); } catch (e) { done(); flash('⚠ Stampa non disponibile qui: usa Condividi o Copia testo'); return; }
  setTimeout(() => { if (document.getElementById('printarea') && !document.hidden) { /* alcuni browser non emettono afterprint */ } }, 1500);
}
async function reportShare(copyOnly) {
  const text = reportText(reportData());
  if (!copyOnly && navigator.share) { try { await navigator.share({title: 'Storico allenamenti', text}); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
  try { await navigator.clipboard.writeText(text); flash('✓ Testo copiato: incollalo in un messaggio'); }
  catch (e) { modal(`<h2 style="padding-right:44px">Copia il testo</h2><textarea id="bk" readonly style="width:100%;height:50vh;font:12px monospace">${esc(text)}</textarea>`); $('#bk').select(); }
}
/* ---- icona personalizzata (foto scelta da te, salvata solo su questo dispositivo) ---- */
const LOGO_KEY = 'sks_logo', logoEl = document.querySelector('.logo'), LOGO_SVG = logoEl ? logoEl.innerHTML : '';
function curLogo() { let d = DB.logo || null; if (!d) { try { d = localStorage.getItem(LOGO_KEY); } catch (e) {} } return d; }
function applyLogo() {
  const d = curLogo();
  if (logoEl) { logoEl.style.backgroundImage = d ? `url("${d}")` : ''; logoEl.classList.toggle('ph', !!d); logoEl.innerHTML = d ? '' : LOGO_SVG; }
  document.querySelectorAll('link[rel=icon],link[rel=apple-touch-icon]').forEach(l => { if (!l.dataset.o) l.dataset.o = l.getAttribute('href'); l.setAttribute('href', d || l.dataset.o); if (d) l.removeAttribute('type'); });
  const pv = document.getElementById('logoprev'); if (pv) pv.innerHTML = d ? `<img src="${d}" alt="" width="64" height="64" style="border-radius:14px;object-fit:cover"> <span>Icona personalizzata attiva</span>` : '<span>Icona originale (manubrio)</span>';
}
function logoMsg(t) { const m = document.getElementById('logost'); if (m) m.textContent = t; flash(t); }
async function setLogo(file) {
  if (!file) return;
  let src = null, close = null;
  try { const bmp = await createImageBitmap(file); src = bmp; close = () => bmp.close && bmp.close(); } catch (e) {}
  if (!src) {
    src = await new Promise(res => { const img = new Image(), url = URL.createObjectURL(file); img.onload = () => { res(img); }; img.onerror = () => res(null); img.src = url; });
  }
  if (!src) { logoMsg('⚠ Non riesco a leggere questa immagine (formato non supportato?). Prova con una foto JPG o PNG.'); return; }
  const w = src.width, h = src.height, m = Math.min(w, h), c = document.createElement('canvas'); c.width = c.height = 192;
  c.getContext('2d').drawImage(src, (w - m) / 2, (h - m) / 2, m, m, 0, 0, 192, 192); if (close) close();
  const data = c.toDataURL('image/jpeg', .85);
  DB.logo = data; try { localStorage.setItem(LOGO_KEY, data); } catch (e) {}
  save(); applyLogo(); logoMsg('✓ Icona cambiata: la vedi in alto a sinistra');
}
applyLogo();
function settings() {
  setTimeout(applyLogo, 0);
  modal(`<h2 style="padding-right:44px">Dati e backup</h2>
   <div class="card"><p>I pesi si salvano a ogni modifica sul dispositivo e, se sei collegato, anche nel tuo spazio privato online. Esporta ogni tanto un backup.</p>
   <p><button class="ghost" data-act="export">⬇ Esporta backup</button> <button class="ghost" data-act="import">⬆ Importa backup</button></p>
   <input type="file" id="imp" accept="application/json" hidden></div>
   <div class="card"><h2>Icona dell'app</h2><p>Scegli una tua foto da usare come icona in alto e nella scheda del browser (viene ritagliata al centro in un quadrato). Si salva con i tuoi dati (anche nel backup). Attenzione: se usi l’app dalla schermata Home del telefono, scegli la foto DENTRO quell’app (su iPhone la Home e Safari hanno dati separati). L’icona sulla schermata Home cambia solo se ricrei il collegamento dopo averla scelta.</p>
   <div id="logoprev" class="logoprev"></div><p id="logost" class="vnote"></p>
   <p><button class="ghost" data-act="logopick">🖼 Scegli una foto</button> <button class="ghost" data-act="logoreset">↺ Icona originale</button></p><input type="file" id="logofile" accept="image/*" hidden></div>
   <div class="card"><h2>Video</h2><p>Elimina i video che hai aggiunto tu (file sul telefono e link) oppure togli i link ai video di riferimento (anche uno alla volta dentro ogni esercizio). Non tocca pesi e storico.</p>
   <p><button class="ghost danger" data-act="vwipe">🗑 Cancella tutti i miei video</button> <button class="ghost" data-act="vref">${DB.hideRef ? '👁 Mostra i video di riferimento' : '🙈 Togli tutti i video di riferimento'}</button>${DB.hideRef || Object.keys(DB.hiddenRef).length ? ' <button class="ghost" data-act="vrefall">↺ Ripristina i video tolti</button>' : ''}</p></div>
   <div class="card"><h2>Storico in PDF</h2><p>Crea un foglio con tutti gli esercizi, i chili e le ripetizioni fatte, da stampare, salvare in PDF o condividere.</p><p><button class="ghost" data-act="report">📄 Apri storico</button></p></div>
   <div class="card"><h2>Attrezzatura prevista</h2><p>Powerrack Atletica SKS con safety, bilanciere e dischi, manubri, panca regolabile con attacco leg extension, jammer arms, doppia puleggia (cavi alto/basso) con corda, barra dritta/V, maniglie singole e cavigliera, sbarra per trazioni, Smith machine (per le varianti guidate). Se manca qualcosa, nella Libreria filtra per attrezzo e sostituisci.</p></div>
   <div class="card"><h2>Crediti</h2><p style="font-size:14px">Modello 3D “Male base muscular anatomy” di Harshit Prajapati, licenza CC BY 4.0 (<a href="https://sketchfab.com/3d-models/male-base-muscular-anatomy-0954aa04666d45aab9633009318f7b66" target="_blank" rel="noopener">Sketchfab</a>). Le icone degli esercizi sono disegnate con lo stesso modello 3D.</p></div>
   <div class="card"><button class="ghost danger" data-act="wipe">Cancella tutti i pesi</button></div>`);
}

/* ---------- eventi ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act, k = b.dataset.k, i = +b.dataset.i;
  if (a === 'tab') go(b.dataset.id);
  else if (a === 'sub') { giuliaSub = b.dataset.id; render(); }
  else if (a === 'open') openEx(b.dataset.id);
  else if (a === 'objset') { const x = rtList(b.dataset.pid).find(v => v.e === b.dataset.id), ex = byId[b.dataset.id], p = presOf(ex, b.dataset.f);
    if (x && p) { x.obj = b.dataset.f; x.s = p.s; x.r = p.r; x.rec = p.rec; const c = curFor(pk(planOf(b.dataset.pid).profilo, x.e), p.s); while (c.sets.length > p.s && !c.sets[c.sets.length - 1].kg && !c.sets[c.sets.length - 1].reps) c.sets.pop(); save(); render(true); flash('Impostato per ' + FIN[x.obj].toLowerCase()); } }
  else if (a === 'mtog') pickRt(b.dataset.id);
  else if (a === 'rtpick') { toggleRt(b.dataset.r, b.dataset.id); $('#rtrows').innerHTML = pickRt.rows(); flash(inRt(b.dataset.r, b.dataset.id) ? '✓ Aggiunto' : 'Tolto'); }
  else if (a === 'mrm') { const id = b.dataset.id, pid = b.dataset.pid; ask('Togliere “' + byId[id].n + '” da questa scheda? I pesi già salvati restano nello storico.', 'Togli', () => { DB.rt[pid] = rtList(pid).filter(x => x.e !== id); save(); render(true); }); }
  else if (a === 'mup' || a === 'mdn') { const L = rtList(b.dataset.pid), j = L.findIndex(x => x.e === b.dataset.id), d = a === 'mup' ? -1 : 1; if (j >= 0 && L[j + d]) { [L[j], L[j + d]] = [L[j + d], L[j]]; save(); render(true); } }
  else if (a === 'chip') { (b.dataset.s === 'pk' ? pick : lib)[b.dataset.t] = b.dataset.v; render(true); }
  else if (a === 'ptoggle') { pick.open = !pick.open; render(true); }
  else if (a === 'ptog') { pick.open = true; toggleRt(b.dataset.r, b.dataset.id); flash(inRt(b.dataset.r, b.dataset.id) ? '✓ Aggiunto alla scheda' : 'Tolto dalla scheda'); render(true); }
  else if (a === 'ren') renameRt(b.dataset.id);
  else if (a === 'rensave') { const id = b.dataset.id; DB.names[id] = {n: $('#rn-n').value.trim(), m: $('#rn-m').value.trim()}; save(); closeModal(); render(true); }
  else if (a === 'renreset') { const id = b.dataset.id; delete DB.names[id]; save(); closeModal(); render(true); }
  else if (a === 'done') { const s = DB.cur[k].sets[i]; s.done = !s.done; save(); b.classList.toggle('on', s.done); refreshProgress(); }
  else if (a === 'addset' || a === 'delset') {
    const c = DB.cur[k], n = Math.max(1, c.sets.length + (a === 'addset' ? 1 : -1));
    if (a === 'delset') c.sets.length = n; else curFor(k, n);
    save(); const host = b.closest('.ex, #mbody'); const holder = host.querySelector('[data-sets]');
    const tgt = b.closest('.ex') ? (planFind(k)?.r || '') : '';
    const tmp = document.createElement('div'); tmp.innerHTML = setsHtml(k, n, tgt);
    holder.replaceWith(tmp.querySelector('[data-sets]')); const sb = b.closest('.sbar'); sb.querySelectorAll('button').forEach(x => x.dataset.n = n);
    const pre = host.querySelector('.presc b'); if (pre) { const sp = pre.querySelector('.n'); if (sp) sp.textContent = n; else pre.textContent = n + ' × ' + (planFind(k)?.r || ''); } refreshProgress();
  }
  else if (a === 'vdel') { const id = b.dataset.id, key = b.dataset.k, root = b.closest('.tb, #mbody') || document; const x = (DB.myv[id] || []).find(v => v.k === key);
    DB.myv[id] = (DB.myv[id] || []).filter(v => v.k !== key); save(); (x && x.t === 'f' ? VDB.del(key).catch(() => {}) : Promise.resolve()).then(() => { flash('Video rimosso'); loadMine(root); }); }
  else if (a === 'vurl') { const id = b.dataset.id, inp = b.parentElement.querySelector('.vurlin'); let u = inp.value.trim(); if (!u) { flash('Incolla prima un link'); return; }
    if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) u = 'https://' + u; let p; try { p = new URL(u); } catch (e) { p = null; }
    if (!p || !/^https?:$/.test(p.protocol) || !p.hostname.includes('.')) { flash('⚠ Link non valido'); return; }
    (DB.myv[id] = DB.myv[id] || []).push({t: 'u', k: 'u' + Date.now(), u: p.href, n: p.hostname.replace(/^www\./, '')}); save(); inp.value = ''; flash('✓ Link aggiunto'); loadMine(b.closest('.tb, #mbody') || document); }
  else if (a === 'hist') histView(k);
  else if (a === 'finish') finish(b.dataset.p, b.dataset.prof);
  else if (a === 'export') exportData();
  else if (a === 'vwipe') { const n = Object.values(DB.myv).reduce((t, l) => t + (Array.isArray(l) ? l.length : 0), 0);
    ask(n ? 'Cancellare tutti i tuoi ' + n + ' video (file e link)? Non si può annullare.' : 'Cancellare tutti i video salvati su questo dispositivo? Non si può annullare.', 'Cancella tutto', async () => { try { await VDB.clear(); } catch (e) {} DB.myv = {}; save(); flash('✓ Tutti i tuoi video sono stati cancellati'); render(true); }); }
  else if (a === 'vrefdel') { const box = b.closest('.vbox'), id = box.dataset.vid, root = box.parentElement; DB.hiddenRef[b.dataset.u] = 1; save(); box.outerHTML = videoBlock(byId[id]); loadMine(root); flash('Video tolto'); }
  else if (a === 'vrefall') { DB.hideRef = false; DB.hiddenRef = {}; save(); flash('Video di riferimento ripristinati'); settings(); }
  else if (a === 'vref') { DB.hideRef = !DB.hideRef; save(); flash(DB.hideRef ? 'Video di riferimento nascosti' : 'Video di riferimento visibili'); settings(); }
  else if (a === 'logopick') { const f = $('#logofile'); f.onchange = () => setLogo(f.files[0]); f.click(); }
  else if (a === 'logoreset') { delete DB.logo; try { localStorage.removeItem(LOGO_KEY); } catch (e) {} save(); applyLogo(); logoMsg('Icona originale ripristinata'); }
  else if (a === 'report') reportView();
  else if (a === 'rprint') reportPrint();
  else if (a === 'rshare') reportShare(false);
  else if (a === 'rcopy') reportShare(true);
  else if (a === 'import') { const f = $('#imp'); f.onchange = () => importData(f.files[0]); f.click(); }
  else if (a === 'wipe') ask('Cancellare TUTTI i pesi e lo storico? Non si può annullare.', 'Cancella tutto', () => { DB = fixDB({cur: {}, hist: {}, rt: DB.rt, names: DB.names, myv: DB.myv, hideRef: DB.hideRef, hiddenRef: DB.hiddenRef, logo: DB.logo, v: 3}); save(); render(); })
});
$('#cfg').onclick = settings;
document.addEventListener('change', async e => {
  const t = e.target; if (!t.dataset || !t.dataset.vfile) return; const f = t.files && t.files[0]; if (!f) return;
  if (f.size > 400 * 1024 * 1024) { flash('⚠ Video troppo grande (max 400 MB)'); return; }
  try { const key = t.dataset.vfile + '#' + Date.now(); await VDB.set(key, f); (DB.myv[t.dataset.vfile] = DB.myv[t.dataset.vfile] || []).push({t: 'f', k: key, n: f.name.slice(0, 40)}); save(); flash('✓ Video salvato sul dispositivo'); t.value = ''; } catch (err) { flash('⚠ Non riesco a salvare il video'); }
  loadMine(t.closest('.tb, #mbody') || document);
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('vurlin')) { e.preventDefault(); e.target.parentElement.querySelector('[data-act=vurl]').click(); } });
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'pq') { pick.q = t.value; const pos = t.selectionStart; render(true); const q = $('#pq'); q.focus(); q.setSelectionRange(pos, pos); return; }
  if (t.id === 'q') { lib.q = t.value; const pos = t.selectionStart; render(true); const q = $('#q'); q.focus(); q.setSelectionRange(pos, pos); return; }
  if (t.dataset.mf) { const x = rtList(t.dataset.pid).find(m => m.e === t.dataset.id); if (x) { x[t.dataset.mf] = t.value.slice(0, 12); save(); } return; }
  if (t.dataset.f) { const s = DB.cur[t.dataset.k].sets[+t.dataset.i]; s[t.dataset.f] = t.value.replace(/[^\d.,]/g, ''); if (t.value !== s[t.dataset.f]) t.value = s[t.dataset.f]; save(); }
});
document.addEventListener('toggle', e => {
  const d = e.target; if (!d.matches || !d.matches('details.tech') || !d.open) return;
  document.querySelectorAll('details.tech[open]').forEach(o => { if (o !== d) o.open = false; });
  const f = d.querySelector('[data-fig]'); if (f) FIG3.mount(f, byId[f.dataset.fig], FIG.mount);
  loadMine(d);
}, true);

function planFind(k) { const [prof, id] = k.split(':'); if (prof !== 'giulia') { for (const r of (prof === 'mia' ? ['mia'] : ['g1', 'g2', 'g3', 'g4'])) { const x = rtList(r).find(x => x.e === id); if (x) return x; } return null; } const ps = PLAN.filter(p => (p.profilo || 'io') === prof); for (const p of ps) { const x = p.ex.find(x => x.e === id); if (x) return x; } return null; }
function refreshProgress() {
  const p = planOf(tabPlan(tab)); if (!p) return;
  const prof = p.profilo || 'io'; let tot = 0, dn = 0;
  p.ex.forEach(x => { const c = DB.cur[pk(prof, x.e)]; if (c) { tot += c.sets.length; dn += c.sets.filter(s => s.done).length; } });
  const bar = document.querySelector('.prog i'); if (bar) { bar.style.width = (tot ? Math.round(dn / tot * 100) : 0) + '%'; bar.parentElement.nextElementSibling.textContent = dn + '/' + tot + ' serie completate'; }
  p.ex.forEach((x, i) => { const c = DB.cur[pk(prof, x.e)]; const n = document.querySelector('#c-' + pk(prof, x.e).replace(':', '-') + ' .num'); if (n && c) n.classList.toggle('done', c.sets.every(s => s.done)); });
}
function finish(pid, prof) {
  const p = planOf(pid); let n = 0;
  p.ex.forEach(x => {
    const k = pk(prof, x.e), c = DB.cur[k]; if (!c) return;
    const sets = c.sets.filter(s => s.kg || s.reps).map(s => ({kg: s.kg, reps: s.reps}));
    if (!sets.length) return;
    (DB.hist[k] = DB.hist[k] || []).push({d: today(), sets}); n++;
    c.sets.forEach(s => { s.done = false; s.reps = ''; });
  });
  if (!n) { flash('Compila almeno una serie'); return; }
  save(); render(true); flash('✓ Allenamento archiviato (' + n + ' esercizi)');
}
async function exportData() {
  const txt = JSON.stringify(DB, null, 1), name = 'allenamento-backup-' + today() + '.json';
  try { const d = window.claude && claude.use && await claude.use('downloads'); if (d) { await d.save({filename: name, data: txt}); return; } } catch (e) { if (e && e.code === 'declined') return; }
  try {
    if (!window.claude) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], {type: 'application/json'})); a.download = name; a.click(); return; }
  } catch (e) {}
  modal(`<h2 style="padding-right:44px">Backup</h2><p>Copia questo testo e conservalo: per ripristinare salvalo in un file .json e usa “Importa backup”.</p><textarea id="bk" readonly style="width:100%;height:40vh;font:12px monospace">${esc(txt)}</textarea>`);
  $('#bk').select();
}
function importData(f) {
  if (!f) return; const r = new FileReader();
  r.onload = () => { try { const d = JSON.parse(r.result); if (!d.cur || !d.hist) throw 0; fixDB(d); const go2 = () => { DB = d; save(); render(); }; ask('Sostituire i dati attuali con il backup?', 'Sostituisci', go2); } catch (e) { flash('⚠ File non valido'); } };
  r.readAsText(f);
}

window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (h !== tab && TABS.some(t => t.id === h)) { tab = h; render(); } });
render();
initCloud();
if (!window.claude && 'serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
