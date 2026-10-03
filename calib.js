/* Calibrazione dei movimenti con i video di riferimento (angoli di gomito, spalla e busto). */
const CALIB = {"p-croci-alte": [[85, 117, {}], [26, -6, {"t": 176}]], "s-laterali": [[12, 27, {}], [90, 110, {}]], "s-frontali": [[-8, 7, {}], [90, 110, {}]], "b-lat-larga": [[160, 175, {}], [50, 175, {}]], "c-incl": [[-5, 3, {}], [-5, 123, {}]], "c-concentrato": [[10, 18, {"t": 140}], [10, 140, {"t": 140}]], "c-curl-alti": [[90, 100, {}], [90, 222, {}]], "c-curl-panca-cavo": [[-5, 3, {}], [-5, 123, {}]], "c-curl-bar": [[6, 14, {}], [14, 142, {}]], "c-curl-cavo": [[6, 14, {}], [14, 142, {}]], "c-curl-singolo": [[6, 14, {}], [14, 142, {}]], "c-hammer": [[6, 14, {}], [14, 142, {}]], "w-reverse-curl": [[6, 14, {}], [14, 142, {}]], "t-push-corda": [[-4, 88, {"t": 168}], [-4, 8, {"t": 168}]], "t-push-barra": [[-4, 88, {"t": 168}], [-4, 8, {"t": 168}]], "t-push-inverso": [[-4, 88, {"t": 168}], [-4, 8, {"t": 168}]]};
EX.forEach(e => { if (CALIB[e.id]) e.fr = CALIB[e.id]; });

/* ===== Smith machine e nuovi esercizi ai cavi (varianti delle pose già calibrate) ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const SM = 'Smith machine', SAFE = 'Smith machine: regola i fermi di sicurezza (safety stops) a un’altezza appena sotto il punto più basso del movimento e impara a sganciare e riagganciare la barra ruotando i polsi prima di caricare peso.';
  const add = o => EX.push(o);
  const trjSm = 'La barra è guidata dai binari: sale e scende in linea perfettamente verticale (linea azzurra). Non devi “guidarla” tu: sposta il corpo (panca, piedi, anche) in modo che quella linea verticale passi nel punto giusto.';
  add(cl('p-panca', {id:'sm-panca', n:'Panca piana alla Smith machine', a:SM, sm:true, trj:trjSm + ' Posiziona la panca in modo che la barra scenda sulla parte bassa dello sterno.',
    cap:['Barra sganciata sopra il petto, braccia distese','Barra sfiora la parte bassa dello sterno'],
    set:SAFE + ' Panca piana centrata sotto la barra: a fine discesa la barra deve toccare la parte bassa dello sterno (linea dei capezzoli o poco sotto). Presa poco più larga delle spalle.',
    ese:['Sgancia la barra ruotando i polsi e portala sopra il petto a braccia tese.','Scendi controllato in 2 secondi verso la parte bassa dello sterno, gomiti a ~45-60° dal busto.','Breve stop sul petto senza rimbalzare.','Spingi in verticale fino a braccia tese. A fine serie ruota i polsi e riaggancia la barra ai ganci.'],
    cue:'La barra è guidata: pensa solo a scapole ferme sulla panca e gomiti sotto i polsi.',
    why:'Stessa spinta orizzontale della panca libera, ma la barra è stabilizzata dai binari: puoi spingere pesante con più sicurezza e concentrarti sul petto, anche da solo. Coinvolge meno i muscoli stabilizzatori.',
    err:['Panca troppo avanti o indietro (la barra cade sul collo o sull’addome)','Gomiti a 90° rispetto al busto','Sedere che si stacca dalla panca','Dimenticare di ruotare i polsi per riagganciare a fine serie']}));
  add(cl('p-incl-db', {id:'sm-incl', n:'Panca inclinata alla Smith machine', a:SM, sm:true, eq:'bar', trj:trjSm + ' Con la panca inclinata la barra deve scendere sulla parte alta del petto, sotto la clavicola.',
    cap:['Barra sopra la parte alta del petto, braccia distese','Barra sfiora la parte alta del petto'],
    set:SAFE + ' Panca inclinata a 30-45° centrata sotto la barra: a fine discesa la barra tocca la parte alta del petto, sotto la clavicola. Presa poco più larga delle spalle.',
    pos:'Scapole addotte e depresse, petto alto, piedi ben piantati a terra, testa appoggiata allo schienale.',
    ese:['Sgancia la barra ruotando i polsi e portala sopra il petto a braccia tese.','Scendi controllato in 2 secondi verso la parte alta del petto, gomiti a ~45-60° dal busto.','Breve stop senza rimbalzare.','Spingi in verticale fino a braccia tese e, a fine serie, riaggancia la barra.'],
    cue:'Petto alto verso la barra, gomiti sotto i polsi.', why:'Enfatizza la parte alta del petto (clavicolare) e le spalle anteriori con la sicurezza della barra guidata.',
    err:['Inclinazione troppo alta (diventa uno shoulder press)','Barra che scende sul collo','Sedere che si stacca dalla panca','Rimbalzo sul petto']}));
  add(cl('t-panca-stretta', {id:'sm-panca-stretta', n:'Panca presa stretta alla Smith machine', a:SM, sm:true, trj:trjSm + ' I gomiti restano vicini al busto.',
    set:SAFE + ' Panca piana centrata sotto la barra, che deve scendere sulla parte bassa dello sterno. Presa alla larghezza delle spalle (non più stretta: polsi e gomiti soffrono).',
    cap:['Barra sopra il petto, braccia distese','Barra sfiora lo sterno, gomiti vicini al busto'],
    ese:['Sgancia la barra e portala sopra il petto a braccia tese.','Scendi in 2 secondi tenendo i gomiti vicini al busto (circa 30-45°).','Sfiora lo sterno senza rimbalzare.','Spingi in verticale fino a distendere completamente i gomiti; riaggancia a fine serie.'],
    cue:'Gomiti stretti lungo il busto, spingi con i tricipiti.',
    why:'Con la barra guidata puoi caricare i tricipiti in modo più mirato e stabile rispetto alla panca stretta libera.',
    err:['Presa troppo stretta (polsi sotto stress)','Gomiti che si aprono a 90°','Sedere che si stacca dalla panca','Rimbalzo sul petto']}));
  add(cl('s-military', {id:'sm-military', n:'Military press alla Smith machine', a:SM, sm:true, trj:trjSm + ' Spingi davanti al viso, non dietro la testa.',
    cap:['Barra all’altezza della clavicola, avambracci verticali','Braccia distese sopra la testa'],
    set:SAFE + ' In piedi o seduto con schienale verticale: la barra parte davanti alla clavicola, a circa 2-3 cm dal mento. Presa poco più larga delle spalle.',
    pos:'Glutei e addominali contratti, costole basse (niente arco lombare), sguardo avanti. Seduto: schiena appoggiata e piedi a terra.',
    ese:['Sgancia la barra all’altezza della clavicola.','Spingi in verticale davanti al viso, spostando la testa leggermente indietro per far passare la barra.','Completa la distensione senza incurvare la schiena.','Scendi controllato fino alla clavicola e, a fine serie, riaggancia.'],
    cue:'Avambracci verticali e costole basse: spingi dritto in alto.', why:'Forza delle spalle con la barra stabilizzata: utile per caricare in sicurezza e concentrarsi sui deltoidi e sui tricipiti.',
    err:['Spingere dietro la nuca (stress alla spalla)','Schiena inarcata','Barra troppo avanti rispetto al viso','Non riagganciare a fine serie']}));
  add(cl('b-row-bar', {id:'sm-row', n:'Rematore alla Smith machine', a:SM, sm:true, trj:'La barra sale e scende in verticale, guidata dai binari. Il busto resta inclinato e fermo: la barra sale verso l’addome, non verso il petto.',
    cap:['Busto inclinato, barra davanti alle ginocchia, braccia distese','Barra all’addome, gomiti indietro'],
    set:SAFE + ' Barra all’altezza delle ginocchia con i ganci sbloccati. Presa prona poco più larga delle spalle.',
    pos:'Piedi alla larghezza delle anche, ginocchia morbide, busto inclinato a circa 45° (non più basso), schiena neutra, sguardo verso il pavimento poco davanti ai piedi.',
    ese:['Sgancia la barra e portala davanti alle ginocchia, busto inclinato e schiena neutra.','Tira la barra verso l’addome portando i gomiti indietro e in alto.','Contrai le scapole 1 secondo.','Scendi lentamente a braccia distese senza cambiare l’inclinazione del busto.'],
    cue:'Gomiti verso il soffitto dietro di te; il busto resta fermo.', why:'La barra guidata toglie il lavoro di equilibrio: puoi concentrarti sulla trazione di dorsali e romboidi con uno stimolo più pulito e ripetibile.',
    err:['Schiena che si arrotonda','Busto che si alza a ogni ripetizione','Tirare verso il petto','Barra troppo lontana dalle gambe']}));
  add(cl('b-scrollate', {id:'sm-scrollate', n:'Scrollate alla Smith machine', a:SM, sm:true, trj:'Il movimento è un sollevamento verticale delle spalle verso le orecchie: la barra guidata sale dritta di pochi centimetri.',
    cap:['Braccia distese, spalle rilassate','Spalle sollevate verso le orecchie'],
    set:SAFE + ' Barra all’altezza delle cosce, presa prona alla larghezza delle spalle.',
    ese:['Sgancia la barra e stai dritto, braccia distese.','Solleva le spalle verso le orecchie senza piegare i gomiti.','Contrai 1-2 secondi in alto.','Scendi lentamente.'],
    cue:'Spalle verso le orecchie, braccia come corde: non piegare i gomiti e non ruotare le spalle.', why:'Allena i trapezi superiori con carichi alti in modo stabile, senza che la barra ti sfugga in avanti.',
    err:['Piegare i gomiti','Ruotare le spalle in cerchio','Testa che va in avanti','Carico eccessivo con escursione ridotta']}));
  add(cl('g-squat', {id:'sm-squat', n:'Squat alla Smith machine (piedi avanzati)', a:SM, sm:true, trj:trjSm + ' Per questo devi mettere i piedi leggermente davanti alla barra.',
    cap:['In piedi con la barra sul trapezio, piedi leggermente avanti','Cosce parallele, busto più eretto'],
    set:SAFE + ' Barra sul trapezio, poco sotto il collo. Piedi alla larghezza delle spalle e circa 20-30 cm davanti alla barra, in modo da sederti indietro come su una sedia.',
    pos:'Punte leggermente aperte, petto alto, core contratto, schiena neutra. Il peso resta su tutto il piede, talloni compresi.',
    ese:['Sgancia la barra e fai mezzo passo avanti con i piedi rispetto alla barra.','Scendi sedendoti indietro, ginocchia in linea con le punte dei piedi.','Arriva a cosce parallele (o sotto se la mobilità lo consente) con i talloni a terra.','Spingi il pavimento via da te e risali in verticale. A fine serie riaggancia.'],
    cue:'Siediti indietro e spingi i talloni nel pavimento: la barra scende dritta.', why:'La barra guidata ti permette di portare i piedi avanti e tenere il busto più eretto: carica molto i quadricipiti con meno stress sulla schiena e senza doversi equilibrare.',
    err:['Piedi sotto la barra (le ginocchia vanno troppo in avanti)','Talloni che si alzano','Ginocchia che cadono verso l’interno','Scendere troppo poco']}));
  add(cl('g-front-squat', {id:'sm-front-squat', n:'Squat frontale alla Smith machine', a:SM, sm:true, trj:trjSm,
    cap:['Barra sulle spalle davanti, gomiti alti','Cosce parallele, busto eretto'],
    set:SAFE + ' Barra appoggiata sui deltoidi anteriori, davanti alla gola, con le dita leggermente sotto la barra e i gomiti alti. Piedi alla larghezza delle spalle, appena davanti alla barra.',
    ese:['Sgancia la barra tenendo i gomiti alti.','Scendi verticalmente con il busto eretto, ginocchia in linea con le punte.','Arriva a cosce parallele.','Risali spingendo nel pavimento e riaggancia a fine serie.'],
    cue:'Gomiti alti e petto in fuori: la barra resta sulle spalle.', why:'Enfatizza i quadricipiti e costringe a un busto molto eretto; la Smith elimina il rischio di perdere l’equilibrio con la barra davanti.',
    err:['Gomiti che scendono','Busto che si piega in avanti','Talloni che si alzano','Polsi forzati in presa rigida']}));
  add(cl('g-rdl', {id:'sm-rdl', n:'Stacco rumeno alla Smith machine', a:SM, sm:true, trj:'La barra scorre in verticale vicino alle gambe: i fianchi vanno indietro e il busto si inclina, mentre la barra scende lungo le cosce e gli stinchi.',
    cap:['In piedi con la barra alle cosce','Busto inclinato, barra alle ginocchia'],
    set:SAFE + ' Barra all’altezza delle anche, presa prona larga come le spalle. Piedi alla larghezza delle anche, leggermente davanti alla barra.',
    ese:['Sgancia la barra e stai dritto con le ginocchia morbide.','Spingi i fianchi indietro e scendi con la barra vicina alle gambe, schiena neutra.','Scendi fino a sentire tirare i femorali (di solito sotto le ginocchia).','Spingi i fianchi in avanti e risali; riaggancia a fine serie.'],
    cue:'Fianchi indietro come per chiudere una porta con il sedere: la schiena resta piatta.', why:'Allena femorali e glutei con la stabilità della barra guidata; è facile tenere la barra attaccata alle gambe.',
    err:['Schiena che si arrotonda','Ginocchia troppo piegate (diventa uno squat)','Barra lontana dalle gambe','Scendere oltre il punto in cui la schiena resta neutra']}));
  add(cl('g-hip-thrust', {id:'sm-hip-thrust', n:'Hip thrust alla Smith machine', a:SM, sm:true, trj:'La barra sale e scende in verticale con i fianchi: i binari guidano il movimento.',
    cap:['Schiena sulla panca, barra sui fianchi, glutei in basso','Fianchi in alto, corpo in linea'],
    set:SAFE + ' Scapole appoggiate al bordo di una panca piana, barra sul bacino con un pad o un asciugamano. Piedi a terra alla larghezza delle anche, sotto le ginocchia a fine spinta.',
    ese:['Siediti a terra, appoggia la schiena alla panca e la barra sul bacino.','Sgancia la barra ruotando i polsi.','Spingi i piedi e porta i fianchi in alto fino ad avere tronco e cosce in linea.','Contrai i glutei 1-2 secondi; scendi controllato e riaggancia a fine serie.'],
    cue:'Mento leggermente chiuso, costole basse: alza il bacino con i glutei, non con la schiena.', why:'Stessa spinta dei glutei dell’hip thrust libero, ma con la barra che non rotola via: più facile caricare molto.',
    err:['Inarcare la schiena in alto','Piedi troppo lontani o troppo vicini','Spingere con i talloni sollevati','Barra senza imbottitura sul bacino']}));
  add(cl('g-calf', {id:'sm-calf', n:'Calf raise alla Smith machine', a:SM, sm:true, trj:'La barra sale e scende in verticale: il movimento è una salita sulle punte con le ginocchia quasi tese.',
    cap:['Piedi appoggiati a terra','Sulle punte'],
    set:SAFE + ' Barra sul trapezio. Metti sotto la punta dei piedi una pedana o un disco (3-5 cm) per aumentare l’escursione; piedi alla larghezza delle anche.',
    ese:['Sgancia la barra e stai dritto.','Sali sulle punte il più in alto possibile.','Fermati 1-2 secondi in alto.','Scendi lentamente sotto il livello della pedana e riaggancia a fine serie.'],
    cue:'Sali a punta con ginocchia quasi tese e scendi lentamente fino a sentire lo stiramento.', why:'Allena i polpacci con carichi alti, con la barra guidata che evita di perdere l’equilibrio sulla punta dei piedi.',
    err:['Piegare le ginocchia','Movimento troppo veloce e ridotto','Appoggiare male il piede (caviglie che cedono)','Dimenticare di riagganciare a fine serie']}));
})();

/* pose risolte in modo che la barra scorra in verticale sui binari */
Object.entries({'sm-panca':[[152.2,152.2],[80,180]], 'sm-incl':[[157.2,157.2],[55,180]], 'sm-panca-stretta':[[154.6,154.6],[65,180]], 'sm-military':[[12,186.2],[175,180]],
  'sm-row':[[0,0,{t:108,th:14,sh:-6}],[-75,60,{t:108,th:14,sh:-6}]],
  'sm-squat':[[-70,118,{t:186,th:9,sh:9}],[-70,118,{t:150,h:[114.9,163],th:80,sh:-12}]], 'sm-front-squat':[[85,-102,{t:186,th:9,sh:9}],[85,-102,{t:162,h:[126,163],th:80,sh:-12}]],
  'sm-rdl':[[0,0,{t:178}],[0,0,{t:135,h:[111,120],th:25,sh:-5}]], 'sm-hip-thrust':[[0,0,{h:[180,200],t:236,th:122,sh:5}],[0,0,{h:[189.9,170],t:272,th:98,sh:3}]]
 }).forEach(([id, fr]) => { EX.find(e => e.id === id).fr = fr; });

