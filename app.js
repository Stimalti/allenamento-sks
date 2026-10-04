/* App allenamento — tutto locale: i pesi si salvano nel telefono (localStorage) a ogni modifica. */
(() => {
// Se qualcosa impedisce l'avvio, mostra l'errore e un pulsante per ripristinare l'app (i dati salvati non si toccano)
window.addEventListener('error', ev => { try { const m = document.querySelector('#main'); if (!m || m.innerHTML.length > 200) return; m.innerHTML = '<div style="padding:16px;font-family:system-ui"><h2>Qualcosa non è partito</h2><p style="color:#a00;word-break:break-all">' + String(ev.message || ev.error || 'errore').replace(/</g, '&lt;') + '</p><p>Premi Ripristina: svuota la cache dell’app e la ricarica. Allenamenti, routine e video restano al loro posto.</p><button id="ripristina" style="padding:12px 18px;font-size:16px">Ripristina app</button></div>'; const b = document.querySelector('#ripristina'); if (b) b.onclick = () => window.sksReset(); } catch (e) {} });
window.sksReset = async () => { try { if ('serviceWorker' in navigator) { const rs = await navigator.serviceWorker.getRegistrations(); for (const r of rs) await r.unregister(); } if (window.caches) { const ks = await caches.keys(); for (const k of ks) await caches.delete(k); } } catch (e) {} location.href = location.pathname + '?r=' + Date.now(); };
const KEY = 'sks_allenamento_v1', APPV = (document.querySelector('script[src*="app.js"]') || {src: ''}).src.replace(/.*v=/, '') || 'artifact';
const $ = s => document.querySelector(s);
const byId = Object.fromEntries(EX.map(e => [e.id, e]));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

let DB = {cur: {}, hist: {}, mia: []};
try { const r = JSON.parse(localStorage.getItem(KEY)); if (r && r.cur && r.hist) DB = r; } catch (e) {}
const CUST = ['g1', 'g2', 'g3', 'g4', 'gA', 'mia', 'dom'];
function fixDB(d) { if (!d.notes || typeof d.notes !== 'object') d.notes = {}; if (!d.noatt || typeof d.noatt !== 'object') d.noatt = {Bilanciere: 1}; /* attrezzi NON disponibili (di base: niente bilanciere libero) */ if (!d.fav || typeof d.fav !== 'object') d.fav = {}; if (!d.seeds || typeof d.seeds !== 'object') d.seeds = {}; if (!Array.isArray(d.sess)) d.sess = [];
  if (!d.seeds.bic46) { // i 3 curl del video "STOP doing this for biceps": preferiti e inseriti nel lunedì (una volta sola)
    d.seeds.bic46 = 1; if (!d.rt || typeof d.rt !== 'object') d.rt = {}; if (!Array.isArray(d.rt.g1)) d.rt.g1 = [];
    ['c-curl-dietro', 'c-curl-davanti', 'c-hammer-singolo'].forEach(id => { d.fav[id] = 1; if (!d.rt.g1.some(x => x.e === id)) d.rt.g1.push({e: id, s: 3, r: '10-12', rec: '75 s', obj: 'massa'}); }); } if (!d.hiddenRef || typeof d.hiddenRef !== 'object') d.hiddenRef = {}; if (!d.myv || typeof d.myv !== 'object') d.myv = {}; if (!d.names || typeof d.names !== 'object') d.names = {}; if (!d.rt || typeof d.rt !== 'object') d.rt = {}; CUST.forEach(id => { if (!Array.isArray(d.rt[id])) d.rt[id] = []; });
  delete d.mia;
  if (d.v !== 3) { d.v = 3; d.names = {}; CUST.forEach(id => d.rt[id] = []); }
  return d; }
fixDB(DB); try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) {}   // le migrazioni (preferiti, scheda del lunedì) si salvano subito
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
const ICON_HOME = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/></svg>';
const TABS = [{id:'home', a:['Home'], b:ICON_HOME, full:'Home'}, {id:'lib', a:['Esercizi'], b:ICON_LIB, full:'Esercizi'}, ...DAYS.map(([id, sh, full], i) => ({id, a:[sh], b:String(i + 1), full}))];
const dayName = id => (DAYS.find(d => d[0] === (id === 'gA' ? 'giulia' : id)) || [])[2] || 'Scheda';
const tabPlan = id => id === 'giulia' ? 'gA' : id;

const rtList = id => DB.rt[id] || (DB.rt[id] = []);
const customPlan = id => { const base = PLAN.find(p => p.id === id);
  return {id, custom: true, profilo: id === 'mia' ? 'mia' : id[0] === 'g' && id.length === 2 && id[1] > '9' ? 'giulia' : 'io', nome: DB.names[id] ? (DB.names[id].n || 'Senza nome') : dayName(id), sotto: DB.names[id] ? (DB.names[id].m || '') : '',
    obiettivo: 'Tocca ALLENATI per fare gli esercizi uno alla volta, con pesi, timer di recupero e spiegazioni. Qui sotto prepari la scheda: aggiungi, togli, riordina.',
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
const todayTabId = () => DAYS[(new Date().getDay() + 6) % 7][0];
let tab = (location.hash || '#home').slice(1); if (!TABS.some(t => t.id === tab)) tab = 'home';
let prepEdit = false;   // scheda del giorno: vista semplice (false) o modifica (true)
let giuliaSub = 'gA';
const lib = {q: '', g: '', a: '', f: '', l: '', fav: ''};
const LATO = {uno: 'A un braccio / una gamba', due: 'A due braccia / due gambe'};
const latoOf = e => e.one ? 'uno' : 'due';
const avail = e => !DB.noatt[e.a] && !(e.nb && DB.noatt.Panca);   // attrezzo disponibile (impostazioni → Attrezzi disponibili); la panca serve anche a esercizi con altri attrezzi
const ATT_AV = () => [...new Set(EX.map(e => e.a))].filter(a => !DB.noatt[a]);
const attCount = a => EX.filter(e => a === 'Panca' ? (e.a === 'Panca' || e.nb) : e.a === a).length;
const attOk = (e, atts) => !atts.length || (atts.includes(e.a) && (!e.nb || atts.includes('Panca')));   // compatibile con gli attrezzi scelti (la panca va scelta se l'esercizio la richiede)
const attLabel = a => a === 'Panca' ? 'Panca (serve in ' + attCount(a) + ' esercizi)' : a;
const inG = (e, g) => e.g === g || (e.g2 || []).includes(g);   // gruppo principale o secondario (es. face pull: spalle e schiena)
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
  ${ex.noanim ? '<p class="warn">↔ Questo esercizio è un movimento <b>laterale</b> (il corpo si piega di fianco): il modello 3D mostra solo la posizione di partenza. Segui la descrizione qui sotto.</p>' : ''}
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
      <button class="chk ${s.done ? 'on' : ''}" data-k="${k}" data-i="${i}" data-act="done" aria-label="Serie completata">✓</button>
      <input class="snote" data-k="${k}" data-i="${i}" data-f="note" value="${esc(s.note || '')}" placeholder="${h && h.sets[i] && h.sets[i].note ? 'ultima volta: ' + esc(h.sets[i].note) : 'nota serie ' + (i + 1) + ' (es. presa, sensazione, dolore)'}" maxlength="140" aria-label="Nota serie ${i + 1}"></div>`;
  }).join('');
  const id = k.split(':')[1], gn = DB.notes[id] || '';
  return `<div class="sets" data-sets="${k}">${rows}</div>
    <label class="gnote"><span>📝 Note sull’esercizio (restano salvate per sempre)</span><textarea data-gnote="${id}" rows="${gn.length > 60 ? 3 : 2}" placeholder="Es. altezza del cavo, regolazione della panca, cosa funziona meglio…" maxlength="600">${esc(gn)}</textarea></label>
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
  return `<article class="card ex prep" style="--gc:${GCOL[ex.g]}" id="c-${k.replace(':', '-')}">
   ${cu ? `<div class="mctl"><span class="mlab">Ordine</span><button data-act="mup" data-pid="${pid}" data-id="${ex.id}" aria-label="Sposta su"${idx === 0 ? ' disabled' : ''}>▲ Su</button><button data-act="mdn" data-pid="${pid}" data-id="${ex.id}" aria-label="Sposta giù"${idx === pl.ex.length - 1 ? ' disabled' : ''}>▼ Giù</button><button class="rm" data-act="mrm" data-pid="${pid}" data-id="${ex.id}">✕ Togli</button></div>` : ''}
   <div class="exh"><span class="num ${done >= c.sets.length ? 'done' : ''}">${idx + 1}</span>${cov(ex.id, 'thumb')}
    <div style="min-width:0;flex:1"><h2>${esc(ex.n)}${x.opt ? '<span class="opt">opzionale</span>' : ''}</h2><div class="meta">${gtag(ex)}${cab(ex)}${avail(ex) ? '' : '<span class="tag na">attrezzo non disponibile</span>'}<button class="favb ${DB.fav[ex.id] ? 'on' : ''}" data-act="fav" data-id="${ex.id}" aria-label="Preferito">${DB.fav[ex.id] ? '⭐' : '☆'}</button></div><div class="mm">💪 ${esc(ex.mm || ex.m)}</div></div></div>
   ${cu ? `<div class="presc edit"><b><span class="n">${c.sets.length}</span> ×</b><button class="ghost" data-act="addset" data-k="${k}" data-n="${c.sets.length}" aria-label="Più serie">+</button><button class="ghost" data-act="delset" data-k="${k}" data-n="${c.sets.length}" aria-label="Meno serie">−</button><input class="ed" data-mf="r" data-pid="${pid}" data-id="${ex.id}" value="${esc(x.r)}" placeholder="8-12" maxlength="12" aria-label="Ripetizioni previste"><span>rec.</span><input class="ed" data-mf="rec" data-pid="${pid}" data-id="${ex.id}" value="${esc(x.rec)}" placeholder="90 s" maxlength="12" aria-label="Recupero"></div>` : `<div class="presc"><b>${c.sets.length} × ${esc(x.r)}</b><span>recupero ${esc(x.rec)}</span></div>`}
   ${cu && ex.fin ? `<div class="objrow"><span>Obiettivo</span>${ex.fin.map(f => `<button class="${x.obj === f ? 'on' : ''}" data-act="objset" data-pid="${pid}" data-id="${ex.id}" data-f="${f}">${FIN[f]}</button>`).join('')}</div>${x.obj && presOf(ex, x.obj) ? `<div class="objtip">Consigliato per ${FIN[x.obj].toLowerCase()}: ${presOf(ex, x.obj).sr} × ${presOf(ex, x.obj).r}, recupero ${presOf(ex, x.obj).rec} · ${esc(pesoTxt(ex, x.obj))}</div>` : ''}` : `<div class="role">${esc(x.ruolo)}</div>`}
   ${lastLine(k)}${DB.notes[ex.id] ? `<div class="last">📝 ${esc(DB.notes[ex.id])}</div>` : ''}
   <div class="sbar"><button data-act="open" data-id="${ex.id}">🎬 Come si fa</button><button data-act="hist" data-k="${k}">Storico</button></div>
  </article>`;
}

const secs = rec => { const m = String(rec).match(/(\d+)\s*min/), t = String(rec).match(/(\d+)\s*s\b/); return m ? +m[1] * 60 : t ? +t[1] : 20; };
const planTot = (p, prof) => { let tot = 0, dn = 0, mins = 0; p.ex.forEach(x => { const c = curFor(pk(prof, x.e), x.s); tot += c.sets.length; dn += c.sets.filter(s => s.done).length; mins += c.sets.length * (40 + secs(x.rec)); }); return {tot, dn, mins}; };
function exRowPlan(x, i, prof) {
  const ex = byId[x.e], k = pk(prof, ex.id), c = curFor(k, x.s), d = c.sets.filter(s => s.done).length, h = lastHist(k);
  const kg = h ? h.sets.map(s => s.kg).filter(Boolean) : [], kgTxt = kg.length ? ' · ultima ' + (kg.every(v => v === kg[0]) ? kg[0] : kg.join('/')) + ' kg' : '';
  return `<button class="li plan" style="--gc:${GCOL[ex.g]}" data-act="open" data-id="${ex.id}" id="c-${k.replace(':', '-')}"><span class="num ${d >= c.sets.length ? 'done' : d ? 'part' : ''}">${i + 1}</span>${cov(ex.id, 'thumb') || ''}<span class="t"><b>${esc(ex.n)}</b><small class="mm">💪 ${esc(ex.mm || ex.m)}</small><small>${c.sets.length} × ${esc(x.r)} · rec. ${esc(x.rec)}${kgTxt}${avail(ex) ? '' : ' · <span style="color:#b91c1c">attrezzo non disponibile</span>'}</small></span><span class="chev">›</span></button>`;
}
function planView(p, prof) {
  const {tot, dn, mins} = planTot(p, prof);
  const cav = p.ex.filter(x => byId[x.e].a === 'Cavi').length, edit = p.custom && (prepEdit || !p.ex.length);
  const last = (DB.sess || []).filter(z => z.pid === p.id).slice(-1)[0], isToday = tabPlan(todayTabId()) === p.id;
  return `<section class="hero"><div class="eyebrow">${isToday ? 'Oggi · ' : ''}${esc(dayName(p.id))}${last ? ' · ultima seduta ' + esc(fmtWd(last.d)) : ''}</div><h2>${esc(p.nome)}</h2>${p.sotto ? `<div class="sub">${esc(p.sotto)}</div>` : ''}
   ${p.ex.length ? `<div class="stats"><div class="stat"><b>${p.ex.length}</b><span>esercizi</span></div><div class="stat"><b>${tot}</b><span>serie</span></div><div class="stat"><b>~${Math.round(mins / 600) * 10}</b><span>minuti</span></div><div class="stat"><b>${cav}</b><span>ai cavi</span></div></div>
   <div class="prog"><i style="width:${tot ? Math.round(dn / tot * 100) : 0}%"></i></div><div class="progt">${dn}/${tot} serie completate · <button class="tlink" data-act="tmopen">⏱ Timer recupero</button></div>
   ${p.custom && evalDay(p.id) ? `<button class="evalchip" data-act="evalday" data-pid="${p.id}">${evalDay(p.id).icon} ${evalDay(p.id).skip ? 'Non valutata (gambe/addome)' : 'Valutazione ' + evalDay(p.id).score + '/10 · ' + evalDay(p.id).grade} ›</button>` : ''}
   <button class="primary trainbtn" data-act="train" data-pid="${p.id}">▶ Allenati${dn && dn < tot ? ' · continua' : ''}</button>` : `<p>Scheda vuota. Qui sotto scegli un <b>programma pronto</b>, fatti <b>proporre</b> esercizi oppure aggiungili uno a uno.</p>`}</section>
   <div class="prepH"><h3>${edit ? '✏️ Modifica scheda' : 'Esercizi'}</h3>${p.custom && p.ex.length ? `<button class="ghost small" data-act="pedit">${edit ? '✓ Fine modifiche' : '✏️ Modifica'}</button>` : ''}</div>
   ${edit ? custTools(p) + p.ex.map((x, i) => exCard(x, i, prof, p)).join('') + (p.ex.length ? '<button class="ghost addmore" data-act="ptoggle" onclick="setTimeout(()=>window.scrollTo(0,0),30)">+ Aggiungi altri esercizi</button>' : '')
          : p.ex.map((x, i) => exRowPlan(x, i, prof)).join('') + (p.ex.length ? '<p class="vnote" style="margin:4px 2px 12px">Tocca un esercizio per vedere come si fa. “Modifica” per cambiare ordine, serie e ripetizioni.</p>' : '')}
   ${dn ? `<button class="ghost addmore" data-act="finish" data-p="${p.id}" data-prof="${prof}">🏁 Fine allenamento · salva nello storico (${dn} serie fatte)</button>` : ''}`;
}

/* ---------- modalità allenamento: un esercizio alla volta ---------- */
const TR = {on: false, pid: null, i: 0, how: false};
try { const t = JSON.parse(localStorage.getItem('sks_train') || 'null'); if (t && t.on && CUST.includes(t.pid)) Object.assign(TR, t); } catch (e) {}
const trSave = () => { try { localStorage.setItem('sks_train', JSON.stringify(TR)); } catch (e) {} };
function trainStart(pid) {
  const p = planOf(pid); if (!p || !p.ex.length) { flash('Scheda vuota: aggiungi prima gli esercizi'); return; }
  const prof = p.profilo || 'io'; let i = p.ex.findIndex(x => { const c = curFor(pk(prof, x.e), x.s); return c.sets.some(s => !s.done); }); if (i < 0) i = 0;
  TR.on = true; TR.pid = pid; TR.i = i; trSave(); tab = pid === 'gA' ? 'giulia' : pid; location.hash = tab; render(); window.scrollTo(0, 0);
}
function trainExit() { TR.on = false; trSave(); render(); window.scrollTo(0, 0); }
function trainView() {
  const p = planOf(TR.pid), prof = p.profilo || 'io', n = p.ex.length; TR.i = Math.max(0, Math.min(TR.i, n - 1));
  const x = p.ex[TR.i], ex = byId[x.e], k = pk(prof, ex.id), c = curFor(k, x.s), {tot, dn} = planTot(p, prof);
  const dots = p.ex.map((y, j) => { const cc = curFor(pk(prof, y.e), y.s), d = cc.sets.filter(s => s.done).length; return `<button class="tdot ${j === TR.i ? 'cur' : ''} ${d >= cc.sets.length ? 'done' : d ? 'part' : ''}" data-act="trgo" data-i="${j}" aria-label="${esc(byId[y.e].n)}">${j + 1}</button>`; }).join('');
  return `<div class="ttop"><button class="ghost" data-act="trexit">✕ Esci</button><div class="tprog"><b>Esercizio ${TR.i + 1} di ${n}</b><div class="prog"><i style="width:${tot ? Math.round(dn / tot * 100) : 0}%"></i></div><small>${dn}/${tot} serie completate</small></div><button class="ghost" data-act="tmopen" aria-label="Timer recupero">⏱</button></div>
   <div class="tdots">${dots}</div>
   <article class="card ex train" style="--gc:${GCOL[ex.g]}" id="c-${k.replace(':', '-')}">
    ${cov(ex.id, 'cover')}<div class="exh"><span class="num ${c.sets.every(s => s.done) ? 'done' : ''}">${TR.i + 1}</span>
     <div style="min-width:0;flex:1"><h2>${esc(ex.n)}</h2><div class="meta">${gtag(ex)}${cab(ex)}<button class="favb ${DB.fav[ex.id] ? 'on' : ''}" data-act="fav" data-id="${ex.id}" aria-label="Preferito">${DB.fav[ex.id] ? '⭐' : '☆'}</button></div><div class="mm">💪 ${esc(ex.mm || ex.m)}</div></div></div>
    <div class="presc"><b>${c.sets.length} × ${esc(x.r)}</b><span>recupero ${esc(x.rec)}</span>${x.obj && FIN[x.obj] ? `<span>· ${FIN[x.obj]}</span>` : ''}</div>
    ${lastLine(k)}${hintLine(k, x.r)}
    <button class="howbtn ${TR.how ? 'on' : ''}" data-act="trhow">🎬 Come si fa${TR.how ? ' · chiudi' : ''}<small>animazione 3D · video · spiegazione passo passo</small></button>
    ${TR.how ? `<div class="tb howbox">${techHtml(ex)}<button class="ghost addmore" data-act="trhow" style="margin-top:12px">▲ Chiudi e vai alle serie</button></div>` : ''}
    ${setsHtml(k, x.s, x.r)}
   </article>
   <div class="tbarnav"><button class="ghost" data-act="trprev"${TR.i === 0 ? ' disabled' : ''}>◀ Prec.</button>${TR.i < n - 1 ? `<button class="primary" data-act="trnext">Prossimo: ${esc(byId[p.ex[TR.i + 1].e].n.split(' (')[0].slice(0, 26))} ▶</button>` : `<button class="primary" data-act="finish" data-p="${p.id}" data-prof="${prof}">🏁 Fine allenamento</button>`}</div>`;
}

const pick = {open: false, q: '', g: '', a: '', f: '', l: ''};
const filt = st => { const q = norm(st.q).split(/\s+/).filter(Boolean);
  return EX.filter(e => { if (!avail(e)) return false; if (st.fav && !DB.fav[e.id]) return false; if (st.g && !inG(e, st.g)) return false; if (st.a && !(e.a === st.a || (st.a === 'Panca' && e.nb))) return false; if (st.f && !(e.fin || []).includes(st.f)) return false; if (st.l && latoOf(e) !== st.l) return false;
    const hay = norm([e.n, e.g, GRUPPI[e.g], e.a, e.m, e.mm || '', e.cue, e.why, e.set, e.fin ? e.fin.join(' ') : ''].join(' ')); return q.every(t => hay.includes(t)); }).sort((a, b) => (DB.fav[b.id] ? 1 : 0) - (DB.fav[a.id] ? 1 : 0)); };
const exRow = (e, act, rid) => { const on = rid ? inRt(rid, e.id) : inAny(e.id);
  return `<div class="lw"><button class="li" style="--gc:${GCOL[e.g]}" data-act="open" data-id="${e.id}">${cov(e.id, 'thumb') || `<span class="dot">${esc(GRUPPI[e.g][0])}</span>`}<span class="t"><b>${DB.fav[e.id] ? '⭐ ' : ''}${esc(e.n)}</b><small>${esc(GRUPPI[e.g])}${(e.g2 || []).length ? '/' + e.g2.map(g => esc(GRUPPI[g])).join('/') : ''} · ${esc(e.mm || e.m)}${e.fin ? ' · ' + e.fin.map(f => FIN[f]).join('/') : ''}${latoTxt(e) ? ' · ' + latoTxt(e) : ''}${e.due ? ' · 2 cavi' : e.unCavo ? ' · 1 cavo' : ''}</small></span>${e.a === 'Cavi' ? '<span class="tag cav">Cavi</span>' : `<span class="tag" style="background:var(--in);color:var(--mut)">${esc(e.a)}</span>`}</button><button class="add ${on ? 'on' : ''}" data-act="${act}" data-id="${e.id}"${rid ? ` data-r="${rid}"` : ''} aria-label="${on ? 'Togli' : 'Aggiungi'}">${on ? '✓' : '+'}</button></div>`; };
function filters(st, sid, qid) {
  const atts = ATT_AV();
  return `<input class="search" id="${qid}" type="search" placeholder="Cerca: es. tricipiti, cavo alto, squat…" value="${esc(st.q)}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="search">
  <div class="chips">${chip('fav', '', 'Tutti', sid)}${chip('fav', '1', '⭐ Preferiti (' + Object.keys(DB.fav).length + ')', sid)}</div>
  <div class="chips">${chip('a', '', '🏋️ Ogni attrezzo', sid)}${atts.map(a => chip('a', a, a === 'Panca' ? 'Su panca' : a, sid)).join('')}</div>
  <div class="chips">${chip('g', '', 'Tutti i muscoli', sid)}${Object.entries(GRUPPI).map(([k, v]) => chip('g', k, v, sid)).join('')}</div>
  <div class="chips">${chip('f', '', 'Ogni obiettivo', sid)}${Object.entries(FIN).map(([k, v]) => chip('f', k, v === 'Tonificare' ? 'Per tonificare' : v === 'Forza' ? 'Per la forza' : 'Per la massa', sid)).join('')}</div>
  <div class="chips">${chip('l', '', 'Un braccio o due', sid)}${Object.entries(LATO).map(([k, v]) => chip('l', k, v, sid)).join('')}</div>
`;
}
const libRes = () => { const list = filt(lib); return `<div class="count">${list.length} di ${EX.filter(avail).length} esercizi</div>
  <div id="list">${list.map(e => exRow(e, 'mtog')).join('') || '<p class="count">Nessun risultato.</p>'}</div>`; };
function libView() { return `<div class="sbar" style="padding:0 0 8px"><button class="ghost" data-act="presets">📋 Programmi pronti (forza · massa · tonificare)</button></div>${filters(lib, 'lib', 'q')}<div id="libres">${libRes()}</div>`; }
const pickRes = pid => { const list = filt(pick); return `<div class="count">${list.length} di ${EX.filter(avail).length} esercizi</div>${list.map(e => exRow(e, 'ptog', pid)).join('') || '<p class="count">Nessun risultato.</p>'}`; };
const custView = cp => planView(cp, cp.profilo);
function custTools(cp) {
  const open = pick.open || !cp.ex.length, list = open ? filt(pick) : [];
  return `<div class="ctools"><button class="ghost" data-act="presets" data-pid="${cp.id}">📋 Programma pronto</button><button class="ghost" data-act="wiz" data-pid="${cp.id}">✨ Proponimi esercizi</button><button class="ghost" data-act="ptoggle">${open && cp.ex.length ? '▲ Chiudi elenco' : '＋ Aggiungi esercizi'}</button><button class="ghost" data-act="ren" data-id="${cp.id}">✏ Rinomina giorno</button><button class="ghost" data-act="week">📅 Piano della settimana</button></div>` +
    (open ? `<section class="picker"><h3>Scegli muscolo e attrezzo, poi tocca + per aggiungere</h3>${filters(pick, 'pk', 'pq')}<div id="pkres" data-pid="${cp.id}">${pickRes(cp.id)}</div></section>` : '');
}
const chip = (t, v, l, sid) => { const st = sid === 'pk' ? pick : lib; return `<button class="chip ${st[t] === v ? 'on' : ''}" style="--gc:${t === 'g' && GCOL[v] ? GCOL[v] : 'transparent'}" data-act="chip" data-s="${sid}" data-t="${t}" data-v="${esc(v)}">${t === 'g' && GCOL[v] ? '<u></u>' : ''}${esc(l)}</button>`; };

/* ---------- render ---------- */
function render(keep) {
  const y = window.scrollY;
  const t = TABS.find(x => x.id === tab);
  $('#ttl').innerHTML = tab === 'home' ? 'Allenamento SKS<small>' + esc(fmtLong(today())) + '</small>' : tab === 'lib' ? 'Esercizi<small>Libreria ricercabile · ' + EX.length + ' esercizi</small>' : esc(planOf(tabPlan(tab)).nome) + '<small>' + (planOf(tabPlan(tab)).sotto ? esc(planOf(tabPlan(tab)).sotto) + ' · ' : '') + rtList(tabPlan(tab)).length + ' esercizi scelti da te</small>';
  $('#nav').innerHTML = TABS.map(x => { let a = x.a, full = x.full; const nm = DB.names[tabPlan(x.id)]; if (nm) { a = (nm.m || '').split(/[,+·\/]/).map(v => v.trim()).filter(Boolean).slice(0, 4); if (!a.length) a = [(nm.n || 'Scheda').trim()]; full = nm.n + (nm.m ? ': ' + nm.m : ''); if (!nm.m && nm.n.length > 7) a = [nm.n.slice(0, 7) + '.']; }
    return `<button class="${x.id === tab ? 'on' : ''}" data-act="tab" data-id="${x.id}" aria-label="${esc(full)}"><i>${x.b}</i><span>${a.map(esc).join('<br>')}</span></button>`; }).join('');
  let h;
  const training = TR.on && CUST.includes(TR.pid) && tab === (TR.pid === 'gA' ? 'giulia' : TR.pid) && planOf(TR.pid).ex.length;
  document.body.classList.toggle('training', !!training);
  if (training) { const p = planOf(TR.pid); $('#ttl').innerHTML = esc(p.nome) + '<small>Allenamento in corso · esercizio ' + (Math.min(TR.i, p.ex.length - 1) + 1) + ' di ' + p.ex.length + '</small>'; h = trainView(); }
  else if (tab === 'home') h = homeView();
  else if (tab === 'lib') h = libView();
  else if (tab === 'giulia') {
    h = custView(planOf('gA'));
  } else if (CUST.includes(tab)) {
    h = custView(planOf(tab));
  } else h = planView(planOf(tab), 'io');
  $('#main').innerHTML = h;
  const bw = $('#main .barsw'); if (bw) bw.scrollLeft = bw.scrollWidth;
  if (training && TR.how) { const f = $('#main [data-fig]'); if (f) FIG3.mount(f, byId[f.dataset.fig], FIG.mount); loadMine($('#main')); }
  if (keep) window.scrollTo(0, y);
}
function go(id) { if (TR.on && id !== (TR.pid === 'gA' ? 'giulia' : TR.pid)) { TR.on = false; trSave(); } if (id !== tab) { prepEdit = false; pick.open = false; } tab = id; location.hash = id; render(); window.scrollTo(0, 0); }

/* ---------- Home: oggi, andamento, qualità, consigli, valutazione delle giornate ---------- */
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
const fmtLong = d => { const t = new Date(d + 'T12:00:00'); return WD[t.getDay()] + ' ' + t.getDate() + ' ' + MESI[t.getMonth()]; };
const mondayOf = d => { const t = new Date(d + 'T12:00:00'); t.setDate(t.getDate() - (t.getDay() + 6) % 7); return new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
const PUSH = ['petto', 'spalle', 'tricipiti'], PULL = ['schiena', 'bicipiti', 'avambracci'];
const SKIP_G = ['gambe', 'addome'];   // per scelta dell'utente gambe e addome non entrano nelle valutazioni
const gName = g => GRUPPI[g].toLowerCase();
// spalle: solo i press contano come "spinta"; alzate, face pull e deltoidi posteriori sono neutri (stanno bene sia con spinta sia con tirata)
const shPress = e => e.g === 'spalle' && /press|military|arnold|spinta/i.test(e.n);
const isPush = e => e.g === 'petto' || e.g === 'tricipiti' || shPress(e);
const isPull = e => PULL.includes(e.g) || (e.g === 'spalle' && /face pull|posterior|rear|reverse/i.test(e.n));
const classG = e => e.g === 'spalle' && !shPress(e) ? null : e.g;   // gruppo ai fini dell'abbinamento
const weekHas = (set, notPid) => plannedDays().some(pid => pid !== notPid && rtList(pid).some(x => byId[x.e] && (set === PUSH ? isPush(byId[x.e]) : isPull(byId[x.e]))));
// giudizio sull'abbinamento dei gruppi muscolari di una giornata (solo parte alta)
function pairing(pid) {
  const L = rtList(pid).filter(x => byId[x.e]); const Gall = [...new Set(L.map(x => byId[x.e].g).filter(g => !SKIP_G.includes(g)))]; if (!Gall.length) return null;
  const G = [...new Set(L.map(x => classG(byId[x.e])).filter(g => g && !SKIP_G.includes(g)))]; const shAcc = Gall.includes('spalle') && !G.includes('spalle');
  if (!G.length) return {ok: true, title: 'spalle (alzate, face pull): giornata di rifinitura', why: 'Solo esercizi accessori per le spalle: vanno bene da soli o aggiunti a qualunque altro giorno.', alt: '', G: Gall, near: [], kind: 'split'};
  const sub = (a, set) => a.every(g => set.includes(g)), has = g => G.includes(g);
  const list = Gall.map(gName).join(' + '), accNote = shAcc ? ' Le spalle qui sono alzate/face pull: accessori che stanno bene con qualsiasi abbinamento.' : '';
  let ok = true, title, why, alt = '', kind = 'split';
  if (G.length === 1) { const g = G[0]; const best = {petto: 'tricipiti o spalle (stessa spinta)', schiena: 'bicipiti (stessa tirata) o petto (antagonisti)', spalle: 'petto e tricipiti, oppure da sole con braccia', bicipiti: 'schiena o tricipiti', tricipiti: 'petto o bicipiti', avambracci: 'schiena e bicipiti'}[g];
    title = `${list}: giornata dedicata, va bene`; why = `Un solo gruppo con più esercizi: ottimo per concentrarsi. Se vuoi accorciare la settimana si abbina bene con ${best}.`; }
  else if (sub(G, PUSH)) { title = `${list}: abbinamento classico di spinta`; why = 'Petto, spalle e tricipiti spingono insieme: il tricipite e il deltoide anteriore sono già caldi dopo le spinte, quindi li finisci con pochi esercizi. Giorno dopo: schiena e bicipiti.' + accNote; }
  else if (sub(G, PULL)) { title = `${list}: abbinamento classico di tirata`; why = 'Schiena, bicipiti e avambracci tirano insieme: il bicipite lavora già nei rematori e nelle trazioni, lo chiudi con 1-2 curl. Giorno dopo: petto, spalle, tricipiti.' + accNote; }
  else if (sub(G, ['bicipiti', 'tricipiti', 'avambracci'])) { title = `${list}: giornata braccia`; why = 'Bicipiti e tricipiti sono antagonisti: alternarli tiene il braccio irrorato e il recupero breve. Mettila a distanza di un giorno da spinta e tirata.' + accNote; }
  else if (sub(G, ['petto', 'schiena']) || sub(G, ['petto', 'schiena', 'spalle'])) { title = `${list}: antagonisti, abbinamento ottimo`; why = 'Petto e schiena sono antagonisti: puoi alternare una spinta e una tirata (superserie) con recuperi brevi, le spalle restano equilibrate.' + accNote; }
  else if (G.length >= 4) { kind = 'full'; title = `${list}: parte alta completa`; why = 'Tutta la parte alta in un giorno va bene se ti alleni 2-3 volte a settimana e tieni 6-8 esercizi: uno-due per gruppo, prima i multiarticolari.'; if (L.length > 8) { ok = false; alt = 'Con più di 8 esercizi conviene dividere: spinta (petto, spalle, tricipiti) in un giorno e tirata (schiena, bicipiti) in un altro.'; } }
  else { ok = false; kind = 'mixed'; const push = G.filter(g => PUSH.includes(g)), pull = G.filter(g => PULL.includes(g));
    title = `${list}: abbinamento misto, si può fare meglio`;
    why = `${push.map(gName).join(' e ')} ${push.length > 1 ? 'spingono' : 'spinge'}, ${pull.map(gName).join(' e ')} ${pull.length > 1 ? 'tirano' : 'tira'}: nessuna interferenza grave, ma non sfrutti il “pre-riscaldamento” che hai quando abbini muscoli che lavorano insieme.`;
    alt = 'Abbinamenti consigliati: petto + tricipiti (+ spalle), schiena + bicipiti, oppure petto + schiena come antagonisti. ' + (has('petto') && has('bicipiti') ? 'Qui: sposta i bicipiti nel giorno della schiena e metti i tricipiti con il petto.' : has('schiena') && has('tricipiti') ? 'Qui: sposta i tricipiti nel giorno del petto e metti i bicipiti con la schiena.' : has('spalle') && has('schiena') && !has('petto') ? 'Qui: le spalle rendono di più con il petto; con la schiena vanno bene solo deltoidi posteriori e face pull.' : 'Sposta il gruppo “fuori posto” in un altro giorno.'); }
  // stesso gruppo il giorno prima o dopo
  const idx = DAYS.findIndex(([t]) => dayPid(t) === pid), near = [];
  if (idx >= 0) [idx - 1, idx + 1].forEach(j => { const d = DAYS[(j + 7) % 7]; const pid2 = dayPid(d[0]); if (pid2 === pid) return; const G2 = new Set(rtList(pid2).filter(x => byId[x.e]).map(x => byId[x.e].g)); G.filter(g => G2.has(g)).forEach(g => { if (!near.some(n => n.g === g)) near.push({g, day: d[2]}); }); });
  return {ok, title, why, alt, G: Gall, near, kind};
}
const dayPid = tid => tabPlan(tid);
const plannedDays = () => DAYS.filter(([tid]) => rtList(dayPid(tid)).length).map(([tid]) => dayPid(tid));
// valuta l'insieme di esercizi scelti per un giorno: muscoli coperti, equilibrio spinta/tirata, ordine, volume, durata, doppioni, attrezzi
function evalDay(pid) {
  const L = rtList(pid).filter(x => byId[x.e]); if (!L.length) return null;
  const p = planOf(pid), prof = p.profilo || 'io', pros = [], cons = [], tips = []; let score = 10;
  if (L.every(x => SKIP_G.includes(byId[x.e].g))) return {score: null, grade: 'non valutata', icon: '🦵', pros: ['Giornata di sole gambe/addome: per tua scelta non viene valutata.'], cons: [], tips: [], n: L.length, tot: L.reduce((t, x) => t + x.s, 0), mins: 0, groups: [...new Set(L.map(x => byId[x.e].g))], pair: null, skip: true};
  const sets = x => (DB.cur[pk(prof, x.e)] || {sets: []}).sets.length || x.s;
  const tot = L.reduce((t, x) => t + sets(x), 0), mins = Math.round(L.reduce((t, x) => t + sets(x) * (40 + secs(x.rec)), 0) / 60);
  const gs = {}; L.forEach(x => { const e = byId[x.e]; gs[e.g] = (gs[e.g] || 0) + sets(x); (e.g2 || []).forEach(g => { gs[g] = (gs[g] || 0) + sets(x) / 2; }); });
  const groups = Object.keys(gs), upper = groups.filter(g => PUSH.includes(g) || PULL.includes(g)).length > 0;
  const push = L.reduce((t, x) => t + (isPush(byId[x.e]) ? sets(x) : 0), 0), pull = L.reduce((t, x) => t + (isPull(byId[x.e]) ? sets(x) : 0), 0);
  const n = L.length;
  if (n >= 4 && n <= 8) pros.push(`${n} esercizi: numero giusto per una seduta completa ma gestibile.`);
  else if (n < 3) { cons.push(`Solo ${n} esercizi: seduta corta, difficile coprire bene i muscoli.`); score -= 2; tips.push('Aggiungi almeno un esercizio multiarticolare (es. panca Smith, lat machine, rematore) per arrivare a 4-6.'); }
  else if (n > 9) { cons.push(`${n} esercizi sono tanti: la qualità delle ultime serie cala.`); score -= 1.5; tips.push('Togli gli esercizi che lavorano gli stessi muscoli e tieni 6-8 esercizi.'); }
  if (tot >= 12 && tot <= 24) pros.push(`${tot} serie totali: volume adatto per progredire senza sfinirsi.`);
  else if (tot < 10) { cons.push(`${tot} serie in tutto: volume basso.`); score -= 1; tips.push('Porta le serie a 3-4 per esercizio.'); }
  else if (tot > 28) { cons.push(`${tot} serie: volume alto, servono più di ${mins} minuti.`); score -= 1.5; tips.push('Riduci a 3 serie per esercizio o sposta qualcosa in un altro giorno.'); }
  if (mins > 80) { cons.push(`Durata stimata ~${mins} minuti: lunga per mantenere intensità.`); score -= 1; }
  else if (mins >= 25) pros.push(`Durata stimata ~${mins} minuti.`);
  const pr = pairing(pid), mixed = pr && (pr.kind === 'full' || pr.kind === 'mixed');
  if (pr) { if (pr.ok) pros.push(pr.title + '. ' + pr.why); else { cons.push(pr.title + '. ' + pr.why); score -= 1; if (pr.alt) tips.push(pr.alt); }
    pr.near.forEach(z => { cons.push(`${GRUPPI[z.g]} anche ${z.day.toLowerCase()}: due giorni di fila sullo stesso muscolo, servono 48 ore di recupero.`); score -= 0.5; tips.push(`Sposta ${gName(z.g)} in un giorno non consecutivo oppure lascia un giorno di pausa.`); }); }
  else pros.push(`Giornata di ${groups.map(gName).join(' e ')} (non valutata: gambe e addome sono esclusi per tua scelta).`);
  if (mixed && push && pull) { const r = push / pull; if (r >= 0.5 && r <= 2) pros.push('Spinta e tirata in equilibrio (petto/spalle/tricipiti contro schiena/bicipiti): bene per postura e spalle.'); else { cons.push(r > 2 ? 'Molta più spinta che tirata: con il tempo le spalle vanno avanti.' : 'Molta più tirata che spinta.'); score -= 1; tips.push(r > 2 ? 'Aggiungi un rematore o un face pull, oppure togli una spinta.' : 'Aggiungi una spinta per il gruppo che già alleni qui (es. press per le spalle) oppure togli una tirata.'); } }
  else if (upper && (push || pull) && n >= 4 && !weekHas(push ? PULL : PUSH, pid)) { cons.push(push ? 'In tutta la settimana ci sono solo spinte, nessuna tirata.' : 'In tutta la settimana ci sono solo tirate, nessuna spinta.'); score -= 1; tips.push(push ? 'Metti almeno un rematore o una lat machine in uno dei giorni.' : 'Metti almeno una spinta (panca Smith o press con manubri) in uno dei giorni.'); }
  const fi = L.findIndex(x => byId[x.e].tipo === 'iso'), fc = L.findIndex(x => byId[x.e].tipo === 'comp');
  if (fc >= 0 && fi >= 0 && fi < fc) { cons.push(`“${byId[L[fi].e].n}” (isolamento) viene prima dei multiarticolari.`); score -= 1; tips.push('Metti prima i multiarticolari (quando sei fresco), poi gli esercizi di isolamento.'); }
  else if (fc >= 0) pros.push('Ordine giusto: multiarticolari prima, isolamento dopo.');
  const keys = {}; L.forEach(x => { const k = mkey(byId[x.e]) + '|' + byId[x.e].tipo; (keys[k] = keys[k] || []).push(byId[x.e].n); });
  Object.values(keys).filter(a => a.length > 1).forEach(a => { cons.push(`Doppione: ${a.join(' e ')} lavorano esattamente gli stessi muscoli.`); score -= 0.5; });
  const na = L.filter(x => !avail(byId[x.e])); if (na.length) { cons.push(`${na.length} esercizi con attrezzi che hai segnato come non disponibili.`); score -= 1; tips.push('Sostituiscili in Modifica → Aggiungi esercizi (filtra per attrezzo).'); }
  const longRec = L.filter(x => secs(x.rec) >= 150).length; if (longRec && longRec === n && L.some(x => byId[x.e].tipo === 'iso')) tips.push('Sugli esercizi di isolamento bastano 60-90 secondi di recupero.');
  score = Math.max(1, Math.min(10, Math.round(score * 2) / 2));
  const grade = score >= 9 ? 'ottima' : score >= 7 ? 'buona' : score >= 5 ? 'da sistemare' : 'da rivedere', icon = score >= 9 ? '🏆' : score >= 7 ? '👍' : score >= 5 ? '🛠' : '⚠️';
  return {score, grade, icon, pros, cons, tips, n, tot, mins, groups, pair: pr};
}
/* proposte concrete per un giorno: riordino, esercizi da togliere, sostituire o aggiungere (si applicano solo dopo conferma) */
const TIER = e => e.tipo === 'comp' ? (e.g === 'gambe' ? 0 : e.g === 'schiena' || e.g === 'petto' ? 1 : 2) : e.tipo === 'semi' ? 3 : e.tipo === 'iso' ? 4 : 5;
const POST = /stacco|rdl|pull-?through|hip thrust|leg curl|kickback/i, KNEE = /squat|affond|bulgar|leg extension|split/i;
const exScore = e => (DB.fav[e.id] ? 80 : 0) + (e.prio ? 20 : 0) + (e.tipo === 'comp' ? 8 : 0) + (e.unCavo ? 2 : 0) - (e.due ? 6 : 0) - (e.one ? 3 : 0);
const PROP = {pid: null, list: []};
function proposeDay(pid) {
  const L = rtList(pid).filter(x => byId[x.e]); if (!L.length) return [];
  const out = [], ids = () => L.map(x => x.e), keys = () => new Set(L.map(x => mkey(byId[x.e])));
  const best = (g, test) => EX.filter(e => avail(e) && e.g === g && !ids().includes(e.id) && !keys().has(mkey(e)) && (!test || test(e))).sort((a, b) => exScore(b) - exScore(a))[0];
  const item = e => { const pr = presOf(e, 'massa') || {s: 3, r: '8-12', rec: '90 s'}; return {e: e.id, s: pr.s, r: pr.r, rec: pr.rec, obj: (e.fin || []).includes('massa') ? 'massa' : undefined}; };
  // 1. doppioni → togli il secondo (non preferito)
  const seen = {}; L.forEach(x => { const e = byId[x.e], k = mkey(e) + '|' + e.tipo; if (seen[k]) { const keep = (!avail(seen[k]) && avail(e)) || (DB.fav[e.id] && !DB.fav[seen[k].id]) ? seen[k] : e; out.push({t: 'remove', id: keep.id, title: `Togli “${keep.n}”`, why: `Lavora esattamente gli stessi muscoli di “${(keep === e ? seen[k] : e).n}”: basta uno dei due.`}); } else seen[k] = e; });
  // 2. attrezzi non disponibili → sostituisci
  L.forEach(x => { const e = byId[x.e]; if (avail(e) || out.some(o => o.t === 'remove' && o.id === e.id)) return; const sub = best(e.g, c => (c.fin || []).some(f => (e.fin || []).includes(f)) || true); if (sub) out.push({t: 'swap', id: e.id, nid: sub.id, title: `Sostituisci “${e.n}” con “${sub.n}”`, why: `${e.a}: attrezzo segnato come non disponibile. ${sub.n} allena gli stessi muscoli con ${sub.a.toLowerCase()}.`}); else out.push({t: 'remove', id: e.id, title: `Togli “${e.n}”`, why: `${e.a}: attrezzo non disponibile e nessuna alternativa trovata.`}); });
  // 3. troppi esercizi → togli gli isolamenti meno importanti oltre l'ottavo
  const removed = new Set(out.filter(o => o.t === 'remove').map(o => o.id)); let n = L.length - removed.size;
  if (n > 9) { L.filter(x => !removed.has(x.e)).map(x => byId[x.e]).sort((a, b) => TIER(b) - TIER(a) || exScore(a) - exScore(b)).slice(0, n - 8).forEach(e => { removed.add(e.id); out.push({t: 'remove', id: e.id, title: `Togli “${e.n}”`, why: 'Con più di 9 esercizi la qualità delle ultime serie cala: questo è il meno prioritario.'}); }); n = L.length - removed.size; }
  // 4. equilibrio spinta/tirata e gambe
  const live = L.filter(x => !removed.has(x.e)).map(x => byId[x.e]), has = g => live.some(e => e.g === g || (e.g2 || []).includes(g));
  const push = live.some(isPush), pull = live.some(isPull);
  const prk = pairing(pid), mixedP = prk && (prk.kind === 'full' || prk.kind === 'mixed');
  if (push && !pull && live.length >= 3 && !weekHas(PULL, pid)) { const c = best('schiena', e => e.tipo !== 'iso'); if (c) out.push({t: 'add', nid: c.id, title: `Aggiungi “${c.n}”`, why: 'In tutta la settimana ci sono solo spinte: una tirata per la schiena protegge le spalle e la postura.'}); }
  if (pull && !push && live.length >= 3 && !weekHas(PUSH, pid)) { const c = best('petto', e => e.tipo !== 'iso') || best('spalle', e => e.tipo !== 'iso'); if (c) out.push({t: 'add', nid: c.id, title: `Aggiungi “${c.n}”`, why: 'In tutta la settimana ci sono solo tirate: manca una spinta per petto o spalle.'}); }
  if (mixedP && push && pull) { const ps = live.filter(isPush).length, pl = live.filter(isPull).length;
    if (ps >= pl * 2 + 1) { const c = best('schiena'); if (c) out.push({t: 'add', nid: c.id, title: `Aggiungi “${c.n}”`, why: `${ps} esercizi di spinta contro ${pl} di tirata: riequilibra con un altro esercizio per la schiena.`}); }
    if (pl >= ps * 2 + 1) { const c = best('petto') || best('spalle'); if (c) out.push({t: 'add', nid: c.id, title: `Aggiungi “${c.n}”`, why: `${pl} esercizi di tirata contro ${ps} di spinta: aggiungi una spinta.`}); } }
  if (false && has('gambe')) { const legs = live.filter(e => e.g === 'gambe'); const knee = legs.some(e => KNEE.test(e.n)), post = legs.some(e => POST.test(e.n));
    if (knee && !post) { const c = best('gambe', e => POST.test(e.n)); if (c) out.push({t: 'add', nid: c.id, title: `Aggiungi “${c.n}”`, why: 'Hai solo squat/affondi: manca un esercizio per femorali e glutei (catena posteriore).'}); }
    if (post && !knee) { const c = best('gambe', e => KNEE.test(e.n)); if (c) out.push({t: 'add', nid: c.id, title: `Aggiungi “${c.n}”`, why: 'Hai solo stacchi/femorali: manca uno squat o un affondo per i quadricipiti.'}); } }
  // 5. pochi esercizi → aggiungi un multiarticolare per il gruppo principale
  if (n + out.filter(o => o.t === 'add').length < 4) { const main = Object.entries(live.reduce((m, e) => { m[e.g] = (m[e.g] || 0) + 1; return m; }, {})).sort((a, b) => b[1] - a[1])[0]; const g = main ? main[0] : 'schiena'; const c = best(g, e => e.tipo === 'comp') || best(g); if (c) out.push({t: 'add', nid: c.id, title: `Aggiungi “${c.n}”`, why: `Con meno di 4 esercizi la seduta è corta: un altro esercizio per ${GRUPPI[g].toLowerCase()}.`}); }
  // 6. ordine: gambe e multiarticolari grandi prima, poi spalle/braccia, semi, isolamento, addome
  const finalIds = L.filter(x => !removed.has(x.e)).map(x => { const sw = out.find(o => o.t === 'swap' && o.id === x.e); return sw ? sw.nid : x.e; }).concat(out.filter(o => o.t === 'add').map(o => o.nid));
  const sorted = finalIds.slice().sort((a, b) => TIER(byId[a]) - TIER(byId[b]));
  const curOrder = L.filter(x => !removed.has(x.e)).map(x => x.e), curSorted = curOrder.slice().sort((a, b) => TIER(byId[a]) - TIER(byId[b]));
  if (curOrder.join() !== curSorted.join()) out.push({t: 'order', order: sorted, title: 'Riordina gli esercizi', why: 'Prima gambe e multiarticolari grandi (schiena, petto), poi spalle e spinte minori, poi isolamento e addome: così fai gli esercizi pesanti quando sei fresco. Nuovo ordine: ' + sorted.map((id, i) => (i + 1) + '. ' + byId[id].n.split(' (')[0]).join(' · ')});
  else if (out.some(o => o.t === 'add' || o.t === 'swap') && finalIds.join() !== sorted.join()) out.push({t: 'order', order: sorted, title: 'Metti i nuovi esercizi al posto giusto', why: 'Nuovo ordine: ' + sorted.map((id, i) => (i + 1) + '. ' + byId[id].n.split(' (')[0]).join(' · ')});
  return out;
}
function proposeApply(pid, chosen) {
  let L = rtList(pid).slice(); const done = [];
  chosen.forEach(o => { if (o.t === 'remove') { L = L.filter(x => x.e !== o.id); done.push(o.title); }
    else if (o.t === 'swap') { const i = L.findIndex(x => x.e === o.id); const e = byId[o.nid], pr = presOf(e, (L[i] || {}).obj || 'massa') || presOf(e, 'massa') || {s: 3, r: '8-12', rec: '90 s'}; const it = {e: o.nid, s: pr.s, r: pr.r, rec: pr.rec, obj: L[i] && L[i].obj && presOf(e, L[i].obj) ? L[i].obj : undefined}; if (i >= 0) L[i] = it; else L.push(it); done.push(o.title); }
    else if (o.t === 'add') { if (!L.some(x => x.e === o.nid)) { const e = byId[o.nid], pr = presOf(e, 'massa') || {s: 3, r: '8-12', rec: '90 s'}; L.push({e: o.nid, s: pr.s, r: pr.r, rec: pr.rec, obj: (e.fin || []).includes('massa') ? 'massa' : undefined}); } done.push(o.title); } });
  const ord = chosen.find(o => o.t === 'order'); if (ord) { L.sort((a, b) => TIER(byId[a.e]) - TIER(byId[b.e])); done.push('Riordinati'); }
  DB.rt[pid] = L; save(); return done;
}
/* ---------- riorganizza la settimana: quali gruppi allenare insieme e in quale giorno ---------- */
const SPLITS = {1: [['petto', 'schiena', 'spalle', 'bicipiti', 'tricipiti', 'avambracci']], 2: [['petto', 'spalle', 'tricipiti'], ['schiena', 'bicipiti', 'avambracci']], 3: [['petto', 'tricipiti'], ['schiena', 'bicipiti'], ['spalle', 'avambracci']], 4: [['petto'], ['schiena'], ['spalle'], ['bicipiti', 'tricipiti', 'avambracci']]};
const SPLIT_NAMES = {1: ['Parte alta completa'], 2: ['Spinta', 'Tirata'], 3: ['Petto + Tricipiti', 'Schiena + Bicipiti', 'Spalle + Avambracci'], 4: ['Petto', 'Schiena', 'Spalle', 'Braccia']};
const SPLIT_WHY = {1: 'Con un solo giorno fai tutta la parte alta: multiarticolari prima (panca, lat machine, rematore), poi spalle e braccia.',
  2: 'Con due giorni il migliore abbinamento è spinta / tirata: petto, spalle e tricipiti lavorano insieme quando spingi; schiena, bicipiti e avambracci quando tiri. Ogni muscolo ha giorni di recupero tra una seduta e l’altra.',
  3: 'Con tre giorni: petto con tricipiti e schiena con bicipiti (il braccio è già caldo dopo il gruppo grande e lo finisci con pochi esercizi); spalle in un giorno a parte, riposate, insieme agli avambracci.',
  4: 'Con quattro giorni ogni gruppo grande ha la sua seduta (petto, schiena, spalle) e un giorno è per le braccia: bicipiti e tricipiti alternati, tutto il resto riposa.'};
const permute = a => a.length <= 1 ? [a] : a.flatMap((x, i) => permute([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p]));
function proposeWeek() {
  const upperOf = pid => rtList(pid).filter(x => byId[x.e] && !SKIP_G.includes(byId[x.e].g));
  const pids = DAYS.map(([t]) => dayPid(t)).filter(pid => upperOf(pid).length); if (!pids.length) return null;
  const D = Math.min(4, pids.length);
  const keep = pids.length > D ? pids.slice().sort((a, b) => upperOf(b).length - upperOf(a).length).slice(0, D).sort((a, b) => pids.indexOf(a) - pids.indexOf(b)) : pids;
  const blocks = SPLITS[D], names = SPLIT_NAMES[D];
  const cnt = keep.map(pid => { const m = {}; upperOf(pid).forEach(x => { m[byId[x.e].g] = (m[byId[x.e].g] || 0) + 1; }); return m; });
  let best = null, bestS = -1;
  permute(keep.map((_, i) => i)).forEach(perm => { let sc = 0; blocks.forEach((b, i) => b.forEach(g => { sc += cnt[perm[i]][g] || 0; })); if (sc > bestS) { bestS = sc; best = perm; } });
  const target = {}, plan = keep.map(pid => ({pid, name: '', groups: []}));
  blocks.forEach((b, i) => { const pid = keep[best[i]]; b.forEach(g => { target[g] = pid; }); plan[best[i]].name = names[i]; plan[best[i]].groups = b; });
  const moves = []; pids.forEach(pid => upperOf(pid).forEach(x => { const to = target[byId[x.e].g]; if (to && to !== pid) moves.push({e: x.e, from: pid, to}); }));
  plan.forEach(d => { d.n = upperOf(d.pid).filter(x => target[byId[x.e].g] === d.pid).length + moves.filter(m => m.to === d.pid).length; d.gl = d.groups.filter(g => pids.some(pid => upperOf(pid).some(x => byId[x.e].g === g))); });
  return {D, plan, moves, why: SPLIT_WHY[D], dropped: pids.filter(pid => !keep.includes(pid))};
}
function weekPropHtml() {
  const w = proposeWeek(); if (!w) return `<h2 style="padding-right:44px">🔀 Riorganizza i muscoli per giorno</h2><p class="vnote">Nessun esercizio per la parte alta nelle schede: aggiungi prima gli esercizi.</p>`;
  const dn = pid => planOf(pid).nome;
  return `<h2 style="padding-right:44px">🔀 Riorganizza i muscoli per giorno</h2>
   <p class="vnote">Ho guardato tutti gli esercizi scelti nei ${w.D} giorni di allenamento${w.dropped.length ? ' (' + w.dropped.map(dn).join(', ') + ': i loro esercizi per la parte alta vengono spostati, gambe e addome restano)' : ''}. ${esc(w.why)}</p>
   <h3 style="margin:12px 0 6px">Come diventerebbe</h3>
   ${w.plan.map(d => `<div class="dayrow" style="cursor:default"><span class="dn">${esc(dn(d.pid).slice(0, 3))}</span><span class="t"><b>${esc(dn(d.pid))} → ${esc(d.name)}</b><small>${d.gl.map(gName).join(', ') || 'nessun esercizio al momento'} · ${d.n} esercizi</small></span></div>`).join('')}
   ${w.moves.length ? `<h3 style="margin:12px 0 6px">Spostamenti (${w.moves.length})</h3><ul class="evl tip">${w.moves.map(m => `<li>“${esc(byId[m.e].n)}” (${gName(byId[m.e].g)}): da <b>${esc(dn(m.from))}</b> a <b>${esc(dn(m.to))}</b></li>`).join('')}</ul>
   <p class="vnote">Gambe e addome non si toccano. Pesi, note e storico restano. Dopo lo spostamento ogni giorno viene riordinato (multiarticolari prima) e prende il nome del gruppo.</p>
   <div class="sbar" style="padding:8px 0 0"><button class="primary" style="width:auto;padding:10px 18px" data-act="weekapply">✓ Sì, sposta gli esercizi</button><button class="ghost" data-act="no">No, lascia così</button></div>` : '<p class="gn" style="margin-top:10px">✅ La settimana è già organizzata così: niente da spostare.</p>'}`;
}
function applyWeek(w) {
  w.moves.forEach(m => { const L = rtList(m.from), i = L.findIndex(x => x.e === m.e); if (i < 0) return; const [it] = L.splice(i, 1); if (!rtList(m.to).some(x => x.e === m.e)) rtList(m.to).push(it); });
  w.plan.forEach(d => { rtList(d.pid).sort((a, b) => TIER(byId[a.e]) - TIER(byId[b.e])); const old = DB.names[d.pid] || {}; DB.names[d.pid] = {n: old.n || dayName(d.pid), m: d.gl.map(g => GRUPPI[g]).join(', ')}; });
  save(); return w.moves.length;
}
function evalHtml(pid) {
  const v = evalDay(pid), p = planOf(pid); if (!v) return '';
  if (v.skip) return `<h2 style="padding-right:44px">${v.icon} ${esc(p.nome)}: ${v.grade}</h2><p class="vnote">${esc(v.pros[0])}</p><div class="sbar" style="padding:12px 0 0"><button class="ghost" data-act="godayedit" data-id="${pid === 'gA' ? 'giulia' : pid}">✏️ Modifica a mano</button></div>`;
  return `<h2 style="padding-right:44px">${v.icon} ${esc(p.nome)}: ${v.score}/10, ${v.grade}</h2><p class="vnote">${v.n} esercizi · ${v.tot} serie · ~${v.mins} minuti. Giudizio automatico sull'insieme degli esercizi che hai scelto (non sul peso che usi).</p>
   ${v.pair ? `<div class="pairbox ${v.pair.ok ? 'ok' : 'no'}"><b>${v.pair.ok ? '✅' : '🔀'} Abbinamento muscoli</b><p>${esc(v.pair.title)}.</p><p class="vnote" style="margin:4px 0 0">${esc(v.pair.why)}${v.pair.alt ? ' <b>Meglio:</b> ' + esc(v.pair.alt) : ''}</p></div>` : ''}
   ${v.pros.length ? `<h3 style="margin:12px 0 6px">Cosa va bene</h3><ul class="evl ok">${v.pros.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
   ${v.cons.length ? `<h3 style="margin:12px 0 6px">Cosa migliorare</h3><ul class="evl no">${v.cons.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '<p class="vnote">Nessun punto debole trovato.</p>'}
   ${v.tips.length ? `<h3 style="margin:12px 0 6px">Consigli</h3><ul class="evl tip">${v.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
   ${(() => { PROP.pid = pid; PROP.list = proposeDay(pid); if (!PROP.list.length) return '<p class="gn" style="margin-top:12px">✅ Ordine ed esercizi vanno bene così: nessuna modifica da proporre.</p>';
     return `<h3 style="margin:14px 0 6px">Proposte di modifica <small style="font-weight:600;color:var(--mut)">(scegli quali seguire)</small></h3>${PROP.list.map((o, i) => `<label class="wzrow on"><input type="checkbox" data-prop="${i}" checked><span class="t"><b>${esc(o.title)}</b><small>${esc(o.why)}</small></span>${o.nid ? `<button class="ghost" data-act="open" data-id="${o.nid}" style="padding:6px 10px">3D</button>` : ''}</label>`).join('')}
     <div class="sbar" style="padding:8px 0 0"><button class="primary" style="width:auto;padding:10px 18px" data-act="propapply" data-pid="${pid}">✓ Applica le modifiche scelte</button></div>`; })()}
   <div class="sbar" style="padding:12px 0 0">${v.pair && !v.pair.ok ? '<button class="primary" style="width:auto;padding:10px 16px" data-act="weekprop">🔀 Riorganizza i muscoli per giorno</button>' : ''}<button class="ghost" data-act="godayedit" data-id="${pid === 'gA' ? 'giulia' : pid}">✏️ Modifica a mano</button></div>`;
}
// qualità dell'allenamento dallo storico
// tutte le sedute: quelle registrate (DB.sess) più le date che compaiono solo nello storico degli esercizi (sedute salvate con le versioni precedenti)
function allSess() {
  const out = (DB.sess || []).slice(), have = new Set(out.map(x => x.d)), byD = {};
  Object.entries(DB.hist).forEach(([k, h]) => { const id = k.split(':')[1]; if (!byId[id]) return; (h || []).forEach(e => { if (!e.d || have.has(e.d)) return; (byD[e.d] = byD[e.d] || {n: 0, sd: 0}); byD[e.d].n++; byD[e.d].sd += e.sets.length; }); });
  Object.entries(byD).forEach(([d, v]) => out.push({d, pid: null, n: v.n, sd: v.sd, name: 'Seduta (dallo storico)'}));
  return out.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0);
}
const weekKey = (d, i) => { const t = new Date(d + 'T12:00:00'); t.setDate(t.getDate() + 7 * (i || 0)); return new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
function quality() {
  const sess = allSess(), t = today(), wk0 = mondayOf(t), weeks = [];
  const first = sess.length ? mondayOf(sess[0].d) : wk0, nW = Math.max(8, Math.round((new Date(wk0 + 'T12:00:00') - new Date(first + 'T12:00:00')) / (7 * 864e5)) + 1);
  for (let i = nW - 1; i >= 0; i--) { const key = weekKey(wk0, -i); weeks.push({key, n: sess.filter(x => mondayOf(x.d) === key).length}); }
  const planned = plannedDays().length || 1, last4 = weeks.slice(-4).reduce((t, w) => t + w.n, 0);
  const cost = Math.min(1, last4 / (planned * 4));
  let imp = 0, cmp = 0; Object.values(DB.hist).forEach(h => { if (!h || h.length < 2) return; const a = h[h.length - 2], b = h[h.length - 1]; const mx = e => Math.max(0, ...e.sets.map(s => num(s.kg))), rp = e => Math.max(0, ...e.sets.map(s => num(s.reps))), vol = e => e.sets.reduce((t, s) => t + num(s.kg) * num(s.reps), 0); cmp++; if (mx(b) > mx(a) || (mx(b) === mx(a) && rp(b) > rp(a)) || vol(b) > vol(a)) imp++; });
  const prog = cmp ? imp / cmp : null;
  const recent = sess.slice(-5).filter(x => x.st), compl = recent.length ? recent.reduce((t, x) => t + Math.min(1, x.sd / Math.max(1, x.st)), 0) / recent.length : null;
  const cov = new Set(); plannedDays().forEach(pid => rtList(pid).forEach(x => { const e = byId[x.e]; if (e) { cov.add(e.g); (e.g2 || []).forEach(g => cov.add(g)); } }));
  const main = ['petto', 'schiena', 'spalle', 'bicipiti', 'tricipiti'], bal = main.filter(g => cov.has(g)).length / main.length, missing = main.filter(g => !cov.has(g));
  let streak = 0; for (let i = weeks.length - 1; i >= 0; i--) { if (weeks[i].n) streak++; else if (i < weeks.length - 1) break; }
  const thisWeek = weeks[weeks.length - 1].n, lastSess = sess[sess.length - 1];
  const daysSince = lastSess ? Math.round((new Date(t + 'T12:00:00') - new Date(lastSess.d + 'T12:00:00')) / 864e5) : null;
  return {weeks, planned, cost, prog, compl, bal, missing, streak, thisWeek, lastSess, daysSince, imp, cmp, nsess: sess.length};
}
function tipsFor(q) {
  const tips = [];
  if (!q.nsess) tips.push({i: '🚀', t: 'Parti oggi: scegli il giorno, tocca Allenati e segna le serie con ✓. Il timer di recupero parte da solo.'});
  if (q.daysSince !== null && q.daysSince >= 7) tips.push({i: '📅', t: `Sono passati ${q.daysSince} giorni dall'ultima seduta: riprendi con pesi un po' più leggeri (-10%) e risali in 1-2 settimane.`});
  if (q.nsess && q.cost < 0.6 && q.planned > 1) tips.push({i: '🎯', t: `Hai ${q.planned} giorni programmati ma nelle ultime 4 settimane hai fatto ${q.weeks.slice(-4).reduce((t, w) => t + w.n, 0)} sedute. Meglio 2-3 giorni fatti davvero che 5 saltati: riduci la scheda se serve.`});
  if (q.prog !== null && q.cmp >= 3 && q.prog < 0.3) tips.push({i: '📈', t: 'Pochi esercizi sono migliorati rispetto alla volta prima: quando chiudi tutte le serie al numero di ripetizioni previsto, la volta dopo aggiungi 2,5 kg (sui cavi una tacca).'});
  if (q.prog !== null && q.prog >= 0.6) tips.push({i: '🔥', t: `Stai progredendo su ${q.imp} esercizi su ${q.cmp}: continua così e ricordati di dormire e mangiare abbastanza proteine.`});
  if (q.compl !== null && q.compl < 0.7) tips.push({i: '✂️', t: 'Nelle ultime sedute hai completato meno del 70% delle serie: scheda troppo lunga o troppo poco tempo. Togli 1-2 esercizi per giorno.'});
  if (q.missing.length && q.planned) tips.push({i: '⚖️', t: `Nella settimana non alleni: ${q.missing.map(gName).join(', ')}. Aggiungi almeno un esercizio per ciascuno in uno dei giorni.`});
  plannedDays().forEach(pid => { const pr = pairing(pid); if (pr && !pr.ok) tips.push({i: '🔀', t: `${planOf(pid).nome}: ${pr.title}. Posso spostare i gruppi in altri giorni.`, week: true}); });
  const cons = plannedDays().map(pid => ({pid, v: evalDay(pid)})).filter(x => x.v && x.v.score !== null && x.v.score < 7 && !(x.v.pair && !x.v.pair.ok));
  cons.forEach(x => tips.push({i: '🛠', t: `${planOf(x.pid).nome}: ${x.v.cons[0] || 'da sistemare'} Tocca la valutazione per i dettagli.`, pid: x.pid}));
  // esercizi pronti per aumentare il carico
  const up = []; plannedDays().forEach(pid => { const p = planOf(pid); rtList(pid).forEach(x => { const k = pk(p.profilo || 'io', x.e), h = lastHist(k), u = upper(x.r); if (h && u && h.sets.length && h.sets.every(s => num(s.reps) >= u && num(s.kg) > 0) && !up.some(z => z.e === x.e)) up.push({e: x.e, kg: Math.max(...h.sets.map(s => num(s.kg)))}); }); });
  if (up.length) tips.push({i: '⬆️', t: 'Pronto per aumentare il peso: ' + up.slice(0, 3).map(z => byId[z.e].n.split(' (')[0] + ' (' + z.kg + ' → ' + (z.kg + 2.5) + ' kg)').join(', ') + '.'});
  if (q.streak >= 3) tips.push({i: '🏅', t: `${q.streak} settimane di fila con almeno una seduta: la costanza è ciò che conta di più.`});
  if (!tips.length) tips.push({i: '✅', t: 'Tutto in ordine: scheda equilibrata e sedute regolari. Ogni 6-8 settimane cambia qualche esercizio per non annoiarti.'});
  return tips.slice(0, 6);
}
const qbar = (lab, v, txt) => `<div class="qrow"><span>${lab}</span><div class="qb"><i style="width:${v === null ? 0 : Math.round(v * 100)}%;background:${v === null ? 'transparent' : v >= .7 ? 'var(--ok)' : v >= .4 ? '#f59e0b' : '#ef4444'}"></i></div><b>${txt}</b></div>`;
function homeView() {
  const q = quality(), t = today(), tid = todayTabId(), pid = dayPid(tid), p = planOf(pid), prof = p.profilo || 'io';
  const {tot, dn, mins} = planTot(p, prof), v = evalDay(pid);
  const next = plannedDays().length ? DAYS.map(([x]) => x).map((x, i, arr) => arr[(arr.indexOf(tid) + 1 + i) % 7]).find(x => rtList(dayPid(x)).length) : null;
  const hello = new Date().getHours() < 13 ? 'Buongiorno' : new Date().getHours() < 19 ? 'Buon pomeriggio' : 'Buonasera';
  const vals = [q.cost, q.prog, q.compl, q.bal].filter(x => x !== null), avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  const verdict = !q.nsess ? 'Ancora nessuna seduta salvata: i giudizi arrivano dopo le prime sedute.' : avg >= .75 ? '👍 Ti stai allenando bene: costante, in progressione ed equilibrato.' : avg >= .5 ? '🙂 Vai abbastanza bene: guarda i consigli qui sotto per migliorare il punto più debole.' : '⚠️ C’è da sistemare: leggi i consigli e parti dalla costanza.';
  const max = Math.max(1, q.planned, ...q.weeks.map(w => w.n));
  return `<section class="hero home"><div class="eyebrow">${hello}</div><h2>${esc(WD[new Date().getDay()])}</h2><div class="sub">${esc(fmtLong(t).replace(/^\S+ /, ''))}${q.lastSess ? ' · ultima seduta ' + esc(fmtWd(q.lastSess.d)) : ''}</div>
   ${p.ex.length ? `<p><b>Oggi: ${esc(p.nome)}${p.sotto ? ' · ' + esc(p.sotto) : ''}</b> · ${p.ex.length} esercizi · ${tot} serie · ~${Math.round(mins / 600) * 10} min${v && !v.skip ? ` · ${v.icon} ${v.score}/10` : ''}</p>
   <button class="primary trainbtn" data-act="train" data-pid="${pid}">▶ Allenati${dn && dn < tot ? ' · continua' : ''}</button><div class="progt" style="margin-top:8px"><button class="tlink" data-act="tab" data-id="${tid}">Vedi la scheda di oggi ›</button></div>`
   : `<p>Oggi non hai esercizi programmati${next ? `: il prossimo giorno è <b>${esc(planOf(dayPid(next)).nome)}</b> (${rtList(dayPid(next)).length} esercizi).` : '.'}</p><div class="sbar" style="padding:10px 0 0">${next ? `<button class="primary" style="width:auto;padding:11px 16px" data-act="train" data-pid="${dayPid(next)}">▶ Allenati lo stesso con ${esc(planOf(dayPid(next)).nome)}</button>` : ''}<button class="ghost" data-act="tab" data-id="${tid}">Prepara la scheda di oggi</button></div>`}</section>
   <div class="card"><h2 class="ht">📈 Andamento</h2><p class="vnote" style="margin:0 0 10px">Sedute per settimana dalla prima registrata (${q.weeks.length} settimane)${q.planned ? ` · programmate: ${q.planned} a settimana` : ''}.</p>
    <div class="barsw"><div class="bars" style="width:${Math.max(100, q.weeks.length * 46)}px">${q.weeks.map((w, i) => `<button class="bar" data-act="wk" data-w="${w.key}" aria-label="Settimana del ${fmtD(w.key)}"><i style="height:${Math.round(w.n / max * 100)}%;${w.n >= q.planned && w.n ? 'background:var(--ok)' : ''}"></i><b>${w.n}</b><small>${i === q.weeks.length - 1 ? 'ora' : fmtD(w.key)}</small></button>`).join('')}</div></div>
    <p class="vnote" style="margin:0 0 8px">${q.weeks.length > 8 ? 'Scorri a sinistra per le settimane precedenti · ' : ''}tocca una settimana per vedere le sedute e gli esercizi fatti.</p>
    <div class="stats dark"><div class="stat"><b>${q.thisWeek}/${q.planned}</b><span>questa sett.</span></div><div class="stat"><b>${q.streak}</b><span>sett. di fila</span></div><div class="stat"><b>${q.nsess}</b><span>sedute totali</span></div></div></div>
   <div class="card"><h2 class="ht">🩺 Qualità dell’allenamento</h2><p style="margin:4px 0 10px">${verdict}</p>
    ${qbar('Costanza', q.cost, q.nsess ? Math.round(q.cost * 100) + '%' : '–')}${qbar('Progressione', q.prog, q.prog === null ? '–' : q.imp + '/' + q.cmp)}${qbar('Serie completate', q.compl, q.compl === null ? '–' : Math.round(q.compl * 100) + '%')}${qbar('Equilibrio muscoli', q.bal, Math.round(q.bal * 5) + '/5')}
    <p class="vnote">Costanza = sedute fatte su quelle programmate (4 settimane). Progressione = esercizi migliorati rispetto alla volta prima. Serie completate = nelle ultime 5 sedute. Equilibrio = gruppi della parte alta coperti nella settimana (gambe e addome esclusi per tua scelta).</p></div>
   <div class="card"><h2 class="ht">💡 Consigli</h2><ul class="tips">${tipsFor(q).map(x => `<li><span>${x.i}</span><div>${esc(x.t)}${x.pid ? ` <button class="tlink" data-act="evalday" data-pid="${x.pid}">Vedi</button>` : x.week ? ' <button class="tlink" data-act="weekprop">Proponi</button>' : ''}</div></li>`).join('')}</ul></div>
   <div class="card"><h2 class="ht">📋 Le tue giornate</h2><p class="vnote" style="margin:0 0 8px">Valutazione automatica dell’insieme di esercizi scelto per ogni giorno: tocca per la spiegazione.</p>
    ${(() => { const w = proposeWeek(); return w && w.moves.length ? `<button class="ghost addmore" data-act="weekprop" style="margin:0 0 10px">🔀 Riorganizza i muscoli per giorno (${w.moves.length} spostamenti proposti)</button>` : ''; })()}
    ${DAYS.map(([x, , full]) => { const id = dayPid(x), pp = planOf(id), e = evalDay(id); return `<button class="dayrow ${e ? '' : 'off'} ${x === tid ? 'today' : ''}" data-act="${e ? 'evalday' : 'tab'}" data-pid="${id}" data-id="${x}"><span class="dn">${full.slice(0, 3)}</span><span class="t"><b>${esc(pp.nome)}${pp.sotto ? ' · ' + esc(pp.sotto) : ''}</b><small>${e ? `${e.n} esercizi · ${e.tot} serie · ~${e.mins} min · ${e.groups.map(g => GRUPPI[g]).join(', ')}` : 'riposo / nessun esercizio'}</small></span>${e ? (e.skip ? `<span class="sc s10" style="background:var(--in);color:var(--mut)">${e.icon}</span>` : `<span class="sc s${Math.round(e.score)}">${e.icon} ${e.score}</span>`) : '<span class="chev">›</span>'}</button>`; }).join('')}</div>`;
}

function weekDetHtml(key) {
  const q = quality(), idx = q.weeks.findIndex(w => w.key === key), sess = allSess().filter(x => mondayOf(x.d) === key), end = weekKey(key, 1);
  const days = {}; sess.forEach(x => { (days[x.d] = days[x.d] || []).push(x); });
  const exOn = d => Object.entries(DB.hist).map(([k, h]) => { const id = k.split(':')[1], e = (h || []).find(z => z.d === d); return e && byId[id] ? {ex: byId[id], e} : null; }).filter(Boolean);
  const planned = q.planned, n = sess.length;
  const d6 = new Date(key + 'T12:00:00'); d6.setDate(d6.getDate() + 6); const endD = new Date(d6.getTime() - d6.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  return `<h2 style="padding-right:44px">Settimana ${fmtD(key)} – ${fmtD(endD)}</h2>
   <div class="sbar" style="padding:0 0 8px"><button class="ghost" data-act="wk" data-w="${weekKey(key, -1)}"${idx <= 0 ? ' disabled' : ''}>← Precedente</button><button class="ghost" data-act="wk" data-w="${weekKey(key, 1)}"${idx >= q.weeks.length - 1 || idx < 0 ? ' disabled' : ''}>Successiva →</button></div>
   <div class="stats dark" style="margin:0 0 12px"><div class="stat"><b>${n}</b><span>sedute</span></div><div class="stat"><b>${planned}</b><span>programmate</span></div><div class="stat"><b>${sess.reduce((t, x) => t + (x.sd || 0), 0)}</b><span>serie fatte</span></div></div>
   ${n ? Object.keys(days).sort().map(d => `<div class="card" style="padding:10px 12px"><h3 style="margin:0 0 4px;font-size:17px">${esc(fmtLong(d))}</h3>${days[d].map(x => `<p class="vnote" style="margin:0 0 6px">${esc(x.name)}${x.tot ? ` · ${x.n}/${x.tot} esercizi` : ` · ${x.n} esercizi`}${x.st ? ` · ${x.sd}/${x.st} serie` : ''}</p>`).join('')}
     <table class="wkt">${exOn(d).map(({ex, e}) => `<tr><td>${esc(ex.n)}</td><td>${e.sets.map(s => `${esc(s.kg || '–')}×${esc(s.reps || '–')}`).join(' · ')}</td></tr>`).join('')}</table></div>`).join('') : '<p class="vnote">Nessuna seduta salvata in questa settimana.</p>'}`;
}

/* ---------- modali ---------- */
function ask(msg, label, cb) {
  modal(`<h2 style="padding-right:44px">${esc(msg)}</h2><div class="sbar" style="padding:12px 0 0"><button class="ghost" data-act="no">Annulla</button><button class="primary" style="width:auto;padding:10px 18px" data-act="yes">${esc(label)}</button></div>`);
  $('#mbody [data-act=yes]').onclick = () => { closeModal(); cb(); };
  $('#mbody [data-act=no]').onclick = closeModal;
}
const MSTACK = [];   // finestre aperte una sopra l'altra (es. 3D di un esercizio dentro una proposta): la X torna a quella sotto
function modal(html, push) { if (push && !$('#modal').hidden) MSTACK.push({html: $('#mbody').innerHTML, y: $('.sheet').scrollTop}); else MSTACK.length = 0; $('#mbody').innerHTML = html; $('#modal').hidden = false; document.body.style.overflow = 'hidden'; $('.sheet').scrollTop = 0; $('#mx').textContent = MSTACK.length ? '←' : '✕'; }
function closeModal() {
  if (MSTACK.length) { const prev = MSTACK.pop(); $('#mbody').innerHTML = prev.html; $('.sheet').scrollTop = prev.y; $('#mx').textContent = MSTACK.length ? '←' : '✕'; const f = $('#mbody [data-fig]'); if (f) FIG3.mount(f, byId[f.dataset.fig], FIG.mount); loadMine($('#mbody')); return; }
  $('#modal').hidden = true; $('#mbody').innerHTML = ''; document.body.style.overflow = ''; $('#mx').textContent = '✕'; if (tab === 'lib') render(true); }
$('#mx').onclick = closeModal;
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });

function openEx(id) {
  const ex = byId[id], k = pk('io', id);
  modal(`<h2 style="padding-right:44px">${esc(ex.n)}</h2><p style="color:var(--mut);margin:0 0 8px">${esc(GRUPPI[ex.g])} · ${esc(ex.a)}</p>
   <div class="card" style="padding:8px">${techHtml(ex)}</div>
   <div class="card"><button class="ghost" data-act="mtog" data-id="${ex.id}">${inAny(id) ? '✓ Nelle tue schede · modifica' : '＋ Aggiungi a una scheda'}</button></div>
   <div class="card"><h2>I tuoi pesi</h2>${setsHtml(k, 3, '')}${lastLine(k)}</div>`, true);
  const f = $('#mbody [data-fig]'); if (f) FIG3.mount(f, ex, FIG.mount);
  loadMine($('#mbody'));
}
function histView(k) {
  const [prof, id] = k.split(':'), ex = byId[id], h = (DB.hist[k] || []).slice().reverse();
  const best = h.reduce((m, e) => Math.max(m, ...e.sets.map(s => num(s.kg))), 0);
  modal(`<h2 style="padding-right:44px">Storico · ${esc(ex.n)}</h2>
   <p style="color:var(--mut)">${h.length ? `Peso massimo registrato: <b>${best} kg</b>` : 'Ancora nessuna sessione salvata. Usa “Fine allenamento” per archiviare la seduta.'}</p>
   ${DB.notes[id] ? `<p class="gn">📝 ${esc(DB.notes[id])}</p>` : ''}
   <div class="card hist">${h.map(e => `<div><b>${wdOf(e.d).slice(0, 3)} ${fmtD(e.d)}/${e.d.slice(2, 4)}</b> — ${e.sets.map(s => `${s.kg || '–'}×${s.reps || '–'}${s.note ? ` <i>(${esc(s.note)})</i>` : ''}`).join(' · ')}</div>`).join('')}</div>`, true);
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
  if (allSess().length) { t += '\nSEDUTE FATTE\n'; allSess().slice(-60).reverse().forEach(x => { t += '  ' + fmtWd(x.d) + ': ' + x.name + ' (' + x.n + ' esercizi)\n'; }); }
  data.forEach(({ex, h}) => { t += '\n' + ex.n + ' (' + GRUPPI[ex.g] + ')\n'; if (DB.notes[ex.id]) t += '  Note: ' + DB.notes[ex.id] + '\n'; h.forEach(e => { t += '  ' + fmtFull(e.d) + ': ' + e.sets.map(s => (s.kg || '–') + ' kg × ' + (s.reps || '–') + (s.note ? ' (' + s.note + ')' : '')).join(' · ') + '\n'; }); });
  return t;
}
function reportHtml(data) {
  if (!data.length) return '<p>Nessun allenamento archiviato: usa “Fine allenamento” per salvarlo nello storico.</p>';
  const sess = allSess().slice(-60).reverse();
  return (sess.length ? `<section class="rp"><h3>Sedute fatte <small>data reale · scheda usata</small></h3><table>${sess.map(x => `<tr><td>${esc(fmtWd(x.d))}</td><td>${esc(x.name)} <small>· ${x.n} esercizi</small></td></tr>`).join('')}</table></section>` : '') + data.map(({ex, h}) => { const best = Math.max(0, ...h.flatMap(e => e.sets.map(s => num(s.kg))));
    return `<section class="rp"><h3>${esc(ex.n)} <small>${esc(GRUPPI[ex.g])}${best ? ' · massimo ' + best + ' kg' : ''}</small></h3>${DB.notes[ex.id] ? `<p class="gn">📝 ${esc(DB.notes[ex.id])}</p>` : ''}<table>${h.map(e => `<tr><td>${esc(fmtWd(e.d))}</td><td>${e.sets.map(s => `${esc(s.kg || '–')} kg × ${esc(s.reps || '–')}${s.note ? ` <i>(${esc(s.note)})</i>` : ''}`).join(' · ')}</td></tr>`).join('')}</table></section>`; }).join('');
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
const wizPrio = e => !!e.prio && inG(e, 'schiena') && (!WZ.att.length || WZ.att.includes('Cavi')) && (!WZ.mus.length || WZ.mus.includes('schiena'));
// spalle ai cavi: prima gli esercizi con un solo cavo e due mani (corda, barra, maniglia doppia)
const wizPrioSp = e => e.g === 'spalle' && e.eq === 'cable' && !!e.unCavo && !e.one && WZ.mus.includes('spalle') && (!WZ.att.length || WZ.att.includes('Cavi'));
function wizPool() {
  return EX.filter(e => avail(e) && (wizPrio(e) || (attOk(e, WZ.att) && (!WZ.mus.length || WZ.mus.some(g => inG(e, g))))) && (e.fin || []).includes(WZ.fin) && (!WZ.lato || latoOf(e) === WZ.lato) && !WZ.rejected.includes(e.id) && !WZ.keep.includes(e.id));
}
function wizPropose() {
  const want = Math.min(4, Math.max(3, WZ.mus.length + 1)), out = WZ.keep.map(id => byId[id]);
  let pool = wizPool().filter(e => !out.some(o => mkey(o) === mkey(e)));
  if (!pool.length && WZ.rejected.length) { WZ.rejected = []; pool = wizPool().filter(e => !out.some(o => mkey(o) === mkey(e))); }
  const covered = new Set(out.map(e => e.g));
  while (out.length < want && pool.length) {
    const sc = e => { let s = Math.random() * .6; if (out.length) { const last = out[out.length - 1]; if (station(e) === station(last)) s += 3; else if (e.a === last.a) s += 1.6; if (out.some(o => station(o) === station(e))) s += .8; }
      if (!covered.has(e.g) && WZ.mus.length > 1) s += 2.2; if (e.tipo === 'comp') s += .7; if (e.due) s -= 2.5; if (e.unCavo) s += .6; if (wizPrio(e)) s += 100; if (wizPrioSp(e)) s += 50; if (DB.fav[e.id]) s += 80; return s; };
    pool.sort((a, b) => sc(b) - sc(a)); const pick = pool.shift(); out.push(pick); covered.add(pick.g); pool = pool.filter(e => mkey(e) !== mkey(pick));
  }
  WZ.cur = out.map(e => e.id); return out;
}
function wizHtml() {
  const chip2 = (t, v, on, l) => `<button class="chip ${on ? 'on' : ''}" data-act="wzchip" data-t="${t}" data-v="${esc(v)}">${esc(l)}</button>`;
  if (WZ.step === 1) return `<h2 style="padding-right:44px">✨ Proponimi esercizi</h2>
    <p class="vnote">Prima domanda: <b>con quali attrezzi</b> vuoi allenarti oggi? Puoi sceglierne più di uno.</p>
    <h3>Attrezzi</h3><div class="chips wrap">${chip2('att', '', !WZ.att.length, 'Tutti quelli disponibili')}${ATT_AV().map(a => chip2('att', a, WZ.att.includes(a), a === 'Panca' ? attLabel(a) : a + ' (' + attCount(a) + ')')).join('')}</div>
    <p class="vnote">${EX.filter(e => avail(e) && attOk(e, WZ.att)).length} esercizi con questi attrezzi.${WZ.att.length && !WZ.att.includes('Panca') ? ' Senza la panca restano esclusi gli esercizi che la richiedono (panca piana/inclinata, press seduti…).' : ''} In ⚙ Impostazioni → Attrezzi disponibili scegli quali hai in palestra.</p>
    <div class="sbar" style="padding:8px 0 0"><button class="primary" style="width:auto;padding:10px 18px" data-act="wznext">Avanti: muscoli e obiettivo →</button></div>`;
  if (WZ.step === 2) return `<h2 style="padding-right:44px">✨ Proponimi esercizi</h2>
    <p class="vnote">Attrezzi: <b>${esc(WZ.att.length ? WZ.att.join(', ') : 'tutti')}</b> · <button class="tlink" data-act="wzback1">cambia</button>. Ora muscoli e obiettivo: ti propongo 3-4 esercizi che si fanno bene di seguito.</p>
    <h3>Muscoli</h3><div class="chips wrap">${chip2('mus', '', !WZ.mus.length, 'Tutti')}${Object.entries(GRUPPI).map(([k, v]) => chip2('mus', k, WZ.mus.includes(k), v)).join('')}</div>
    <h3>Obiettivo</h3><div class="chips wrap">${Object.entries(FIN).map(([k, v]) => chip2('fin', k, WZ.fin === k, v)).join('')}</div>
    <h3>Un braccio o due</h3><div class="chips wrap">${chip2('lato', '', !WZ.lato, 'Indifferente')}${Object.entries(LATO).map(([k, v]) => chip2('lato', k, WZ.lato === k, v)).join('')}</div>
    <p class="vnote">${wizPool().length} esercizi disponibili con questa scelta.</p>
    <div class="sbar" style="padding:8px 0 0"><button class="primary" style="width:auto;padding:10px 18px" data-act="wzgo" ${wizPool().length ? '' : 'disabled'}>Proponi</button></div>`;
  const list = WZ.cur.map(id => byId[id]);
  const day = id => { const p = planOf(id); return p.nome + (p.sotto ? ' · ' + p.sotto : ''); };
  return `<h2 style="padding-right:44px">Proposta</h2>
    <p class="vnote">Spunta quelli che vuoi tenere. “Altra proposta” cambia solo quelli non spuntati.</p>
    ${list.map(e => `<label class="wzrow ${WZ.keep.includes(e.id) ? 'on' : ''}"><input type="checkbox" data-act="wzkeep" data-id="${e.id}" ${WZ.keep.includes(e.id) ? 'checked' : ''}>${cov(e.id, 'thumb') || ''}<span class="t"><b>${esc(e.n)}</b><small>${DB.fav[e.id] ? '⭐ preferito · ' : wizPrio(e) ? '⭐ dai tuoi video (schiena ai cavi) · ' : wizPrioSp(e) ? '⭐ un cavo, due mani · ' : ''}${esc(GRUPPI[e.g])} · ${esc(station(e))}${latoTxt(e) ? ' · ' + latoTxt(e) : ''}${presOf(e, WZ.fin) ? ' · ' + presOf(e, WZ.fin).sr + ' × ' + presOf(e, WZ.fin).r : ''}</small></span><button class="ghost" data-act="open" data-id="${e.id}" style="padding:6px 10px">3D</button></label>`).join('')}
    <div class="sbar" style="padding:10px 0 4px"><button class="ghost" data-act="wzagain">🔄 Altra proposta</button><button class="ghost" data-act="wzback">← Cambia scelta</button></div>
    <h3>In quale giorno?</h3><div class="chips wrap">${CUST.map(id => `<button class="chip ${WZ.pid === id ? 'on' : ''}" data-act="wzday" data-id="${id}">${esc(day(id))}</button>`).join('')}</div>
    <div class="sbar" style="padding:8px 0 0"><button class="primary" style="width:auto;padding:10px 18px" data-act="wzadd" ${WZ.keep.length && WZ.pid ? '' : 'disabled'}>Aggiungi ${WZ.keep.length || ''} a ${WZ.pid ? esc(planOf(WZ.pid).nome) : '…'}</button></div>`;
}

/* ---------- programmi pronti: allenamento completo e veloce (petto, schiena, spalle, bicipiti, tricipiti) ---------- */
const PRESETS = [
  {key: 'forza', fin: 'forza', n: '💪 Forza · corpo intero (parte alta)', d: 'Fondamentali alla Smith machine, sbarra, parallele e jammer arms (niente bilanciere libero). Serie pesanti e recuperi lunghi: circa 50-60 minuti.',
   ex: ['sm-panca', 'sm-row', 'sm-military', 'b-trazioni-neutra', 't-dip', 'c-curl-db', 'j-press-piedi']},
  {key: 'massa', fin: 'massa', n: '🏋️ Massa · corpo intero (parte alta)', d: 'Un esercizio per ogni gruppo con manubri e un cavo, 8-12 ripetizioni: circa 45-55 minuti.',
   ex: ['p-incl-db', 'b-row-barra-pro', 's-press-db', 'b-lat-larga', 'p-croci-alte-singolo', 's-laterali', 't-push-corda', 'c-curl-dietro']},
  {key: 'tonificare', fin: 'tonificare', n: '⚡ Tonificare · corpo intero (parte alta)', d: 'Tutto ai cavi con una sola torre, 12-15 ripetizioni e recuperi brevi: circa 35-40 minuti.',
   ex: ['p-press-cavo-singolo', 'b-row-corda', 's-facepull', 'b-pulldown-braccia-tese', 's-laterali', 't-overhead-corda', 'c-hammer-singolo', 'a-pallof']}];
const PS = {att: null, pid: null};   // attrezzi scelti per i programmi pronti (null = non ancora chiesto)
const psAtt = () => PS.att && PS.att.length ? PS.att : ATT_AV();
// costruisce il programma con gli attrezzi scelti: tiene gli esercizi del programma base se l'attrezzo c'è, altrimenti sostituisce con uno dello stesso gruppo (preferiti e "dai tuoi video" prima)
function presetBuild(P, atts) {
  const ok = e => avail(e) && attOk(e, atts) && (e.fin || []).includes(P.fin);
  const score = e => (DB.fav[e.id] ? 80 : 0) + (e.prio ? 20 : 0) + (e.tipo === 'comp' ? 5 : 0) + (e.unCavo ? 2 : 0) - (e.due ? 6 : 0) - (e.one ? 3 : 0);
  const out = [], used = new Set(), keys = new Set();
  const ok2 = e => avail(e) && attOk(e, atts);   // ripiego: stesso gruppo e attrezzo anche se non è indicato per quell'obiettivo
  const pickFor = g => EX.filter(c => ok(c) && c.g === g && !used.has(c.id) && !keys.has(mkey(c))).sort((a, b) => score(b) - score(a))[0] || EX.filter(c => ok2(c) && c.g === g && !used.has(c.id) && !keys.has(mkey(c))).sort((a, b) => score(b) - score(a))[0];
  P.ex.forEach(id => { const o = byId[id]; if (!o) return; let e = ok(o) && !keys.has(mkey(o)) ? o : null, sub = false;
    if (!e) { e = pickFor(o.g); sub = !!e; }
    if (e && !used.has(e.id)) { used.add(e.id); keys.add(mkey(e)); out.push({ex: e, sub, orig: sub ? o : null}); } });
  ['petto', 'schiena', 'spalle', 'bicipiti', 'tricipiti'].forEach(g => { if (!out.some(x => x.ex.g === g)) { const e = pickFor(g); if (e) { used.add(e.id); keys.add(mkey(e)); out.push({ex: e, sub: true, orig: null}); } } });
  return out;
}
function presetItems(P, atts) { return presetBuild(P, atts || psAtt()).map(({ex}) => { const pr = presOf(ex, P.fin) || presOf(ex, 'massa') || {s: 3, r: '8-12', rec: '90 s'}; return {e: ex.id, s: pr.s, r: pr.r, rec: pr.rec, obj: (ex.fin || []).includes(P.fin) ? P.fin : undefined}; }); }
function presetAttHtml(pid) {
  const all = ATT_AV(), sel = psAtt();
  return `<h2 style="padding-right:44px">📋 Programmi pronti</h2>
   <p class="vnote">Prima domanda: <b>con quali attrezzi</b> vuoi fare il programma? Scegline uno o più: ogni programma viene adattato (gli esercizi con attrezzi non scelti vengono sostituiti con altri dello stesso gruppo).</p>
   <div class="chips wrap">${all.map(a => `<button class="chip ${sel.includes(a) ? 'on' : ''}" data-act="psatt" data-a="${esc(a)}"${pid ? ` data-pid="${pid}"` : ''}>${a === 'Panca' ? esc(attLabel(a)) : esc(a) + ' (' + attCount(a) + ')'}</button>`).join('')}</div>
   <p class="vnote">${sel.length === all.length ? 'Tutti gli attrezzi disponibili.' : sel.length + ' attrezzi scelti.'}${sel.includes('Panca') ? '' : ' Senza la panca: niente panca piana/inclinata né press seduti, solo esercizi in piedi o ai cavi.'} In ⚙ Impostazioni → Attrezzi disponibili scegli quali hai in palestra.</p>
   <div class="sbar" style="padding:8px 0 0"><button class="primary" style="width:auto;padding:10px 18px" data-act="psgo"${pid ? ` data-pid="${pid}"` : ''}>Avanti: i programmi →</button></div>`;
}
function presetsHtml(pid) {
  const dayN = id => { const p = planOf(id); return p.nome + (p.sotto ? ' · ' + p.sotto : ''); };
  if (PS.att === null) return presetAttHtml(pid);
  const atts = psAtt();
  return `<h2 style="padding-right:44px">📋 Programmi pronti</h2>
   <p class="vnote">Attrezzi: <b>${esc(atts.length === ATT_AV().length ? 'tutti' : atts.join(', '))}</b> · <button class="tlink" data-act="psback"${pid ? ` data-pid="${pid}"` : ''}>cambia</button><br>Allenamenti completi e veloci: petto, schiena, spalle, bicipiti e tricipiti in 7-8 esercizi. ${pid ? 'Scegli il programma: sostituisce gli esercizi di <b>' + esc(dayN(pid)) + '</b>.' : 'Scegli il programma, poi il giorno in cui inserirlo (sostituisce gli esercizi di quel giorno).'}</p>
   ${PRESETS.map(P => { const items = presetBuild(P, atts); return `<div class="card preset"><h3>${esc(P.n)}</h3><p class="vnote">${esc(P.d)}</p>${items.length ? `<ol>${items.map(({ex, sub, orig}) => { const pr = presOf(ex, P.fin) || presOf(ex, 'massa') || {s: 3, r: '8-12', rec: '90 s'}; return `<li>${esc(ex.n)} <small>${pr.s} × ${pr.r} · rec. ${pr.rec}${sub ? ' · <i>' + (orig ? 'al posto di ' + esc(orig.n) : 'aggiunto') + '</i>' : ''}</small></li>`; }).join('')}</ol>` : '<p class="vnote">Nessun esercizio con questi attrezzi.</p>'}
     <div class="sbar" style="padding:6px 0 0"><button class="primary" style="width:auto;padding:9px 16px" data-act="preset" data-key="${P.key}"${pid ? ` data-pid="${pid}"` : ''}${items.length ? '' : ' disabled'}>${pid ? 'Usa questo programma' : 'Scegli il giorno…'}</button></div></div>`; }).join('')}`;
}
function presetDayHtml(key) {
  const P = PRESETS.find(p => p.key === key), dayN = id => { const p = planOf(id); return p.nome + (p.sotto ? ' · ' + p.sotto : ''); };
  return `<h2 style="padding-right:44px">In quale giorno?</h2><p class="vnote">${esc(P.n)}: gli esercizi del giorno scelto verranno sostituiti.</p>
   <div class="chips wrap">${CUST.map(id => `<button class="chip" data-act="preset" data-key="${key}" data-pid="${id}">${esc(dayN(id))}${rtList(id).length ? ' (' + rtList(id).length + ')' : ''}</button>`).join('')}</div>
   <div class="sbar" style="padding:10px 0 0"><button class="ghost" data-act="psgo">← Programmi</button></div>`;
}
function presetApply(key, pid) {
  const P = PRESETS.find(p => p.key === key), items = presetItems(P, psAtt()), run = () => { DB.rt[pid] = items; prepEdit = false; save(); closeModal(); go(pid === 'gA' ? 'giulia' : pid); flash('✓ ' + P.n + ' inserito (' + items.length + ' esercizi)'); };
  if (rtList(pid).length) ask('Sostituire i ' + rtList(pid).length + ' esercizi di questo giorno con “' + P.n + '”? Pesi, note e storico degli esercizi restano salvati.', 'Sostituisci', run); else run();
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
const attlHtml = () => `<div class="attl">${ATT_ALL().map(a => `<button class="${DB.noatt[a] ? '' : 'on'}" data-act="atttog" data-a="${esc(a)}">${DB.noatt[a] ? '✕' : '✓'} ${esc(a)} <small>(${attCount(a)}${a === 'Panca' ? ' esercizi la usano' : ''})</small></button>`).join('')}</div>`;
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
   <div class="card"><h2>Stato</h2><p class="vnote">Versione app ${APPV} · esercizi: ${EX.length} · video di riferimento disponibili: ${Object.values(typeof VIDEOS !== 'undefined' ? VIDEOS : {}).reduce((t, l) => t + l.length, 0)} link su ${Object.keys(typeof VIDEOS !== 'undefined' ? VIDEOS : {}).length} esercizi · ${DB.hideRef ? '<b style="color:#d33">tutti nascosti</b>' : 'nascosti: ' + Object.keys(DB.hiddenRef).length} · tuoi video: ${Object.values(DB.myv).reduce((t, l) => t + (Array.isArray(l) ? l.length : 0), 0)}</p><p><button class="ghost" data-act="sksreset">🔄 Ripristina app (svuota cache, i dati restano)</button></p>
   ${DB.hideRef || Object.keys(DB.hiddenRef).length ? '<p><button class="primary" style="width:auto;padding:10px 16px" data-act="vrefall">👁 Mostra tutti i video di riferimento</button></p>' : ''}</div>
   <div class="card"><h2>Video</h2><p>Elimina i video che hai aggiunto tu (file sul telefono e link) oppure togli i link ai video di riferimento (anche uno alla volta dentro ogni esercizio). Non tocca pesi e storico.</p>
   <p><button class="ghost danger" data-act="vwipe">🗑 Cancella tutti i miei video</button> <button class="ghost" data-act="vref">${DB.hideRef ? '👁 Mostra i video di riferimento' : '🙈 Togli tutti i video di riferimento'}</button>${DB.hideRef || Object.keys(DB.hiddenRef).length ? ' <button class="ghost" data-act="vrefall">↺ Ripristina i video tolti</button>' : ''}</p></div>
   <div class="card"><h2>Storico in PDF</h2><p>Crea un foglio con tutti gli esercizi, i chili e le ripetizioni fatte, da stampare, salvare in PDF o condividere.</p><p><button class="ghost" data-act="report">📄 Apri storico</button></p></div>
   <div class="card"><h2>Attrezzi disponibili</h2><p>Spegni gli attrezzi che non hai: i loro esercizi spariscono dalla libreria, dalle proposte e dai programmi pronti (quelli già nelle schede restano, segnalati). Powerrack Atletica SKS: safety, manubri, panca regolabile, jammer arms, doppia puleggia con corda/barra/maniglie/cavigliera, sbarra, parallele, Smith machine.</p>${attlHtml()}</div>
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
    if (s.done) { const x = planFind(k), ex = byId[k.split(':')[1]]; tmStart(x ? secs(x.rec) : 90, ex ? ex.n.split(' (')[0] : ''); }
    if (TR.on && s.done && DB.cur[k].sets.every(z => z.done)) setTimeout(() => flash('✓ Esercizio completato: quando sei pronto tocca Prossimo'), 1200); }
  else if (a === 'tmadj') { const d = +b.dataset.d; if (TM.run) TM.end += d * 1000; else TM.left = Math.max(0, TM.left + d); TM.total = Math.max(TM.total, TM.run ? (TM.end - Date.now()) / 1000 : TM.left); if (TM.run && TM.end - Date.now() > 10500) TM.pre = false; tmTick(); tmSave(); }
  else if (a === 'tmplay') { tmAudio(); if (TM.run) { TM.left = Math.max(0, (TM.end - Date.now()) / 1000); TM.run = false; } else { if (TM.left <= 0) TM.left = TM.last || 90; TM.end = Date.now() + TM.left * 1000; TM.run = true; TM.done = false; TM.pre = TM.left <= 10; } tmTick(); tmSave(); }
  else if (a === 'tmset') { TM.pre = false; tmStart(+b.dataset.s); }
  else if (a === 'tmclose') tmHide();
  else if (a === 'tmopen') { tmAudio(); TM.pre = false; tmStart(TM.last || 90); }
  else if (a === 'addset' || a === 'delset') {
    const c = DB.cur[k], n = Math.max(1, c.sets.length + (a === 'addset' ? 1 : -1));
    if (a === 'delset') c.sets.length = n; else curFor(k, n);
    save(); const host = b.closest('.ex, #mbody'); const holder = host.querySelector('[data-sets]');
    if (!holder) { render(true); return; }   // scheda in preparazione: basta ridisegnare il numero di serie
    const tgt = b.closest('.ex') ? (planFind(k)?.r || '') : '';
    const tmp = document.createElement('div'); tmp.innerHTML = setsHtml(k, n, tgt);
    holder.replaceWith(tmp.querySelector('[data-sets]')); const sb = b.closest('.sbar'); if (sb) sb.querySelectorAll('button').forEach(x => x.dataset.n = n);
    const pre = host.querySelector('.presc b'); if (pre) { const sp = pre.querySelector('.n'); if (sp) sp.textContent = n; else pre.textContent = n + ' × ' + (planFind(k)?.r || ''); } refreshProgress();
  }
  else if (a === 'vdel') { const id = b.dataset.id, key = b.dataset.k, root = b.closest('.tb, #mbody') || document; const x = (DB.myv[id] || []).find(v => v.k === key);
    DB.myv[id] = (DB.myv[id] || []).filter(v => v.k !== key); save(); (x && x.t === 'f' ? VDB.del(key).catch(() => {}) : Promise.resolve()).then(() => { flash('Video rimosso'); loadMine(root); }); }
  else if (a === 'vurl') { const id = b.dataset.id, inp = b.parentElement.querySelector('.vurlin'); let u = inp.value.trim(); if (!u) { flash('Incolla prima un link'); return; }
    if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) u = 'https://' + u; let p; try { p = new URL(u); } catch (e) { p = null; }
    if (!p || !/^https?:$/.test(p.protocol) || !p.hostname.includes('.')) { flash('⚠ Link non valido'); return; }
    (DB.myv[id] = DB.myv[id] || []).push({t: 'u', k: 'u' + Date.now(), u: p.href, n: p.hostname.replace(/^www\./, '')}); save(); inp.value = ''; flash('✓ Link aggiunto'); loadMine(b.closest('.tb, #mbody') || document); }
  else if (a === 'hist') histView(k);
  else if (a === 'train') trainStart(b.dataset.pid);
  else if (a === 'evalday') modal(evalHtml(b.dataset.pid));
  else if (a === 'wk') modal(weekDetHtml(b.dataset.w));
  else if (a === 'weekprop') { modal(weekPropHtml()); const no = $('#mbody [data-act=no]'); if (no) no.onclick = closeModal; }
  else if (a === 'weekapply') { const w = proposeWeek(); if (!w || !w.moves.length) { closeModal(); return; } ask('Spostare ' + w.moves.length + ' esercizi tra i giorni come proposto?', 'Sposta', () => { const n = applyWeek(w); prepEdit = false; go('home'); flash('✓ ' + n + ' esercizi spostati: settimana riorganizzata'); }); }
  else if (a === 'propapply') { const pid = b.dataset.pid, chosen = [...document.querySelectorAll('#mbody [data-prop]')].filter(c => c.checked).map(c => PROP.list[+c.dataset.prop]); if (!chosen.length) { flash('Nessuna modifica selezionata'); return; }
    ask('Applicare ' + chosen.length + (chosen.length === 1 ? ' modifica' : ' modifiche') + ' a ' + planOf(pid).nome + '? Pesi, note e storico restano salvati.', 'Applica', () => { const done = proposeApply(pid, chosen); prepEdit = false; go(pid === 'gA' ? 'giulia' : pid); flash('✓ ' + done.length + ' modifiche applicate'); setTimeout(() => modal(evalHtml(pid)), 80); }); }
  else if (a === 'godayedit') { closeModal(); go(b.dataset.id); prepEdit = true; render(); }
  else if (a === 'pedit') { prepEdit = !prepEdit; pick.open = false; render(true); }
  else if (a === 'trexit') trainExit();
  else if (a === 'trprev' || a === 'trnext') { TR.i += a === 'trnext' ? 1 : -1; trSave(); render(); window.scrollTo(0, 0); }
  else if (a === 'trgo') { TR.i = +b.dataset.i; trSave(); render(); window.scrollTo(0, 0); }
  else if (a === 'trhow') { TR.how = !TR.how; trSave(); render(true); if (TR.how) { const el = $('#main .howbox'); if (el) setTimeout(() => el.scrollIntoView({behavior: 'smooth', block: 'start'}), 30); } }
  else if (a === 'atttog') { const t = b.dataset.a; if (DB.noatt[t]) delete DB.noatt[t]; else DB.noatt[t] = 1; save(); const box = b.closest('.attl'); if (box) box.outerHTML = attlHtml(); flash(DB.noatt[t] ? t + ': non disponibile' : t + ': disponibile'); }
  else if (a === 'finish') finish(b.dataset.p, b.dataset.prof);
  else if (a === 'findate') { $('#findate').value = b.dataset.d; b.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === b)); }
  else if (a === 'finsave') finishDo(b.dataset.p, b.dataset.prof, $('#findate').value);
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
  else if (a === 'presets') { PS.att = null; modal(presetsHtml(b.dataset.pid)); }
  else if (a === 'psatt') { const all = ATT_AV(), cur = psAtt().slice(), t = b.dataset.a, i = cur.indexOf(t); if (i >= 0) { if (cur.length > 1) cur.splice(i, 1); } else cur.push(t); PS.att = cur.filter(x => all.includes(x)); $('#mbody').innerHTML = presetAttHtml(b.dataset.pid); }
  else if (a === 'psgo') { if (PS.att === null) PS.att = ATT_AV(); $('#mbody').innerHTML = presetsHtml(b.dataset.pid); $('.sheet').scrollTop = 0; }
  else if (a === 'psback') { $('#mbody').innerHTML = presetAttHtml(b.dataset.pid); }
  else if (a === 'preset') { if (b.dataset.pid) presetApply(b.dataset.key, b.dataset.pid); else modal(presetDayHtml(b.dataset.key)); }
  else if (a === 'sksreset') window.sksReset();
  else if (a === 'fav') { if (DB.fav[b.dataset.id]) delete DB.fav[b.dataset.id]; else DB.fav[b.dataset.id] = 1; save(); render(true); flash(DB.fav[b.dataset.id] ? '⭐ Aggiunto ai preferiti' : 'Tolto dai preferiti'); }
  else if (a === 'wzchip') { const t = b.dataset.t, v = b.dataset.v; if (t === 'fin') WZ.fin = v; else if (t === 'lato') WZ.lato = v; else { const arr = WZ[t]; if (!v) arr.length = 0; else { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); } } wizRender(); }
  else if (a === 'wzgo') { WZ.step = 3; WZ.keep = []; WZ.rejected = []; wizPropose(); wizRender(); }
  else if (a === 'wznext') { WZ.step = 2; wizRender(); }
  else if (a === 'wzback1') { WZ.step = 1; wizRender(); }
  else if (a === 'wzagain') { WZ.cur.forEach(id => { if (!WZ.keep.includes(id) && !WZ.rejected.includes(id)) WZ.rejected.push(id); }); wizPropose(); wizRender(); }
  else if (a === 'wzback') { WZ.step = 2; wizRender(); }
  else if (a === 'wzday') { WZ.pid = b.dataset.id; wizRender(); }
  else if (a === 'wzadd') wizAdd();
  else if (a === 'wprint') printHtml('Piano settimanale', weekHtml());
  else if (a === 'wshare') shareText('Piano settimanale', weekText());
  else if (a === 'rprint') reportPrint();
  else if (a === 'rshare') reportShare(false);
  else if (a === 'rcopy') reportShare(true);
  else if (a === 'import') { const f = $('#imp'); f.onchange = () => importData(f.files[0]); f.click(); }
  else if (a === 'wipe') ask('Cancellare TUTTI i pesi e lo storico? Non si può annullare.', 'Cancella tutto', () => { DB = fixDB({cur: {}, hist: {}, rt: DB.rt, names: DB.names, myv: DB.myv, hideRef: DB.hideRef, hiddenRef: DB.hiddenRef, logo: DB.logo, notes: DB.notes, fav: DB.fav, seeds: DB.seeds, noatt: DB.noatt, v: 3}); save(); render(); })
});
$('#cfg').onclick = settings;
document.addEventListener('change', e => { const t = e.target; if (t.dataset && t.dataset.prop !== undefined) { t.closest('.wzrow').classList.toggle('on', t.checked); return; } if (t.dataset && t.dataset.act === 'wzkeep') { const id = t.dataset.id, i = WZ.keep.indexOf(id); if (t.checked && i < 0) WZ.keep.push(id); if (!t.checked && i >= 0) WZ.keep.splice(i, 1); wizRender(); } });
document.addEventListener('change', async e => {
  const t = e.target; if (!t.dataset || !t.dataset.vfile) return; const f = t.files && t.files[0]; if (!f) return;
  if (f.size > 400 * 1024 * 1024) { flash('⚠ Video troppo grande (max 400 MB)'); return; }
  try { const key = t.dataset.vfile + '#' + Date.now(); await VDB.set(key, f); (DB.myv[t.dataset.vfile] = DB.myv[t.dataset.vfile] || []).push({t: 'f', k: key, n: f.name.slice(0, 40)}); save(); flash('✓ Video salvato sul dispositivo'); t.value = ''; } catch (err) { flash('⚠ Non riesco a salvare il video'); }
  loadMine(t.closest('.tb, #mbody') || document);
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('vurlin')) { e.preventDefault(); e.target.parentElement.querySelector('[data-act=vurl]').click(); } });
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'findate') { document.querySelectorAll('[data-act=findate]').forEach(c => c.classList.toggle('on', c.dataset.d === t.value)); return; }
  if (t.id === 'pq') { pick.q = t.value; const r = $('#pkres'); if (r) r.innerHTML = pickRes(r.dataset.pid); return; } // aggiorna solo i risultati: la casella resta attiva (tastiera del telefono)
  if (t.id === 'q') { lib.q = t.value; const r = $('#libres'); if (r) r.innerHTML = libRes(); return; }
  if (t.dataset.mf) { const x = rtList(t.dataset.pid).find(m => m.e === t.dataset.id); if (x) { x[t.dataset.mf] = t.value.slice(0, 12); save(); } return; }
  if (t.dataset.gnote !== undefined) { DB.notes[t.dataset.gnote] = t.value.slice(0, 600); save(); return; }
  if (t.dataset.f) { const s = DB.cur[t.dataset.k].sets[+t.dataset.i]; if (t.dataset.f === 'note') { s.note = t.value.slice(0, 140); save(); return; } s[t.dataset.f] = t.value.replace(/[^\d.,]/g, ''); if (t.value !== s[t.dataset.f]) t.value = s[t.dataset.f]; save(); }
});
document.addEventListener('toggle', e => {
  const d = e.target; if (!d.matches || !d.matches('details.tech') || !d.open) return;
  document.querySelectorAll('details.tech[open]').forEach(o => { if (o !== d) o.open = false; });
  const f = d.querySelector('[data-fig]'); if (f) FIG3.mount(f, byId[f.dataset.fig], FIG.mount);
  loadMine(d);
}, true);

function planFind(k) { const [prof, id] = k.split(':'); if (TR.on) { const x = rtList(TR.pid).find(x => x.e === id); if (x) return x; } if (prof !== 'giulia') { for (const r of (prof === 'mia' ? ['mia'] : ['g1', 'g2', 'g3', 'g4', 'dom'])) { const x = rtList(r).find(x => x.e === id); if (x) return x; } return null; } { const x = rtList('gA').find(x => x.e === id); if (x) return x; } const ps = PLAN.filter(p => (p.profilo || 'io') === prof); for (const p of ps) { const x = p.ex.find(x => x.e === id); if (x) return x; } return null; }
function refreshProgress() {
  const p = planOf(tabPlan(tab)); if (!p) return;
  const prof = p.profilo || 'io'; let tot = 0, dn = 0;
  p.ex.forEach(x => { const c = DB.cur[pk(prof, x.e)]; if (c) { tot += c.sets.length; dn += c.sets.filter(s => s.done).length; } });
  const bar = document.querySelector('.prog i'); if (bar) { bar.style.width = (tot ? Math.round(dn / tot * 100) : 0) + '%'; bar.parentElement.nextElementSibling.textContent = dn + '/' + tot + ' serie completate'; }
  p.ex.forEach((x, i) => { const c = DB.cur[pk(prof, x.e)]; const n = document.querySelector('#c-' + pk(prof, x.e).replace(':', '-') + ' .num'); if (n && c) n.classList.toggle('done', c.sets.every(s => s.done));
    const d = document.querySelector('.tdot[data-i="' + i + '"]'); if (d && c) { const k = c.sets.filter(s => s.done).length; d.classList.toggle('done', k >= c.sets.length); d.classList.toggle('part', k > 0 && k < c.sets.length); } });
}
const WD = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
const wdOf = d => WD[new Date(d + 'T12:00:00').getDay()];
const dShift = n => { const t = new Date(); t.setDate(t.getDate() - n); return new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
const fmtWd = d => wdOf(d).slice(0, 3) + ' ' + fmtD(d);
function finish(pid, prof) {   // chiede quando è stata fatta la seduta (es. scheda del venerdì fatta di sabato → salvata per sabato)
  const p = planOf(pid), done = p.ex.filter(x => { const c = DB.cur[pk(prof, x.e)]; return c && c.sets.some(s => s.kg || s.reps || s.note); }).length;
  if (!done) { flash('Compila almeno una serie'); return; }
  const opt = n => { const d = dShift(n); return `<button class="chip ${n === 0 ? 'on' : ''}" data-act="findate" data-d="${d}">${n === 0 ? 'Oggi' : n === 1 ? 'Ieri' : wdOf(d)}<small style="margin-left:6px;opacity:.75">${fmtD(d)}</small></button>`; };
  modal(`<h2 style="padding-right:44px">🏁 Fine allenamento</h2><p class="vnote">${esc(p.nome)}${p.sotto ? ' · ' + esc(p.sotto) : ''}: ${done} esercizi compilati. <b>Quando l'hai fatto?</b> Lo storico lo salva con questa data (anche se la scheda è di un altro giorno).</p>
   <div class="chips wrap">${[0, 1, 2, 3].map(opt).join('')}</div>
   <label class="fl" style="margin-top:10px">Oppure un'altra data<input type="date" id="findate" value="${today()}" max="${today()}"></label>
   <div class="sbar" style="padding:6px 0 0"><button class="ghost" data-act="no">Annulla</button><button class="primary" style="width:auto;padding:10px 18px" data-act="finsave" data-p="${pid}" data-prof="${prof}">Salva nello storico</button></div>`);
  $('#mbody [data-act=no]').onclick = closeModal;
}
function finishDo(pid, prof, d) {
  const p = planOf(pid); let n = 0; if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) d = today();
  p.ex.forEach(x => {
    const k = pk(prof, x.e), c = DB.cur[k]; if (!c) return;
    const sets = c.sets.filter(s => s.kg || s.reps || s.note).map(s => ({kg: s.kg, reps: s.reps, note: s.note || undefined}));
    if (!sets.length) return;
    (DB.hist[k] = DB.hist[k] || []).push({d, sets}); DB.hist[k].sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0); n++;
    c.sets.forEach(s => { s.done = false; });
  });
  if (!n) { flash('Compila almeno una serie'); return; }
  const sd = p.ex.reduce((t, x) => t + ((DB.cur[pk(prof, x.e)] || {sets: []}).sets.filter(z => z.kg || z.reps).length), 0), st = p.ex.reduce((t, x) => t + ((DB.cur[pk(prof, x.e)] || {sets: []}).sets.length || x.s), 0);
  DB.sess.push({d, pid, n, tot: p.ex.length, sd, st, name: p.nome + (p.sotto ? ' · ' + p.sotto : '')}); DB.sess.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0); if (DB.sess.length > 400) DB.sess.splice(0, DB.sess.length - 400);
  closeModal(); save(); if (TR.on) { TR.on = false; TR.i = 0; trSave(); render(); window.scrollTo(0, 0); } else render(true); flash('✓ Salvato per ' + wdOf(d) + ' ' + fmtD(d) + ' (' + n + ' esercizi): pesi, ripetizioni e note restano per la prossima volta');
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

window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (h !== tab && TABS.some(t => t.id === h)) { if (TR.on && h !== (TR.pid === 'gA' ? 'giulia' : TR.pid)) { TR.on = false; trSave(); } tab = h; render(); } });
if (TR.on && CUST.includes(TR.pid)) { tab = TR.pid === 'gA' ? 'giulia' : TR.pid; location.hash = tab; }
try { render(); } catch (e) { window.dispatchEvent(new ErrorEvent('error', {message: 'Avvio: ' + (e && e.message)})); throw e; }
initCloud();
if (!window.claude && 'serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
