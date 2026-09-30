/* App allenamento — tutto locale: i pesi si salvano nel telefono (localStorage) a ogni modifica. */
(() => {
const KEY = 'sks_allenamento_v1';
const $ = s => document.querySelector(s);
const byId = Object.fromEntries(EX.map(e => [e.id, e]));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

let DB = {cur: {}, hist: {}};
try { const r = JSON.parse(localStorage.getItem(KEY)); if (r && r.cur && r.hist) DB = r; } catch (e) {}
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
      if (r && r.cur && r.hist && (r.ts || 0) > (DB.ts || 0)) { DB = r; try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) {} if ($('#modal').hidden) render(true); }
    }
    remote = ref;
    if ((DB.ts || 0) > 0 && !snap.exists) pushCloud();
  } catch (e) {}
}
function flash(t) { const s = $('#saved'); s.textContent = t; s.classList.add('on'); clearTimeout(saveTimer); saveTimer = setTimeout(() => s.classList.remove('on'), 2200); }

const GCOL = {petto:'#ef476f', spalle:'#f59e0b', schiena:'#3b82f6', bicipiti:'#10b981', tricipiti:'#8b5cf6', avambracci:'#14b8a6', gambe:'#ff6b35', addome:'#06b6d4'};
const ICON_LIB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/></svg>';
const TABS = [
  {id:'lib', a:'Esercizi', b:ICON_LIB},
  {id:'g1', a:'Petto', b:'1'},
  {id:'g2', a:'Schiena', b:'2'},
  {id:'g3', a:'Spalle', b:'3'},
  {id:'g4', a:'Gambe', b:'4'},
  {id:'giulia', a:'Giulia', b:'G'}
];
const planOf = id => PLAN.find(p => p.id === id);
let tab = (location.hash || '#lib').slice(1); if (!TABS.some(t => t.id === tab)) tab = 'lib';
let giuliaSub = 'gA';
const lib = {q: '', g: '', a: ''};

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
function techHtml(ex) {
  const li = a => a.map(x => `<li>${esc(x)}</li>`).join('');
  return `<div class="fig" data-fig="${ex.id}"></div>
  <p class="cue"><b>💡 Come pensarlo:</b> ${esc(ex.cue)}</p>
  <h3>Muscoli</h3><p>${esc(ex.m)}</p>
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

const cab = ex => ex.a === 'Cavi' ? '<span class="tag cav">Cavi</span>' : `<span class="tag" style="background:var(--in);color:var(--mut)">${esc(ex.a)}</span>`;
const gtag = ex => `<span class="tag" style="background:color-mix(in srgb,${GCOL[ex.g]} 16%,transparent);color:${GCOL[ex.g]}">${esc(GRUPPI[ex.g])}</span>`;
function exCard(x, idx, prof) {
  const ex = byId[x.e], k = pk(prof, ex.id), c = curFor(k, x.s);
  const done = c.sets.filter(s => s.done).length;
  return `<article class="card ex" style="--gc:${GCOL[ex.g]}" id="c-${k.replace(':', '-')}">
   <div class="exh"><span class="num ${done >= c.sets.length ? 'done' : ''}">${idx + 1}</span>
    <div style="min-width:0"><h2>${esc(ex.n)}${x.opt ? '<span class="opt">opzionale</span>' : ''}</h2><div class="meta">${gtag(ex)}${cab(ex)}</div></div></div>
   <div class="presc"><b>${c.sets.length} × ${esc(x.r)}</b><span>recupero ${esc(x.rec)}</span></div>
   <div class="role">${esc(x.ruolo)}</div>
   ${setsHtml(k, x.s, x.r)}${lastLine(k)}${hintLine(k, x.r)}
   <details class="tech"><summary>Tecnica 3D, cavi e spiegazione</summary><div class="tb">${techHtml(ex)}</div></details>
  </article>`;
}

const secs = rec => { const m = String(rec).match(/(\d+)\s*min/), t = String(rec).match(/(\d+)\s*s\b/); return m ? +m[1] * 60 : t ? +t[1] : 20; };
function planView(p, prof) {
  let tot = 0, dn = 0, mins = 0;
  p.ex.forEach(x => { const c = curFor(pk(prof, x.e), x.s); tot += c.sets.length; dn += c.sets.filter(s => s.done).length; mins += c.sets.length * (40 + secs(x.rec)); });
  const cav = p.ex.filter(x => byId[x.e].a === 'Cavi').length;
  return `<section class="hero"><div class="eyebrow">${prof === 'giulia' ? 'Giulia' : 'Forza · 4 giorni'}</div><h2>${esc(p.nome)}</h2><div class="sub">${esc(p.sotto)}</div><p>${esc(p.obiettivo)}</p>
   <div class="stats"><div class="stat"><b>${p.ex.length}</b><span>esercizi</span></div><div class="stat"><b>${tot}</b><span>serie</span></div><div class="stat"><b>~${Math.round(mins / 600) * 10}</b><span>minuti</span></div><div class="stat"><b>${cav}</b><span>ai cavi</span></div></div>
   <div class="prog"><i style="width:${tot ? Math.round(dn / tot * 100) : 0}%"></i></div><div class="progt">${dn}/${tot} serie completate</div></section>
   ${p.ex.map((x, i) => exCard(x, i, prof)).join('')}
   <button class="primary" data-act="finish" data-p="${p.id}" data-prof="${prof}">Fine allenamento · salva nello storico</button>`;
}

function libView() {
  const q = norm(lib.q).split(/\s+/).filter(Boolean);
  const list = EX.filter(e => {
    if (lib.g && e.g !== lib.g) return false;
    if (lib.a && e.a !== lib.a) return false;
    const hay = norm([e.n, e.g, GRUPPI[e.g], e.a, e.m, e.cue, e.why, e.set].join(' '));
    return q.every(t => hay.includes(t));
  });
  const atts = [...new Set(EX.map(e => e.a))];
  return `<input class="search" id="q" type="search" placeholder="Cerca: es. tricipiti, cavo alto, squat…" value="${esc(lib.q)}" autocomplete="off">
  <div class="chips">${chip('g', '', 'Tutti')}${Object.entries(GRUPPI).map(([k, v]) => chip('g', k, v)).join('')}</div>
  <div class="chips">${chip('a', '', 'Ogni attrezzo')}${atts.map(a => chip('a', a, a)).join('')}</div>
  <div class="count">${list.length} di ${EX.length} esercizi</div>
  <div id="list">${list.map(e => `<button class="li" style="--gc:${GCOL[e.g]}" data-act="open" data-id="${e.id}"><span class="dot">${esc(GRUPPI[e.g][0])}</span><span class="t"><b>${esc(e.n)}</b><small>${esc(GRUPPI[e.g])} · ${esc(e.m.split(',')[0])}</small></span>${e.a === 'Cavi' ? '<span class="tag cav">Cavi</span>' : `<span class="tag" style="background:var(--in);color:var(--mut)">${esc(e.a)}</span>`}</button>`).join('') || '<p class="count">Nessun risultato.</p>'}</div>`;
}
const chip = (t, v, l) => `<button class="chip ${lib[t] === v ? 'on' : ''}" style="--gc:${t === 'g' && GCOL[v] ? GCOL[v] : 'transparent'}" data-act="chip" data-t="${t}" data-v="${esc(v)}">${t === 'g' && GCOL[v] ? '<u></u>' : ''}${esc(l)}</button>`;

/* ---------- render ---------- */
function render(keep) {
  const y = window.scrollY;
  const t = TABS.find(x => x.id === tab);
  $('#ttl').innerHTML = tab === 'lib' ? 'Esercizi<small>Libreria ricercabile · ' + EX.length + ' esercizi</small>' : tab === 'giulia' ? 'Giulia<small>Gambe e glutei · ai cavi</small>' : esc(planOf(tab).nome) + '<small>' + esc(planOf(tab).sotto) + '</small>';
  $('#nav').innerHTML = TABS.map(x => `<button class="${x.id === tab ? 'on' : ''}" data-act="tab" data-id="${x.id}" aria-label="${x.a}"><i>${x.b}</i>${x.a}</button>`).join('');
  let h;
  if (tab === 'lib') h = libView();
  else if (tab === 'giulia') {
    h = `<div class="pills">${['gA', 'gB'].map(id => `<button class="${giuliaSub === id ? 'on' : ''}" data-act="sub" data-id="${id}">${planOf(id).nome}<br><small>${planOf(id).sotto}</small></button>`).join('')}</div>` + planView(planOf(giuliaSub), 'giulia');
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
   <div class="card"><h2>I tuoi pesi</h2>${setsHtml(k, 3, '')}${lastLine(k)}</div>`);
  const f = $('#mbody [data-fig]'); if (f) FIG3.mount(f, ex, FIG.mount);
}
function histView(k) {
  const [prof, id] = k.split(':'), ex = byId[id], h = (DB.hist[k] || []).slice().reverse();
  const best = h.reduce((m, e) => Math.max(m, ...e.sets.map(s => num(s.kg))), 0);
  modal(`<h2 style="padding-right:44px">Storico · ${esc(ex.n)}</h2>
   <p style="color:var(--mut)">${h.length ? `Peso massimo registrato: <b>${best} kg</b>` : 'Ancora nessuna sessione salvata. Usa “Fine allenamento” per archiviare la seduta.'}</p>
   <div class="card hist">${h.map(e => `<div><b>${fmtD(e.d)}/${e.d.slice(2, 4)}</b> — ${e.sets.map(s => `${s.kg || '–'}×${s.reps || '–'}`).join(' · ')}</div>`).join('')}</div>`);
}
function settings() {
  modal(`<h2 style="padding-right:44px">Dati e backup</h2>
   <div class="card"><p>I pesi si salvano a ogni modifica sul dispositivo e, se sei collegato, anche nel tuo spazio privato online. Esporta ogni tanto un backup.</p>
   <p><button class="ghost" data-act="export">⬇ Esporta backup</button> <button class="ghost" data-act="import">⬆ Importa backup</button></p>
   <input type="file" id="imp" accept="application/json" hidden></div>
   <div class="card"><h2>Attrezzatura prevista</h2><p>Powerrack Atletica SKS con safety, bilanciere e dischi, manubri, panca regolabile con attacco leg extension, jammer arms, doppia puleggia (cavi alto/basso) con corda, barra dritta/V, maniglie singole e cavigliera, sbarra per trazioni. Se manca qualcosa, nella Libreria filtra per attrezzo e sostituisci.</p></div>
   <div class="card"><button class="ghost danger" data-act="wipe">Cancella tutti i pesi</button></div>`);
}