/* ===== nuovi esercizi ai cavi ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const add = o => EX.push(o);
  add(cl('p-press-cavi', {id:'p-press-cavo-singolo', n:'Chest press a un braccio ai cavi in piedi', one:true,
    cap:['Maniglia al petto, gomito dietro','Braccio disteso davanti al petto'],
    set:'Cavo all’altezza del petto, maniglia singola. Stai di spalle alla torre in posizione a passo (un piede avanti), busto dritto.',
    pos:'Piede opposto al braccio che lavora avanti, ginocchia morbide, addominali contratti: il busto non deve ruotare verso il cavo.',
    ese:['Porta la maniglia al petto con il gomito a circa 45° dal busto.','Spingi in avanti fino a distendere il braccio senza ruotare il busto.','Contrai il petto 1 secondo.','Torna lentamente alla posizione di partenza.'],
    cue:'Il tronco resta fermo come un muro: il cavo prova a ruotarti e tu lo impedisci.',
    why:'Lavoro unilaterale per il petto che allena anche il core come anti-rotazione e mette in evidenza eventuali differenze di forza tra i due lati.',
    err:['Ruotare il busto verso il cavo','Gomito che si apre a 90°','Piedi uno accanto all’altro (instabile)','Peso troppo alto che fa perdere la postura']}));
  add(cl('c-curl-alti', {id:'c-curl-alti-singolo', n:'Curl al cavo alto a un braccio', one:true, an:[[275,25]],
    cap:['Braccio aperto a T, mano verso il cavo','Mano accanto alla testa (posa bicipite)'],
    set:'Un solo cavo ALTO, all’altezza della spalla o poco sopra. Maniglia singola. Stai di lato alla torre, con il braccio che lavora disteso verso il cavo.',
    ese:['Parti con il braccio aperto a T e il palmo verso l’alto.','Fletti il gomito portando la mano vicino alla testa.','Contrai 1-2 secondi.','Torna lentamente a braccio disteso.'],
    why:'Lavoro singolo in massimo accorciamento del bicipite: utile per correggere squilibri e per concentrarsi sulla contrazione.'}));
  add(cl('b-lat-neutra', {id:'b-lat-supina', n:'Lat machine, presa supina (inversa)', m:'Gran dorsale, bicipiti, romboidi',
    cap:['Braccia distese, barra sopra la testa','Barra al petto, gomiti lungo i fianchi'],
    set:'Cavo ALTO con barra dritta o lunga. Presa supina (palmi verso di te) alla larghezza delle spalle. Cosce bloccate.',
    cue:'Gomiti verso le tasche, petto verso la barra: tira con i dorsali, non solo con le braccia.',
    why:'La presa supina coinvolge di più i bicipiti e la parte bassa del gran dorsale: tira con meno stress sulla spalla di una presa larga.',
    err:['Busto che oscilla','Tirare solo con le braccia','Barra dietro la testa (sconsigliato)','Non completare il range']}));
  add(cl('a-woodchop', {id:'a-woodchop-basso', n:'Woodchop al cavo (basso-alto)', an:[250,212],
    fr:[[10,-10,{t:160}],[140,140,{t:180}]], cap:['Mani in basso, di fianco al ginocchio','Mani in alto, sopra la spalla opposta'],
    set:'Cavo BASSO con maniglia. Stai di lato alla torre, piedi larghi.',
    ese:['Parti con le mani in basso, di fianco al ginocchio più vicino al cavo.','Solleva la maniglia in diagonale verso la spalla opposta ruotando busto e fianchi.','Segui le mani con lo sguardo, le braccia restano quasi tese.','Ritorna lentamente.'],
    why:'Sviluppa gli obliqui e la trasmissione di forza dalle gambe al busto partendo dal basso, il movimento inverso del woodchop alto-basso.'}));
  add(cl('s-posteriori', {id:'s-posteriori-singolo', n:'Alzate posteriori a un braccio al cavo', one:true, an:[[25,30]],
    cap:['Braccio davanti al corpo','Braccio aperto di lato, all’altezza della spalla'],
    set:'Cavo ALTO con maniglia singola. Stai di fianco alla torre, con il braccio che lavora che incrocia davanti al corpo.',
    ese:['Parti con il braccio davanti al corpo e il gomito leggermente piegato.','Porta il braccio indietro e di lato fino all’altezza della spalla.','Contrai le scapole 1 secondo.','Torna lentamente.'],
    why:'Lavoro singolo per il deltoide posteriore e i muscoli tra le scapole: postura e salute delle spalle.'}));
  add(cl('t-overhead-corda', {id:'t-overhead-singolo', n:'Estensione sopra la testa a un braccio al cavo', one:true,
    set:'Cavo BASSO con maniglia singola (o corda tenuta con una mano). Stai di spalle alla torre, passo avanti per stabilità. Il gomito del braccio che lavora punta al soffitto.',
    cue:'Il gomito resta fermo vicino all’orecchio: si muove solo l’avambraccio.',
    why:'Lavoro unilaterale per la porzione lunga del tricipite, allungata sopra la testa, con tensione costante del cavo.'}));
  add(cl('b-scrollate', {id:'b-shrug-cavo', n:'Scrollate al cavo basso', a:'Cavi', eq:'cable', an:[45,212], trj:'Il movimento è una salita delle spalle in verticale: il cavo accompagna la mano in linea retta, le braccia restano distese.',
    set:'Cavo BASSO con barra dritta o due maniglie. Stai di fronte alla torre, braccia distese lungo le cosce, cavo in avanti.',
    ese:['Parti con le braccia distese davanti alle cosce.','Solleva le spalle verso le orecchie senza piegare i gomiti.','Contrai 1-2 secondi in alto.','Scendi lentamente.'],
    why:'Allena i trapezi con tensione costante: il cavo non “scarica” in alto come il bilanciere.'}));
  add(cl('s-frontali', {id:'s-frontali-corda', n:'Alzate frontali con corda al cavo basso',
    set:'Cavo BASSO con la corda. Stai di schiena alla torre con il cavo che passa tra le gambe. Afferra le due estremità della corda con presa neutra.',
    cap:['Braccia lungo il corpo, corda tra le cosce','Braccia davanti, all’altezza della spalla'],
    ese:['Parti con le braccia lungo i fianchi, leggermente piegate.','Solleva la corda in avanti fino all’altezza delle spalle.','Fermati 1 secondo.','Scendi lentamente.'],
    cue:'Mani all’altezza delle spalle, non oltre: niente slancio con la schiena.',
    why:'La corda permette una presa neutra più comoda per i polsi e il cavo dà tensione costante al deltoide anteriore.'}));
  add(cl('p-croci-petto', {id:'p-croci-singolo', n:'Croci a un braccio al cavo', one:true, an:[[275,64]],
    cap:['Braccio aperto, mano verso il cavo','Mano davanti al petto, braccio quasi disteso'],
    set:'Un cavo all’altezza del petto, maniglia singola. Stai di lato alla torre, piede opposto avanti, busto dritto e fermo.',
    ese:['Parti con il braccio aperto, gomito leggermente piegato.','Porta la mano davanti al petto disegnando un arco, senza ruotare il busto.','Contrai il petto 1 secondo.','Torna lentamente, controllando lo stiramento.'],
    cue:'Abbraccia un albero con un braccio: il gomito resta sempre leggermente piegato.',
    why:'Lavoro singolo per il petto con arco di movimento libero: permette di concentrarsi sulla contrazione di un lato alla volta.'}));
})();

/* ===== altri esercizi con Jammer Arms ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  EX.push(cl('p-jammer-press', {id:'j-incl', n:'Chest press inclinato con Jammer Arms', st:'inc', fr:[[55,180],[178,180]],
    cap:['Impugnature ai lati della parte alta del petto','Braccia quasi distese sopra il petto'],
    set:'Panca inclinata a 30-45° tra le jammer arms agganciate al rack, dischi sulle estremità. Regola le arms in modo che, da sdraiato, le impugnature siano all’altezza della parte alta dei pettorali.',
    pos:'Scapole addotte e depresse, petto alto, piedi a terra, testa appoggiata allo schienale. Ogni braccio lavora in modo indipendente.',
    ese:['Parti con le impugnature ai lati della parte alta del petto, gomiti a ~45°.','Spingi verso l’alto avvicinando leggermente le mani.','Fermati a braccia quasi distese senza bloccare i gomiti.','Ritorna lento controllando la discesa dei dischi.'],
    cue:'Spingi le impugnature verso il soffitto avvicinandole un po’: il petto resta alto.',
    why:'Enfatizza la parte alta del petto con un movimento indipendente per ogni lato: puoi spingere pesante e, se serve, lasciare andare in sicurezza.'}));
  EX.push(cl('s-jammer-press', {id:'j-shoulder2', n:'Shoulder press con Jammer Arms a due braccia (seduto)', one:false, st:'seat', fr:[[15,175],[178,180]],
    cap:['Impugnature all’altezza delle spalle','Braccia distese sopra la testa'],
    set:'Panca verticale (schienale a 90°) davanti al rack, jammer arms all’altezza delle spalle con dischi sulle estremità. Siediti con la schiena appoggiata e i piedi a terra.',
    pos:'Schiena appoggiata, glutei fermi, costole basse (niente arco lombare), gomiti appena davanti alla linea delle spalle.',
    ese:['Parti con le impugnature all’altezza delle spalle.','Spingi verso l’alto distendendo entrambe le braccia: il percorso segue un arco leggermente in avanti.','Fermati senza bloccare di scatto i gomiti.','Scendi lentamente alle spalle.'],
    cue:'Costole basse e schiena appoggiata: spingi il soffitto con i gomiti.',
    why:'Permette di spingere pesante con le spalle in una traiettoria guidata, con ogni braccio indipendente (nessun lato compensa l’altro).'}));
  EX.push(cl('b-row-jammer', {id:'j-row-singolo', n:'Rematore a un braccio con Jammer Arms', one:true,
    set:'Jammer arm bassa davanti a te, dischi sull’estremità. Stai in piedi con un piede avanti, una mano appoggiata al rack per sostegno.',
    pos:'Busto inclinato a ~45°, schiena neutra, ginocchia morbide; il busto non ruota.',
    ese:['Parti con il braccio disteso verso l’impugnatura.','Tira l’impugnatura verso l’anca portando il gomito indietro e in alto.','Contrai la scapola 1 secondo.','Scendi lentamente a braccio disteso.'],
    cue:'Gomito verso l’anca come per mettere la mano in tasca; il busto resta fermo.',
    why:'Lavoro unilaterale per dorsali e romboidi con carico guidato: corregge gli squilibri tra i due lati.'}));
})();

/* ===== trazioni a presa supina (chin-up) per i bicipiti ===== */
(() => {
  const b = JSON.parse(JSON.stringify(EX.find(e => e.id === 'b-trazioni')));
  EX.push(Object.assign(b, {id:'c-chinup', n:'Trazioni a presa supina (chin-up)', g:'bicipiti', m:'Bicipiti, gran dorsale, avambracci, core',
    trj:'Il corpo sale in verticale verso la sbarra: i gomiti vanno in basso e leggermente avanti, il mento supera la sbarra.',
    set:'Sbarra del powerrack. Presa supina (palmi verso di te) alla larghezza delle spalle. Se non riesci a completare le ripetizioni, usa un elastico o un appoggio per i piedi.',
    pos:'Corpo teso, gambe leggermente piegate dietro, core contratto, spalle “attive” (non rilassate del tutto).',
    ese:['Parti sospeso a braccia quasi distese, spalle attive.','Tira i gomiti in basso verso le costole portando il petto alla sbarra.','Mento sopra la sbarra, contrai i bicipiti.','Scendi in 2-3 secondi fino a braccia quasi distese.'],
    cue:'Petto alla sbarra e gomiti verso le tasche: spingi il corpo giù, non tirare col collo.',
    why:'È il miglior esercizio di forza per i bicipiti: usa il peso del corpo, si può caricare con una cintura e allena anche dorsali e avambracci.',
    err:['Dondolare (kipping)','Non scendere completamente','Mento avanti “a beccare” la sbarra','Spalle alle orecchie']}));
})();

