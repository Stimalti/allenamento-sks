/* App allenamento — tutto locale: i pesi si salvano nel telefono (localStorage) a ogni modifica. */
(() => {
const KEY = 'sks_allenamento_v1', APPV = (document.querySelector('script[src*="app.js"]') || {src: ''}).src.replace(/.*v=/, '') || 'artifact';
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
  iso: {forza: {s: 4, sr: '3-4', r: '5-8', rec: '2-3 min', pct: '80-85%', p: .82, rir: '1-2'}, massa: {s: 3, sr: '3-4', r: '10-15', rec: '60-90 s', pct: '60-70%', p: .65, rir: '0-2'}, tonificare: {s: 3, sr: '2-3', r: '15-20', rec: '30-45 s', pct: '40-55%', p: .48, rir: '2-3'}},
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
const lib = {q: '', g: '', a: '', f: '', l: ''};
const LATO = {uno: 'A un braccio / una gamba', due: 'A due braccia / due gambe'};
const latoOf = e => e.one ? 'uno' : 'due';
const latoTxt = e => e.one ? (e.g === 'gambe' ? 'una gamba' : 'un braccio') : (e.g === 'gambe' || e.g === 'addome' ? '' : 'due braccia');

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
  ${ex.alt && byId[ex.alt] ? `<p class="altc">🔁 Serve una sola torre? <button class="tlink" data-act="open" data-id="${ex.alt}">${esc(byId[ex.alt].n)}</button> (un cavo e una maniglia)</p>` : ''}
  ${ex.trj ? `<h3>Traiettoria</h3><p>${esc(ex.trj)}</p>` : ''}
  ${videoBlock(ex)}
  <h3>Muscoli</h3><p>${esc(ex.m)}</p>${ex.mm && ex.mm !== ex.m ? `<p class="vnote">Nel dettaglio: ${esc(ex.mm)}.</p>` : ''}
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
   <div class="prog"><i style="width:${tot ? Math.round(dn / tot * 100) : 0}%"></i></div><div class="progt">${dn}/${tot} serie completate · <button class="tlink" data-act="tmopen">⏱ Timer recupero</button></div></section>
   ${p.custom ? custTools(p) : ''}
   ${p.ex.map((x, i) => exCard(x, i, prof, p)).join('')}
   ${p.custom ? '<button class="ghost addmore" data-act="ptoggle" onclick="setTimeout(()=>window.scrollTo(0,0),30)">+ Aggiungi altri esercizi</button>' : ''}
   <button class="primary" data-act="finish" data-p="${p.id}" data-prof="${prof}">Fine allenamento · salva nello storico</button>`;
}

const pick = {open: false, q: '', g: '', a: '', f: '', l: ''};
const filt = st => { const q = norm(st.q).split(/\s+/).filter(Boolean);
  return EX.filter(e => { if (st.g && e.g !== st.g) return false; if (st.a && e.a !== st.a) return false; if (st.f && !(e.fin || []).includes(st.f)) return false; if (st.l && latoOf(e) !== st.l) return false;
    const hay = norm([e.n, e.g, GRUPPI[e.g], e.a, e.m, e.mm || '', e.cue, e.why, e.set, e.fin ? e.fin.join(' ') : ''].join(' ')); return q.every(t => hay.includes(t)); }); };
const exRow = (e, act, rid) => { const on = rid ? inRt(rid, e.id) : inAny(e.id);
  return `<div class="lw"><button class="li" style="--gc:${GCOL[e.g]}" data-act="open" data-id="${e.id}">${cov(e.id, 'thumb') || `<span class="dot">${esc(GRUPPI[e.g][0])}</span>`}<span class="t"><b>${esc(e.n)}</b><small>${esc(GRUPPI[e.g])} · ${esc(e.m.split(',')[0])}${e.fin ? ' · ' + e.fin.map(f => FIN[f]).join('/') : ''}${latoTxt(e) ? ' · ' + latoTxt(e) : ''}${e.due ? ' · 2 cavi' : e.unCavo ? ' · 1 cavo' : ''}</small></span>${e.a === 'Cavi' ? '<span class="tag cav">Cavi</span>' : `<span class="tag" style="background:var(--in);color:var(--mut)">${esc(e.a)}</span>`}</button><button class="add ${on ? 'on' : ''}" data-act="${act}" data-id="${e.id}"${rid ? ` data-r="${rid}"` : ''} aria-label="${on ? 'Togli' : 'Aggiungi'}">${on ? '✓' : '+'}</button></div>`; };
function filters(st, sid, qid) {
  const atts = [...new Set(EX.map(e => e.a))];
  return `<input class="search" id="${qid}" type="search" placeholder="Cerca: es. tricipiti, cavo alto, squat…" value="${esc(st.q)}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="search">
  <div class="chips">${chip('g', '', 'Tutti i muscoli', sid)}${Object.entries(GRUPPI).map(([k, v]) => chip('g', k, v, sid)).join('')}</div>
  <div class="chips">${chip('f', '', 'Ogni obiettivo', sid)}${Object.entries(FIN).map(([k, v]) => chip('f', k, v === 'Tonificare' ? 'Per tonificare' : v === 'Forza' ? 'Per la forza' : 'Per la massa', sid)).join('')}</div>
  <div class="chips">${chip('l', '', 'Un braccio o due', sid)}${Object.entries(LATO).map(([k, v]) => chip('l', k, v, sid)).join('')}</div>
  <div class="chips">${chip('a', '', 'Ogni attrezzo', sid)}${atts.map(a => chip('a', a, a, sid)).join('')}</div>`;
}
const libRes = () => { const list = filt(lib); return `<div class="count">${list.length} di ${EX.length} esercizi</div>
  <div id="list">${list.map(e => exRow(e, 'mtog')).join('') || '<p class="count">Nessun risultato.</p>'}</div>`; };
function libView() { return `${filters(lib, 'lib', 'q')}<div id="libres">${libRes()}</div>`; }
const pickRes = pid => { const list = filt(pick); return `<div class="count">${list.length} di ${EX.length} esercizi</div>${list.map(e => exRow(e, 'ptog', pid)).join('') || '<p class="count">Nessun risultato.</p>'}`; };
const custView = cp => cp.ex.length ? planView(cp, cp.profilo) : `<section class="hero"><div class="eyebrow">Allenamento</div><h2>${esc(cp.nome)}</h2><div class="sub">${esc(cp.sotto)}</div><p>Scheda vuota: scegli il muscolo e l'attrezzo qui sotto e tocca + sugli esercizi che vuoi fare. Puoi anche rinominarla (es. “Pausa”).</p></section>${custTools(cp)}`;
function custTools(cp) {
  const open = pick.open || !cp.ex.length, list = open ? filt(pick) : [];
  return `<div class="ctools"><button class="ghost" data-act="ren" data-id="${cp.id}">✏ Rinomina scheda</button><button class="ghost" data-act="ptoggle">${open && cp.ex.length ? '▲ Chiudi elenco' : '＋ Aggiungi esercizi'}</button><button class="ghost" data-act="week">📅 Piano della settimana</button><button class="ghost" data-act="wiz" data-pid="${cp.id}">✨ Proponimi esercizi</button></div>` +
    (open ? `<section class="picker"><h3>Scegli muscolo e attrezzo, poi tocca + per aggiungere</h3>${filters(pick, 'pk', 'pq')}<div id="pkres" data-pid="${cp.id}">${pickRes(cp.id)}</div></section>` : '');
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
/* ---------- piano della settimana ---------- */
function weekData() {
  return DAYS.map(([tid, , full]) => { const p = planOf(tabPlan(tid));
    return {name: p.nome + (p.sotto ? ' · ' + p.sotto : ''), day: full, rows: p.ex.map(x => { const ex = byId[x.e], c = DB.cur[pk(p.profilo, x.e)], kgs = c ? c.sets.map(s => s.kg).filter(Boolean) : [], h = lastHist(pk(p.profilo, x.e));
      const kg = kgs.length ? kgs.join(' / ') : (h ? h.sets.map(s => s.kg).filter(Boolean).join(' / ') : '');
      return {n: ex.n, t: (c ? c.sets.length : x.s) + ' × ' + x.r + (x.rec ? ' · rec. ' + x.rec : '') + (kg ? ' · ' + kg + ' kg' : ''), obj: x.obj ? FIN[x.obj] : ''}; })}; });
}
const weekHtml = () => weekData().map(d => `<section class="rp"><h3>${esc(d.day)} <small>${d.name === d.day ? '' : esc(d.name)}</small></h3>${d.rows.length ? `<table>${d.rows.map(r => `<tr><td>${esc(r.n)}${r.obj ? ` <small>(${esc(r.obj)})</small>` : ''}</td><td>${esc(r.t)}</td></tr>`).join('')}</table>` : '<p class="vnote">Riposo / nessun esercizio.</p>'}</section>`).join('');
const weekText = () => 'PIANO SETTIMANALE\n' + weekData().map(d => '\n' + d.day.toUpperCase() + (d.name === d.day ? '' : ' (' + d.name + ')') + '\n' + (d.rows.length ? d.rows.map(r => '  - ' + r.n + ': ' + r.t).join('\n') : '  riposo')).join('\n');
function weekView() {
  modal(`<h2 style="padding-right:44px">Piano della settimana</h2>
   <div class="sbar" style="padding:0 0 10px"><button class="ghost" data-act="wprint">🖨 Stampa / Salva PDF</button><button class="ghost" data-act="wshare">📤 Condividi</button></div>
   <p class="vnote" style="margin:0 0 10px">Esercizi, serie, ripetizioni e pesi di ogni giorno. Restano salvati finché non li modifichi tu.</p><div class="rpbox" style="max-height:55vh">${weekHtml()}</div>`);
}
function printHtml(title, html) {
  const pa = document.createElement('div'); pa.id = 'printarea';
  pa.innerHTML = `<h1>${esc(title)}</h1><p>Aggiornato al ${fmtFull(today())}</p>` + html;
  document.body.appendChild(pa); document.body.classList.add('printing');
  const done = () => { document.body.classList.remove('printing'); pa.remove(); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  try { window.print(); } catch (e) { done(); flash('⚠ Stampa non disponibile qui: usa Condividi'); }
}
async function shareText(title, text) {
  if (navigator.share) { try { await navigator.share({title, text}); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
  try { await navigator.clipboard.writeText(text); flash('✓ Testo copiato: incollalo in un messaggio'); }
  catch (e) { modal(`<h2 style="padding-right:44px">Copia il testo</h2><textarea id="bk" readonly style="width:100%;height:50vh;font:12px monospace">${esc(text)}</textarea>`); $('#bk').select(); }
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
  const pv = document.getElementById('logoprev'); if (pv) pv.innerHTML = d ? `<img src="${d}" alt="" width="64" height="64" style="border-radius:14px;object-fit:cover"> <span>Foto profilo personalizzata attiva</span>` : '<span>Foto originale (manubrio)</span>';
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
  c.getContext('2d').drawImage(src, (w - m) / 2, (h - m) / 2, m, m, 0, 0, 192, 192);
  const data = c.toDataURL('image/jpeg', .85);
  DB.logo = data; try { localStorage.setItem(LOGO_KEY, data); } catch (e) {}
  if (close) close();
  save(); applyLogo(); logoMsg('✓ Foto profilo cambiata: la vedi in alto a sinistra');
}
applyLogo();
/* ---------- proposta automatica di esercizi ---------- */
const WZ = {step: 1, att: [], mus: [], fin: 'massa', lato: '', pid: null, keep: [], rejected: [], cur: []};
const ATT_ALL = () => [...new Set(EX.map(e => e.a))];
const mkey = e => e.g + '|' + norm(e.m.split(',')[0].trim());
const station = e => { if (e.eq !== 'cable') return e.a; const an = e.an ? (Array.isArray(e.an[0]) ? e.an[0] : e.an) : null, y = an ? an[1] : 100; const att = /corda/i.test(e.set) ? 'corda' : /barra|triangolo|V\b/i.test(e.set) ? 'barra' : /cavigliera/i.test(e.set) ? 'cavigliera' : 'maniglia'; return 'Cavi ' + (y < 60 ? 'alto' : y > 160 ? 'basso' : 'medio') + ' ' + att; };
// esercizi "prioritari" (dal video sulle prese ai cavi): proposti per primi quando si chiede schiena o spalle ai cavi; si possono comunque togliere con "Altra proposta"
const wizPrio = e => !!e.prio && (!WZ.att.length || WZ.att.includes('Cavi')) && (!WZ.mus.length || WZ.mus.includes('schiena'));
// spalle ai cavi: prima gli esercizi con un solo cavo e due mani (corda, barra, maniglia doppia)
const wizPrioSp = e => e.g === 'spalle' && e.eq === 'cable' && !!e.unCavo && !e.one && WZ.mus.includes('spalle') && (!WZ.att.length || WZ.att.includes('Cavi'));
function wizPool() {
  return EX.filter(e => (wizPrio(e) || ((!WZ.att.length || WZ.att.includes(e.a)) && (!WZ.mus.length || WZ.mus.includes(e.g)))) && (e.fin || []).includes(WZ.fin) && (!WZ.lato || latoOf(e) === WZ.lato) && !WZ.rejected.includes(e.id) && !WZ.keep.includes(e.id));
}
function wizPropose() {
  const want = Math.min(4, Math.max(3, WZ.mus.length + 1)), out = WZ.keep.map(id => byId[id]);
  let pool = wizPool().filter(e => !out.some(o => mkey(o) === mkey(e)));
  if (!pool.length && WZ.rejected.length) { WZ.rejected = []; pool = wizPool().filter(e => !out.some(o => mkey(o) === mkey(e))); }
  const covered = new Set(out.map(e => e.g));
  while (out.length < want && pool.length) {
    const sc = e => { let s = Math.random() * .6; if (out.length) { const last = out[out.length - 1]; if (station(e) === station(last)) s += 3; else if (e.a === last.a) s += 1.6; if (out.some(o => station(o) === station(e))) s += .8; }
      if (!covered.has(e.g) && WZ.mus.length > 1) s += 2.2; if (e.tipo === 'comp') s += .7; if (e.due) s -= 2.5; if (e.unCavo) s += .6; if (wizPrio(e)) s += 100; if (wizPrioSp(e)) s += 50; return s; };
    pool.sort((a, b) => sc(b) - sc(a)); const pick = pool.shift(); out.push(pick); covered.add(pick.g); pool = pool.filter(e => mkey(e) !== mkey(pick));
  }
  WZ.cur = out.map(e => e.id); return out;
}
function wizHtml() {
  const chip2 = (t, v, on, l) => `<button class="chip ${on ? 'on' : ''}" data-act="wzchip" data-t="${t}" data-v="${esc(v)}">${esc(l)}</button>`;
  if (WZ.step === 1) return `<h2 style="padding-right:44px">✨ Proponimi esercizi</h2>
    <p class="vnote">Scegli attrezzi, muscoli e obiettivo: ti propongo 3-4 esercizi che si fanno bene di seguito (stesso attrezzo o stessa postazione).</p>
    <h3>Attrezzi</h3><div class="chips wrap">${chip2('att', '', !WZ.att.length, 'Tutti')}${ATT_ALL().map(a => chip2('att', a, WZ.att.includes(a), a)).join('')}</div>
    <h3>Muscoli</h3><div class="chips wrap">${chip2('mus', '', !WZ.mus.length, 'Tutti')}${Object.entries(GRUPPI).map(([k, v]) => chip2('mus', k, WZ.mus.includes(k), v)).join('')}</div>
    <h3>Obiettivo</h3><div class="chips wrap">${Object.entries(FIN).map(([k, v]) => chip2('fin', k, WZ.fin === k, v)).join('')}</div>
    <h3>Un braccio o due</h3><div class="chips wrap">${chip2('lato', '', !WZ.lato, 'Indifferente')}${Object.entries(LATO).map(([k, v]) => chip2('lato', k, WZ.lato === k, v)).join('')}</div>
    <p class="vnote">${wizPool().length} esercizi disponibili con questa scelta.</p>
    <div class="sbar" style="padding:8px 0 0"><button class="primary" style="width:auto;padding:10px 18px" data-act="wzgo" ${wizPool().length ? '' : 'disabled'}>Proponi</button></div>`;
  const list = WZ.cur.map(id => byId[id]);
  const day = id => { const p = planOf(id); return p.nome + (p.sotto ? ' · ' + p.sotto : ''); };
  return `<h2 style="padding-right:44px">Proposta</h2>
    <p class="vnote">Spunta quelli che vuoi tenere. “Altra proposta” cambia solo quelli non spuntati.</p>
    ${list.map(e => `<label class="wzrow ${WZ.keep.includes(e.id) ? 'on' : ''}"><input type="checkbox" data-act="wzkeep" data-id="${e.id}" ${WZ.keep.includes(e.id) ? 'checked' : ''}>${cov(e.id, 'thumb') || ''}<span class="t"><b>${esc(e.n)}</b><small>${wizPrio(e) ? '⭐ dai tuoi video (schiena ai cavi) · ' : wizPrioSp(e) ? '⭐ un cavo, due mani · ' : ''}${esc(GRUPPI[e.g])} · ${esc(station(e))}${latoTxt(e) ? ' · ' + latoTxt(e) : ''}${presOf(e, WZ.fin) ? ' · ' + presOf(e, WZ.fin).sr + ' × ' + presOf(e, WZ.fin).r : ''}</small></span><button class="ghost" data-act="open" data-id="${e.id}" style="padding:6px 10px">3D</button></label>`).join('')}
    <div class="sbar" style="padding:10px 0 4px"><button class="ghost" data-act="wzagain">🔄 Altra proposta</button><button class="ghost" data-act="wzback">← Cambia scelta</button></div>
    <h3>In quale giorno?</h3><div class="chips wrap">${CUST.map(id => `<button class="chip ${WZ.pid === id ? 'on' : ''}" data-act="wzday" data-id="${id}">${esc(day(id))}</button>`).join('')}</div>
    <div class="sbar" style="padding:8px 0 0"><button class="primary" style="width:auto;padding:10px 18px" data-act="wzadd" ${WZ.keep.length && WZ.pid ? '' : 'disabled'}>Aggiungi ${WZ.keep.length || ''} a ${WZ.pid ? esc(planOf(WZ.pid).nome) : '…'}</button></div>`;
}
function wizOpen(pid) { WZ.step = 1; WZ.pid = pid || WZ.pid; WZ.keep = []; WZ.rejected = []; WZ.cur = []; modal(wizHtml()); }
function wizRender() { $('#mbody').innerHTML = wizHtml(); }
function wizAdd() {
  const L = rtList(WZ.pid), added = [], removed = [];
  WZ.keep.forEach(id => { const e = byId[id];
    L.slice().forEach(x => { const o = byId[x.e]; if (o && o.id !== id && mkey(o) === mkey(e) && !WZ.keep.includes(o.id)) { removed.push(o.n); L.splice(L.indexOf(x), 1); } });
    if (!L.some(x => x.e === id)) { const p = presOf(e, WZ.fin) || {s: 3, r: '8-12', rec: '90 s'}; L.push({e: id, s: p.s, r: p.r, rec: p.rec, obj: presOf(e, WZ.fin) ? WZ.fin : undefined}); added.push(e.n); } });
  save(); closeModal(); go(WZ.pid === 'gA' ? 'giulia' : WZ.pid);
  const msg = `<h2 style="padding-right:44px">Fatto</h2><p><b>Aggiunti a ${esc(planOf(WZ.pid).nome)}:</b></p><ul>${added.map(n => `<li>${esc(n)}</li>`).join('') || '<li>nessuno (erano già presenti)</li>'}</ul>${removed.length ? `<p><b>Tolti perché lavorano esattamente gli stessi muscoli:</b></p><ul>${removed.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}<p class="vnote">Serie, ripetizioni e recupero sono impostati per l’obiettivo “${esc(FIN[WZ.fin])}”. Puoi cambiarli nella scheda.</p>`;
  setTimeout(() => modal(msg), 50);
}
/* ---------- timer di recupero ---------- */
const TM = {end: 0, left: 0, total: 90, run: false, iv: null, ac: null, last: 90};
try { const t = JSON.parse(localStorage.getItem('sks_timer') || 'null'); if (t && t.end > Date.now()) { TM.end = t.end; TM.total = t.total; TM.run = true; } if (t && t.last) TM.last = t.last; } catch (e) {}
const tmSave = () => { try { localStorage.setItem('sks_timer', JSON.stringify({end: TM.run ? TM.end : 0, total: TM.total, last: TM.last})); } catch (e) {} };
const tmFmt = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
function tmAudio() { try { if (!TM.ac) TM.ac = new (window.AudioContext || window.webkitAudioContext)(); if (TM.ac.state === 'suspended') TM.ac.resume(); } catch (e) {} }
function tmBeep(n, f) { // n bip da 0.18 s, frequenza f
  tmAudio(); if (!TM.ac) return; const ac = TM.ac, t0 = ac.currentTime;
  for (let i = 0; i < n; i++) { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'square'; o.frequency.value = f || 880; g.gain.setValueAtTime(0.0001, t0 + i * .3); g.gain.exponentialRampToValueAtTime(.35, t0 + i * .3 + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + i * .3 + .2); o.connect(g); g.connect(ac.destination); o.start(t0 + i * .3); o.stop(t0 + i * .3 + .22); }
  try { if (navigator.vibrate) navigator.vibrate(n === 1 ? 60 : [200, 100, 200, 100, 400]); } catch (e) {}
}
function tmEl() { let el = document.getElementById('timer'); if (el) return el;
  el = document.createElement('div'); el.id = 'timer'; el.innerHTML = `<div class="tbar"><i></i></div><div class="trow"><button data-act="tmadj" data-d="-30" aria-label="meno 30 secondi">−30</button><b class="tclock">0:00</b><button data-act="tmadj" data-d="30" aria-label="più 30 secondi">+30</button><button class="tplay" data-act="tmplay" aria-label="pausa / riprendi">⏸</button><button data-act="tmclose" aria-label="chiudi timer">✕</button></div><div class="tpre">${[60, 90, 120, 180].map(x => `<button data-act="tmset" data-s="${x}">${tmFmt(x)}</button>`).join('')}<span>recupero</span></div>`;
  document.body.appendChild(el); return el; }
function tmStart(sec, label) { tmAudio(); TM.total = Math.max(5, Math.round(sec)); TM.last = TM.total; TM.end = Date.now() + TM.total * 1000; TM.run = true; TM.done = false; tmShow(); tmSave(); if (label) flash('⏱ Recupero ' + tmFmt(TM.total) + (label ? ' · ' + label : '')); }
function tmShow() { const el = tmEl(); el.hidden = false; document.body.classList.add('has-timer'); if (!TM.iv) TM.iv = setInterval(tmTick, 250); tmTick(); }
function tmHide() { const el = document.getElementById('timer'); if (el) el.hidden = true; document.body.classList.remove('has-timer'); TM.run = false; if (TM.iv) { clearInterval(TM.iv); TM.iv = null; } tmSave(); }
function tmTick() {
  const el = document.getElementById('timer'); if (!el) return;
  const left = TM.run ? (TM.end - Date.now()) / 1000 : TM.left;
  el.querySelector('.tclock').textContent = tmFmt(left); el.querySelector('.tbar i').style.width = Math.max(0, Math.min(100, left / TM.total * 100)) + '%';
  el.querySelector('.tplay').textContent = TM.run ? '⏸' : '▶'; el.classList.toggle('warn', left <= 10 && left > 0); el.classList.toggle('over', left <= 0);
  if (TM.run && left <= 10.2 && left > 9.8 && !TM.pre) { TM.pre = true; tmBeep(1, 660); }
  if (TM.run && left <= 0 && !TM.done) { TM.done = true; TM.run = false; TM.left = 0; tmBeep(3, 1046); flash('⏱ Recupero finito: via con la prossima serie!'); tmSave(); setTimeout(() => { if (!TM.run && document.getElementById('timer') && !document.getElementById('timer').hidden && TM.left <= 0) tmHide(); }, 15000); }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden && TM.run) tmTick(); });
if (TM.run) setTimeout(tmShow, 50);
function settings() {
  setTimeout(applyLogo, 0);
  modal(`<h2 style="padding-right:44px">Dati e backup</h2>
   <div class="card"><p>I pesi si salvano a ogni modifica sul dispositivo e, se sei collegato, anche nel tuo spazio privato online. Esporta ogni tanto un backup.</p>
   <p><button class="ghost" data-act="export">⬇ Esporta backup</button> <button class="ghost" data-act="exportfull">⬇ Backup completo con video</button> <button class="ghost" data-act="import">⬆ Importa backup</button></p>
   <p class="vnote">Il backup normale contiene pesi, storico, schede, foto profilo e link ai video. Quello completo include anche i video caricati dal telefono (file grande: va bene fino a circa 250 MB di video). L’importazione riconosce entrambi.</p>
   <input type="file" id="imp" accept="application/json" hidden></div>
   <div class="card"><h2>Foto profilo</h2><p>Scegli una foto da mostrare in alto a sinistra nell'app (viene ritagliata al centro in un quadrato). Si salva con i tuoi dati e nel backup. L'icona dell'app sulla schermata Home non cambia.</p>
   <div id="logoprev" class="logoprev"></div><p id="logost" class="vnote"></p>
   <p><button class="ghost" data-act="logopick">🖼 Scegli la foto profilo</button> <button class="ghost" data-act="logoreset">↺ Foto originale</button></p><input type="file" id="logofile" accept="image/*" hidden></div>
   <div class="card"><h2>Stato</h2><p class="vnote">Versione app ${APPV} · esercizi: ${EX.length} · video di riferimento disponibili: ${Object.values(typeof VIDEOS !== 'undefined' ? VIDEOS : {}).reduce((t, l) => t + l.length, 0)} link su ${Object.keys(typeof VIDEOS !== 'undefined' ? VIDEOS : {}).length} esercizi · ${DB.hideRef ? '<b style="color:#d33">tutti nascosti</b>' : 'nascosti: ' + Object.keys(DB.hiddenRef).length} · tuoi video: ${Object.values(DB.myv).reduce((t, l) => t + (Array.isArray(l) ? l.length : 0), 0)}</p>
   ${DB.hideRef || Object.keys(DB.hiddenRef).length ? '<p><button class="primary" style="width:auto;padding:10px 16px" data-act="vrefall">👁 Mostra tutti i video di riferimento</button></p>' : ''}</div>
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
  else if (a === 'done') { const s = DB.cur[k].sets[i]; s.done = !s.done; save(); b.classList.toggle('on', s.done); refreshProgress();
    if (s.done) { const x = planFind(k), ex = byId[k.split(':')[1]]; tmStart(x ? secs(x.rec) : 90, ex ? ex.n.split(' (')[0] : ''); } }
  else if (a === 'tmadj') { const d = +b.dataset.d; if (TM.run) TM.end += d * 1000; else TM.left = Math.max(0, TM.left + d); TM.total = Math.max(TM.total, TM.run ? (TM.end - Date.now()) / 1000 : TM.left); if (TM.run && TM.end - Date.now() > 10500) TM.pre = false; tmTick(); tmSave(); }
  else if (a === 'tmplay') { tmAudio(); if (TM.run) { TM.left = Math.max(0, (TM.end - Date.now()) / 1000); TM.run = false; } else { if (TM.left <= 0) TM.left = TM.last || 90; TM.end = Date.now() + TM.left * 1000; TM.run = true; TM.done = false; TM.pre = TM.left <= 10; } tmTick(); tmSave(); }
  else if (a === 'tmset') { TM.pre = false; tmStart(+b.dataset.s); }
  else if (a === 'tmclose') tmHide();
  else if (a === 'tmopen') { tmAudio(); TM.pre = false; tmStart(TM.last || 90); }
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
  else if (a === 'export') exportData(false);
  else if (a === 'exportfull') exportData(true);
  else if (a === 'vwipe') { const n = Object.values(DB.myv).reduce((t, l) => t + (Array.isArray(l) ? l.length : 0), 0);
    ask(n ? 'Cancellare tutti i tuoi ' + n + ' video (file e link)? Non si può annullare.' : 'Cancellare tutti i video salvati su questo dispositivo? Non si può annullare.', 'Cancella tutto', async () => { try { await VDB.clear(); } catch (e) {} DB.myv = {}; save(); flash('✓ Tutti i tuoi video sono stati cancellati'); render(true); }); }
  else if (a === 'vrefdel') { const box = b.closest('.vbox'), id = box.dataset.vid, root = box.parentElement; DB.hiddenRef[b.dataset.u] = 1; save(); box.outerHTML = videoBlock(byId[id]); loadMine(root); flash('Video tolto'); }
  else if (a === 'vrefall') { DB.hideRef = false; DB.hiddenRef = {}; save(); flash('Video di riferimento ripristinati'); settings(); }
  else if (a === 'vref') { DB.hideRef = !DB.hideRef; save(); flash(DB.hideRef ? 'Video di riferimento nascosti' : 'Video di riferimento visibili'); settings(); }
  else if (a === 'logopick') { const f = $('#logofile'); f.onchange = () => setLogo(f.files[0]); f.click(); }
  else if (a === 'logoreset') { delete DB.logo; try { localStorage.removeItem(LOGO_KEY); } catch (e) {} save(); applyLogo(); logoMsg('Foto originale ripristinata'); }
  else if (a === 'report') reportView();
  else if (a === 'week') weekView();
  else if (a === 'wiz') wizOpen(b.dataset.pid);
  else if (a === 'wzchip') { const t = b.dataset.t, v = b.dataset.v; if (t === 'fin') WZ.fin = v; else if (t === 'lato') WZ.lato = v; else { const arr = WZ[t]; if (!v) arr.length = 0; else { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); } } wizRender(); }
  else if (a === 'wzgo') { WZ.step = 2; WZ.keep = []; WZ.rejected = []; wizPropose(); wizRender(); }
  else if (a === 'wzagain') { WZ.cur.forEach(id => { if (!WZ.keep.includes(id) && !WZ.rejected.includes(id)) WZ.rejected.push(id); }); wizPropose(); wizRender(); }
  else if (a === 'wzback') { WZ.step = 1; wizRender(); }
  else if (a === 'wzday') { WZ.pid = b.dataset.id; wizRender(); }
  else if (a === 'wzadd') wizAdd();
  else if (a === 'wprint') printHtml('Piano settimanale', weekHtml());
  else if (a === 'wshare') shareText('Piano settimanale', weekText());
  else if (a === 'rprint') reportPrint();
  else if (a === 'rshare') reportShare(false);
  else if (a === 'rcopy') reportShare(true);
  else if (a === 'import') { const f = $('#imp'); f.onchange = () => importData(f.files[0]); f.click(); }
  else if (a === 'wipe') ask('Cancellare TUTTI i pesi e lo storico? Non si può annullare.', 'Cancella tutto', () => { DB = fixDB({cur: {}, hist: {}, rt: DB.rt, names: DB.names, myv: DB.myv, hideRef: DB.hideRef, hiddenRef: DB.hiddenRef, logo: DB.logo, v: 3}); save(); render(); })
});
$('#cfg').onclick = settings;
document.addEventListener('change', e => { const t = e.target; if (t.dataset && t.dataset.act === 'wzkeep') { const id = t.dataset.id, i = WZ.keep.indexOf(id); if (t.checked && i < 0) WZ.keep.push(id); if (!t.checked && i >= 0) WZ.keep.splice(i, 1); wizRender(); } });
document.addEventListener('change', async e => {
  const t = e.target; if (!t.dataset || !t.dataset.vfile) return; const f = t.files && t.files[0]; if (!f) return;
  if (f.size > 400 * 1024 * 1024) { flash('⚠ Video troppo grande (max 400 MB)'); return; }
  try { const key = t.dataset.vfile + '#' + Date.now(); await VDB.set(key, f); (DB.myv[t.dataset.vfile] = DB.myv[t.dataset.vfile] || []).push({t: 'f', k: key, n: f.name.slice(0, 40)}); save(); flash('✓ Video salvato sul dispositivo'); t.value = ''; } catch (err) { flash('⚠ Non riesco a salvare il video'); }
  loadMine(t.closest('.tb, #mbody') || document);
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('vurlin')) { e.preventDefault(); e.target.parentElement.querySelector('[data-act=vurl]').click(); } });
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'pq') { pick.q = t.value; const r = $('#pkres'); if (r) r.innerHTML = pickRes(r.dataset.pid); return; } // aggiorna solo i risultati: la casella resta attiva (tastiera del telefono)
  if (t.id === 'q') { lib.q = t.value; const r = $('#libres'); if (r) r.innerHTML = libRes(); return; }
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
    c.sets.forEach(s => { s.done = false; });
  });
  if (!n) { flash('Compila almeno una serie'); return; }
  save(); render(true); flash('✓ Archiviato (' + n + ' esercizi): pesi e ripetizioni restano per la prossima volta');
}
const blobToDataUrl = b => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(b); });
async function exportData(full) {
  let data = DB, name = 'allenamento-backup-' + today() + '.json';
  if (full) { // backup completo: anche i file video salvati sul dispositivo (base64 dentro il JSON)
    const vids = {}; let tot = 0;
    for (const [id, l] of Object.entries(DB.myv)) { if (!Array.isArray(l)) continue; for (const x of l) { if (x.t !== 'f') continue;
      try { const b = await VDB.get(x.k); if (b) { tot += b.size; vids[x.k] = {ex: id, n: x.n || '', d: await blobToDataUrl(b)}; } } catch (e) {} } }
    if (!Object.keys(vids).length) { flash('Nessun video caricato: esporto solo i dati'); }
    else if (tot > 250 * 1024 * 1024) { flash('⚠ Video troppo grandi per un unico backup (' + Math.round(tot / 1048576) + ' MB): esporto solo i dati'); }
    else { data = Object.assign({}, DB, {vids}); name = 'allenamento-backup-con-video-' + today() + '.json'; flash('Backup con ' + Object.keys(vids).length + ' video (' + Math.round(tot / 1048576) + ' MB)…'); }
  }
  const txt = JSON.stringify(data, null, full ? 0 : 1);
  try { const d = window.claude && claude.use && await claude.use('downloads'); if (d) { await d.save({filename: name, data: txt}); return; } } catch (e) { if (e && e.code === 'declined') return; }
  try {
    if (!window.claude) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], {type: 'application/json'})); a.download = name; a.click(); return; }
  } catch (e) {}
  modal(`<h2 style="padding-right:44px">Backup</h2><p>Copia questo testo e conservalo: per ripristinare salvalo in un file .json e usa “Importa backup”.</p><textarea id="bk" readonly style="width:100%;height:40vh;font:12px monospace">${esc(txt)}</textarea>`);
  $('#bk').select();
}
function importData(f) {
  if (!f) return; const r = new FileReader();
  r.onload = () => { try { const d = JSON.parse(r.result); if (!d.cur || !d.hist) throw 0; const vids = d.vids || null; delete d.vids; fixDB(d);
    const go2 = async () => { DB = d; save(); render(); if (vids) { let n = 0; for (const [k, v] of Object.entries(vids)) { try { const b = await (await fetch(v.d)).blob(); await VDB.set(k, b); n++; } catch (e) {} } flash('✓ Backup ripristinato con ' + n + ' video'); } }; ask('Sostituire i dati attuali con il backup?', 'Sostituisci', go2); } catch (e) { flash('⚠ File non valido'); } };
  r.readAsText(f);
}

window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (h !== tab && TABS.some(t => t.id === h)) { tab = h; render(); } });
render();
initCloud();
if (!window.claude && 'serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