/* ---------- eventi ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act, k = b.dataset.k, i = +b.dataset.i;
  if (a === 'tab') go(b.dataset.id);
  else if (a === 'sub') { giuliaSub = b.dataset.id; render(); }
  else if (a === 'open') openEx(b.dataset.id);
  else if (a === 'chip') { lib[b.dataset.t] = b.dataset.v; render(true); }
  else if (a === 'done') { const s = DB.cur[k].sets[i]; s.done = !s.done; save(); b.classList.toggle('on', s.done); refreshProgress(); }
  else if (a === 'addset' || a === 'delset') {
    const c = DB.cur[k], n = Math.max(1, c.sets.length + (a === 'addset' ? 1 : -1));
    if (a === 'delset') c.sets.length = n; else curFor(k, n);
    save(); const host = b.closest('.ex, #mbody'); const holder = host.querySelector('[data-sets]');
    const tgt = b.closest('.ex') ? (planFind(k)?.r || '') : '';
    const tmp = document.createElement('div'); tmp.innerHTML = setsHtml(k, n, tgt);
    holder.replaceWith(tmp.querySelector('[data-sets]')); const sb = b.closest('.sbar'); sb.querySelectorAll('button').forEach(x => x.dataset.n = n);
    const pre = host.querySelector('.presc b'); if (pre) pre.textContent = n + ' × ' + (planFind(k)?.r || ''); refreshProgress();
  }
  else if (a === 'hist') histView(k);
  else if (a === 'finish') finish(b.dataset.p, b.dataset.prof);
  else if (a === 'export') exportData();
  else if (a === 'import') { const f = $('#imp'); f.onchange = () => importData(f.files[0]); f.click(); }
  else if (a === 'wipe') ask('Cancellare TUTTI i pesi e lo storico? Non si può annullare.', 'Cancella tutto', () => { DB = {cur: {}, hist: {}}; save(); render(); })
});
$('#cfg').onclick = settings;
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'q') { lib.q = t.value; const pos = t.selectionStart; render(true); const q = $('#q'); q.focus(); q.setSelectionRange(pos, pos); return; }
  if (t.dataset.f) { const s = DB.cur[t.dataset.k].sets[+t.dataset.i]; s[t.dataset.f] = t.value.replace(/[^\d.,]/g, ''); if (t.value !== s[t.dataset.f]) t.value = s[t.dataset.f]; save(); }
});
document.addEventListener('toggle', e => {
  const d = e.target; if (!d.matches || !d.matches('details.tech') || !d.open) return;
  document.querySelectorAll('details.tech[open]').forEach(o => { if (o !== d) o.open = false; });
  const f = d.querySelector('[data-fig]'); if (f) FIG3.mount(f, byId[f.dataset.fig], FIG.mount);
}, true);

function planFind(k) { const [prof, id] = k.split(':'); const ps = PLAN.filter(p => (p.profilo || 'io') === prof); for (const p of ps) { const x = p.ex.find(x => x.e === id); if (x) return x; } return null; }
function refreshProgress() {
  const p = tab === 'giulia' ? planOf(giuliaSub) : planOf(tab); if (!p) return;
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
  r.onload = () => { try { const d = JSON.parse(r.result); if (!d.cur || !d.hist) throw 0; const go2 = () => { DB = d; save(); render(); }; ask('Sostituire i dati attuali con il backup?', 'Sostituisci', go2); } catch (e) { flash('⚠ File non valido'); } };
  r.readAsText(f);
}

window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (h !== tab && TABS.some(t => t.id === h)) { tab = h; render(); } });
render();
initCloud();
if (!window.claude && 'serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