/* ===== finalità: tipo di esercizio (per le indicazioni di serie, ripetizioni e carico) ===== */
(() => {
  const COMP = new Set('p-panca sm-panca sm-incl p-incl-db s-military sm-military s-press-db b-rackpull b-row-bar sm-row b-trazioni t-panca-stretta sm-panca-stretta g-squat sm-squat g-front-squat sm-front-squat g-rdl sm-rdl g-hip-thrust sm-hip-thrust g-bulgaro g-split g-sumo p-jammer-press j-incl j-shoulder2 s-jammer-press b-row-jammer j-row-singolo b-lat-larga b-lat-neutra b-lat-supina p-jammer-press c-chinup'.split(' '));
  const SEMI = new Set('p-press-cavi p-press-cavo-singolo p-panca-cavi p-incl-cavi s-press-cavo b-row-cavo b-lat-ginocchio b-row-singolo b-row-busto-cavi g-squat-cavo g-rdl-cavo g-pullthrough s-upright t-french-cavo t-overhead-corda t-overhead-singolo p-croci-panca'.split(' '));
  const POL = new Set(['g-calf', 'sm-calf']);
  // isolamento che si può allenare anche per la forza (serie pesanti a poche ripetizioni)
  const FORZAISO = new Set('c-curl-bar c-curl-cavo c-hammer c-incl t-push-barra t-push-corda t-over-db w-reverse-curl'.split(' '));
  const NOTON = new Set('b-rackpull p-panca sm-panca t-panca-stretta sm-panca-stretta s-military sm-military'.split(' '));
  EX.forEach(e => {
    e.tipo = COMP.has(e.id) ? 'comp' : SEMI.has(e.id) ? 'semi' : POL.has(e.id) ? 'pol' : e.g === 'addome' ? 'core' : 'iso';
    e.fin = e.tipo === 'comp' ? ['forza', 'massa', 'tonificare'] : e.tipo === 'core' ? ['tonificare'] : ['massa', 'tonificare'];
    if (NOTON.has(e.id)) e.fin = ['forza', 'massa'];
    if (FORZAISO.has(e.id)) e.fin = ['forza', 'massa', 'tonificare'];
  });
})();

/* ===== altri esercizi ai cavi (varianti delle pose già calibrate) ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const add = o => EX.push(o);
  add(cl('b-row-cavo', {id:'b-row-terra', n:'Rematore ai cavi seduto a terra', st:'floor', an:[258,212],
    trj:'Le mani vanno in linea retta dal cavo basso verso l’addome, parallele al pavimento; il busto oscilla solo di pochi gradi.',
    cap:['Seduto a terra, braccia distese davanti, busto leggermente avanti','Maniglia all’addome, gomiti dietro, busto dritto'],
    set:'Cavo BASSO con maniglia a V o triangolo. Siediti su un tappetino davanti alla torre, gambe distese o appena piegate con i piedi contro una pedana o la base della torre. Il cavo deve partire all’altezza del pavimento.',
    pos:'Schiena neutra e petto alto, ginocchia leggermente piegate, piedi appoggiati a un appoggio fisso, addominali contratti.',
    ese:['Parti con le braccia distese e le scapole lasciate scivolare in avanti.','Tira la maniglia verso l’addome portando i gomiti dietro di te e raddrizzando il busto.','Contrai le scapole 1 secondo, senza inclinarti indietro oltre la verticale.','Torna lentamente a braccia distese, controllando il cavo.'],
    cue:'Gomiti dietro le costole, petto alto: il busto non si inclina oltre la verticale.',
    why:'Stessa trazione orizzontale del rematore seduto ma da terra: lavoro più libero per l’anca, nessuna panca necessaria e più stabilità dei piedi; allena dorsali, romboidi e bicipiti con tensione costante.',
    err:['Inclinarsi all’indietro per “barare” la trazione','Schiena che si arrotonda in partenza','Tirare con le braccia invece che con le scapole','Piedi non appoggiati (il corpo scivola verso il cavo)']}));
  add(cl('b-row-terra', {id:'b-row-terra-singolo', n:'Rematore a un braccio ai cavi seduto a terra', one:true,
    set:'Cavo BASSO con maniglia singola. Siediti su un tappetino con i piedi contro un appoggio fisso, busto dritto. L’altra mano resta appoggiata sulla coscia.',
    ese:['Parti con il braccio disteso e la scapola in avanti.','Tira la maniglia verso l’addome portando il gomito dietro, senza ruotare il busto.','Contrai la scapola 1 secondo.','Torna lentamente a braccio disteso.'],
    why:'Lavoro unilaterale per le dorsali: permette di sentire meglio la contrazione di un lato alla volta e di correggere squilibri.'}));
  add(cl('s-laterali', {id:'s-laterali-doppio', n:'Alzate laterali ai cavi bassi a due braccia', one:false, an:[[25,212],[275,212]],
    set:'Due cavi BASSI, uno per torre. Stai al centro tra le torri con una maniglia per mano: il cavo di ogni lato passa davanti al corpo.',
    ese:['Parti con le braccia lungo il corpo, gomiti leggermente piegati.','Alza entrambe le braccia di lato fino all’altezza delle spalle.','Fermati 1 secondo in alto.','Scendi lentamente controllando il cavo.'],
    cue:'Porta i gomiti verso l’esterno come per versare una brocca: mani non più alte dei gomiti.',
    why:'Lavora entrambi i deltoidi laterali nello stesso tempo, con tensione costante del cavo anche in basso dove con i manubri non c’è.'}));
  add(cl('s-frontali', {id:'s-frontali-singolo', n:'Alzate frontali a un braccio al cavo basso', one:true,
    set:'Cavo BASSO con maniglia singola. Stai di schiena alla torre, cavo che passa accanto alla gamba, braccio che lavora disteso lungo il fianco.',
    ese:['Parti con il braccio lungo il fianco e il gomito appena piegato.','Solleva la maniglia in avanti fino all’altezza della spalla.','Fermati 1 secondo.','Scendi lentamente.'],
    why:'Lavoro unilaterale per il deltoide anteriore con tensione costante e possibilità di concentrarsi su un lato.'}));
  add(cl('c-hammer', {id:'c-hammer-singolo', n:'Curl a martello a un braccio al cavo basso', one:true,
    set:'Cavo BASSO con maniglia singola (presa neutra, pollice in alto). Stai di fronte alla torre, gomito fermo lungo il fianco.',
    ese:['Parti con il braccio disteso e il palmo verso la coscia (presa neutra).','Fletti il gomito portando la maniglia verso la spalla, senza ruotare il polso.','Contrai 1 secondo.','Torna lentamente a braccio disteso.'],
    why:'Lavoro unilaterale per brachiale e brachioradiale (spessore del braccio) oltre al bicipite, con tensione costante.'}));
  add(cl('t-push-barra', {id:'t-push-prono-singolo', n:'Pushdown a un braccio, presa prona', one:true,
    set:'Cavo ALTO con maniglia singola (presa prona, palmo verso il basso). Stai di fronte alla torre, gomito fermo lungo il fianco.',
    ese:['Parti con il gomito piegato a ~90°, avambraccio parallelo al pavimento.','Spingi la maniglia verso il basso distendendo il gomito.','Contrai il tricipite 1 secondo.','Risali lentamente fino a 90° senza muovere il gomito.'],
    why:'Lavoro unilaterale per il tricipite con tensione costante: permette di non compensare con il lato più forte.'}));
  add(cl('b-lat-neutra', {id:'b-lat-singolo', n:'Lat machine a un braccio', one:true,
    set:'Cavo ALTO con maniglia singola. Siediti con le cosce bloccate, busto leggermente inclinato indietro. Con l’altra mano ti tieni al rack o alla coscia.',
    ese:['Parti con il braccio disteso verso l’alto e la scapola “in alto”.','Porta il gomito verso l’anca tirando la maniglia alla spalla.','Contrai 1 secondo.','Risali lentamente a braccio disteso.'],
    why:'Lavoro unilaterale per i dorsali: stesso schema della lat machine ma con escursione più ampia e attenzione a un lato alla volta.'}));
  add(cl('b-row-cavo', {id:'b-row-cavo-singolo', n:'Rematore al cavo basso seduto a un braccio', one:true,
    set:'Cavo BASSO con maniglia singola, panca per sedersi davanti alla torre e piedi su un appoggio fisso. Busto dritto, l’altra mano sulla coscia.',
    ese:['Parti con il braccio disteso e la scapola in avanti.','Tira la maniglia verso l’addome portando il gomito indietro senza ruotare il busto.','Contrai la scapola 1 secondo.','Torna lentamente a braccio disteso.'],
    why:'Lavoro unilaterale per dorsali e romboidi, utile per correggere differenze di forza tra i due lati.'}));
  add(cl('s-press-cavo', {id:'s-press-cavo-singolo', n:'Shoulder press a un braccio ai cavi in piedi', st:'stand', one:true, an:[40,215],
    set:'Cavo BASSO con maniglia singola. Stai di schiena alla torre con un piede avanti, maniglia all’altezza della spalla.',
    pos:'Glutei e addominali contratti, costole basse, busto che non ruota né si inclina di lato.',
    ese:['Parti con la maniglia all’altezza della spalla e l’avambraccio verticale.','Spingi verso l’alto distendendo il braccio davanti al viso.','Fermati senza bloccare di scatto il gomito.','Scendi lentamente alla spalla.'],
    cue:'Costole basse e busto fermo: spingi il soffitto senza inclinarti.',
    why:'Spinta verticale unilaterale: allena deltoidi e tricipiti e, in piedi, anche il core come anti-inclinazione.'}));
})();

/* ===== traiettorie a braccio quasi teso: la mano percorre un arco attorno alla spalla (gomito a flessione costante) ===== */
(() => {
  const HS = {
    'p-croci-basse': {a: [19, 64, -6], b: [-22, -10, 66], r: 66},
    'p-croci-alte': {a: [70, -17, -12], b: [-20, 47, 50], r: 66},
    'p-croci-petto': {a: [70, 0, -14], b: [-22, 8, 66], r: 66},
    'p-croci-singolo': {a: [70, 0, -14], b: [-22, 8, 66], r: 66},
    's-laterali': {a: [-8, 70, 6], b: [68, -4, 22], r: 66},
    's-laterali-doppio': {a: [-8, 70, 6], b: [68, -4, 22], r: 66},
    's-posteriori': {a: [-37, 8, 60], b: [71, 0, -6], r: 66},
    's-posteriori-singolo': {a: [-37, 8, 60], b: [71, 0, -6], r: 66}
  };
  EX.forEach(e => { if (HS[e.id]) e.hs = HS[e.id]; });
})();

/* ===== tre esercizi alla corda seduti a terra (cavo alto), uno per ogni zona della schiena ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const add = o => EX.push(o);
  const SET = 'Cavo ALTO con la corda. Siediti su un tappetino a terra davanti alla torre, ginocchia leggermente piegate, piedi appoggiati contro la base della torre o una pedana.';
  add(cl('b-lat-ginocchio', {id:'b-rope-lat-terra', n:'Pulldown alla corda seduto a terra (dorsali)', m:'Gran dorsale (parte bassa), grande rotondo, bicipiti',
    st:'floor', an:[210,12], gz:22, fr:[[172,176,{t:184}],[8,150,{t:190}]],
    trj:'Le mani scendono in linea quasi retta dalla puleggia verso il petto alto; i gomiti restano vicini ai fianchi.',
    cap:['Seduto a terra, braccia distese verso la corda, busto dritto','Corda al petto alto, gomiti in basso lungo i fianchi'],
    set:SET + ' Afferra le due estremità della corda con presa neutra.',
    pos:'Busto dritto o appena inclinato indietro, petto alto, scapole basse. I gomiti scendono vicini al corpo, non si aprono.',
    ese:['Parti con le braccia distese verso l’alto e le scapole “allungate”.','Tira i gomiti in basso verso i fianchi portando la corda al petto alto.','Contrai i dorsali 1 secondo.','Risali lentamente fino a braccia distese.'],
    cue:'Gomiti verso le tasche: tira con i dorsali, le mani seguono.',
    why:'Prima parte del video: con il busto dritto e i gomiti che scendono lungo i fianchi il lavoro va sul gran dorsale, la parte larga e bassa della schiena.',
    err:['Inclinarsi indietro per fare leva','Gomiti che si aprono di lato','Tirare con le braccia invece che con i gomiti','Non distendere del tutto in alto']}));
  add(cl('b-rope-lat-terra', {id:'b-rope-row-terra', n:'Rematore alto alla corda seduto a terra, busto indietro (romboidi)', m:'Romboidi, trapezio medio, deltoidi posteriori',
    lat:1.7, fr:[[140,150,{t:214}],[-45,55,{t:214}]],
    trj:'Con il busto inclinato indietro la corda arriva al petto in linea quasi retta e i gomiti vanno indietro e leggermente in fuori, come in un rematore.',
    cap:['Busto inclinato indietro, braccia distese verso la corda','Corda al petto, gomiti indietro, scapole strette'],
    set:SET + ' Inclina il busto indietro di circa 35-45° e tienilo fermo per tutta la serie.',
    pos:'Busto inclinato indietro e fermo, addominali contratti, petto alto. I gomiti vanno indietro e un po’ in fuori, non lungo i fianchi.',
    ese:['Parti con il busto inclinato indietro e le braccia distese verso la puleggia.','Tira la corda verso il petto portando i gomiti indietro e stringendo le scapole.','Contrai 1 secondo tra le scapole.','Torna lentamente a braccia distese senza cambiare l’inclinazione del busto.'],
    cue:'Stringi le scapole come per tenere una matita tra loro; il busto resta fermo.',
    why:'Seconda parte del video: l’inclinazione indietro trasforma la trazione in un rematore alto e sposta il lavoro sulla parte centrale della schiena, tra le scapole.',
    err:['Busto che dondola avanti e indietro','Gomiti che restano lungo i fianchi (torna un lavoro di dorsali)','Spalle che salgono verso le orecchie','Carico che impedisce di tenere il busto fermo']}));
  add(cl('b-rope-lat-terra', {id:'b-rope-facepull-terra', n:'Pulldown alla corda a gomiti larghi seduto a terra (deltoidi posteriori)', m:'Deltoidi posteriori, grande rotondo, trapezio basso',
    lat:3.0, gz:24, fr:[[172,176,{t:184}],[92,182,{t:184}]],
    trj:'Le mani scendono verso i lati della testa mentre i gomiti si aprono di lato all’altezza delle spalle; a fine movimento i polsi ruotano leggermente verso l’esterno.',
    cap:['Busto dritto, braccia distese verso la corda','Mani ai lati della testa, gomiti larghi all’altezza delle spalle'],
    set:SET + ' Busto dritto. Presa neutra sulla corda, pollici verso l’alto.',
    pos:'Busto dritto e fermo, petto alto. I gomiti si aprono di lato e restano all’altezza delle spalle; a fine tirata ruota i polsi in fuori (come per mostrare i bicipiti).',
    ese:['Parti con le braccia distese verso l’alto.','Tira la corda verso il viso aprendo i gomiti di lato, fino ad avere le mani ai lati della testa.','A fine tirata ruota i polsi verso l’esterno e contrai 1 secondo.','Risali lentamente a braccia distese.'],
    cue:'Gomiti larghi e alti come a “tirare la corda in due”: il lavoro è dietro le spalle.',
    why:'Terza parte del video: con i gomiti aperti e la rotazione esterna il carico va ai deltoidi posteriori e al grande rotondo, la parte alta ed esterna della schiena.',
    err:['Gomiti che scendono lungo i fianchi','Busto che si inclina indietro','Spalle alle orecchie','Carico troppo alto che toglie la rotazione finale']}));
})();

/* ===== presa (come e' girato il palmo): prona, supina, neutra ===== */
(() => {
  const P = {
    pro: 'p-panca p-incl-db p-press-cavi s-military s-press-db s-laterali s-laterali-doppio s-frontali s-frontali-singolo s-upright b-rackpull b-row-bar b-lat-larga b-pulldown-braccia-tese b-trazioni b-scrollate w-wrist-ext w-reverse-curl t-push-barra t-french-cavo t-panca-stretta g-squat g-rdl g-hip-thrust g-calf a-rollout p-panca-cavi p-incl-cavi sm-panca sm-incl sm-panca-stretta sm-military sm-row sm-scrollate sm-squat sm-rdl sm-hip-thrust sm-calf b-shrug-cavo t-push-prono-singolo',
    sup: 'c-curl-bar c-curl-cavo c-curl-alti c-incl c-concentrato c-curl-singolo w-wrist-curl t-push-inverso g-front-squat sm-front-squat c-curl-panca-cavo c-curl-alti-singolo b-lat-supina c-chinup',
    neu: 'p-croci-alte p-croci-basse p-croci-petto p-croci-panca p-croci-singolo p-jammer-press j-incl j-shoulder2 j-row-singolo s-facepull s-posteriori s-posteriori-singolo s-jammer-press s-rot-est s-frontali-corda s-press-cavo s-press-cavo-singolo b-lat-neutra b-row-cavo b-row-cavo-singolo b-lat-ginocchio b-lat-singolo b-row-singolo b-row-jammer b-row-busto-cavi b-row-terra b-row-terra-singolo b-rope-lat-terra b-rope-row-terra b-rope-facepull-terra c-hammer c-hammer-singolo t-push-corda t-overhead-corda t-overhead-singolo t-kickback t-over-db g-bulgaro g-pullthrough g-sumo g-split g-squat-cavo g-rdl-cavo a-crunch-cavo a-pallof a-woodchop a-woodchop-basso p-press-cavo-singolo'
  };
  Object.entries(P).forEach(([k, ids]) => ids.split(' ').forEach(id => { const e = EX.find(x => x.id === id); if (e) e.presa = k; }));
})();

/* ===== correzioni: rotazione esterna (avambraccio che ruota attorno al gomito fermo), rematore con manubrio, kickback a due braccia ===== */
(() => {
  const rot = EX.find(e => e.id === 's-rot-est');
  Object.assign(rot, {he: {a: [-0.72, 0.12, 0.68], b: [0.82, 0.12, 0.55]}, fr: [[6, 0], [6, 0]], az: 0.75, tzf: 62,
    cap: ['Gomito al fianco piegato a 90°, avambraccio davanti alla pancia', 'Avambraccio ruotato verso l’esterno, gomito sempre al fianco'],
    trj: 'Il gomito non si muove: l’avambraccio, orizzontale, ruota come una porta sul cardine dal davanti della pancia verso l’esterno (circa 80-90°).'});
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  EX.push(cl('b-row-singolo', {id: 'b-row-db', n: 'Rematore a un braccio con manubrio', a: 'Manubri', eq: 'db', an: undefined, lin: true, st: 'hinge', one: true, fr: [[35, 30, {t: 112}], [-62, -5, {t: 112}]], presa: 'neu',
    cap: ['Busto inclinato, manubrio verso il pavimento', 'Manubrio all’anca, gomito indietro'],
    set: 'Manubrio nella mano che lavora, presa neutra. Piede opposto avanti, busto inclinato; la mano libera si appoggia al rack, a una panca o alla coscia per sostenere la schiena.',
    pos: 'Schiena parallela al pavimento e neutra, spalla non ruotata, sguardo verso il basso.',
    ese: ['Parti con il braccio disteso verso il pavimento.', 'Tira il manubrio verso l’anca portando il gomito indietro e in alto, vicino al busto.', 'Contrai 1 secondo.', 'Scendi lentamente fino a stirare il dorsale.'],
    cue: 'Gomito alla tasca posteriore, spalla lontana dall’orecchio; il busto non ruota.',
    why: 'Il rematore con manubrio permette di caricare molto in sicurezza con l’appoggio sulla panca e di lavorare un lato alla volta.',
    err: ['Ruotare il busto per alzare il peso', 'Tirare con il bicipite', 'Schiena arrotondata', 'Gomito che si apre di lato']}));
  EX.push(cl('t-kickback', {id: 't-kickback-doppio', n: 'Kickback ai cavi a due braccia', one: false, presa: 'neu',
    cap: ['Busto inclinato, gomiti alti e fermi, avambracci verso il basso', 'Braccia distese dietro, tricipiti contratti'],
    set: 'Due cavi BASSI o medi con maniglie singole (uno per mano), oppure un cavo basso con corda. Stai di fronte alla torre, busto inclinato in avanti.',
    pos: 'Busto inclinato di circa 45-60°, schiena neutra, gomiti alti e vicini ai fianchi: restano fermi per tutta la serie.',
    ese: ['Parti con i gomiti alti e gli avambracci verso il basso.', 'Distendi entrambe le braccia indietro fino a bloccare i gomiti.', 'Contrai i tricipiti 1 secondo.', 'Torna lentamente a 90°.'],
    cue: 'I gomiti sono cardini fermi: si muovono solo gli avambracci.',
    why: 'Stesso lavoro del kickback a un braccio ma su entrambi i lati insieme: più veloce e con tensione costante del cavo.',
    err: ['Gomiti che scendono', 'Slancio del busto', 'Peso troppo alto']}));
})();

/* ===== muscoli nel dettaglio (per la ricerca e la scheda) ===== */
(() => {
  const D = {
    pettoAlto: 'grande pettorale (fascio clavicolare), deltoide anteriore, tricipite brachiale, dentato anteriore',
    petto: 'grande pettorale (fascio sternale e clavicolare), deltoide anteriore, tricipite brachiale, dentato anteriore',
    pettoBasso: 'grande pettorale (fascio sternale e costale), deltoide anteriore, dentato anteriore',
    press: 'deltoide anteriore, deltoide laterale, tricipite brachiale, trapezio superiore, dentato anteriore',
    laterali: 'deltoide laterale, sovraspinato, deltoide anteriore, trapezio superiore',
    frontali: 'deltoide anteriore, grande pettorale (fascio clavicolare), dentato anteriore',
    posteriori: 'deltoide posteriore, romboidi, trapezio medio, sottospinato, piccolo rotondo',
    cuffia: 'sottospinato, piccolo rotondo, deltoide posteriore',
    lat: 'gran dorsale, grande rotondo, romboidi, trapezio inferiore, bicipite brachiale, brachiale, brachioradiale',
    row: 'gran dorsale, romboidi, trapezio medio, deltoide posteriore, bicipite brachiale, brachiale, erettori spinali',
    cerniera: 'erettori spinali (gran lombare), grande gluteo, femorali (bicipite femorale, semitendinoso, semimembranoso), trapezio, avambracci',
    trapezi: 'trapezio superiore, elevatore della scapola, avambracci',
    curl: 'bicipite brachiale (capo lungo e capo breve), brachiale, brachioradiale',
    martello: 'brachioradiale, brachiale, bicipite brachiale, estensori del polso',
    polsoF: 'flessori del polso e delle dita (flessore radiale e ulnare del carpo)',
    polsoE: 'estensori del polso e delle dita (estensore radiale e ulnare del carpo), brachioradiale',
    tri: 'tricipite brachiale (capo laterale, capo mediale, capo lungo), anconeo',
    triLungo: 'tricipite brachiale (capo lungo soprattutto), capo laterale e mediale, anconeo',
    squat: 'quadricipite (retto femorale, vasto laterale, vasto mediale, vasto intermedio), grande gluteo, adduttori, erettori spinali, polpacci',
    glutei: 'grande gluteo, medio gluteo, femorali (bicipite femorale, semitendinoso)',
    abd: 'medio gluteo, piccolo gluteo, tensore della fascia lata',
    add: 'adduttori (lungo, breve, grande), gracile, pettineo',
    quad: 'quadricipite (retto femorale, vasto laterale, vasto mediale, vasto intermedio)',
    fem: 'femorali (bicipite femorale, semitendinoso, semimembranoso), gastrocnemio',
    polp: 'gastrocnemio, soleo',
    core: 'retto addominale, obliqui esterni e interni, trasverso dell’addome',
    obl: 'obliqui esterni e interni, trasverso dell’addome, retto addominale',
    affondo: 'quadricipite, grande gluteo, medio gluteo, femorali, adduttori, polpacci',
    trazioni: 'gran dorsale, bicipite brachiale, brachiale, romboidi, grande rotondo, retto addominale'
  };
  const K = [[/^p-incl|sm-incl|j-incl|croci-basse/, 'pettoAlto'], [/croci-alte/, 'pettoBasso'], [/^p-|^sm-panca$|panca-stretta$|^t-panca/, 'petto'],
    [/^s-lateral/, 'laterali'], [/^s-frontal/, 'frontali'], [/facepull|posteriori|rope-facepull/, 'posteriori'], [/rot-est/, 'cuffia'], [/upright/, 'laterali'], [/military/, 'press'], [/^s-|^j-shoulder/, 'press'],
    [/lat-|pulldown|rope-lat/, 'lat'], [/row|rope-row|shrug-cavo/, 'row'], [/rackpull|rdl/, 'cerniera'], [/scrollate/, 'trapezi'], [/trazioni|chinup/, 'trazioni'],
    [/hammer|reverse-curl/, 'martello'], [/wrist-curl/, 'polsoF'], [/wrist-ext/, 'polsoE'], [/^c-/, 'curl'], [/overhead|french|over-db/, 'triLungo'], [/^t-/, 'tri'],
    [/squat|sumo/, 'squat'], [/bulgaro|split/, 'affondo'], [/abd-cavo/, 'abd'], [/add-cavo/, 'add'], [/leg-ext/, 'quad'], [/leg-curl/, 'fem'], [/calf/, 'polp'],
    [/hip-thrust|kickback|pullthrough/, 'glutei'], [/woodchop|pallof/, 'obl'], [/^a-/, 'core']];
  EX.forEach(e => { if (e.mm) return; for (const [re, k] of K) { if (re.test(e.id)) { e.mm = D[k]; break; } } if (!e.mm) e.mm = e.m; });
  EX.forEach(e => { if (/kickback-doppio|^t-kickback/.test(e.id)) e.mm = D.tri; if (/scrollate|shrug/.test(e.id)) e.mm = D.trapezi; if (/panca-stretta/.test(e.id)) e.mm = D.tri + ', grande pettorale, deltoide anteriore'; });
})();

/* ===== face pull: gomiti larghi all'altezza delle spalle, mani ai lati delle orecchie ===== */
(() => { const e = EX.find(x => x.id === 's-facepull'); Object.assign(e, {lat: 3.2, gz: 20, az: 0.7, fr: [[88, 90, {t: 176}], [-60, 146, {t: 184}]],
  cap: ['Braccia distese davanti, corda all’altezza del viso', 'Mani ai lati delle orecchie, gomiti larghi all’altezza delle spalle'],
  trj: 'La corda viene dritta verso il viso; i gomiti si aprono di lato e salgono all’altezza delle spalle, le mani finiscono ai lati delle orecchie con i pollici verso di te.'}); })();

/* ===== upright row: gomiti alti all'altezza delle spalle, barra al petto alto ===== */
(() => { const e = EX.find(x => x.id === 's-upright'); Object.assign(e, {fr: [[12, -8], [95, -55]], az: 0.55,
  cap: ['Barra davanti alle cosce, braccia distese', 'Barra al petto alto, gomiti alti e larghi all’altezza delle spalle'],
  trj: 'La barra sale verticale, aderente al corpo, dalle cosce al petto alto; sono i gomiti a guidare, salgono in fuori e in alto fino all’altezza delle spalle.'}); })();

/* ===== alternative a UN cavo e una maniglia per gli esercizi che ne usano due ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const add = o => EX.push(o);
  const UNO = 'Basta un solo cavo e una maniglia: lavori un lato alla volta e poi cambi braccio. Il busto non deve ruotare né inclinarsi verso il cavo.';
  add(cl('p-croci-singolo', {id: 'p-croci-basse-singolo', n: 'Croci dal basso verso l’alto a un braccio al cavo', an: [[275, 210]], hs: {a: [19, 64, -6], b: [-22, -10, 66], r: 66}, fr: [[25, 15], [75, -100, {t: 176}]], m: 'Petto alto (clavicolare), deltoide anteriore',
    cap: ['Mano al lato della coscia, braccio quasi disteso', 'Mano davanti al viso, all’altezza del mento'],
    set: 'Un cavo BASSO con maniglia singola. Stai di lato alla torre, piede opposto avanti, busto leggermente in avanti. ' + UNO,
    ese: ['Parti con la mano lungo la coscia, gomito appena piegato.', 'Solleva il braccio in arco verso l’alto e verso il centro, fino a portare la mano davanti al viso.', 'Contrai il petto alto 1 secondo.', 'Torna lentamente controllando lo stiramento.'],
    why: 'Versione a un cavo delle croci dal basso: lavora la parte alta del petto con una sola maniglia, senza bisogno di due torri.'}));
  add(cl('p-croci-singolo', {id: 'p-croci-alte-singolo', n: 'Croci dall’alto verso il basso a un braccio al cavo', an: [[275, 25]], hs: {a: [70, -17, -12], b: [-20, 47, 50], r: 66}, fr: [[85, 117, {}], [26, -6, {t: 176}]], m: 'Pettorali (porzione sternale/bassa)',
    cap: ['Braccio aperto, poco sopra l’orizzontale', 'Mano davanti al basso ventre, gomito appena piegato'],
    set: 'Un cavo ALTO con maniglia singola. Stai di lato alla torre, un passo avanti, piede opposto avanti, busto inclinato di ~15°. ' + UNO,
    ese: ['Parti con il braccio aperto e il petto stirato.', 'Porta la mano in arco verso il basso e il centro, davanti all’addome.', 'Stringi il petto 1 secondo.', 'Risali lentamente.'],
    why: 'Versione a un cavo delle croci dall’alto: isola la parte bassa del petto con una sola maniglia.'}));
  add(cl('b-lat-ginocchio', {id: 'b-lat-ginocchio-singolo', n: 'Lat pulldown in ginocchio a un braccio', one: true, m: 'Gran dorsale, romboidi, core',
    cap: ['Braccio disteso in alto', 'Gomito al fianco, maniglia al petto'],
    set: 'Un cavo ALTO con maniglia singola. Inginocchiati davanti alla torre (tappetino sotto le ginocchia), busto leggermente inclinato indietro; la mano libera al fianco o al rack. ' + UNO,
    ese: ['Parti con il braccio disteso verso l’alto, stirando il dorsale.', 'Tira il gomito verso il fianco, leggermente davanti al corpo.', 'Contrai il dorsale 1 secondo.', 'Risali lentamente.'],
    cue: 'Gomito in basso e verso la tasca; il busto resta fermo.', why: 'Lavoro unilaterale del dorsale con un range più ampio e un solo cavo.',
    err: ['Ruotare il busto', 'Usare lo slancio', 'Piegare il braccio troppo presto']}));
  add(cl('p-panca-cavi', {id: 'p-panca-cavo-singolo', n: 'Chest press su panca a un braccio al cavo', one: true, presa: 'neu',
    cap: ['Maniglia al lato del petto, gomito a 45°', 'Braccio disteso sopra il petto'],
    set: 'Panca piana con la testa verso una torre, un cavo BASSO con maniglia singola. Sdraiati e porta la maniglia al lato del petto; l’altra mano sulla panca. ' + UNO,
    ese: ['Parti con la maniglia al lato del petto.', 'Spingi verso l’alto e leggermente verso il centro fino a braccio disteso.', 'Contrai 1 secondo.', 'Scendi lentamente.'],
    why: 'Spinta orizzontale unilaterale con tensione costante del cavo e un solo attacco.'}));
  add(cl('p-incl-cavi', {id: 'p-incl-cavo-singolo', n: 'Panca inclinata a un braccio al cavo', one: true, presa: 'neu',
    set: 'Panca a 30° davanti a una torre, un cavo BASSO con maniglia singola; schiena appoggiata, altra mano sulla panca. ' + UNO,
    why: 'Versione a un cavo della panca inclinata ai cavi: parte alta del petto, un lato alla volta.'}));
  add(cl('c-curl-panca-cavo', {id: 'c-curl-panca-cavo-singolo', n: 'Curl su panca inclinata a un braccio al cavo', one: true,
    set: 'Panca inclinata a 45-60° davanti a una torre, un cavo BASSO con maniglia singola, braccio che pende dietro la linea del busto. ' + UNO,
    why: 'Versione a un cavo: bicipite in massimo allungamento con un solo attacco.'}));
  const ALT = {'p-croci-alte': 'p-croci-alte-singolo', 'p-croci-basse': 'p-croci-basse-singolo', 'p-croci-petto': 'p-croci-singolo', 'c-curl-alti': 'c-curl-alti-singolo', 's-posteriori': 's-posteriori-singolo',
    'b-lat-ginocchio': 'b-lat-ginocchio-singolo', 's-laterali-doppio': 's-laterali', 't-kickback-doppio': 't-kickback', 'p-press-cavi': 'p-press-cavo-singolo', 'p-panca-cavi': 'p-panca-cavo-singolo',
    'p-incl-cavi': 'p-incl-cavo-singolo', 'c-curl-panca-cavo': 'c-curl-panca-cavo-singolo', 's-press-cavo': 's-press-cavo-singolo', 'b-row-busto-cavi': 'b-row-singolo'};
  Object.entries(ALT).forEach(([a, b]) => { const e = EX.find(x => x.id === a); if (e) { e.alt = b; e.due = true; } });
  EX.forEach(e => { if (e.eq === 'cable' && !e.due && !(e.an && Array.isArray(e.an[0]) && e.an.length > 1)) e.unCavo = true; });
})();

// Estensioni per tricipiti sopra la testa / french press: gomiti stretti (niente apertura laterale da "pressa")
['t-french-cavo', 't-over-db', 't-overhead-corda', 't-overhead-singolo'].forEach(id => { const e = EX.find(x => x.id === id); if (e && e.lat === undefined) e.lat = 0.7; });
// Military press: alla partenza la mano sta sulle clavicole, davanti alla spalla (non sopra l'articolazione): gomiti un po' avanti, niente oscillazione brusca del gomito al primo centimetro
['s-military', 'sm-military'].forEach(id => { const e = EX.find(x => x.id === id); if (e) e.fr[0] = [32, e.fr[0][1] - 8, ...(e.fr[0].slice(2))]; });

/* ===== rematori: gomiti vicini al busto e corsa realistica ===== */
(() => {
  ['b-row-cavo', 'b-row-cavo-singolo', 'b-row-terra', 'b-row-terra-singolo', 'b-row-busto-cavi', 'b-row-singolo', 'b-row-db', 'sm-row', 'b-row-bar', 'j-row-singolo', 'b-row-jammer'].forEach(id => { const e = EX.find(x => x.id === id); if (e && e.lat === undefined) e.lat = 0.35; });
  // rematore ai cavi a busto inclinato: a fine corsa il gomito resta poco dietro il busto e la mano arriva al fianco (non un piegamento completo)
  const bb = EX.find(x => x.id === 'b-row-busto-cavi'); if (bb) bb.fr = [[50, 55], [-40, 12]];
  // rematore seduto a terra: partenza con le braccia verso il cavo basso (leggermente in giu'), arrivo con la maniglia all'addome e i gomiti dietro
  ['b-row-terra', 'b-row-terra-singolo', 'b-row-cavo', 'b-row-cavo-singolo'].forEach(id => { const e = EX.find(x => x.id === id); if (e) e.fr = [[78, 78, {t: 168}], [-45, 62, {t: 186}]]; });
})();
// Esercizi con cavigliera in piedi: le mani si appoggiano alla torre all'altezza del petto, gomiti piegati (non braccia tese in avanti)
['g-leg-curl', 'g-kickback', 'g-kickback-flesso'].forEach(id => { const e = EX.find(x => x.id === id); if (e) e.fr = e.fr.map(f => [48, 112, ...f.slice(2)]); });

/* ===== Rematore al cavo basso con barra, a busto inclinato: 4 prese dal video "Your grip changes your back workout" ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const base = {g: 'schiena', a: 'Cavi', eq: 'cable', st: 'hinge', lin: true, an: [250, 212], lat: 0.35, due: false, unCavo: true, alt: undefined, prio: true, tipo: 'semi', fin: ['massa', 'tonificare'],
    set: 'Cavo BASSO con barra dritta o EZ. Stai a un passo dalla torre, busto inclinato di circa 45° e schiena neutra, ginocchia morbide.',
    pos: 'Piedi alla larghezza delle spalle, sguardo a terra, core contratto. Il busto resta fermo per tutta la serie.',
    err: ['Busto che si alza a ogni ripetizione', 'Tirare con i bicipiti invece che con i gomiti', 'Schiena arrotondata', 'Spalle che salgono verso le orecchie']};
  EX.push(cl('b-row-busto-cavi', Object.assign({}, base, {id: 'b-row-barra-sup', n: 'Rematore al cavo basso con barra, presa supina (dorsali)', presa: 'sup', m: 'Gran dorsale (fasci bassi), bicipiti, romboidi', mm: 'Gran dorsale (fasci inferiori), grande rotondo, bicipite brachiale, romboidi',
    fr: [[50, 55], [-45, 12]], cap: ['Braccia tese verso il cavo, palmi in su', 'Barra tirata verso le anche, gomiti stretti ai fianchi'],
    ese: ['Afferra la barra con i palmi verso l’alto, larghezza spalle.', 'Tira la barra verso le anche (non verso il petto), gomiti che sfiorano i fianchi.', 'Contrai 1 secondo con le scapole chiuse.', 'Ritorna lentamente a braccia tese.'],
    cue: 'Gomiti verso le tasche posteriori: la barra arriva all’inguine, non allo stomaco.',
    why: 'La presa supina e la traiettoria verso le anche spostano il lavoro sui fasci bassi del gran dorsale, come nel video: stessa macchina, quattro prese, quattro zone della schiena.',
    trj: 'La barra va in linea retta dal cavo basso verso le anche, parallela alle cosce.'})));
  EX.push(cl('b-row-busto-cavi', Object.assign({}, base, {id: 'b-row-barra-pro', n: 'Rematore al cavo basso con barra, presa prona (schiena intera)', presa: 'pro', m: 'Romboidi, trapezio medio, gran dorsale, deltoide posteriore', mm: 'Romboidi, trapezio medio e inferiore, gran dorsale, deltoide posteriore, bicipite',
    fr: [[50, 55], [-40, 20]], cap: ['Braccia tese, palmi in giù, larghezza spalle', 'Barra all’ombelico, scapole strette'],
    ese: ['Afferra la barra con i palmi verso il basso, larghezza spalle.', 'Tira la barra verso l’ombelico portando i gomiti dietro il busto.', 'Stringi forte le scapole 1 secondo.', 'Ritorna lentamente.'],
    cue: 'Pensa a schiacciare una noce tra le scapole.',
    why: 'Con la presa prona a larghezza spalle il carico si distribuisce su tutta la schiena: dorsali, romboidi e trapezio medio lavorano insieme.',
    trj: 'La barra va in linea retta dal cavo basso verso l’ombelico.'})));
  EX.push(cl('b-row-busto-cavi', Object.assign({}, base, {id: 'b-row-barra-larga', n: 'Rematore al cavo basso con barra, presa larga al petto (parte alta)', presa: 'pro', m: 'Trapezio medio, deltoide posteriore, romboidi, gran dorsale', mm: 'Trapezio medio, deltoide posteriore, romboidi, cuffia dei rotatori, gran dorsale (fasci alti)', lat: 1.4, gz: 44,
    fr: [[55, 60], [-15, 50]], cap: ['Braccia tese, presa larga', 'Barra al petto, gomiti alti e larghi'],
    ese: ['Afferra la barra con presa larga, palmi in giù.', 'Tira la barra verso il petto con i gomiti alti e aperti.', 'Contrai la parte alta della schiena 1 secondo.', 'Ritorna lentamente.'],
    cue: 'Gomiti alti e larghi: la barra arriva al petto, non allo stomaco.',
    why: 'Presa larga e traiettoria al petto spostano l’enfasi su trapezio medio e deltoide posteriore: la parte alta della schiena.',
    trj: 'La barra sale in linea retta dal cavo basso verso il petto, più in alto che nelle altre prese.'})));
  const sh = EX.find(e => e.id === 'b-shrug-cavo'); if (sh) sh.prio = true;
})();
// Anche gli esercizi del secondo video (allenamento completo schiena ai cavi) sono proposti per primi dal wizard
['b-row-cavo', 'b-lat-larga', 'b-pulldown-braccia-tese', 's-facepull', 'b-lat-singolo'].forEach(id => { const e = EX.find(x => x.id === id); if (e) e.prio = true; });

// Barra in verticale: Smith machine (binari) e stacchi/squat con bilanciere (la barra resta sulla stessa verticale, sopra il mesopiede)
['sm-rdl', 'sm-squat', 'sm-front-squat', 'sm-calf', 'sm-scrollate', 'sm-row', 'g-rdl', 'b-rackpull', 'g-squat', 'g-front-squat', 'g-calf', 'b-scrollate'].forEach(id => { const e = EX.find(x => x.id === id); if (e) e.vbar = true; });
// Military press alla Smith: la barra e' sui binari, quindi verticale sopra le spalle; alla partenza la barra sta al mento con i gomiti avanti e il busto appena indietro
['sm-military', 's-military'].forEach(id => { const e = EX.find(x => x.id === id); if (e) { e.fr[0] = [15, 175, ...(e.fr[0].slice(2))]; e.vbar = true; e.vref = 1; } });

/* ===== panche e busto allineati alle schede (gradi scritti nelle descrizioni) ===== */
(() => {
  const setT = (id, t0, t1) => { const e = EX.find(x => x.id === id); if (!e) return; e.fr = e.fr.map((f, i) => [f[0], f[1], Object.assign({}, f[2] || {}, {t: i === 0 ? t0 : (t1 === undefined ? t0 : t1)})]); };
  // inclinazione della panca (gradi dall'orizzontale), come nelle schede
  const INC = {'p-incl-db': 30, 'p-incl-cavi': 30, 'p-incl-cavo-singolo': 30, 'sm-incl': 35, 'j-incl': 35, 'c-incl': 50, 'c-curl-panca-cavo': 50, 'c-curl-panca-cavo-singolo': 50};
  Object.entries(INC).forEach(([id, v]) => { const e = EX.find(x => x.id === id); if (e) e.inc = v; });
  // busto: angolo dalla verticale scritto nella scheda -> t = 180 - gradi (avanti), 180 + gradi (indietro)
  setT('b-row-bar', 115);            // 60-70° dalla verticale
  setT('sm-row', 135);               // circa 45°
  setT('b-row-singolo', 128);        // 45-60°
  setT('b-row-jammer', 128);         // 45-60°
  setT('j-row-singolo', 135);        // ~45°
  setT('b-row-busto-cavi', 135);     // ~45°
  ['b-row-barra-sup', 'b-row-barra-pro', 'b-row-barra-larga'].forEach(id => setT(id, 135));   // circa 45°
  setT('t-kickback-doppio', 128);    // 45-60°
  setT('p-croci-alte', 165, 165);    // ~15°
  setT('p-croci-alte-singolo', 165, 165);
  setT('p-croci-petto', 168, 168);   // 10-15°
  setT('p-croci-singolo', 168, 168);
  setT('p-croci-basse', 168, 168);   // 10-15° in avanti
  setT('p-croci-basse-singolo', 168, 168);
  setT('b-lat-larga', 184, 190);     // ~10° indietro
  ['b-lat-neutra', 'b-lat-supina', 'b-lat-singolo'].forEach(id => setT(id, 184, 190));
  setT('s-press-db', 185, 185);      // panca 80-85°
  setT('s-press-cavo', 185, 185);
  setT('s-press-cavo-singolo', 185, 185);
  setT('b-rope-row-terra', 220, 220);   // 35-45° indietro
  (() => { const e = EX.find(x => x.id === 'g-sumo'); if (e) e.fr[1][2].t = 165; })();   // busto eretto
})();
// Kickback ai cavi a due braccia: busto a ~52° e braccio parallelo al busto (gomito alto e fermo)
(() => { const e = EX.find(x => x.id === 't-kickback-doppio'); if (e) e.fr = [[-52, 0, {t: 128}], [-52, -52, {t: 128}]]; })();
// Rematori a busto inclinato (45°): partenza con le braccia distese verso il cavo basso, arrivo con la mano al fianco/addome/petto e il gomito dietro il busto
(() => {
  const F = {'b-row-busto-cavi': [[40, 45], [-78, 0]], 'b-row-singolo': [[40, 45], [-78, 0]], 'b-row-barra-sup': [[40, 45], [-78, 0]], 'b-row-barra-pro': [[40, 45], [-100, 15]], 'b-row-barra-larga': [[40, 45], [-110, 40]]};
  Object.entries(F).forEach(([id, fr]) => { const e = EX.find(x => x.id === id); if (!e) return; e.fr = fr.map((f, i) => [f[0], f[1], Object.assign({}, (e.fr[i] && e.fr[i][2]) || {})]); });
})();
// Pulldown a braccia tese: presa stretta (mani poco meno della larghezza delle spalle)
(() => { const e = EX.find(x => x.id === 'b-pulldown-braccia-tese'); if (e) e.gz = 16; })();
/* ===== Rematore seduto con corda (video "3 esercizi con la corda") ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  EX.push(cl('b-row-cavo', {id: 'b-row-corda', n: 'Rematore al cavo basso seduto con corda', presa: 'neu', unCavo: true, due: false, alt: undefined, prio: true, tipo: 'semi', fin: ['massa', 'tonificare'],
    m: 'Dorsali, romboidi, trapezio medio, bicipiti', mm: 'Gran dorsale, romboidi, trapezio medio, deltoide posteriore, bicipite brachiale',
    set: 'Cavo BASSO con corda. Siediti sulla panca (o a terra) davanti alla torre, piedi appoggiati, ginocchia leggermente flesse. Afferra la corda con i palmi che si guardano.',
    pos: 'Schiena neutra, petto alto, busto fermo. La corda permette di aprire le mani a fine corsa.',
    ese: ['Parti con le braccia distese e le scapole lasciate scivolare in avanti.', 'Tira la corda verso l’ombelico, gomiti vicini ai fianchi.', 'A fine corsa apri le mani ai lati dell’addome e stringi le scapole 1 secondo.', 'Ritorna lentamente controllando il cavo.'],
    cue: 'Corda all’ombelico, gomiti dietro le costole, mani che si aprono a fine corsa.',
    why: 'La corda lascia i polsi liberi e permette di chiudere di più le scapole rispetto alla barra: più lavoro per dorsali e parte centrale della schiena.',
    err: ['Busto che oscilla avanti e indietro', 'Tirare verso il petto invece che all’ombelico', 'Spalle che salgono', 'Schiena arrotondata in partenza']}));
})();
// Rematore seduto con corda: le mani partono vicine e si aprono ai lati dell'addome a fine corsa
(() => { const e = EX.find(x => x.id === 'b-row-corda'); if (e) { e.gz = 12; e.gz2 = 34; e.cap = ['Braccia distese, corda chiusa davanti a te', 'Corda all’ombelico, mani aperte ai lati, scapole strette']; } })();
// Face pull: anche per la schiena (romboidi, trapezio medio); corsa corretta: braccia distese verso la puleggia alta, poi gomiti alti e larghi e corda ai lati del viso
(() => { const e = EX.find(x => x.id === 's-facepull'); if (!e) return; e.g2 = ['schiena']; e.m = 'Deltoide posteriore, romboidi, trapezio medio, cuffia dei rotatori';
  Object.assign(e, {lin: true, lat: 3.2, gz: 18, gz2: 40, az: 0.7, fr: [[92, 95, {t: 176}], [85, -108, {t: 182}]], cap: ['Braccia distese verso la puleggia alta, corda chiusa', 'Gomiti alti e larghi, corda ai lati del viso, mani aperte']});
})();

/* ===== dip alle parallele, curl con manubri, varianti di trazioni ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const base = (o) => Object.assign({fin: ['massa', 'tonificare'], tipo: 'iso'}, o);
  // --- dip ---
  EX.push(base({id: 't-dip', n: 'Dip alle parallele (tricipiti)', g: 'tricipiti', g2: ['petto'], a: 'Corpo libero', m: 'Tricipiti, pettorale inferiore, deltoide anteriore', mm: 'Tricipite brachiale (tutti i capi), grande pettorale (fasci inferiori), deltoide anteriore, core',
    tipo: 'comp', fin: ['forza', 'massa', 'tonificare'], presa: 'neu', st: 'hang', eq: 'dip', gz: 28, az: 0.6,
    dipY: 106, fr: [[0, 0, {h: [150, 95], t: 180, th: 25, sh: -70}], [-60, 63, {h: [150, 131], t: 172, th: 25, sh: -70}]],
    cap: ['Braccia distese sulle parallele, corpo verticale', 'Gomiti piegati a 90° dietro, busto quasi verticale'],
    trj: 'Il corpo scende e sale quasi in verticale: più il busto resta dritto, più lavorano i tricipiti; inclinandolo in avanti lavora di più il petto.',
    set: 'Parallele (o le jammer arms bloccate alla stessa altezza, o due panche). Mani alla larghezza delle spalle, presa neutra, braccia distese.',
    pos: 'Spalle basse e lontane dalle orecchie, core contratto, gambe piegate dietro o incrociate, sguardo avanti.',
    ese: ['Parti a braccia distese, senza bloccare i gomiti con violenza.', 'Scendi piegando i gomiti all’indietro finché il braccio è circa a 90°.', 'Spingi sulle mani e risali fino a distendere le braccia.', 'Se è troppo duro usa un elastico sotto le ginocchia o i piedi su una panca.'],
    cue: 'Gomiti che vanno indietro, non in fuori: busto dritto per i tricipiti.',
    why: 'Il miglior esercizio a corpo libero per i tricipiti: carichi alti, si progredisce con una cintura per la zavorra.',
    err: ['Scendere troppo con le spalle rilassate', 'Gomiti che si aprono in fuori', 'Spalle alle orecchie', 'Mezze ripetizioni']}));
  EX.push(cl('t-dip', {id: 't-dip-panca', n: 'Dip tra due panche (tricipiti)', a: 'Corpo libero', eq: 'dip', dipY: 160, gz: 24, mm: 'Tricipite brachiale, deltoide anteriore',
    fr: [[-10, -10, {h: [150, 150], t: 184, th: 95, sh: 0}], [-70, 50, {h: [150, 178], t: 186, th: 95, sh: 0}]],
    cap: ['Mani sul bordo della panca dietro di te, gambe avanti', 'Gomiti piegati a 90°, bacino vicino alla panca'],
    trj: 'Il bacino scende e sale in verticale, vicino al bordo della panca.',
    set: 'Una panca dietro di te con le mani sul bordo (dita in avanti); i talloni a terra o su una seconda panca per renderlo più duro.',
    pos: 'Schiena vicina alla panca, spalle basse, sguardo avanti.',
    ese: ['Parti a braccia distese con il bacino fuori dalla panca.', 'Piega i gomiti all’indietro finché il braccio è a 90°.', 'Risali spingendo con i tricipiti.', 'Per aumentare: piedi su una panca o un disco sulle cosce.'],
    cue: 'Gomiti dritti dietro, bacino che sfiora la panca.',
    why: 'Versione più facile dei dip alle parallele: stessa estensione del gomito con meno carico, utile per iniziare o per molte ripetizioni.',
    err: ['Bacino lontano dalla panca (stress alle spalle)', 'Scendere troppo', 'Gomiti in fuori']}));
  // --- bicipiti con manubri ---
  const dbCurl = (o) => Object.assign(cl('c-curl-bar', {a: 'Manubri', eq: 'db', gz: 24, tipo: 'iso', fin: ['forza', 'massa', 'tonificare'], alt: undefined, due: undefined, unCavo: undefined}), o);
  EX.push(dbCurl({id: 'c-curl-db', n: 'Curl con manubri in piedi (alternato)', presa: 'sup', m: 'Bicipiti, brachiale', mm: 'Bicipite brachiale (capo lungo e breve), brachiale, brachioradiale',
    fr: [[5, 5], [8, 150]], cap: ['Braccia distese lungo i fianchi, palmi in avanti', 'Manubri alle spalle, mignolo verso l’alto'],
    set: 'Due manubri, in piedi. Puoi alternare le braccia o salire insieme.', pos: 'Piedi alla larghezza del bacino, gomiti ai fianchi, petto alto, busto fermo.',
    ese: ['Parti a braccia distese con i palmi in avanti (o neutri, ruotandoli salendo).', 'Fletti il gomito portando il manubrio alla spalla, ruotando il mignolo verso l’alto in cima.', 'Contrai 1 secondo.', 'Scendi in 2-3 secondi fino a braccio disteso.'],
    cue: 'Gomito fermo al fianco, mignolo in alto a fine curl.', why: 'Il curl con manubri permette la supinazione completa (il bicipite è anche un supinatore) e lavora ogni braccio da solo.', err: ['Dondolare', 'Gomiti che avanzano', 'Scendere a metà']}));
  EX.push(dbCurl({id: 'c-hammer-db', n: 'Curl a martello con manubri', presa: 'neu', m: 'Brachiale, brachioradiale, bicipiti', mm: 'Brachiale, brachioradiale, bicipite brachiale',
    fr: [[5, 5], [8, 150]], cap: ['Manubri lungo i fianchi, palmi che si guardano', 'Manubri alle spalle, presa neutra'],
    set: 'Due manubri, in piedi, presa neutra (pollici in alto).', pos: 'Gomiti ai fianchi, polsi dritti, busto fermo.',
    ese: ['Parti a braccia distese, palmi verso le cosce.', 'Fletti il gomito tenendo la presa neutra fino alla spalla.', 'Contrai 1 secondo.', 'Scendi lentamente.'],
    cue: 'Pollici verso l’alto per tutto il movimento.', why: 'La presa neutra sposta il lavoro sul brachiale e sul brachioradiale: braccio più spesso e avambraccio più forte.', err: ['Ruotare il polso', 'Dondolare', 'Gomiti che avanzano']}));
  EX.push(dbCurl({id: 'c-curl-db-seduto', n: 'Curl con manubri seduto su panca', presa: 'sup', st: 'seat', m: 'Bicipiti, brachiale', mm: 'Bicipite brachiale, brachiale',
    fr: [[5, 5, {t: 182}], [8, 150, {t: 182}]], cap: ['Seduto, braccia distese ai lati', 'Manubri alle spalle'],
    set: 'Panca con schienale a 80-90°, due manubri.', pos: 'Schiena appoggiata, gomiti ai fianchi: lo schienale impedisce di dondolare.',
    ese: ['Parti a braccia distese.', 'Fletti i gomiti (insieme o alternando) ruotando il mignolo in alto.', 'Contrai 1 secondo.', 'Scendi controllato.'],
    cue: 'Schiena incollata allo schienale: lavorano solo i bicipiti.', why: 'Da seduto non puoi aiutarti con il busto: esecuzione più pulita, ideale per massa e tonificazione.', err: ['Staccare la schiena', 'Gomiti in avanti']}));
  EX.push(dbCurl({id: 'c-zottman', n: 'Curl Zottman con manubri', presa: 'sup', m: 'Bicipiti, brachiale, brachioradiale, estensori', mm: 'Bicipite brachiale, brachiale, brachioradiale, estensori dell’avambraccio',
    fr: [[5, 5], [8, 150]], cap: ['Braccia distese, palmi in avanti', 'Manubri alle spalle: qui ruota i palmi in giù prima di scendere'],
    set: 'Due manubri più leggeri del curl normale.', pos: 'Gomiti ai fianchi, busto fermo.',
    ese: ['Sali con i palmi in su come in un curl normale.', 'In cima ruota i polsi: palmi verso il basso.', 'Scendi lentamente in presa prona (3 secondi).', 'In basso ruota di nuovo i palmi in su e ripeti.'],
    cue: 'Su supino, giù prono: la discesa lenta fa lavorare l’avambraccio.', why: 'Unisce curl e reverse curl: bicipiti in salita, brachioradiale ed estensori in discesa.', err: ['Scendere veloce', 'Carico troppo alto per la fase prona']}));
  EX.push(dbCurl({id: 'c-reverse-db', n: 'Curl con manubri presa prona (reverse curl)', presa: 'pro', m: 'Brachioradiale, estensori, brachiale', mm: 'Brachioradiale, estensori dell’avambraccio, brachiale', g: 'bicipiti', g2: ['avambracci'],
    fr: [[5, 5], [8, 150]], cap: ['Braccia distese, palmi verso le cosce/indietro', 'Manubri alle spalle, dorso della mano in alto'],
    set: 'Due manubri leggeri, presa prona (palmi in giù).', pos: 'Gomiti ai fianchi, polsi dritti e fermi.',
    ese: ['Parti a braccia distese con i palmi in giù.', 'Fletti i gomiti tenendo i polsi dritti.', 'Contrai 1 secondo.', 'Scendi lentamente.'],
    cue: 'Polsi fermi, non “tirare” con le dita.', why: 'Rinforza avambracci e brachioradiale, rende più forte la presa in trazioni e rematori.', err: ['Polso che si piega', 'Carico eccessivo', 'Gomiti che si alzano']}));
  EX.push(dbCurl({id: 'c-hammer-cross', n: 'Curl a martello incrociato (cross-body) con manubrio', presa: 'neu', one: true, m: 'Brachiale, brachioradiale, bicipiti', mm: 'Brachiale, brachioradiale, bicipite brachiale (capo lungo)',
    fr: [[5, 5], [12, 140]], cap: ['Manubrio lungo il fianco, presa neutra', 'Manubrio verso la spalla opposta'],
    set: 'Un manubrio, in piedi, presa neutra. Un braccio alla volta.', pos: 'Gomito al fianco, busto fermo e non ruotato.',
    ese: ['Parti a braccio disteso lungo il fianco.', 'Porta il manubrio in diagonale verso la spalla opposta, come a toccare il petto.', 'Contrai 1 secondo.', 'Scendi lentamente e alterna.'],
    cue: 'Diagonale verso il petto, gomito che resta vicino al fianco.', why: 'La traiettoria incrociata accentua il brachiale e il capo lungo del bicipite: ottimo per lo spessore del braccio.', err: ['Ruotare il busto', 'Gomito che si allontana dal fianco']}));
  // --- trazioni: varianti ---
  const tr = (o) => Object.assign(cl('b-trazioni', {tipo: 'comp', fin: ['forza', 'massa', 'tonificare']}), o);
  EX.push(tr({id: 'b-trazioni-larga', n: 'Trazioni a presa larga', presa: 'pro', gz: 48, m: 'Gran dorsale (fasci alti), grande rotondo, romboidi', mm: 'Gran dorsale, grande rotondo, romboidi, trapezio medio, bicipiti',
    fr: [[180, 180], [40, 160, {h: [150, 92]}]], cap: ['Sospeso a braccia distese, mani larghe', 'Petto alla sbarra, gomiti in basso e larghi'],
    set: 'Sbarra del powerrack. Presa prona ben più larga delle spalle (circa 1,5 volte).', pos: 'Corpo teso, scapole attive, gambe leggermente piegate dietro.',
    ese: ['Parti sospeso, spalle attive.', 'Tira i gomiti in basso e in fuori portando il petto alla sbarra.', 'Mento sopra la sbarra, contrai 1 secondo.', 'Scendi in 2-3 secondi fino a braccia distese.'],
    cue: 'Gomiti verso il pavimento, petto in alto.', why: 'La presa larga accorcia la corsa ma accentua i dorsali alti e il grande rotondo: la schiena “a V”.', err: ['Dondolare', 'Collo in avanti', 'Mezze ripetizioni']}));
  EX.push(tr({id: 'b-trazioni-stretta', n: 'Trazioni a presa stretta prona', presa: 'pro', gz: 16, m: 'Gran dorsale (fasci bassi), bicipiti, avambracci', mm: 'Gran dorsale, bicipiti, brachiale, brachioradiale, romboidi',
    cap: ['Sospeso, mani vicine', 'Mento sopra la sbarra, gomiti stretti davanti'],
    set: 'Sbarra del powerrack. Presa prona con le mani a 15-20 cm.', pos: 'Corpo teso, gomiti che restano davanti al busto.',
    ese: ['Parti sospeso a braccia distese.', 'Tira portando i gomiti in basso e davanti, petto verso la sbarra.', 'Mento sopra la sbarra, contrai.', 'Scendi lentamente.'],
    cue: 'Gomiti stretti e davanti: lavorano i dorsali bassi e le braccia.', why: 'La presa stretta allunga la corsa e sposta il lavoro sui fasci bassi del dorsale e sulle braccia.', err: ['Dondolare', 'Spalle alle orecchie']}));
  EX.push(tr({id: 'b-trazioni-neutra', n: 'Trazioni a presa neutra (maniglie parallele)', presa: 'neu', gz: 22, m: 'Gran dorsale, brachiale, bicipiti, romboidi', mm: 'Gran dorsale, brachiale, bicipite brachiale, romboidi, trapezio medio',
    cap: ['Sospeso alle maniglie parallele', 'Mento sopra le mani, gomiti ai fianchi'],
    set: 'Maniglie parallele agganciate alla sbarra del rack (o una corda/asciugamano). Palmi che si guardano, larghezza spalle.', pos: 'Corpo teso, scapole attive.',
    ese: ['Parti sospeso a braccia distese.', 'Tira i gomiti in basso lungo i fianchi.', 'Mento sopra le mani, contrai 1 secondo.', 'Scendi controllato.'],
    cue: 'Gomiti lungo i fianchi, petto alto.', why: 'La presa neutra è la più comoda per spalle e gomiti e permette di usare più carico: ideale per la forza.', err: ['Dondolare', 'Non scendere del tutto']}));
  EX.push(tr({id: 'b-trazioni-negative', n: 'Trazioni negative (solo discesa)', presa: 'pro', fin: ['forza', 'massa', 'tonificare'], m: 'Gran dorsale, bicipiti, romboidi, core', mm: 'Gran dorsale, bicipiti, romboidi, trapezio, core',
    fr: [[25, 170, {h: [150, 88]}], [180, 180]], cap: ['Mento sopra la sbarra (salito con un salto o una panca)', 'Braccia distese dopo una discesa lenta'],
    set: 'Sbarra del powerrack con una panca o un box sotto. Sali con un salto o un passo, scendi in 4-6 secondi.', pos: 'Corpo teso, core contratto, scapole attive fino all’ultimo centimetro.',
    ese: ['Sali con l’aiuto della panca fino al mento sopra la sbarra.', 'Scendi il più lentamente possibile (4-6 secondi).', 'Arriva a braccia distese con le spalle ancora attive.', 'Rimetti i piedi sulla panca e ripeti.'],
    cue: 'Frena la discesa: conta fino a 5.', why: 'La fase eccentrica costruisce la forza per arrivare alle trazioni complete: è il modo migliore per impararle.', err: ['Lasciarsi cadere', 'Rilassare le spalle in basso']}));
  EX.push(tr({id: 'b-trazioni-elastico', n: 'Trazioni assistite con elastico', presa: 'pro', m: 'Gran dorsale, bicipiti, romboidi', mm: 'Gran dorsale, bicipiti, romboidi, trapezio medio',
    cap: ['Sospeso, ginocchio nell’elastico', 'Mento sopra la sbarra'],
    set: 'Elastico agganciato alla sbarra, un ginocchio o un piede nell’anello. Più l’elastico è spesso, più aiuta.', pos: 'Corpo teso, scapole attive.',
    ese: ['Parti sospeso con l’elastico in tensione.', 'Tira i gomiti in basso portando il petto alla sbarra.', 'Mento sopra la sbarra.', 'Scendi controllato: col tempo passa a elastici più sottili.'],
    cue: 'Stessa tecnica delle trazioni complete, l’elastico aiuta solo in basso.', why: 'Permette di fare volume con la tecnica corretta mentre costruisci la forza per le trazioni libere.', err: ['Dondolare', 'Usare un elastico troppo spesso per sempre']}));
  // presa per il rig e wizard
  ['t-dip', 't-dip-panca', 'b-trazioni-neutra', 'c-hammer-db', 'c-hammer-cross'].forEach(id => { const e = EX.find(x => x.id === id); if (e) e.presa = e.presa || 'neu'; });
})();
