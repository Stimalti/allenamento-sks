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
    pro: 'p-panca p-incl-db p-press-cavi s-military s-press-db s-frontali s-frontali-singolo s-upright b-rackpull b-row-bar b-lat-larga b-pulldown-braccia-tese b-trazioni b-scrollate w-wrist-ext w-reverse-curl t-push-barra t-french-cavo t-panca-stretta g-squat g-rdl g-hip-thrust g-calf a-rollout p-panca-cavi p-incl-cavi sm-panca sm-incl sm-panca-stretta sm-military sm-row sm-scrollate sm-squat sm-rdl sm-hip-thrust sm-calf b-shrug-cavo t-push-prono-singolo',
    sup: 'c-curl-bar c-curl-cavo c-curl-alti c-incl c-concentrato c-curl-singolo w-wrist-curl t-push-inverso g-front-squat sm-front-squat c-curl-panca-cavo c-curl-alti-singolo b-lat-supina c-chinup',
    neu: 'p-croci-alte p-croci-basse p-croci-petto p-croci-panca p-croci-singolo p-jammer-press j-incl j-shoulder2 j-row-singolo s-facepull s-posteriori s-posteriori-singolo s-jammer-press s-rot-est s-frontali-corda s-press-cavo s-press-cavo-singolo b-lat-neutra b-row-cavo b-row-cavo-singolo b-lat-ginocchio b-lat-singolo b-row-singolo b-row-jammer b-row-busto-cavi b-row-terra b-row-terra-singolo b-rope-lat-terra b-rope-row-terra b-rope-facepull-terra c-hammer c-hammer-singolo t-push-corda t-overhead-corda t-overhead-singolo t-kickback t-over-db g-bulgaro g-pullthrough g-sumo g-split g-squat-cavo g-rdl-cavo a-crunch-cavo a-pallof a-woodchop a-woodchop-basso p-press-cavo-singolo s-laterali s-laterali-doppio'
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
// Estensioni sopra la testa con corda: gomiti fermi in alto, l'avambraccio ruota da dietro la testa fino a braccia distese (passando sopra, non davanti)
(() => { ['t-overhead-corda', 't-overhead-singolo'].forEach(id => { const e = EX.find(x => x.id === id); if (!e) return;
  Object.assign(e, {lin: false, lat: 0.9, gz: 12, gz2: 24, fr: [[165, -35, {t: 172}], [168, -188, {t: 172}]], cap: ['Gomiti in alto, corda dietro la testa', 'Braccia distese sopra la testa, corda aperta'],
    trj: 'I gomiti restano fermi in alto vicino alle orecchie: si muove solo l’avambraccio, che da dietro la testa ruota fino a braccia distese.'}); }); })();
// Trazioni: gomiti leggermente in fuori e davanti, corpo che sale in verticale senza oscillare
(() => { ['b-trazioni', 'c-chinup', 'b-trazioni-larga', 'b-trazioni-stretta', 'b-trazioni-neutra', 'b-trazioni-negative', 'b-trazioni-elastico'].forEach(id => { const e = EX.find(x => x.id === id); if (!e) return;
  e.lat = id === 'b-trazioni-larga' ? 2.6 : id === 'b-trazioni-stretta' || id === 'c-chinup' || id === 'b-trazioni-neutra' ? 0.9 : 1.6;
  e.fr = e.fr.map(f => [f[0], f[1], Object.assign({}, f[2] || {}, {t: 180, th: 22, sh: -88})]); }); })();

/* ===== i 3 curl al cavo del video "STOP doing this for biceps" (gomito dietro, gomito davanti, martello) ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  EX.push(cl('c-curl-singolo', {id: 'c-curl-dietro', n: 'Curl al cavo a un braccio con gomito dietro (cavo alle spalle)', presa: 'sup', one: true, unCavo: true, prio: true, tipo: 'iso', fin: ['massa', 'tonificare'],
    m: 'Bicipiti (capo lungo), brachiale', mm: 'Bicipite brachiale (capo lungo in allungamento), brachiale', an: [45, 212], lat: 0.5, az: 0.75,
    fr: [[-28, -28, {t: 178}], [-28, 125, {t: 178}]], cap: ['Spalle alla torre, braccio dietro il busto e disteso', 'Maniglia alla spalla, gomito che resta dietro'],
    trj: 'Il gomito resta fermo dietro la linea del busto: la mano disegna un arco dal basso-dietro fino alla spalla.',
    set: 'Cavo BASSO con maniglia singola. Dai le spalle alla torre e fai un passo avanti: il cavo tira il braccio indietro e il bicipite parte in allungamento.',
    pos: 'Busto fermo e dritto, gomito dietro il fianco per tutta la serie, polso neutro o leggermente supinato.',
    ese: ['Parti con il braccio disteso dietro il busto, in tensione.', 'Fletti il gomito portando la maniglia verso la spalla senza far avanzare il gomito.', 'Contrai 1 secondo.', 'Scendi lentamente fino ad allungare di nuovo il bicipite.'],
    cue: 'Gomito dietro il fianco: se avanza lavora la spalla, non il bicipite.',
    why: 'Con il cavo che tira da dietro il bicipite lavora in allungamento (capo lungo): è lo stimolo più efficace per la crescita e per il picco.',
    err: ['Gomito che avanza (deltoide anteriore)', 'Busto che si piega in avanti', 'Carico eccessivo con mezze ripetizioni']}));
  EX.push(cl('c-curl-singolo', {id: 'c-curl-davanti', n: 'Curl al cavo a un braccio con gomito davanti (cavo di fronte)', presa: 'sup', one: true, unCavo: true, prio: true, tipo: 'iso', fin: ['massa', 'tonificare'],
    m: 'Bicipiti (capo breve), brachiale', mm: 'Bicipite brachiale (capo breve in accorciamento), brachiale', an: [250, 212], lat: 0.5,
    fr: [[30, 30, {t: 178}], [30, 150, {t: 178}]], cap: ['Di fronte alla torre, braccio disteso davanti al corpo', 'Maniglia alla spalla, gomito davanti e fermo'],
    trj: 'Il gomito resta fermo davanti al busto: la mano sale dal basso-davanti fino alla spalla.',
    set: 'Cavo BASSO con maniglia singola. Di fronte alla torre, un passo indietro: il braccio parte leggermente davanti al corpo.',
    pos: 'Gomito davanti al fianco e fermo, busto dritto, l’altra mano sul fianco o sulla torre.',
    ese: ['Parti a braccio disteso, davanti al corpo.', 'Fletti il gomito tenendolo fermo davanti, maniglia alla spalla.', 'Contrai forte 1 secondo (picco).', 'Scendi controllato.'],
    cue: 'Gomito davanti e fermo, stringi in alto.',
    why: 'Con il gomito davanti il bicipite lavora in accorciamento (capo breve): completa il curl con gomito dietro e dà spessore al braccio visto di fronte.',
    err: ['Gomito che si muove', 'Spalla che sale', 'Dondolare']}));
  const h = EX.find(e => e.id === 'c-hammer-singolo'); if (h) { h.prio = true; }
})();

/* ===== Jammer Arms: tutti gli esercizi possibili con le braccia a leva del rack ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const J = (base, o) => Object.assign(cl(base, {a: 'Jammer', eq: 'jam', presa: 'neu', alt: undefined, due: undefined, unCavo: undefined, hs: undefined, he: undefined, vbar: undefined, vref: undefined, gz2: undefined, prio: undefined, g2: undefined}), o);
  EX.push(J('s-jammer-press', {id: 'j-press-piedi', n: 'Jammer press in piedi a due braccia (spinta avanti-alto)', g: 'petto', g2: ['spalle', 'tricipiti'], one: false, tipo: 'comp', fin: ['forza', 'massa', 'tonificare'],
    m: 'Pettorale alto, deltoidi anteriori, tricipiti, core', mm: 'Grande pettorale (fasci clavicolari), deltoide anteriore, tricipite brachiale, core e glutei (stabilità)', an: [250, 195], lat: 0.8,
    fr: [[60, 150, {t: 170}], [125, 125, {t: 170}]], cap: ['Impugnature alle spalle, un piede avanti', 'Braccia distese in avanti e in alto'],
    trj: 'Le impugnature salgono in diagonale avanti-alto seguendo l’arco delle arms; il busto resta inclinato in avanti e fermo.',
    set: 'Jammer arms agganciate in basso al rack, dischi sulle estremità. Stai di fronte, un piede avanti, impugnature all’altezza delle spalle.',
    pos: 'Busto leggermente inclinato in avanti, core contratto, gomiti sotto le mani.',
    ese: ['Parti con le impugnature alle spalle.', 'Spingi in avanti e in alto fino a distendere le braccia.', 'Controlla il ritorno alle spalle.', 'Puoi farlo anche esplosivo (push press) con una leggera spinta di gambe.'],
    cue: 'Spingi “lontano da te”, non solo in alto.', why: 'È l’esercizio tipico delle jammer arms: spinta in sicurezza con carichi alti, petto alto e spalle insieme.',
    err: ['Inarcare la schiena', 'Gomiti che si aprono', 'Fermarsi a metà corsa']}));
  EX.push(J('s-jammer-press', {id: 'j-press-piedi-singolo', n: 'Jammer press in piedi a un braccio (tipo landmine)', g: 'petto', g2: ['spalle', 'tricipiti'], one: true, tipo: 'comp', fin: ['forza', 'massa', 'tonificare'],
    m: 'Pettorale alto, deltoide anteriore, tricipite, obliqui', mm: 'Grande pettorale (fasci clavicolari), deltoide anteriore, tricipite, obliqui e core (anti-rotazione)', an: [250, 195], lat: 0.8,
    fr: [[60, 150, {t: 170}], [125, 125, {t: 170}]], cap: ['Impugnatura alla spalla, piede opposto avanti', 'Braccio disteso avanti-alto'],
    trj: 'L’impugnatura sale in diagonale avanti-alto; il busto non ruota.',
    set: 'Una jammer arm caricata. Stai di fronte, piede opposto al braccio che lavora avanti.', pos: 'Core contratto, bacino fermo, l’altra mano sul fianco.',
    ese: ['Parti con l’impugnatura alla spalla.', 'Spingi avanti e in alto fino a braccio disteso.', 'Torna controllato.', 'Alterna le braccia.'],
    cue: 'Il busto non gira: lavora anche il core.', why: 'Versione unilaterale: corregge le differenze tra i due lati e allena l’anti-rotazione.',
    err: ['Ruotare il busto', 'Inarcare la schiena']}));
  EX.push(J('p-jammer-press', {id: 'j-press-stretta', n: 'Jammer press presa stretta su panca (tricipiti)', g: 'tricipiti', g2: ['petto'], gz: 18, tipo: 'comp', fin: ['forza', 'massa', 'tonificare'],
    m: 'Tricipiti, pettorali, deltoidi anteriori', mm: 'Tricipite brachiale, grande pettorale, deltoide anteriore',
    cap: ['Impugnature vicine ai lati del petto, gomiti stretti', 'Braccia distese'],
    set: 'Panca piana tra le jammer arms, impugnature alla larghezza delle spalle o più strette.', pos: 'Gomiti vicini al busto per tutta la spinta, scapole addotte.',
    ese: ['Parti con le impugnature ai lati del petto basso.', 'Spingi tenendo i gomiti stretti fino a distendere le braccia.', 'Contrai i tricipiti 1 secondo.', 'Scendi controllato.'],
    cue: 'Gomiti stretti: è una spinta per i tricipiti.', why: 'Come la panca presa stretta ma guidata dalle arms: più sicura senza spotter e indipendente per lato.',
    err: ['Gomiti che si aprono', 'Rimbalzare in basso']}));
  EX.push(J('g-front-squat', {id: 'j-squat', n: 'Squat con Jammer Arms (impugnature alle spalle)', g: 'gambe', tipo: 'comp', fin: ['forza', 'massa', 'tonificare'],
    m: 'Quadricipiti, glutei, core', mm: 'Quadricipite, grande gluteo, adduttori, core, schiena alta (postura)', an: [250, 195], lat: 0.5, ko: 9, vbar: undefined,
    fr: [[70, 160, {t: 178}], [70, 160, {t: 165, h: [118, 163], th: 80, sh: -15}]], cap: ['In piedi, impugnature alle spalle', 'Cosce parallele, busto quasi verticale'],
    trj: 'Il bacino scende e sale in verticale; le impugnature seguono l’arco delle arms e aiutano l’equilibrio.',
    set: 'Jammer arms agganciate in basso, impugnature all’altezza delle spalle. Stai di fronte al rack, piedi alla larghezza delle spalle.', pos: 'Petto alto, gomiti sotto le mani, peso sui talloni.',
    ese: ['Parti in piedi con le impugnature alle spalle.', 'Scendi piegando le ginocchia fino a cosce parallele.', 'Risali spingendo i talloni nel pavimento.', 'Le arms salgono con te: tienile vicine al corpo.'],
    cue: 'Petto alto, gomiti alti.', why: 'Alternativa allo squat frontale: il carico è guidato e lo schema del movimento resta naturale.',
    err: ['Talloni che si alzano', 'Ginocchia che cedono verso l’interno', 'Busto che crolla in avanti']}));
  EX.push(J('g-rdl', {id: 'j-stacco', n: 'Stacco rumeno con Jammer Arms', g: 'gambe', tipo: 'comp', fin: ['forza', 'massa', 'tonificare'],
    m: 'Femorali, glutei, erettori spinali', mm: 'Bicipite femorale, semitendinoso, grande gluteo, erettori spinali, presa', an: [250, 205], lat: 0.4, vbar: undefined,
    fr: [[25, 25, {t: 178}], [25, 25, {t: 135, h: [115, 120], th: 25, sh: -5}]], cap: ['In piedi, impugnature davanti alle cosce', 'Fianchi indietro, busto inclinato, impugnature alle ginocchia'],
    trj: 'Le impugnature scendono lungo le cosce seguendo l’arco delle arms; i fianchi vanno indietro.',
    set: 'Jammer arms agganciate in basso, impugnature all’altezza delle cosce. Di fronte al rack, piedi alla larghezza delle anche.', pos: 'Schiena neutra, ginocchia morbide, scapole basse.',
    ese: ['Parti in piedi con le impugnature davanti alle cosce.', 'Porta i fianchi indietro inclinando il busto, braccia distese.', 'Scendi fino alle ginocchia o poco sotto, femorali in tensione.', 'Risali contraendo i glutei.'],
    cue: 'Fianchi indietro, non ginocchia avanti.', why: 'Stacco rumeno guidato: il carico segue un arco fisso e la presa neutra è comoda per polsi e schiena.',
    err: ['Schiena che si arrotonda', 'Piegare troppo le ginocchia', 'Impugnature lontane dalle gambe']}));
  EX.push(J('b-scrollate', {id: 'j-shrug', n: 'Scrollate con Jammer Arms', g: 'schiena', tipo: 'iso', fin: ['massa', 'tonificare'],
    m: 'Trapezio superiore', mm: 'Trapezio superiore, elevatore della scapola', an: [250, 205], lat: 0.4,
    fr: [[20, 20], [20, 20, {tl: 64}]], cap: ['Impugnature davanti alle cosce, spalle rilassate', 'Spalle alzate verso le orecchie'],
    set: 'Jammer arms agganciate in basso, impugnature all’altezza delle cosce. Di fronte al rack, presa neutra.', pos: 'Braccia distese, busto dritto.',
    ese: ['Parti con le spalle rilassate in basso.', 'Alza le spalle verso le orecchie senza piegare i gomiti.', 'Tieni 1 secondo in alto.', 'Scendi lentamente.'],
    cue: 'Su e giù: niente rotazioni delle spalle.', why: 'Scrollate con presa neutra e carico guidato: polsi e spalle in posizione comoda.',
    err: ['Ruotare le spalle', 'Piegare i gomiti']}));
  EX.push(J('c-curl-bar', {id: 'j-curl', n: 'Curl con Jammer Arms', g: 'bicipiti', tipo: 'iso', fin: ['forza', 'massa', 'tonificare'],
    m: 'Bicipiti, brachiale', mm: 'Bicipite brachiale, brachiale, brachioradiale (presa neutra)', an: [250, 205], lat: 0.4,
    fr: [[15, 15], [15, 150]], cap: ['Impugnature davanti alle cosce, braccia distese', 'Impugnature alle spalle, gomiti fermi'],
    set: 'Jammer arms agganciate in basso, impugnature all’altezza delle cosce. Di fronte al rack, presa neutra (o supina se le impugnature lo permettono).', pos: 'Gomiti ai fianchi e fermi, busto dritto.',
    ese: ['Parti a braccia distese.', 'Fletti i gomiti portando le impugnature verso le spalle.', 'Contrai 1 secondo.', 'Scendi controllato.'],
    cue: 'Gomiti fermi: muovi solo l’avambraccio.', why: 'Il carico segue l’arco delle arms e resta in tensione anche in alto, a differenza del bilanciere.',
    err: ['Dondolare', 'Gomiti che avanzano']}));
  EX.push(J('b-row-jammer', {id: 'j-row-alto', n: 'Rematore alto con Jammer Arms (gomiti larghi, parte alta della schiena)', g: 'schiena', g2: ['spalle'], tipo: 'semi', fin: ['massa', 'tonificare'], lat: 1.6, gz: 36,
    m: 'Trapezio medio, romboidi, deltoide posteriore', mm: 'Trapezio medio, romboidi, deltoide posteriore, gran dorsale (fasci alti)',
    fr: [[35, 40, {t: 128}], [-70, -20, {t: 128}]], cap: ['Impugnature davanti, braccia distese', 'Gomiti alti e larghi, impugnature al petto'],
    set: 'Jammer arms caricate, impugnature all’altezza delle ginocchia. Busto inclinato a 45-60°.', pos: 'Schiena neutra, ginocchia morbide, gomiti che vanno in fuori.',
    ese: ['Parti con le braccia distese verso le arms.', 'Tira con i gomiti alti e larghi fino a portare le impugnature al petto.', 'Stringi le scapole 1 secondo.', 'Ritorna lentamente.'],
    cue: 'Gomiti in fuori, verso l’alto: lavora la parte alta della schiena.', why: 'Variante del rematore con jammer arms che sposta il lavoro su trapezio medio e deltoidi posteriori.',
    err: ['Busto che si alza', 'Gomiti stretti (diventa il rematore classico)']}));
})();
/* ===== esercizi che richiedono la panca (attrezzo scegliibile in programmi, proposte e filtri) ===== */
(() => { const no = new Set(['b-lat-larga', 'b-row-cavo', 'b-row-corda', 'b-row-cavo-singolo', 'w-wrist-curl', 'b-trazioni-negative', 't-over-db']);   // la panca è solo un'alternativa
  EX.forEach(e => { if (e.a === 'Panca' || (!no.has(e.id) && /panca/i.test(e.n + ' ' + (e.set || '') + ' ' + (e.pos || '')))) e.nb = true; }); })();   // e.nb = richiede la panca (e.bench e' gia' usato per la grafica)
/* ===== core: torsione del busto (woodchop), cavo laterale (Pallof), flessione della colonna (crunch) ===== */
(() => { const g = id => EX.find(e => e.id === id);
  let e = g('a-woodchop'); if (e) Object.assign(e, {an: [185, 18], tzf: 92, gz: 7, az: 1.1, fr: [[150, 150, {t: 182, tw: 45, zs: 58}], [22, 4, {t: 160, tw: -42, zs: -58}]],
    cap: ['Mani in alto sopra la spalla destra, busto girato verso la torre', 'Mani in basso al ginocchio sinistro, busto girato dall’altra parte'],
    trj: 'Diagonale dall’alto verso il basso attraverso il corpo: le mani partono sopra la spalla vicina alla torre e finiscono fuori dal ginocchio opposto. Il busto ruota, le braccia restano quasi tese.'});
  e = g('a-woodchop-basso'); if (e) Object.assign(e, {an: [185, 212], tzf: 92, gz: 7, az: 1.1, fr: [[22, 4, {t: 160, tw: 45, zs: 58}], [150, 150, {t: 182, tw: -42, zs: -58}]],
    cap: ['Mani in basso fuori dal ginocchio destro, busto girato verso la torre', 'Mani in alto sopra la spalla sinistra, busto girato dall’altra parte'],
    trj: 'Diagonale dal basso verso l’alto attraverso il corpo: dal ginocchio vicino alla torre fino sopra la spalla opposta, ruotando il busto.'});
  e = g('a-pallof'); if (e) Object.assign(e, {an: [185, 75], tzf: 92, gz: 6, az: 0.75, fr: [[45, -30, {t: 180}], [88, 90, {t: 180}]],
    cap: ['Mani al petto, il cavo tira di lato', 'Braccia distese davanti: il busto NON ruota'],
    trj: 'Le mani vanno dritte in avanti dal petto. Il cavo, che arriva di lato, cerca di girarti verso la torre: il lavoro è restare fermi con il busto.'});
  e = g('a-crunch-cavo'); if (e) Object.assign(e, {fr: [[90, -125, {t: 180}], [125, -125, {t: 128, cu: 50}]],
    cap: ['In ginocchio, corda ai lati della testa, schiena dritta', 'Colonna arrotolata, gomiti verso le ginocchia: il bacino resta fermo'],
    trj: 'Non è un inchino dalle anche: il bacino resta fermo e la colonna si arrotola, portando le costole verso il bacino e i gomiti verso le ginocchia.'});
})();
/* ===== addominali: molti esercizi in più (a terra, alla sbarra, ai cavi, con manubrio) ===== */
(() => {
  const MM = 'retto addominale, obliqui esterni e interni, trasverso dell’addome';
  const A = o => { if (EX.some(e => e.id === o.id)) return; EX.push(Object.assign({g: 'addome', a: 'Corpo libero', tipo: 'core', fin: ['tonificare'], presa: 'neu', m: 'Addominali', mm: MM, lin: true}, o)); };
  const LIE = {h: [150, 197], t: 270};   // sdraiato a terra sul tappetino, testa a sinistra, piedi verso la torre
  // --- a terra, corpo libero ---
  A({id: 'a-crunch-terra', n: 'Crunch a terra', st: 'floor', m: 'Retto dell’addome (parte alta)', mm: 'retto addominale (fasci superiori), obliqui esterni e interni',
    fr: [[-105, -20, {...LIE, th: 125, sh: 45}], [-80, -20, {...LIE, t: 232, cu: 38, th: 125, sh: 45}]], cap: ['Sdraiato, ginocchia piegate, mani alla testa', 'Spalle staccate da terra, schiena bassa che resta appoggiata'],
    trj: 'Movimento corto: solo le spalle e la parte alta della schiena si staccano, la zona lombare resta a terra. Il mento non si avvicina al petto.',
    set: 'Tappetino a terra. Sdraiati, ginocchia piegate, piedi appoggiati, mani ai lati della testa (non dietro la nuca).', pos: 'Schiena bassa appoggiata, gomiti aperti, sguardo in alto.',
    ese: ['Espira e stacca le spalle da terra arrotolando la parte alta della schiena.', 'Fermati 1 secondo in alto con gli addominali contratti.', 'Scendi lentamente senza appoggiare del tutto la testa.'],
    cue: 'Porta le costole verso il bacino, non la testa verso le ginocchia.', why: 'L’esercizio base per il retto dell’addome: controllato e sicuro per la schiena.', err: ['Tirare la testa con le mani', 'Staccare la zona lombare', 'Andare veloce usando lo slancio']});
  A({id: 'a-crunch-inverso', n: 'Crunch inverso a terra', st: 'floor', m: 'Retto dell’addome (parte bassa)', mm: 'retto addominale (fasci inferiori), obliqui, flessori dell’anca',
    fr: [[90, 90, {...LIE, th: 150, sh: 70}], [90, 90, {...LIE, th: 205, sh: 120, lift: 8}]], cap: ['Sdraiato, braccia lungo i fianchi, ginocchia piegate in alto', 'Ginocchia al petto e bacino staccato da terra'],
    trj: 'Le ginocchia salgono verso il petto e il bacino si arrotola staccandosi da terra; il movimento parte dall’addome, non dalle gambe.',
    set: 'Tappetino a terra. Sdraiati, braccia lungo i fianchi con i palmi a terra, gambe piegate con le cosce verticali.', pos: 'Testa e spalle a terra, ginocchia piegate a 90°.',
    ese: ['Porta le ginocchia verso il petto.', 'Continua arrotolando il bacino finché si stacca da terra.', 'Scendi piano senza far cadere le gambe.'],
    cue: 'Stacca il bacino, non limitarti a muovere le gambe.', why: 'Mette l’accento sulla parte bassa dell’addome, difficile da sentire con i crunch classici.', err: ['Usare lo slancio delle gambe', 'Inarcare la schiena in discesa', 'Spingere con le mani']});
  A({id: 'a-bicicletta', n: 'Crunch bicicletta', st: 'floor', m: 'Obliqui, retto dell’addome', mm: 'obliqui esterni e interni, retto addominale, flessori dell’anca', rl: 100,
    fr: [[-105, -20, {...LIE, t: 240, cu: 30, th: 160, sh: 90, tw: -30}], [-80, -20, {...LIE, t: 232, cu: 38, th: 100, sh: 100, tw: 30}]], cap: ['Gomito destro verso il ginocchio sinistro, gamba destra piegata', 'Si cambia lato: la gamba si distende e il busto ruota dall’altra parte'],
    trj: 'Pedalata lenta: una gamba si distende mentre l’altra si piega, e il busto ruota portando il gomito verso il ginocchio opposto.',
    set: 'Tappetino a terra. Sdraiati, mani ai lati della testa, gambe sollevate.', pos: 'Zona lombare appoggiata, spalle staccate per tutta la serie.',
    ese: ['Porta il ginocchio destro verso il petto distendendo la sinistra.', 'Ruota il busto portando il gomito sinistro verso il ginocchio destro.', 'Cambia lato in modo lento e controllato.'],
    cue: 'Ruota con le spalle, non tirare con il collo.', why: 'Tra i migliori esercizi per obliqui e retto insieme, senza attrezzi.', err: ['Andare veloci', 'Tirare la testa', 'Appoggiare le spalle tra una ripetizione e l’altra']});
  A({id: 'a-leg-raise-terra', n: 'Leg raise a terra', st: 'floor', m: 'Retto dell’addome (parte bassa), flessori anca', mm: 'retto addominale (fasci inferiori), obliqui, ileopsoas',
    fr: [[90, 90, {...LIE, th: 100, sh: 100}], [90, 90, {...LIE, th: 170, sh: 170}]], cap: ['Gambe tese sollevate poco da terra, mani sotto i glutei', 'Gambe verticali'],
    set: 'Tappetino a terra. Sdraiati con le mani sotto i glutei, gambe tese.', pos: 'Schiena bassa schiacciata a terra, gambe tese o appena piegate.',
    ese: ['Parti con i piedi sollevati di 10-15 cm.', 'Alza le gambe fino alla verticale.', 'Scendi lentamente fermandoti prima di toccare terra.'],
    cue: 'Se la schiena si inarca, piega un po’ le ginocchia o accorcia la discesa.', why: 'Parte bassa dell’addome e flessori dell’anca: la discesa lenta è la parte che conta.', err: ['Schiena che si inarca', 'Piedi che toccano terra', 'Slancio']});
  A({id: 'a-sforbiciate', n: 'Sforbiciate (flutter kicks)', st: 'floor', m: 'Retto dell’addome (parte bassa), flessori anca', mm: 'retto addominale (fasci inferiori), ileopsoas, obliqui', rl: 115,
    fr: [[90, 90, {...LIE, th: 100, sh: 100}], [90, 90, {...LIE, th: 135, sh: 135}]], cap: ['Gambe tese sollevate, una più bassa', 'Le gambe si alternano su e giù'],
    set: 'Tappetino a terra. Sdraiati con le mani sotto i glutei, gambe tese e sollevate.', pos: 'Schiena bassa a terra, testa appoggiata o leggermente sollevata.',
    ese: ['Alza le gambe di 20-30 cm.', 'Alterna piccoli calci su e giù, gambe tese.', 'Continua per il tempo o le ripetizioni previste.'],
    cue: 'Movimento piccolo e veloce, addome sempre contratto.', why: 'Tenuta prolungata della parte bassa dell’addome.', err: ['Schiena che si inarca', 'Gambe troppo alte', 'Trattenere il respiro']});
  A({id: 'a-hollow', n: 'Hollow hold (tenuta a barchetta)', st: 'floor', m: 'Core completo (isometrico)', mm: 'retto addominale, trasverso dell’addome, obliqui, flessori dell’anca',
    fr: [[-150, -150, {...LIE, h: [150, 203], t: 250, cu: 20, th: 112, sh: 112}], [-150, -150, {...LIE, h: [150, 203], t: 248, cu: 22, th: 118, sh: 118}]], cap: ['Braccia dietro, gambe tese sollevate, spalle staccate', 'Posizione tenuta: piccola oscillazione'],
    set: 'Tappetino a terra. Sdraiati, braccia distese dietro la testa, gambe tese.', pos: 'Zona lombare schiacciata a terra, spalle e gambe sollevate: il corpo è una barchetta.',
    ese: ['Schiaccia la schiena bassa a terra.', 'Solleva spalle, braccia e gambe di 15-20 cm.', 'Tieni 20-40 secondi respirando.'],
    cue: 'Prima schiaccia la schiena a terra, poi alza il resto.', why: 'La base della stabilità del tronco: insegna a tenere il bacino neutro sotto carico.', err: ['Lombare che si stacca', 'Gambe troppo alte (troppo facile)', 'Trattenere il respiro']});
  A({id: 'a-dead-bug', n: 'Dead bug', st: 'floor', m: 'Trasverso, core (stabilità)', mm: 'trasverso dell’addome, retto addominale, obliqui, flessori dell’anca', rl: 170,
    fr: [[180, 180, {...LIE, h: [150, 202], th: 170, sh: 90}], [-140, -140, {...LIE, h: [150, 202], th: 110, sh: 110}]], cap: ['Braccia verso il soffitto, ginocchia sopra le anche', 'Braccio dietro la testa e gamba opposta distesa'],
    set: 'Tappetino a terra. Sdraiati, braccia verso il soffitto, cosce verticali e ginocchia a 90°.', pos: 'Zona lombare appoggiata per tutto l’esercizio.',
    ese: ['Distendi lentamente un braccio dietro la testa e la gamba opposta in avanti.', 'Fermati a pochi cm da terra.', 'Torna e cambia lato.'],
    cue: 'La schiena non deve mai staccarsi da terra: se succede, accorcia il movimento.', why: 'Stabilità del tronco a basso rischio: ottimo per iniziare e per la schiena.', err: ['Lombare che si inarca', 'Movimento veloce', 'Trattenere il respiro']});
  A({id: 'a-vup', n: 'V-up', st: 'floor', m: 'Retto dell’addome, flessori anca', mm: 'retto addominale, obliqui, ileopsoas, retto femorale',
    fr: [[-160, -160, {...LIE, th: 95, sh: 95}], [115, 115, {...LIE, h: [150, 203], t: 210, th: 150, sh: 150}]], cap: ['Disteso, braccia dietro la testa', 'Busto e gambe salgono insieme: mani verso i piedi'],
    set: 'Tappetino a terra. Sdraiati completamente disteso, braccia dietro la testa.', pos: 'Gambe tese, braccia tese.',
    ese: ['Solleva contemporaneamente busto e gambe.', 'Tocca (o avvicina) i piedi con le mani formando una V.', 'Scendi controllato senza appoggiare del tutto.'],
    cue: 'Sali con il fiato che esce, scendi piano.', why: 'Esercizio avanzato: tutta la catena addominale in un movimento solo.', err: ['Slancio con le braccia', 'Schiena curva in alto', 'Cadere in discesa']});
  A({id: 'a-situp', n: 'Sit-up', st: 'floor', m: 'Retto dell’addome, flessori anca', mm: 'retto addominale, obliqui, ileopsoas',
    fr: [[150, -100, {...LIE, th: 125, sh: 45}], [40, -210, {...LIE, t: 160, th: 125, sh: 45}]], cap: ['Sdraiato, braccia incrociate al petto, ginocchia piegate', 'Seduto: busto quasi verticale'],
    set: 'Tappetino a terra. Sdraiati, ginocchia piegate, piedi a terra (puoi bloccarli sotto un attrezzo), braccia incrociate al petto.', pos: 'Mento leggermente dentro, piedi fermi.',
    ese: ['Arrotola prima le spalle, poi tutta la schiena fino a sederti.', 'Tocca le ginocchia con i gomiti.', 'Scendi vertebra dopo vertebra.'],
    cue: 'Sali arrotolando, non come una tavola rigida.', why: 'Movimento completo: addome più flessori dell’anca. Ottimo con un disco o manubrio al petto per progredire.', err: ['Salire rigido con la schiena dritta', 'Tirare il collo', 'Lasciarsi cadere']});
  A({id: 'a-plank', n: 'Plank sui gomiti', st: 'floor', m: 'Core completo (isometrico)', mm: 'trasverso dell’addome, retto addominale, obliqui, glutei, erettori spinali',
    fr: [[0, 90, {h: [150, 190], t: 92, th: -58, sh: -66, lift: 0}], [0, 90, {h: [150, 181], t: 92, th: -66, sh: -66, lift: 0}]], cap: ['Gomiti sotto le spalle, bacino ancora basso', 'Corpo in linea: tieni 30-60 s, glutei stretti, bacino neutro'],
    set: 'Tappetino a terra. Avambracci a terra, gomiti sotto le spalle, piedi uniti o poco larghi.', pos: 'Testa, schiena e bacino in linea; glutei contratti.',
    ese: ['Mettiti sugli avambracci e sulle punte dei piedi.', 'Stringi glutei e addome, respira.', 'Tieni 30-60 secondi senza far cadere i fianchi.'],
    cue: 'Immagina di portare i gomiti verso i piedi: l’addome si accende.', why: 'La tenuta più semplice ed efficace per il tronco; protegge la schiena negli esercizi pesanti.', err: ['Fianchi che scendono', 'Sedere troppo alto', 'Testa che pende']});
  A({id: 'a-mountain', n: 'Mountain climber', st: 'floor', m: 'Core, flessori anca (dinamico)', mm: 'retto addominale, obliqui, ileopsoas, spalle (stabilità)', rl: -45,
    fr: [[0, 0, {h: [150, 150], t: 92, th: -42, sh: -42}], [0, 0, {h: [150, 150], t: 92, th: 75, sh: -10}]], cap: ['Plank sulle mani, corpo in linea', 'Un ginocchio verso il petto, l’altro piede resta dietro'],
    set: 'Tappetino a terra. Posizione di plank sulle mani, mani sotto le spalle.', pos: 'Schiena piatta, bacino fermo mentre le gambe si muovono.',
    ese: ['Porta un ginocchio verso il petto.', 'Riportalo indietro e cambia gamba.', 'Vai lento (controllo) o veloce (fiato).'],
    cue: 'Il bacino non rimbalza: si muovono solo le gambe.', why: 'Addome dinamico più lavoro cardiovascolare, senza attrezzi.', err: ['Sedere che si alza', 'Schiena che cede', 'Spalle davanti alle mani']});
  // --- con manubrio ---
  A({id: 'a-russian-twist', n: 'Russian twist con manubrio', a: 'Manubri', eq: 'db', gz: 6, m: 'Obliqui, retto dell’addome', mm: 'obliqui esterni e interni, retto addominale, trasverso', fin: ['massa', 'tonificare'],
    st: 'floor', fr: [[70, 75, {h: [112, 204], t: 150, th: 110, sh: 60, tw: 45, zs: 40}], [70, 75, {h: [112, 204], t: 150, th: 110, sh: 60, tw: -45, zs: -40}]], cap: ['Seduto, busto indietro, manubrio a destra', 'Rotazione: manubrio a sinistra'],
    set: 'Tappetino a terra, un manubrio leggero tenuto con due mani. Seduto, ginocchia piegate, piedi sollevati (o a terra per facilitare).', pos: 'Busto inclinato indietro di 45°, schiena dritta.',
    ese: ['Porta il manubrio di fianco a un’anca ruotando il busto.', 'Passa dall’altra parte controllando il movimento.', 'Le spalle ruotano, i fianchi restano fermi.'],
    cue: 'Ruota le spalle, non solo le braccia.', why: 'Obliqui con carico regolabile: aumenta il manubrio invece delle ripetizioni.', err: ['Curvare la schiena', 'Muovere solo le braccia', 'Andare veloci con peso alto']});
  A({id: 'a-situp-db', n: 'Sit-up con manubrio al petto', a: 'Manubri', eq: 'db', gz: 6, m: 'Retto dell’addome, flessori anca', mm: 'retto addominale, obliqui, ileopsoas', fin: ['massa', 'tonificare'],
    st: 'floor', fr: [[150, -100, {...LIE, th: 125, sh: 45}], [40, -210, {...LIE, t: 160, th: 125, sh: 45}]], cap: ['Sdraiato, manubrio tenuto al petto', 'Seduto con il manubrio sempre al petto'],
    set: 'Tappetino, un manubrio tenuto con due mani sul petto (o un disco). Ginocchia piegate, piedi bloccati.', pos: 'Manubrio fermo contro lo sterno per tutta la serie.',
    ese: ['Arrotola le spalle e sali fino a sederti.', 'Scendi lentamente in 2-3 secondi.', 'Aumenta il peso quando arrivi a 15 ripetizioni facili.'],
    cue: 'Il manubrio serve a progredire: scegli un peso con cui le ultime ripetizioni sono difficili.', why: 'Sit-up con carico progressivo: fa crescere l’addome come un muscolo qualsiasi.', err: ['Portare il manubrio avanti per aiutarsi', 'Tirare con il collo', 'Cadere in discesa']});
  // --- alla sbarra ---
  const HANG = {t: 180, h: [150, 150]};
  A({id: 'a-ginocchia-sbarra', n: 'Sollevamento ginocchia alla sbarra', m: 'Retto dell’addome (parte bassa), flessori anca', mm: 'retto addominale (fasci inferiori), ileopsoas, obliqui, presa', st: 'hang', eq: 'hb', presa: 'pro', fin: ['massa', 'tonificare'],
    fr: [[180, 180, {...HANG, th: 8, sh: 8}], [180, 180, {...HANG, th: 115, sh: 25}]], cap: ['Appeso, gambe distese', 'Ginocchia al petto, bacino arrotolato'],
    set: 'Sbarra del powerrack, presa prona poco più larga delle spalle.', pos: 'Spalle attive (non appeso “morto”), gambe unite.',
    ese: ['Parti appeso con le gambe distese e ferme.', 'Porta le ginocchia verso il petto arrotolando il bacino.', 'Scendi lentamente senza dondolare.'],
    cue: 'Ferma il dondolio tra una ripetizione e l’altra.', why: 'Parte bassa dell’addome con il corpo libero in sospensione: allena anche la presa.', err: ['Dondolare', 'Muovere solo le gambe senza arrotolare il bacino', 'Spalle rilassate']});
  A({id: 'a-gambe-sbarra', n: 'Sollevamento gambe tese alla sbarra', m: 'Retto dell’addome, flessori anca', mm: 'retto addominale, ileopsoas, retto femorale, obliqui, presa', st: 'hang', eq: 'hb', presa: 'pro', fin: ['massa', 'tonificare'],
    fr: [[180, 180, {...HANG, th: 8, sh: 8}], [176, 176, {t: 188, h: [144, 142], th: 108, sh: 108}]], cap: ['Appeso, gambe tese', 'Gambe tese all’orizzontale, bacino leggermente arrotolato'],
    set: 'Sbarra del powerrack, presa prona.', pos: 'Gambe tese e unite, spalle attive.',
    ese: ['Dalle gambe distese, alzale tese fino all’orizzontale.', 'Se riesci continua fino alla sbarra.', 'Scendi lentamente.'],
    cue: 'Prima arrotola il bacino, poi le gambe seguono.', why: 'Versione avanzata del sollevamento ginocchia: più leva, più lavoro.', err: ['Dondolare', 'Piegare le ginocchia', 'Scendere di colpo']});
  A({id: 'a-toes-to-bar', n: 'Toes to bar (piedi alla sbarra)', m: 'Retto dell’addome, flessori anca, dorsali', mm: 'retto addominale, ileopsoas, gran dorsale, obliqui, presa', st: 'hang', eq: 'hb', presa: 'pro', fin: ['massa', 'tonificare'],
    fr: [[180, 180, {...HANG, th: 8, sh: 8}], [152, 152, {t: 198, h: [130, 118], th: 146, sh: 146}]], cap: ['Appeso, gambe tese', 'Bacino su e indietro, busto inclinato: i piedi arrivano alla sbarra davanti al viso'],
    set: 'Sbarra del powerrack, presa prona.', pos: 'Spalle attive; si parte senza dondolio.',
    ese: ['Alza le gambe tese portando i piedi a toccare la sbarra.', 'Usa anche i dorsali spingendo la sbarra verso il basso.', 'Scendi controllato.'],
    cue: 'Spingi la sbarra verso le anche mentre le gambe salgono.', why: 'L’esercizio più completo alla sbarra: addome, flessori e dorsali.', err: ['Kipping incontrollato', 'Ginocchia piegate', 'Lasciarsi cadere']});
  A({id: 'a-ginocchia-obliquo-sbarra', n: 'Sollevamento ginocchia obliquo alla sbarra', m: 'Obliqui, retto dell’addome', mm: 'obliqui esterni e interni, retto addominale, ileopsoas, presa', st: 'hang', eq: 'hb', presa: 'pro', fin: ['massa', 'tonificare'],
    fr: [[180, 180, {...HANG, th: 8, sh: 8}], [180, 180, {...HANG, th: 115, sh: 25, tw: -35}]], cap: ['Appeso, gambe distese', 'Ginocchia su e di lato, bacino ruotato'],
    set: 'Sbarra del powerrack, presa prona.', pos: 'Spalle attive, gambe unite.',
    ese: ['Porta le ginocchia verso una spalla ruotando il bacino.', 'Scendi e ripeti dall’altro lato.'],
    cue: 'Le ginocchia vanno verso la spalla, non dritte.', why: 'Obliqui in sospensione: completa il lavoro dei sollevamenti classici.', err: ['Dondolare', 'Ruotare solo le gambe senza il bacino']});
  // --- ai cavi ---
  A({id: 'a-crunch-cavo-piedi', n: 'Crunch al cavo in piedi', a: 'Cavi', eq: 'cable', an: [205, 14], m: 'Retto dell’addome', mm: MM, fin: ['massa', 'tonificare'], st: 'stand',
    fr: [[90, -125, {t: 180}], [125, -125, {t: 135, cu: 45}]], cap: ['In piedi, corda ai lati della testa', 'Colonna arrotolata, gomiti verso le cosce: il bacino resta fermo'],
    trj: 'Come il crunch in ginocchio ma in piedi: il bacino non si muove, la colonna si arrotola portando le costole verso il bacino.',
    set: 'Cavo ALTO con corda. In piedi davanti alla torre, un passo indietro, corda ai lati della testa.', pos: 'Ginocchia morbide, bacino fermo.',
    ese: ['Parti con il busto dritto e la corda alla testa.', 'Arrotola la colonna portando i gomiti verso le cosce.', 'Risali lentamente.'],
    cue: 'Non è un inchino: le anche restano ferme.', why: 'Stessa logica del crunch in ginocchio, comodo se le ginocchia a terra danno fastidio.', err: ['Piegarsi dalle anche', 'Tirare con le braccia', 'Peso eccessivo']});
  A({id: 'a-crunch-cavo-obliquo', n: 'Crunch obliquo al cavo in ginocchio', a: 'Cavi', eq: 'cable', an: [205, 14], m: 'Obliqui, retto dell’addome', mm: 'obliqui esterni e interni, retto addominale, trasverso', fin: ['massa', 'tonificare'], st: 'kneel',
    fr: [[90, -125, {t: 180}], [125, -125, {t: 130, cu: 48, tw: 40}]], cap: ['In ginocchio, corda alla testa', 'Gomito verso il ginocchio opposto: colonna arrotolata e ruotata'],
    set: 'Cavo ALTO con corda. In ginocchio davanti alla torre, corda ai lati della testa.', pos: 'Bacino fermo, schiena neutra in partenza.',
    ese: ['Arrotola la colonna portando un gomito verso il ginocchio opposto.', 'Contrai 1 secondo.', 'Risali e alterna il lato.'],
    cue: 'Ruota mentre scendi, non dopo.', why: 'Variante del crunch al cavo per gli obliqui con carico regolabile.', err: ['Piegarsi dalle anche', 'Ruotare solo le braccia']});
  A({id: 'a-crunch-inverso-cavo', n: 'Crunch inverso al cavo (cavigliera)', a: 'Cavi', eq: 'cable', cp: 'ankle', an: [258, 212], m: 'Retto dell’addome (parte bassa)', mm: 'retto addominale (fasci inferiori), obliqui, ileopsoas', fin: ['massa', 'tonificare'], st: 'floor',
    fr: [[90, 90, {h: [120, 197], t: 270, th: 100, sh: 100}], [90, 90, {h: [120, 197], t: 270, th: 170, sh: 170, lift: 6}]], cap: ['Sdraiato, cavigliera alle caviglie, gambe sollevate', 'Gambe verticali e bacino staccato'],
    set: 'Cavo BASSO con cavigliera (o una cavigliera per gamba). Sdraiati a terra con i piedi verso la torre, mani sotto i glutei (o aggrappate a qualcosa dietro la testa).', pos: 'Schiena bassa a terra, gambe quasi tese.',
    ese: ['Parti con le gambe sollevate e il cavo in tensione.', 'Alza le gambe arrotolando il bacino contro la resistenza.', 'Scendi lentamente.'],
    cue: 'Il cavo tira verso il basso: resistigli nella discesa.', why: 'Leg raise con carico regolabile: progressione vera per la parte bassa dell’addome.', err: ['Schiena che si inarca', 'Slancio', 'Peso eccessivo']});
  A({id: 'a-pallof-ginocchio', n: 'Pallof press in ginocchio', a: 'Cavi', eq: 'cable', an: [185, 110], tzf: 92, gz: 6, m: 'Core (anti-rotazione), obliqui', mm: 'obliqui esterni e interni, trasverso dell’addome, retto addominale, glutei', fin: ['tonificare'], st: 'kneel',
    fr: [[45, -30, {t: 180}], [88, 90, {t: 180}]], cap: ['In ginocchio, mani al petto, il cavo tira di lato', 'Braccia distese: il busto non ruota'],
    trj: 'Le mani vanno dritte in avanti dal petto; in ginocchio il bacino non può aiutare e il lavoro degli obliqui è maggiore.',
    set: 'Cavo all’altezza del petto da inginocchiati, maniglia singola. In ginocchio di lato alla torre, su un tappetino.', pos: 'Ginocchia alla larghezza dei fianchi, glutei contratti, busto verticale.',
    ese: ['Parti con le mani al petto.', 'Distendi le braccia davanti resistendo alla rotazione.', 'Tieni 2 secondi e torna.'],
    cue: 'Stringi i glutei: il bacino è la base.', why: 'Più difficile del Pallof in piedi perché le gambe non compensano.', err: ['Busto che ruota verso la torre', 'Inarcare la schiena']});
  A({id: 'a-pallof-rotazione', n: 'Pallof press con rotazione', a: 'Cavi', eq: 'cable', an: [185, 75], tzf: 92, gz: 6, m: 'Obliqui, core', mm: 'obliqui esterni e interni, trasverso dell’addome, retto addominale', fin: ['tonificare'], st: 'stand',
    fr: [[88, 90, {t: 180, tw: 0}], [88, 90, {t: 180, tw: -40, zs: -34}]], cap: ['Braccia distese davanti, cavo di lato', 'Rotazione del busto lontano dalla torre, braccia sempre tese'],
    trj: 'Dalla posizione a braccia tese del Pallof, il busto ruota lontano dalla torre e torna: le braccia restano tese e fanno da leva.',
    set: 'Cavo MEDIO con maniglia. In piedi di lato alla torre, piedi larghi.', pos: 'Ginocchia morbide, braccia tese all’altezza del petto.',
    ese: ['Distendi le braccia davanti al petto.', 'Ruota il busto lontano dalla torre, lentamente.', 'Torna al centro controllando: il cavo vuole riportarti indietro.'],
    cue: 'Ruota con il tronco, i fianchi seguono poco.', why: 'Obliqui in rotazione con carico regolabile, più dinamico del Pallof classico.', err: ['Piegare le braccia', 'Ruotare solo i fianchi', 'Lasciarsi tirare indietro']});
  A({id: 'a-rotazioni-cavo', n: 'Rotazioni del busto al cavo', a: 'Cavi', eq: 'cable', an: [185, 75], tzf: 92, gz: 7, m: 'Obliqui, core', mm: 'obliqui esterni e interni, trasverso dell’addome, retto addominale', fin: ['massa', 'tonificare'], st: 'stand',
    fr: [[88, 90, {t: 180, tw: 40, zs: 48}], [88, 90, {t: 180, tw: -40, zs: -48}]], cap: ['Braccia tese verso la torre, busto girato', 'Busto girato dall’altra parte, braccia sempre tese'],
    trj: 'Arco orizzontale all’altezza del petto: le mani passano da un lato all’altro con le braccia tese, muovendosi solo con la rotazione del busto.',
    set: 'Cavo MEDIO con maniglia. In piedi di lato alla torre, piedi larghi, braccia tese all’altezza del petto.', pos: 'Ginocchia morbide, bacino quasi fermo.',
    ese: ['Parti con le mani verso la torre.', 'Ruota il busto portando le mani dall’altra parte.', 'Torna lentamente.'],
    cue: 'Le braccia sono solo una leva: il movimento è del tronco.', why: 'Rotazione pura per gli obliqui: complementare al woodchop (che è diagonale).', err: ['Piegare i gomiti', 'Ruotare le anche e le ginocchia', 'Troppo peso']});
  A({id: 'a-situp-panca', n: 'Sit-up su panca con piedi bloccati', m: 'Retto dell’addome, flessori anca', mm: 'retto addominale, obliqui, ileopsoas', st: 'lie', nb: true, fin: ['massa', 'tonificare'],
    fr: [[150, -100, {h: [185, 178], t: 270, th: 125, sh: 45}], [40, -210, {h: [185, 178], t: 160, th: 125, sh: 45}]], cap: ['Sdraiato sulla panca, ginocchia piegate, braccia al petto', 'Seduto: busto in alto'],
    set: 'Panca piana con i piedi bloccati sotto i rulli (o sotto il bilanciere della Smith messo basso). Braccia incrociate al petto o manubrio sul petto.', pos: 'Mento dentro, piedi fermi.',
    ese: ['Arrotola le spalle e sali fino a sederti.', 'Scendi lentamente fino a sfiorare la panca.', 'Per progredire tieni un disco o un manubrio al petto.'],
    cue: 'Arrotolati, non alzarti rigido.', why: 'Sit-up più comodo e caricabile grazie ai piedi bloccati.', err: ['Schiena dritta come una tavola', 'Tirare il collo', 'Cadere in discesa']});
})();
/* ===== flessione laterale: side bend e plank laterale (movimento laterale: il 3D mostra solo la posa di partenza) ===== */
(() => {
  const A = o => { if (EX.some(e => e.id === o.id)) return; EX.push(Object.assign({g: 'addome', a: 'Corpo libero', tipo: 'core', fin: ['tonificare'], presa: 'neu', lin: true, noanim: true}, o)); };
  A({id: 'a-side-bend-db', n: 'Side bend con manubrio', a: 'Manubri', eq: 'db', one: true, st: 'stand', noanim: false, fin: ['massa', 'tonificare'], m: 'Obliqui, quadrato dei lombi', mm: 'obliqui esterni e interni, quadrato dei lombi, trasverso dell’addome',
    fr: [[4, 4, {t: 180, sb: -10}], [4, 4, {t: 180, sb: 30}]], az: 1.05, cap: ['In piedi, manubrio nella mano destra, busto dritto (anzi un filo verso l’altro lato)', 'Busto piegato di lato verso il manubrio, che scende lungo la coscia: il fianco opposto si allunga'],
    trj: 'Movimento laterale puro: il busto si inclina di lato verso il manubrio (il manubrio scende lungo la coscia) e poi torna dritto e un po’ oltre, verso il lato opposto. Niente rotazione, niente inclinazione in avanti.',
    set: 'Un manubrio in una mano, l’altra mano sul fianco o dietro la testa. In piedi, piedi alla larghezza delle anche.', pos: 'Busto dritto, spalle basse, sguardo avanti. Il bacino resta fermo e centrato.',
    ese: ['Lascia scendere il manubrio lungo la coscia inclinando il busto di lato.', 'Scendi finché senti allungare il fianco opposto, senza ruotare.', 'Risali contraendo il fianco libero e vai leggermente oltre la verticale.', 'Finisci la serie e cambia mano.'],
    cue: 'Il lavoro lo fa il fianco OPPOSTO al manubrio, quando risali.', why: 'Obliqui e quadrato dei lombi con carico regolabile; utile anche per la mobilità del tronco.', err: ['Inclinarsi in avanti o indietro', 'Ruotare il busto', 'Spostare il bacino di lato per “aiutare”', 'Usare un peso troppo alto']});
  A({id: 'a-side-bend-cavo', n: 'Flessione laterale al cavo basso', a: 'Cavi', eq: 'cable', one: true, st: 'stand', noanim: false, fin: ['massa', 'tonificare'], m: 'Obliqui, quadrato dei lombi', mm: 'obliqui esterni e interni, quadrato dei lombi, trasverso dell’addome',
    fr: [[4, 4, {t: 180, sb: -8}], [4, 4, {t: 180, sb: 26}]], az: 1.05, tzf: 92, an: [185, 212], cap: ['Di lato alla torre, maniglia nella mano vicina al cavo', 'Busto piegato verso la torre: il fianco opposto lavora quando risali'],
    trj: 'Come il side bend con manubrio, ma la resistenza del cavo è costante lungo tutto il movimento: il busto si inclina verso la torre e risale contraendo il fianco opposto.',
    set: 'Cavo BASSO con maniglia singola. Stai di lato alla torre, maniglia nella mano vicina alla torre, braccio disteso lungo il fianco.', pos: 'Piedi alla larghezza delle anche, ginocchia morbide, bacino fermo.',
    ese: ['Inclina il busto verso la torre lasciando scendere la maniglia.', 'Risali contraendo il fianco opposto fino a superare leggermente la verticale.', 'Scendi controllato: il cavo tira per tutta la serie.', 'Cambia lato.'],
    cue: 'Allontanati dalla torre con le costole, non con il bacino.', why: 'Tensione continua sugli obliqui, senza dover tenere un manubrio pesante.', err: ['Ruotare il busto', 'Piegare il braccio', 'Spostare il bacino']});
  A({id: 'a-side-plank', n: 'Plank laterale', st: 'floor', m: 'Obliqui, quadrato dei lombi, core (isometrico)', mm: 'obliqui esterni e interni, quadrato dei lombi, trasverso dell’addome, medio gluteo',
    fr: [[0, 90, {h: [150, 181], t: 92, th: -66, sh: -66}], [0, 90, {h: [150, 181], t: 92, th: -66, sh: -66, lift: 2}]], cap: ['Posizione tenuta sul fianco: gomito sotto la spalla, corpo in linea (il 3D mostra il plank classico)', 'Il bacino resta alto per tutta la tenuta'],
    trj: 'Nessun movimento: sei sdraiato su un fianco, appoggiato sull’avambraccio e sul bordo del piede, e tieni il corpo dritto come una tavola, con il bacino sollevato da terra.',
    set: 'Tappetino a terra. Sdraiati su un fianco, gomito sotto la spalla, avambraccio a terra perpendicolare al corpo, piedi uno sopra l’altro (o uno davanti all’altro per più equilibrio).', pos: 'Testa, spalle, bacino e piedi in linea; la mano libera sul fianco o verso il soffitto.',
    ese: ['Solleva il bacino da terra fino ad avere il corpo in linea.', 'Spingi il gomito nel pavimento e tieni il fianco basso attivo.', 'Respira e tieni 20-45 secondi, poi cambia lato.'],
    cue: 'Non lasciare che il bacino scenda: immagina una corda che lo tira verso il soffitto.', why: 'L’esercizio più semplice per gli obliqui e la stabilità laterale, importante per la schiena e per squat e stacchi.', err: ['Bacino che scende o va indietro', 'Spalla che “affonda” (gomito non sotto la spalla)', 'Trattenere il respiro', 'Ruotare il busto verso terra']});
  A({id: 'a-side-plank-hip', n: 'Plank laterale con bacino su e giù', st: 'floor', m: 'Obliqui, quadrato dei lombi', mm: 'obliqui esterni e interni, quadrato dei lombi, trasverso dell’addome, medio gluteo',
    fr: [[0, 90, {h: [150, 181], t: 92, th: -66, sh: -66}], [0, 90, {h: [150, 181], t: 92, th: -66, sh: -66, lift: 6}]], cap: ['Plank laterale: bacino alto (il 3D mostra il plank classico)', 'Il bacino scende a sfiorare terra e risale'],
    trj: 'Dalla posizione di plank laterale, il bacino scende verso terra fino quasi a toccarla e risale sopra la linea del corpo: è il side bend in isometria dinamica.',
    set: 'Tappetino a terra, posizione di plank laterale sull’avambraccio.', pos: 'Gomito sotto la spalla, corpo in linea, piedi uno sopra l’altro.',
    ese: ['Dal plank laterale abbassa il bacino verso terra senza appoggiarlo.', 'Risali contraendo il fianco fino a superare la linea del corpo.', 'Fai le ripetizioni e cambia lato.'],
    cue: 'Movimento lento: 2 secondi giù, 2 su.', why: 'Versione dinamica del plank laterale: obliqui e quadrato dei lombi con più ripetizioni e meno tempo di tenuta.', err: ['Ruotare il busto', 'Toccare terra e “rimbalzare”', 'Spalla che affonda']});
})();

/* ===== deltoidi con manubri: alzate frontali, laterali e posteriori (selettore anteriore / laterale / posteriore) ===== */
(() => {
  const g = id => EX.find(e => e.id === id), VARS = ['s-frontali-db', 's-laterali-db', 's-posteriori-db'];
  const A = o => { if (g(o.id)) return; EX.push(Object.assign({g: 'spalle', a: 'Manubri', eq: 'db', tipo: 'iso', fin: ['massa', 'tonificare'], st: 'stand', lin: true, vars: VARS, varsLabel: 'Deltoide'}, o)); };
  A({id: 's-frontali-db', n: 'Alzate frontali con manubri', varName: 'Anteriore', presa: 'pro', gz: 26, m: 'Deltoide anteriore', mm: 'deltoide anteriore, grande pettorale (fascio clavicolare), dentato anteriore, trapezio superiore',
    fr: [[6, 6, {t: 180}], [92, 92, {t: 180}]], cap: ['In piedi, manubri davanti alle cosce, palmi verso il corpo', 'Braccia tese all’altezza delle spalle'],
    trj: 'Arco in avanti: i manubri salgono davanti al corpo fino all’altezza degli occhi, braccia quasi tese, senza slancio del busto.',
    set: 'Due manubri leggeri. In piedi, piedi alla larghezza delle anche, manubri davanti alle cosce con i palmi verso le gambe.', pos: 'Ginocchia morbide, core contratto, spalle basse.',
    ese: ['Alza i manubri in avanti fino all’altezza delle spalle, braccia quasi tese.', 'Fermati 1 secondo in alto.', 'Scendi lentamente senza appoggiarli alle cosce.', 'Puoi alternare le braccia.'],
    cue: 'Sali con il deltoide, non con il busto che oscilla.', why: 'Isola il deltoide anteriore; utile se nelle spinte non lo senti lavorare.', err: ['Oscillare il busto', 'Salire oltre la testa', 'Alzare le spalle verso le orecchie']});
  A({id: 's-laterali-db', n: 'Alzate laterali con manubri', varName: 'Laterale', presa: 'pro', v: 'f', hs: {a: [-8, 70, 6], b: [68, -4, 22], r: 66}, m: 'Deltoide laterale (mediale)', mm: 'deltoide laterale, sovraspinato, deltoide anteriore, trapezio superiore',
    fr: [[12, 27, {}], [90, 110, {}]], cap: ['Manubri ai fianchi, gomiti leggermente piegati', 'Braccia aperte all’altezza delle spalle, gomiti un po’ più alti delle mani'],
    trj: 'Arco laterale: le mani salgono di lato fino all’altezza delle spalle, guidate dal gomito, leggermente davanti al corpo.',
    set: 'Due manubri leggeri. In piedi, manubri ai fianchi (o leggermente davanti), gomiti un po’ piegati.', pos: 'Busto leggermente inclinato in avanti (5-10°), spalle basse, core contratto.',
    ese: ['Alza le braccia di lato guidando con i gomiti.', 'Fermati all’altezza delle spalle, mignolo leggermente più alto del pollice.', 'Scendi in 2-3 secondi.'],
    cue: 'Immagina di allontanare i manubri dal corpo, non di alzarli.', why: 'L’esercizio base per la larghezza delle spalle.', err: ['Slancio con le gambe', 'Spalle che salgono (trapezio)', 'Gomiti tesi e peso eccessivo']});
  A({id: 's-posteriori-db', n: 'Alzate posteriori con manubri (busto inclinato)', varName: 'Posteriore', presa: 'pro', st: 'hinge', gz: 24, gz2: 82, az: 0.85, m: 'Deltoide posteriore, romboidi', mm: 'deltoide posteriore, romboidi, trapezio medio, sottospinato, piccolo rotondo',
    fr: [[6, 6, {t: 112}], [-22, -22, {t: 112}]], cap: ['Busto inclinato in avanti, manubri sotto le spalle', 'Braccia aperte di lato, scapole ferme'],
    trj: 'Con il busto quasi parallelo al pavimento, le braccia si aprono di lato fino all’altezza delle spalle, gomiti leggermente piegati.',
    set: 'Due manubri leggeri. In piedi, busto inclinato in avanti fino quasi all’orizzontale (schiena neutra), manubri sotto le spalle.', pos: 'Ginocchia morbide, schiena dritta, sguardo verso il pavimento.',
    ese: ['Apri le braccia di lato fino all’altezza delle spalle.', 'Fermati 1 secondo con i deltoidi posteriori contratti.', 'Scendi lentamente senza far cadere il busto.'],
    cue: 'Gomiti verso il soffitto, non le mani.', why: 'Deltoide posteriore e parte alta della schiena: riequilibra le spalle di chi fa molte spinte.', err: ['Schiena che si curva', 'Busto che si alza', 'Stringere le scapole invece di alzare i gomiti']});
})();
/* ===== famiglie di esercizi: stesso movimento con attrezzi, prese o posizioni diverse (selettore "Varianti" nella scheda) ===== */
(() => {
  const F = [
    ['petto', /panca inclinata|inclinat/, 'Panca inclinata'], ['petto', /panca piana|chest press|panca con|jammer press/, 'Panca piana / chest press'], ['petto', /croci/, 'Croci'], ['petto', /pull-?over/, 'Pull-over'],
    ['schiena', /lat machine|pulldown/, 'Lat machine / pulldown'], ['schiena', /rematore/, 'Rematore'], ['schiena', /trazioni/, 'Trazioni'], ['schiena', /scrollate/, 'Scrollate'], ['schiena', /rack pull|stacco/, 'Stacco'],
    ['spalle', /alzate laterali/, 'Alzate laterali'], ['spalle', /alzate frontali/, 'Alzate frontali'], ['spalle', /alzate posteriori|reverse fly/, 'Alzate posteriori'], ['spalle', /face pull/, 'Face pull'], ['spalle', /shoulder press|military press|press|military/, 'Shoulder press'], ['spalle', /upright/, 'Upright row'], ['spalle', /rotazione/, 'Cuffia dei rotatori'],
    ['bicipiti', /curl a martello|martello|hammer/, 'Curl a martello'], ['bicipiti', /inclinata/, 'Curl su panca inclinata'], ['bicipiti', /trazioni|chin/, 'Trazioni'], ['bicipiti', /curl/, 'Curl'],
    ['tricipiti', /pushdown|push ?down|spinte in basso/, 'Pushdown'], ['tricipiti', /sopra la testa|overhead|french/, 'Estensioni sopra la testa'], ['tricipiti', /dip/, 'Dip'], ['tricipiti', /kickback/, 'Kickback'], ['tricipiti', /presa stretta/, 'Panca presa stretta'],
    ['gambe', /stacco|rdl|pull-through/, 'Stacco rumeno'], ['gambe', /hip thrust/, 'Hip thrust'], ['gambe', /calf/, 'Calf raise'], ['gambe', /kickback/, 'Kickback glutei'], ['gambe', /leg curl/, 'Leg curl'], ['gambe', /leg extension/, 'Leg extension'], ['gambe', /abduzione|adduzione/, 'Abduzione / adduzione'], ['gambe', /squat|affond|split/, 'Squat e affondi'],
    ['addome', /crunch|sit-up|v-up/, 'Crunch e sit-up'], ['addome', /plank|hollow|dead bug|mountain/, 'Plank e tenute'], ['addome', /pallof|woodchop|rotazion|russian/, 'Rotazioni e anti-rotazione'], ['addome', /leg raise|sollevamento|toes|sforbiciate/, 'Sollevamento gambe'], ['addome', /side bend|flessione laterale/, 'Flessione laterale'],
    ['avambracci', /^/, 'Polsi e avambracci']];
  EX.forEach(e => { delete e.vars; delete e.varsLabel; const n = e.n.toLowerCase(); const f = F.find(([g, re]) => g === e.g && re.test(n)); if (f) { e.fam = f[2]; e.famRe = f[1]; } });
})();

/* ===== zone dell'addome allenate da ogni esercizio: alta (retto superiore), bassa (retto inferiore), obliqui, profonda (trasverso / stabilità) ===== */
(() => {
  const Z = {alta: ['a-crunch-cavo', 'a-crunch-cavo-piedi', 'a-crunch-terra', 'a-situp', 'a-situp-db', 'a-situp-panca', 'a-vup', 'a-bicicletta', 'a-toes-to-bar'],
    bassa: ['a-crunch-inverso', 'a-crunch-inverso-cavo', 'a-leg-raise', 'a-leg-raise-terra', 'a-sforbiciate', 'a-ginocchia-sbarra', 'a-gambe-sbarra', 'a-toes-to-bar', 'a-vup', 'a-hollow', 'a-ginocchia-obliquo-sbarra'],
    obliqui: ['a-woodchop', 'a-woodchop-basso', 'a-pallof-rotazione', 'a-rotazioni-cavo', 'a-russian-twist', 'a-crunch-cavo-obliquo', 'a-crunch-cavo-obliquo-piedi', 'a-crunch-cavo-obliquo-lato', 'a-ginocchia-obliquo-sbarra', 'a-side-bend-db', 'a-side-bend-cavo', 'a-side-bend-cavo-alto', 'a-side-plank', 'a-side-plank-hip', 'a-bicicletta', 'a-pallof', 'a-pallof-ginocchio'],
    profonda: ['a-plank', 'a-pallof', 'a-pallof-ginocchio', 'a-dead-bug', 'a-mountain', 'a-hollow', 'a-rollout', 'a-side-plank', 'a-side-plank-hip']};
  Object.entries(Z).forEach(([z, ids]) => ids.forEach(id => { const e = EX.find(x => x.id === id); if (e) (e.ab = e.ab || []).push(z); }));
  EX.filter(e => e.g === 'addome' && !e.ab).forEach(e => { e.ab = ['alta']; });
})();

/* ===== addome in isometria: tenute (plank e varianti, hollow, L-sit, Pallof hold, dead bug e bird dog in tenuta). e.isom = true → ripetizioni espresse in secondi e preferiti nelle proposte ===== */
(() => {
  const g = id => EX.find(e => e.id === id);
  ['a-plank', 'a-side-plank', 'a-hollow'].forEach(id => { const e = g(id); if (e) { e.isom = true; e.hold = id === 'a-side-plank' ? '20-45 s per lato' : '30-60 s'; } });
  const A = o => { if (g(o.id)) return; EX.push(Object.assign({g: 'addome', a: 'Corpo libero', tipo: 'core', fin: ['tonificare'], presa: 'neu', lin: true, isom: true, st: 'floor'}, o)); };
  const PL = {h: [150, 181], t: 92, th: -66, sh: -66}, PH = {h: [150, 168], t: 92, th: -58, sh: -58}, LIE = {h: [150, 197], t: 270}, HANG = {t: 180, h: [150, 150]};
  A({id: 'a-plank-mani', n: 'Plank sulle mani (tenuta)', hold: '30-60 s', m: 'Core completo (isometrico), spalle', mm: 'trasverso dell’addome, retto addominale, obliqui, dentato anteriore, glutei',
    fr: [[0, 0, {...PH, h: [150, 181], th: -66, sh: 30}], [0, 0, {...PH}]], cap: ['Dalle ginocchia: mani sotto le spalle', 'Gambe tese, corpo in linea: tieni 30-60 s spingendo il pavimento'],
    trj: 'Nessun movimento: braccia tese, mani sotto le spalle, corpo dritto come una tavola. Più facile del plank sui gomiti per l’addome, più impegnativo per le spalle.',
    set: 'Tappetino a terra. Posizione di flessione con braccia tese, mani sotto le spalle, piedi uniti o poco larghi.', pos: 'Testa, schiena e bacino in linea; scapole spinte lontano da terra.',
    ese: ['Mettiti in posizione di flessione con le braccia tese.', 'Stringi glutei e addome, spingi il pavimento con le mani.', 'Tieni 30-60 secondi respirando normalmente.'],
    cue: 'Allunga la testa in avanti e i talloni indietro: il corpo si tende.', why: 'Tenuta base del core che prepara a flessioni, mountain climber e a tutti i plank più difficili.', err: ['Fianchi che scendono', 'Sedere alto', 'Scapole che “cadono” tra le spalle']});
  A({id: 'a-plank-ginocchia', n: 'Plank sulle ginocchia (facile, tenuta)', hold: '30-60 s', m: 'Core (isometrico), versione facilitata', mm: 'trasverso dell’addome, retto addominale, obliqui',
    fr: [[0, 90, {...PL, h: [150, 192], th: -40, sh: 50}], [0, 90, {...PL, th: -66, sh: 30}]], cap: ['Gomiti sotto le spalle, bacino basso', 'Bacino in linea con spalle e ginocchia: tieni 30-60 s'],
    trj: 'Nessun movimento: come il plank sui gomiti, ma con le ginocchia appoggiate. La leva è più corta e la tenuta più facile: ideale per iniziare o per allungare i tempi.',
    set: 'Tappetino a terra. Avambracci a terra, gomiti sotto le spalle, ginocchia appoggiate, piedi sollevati o a terra.', pos: 'Linea retta dalle ginocchia alla testa; bacino in avanti (non inarcare).',
    ese: ['Appoggia avambracci e ginocchia.', 'Porta il bacino in linea con spalle e ginocchia, stringi l’addome.', 'Tieni 30-60 secondi; quando arrivi a 60 passa al plank completo.'],
    cue: 'Spingi il pube verso le costole: la schiena non si inarca.', why: 'Permette di imparare la posizione corretta senza che la schiena ceda.', err: ['Schiena inarcata', 'Sedere alto', 'Testa che pende']});
  A({id: 'a-boat', n: 'Tenuta a V (boat pose, V-sit)', hold: '20-40 s', m: 'Retto dell’addome, flessori anca (isometrico)', mm: 'retto addominale (alto e basso), ileopsoas, trasverso',
    fr: [[40, 40, {h: [112, 204], t: 172, th: 120, sh: 40}], [70, 75, {h: [112, 204], t: 150, th: 110, sh: 60}]], cap: ['Seduto, ginocchia piegate, piedi a terra', 'Busto indietro e piedi sollevati: tieni 20-40 s, schiena dritta'],
    trj: 'Nessun movimento: seduto in equilibrio sul bacino, busto inclinato indietro e gambe sollevate (ginocchia piegate per iniziare, tese per la versione difficile), braccia distese in avanti.',
    set: 'Tappetino a terra. Seduto, ginocchia piegate, piedi sollevati, braccia distese in avanti all’altezza delle ginocchia.', pos: 'Schiena dritta, petto aperto, busto a 45°.',
    ese: ['Siediti e inclina il busto indietro finché i piedi si staccano.', 'Trova l’equilibrio sul bacino, braccia avanti.', 'Tieni 20-40 secondi; per rendere più difficile distendi le gambe.'],
    cue: 'Petto in fuori: se la schiena si arrotonda lavora meno l’addome e di più la zona lombare.', why: 'Tenuta che accende tutto il retto dell’addome e i flessori, senza attrezzi.', err: ['Schiena curva', 'Spalle alle orecchie', 'Trattenere il respiro']});
  A({id: 'a-ginocchia-hold', n: 'Tenuta ginocchia al petto alla sbarra', hold: '15-30 s', m: 'Retto dell’addome (parte bassa), flessori anca, presa (isometrico)', mm: 'retto addominale (fasci inferiori), ileopsoas, obliqui, avambracci', st: 'hang', eq: 'hb', presa: 'pro',
    fr: [[180, 180, {...HANG, th: 8, sh: 8}], [180, 180, {...HANG, th: 115, sh: 25}]], cap: ['Appeso, gambe distese, spalle attive', 'Ginocchia all’altezza delle anche: tieni 15-30 s senza oscillare'],
    trj: 'Nessun movimento: appeso alla sbarra porti le ginocchia all’altezza delle anche (o più su) e resti lì. Lavora soprattutto la parte bassa dell’addome, più la presa.',
    set: 'Sbarra per trazioni, presa prona poco più larga delle spalle.', pos: 'Spalle attive (non lasciarti appendere), ginocchia almeno a 90°, bacino leggermente arrotolato.',
    ese: ['Appenditi e attiva le spalle.', 'Porta le ginocchia all’altezza delle anche arrotolando un po’ il bacino.', 'Tieni 15-30 secondi senza dondolare.'],
    cue: 'Pensa a portare il pube verso l’ombelico, non solo le ginocchia in alto.', why: 'Versione in tenuta del sollevamento ginocchia: parte bassa dell’addome e presa senza slanci.', err: ['Oscillare', 'Spalle rilassate', 'Ginocchia troppo basse']});
  A({id: 'a-l-sit', n: 'L-sit su parallele basse (tenuta)', eq: 'dip', dipY: 198, hold: '10-20 s', fr: [[0, 0, {h: [150, 198], t: 180, th: 100, sh: 40}], [0, 0, {h: [150, 198], t: 180, th: 90, sh: 90}]], m: 'Addome basso, flessori anca, tricipiti (isometrico)', mm: 'retto addominale, ileopsoas, quadricipiti, tricipiti, deltoidi', noanim: true, fin: ['tonificare'], cap: ['Mani sulle parallele basse (o a terra), gambe piegate', 'Tenuta: braccia tese, gambe tese orizzontali, spalle basse'],
    trj: 'Nessun movimento: sospeso sulle parallele a braccia tese, gambe distese in avanti parallele al pavimento. Esercizio difficile: inizia con le ginocchia piegate (tuck) o una gamba sola.',
    set: 'Parallele del rack. Mani sulle impugnature, braccia tese, spalle basse.', pos: 'Spalle spinte in basso, gambe tese e unite, punte dei piedi in avanti.',
    ese: ['Sollevati a braccia tese.', 'Porta le gambe in avanti fino all’orizzontale (o le ginocchia al petto per iniziare).', 'Tieni 10-20 secondi.'],
    cue: 'Spingi le mani nel pavimento e allontana le spalle dalle orecchie.', why: 'Una delle tenute più complete: addome, flessori, tricipiti e spalle. Progressione: tuck → una gamba → L completa.', err: ['Spalle alte', 'Gambe che scendono', 'Braccia piegate']});
  A({id: 'a-pallof-hold', n: 'Pallof hold (anti-rotazione in tenuta)', a: 'Cavi', eq: 'cable', st: 'stand', an: [185, 75], tzf: 92, gz: 6, az: 0.75, hold: '20-30 s per lato', fin: ['massa', 'tonificare'], m: 'Core (anti-rotazione), obliqui (isometrico)', mm: 'obliqui esterni e interni, trasverso dell’addome, retto addominale, glutei',
    fr: [[45, -30, {t: 180}], [88, 90, {t: 180}]], cap: ['Mani al petto, il cavo tira di lato', 'Braccia distese: tieni 20-30 s, busto e bacino non ruotano'],
    trj: 'Nessun movimento: braccia distese davanti allo sterno, il cavo che arriva di lato cerca di girarti verso la torre e tu resti fermo. È la versione in tenuta del Pallof press.',
    set: 'Cavo MEDIO (altezza del petto) con maniglia, di lato alla torre, un passo di distanza.', pos: 'Piedi alla larghezza delle spalle, ginocchia morbide, bacino neutro, braccia tese.',
    ese: ['Afferra la maniglia con due mani al petto e fai un passo lontano dalla torre.', 'Distendi le braccia davanti allo sterno.', 'Tieni 20-30 secondi senza ruotare, poi cambia lato.'],
    cue: 'Le spalle restano parallele alla torre, come se fossi tra due muri.', why: 'Anti-rotazione pura: protegge la schiena e insegna a tenere il tronco rigido negli esercizi pesanti.', err: ['Ruotare verso la torre', 'Piegare le braccia', 'Inclinarsi di lato']});
  A({id: 'a-dead-bug-hold', n: 'Dead bug in tenuta (braccia e gambe sollevate)', hold: '20-40 s', m: 'Trasverso, addome basso (isometrico)', mm: 'trasverso dell’addome, retto addominale, obliqui, flessori dell’anca', rl: 170,
    fr: [[120, 120, {...LIE, h: [150, 202], th: 125, sh: 40}], [180, 180, {...LIE, h: [150, 202], th: 170, sh: 90}]], cap: ['Supino, ginocchia piegate e piedi a terra', 'Braccia al soffitto e ginocchia sopra le anche: tieni 20-40 s, lombare a terra'],
    trj: 'Nessun movimento: supino con braccia verso il soffitto e ginocchia sopra le anche piegate a 90°. Il lavoro è tenere la zona lombare schiacciata a terra.',
    set: 'Tappetino a terra. Sdraiato, braccia verso il soffitto, anche e ginocchia a 90°.', pos: 'Zona lombare appoggiata (nessuno spazio tra schiena e tappetino), mento dentro.',
    ese: ['Solleva braccia e gambe nella posizione del tavolino.', 'Schiaccia la zona lombare a terra espirando.', 'Tieni 20-40 secondi; per progredire allontana un po’ le ginocchia.'],
    cue: 'Espira a fondo: le costole scendono e il trasverso si attiva.', why: 'La tenuta più sicura per chi ha la schiena delicata: impara a stabilizzare il bacino.', err: ['Schiena inarcata', 'Trattenere il respiro', 'Ginocchia verso il petto (troppo facile)']});
  A({id: 'a-bird-dog-hold', n: 'Bird dog in tenuta (quadrupedia)', hold: '20-30 s per lato', fr: [[0, 0, {h: [150, 160], t: 92, th: 24, sh: -66}], [0, 0, {h: [150, 160], t: 92, th: 24, sh: -66}]], m: 'Core, erettori spinali, glutei (isometrico)', mm: 'trasverso dell’addome, multifido, erettori spinali, grande gluteo, obliqui', noanim: true, cap: ['In quadrupedia, mani sotto le spalle e ginocchia sotto le anche', 'Tenuta: braccio e gamba opposti distesi in linea con la schiena'],
    trj: 'Nessun movimento: a quattro zampe allunghi un braccio in avanti e la gamba opposta indietro e resti fermo, schiena piatta. Poi cambi lato.',
    set: 'Tappetino a terra. In quadrupedia: mani sotto le spalle, ginocchia sotto le anche.', pos: 'Schiena neutra (puoi immaginare un bicchiere d’acqua sui lombi), sguardo a terra.',
    ese: ['Allunga il braccio destro in avanti e la gamba sinistra indietro.', 'Tieni il bacino fermo e parallelo al pavimento.', 'Tieni 20-30 secondi e cambia lato.'],
    cue: 'Allungati, non alzare: la mano e il piede vanno lontano, non in alto.', why: 'Stabilità della colonna e dei glutei: ottimo prima di stacchi e rematori e per chi lavora seduto.', err: ['Bacino che ruota', 'Schiena inarcata', 'Gamba alzata sopra la linea del corpo']});
  A({id: 'a-plank-inverso', n: 'Plank inverso (tenuta)', hold: '20-40 s', fr: [[30, 30, {h: [150, 176], t: 245, th: 75, sh: 75}], [30, 30, {h: [150, 176], t: 245, th: 75, sh: 75}]], m: 'Glutei, catena posteriore, core (isometrico)', mm: 'grande gluteo, erettori spinali, femorali, trasverso dell’addome, deltoidi posteriori', noanim: true, cap: ['Seduto con le mani a terra dietro al bacino, dita verso i piedi', 'Tenuta: bacino alto, corpo in linea dalle spalle ai talloni'],
    trj: 'Nessun movimento: seduto con le mani a terra dietro al bacino, sollevi i fianchi finché il corpo è una linea retta a pancia in su, appoggiato su mani e talloni.',
    set: 'Tappetino a terra. Seduto, gambe tese, mani a terra dietro al bacino con le dita verso i piedi.', pos: 'Braccia tese, corpo in linea da spalle a talloni, sguardo al soffitto.',
    ese: ['Spingi su mani e talloni e solleva il bacino.', 'Stringi i glutei finché il corpo è dritto.', 'Tieni 20-40 secondi.'],
    cue: 'Spingi il bacino verso il soffitto: se scende, fermati e ripeti.', why: 'Completa i plank classici lavorando la parte dietro: glutei, schiena e spalle posteriori.', err: ['Bacino che scende', 'Testa che cade indietro', 'Gomiti piegati']});
  // famiglia, zone addominali e flag isometria
  const pf = g('a-pallof'), ph = g('a-pallof-hold'); if (pf && ph && pf.fam) { ph.fam = pf.fam; ph.famRe = pf.famRe; }
  const fam = EX.find(e => e.id === 'a-plank');
  EX.filter(e => e.g === 'addome' && !e.fam && /plank|tenuta|hold|l-sit|bird dog|boat/i.test(e.n)).forEach(e => { if (fam) { e.fam = fam.fam; e.famRe = fam.famRe; } });
  const Z = {alta: ['a-boat', 'a-plank-mani'], bassa: ['a-boat', 'a-ginocchia-hold', 'a-l-sit', 'a-dead-bug-hold'], obliqui: ['a-pallof-hold', 'a-bird-dog-hold'], profonda: ['a-plank-mani', 'a-plank-ginocchia', 'a-pallof-hold', 'a-dead-bug-hold', 'a-bird-dog-hold', 'a-plank-inverso', 'a-l-sit']};
  Object.entries(Z).forEach(([z, ids]) => ids.forEach(id => { const e = g(id); if (e) { e.ab = e.ab || []; if (!e.ab.includes(z)) e.ab.push(z); } }));
})();

/* ===== revisione addome: ab rollout finisce con il corpo disteso dalle ginocchia (bacino sollevato), non sdraiato a terra ===== */
(() => { const e = EX.find(x => x.id === 'a-rollout'); if (e) { e.fr = [e.fr[0], [60, 60, {h: [132, 172], t: 100, th: -30, sh: 50}]]; e.cap = ['In ginocchio, bilanciere sotto le spalle', 'Corpo disteso dalle ginocchia alla testa, bilanciere avanti: il bacino non tocca terra']; } })();

/* ===== plank laterale vero (roll + pitch del motore) e ginocchia oblique con spostamento laterale delle gambe (lz) ===== */
(() => {
  const g = id => EX.find(e => e.id === id), A3 = {f: [[0, 0, -1], [0, 1, 0]], n: [[-1, 0.15, 0], [-1, 0, 0]]};   /* braccio sotto: gomito a terra, avambraccio in avanti; braccio sopra: lungo il fianco */
  let e = g('a-side-plank'); if (e) Object.assign(e, {noanim: false, arm3: A3, fr: [[0, 90, {h: [150, 191], t: 92, th: -66, sh: -66, roll: -90, pitch: 6}], [0, 90, {h: [150, 184], t: 92, th: -66, sh: -66, roll: -90, pitch: 22}]],
    cap: ['Sul fianco, gomito sotto la spalla, bacino a terra', 'Bacino sollevato: corpo in linea dalla testa ai piedi, tieni 20-45 s per lato'],
    trj: 'Sdraiato su un fianco, appoggiato sull’avambraccio e sul bordo del piede: sollevi il bacino finché testa, spalle, anche e piedi sono in linea e resti lì.'});
  e = g('a-side-plank-hip'); if (e) Object.assign(e, {noanim: false, arm3: A3, fr: [[0, 90, {h: [150, 193], t: 92, th: -66, sh: -66, roll: -90, pitch: 8}], [0, 90, {h: [150, 182], t: 92, th: -66, sh: -66, roll: -90, pitch: 25}]],
    cap: ['Plank laterale con il bacino abbassato quasi a terra', 'Bacino alto, sopra la linea del corpo'],
    trj: 'Dalla posizione di plank laterale, il bacino scende verso terra fino quasi a toccarla e risale sopra la linea del corpo: è il side bend in isometria dinamica.'});
  e = g('a-ginocchia-obliquo-sbarra'); if (e) { e.fr = [e.fr[0], [180, 180, {t: 180, h: [150, 150], th: 115, sh: 25, tw: -35, lz: 22}]]; e.cap = ['Appeso, gambe distese', 'Ginocchia su e di lato (verso una spalla), bacino ruotato']; }
})();

/* ===== esercizi aggiunti dalla libreria video (manubri, Smith, panca, sbarra/parallele, corpo libero) ===== */
(() => {
  const g = id => EX.find(e => e.id === id);
  const N = (base, o) => { if (g(o.id)) return; const b = g(base); if (!b) return; const e = Object.assign(JSON.parse(JSON.stringify(b)), o); e.famRe = o.famRe || b.famRe; delete e.vars; delete e.varsLabel; if (!o.fin) e.fin = e.tipo === 'comp' ? ['forza', 'massa', 'tonificare'] : e.tipo === 'core' ? ['tonificare'] : ['massa', 'tonificare']; EX.push(e); return e; };
  const DB = 'Manubri', SM = 'Smith machine', CL = 'Corpo libero', LIE = {h: [150, 197], t: 270}, PH = {h: [150, 168], t: 92, th: -58, sh: -58};
  const ERR_SCH = 'Schiena che si inarca o si curva';
  /* ---------- manubri ---------- */
  N('p-incl-db', {id: 'p-panca-db', n: 'Panca piana con manubri', st: 'lie', inc: undefined, fr: [[178, 180], [55, 180]], cap: ['Manubri sopra il petto, braccia distese', 'Manubri ai lati del petto, gomiti sotto il livello della panca'],
    set: 'Panca piana. Siediti con i manubri sulle cosce, sdraiati portandoli al petto con le ginocchia, piedi a terra.', ese: ['Spingi i manubri sopra il petto fino a distendere le braccia (non sbatterli).', 'Scendi controllando fino a sentire allungare il petto, gomiti a 45° dal busto.', 'Risali spingendo come per unire i manubri.'],
    why: 'Come la panca piana, ma ogni braccio lavora da solo e l’escursione è più ampia: ottimo con i manubri del rack.', trj: 'I manubri scendono ai lati del petto e risalgono convergendo leggermente sopra lo sterno: una leggera V, non due linee verticali.'});
  N('p-croci-panca', {id: 'p-croci-db', n: 'Croci con manubri su panca piana', a: DB, eq: 'db', an: undefined, tzf: undefined, tipo: 'iso', m: 'Pettorali (allungamento), deltoidi anteriori', mm: 'gran pettorale, deltoide anteriore, bicipite (stabilizzatore)',
    cap: ['Manubri sopra il petto, braccia quasi tese', 'Braccia aperte ad arco, petto allungato'], set: 'Panca piana, due manubri leggeri. Sdraiato, manubri sopra il petto con i palmi uno verso l’altro.', pos: 'Gomiti leggermente piegati e fissi, scapole addotte, piedi a terra.',
    ese: ['Apri le braccia ad arco finché i manubri arrivano all’altezza del petto.', 'Fermati quando senti allungare il petto, senza scendere oltre la spalla.', 'Richiudi ad arco come per abbracciare un tronco.'], cue: 'Abbraccia, non spingere: i gomiti restano piegati uguali per tutta la serie.', why: 'Isola il petto con grande escursione; ideale dopo le spinte.', err: ['Braccia tese (stress sul gomito)', 'Scendere troppo', 'Peso eccessivo'], trj: 'Due archi simmetrici: le mani partono sopra lo sterno e si aprono fino all’altezza del petto, con i gomiti sempre un po’ piegati.'});
  N('sm-panca', {id: 'p-floor-press-db', n: 'Floor press con manubri (a terra)', a: DB, eq: 'db', sm: false, nb: false, st: 'floor', lin: false, fr: [[175, 178, {...LIE, th: 125, sh: 40}], [100, 175, {...LIE, th: 125, sh: 40}]], cap: ['Sdraiato a terra, manubri sopra il petto', 'Gomiti che toccano il pavimento, avambracci verticali'],
    set: 'Tappetino a terra, ginocchia piegate e piedi a terra, due manubri. Portali sopra il petto a braccia distese.', pos: 'Zona lombare appoggiata, scapole addotte, gomiti a 45° dal busto.', ese: ['Scendi finché i gomiti (non i manubri) toccano terra.', 'Fermati un attimo senza rimbalzare.', 'Spingi fino a distendere le braccia.'],
    cue: 'Il pavimento ferma i gomiti: è una panca a escursione ridotta, ottima per spalle delicate.', why: 'Panca senza panca: petto e tricipiti con meno stress alla spalla, utile anche in casa.', err: ['Rimbalzare i gomiti a terra', 'Gomiti troppo aperti', 'Inarcare la schiena'], trj: 'I manubri salgono e scendono quasi in verticale sopra il petto; la discesa si ferma quando i gomiti toccano il pavimento.'});
  N('b-row-bar', {id: 'b-row-db2', n: 'Rematore con due manubri a busto inclinato', a: DB, eq: 'db', presa: 'neu', vbar: undefined, lin: true, cap: ['Busto inclinato, manubri appesi a braccia distese', 'Manubri ai fianchi, gomiti indietro e vicini al corpo'],
    set: 'Due manubri, piedi alla larghezza del bacino. Inclina il busto a circa 45°-60° con le ginocchia morbide, manubri appesi.', pos: 'Schiena neutra, sguardo a terra poco davanti, spalle lontane dalle orecchie.', ese: ['Tira i manubri verso i fianchi portando i gomiti indietro.', 'Stringi le scapole in alto per un secondo.', 'Scendi lentamente a braccia distese.'],
    cue: 'Gomiti verso i fianchi (dorsali) o un po’ più larghi (parte alta della schiena): scegli tu il focus.', why: 'Il rematore più completo con i manubri: dorsali, romboidi e bicipiti insieme, con la presa neutra più comoda per polsi e gomiti.', err: [ERR_SCH, 'Busto che si alza a ogni ripetizione', 'Slancio con le gambe'], trj: 'I manubri salgono dritti verso i fianchi, non verso il petto; il busto resta fermo all’angolo scelto.'});
  N('b-row-db2', {id: 'b-row-db-panca', n: 'Rematore con manubri su panca inclinata (petto appoggiato)', nb: true, cap: ['Petto sulla panca inclinata, manubri appesi', 'Manubri ai fianchi, scapole strette (il 3D mostra la versione in piedi)'],
    set: 'Panca inclinata a 30-45°, siediti al contrario con il petto appoggiato allo schienale, piedi a terra, manubri appesi sotto le spalle.', pos: 'Petto e pancia sullo schienale, collo neutro.', ese: ['Tira i manubri verso i fianchi senza staccare il petto.', 'Stringi le scapole per un secondo.', 'Scendi lentamente fino a distendere le braccia.'],
    cue: 'La panca ti toglie la schiena dall’equazione: pensa solo ai gomiti che vanno indietro.', why: 'Zero carico sulla zona lombare: perfetto se hai la schiena stanca o vuoi isolare la parte alta.', err: ['Staccare il petto dalla panca', 'Movimento corto', 'Scrollare le spalle']});
  N('g-rdl', {id: 'g-rdl-db', n: 'Stacco rumeno con manubri', a: DB, eq: 'db', presa: 'neu', vbar: undefined, cap: ['In piedi, manubri davanti alle cosce', 'Busto inclinato, manubri sotto le ginocchia lungo le gambe'],
    set: 'Due manubri davanti alle cosce, piedi alla larghezza del bacino, ginocchia leggermente flesse.', ese: ['Spingi il bacino indietro e scendi con il busto tenendo i manubri a contatto con le gambe.', 'Fermati quando senti tirare i femorali (manubri sotto le ginocchia).', 'Risali spingendo il bacino in avanti e stringendo i glutei.'],
    cue: 'Chiudi una porta con il sedere: le anche vanno indietro, non le ginocchia in avanti.', why: 'Femorali e glutei senza bilanciere: i manubri scorrono vicino alle gambe e la schiena resta neutra.', err: [ERR_SCH, 'Ginocchia che si piegano troppo (diventa uno squat)', 'Manubri lontani dalle gambe'], trj: 'I manubri scendono in linea quasi verticale rasente le gambe, mentre il bacino arretra.'});
  N('g-rdl-db', {id: 'g-stacco-db', n: 'Stacco da terra con manubri', fr: [[0, 0, {t: 178}], [0, 0, {t: 140, h: [118, 150], th: 70, sh: -20}]], cap: ['In piedi, manubri ai lati', 'Accosciata con ginocchia piegate, manubri a terra a lato dei piedi'], m: 'Glutei, quadricipiti, femorali, schiena',
    mm: 'grande gluteo, quadricipiti, femorali, erettori spinali, trapezio, avambracci (presa)', set: 'Due manubri a terra ai lati dei piedi, piedi alla larghezza del bacino.', pos: 'Petto alto, schiena neutra, peso sui talloni, sguardo avanti-basso.',
    ese: ['Piega gambe e anche insieme e afferra i manubri.', 'Spingi il pavimento con i piedi e alzati distendendo gambe e busto nello stesso tempo.', 'Scendi controllando fino a toccare terra (o quasi).'], cue: 'Non è un rematore: salgono prima le anche e le ginocchia insieme, poi il busto si raddrizza.', why: 'Lo stacco completo: tutta la catena posteriore più le gambe, con i manubri è più facile da imparare che con il bilanciere.', err: [ERR_SCH, 'Alzarsi prima con il sedere', 'Manubri lontani dal corpo'], trj: 'Movimento quasi verticale dei manubri, dalle caviglie alle cosce, con busto e gambe che si distendono insieme.'});
  N('b-scrollate', {id: 'b-shrug-db', n: 'Scrollate con manubri', a: DB, eq: 'db', presa: 'neu', vbar: undefined, set: 'Due manubri ai fianchi, piedi alla larghezza del bacino, braccia tese e rilassate.', ese: ['Alza le spalle verso le orecchie il più possibile.', 'Tieni un secondo in alto.', 'Scendi lentamente lasciando allungare il trapezio.'], cue: 'Solo su e giù: niente rotazioni delle spalle e niente gomiti piegati.', why: 'Trapezio superiore in isolamento; con i manubri le braccia restano lungo i fianchi, più naturale del bilanciere.', err: ['Ruotare le spalle', 'Piegare i gomiti', 'Mento in avanti']});
  N('t-over-db', {id: 't-skull-db', n: 'French press (skull crusher) con manubri su panca', st: 'lie', nb: true, fr: [[175, 178], [168, 251]], /* avambraccio verso la fronte (indietro), non verso i piedi */ cap: ['Sdraiato, manubri sopra la fronte a braccia distese', 'Gomiti piegati, manubri ai lati della testa'], m: 'Tricipiti (capo lungo e laterale)', mm: 'tricipite brachiale (tutti i capi), anconeo',
    set: 'Panca piana, due manubri leggeri. Sdraiato, braccia distese sopra la fronte (non sopra il petto), palmi uno verso l’altro.', pos: 'Gomiti fermi, puntati al soffitto e alla larghezza delle spalle; piedi a terra.', ese: ['Piega solo i gomiti portando i manubri ai lati della testa.', 'Fermati quando l’avambraccio è oltre la verticale.', 'Distendi senza bloccare il gomito, tornando sopra la fronte.'],
    cue: 'Si muove solo l’avambraccio: se i gomiti si aprono o si spostano stai usando il petto.', why: 'L’esercizio che allunga di più il capo lungo del tricipite; con i manubri ogni braccio lavora da solo.', err: ['Gomiti che si aprono', 'Manubri sopra il petto invece che sopra la fronte', 'Carico troppo alto'], trj: 'I manubri descrivono un arco dalla fronte verso le orecchie e ritorno; i gomiti restano fermi come cardini.'});
  N('t-kickback', {id: 't-kickback-db', n: 'Kickback con manubrio', a: DB, eq: 'db', an: undefined, tzf: undefined, nb: true, cap: ['Busto inclinato, gomito alto lungo il fianco, manubrio in basso', 'Braccio disteso indietro, manubrio in linea con il busto'],
    set: 'Un manubrio leggero, mano e ginocchio opposti su una panca (o busto inclinato in piedi). Gomito alto, aderente al fianco, avambraccio verticale.', pos: 'Schiena piatta, gomito sopra la linea del busto e fermo.', ese: ['Distendi il braccio indietro fino a portare il manubrio in linea con il busto.', 'Stringi il tricipite un secondo.', 'Torna lentamente con l’avambraccio verticale senza abbassare il gomito.'],
    cue: 'Il gomito è un cardine inchiodato al fianco: se scende, il tricipite smette di lavorare.', why: 'Contrazione massima del tricipite in accorciamento: ottimo finale dopo le spinte.', err: ['Gomito che scende', 'Slancio', 'Peso eccessivo'], trj: 'Solo l’avambraccio ruota attorno al gomito, da verticale a orizzontale: il manubrio disegna un quarto di cerchio.'});
  N('w-wrist-curl', {id: 'w-wrist-db', n: 'Wrist curl con manubri (avambracci)', a: DB, eq: 'db', an: undefined, tzf: undefined, nb: true, cap: ['Avambracci sulle cosce, polsi oltre le ginocchia, manubri in basso', 'Polsi flessi, manubri verso l’alto'],
    set: 'Seduto sulla panca, due manubri leggeri, avambracci appoggiati sulle cosce con i polsi oltre le ginocchia, palmi in su.', pos: 'Avambracci fermi sulle cosce, movimento solo del polso.', ese: ['Lascia scendere i manubri aprendo le dita a fine corsa.', 'Richiudi le dita e fletti i polsi verso l’alto.', 'Scendi lentamente.'],
    cue: 'Corsa completa: anche l’apertura delle dita in basso conta.', why: 'Presa e avambracci: aiuta stacchi, rematori e trazioni. Fai anche la versione a palmi in giù per gli estensori.', err: ['Muovere i gomiti', 'Peso eccessivo', 'Corsa corta']});
  N('g-split', {id: 'g-stepup-db', n: 'Step-up sulla panca con manubri', nb: true, rl: [150, 222], fr: [[0, 0, {t: 178, h: [150, 118], th: 92, sh: -92}], [0, 0, {t: 178, h: [150, 118], th: 2, sh: 0}]], cap: ['Ginocchio alto: il piede va sulla panca (nel 3D la panca non è disegnata)', 'Gamba distesa: spingi sul piede sulla panca e sali'],
    m: 'Quadricipiti, glutei', mm: 'quadricipiti, grande gluteo, medio gluteo (stabilità), femorali', set: 'Panca piana (altezza al ginocchio o poco sotto), due manubri ai lati. Un piede intero sulla panca.', pos: 'Busto leggermente inclinato in avanti, ginocchio della gamba sulla panca in linea con il piede.',
    ese: ['Spingi con il piede sulla panca e sali fino a distendere la gamba.', 'Porta l’altro piede sulla panca o tienilo sollevato.', 'Scendi lentamente con la stessa gamba, controllando (non lasciarti cadere).'], cue: 'Sali con la gamba sulla panca, non con la spinta di quella a terra.', why: 'Lavoro unilaterale per glutei e quadricipiti con poco carico, molto sicuro per la schiena.', err: ['Spingere con la gamba a terra', 'Ginocchio che cede verso l’interno', 'Scendere senza controllo'], trj: 'Movimento verticale: il bacino sale sopra il piede appoggiato sulla panca e torna giù lentamente.'});
  N('g-hip-thrust', {id: 'g-hipthrust-db', n: 'Hip thrust con manubrio', a: DB, eq: 'db', gz: 4, fr: [[56, 56, {h: [180, 200], t: 236, th: 122, sh: 5}], [92, 92, {h: [183, 170], t: 272, th: 98, sh: 3}]], cap: ['Schiena sulla panca, manubrio sul bacino', 'Bacino in alto, corpo in linea dalle spalle alle ginocchia'],
    set: 'Schiena (sotto le scapole) sul bordo della panca piana, piedi a terra, un manubrio tenuto con due mani sul bacino (un asciugamano sotto per comodità).', ese: ['Spingi sui talloni e solleva il bacino fino ad allineare spalle, anche e ginocchia.', 'Stringi i glutei in alto per un secondo, mento verso il petto.', 'Scendi controllando senza appoggiare del tutto.'],
    cue: 'Costole giù e mento dentro: se inarchi la schiena stai barando con i lombari.', why: 'Il miglior esercizio per i glutei; con il manubrio si fa anche senza Smith.', err: ['Inarcare la schiena', 'Spingere con le punte dei piedi', 'Ginocchia che si aprono']});
  N('p-croci-db', {id: 'p-pullover-db', n: 'Pullover con manubrio su panca', fr: [[175, 178], [255, 250]], tipo: 'semi', m: 'Pettorali, gran dorsale, dentato anteriore', mm: 'gran pettorale, gran dorsale, dentato anteriore, tricipite (capo lungo)', g2: ['schiena'],
    cap: ['Sdraiato, manubrio sopra il petto con due mani', 'Manubrio dietro la testa a braccia quasi tese, gabbia toracica aperta'], set: 'Panca piana, un manubrio tenuto con due mani sotto il disco superiore. Sdraiato, braccia quasi tese sopra il petto.', pos: 'Gomiti leggermente piegati e fissi, piedi a terra, lombare neutra.',
    ese: ['Porta il manubrio dietro la testa ad arco finché senti allungare petto e dorsali.', 'Non scendere oltre il livello della testa.', 'Riporta sopra il petto contraendo petto e dorsali.'], cue: 'Costole chiuse: l’allungamento è nelle spalle, non nella schiena che si inarca.', why: 'Petto e dorsali insieme con grande allungamento: completa panca e trazioni.', err: ['Inarcare la lombare', 'Piegare i gomiti durante il movimento', 'Scendere troppo'], trj: 'Un arco che va da sopra il petto a dietro la testa e ritorno, con le braccia quasi tese.'});
  N('g-split', {id: 'g-affondi-db', n: 'Affondi in camminata con manubri', cap: ['Passo avanti con il manubrio ai lati', 'Ginocchio dietro quasi a terra, poi passo successivo'],
    set: 'Due manubri ai lati, spazio per 6-10 passi.', ese: ['Fai un passo lungo in avanti e scendi finché il ginocchio dietro sfiora terra.', 'Spingi sul tallone davanti e porta il piede dietro avanti nel passo successivo.', 'Continua alternando le gambe.'], cue: 'Passo lungo e busto dritto: il ginocchio davanti non supera di molto la punta del piede.', why: 'Come lo split squat ma dinamico: equilibrio, glutei e quadricipiti con più lavoro cardio.', err: ['Passo corto', 'Busto che si piega in avanti', 'Ginocchio che cede all’interno']});
  N('s-press-db', {id: 's-arnold-db', n: 'Arnold press con manubri', fr: [[15, 175, {t: 185, tw: 0}], [178, 180, {t: 185}]], cap: ['Manubri davanti al viso, palmi verso di te', 'Braccia distese sopra la testa, palmi in avanti (la rotazione è nel polso)'], m: 'Deltoidi (anteriore e laterale), tricipiti', mm: 'deltoide anteriore e laterale, tricipite, trapezio superiore',
    set: 'Seduto sulla panca con schienale, due manubri davanti al viso con i palmi verso di te, gomiti davanti.', ese: ['Apri i gomiti verso l’esterno ruotando i polsi.', 'Spingi sopra la testa finendo con i palmi in avanti.', 'Torna ruotando al contrario fino ai palmi verso il viso.'], cue: 'La rotazione avviene mentre sali, non prima: è un unico movimento a spirale.', why: 'Shoulder press con rotazione: coinvolge di più il deltoide anteriore e la cuffia.', err: ['Inarcare la schiena', 'Ruotare prima di salire', 'Gomiti troppo bassi'], trj: 'I manubri salgono a spirale: dal viso verso l’esterno e poi in alto, con il palmo che ruota da dentro a fuori.'});
  N('g-calf', {id: 'g-calf-db', n: 'Calf raise con manubri (anche a una gamba)', a: DB, eq: 'db', vbar: undefined, presa: 'neu', fr: [[0, 0, {}], [0, 0, {lift: 11, ft: -45}]], set: 'Due manubri ai lati (o uno e una mano al rack per l’equilibrio), avampiedi sul bordo di un disco o gradino.', ese: ['Sali sulle punte il più in alto possibile.', 'Tieni un secondo in alto.', 'Scendi lentamente sotto il livello del gradino.'], cue: 'Pausa in alto e allungamento in basso: le ripetizioni rimbalzate non valgono.', why: 'Polpacci con i manubri; a una gamba raddoppi il carico senza altri attrezzi.', err: ['Rimbalzare', 'Ginocchia piegate', 'Corsa corta']});
  N('s-upright', {id: 's-upright-db', n: 'Upright row (tirata al mento) con manubri', a: DB, eq: 'db', an: undefined, tzf: undefined, bar: undefined, hz: undefined, v: undefined, gz: 10, set: 'Due manubri davanti alle cosce, palmi verso di te, piedi alla larghezza del bacino.', ese: ['Tira i manubri verso l’alto lungo il corpo guidando con i gomiti.', 'Fermati con i gomiti all’altezza delle spalle (non più su).', 'Scendi lentamente.'], cue: 'Gomiti in fuori e in alto, mani sotto i gomiti: non superare l’altezza delle spalle per proteggere la cuffia.', why: 'Deltoidi laterali e trapezio in un solo movimento, con i manubri più libero per i polsi.', err: ['Gomiti sopra le spalle', 'Slancio con le gambe', 'Presa troppo stretta']});
  /* ---------- Smith machine ---------- */
  N('sm-squat', {id: 'sm-split', n: 'Affondo (split squat) alla Smith machine', rl: [96, 220], ko: 0, fr: [[-70, 118, {t: 182, h: [135, 122], th: 10, sh: -5}], [-70, 118, {t: 176, h: [135, 164], th: 80, sh: -12}]], cap: ['Barra sul trapezio, piedi a passo (quello davanti un po’ avanti alla barra)', 'Ginocchio davanti a 90°, quello dietro quasi a terra'],
    m: 'Quadricipiti, glutei', mm: 'quadricipiti, grande gluteo, femorali, adduttori', set: 'Barra alla Smith all’altezza del trapezio, sicure poco sopra il ginocchio dietro. Un piede avanti e uno dietro, come in un affondo lungo.', pos: 'Busto dritto, peso sul tallone davanti, ginocchio davanti in linea con il piede.',
    ese: ['Sgancia la barra e scendi in verticale piegando entrambe le ginocchia.', 'Il ginocchio dietro sfiora il pavimento.', 'Spingi sul piede davanti e risali; fai tutte le ripetizioni, poi cambia gamba.'], cue: 'La barra ti tiene in equilibrio: concentrati solo su spingere il tallone davanti.', why: 'Affondo senza problemi di equilibrio: puoi caricare di più e isolare meglio glutei e quadricipiti.', err: ['Piede davanti troppo indietro (ginocchio oltre la punta)', 'Busto che si piega', 'Spingere con la gamba dietro']});
  N('g-bulgaro', {id: 'sm-bulgaro', n: 'Affondo bulgaro alla Smith machine', a: SM, eq: 'bar', sm: true, presa: 'pro', fr: [[-70, 118, {t: 182, h: [140, 120], th: 15, sh: -5}], [-70, 118, {t: 176, h: [140, 160], th: 80, sh: -15}]], cap: ['Barra sul trapezio, piede dietro sulla panca', 'Ginocchio davanti a 90°'],
    set: 'Barra alla Smith sul trapezio, panca piana dietro di te con il collo del piede appoggiato. Piede davanti un po’ avanti alla barra.', ese: ['Sgancia e scendi piegando il ginocchio davanti.', 'Scendi finché la coscia è parallela o il ginocchio dietro sfiora terra.', 'Spingi sul tallone davanti e risali.'], cue: 'La barra guidata ti libera dall’equilibrio: metti tutto il peso sulla gamba davanti.', why: 'Versione più stabile e caricabile dell’affondo bulgaro.', err: ['Piede davanti troppo vicino alla panca', 'Busto in avanti', 'Rimbalzare in basso']});
  N('s-upright', {id: 'sm-upright', n: 'Upright row alla Smith machine', a: SM, eq: 'bar', sm: true, an: undefined, tzf: undefined, bar: undefined, hz: undefined, v: undefined, presa: 'pro', vbar: true, set: 'Barra alla Smith bassa (all’altezza delle cosce), presa prona poco più stretta delle spalle.', ese: ['Tira la barra verso l’alto lungo il corpo guidando con i gomiti.', 'Fermati con i gomiti all’altezza delle spalle.', 'Scendi lentamente.'], cue: 'La barra guidata rende il movimento perfettamente verticale: gomiti in fuori, polsi rilassati.', why: 'Deltoidi laterali e trapezio con un carico stabile.', err: ['Gomiti sopra le spalle', 'Presa troppo stretta', 'Slancio']});
  N('g-rdl', {id: 'sm-good-morning', n: 'Good morning alla Smith machine', a: SM, eq: 'bar', sm: true, vbar: undefined, fr: [[-70, 118, {t: 178}], [-70, 118, {t: 122, h: [128, 122], th: 14, sh: -4}]], ko: 6, cap: ['Barra sul trapezio, in piedi', 'Busto inclinato in avanti quasi orizzontale, bacino indietro'], m: 'Femorali, glutei, erettori spinali', mm: 'femorali, grande gluteo, erettori spinali',
    set: 'Barra alla Smith sul trapezio (come nello squat), sicure all’altezza giusta, piedi alla larghezza del bacino.', pos: 'Ginocchia leggermente flesse e fisse, schiena neutra, petto alto.', ese: ['Spingi il bacino indietro e inclina il busto in avanti.', 'Scendi finché senti tirare i femorali (busto quasi parallelo).', 'Risali spingendo il bacino in avanti.'], cue: 'È uno stacco rumeno con la barra sulle spalle: carico leggero, movimento lento.', why: 'Catena posteriore e schiena bassa con un carico che la Smith rende sicuro.', err: [ERR_SCH, 'Carico eccessivo', 'Ginocchia che si piegano troppo']});
  N('b-trazioni', {id: 'sm-row-inverso', n: 'Rematore inverso (australian pull-up) sotto la barra', a: SM, eq: 'bar', sm: true, st: 'floor', presa: 'pro', fr: [[150, 150, {h: [150, 180], t: 245, th: 75, sh: 75}], [70, 160, {h: [150, 160], t: 248, th: 78, sh: 78}]], cap: ['Appeso sotto la barra a braccia tese, corpo dritto, talloni a terra', 'Petto alla barra, gomiti indietro, corpo sempre in linea'],
    m: 'Gran dorsale, romboidi, bicipiti, core', mm: 'gran dorsale, romboidi, trapezio medio, deltoide posteriore, bicipite, core', set: 'Barra alla Smith (o nel rack) all’altezza della vita. Sdraiati sotto, afferra la barra a presa prona poco più larga delle spalle, corpo dritto con i talloni a terra.', pos: 'Corpo rigido come una tavola, glutei stretti, scapole attive.',
    ese: ['Tira il petto verso la barra portando i gomiti indietro.', 'Tocca la barra con lo sterno e stringi le scapole.', 'Scendi lentamente a braccia tese senza far cadere il bacino.'], cue: 'Più la barra è bassa, più è difficile; piedi su una panca per renderlo ancora più duro.', why: 'La trazione orizzontale a corpo libero: prepara alle trazioni e lavora tutta la schiena senza carico sulla lombare.', err: ['Bacino che cade', 'Collo in avanti', 'Movimento corto'], trj: 'Il corpo resta una linea retta che ruota sui talloni: il petto sale alla barra e scende.'});
  /* ---------- corpo libero: flessioni ---------- */
  const PU = {g: 'petto', g2: ['tricipiti', 'spalle'], a: CL, eq: undefined, sm: false, nb: false, st: 'floor', tipo: 'comp', presa: 'pro', m: 'Pettorali, tricipiti, deltoidi anteriori, core', mm: 'gran pettorale, tricipite, deltoide anteriore, dentato anteriore, core', lin: false, arm3: undefined, isom: false, hold: undefined, ab: undefined, fam: 'Flessioni', famRe: /flession/i};
  N('a-plank-mani', Object.assign({}, PU, {id: 'cl-pushup', n: 'Flessioni (push-up)', fr: [[0, 0, {...PH}], [-60, 5, {...PH, h: [150, 184]}]], cap: ['Plank sulle mani, mani poco più larghe delle spalle', 'Petto a pochi centimetri da terra, gomiti a 45° dal busto'],
    set: 'Tappetino a terra. Mani poco più larghe delle spalle sotto il petto, piedi uniti o poco larghi, corpo in linea.', pos: 'Testa, bacino e talloni in linea; addome e glutei contratti.', ese: ['Scendi piegando i gomiti a 45° dal busto finché il petto sfiora terra.', 'Fermati un attimo senza appoggiarti.', 'Spingi il pavimento fino a distendere le braccia.'], cue: 'Avvita le mani nel pavimento (gomiti verso i fianchi): spalle protette e più forza.', why: 'L’esercizio di spinta base: petto, tricipiti e spalle senza attrezzi, ovunque.', err: ['Bacino che cade o sedere alto', 'Gomiti troppo aperti', 'Movimento corto'], trj: 'Il corpo scende e sale in blocco, come una tavola: il petto arriva tra le mani, non la fronte.'}));
  N('cl-pushup', {id: 'cl-pushup-ginocchia', n: 'Flessioni sulle ginocchia', fr: [[0, 0, {h: [150, 181], t: 92, th: -66, sh: 30}], [-60, 5, {h: [150, 192], t: 92, th: -66, sh: 30}]], cap: ['Mani sotto le spalle, ginocchia a terra', 'Petto verso terra, corpo in linea dalle ginocchia'], set: 'Tappetino a terra. Ginocchia appoggiate, piedi sollevati o a terra, mani poco più larghe delle spalle.', why: 'Versione facilitata delle flessioni (circa metà del carico): perfetta per imparare il movimento.', cue: 'Bacino in avanti in linea con spalle e ginocchia: non piegarti all’anca.'});
  N('cl-pushup', {id: 'cl-pushup-diamante', n: 'Flessioni diamante (mani unite)', g: 'tricipiti', g2: ['petto'], gz: 6, m: 'Tricipiti, pettorali (fasci interni)', mm: 'tricipite, gran pettorale, deltoide anteriore', cap: ['Mani unite sotto il petto a formare un diamante', 'Petto sulle mani, gomiti vicini al corpo'], set: 'Tappetino a terra. Mani unite sotto lo sterno con pollici e indici a formare un diamante.', why: 'La flessione più dura per i tricipiti: gomiti stretti e presa stretta.', cue: 'Gomiti che sfiorano le costole: se si aprono, torna alle flessioni normali.', err: ['Gomiti aperti', 'Polsi doloranti (ruota un po’ le mani)', 'Bacino che cade']});
  N('cl-pushup', {id: 'cl-pushup-incl', n: 'Flessioni inclinate (mani sulla panca)', nb: true, fr: [[0, 0, {h: [150, 150], t: 112, th: -40, sh: -40}], [-60, 5, {h: [150, 160], t: 112, th: -40, sh: -40}]], cap: ['Mani sul bordo della panca, corpo in linea inclinato', 'Petto alla panca'], set: 'Mani sul bordo della panca piana (o sulla barra della Smith), piedi a terra, corpo in linea.', why: 'Più alto è l’appoggio, più è facile: il passo prima delle flessioni a terra.', cue: 'Stesso corpo rigido delle flessioni a terra, solo inclinato.'});
  N('cl-pushup', {id: 'cl-pushup-decl', n: 'Flessioni declinate (piedi sulla panca)', nb: true, fr: [[0, 0, {h: [150, 150], t: 80, th: -78, sh: -78}], [-60, 5, {h: [150, 166], t: 80, th: -78, sh: -78}]], cap: ['Piedi sulla panca, mani a terra', 'Petto verso terra, corpo in linea in discesa'], m: 'Pettorali (parte alta), deltoidi anteriori, tricipiti', why: 'Più carico sul petto alto e sulle spalle: la versione difficile delle flessioni.', cue: 'Non lasciar cadere la testa: guarda un punto a terra davanti alle mani.', err: ['Sedere alto', 'Gomiti aperti', 'Scendere con la fronte invece che con il petto']});
  N('cl-pushup', {id: 'cl-pike', n: 'Pike push-up (flessioni a V per le spalle)', g: 'spalle', g2: ['tricipiti'], fr: [[0, 0, {h: [150, 120], t: 50, th: -100, sh: -100}], [-50, 10, {h: [150, 128], t: 50, th: -100, sh: -100}]], cap: ['Corpo a V rovesciata, bacino alto, mani a terra', 'Testa che sfiora terra tra le mani, gomiti indietro'], m: 'Deltoidi, tricipiti, trapezio', mm: 'deltoide anteriore e laterale, tricipite, trapezio superiore, dentato anteriore',
    set: 'Tappetino a terra. Mani poco più larghe delle spalle, bacino alto, gambe quasi tese: il corpo forma una V rovesciata.', pos: 'Sguardo ai piedi, bacino il più alto possibile, peso sulle mani.', ese: ['Piega i gomiti e porta la testa verso terra tra le mani.', 'Sfiora il pavimento con la fronte.', 'Spingi fino a distendere le braccia tenendo il bacino alto.'], cue: 'È una spinta sopra la testa a rovescio: più alto il bacino, più lavorano le spalle.', why: 'Shoulder press senza pesi: spalle e tricipiti a corpo libero; piedi sulla panca per renderlo più duro.', err: ['Bacino basso (diventa una flessione)', 'Gomiti aperti', 'Testa che non scende'], trj: 'La testa scende verticalmente tra le mani e risale; il bacino resta alto e fermo.'});
  /* ---------- corpo libero: gambe ---------- */
  N('g-squat', {id: 'cl-squat', n: 'Squat a corpo libero', a: CL, eq: undefined, vbar: undefined, presa: 'neu', fr: [[88, 90, {t: 178}], [88, 90, {t: 150, h: [112, 163], th: 80, sh: -15}]], cap: ['In piedi, braccia avanti', 'Cosce parallele o sotto, braccia avanti per equilibrio'], set: 'Piedi alla larghezza delle spalle, punte un po’ aperte, braccia avanti.', ese: ['Spingi le anche indietro e piega le ginocchia come per sederti.', 'Scendi almeno a cosce parallele, talloni a terra.', 'Risali spingendo il pavimento.'], cue: 'Ginocchia in direzione delle punte, petto alto, talloni incollati.', why: 'La base di ogni esercizio per le gambe: impara qui la tecnica prima di caricare.', err: ['Talloni che si alzano', 'Ginocchia che si chiudono', 'Busto troppo inclinato']});
  N('cl-squat', {id: 'cl-jump-squat', n: 'Squat con salto', fr: [[20, 20, {t: 150, h: [112, 163], th: 80, sh: -15}], [-40, -40, {t: 182, lift: 26, th: 2, sh: 2}]], cap: ['Accosciata con braccia indietro', 'Salto: gambe tese, braccia che accompagnano'], tipo: 'comp', m: 'Quadricipiti, glutei, polpacci (potenza)', mm: 'quadricipiti, grande gluteo, polpacci, femorali', set: 'Piedi alla larghezza delle spalle, spazio sopra la testa.', ese: ['Scendi in uno squat a metà corsa caricando le braccia indietro.', 'Salta esplosivo distendendo tutto il corpo.', 'Atterra morbido sulle punte piegando le ginocchia e scendi subito nel prossimo.'], cue: 'Atterra in silenzio: le ginocchia sono gli ammortizzatori.', why: 'Potenza e fiato per le gambe senza attrezzi.', err: ['Atterrare con le gambe tese', 'Ginocchia che cedono all’interno', 'Troppe ripetizioni stanco'], fin: ['forza', 'tonificare']});
  N('cl-jump-squat', {id: 'cl-box-jump', n: 'Salto sulla panca (box jump)', nb: true, cap: ['Accosciata davanti alla panca, braccia indietro', 'Atterraggio sulla panca a piedi uniti (nel 3D la panca non è disegnata)'], set: 'Panca piana stabile davanti a te (o un rialzo solido), a un passo di distanza.', ese: ['Carica con un mezzo squat e le braccia indietro.', 'Salta sulla panca atterrando con tutto il piede e le ginocchia morbide.', 'Scendi un piede alla volta, non saltando giù.'], cue: 'Atterra in posizione di squat, in silenzio, con tutto il piede sulla panca.', why: 'Potenza esplosiva per le gambe; scendere a passo protegge le ginocchia.', err: ['Saltare giù dalla panca', 'Atterrare sulle punte', 'Panca instabile']});
  N('g-split', {id: 'cl-affondo', n: 'Affondi a corpo libero', a: CL, eq: undefined, gz: undefined, presa: 'neu', fr: [[0, 0, {t: 178, h: [135, 122], th: 10, sh: -5}], [0, 0, {t: 172, h: [135, 164], th: 80, sh: -12}]], set: 'Piedi alla larghezza del bacino, mani sui fianchi.', ese: ['Fai un passo lungo in avanti.', 'Scendi finché il ginocchio dietro sfiora terra, busto dritto.', 'Spingi sul tallone davanti e torna in piedi; alterna.'], cue: 'Scendi in verticale, non in avanti.', why: 'Affondo base senza attrezzi: equilibrio e gambe, ovunque.'});
  N('g-bulgaro', {id: 'cl-bulgaro', n: 'Affondo bulgaro a corpo libero', a: CL, eq: undefined, presa: 'neu', fr: [[0, 0, {t: 178, h: [140, 120], th: 15, sh: -5}], [0, 0, {t: 170, h: [140, 160], th: 80, sh: -15}]], set: 'Panca piana dietro di te, collo del piede appoggiato, mani sui fianchi.', why: 'Una gamba alla volta con il peso del corpo: già molto impegnativo per glutei e quadricipiti.'});
  N('cl-squat', {id: 'cl-pistol', n: 'Pistol squat assistito (una gamba, mano al rack)', rl: [205, 192], ko: 0, fr: [[88, 90, {t: 180}], [88, 90, {t: 150, h: [112, 176], th: 100, sh: -22}]], cap: ['In piedi su una gamba, l’altra tesa avanti, una mano al rack', 'Accosciata completa su una gamba'], m: 'Quadricipiti, glutei (una gamba)', mm: 'quadricipiti, grande gluteo, medio gluteo, polpacci, core', set: 'Una mano sul montante del rack (o su un cavo) per l’equilibrio, una gamba tesa avanti.', pos: 'Tallone a terra, ginocchio in linea con il piede, busto inclinato quanto basta.',
    ese: ['Scendi su una gamba tenendo l’altra tesa avanti.', 'Vai giù il più possibile (anche fino a sedere sul tallone).', 'Risali aiutandoti con la mano solo quanto serve.'], cue: 'La mano al rack è un freno, non un motore: usala sempre meno.', why: 'Il massimo per gambe e equilibrio a corpo libero; la versione assistita lo rende fattibile a tutti.', err: ['Tallone che si alza', 'Ginocchio che cede', 'Tirarsi su con la mano'], trj: 'Movimento verticale su una gamba sola; la gamba libera resta tesa davanti.'});
  N('g-hip-thrust', {id: 'cl-ponte', n: 'Ponte glutei a terra (glute bridge)', a: CL, eq: undefined, benchSt: undefined, nb: false, st: 'floor', presa: 'neu', fr: [[0, 0, {...LIE, h: [150, 197], th: 125, sh: 40}], [0, 0, {h: [150, 178], t: 258, th: 108, sh: 55}]], cap: ['Supino, ginocchia piegate, piedi a terra', 'Bacino in alto: linea dalle spalle alle ginocchia'], set: 'Tappetino a terra. Supino, ginocchia piegate, piedi a terra alla larghezza del bacino, braccia lungo i fianchi.', pos: 'Mento dentro, costole giù, spinta sui talloni.',
    ese: ['Spingi sui talloni e solleva il bacino fino ad allineare spalle, anche e ginocchia.', 'Stringi i glutei in alto per 1-2 secondi.', 'Scendi lentamente senza appoggiare del tutto.'], cue: 'Non inarcare: in alto stringi i glutei, non spingere con la schiena.', why: 'Glutei e femorali senza attrezzi; a una gamba sola o con un manubrio sul bacino per progredire.', err: ['Inarcare la lombare', 'Piedi troppo lontani', 'Spingere con le punte'], trj: 'Il bacino sale e scende ruotando attorno alle spalle appoggiate a terra.'});
  N('g-calf', {id: 'cl-calf', n: 'Calf raise a corpo libero (anche a una gamba)', a: CL, eq: undefined, vbar: undefined, presa: 'neu', fr: [[0, 0, {}], [0, 0, {lift: 11, ft: -45}]], set: 'Avampiedi sul bordo di un gradino o disco, una mano al rack per l’equilibrio.', ese: ['Sali sulle punte il più in alto possibile.', 'Tieni un secondo.', 'Scendi lentamente sotto il livello del bordo.'], why: 'Polpacci senza attrezzi; a una gamba è già un buon carico.', cue: 'Lento in discesa, pausa in alto.'});
  N('cl-squat', {id: 'cl-wall-sit', n: 'Wall sit (sedia al muro, tenuta)', isom: true, hold: '30-60 s', tipo: 'iso', fr: [[0, 0, {t: 180, h: [150, 152], th: 90, sh: -90}], [0, 0, {t: 180, h: [150, 152], th: 90, sh: -90}]], cap: ['Schiena al muro, cosce parallele, ginocchia a 90°', 'Posizione tenuta: tieni 30-60 s'], m: 'Quadricipiti (isometrico), glutei', mm: 'quadricipiti, grande gluteo, polpacci', set: 'Schiena appoggiata a un muro (o al montante del rack), piedi avanti alla larghezza del bacino.', pos: 'Cosce parallele al pavimento, ginocchia sopra le caviglie, schiena tutta appoggiata.', ese: ['Scivola giù lungo il muro fino a cosce parallele.', 'Tieni la posizione respirando normalmente.', 'Risali quando le gambe tremano troppo.'], cue: 'Mani sulle cosce = barare: tienile incrociate al petto.', why: 'Tenuta per i quadricipiti: forza e resistenza senza carico sulle articolazioni.', err: ['Ginocchia oltre le punte', 'Cosce sopra la parallela', 'Trattenere il respiro'], fin: ['tonificare']});
  N('a-bird-dog-hold', {id: 'cl-donkey-kick', n: 'Donkey kick (calci in quadrupedia)', g: 'gambe', g2: ['addome'], ab: undefined, isom: false, hold: undefined, noanim: false, tipo: 'iso', fin: ['massa', 'tonificare'], rl: [112, 196], fr: [[0, 0, {h: [150, 160], t: 92, th: 24, sh: -66}], [0, 0, {h: [150, 160], t: 92, th: -70, sh: 20}]], cap: ['A quattro zampe, ginocchio sotto l’anca', 'Gamba spinta in alto con il ginocchio piegato, pianta verso il soffitto'],
    m: 'Glutei, femorali', mm: 'grande gluteo, femorali, erettori spinali (stabilità)', set: 'Tappetino a terra, in quadrupedia: mani sotto le spalle, ginocchia sotto le anche.', pos: 'Schiena neutra, collo in linea, bacino fermo.', ese: ['Solleva una gamba con il ginocchio piegato a 90° spingendo il tallone verso il soffitto.', 'Fermati con la coscia in linea con il busto e stringi il gluteo.', 'Scendi senza appoggiare il ginocchio; finisci la serie e cambia gamba.'], cue: 'Spingi con il tallone, non inarcare la schiena per andare più in alto.', why: 'Isolamento del gluteo senza attrezzi, a casa o come riscaldamento prima di squat e stacchi.', err: ['Inarcare la lombare', 'Ruotare il bacino', 'Slancio'], fam: 'Kickback glutei', famRe: /kickback|donkey|calci/i});
  N('cl-donkey-kick', {id: 'cl-fire-hydrant', n: 'Fire hydrant (abduzione in quadrupedia)', fr: [[0, 0, {h: [150, 160], t: 92, th: 24, sh: -66}], [0, 0, {h: [150, 160], t: 92, th: 24, sh: -66, lz: 34}]], cap: ['A quattro zampe', 'Ginocchio piegato aperto di lato fino all’altezza dell’anca'], m: 'Medio gluteo, abduttori', mm: 'medio e piccolo gluteo, tensore della fascia lata, core', ese: ['Tenendo il ginocchio piegato a 90°, aprilo di lato fino all’altezza dell’anca.', 'Fermati un secondo in alto.', 'Scendi senza appoggiare; finisci la serie e cambia gamba.'], cue: 'Il bacino non ruota: se lo fa, alzi la gamba troppo.', why: 'Medio gluteo: stabilità del bacino e del ginocchio, utile a chi fa squat e corsa.', err: ['Ruotare il bacino', 'Inarcare la schiena', 'Velocità'], fam: 'Abduzione / adduzione', famRe: /abduz|hydrant/i});
  N('a-plank-mani', {id: 'cl-superman', n: 'Superman a terra (schiena bassa e glutei)', g: 'schiena', g2: ['gambe'], ab: undefined, isom: false, hold: undefined, tipo: 'iso', fin: ['tonificare'], arm3: undefined, fr: [[95, 95, {h: [150, 196], t: 92, th: -88, sh: -88}], [120, 120, {h: [150, 194], t: 100, th: -72, sh: -72}]], cap: ['Prono, braccia distese avanti, gambe tese', 'Braccia e gambe sollevate, petto staccato da terra'], m: 'Erettori spinali, glutei, deltoidi posteriori', mm: 'erettori spinali, grande gluteo, femorali, deltoide posteriore, trapezio',
    set: 'Tappetino a terra. Prono, braccia distese avanti, gambe tese, fronte verso terra.', pos: 'Collo in linea (guarda il tappetino), glutei contratti.', ese: ['Solleva insieme braccia, petto e gambe di pochi centimetri.', 'Tieni 1-2 secondi contraendo glutei e schiena.', 'Scendi lentamente.'], cue: 'Allungati, non alzarti: mani e piedi vanno lontano, il sollevamento è piccolo.', why: 'Rinforza la schiena bassa e i glutei senza attrezzi: l’antagonista degli addominali.', err: ['Sollevare troppo (iperestensione)', 'Testa in alto', 'Trattenere il respiro'], fam: 'Schiena bassa', famRe: /superman|iperestens/i});
  /* ---------- corpo libero: sbarra ---------- */
  N('b-trazioni', {id: 'cl-dead-hang', n: 'Sospensione alla sbarra (dead hang, tenuta)', g: 'avambracci', g2: ['schiena'], tipo: 'iso', isom: true, hold: '20-45 s', fin: ['tonificare'], fr: [[180, 180, {t: 180, th: 22, sh: -88}], [180, 180, {t: 180, th: 22, sh: -88}]], cap: ['Appeso a braccia tese, spalle attive', 'Posizione tenuta: tieni 20-45 s'], m: 'Avambracci (presa), gran dorsale, spalle (decompressione)', mm: 'flessori delle dita, avambracci, gran dorsale, cuffia dei rotatori',
    set: 'Sbarra per trazioni, presa prona poco più larga delle spalle.', pos: 'Braccia tese, spalle leggermente attive (non lasciarti cadere nelle orecchie), gambe rilassate o piegate.', ese: ['Appenditi e lascia il corpo libero.', 'Respira e tieni il tempo stabilito.', 'Scendi a piedi.'], cue: 'La presa è il limite: quando migliora, migliorano anche trazioni e stacchi.', why: 'Forza di presa e decompressione della colonna; la base per le trazioni.', err: ['Spalle alle orecchie', 'Dondolare', 'Lasciare prima del tempo'], fam: 'Trazioni', trj: 'Nessun movimento: sospensione a braccia tese.'});
  N('b-trazioni', {id: 'cl-scapular-pull', n: 'Scapular pull-up (trazioni di scapola)', tipo: 'iso', fin: ['massa', 'tonificare'], fr: [[180, 180, {t: 180, th: 22, sh: -88}], [180, 180, {h: [150, 141], t: 180, th: 22, sh: -88}]], cap: ['Appeso a braccia tese, spalle rilassate', 'Spalle abbassate e scapole strette: il corpo sale di pochi centimetri a braccia tese'], m: 'Gran dorsale, trapezio inferiore, scapole', mm: 'gran dorsale, trapezio inferiore e medio, romboidi, avambracci',
    set: 'Sbarra per trazioni, presa prona poco più larga delle spalle.', pos: 'Braccia sempre tese, gambe ferme.', ese: ['Appenditi a braccia tese con le spalle rilassate.', 'Senza piegare i gomiti, abbassa le spalle e stringi le scapole: il corpo sale un po’.', 'Tieni un secondo e torna rilassando le scapole.'], cue: 'Pensa a portare le scapole nelle tasche posteriori: è il primo centimetro di ogni trazione.', why: 'Insegna ad attivare dorsali e scapole: fondamentale per fare bene le trazioni e per le spalle.', err: ['Piegare i gomiti', 'Slancio', 'Movimento troppo ampio'], fam: 'Trazioni'});
  /* ---------- corpo libero: femorali ---------- */
  N('a-pallof-ginocchio', {id: 'cl-nordic', n: 'Nordic curl (femorali, piedi bloccati sotto il rack)', g: 'gambe', g2: ['addome'], a: CL, eq: undefined, an: undefined, tzf: undefined, gz: undefined, tipo: 'iso', fin: ['massa', 'tonificare'], ab: undefined, isom: false, m: 'Femorali (eccentrico), glutei', mm: 'femorali, grande gluteo, polpacci, erettori spinali', fr: [[88, 90, {t: 180}], [88, 90, {t: 128}]], cap: ['In ginocchio, caviglie bloccate, corpo dritto dalle ginocchia', 'Corpo che scende in avanti in linea, frenato dai femorali'],
    set: 'In ginocchio su un tappetino, caviglie bloccate sotto la barra bassa del rack (o un manubrio pesante / un compagno). Mani pronte davanti al petto.', pos: 'Corpo in linea dalle ginocchia alla testa, anche aperte (non piegarti all’anca).', ese: ['Lasciati cadere in avanti il più lentamente possibile frenando con i femorali.', 'Quando non riesci più a frenare, appoggia le mani a terra.', 'Spingi un po’ con le mani e torna su aiutandoti il minimo possibile.'], cue: 'Vince chi scende più lento: 3-5 secondi di discesa.', why: 'Il migliore esercizio per i femorali senza macchine: protegge da infortuni e migliora lo stacco.', err: ['Piegarsi all’anca', 'Scendere veloce', 'Caviglie non ben bloccate'], fam: 'Leg curl', famRe: /leg curl|nordic/i, trj: 'Il corpo ruota in avanti attorno alle ginocchia come un pendolo, restando dritto.'});
  N('g-stepup-db', {id: 'cl-stepup', n: 'Step-up sulla panca a corpo libero', a: CL, eq: undefined, presa: 'neu', set: 'Panca piana (altezza al ginocchio o poco sotto). Mani sui fianchi.', why: 'Lavoro unilaterale per glutei e quadricipiti senza attrezzi: parti da qui prima dei manubri.'});
  // zone addome e famiglie di base
  const pp = g('p-panca-db'); if (pp) { pp.fam = 'Panca piana / chest press'; pp.famRe = g('p-panca') && g('p-panca').famRe; }
  const PLK = g('a-plank'); ['cl-pushup', 'cl-pushup-ginocchia', 'cl-pushup-diamante', 'cl-pushup-incl', 'cl-pushup-decl', 'cl-pike'].forEach(id => { const e = g(id); if (e) { e.fam = 'Flessioni'; e.famRe = /flessioni|push-up/i; } });
})();

/* ===== tarature dagli angoli articolari estratti dai video 3D della libreria (MediaPipe): profondità e ampiezze più realistiche ===== */
(() => {
  const g = id => EX.find(e => e.id === id), set = (id, o) => { const e = g(id); if (e) Object.assign(e, o); };
  set('s-press-db', {fr: [[72, 175, {t: 185}], [178, 180, {t: 185}]], cap: ['Manubri all’altezza delle orecchie, gomiti a 90° sotto i polsi', 'Braccia distese sopra la testa']});
  set('sm-squat', {fr: [[-70, 118, {t: 186, th: 9, sh: 9}], [-70, 118, {t: 146, h: [114.9, 171], th: 94, sh: -24}]]});
  ['g-rdl-db', 'g-rdl'].forEach(id => set(id, {fr: [[0, 0, {t: 178}], [0, 0, {t: 120, h: [112, 126], th: 34, sh: -6}]]}));
  set('sm-rdl', {fr: [[0, 0, {t: 178}], [0, 0, {t: 120, h: [108, 126], th: 34, sh: -6}]]});
  set('t-dip', {fr: [[0, 0, {h: [150, 95], t: 180, th: 25, sh: -70}], [-48, 50, {h: [150, 124], t: 172, th: 25, sh: -70}]]});
  set('b-lat-larga', {fr: [[160, 175, {t: 184}], [22, 160, {t: 192}]]});
  set('b-row-corda', {fr: [[78, 78, {t: 168}], [-75, 45, {t: 186}]]});
  set('b-trazioni', {fr: [[180, 180, {t: 180, th: 22, sh: -88}], [25, 170, {h: [158, 100], t: 180, th: 22, sh: -88}]]});
  set('s-facepull', {fr: [[92, 95, {t: 176}], [85, -150, {t: 182}]]});
  set('a-mountain', {fr: [[0, 0, {h: [150, 150], t: 92, th: -42, sh: -42}], [0, 0, {h: [150, 150], t: 92, th: 45, sh: -32}]]});
  set('a-leg-raise-terra', {fr: [[90, 90, {h: [150, 197], t: 270, th: 100, sh: 100}], [90, 90, {h: [150, 197], t: 270, th: 186, sh: 186}]]});
})();

/* ===== rematori a un braccio: il manubrio/maniglia parte sotto la spalla e sale verso il fianco con il gomito che supera la linea della schiena (prima scorreva in orizzontale all'altezza del ginocchio) ===== */
(() => {
  const set = (id, fr) => { const e = EX.find(x => x.id === id); if (e) { e.fr = fr; e.lin = false; } };   /* niente linearizzazione: il gomito deve salire sopra la schiena, non restare basso */
  set('b-row-db', [[2, 2, {t: 112}], [-100, -12, {t: 112}]]);
  set('b-row-singolo', [[22, 24, {t: 128}], [-96, -10, {t: 128}]]);
  set('j-row-singolo', [[12, 12, {t: 135}], [-95, -12, {t: 135}]]);
  const e = EX.find(x => x.id === 'b-row-db'); if (e) e.cap = ['Busto inclinato, manubrio che pende sotto la spalla', 'Gomito in alto oltre la schiena, manubrio al fianco'];
})();
(() => {   /* rematori a due braccia (bilanciere, manubri, jammer, cavi a busto inclinato, Smith): gomiti indietro e sopra la linea della schiena, bilanciere al basso addome */
  const set = (id, fr, lin) => { const e = EX.find(x => x.id === id); if (e) { e.fr = fr; e.lin = !!lin; } };
  set('b-row-db2', [[2, 2, {t: 115, th: 14, sh: -6}], [-98, -14, {t: 115, th: 14, sh: -6}]]);
  set('b-row-db-panca', [[2, 2, {t: 115, th: 14, sh: -6}], [-98, -14, {t: 115, th: 14, sh: -6}]]);
  set('b-row-bar', [[2, 2, {t: 115, th: 14, sh: -6}], [-96, -12, {t: 115, th: 14, sh: -6}]]);
  set('b-row-jammer', [[20, 20, {t: 135}], [-92, -14, {t: 135}]]);
  set('b-row-busto-cavi', [[42, 44, {t: 135}], [-92, -12, {t: 135}]]);
})();

/* ===== seconda taratura dall'analisi MediaPipe su tutti i video: gomiti non più "chiusi a libro" nelle estensioni e nelle trazioni, step-up con tibia verticale ===== */
(() => {
  const set = (id, o) => { const e = EX.find(x => x.id === id); if (e) Object.assign(e, o); };
  set('t-over-db', {fr: [[172, -46, {}], [178, -188, {}]], cap: ['Manubrio dietro la testa, gomiti in alto piegati a circa 90°', 'Braccia distese sopra la testa']});   /* avambraccio DIETRO la testa (angolo negativo = indietro) */
  set('t-overhead-corda', {fr: [[165, -62, {t: 172}], [168, -188, {t: 172}]]});   /* -188 = su, ma raggiunto ruotando da dietro (non passando davanti al viso) */
  set('p-press-cavi', {fr: [[-30, 70, {t: 170}], [88, 90, {t: 170}]]});
  set('c-curl-db', {fr: [[5, 5], [8, 140]]});
  const top = {h: [158, 100], t: 180, th: 22, sh: -88};
  ['b-trazioni-stretta', 'b-trazioni-neutra', 'b-trazioni-elastico', 'c-chinup'].forEach(id => set(id, {fr: [[180, 180, {t: 180, th: 22, sh: -88}], [25, 170, top]]}));
  set('b-trazioni-larga', {fr: [[180, 180, {t: 180, th: 22, sh: -88}], [40, 160, {h: [156, 102], t: 180, th: 22, sh: -88}]]});
  set('b-trazioni-negative', {fr: [[25, 170, top], [180, 180, {t: 180, th: 22, sh: -88}]]});
  ['g-stepup-db', 'cl-stepup'].forEach(id => set(id, {fr: [[0, 0, {t: 178, h: [150, 118], th: 92, sh: 2}], [0, 0, {t: 178, h: [150, 118], th: 2, sh: 0}]]}));
  set('s-laterali', {fr: [[12, 27, {}], [90, 104, {}]]});
})();

/* ===== rematore alla Smith: gomiti indietro (la linearizzazione + vincolo barra verticale li piegava in avanti) ===== */
(() => { const e = EX.find(x => x.id === 'sm-row'); if (e) Object.assign(e, {lin: true, vbar: false, fr: [[-45, -30, {t: 118, th: 14, sh: -6}], [-96, -12, {t: 118, th: 14, sh: -6}]],   /* traiettoria della barra verticale (binari fermi), gomito sempre dietro */ cap: ['Busto inclinato, barra appesa a braccia distese sotto le spalle', 'Gomiti indietro e in alto oltre la schiena, barra al basso addome']}); })();

/* ===== Smith machine: barra che sale e scende solo in verticale (i binari restano fermi) ===== */
(() => {
  const set = (id, o) => { const e = EX.find(x => x.id === id); if (e) Object.assign(e, o); };
  set('sm-bulgaro', {vbar: true});
  set('sm-good-morning', {vbar: false, lin: false, fr: [[-70, 118, {t: 178}], [-70, 118, {t: 130, h: [128, 122], th: 62, sh: -6}]], cap: ['Barra sul trapezio, in piedi', 'Anche indietro e busto inclinato: la barra scende in verticale lungo i binari']});
  set('sm-hip-thrust', {fr: [[56, 56, {h: [180, 200], t: 236, th: 122, sh: 5}], [86, 86, {h: [180, 170], t: 272, th: 98, sh: 3}]]});
  set('sm-row-inverso', {fr: [[150, 150, {h: [150, 180], t: 245, th: 75, sh: 75}], [90, 170, {h: [150, 166], t: 237, th: 67, sh: 67}]], cap: ['Appeso sotto la barra a braccia tese, talloni a terra', 'Petto alla barra: il corpo ruota sui talloni, la barra resta ferma']});
})();

/* ===== Rear delt pull-across al cavo (video Facebook): un braccio teso, cavo all'altezza della spalla, arco ampio da davanti al corpo fino di lato ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  EX.push(cl('s-posteriori-singolo', {id: 's-posteriori-pullacross', n: 'Alzate posteriori a un braccio al cavo, gomito bloccato (pull-across)', one: true, prio: true, tipo: 'iso', fin: ['massa', 'tonificare'],
    m: 'Deltoide posteriore', mm: 'Deltoide posteriore (isolato), romboidi e trapezio medio in appoggio', an: [[25, 105]], hs: {a: [-26, 0, 46], b: [50, 2, 16], r: 54},   /* gomito bloccato ma piegato (braccio corto), arco piu' corto: finisce di lato, non dietro */
    cap: ['Gomito piegato e bloccato, mano davanti alla spalla opposta', 'Braccio aperto di lato, gomito sempre piegato'],
    set: 'Cavo all’ALTEZZA DELLA SPALLA con maniglia singola. Stai di fianco alla torre: la mano che lavora e’ quella lontana dalla torre, il cavo passa davanti al petto. L’altra mano dietro la testa o sul montante.',
    pos: 'Piedi alla larghezza delle spalle, petto alto, busto fermo. Gomito BLOCCATO in leggera flessione: l’angolo del gomito non cambia mai, non si distende e non si chiude.',
    ese: ['Parti con la mano davanti al petto, verso la spalla opposta, gomito piegato.', 'Con il gomito bloccato porta il braccio verso l’esterno in un arco ampio, fino di lato: non andare oltre la linea delle spalle.', 'Tieni 1 secondo, senti il dietro della spalla.', 'Torna lentamente controllando il cavo per tutto l’arco.'],
    cue: 'Il braccio e’ una leva rigida piegata: muovi solo la spalla, come se volessi "spazzare" il cavo di lato. Tensione sempre sul deltoide posteriore.',
    why: 'Con il gomito bloccato e il cavo all’altezza della spalla il deltoide posteriore lavora da solo per tutto l’arco, senza aiuto di tricipite e dorsale. 3 serie da 12-15 nel giorno di parte alta.',
    err: ['Cambiare l’angolo del gomito durante l’arco (distenderlo o chiuderlo)', 'Portare il braccio troppo indietro', 'Ruotare il busto per aiutarsi', 'Alzare la spalla verso l’orecchio', 'Peso troppo alto: scegli un carico leggero']}));
})();


/* ===== 6 rematori alla Smith machine del video "6 multipress exercises for a strong, dense back" (Umair Bhatti) ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const base = EX.find(e => e.id === 'sm-row'); if (!base) return;
  const K = {t: 118, th: 14, sh: -6};
  EX.push(cl('sm-row', {id: 'sm-row-basso', n: 'Rematore alla Smith, presa stretta al basso addome (dorsali bassi)', lat: 0.6, presa: 'pro', m: 'Gran dorsale (fasci bassi), romboidi', mm: 'Gran dorsale (fasci inferiori), grande rotondo, romboidi, bicipite',
    fr: [[-45, -30, K], [-100, -16, K]], cap: ['Busto inclinato, mani vicine, barra appesa a braccia distese', 'Barra al basso addome, gomiti stretti e indietro oltre la schiena'],
    set: 'Barra alla Smith sotto il ginocchio, presa prona STRETTA (mani a larghezza dei fianchi). Busto a 45°, schiena neutra.', ese: ['Tira la barra verso il basso addome, gomiti che sfiorano i fianchi.', 'Stringi forte in alto per 1 secondo: senti i dorsali bassi.', 'Scendi lentamente a braccia distese.'],
    cue: 'Gomiti verso le tasche posteriori: la barra arriva vicino all’inguine, non allo stomaco.', why: 'La presa stretta e la barra bassa spostano il lavoro sui fasci bassi del gran dorsale: spessore della schiena bassa.', err: ['Barra tirata al petto', 'Gomiti larghi', 'Busto che si alza']}));
  EX.push(cl('sm-row', {id: 'sm-row-largo', n: 'Rematore alla Smith, presa larga al petto (parte alta)', lat: 2.4, presa: 'pro', m: 'Trapezio medio, romboidi, deltoide posteriore', mm: 'Trapezio medio e inferiore, romboidi, deltoide posteriore, gran dorsale',
    fr: [[-45, -30, K], [-86, -4, K]], cap: ['Busto inclinato, presa larga, barra appesa a braccia distese', 'Barra allo sterno, gomiti larghi e alti'],
    set: 'Barra alla Smith, presa prona LARGA (ben oltre le spalle). Busto a 45°, schiena neutra.', ese: ['Tira la barra verso lo sterno con i gomiti larghi, in fuori.', 'Stringi le scapole in alto per 1 secondo.', 'Scendi lentamente a braccia distese.'],
    cue: 'Gomiti in fuori come ali: il carico va su parte alta della schiena e deltoidi posteriori.', why: 'La presa larga con i gomiti alti privilegia trapezio medio, romboidi e deltoide posteriore: spessore della schiena alta.', err: ['Barra tirata alle anche', 'Spalle che si alzano verso le orecchie', 'Slancio con la schiena']}));
  EX.push(cl('sm-row', {id: 'sm-row-supino', n: 'Rematore alla Smith, presa supina (dorsali, larghezza)', lat: 0.9, presa: 'sup', m: 'Gran dorsale, bicipiti, romboidi', mm: 'Gran dorsale, bicipite brachiale, romboidi, trapezio medio',
    fr: [[-45, -30, K], [-100, -14, K]], cap: ['Busto inclinato, palmi in avanti, barra appesa a braccia distese', 'Barra alla pancia, gomiti stretti indietro oltre la schiena'],
    set: 'Barra alla Smith sotto il ginocchio, presa SUPINA (palmi verso di te) a larghezza spalle. Busto a 45°.', ese: ['Tira la barra verso la pancia portando i gomiti indietro, stretti ai fianchi.', 'Stringi 1 secondo con le scapole chiuse.', 'Scendi lentamente a braccia distese.'],
    cue: 'Con i palmi in su il gomito resta vicino al busto: è la tirata che allarga la schiena.', why: 'La presa supina lascia il gomito aderente al fianco e allunga di più il gran dorsale: larghezza della schiena, con il bicipite che aiuta.', err: ['Tirare solo con le braccia', 'Gomiti che si aprono', 'Busto che si alza']}));
  EX.push(cl('sm-row', {id: 'sm-row-cross', n: 'Tirata incrociata a un braccio alla Smith (cross pull)', one: true, lat: 0.3, presa: 'neu', m: 'Gran dorsale, romboidi, obliqui', mm: 'Gran dorsale, grande rotondo, romboidi, deltoide posteriore, obliqui (anti-rotazione)',
    fr: [[-40, -24, K], [-104, -18, K]], cap: ['Busto inclinato, una mano al centro della barra, braccio disteso', 'Barra tirata verso il fianco opposto, gomito alto oltre la schiena'],
    set: 'Barra alla Smith sotto il ginocchio. Afferra il CENTRO della barra con una mano, l’altra sulla coscia o sul montante. Busto a 45°.', ese: ['Tira la barra in alto e verso il fianco opposto, come se volessi portare la mano all’anca dell’altro lato.', 'Gomito alto oltre la schiena, 1 secondo di contrazione.', 'Scendi controllato; poi cambia braccio.'],
    cue: 'La traiettoria è in diagonale: il dorsale lavora da un angolo diverso e il busto non deve ruotare.', why: 'Il lavoro a un braccio con tirata incrociata cambia l’angolo sul gran dorsale e fa lavorare il core contro la rotazione.', err: ['Ruotare il busto', 'Slancio', 'Barra tirata dritta invece che in diagonale']}));
  const up = EX.find(e => e.id === 'sm-upright');
  if (up) EX.push(cl('sm-upright', {id: 'sm-neck-pull', n: 'Tirata al collo alla Smith (neck pull, trapezio alto)', lat: 1.6, presa: 'pro', m: 'Trapezio superiore, deltoidi', mm: 'Trapezio superiore, deltoide laterale e posteriore, elevatore della scapola',
    fr: [[12, -8, {}], [108, -74, {}]], cap: ['In piedi, barra alle cosce, presa poco più larga delle spalle', 'Barra alle clavicole, gomiti alti sopra le spalle'],
    set: 'Barra alla Smith all’altezza delle cosce, presa prona poco più larga delle spalle. Petto alto.', ese: ['Tira la barra in alto lungo il corpo fino alle clavicole, gomiti che salgono sopra le spalle.', 'Stringi il trapezio 1 secondo.', 'Scendi lentamente.'], cue: 'È una tirata al mento più alta e più larga: finisce il lavoro sul trapezio alto.', why: 'Chiude il circuito con il trapezio superiore, che negli altri rematori lavora poco.', err: ['Strattonare', 'Polsi piegati', 'Carico alto con la spalla che fa male: riduci l’altezza']}));
  EX.forEach(e => { if (['sm-row-basso', 'sm-row-largo', 'sm-row-supino', 'sm-row-cross', 'sm-neck-pull'].includes(e.id)) { delete e.tempo; } });
})();


/* ===== flessione laterale al cavo ALTO: maniglia tenuta in alto di fianco alla testa, il busto si piega dalla parte opposta alla torre ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  EX.push(cl('a-side-bend-cavo', {id: 'a-side-bend-cavo-alto', n: 'Flessione laterale al cavo alto', an: [185, 24],
    fhip: true, tempo: [1.3, 0.7, 2.1], fr: [[170, 176, {t: 180, sb: 14}], [170, 176, {t: 180, sb: -8}], [170, 176, {t: 180, sb: -32}]], cap: ['Di lato alla torre, maniglia del cavo alto tenuta in alto accanto alla testa', 'Busto piegato dalla parte opposta alla torre: il fianco vicino al cavo si accorcia'],
    trj: 'Il braccio resta in alto e quasi disteso: si muove solo il busto, che si piega lontano dalla torre tirando giù la maniglia e torna lentamente lasciando allungare il fianco.',
    set: 'Cavo ALTO con maniglia singola. Stai di lato alla torre, maniglia nella mano vicina alla torre tenuta in alto accanto alla testa, gomito appena piegato.', pos: 'Piedi alla larghezza delle anche, ginocchia morbide, bacino fermo e ben appoggiato: si muove solo il tronco.',
    ese: ['Parti con il fianco vicino alla torre leggermente allungato (il cavo tira verso l’alto).', 'Piega il busto dalla parte opposta alla torre, tirando la maniglia verso il basso con il fianco, non con il braccio.', 'Fermati 1 secondo con le costole vicine all’anca, poi risali lentamente.', 'Cambia lato.'],
    cue: 'Immagina di avvicinare le costole all’anca dello stesso lato: il braccio è solo un gancio.', why: 'Con il cavo alto la resistenza tira verso l’alto e il fianco lavora in accorciamento contro il carico: obliqui e quadrato dei lombi del lato della torre, con allungamento completo in alto.', err: ['Tirare con il braccio (gomito che si piega)', 'Inclinarsi in avanti o ruotare', 'Spostare il bacino di lato']}));
})();


/* ===== crunch obliqui al cavo: in piedi e a un lato (oltre a quello in ginocchio) ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  EX.push(cl('a-crunch-cavo-piedi', {id: 'a-crunch-cavo-obliquo-piedi', n: 'Crunch obliquo al cavo in piedi', m: 'Obliqui, retto dell’addome', mm: 'obliqui esterni e interni, retto addominale, trasverso',
    fr: [[90, -125, {t: 180}], [125, -125, {t: 135, cu: 45, tw: 42}]], cap: ['In piedi, corda ai lati della testa', 'Colonna arrotolata e ruotata: gomito verso il ginocchio opposto'],
    trj: 'Come il crunch al cavo in piedi, ma mentre ti arrotoli ruoti il busto: un gomito va verso il ginocchio opposto. Il bacino non si muove.',
    set: 'Cavo ALTO con corda. In piedi davanti alla torre, un passo indietro, corda ai lati della testa.', pos: 'Ginocchia morbide, bacino fermo.',
    ese: ['Parti con il busto dritto e la corda alla testa.', 'Arrotola la colonna e ruota portando un gomito verso il ginocchio opposto.', 'Contrai 1 secondo, risali e alterna il lato.'],
    cue: 'Ruota le spalle mentre scendi con le costole: il bacino resta fermo.', why: 'Il crunch obliquo al cavo senza dover stare in ginocchio, con carico regolabile per gli obliqui.', err: ['Piegarsi dalle anche', 'Ruotare solo le braccia', 'Peso eccessivo']}));
  EX.push(cl('a-crunch-cavo-obliquo', {id: 'a-crunch-cavo-obliquo-lato', n: 'Crunch obliquo al cavo a un lato (maniglia singola)', one: true, m: 'Obliqui (un lato), retto dell’addome', mm: 'obliqui esterni e interni di un lato, retto addominale, trasverso',
    fr: [[100, -120, {t: 180, tw: -8}], [125, -125, {t: 132, cu: 46, tw: 48}]], cap: ['In ginocchio, maniglia singola alla spalla', 'Colonna arrotolata e ruotata: gomito verso il ginocchio opposto'],
    trj: 'La maniglia resta alla spalla, il gomito va verso il ginocchio opposto arrotolando e ruotando il busto: lavori un fianco per volta, con la resistenza sempre tesa.',
    set: 'Cavo ALTO con maniglia singola. In ginocchio davanti alla torre, maniglia alla spalla (mano vicina al collo), l’altra mano sulla coscia.', pos: 'Bacino fermo, schiena neutra in partenza.',
    ese: ['Parti col busto eretto e la maniglia alla spalla.', 'Arrotola la colonna e ruota portando il gomito verso il ginocchio opposto.', 'Contrai 1 secondo, risali lentamente. Finita la serie cambia lato.'],
    cue: 'Il gomito non è un braccio che tira: è il busto che lo porta verso il ginocchio.', why: 'Carico unilaterale sugli obliqui: bilancia i due lati e allena la rotazione contro resistenza.', err: ['Tirare con il braccio', 'Piegarsi dalle anche', 'Slancio']}));
})();


/* ===== rematori al cavo basso seduto: presa stretta con triangolo (maniglia a V) e presa larga neutra (barra multipresa) ===== */
(() => {
  const cl = (id, o) => Object.assign(JSON.parse(JSON.stringify(EX.find(e => e.id === id))), o);
  const b = EX.find(e => e.id === 'b-row-cavo'); if (!b) return;
  EX.push(cl('b-row-cavo', {id: 'b-row-cavo-larga-neutra', n: 'Rematore al cavo basso seduto, presa larga neutra (barra multipresa)', prio: false, lat: 1.3, gz: 42, tzf: 0,
    m: 'Trapezio medio, romboidi, dorsali (parte alta), deltoide posteriore', mm: 'Trapezio medio, romboidi, deltoide posteriore, gran dorsale (fasci alti), bicipite brachiale',
    fr: [[78, 78, {t: 168}], [-52, 82, {t: 184}]], cap: ['Braccia distese, mani larghe sulle maniglie parallele, busto leggermente avanti', 'Barra allo sterno basso, gomiti larghi a circa 45°, scapole strette'],
    trj: 'Le mani vanno in linea quasi orizzontale verso lo sterno basso (appena sopra l’ombelico), con i gomiti che restano più larghi che nel rematore a presa stretta.',
    set: 'Cavo BASSO con barra lunga multipresa (maniglie parallele larghe, presa neutra, palmi che si guardano) o barra per lat machine con impugnature neutre. Siediti davanti alla torre, piedi appoggiati, ginocchia leggermente flesse.',
    pos: 'Schiena neutra, petto alto, busto fermo con inclinazione indietro minima. Mani larghe quanto serve per avere gli avambracci verticali a fine corsa.',
    ese: ['Parti con le braccia distese e le scapole lasciate scivolare in avanti.', 'Tira la barra verso lo sterno basso, gomiti larghi a circa 45° dal busto, avambracci verticali.', 'Stringi le scapole 1 secondo, petto alto.', 'Ritorna lentamente controllando il cavo.'],
    cue: 'Gomiti larghi, non aderenti ai fianchi: immagina di tirarli verso le spalle posteriori, non verso le tasche.',
    why: 'La presa neutra larga sposta il lavoro su trapezio medio, romboidi e deltoide posteriore (spessore della parte alta) mantenendo i polsi in posizione naturale e le spalle più protette che con la presa prona larga.',
    err: ['Tirare all’addome invece che allo sterno basso', 'Gomiti troppo vicini ai fianchi (diventa un rematore stretto)', 'Dondolare con il busto', 'Spalle che salgono verso le orecchie']}));
  const t = EX.find(e => e.id === 'b-row-terra');
  if (t) {
    EX.push(cl('b-row-terra', {id: 'b-row-terra-larga-neutra', n: 'Rematore ai cavi seduto a terra, presa larga neutra (barra multipresa)', prio: false, lat: 1.3, gz: 42, tzf: 0,
      m: 'Trapezio medio, romboidi, dorsali (parte alta), deltoide posteriore', mm: 'Trapezio medio, romboidi, deltoide posteriore, gran dorsale (fasci alti), bicipite brachiale',
      fr: [[78, 78, {t: 168}], [-50, 80, {t: 184}]], cap: ['Seduto a terra, braccia distese, mani larghe sulle maniglie parallele', 'Barra allo sterno basso, gomiti larghi a circa 45°, scapole strette'],
      trj: 'Le mani vanno in linea quasi orizzontale verso lo sterno basso; i gomiti restano larghi e il busto non si inclina oltre la verticale.',
      set: 'Cavo BASSO con barra lunga multipresa (maniglie parallele larghe, presa neutra) o barra per lat machine con impugnature neutre. Siediti su un tappetino davanti alla torre, gambe distese o appena piegate con i piedi contro una pedana o la base della torre.',
      pos: 'Schiena neutra, petto alto, piedi appoggiati a un appoggio fisso, busto fermo. Mani larghe quanto serve per avere gli avambracci verticali a fine corsa.',
      ese: ['Parti con le braccia distese e le scapole lasciate scivolare in avanti.', 'Tira la barra verso lo sterno basso, gomiti larghi a circa 45° dal busto, avambracci verticali.', 'Stringi le scapole 1 secondo senza inclinarti all’indietro.', 'Ritorna lentamente controllando il cavo.'],
      cue: 'Gomiti larghi, non aderenti ai fianchi: tirali verso le spalle posteriori, non verso le tasche.',
      why: 'Come il rematore seduto a presa larga neutra ma da terra: trapezio medio, romboidi e deltoide posteriore con i polsi in posizione naturale, senza panca e con i piedi saldi.',
      err: ['Tirare all’addome invece che allo sterno basso', 'Gomiti troppo vicini ai fianchi', 'Inclinarsi all’indietro per barare', 'Piedi non appoggiati (il corpo scivola verso il cavo)']}));
    Object.assign(t, {n: 'Rematore ai cavi seduto a terra, presa stretta con triangolo', gz: 11, lat: 0.3, tzf: 0});
  }
  Object.assign(b, {n: 'Rematore al cavo basso seduto, presa stretta con triangolo', gz: 11, lat: 0.3, tzf: 0,
    cap: ['Braccia distese, mani strette sul triangolo, busto leggermente avanti', 'Triangolo all’addome, gomiti stretti ai fianchi, scapole strette'],
    set: 'Cavo BASSO con maniglia a triangolo (V, presa stretta neutra: palmi che si guardano). Siediti davanti alla torre, piedi appoggiati, ginocchia leggermente flesse.',
    cue: 'Gomiti stretti alle costole e triangolo all’ombelico: stringi le scapole come per tenere una matita tra le due.',
    why: 'Il triangolo con presa stretta neutra tiene i gomiti vicini al busto: lavorano di più il gran dorsale (parte media e bassa) e i romboidi, con i polsi in posizione naturale.'});
})();

/* ===== tirata al cavo alto con corda al petto, gomiti larghi: secondo esercizio del video "Back exercises with cable" (presa sulle corde, non sui pomelli) ===== */
(() => {
  const b = EX.find(e => e.id === 's-facepull'); if (!b) return;
  const e = JSON.parse(JSON.stringify(b));
  Object.assign(e, {id: 'b-corda-alta-petto', n: 'Tirata al cavo alto con corda, presa sui cordoni, gomiti larghi (parte alta della schiena)', g: 'schiena', g2: ['spalle'], prio: false, tipo: 'semi', fin: ['massa', 'tonificare'], fam: undefined, famRe: undefined,
    m: 'Trapezio medio e inferiore, romboidi, deltoide posteriore', mm: 'Trapezio medio, trapezio inferiore, romboidi, deltoide posteriore, sottospinato, gran dorsale (fasci alti)',
    fr: [[90, 92, {t: 176}], [-56, 98, {t: 182}]], lat: 3.4, gz: 22, az: 0.7,
    cap: ['Braccia distese davanti a te, corda in tensione all’altezza del petto', 'Corda al petto, gomiti larghi e alti, all’altezza delle spalle'],
    trj: 'La corda viene verso lo sterno in linea quasi orizzontale; i gomiti si aprono ai lati, all’altezza delle spalle, e vanno dietro la schiena.',
    set: 'Cavo ALTO (puleggia sopra la testa) con la corda. Afferra la corda tenendo le dita attorno ai cordoni, sopra i pomelli (presa neutra, palmi che si guardano). Fai 2-3 passi indietro, a cavo in tensione.',
    pos: 'Piedi alla larghezza delle spalle, ginocchia morbide, petto alto, scapole appoggiate. Busto fermo, quasi verticale.',
    ese: ['Parti con le braccia distese davanti a te, all’altezza del petto, corda in tensione.', 'Tira la corda verso lo sterno aprendo i gomiti ai lati, all’altezza delle spalle, come per portarli dietro la schiena.', 'Stringi le scapole 1 secondo: le mani restano davanti al petto, gli avambracci in avanti.', 'Ritorna lentamente fino alle braccia distese.'],
    cue: 'Gomiti larghi e alti, come le mani: porta i gomiti dietro, non le mani verso la pancia.',
    why: 'Tenere la corda (invece dei pomelli del face pull) permette di tirare più in basso, al petto, con i gomiti larghi: lavorano insieme trapezio medio, romboidi e deltoidi posteriori, cioè lo spessore della parte alta della schiena, con la spalla protetta.',
    err: ['Gomiti che scendono lungo i fianchi (diventa un rematore)', 'Busto che si inclina indietro per fare leva', 'Spalle che salgono verso le orecchie', 'Peso troppo alto e tirare con le braccia']});
  delete e.vars; delete e.varsLabel; delete e.fam; delete e.famRe;
  EX.push(e);
})();

/* ===== avambracci in piedi e dietro la schiena al cavo basso: dal video "Fitness Point Shymkent" (reverse curl, estensioni, wrist curl, wrist curl dietro la schiena) ===== */
(() => {
  const mk = (base, o) => { const b = EX.find(e => e.id === base); if (!b || EX.some(e => e.id === o.id)) return; const e = Object.assign(JSON.parse(JSON.stringify(b)), o); delete e.vars; delete e.varsLabel; EX.push(e); };
  mk('w-wrist-curl', {id: 'w-wrist-curl-piedi', n: 'Wrist curl in piedi al cavo basso, avambracci liberi (presa supina)', st: 'stand', an: [245, 212], fr: [[8, 72, {hd: -38}], [8, 100, {hd: 38}]],
    cap: ['Gomiti ai fianchi, avambracci in avanti, barra in basso e polsi aperti', 'Polsi flessi, pugno chiuso verso di te, barra in alto'],
    trj: 'La barra descrive un arco corto: dal basso, con le dita aperte, all’alto, con il pugno chiuso. Gomiti e avambracci restano quasi fermi.',
    set: 'Cavo BASSO con barra corta (o EZ). In piedi di fronte alla torre, presa supina (palmi verso l’alto) alla larghezza delle spalle. Gomiti ai fianchi piegati a circa 90°, avambracci in avanti senza appoggio.',
    pos: 'Piedi alla larghezza del bacino, busto fermo, gomiti inchiodati ai fianchi, cavo in tensione.',
    ese: ['Lascia scendere la barra aprendo le dita e piegando i polsi verso il basso.', 'Chiudi le dita e fletti i polsi portando la barra verso l’alto e verso di te.', 'Contrai 1 secondo.', 'Torna lentamente alla posizione di partenza.'],
    cue: 'Gomiti fermi ai fianchi: lavorano solo polsi e dita. Se per far salire la barra devi piegare i gomiti, il carico è troppo alto.',
    why: 'Stesso lavoro dei flessori dell’avambraccio del wrist curl da seduto, ma in piedi e senza appoggio: l’avambraccio è libero e fa da stabilizzatore. Utile per la presa su stacchi, rematori e trazioni.',
    err: ['Piegare i gomiti per sollevare la barra', 'Peso troppo alto', 'Corsa corta (dita che non si aprono in basso)']});
  mk('w-wrist-ext', {id: 'w-wrist-ext-piedi', n: 'Estensioni polso in piedi al cavo basso, avambracci liberi (presa prona)', st: 'stand', an: [245, 212], fr: [[8, 72, {hd: -38}], [8, 92, {hd: 36}]],
    cap: ['Gomiti ai fianchi, avambracci in avanti, barra in basso e polsi piegati verso il basso', 'Polsi estesi, dorso della mano verso l’alto'],
    trj: 'La barra descrive un arco corto: dal basso (polsi piegati verso il basso) all’alto (polsi estesi). Gomiti e avambracci restano quasi fermi.',
    set: 'Cavo BASSO con barra corta. In piedi di fronte alla torre, presa prona (palmi verso il basso) alla larghezza delle spalle. Gomiti ai fianchi piegati a circa 90°, avambracci in avanti senza appoggio.',
    pos: 'Piedi alla larghezza del bacino, busto fermo, gomiti inchiodati ai fianchi, cavo in tensione.',
    ese: ['Lascia scendere la barra flettendo i polsi verso il basso.', 'Estendi i polsi portando il dorso della mano verso l’alto.', 'Contrai 1 secondo.', 'Scendi lentamente.'],
    cue: 'Peso leggero e movimenti lenti: gli estensori sono piccoli e si stancano subito. Gomiti fermi ai fianchi.',
    why: 'Come le estensioni da seduto ma in piedi e senza appoggio: equilibra i flessori e protegge i gomiti (epicondilite) quando i carichi salgono.',
    err: ['Piegare i gomiti per sollevare la barra', 'Peso troppo alto', 'Corsa limitata']});
  mk('w-wrist-curl', {id: 'w-wrist-dietro', n: 'Wrist curl dietro la schiena al cavo basso (presa supina)', st: 'stand', tzf: 0,   /* un solo cavo, dalla torre alle spalle al centro della barra (v135) */
    an: [55, 212], fr: [[-9, -7, {hd: -30}], [-9, -7, {hd: 42}]], presa: 'sup',
    cap: ['Braccia distese lungo i fianchi, barra dietro di te, dita aperte', 'Polsi flessi, pugno chiuso verso i glutei'],
    trj: 'La barra resta dietro le cosce e sale di pochi centimetri: si muovono solo polsi e dita, le braccia restano distese.',
    set: 'Cavo BASSO con barra corta o dritta. Dai le spalle alla torre e afferra la barra dietro di te, con i palmi rivolti verso i glutei (presa supina). Braccia distese lungo i fianchi, barra all’altezza dei glutei, cavo in tensione.',
    pos: 'Piedi alla larghezza del bacino, petto alto, spalle indietro e giù, braccia ferme.',
    ese: ['Lascia scendere la barra aprendo le dita e piegando i polsi indietro.', 'Chiudi le dita e fletti i polsi portando la barra verso l’alto e verso i glutei.', 'Contrai 1 secondo.', 'Scendi lentamente.'],
    cue: 'Le braccia non si muovono: lavorano solo polsi e dita. Corsa completa, partendo dalle dita aperte.',
    why: 'Con le braccia dietro il corpo i flessori dell’avambraccio lavorano in una posizione diversa da quella seduta davanti alla torre: allena la presa e la forza di polsi e dita per stacchi, rematori e trazioni.',
    err: ['Muovere le braccia o dondolare il busto', 'Peso troppo alto', 'Corsa corta (dita che non si aprono in basso)']});
})();

/* ===== avambracci, le tre parti: dal reel di Tyler Path "How to Train All 3 Parts of Your Forearms" (il reverse curl al cavo c'era già: w-reverse-curl) ===== */
(() => {
  const mk = (base, o) => { const b = EX.find(e => e.id === base); if (!b || EX.some(e => e.id === o.id)) return; const e = Object.assign(JSON.parse(JSON.stringify(b)), o); delete e.vars; delete e.varsLabel; EX.push(e); };
  mk('w-wrist-curl', {id: 'w-wrist-flex-alto', n: 'Wrist curl a un braccio al cavo alto, di spalle alla torre (presa prona)', varName: 'Curl a un braccio al cavo alto', st: 'stand', one: true, hand: true, presa: 'pro',
    an: [88, 6], rl: [104, 220], fr: [[52, 170, {t: 152, h: [150, 124], th: 24, sh: -8, hd: 40}], [52, 170, {t: 152, h: [150, 124], th: 24, sh: -8, hd: -32}]],
    m: 'Flessori dell’avambraccio', mm: 'flessori del polso e delle dita (flessore radiale e ulnare del carpo, palmare lungo, flessori delle dita)',
    cap: ['Gomito piegato davanti al petto, mano accanto alla testa, polso tirato indietro dal cavo', 'Polso flesso in avanti, palmo verso l’avambraccio'],
    trj: 'La maniglia descrive un arco corto accanto alla testa: dal polso piegato indietro, tirato dal cavo, al polso flesso in avanti. Gomito e braccio restano fermi.',
    set: 'Cavo ALTO con maniglia singola. Dai le spalle alla torre con un piede avanti e uno indietro e il busto un po’ inclinato in avanti. Afferra la maniglia con una mano in presa prona (dorso della mano verso la torre): gomito piegato e puntato in avanti all’altezza del petto, mano accanto alla testa. Con l’altra mano tieni fermo il braccio che lavora, sotto il gomito.',
    pos: 'Busto fermo e inclinato in avanti, braccio immobile: il cavo deve tirare la mano indietro, verso la torre.',
    ese: ['Lascia che il cavo pieghi il polso indietro, senza muovere il gomito.', 'Fletti il polso in avanti portando il palmo verso l’avambraccio.', 'Contrai 1 secondo.', 'Torna indietro lentamente; finite le ripetizioni cambia braccio.'],
    cue: 'Si muove solo il polso: gomito e spalla restano fermi, tenuti dall’altra mano. Peso leggero e corsa completa.',
    why: 'Il cavo alto alle spalle tiene sotto tensione i flessori dell’avambraccio (la parte interna) anche con il polso piegato indietro, cioè in allungamento. Con il reverse curl (brachioradiale) e le estensioni del polso (estensori) completa il lavoro sulle tre parti dell’avambraccio; un braccio alla volta aiuta a sentire solo il polso.',
    err: ['Muovere il gomito o la spalla invece del polso', 'Peso troppo alto: il polso non si piega fino in fondo', 'Busto che dondola']});
  mk('w-wrist-ext', {id: 'w-wrist-ext-spalle', n: 'Estensioni polso di spalle al cavo basso, braccia distese (presa prona)', varName: 'Polso di spalle al cavo basso', st: 'stand', hand: true, presa: 'pro',
    an: [112, 160], tzf: 0, fr: [[16, 16, {hd: -34}], [16, 16, {hd: 38}]],   /* un solo cavo, al centro: passa tra le gambe */
    m: 'Estensori dell’avambraccio', mm: 'estensori del polso e delle dita (estensore radiale lungo e breve del carpo, estensore ulnare del carpo, estensore delle dita)',
    cap: ['Braccia distese davanti alle cosce, polsi piegati indietro dal cavo', 'Polsi estesi: nocche in avanti e verso l’alto'],
    trj: 'La barra resta davanti alle cosce e si sposta di pochi centimetri in avanti e in su: si muovono solo i polsi, le braccia restano distese.',
    set: 'Cavo BASSO, all’altezza delle ginocchia, con barra corta. Dai le spalle alla torre, a un passo da essa, con il cavo che passa tra le gambe. Afferra la barra davanti alle cosce in presa prona (palmi verso le cosce, dorso delle mani in avanti), mani alla larghezza dei fianchi, e fai un passo avanti per mettere il cavo in tensione.',
    pos: 'In piedi, petto alto e spalle indietro, braccia distese e ferme davanti alle cosce.',
    ese: ['Lascia che il cavo pieghi i polsi verso il basso e indietro.', 'Estendi i polsi portando le nocche in avanti e verso l’alto.', 'Contrai 1 secondo.', 'Torna lentamente alla partenza.'],
    cue: 'Braccia ferme e distese: lavorano solo i polsi. Peso leggero e movimento lento, gli estensori si stancano presto.',
    why: 'Di spalle alla torre, con le braccia distese, il cavo tira i polsi in flessione e gli estensori (la parte esterna dell’avambraccio) lavorano per tutta la corsa. Completa reverse curl e wrist curl e protegge i gomiti (epicondilite) quando i carichi salgono.',
    err: ['Piegare i gomiti o sollevare le braccia', 'Peso troppo alto', 'Corsa corta']});
})();

/* ===== petto: chest press ai cavi dall'alto verso il basso, per il pettorale basso (stessa direzione di spinta del dip: pettorale basso, tricipiti, deltoide anteriore) ===== */
(() => {
  const b = EX.find(e => e.id === 'p-press-cavi'); if (!b || EX.some(e => e.id === 'p-press-cavi-decl')) return;
  const e = Object.assign(JSON.parse(JSON.stringify(b)), {id: 'p-press-cavi-decl', n: 'Chest press ai cavi dall’alto verso il basso, in piedi (pettorale basso)', varName: 'Dall’alto verso il basso',
    g: 'petto', g2: ['tricipiti'], m: 'Pettorale basso, tricipiti, deltoidi anteriori',
    mm: 'grande pettorale (fasci sternali e costali, cioè la parte bassa), tricipite brachiale, deltoide anteriore, dentato anteriore',
    an: [45, 8], tzs: 80, rl: [108, 220], gz: 30, gz2: 14, lin: true,   /* tzs: due torri ai lati, non una puleggia sola al centro */
    fr: [[-28, 100, {t: 166, h: [150, 120], th: 14, sh: -4}], [38, 38, {t: 166, h: [150, 120], th: 14, sh: -4}]],
    cap: ['Gomiti indietro, mani ai lati del petto, cavi che arrivano dall’alto', 'Braccia distese in avanti e in basso, pugni vicini davanti alla pancia'],
    trj: 'Le mani partono ai lati del petto e scendono in diagonale, in avanti e verso il basso, fino davanti alla pancia: la stessa direzione di spinta del dip. Tornano sulla stessa linea.',
    set: 'Due cavi ALTI (puleggia in cima), maniglie singole. Stai di schiena alle torri, al centro, con un piede avanti: i cavi passano sopra le spalle.',
    pos: 'Busto inclinato appena in avanti, core contratto, stabile sul piede avanti. Gomiti a circa 45° dal busto, spalle basse e lontane dalle orecchie.',
    ese: ['Parti con le mani ai lati del petto, gomiti indietro.', 'Spingi le mani in avanti e verso il basso, in diagonale, fino a braccia distese davanti alla pancia, avvicinando i pugni.', 'Stringi petto e tricipiti per 1 secondo.', 'Ritorna lentamente sulla stessa linea, fino alle mani accanto al petto.'],
    cue: 'Spingi verso il basso come per salire dalle parallele: gomiti vicini al corpo, spalle basse, busto fermo.',
    why: 'È la spinta al cavo più simile al dip: la direzione verso il basso fa lavorare insieme pettorale basso, tricipiti e deltoide anteriore, ma senza caricare le spalle in fondo alla discesa e con il peso che si regola a piccoli passi. Rispetto alle croci dall’alto è una spinta: si usano carichi più alti e lavorano anche i tricipiti.',
    err: ['Piegarsi in avanti per spingere con il peso del corpo', 'Spalle che salgono verso le orecchie', 'Gomiti che si aprono troppo in fuori', 'Tornare su di scatto lasciando andare il cavo']});
  delete e.alt; delete e.vars; delete e.varsLabel;
  EX.push(e);
})();

/* ===== petto: croci ai cavi alti a busto inclinato in avanti, dal reel di Robert Andrei Lapusneanu ("A better way to hit the upper chest when doing flies") ===== */
(() => {
  const b = EX.find(e => e.id === 'p-croci-alte'); if (!b || EX.some(e => e.id === 'p-croci-chinato')) return;
  const e = Object.assign(JSON.parse(JSON.stringify(b)), {id: 'p-croci-chinato', n: 'Croci ai cavi alti a busto inclinato in avanti', varName: 'Busto inclinato in avanti',
    m: 'Pettorali (soprattutto la parte media), deltoidi anteriori poco coinvolti',
    mm: 'grande pettorale (fasci sternali, poi clavicolari), dentato anteriore; deltoide anteriore meno attivo che nelle croci in piedi',
    /* disegno di lato (busto inclinato e passo avanti): due torri ai lati, mani che si chiudono da larghe (gz) a unite (gz2) */
    an: [70, 8], tzs: 88, due: true, rl: [98, 220], gz: 64, gz2: 9,
    fr: [[-75, 100, {t: 135, h: [150, 128], th: 26, sh: -12}], [10, 40, {t: 135, h: [150, 128], th: 26, sh: -12}]],
    cap: ['Busto inclinato, braccia aperte all’indietro verso i cavi alti, petto alto', 'Mani unite in basso davanti alle ginocchia, gomiti appena piegati'],
    trj: 'Le mani disegnano un arco ampio dalle torri, ai lati e un po’ dietro il busto, fino a unirsi in basso davanti alle ginocchia. Il busto resta fermo e inclinato in avanti.',
    set: 'Due cavi ALTI (puleggia in cima), maniglie singole. Prendi i due cavi, fai un grande passo avanti rispetto alle torri e inclina il busto in avanti di circa 45°, con il petto alto.',
    pos: 'Piede avanti con il ginocchio piegato, busto fermo a circa 45°, schiena dritta, spalle basse. Gomiti leggermente piegati e fissi.',
    ese: ['Parti con le braccia aperte, un po’ dietro il busto, e senti il petto allungarsi.', 'Porta le mani in basso e al centro con un arco ampio, fino a unirle davanti alle ginocchia.', 'Tieni 1 secondo stringendo il petto.', 'Torna lentamente all’apertura senza cambiare l’angolo dei gomiti.'],
    cue: 'Il busto non si muove e il petto resta alto: le spalle non salgono verso le orecchie. L’angolo dei gomiti è sempre lo stesso.',
    why: 'Con il busto inclinato le braccia si chiudono quasi orizzontali rispetto al petto: il carico resta sul pettorale e le spalle lavorano meno che nelle croci dal basso verso l’alto in piedi, che è il vantaggio mostrato nel video. Lavora soprattutto la parte media del petto; per la parte alta resta più adatto un percorso dal basso verso l’alto.',
    err: ['Busto che si raddrizza o dondola durante il movimento', 'Gomiti che si piegano e si distendono (diventa una spinta)', 'Spalle in avanti e petto che si incurva'],
    tipo: 'iso', fin: ['massa', 'tonificare'], presa: 'neu'});
  delete e.v; delete e.hs; delete e.hz; delete e.alt; delete e.vars; delete e.varsLabel;
  EX.push(e);
})();

/* ===== bicipiti: curl al cavo alto di fronte alla torre, braccia in avanti, dal reel di Evgeny Voronko con Charles Glass ===== */
(() => {
  const b = EX.find(e => e.id === 'c-curl-alti'); if (!b || EX.some(e => e.id === 'c-curl-alti-fronte')) return;
  const e = Object.assign(JSON.parse(JSON.stringify(b)), {id: 'c-curl-alti-fronte', n: 'Curl al cavo alto di fronte alla torre, braccia in avanti', varName: 'Cavo alto di fronte, braccia avanti',
    m: 'Bicipiti (soprattutto il capo corto), brachiale', mm: 'bicipite brachiale (capo corto in particolare, con le braccia in avanti), brachiale, brachioradiale',
    /* disegno di lato: un solo cavo alto davanti (tzf 0), le due mani sullo stesso attacco */
    an: [262, 20], tzf: 0, gz: 16, fr: [[105, 115, {t: 180}], [105, 245, {t: 180}]],
    cap: ['Braccia tese in avanti e un po’ in su, verso il cavo alto', 'Mani alla fronte, palmi verso di te, gomiti fermi all’altezza delle spalle'],
    trj: 'Le mani disegnano un arco dalla puleggia alla fronte: i gomiti restano fermi, alti e in avanti, e si muovono solo gli avambracci.',
    set: 'Un cavo ALTO davanti a te, poco sopra la testa, con due maniglie singole (attacco a Y) o una barra EZ. In piedi di fronte alla torre, a un passo, con le braccia tese in avanti e un po’ in su verso il cavo.',
    pos: 'Busto dritto e fermo, gomiti all’altezza delle spalle, scapole basse.',
    ese: ['Parti con le braccia quasi tese in avanti, palmi rivolti in basso o uno verso l’altro.', 'Piega i gomiti e porta le mani verso la fronte, ruotando i palmi verso l’alto mentre sali.', 'Stringi il bicipite 1 secondo.', 'Torna lentamente alle braccia tese, senza abbassare i gomiti.'],
    cue: 'I gomiti non scendono e non si spostano: restano fermi all’altezza delle spalle, si muovono solo gli avambracci.',
    why: 'Con le braccia in avanti il bicipite lavora soprattutto accorciato, come nel curl alla panca Scott, e il cavo tiene la tensione fino in cima. Ruotare i palmi verso l’alto mentre sali (supinazione) aggiunge l’altra funzione del bicipite: è la variante mostrata da Charles Glass. Con due maniglie singole i polsi sono liberi di ruotare, con la barra EZ si carica di più.',
    err: ['Gomiti che si abbassano o si spostano durante il curl', 'Busto che si inclina indietro per aiutarsi', 'Peso troppo alto: le mani non arrivano alla fronte'],
    tipo: 'iso', fin: ['massa', 'tonificare'], presa: 'sup'});
  delete e.v; delete e.hs; delete e.hz; delete e.alt; delete e.due; delete e.vars; delete e.varsLabel;
  EX.push(e);
})();

/* ===== petto alto: squeeze press (hex press) con manubri su panca inclinata, dal reel di Harsh Sabharwal con Charles Glass ===== */
(() => {
  const b = EX.find(e => e.id === 'p-incl-db'); if (!b || EX.some(e => e.id === 'p-incl-squeeze')) return;
  const e = Object.assign(JSON.parse(JSON.stringify(b)), {id: 'p-incl-squeeze', n: 'Squeeze press (hex press) con manubri su panca inclinata', varName: 'Manubri uniti (squeeze press)',
    m: 'Petto alto e parte interna, tricipiti, deltoidi anteriori',
    mm: 'grande pettorale (fasci clavicolari e parte interna, per la spinta dei manubri uno contro l’altro), tricipite brachiale, deltoide anteriore',
    presa: 'neu', gz: 9, dbn: true, lin: true,   /* manubri affiancati e paralleli al busto, mani vicine */
    cap: ['Braccia distese, manubri uniti sopra il petto, palmi che si guardano', 'Manubri uniti sulla parte alta del petto, gomiti vicini al busto'],
    trj: 'I manubri, sempre uniti, scendono in linea retta fino alla parte alta del petto e risalgono sulla stessa linea.',
    set: 'Panca inclinata a circa 30°. Due manubri in presa neutra (palmi uno verso l’altro), affiancati e uniti sopra il petto.',
    pos: 'Schiena e glutei appoggiati, piedi a terra, scapole indietro e in basso. Premi i manubri uno contro l’altro per tutta la serie.',
    ese: ['Parti con le braccia distese e i manubri uniti, premendoli uno contro l’altro.', 'Scendi lentamente fino alla parte alta del petto, sempre con i manubri uniti e i gomiti vicini al busto.', 'Spingi su in linea retta senza staccarli.', 'In alto stringi il petto 1 secondo continuando a premere i manubri tra loro.'],
    cue: 'I manubri non si staccano mai: premili uno contro l’altro come se volessi schiacciarli, è questo che fa lavorare il petto.',
    why: 'Premere i manubri uno contro l’altro aggiunge alla spinta una contrazione del petto verso il centro, attiva per tutta la ripetizione; con la panca inclinata il lavoro va soprattutto sul petto alto. Si usano carichi più leggeri della panca inclinata con manubri e le spalle lavorano meno, perché i gomiti restano vicini al busto.',
    err: ['Manubri che si staccano durante la spinta', 'Gomiti che si aprono in fuori', 'Panca troppo inclinata (oltre 45° lavora di più la spalla)'],
    tipo: 'comp', fin: ['massa', 'tonificare']});
  delete e.alt; delete e.vars; delete e.varsLabel;
  EX.push(e);
})();

/* ===== brachioradiale per le trazioni: curl-rematore con manubri a presa 45°, dal reel di Michael Eckert ("Increase Pull Up Power | Brachioradialis") ===== */
(() => {
  const b = EX.find(e => e.id === 'c-hammer-db'); if (!b || EX.some(e => e.id === 'w-curl-rematore-45')) return;
  const e = Object.assign(JSON.parse(JSON.stringify(b)), {id: 'w-curl-rematore-45', n: 'Curl-rematore con manubri, presa a 45° e busto inclinato (brachioradiale per le trazioni)', varName: 'Curl-rematore a 45°',
    g: 'avambracci', g2: ['bicipiti'], m: 'Brachioradiale, brachiale, bicipiti',
    mm: 'brachioradiale, brachiale, bicipite brachiale; con i gomiti che vanno indietro anche gran dorsale e deltoide posteriore',
    presa: 'neu', dbn: true,   /* nel disegno presa a martello: e' la piu' vicina ai 45° */
    fr: [[3, 3, {t: 162}], [-25, 125, {t: 162}]],
    cap: ['Busto un po’ in avanti, braccia distese, manubri inclinati a 45°', 'Gomiti indietro e mani verso il petto basso, presa sempre a 45°'],
    trj: 'Le mani salgono verso il petto basso mentre i gomiti vanno un po’ indietro, come nella seconda metà di una trazione: è un curl con un po’ di rematore.',
    set: 'Due manubri, in piedi. Parti dalla presa a martello (manubri perpendicolari al pavimento) e ruota un po’ i polsi verso l’interno, fino a tenere i manubri inclinati di circa 45°. Busto leggermente inclinato in avanti, ginocchia morbide.',
    pos: 'Busto fermo e un po’ in avanti, schiena dritta, braccia distese lungo il corpo con la presa a 45°.',
    ese: ['Parti con le braccia distese e i manubri inclinati a 45°.', 'Piega i gomiti e portali un po’ indietro, come in un rematore: le mani salgono verso il petto basso con la presa sempre a 45°.', 'Stringi l’avambraccio 1 secondo in alto.', 'Scendi lentamente e ripeti.'],
    cue: 'La presa resta a 45° per tutta la ripetizione; i gomiti vanno indietro mentre le mani salgono, come quando porti il petto alla sbarra.',
    why: 'La presa a metà tra martello e prona mette il brachioradiale nella posizione in cui lavora di più, e i gomiti che vanno indietro con il busto inclinato ricordano la seconda metà di una trazione. Rinforza il muscolo dell’avambraccio che aiuta a tirare: trazioni più forti, come spiega il video.',
    err: ['Ruotare i polsi durante la salita: la presa deve restare a 45°', 'Dondolare con il busto per far salire i manubri', 'Gomiti fermi: senza la tirata indietro diventa un curl normale'],
    tipo: 'iso', fin: ['forza', 'massa', 'tonificare']});
  delete e.alt; delete e.vars; delete e.varsLabel; delete e.fam; delete e.famRe;
  EX.push(e);
})();

/* ===== dorsali: pulldown alla corda seduto su una panca davanti al cavo alto, dal reel di Marco Antonio Rebucci Filho ("Variação top para dorsais") ===== */
(() => {
  const b = EX.find(e => e.id === 'b-rope-lat-terra'); if (!b || EX.some(e => e.id === 'b-rope-lat-panca')) return;
  const e = Object.assign(JSON.parse(JSON.stringify(b)), {id: 'b-rope-lat-panca', n: 'Pulldown alla corda seduto su panca, davanti al cavo alto (dorsali)', varName: 'Seduto su panca',
    m: 'Gran dorsale (parte bassa), grande rotondo, bicipiti',
    st: 'seat', benchSt: 'edge', an: [180, 8], nb: true,   /* serve la panca: con “Panca” spenta negli attrezzi non viene proposto */
      /* panca piana senza schienale, torre subito davanti: il cavo scende quasi sopra la testa */
    fr: [[172, 176, {t: 184}], [8, 150, {t: 190}]],
    cap: ['Seduto a cavalcioni sulla panca, braccia distese verso la corda sopra la testa', 'Corda al petto alto, gomiti in basso lungo i fianchi'],
    trj: 'Le mani scendono quasi in verticale dalla puleggia al petto alto; i gomiti scendono vicini ai fianchi e le due estremità della corda si aprono ai lati del viso.',
    set: 'Cavo ALTO con la corda. Metti una panca piana per lungo davanti alla torre, con un’estremità quasi sotto la puleggia. Afferra le due estremità della corda in piedi (presa neutra, palmi che si guardano), poi scavalca la panca e siediti a cavalcioni sull’estremità vicina alla torre, faccia verso la torre e piedi ben piantati a terra ai lati della panca.',
    pos: 'Busto dritto, al massimo appena inclinato indietro, petto alto, scapole basse. Il cavo scende quasi in verticale sopra la testa: le braccia partono distese verso l’alto.',
    ese: ['Parti con le braccia distese sopra la testa e i dorsali ben allungati.', 'Tira i gomiti in basso verso i fianchi: le mani scendono al petto alto e la corda si apre ai lati del viso.', 'Stringi i dorsali 1 secondo.', 'Risali lentamente fino a braccia distese, senza alzarti dalla panca.'],
    cue: 'Gomiti verso le tasche: tira con i dorsali, le mani seguono.',
    why: 'Dal reel di Marco Antonio Rebucci Filho («Variação top para dorsais»). Seduto sulla panca con il cavo quasi sopra la testa la tirata è verticale come alla lat machine, ma la corda lascia scendere le mani ai lati del viso e i gomiti più in basso lungo i fianchi: il gran dorsale si accorcia di più. Basta una torre con il cavo alto e una panca piana, quindi va bene anche quando la lat machine non c’è o è occupata.',
    err: ['Inclinarsi molto indietro: diventa un rematore', 'Gomiti che si aprono di lato', 'Tirare con le braccia invece che con i gomiti', 'Non distendere del tutto in alto', 'Panca troppo lontana dalla torre: il cavo tira in avanti e ti sbilancia'],
    tipo: 'semi', fin: ['massa', 'tonificare']});
  delete e.alt; delete e.vars; delete e.varsLabel;
  EX.push(e);
})();

/* ===== schiena: sei esercizi dal video "Back ... for a V-Taper" (Gym Habit, animazioni Workout Motivation): 5 nuovi (il rematore con due manubri c'era già: b-row-db2) ===== */
(() => {
  const mk = (base, o) => { const b = EX.find(e => e.id === base); if (!b || EX.some(e => e.id === o.id)) return; const e = Object.assign(JSON.parse(JSON.stringify(b)), o); delete e.vars; delete e.varsLabel; delete e.fam; delete e.famRe; EX.push(e); };
  mk('b-row-db', {id: 'b-row-db-seduto-alt', n: 'Rematore alternato con manubri seduto sulla panca, busto inclinato', st: 'seat', benchSt: 'edge', one: true, nb: true, tipo: 'semi', fin: ['massa', 'tonificare'],
    fr: [[2, 2, {t: 120}], [-33, 21, {t: 120}], [-100, -12, {t: 120}]], tempo: [1.2, 1, 1.2],
    cap: ['Seduto sul bordo della panca, busto inclinato, manubri appesi accanto alle ginocchia', 'Un manubrio all’anca, gomito indietro vicino alle costole; l’altro braccio resta appeso'],
    trj: 'Il manubrio sale in linea retta verso l’anca; l’altro braccio resta appeso e fermo. Si alterna un braccio alla volta.',
    set: 'Siediti sul bordo di una panca piana con i piedi larghi e ben piantati a terra. Fletti il busto in avanti dalle anche fino ad avvicinare il petto alle cosce, con la schiena piatta. Un manubrio per mano, braccia distese che pendono accanto alle ginocchia, palmi che si guardano (presa neutra).',
    pos: 'Core contratto e busto fermo: la tirata la fanno i dorsali, senza dondolare con le anche.',
    ese: ['Tira un solo manubrio verso l’anca, portando quel gomito indietro e vicino alle costole, mentre l’altro braccio resta appeso.', 'Stringi forte il dorsale in alto per 1 secondo.', 'Abbassa il manubrio fino a braccio disteso.', 'Passa subito all’altro braccio e continua ad alternare a ritmo costante, con il busto inclinato e fermo, seduto sulla panca.'],
    cue: 'Il busto non si muove: se dondoli con le anche, il peso è troppo alto. Il gomito va verso la tasca posteriore.',
    why: 'Da seduto il bacino è fermo e le gambe non danno slancio: il lavoro resta sui dorsali, e alternando i lati lavori un braccio alla volta.',
    err: ['Dondolare il busto o le anche per aiutarsi', 'Tirare con il braccio invece che con il gomito', 'Schiena che si curva']});
  mk('b-row-db2', {id: 'b-braccia-tese-db', n: 'Rematore a braccia tese con manubri, fianchi alla panca inclinata (dorsali)', st: 'hinge', nb: true, tipo: 'iso', fin: ['massa', 'tonificare'], prio: false,
    m: 'Gran dorsale (isolamento), grande rotondo, tricipite lungo', mm: 'gran dorsale, grande rotondo, tricipite (capo lungo), deltoide posteriore, romboidi',
    fr: [[14, 16, {t: 90}], [-35, -32, {t: 90}], [-80, -77, {t: 90}]], tempo: [1.4, 1, 1.4],
    cap: ['Fianchi contro il bordo della panca inclinata (nel 3D la panca non c’è), braccia tese e lunghe verso il pavimento', 'Manubri alle anche con le braccia ancora tese, dorsali contratti'],
    trj: 'Un arco a braccia tese: dal pavimento, davanti a te, fino alle anche. I gomiti restano bloccati e si muove solo la spalla.',
    set: 'Panca inclinata. Mettiti dietro la panca, fletti il busto in avanti dalle anche e appoggia i fianchi al bordo superiore del cuscino, con i piedi ben piantati a terra. Un manubrio per mano, palmi che si guardano, braccia tese e lunghe verso il pavimento davanti a te.',
    pos: 'Schiena piatta e collo in linea con il busto, core contratto, fianchi premuti contro il cuscino, gomiti tesi e fissi (senza iperestenderli).',
    ese: ['Porta i manubri indietro verso le anche descrivendo un arco, con le braccia completamente tese e senza piegare i gomiti.', 'Stringi forte i dorsali quando i manubri arrivano alle anche e tieni 1 secondo.', 'Torna lentamente lungo lo stesso arco fino alla posizione di partenza, con le braccia lunghe verso il pavimento, senza farti trascinare dallo slancio prima della ripetizione successiva.'],
    cue: 'Gomiti bloccati: l’unica articolazione che si muove è la spalla. Immagina di “spazzare” i manubri verso i fianchi con i dorsali.',
    why: 'Come il pulldown a braccia tese, ma con i manubri e a busto flesso: la resistenza è massima a fine tirata, con le braccia orizzontali dietro di te. Isola il gran dorsale senza che bicipiti e avambracci possano aiutarlo.',
    err: ['Piegare i gomiti (diventa un rematore a gomiti piegati e perdi l’isolamento del dorsale)', 'Slancio con il busto', 'Schiena che si curva', 'Manubri troppo pesanti che fanno perdere la posizione dei fianchi']});
  mk('p-pullover-db', {id: 'p-pullover-bar', n: 'Pullover con bilanciere a gomiti piegati su panca piana (dorsali)', a: 'Bilanciere', eq: 'bar', g: 'schiena', g2: ['petto'], nb: true, tipo: 'semi', fin: ['massa', 'tonificare'], presa: 'pro', unCavo: undefined,
    m: 'Gran dorsale e pettorali, dentato anteriore', mm: 'gran dorsale, grande rotondo, gran pettorale (fascio costale), dentato anteriore, tricipite (capo lungo)',
    fr: [[145, 190], [190, 250], [250, 340]], gz: 26, tempo: [1.5, 0.6, 1.5],
    cap: ['Bilanciere sopra il petto, gomiti leggermente piegati', 'Bilanciere dietro la testa, braccia in linea con il busto, gomiti più piegati'],
    trj: 'Un ampio arco dal petto a dietro la testa e ritorno: le braccia si portano indietro e i gomiti si piegano un poco di più mentre il bilanciere scende.',
    set: 'Panca piana, bilanciere con i dischi ben bloccati. Sdraiato con la testa vicino al bordo della panca (il bilanciere deve poter scendere dietro la testa) e i piedi ben piantati a terra. Presa prona alla larghezza delle spalle, bilanciere sopra il petto: fattelo passare da un compagno.',
    pos: 'Gomiti leggermente piegati, senza distenderli di scatto: la piega aumenta solo un poco mentre scendi. Addome contratto e costole abbassate: la zona lombare non si stacca dalla panca.',
    ese: ['Parti con il bilanciere sopra il petto e i gomiti leggermente piegati.', 'Abbassa il bilanciere con un ampio arco all’indietro, oltre la testa, fino a circa l’altezza della panca, lasciando piegare un po’ di più i gomiti mentre scende.', 'In basso senti un forte allungamento dei dorsali: fai una breve pausa.', 'Riporta il bilanciere sopra il petto sullo stesso arco, portando i gomiti in avanti e attivando i dorsali.'],
    cue: 'Costole chiuse: se la schiena si inarca, scendi meno o alleggerisci. Il bilanciere passa sopra il viso: scegli un carico che controlli sempre.',
    why: 'Allunga e rinforza il gran dorsale e con il bilanciere puoi usare più carico che nel pullover con un solo manubrio; lavorano anche pettorali e dentato.',
    err: ['Lombare che si stacca dalla panca', 'Gomiti che si piegano troppo (diventa un’estensione per i tricipiti)', 'Carico troppo alto']});
  mk('b-lat-singolo', {id: 'b-cavo-rotazione', n: 'Tirata al cavo alto con rotazione del busto (dorsali, un braccio)', st: 'stand', one: true, an: [215, 4], az: 1.1, tipo: 'semi', fin: ['massa', 'tonificare'], prio: false,
    m: 'Gran dorsale, grande rotondo, romboidi', mm: 'gran dorsale, grande rotondo, romboidi, deltoide posteriore, bicipite brachiale',
    fr: [[135, 140, {t: 178, tw: 28, zs: 36}], [18, 85, {t: 176, tw: -26, zs: -30}]], tempo: [1.3, 0.8, 1.4],
    cap: ['Di lato alla torre, braccio disteso in alto e in diagonale, dorsale allungato', 'Maniglia all’anca opposta, gomito vicino alle costole, busto ruotato via dal cavo'],
    trj: 'Una diagonale dall’alto verso il basso davanti al corpo: la maniglia va da sopra la testa all’anca opposta mentre il busto ruota leggermente via dal cavo.',
    set: 'Cavo ALTO con maniglia singola. Mettiti di lato rispetto alla torre, con i piedi larghi come le spalle, e afferra la maniglia con la mano più vicina alla macchina: il braccio è teso in alto, in diagonale davanti al corpo.',
    pos: 'Busto ruotato leggermente verso la macchina per allungare il dorsale, petto alto, fianchi fermi, core contratto.',
    ese: ['Parti con il braccio disteso in alto, in diagonale davanti al corpo, dorsale allungato.', 'Porta la maniglia in basso, in diagonale davanti al corpo, verso l’anca opposta, ruotando il busto leggermente via dal cavo mentre tiri.', 'Stringi forte il dorsale a fine tirata per 1 secondo, con il gomito vicino alle costole.', 'Lascia che il cavo riporti lentamente braccio e busto alla posizione allungata, resistendo al carico.'],
    cue: 'Petto alto e fianchi fermi: la rotazione è lieve e viene dal busto, non dal bacino. Gomito vicino alle costole a fine tirata.',
    why: 'La tirata in diagonale e la rotazione cambiano l’angolo di lavoro del gran dorsale rispetto alla lat machine: allungamento più ampio e contrazione a fine tirata con il gomito vicino al fianco.',
    err: ['Ruotare il bacino invece del busto', 'Tirare con il braccio piegando il gomito troppo presto', 'Peso troppo alto che sposta i piedi']});
  mk('b-row-db', {id: 'b-gorilla-row', n: 'Gorilla row alternato con manubri a terra (o kettlebell)', st: 'hinge', one: true, nb: undefined, tipo: 'semi', fin: ['massa', 'tonificare'],
    fr: [[2, 2, {t: 120, h: [130, 150], th: 56, sh: -24}], [-33, 21, {t: 120, h: [130, 150], th: 56, sh: -24}], [-100, 10, {t: 120, h: [130, 150], th: 56, sh: -24}]], ko: 14, tempo: [1, 1, 1],
    cap: ['Piedi larghi, busto inclinato, mani sui due pesi a terra', 'Un peso all’altezza delle costole, gomito indietro; l’altra mano resta sul peso a terra'],
    trj: 'Il peso sale da terra verso le costole mentre l’altra mano resta sul peso a terra; poi torna a terra e tira l’altro.',
    set: 'Metti due manubri (o due kettlebell) a terra, più o meno alla larghezza delle spalle. Mettiti a cavallo dei pesi con i piedi larghi e fletti il busto in avanti dalle anche per afferrare le due impugnature. Con i manubri scegli quelli esagonali, che non rotolano.',
    pos: 'Schiena piatta, ginocchia morbide, petto leggermente sollevato, core contratto. L’altra mano resta sul peso a terra e sostiene il corpo.',
    ese: ['Tira un peso verso le costole portando il gomito indietro, mentre l’altra mano resta sul peso a terra e ti sostiene.', 'Stringi forte il dorsale in alto per 1 secondo, tenendo i fianchi alla stessa altezza.', 'Riporta il peso a terra con controllo, poi tira subito l’altro.', 'Continua ad alternare a ritmo costante, senza far salire il busto né ruotare i fianchi.'],
    cue: 'Fianchi fermi e livellati: se ruotano o il busto si alza, il peso è troppo alto.',
    why: 'Il peso torna a terra a ogni ripetizione e la mano d’appoggio ti stabilizza la schiena: lavori forte sul dorsale senza panca né rack.',
    err: ['Ruotare i fianchi per aiutarsi', 'Far salire il busto durante la tirata', 'Schiena che si arrotonda', 'Peso troppo alto']});
})();

/* ===== revisione di tutte le animazioni (v131): correzioni di posa, attrezzo e didascalie emerse dal controllo foglio per foglio ===== */
(() => {
  const g = id => EX.find(e => e.id === id), set = (id, o) => { const e = g(id); if (e) Object.assign(e, o); };
  // polsi: il verso della flessione era al contrario (inizio = mano aperta in basso, fine = pugno chiuso in alto)
  set('w-wrist-curl', {fr: [[25, 90, {t: 150, hd: -45}], [25, 90, {t: 150, hd: 40}]]});
  set('w-wrist-ext', {fr: [[25, 90, {t: 150, hd: -40}], [25, 90, {t: 150, hd: 35}]]});
  set('w-wrist-db', {fr: [[25, 90, {t: 150, hd: -45}], [25, 90, {t: 150, hd: 40}]]});
  // gomiti "leggermente piegati" davvero piegati nelle croci e nelle alzate posteriori
  set('p-croci-petto', {fr: [[102, 72, {t: 168}], g('p-croci-petto').fr[1]]});
  set('p-croci-singolo', {fr: [[102, 72, {t: 168}], g('p-croci-singolo').fr[1]]});
  set('s-posteriori', {fr: [g('s-posteriori').fr[0], [102, 72]]});
  set('s-posteriori-singolo', {fr: [g('s-posteriori-singolo').fr[0], [102, 72]]});
  set('s-posteriori-pullacross', {fr: [g('s-posteriori-pullacross').fr[0], [102, 72]]});
  set('p-croci-panca', {fr: [[172, 192], g('p-croci-panca').fr[1]]});
  set('p-croci-db', {fr: [[172, 192], g('p-croci-db').fr[1]]});
  // chest press ai cavi: partenza ai lati del petto, spinta in linea all'altezza dello sterno
  set('p-press-cavi', {fr: [[-25, 105, {t: 170}], [80, 80, {t: 170}]]});
  // press con manubri: gomiti un po' piu' aperti (manubri ai lati delle orecchie, non davanti al viso)
  set('s-press-db', {lat: 2.4});
  set('s-frontali', {cap: ['Barra davanti alle cosce, braccia distese', 'Barra all’altezza delle spalle, braccia davanti']});
  // rack pull: in alto si sta dritti (il vincolo della barra verticale piegava il busto)
  set('b-rackpull', {lin: true});
  // lat pulldown in ginocchio: busto fermo, leggermente indietro
  set('b-lat-ginocchio', {fr: [[172, 176, {t: 186}], [10, 155, {t: 186}]], cap: ['Braccia distese in alto verso la puleggia', g('b-lat-ginocchio').cap[1]]});
  set('b-lat-ginocchio-singolo', {fr: [[172, 176, {t: 184}], [10, 155, {t: 190}]], pos: 'Core contratto, bacino neutro, petto alto, glutei leggermente indietro rispetto alle ginocchia; la mano libera al fianco o al rack.'});
  // pulldown a braccia tese: puleggia sopra la testa, mani all'altezza del viso (prima la mano partiva sulla carrucola)
  set('b-pulldown-braccia-tese', {an: [250, 6], fr: [[115, 115, {t: 160}], [5, 5, {t: 166}]]});
  // curl concentrato: braccio all'interno della coscia
  set('c-concentrato', {fr: [[10, 18, {t: 140, zs: -16}], [10, 86.9, {t: 140, zs: -16}], [10, 140, {t: 140, zs: -16}]], tempo: [1.4, 0.4, 0.9]});
  // corda: presa stretta (il motore non ha una corda); al pushdown le mani si aprono in basso
  set('c-hammer', {gz: 12});
  set('t-push-corda', {gz: 12, gz2: 34});
  set('t-french-cavo', {fr: [g('t-french-cavo').fr[0], [178, 265]]});
  set('t-kickback', {tzf: 30});
  set('t-panca-stretta', {gz: 30});
  set('sm-panca-stretta', {gz: 26, lat: 1.2});
  set('t-over-db', {gz: 8, lat: 0.5, fr: [g('t-over-db').fr[0], [178, -182, {}]]});   // gomito teso in alto (non iperesteso); il fotogramma intermedio arriva dal blocco MIDS
  set('t-kickback-doppio', {fr: [[-52, 38, {t: 128}], ...g('t-kickback-doppio').fr.slice(1)]});
  // gambe
  set('g-front-squat', {fr: [g('g-front-squat').fr[0], Object.assign([], g('g-front-squat').fr[1], {2: Object.assign({}, g('g-front-squat').fr[1][2], {t: 166})})]});
  set('g-leg-ext', {fr: [[14, 22, {t: 185, sh: 0}], [14, 22, {t: 185, sh: 45.9, th: 90}], [14, 22, {t: 185, sh: 85}]], tempo: [1.1, 0.4, 1.1]});   // 3 fotogrammi espliciti (il blocco MIDS salta chi ne ha gia' 3): braccia lungo i fianchi, non gomiti al contrario
  set('g-bulgaro', {fr: [g('g-bulgaro').fr[0], [0, 0, {t: 174, h: [140, 140], th: 47, sh: -10}], g('g-bulgaro').fr[1]], tempo: [0.8, 0.4, 3]});   // a meta' corsa il piede davanti resta piatto a terra (il fotogramma MIDS lo alzava sulle punte)
  set('g-rdl', {fr: [g('g-rdl').fr[0], [0, 0, {t: 120, h: [108, 124], th: 22, sh: -4}]]});
  set('g-sumo', {gz: 6});
  set('g-squat-cavo', {tzf: 0, gz: 6, fr: [g('g-squat-cavo').fr[0], Object.assign([], g('g-squat-cavo').fr[1], {2: Object.assign({}, g('g-squat-cavo').fr[1][2], {t: 170})})]});
  set('g-rdl-cavo', {tzf: 0});
  set('g-add-cavo', {cap: [g('g-add-cavo').cap[0], 'Gamba portata davanti all’altra, fino alla linea centrale']});
  set('g-kickback-diag', {lb: 34, fr: [g('g-kickback-diag').fr[0], Object.assign([], g('g-kickback-diag').fr[1], {2: Object.assign({}, g('g-kickback-diag').fr[1][2], {ab: 30})})]});
  // addome
  set('a-crunch-cavo', {fr: [g('a-crunch-cavo').fr[0], [65, -140, {t: 128, cu: 50}]]});
  set('a-pallof', {fr: [[-50, 88, {t: 180}], g('a-pallof').fr[1]]});
  set('a-pallof-hold', {fr: [[-50, 88, {t: 180}], [-50, 88, {t: 180}]]});
  set('a-woodchop', {fr: [g('a-woodchop').fr[0], [16, 24, {t: 160, tw: -42, zs: -58}]]});
  set('a-woodchop-basso', {fr: [[16, 24, Object.assign({}, g('a-woodchop-basso').fr[0][2])], g('a-woodchop-basso').fr[1]]});
  set('a-leg-raise', {fr: [g('a-leg-raise').fr[0], [-90, -90, {h: [185, 178], th: 172, sh: 172, lift: 7}]]});
  set('a-rollout', {fr: [g('a-rollout').fr[0], [50, 50, {h: [132, 182], t: 105, th: -45, sh: -90}]]});
  // schiena: barra davanti all'addome, non dentro
  set('b-row-barra-sup', {fr: [g('b-row-barra-sup').fr[0], [-67, 14, {t: 135}]]});
  set('b-row-barra-pro', {fr: [g('b-row-barra-pro').fr[0], [-76, 40, {t: 135}]]});
  set('b-row-terra', {fr: [[62, 62, {t: 168}], g('b-row-terra').fr[1]]});
  set('b-row-terra-singolo', {fr: [[62, 62, {t: 168}], g('b-row-terra-singolo').fr[1]]});
  set('b-shrug-cavo', {an: [255, 212], fr: [[8, 8], [8, 8, {tl: 64}]], cap: ['Spalle rilassate, barra del cavo davanti alle cosce', g('b-shrug-cavo').cap[1]]});
  set('s-laterali-doppio', {cross: true, pos: 'Busto dritto e fermo, gomiti leggermente piegati, mani in presa neutra.'});
  set('sm-row', {pos: 'Piedi alla larghezza delle anche, ginocchia morbide, busto inclinato a circa 60° dalla verticale (come nel rematore con bilanciere), schiena neutra, sguardo verso il pavimento poco davanti ai piedi.', cap: ['Busto inclinato, braccia distese: la barra pende davanti alle cosce, sulla verticale dell’addome', g('sm-row').cap[1]]});
  // seconda tornata: schiena, braccia, trazioni, addome a terra
  set('b-row-corda', {fr: [[60, 60, {t: 168}], g('b-row-corda').fr[1]]});
  set('t-dip-panca', {fr: [[-10, -10, {h: [150, 150], t: 184, th: 52, sh: 24}], [-48, 5, {h: [160, 164], t: 185.2, th: 74, sh: 8}], [-80, 10, {h: [168, 176], t: 186, th: 92, sh: -10}]], mm: 'Tricipite brachiale, grande pettorale (fasci inferiori), deltoide anteriore'});
  set('c-curl-db-seduto', {gz: 32});
  set('c-hammer-cross', {fr: [[5, 5], [12, 140, {zs: -32}]]});
  set('b-trazioni-larga', {fr: [[180, 180, {t: 180, th: 22, sh: -88}], [110, 117.6, {t: 183, th: 22, sh: -88, h: [146, 122]}], [40, 160, {h: [140, 95], t: 185, th: 22, sh: -88}]]});
  set('b-trazioni-stretta', {fr: [[180, 180, {t: 180, th: 22, sh: -88}], [111.5, 111.5, {t: 183, th: 22, sh: -88, h: [146, 122]}], [25, 170, {h: [140, 95], t: 185, th: 22, sh: -88}]]});
  set('b-trazioni-neutra', {fr: [[180, 180, {t: 180, th: 22, sh: -88}], [99.4, 201.4, {t: 183, th: 22, sh: -88, h: [146, 122]}], [25, 170, {h: [140, 95], t: 185, th: 22, sh: -88}]]});
  set('b-trazioni-negative', {fr: [[25, 170, {h: [140, 95], t: 185, th: 22, sh: -88}], [180, 180, {t: 180, th: 22, sh: -88}]]});
  set('b-trazioni-elastico', {fr: [[180, 180, {t: 180, th: 22, sh: -88}], [111.6, 194.1, {t: 183, th: 22, sh: -88, h: [146, 122]}], [25, 170, {h: [140, 95], t: 185, th: 22, sh: -88}]]});
  set('j-press-stretta', {lat: 0.4});
  set('j-press-piedi', {cap: ['Impugnature all’altezza delle spalle, busto leggermente avanti', g('j-press-piedi').cap[1]]});
  set('j-press-piedi-singolo', {cap: ['Impugnatura all’altezza della spalla, busto fermo e leggermente avanti', g('j-press-piedi-singolo').cap[1]]});
  set('j-stacco', {fr: [g('j-stacco').fr[0], [10, 10, {t: 135, h: [115, 120], th: 25, sh: -5}]]});
  set('a-crunch-inverso', {fr: [[90, 90, {h: [150, 197], t: 270, th: 180, sh: 90}], g('a-crunch-inverso').fr[1]]});
  set('a-bicicletta', {rl: [242, 181], fr: [Object.assign([], g('a-bicicletta').fr[0], {2: Object.assign({}, g('a-bicicletta').fr[0][2], {tw: 30})}), Object.assign([], g('a-bicicletta').fr[1], {2: Object.assign({}, g('a-bicicletta').fr[1][2], {tw: -30})})], cap: ['Gomito sinistro verso il ginocchio destro, gamba sinistra distesa', g('a-bicicletta').cap[1]]});
  set('a-sforbiciate', {rl: [233, 153], fr: [g('a-sforbiciate').fr[0], [90, 90, {h: [150, 197], t: 270, th: 130, sh: 130}]]});
  set('a-hollow', {fr: [[-120, -120, {h: [150, 203], t: 250, cu: 20, th: 112, sh: 112}], [-120, -120, {h: [150, 203], t: 248, cu: 22, th: 118, sh: 118}]]});
  set('a-dead-bug', {rl: [166, 109], fr: [g('a-dead-bug').fr[0], [-100, -100, {h: [150, 202], t: 270, th: 110, sh: 110}]]});
  set('a-vup', {fr: [[-100, -100, {h: [150, 197], t: 270, th: 95, sh: 95}], g('a-vup').fr[1]]});
  set('a-situp', {fr: [[104, -92, {h: [150, 197], t: 270, th: 125, sh: 45}], [-6, -202, {h: [150, 197], t: 160, th: 125, sh: 45}]]});
  set('a-plank', {fr: [[0, 90, {h: [152, 200], t: 105, th: -70, sh: -75, lift: 0}], [0, 90, {h: [152, 194], t: 105, th: -75, sh: -75, lift: 0}]]});
  set('a-mountain', {rl: [66, 213], fr: [[0, 0, {h: [150, 172], t: 112, th: -64, sh: -64}], [0, 0, {h: [150, 160], t: 104, th: 45, sh: -80}]]});
  set('a-russian-twist', {fr: [[80, 85, {h: [112, 204], t: 220, th: 110, sh: 60, tw: 45, zs: 40}], [80, 85, {h: [112, 204], t: 220, th: 110, sh: 60, tw: -45, zs: -40}]]});
  set('a-situp-db', {lat: 2.2, fr: [[59, -152, {h: [150, 197], t: 270, th: 125, sh: 45}], [-51, -262, {h: [150, 197], t: 160, th: 125, sh: 45}]]});
  set('a-ginocchia-sbarra', {fr: [g('a-ginocchia-sbarra').fr[0], [176, 176, {t: 188, h: [144, 142], th: 118, sh: 28}]]});
  // testi: esercizi a un braccio con didascalie al plurale, refusi
  set('p-jammer-press', {err: g('p-jammer-press').err.map(x => x.replace('Spingere con una sola braccia più dell’altra', 'Spingere con un solo braccio più dell’altro'))});
  set('j-incl', {err: g('j-incl').err.map(x => x.replace('Spingere con una sola braccia più dell’altra', 'Spingere con un solo braccio più dell’altro'))});
  set('c-curl-alti-singolo', {pos: 'Braccio a T, gomito all’altezza della spalla e fermo, petto alto; l’altra mano sul fianco.', cue: 'Il gomito resta alto e fermo; porta la mano vicino all’orecchio.'});
  set('b-lat-supina', {ese: g('b-lat-supina').ese.map(x => x.replace('Tira il triangolo verso lo sterno', 'Tira la barra verso la parte alta del petto, portando i gomiti in basso e indietro'))});
  set('s-posteriori-singolo', {pos: 'Piedi alla larghezza delle spalle, petto alto, gomito leggermente piegato; l’altra mano sul fianco.', cue: 'Apri il gomito verso l’esterno e porta il braccio indietro, senza sollevare la spalla.'});
  set('t-overhead-singolo', {cap: ['Gomito in alto, mano dietro la testa', 'Braccio disteso sopra la testa'], trj: 'Il gomito resta fermo in alto vicino all’orecchio: si muove solo l’avambraccio, che da dietro la testa ruota fino a braccio disteso.'});
  set('j-row-singolo', {cap: ['Impugnatura davanti al ginocchio, braccio disteso', 'Gomito indietro e in alto, impugnatura all’anca']});
  set('c-hammer-singolo', {cap: ['Maniglia lungo la coscia, presa neutra', 'Mano alla spalla, polso dritto']});
  set('t-push-prono-singolo', {cap: ['Gomito a 90° lungo il fianco', 'Braccio disteso, maniglia alla coscia']});
  set('b-lat-singolo', {cap: ['Braccio disteso, maniglia sopra la testa', 'Maniglia alla spalla, gomito lungo il fianco']});
  set('s-press-cavo-singolo', {cap: ['Maniglia all’altezza della spalla, avambraccio verticale', 'Braccio disteso sopra la testa']});
  set('p-incl-cavo-singolo', {cap: ['Maniglia al lato del petto alto, gomito basso', 'Braccio disteso sopra il petto'], ese: g('p-incl-cavo-singolo').ese.map((x, i) => i === 0 ? 'Parti con la maniglia all’altezza del petto alto.' : x)});
  set('c-curl-panca-cavo-singolo', {cap: ['Braccio disteso, bicipite in allungamento', 'Maniglia alla spalla'], ese: g('c-curl-panca-cavo-singolo').ese.map((x, i) => i === 0 ? 'Parti con il braccio disteso e il bicipite ben allungato.' : i === 1 ? 'Fletti il gomito portando la maniglia alla spalla, palmo verso l’alto.' : x)});
})();

/* ===== revisione delle animazioni, terza tornata (v133): manubri, tenute a terra, corpo libero ===== */
(() => {
  const g = id => EX.find(e => e.id === id), set = (id, o) => { const e = g(id); if (e) Object.assign(e, o); };
  const rep = (id, f, a, b) => { const e = g(id); if (e && Array.isArray(e[f])) e[f] = e[f].map(x => x === a ? b : x); };
  // addome
  set('a-situp-panca', {fr: [g('a-situp-panca').fr[0], [40, -210, {h: [185, 178], t: 160, cu: 25, th: 125, sh: 45}]]});   // si arrotola, non sale rigido
  set('a-boat', {fr: [g('a-boat').fr[0], [80, 80, {h: [112, 204], t: 140, th: 138, sh: 95}]]});   // V leggibile: busto indietro, tibie parallele al pavimento
  set('a-l-sit', {dipY: 200, fr: [[0, 0, {h: [150, 190], t: 180, th: 100, sh: 40}], [0, 0, {h: [150, 190], t: 180, th: 90, sh: 90}]], set: 'Parallele basse (parallettes) a terra. Mani sulle impugnature, braccia tese, spalle basse.', cue: 'Spingi le mani nelle impugnature e allontana le spalle dalle orecchie.'});
  set('a-pallof-hold', {fr: [[-50, 88, {t: 180}], [88, 90, {t: 180}]]});   // mani al petto, poi braccia distese davanti allo sterno: la tenuta si vede
  set('a-bird-dog-hold', {one: true, rl: [57, 160], fr: [[88, 88, {h: [150, 160], t: 92, th: 24, sh: -66}], [88, 88, {h: [150, 160], t: 92, th: 24, sh: -66}]], cap: ['Da quadrupedia: braccio destro avanti, gamba sinistra indietro', 'Tenuta: braccio e gamba opposti distesi in linea con la schiena']});
  // spalle e trapezio
  set('s-frontali-db', {trj: 'Arco in avanti: i manubri salgono davanti al corpo fino all’altezza delle spalle, braccia quasi tese, senza slancio del busto.'});
  set('s-laterali-db', {fr: [[12, 27, {t: 173}], [90, 110, {t: 173}]], cap: ['Manubri ai fianchi, gomiti leggermente piegati', 'Braccia aperte all’altezza delle spalle, gomiti leggermente piegati']});
  set('s-upright-db', {cap: ['Manubri davanti alle cosce, braccia distese', 'Manubri al petto alto, gomiti alti e larghi all’altezza delle spalle'], trj: 'I manubri salgono verticali, aderenti al corpo, dalle cosce al petto alto; sono i gomiti a guidare, salgono in fuori e in alto fino all’altezza delle spalle.'});
  set('b-shrug-db', {cap: ['Spalle rilassate, manubri ai fianchi a braccia tese', 'Spalle alzate verso le orecchie']});
  // petto e tricipiti su panca
  set('p-panca-db', {m: 'Pettorali, deltoidi anteriori, tricipiti', mm: 'grande pettorale (fascio sternale e clavicolare), deltoide anteriore, tricipite brachiale, dentato anteriore', pos: 'Schiena e scapole ben appoggiate alla panca, petto alto, piedi a terra. Polsi dritti, palmi in avanti o leggermente neutri.'});
  rep('p-panca-db', 'err', 'Panca troppo inclinata', 'Discesa incontrollata');
  rep('p-panca-db', 'err', 'Scapole che si sollevano dallo schienale', 'Scapole che si sollevano dalla panca');
  set('p-croci-db', {gz: 22, gz2: 85, fr: [[172, 192], [140.6, 204.6, {}], [65.5, 209.8]], fr2d: [[172, 192], [150, 172, {}], [128, 150]]});   // nel 2D di lato le braccia aperte non si vedono: arco sopra il petto senza entrare nella panca   // le mani si aprono di lato: braccia aperte ad arco all’altezza del petto, non una spinta
  set('p-croci-panca', {gz: 22, gz2: 85, fr: [[172, 192], [65.5, 209.8]], fr2d: [[172, 192], [128, 150]], due: true, unCavo: undefined});   // due cavi bassi, una maniglia per mano, braccia che si aprono di lato
  EX.forEach(e => { if (e.eq !== 'cable') delete e.unCavo; });   // il segno "basta un cavo" era rimasto su esercizi copiati da quelli ai cavi
  set('t-skull-db', {fr: [[192, 195], [190, 232, {}], [188, 270]]});   // braccia verso la testa, manubri che scendono ai lati della testa
  set('p-pullover-db', {gz: 4});   // un solo manubrio tenuto con due mani
  // gambe e schiena con manubri
  set('g-rdl-db', {fr: [[0, 0, {t: 178}], [0, 0, {t: 148, h: [132, 125], th: 14, sh: -6}], [0, 0, {t: 112, h: [110, 132], th: 30, sh: -6}]], cap: ['In piedi, manubri ai lati delle cosce', 'Busto inclinato, manubri sotto le ginocchia lungo le gambe'], set: 'Due manubri ai lati delle cosce, piedi alla larghezza del bacino, ginocchia leggermente flesse.'});
  set('g-stacco-db', {m: 'Glutei, quadricipiti, femorali, erettori spinali', fr: [[0, 0, {t: 178}], [0, 0, {t: 153, h: [138, 140], th: 41, sh: -14}], [0, 0, {t: 128, h: [126, 166], th: 82, sh: -28}]]});   // i manubri arrivano vicino alle caviglie
  set('g-hipthrust-db', {fr: [[35, 112, {h: [180, 200], t: 236, th: 122, sh: 5}], [65, 142, {h: [183, 175], t: 266.1, th: 102, sh: 7}], [72, 148, {h: [183, 170], t: 272, th: 98, sh: 3}]]});   // gomiti piegati e mani sul basso ventre: il manubrio si vede sul bacino
  set('g-affondi-db', {cap: ['Passo avanti con i manubri ai lati', 'Ginocchio dietro quasi a terra, poi passo successivo']});
  set('b-row-db-panca', {cap: ['Petto sulla panca inclinata, manubri appesi (il 3D mostra la versione in piedi, senza panca)', 'Manubri ai fianchi, scapole strette']});
  // Smith machine
  set('sm-bulgaro', {pos: 'Piede anteriore a ~60-70 cm dalla panca, busto dritto: la barra guidata lo tiene in verticale.'});
  rep('sm-good-morning', 'ese', 'Scendi finché senti tirare i femorali (busto quasi parallelo).', 'Scendi finché senti tirare i femorali (busto a circa 45°, mai oltre l’orizzontale).');
  // corpo libero
  set('cl-pushup-ginocchia', {pos: 'Testa, bacino e ginocchia in linea; addome e glutei contratti.'});
  set('cl-pushup-incl', {bench: [178, 226, 192], fr: [[0, 0, {h: [150, 155], t: 130, th: -50, sh: -50}], [-47.8, 25.9, {h: [156.8, 164.2], t: 123, th: -57, sh: -57}], [-96.9, 17.5, {h: [165.2, 180.2], t: 112, th: -68, sh: -68}]]});   // mani ferme sulla panca, il corpo ruota attorno alle caviglie e il petto arriva al bordo
  set('g-stepup-db', {sup: true, bench: [180, 240, 205], fr: [[0, 0, {t: 178, h: [150, 128], th: 65, sh: 10}], [0, 0, {t: 178, h: [150, 128], th: 2, sh: 0}]], cap: ['Ginocchio alto: il piede va sulla panca', 'Gamba distesa: spingi sul piede sulla panca e sali']});
  delete g('g-stepup-db').rl;   // la gamba dietro pende libera mentre sali: prima restava ancorata a terra e si allungava
  set('cl-pushup-decl', {bench: [36, 90, 199], fr: [[0, 0, {h: [150, 150], t: 80, th: -78, sh: -78}], [-60, 5, {h: [154, 160], t: 74, th: -84, sh: -84}]], set: 'Tappetino a terra, panca piana dietro di te. Piedi sulla panca, mani a terra poco più larghe delle spalle sotto il petto, corpo in linea.'});
  set('cl-pike', {fr: [[50, 50, {h: [150, 140], t: 50, th: -29, sh: -29}], [32, 69, {h: [153, 144], t: 50, th: -33, sh: -33}], [15, 88, {h: [157, 148], t: 50, th: -38, sh: -38}]]});   // V rovesciata vera: mani e piedi a terra, bacino al vertice
  const libero = 'Piedi alla larghezza delle spalle o poco più, punte leggermente aperte. Petto alto, core contratto, braccia libere di oscillare.';
  set('cl-squat', {pos: 'Piedi alla larghezza delle spalle o poco più, punte leggermente aperte. Braccia avanti, petto alto, core contratto.', trj: 'Il corpo scende e sale in verticale con il peso sulla metà del piede; le braccia restano avanti per bilanciare, il busto si inclina un po’ ma non va avanti né indietro.'});
  const salto = [[-35, -35, {t: 160, h: [125, 140.5], th: 55, sh: -20, ft: 20}], [5, 5, {t: 171, h: [137, 125], th: 28, sh: -9, ft: 9}], [110, 110, {t: 182, lift: 26, th: 2, sh: 2}]];   // ft = -sh: pianta del piede piatta anche con la tibia inclinata   // mezzo squat con le braccia indietro, poi salto con le braccia avanti
  set('cl-jump-squat', {fr: salto.map(f => JSON.parse(JSON.stringify(f))), pos: libero, trj: 'Scendi in un mezzo squat con le braccia indietro, poi distendi tutto il corpo in verticale nel salto mentre le braccia vanno avanti e in alto; atterra morbido nello stesso punto.'});
  set('cl-box-jump', {bench: [200, 262, 188, 60], jump: true, fr: [[-35, -35, {t: 160, h: [125, 140.5], th: 55, sh: -20, ft: 20}], [5, 5, {t: 171, h: [137, 128], th: 28, sh: -9, lift: 4, ft: 9}], [110, 110, {t: 176, h: [145, 86], th: 60, sh: -10, ft: 25}], [60, 60, {t: 160, h: [206.7, 102], th: 55, sh: -20, ft: 20}]], pos: libero, cap: ['Mezzo squat davanti alla panca, braccia indietro', 'Salto in avanti-alto e atterraggio sulla panca in mezzo squat, con tutto il piede'], trj: 'Carica con un mezzo squat e le braccia indietro, poi salta in avanti-alto distendendo tutto il corpo e atterra sulla panca in posizione di squat, con tutto il piede.'});
  set('cl-affondo', {set: 'Piedi alla larghezza del bacino, braccia rilassate lungo i fianchi.'});
  set('cl-bulgaro', {set: 'Panca piana dietro di te, collo del piede appoggiato, braccia rilassate lungo i fianchi.'});
  set('cl-pistol', {fr: [g('cl-pistol').fr[0], [88, 90, {t: 165, h: [128, 152], th: 55, sh: -20}], g('cl-pistol').fr[1]]});   // a metà discesa il piede d’appoggio resta a terra
  set('cl-ponte', {fr: [[90, 90, {h: [150, 197], t: 270, th: 125, sh: 40}], [90, 90, {h: [150, 194], t: 267.8, th: 121.9, sh: 41.8}], [90, 90, {h: [150, 178], t: 258, th: 108, sh: 55}]]});   // braccia appoggiate lungo i fianchi (prima puntavano dentro il pavimento)
  set('cl-wall-sit', {wall: 134, fr: [[0, 0, {t: 180, h: [150, 170], th: 90, sh: 0}], [0, 0, {t: 180, h: [150, 170], th: 90, sh: 0}]], trj: 'Nessun movimento: schiena appoggiata al muro, cosce parallele al pavimento e ginocchia a 90° sopra le caviglie.'});   // tibie verticali e muro dietro la schiena
  set('cl-stepup', {sup: true, bench: [180, 240, 205], fr: [[0, 0, {t: 178, h: [150, 128], th: 65, sh: 10}], [0, 0, {t: 178, h: [150, 128], th: 2, sh: 0}]], cap: ['Ginocchio alto: il piede va sulla panca', 'Gamba distesa: spingi sul piede sulla panca e sali']});
  delete g('cl-stepup').rl;
  set('cl-donkey-kick', {trj: 'La gamba sale all’indietro con il ginocchio piegato a 90°, la pianta del piede spinge verso il soffitto; schiena e bacino restano fermi.'});
  set('cl-fire-hydrant', {trj: 'Il ginocchio piegato si apre di lato fino all’altezza dell’anca e torna giù; busto e bacino restano fermi.'});
  set('cl-superman', {trj: 'Braccia, petto e gambe si sollevano insieme di pochi centimetri dal tappetino e tornano giù lentamente.'});
  set('sm-row-basso', {gz: 26});   // presa stretta, mani alla larghezza dei fianchi
  set('sm-row-largo', {gz: 56, trj: 'La barra sale e scende in verticale, guidata dai binari. Il busto resta inclinato e fermo: con la presa larga la barra sale verso lo sterno, gomiti larghi e in fuori.'});
  set('sm-neck-pull', {trj: 'La barra sale verticale, aderente al corpo, dalle cosce alle clavicole; sono i gomiti a guidare, salgono in fuori e in alto fin sopra le spalle.'});
})();

/* ===== MIDS: fotogramma intermedio e ritmo reale ricavati dai video (MediaPipe) - generato da mids.js, non modificare a mano ===== */
(() => { const M = {"sm-squat":{"tempo":[1,0.4,1],"mid":[-70,118,{"t":165.4,"th":52.7,"sh":-28.9,"h":[132,145]}]},"c-curl-singolo":{"tempo":[1.1,0.4,1.1],"mid":[8,78.7,{}]},"c-curl-bar":{"tempo":[1.3,0.4,1.1],"mid":[11.7,102.2,{}]},"g-leg-ext":{"tempo":[1.1,0.4,1.1],"mid":[30,10,{"t":185,"sh":45.9,"th":90}]},"t-dip-panca":{"tempo":[1.1,0.4,0.9],"mid":[-45.7,-9.3,{"h":[150,167],"t":185.2,"th":95,"sh":0}]},"p-croci-db":{"tempo":[1.5,0.4,1.4],"mid":[146.9,152.6,{}]},"b-row-db2":{"tempo":[0.6,0.4,0.6],"mid":[-51.3,-22.3,{"t":115,"th":14,"sh":-6}]},"cl-pushup":{"tempo":[1.6,0.4,3],"mid":[-31.9,24.4,{"h":[150,183],"t":92,"th":-58,"sh":-58}]},"c-incl":{"tempo":[1,0.4,1.2],"mid":[-5,56.4,{}]},"sm-hip-thrust":{"tempo":[1.9,0.4,1.2],"mid":[68,68,{"h":[180,175],"t":265.8,"th":102.1,"sh":-0.3}]},"b-row-db":{"tempo":[1.2,0.4,0.9],"mid":[-32.7,21.4,{"t":112}]},"b-trazioni-larga":{"tempo":[3,0.4,0.8],"mid":[110,117.6,{"t":180,"th":22,"sh":-88,"h":[156,106]}]},"t-dip":{"tempo":[1.2,0.4,0.9],"mid":[-22.6,33.2,{"h":[150,115],"t":174.4,"th":25,"sh":-70}]},"t-kickback-db":{"tempo":[2.4,0.4,1],"mid":[-88,-81.4,{"t":100}]},"g-stacco-db":{"tempo":[1.8,0.4,1.6],"mid":[0,0,{"t":161.7,"h":[136,132],"th":30,"sh":-7}]},"c-hammer-db":{"tempo":[1.3,0.4,1]},"t-skull-db":{"tempo":[1.6,0.4,1],"mid":[172.7,255.7,{}]},"c-concentrato":{"tempo":[1.4,0.4,0.9],"mid":[10,86.9,{"t":140}]},"g-sumo":{"tempo":[1,0.4,1]},"b-trazioni":{"tempo":[0.9,0.4,1.1],"mid":[103.6,212.8,{"t":180,"th":22,"sh":-88,"h":[153,128]}]},"c-curl-cavo":{"tempo":[1,0.4,1.1],"mid":[8.1,76,{}]},"t-push-corda":{"tempo":[1.1,0.4,1],"mid":[-4,56,{"t":168}]},"g-affondi-db":{"tempo":[0.9,0.4,1]},"c-curl-db":{"tempo":[1.3,0.4,1]},"g-stepup-db":{"tempo":[1,0.4,1]},"g-hipthrust-db":{"tempo":[2,0.4,1],"mid":[88.7,88.7,{"h":[183,175],"t":266.1,"th":102,"sh":7}]},"g-rdl-db":{"tempo":[1,0.4,1],"mid":[0,0,{"t":152,"h":[133,122],"th":15.2,"sh":-5.8}]},"sm-rdl":{"tempo":[1.3,0.4,1.4],"mid":[0,0,{"t":148.9,"h":[129,122],"th":17.1,"sh":-6.3}]},"g-split":{"tempo":[3,0.4,1],"mid":[0,0,{"t":177.3,"h":[135,127],"th":18.4,"sh":-49.6}]},"cl-pushup-ginocchia":{"tempo":[3,0.4,0.8],"mid":[-7.2,-2.7,{"h":[150,182],"t":92,"th":-66,"sh":30}]},"g-bulgaro":{"tempo":[0.8,0.4,3],"mid":[0,0,{"t":176.5,"h":[140,128],"th":27.3,"sh":-54.1}]},"b-row-db-panca":{"tempo":[1.3,0.4,1],"mid":[-68.6,-34.4,{"t":115,"th":14,"sh":-6}]},"t-over-db":{"tempo":[1.6,0.4,0.9],"mid":[175,-159.9,{}]},"sm-row-inverso":{"tempo":[1.7,0.4,1.6],"mid":[135.4,187.6,{"h":[150,173],"t":241,"th":71,"sh":71}]},"t-push-barra":{"tempo":[1.1,0.4,1.2],"mid":[-4,20.7,{"t":168}]},"g-leg-curl":{"tempo":[1.1,0.4,1.1],"mid":[48,112,{"t":170,"sh":-25,"th":0}]},"g-hip-thrust":{"tempo":[3,0.4,1],"mid":[0,0,{"h":[183,171],"t":270.5,"th":99,"sh":2.5}]},"p-floor-press-db":{"tempo":[0.6,0.4,1.1],"mid":[123.5,162.8,{"h":[150,197],"t":270,"th":125,"sh":40}]},"cl-bulgaro":{"tempo":[1.2,0.4,0.9],"mid":[0,0,{"t":177.5,"h":[140,122],"th":18.9,"sh":-15.5}]},"cl-affondo":{"tempo":[2,0.4,1.2],"mid":[0,0,{"t":175.2,"h":[135,142],"th":43.1,"sh":-13.3}]},"cl-jump-squat":{"tempo":[1,0.4,1.2],"mid":[20,20,{"t":155.1,"h":[118,156],"th":67.5,"sh":-27.5,"lift":13}]},"cl-squat":{"tempo":[1.5,0.4,1.8],"mid":[88,90,{"t":173,"h":[143,126],"th":14.3,"sh":-0.8}]},"cl-pistol":{"tempo":[1.5,0.4,1.4],"mid":[88,90,{"t":153.1,"h":[116,170],"th":89.8,"sh":40.3}]},"b-trazioni-elastico":{"tempo":[1.6,0.4,1.8],"mid":[111.6,194.1,{"t":180,"th":22,"sh":-88,"h":[154,125]}]},"b-trazioni-stretta":{"tempo":[0.6,0.4,1.3],"mid":[111.5,111.5,{"t":180,"th":22,"sh":-88,"h":[154,125]}]},"b-trazioni-neutra":{"tempo":[0.9,0.4,1],"mid":[99.4,201.4,{"t":180,"th":22,"sh":-88,"h":[154,125]}]},"c-chinup":{"tempo":[1.9,0.4,0.9],"mid":[66.9,211.9,{"t":180,"th":22,"sh":-88,"h":[152,139]}]},"cl-ponte":{"tempo":[1.4,0.4,0.9],"mid":[0,0,{"h":[150,194],"t":267.8,"th":121.9,"sh":41.8}]},"cl-pushup-diamante":{"tempo":[1.8,0.4,1.3],"mid":[-38.4,-7,{"h":[150,168],"t":92,"th":-58,"sh":-58}]},"cl-pushup-incl":{"tempo":[1.4,0.4,2.1],"mid":[-15.3,17.1,{"h":[150,155],"t":112,"th":-40,"sh":-40}]},"cl-pike":{"tempo":[1.3,0.4,1.5],"mid":[-23.6,25.4,{"h":[150,124],"t":50,"th":-100,"sh":-100}]},"cl-box-jump":{"tempo":[1.8,0.4,1.2],"mid":[12.9,12.9,{"t":150,"h":[112,163],"th":80,"sh":-15,"lift":13}]}};
  Object.entries(M).forEach(([id, m]) => { const e = EX.find(x => x.id === id); if (!e) return; if (!e.tempo) e.tempo = m.tempo; if (m.mid && e.fr.length === 2) e.fr = [e.fr[0], m.mid, e.fr[1]]; }); })();

/* ===== Reformer (lettino Pilates): attrezzo nuovo, 19 esercizi classici. Il carrello scorre con il corpo, le molle fanno da carico.
   Le pose si calcolano qui con la stessa geometria del motore 3D (coscia 46, tibia 48, braccio 35, avambraccio 34, busto 58):
   piedi o mani sulla barra, ginocchia e bacino sul carrello. ex.ref descrive il lettino (vedi figure3d.js, refPrims). ===== */
(() => {
  if (EX.some(e => e.id === 'rf-footwork')) return;
  const U = {TH: 46, SH: 48, UA: 35, FA: 34, TL: 58}, D = Math.PI / 180;
  const dir = a => [Math.sin(a * D), Math.cos(a * D)], add = (p, l, a) => { const d = dir(a); return [p[0] + l * d[0], p[1] + l * d[1]]; };
  const ang = (p, q) => Math.atan2(q[0] - p[0], q[1] - p[1]) / D;   // q = p + L*dir(ang)
  const ik2 = (a, b, l1, l2, pick) => { const dx = b[0] - a[0], dy = b[1] - a[1], d0 = Math.hypot(dx, dy), d = Math.min(d0, l1 + l2 - .01), x = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - x * x)), ux = dx / d0, uy = dy / d0;
    const c1 = [a[0] + x * ux - h * uy, a[1] + x * uy + h * ux], c2 = [a[0] + x * ux + h * uy, a[1] + x * uy - h * ux]; return pick(c1, c2); };
  const up = (c1, c2) => c1[1] < c2[1] ? c1 : c2, back = (c1, c2) => c1[0] < c2[0] ? c1 : c2;
  const legTo = (H, A) => { const K = ik2(H, A, U.TH, U.SH, up); return [ang(H, K), ang(K, A)]; };
  const pts = f => { const q = Object.assign({ft: 0, cu: 0}, f[2]), H = q.h, S = q.cu ? add(add(H, U.TL / 2, q.t + q.cu), U.TL / 2, q.t) : add(H, U.TL, q.t), K = add(H, U.TH, q.th), A = add(K, U.SH, q.sh), E = add(S, U.UA, f[0]), W = add(E, U.FA, f[1]);
    const fd = q.sh + 74 + q.ft; return {H, S, K, A, W, toe: add(add(A, 15, fd), 8, q.sh), heel: add(add(A, 2, fd), 9, q.sh), arch: add(add(A, 8, fd), 9, q.sh)}; };
  const RX = d => d > 0 ? 32 : 268;   // lettino centrato sulla pedana: montanti a x=32 (barra a destra) o a x=268 (barra a sinistra)
  const r1 = v => Math.round(v * 10) / 10;
  const shift = (fr, dx) => fr.map(f => [r1(f[0]), r1(f[1]), Object.fromEntries(Object.entries(Object.assign({}, f[2], {h: [f[2].h[0] + dx, f[2].h[1]]}, f[2].rlx !== undefined ? {rlx: f[2].rlx + dx} : {})).map(([k, v]) => [k, Array.isArray(v) ? v.map(r1) : typeof v === 'number' ? r1(v) : v]))]);
  const onBar = (fr, d, part) => { const c = pts(fr[0])[part]; return {fr: shift(fr, RX(d) + 207 * d - c[0]), bar: r1(c[1])}; };   // la barra va dove il primo fotogramma la tocca (avampiede, tallone)
  const atU = (fr, d, part, u) => shift(fr, RX(d) + u * d - pts(fr[0])[part][0]);   // la parte del corpo del primo fotogramma al punto u del lettino (montanti = 0, barra = 207)
  const HOME = 70;   // bordo del carrello verso i montanti quando l'esercizio parte
  const CT = {kneel: [0, .85, 5.0], stand: [0, .85, 5.0], seat: [0, .62, 4.7]};
  const MOLLE = 'Le molle sono il carico: per le spinte con le gambe e le tirate con le braccia più molle = più fatica; negli esercizi in appoggio sulla barra (plank, ginocchia, elephant) meno molle = carrello più instabile, quindi più lavoro per l’addome.';
  const R = o => { EX.push(Object.assign({a: 'Reformer', tipo: 'core', fin: ['tonificare', 'massa'], benchSt: 'none', prio: false, tempo: [1.8, .4, 2.2], ct: CT[o.st] || [0, .5, 4.6]}, o)); };
  const LIE = {t: 270}, Y = {lie: 175, knee: 180, ank: 178, seat: 177};
  const SUP = 'Sdraiati supino sul carrello, testa sul poggiatesta e spalle contro i poggiaspalle.';

  // ---- supino, piedi sulla barra ----
  [['rf-footwork', 'toe', 8, 'Footwork sulle punte (leg press al reformer)', 'reformer footwork toes', 'l’avampiede (la parte sotto le dita) sulla barra, talloni sollevati e fermi', 'Quadricipiti, glutei, polpacci', 'quadricipite femorale, grande gluteo, ischiocrurali, tricipite della sura (polpacci) che tiene i talloni alti'],
   ['rf-footwork-talloni', 'heel', -12, 'Footwork sui talloni (leg press al reformer)', 'reformer footwork heels', 'i talloni sulla barra, dita dei piedi rivolte in alto', 'Glutei, femorali, quadricipiti', 'grande gluteo, ischiocrurali, quadricipite femorale']].forEach(([id, c, ft, n, yq, piedi, m, mm]) => {
    const B = onBar([[92, 92, {...LIE, h: [0, Y.lie], th: 160, sh: 62, ft}], [92, 92, {...LIE, h: [0, Y.lie], th: 103, sh: 103, ft}]], 1, c);
    R({id, n, yq, g: 'gambe', m, mm, st: 'lie', fr: B.fr, tempo: [1.4, .3, 1.8], molle: 'pesanti (es. 3 rosse o 3 rosse + 1 blu)',
      ref: {x: RX(1), d: 1, on: 'S', off: 26, fix: 'A', bar: B.bar, cap: 'Sdraiato sul carrello, piedi fermi sulla barra: si muove il carrello'},
      cap: ['Ginocchia piegate, carrello vicino alla barra', 'Gambe distese: il carrello si è allontanato, le molle sono in tensione'],
      trj: 'I piedi restano fermi sulla barra: sono il bacino e il carrello a scorrere indietro, in linea retta, mentre le gambe si distendono.',
      set: 'Barra dei piedi in posizione alta. ' + SUP + ' Appoggia ' + piedi + ', piedi alla larghezza del bacino (o talloni uniti e punte aperte, in “V”).',
      pos: 'Bacino neutro (né schiacciato né inarcato), braccia lungo i fianchi con i palmi sul carrello, ginocchia in linea con le punte.',
      ese: ['Espira e spingi la barra: distendi le gambe fino in fondo senza bloccare le ginocchia.', 'Inspira e torna piano, controllando il carrello fino quasi a fermarlo.', 'Il bacino resta fermo: lavorano solo le gambe.'],
      cue: 'Allontana il carrello con il respiro e “accompagnalo” al ritorno: non farlo sbattere.',
      why: 'È il riscaldamento classico del reformer e una leg press sdraiata senza carico sulla schiena: allinea anche, ginocchia e piedi e scalda tutta la gamba. ' + MOLLE,
      err: ['Lasciar sbattere il carrello al ritorno', 'Iperestendere le ginocchia in fondo', 'Bacino che si inarca o si solleva', 'Ginocchia che cadono verso l’interno']});
  });
  { const B = onBar([[92, 92, {...LIE, h: [0, Y.lie], th: 103, sh: 103, ft: -22}], [92, 92, {...LIE, h: [0, Y.lie], th: 103, sh: 103, ft: 24}]], 1, 'toe');
    R({id: 'rf-polpacci', n: 'Polpacci al reformer (alzate dei talloni)', yq: 'reformer heel raises calves', g: 'gambe', m: 'Polpacci', mm: 'gastrocnemio, soleo; quadricipite fermo in tenuta', st: 'lie', fr: B.fr, tempo: [1.1, .5, 1.6], molle: 'pesanti (es. 3 rosse)',
      ref: {x: RX(1), d: 1, on: 'S', off: 26, fix: 'F', bar: B.bar, cap: 'Gambe distese, avampiede sulla barra: si muove solo la caviglia'},
      cap: ['Gambe distese, talloni scesi sotto la barra', 'Talloni spinti in alto: il carrello si allontana di qualche centimetro'],
      set: 'Barra alta. ' + SUP + ' Piedi sulla barra con l’avampiede, poi spingi il carrello fino a gambe distese.',
      pos: 'Gambe distese ma non bloccate, bacino fermo, caviglie allineate (non cadono verso l’esterno).',
      ese: ['Lascia scendere i talloni sotto la barra: il polpaccio si allunga.', 'Spingi sull’avampiede e alza i talloni il più possibile.', 'Fermati 1 secondo in alto e scendi lento.'],
      cue: 'Solo le caviglie si muovono: ginocchia e bacino restano immobili.',
      why: 'Il polpaccio lavora in tutta l’escursione, dall’allungamento sotto la barra alla spinta in alto, con un carico che si regola con le molle e senza peso sulla colonna. ' + MOLLE,
      err: ['Piegare le ginocchia per far muovere il carrello', 'Movimento corto: talloni che non scendono', 'Caviglie che si girano in fuori']}); }
  { const f0 = [92, 92, {...LIE, h: [0, Y.lie], th: 152, sh: 58, ft: 6}], P0 = pts(f0), H1 = add(P0.S, -U.TL, 300), [th1, sh1] = legTo(H1, P0.A);
    const B = onBar([f0, [84, 84, {t: 300, h: H1, th: th1, sh: sh1, ft: 6 + 58 - sh1}]], 1, 'toe');
    R({id: 'rf-ponte', n: 'Ponte sul reformer (bridging)', yq: 'reformer bridge pilates', g: 'gambe', g2: ['addome'], m: 'Glutei, femorali', mm: 'grande gluteo, ischiocrurali, erettori spinali; addome che tiene il bacino', st: 'lie', fr: B.fr, molle: 'medie o pesanti (es. 2 rosse)',
      ref: {x: RX(1), d: 1, on: 'S', off: 26, bar: B.bar, cap: 'Spalle sul carrello, piedi sulla barra: sale il bacino'},
      cap: ['Sdraiato, ginocchia piegate, piedi sulla barra', 'Bacino alto: spalle, anche e ginocchia in linea'],
      trj: 'Il bacino sale arrotolando la colonna una vertebra alla volta e scende allo stesso modo; il carrello resta quasi fermo.',
      set: 'Barra alta. ' + SUP + ' Piedi sulla barra (avampiede o talloni), alla larghezza del bacino.',
      pos: 'Braccia lungo i fianchi, collo lungo, peso sulle spalle e non sul collo.',
      ese: ['Espira e solleva il bacino arrotolando la colonna, fino ad avere spalle, anche e ginocchia in linea.', 'Tieni 1-2 secondi stringendo i glutei.', 'Inspira e scendi lento, appoggiando una vertebra alla volta.', 'Variante più dura: in alto spingi e richiama il carrello di pochi centimetri.'],
      cue: 'Spingi i talloni verso la barra come per allontanarla: lavorano glutei e femorali, non la schiena.',
      why: 'Rinforza glutei e femorali e insegna a muovere la colonna in modo controllato; con le molle il carrello tende a scappare e i femorali devono tenerlo. ' + MOLLE,
      err: ['Salire troppo inarcando la zona lombare', 'Peso sul collo', 'Carrello che scappa indietro', 'Ginocchia che si aprono']}); }

  // ---- supino con le cinghie alle mani ----
  { const fr = atU([[180, 180, {...LIE, h: [0, Y.lie], th: 180, sh: 90}], [100, 100, {t: 250, cu: 20, h: [0, Y.lie], th: 132, sh: 132}]], 1, 'S', HOME + 26);
    R({id: 'rf-hundred', n: 'Hundred al reformer', yq: 'reformer hundred pilates', g: 'addome', m: 'Addominali', mm: 'retto addominale, trasverso, obliqui; flessori dell’anca in tenuta', st: 'lie', eq: 'cable', presa: 'neu', isom: true, hold: '100 battiti (10 respiri)', fin: ['tonificare'], molle: 'medie (es. 1 rossa + 1 blu)', fr,
      ref: {x: RX(1), d: 1, on: 'H', off: 84, bar: 160, cap: 'Sdraiato, cinghie alle mani: testa e spalle sollevate'},
      cap: ['Sdraiato, gambe a tavolino, braccia verso il soffitto con le cinghie', 'Testa e spalle staccate, gambe tese a 45°, braccia basse che “battono”'],
      set: SUP + ' Prendi le due cinghie, braccia distese verso il soffitto, gambe a tavolino (ginocchia sopra le anche, tibie orizzontali).',
      pos: 'Zona lombare appoggiata, mento leggermente verso il petto, sguardo verso le ginocchia.',
      ese: ['Espira: porta le braccia lungo i fianchi, stacca testa e spalle e distendi le gambe a circa 45°.', 'Batti le braccia su e giù di pochi centimetri: inspira per 5 battiti, espira per 5.', 'Continua per 10 respiri (100 battiti), poi piega le gambe e appoggia la testa.'],
      cue: 'Le braccia battono veloci ma il busto resta immobile: l’addome tiene, il collo è rilassato.',
      why: 'L’esercizio simbolo del Pilates: resistenza degli addominali in tenuta, con le cinghie che fanno lavorare anche le braccia. Se la schiena si stacca, tieni le gambe a tavolino.',
      err: ['Zona lombare che si stacca dal carrello', 'Tirare il collo con la testa', 'Gambe troppo basse per la tua forza', 'Trattenere il respiro']}); }
  { const fr = atU([[180, 180, {...LIE, h: [0, Y.lie], th: 180, sh: 90}], [95, 95, {...LIE, h: [-14, Y.lie], th: 180, sh: 90}]], 1, 'S', HOME + 26);
    R({id: 'rf-braccia-giu', n: 'Braccia in giù con le cinghie, supino (dorsali)', yq: 'reformer supine arms pull down straps', g: 'schiena', g2: ['tricipiti'], m: 'Gran dorsale, tricipiti', mm: 'gran dorsale, grande rotondo, capo lungo del tricipite, deltoide posteriore', st: 'lie', eq: 'cable', presa: 'neu', molle: 'leggere (es. 1 rossa o 1 blu)', fr,
      ref: {x: RX(1), d: 1, on: 'S', off: 26, bar: 160, cap: 'Sdraiato, cinghie alle mani: le braccia scendono ai fianchi'},
      cap: ['Braccia verso il soffitto, cinghie in tensione', 'Braccia lungo i fianchi: il carrello è scivolato verso i montanti'],
      trj: 'Le mani disegnano un arco dal soffitto ai fianchi con le braccia tese; il carrello scivola un po’ verso i montanti.',
      set: SUP + ' Una cinghia per mano, braccia distese verso il soffitto, gambe a tavolino o piedi appoggiati sulla barra.',
      pos: 'Spalle lontane dalle orecchie, gomiti morbidi ma fermi, bacino neutro.',
      ese: ['Espira e porta le braccia tese fino ai fianchi, premendo le cinghie verso il carrello.', 'Fermati un attimo con le scapole basse.', 'Inspira e risali lento fino a braccia verticali.'],
      cue: 'Spingi con le ascelle, non con le mani: le scapole scendono verso il bacino.',
      why: 'Il gran dorsale lavora come in un pullover, sdraiato e senza peso sulla schiena; il tricipite tiene il gomito disteso.',
      err: ['Piegare i gomiti', 'Inarcare la schiena quando le braccia salgono', 'Spalle che salgono verso le orecchie']}); }

  // ---- supino con i piedi nelle cinghie ----
  { const fr = atU([[92, 92, {...LIE, h: [0, Y.lie], th: 155, sh: 100}], [92, 92, {...LIE, h: [-24, Y.lie], th: 128, sh: 128}]], 1, 'S', HOME + 26);
    R({id: 'rf-rana', n: 'Rana con i piedi nelle cinghie (frog)', yq: 'reformer frog feet in straps', g: 'gambe', g2: ['addome'], m: 'Adduttori, glutei, femorali', mm: 'adduttori, grande gluteo, ischiocrurali; addome che tiene il bacino', st: 'lie', eq: 'cable', cp: 'ankle', ko: 16, molle: 'medie (es. 1 rossa + 1 blu)', fr,
      ref: {x: RX(1), d: 1, on: 'S', off: 26, bar: 160, cap: 'Sdraiato, cinghie ai piedi'},
      cap: ['Talloni uniti, ginocchia aperte (rana)', 'Gambe distese a 45°, unite: il carrello si è avvicinato ai montanti'],
      trj: 'I piedi partono vicini al bacino e si allontanano in diagonale fino a gambe tese e unite; le ginocchia si chiudono durante la spinta.',
      set: SUP + ' Infila i piedi nelle cinghie (sotto l’arco), talloni uniti, ginocchia aperte all’altezza delle spalle.',
      pos: 'Zona lombare appoggiata, bacino fermo, braccia lungo i fianchi.',
      ese: ['Espira e distendi le gambe in diagonale stringendo l’interno coscia, fino a gambe unite.', 'Inspira e torna in rana senza far salire le ginocchia oltre le anche.', 'Tieni il bacino immobile per tutto il movimento.'],
      cue: 'Spremi i talloni l’uno contro l’altro mentre spingi: si accendono adduttori e glutei.',
      why: 'Lavora l’interno coscia e i glutei con le gambe sospese: il bacino deve restare fermo, quindi lavora anche l’addome profondo.',
      err: ['Gambe troppo basse che staccano la schiena', 'Bacino che dondola', 'Ginocchia che tornano troppo verso il petto']}); }
  { const fr = atU([[92, 92, {...LIE, h: [0, Y.lie], th: 178, sh: 178}], [92, 92, {...LIE, h: [-16, Y.lie], th: 128, sh: 128}]], 1, 'S', HOME + 26);
    R({id: 'rf-gambe-giu', n: 'Gambe in giù con i piedi nelle cinghie', yq: 'reformer leg lowers feet in straps', g: 'addome', g2: ['gambe'], m: 'Addominali, femorali, adduttori', mm: 'retto addominale e trasverso (tengono il bacino), ischiocrurali, adduttori, grande gluteo', st: 'lie', eq: 'cable', cp: 'ankle', fin: ['tonificare'], molle: 'medie (es. 1 rossa + 1 blu)', fr,
      ref: {x: RX(1), d: 1, on: 'S', off: 26, bar: 160, cap: 'Sdraiato, cinghie ai piedi, gambe tese'},
      cap: ['Gambe tese verso il soffitto, unite', 'Gambe abbassate a 45°: schiena ancora appoggiata'],
      trj: 'Le gambe tese scendono ad arco dalla verticale fino a circa 45° e risalgono; il carrello si sposta poco.',
      set: SUP + ' Piedi nelle cinghie, gambe tese verso il soffitto, unite e leggermente ruotate in fuori.',
      pos: 'Zona lombare appoggiata per tutto il movimento, braccia lungo i fianchi.',
      ese: ['Inspira e abbassa le gambe tese fin dove la schiena resta appoggiata.', 'Espira e riporta le gambe in verticale tirando le cinghie con i femorali.', 'Varianti: cerchi con le gambe, aperture e chiusure.'],
      cue: 'Scendi solo fin dove riesci a tenere la schiena incollata al carrello.',
      why: 'Allena l’addome a tenere fermo il bacino mentre le gambe pesano, e i femorali a tirare le cinghie verso il basso.',
      err: ['Scendere troppo inarcando la schiena', 'Ginocchia piegate', 'Bacino che si muove']}); }

  // ---- seduto ----
  { const H = [0, Y.seat], q = {t: 180, cu: 25, h: H}, S = pts([0, 0, q]).S, hand = [H[0] - 6, H[1] + 7], E = ik2(S, hand, U.UA, U.FA, back), ua = ang(S, E), fa = ang(E, hand);
    const B = onBar([[ua, fa, {...q, th: 140, sh: 45, ft: 4}], [ua, fa, {...q, th: 91, sh: 91, ft: 4}]], 1, 'toe');
    R({id: 'rf-stomach', n: 'Stomach massage (seduto, piedi sulla barra)', yq: 'reformer stomach massage', g: 'gambe', g2: ['addome'], m: 'Quadricipiti, addominali', mm: 'quadricipite, glutei, polpacci; retto addominale e trasverso che tengono la schiena arrotondata', st: 'seat', fr: B.fr, molle: 'medie o pesanti (es. 2-3 rosse)',
      ref: {x: RX(1), d: 1, on: 'H', off: 70, fix: 'A', bar: B.bar, cap: 'Seduto sul carrello, schiena arrotondata, piedi sulla barra'},
      cap: ['Seduto in fondo al carrello, ginocchia piegate, avampiedi sulla barra', 'Gambe distese: la schiena resta arrotondata e ferma'],
      set: 'Barra alta. Siediti sul carrello verso la barra, avampiedi sulla barra con i talloni uniti, mani sul bordo del carrello accanto al bacino.',
      pos: 'Schiena arrotondata a “C”, addome in dentro, spalle basse.',
      ese: ['Espira e spingi la barra distendendo le gambe, senza muovere il busto.', 'In fondo alza i talloni e poi lasciali scendere sotto la barra (facoltativo).', 'Inspira e torna piegando le gambe, il busto sempre fermo.'],
      cue: 'Le gambe spingono, l’addome resta “scavato”: il busto non si sposta avanti e indietro.',
      why: 'Unisce una spinta con le gambe al controllo dell’addome, che deve tenere la colonna arrotondata e immobile.',
      err: ['Dondolare con il busto', 'Spalle alte e tese', 'Schiena che si raddrizza o crolla all’indietro']}); }
  { const fr = atU([[82, 82, {t: 180, h: [0, Y.seat], th: 145, sh: 25, ft: 10}], [-35, 75, {t: 180, h: [12, Y.seat], th: 145, sh: 25, ft: 10}]], -1, 'A', HOME + 30);
    R({id: 'rf-rematore', n: 'Rematore seduto con le cinghie', yq: 'reformer seated row straps', g: 'schiena', g2: ['bicipiti'], m: 'Dorsali, romboidi, bicipiti', mm: 'gran dorsale, romboidi, trapezio medio, deltoide posteriore, bicipiti', st: 'seat', eq: 'cable', presa: 'neu', lin: true, molle: 'leggere (es. 1 rossa o 1 blu)', fr,
      ref: {x: RX(-1), d: -1, on: 'A', off: 30, py: 140, cap: 'Seduto verso i montanti, piedi contro i poggiaspalle'},
      cap: ['Seduto, braccia avanti con le cinghie in tensione', 'Gomiti dietro, mani ai fianchi: il carrello è scivolato verso i montanti'],
      set: 'Siediti sul carrello con la faccia verso i montanti, ginocchia piegate e piedi appoggiati contro i poggiaspalle. Una cinghia per mano, braccia avanti.',
      pos: 'Busto dritto, seduto sulle ossa del bacino, petto aperto, spalle basse.',
      ese: ['Espira e porta i gomiti indietro vicino ai fianchi, avvicinando le scapole.', 'Fermati 1 secondo.', 'Inspira e distendi le braccia lentamente, senza far tornare il carrello di colpo.'],
      cue: 'Tira con i gomiti e “apri” il petto: il busto non va indietro.',
      why: 'Un rematore con un carico leggero e progressivo che insegna a usare le scapole; il busto deve stare dritto da solo, senza schienale.',
      err: ['Inclinarsi indietro per tirare', 'Spalle che salgono', 'Polsi piegati']}); }

  // ---- in ginocchio sul carrello, faccia verso i montanti ----
  const KN = {t: 180, th: 0, sh: -90, ft: 20};
  const kneel = (a0, a1) => atU([[a0[0], a0[1], {...KN, h: [0, Y.knee - U.TH]}], [a1[0], a1[1], {...KN, h: [9, Y.knee - U.TH]}]], -1, 'K', HOME + 30);
  const KSET = 'In ginocchio sul carrello con la faccia verso i montanti, ginocchia dietro ai poggiaspalle alla larghezza del bacino. Una cinghia per mano.';
  R({id: 'rf-chest-exp', n: 'Chest expansion in ginocchio', yq: 'reformer chest expansion kneeling', g: 'schiena', g2: ['spalle', 'tricipiti'], m: 'Dorsali, deltoidi posteriori, tricipiti', mm: 'gran dorsale, deltoide posteriore, capo lungo del tricipite, romboidi; addome e glutei tengono il busto', st: 'kneel', eq: 'cable', presa: 'neu', molle: 'leggere (es. 1 rossa o 1 blu)', fr: kneel([30, 30], [-35, -35]),
    ref: {x: RX(-1), d: -1, on: 'K', off: 30, py: 140, cap: 'In ginocchio sul carrello, busto dritto'},
    cap: ['Braccia avanti e in basso, cinghie in tensione', 'Braccia tese dietro i fianchi, petto aperto'],
    trj: 'Le mani passano ad arco dal davanti al dietro dei fianchi, braccia sempre tese.',
    set: KSET + ' Braccia tese davanti alle cosce.', pos: 'Busto dritto, glutei stretti, bacino sopra le ginocchia, addome attivo.',
    ese: ['Espira e porta le braccia tese dietro i fianchi aprendo il petto.', 'Tieni e gira la testa a destra e a sinistra (facoltativo).', 'Inspira e torna lentamente con le braccia avanti.'],
    cue: 'Il busto resta una colonna: si muovono solo le braccia, il carrello non deve tirarti in avanti.',
    why: 'Lavora la parte posteriore delle spalle e i dorsali e corregge la postura “chiusa”; in ginocchio sul carrello che scorre, tutto il tronco lavora per stare fermo.',
    err: ['Inarcare la schiena', 'Piegare i gomiti', 'Sedersi sui talloni', 'Spalle in avanti']});
  R({id: 'rf-curl', n: 'Curl dei bicipiti in ginocchio con le cinghie', yq: 'reformer biceps curl kneeling', g: 'bicipiti', m: 'Bicipiti', mm: 'bicipite brachiale, brachiale; deltoide anteriore tiene le braccia alte', st: 'kneel', eq: 'cable', presa: 'sup', molle: 'leggere (es. 1 blu o 1 gialla)', fr: kneel([86, 86], [86, 168]),
    ref: {x: RX(-1), d: -1, on: 'K', off: 30, py: 140, cap: 'In ginocchio sul carrello, braccia avanti all’altezza delle spalle'},
    cap: ['Braccia tese avanti all’altezza delle spalle', 'Gomiti fermi, mani verso la fronte'],
    set: KSET + ' Palmi verso l’alto, braccia tese avanti all’altezza delle spalle.', pos: 'Busto dritto, gomiti fermi alla stessa altezza per tutto l’esercizio.',
    ese: ['Espira e piega i gomiti portando le mani verso la fronte.', 'Stringi i bicipiti 1 secondo.', 'Inspira e distendi lentamente le braccia senza abbassare i gomiti.'],
    cue: 'I gomiti sono fermi in aria: si muovono solo gli avambracci.',
    why: 'Curl con un carico che cresce verso la fine, mentre tutto il tronco lavora per stare in equilibrio sul carrello.',
    err: ['Abbassare i gomiti', 'Inclinarsi indietro', 'Polsi piegati']});
  R({id: 'rf-tricipiti', n: 'Tricipiti in ginocchio con le cinghie (kickback)', yq: 'reformer triceps kneeling straps', g: 'tricipiti', m: 'Tricipiti', mm: 'tricipite brachiale (tutti e tre i capi), deltoide posteriore in tenuta', st: 'kneel', eq: 'cable', presa: 'neu', molle: 'leggere (es. 1 blu o 1 gialla)', fr: kneel([-25, 70], [-25, -25]),
    ref: {x: RX(-1), d: -1, on: 'K', off: 30, py: 140, cap: 'In ginocchio sul carrello, gomiti indietro e fermi'},
    cap: ['Gomiti piegati e indietro, mani ai fianchi', 'Braccia distese dietro'],
    set: KSET + ' Gomiti piegati e portati indietro, vicino ai fianchi.', pos: 'Busto dritto o appena inclinato in avanti, gomiti fermi.',
    ese: ['Espira e distendi i gomiti portando le mani indietro.', 'Stringi i tricipiti 1 secondo.', 'Inspira e torna lentamente, i gomiti restano dove sono.'],
    cue: 'Gomiti incollati in alto dietro di te: lavora solo l’avambraccio.',
    why: 'Isola il tricipite con un carico leggero e continuo; stare in ginocchio sul carrello che scorre accende anche addome e glutei.',
    err: ['Gomiti che scendono e salgono', 'Busto che oscilla', 'Spalle in avanti']});
  // in ginocchio, schiena ai montanti
  { const fr = atU([[-60, 80, {...KN, h: [0, Y.knee - U.TH]}], [88, 88, {...KN, h: [-10, Y.knee - U.TH]}]], 1, 'K', HOME + 74);
    R({id: 'rf-press', n: 'Chest press in ginocchio con le cinghie', yq: 'reformer chest press kneeling', g: 'petto', g2: ['tricipiti', 'spalle'], m: 'Pettorali, tricipiti, deltoidi anteriori', mm: 'gran pettorale, tricipite, deltoide anteriore, dentato anteriore; addome che tiene il busto', st: 'kneel', eq: 'cable', presa: 'pro', lin: true, molle: 'leggere o medie (es. 1 rossa)', fr,
      ref: {x: RX(1), d: 1, on: 'K', off: 74, py: 140, cap: 'In ginocchio sul carrello, schiena verso i montanti'},
      cap: ['Mani al petto, gomiti indietro', 'Braccia distese avanti all’altezza del petto'],
      set: 'In ginocchio sul carrello con la schiena verso i montanti (faccia verso la barra), piedi verso i poggiaspalle. Una cinghia per mano, mani all’altezza del petto.',
      pos: 'Busto dritto, glutei stretti, gomiti all’altezza del petto o poco sotto.',
      ese: ['Espira e spingi le mani avanti fino a braccia tese.', 'Avvicina un po’ le mani alla fine (come un abbraccio).', 'Inspira e torna lentamente con le mani al petto.'],
      cue: 'Spingi lontano senza farti tirare indietro dal carrello: il busto è una colonna.',
      why: 'Una spinta di petto fatta in ginocchio sul carrello che scorre: oltre a pettorali e tricipiti lavora tutto il tronco per restare in equilibrio.',
      err: ['Inarcare la schiena', 'Spalle che salgono', 'Mani troppo alte']}); }

  // ---- in appoggio sulla barra ----
  { const K0 = [0, Y.knee], H0 = add(K0, -U.TH, 15), t0 = 122, S0 = add(H0, U.TL, t0), ua = 32, W = add(S0, U.UA + U.FA, ua), K1 = [K0[0] - 26, Y.knee], H1 = ik2(K1, S0, U.TH, U.TL, up);
    const fr = shift([[ua, ua, {t: t0, h: H0, th: 15, sh: -90, ft: 20}], [ua, ua, {t: ang(H1, S0), h: H1, th: ang(H1, K1), sh: -90, ft: 20}]], RX(1) + 207 - W[0]);
    R({id: 'rf-knee-stretch', n: 'Knee stretch (ginocchia sul carrello, mani sulla barra)', yq: 'reformer knee stretch round back', g: 'addome', g2: ['gambe'], m: 'Core, glutei, quadricipiti', mm: 'trasverso e retto dell’addome (tengono la schiena), grande gluteo, quadricipite, flessori dell’anca; spalle in tenuta', st: 'kneel', fr, tempo: [1.0, .2, 1.2], molle: 'medie (es. 2 rosse); meno molle = più difficile', fin: ['tonificare'],
      ref: {x: RX(1), d: 1, on: 'K', off: 74, bar: r1(W[1] + 6), cap: 'In ginocchio sul carrello, mani sulla barra, schiena arrotondata'},
      cap: ['Ginocchia sotto il bacino, piedi contro i poggiaspalle', 'Ginocchia spinte indietro: il busto resta fermo sopra la barra'],
      trj: 'Le ginocchia spingono il carrello indietro e lo richiamano con un ritmo vivace; spalle e testa restano ferme sopra la barra.',
      set: 'Barra alta. In ginocchio sul carrello verso la barra, piedi contro i poggiaspalle, mani sulla barra alla larghezza delle spalle.',
      pos: 'Schiena arrotondata a “C”, testa in linea, addome in dentro, braccia distese.',
      ese: ['Spingi il carrello indietro con le ginocchia, usando le anche.', 'Richiamalo subito con l’addome, senza farlo sbattere.', 'Ripeti con ritmo (10 volte), poi prova con la schiena piatta.'],
      cue: 'Il busto è una statua: si muovono solo le cosce.',
      why: 'Allena l’addome a tenere ferma la colonna mentre le gambe si muovono veloci: ottimo per il controllo del tronco e per glutei e quadricipiti.',
      err: ['Dondolare con le spalle', 'Schiena che crolla', 'Far sbattere il carrello']}); }
  { const W = [0, 152], pose = ua => { const S = add(W, -(U.UA + U.FA), ua), t = Math.acos((S[1] - (Y.ank - 3)) / 152) / D, H = add(S, -U.TL, t); return [ua, ua, {t, h: H, th: t - 180, sh: t - 180, ft: 30}]; };
    const fr = shift([pose(4), pose(34)], RX(1) + 207 - W[0]);
    R({id: 'rf-long-stretch', n: 'Long stretch (plank sul reformer)', yq: 'reformer long stretch plank', g: 'addome', g2: ['spalle', 'petto'], m: 'Core, deltoidi anteriori, pettorali', mm: 'trasverso, retto e obliqui dell’addome, deltoide anteriore, gran pettorale, dentato anteriore, glutei', st: 'stand', fr, tempo: [1.6, .4, 1.8], molle: 'leggere (es. 1 rossa + 1 blu); meno molle = più difficile', fin: ['tonificare'],
      ref: {x: RX(1), d: 1, on: 'A', off: 28, bar: r1(W[1] + 6), cap: 'Plank: mani sulla barra, piedi contro i poggiaspalle'},
      cap: ['Plank con le spalle sopra le mani', 'Carrello spinto indietro: il corpo resta una linea dritta'],
      trj: 'Il corpo intero si sposta indietro come una tavola e torna avanti; le mani restano ferme sulla barra.',
      set: 'Barra alta. Mani sulla barra alla larghezza delle spalle, piedi sul carrello con i talloni contro i poggiaspalle, corpo in plank.',
      pos: 'Testa, spalle, bacino e talloni in linea; glutei stretti; spalle lontane dalle orecchie.',
      ese: ['Inspira e spingi il carrello indietro portando le spalle oltre le mani, il corpo sempre dritto.', 'Espira e riporta il carrello avanti fino ad avere le spalle sopra le mani.', 'Fai 4-6 ripetizioni lente.'],
      cue: 'Muovi il corpo come una tavola: il bacino non sale e non scende.',
      why: 'Un plank in movimento: addome e spalle lavorano molto più che nel plank fermo, perché il carrello scivola e va controllato.',
      err: ['Bacino che cade', 'Spalle che salgono', 'Andare troppo indietro perdendo la linea']}); }
  { const W = [0, 152], pose = (th, dxA) => { const A = [dxA, Y.ank], H = add(A, -(U.TH + U.SH), th), t = Math.acos((W[1] - H[1]) / 127) / D, Wx = H[0] + 127 * Math.sin(t * D); return {f: [t, t, {t, h: H, th, sh: th, ft: 16 - th}], Wx}; };
    const p0 = pose(-12, 0), p1 = pose(-30, p0.Wx - pose(-30, 0).Wx), fr = shift([p0.f, p1.f], RX(1) + 207 - p0.Wx);
    R({id: 'rf-elephant', n: 'Elephant (in piedi sul carrello, mani sulla barra)', yq: 'reformer elephant pilates', g: 'addome', g2: ['gambe'], m: 'Addominali, femorali, polpacci', mm: 'trasverso e retto dell’addome, ischiocrurali e polpacci in allungamento attivo, gran dorsale e spalle in tenuta', st: 'stand', fr, molle: 'medie (es. 1-2 rosse)', fin: ['tonificare'], ct: [0, .95, 5.4],
      ref: {x: RX(1), d: 1, on: 'A', off: 30, bar: r1(W[1] + 6), cap: 'In piedi sul carrello, mani sulla barra, bacino alto'},
      cap: ['Bacino alto, gambe tese, talloni contro i poggiaspalle', 'Gambe spinte indietro: il bacino resta alto e la schiena arrotondata'],
      set: 'Barra alta. In piedi sul carrello, talloni contro i poggiaspalle, mani sulla barra: il corpo forma una “V” rovesciata con il bacino in alto.',
      pos: 'Schiena arrotondata, testa tra le braccia, gambe tese, talloni giù.',
      ese: ['Espira e spingi il carrello indietro con le gambe tese, usando l’addome.', 'Inspira e riportalo avanti senza muovere il busto.', 'Movimento piccolo e controllato (circa 30 cm).'],
      cue: 'Il bacino resta sempre sopra i talloni: si muovono le gambe, non la schiena.',
      why: 'Allunga in modo attivo femorali e polpacci mentre l’addome muove il carrello: unisce forza del tronco e mobilità della parte posteriore delle gambe.',
      err: ['Piegare le ginocchia', 'Spingere con le braccia', 'Talloni che si sollevano', 'Schiena che si inarca']}); }

  // ---- prono sul box lungo ----
  { const fr = atU([[22, 22, {t: 90, h: [0, 157], th: -90, sh: -90, ft: 60}], [-84, -84, {t: 100, h: [12, 157], th: -90, sh: -90, ft: 60}]], -1, 'S', HOME + 14);
    R({id: 'rf-pulling-straps', n: 'Pulling straps (prono sul box lungo)', yq: 'reformer pulling straps long box', g: 'schiena', g2: ['spalle'], m: 'Dorsali, deltoidi posteriori, erettori spinali', mm: 'gran dorsale, deltoide posteriore, romboidi, tricipite, erettori spinali (estensione della schiena)', st: 'lie', eq: 'cable', presa: 'neu', molle: 'leggere (es. 1 rossa o 1 blu)', fr,
      ref: {x: RX(-1), d: -1, on: 'S', off: 14, box: true, py: 150, cap: 'Prono sul box lungo, testa verso i montanti'},
      cap: ['Prono sul box, braccia giù verso le cinghie', 'Braccia tese lungo i fianchi, petto un po’ sollevato'],
      trj: 'Le braccia tese passano dal basso davanti al box fino ai fianchi; alla fine il petto si stacca leggermente dal box.',
      set: 'Box lungo sul carrello, appoggiato contro i poggiaspalle. Sdraiati a pancia in giù con il petto sul bordo del box verso i montanti, gambe distese e unite. Afferra le corde delle cinghie con le braccia tese verso il basso.',
      pos: 'Gambe attive e unite, collo lungo, sguardo verso il basso.',
      ese: ['Espira e porta le braccia tese verso i fianchi, sollevando un po’ il petto.', 'Tieni 1 secondo con le scapole basse.', 'Inspira e torna lentamente con le braccia avanti, appoggiando il petto.'],
      cue: 'Le braccia tirano, la schiena si allunga: solleva lo sterno, non la testa.',
      why: 'Rinforza la parte posteriore del corpo (dorsali, spalle posteriori ed erettori) in un’estensione controllata, utile contro la postura curva.',
      err: ['Sollevare troppo il petto inarcando la zona lombare', 'Piegare i gomiti', 'Collo all’indietro']}); }

  // ---- in piedi: affondo ----
  { const A = [0, Y.ank - 1], Ab0 = [A[0] - 96, Y.ank], Ab1 = [A[0] - 136, Y.ank], H0 = [A[0] - 46, Y.ank - Math.sqrt(94 * 94 - 50 * 50) + 2], H1 = [A[0] - 62, 0]; H1[1] = H0[1] + 30;
    const [th0, sh0] = legTo(H0, A), [th1, sh1] = legTo(H1, A);
    const fr = atU([[88, 88, {t: 180, h: H0, th: th0, sh: sh0, rlx: Ab0[0], rly: Ab0[1]}], [88, 88, {t: 180, h: H1, th: th1, sh: sh1, rlx: Ab1[0], rly: Ab1[1]}]], 1, 'A', 226);
    R({id: 'rf-affondo', n: 'Affondo sul reformer (piede avanti sulla pedana)', yq: 'reformer lunge front splits', g: 'gambe', m: 'Quadricipiti, glutei', mm: 'quadricipite e grande gluteo della gamba davanti, flessori dell’anca e quadricipite della gamba dietro in allungamento, medio gluteo per l’equilibrio', st: 'stand', fr, rl: [fr[0][2].rlx, fr[0][2].rly], one: false, molle: 'leggere (es. 1 rossa); meno molle = più instabile', fin: ['tonificare', 'massa'],
      ref: {x: RX(1), d: 1, on: 'A2', off: 28, fix: 'A', bar: 194, cap: 'Piede avanti sulla pedana, piede dietro sul carrello (barra abbassata)'},
      cap: ['Gambe divaricate, piede dietro contro i poggiaspalle', 'Carrello indietro: affondo, ginocchio davanti sopra la caviglia'],
      trj: 'Il bacino scende in verticale mentre il piede dietro, sul carrello, scivola indietro.',
      set: 'Barra dei piedi abbassata. Piede davanti piatto sulla pedana, piede dietro sul carrello con il tallone contro i poggiaspalle. Mani sui fianchi o braccia avanti.',
      pos: 'Busto dritto, bacino in avanti, peso sul tallone del piede davanti.',
      ese: ['Inspira e lascia scivolare il carrello indietro scendendo in affondo.', 'Espira e richiama il carrello spingendo con il tallone davanti e stringendo il gluteo.', 'Fai tutte le ripetizioni e cambia gamba.'],
      cue: 'Scendi giù, non indietro: il ginocchio davanti resta sopra la caviglia.',
      why: 'Un affondo in cui il carrello che scorre rende instabile la gamba dietro: quadricipite e gluteo davanti lavorano molto, e l’anca dietro si allunga.',
      err: ['Ginocchio davanti che va oltre la punta o verso l’interno', 'Busto che si piega in avanti', 'Carrello che scappa: usa una molla in più']}); }

  // ===== seconda tornata (v147): varianti e altri esercizi classici =====
  const down = (c1, c2) => c1[1] > c2[1] ? c1 : c2;
  const FW = (id, n, yq, c, ft, extra, m, mm, piedi, why) => {
    const B = onBar([[92, 92, Object.assign({...LIE, h: [0, Y.lie], th: 160, sh: 62, ft}, extra.f || {})], [92, 92, Object.assign({...LIE, h: [0, Y.lie], th: 103, sh: 103, ft}, extra.f || {})]], 1, c);
    R(Object.assign({id, n, yq, g: 'gambe', m, mm, st: 'lie', fr: B.fr, tempo: [1.4, .3, 1.8], molle: 'pesanti (es. 3 rosse)',
      ref: {x: RX(1), d: 1, on: 'S', off: 26, fix: 'A', bar: B.bar, cap: 'Sdraiato sul carrello, piedi fermi sulla barra: si muove il carrello'},
      cap: ['Ginocchia piegate, carrello vicino alla barra', 'Gambe distese: il carrello si è allontanato'],
      set: 'Barra dei piedi alta. ' + SUP + ' ' + piedi,
      pos: 'Bacino neutro, braccia lungo i fianchi con i palmi sul carrello, ginocchia in linea con le punte dei piedi.',
      ese: ['Espira e spingi la barra fino a gambe distese, senza bloccare le ginocchia.', 'Inspira e torna piano, controllando il carrello.', 'Il bacino resta fermo: lavorano solo le gambe.'],
      cue: 'Allontana il carrello con il respiro e accompagnalo al ritorno: non farlo sbattere.',
      why: why + ' ' + MOLLE, err: ['Lasciar sbattere il carrello al ritorno', 'Iperestendere le ginocchia in fondo', 'Bacino che si inarca o si solleva']}, extra.o || {}));
  };
  FW('rf-footwork-arco', 'Footwork sull’arco del piede', 'reformer footwork arches', 'arch', 2, {}, 'Quadricipiti, glutei', 'quadricipite femorale, grande gluteo, ischiocrurali',
    'Appoggia l’arco del piede (il centro della pianta) sulla barra, dita che la “avvolgono”, piedi alla larghezza del bacino.', 'Con l’arco sulla barra la caviglia resta ferma: lavorano soprattutto quadricipiti e glutei.');
  FW('rf-footwork-v', 'Footwork in “V” (talloni uniti, punte aperte)', 'reformer footwork pilates v', 'toe', 8, {o: {ko: 10}}, 'Quadricipiti, adduttori, glutei', 'quadricipite, adduttori (interno coscia), grande gluteo, extrarotatori dell’anca',
    'Avampiedi sulla barra con i talloni uniti e sollevati e le punte aperte a “V” (posizione Pilates); ginocchia aperte quanto le punte.', 'La rotazione esterna delle anche, con i talloni che si spingono l’uno contro l’altro, accende l’interno coscia e i glutei.');
  FW('rf-footwork-larghe', 'Footwork a piedi larghi', 'reformer footwork wide second position', 'arch', 2, {o: {ko: 22}}, 'Adduttori, quadricipiti, glutei', 'adduttori, quadricipite, grande e medio gluteo',
    'Piedi larghi ai lati della barra (arco o talloni sulla barra), punte leggermente aperte, ginocchia sopra le punte.', 'A gambe larghe lavorano di più l’interno coscia e i glutei, con le ginocchia che seguono la direzione delle punte.');
  FW('rf-footwork-una-gamba', 'Footwork a una gamba', 'reformer single leg footwork', 'toe', 8, {f: {th2: 180, sh2: 90}, o: {leg2: true, one: false, molle: 'medie (es. 2 rosse): una gamba sola spinge'}}, 'Quadricipiti, glutei', 'quadricipite, grande e medio gluteo della gamba che spinge; addome che tiene il bacino dritto',
    'Avampiede di una gamba sulla barra; l’altra gamba a tavolino (ginocchio sopra l’anca, tibia orizzontale).', 'Ogni gamba lavora da sola: le differenze tra destra e sinistra si vedono subito e il bacino deve restare dritto.');
  { const f0 = [92, 92, {...LIE, h: [0, Y.lie], th: 152, sh: 58, ft: 6, th2: 180, sh2: 180}], P0 = pts(f0), H1 = add(P0.S, -U.TL, 300), [th1, sh1] = legTo(H1, P0.A);
    const B = onBar([f0, [84, 84, {t: 300, h: H1, th: th1, sh: sh1, ft: 6 + 58 - sh1, th2: 175, sh2: 175}]], 1, 'toe');
    R({id: 'rf-ponte-una-gamba', n: 'Ponte su una gamba al reformer', yq: 'reformer single leg bridge', g: 'gambe', g2: ['addome'], m: 'Glutei, femorali', mm: 'grande e medio gluteo, ischiocrurali della gamba in appoggio; addome che tiene il bacino orizzontale', st: 'lie', leg2: true, fr: B.fr, molle: 'medie (es. 1-2 rosse)',
      ref: {x: RX(1), d: 1, on: 'S', off: 26, bar: B.bar, cap: 'Spalle sul carrello, un piede sulla barra, l’altra gamba verso il soffitto'},
      cap: ['Sdraiato, un piede sulla barra, l’altra gamba tesa in alto', 'Bacino alto e orizzontale, gamba libera sempre verso il soffitto'],
      set: 'Barra alta. ' + SUP + ' Un piede sulla barra (avampiede), l’altra gamba tesa verso il soffitto.',
      pos: 'Bacino orizzontale: le due anche alla stessa altezza per tutto l’esercizio.',
      ese: ['Espira e solleva il bacino spingendo con il piede sulla barra.', 'Tieni 1-2 secondi stringendo il gluteo.', 'Inspira e scendi lento. Fai tutte le ripetizioni e cambia gamba.'],
      cue: 'Le anche sono un vassoio: non deve inclinarsi da nessuna parte.',
      why: 'La versione più dura del ponte: una gamba sola regge il bacino e il carrello che vuole scappare, e l’anca libera non deve cedere.',
      err: ['Bacino che si inclina da un lato', 'Spingere con la schiena', 'Carrello che scappa indietro']}); }
  { const f0 = [92, 92, {...LIE, h: [0, Y.lie], th: 152, sh: 58, ft: 6}], P0 = pts(f0), H1 = add(P0.S, -U.TL, 300), [th1, sh1] = legTo(H1, P0.A), H2 = [H1[0] - 24, H1[1]], [th2, sh2] = legTo(H2, P0.A);
    const B = onBar([f0, [84, 84, {t: 300, h: H1, th: th1, sh: sh1, ft: 6 + 58 - sh1}], [84, 84, {t: 300, h: H2, th: th2, sh: sh2, ft: 6 + 58 - sh2}]], 1, 'toe');
    R({id: 'rf-ponte-spinta', n: 'Ponte con spinta del carrello', yq: 'reformer bridge with carriage press', g: 'gambe', g2: ['addome'], m: 'Femorali, glutei', mm: 'ischiocrurali (frenano e richiamano il carrello), grande gluteo, erettori spinali', st: 'lie', fr: B.fr, tempo: [2.6, .4, 2.6], molle: 'medie (es. 2 rosse)',
      ref: {x: RX(1), d: 1, on: 'S', off: 26, bar: B.bar, cap: 'Bacino alto: le gambe allontanano e richiamano il carrello'},
      cap: ['Sdraiato, piedi sulla barra', 'Bacino alto, poi gambe che spingono via il carrello restando in ponte'],
      trj: 'Prima sale il bacino; poi, restando in ponte, le gambe allontanano il carrello di qualche centimetro e lo richiamano.',
      set: 'Barra alta. ' + SUP + ' Piedi sulla barra alla larghezza del bacino.',
      pos: 'In alto: spalle, anche e ginocchia in linea; bacino che non scende mentre il carrello si muove.',
      ese: ['Sali in ponte arrotolando la colonna.', 'Restando su, spingi il carrello via di pochi centimetri e richiamalo con i femorali (5-8 volte).', 'Scendi lento una vertebra alla volta.'],
      cue: 'Il bacino resta alto come se fosse appeso: si muovono solo le ginocchia.',
      why: 'Il richiamo del carrello con il bacino alto è uno dei lavori migliori per i femorali al reformer, insieme alla tenuta dei glutei.',
      err: ['Bacino che scende quando il carrello va via', 'Inarcare la schiena', 'Movimento troppo ampio']}); }
  // supino con le cinghie alle mani
  { const fr = atU([[92, 180, {...LIE, h: [0, Y.lie], th: 180, sh: 90}], [92, 95, {...LIE, h: [-6, Y.lie], th: 180, sh: 90}]], 1, 'S', HOME + 26);
    R({id: 'rf-tricipiti-supino', n: 'Tricipiti supino con le cinghie', yq: 'reformer supine triceps press straps', g: 'tricipiti', m: 'Tricipiti', mm: 'tricipite brachiale; gran dorsale che tiene le braccia lungo i fianchi', st: 'lie', eq: 'cable', presa: 'neu', molle: 'leggere (es. 1 blu o 1 rossa)', fr,
      ref: {x: RX(1), d: 1, on: 'S', off: 26, bar: 160, cap: 'Sdraiato, gomiti appoggiati ai fianchi, cinghie alle mani'},
      cap: ['Gomiti piegati ai fianchi, avambracci verso il soffitto', 'Braccia distese lungo i fianchi'],
      set: SUP + ' Una cinghia per mano, braccia lungo i fianchi con i gomiti piegati e gli avambracci verso il soffitto; gambe a tavolino o piedi sulla barra.',
      pos: 'Gomiti appoggiati e fermi accanto al busto, spalle basse.',
      ese: ['Espira e distendi i gomiti spingendo le mani verso il carrello, accanto alle cosce.', 'Stringi i tricipiti 1 secondo.', 'Inspira e piega i gomiti lentamente, senza staccarli dal carrello.'],
      cue: 'Gomiti incollati al carrello: si muovono solo gli avambracci.',
      why: 'Isola il tricipite da sdraiato, senza carico sulle spalle e con la schiena appoggiata.',
      err: ['Gomiti che si staccano', 'Spalle che salgono', 'Movimento a scatti']}); }
  { const fr = atU([[140, 180, {...LIE, h: [0, Y.lie], th: 180, sh: 90}], [100, 100, {t: 250, cu: 20, h: [0, Y.lie], th: 132, sh: 132}]], 1, 'S', HOME + 26);
    R({id: 'rf-coordination', n: 'Coordination al reformer', yq: 'reformer coordination pilates', g: 'addome', m: 'Addominali, tricipiti, dorsali', mm: 'retto addominale e trasverso, flessori dell’anca, gran dorsale, tricipite, adduttori', st: 'lie', eq: 'cable', presa: 'neu', fin: ['tonificare'], tempo: [1.2, 1.4, 1.8], molle: 'medie (es. 1 rossa + 1 blu)', fr,
      ref: {x: RX(1), d: 1, on: 'H', off: 84, bar: 160, cap: 'Sdraiato, cinghie alle mani, gambe a tavolino'},
      cap: ['Gambe a tavolino, gomiti piegati, mani sopra il petto', 'Testa su, braccia ai fianchi e gambe tese a 45°: apri e chiudi le gambe'],
      set: SUP + ' Una cinghia per mano, gomiti piegati con le mani sopra il petto, gambe a tavolino.',
      pos: 'Zona lombare appoggiata, collo lungo.',
      ese: ['Espira: stacca testa e spalle, distendi braccia (verso i fianchi) e gambe (a 45°) insieme.', 'Tieni: apri e chiudi le gambe una volta.', 'Inspira: piega prima le ginocchia a tavolino, poi i gomiti, e appoggia la testa.'],
      cue: 'Braccia e gambe partono insieme, il tronco è il punto fermo.',
      why: 'Allena la coordinazione tra braccia, gambe e respiro, con l’addome che tiene la schiena appoggiata.',
      err: ['Schiena che si stacca quando le gambe si allungano', 'Collo teso', 'Fare tutto senza pause']}); }
  // seduto verso la barra: stomach massage dritta e con rotazione
  { const H = [0, Y.seat], q = {t: 195, h: H}, S = pts([0, 0, q]).S, hand = [H[0] - 48, H[1] - 6], E = ik2(S, hand, U.UA, U.FA, back), ua = ang(S, E), fa = ang(E, hand);
    [['rf-stomach-dritta', 'Stomach massage a schiena dritta (mani dietro)', 'reformer stomach massage hands back', 0, 'Schiena dritta', 'Gambe distese: petto sempre aperto'],
     ['rf-stomach-twist', 'Stomach massage con rotazione', 'reformer stomach massage twist', 38, 'Con rotazione', 'Gambe distese e busto ruotato verso un lato']].forEach(([id, n, yq, tw, vn, c1]) => {
      const B = onBar([[ua, fa, {...q, th: 140, sh: 45, ft: 4}], [ua, fa, {...q, th: 91, sh: 91, ft: 4, tw}]], 1, 'toe');
      R({id, n, yq, g: 'gambe', g2: ['addome'], m: tw ? 'Quadricipiti, obliqui' : 'Quadricipiti, erettori spinali', mm: tw ? 'quadricipite, glutei; obliqui che ruotano il busto' : 'quadricipite, glutei; erettori spinali e trapezio medio che tengono il petto aperto', st: 'seat', fr: B.fr, molle: 'medie (es. 2 rosse)', fam: 'Stomach massage', varName: vn,
        ref: {x: RX(1), d: 1, on: 'H', off: 70, fix: 'A', bar: B.bar, cap: 'Seduto, mani sui poggiaspalle dietro di te, piedi sulla barra'},
        cap: ['Ginocchia piegate, mani dietro sui poggiaspalle, petto aperto', c1],
        set: 'Barra alta. Seduto sul carrello verso la barra, avampiedi sulla barra (talloni uniti), mani dietro di te sui poggiaspalle.',
        pos: 'Schiena dritta, petto aperto, spalle basse e lontane dalle orecchie.',
        ese: tw ? ['Espira e distendi le gambe.', 'Con le gambe tese ruota il busto verso un lato, tieni un attimo e torna al centro.', 'Inspira e piega le gambe. Alterna i lati.'] : ['Espira e distendi le gambe tenendo il petto alto.', 'Inspira e piega le gambe tornando lento.', 'Il busto non si muove: lavorano le gambe.'],
        cue: tw ? 'La rotazione parte dalla vita, il bacino resta fermo e dritto.' : 'Lo sterno va verso l’alto mentre le gambe spingono.',
        why: tw ? 'Unisce la spinta delle gambe alla rotazione del busto con il bacino fermo: obliqui e mobilità della colonna.' : 'Stesso lavoro delle gambe dello stomach massage, ma con la schiena dritta: rinforza i muscoli che tengono la postura eretta.',
        err: ['Busto che crolla indietro', 'Spalle alte', tw ? 'Ruotare il bacino invece del busto' : 'Schiena che si arrotonda']});
    }); }
  // seduto con la schiena ai montanti: abbraccio e shaving
  { const SEAT = {t: 180, h: [0, Y.seat], th: 145, sh: 25, ft: 10};
    R({id: 'rf-hug', n: 'Hug a tree seduto (abbraccio)', yq: 'reformer hug a tree seated', g: 'petto', g2: ['spalle'], m: 'Pettorali, deltoidi anteriori', mm: 'gran pettorale, deltoide anteriore, bicipite in tenuta; dentato anteriore', st: 'seat', eq: 'cable', presa: 'neu', gz: 74, gz2: 13, lat: 2.6, molle: 'leggere (es. 1 blu o 1 rossa)',
      fr: atU([[30, 150, SEAT], [86, 94, Object.assign({}, SEAT, {h: [-8, Y.seat]})]], 1, 'H', HOME + 30),
      ref: {x: RX(1), d: 1, on: 'H', off: 30, py: 140, cap: 'Seduto con la schiena verso i montanti, braccia aperte all’altezza delle spalle'},
      cap: ['Braccia aperte a “T”, gomiti appena piegati', 'Mani che si incontrano davanti al petto (abbraccio)'],
      trj: 'Le mani disegnano un grande arco orizzontale, dalle braccia aperte all’abbraccio davanti al petto.',
      set: 'Seduto sul carrello con la schiena verso i montanti, ginocchia piegate e piedi sul carrello (o gambe incrociate). Una cinghia per mano, braccia aperte all’altezza delle spalle.',
      pos: 'Busto dritto, gomiti morbidi e fermi, spalle basse.',
      ese: ['Espira e porta le braccia davanti al petto come se abbracciassi un albero.', 'Stringi il petto 1 secondo.', 'Inspira e riapri le braccia lentamente fino all’altezza delle spalle.'],
      cue: 'I gomiti restano alla stessa piega: muovi le braccia dalle spalle.',
      why: 'Una croce per il petto con un carico leggero e continuo, con il busto che deve stare dritto senza schienale.',
      err: ['Piegare e distendere i gomiti', 'Spalle che salgono', 'Busto che va avanti']});
    R({id: 'rf-shaving', n: 'Shaving seduto (spinta sopra la testa)', yq: 'reformer shaving the head seated', g: 'spalle', g2: ['tricipiti'], m: 'Deltoidi, tricipiti', mm: 'deltoide anteriore e laterale, tricipite, trapezio inferiore', st: 'seat', eq: 'cable', presa: 'pro', gz: 16, gz2: 9, molle: 'leggere (es. 1 blu o 1 rossa)',
      fr: atU([[150, 300, SEAT], [160, 160, Object.assign({}, SEAT, {h: [-8, Y.seat]})]], 1, 'H', HOME + 30),
      ref: {x: RX(1), d: 1, on: 'H', off: 30, py: 140, cap: 'Seduto con la schiena verso i montanti, mani dietro la testa'},
      cap: ['Mani unite dietro la testa, gomiti aperti', 'Braccia distese in diagonale avanti e in alto'],
      set: 'Seduto sul carrello con la schiena verso i montanti. Una cinghia per mano, mani unite dietro la testa, gomiti aperti.',
      pos: 'Busto dritto o leggermente inclinato in avanti dalle anche, collo lungo.',
      ese: ['Espira e distendi le braccia in diagonale, avanti e in alto, “rasando” la testa.', 'Inspira e riporta le mani dietro la testa.', 'Le spalle restano basse per tutto l’esercizio.'],
      cue: 'Spingi lontano verso l’alto senza alzare le spalle.',
      why: 'Rinforza spalle e tricipiti in alto sopra la testa con un carico leggero, e insegna a tenere le scapole basse.',
      err: ['Inarcare la schiena', 'Spalle alle orecchie', 'Testa che va avanti']}); }
  // short box: seduto sul box corto, piedi sotto la cinghia
  { const SB = {h: [0, 152], th: 97, sh: 97, ft: 14};
    const box = (id, n, yq, f0, f1, vn, o) => { const B = onBar([[f0[0], f0[1], Object.assign({}, SB, f0[2])], [f1[0], f1[1], Object.assign({}, SB, f1[2])]], 1, 'toe');
      R(Object.assign({id, n, yq, st: 'seat', fr: B.fr, fam: 'Short box', varName: vn, molle: 'pesanti, carrello bloccato (es. 3-4 rosse)', fin: ['tonificare'], tempo: [2.2, .8, 2.2],
        ref: {x: RX(1), d: 1, on: 'H', off: 58, box: 'short', strap: true, bar: B.bar, cap: 'Seduto sul box corto, piedi sotto la cinghia della barra'},
        set: 'Box corto messo di traverso sul carrello, contro i poggiaspalle; molle pesanti. Siediti sul box verso la barra e infila i piedi sotto la cinghia agganciata alla barra, gambe distese.'}, o)); };
    box('rf-box-round', 'Short box: schiena arrotondata', 'reformer short box round back', [90, 90, {t: 180}], [95, 95, {t: 212, cu: 28}], 'Schiena arrotondata',
      {g: 'addome', m: 'Addominali', mm: 'retto addominale, trasverso, obliqui (in allungamento controllato)', cap: ['Seduto dritto, braccia avanti', 'Schiena arrotondata a “C”, inclinata indietro'],
       pos: 'Braccia avanti all’altezza delle spalle (o mani sul bacino), sguardo verso le ginocchia.', ese: ['Inspira seduto dritto.', 'Espira e arrotola la schiena all’indietro a “C”, portando il bacino sotto.', 'Scendi fin dove l’addome tiene, poi torna su arrotolando.'],
       cue: 'L’ombelico va verso la colonna: la “C” deve restare tonda.', why: 'Rinforza gli addominali in allungamento, come un crunch al contrario, e mobilizza la parte bassa della schiena.', err: ['Schiena piatta o inarcata', 'Collo teso', 'Tirare con i piedi']});
    box('rf-box-flat', 'Short box: schiena piatta', 'reformer short box flat back', [180, 180, {t: 180}], [215, 215, {t: 215}], 'Schiena piatta',
      {g: 'addome', g2: ['schiena'], m: 'Addominali, erettori spinali', mm: 'retto addominale e trasverso, flessori dell’anca, erettori spinali che tengono la schiena dritta', cap: ['Seduto dritto, braccia sopra la testa', 'Busto inclinato indietro tutto dritto, braccia in linea'],
       pos: 'Braccia sopra la testa in linea con le orecchie, schiena lunga.', ese: ['Inspira e allunga la colonna verso l’alto.', 'Inclina il busto indietro tutto in un pezzo, dalle anche, fin dove la schiena resta dritta.', 'Espira e torna seduto dritto.'],
       cue: 'Sei una tavola che si inclina: dalle mani al bacino una sola linea.', why: 'Allena l’addome a sostenere il busto dritto con una leva lunga (le braccia sopra la testa): più difficile di quello che sembra.', err: ['Inarcare la schiena', 'Braccia che vanno indietro oltre la testa', 'Scendere troppo']});
    box('rf-box-twist', 'Short box: rotazione', 'reformer short box twist', [180, 180, {t: 180}], [180, 180, {t: 180, tw: 45}], 'Rotazione',
      {g: 'addome', m: 'Obliqui, addominali', mm: 'obliqui esterni e interni, trasverso, erettori spinali', az: .9, cap: ['Seduto dritto, braccia sopra la testa', 'Busto ruotato verso un lato, bacino fermo'],
       pos: 'Seduto dritto, braccia sopra la testa (o aperte a “T”), bacino fermo.', ese: ['Inspira e allungati verso l’alto.', 'Espira e ruota il busto verso un lato, tenendo il bacino fermo.', 'Torna al centro e ruota dall’altra parte.'],
       cue: 'Cresci in altezza mentre ruoti: la rotazione nasce dalla vita.', why: 'Mobilità della colonna in rotazione e forza degli obliqui, con le gambe bloccate dalla cinghia.', err: ['Ruotare il bacino', 'Piegarsi di lato', 'Braccia che cadono']});
    box('rf-box-lato', 'Short box: flessione laterale', 'reformer short box side over', [180, 180, {t: 180}], [180, 180, {t: 180, sb: 32}], 'Flessione laterale',
      {g: 'addome', m: 'Obliqui, quadrato dei lombi', mm: 'obliqui, quadrato dei lombi, gran dorsale in allungamento sul lato opposto', az: .9, cap: ['Seduto dritto, braccia sopra la testa', 'Busto piegato di lato, bacino fermo'],
       pos: 'Seduto dritto, braccia sopra la testa, entrambi gli ischi sul box.', ese: ['Inspira e allungati verso l’alto.', 'Espira e piega il busto di lato, senza ruotarlo e senza staccare il bacino.', 'Torna su e piegati dall’altra parte.'],
       cue: 'Piegati “sopra un pallone”: allunga il fianco che resta in alto.', why: 'Allunga e rinforza i fianchi (obliqui e quadrato dei lombi) con il bacino bloccato.', err: ['Ruotare il busto', 'Staccare un gluteo dal box', 'Piegarsi in avanti']}); }
  // in ginocchio, schiena ai montanti: abbraccio e tricipiti sopra la testa
  { const fr0 = (a0, a1, dx) => atU([[a0[0], a0[1], {...KN, h: [0, Y.knee - U.TH]}], [a1[0], a1[1], {...KN, h: [dx, Y.knee - U.TH]}]], 1, 'K', HOME + 74);
    const KB = 'In ginocchio sul carrello con la schiena verso i montanti (faccia verso la barra), piedi verso i poggiaspalle. Una cinghia per mano.';
    R({id: 'rf-hug-ginocchio', n: 'Hug a tree in ginocchio (abbraccio)', yq: 'reformer kneeling hug a tree', g: 'petto', g2: ['spalle'], m: 'Pettorali, deltoidi anteriori', mm: 'gran pettorale, deltoide anteriore, dentato anteriore; addome e glutei tengono il busto', st: 'kneel', eq: 'cable', presa: 'neu', gz: 74, gz2: 13, lat: 2.6, molle: 'leggere (es. 1 blu o 1 rossa)', fr: fr0([30, 150], [86, 94], -8),
      ref: {x: RX(1), d: 1, on: 'K', off: 74, py: 140, cap: 'In ginocchio, schiena verso i montanti, braccia aperte'},
      cap: ['Braccia aperte a “T”, gomiti appena piegati', 'Mani che si incontrano davanti al petto'],
      set: KB + ' Braccia aperte all’altezza delle spalle.', pos: 'Busto dritto, glutei stretti, gomiti morbidi e fermi.',
      ese: ['Espira e porta le braccia davanti al petto come in un abbraccio.', 'Stringi il petto 1 secondo.', 'Inspira e riapri lentamente senza farti tirare indietro.'],
      cue: 'Il busto non si muove: lavorano solo le braccia, dalle spalle.', why: 'Il petto lavora come in una croce, e in ginocchio sul carrello tutto il tronco deve tenere l’equilibrio.',
      err: ['Inarcare la schiena', 'Piegare i gomiti durante il movimento', 'Sedersi sui talloni']});
    R({id: 'rf-tricipiti-sopra', n: 'Tricipiti sopra la testa in ginocchio', yq: 'reformer kneeling overhead triceps', g: 'tricipiti', m: 'Tricipiti', mm: 'tricipite brachiale (soprattutto il capo lungo); deltoide e addome in tenuta', st: 'kneel', eq: 'cable', presa: 'neu', gz: 16, molle: 'leggere (es. 1 blu o 1 gialla)', fr: fr0([160, 320], [160, 160], -6),
      ref: {x: RX(1), d: 1, on: 'K', off: 74, py: 140, cap: 'In ginocchio, schiena verso i montanti, gomiti in alto'},
      cap: ['Gomiti in alto vicino alle orecchie, mani dietro la testa', 'Braccia distese in alto e avanti'],
      set: KB + ' Gomiti in alto vicino alle orecchie, mani dietro la testa.', pos: 'Busto dritto, addome in dentro per non inarcare la schiena, gomiti fermi.',
      ese: ['Espira e distendi i gomiti portando le mani in alto e in avanti.', 'Stringi i tricipiti 1 secondo.', 'Inspira e piega i gomiti lentamente, senza aprirli.'],
      cue: 'Gomiti fermi e stretti: si muovono solo gli avambracci.', why: 'Con il braccio sopra la testa il capo lungo del tricipite lavora allungato: è la parte più grande del muscolo.',
      err: ['Gomiti che si aprono', 'Inarcare la schiena', 'Spalle che salgono']}); }
  R({id: 'rf-rematore-ginocchio', n: 'Rematore in ginocchio con le cinghie', yq: 'reformer kneeling row straps', g: 'schiena', g2: ['bicipiti'], m: 'Dorsali, romboidi, bicipiti', mm: 'gran dorsale, romboidi, trapezio medio, deltoide posteriore, bicipiti; addome e glutei tengono il busto', st: 'kneel', eq: 'cable', presa: 'neu', lin: true, molle: 'leggere (es. 1 rossa o 1 blu)', fr: kneel([82, 82], [-35, 75]),
    ref: {x: RX(-1), d: -1, on: 'K', off: 30, py: 140, cap: 'In ginocchio sul carrello, faccia verso i montanti'},
    cap: ['Braccia avanti, cinghie in tensione', 'Gomiti dietro, mani ai fianchi'],
    set: KSET + ' Braccia avanti all’altezza del petto.', pos: 'Busto dritto, glutei stretti, spalle basse.',
    ese: ['Espira e porta i gomiti indietro vicino ai fianchi, avvicinando le scapole.', 'Fermati 1 secondo.', 'Inspira e distendi le braccia lentamente.'],
    cue: 'Tira con i gomiti, il busto resta una colonna.', why: 'Il rematore in ginocchio aggiunge l’equilibrio sul carrello: lavorano la schiena e tutto il tronco.',
    err: ['Inclinarsi indietro', 'Spalle che salgono', 'Sedersi sui talloni'], fam: 'Braccia in ginocchio al reformer', varName: 'Rematore'});
  // in appoggio sulla barra: knee stretch piatta e a ginocchia sollevate, down stretch, up stretch
  const KS = (id, n, yq, t0, ky, sh, back, vn, o) => { const K0 = [0, ky], H0 = add(K0, -U.TH, 15), S0 = add(H0, U.TL, t0), ua = 32, W = add(S0, U.UA + U.FA, ua), K1 = [K0[0] - back, ky], H1 = ik2(K1, S0, U.TH, U.TL, up);
    const fr = shift([[ua, ua, {t: t0, h: H0, th: 15, sh, ft: 30}], [ua, ua, {t: ang(H1, S0), h: H1, th: ang(H1, K1), sh, ft: 30}]], RX(1) + 207 - W[0]);
    R(Object.assign({id, n, yq, g: 'addome', g2: ['gambe'], st: 'kneel', fr, tempo: [1.0, .2, 1.2], fin: ['tonificare'], fam: 'Knee stretch', varName: vn,
      ref: {x: RX(1), d: 1, on: 'K', off: 74, bar: r1(W[1] + 6), cap: 'In ginocchio sul carrello, mani sulla barra'},
      set: 'Barra alta. In ginocchio sul carrello verso la barra, piedi contro i poggiaspalle, mani sulla barra alla larghezza delle spalle.'}, o)); };
  KS('rf-knee-stretch-piatta', 'Knee stretch a schiena piatta', 'reformer knee stretch flat back', 106, Y.knee, -90, 26, 'Schiena piatta',
    {m: 'Core, glutei, erettori spinali', mm: 'trasverso e retto dell’addome, erettori spinali (schiena dritta), grande gluteo, quadricipite', molle: 'medie (es. 2 rosse)', cap: ['Schiena piatta, bacino alto, mani sulla barra', 'Ginocchia spinte indietro, schiena sempre piatta'],
     pos: 'Schiena dritta come un tavolo, testa in linea, coccige verso l’alto.', ese: ['Spingi il carrello indietro con le ginocchia mantenendo la schiena piatta.', 'Richiamalo con l’addome senza farlo sbattere.', 'Ritmo vivace, 8-10 ripetizioni.'],
     cue: 'Il busto è un tavolo fermo: si muovono solo le cosce.', why: 'Con la schiena piatta lavorano di più gli estensori della schiena e i glutei, insieme all’addome che tiene la posizione.', err: ['Schiena che si arrotonda o si inarca', 'Spalle che dondolano', 'Carrello che sbatte']});
  KS('rf-knee-stretch-sollevate', 'Knee stretch a ginocchia sollevate', 'reformer knee stretch knees off', 116, 172, -84, 20, 'Ginocchia sollevate',
    {m: 'Core, quadricipiti, spalle', mm: 'trasverso e retto dell’addome, quadricipite, flessori dell’anca, deltoidi e dentato in tenuta', molle: 'medie (es. 1-2 rosse)', cap: ['Ginocchia sollevate di pochi centimetri, schiena arrotondata', 'Carrello spinto indietro, ginocchia sempre staccate'],
     pos: 'Schiena arrotondata, ginocchia sollevate di 3-5 cm dal carrello, talloni contro i poggiaspalle.', ese: ['Solleva le ginocchia di pochi centimetri.', 'Spingi e richiama il carrello con movimenti piccoli e veloci.', '10 ripetizioni, poi appoggia le ginocchia.'],
     cue: 'Le ginocchia “galleggiano”: il carrello si muove, il bacino no.', why: 'La versione più difficile del knee stretch: senza l’appoggio delle ginocchia addome e spalle lavorano molto di più.', err: ['Bacino che sale e scende', 'Ginocchia che toccano il carrello', 'Spalle che crollano']});
  { const K0 = [0, Y.knee], H0 = add(K0, -U.TH, -18), S0 = add(H0, U.TL, 140), W = add(S0, U.UA + U.FA, 40), K1 = [K0[0] - 30, Y.knee], S1 = add(W, -(U.UA + U.FA), 56), H1 = ik2(K1, S1, U.TH, U.TL, up);
    const fr = shift([[40, 40, {t: 140, h: H0, th: -18, sh: -90, ft: 30}], [56, 56, {t: ang(H1, S1), h: H1, th: ang(H1, K1), sh: -90, ft: 30}]], RX(1) + 207 - W[0]);
    R({id: 'rf-down-stretch', n: 'Down stretch (in ginocchio, petto aperto)', yq: 'reformer down stretch', g: 'schiena', g2: ['spalle', 'addome'], m: 'Erettori spinali, glutei, deltoidi', mm: 'erettori spinali, grande gluteo, deltoidi e tricipiti (spingono il carrello), addome che protegge la zona lombare', st: 'kneel', fr, molle: 'medie (es. 1-2 rosse)', fin: ['tonificare'], fam: 'Plank e appoggi sulla barra', varName: 'Down stretch',
      ref: {x: RX(1), d: 1, on: 'K', off: 74, bar: r1(W[1] + 6), cap: 'In ginocchio, ginocchia vicino ai poggiaspalle, mani sulla barra, petto aperto'},
      cap: ['In ginocchio, bacino avanti, petto aperto, mani sulla barra', 'Carrello indietro: corpo allungato e arcuato dalle ginocchia alla testa'],
      set: 'Barra alta. In ginocchio sul carrello verso la barra, ginocchia vicino ai poggiaspalle, piedi contro i poggiaspalle, mani sulla barra.',
      pos: 'Bacino spinto avanti, glutei stretti, petto aperto, spalle basse.',
      ese: ['Inspira e spingi il carrello indietro allungando il corpo e aprendo il petto.', 'Espira e richiamalo stringendo i glutei e l’addome.', '4-6 ripetizioni lente.'],
      cue: 'Allungati in un arco lungo, non schiacciare la zona lombare.', why: 'Estensione controllata della schiena con le braccia che lavorano: utile contro la postura curva.',
      err: ['Schiacciare la zona lombare', 'Spalle alle orecchie', 'Bacino che resta indietro']}); }
  { const W = [0, 152];
    const pike = (() => { const th = -16, A0 = [0, Y.ank - 3], H = add(A0, -(U.TH + U.SH), th), t = Math.acos((W[1] - H[1]) / 127) / D, Wx = H[0] + 127 * Math.sin(t * D); return {f: [t, t, {t, h: [H[0] - Wx, H[1]], th, sh: th, ft: 40 - th}]}; })();
    const plank = (() => { const ua = 22, S = add(W, -(U.UA + U.FA), ua), t = Math.acos((S[1] - (Y.ank - 3)) / 152) / D, H = add(S, -U.TL, t); return [ua, ua, {t, h: H, th: t - 180, sh: t - 180, ft: 30}]; })();
    const fr = shift([pike.f, plank], RX(1) + 207 - W[0]);
    R({id: 'rf-up-stretch', n: 'Up stretch (dal pike al plank)', yq: 'reformer up stretch', g: 'addome', g2: ['spalle'], m: 'Core, deltoidi, femorali', mm: 'trasverso e retto dell’addome, deltoidi, dentato anteriore, gran dorsale; femorali in allungamento attivo', st: 'stand', fr, molle: 'leggere o medie (es. 1 rossa + 1 blu)', fin: ['tonificare'], ct: [0, .95, 5.4], fam: 'Plank e appoggi sulla barra', varName: 'Up stretch',
      ref: {x: RX(1), d: 1, on: 'A', off: 28, bar: r1(W[1] + 6), cap: 'Mani sulla barra, avampiedi contro i poggiaspalle'},
      cap: ['Bacino alto a “V” rovesciata, talloni sollevati', 'Carrello indietro fino al plank: corpo dritto'],
      trj: 'Il bacino scende e il carrello va indietro fino al plank, poi il bacino risale e richiama il carrello.',
      set: 'Barra alta. Mani sulla barra, avampiedi sul carrello con i talloni contro i poggiaspalle, bacino alto.',
      pos: 'Braccia tese, testa tra le braccia, talloni sollevati.',
      ese: ['Inspira e spingi il carrello indietro abbassando il bacino fino al plank.', 'Espira e riporta il bacino in alto richiamando il carrello con l’addome.', '4-6 ripetizioni.'],
      cue: 'Dal plank torna su “piegandoti” dalle anche, non dalle spalle.', why: 'Collega plank e pike: forza dell’addome e delle spalle insieme alla flessibilità dei femorali.',
      err: ['Bacino che scende troppo nel plank', 'Spalle che vanno oltre le mani', 'Ginocchia piegate']}); }
  // mani sulla pedana, piedi sul carrello: ginocchia al petto e pike (barra abbassata)
  { const W = [0, 183], S = [0, 183 - (U.UA + U.FA)], t0 = Math.acos((S[1] - (Y.ank - 3)) / 152) / D, H0 = add(S, -U.TL, t0), A0 = add(H0, U.TH + U.SH, t0 - 180), f0 = [0, 0, {t: t0, h: H0, th: t0 - 180, sh: t0 - 180, ft: 30}];
    const A1 = [A0[0] + 38, A0[1]], H1 = add(S, -U.TL, 100), K1 = ik2(H1, A1, U.TH, U.SH, down), tuck = [0, 0, {t: 100, h: H1, th: ang(H1, K1), sh: ang(K1, A1), ft: 30}];
    const A2 = [A0[0] + 50, A0[1]], H2 = ik2(S, A2, U.TL, U.TH + U.SH, up), pk = [0, 0, {t: ang(H2, S), h: H2, th: ang(H2, A2), sh: ang(H2, A2), ft: 30}];
    const dx = RX(1) + 226 - W[0];
    const PL = {st: 'stand', molle: 'leggere (es. 1 rossa); meno molle = più difficile', fin: ['tonificare'], fam: 'Plank e appoggi sulla barra', ct: [.15, .7, 5.0],
      set: 'Barra dei piedi abbassata. Mani sulla pedana alla larghezza delle spalle, piedi sul carrello con i talloni contro i poggiaspalle: corpo in plank.', pos: 'Spalle sopra le mani, addome in dentro, glutei stretti.'};
    R(Object.assign({id: 'rf-knee-tuck', n: 'Ginocchia al petto (mani sulla pedana)', yq: 'reformer knee tuck plank', g: 'addome', g2: ['spalle'], m: 'Addominali, flessori dell’anca, spalle', mm: 'retto addominale (parte bassa), trasverso, ileopsoas, deltoidi e dentato in tenuta', fr: shift([f0, tuck], dx), varName: 'Ginocchia al petto',
      ref: {x: RX(1), d: 1, on: 'A', off: 28, bar: 194, cap: 'Plank: mani sulla pedana, piedi sul carrello'},
      cap: ['Plank sulle mani', 'Ginocchia al petto: il carrello arriva verso le mani'],
      ese: ['Espira e porta le ginocchia verso il petto arrotondando la schiena: il carrello viene avanti.', 'Inspira e torna in plank allontanando il carrello piano.', '8-10 ripetizioni.'],
      cue: 'Tira con l’addome, non con le gambe: la schiena si arrotonda.', why: 'Un mountain climber a due gambe con il carrello: lavora molto la parte bassa dell’addome e la stabilità delle spalle.',
      err: ['Bacino che cade nel plank', 'Spalle che vanno indietro', 'Carrello che scappa']}, PL));
    R(Object.assign({id: 'rf-pike', n: 'Pike (mani sulla pedana)', yq: 'reformer pike plank', g: 'addome', g2: ['spalle'], m: 'Addominali, spalle, femorali', mm: 'retto addominale e trasverso, deltoidi, dentato anteriore, ischiocrurali in allungamento', fr: shift([f0, pk], dx), varName: 'Pike',
      ref: {x: RX(1), d: 1, on: 'A', off: 28, bar: 194, cap: 'Plank: mani sulla pedana, piedi sul carrello'},
      cap: ['Plank sulle mani', 'Bacino alto, gambe tese: “V” rovesciata'],
      ese: ['Espira e solleva il bacino con le gambe tese: il carrello viene avanti.', 'Inspira e torna in plank lentamente.', '6-8 ripetizioni.'],
      cue: 'Il bacino sale verso il soffitto, le spalle restano sopra le mani.', why: 'Più duro delle ginocchia al petto: l’addome solleva tutto il corpo a gambe tese e i femorali si allungano.',
      err: ['Piegare le ginocchia', 'Spalle che arretrano', 'Scendere di colpo nel plank']}, PL)); }

  // famiglie di varianti (pulsanti nella scheda)
  const F = (fam, m) => Object.entries(m).forEach(([id, v]) => { const e = EX.find(x => x.id === id); if (e) { e.fam = fam; e.varName = v; } });
  F('Footwork al reformer', {'rf-footwork': 'Punte', 'rf-footwork-talloni': 'Talloni', 'rf-footwork-arco': 'Arco del piede', 'rf-footwork-v': 'In “V”', 'rf-footwork-larghe': 'Piedi larghi', 'rf-footwork-una-gamba': 'Una gamba', 'rf-polpacci': 'Polpacci'});
  F('Ponte al reformer', {'rf-ponte': 'Classico', 'rf-ponte-una-gamba': 'Una gamba', 'rf-ponte-spinta': 'Con spinta del carrello'});
  F('Stomach massage', {'rf-stomach': 'Schiena arrotondata', 'rf-stomach-dritta': 'Schiena dritta', 'rf-stomach-twist': 'Con rotazione'});
  F('Knee stretch', {'rf-knee-stretch': 'Schiena arrotondata', 'rf-knee-stretch-piatta': 'Schiena piatta', 'rf-knee-stretch-sollevate': 'Ginocchia sollevate'});
  F('Plank e appoggi sulla barra', {'rf-long-stretch': 'Long stretch', 'rf-up-stretch': 'Up stretch', 'rf-down-stretch': 'Down stretch', 'rf-elephant': 'Elephant', 'rf-knee-tuck': 'Ginocchia al petto', 'rf-pike': 'Pike'});
  F('Braccia in ginocchio al reformer', {'rf-chest-exp': 'Chest expansion', 'rf-curl': 'Curl', 'rf-tricipiti': 'Tricipiti dietro', 'rf-tricipiti-sopra': 'Tricipiti sopra la testa', 'rf-rematore-ginocchio': 'Rematore', 'rf-press': 'Chest press', 'rf-hug-ginocchio': 'Abbraccio'});
  F('Braccia da sdraiato al reformer', {'rf-hundred': 'Hundred', 'rf-braccia-giu': 'Braccia in giù', 'rf-tricipiti-supino': 'Tricipiti', 'rf-coordination': 'Coordination'});
  F('Piedi nelle cinghie', {'rf-rana': 'Rana', 'rf-gambe-giu': 'Gambe in giù'});
  F('Braccia da seduto al reformer', {'rf-rematore': 'Rematore', 'rf-hug': 'Abbraccio', 'rf-shaving': 'Shaving'});
})();

/* ===== Stretching e postura (v148): sezione a parte (ex.str), si sceglie per muscolo (ex.sm) e si aggiunge a qualsiasi seduta.
   ex.dose = quanto farlo (secondi di tenuta o ripetizioni); niente carico. I primi 5 vengono dal reel di Maru Lekhal ben (@teammarufit). ===== */
(() => {
  if (EX.some(e => e.id === 'st-collo-lato')) return;
  const U = {TH: 46, SH: 48, UA: 35, FA: 34, TL: 58}, D = Math.PI / 180;
  const dir = a => [Math.sin(a * D), Math.cos(a * D)], add = (p, l, a) => { const d = dir(a); return [p[0] + l * d[0], p[1] + l * d[1]]; };
  const ang = (p, q) => Math.atan2(q[0] - p[0], q[1] - p[1]) / D;
  const ik2 = (a, b, l1, l2, pick) => { const dx = b[0] - a[0], dy = b[1] - a[1], d0 = Math.hypot(dx, dy), d = Math.min(d0, l1 + l2 - .01), x = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - x * x)), ux = dx / d0, uy = dy / d0;
    const c1 = [a[0] + x * ux - h * uy, a[1] + x * uy + h * ux], c2 = [a[0] + x * ux + h * uy, a[1] + x * uy - h * ux]; return pick(c1, c2); };
  const up = (c1, c2) => c1[1] < c2[1] ? c1 : c2, down = (c1, c2) => c1[1] > c2[1] ? c1 : c2, back = (c1, c2) => c1[0] < c2[0] ? c1 : c2, fwd = (c1, c2) => c1[0] > c2[0] ? c1 : c2;
  const r1 = v => Math.round(v * 10) / 10;
  const legTo = (H, A, pick) => { const K = ik2(H, A, U.TH, U.SH, pick || up); return [r1(ang(H, K)), r1(ang(K, A))]; };
  const armTo = (S, W, pick) => { const E = ik2(S, W, U.UA, U.FA, pick || back); return [r1(ang(S, E)), r1(ang(E, W))]; };
  const hug = (t, cu) => { const S = cu ? add(add([0, 0], 29, t + cu), 29, t) : add([0, 0], 58, t), up = dir(t), fw = dir(t - 90), W = [S[0] + 14 * fw[0] - 6 * up[0], S[1] + 14 * fw[1] - 6 * up[1]];
    const c = [0, 1].map(i => ik2(S, W, U.UA, U.FA, (a, b) => i ? a : b)), E = c.sort((a, b) => ((a[0] - S[0]) * up[0] + (a[1] - S[1]) * up[1]) - ((b[0] - S[0]) * up[0] + (b[1] - S[1]) * up[1]))[0];
    return [r1(ang(S, E)), r1(ang(E, W))]; };   // braccia incrociate con le mani sulle spalle opposte (gomiti in basso rispetto al busto)
  const sh = (h, tl, t, cu) => cu ? add(add(h, tl / 2, t + cu), tl / 2, t) : add(h, tl, t);   // spalla dal bacino
  const SMG = {collo: 'spalle', spalle: 'spalle', petto: 'petto', dorsali: 'schiena', lombare: 'schiena', braccia: 'avambracci', fianchi: 'addome', glutei: 'gambe', flessori: 'gambe', quadricipiti: 'gambe', femorali: 'gambe', adduttori: 'gambe', polpacci: 'gambe', postura: 'schiena'};
  const ST = o => { const dyn = !!o.dyn; EX.push(Object.assign({a: 'Corpo libero', str: true, tipo: 'str', g: SMG[o.sm[0]], fin: ['tonificare', 'massa', 'forza'], prio: false, isom: !dyn, hold: dyn ? undefined : o.dose, tempo: dyn ? [1.3, .4, 1.5] : [1.6, .5, 1.8], yq: o.yq || (o.n.split(' (')[0] + ' stretching')}, o)); };
  const FLOOR = 222, STAND = 118, LIEY = 197, PRONE = 205, KNEE = 214;
  const SEAT = {h: [120, 165], th: 90, sh: 0};
  const thighs = (H) => { const S = add(H, U.TL, 180), W = [H[0] + 34, H[1] - 8]; return armTo(S, W, down); };   // mani appoggiate sulle cosce, da seduto

  // ---------------- dal reel di Maru Lekhal ben (postura) ----------------
  const REEL = 'Dal reel di Maru Lekhal ben (@teammarufit), che propone questi movimenti ogni giorno per la postura.';
  { const A = [205, 212], W = [100, 216], S1 = [W[0], W[1] - 69], H1 = [S1[0] + 58, S1[1]], H0 = [146, 208], S0 = ik2(H0, W, 58, 69, up), [th0, sh0] = legTo(H0, A), [th1, sh1] = legTo(H1, A), ua0 = r1(ang(S0, W));
    ST({id: 'st-ponte-inverso', n: 'Ponte inverso dal seduto (tavolo)', sm: ['petto', 'spalle', 'flessori', 'postura'], dyn: true, dose: '20-25 ripetizioni', m: 'Glutei, pettorali, deltoidi', mm: 'grande gluteo e femorali (sollevano il bacino); in allungamento pettorali, deltoidi anteriori e flessori dell’anca', st: 'floor', yq: 'reverse tabletop exercise posture',
      fr: [[ua0, ua0, {t: r1((ang(H0, S0) + 360) % 360), h: H0, th: th0, sh: sh0}], [0, 0, {t: 270, h: H1, th: th1, sh: sh1}]],
      cap: ['Seduto a terra, mani dietro e piedi appoggiati', 'Bacino su: spalle, anche e ginocchia in linea come un tavolo'],
      set: 'A terra, seduto con le ginocchia piegate e i piedi appoggiati, mani dietro di te con le dita verso i piedi.', pos: 'Braccia tese, spalle lontane dalle orecchie, sguardo in alto.',
      ese: ['Spingi su mani e piedi e porta il bacino in alto fino al “tavolo”.', 'Apri il petto e stringi i glutei 1-2 secondi.', 'Torna seduto senza appoggiare del tutto il bacino.'],
      cue: 'Spingi il petto verso il cielo: le spalle si aprono all’indietro.', why: REEL + ' Apre petto e spalle chiuse in avanti e attiva i glutei: il contrario della posizione da scrivania.',
      err: ['Spalle che salgono verso le orecchie', 'Bacino che resta basso', 'Testa che cade all’indietro di colpo']}); }
  ST({id: 'st-ragdoll', n: 'Piegamento in avanti a gambe larghe, braccia incrociate', sm: ['femorali', 'adduttori', 'lombare'], dose: '30-45 s', m: 'Femorali, adduttori, erettori spinali', mm: 'ischiocrurali, adduttori, erettori spinali, polpacci', st: 'stand', gz: -16, yq: 'wide leg forward fold ragdoll stretch',
    fr: [[...hug(180), {t: 180}], [...hug(32), {t: 32, nk: 15}]], cap: ['In piedi a gambe larghe, braccia incrociate sulle spalle', 'Busto appeso in avanti tra le gambe, collo rilassato'],
    set: 'In piedi con i piedi molto larghi, punte un po’ aperte. Incrocia le braccia appoggiando le mani sulle spalle opposte.', pos: 'Ginocchia morbide, peso sull’avampiede, collo rilassato.',
    ese: ['Piegati in avanti dalle anche lasciando cadere il busto tra le gambe.', 'Lascia pendere testa e braccia e respira lento.', 'Risali piano arrotolando la schiena.'],
    cue: 'Lasciati “appendere” come una bambola di pezza: il peso della testa allunga la schiena.', why: REEL + ' Allunga femorali, interno coscia e schiena tutti insieme, scaricando la colonna.',
    err: ['Ginocchia bloccate', 'Rimbalzare', 'Rialzarsi di scatto (gira la testa)']});
  { const H = [120, 208], S = add(H, 58, 195), W = add(S, 69, -25), ua = r1(ang(S, W));
    ST({id: 'st-90-90', n: 'Rotazione delle anche a tergicristallo (90/90)', sm: ['glutei', 'flessori', 'lombare'], dyn: true, dose: '20 ripetizioni (10 per lato)', m: 'Glutei, flessori dell’anca', mm: 'rotatori dell’anca (piriforme, gluteo medio e piccolo), flessori dell’anca, adduttori', st: 'floor', yq: '90 90 hip switch mobility',
      fr: [[ua, ua, {t: 195, h: H, th: 130, sh: 30, lz: -32}], [ua, ua, {t: 195, h: H, th: 130, sh: 30, lz: 32}]], cap: ['Seduto, ginocchia piegate che cadono da un lato', 'Ginocchia portate dall’altro lato, busto fermo'],
      set: 'Seduto a terra, mani dietro, piedi più larghi del bacino e ginocchia piegate.', pos: 'Busto alto, peso sulle mani, piedi fermi a terra.',
      ese: ['Lascia cadere entrambe le ginocchia verso destra.', 'Riportale al centro e falle cadere verso sinistra.', 'Movimento lento e controllato, 20 volte.'],
      cue: 'Le ginocchia oscillano come un tergicristallo, i piedi restano incollati a terra.', why: REEL + ' Muove le anche in rotazione interna ed esterna e scioglie bacino e zona lombare.',
      err: ['Staccare i piedi', 'Andare veloci a scatti', 'Busto che crolla indietro']}); }
  { const K = [190, KNEE], H = [150, r1(KNEE - Math.sqrt(46 * 46 - 40 * 40))], th = r1(ang(H, K));
    ST({id: 'st-bambino-mani-testa', n: 'Posizione del bambino con le mani dietro la testa', sm: ['dorsali', 'collo', 'lombare', 'postura'], dose: '30-45 s', m: 'Erettori spinali, trapezio, dorsali', mm: 'erettori spinali, trapezio, romboidi, muscoli posteriori del collo', st: 'kneel', benchSt: 'kneel', yq: 'child pose hands behind head thoracic stretch',
      fr: [[150, 300, {t: 180, h: H, th, sh: -90, ft: 60}], [35, 185, {t: 65, h: H, th, sh: -90, ft: 60, nk: 25}]], cap: ['In ginocchio seduto sui talloni, mani dietro la testa', 'Busto e testa giù verso le ginocchia, schiena arrotondata'],
      set: 'In ginocchio, seduto sui talloni. Intreccia le dita dietro la testa, gomiti in avanti.', pos: 'Glutei sui talloni per tutto il tempo.',
      ese: ['Arrotola la schiena portando la fronte verso le ginocchia.', 'Lascia il peso delle braccia sulla testa, senza tirare.', 'Respira nella schiena 30-45 secondi e risali lento.'],
      cue: 'Respira “nella schiena”: a ogni espirazione scendi un po’ di più.', why: REEL + ' Allunga la schiena alta e il collo, rigidi dopo tante ore seduti.',
      err: ['Tirare la testa con le mani', 'Glutei che si alzano', 'Trattenere il respiro']}); }
  { const K = [140, KNEE], H = [140, KNEE - 46], S0 = sh(H, 58, 115), H1 = [136, KNEE - 45], t1 = r1(Math.acos((200 - H1[1]) / 58) / D), S1 = add(H1, 58, t1), ua1 = r1(ang(S1, [S1[0] + 66, 212]));
    ST({id: 'st-cucciolo', n: 'Allungamento del cucciolo (petto a terra, braccia avanti)', sm: ['spalle', 'dorsali', 'petto', 'postura'], dyn: true, dose: '20 ripetizioni lente', m: 'Dorsali, deltoidi, pettorali', mm: 'gran dorsale, deltoidi, pettorali, tricipite (capo lungo), muscoli della schiena alta', st: 'kneel', benchSt: 'kneel', yq: 'puppy pose stretch shoulders',
      fr: [[0, 0, {t: 115, h: H, th: 0, sh: -90, ft: 60}], [ua1, ua1, {t: t1, h: H1, th: -2, sh: -90, ft: 60}]], cap: ['A quattro zampe, mani sotto le spalle', 'Petto verso terra, braccia distese avanti, bacino sopra le ginocchia'],
      set: 'A quattro zampe: ginocchia sotto le anche, mani un po’ avanti rispetto alle spalle.', pos: 'Bacino sopra le ginocchia: non sederti sui talloni.',
      ese: ['Fai scivolare le mani in avanti e porta il petto verso terra.', 'Tieni 2 secondi sentendo l’allungamento sotto le ascelle.', 'Torna a quattro zampe; ripeti 20 volte.'],
      cue: 'Il petto scende verso il pavimento come se volessi toccarlo con lo sterno.', why: REEL + ' Apre spalle e petto ed è uno degli esercizi migliori contro le spalle curve.',
      err: ['Sedersi sui talloni', 'Inarcare troppo la zona lombare', 'Spalle alle orecchie']}); }

  // ---------------- collo (seduto sul bordo di una panca) ----------------
  const [tua, tfa] = thighs(SEAT.h), NECK = {st: 'seat', benchSt: 'edge', dose: '20-30 s per lato', ct: [0, .95, 3.6]};
  const neck = (id, n, o, last, m, mm, cap, ese, cue, why, err) => ST(Object.assign({id, n, sm: ['collo'], m, mm, fr: [[tua, tfa, Object.assign({t: 180}, SEAT)], [tua, tfa, Object.assign({t: 180}, SEAT, last)]], cap, ese, cue, why, err,
    set: 'Seduto dritto sul bordo di una panca o di una sedia, piedi a terra, mani sulle cosce.', pos: 'Spalle basse e rilassate, schiena dritta.'}, NECK, o));
  neck('st-collo-lato', 'Allungamento laterale del collo', {az: 1.3}, {nkl: -38}, 'Trapezio superiore, scaleni', 'trapezio superiore, scaleni, sternocleidomastoideo',
    ['Seduto dritto, testa centrata', 'Orecchio verso la spalla, spalla opposta bassa'], ['Porta l’orecchio verso la spalla, senza alzarla.', 'Se vuoi, appoggia la mano dello stesso lato sulla testa (solo il peso, non tirare).', 'Tieni 20-30 secondi e cambia lato.'],
    'Spingi la spalla opposta verso il pavimento: l’allungamento aumenta da solo.', 'Scioglie la parte alta delle spalle, che si irrigidisce con stress e scrivania.', ['Alzare la spalla verso l’orecchio', 'Tirare la testa con la mano', 'Ruotare il viso']);
  neck('st-collo-avanti', 'Allungamento del collo in avanti (mento al petto)', {}, {nk: 42}, 'Trapezio, estensori del collo', 'trapezio superiore, splenio, semispinale, elevatore della scapola',
    ['Seduto dritto, testa centrata', 'Mento verso il petto, nuca lunga'], ['Porta il mento verso il petto.', 'Allunga la nuca come se un filo ti tirasse verso l’alto e in avanti.', 'Tieni 20-30 secondi.'],
    'Allunga la nuca, non schiacciare la gola.', 'Allunga la parte posteriore del collo, utile dopo tanto tempo al telefono o al computer.', ['Curvare tutta la schiena', 'Spalle in avanti']);
  neck('st-collo-rotazione', 'Rotazione del collo', {dyn: true, dose: '8-10 per lato', az: .9}, {nkr: 78}, 'Muscoli del collo', 'sternocleidomastoideo, splenio, scaleni',
    ['Sguardo avanti', 'Testa girata a guardare oltre la spalla'], ['Gira la testa lentamente verso destra, fin dove arrivi senza dolore.', 'Torna al centro e gira a sinistra.', 'Tieni il mento alla stessa altezza.'],
    'Gira come se guardassi dietro di te, il busto resta fermo.', 'Mantiene la mobilità del collo in rotazione (guidare, fare retromarcia).', ['Inclinare la testa mentre giri', 'Muovere le spalle']);
  neck('st-collo-trapezio', 'Allungamento dell’elevatore della scapola (naso verso l’ascella)', {az: 1.0}, {nk: 32, nkr: -35, nkl: -14}, 'Trapezio, elevatore della scapola', 'elevatore della scapola, trapezio superiore',
    ['Seduto dritto', 'Naso verso l’ascella opposta'], ['Ruota la testa di circa 45° e abbassa il naso verso l’ascella.', 'Appoggia piano la mano sulla nuca, senza tirare.', 'Tieni 20-30 secondi e cambia lato.'],
    'Guarda verso la tasca dei pantaloni opposta.', 'Allunga il muscolo che solleva la scapola, spesso rigido e dolorante.', ['Tirare con la mano', 'Alzare la spalla']);
  neck('st-collo-scaleni', 'Allungamento degli scaleni (collo in alto e di lato)', {az: 1.2}, {nk: -22, nkl: -24, nkr: 15}, 'Scaleni, sternocleidomastoideo', 'scaleni anteriori e medi, sternocleidomastoideo',
    ['Seduto dritto', 'Testa inclinata indietro e di lato, sguardo in alto'], ['Abbassa la spalla e tieni ferma la clavicola con la mano opposta.', 'Inclina la testa di lato e leggermente indietro, sguardo in alto.', 'Tieni 20-30 secondi e cambia lato.'],
    'Allunga la parte davanti del collo, senza schiacciare la nuca.', 'Allunga i muscoli davanti e di lato al collo, tesi quando si respira solo con il petto.', ['Andare troppo indietro con la testa', 'Spalla che sale']);
  neck('st-chin-tuck', 'Retrazione del mento (doppio mento)', {dyn: true, dose: '10-15 ripetizioni (tieni 3 s)', sm: ['collo', 'postura'], az: 0}, {nk: 14}, 'Flessori profondi del collo', 'flessori profondi del collo (lungo del collo), estensori della parte alta della nuca in allungamento',
    ['Testa in avanti, come davanti allo schermo', 'Mento indietro, nuca lunga, “doppio mento”'], ['Porta il mento indietro in orizzontale, senza abbassare lo sguardo.', 'Tieni 3 secondi con la nuca lunga.', 'Rilassa e ripeti.'],
    'Fai il “doppio mento”: la testa scivola indietro sopra le spalle.', 'Corregge la testa portata in avanti, la postura tipica di chi lavora al computer o al telefono.', ['Guardare in basso invece di arretrare', 'Inclinare la testa all’indietro']);

  // ---------------- postura ----------------
  ST({id: 'st-wall-angels', n: 'Angeli al muro', sm: ['postura', 'spalle', 'petto'], dyn: true, dose: '10-12 ripetizioni lente', m: 'Trapezio, romboidi, deltoidi', mm: 'trapezio medio e inferiore, romboidi, cuffia dei rotatori; pettorali in allungamento', st: 'stand', v: 'f', yq: 'wall angels posture',
    fr: [[90, 180], [165, 172]], cap: ['Schiena al muro, braccia a “W”', 'Braccia in alto a “Y”, sempre appoggiate al muro'],
    set: 'In piedi con schiena, testa e glutei appoggiati al muro, piedi un passo avanti. Braccia a “W”: gomiti all’altezza delle spalle, dorso delle mani al muro.', pos: 'Zona lombare vicina al muro, mento leggermente dentro.',
    ese: ['Fai scivolare le braccia verso l’alto lungo il muro fino a “Y”.', 'Riscendi a “W” portando i gomiti verso i fianchi.', 'Mani e gomiti restano sempre a contatto con il muro.'],
    cue: 'Le scapole scendono nelle tasche posteriori mentre le braccia salgono.', why: 'Insegna alle scapole a muoversi bene e apre il petto: l’esercizio base contro le spalle curve.',
    err: ['Staccare la schiena o i gomiti dal muro', 'Inarcare la zona lombare', 'Alzare le spalle']});
  ST({id: 'st-scapole-w', n: 'Retrazione delle scapole a “W”', sm: ['postura', 'dorsali'], dyn: true, dose: '12-15 ripetizioni (tieni 2 s)', m: 'Romboidi, trapezio medio', mm: 'romboidi, trapezio medio e inferiore, deltoide posteriore', st: 'stand', gz: 30, lat: 2.2, yq: 'scapular retraction w exercise',
    fr: [[25, 105, {t: 180}], [-32, 68, {t: 180}]], cap: ['Gomiti piegati davanti, mani all’altezza delle spalle', 'Gomiti indietro e in basso: scapole strette'],
    set: 'In piedi, gomiti piegati a 90° e mani all’altezza delle spalle, palmi in avanti.', pos: 'Busto dritto, mento dentro, addome attivo.',
    ese: ['Porta i gomiti indietro e in basso stringendo le scapole: le braccia formano una “W”.', 'Tieni 2 secondi.', 'Torna lentamente.'],
    cue: 'Metti le scapole nelle tasche posteriori dei pantaloni.', why: 'Rinforza i muscoli tra le scapole, che tengono le spalle indietro e la schiena dritta.',
    err: ['Alzare le spalle', 'Inarcare la schiena', 'Spingere il mento in avanti']});
  { const H = [150, PRONE];
    ST({id: 'st-superman', n: 'Superman (prono, braccia e gambe sollevate)', sm: ['postura', 'lombare'], dyn: true, dose: '10-12 ripetizioni (tieni 2 s)', m: 'Erettori spinali, glutei', mm: 'erettori spinali, grande gluteo, femorali, trapezio, deltoidi posteriori', st: 'floor', yq: 'superman exercise',
      fr: [[90, 90, {t: 90, h: H, th: -90, sh: -90, ft: 60}], [100, 100, {t: 100, h: H, th: -100, sh: -100, ft: 60, nk: -5}]], cap: ['Prono, braccia avanti', 'Braccia, petto e gambe sollevati di pochi centimetri'],
      set: 'A pancia in giù sul tappetino, braccia distese avanti, gambe distese.', pos: 'Sguardo verso il pavimento, collo lungo.',
      ese: ['Solleva insieme braccia, petto e gambe di pochi centimetri.', 'Tieni 2 secondi stringendo i glutei.', 'Scendi lentamente.'],
      cue: 'Allungati in lunghezza più che in altezza.', why: 'Rinforza tutta la catena posteriore che tiene la schiena dritta.',
      err: ['Alzare troppo la testa', 'Movimento a scatti', 'Piegare le ginocchia']});
    ST({id: 'st-y-prono', n: 'Sollevamenti a “Y” da prono', sm: ['postura', 'spalle'], dyn: true, dose: '10-12 ripetizioni (tieni 2 s)', m: 'Trapezio inferiore, deltoidi', mm: 'trapezio inferiore e medio, deltoide posteriore, cuffia dei rotatori', st: 'floor', gz: 44, yq: 'prone y raise',
      fr: [[96, 96, {t: 90, h: H, th: -90, sh: -90, ft: 60}], [110, 110, {t: 96, h: H, th: -90, sh: -90, ft: 60}]], cap: ['Prono, braccia avanti a “Y”, pollici in alto', 'Braccia sollevate dal pavimento, scapole basse'],
      set: 'A pancia in giù, braccia distese avanti e aperte a “Y”, pollici verso l’alto.', pos: 'Fronte vicino al pavimento, gambe rilassate.',
      ese: ['Solleva le braccia tese di pochi centimetri portando le scapole verso il basso.', 'Tieni 2 secondi.', 'Riappoggia lentamente.'],
      cue: 'Pensa a portare le scapole giù e indietro, non le mani in alto.', why: 'Rinforza la parte bassa del trapezio, spesso debole in chi ha le spalle curve.',
      err: ['Alzare la testa', 'Usare la schiena invece delle scapole', 'Spalle alle orecchie']}); }
  const KQ = {h: [140, KNEE - 46], th: 0, sh: -90, ft: 60};
  ST({id: 'st-gatto-mucca', n: 'Gatto e mucca (mobilità della colonna)', sm: ['lombare', 'dorsali', 'postura'], dyn: true, dose: '10 ripetizioni lente', m: 'Erettori spinali, addominali', mm: 'erettori spinali, retto addominale, muscoli tra le vertebre', st: 'kneel', benchSt: 'kneel', yq: 'cat cow stretch',
    fr: [[0, 0, Object.assign({t: 115, cu: 20, nk: -18}, KQ)], [0, 0, Object.assign({t: 115, cu: -24, nk: 28}, KQ)]], cap: ['Mucca: schiena che scende, sguardo avanti', 'Gatto: schiena tonda verso l’alto, mento al petto'],
    set: 'A quattro zampe: mani sotto le spalle, ginocchia sotto le anche.', pos: 'Braccia tese, peso distribuito tra mani e ginocchia.',
    ese: ['Inspira: lascia scendere la pancia e porta lo sguardo avanti (mucca).', 'Espira: spingi il pavimento e arrotonda la schiena verso l’alto (gatto).', 'Muoviti lento, una vertebra alla volta.'],
    cue: 'Il movimento parte dal bacino e arriva alla testa come un’onda.', why: 'Mobilizza tutta la colonna in flessione ed estensione: ottimo come riscaldamento e dopo tante ore seduti.',
    err: ['Muovere solo il collo', 'Andare veloce', 'Piegare i gomiti']});
  ST({id: 'st-rotazione-4-zampe', n: 'Rotazione del busto a quattro zampe (braccio al soffitto)', sm: ['dorsali', 'postura'], dyn: true, dose: '8-10 per lato', m: 'Muscoli della schiena alta, obliqui', mm: 'rotatori della colonna toracica, obliqui, pettorale in allungamento', st: 'kneel', benchSt: 'kneel', one: true, yq: 'quadruped thoracic rotation',
    fr: [[0, 0, Object.assign({t: 115}, KQ)], [180, 180, Object.assign({t: 115, tw: -55, nkr: -30}, KQ)]], cap: ['A quattro zampe', 'Busto ruotato, braccio verso il soffitto, sguardo alla mano'],
    set: 'A quattro zampe: mani sotto le spalle, ginocchia sotto le anche.', pos: 'Bacino fermo, il braccio d’appoggio resta teso.',
    ese: ['Porta una mano verso il soffitto ruotando il busto.', 'Segui la mano con lo sguardo.', 'Torna giù lentamente. Fai tutte le ripetizioni e cambia lato.'],
    cue: 'Ruota dalla schiena alta, non dal bacino.', why: 'Ridà mobilità in rotazione alla schiena alta, che si irrigidisce stando seduti.',
    err: ['Spostare il bacino', 'Piegare il braccio d’appoggio', 'Andare di scatto']});

  // ---------------- petto, spalle, braccia ----------------
  ST({id: 'st-pettorale-muro', n: 'Allungamento del pettorale al muro (o allo stipite)', sm: ['petto', 'spalle'], dose: '30 s per lato', m: 'Pettorali, deltoidi anteriori', mm: 'gran pettorale, piccolo pettorale, deltoide anteriore, bicipite', st: 'stand', one: true, arm3: {n: [[-.15, 0, 1], [0, -1, .1]]}, az: .6, yq: 'doorway pec stretch',
    fr: [[0, 0, {t: 180}], [0, 0, {t: 180, tw: -28}]], cap: ['Avambraccio appoggiato al muro, gomito all’altezza della spalla', 'Busto girato dalla parte opposta: si allunga il petto'],
    set: 'In piedi di fianco a un muro o in uno stipite. Appoggia avambraccio e palmo al muro con il gomito all’altezza della spalla.', pos: 'Spalla bassa, busto dritto.',
    ese: ['Fai un piccolo passo avanti e ruota il busto dalla parte opposta.', 'Senti l’allungamento davanti alla spalla e sul petto.', 'Tieni 30 secondi e cambia lato.'],
    cue: 'Ruota il corpo lontano dal braccio, il braccio resta fermo al muro.', why: 'Allunga il petto e la spalla davanti, accorciati da scrivania e allenamenti di spinta.',
    err: ['Spingere troppo (formicolio al braccio)', 'Spalla che sale', 'Inarcare la schiena']});
  ST({id: 'st-pettorale-dietro', n: 'Mani intrecciate dietro la schiena (apertura del petto)', sm: ['petto', 'spalle', 'postura'], dose: '20-30 s', m: 'Pettorali, deltoidi anteriori, bicipiti', mm: 'gran pettorale, deltoide anteriore, bicipite', st: 'stand', gz: 6, yq: 'clasped hands behind back chest stretch',
    fr: [[-25, -25, {t: 180}], [-55, -55, {t: 176, nk: -10}]], cap: ['Mani intrecciate dietro la schiena', 'Braccia tese sollevate indietro, petto aperto'],
    set: 'In piedi, intreccia le dita dietro la schiena con le braccia tese.', pos: 'Busto dritto, mento leggermente dentro.',
    ese: ['Porta le spalle indietro e solleva le braccia tese dietro di te.', 'Apri il petto in avanti.', 'Tieni 20-30 secondi.'],
    cue: 'Lo sterno va avanti e in alto, le mani lontano da te.', why: 'Apre il petto e la parte anteriore delle spalle: si può fare ovunque, anche in ufficio.',
    err: ['Piegarsi in avanti', 'Inarcare la zona lombare', 'Spalle alle orecchie']});
  ST({id: 'st-spalla-incrociata', n: 'Braccio incrociato davanti al petto', sm: ['spalle', 'dorsali'], dose: '20-30 s per lato', m: 'Deltoidi posteriori, romboidi', mm: 'deltoide posteriore, romboidi, trapezio medio, cuffia dei rotatori', st: 'stand', arm3: {n: [[.45, .05, -1], [.35, .05, -1]], f: [[.75, .55, -.2], [.1, -1, .6]]}, az: .7, yq: 'cross body shoulder stretch',
    fr: [[0, 0, {t: 180}], [0, 0, {t: 180, tw: 8}]], cap: ['Braccio teso portato davanti al petto', 'L’altra mano spinge il gomito verso il petto'],
    set: 'In piedi o seduto. Porta un braccio teso davanti al petto, verso la spalla opposta.', pos: 'Spalla del braccio teso bassa, busto fermo.',
    ese: ['Con l’altra mano spingi il gomito verso il petto.', 'Tieni 20-30 secondi.', 'Cambia braccio.'],
    cue: 'Spingi sul gomito, non sul polso.', why: 'Allunga la parte posteriore della spalla, spesso rigida in chi si allena molto con le braccia.',
    err: ['Ruotare il busto', 'Spalla che sale', 'Tirare sul polso']});
  ST({id: 'st-tricipite-sopra', n: 'Allungamento del tricipite sopra la testa', sm: ['braccia', 'dorsali'], dose: '20-30 s per lato', m: 'Tricipiti, gran dorsale', mm: 'tricipite (capo lungo), gran dorsale, grande rotondo', st: 'stand', arm3: {n: [[.1, -1, .15], [-.35, 1, -.25]], f: [[.15, -.55, .82], [.05, -.45, .89]]}, az: .5, yq: 'overhead triceps stretch',
    fr: [[0, 0, {t: 180}], [0, 0, {t: 180, sb: -6}]], cap: ['Gomito in alto, mano dietro la testa', 'L’altra mano spinge il gomito indietro'],
    set: 'In piedi o seduto. Porta un braccio in alto, piega il gomito e lascia la mano dietro la testa.', pos: 'Busto dritto, addome in dentro.',
    ese: ['Con l’altra mano spingi il gomito indietro e verso la testa.', 'Tieni 20-30 secondi.', 'Cambia braccio.'],
    cue: 'Il gomito punta al soffitto, la mano scende lungo la schiena.', why: 'Allunga il tricipite e il gran dorsale, dopo allenamenti di spinta e trazioni.',
    err: ['Inarcare la schiena', 'Spingere la testa in avanti']});
  ST({id: 'st-circonduzioni', n: 'Circonduzioni delle braccia', sm: ['spalle', 'postura'], dyn: true, dose: '10 avanti + 10 indietro', m: 'Deltoidi, cuffia dei rotatori', mm: 'deltoidi, cuffia dei rotatori, trapezio, pettorali', st: 'stand', tempo: [2.6, .2, 2.6], ct: [0, 1.05, 4.6], yq: 'arm circles warm up',
    fr: [[5, 5, {t: 180}], [90, 90, {t: 180}], [180, 180, {t: 180}], [270, 270, {t: 180}], [355, 355, {t: 180}]], cap: ['Braccia lungo i fianchi', 'Cerchi ampi e lenti'],
    set: 'In piedi, piedi alla larghezza del bacino, braccia lungo i fianchi.', pos: 'Busto fermo, addome attivo.',
    ese: ['Disegna cerchi ampi con le braccia tese, lenti.', 'Fai 10 cerchi in avanti e 10 indietro.', 'Il busto non si muove.'],
    cue: 'Cerchi grandi come se volessi toccare le pareti.', why: 'Scalda e muove le spalle in tutte le direzioni: perfetto prima degli esercizi per la parte alta.',
    err: ['Inarcare la schiena quando le braccia vanno in alto', 'Cerchi troppo veloci']});
  { const W = [232, 128], H = [140, STAND], t = 96, S = sh(H, 58, t), [ua, fa] = armTo(S, W, down);
    ST({id: 'st-dorsale-muro', n: 'Allungamento dei dorsali al muro (busto parallelo al pavimento)', sm: ['dorsali', 'spalle', 'petto'], dose: '30 s', m: 'Gran dorsale, pettorali, deltoidi', mm: 'gran dorsale, grande rotondo, pettorali, tricipite (capo lungo), femorali', st: 'stand', wall: W[0] + 5, yq: 'wall lat stretch',
      fr: [[70, 70, {t: 180, h: H}], [ua, fa, {t, h: H}]], cap: ['In piedi davanti al muro', 'Mani al muro, busto parallelo al pavimento, petto che scende'],
      set: 'In piedi a un passo e mezzo da un muro (o da un appoggio alto), mani appoggiate all’altezza delle anche o del petto.', pos: 'Braccia tese, ginocchia morbide, schiena dritta.',
      ese: ['Spingi il bacino indietro e lascia scendere il petto tra le braccia.', 'Tieni 30 secondi respirando.', 'Torna su piegando le ginocchia.'],
      cue: 'Spingi il bacino lontano dalle mani: si allungano i fianchi della schiena.', why: 'Allunga gran dorsale e pettorali, che quando sono rigidi tirano le spalle in avanti.',
      err: ['Arrotondare la schiena', 'Ginocchia bloccate', 'Testa che cade']}); }
  ST({id: 'st-abbraccio-schiena', n: 'Abbraccio per la schiena alta', sm: ['dorsali', 'spalle'], dose: '20-30 s', m: 'Romboidi, trapezio, deltoidi posteriori', mm: 'romboidi, trapezio medio, deltoidi posteriori, dorsali', st: 'stand', gz: -18, yq: 'upper back hug stretch',
    fr: [[...hug(180), {t: 180}], [...hug(172, -18), {t: 172, cu: -18, nk: 22}]], cap: ['Braccia incrociate', 'Ti abbracci e arrotondi la schiena alta'],
    set: 'In piedi o seduto, abbraccia te stesso con le mani sulle scapole opposte.', pos: 'Ginocchia morbide, bacino fermo.',
    ese: ['Spingi la schiena alta indietro arrotondandola, mento verso il petto.', 'Respira nella schiena.', 'Tieni 20-30 secondi.'],
    cue: 'Allarga le scapole come se fossero ali che si aprono.', why: 'Allunga i muscoli tra le scapole, spesso contratti dopo tante trazioni e rematori.',
    err: ['Piegarsi dalla vita invece che dalla schiena alta', 'Trattenere il respiro']});
  ST({id: 'st-braccia-alto', n: 'Allungamento verso l’alto (braccia sopra la testa)', sm: ['dorsali', 'fianchi', 'postura'], dose: '15-20 s, 3 volte', m: 'Gran dorsale, addominali', mm: 'gran dorsale, obliqui, intercostali, pettorali', st: 'stand', gz: 6, yq: 'overhead reach stretch',
    fr: [[5, 5, {t: 180}], [178, 178, {t: 184}]], cap: ['In piedi, braccia lungo i fianchi', 'Dita intrecciate sopra la testa, ti allunghi verso l’alto'],
    set: 'In piedi, piedi alla larghezza del bacino.', pos: 'Addome attivo, coste che non si aprono in avanti.',
    ese: ['Intreccia le dita e porta le braccia sopra la testa, palmi verso il soffitto.', 'Allungati verso l’alto come se volessi crescere.', 'Tieni 15-20 secondi e ripeti 3 volte.'],
    cue: 'Spingi il soffitto con i palmi e il pavimento con i piedi.', why: 'Allunga tutto il busto e decomprime la colonna: ottimo appena alzati o dopo tanto tempo seduti.',
    err: ['Inarcare la zona lombare', 'Spalle alle orecchie']});
  ST({id: 'st-sospensione', n: 'Sospensione passiva alla sbarra', sm: ['dorsali', 'spalle', 'postura'], dose: '20-40 s', m: 'Gran dorsale, avambracci', mm: 'gran dorsale, pettorali, flessori delle dita (presa); colonna in decompressione', a: 'Corpo libero', st: 'hang', eq: 'hb', presa: 'pro', yq: 'dead hang shoulders spine',
    fr: [[180, 180], [180, 180, {h: [150, 153]}]], cap: ['Appeso alla sbarra a braccia tese', 'Corpo rilassato, spalle che salgono verso le orecchie'],
    set: 'Afferra la sbarra con presa alla larghezza delle spalle (o un po’ di più), poi stacca i piedi da terra o piega le ginocchia.', pos: 'Braccia tese, corpo rilassato, respiro lento.',
    ese: ['Lasciati appendere rilassando spalle e schiena.', 'Respira lento per 20-40 secondi.', 'Riappoggia i piedi con calma.'],
    cue: 'Lascia che il peso del corpo allunghi la schiena, vertebra dopo vertebra.', why: 'Allunga dorsali e spalle e scarica la colonna; migliora anche la presa.',
    err: ['Dondolare', 'Lasciare la presa di colpo', 'Farlo con le spalle doloranti']});
  ST({id: 'st-flessori-polso', n: 'Allungamento dei flessori del polso', sm: ['braccia'], dose: '20-30 s per braccio', m: 'Flessori dell’avambraccio', mm: 'flessori del polso e delle dita, pronatori', st: 'stand', hand: true, eq: undefined, yq: 'wrist flexor stretch',
    fr: [[88, 88, {t: 180, hd: 0}], [88, 88, {t: 180, hd: -70}]], cap: ['Braccio teso avanti, palmo in avanti', 'Dita tirate indietro con l’altra mano'],
    set: 'Braccio teso davanti a te, palmo in avanti e dita verso il basso o verso l’alto.', pos: 'Gomito disteso, spalla bassa.',
    ese: ['Con l’altra mano tira dolcemente le dita indietro.', 'Tieni 20-30 secondi.', 'Cambia braccio.'],
    cue: 'Tira piano: si deve sentire sotto l’avambraccio, non al polso.', why: 'Scioglie gli avambracci dopo tanta presa (trazioni, rematori) o dopo lavoro al computer.',
    err: ['Tirare forte', 'Piegare il gomito']});
  ST({id: 'st-estensori-polso', n: 'Allungamento degli estensori del polso', sm: ['braccia'], dose: '20-30 s per braccio', m: 'Estensori dell’avambraccio', mm: 'estensori del polso e delle dita, brachioradiale', st: 'stand', hand: true, yq: 'wrist extensor stretch',
    fr: [[88, 88, {t: 180, hd: 0}], [88, 88, {t: 180, hd: 70}]], cap: ['Braccio teso avanti', 'Dorso della mano piegato verso di te con l’altra mano'],
    set: 'Braccio teso davanti a te, palmo verso il basso.', pos: 'Gomito disteso, spalla bassa.',
    ese: ['Piega il polso verso il basso e con l’altra mano spingi il dorso verso di te.', 'Tieni 20-30 secondi.', 'Cambia braccio.'],
    cue: 'Senti l’allungamento sopra l’avambraccio.', why: 'Utile contro il dolore al gomito “da tennista” e dopo tanta presa.',
    err: ['Tirare forte', 'Piegare il gomito']});

  // ---------------- schiena e zona lombare ----------------
  { const K = [190, KNEE], H = [150, r1(KNEE - Math.sqrt(46 * 46 - 40 * 40))], th = r1(ang(H, K)), t = 72, S = add(H, 58, t), ua = r1(ang(S, [S[0] + 68, 213]));
    ST({id: 'st-bambino', n: 'Posizione del bambino (braccia avanti)', sm: ['dorsali', 'lombare', 'spalle'], dose: '30-60 s', m: 'Dorsali, erettori spinali', mm: 'gran dorsale, erettori spinali, glutei, deltoidi', st: 'kneel', benchSt: 'kneel', yq: 'child pose stretch',
      fr: [[90, 90, {t: 175, h: H, th, sh: -90, ft: 60}], [ua, ua, {t, h: H, th, sh: -90, ft: 60, nk: 15}]], cap: ['In ginocchio seduto sui talloni', 'Busto sulle cosce, braccia distese avanti, fronte a terra'],
      set: 'In ginocchio sul tappetino, alluci vicini e ginocchia alla larghezza del bacino (o più larghe), seduto sui talloni.', pos: 'Glutei sui talloni, braccia distese avanti.',
      ese: ['Porta il busto in avanti sulle cosce e allunga le braccia avanti.', 'Appoggia la fronte e respira lento nella schiena.', 'Tieni 30-60 secondi.'],
      cue: 'Mani lontane in avanti, glutei pesanti verso i talloni.', why: 'Rilassa e allunga tutta la schiena e i dorsali: ottimo a fine allenamento.',
      err: ['Glutei che si alzano dai talloni', 'Spalle contratte']});
    ST({id: 'st-bambino-laterale', n: 'Posizione del bambino laterale', sm: ['dorsali', 'fianchi'], dose: '30 s per lato', m: 'Gran dorsale, obliqui', mm: 'gran dorsale, obliqui, quadrato dei lombi, intercostali', st: 'kneel', benchSt: 'kneel', az: .55, yq: 'side child pose lat stretch',
      fr: [[ua, ua, {t, h: H, th, sh: -90, ft: 60}], [ua, ua, {t, h: H, th, sh: -90, ft: 60, sb: 24, nk: 15}]], cap: ['Posizione del bambino, braccia avanti', 'Mani spostate da un lato: si allunga il fianco opposto'],
      set: 'Dalla posizione del bambino con le braccia distese avanti.', pos: 'Glutei sui talloni.',
      ese: ['Cammina con le mani verso destra.', 'Senti l’allungamento sul fianco sinistro.', 'Tieni 30 secondi e cambia lato.'],
      cue: 'Spingi il gluteo opposto verso il tallone mentre le mani vanno di lato.', why: 'Allunga il dorsale e il fianco di un lato alla volta, dove la posizione del bambino normale arriva poco.',
      err: ['Sollevare i glutei', 'Ruotare il busto']}); }
  { const H = [150, LIEY], S = add(H, 58, 270);
    const [th1, sh1] = [205, 115], K1 = add(H, 46, th1), [ua1, fa1] = armTo(S, [K1[0] + 6, K1[1] + 4], down);
    ST({id: 'st-ginocchia-petto', n: 'Ginocchia al petto da sdraiato', sm: ['lombare', 'glutei'], dose: '30-45 s', m: 'Erettori spinali, glutei', mm: 'erettori spinali lombari, grande gluteo, quadrato dei lombi', st: 'floor', yq: 'knees to chest stretch',
      fr: [[92, 92, {t: 270, h: H, th: 140, sh: 35}], [ua1, fa1, {t: 270, h: H, th: th1, sh: sh1}]], cap: ['Sdraiato, ginocchia piegate', 'Ginocchia abbracciate al petto'],
      set: 'Sdraiato sulla schiena sul tappetino, ginocchia piegate.', pos: 'Testa e spalle appoggiate e rilassate.',
      ese: ['Porta le ginocchia al petto e abbracciale.', 'Lascia che la zona lombare si appoggi al pavimento.', 'Tieni 30-45 secondi; puoi dondolare piano.'],
      cue: 'Lascia andare la schiena bassa verso terra.', why: 'Scarica e allunga la zona lombare: utile a fine allenamento e quando la schiena è rigida.',
      err: ['Sollevare la testa', 'Tirare con troppa forza']});
    ST({id: 'st-torsione-supina', n: 'Torsione da sdraiato (ginocchia da un lato)', sm: ['lombare', 'glutei', 'fianchi'], dose: '30-45 s per lato', m: 'Obliqui, glutei, erettori spinali', mm: 'obliqui, quadrato dei lombi, grande gluteo, rotatori della colonna, pettorale in allungamento', st: 'floor', gz: 72, lat: 2, az: .9, yq: 'supine spinal twist',
      fr: [[30, 150, {t: 270, h: H, th: 128, sh: 55}], [30, 150, {t: 270, h: H, th: 118, sh: 62, lz: 46, nkr: 40}]], cap: ['Sdraiato, braccia aperte, ginocchia piegate', 'Ginocchia cadute da un lato, testa dall’altro'],
      set: 'Sdraiato sulla schiena, braccia aperte a “T”, ginocchia piegate unite.', pos: 'Spalle appoggiate a terra per tutto il tempo.',
      ese: ['Lascia cadere le ginocchia da un lato.', 'Gira la testa dalla parte opposta.', 'Tieni 30-45 secondi e cambia lato.'],
      cue: 'Le spalle restano a terra, sono le ginocchia a scendere.', why: 'Allunga in torsione schiena, fianchi e glutei; rilassa molto la zona lombare.',
      err: ['Staccare le spalle', 'Forzare le ginocchia a terra']});
    ST({id: 'st-inclinazione-pelvica', n: 'Inclinazione del bacino da sdraiato', sm: ['lombare', 'postura'], dyn: true, dose: '10-15 ripetizioni', m: 'Addominali, erettori spinali', mm: 'retto e trasverso dell’addome, erettori lombari, glutei', st: 'floor', yq: 'pelvic tilt exercise',
      fr: [[92, 92, {t: 270, h: H, th: 140, sh: 35, cu: -8}], [92, 92, {t: 270, h: H, th: 140, sh: 35, cu: 10}]], cap: ['Sdraiato, piccola curva lombare', 'Zona lombare schiacciata a terra, bacino che si inclina'],
      set: 'Sdraiato sulla schiena, ginocchia piegate, piedi a terra, braccia lungo i fianchi.', pos: 'Spalle rilassate, piedi alla larghezza del bacino.',
      ese: ['Espira e schiaccia la zona lombare a terra inclinando il bacino.', 'Inspira e torna con una piccola curva sotto la schiena.', 'Movimento piccolo e lento.'],
      cue: 'Immagina il bacino come una ciotola d’acqua da inclinare verso di te.', why: 'Insegna a controllare il bacino e scioglie la zona lombare: base per una buona postura.',
      err: ['Sollevare il bacino', 'Usare le gambe']}); }
  { const H = [150, PRONE], W1 = [205, 214], t1 = 122, S1 = add(H, 58, t1), [ua1, fa1] = armTo(S1, W1, back), S0 = add(H, 58, 92), [ua0, fa0] = armTo(S0, W1, up);
    ST({id: 'st-cobra', n: 'Cobra (estensione della schiena da prono)', sm: ['lombare', 'fianchi', 'flessori', 'postura'], dose: '20-30 s', m: 'Addominali, flessori dell’anca', mm: 'retto addominale e flessori dell’anca in allungamento; erettori spinali che estendono la colonna', st: 'floor', yq: 'cobra stretch',
      fr: [[ua0, fa0, {t: 92, h: H, th: -90, sh: -90, ft: 60}], [ua1, fa1, {t: t1, h: H, th: -90, sh: -90, ft: 60, nk: -10}]], cap: ['Prono, mani a terra accanto al petto', 'Petto sollevato spingendo con le braccia, bacino a terra'],
      set: 'A pancia in giù, mani a terra accanto al petto, gomiti vicino al corpo.', pos: 'Bacino appoggiato, glutei rilassati, spalle basse.',
      ese: ['Spingi con le mani e solleva il petto, il bacino resta a terra.', 'Sali solo fin dove la schiena è comoda.', 'Tieni 20-30 secondi e scendi lento.'],
      cue: 'Allunga il petto in avanti prima di alzarlo.', why: 'Estende la schiena e allunga addome e flessori dell’anca, il contrario della posizione seduta.',
      err: ['Staccare il bacino', 'Spalle alle orecchie', 'Forzare se fa male la schiena']});
    const t2 = 118, S2 = add(H, 58, t2);
    ST({id: 'st-sfinge', n: 'Sfinge (sugli avambracci)', sm: ['lombare', 'postura'], dose: '30-60 s', m: 'Addominali, erettori spinali', mm: 'addominali in allungamento leggero, erettori spinali, trapezio inferiore', st: 'floor', yq: 'sphinx pose',
      fr: [[ua0, fa0, {t: 92, h: H, th: -90, sh: -90, ft: 60}], [r1(ang(S2, [S2[0] + 3, KNEE - 2])), 90, {t: t2, h: H, th: -90, sh: -90, ft: 60}]], cap: ['Prono', 'Sugli avambracci, gomiti sotto le spalle, petto aperto'],
      set: 'A pancia in giù, gomiti sotto le spalle, avambracci a terra paralleli.', pos: 'Spalle lontane dalle orecchie, bacino a terra.',
      ese: ['Spingi gli avambracci a terra e allunga il petto in avanti.', 'Rilassa glutei e schiena bassa.', 'Tieni 30-60 secondi respirando.'],
      cue: 'Spingi il pavimento lontano con gli avambracci.', why: 'Una estensione dolce della schiena, più facile del cobra.',
      err: ['Spalle che crollano', 'Collo piegato all’indietro']}); }
  { const H = [120, 208], S = add(H, 58, 188), W = add(S, 69, -30);
    ST({id: 'st-rotazione-seduta', n: 'Torsione da seduto (gamba incrociata)', sm: ['lombare', 'glutei', 'fianchi'], dose: '30 s per lato', m: 'Glutei, obliqui, erettori spinali', mm: 'grande e medio gluteo, piriforme, obliqui, rotatori della colonna', st: 'floor', one: true, leg2: true, az: .8, yq: 'seated spinal twist',
      fr: [[r1(ang(S, W)), r1(ang(S, W)), {t: 182, h: H, th: 125, sh: 25, th2: 90, sh2: 90}], [r1(ang(S, W)), r1(ang(S, W)), {t: 182, h: H, th: 125, sh: 25, th2: 90, sh2: 90, tw: -48, nkr: -25}]], cap: ['Seduto, una gamba tesa, l’altra piegata', 'Busto ruotato verso il ginocchio piegato'],
      set: 'Seduto a terra con una gamba tesa; piega l’altra e appoggia il piede fuori dal ginocchio della gamba tesa.', pos: 'Busto alto, mano dietro di te a terra.',
      ese: ['Ruota il busto verso il ginocchio piegato.', 'Aggancia il ginocchio con il gomito opposto per aumentare la rotazione.', 'Tieni 30 secondi e cambia lato.'],
      cue: 'Cresci in altezza a ogni inspirazione e ruota un po’ di più a ogni espirazione.', why: 'Allunga gluteo e fianchi e ridà rotazione alla colonna.',
      err: ['Curvare la schiena', 'Forzare con il braccio']}); }
  { const A = [70, 212], W = [196, 214], th = -22, H = add(A, -94, th), t = r1(Math.acos((W[1] - H[1]) / 127) / D), Wx = H[0] + 127 * Math.sin(t * D), dx = W[0] - Wx;
    const H0 = add(W, -127, 64), [th0, sh0] = legTo(H0, [A[0] + dx, A[1]], fwd);
    ST({id: 'st-cane-testa-giu', n: 'Cane a testa in giù', sm: ['femorali', 'polpacci', 'spalle', 'dorsali'], dose: '30-45 s', m: 'Femorali, polpacci, dorsali', mm: 'ischiocrurali, gastrocnemio e soleo, gran dorsale, deltoidi, erettori spinali', st: 'stand', leg2: true, yq: 'downward dog stretch',
      fr: [[64, 64, {t: 64, h: H0, th: th0, sh: sh0, th2: th0, sh2: sh0, ft: 40}], [t, t, {t, h: [H[0] + dx, H[1]], th, sh: th, th2: th, sh2: th, ft: 16 - th}]], cap: ['Mani e piedi a terra, ginocchia piegate', 'Bacino alto, gambe tese, talloni verso terra: “V” rovesciata'],
      set: 'Dalla posizione a quattro zampe, metti le dita dei piedi a terra e solleva le ginocchia.', pos: 'Mani alla larghezza delle spalle, dita aperte, testa tra le braccia.',
      ese: ['Spingi il bacino in alto e indietro.', 'Distendi le gambe portando i talloni verso terra, senza forzare.', 'Tieni 30-45 secondi respirando.'],
      cue: 'Allunga prima la schiena (bacino in alto), poi le gambe.', why: 'Allunga tutta la parte posteriore del corpo (polpacci, femorali, schiena) e apre le spalle.',
      err: ['Schiena tonda per tenere le gambe tese', 'Spalle alle orecchie', 'Peso tutto sulle mani']}); }

  // ---------------- fianchi ----------------
  ST({id: 'st-laterale-in-piedi', n: 'Flessione laterale in piedi (braccio sopra la testa)', sm: ['fianchi', 'dorsali'], dose: '20-30 s per lato', m: 'Obliqui, gran dorsale', mm: 'obliqui, quadrato dei lombi, gran dorsale, intercostali', st: 'stand', one: true, az: 1.35, yq: 'standing side bend stretch',
    fr: [[176, 180, {t: 180}], [176, 180, {t: 180, sb: -28}]], cap: ['In piedi, un braccio sopra la testa', 'Busto piegato di lato: si allunga tutto il fianco'],
    set: 'In piedi, piedi alla larghezza del bacino. Porta un braccio sopra la testa.', pos: 'Bacino fermo e dritto, peso su tutti e due i piedi.',
    ese: ['Piegati di lato dalla parte opposta al braccio alzato.', 'Allunga il braccio lontano, sopra la testa.', 'Tieni 20-30 secondi e cambia lato.'],
    cue: 'Piegati come sopra un grande pallone, non in avanti.', why: 'Allunga il fianco dal bacino alla mano: dorsale, obliqui e muscoli tra le costole.',
    err: ['Piegarsi in avanti', 'Spostare il bacino di lato']});
  ST({id: 'st-laterale-seduto', n: 'Flessione laterale da seduto a terra', sm: ['fianchi', 'dorsali'], dose: '20-30 s per lato', m: 'Obliqui, quadrato dei lombi', mm: 'obliqui, quadrato dei lombi, gran dorsale', st: 'floor', one: true, az: 1.35, yq: 'seated side bend stretch',
    fr: [[176, 180, {t: 180, h: [112, 208]}], [176, 180, {t: 180, h: [112, 208], sb: -30}]], cap: ['Seduto, un braccio sopra la testa', 'Busto piegato di lato, glutei a terra'],
    set: 'Seduto a terra a gambe tese (o incrociate). Porta un braccio sopra la testa.', pos: 'Tutti e due i glutei appoggiati.',
    ese: ['Piegati di lato dalla parte opposta al braccio alzato.', 'Appoggia l’altra mano a terra.', 'Tieni 20-30 secondi e cambia lato.'],
    cue: 'Il gluteo del lato del braccio resta pesante a terra.', why: 'Come la versione in piedi, ma più stabile: utile a fine allenamento.',
    err: ['Staccare un gluteo', 'Ruotare il busto']});
  ST({id: 'st-torsione-in-piedi', n: 'Rotazioni del busto in piedi', sm: ['fianchi', 'lombare'], dyn: true, dose: '10 per lato', m: 'Obliqui, rotatori della colonna', mm: 'obliqui, rotatori della colonna, gran dorsale', st: 'stand', gz: -16, az: .8, yq: 'standing trunk rotation',
    fr: [[...hug(180), {t: 180, tw: -45}], [...hug(180), {t: 180, tw: 45}]], cap: ['Braccia incrociate, busto ruotato da un lato', 'Busto ruotato dall’altro lato, bacino fermo'],
    set: 'In piedi, ginocchia morbide, braccia incrociate sul petto.', pos: 'Bacino rivolto in avanti.',
    ese: ['Ruota il busto a destra, poi a sinistra.', 'Movimento fluido e controllato.', 'Il bacino non gira.'],
    cue: 'Ruota attorno a un palo immaginario che ti attraversa dalla testa al bacino.', why: 'Scalda e muove la colonna in rotazione: utile prima di allenarsi.',
    err: ['Girare anche il bacino', 'Andare a scatti']});

  // ---------------- glutei ----------------
  { const H = [150, LIEY], S = add(H, 58, 270), K = add(H, 46, 195), [ua, fa] = armTo(S, [K[0] + 8, K[1] + 6], down);
    ST({id: 'st-figura-4-supino', n: 'Figura 4 da sdraiato (piriforme)', sm: ['glutei'], dose: '30-45 s per lato', m: 'Glutei, piriforme', mm: 'piriforme, grande e medio gluteo, rotatori esterni dell’anca', st: 'floor', leg2: true, ko: 18, az: .6, yq: 'figure 4 stretch supine',
      fr: [[92, 92, {t: 270, h: H, th: 140, sh: 35, th2: 140, sh2: 35}], [ua, fa, {t: 270, h: H, th: 195, sh: 112, th2: 160, sh2: 70}]], cap: ['Sdraiato, una caviglia appoggiata sul ginocchio opposto', 'Coscia tirata verso il petto: si allunga il gluteo'],
      set: 'Sdraiato sulla schiena, ginocchia piegate. Appoggia la caviglia destra sul ginocchio sinistro.', pos: 'Testa e spalle a terra, piede flesso (punta verso di te).',
      ese: ['Prendi la coscia sinistra con le mani e portala verso il petto.', 'Spingi piano il ginocchio destro in fuori.', 'Tieni 30-45 secondi e cambia lato.'],
      cue: 'Il ginocchio incrociato va lontano da te, il piede resta flesso.', why: 'Allunga il piriforme e i glutei profondi: utile in caso di rigidità dell’anca e fastidi al gluteo.',
      err: ['Sollevare la testa', 'Ruotare il bacino']});
    ST({id: 'st-ginocchio-spalla', n: 'Ginocchio verso la spalla opposta da sdraiato', sm: ['glutei', 'lombare'], dose: '30 s per lato', m: 'Glutei, piriforme', mm: 'grande gluteo, piriforme, quadrato dei lombi', st: 'floor', leg2: true, az: .6, yq: 'knee to opposite shoulder stretch',
      fr: [[92, 92, {t: 270, h: H, th: 140, sh: 35, th2: 90, sh2: 90}], [ua, fa, {t: 270, h: H, th: 198, sh: 118, th2: 90, sh2: 90, lz: -18}]], cap: ['Sdraiato, una gamba piegata', 'Ginocchio tirato verso la spalla opposta'],
      set: 'Sdraiato sulla schiena, una gamba tesa a terra.', pos: 'Bacino appoggiato, spalle rilassate.',
      ese: ['Abbraccia il ginocchio dell’altra gamba.', 'Portalo verso la spalla opposta.', 'Tieni 30 secondi e cambia lato.'],
      cue: 'Il ginocchio va in diagonale, verso la spalla opposta.', why: 'Allunga gluteo e piriforme in modo semplice, anche a letto.',
      err: ['Staccare il bacino', 'Tirare troppo forte']}); }
  { const H = [138, 196], A2 = [H[0] - 92, KNEE], K = add(H, 46, 82);
    ST({id: 'st-piccione', n: 'Piccione (gamba davanti piegata)', sm: ['glutei', 'flessori'], dose: '30-60 s per lato', m: 'Glutei, flessori dell’anca', mm: 'piriforme, grande e medio gluteo della gamba davanti; ileopsoas della gamba dietro', st: 'floor', rl: A2, ko: 24, yq: 'pigeon pose stretch',
      fr: [[8, 8, {t: 176, h: H, th: 82, sh: -55, ft: 40}], [88, 88, {t: 98, h: H, th: 82, sh: -55, ft: 40, nk: 15}]], cap: ['Gamba davanti piegata, gamba dietro distesa', 'Busto in avanti sopra la gamba piegata'],
      set: 'A terra: gamba destra piegata davanti (tibia di traverso), gamba sinistra distesa dietro.', pos: 'Bacino dritto (le due anche alla stessa altezza).',
      ese: ['Resta con il busto dritto sulle mani, poi scendi in avanti sugli avambracci.', 'Respira e rilassa il gluteo.', 'Tieni 30-60 secondi e cambia lato.'],
      cue: 'Il bacino scende verso terra in modo dritto, senza cadere da un lato.', why: 'Allunga in profondità il gluteo della gamba davanti e i flessori di quella dietro.',
      err: ['Bacino storto', 'Dolore al ginocchio davanti (avvicina il piede al bacino)']}); }
  ST({id: 'st-figura-4-seduto', n: 'Figura 4 da seduto (caviglia sul ginocchio)', sm: ['glutei'], dose: '30 s per lato', m: 'Glutei, piriforme', mm: 'piriforme, grande e medio gluteo', st: 'seat', benchSt: 'edge', ko: 30, leg2: true, yq: 'seated figure 4 stretch',
    fr: [[tua, tfa, Object.assign({}, SEAT, {t: 180, th: 95, sh: 30, th2: 90, sh2: 0})], [60, 70, Object.assign({}, SEAT, {t: 148, th: 95, sh: 30, th2: 90, sh2: 0})]], cap: ['Seduto, caviglia sul ginocchio opposto', 'Busto in avanti con la schiena dritta'],
    set: 'Seduto sul bordo di una panca o di una sedia. Appoggia la caviglia destra sul ginocchio sinistro.', pos: 'Schiena dritta, piede flesso.',
    ese: ['Porta il busto in avanti dalle anche, schiena dritta.', 'Premi piano sul ginocchio incrociato.', 'Tieni 30 secondi e cambia lato.'],
    cue: 'Petto verso la tibia, non la testa verso il ginocchio.', why: 'Lo stretching del gluteo da fare anche in ufficio.',
    err: ['Curvare la schiena', 'Forzare sul ginocchio']});

  // ---------------- flessori dell'anca e quadricipiti ----------------
  { const H0 = [140, 165], A = [196, 212], R = [H0[0] - 58, KNEE], [th0, sh0] = legTo(H0, A), H1 = [156, 172], [th1, sh1] = legTo(H1, A);
    ST({id: 'st-affondo-ginocchio', n: 'Affondo con il ginocchio a terra (flessori dell’anca)', sm: ['flessori', 'quadricipiti'], dose: '30-45 s per lato', m: 'Flessori dell’anca, quadricipiti', mm: 'ileopsoas e retto femorale della gamba dietro, adduttori', st: 'stand', rl: R, yq: 'half kneeling hip flexor stretch',
      fr: [[5, 5, {t: 180, h: H0, th: th0, sh: sh0, ft: 10}], [5, 5, {t: 182, h: H1, th: th1, sh: sh1, ft: 10}]], cap: ['Un ginocchio a terra, l’altro piede avanti', 'Bacino spinto in avanti: si allunga davanti all’anca dietro'],
      set: 'Ginocchio sinistro a terra (su un tappetino), piede destro avanti con il ginocchio a 90°.', pos: 'Busto dritto, glutei stretti, bacino “in dentro”.',
      ese: ['Stringi il gluteo della gamba dietro e porta il bacino in avanti.', 'Senti l’allungamento davanti all’anca dietro.', 'Tieni 30-45 secondi e cambia lato.'],
      cue: 'Coccige verso il pavimento: è il bacino che allunga, non la schiena che si inarca.', why: 'Allunga i flessori dell’anca, accorciati da tante ore seduti e spesso causa di dolore lombare.',
      err: ['Inarcare la schiena', 'Ginocchio davanti oltre la punta', 'Bacino ruotato']});
    ST({id: 'st-affondo-braccio-alto', n: 'Affondo con il ginocchio a terra e braccio in alto', sm: ['flessori', 'fianchi'], dose: '30 s per lato', m: 'Flessori dell’anca, obliqui, dorsali', mm: 'ileopsoas, retto femorale, quadrato dei lombi, gran dorsale, obliqui', st: 'stand', rl: R, one: true, az: .9, yq: 'half kneeling hip flexor stretch overhead reach',
      fr: [[176, 180, {t: 180, h: H0, th: th0, sh: sh0, ft: 10}], [176, 180, {t: 183, h: H1, th: th1, sh: sh1, ft: 10, sb: -16}]], cap: ['Affondo con un ginocchio a terra, braccio in alto', 'Bacino avanti e busto piegato di lato'],
      set: 'Come l’affondo con il ginocchio a terra; alza il braccio dello stesso lato del ginocchio a terra.', pos: 'Glutei stretti, busto alto.',
      ese: ['Porta il bacino in avanti.', 'Allunga il braccio in alto e piegati leggermente dalla parte opposta.', 'Tieni 30 secondi e cambia lato.'],
      cue: 'Allungati dal ginocchio alla punta delle dita, come un arco.', why: 'Allunga in un solo esercizio flessori dell’anca, fianco e dorsale dello stesso lato.',
      err: ['Inarcare la zona lombare', 'Ruotare il busto']}); }
  { const A = [198, 212], R = [62, 212], H0 = [140, 122], H1 = [150, 140], [th0, sh0] = legTo(H0, A), [th1, sh1] = legTo(H1, A);
    ST({id: 'st-affondo-in-piedi', n: 'Affondo in piedi (flessori dell’anca)', sm: ['flessori', 'quadricipiti', 'polpacci'], dose: '30 s per lato', m: 'Flessori dell’anca, polpacci', mm: 'ileopsoas e retto femorale della gamba dietro, polpaccio della gamba dietro', st: 'stand', rl: R, yq: 'standing lunge hip flexor stretch',
      fr: [[5, 5, {t: 180, h: H0, th: th0, sh: sh0, ft: 10}], [5, 5, {t: 182, h: H1, th: th1, sh: sh1, ft: 10}]], cap: ['Passo lungo, gamba dietro tesa', 'Bacino giù e avanti, gamba dietro sempre tesa'],
      set: 'In piedi, fai un passo lungo in avanti; la gamba dietro resta tesa con il tallone sollevato.', pos: 'Busto dritto, bacino rivolto in avanti, glutei stretti.',
      ese: ['Piega il ginocchio davanti e porta il bacino in basso e in avanti.', 'Senti l’allungamento davanti all’anca della gamba dietro.', 'Tieni 30 secondi e cambia lato.'],
      cue: 'Stringi il gluteo della gamba dietro: il bacino va avanti senza inarcare la schiena.', why: 'La versione in piedi dell’allungamento dei flessori: si fa ovunque, anche senza tappetino.',
      err: ['Inarcare la schiena', 'Ginocchio davanti oltre la punta']}); }
  { const H = [150, STAND], A = add(add(H, 46, -4), 48, -168), S = add(H, 58, 180), [ua, fa] = armTo(S, [A[0] - 2, A[1] + 3], back);
    ST({id: 'st-quadricipite-in-piedi', n: 'Allungamento del quadricipite in piedi', sm: ['quadricipiti', 'flessori'], dose: '30 s per gamba', m: 'Quadricipiti', mm: 'quadricipite (retto femorale), ileopsoas', st: 'stand', leg2: true, one: true, yq: 'standing quad stretch',
      fr: [[5, 5, {t: 180, h: H, th: 0, sh: 0, th2: 0, sh2: 0}], [ua, fa, {t: 180, h: H, th: -4, sh: -168, th2: 0, sh2: 0, ft: 40}]], cap: ['In piedi', 'Tallone al gluteo, ginocchia vicine'],
      set: 'In piedi, eventualmente con una mano a un appoggio.', pos: 'Ginocchia vicine, bacino dritto.',
      ese: ['Piega un ginocchio e prendi la caviglia con la mano dello stesso lato.', 'Porta il tallone verso il gluteo e spingi il bacino un po’ in avanti.', 'Tieni 30 secondi e cambia gamba.'],
      cue: 'Ginocchio che punta a terra, vicino all’altro: non portarlo avanti.', why: 'Lo stretching classico del quadricipite, a fine allenamento delle gambe.',
      err: ['Ginocchio che va avanti o di lato', 'Inarcare la schiena']}); }
  { const H = [150, PRONE], A = add(add(H, 46, -90), 48, 148), S = add(H, 58, 92), [ua0q, fa0q] = armTo(S, [A[0] + 2, A[1] - 3], up), ua = r1(ua0q < 0 ? ua0q + 360 : ua0q), fa = r1(fa0q < 0 ? fa0q + 360 : fa0q);
    ST({id: 'st-quadricipite-prono', n: 'Allungamento del quadricipite da prono', sm: ['quadricipiti', 'flessori'], dose: '30 s per gamba', m: 'Quadricipiti', mm: 'quadricipite (retto femorale), ileopsoas', st: 'floor', leg2: true, one: true, yq: 'prone quad stretch',
      fr: [[90, 90, {t: 92, h: H, th: -90, sh: -90, th2: -90, sh2: -90, ft: 60}], [ua, fa, {t: 92, h: H, th: -90, sh: 148, th2: -90, sh2: -90, ft: 60}]], cap: ['A pancia in giù', 'Tallone verso il gluteo tenuto con la mano'],
      set: 'A pancia in giù, fronte appoggiata sull’avambraccio.', pos: 'Bacino a terra, ginocchia vicine.',
      ese: ['Piega un ginocchio e prendi la caviglia con la mano dello stesso lato.', 'Porta il tallone verso il gluteo premendo il bacino a terra.', 'Tieni 30 secondi e cambia gamba.'],
      cue: 'Il bacino spinge verso il pavimento.', why: 'Come in piedi ma senza equilibrio da tenere: più facile rilassarsi.',
      err: ['Staccare il bacino', 'Ginocchio che va di lato']}); }

  // ---------------- femorali e interno coscia ----------------
  { const H = [112, 208], A = add(H, 94, 90), t1 = 118, S1 = add(H, 58, t1), [ua, fa] = armTo(S1, [A[0] - 4, A[1] - 6], down);
    ST({id: 'st-femorali-seduto', n: 'Allungamento dei femorali da seduto (gambe tese)', sm: ['femorali', 'polpacci', 'lombare'], dose: '30-45 s', m: 'Femorali, polpacci', mm: 'ischiocrurali, gastrocnemio, erettori spinali', st: 'floor', yq: 'seated hamstring stretch',
      fr: [[90, 90, {t: 180, h: H, th: 90, sh: 90}], [ua, fa, {t: t1, h: H, th: 90, sh: 90, nk: 10}]], cap: ['Seduto, gambe tese', 'Busto in avanti verso i piedi, schiena lunga'],
      set: 'Seduto a terra, gambe tese e unite, punte verso l’alto.', pos: 'Seduto sulle ossa del bacino, schiena lunga.',
      ese: ['Porta il busto in avanti dalle anche, mani verso le caviglie o i piedi.', 'Respira e scendi un po’ a ogni espirazione.', 'Tieni 30-45 secondi.'],
      cue: 'Ombelico verso le cosce, non la testa verso le ginocchia.', why: 'Lo stretching classico della parte dietro delle gambe.',
      err: ['Curvare tutta la schiena', 'Piegare le ginocchia di scatto', 'Rimbalzare']});
    ST({id: 'st-gambe-larghe-seduto', n: 'Seduto a gambe larghe, busto in avanti', sm: ['adduttori', 'femorali'], dose: '30-45 s', m: 'Adduttori, femorali', mm: 'adduttori, gracile, ischiocrurali', st: 'floor', ko: 42, yq: 'seated straddle stretch',
      fr: [[90, 90, {t: 180, h: H, th: 90, sh: 90}], [86, 86, {t: 120, h: H, th: 90, sh: 90}]], cap: ['Seduto a gambe larghe', 'Busto in avanti tra le gambe'],
      set: 'Seduto a terra con le gambe tese e aperte il più possibile, punte verso l’alto.', pos: 'Schiena lunga, ginocchia rivolte al soffitto.',
      ese: ['Porta le mani avanti a terra tra le gambe.', 'Scendi con il busto mantenendo la schiena lunga.', 'Tieni 30-45 secondi.'],
      cue: 'Cammina con le mani in avanti, il bacino resta fermo.', why: 'Allunga l’interno coscia e i femorali insieme.',
      err: ['Ginocchia che ruotano verso l’interno', 'Schiena tonda']}); }
  ST({id: 'st-femorali-in-piedi', n: 'Piegamento in avanti in piedi (femorali)', sm: ['femorali', 'lombare', 'polpacci'], dose: '30 s', m: 'Femorali, erettori spinali', mm: 'ischiocrurali, gastrocnemio, erettori spinali', st: 'stand', yq: 'standing forward fold hamstring',
    fr: [[5, 5, {t: 180}], [14, 14, {t: 30, nk: 12}]], cap: ['In piedi', 'Busto appeso in avanti, mani verso i piedi'],
    set: 'In piedi, piedi alla larghezza del bacino.', pos: 'Ginocchia morbide, peso sull’avampiede.',
    ese: ['Piegati in avanti dalle anche lasciando pendere busto e braccia.', 'Rilassa il collo.', 'Tieni 30 secondi e risali piano arrotolando la schiena.'],
    cue: 'Prima il bacino va indietro, poi il busto scende.', why: 'Allunga la parte dietro delle gambe e la schiena.',
    err: ['Rimbalzare', 'Rialzarsi di scatto']});
  { const H = [150, LIEY], S = add(H, 58, 270), A = add(H, 94, 172), [ua, fa] = armTo(S, add(H, 70, 172), up);
    ST({id: 'st-femorali-supino', n: 'Allungamento dei femorali da sdraiato (gamba in alto)', sm: ['femorali', 'polpacci'], dose: '30-45 s per gamba', m: 'Femorali, polpacci', mm: 'ischiocrurali, gastrocnemio', st: 'floor', leg2: true, yq: 'supine hamstring stretch strap',
      fr: [[92, 92, {t: 270, h: H, th: 140, sh: 35, th2: 90, sh2: 90}], [ua, fa, {t: 270, h: H, th: 172, sh: 172, th2: 90, sh2: 90}]], cap: ['Sdraiato', 'Una gamba tesa verso il soffitto, tenuta dietro il polpaccio'],
      set: 'Sdraiato sulla schiena, una gamba tesa a terra. Puoi usare un asciugamano o un elastico sotto il piede.', pos: 'Bacino appoggiato, la gamba a terra resta tesa.',
      ese: ['Porta l’altra gamba tesa verso il soffitto tenendola dietro il polpaccio (o con l’asciugamano).', 'Avvicinala piano senza piegare il ginocchio.', 'Tieni 30-45 secondi e cambia gamba.'],
      cue: 'Allunga il tallone verso il soffitto.', why: 'Il modo più sicuro per la schiena di allungare i femorali.',
      err: ['Staccare il bacino', 'Piegare il ginocchio']}); }
  { const H = [140, STAND], A = add(H, 94, 70), bench = [A[0] - 14, A[0] + 34, r1(A[1] + 7)], t = 148, S = add(H, 58, t), [ua, fa] = armTo(S, add(H, 40, 70), down);
    ST({id: 'st-femorali-gradino', n: 'Tallone su una panca, busto in avanti', sm: ['femorali', 'polpacci'], dose: '30 s per gamba', m: 'Femorali', mm: 'ischiocrurali, gastrocnemio', st: 'stand', leg2: true, bench, nb: true, yq: 'hamstring stretch heel on bench',
      fr: [[5, 5, {t: 180, h: H, th: 70, sh: 70, th2: 0, sh2: 0, ft: -10}], [ua, fa, {t, h: H, th: 70, sh: 70, th2: 0, sh2: 0, ft: -10}]], cap: ['Tallone su una panca, gamba tesa', 'Busto in avanti con la schiena dritta'],
      set: 'In piedi davanti a una panca o a un gradino; appoggia il tallone con la gamba tesa e la punta verso l’alto.', pos: 'Bacino dritto, gamba d’appoggio tesa.',
      ese: ['Porta il busto in avanti dalle anche, schiena dritta.', 'Mani sulla coscia, non spingere sul ginocchio.', 'Tieni 30 secondi e cambia gamba.'],
      cue: 'Spingi il bacino indietro come per sederti.', why: 'Allunga i femorali in piedi, con l’appoggio regolabile in altezza.',
      err: ['Curvare la schiena', 'Ruotare il bacino']}); }
  { const H = [150, LIEY];
    ST({id: 'st-farfalla-supina', n: 'Farfalla da sdraiato (interno coscia)', sm: ['adduttori', 'flessori'], dose: '45-60 s', m: 'Adduttori', mm: 'adduttori, gracile, ileopsoas', st: 'floor', ko: 40, az: .5, yq: 'reclined butterfly stretch',
      fr: [[92, 92, {t: 270, h: H, th: 130, sh: 45}], [92, 92, {t: 270, h: H, th: 150, sh: 25}]], cap: ['Sdraiato, ginocchia piegate', 'Piante dei piedi unite, ginocchia che cadono in fuori'],
      set: 'Sdraiato sulla schiena, unisci le piante dei piedi e lascia aprire le ginocchia.', pos: 'Braccia rilassate, schiena appoggiata.',
      ese: ['Lascia scendere le ginocchia verso terra senza forzare.', 'Respira lento.', 'Tieni 45-60 secondi.'],
      cue: 'È la gravità che lavora: tu rilassati.', why: 'Allunga l’interno coscia in modo dolce, ottimo a fine allenamento.',
      err: ['Spingere le ginocchia con le mani', 'Inarcare la schiena']}); }
  ST({id: 'st-squat-profondo', n: 'Squat profondo in tenuta', sm: ['adduttori', 'glutei', 'polpacci', 'lombare'], dose: '30-60 s', m: 'Adduttori, glutei, polpacci', mm: 'adduttori, grande gluteo, soleo, erettori lombari', st: 'stand', ko: 20, yq: 'deep squat hold mobility',
    fr: [[5, 5, {t: 180}], [72, 72, {t: 158, th: 104, sh: -28, ft: 44}]], cap: ['In piedi', 'Accovacciato: talloni a terra, gomiti tra le ginocchia'],
    set: 'In piedi con i piedi un po’ più larghi delle spalle, punte leggermente aperte.', pos: 'Talloni a terra, petto alto.',
    ese: ['Scendi in squat il più in basso possibile.', 'Unisci le mani davanti al petto e spingi le ginocchia in fuori con i gomiti.', 'Tieni 30-60 secondi respirando.'],
    cue: 'Petto alto e ginocchia in fuori, i talloni restano giù.', why: 'Migliora la mobilità di anche e caviglie e allunga l’interno coscia.',
    err: ['Talloni che si alzano', 'Schiena tonda', 'Ginocchia verso l’interno']});

  // ---------------- polpacci e caviglie ----------------
  { const W = [212, 116], H = [140, r1(212 - 94 * Math.cos(18 * D))], t = 165, S = add(H, 58, t), [ua, fa] = armTo(S, W, down);
    ST({id: 'st-polpaccio-muro', n: 'Allungamento del polpaccio al muro', sm: ['polpacci'], dose: '30 s per gamba', m: 'Polpacci', mm: 'gastrocnemio (gamba dietro tesa)', st: 'stand', leg2: true, wall: W[0] + 5, yq: 'wall calf stretch',
      fr: [[ua, fa, {t: 178, h: [H[0] + 8, H[1]], th: -14, sh: -14, th2: 18, sh2: -4, ft: 30}], [ua, fa, {t, h: H, th: -18, sh: -18, th2: 24, sh2: -6, ft: 34}]], cap: ['Mani al muro, un piede dietro', 'Ginocchio davanti piegato, tallone dietro a terra'],
      set: 'In piedi davanti a un muro, mani appoggiate. Un piede avanti, l’altro un passo indietro con la gamba tesa.', pos: 'Punte dritte in avanti, tallone dietro sempre a terra.',
      ese: ['Piega il ginocchio davanti e porta il bacino verso il muro.', 'Tieni il tallone dietro a terra e la gamba tesa.', 'Tieni 30 secondi e cambia gamba.'],
      cue: 'Spingi il tallone dietro verso il pavimento.', why: 'Allunga il polpaccio (gastrocnemio), utile per corsa, salti e squat.',
      err: ['Tallone che si alza', 'Punta del piede girata in fuori']});
    ST({id: 'st-soleo-muro', n: 'Allungamento del soleo al muro (ginocchio dietro piegato)', sm: ['polpacci'], dose: '30 s per gamba', m: 'Polpacci', mm: 'soleo, tendine d’Achille', st: 'stand', leg2: true, wall: W[0] + 5, yq: 'soleus stretch wall',
      fr: [[ua, fa, {t: 178, h: [H[0] + 8, H[1]], th: -14, sh: -14, th2: 18, sh2: -4, ft: 30}], [ua, fa, {t: 172, h: [H[0] + 4, H[1] + 10], th: -4, sh: -32, th2: 30, sh2: -14, ft: 48}]], cap: ['Mani al muro, un piede dietro', 'Tutte e due le ginocchia piegate, tallone dietro a terra'],
      set: 'Come per il polpaccio al muro, ma con il piede dietro più vicino.', pos: 'Tallone dietro a terra.',
      ese: ['Piega anche il ginocchio dietro, abbassando il bacino.', 'Senti l’allungamento in basso, vicino al tallone.', 'Tieni 30 secondi e cambia gamba.'],
      cue: 'Ginocchio dietro verso il pavimento, tallone giù.', why: 'Allunga il soleo, il muscolo profondo del polpaccio che lavora nello squat.',
      err: ['Tallone che si alza']}); }
  { const K = [190, KNEE], H = [150, r1(KNEE - Math.sqrt(46 * 46 - 40 * 40))], th = r1(ang(H, K)), [ua, fa] = thighs([H[0], H[1]]);
    ST({id: 'st-tibiali', n: 'Seduto sui talloni (tibiali e caviglie)', sm: ['polpacci'], dose: '30-45 s', m: 'Tibiali, collo del piede', mm: 'tibiale anteriore, estensori delle dita, quadricipite', st: 'kneel', benchSt: 'kneel', yq: 'kneeling shin stretch',
      fr: [[5, 5, {t: 180, h: [150, KNEE - 46], th: 0, sh: -90, ft: 60}], [ua, fa, {t: 180, h: H, th, sh: -90, ft: 60}]], cap: ['In ginocchio', 'Seduto sui talloni, collo del piede a terra'],
      set: 'In ginocchio sul tappetino, collo del piede appoggiato a terra.', pos: 'Busto dritto, mani sulle cosce.',
      ese: ['Siediti piano sui talloni.', 'Per aumentare, solleva un po’ le ginocchia appoggiando le mani dietro.', 'Tieni 30-45 secondi.'],
      cue: 'Il collo del piede si allunga verso il pavimento.', why: 'Allunga la parte davanti della gamba e della caviglia, utile per chi corre.',
      err: ['Forzare con dolore alle ginocchia']}); }
  { const A = [196, 212], R = [138 - 58, KNEE], H0 = [138, 166], H1 = [160, 172], [th0, sh0] = legTo(H0, A), [th1, sh1] = legTo(H1, A);
    ST({id: 'st-caviglia', n: 'Mobilità della caviglia (ginocchio oltre la punta)', sm: ['polpacci'], dyn: true, dose: '10-12 per gamba', m: 'Polpacci, caviglia', mm: 'soleo, tendine d’Achille, capsula della caviglia', st: 'stand', rl: R, yq: 'ankle mobility knee to wall',
      fr: [[5, 5, {t: 180, h: H0, th: th0, sh: sh0, ft: 10}], [5, 5, {t: 178, h: H1, th: th1, sh: sh1, ft: 10 + (sh0 - sh1)}]], cap: ['Un ginocchio a terra, piede davanti piatto', 'Ginocchio davanti spinto oltre la punta, tallone giù'],
      set: 'Un ginocchio a terra, l’altro piede avanti appoggiato piatto.', pos: 'Tallone davanti sempre a terra.',
      ese: ['Porta il ginocchio davanti in avanti oltre la punta del piede.', 'Il tallone non si stacca.', 'Torna indietro e ripeti, poi cambia gamba.'],
      cue: 'Il ginocchio va verso il mignolo, il tallone resta incollato.', why: 'Migliora la flessione della caviglia, che permette squat più profondi e ginocchia più sicure.',
      err: ['Tallone che si alza', 'Ginocchio che cade verso l’interno']}); }
  // ===== seconda tornata (v149): piu' cervicale, spalle, schiena alta e bassa, anche, quadricipiti, interno coscia, braccia =====
  const SQ = o => Object.assign({}, SEAT, {t: 180}, o);
  // --- cervicale ---
  neck('st-collo-estensione', 'Estensione del collo (sguardo in alto)', {}, {nk: -35}, 'Muscoli anteriori del collo', 'sternocleidomastoideo, scaleni anteriori, muscoli sotto il mento',
    ['Seduto dritto, sguardo avanti', 'Testa indietro, sguardo al soffitto, bocca chiusa'], ['Porta lentamente lo sguardo verso il soffitto.', 'Tieni le labbra chiuse e il mento rilassato.', 'Tieni 15-20 secondi e torna lento.'],
    'Allunga la gola, non schiacciare la nuca.', 'Allunga la parte davanti del collo, accorciata quando si sta a lungo con la testa in avanti.', ['Andare troppo indietro di scatto', 'Farlo se gira la testa']);
  neck('st-collo-diagonale', 'Collo in diagonale (sguardo al ginocchio)', {az: .9}, {nk: 34, nkr: 32}, 'Estensori del collo, trapezio', 'splenio, semispinale, trapezio superiore, elevatore della scapola',
    ['Seduto dritto', 'Mento verso il ginocchio, testa girata di lato'], ['Ruota la testa di 30-40° verso destra.', 'Abbassa il mento verso il ginocchio destro.', 'Tieni 20-30 secondi e cambia lato.'],
    'Guarda il ginocchio e allunga la nuca dalla parte opposta.', 'Raggiunge le fibre del collo che il semplice “mento al petto” non allunga.', ['Alzare le spalle', 'Curvare tutta la schiena']);
  neck('st-collo-sternocleido', 'Allungamento dello sternocleidomastoideo', {az: 1.1}, {nk: -18, nkr: 40, nkl: 10}, 'Sternocleidomastoideo, scaleni', 'sternocleidomastoideo, scaleni anteriori',
    ['Seduto dritto, mano sulla clavicola', 'Testa girata e inclinata all’indietro'], ['Tieni ferma la clavicola con la mano opposta.', 'Gira la testa dalla parte opposta e porta lo sguardo in alto in diagonale.', 'Tieni 20 secondi e cambia lato.'],
    'Senti allungare il “cordone” che va dall’orecchio alla clavicola.', 'Allunga il muscolo che porta la testa in avanti, spesso teso in chi lavora al computer.', ['Andare troppo indietro', 'Sollevare la clavicola']);
  neck('st-collo-lato-mano', 'Allungamento laterale del collo con la mano', {az: 1.3, arm3: {n: [[.05, -.85, -.5], [0, .2, -1]]}, one: true}, {nkl: 38}, 'Trapezio superiore, scaleni', 'trapezio superiore, scaleni, elevatore della scapola',
    ['Mano appoggiata sopra la testa', 'Testa inclinata verso la spalla con il peso della mano'], ['Porta la mano sopra la testa fino all’orecchio opposto.', 'Lascia che il peso del braccio inclini la testa verso la spalla.', 'Tieni 20-30 secondi e cambia lato; la spalla opposta resta bassa.'],
    'La mano appoggia e basta: è il suo peso che allunga.', 'La versione più intensa dell’allungamento laterale, per il trapezio rigido.', ['Tirare la testa', 'Spalla opposta che sale']);
  ST({id: 'st-collo-mani-nuca', n: 'Nuca allungata con le mani dietro la testa', sm: ['collo', 'dorsali'], dose: '20-30 s', m: 'Estensori del collo, trapezio', mm: 'splenio, semispinale, trapezio superiore e medio', st: 'seat', benchSt: 'edge', ct: [0, .95, 3.6], gz: 8,
    fr: [[150, 300, SQ({})], [150, 300, SQ({nk: 40})]], cap: ['Seduto, mani intrecciate dietro la testa', 'Mento al petto con il peso delle braccia'],
    set: 'Seduto dritto, intreccia le dita dietro la testa.', pos: 'Gomiti in avanti e rilassati, schiena dritta.',
    ese: ['Lascia scendere il mento verso il petto con il peso delle braccia.', 'Non tirare: lascia solo pesare le mani.', 'Tieni 20-30 secondi.'], cue: 'I gomiti cadono in basso, la nuca si allunga.',
    why: 'Allunga in profondità la nuca e la parte alta della schiena.', err: ['Tirare con le braccia', 'Curvare la schiena bassa']});
  ST({id: 'st-collo-semicerchi', n: 'Semicerchi con la testa', sm: ['collo'], dyn: true, dose: '6-8 per lato', m: 'Muscoli del collo', mm: 'trapezio superiore, scaleni, sternocleidomastoideo, estensori del collo', st: 'seat', benchSt: 'edge', ct: [0, .95, 3.6], az: 1.2, tempo: [2.8, .3, 2.8],
    fr: [[tua, tfa, SQ({nkl: -32})], [tua, tfa, SQ({nk: 34})], [tua, tfa, SQ({nkl: 32})]], cap: ['Orecchio verso una spalla', 'La testa rotola davanti fino all’altra spalla'],
    set: 'Seduto dritto, mani sulle cosce.', pos: 'Spalle basse e ferme.',
    ese: ['Inclina la testa verso la spalla destra.', 'Falla rotolare davanti, mento al petto, fino alla spalla sinistra.', 'Torna indietro lentamente. Niente giri completi all’indietro.'], cue: 'Disegna un sorriso con il mento.',
    why: 'Scioglie il collo in tutte le direzioni davanti, senza schiacciare la nuca.', err: ['Fare il giro completo all’indietro', 'Andare veloce']});
  ST({id: 'st-collo-mento-estensione', n: 'Retrazione del mento con estensione', sm: ['collo', 'postura'], dyn: true, dose: '8-10 ripetizioni', m: 'Flessori profondi del collo', mm: 'flessori profondi del collo, estensori della parte alta della colonna', st: 'seat', benchSt: 'edge', ct: [0, .95, 3.6],
    fr: [[tua, tfa, SQ({})], [tua, tfa, SQ({nk: 14})], [tua, tfa, SQ({nk: -22})]], cap: ['Testa centrata', 'Mento indietro, poi sguardo in alto'],
    set: 'Seduto dritto, mani sulle cosce.', pos: 'Schiena dritta, spalle basse.',
    ese: ['Porta il mento indietro (doppio mento).', 'Da lì guarda lentamente in alto, tenendo il mento dentro.', 'Torna al centro e ripeti.'], cue: 'Prima indietro, poi su: la testa non va mai avanti.',
    why: 'Ridà movimento alla parte bassa del collo, rigida in chi sta con la testa in avanti.', err: ['Spingere il mento in avanti', 'Andare troppo indietro']});

  // --- spalle ---
  ST({id: 'st-spalla-asciugamano', n: 'Allungamento con l’asciugamano dietro la schiena', sm: ['spalle', 'braccia'], dose: '20-30 s per lato', m: 'Tricipiti, deltoidi, cuffia dei rotatori', mm: 'tricipite e dorsale (braccio in alto), cuffia dei rotatori e deltoide anteriore (braccio in basso)', st: 'stand', az: -0.9, ct: [0, 1.1, 5.2],
    arm3: {n: [[0, -1, .15], [-.25, 1, -.3]], f: [[-.3, 1, 0], [-.3, -1, .5]]}, fr: [[0, 0, {t: 180}], [0, 0, {t: 180, nk: 6}]], cap: ['Una mano dietro la nuca, l’altra dietro la schiena', 'Le mani si avvicinano tirando l’asciugamano'],
    set: 'In piedi, un asciugamano in mano. Un braccio in alto con la mano dietro la nuca, l’altro in basso con la mano dietro la schiena: le mani tengono i due capi.', pos: 'Busto dritto, testa ferma.',
    ese: ['Tira piano l’asciugamano verso l’alto con la mano in alto.', 'Poi tira verso il basso con l’altra.', 'Tieni 20-30 secondi e cambia braccio.'], cue: 'Avvicina le mani un centimetro alla volta, senza forzare.',
    why: 'Allunga insieme le due spalle in direzioni opposte; con il tempo le mani si toccano.', err: ['Inarcare la schiena', 'Spingere la testa avanti']});
  ST({id: 'st-dislocazioni', n: 'Rotazioni delle spalle con il bastone', sm: ['spalle', 'petto', 'postura'], dyn: true, dose: '10 ripetizioni lente', m: 'Deltoidi, pettorali, cuffia dei rotatori', mm: 'deltoidi, pettorali, cuffia dei rotatori, bicipiti', st: 'stand', gz: 52, presa: 'pro', tempo: [2.4, .3, 2.4],
    fr: [[15, 15, {t: 180}], [180, 180, {t: 180}], [305, 305, {t: 180}]], cap: ['Bastone davanti, presa larga', 'Bastone portato sopra la testa e dietro la schiena'],
    set: 'In piedi, un bastone (o un elastico, o un asciugamano) tenuto con presa molto larga davanti alle cosce.', pos: 'Braccia tese, addome attivo.',
    ese: ['Porta il bastone in alto sopra la testa a braccia tese.', 'Continua dietro fino alla schiena.', 'Torna indietro sulla stessa strada. Se non passa, allarga la presa.'], cue: 'Braccia sempre tese: allarga la presa invece di piegare i gomiti.',
    why: 'Muove le spalle in tutta l’escursione e apre il petto: ottimo riscaldamento prima di spinte e trazioni.', err: ['Piegare i gomiti', 'Inarcare la schiena', 'Presa troppo stretta']});
  ST({id: 'st-thread-needle', n: 'Infila l’ago (spalla e schiena a quattro zampe)', sm: ['spalle', 'dorsali'], dose: '20-30 s per lato', m: 'Deltoidi posteriori, romboidi', mm: 'deltoide posteriore, romboidi, trapezio, rotatori della colonna', st: 'kneel', benchSt: 'kneel', one: true, az: .7,
    arm3: {n: [[.1, .75, -.65], [.05, .35, -.95]]}, fr: [[0, 0, Object.assign({t: 115}, KQ)], [0, 0, Object.assign({t: 108, tw: 40, nkr: 25}, KQ)]], cap: ['A quattro zampe', 'Un braccio passa sotto il corpo, spalla e tempia a terra'],
    set: 'A quattro zampe: mani sotto le spalle, ginocchia sotto le anche.', pos: 'Bacino sopra le ginocchia.',
    ese: ['Fai passare un braccio sotto il corpo verso il lato opposto, palmo in su.', 'Appoggia spalla e tempia a terra.', 'Tieni 20-30 secondi e cambia lato.'], cue: 'Il bacino resta fermo: ruota solo la schiena alta.',
    why: 'Allunga la parte posteriore della spalla e la schiena alta in rotazione.', err: ['Spostare il bacino', 'Peso sul collo']});
  ST({id: 'st-bicipite-muro', n: 'Allungamento del bicipite al muro', sm: ['braccia', 'spalle', 'petto'], dose: '20-30 s per braccio', m: 'Bicipiti, deltoidi anteriori', mm: 'bicipite, deltoide anteriore, pettorale', st: 'stand', one: true, az: .6,
    arm3: {n: [[-1, 0, .3], [-1, -.05, .25]]}, fr: [[0, 0, {t: 180}], [0, 0, {t: 180, tw: 28}]], cap: ['Braccio teso dietro, palmo al muro', 'Busto girato dalla parte opposta'],
    set: 'Di fianco a un muro, braccio teso dietro all’altezza della spalla, palmo appoggiato con il pollice in basso.', pos: 'Gomito disteso, spalla bassa.',
    ese: ['Ruota il busto lontano dal braccio.', 'Senti allungare il bicipite e davanti alla spalla.', 'Tieni 20-30 secondi e cambia braccio.'], cue: 'Il braccio resta fermo, è il corpo che gira.',
    why: 'Allunga bicipite e parte davanti della spalla, dopo curl e trazioni.', err: ['Piegare il gomito', 'Spalla che sale']});
  ST({id: 'st-rotazione-esterna-stipite', n: 'Rotazione esterna della spalla allo stipite', sm: ['spalle', 'petto'], dose: '20-30 s per lato', m: 'Rotatori interni, pettorali', mm: 'sottoscapolare, gran pettorale, gran dorsale', st: 'stand', one: true, az: .8,
    arm3: {n: [[.05, 1, .2], [1, 0, .15]]}, fr: [[0, 0, {t: 180}], [0, 0, {t: 180, tw: -30}]], cap: ['Gomito piegato a 90° al fianco, mano allo stipite', 'Busto girato dalla parte opposta'],
    set: 'In piedi accanto a uno stipite, gomito piegato a 90° vicino al fianco, palmo appoggiato allo stipite.', pos: 'Gomito incollato al fianco.',
    ese: ['Ruota il busto lontano dalla mano.', 'Il gomito non si stacca dal fianco.', 'Tieni 20-30 secondi e cambia lato.'], cue: 'L’avambraccio è una porta che si apre.',
    why: 'Allunga i rotatori interni della spalla, spesso rigidi in chi fa tanta panca.', err: ['Staccare il gomito', 'Spingere troppo']});
  ST({id: 'st-mano-dietro-schiena', n: 'Mano dietro la schiena (rotazione interna)', sm: ['spalle'], dose: '20-30 s per lato', m: 'Deltoidi posteriori, cuffia dei rotatori', mm: 'infraspinato, piccolo rotondo, deltoide posteriore', st: 'stand', one: true, az: -0.8,
    arm3: {n: [[-.35, 1, .15], [.1, -.3, -1]]}, fr: [[0, 0, {t: 180}], [0, 0, {t: 180, tw: 10}]], cap: ['Dorso della mano sulla schiena', 'Gomito portato in avanti'],
    set: 'In piedi, appoggia il dorso della mano sulla schiena bassa.', pos: 'Spalla bassa, busto dritto.',
    ese: ['Porta il gomito in avanti (aiutati con l’altra mano).', 'Senti allungare dietro la spalla.', 'Tieni 20-30 secondi e cambia lato.'], cue: 'Il gomito va avanti, la mano resta sulla schiena.',
    why: 'Allunga i rotatori esterni della spalla, utile per chi lancia o fa sport con le braccia.', err: ['Forzare con dolore', 'Spalla che sale']});
  ST({id: 'st-aperture-t', n: 'Aperture delle braccia a “T” (scapole)', sm: ['spalle', 'dorsali', 'postura'], dyn: true, dose: '12-15 ripetizioni', m: 'Deltoidi posteriori, romboidi', mm: 'deltoide posteriore, romboidi, trapezio medio', st: 'stand', v: 'f', hs: {a: [-10, 2, 68], b: [69, 2, -4], r: 69},
    fr: [[90, 90, {t: 180}], [90, 90, {t: 180}]], cap: ['Braccia avanti all’altezza delle spalle', 'Braccia aperte a “T”, scapole strette'],
    set: 'In piedi, braccia tese avanti all’altezza delle spalle (anche con un elastico tra le mani).', pos: 'Busto fermo, mento dentro.',
    ese: ['Apri le braccia a “T” stringendo le scapole.', 'Tieni 2 secondi.', 'Torna lentamente avanti.'], cue: 'Le scapole si avvicinano come per stringere una matita.',
    why: 'Rinforza i muscoli tra le scapole e apre il petto: contro le spalle curve.', err: ['Alzare le spalle', 'Inarcare la schiena']});
  { const W = [92, 166], A = [176, 212], S0 = [W[0] + 25, W[1] - 64], H0 = [S0[0], S0[1] + 58], [th0, sh0] = legTo(H0, A, fwd), H1 = [126, 178], S1 = add(H1, 58, 172), [ua1, fa1] = armTo(S1, W, back), [th1, sh1] = legTo(H1, A, fwd), ua0 = r1(ang(S0, W));
    ST({id: 'st-spalle-panca', n: 'Allungamento delle spalle con le mani dietro su una panca', sm: ['spalle', 'petto', 'braccia'], dose: '20-30 s', m: 'Deltoidi anteriori, pettorali, bicipiti', mm: 'deltoide anteriore, gran pettorale, bicipite', st: 'stand', leg2: true, bench: [30, 100, 170], nb: true,
      fr: [[ua0, ua0, {t: 180, h: H0, th: th0, sh: sh0, th2: th0, sh2: sh0}], [ua1, fa1, {t: 172, h: H1, th: th1, sh: sh1, th2: th1, sh2: sh1}]], cap: ['Di spalle a una panca, mani sul bordo', 'Ginocchia piegate: il bacino scende, le spalle si allungano'],
      set: 'Di spalle a una panca, mani sul bordo con le dita in avanti, piedi un passo avanti.', pos: 'Petto aperto, spalle basse.',
      ese: ['Piega le ginocchia e lascia scendere il bacino.', 'Senti allungare davanti alle spalle.', 'Tieni 20-30 secondi.'], cue: 'Petto in fuori: non lasciare che le spalle salgano alle orecchie.',
      why: 'Allunga davanti alle spalle e il petto, accorciati da panca e piegamenti.', err: ['Spalle che salgono', 'Scendere troppo (fastidio alla spalla)']}); }

  // --- schiena alta ---
  { const H = [140, KNEE - 46], ua0 = 112, ua1 = 96;
    const pose = (t, ua) => { const S = add(H, 58, t), E = add(S, 35, ua); return {S, E, f: [ua, ua + 135, {t, h: H, th: 0, sh: -90, ft: 60, nk: 10}]}; };
    const p0 = pose(112, ua0), p1 = pose(97, ua1);
    ST({id: 'st-dorsale-panca', n: 'Dorsali in ginocchio con i gomiti su una panca', sm: ['dorsali', 'spalle', 'braccia'], dose: '30-45 s', m: 'Gran dorsale, tricipiti', mm: 'gran dorsale, grande rotondo, tricipite (capo lungo), muscoli della schiena alta', st: 'kneel', benchSt: 'kneel', bench: [r1(p1.E[0] - 14), r1(p1.E[0] + 40), r1(p1.E[1] + 6)], nb: true,
      fr: [p0.f, p1.f], cap: ['In ginocchio, gomiti sulla panca, mani dietro la testa', 'Petto che scende verso terra tra le braccia'],
      set: 'In ginocchio davanti a una panca, gomiti appoggiati sul bordo alla larghezza delle spalle, mani unite dietro la testa.', pos: 'Bacino sopra le ginocchia, addome attivo.',
      ese: ['Spingi il bacino un po’ indietro e lascia scendere il petto.', 'Senti allungare sotto le ascelle e il retro delle braccia.', 'Tieni 30-45 secondi.'], cue: 'Lo sterno scende verso il pavimento, la zona lombare non si inarca.',
      why: 'Uno dei migliori allungamenti per dorsali e tricipiti e per aprire la schiena alta: aiuta a portare le braccia sopra la testa.', err: ['Inarcare la zona lombare', 'Testa che cade']}); }
  ST({id: 'st-estensione-toracica-sedia', n: 'Estensione della schiena alta sullo schienale', sm: ['dorsali', 'postura', 'petto'], dyn: true, dose: '8-10 ripetizioni', m: 'Muscoli della schiena alta, pettorali', mm: 'estensori della colonna toracica, pettorali, addominali (in allungamento)', st: 'seat', gz: 8,
    fr: [[160, 300, SQ({})], [185, 325, SQ({t: 205})]], cap: ['Seduto contro lo schienale, mani dietro la testa', 'Schiena alta che si appoggia indietro sullo schienale'],
    set: 'Seduto su una sedia con lo schienale che arriva sotto le scapole, mani dietro la testa.', pos: 'Bacino fermo, gomiti avanti.',
    ese: ['Appoggiati indietro sullo schienale estendendo la schiena alta.', 'Guarda in alto e apri i gomiti.', 'Torna dritto e ripeti.'], cue: 'Lo schienale è il punto su cui la schiena “si piega” all’indietro.',
    why: 'Il contrario della postura curva alla scrivania: ridà estensione alla schiena alta.', err: ['Inarcare la zona lombare', 'Tirare la testa con le mani']});
  ST({id: 'st-rotazione-toracica-seduto', n: 'Rotazioni del busto da seduto', sm: ['dorsali', 'fianchi'], dyn: true, dose: '10 per lato', m: 'Rotatori della colonna, obliqui', mm: 'rotatori della colonna toracica, obliqui, gran dorsale', st: 'seat', benchSt: 'edge', gz: -16, az: .8,
    fr: [[...hug(180), SQ({tw: -48})], [...hug(180), SQ({tw: 48})]], cap: ['Seduto, braccia incrociate, busto ruotato', 'Busto ruotato dall’altra parte, bacino fermo'],
    set: 'Seduto a cavalcioni di una panca o su una sedia, braccia incrociate sul petto.', pos: 'Bacino e ginocchia fermi.',
    ese: ['Ruota il busto a destra il più possibile.', 'Torna e ruota a sinistra.', 'Cresci in altezza mentre ruoti.'], cue: 'Ruota attorno alla colonna come una vite.',
    why: 'Da seduto il bacino resta bloccato: la rotazione arriva tutta alla schiena alta.', err: ['Ruotare le ginocchia', 'Curvare la schiena']});
  ST({id: 'st-piegamento-seduto', n: 'Piegamento in avanti da seduto (tra le ginocchia)', sm: ['lombare', 'dorsali'], dose: '30-45 s', m: 'Erettori spinali, dorsali', mm: 'erettori spinali, quadrato dei lombi, gran dorsale', st: 'seat', benchSt: 'edge', ko: 16, ct: [0, .8, 3.9],
    fr: [[tua, tfa, SQ({})], [8, 8, SQ({t: 32, nk: 15})]], cap: ['Seduto, piedi a terra larghi', 'Busto appeso tra le ginocchia, braccia a terra'],
    set: 'Seduto sul bordo di una sedia o panca, piedi a terra più larghi del bacino.', pos: 'Collo rilassato.',
    ese: ['Lascia scendere il busto tra le ginocchia.', 'Lascia pendere testa e braccia.', 'Tieni 30-45 secondi e risali piano.'], cue: 'Lasciati andare: è la gravità che allunga.',
    why: 'Allunga la schiena senza tirare sui femorali: comodo anche in ufficio.', err: ['Rialzarsi di scatto']});

  // --- schiena bassa ---
  { const H = [150, LIEY], S = add(H, 58, 270), K1 = add(H, 46, 205), [ua1, fa1] = armTo(S, [K1[0] + 6, K1[1] + 4], down);
    ST({id: 'st-ginocchio-petto-singolo', n: 'Un ginocchio al petto da sdraiato', sm: ['lombare', 'glutei', 'flessori'], dose: '30 s per gamba', m: 'Glutei, erettori spinali', mm: 'grande gluteo, erettori lombari; ileopsoas della gamba tesa', st: 'floor', leg2: true,
      fr: [[92, 92, {t: 270, h: H, th: 140, sh: 35, th2: 90, sh2: 90}], [ua1, fa1, {t: 270, h: H, th: 205, sh: 115, th2: 90, sh2: 90}]], cap: ['Sdraiato, gambe tese', 'Un ginocchio abbracciato al petto, l’altra gamba tesa a terra'],
      set: 'Sdraiato sulla schiena, gambe tese.', pos: 'La gamba a terra resta tesa e appoggiata.',
      ese: ['Porta un ginocchio al petto e abbraccialo.', 'Tieni l’altra gamba tesa sul pavimento.', 'Tieni 30 secondi e cambia gamba.'], cue: 'La coscia a terra spinge verso il pavimento.',
      why: 'Allunga gluteo e zona lombare da un lato, e i flessori dell’anca della gamba tesa.', err: ['Sollevare la testa', 'Piegare la gamba a terra']});
    const A = [H[0] + 75, 212], [th0, sh0] = legTo(H, A), H1 = add(S, -58, 300), [th1, sh1] = legTo(H1, A);
    ST({id: 'st-ponte-a-terra', n: 'Ponte a terra (vertebra dopo vertebra)', sm: ['lombare', 'glutei', 'postura'], dyn: true, dose: '10-12 ripetizioni lente', m: 'Glutei, femorali', mm: 'grande gluteo, femorali, erettori spinali; mobilità della colonna', st: 'floor',
      fr: [[92, 92, {t: 270, h: H, th: th0, sh: sh0}], [88, 88, {t: 300, h: H1, th: th1, sh: sh1}]], cap: ['Sdraiato, ginocchia piegate', 'Bacino su: spalle, anche e ginocchia in linea'],
      set: 'Sdraiato sulla schiena, ginocchia piegate, piedi a terra alla larghezza del bacino, braccia lungo i fianchi.', pos: 'Mento leggermente dentro.',
      ese: ['Espira e solleva il bacino arrotolando la colonna una vertebra alla volta.', 'Tieni 2 secondi stringendo i glutei.', 'Scendi appoggiando una vertebra alla volta.'], cue: 'Prima il bacino si inclina, poi la schiena si stacca dal basso verso l’alto.',
      why: 'Mobilizza la zona lombare e attiva i glutei: utile contro il mal di schiena da sedentarietà.', err: ['Salire tutto in un pezzo', 'Inarcare troppo in alto']});
    ST({id: 'st-tergicristallo-supino', n: 'Ginocchia a destra e sinistra da sdraiato', sm: ['lombare', 'fianchi', 'glutei'], dyn: true, dose: '10 per lato', m: 'Obliqui, erettori spinali', mm: 'obliqui, quadrato dei lombi, rotatori della colonna, glutei', st: 'floor', gz: 72, lat: 2, az: .9,
      fr: [[30, 150, {t: 270, h: H, th: 128, sh: 55, lz: -40}], [30, 150, {t: 270, h: H, th: 128, sh: 55, lz: 40}]], cap: ['Sdraiato, ginocchia cadute da un lato', 'Ginocchia portate dall’altro lato, spalle a terra'],
      set: 'Sdraiato sulla schiena, braccia aperte, ginocchia piegate e unite, piedi a terra.', pos: 'Spalle appoggiate.',
      ese: ['Lascia scendere le ginocchia a destra.', 'Riportale al centro e falle scendere a sinistra.', 'Movimento lento, senza forzare.'], cue: 'Le spalle restano incollate a terra.',
      why: 'Scioglie la zona lombare in rotazione: perfetto al risveglio o a fine allenamento.', err: ['Staccare le spalle', 'Andare veloce']});
    ST({id: 'st-gambe-al-muro', n: 'Gambe al muro', sm: ['lombare', 'femorali'], dose: '1-3 minuti', m: 'Femorali, zona lombare', mm: 'ischiocrurali, polpacci; scarico della zona lombare', st: 'floor', wall: H[0] + 15,
      fr: [[92, 92, {t: 270, h: [H[0] - 8, H[1]], th: 168, sh: 168}], [92, 92, {t: 270, h: H, th: 178, sh: 178}]], cap: ['Sdraiato con il bacino vicino al muro, gambe in alto', 'Gambe tese appoggiate al muro, schiena rilassata'],
      set: 'Sdraiato sulla schiena con il bacino vicino a un muro.', pos: 'Glutei vicino al muro, braccia rilassate.',
      ese: ['Appoggia le gambe tese al muro.', 'Respira lento e rilassa la schiena.', 'Resta 1-3 minuti.'], cue: 'Non spingere: lascia che le gambe si appoggino da sole.',
      why: 'Rilassa la zona lombare e allunga dolcemente i femorali: ottimo a fine giornata.', err: ['Bacino troppo lontano dal muro']});
  }
  { const H = [112, 208], A = [H[0] + 24, 216], [th, sh] = legTo(H, A, up), K = add(H, 46, th), S0 = add(H, 58, 180), [ua0, fa0] = armTo(S0, [A[0] + 4, A[1] - 8], down), S1 = add(H, 58, 148), [ua1, fa1] = armTo(S1, [A[0] + 6, A[1] - 6], up);
    ST({id: 'st-farfalla-seduta', n: 'Farfalla da seduto (piante dei piedi unite)', sm: ['adduttori', 'glutei'], dose: '30-45 s', m: 'Adduttori', mm: 'adduttori, gracile, pettineo', st: 'floor', ko: 54, az: 1.15, yq: 'seated butterfly stretch',
      fr: [[ua0, fa0, {t: 180, h: H, th, sh}], [ua1, fa1, {t: 148, h: H, th, sh, nk: 10}]], cap: ['Seduto, piante dei piedi unite, ginocchia aperte', 'Busto in avanti con la schiena lunga'],
      set: 'Seduto a terra, unisci le piante dei piedi e avvicina i talloni al bacino.', pos: 'Schiena lunga, mani che tengono i piedi.',
      ese: ['Lascia scendere le ginocchia verso il pavimento.', 'Porta il busto in avanti con la schiena dritta; se vuoi, spingi piano le cosce con i gomiti.', 'Tieni 30-45 secondi.'], cue: 'Il petto va verso i piedi, non la testa verso le ginocchia.',
      why: 'Il classico allungamento dell’interno coscia, utile per gli squat larghi e per le anche rigide.', err: ['Curvare la schiena', 'Spingere forte sulle ginocchia']}); }
  { const H = [150, STAND], pose = (cu) => { const t = 120, S = cu ? add(add(H, 29, t + cu), 29, t) : add(H, 58, t), K = add(H, 46, 10); const [ua, fa] = armTo(S, [K[0] + 5, K[1] - 3], down); return [ua, fa, {t, cu, h: H, th: 10, sh: -8, nk: cu > 0 ? -15 : 22}]; };
    ST({id: 'st-gatto-in-piedi', n: 'Gatto e mucca in piedi (mani sulle ginocchia)', sm: ['lombare', 'dorsali', 'postura'], dyn: true, dose: '8-10 ripetizioni', m: 'Erettori spinali, addominali', mm: 'erettori spinali, retto addominale', st: 'stand', leg2: true,
      fr: [Object.assign(pose(18), {}), pose(-22)].map(f => [f[0], f[1], Object.assign({th2: 10, sh2: -8}, f[2])]), cap: ['Mani sulle ginocchia, schiena inarcata', 'Schiena arrotondata verso l’alto'],
      set: 'In piedi, ginocchia morbide, busto inclinato in avanti con le mani sulle ginocchia.', pos: 'Braccia tese.',
      ese: ['Inspira e inarca la schiena guardando avanti.', 'Espira e arrotonda la schiena portando il mento al petto.', 'Movimento lento.'], cue: 'Il movimento parte dal bacino.',
      why: 'La versione in piedi di gatto e mucca: si fa ovunque, anche in pausa al lavoro.', err: ['Muovere solo la testa', 'Andare veloce']}); }
  { const H = [150, STAND], S = add(H, 58, 198), W = [H[0] - 12, H[1] - 10], [ua, fa] = armTo(S, W, back), S0 = add(H, 58, 180), [ua0, fa0] = armTo(S0, [H[0] - 12, H[1] - 6], back);
    ST({id: 'st-estensione-in-piedi', n: 'Estensione della schiena in piedi (mani ai fianchi)', sm: ['lombare', 'postura'], dyn: true, dose: '8-10 ripetizioni', m: 'Addominali, flessori dell’anca', mm: 'addominali e flessori dell’anca in allungamento; erettori spinali', st: 'stand',
      fr: [[ua0, fa0, {t: 180, h: H}], [ua, fa, {t: 198, h: H, nk: -10}]], cap: ['In piedi, mani sulla schiena bassa', 'Busto inclinato indietro, bacino in avanti'],
      set: 'In piedi, piedi alla larghezza del bacino, mani appoggiate sulla schiena bassa.', pos: 'Ginocchia tese ma non bloccate.',
      ese: ['Inclinati indietro spingendo il bacino in avanti.', 'Tieni 1-2 secondi.', 'Torna dritto e ripeti.'], cue: 'Le mani sostengono la schiena, il bacino va avanti.',
      why: 'Il contrario dello stare seduti piegati: dopo tante ore alla scrivania scarica la zona lombare.', err: ['Piegare le ginocchia', 'Andare indietro con la testa di scatto']}); }

  // --- anche: flessori, glutei, interno coscia ---
  { const H = [238, 172], S = add(H, 58, 270), K = add(H, 46, 205), [ua, fa] = armTo(S, [K[0] + 6, K[1] + 4], down);
    ST({id: 'st-thomas-panca', n: 'Flessori dell’anca sdraiato sul bordo della panca', sm: ['flessori', 'quadricipiti'], dose: '30-45 s per lato', m: 'Flessori dell’anca, quadricipiti', mm: 'ileopsoas e retto femorale della gamba che pende', st: 'lie', leg2: true, nb: true,
      fr: [[92, 92, {t: 270, h: H, th: 100, sh: 2, th2: 100, sh2: 2}], [ua, fa, {t: 270, h: H, th: 205, sh: 115, th2: 40, sh2: 4}]], cap: ['Sdraiato sulla panca, bacino sul bordo', 'Un ginocchio al petto, l’altra gamba pende verso terra'],
      set: 'Sdraiato su una panca con il bacino vicino al bordo e le gambe fuori.', pos: 'Schiena appoggiata, bacino sul bordo.',
      ese: ['Porta un ginocchio al petto e abbraccialo.', 'Lascia pendere l’altra gamba verso il pavimento.', 'Tieni 30-45 secondi e cambia lato.'], cue: 'La coscia che pende scende da sola: rilassala.',
      why: 'Il modo più efficace per allungare i flessori dell’anca senza inarcare la schiena (test di Thomas).', err: ['Inarcare la schiena', 'Bacino troppo lontano dal bordo']}); }
  { const A = [206, 212], H0 = [140, 166], R = [H0[0] - 68, KNEE], [th0, sh0] = legTo(H0, A), H1 = [150, 178], [th1, sh1] = legTo(H1, A), t1 = 128, S1 = add(H1, 58, t1), [ua1, fa1] = armTo(S1, [A[0] - 18, 214], down), K0 = add(H0, 46, th0), [ua0, fa0] = armTo(add(H0, 58, 180), [K0[0] - 2, K0[1] - 4], down);
    ST({id: 'st-lucertola', n: 'Lucertola (affondo basso, mani a terra)', sm: ['flessori', 'glutei', 'adduttori'], dose: '30-45 s per lato', m: 'Flessori dell’anca, glutei, adduttori', mm: 'ileopsoas della gamba dietro, grande gluteo e adduttori della gamba davanti', st: 'stand', rl: R,
      fr: [[ua0, fa0, {t: 180, h: H0, th: th0, sh: sh0, ft: 10}], [ua1, fa1, {t: t1, h: H1, th: th1, sh: sh1, ft: 10}]], cap: ['Affondo con il ginocchio dietro a terra', 'Mani a terra dentro il piede davanti, bacino basso'],
      set: 'Dall’affondo con il ginocchio a terra, porta il piede davanti un po’ verso l’esterno.', pos: 'Piede davanti piatto, ginocchio sopra la caviglia.',
      ese: ['Appoggia le mani a terra all’interno del piede davanti.', 'Lascia scendere il bacino.', 'Per aumentare, appoggia gli avambracci. Tieni 30-45 secondi e cambia lato.'], cue: 'Il bacino scende verso terra, il petto resta aperto.',
      why: 'Apre le anche in tutte le direzioni: flessori della gamba dietro, gluteo e interno coscia della gamba davanti.', err: ['Ginocchio davanti che cade verso l’interno', 'Spalle alle orecchie']}); }
  { const H = [150, 174], K2 = add(H, 46, -30), A2 = add(K2, 48, 175), A = [H[0] + 56, 212], [th, sh] = legTo(H, A), K = add(H, 46, th), [ua, fa] = armTo(add(H, 58, 182), [K[0] - 4, K[1] - 4], down);
    ST({id: 'st-couch-stretch', n: 'Allungamento con il piede al muro (couch stretch)', sm: ['flessori', 'quadricipiti'], dose: '45-60 s per lato', m: 'Quadricipiti, flessori dell’anca', mm: 'retto femorale e ileopsoas della gamba dietro', st: 'stand', leg2: true, wall: r1(A2[0] - 7),
      fr: [[ua, fa, {t: 176, h: [H[0] - 6, H[1]], th, sh, th2: -30, sh2: 175}], [ua, fa, {t: 182, h: H, th, sh, th2: -30, sh2: 175}]], cap: ['Ginocchio dietro a terra, collo del piede sul muro', 'Busto dritto e bacino avanti'],
      set: 'Ginocchio dietro a terra vicino al muro (su un cuscino), tibia appoggiata al muro con il collo del piede; piede davanti a terra.', pos: 'Busto dritto, glutei stretti.',
      ese: ['Raddrizza il busto e porta il bacino in avanti.', 'Stringi il gluteo della gamba dietro.', 'Tieni 45-60 secondi e cambia lato.'], cue: 'Più il busto è dritto, più si allunga: vai piano.',
      why: 'L’allungamento più intenso per quadricipite e flessori dell’anca insieme.', err: ['Inarcare la schiena', 'Partire troppo vicino al muro']}); }
  { const H = [150, 140], A2 = [160, 212], [th2, sh2] = legTo(H, A2, fwd), K2 = add(H, 46, th2), [th, sh] = legTo(H, [K2[0] + 2, K2[1] - 6], up), t = 150, K = add(H, 46, th), [ua, fa] = armTo(add(H, 58, t), [K[0] + 4, K[1] + 4], down);
    ST({id: 'st-figura-4-in-piedi', n: 'Figura 4 in piedi (gluteo)', sm: ['glutei'], dose: '20-30 s per lato', m: 'Glutei, piriforme', mm: 'piriforme, grande e medio gluteo', st: 'stand', leg2: true, ko: 28,
      fr: [[5, 5, {t: 180, h: [150, STAND], th: 0, sh: 0, th2: 0, sh2: 0}], [ua, fa, {t, h: H, th, sh, th2, sh2}]], cap: ['In piedi', 'Caviglia sul ginocchio opposto, bacino indietro come per sedersi'],
      set: 'In piedi, eventualmente tenendoti a un appoggio.', pos: 'Schiena dritta.',
      ese: ['Appoggia la caviglia destra sul ginocchio sinistro.', 'Piega la gamba d’appoggio e porta il bacino indietro come per sederti.', 'Tieni 20-30 secondi e cambia lato.'], cue: 'Petto verso la tibia, bacino indietro.',
      why: 'Allunga il gluteo e allena anche l’equilibrio.', err: ['Curvare la schiena', 'Perdere l’equilibrio: tieniti a un appoggio']}); }
  { const H = [112, 208], K = add(H, 46, 150), [ua, fa] = armTo(add(H, 58, 186), [K[0] + 6, K[1] + 4], down);
    ST({id: 'st-ginocchio-petto-seduto', n: 'Ginocchio al petto da seduto', sm: ['glutei', 'lombare'], dose: '30 s per lato', m: 'Glutei', mm: 'grande gluteo, piriforme, erettori lombari', st: 'floor', leg2: true,
      fr: [[90, 90, {t: 180, h: H, th: 90, sh: 90, th2: 90, sh2: 90}], [ua, fa, {t: 186, h: H, th: 150, sh: 30, th2: 90, sh2: 90}]], cap: ['Seduto, gambe tese', 'Un ginocchio abbracciato al petto'],
      set: 'Seduto a terra con le gambe tese.', pos: 'Schiena dritta.',
      ese: ['Piega un ginocchio e abbraccialo portandolo al petto.', 'Resta dritto con la schiena.', 'Tieni 30 secondi e cambia lato.'], cue: 'Porta il ginocchio verso la spalla opposta per sentirlo di più nel gluteo.',
      why: 'Allungamento semplice del gluteo, da fare anche sul letto.', err: ['Curvare la schiena']}); }
  ST({id: 'st-squat-sumo', n: 'Squat largo con i gomiti sulle ginocchia (dinamico)', sm: ['adduttori', 'glutei', 'polpacci'], dyn: true, dose: '10 ripetizioni (tieni 3 s giù)', m: 'Adduttori, glutei', mm: 'adduttori, grande gluteo, soleo', st: 'stand', ko: 26,
    gz: 4, fr: [[5, 5, {t: 180}], [28, 158, {t: 158, th: 102, sh: -26, ft: 42}]], cap: ['In piedi a gambe larghe', 'Giù in squat, gomiti che spingono le ginocchia in fuori'],
    set: 'In piedi con i piedi molto larghi e le punte aperte.', pos: 'Talloni a terra, petto alto.',
    ese: ['Scendi in squat profondo.', 'Mani unite, spingi le ginocchia in fuori con i gomiti per 3 secondi.', 'Risali e ripeti.'], cue: 'Ginocchia in fuori, petto in alto.',
    why: 'Apre le anche e allunga l’interno coscia in modo attivo: ottimo riscaldamento per squat e stacchi.', err: ['Talloni che si alzano', 'Schiena tonda']});

  // --- quadricipiti ---
  { const H = [150, 200], S = add(H, 58, 270), A = add(add(H, 46, 90), 48, -82), [ua, fa] = armTo(S, [A[0] - 2, A[1] + 3], down);
    ST({id: 'st-quadricipite-fianco', n: 'Allungamento del quadricipite sdraiato su un fianco', sm: ['quadricipiti', 'flessori'], dose: '30 s per gamba', m: 'Quadricipiti', mm: 'quadricipite (retto femorale), ileopsoas', st: 'floor', leg2: true, one: true, az: 1.3,
      fr: [[92, 92, {t: 270, h: H, th: 90, sh: 90, th2: 90, sh2: 90, roll: 90}], [ua, fa, {t: 270, h: H, th: 92, sh: -82, th2: 90, sh2: 90, roll: 90}]], cap: ['Sdraiato su un fianco', 'Tallone al gluteo tenuto con la mano'],
      set: 'Sdraiato su un fianco, testa appoggiata sul braccio di sotto.', pos: 'Ginocchia vicine, bacino dritto.',
      ese: ['Piega il ginocchio di sopra e prendi la caviglia.', 'Porta il tallone verso il gluteo e spingi il bacino un po’ in avanti.', 'Tieni 30 secondi e cambia lato.'], cue: 'Il ginocchio va indietro, non verso il petto.',
      why: 'Allungamento del quadricipite rilassato, senza dover tenere l’equilibrio.', err: ['Ginocchio che sale verso il petto', 'Inarcare la schiena']}); }
  { const H0 = [146, 171], A2 = [H0[0] + 56, 212], pose = (H, sh) => { const K = add(H, 46, -20), A = add(K, 48, sh), [th2, sh2] = legTo(H, A2), [ua, fa] = armTo(add(H, 58, 180), [A[0] + 2, A[1] - 3], back); return [ua, fa, {t: 180, h: H, th: -20, sh, th2, sh2}]; };
    ST({id: 'st-quadricipite-ginocchio', n: 'Quadricipite in ginocchio (piede dietro in mano)', sm: ['quadricipiti', 'flessori'], dose: '30 s per gamba', m: 'Quadricipiti, flessori dell’anca', mm: 'retto femorale e ileopsoas della gamba dietro', st: 'stand', leg2: true, one: true,
      fr: [pose(H0, -130), pose([H0[0] + 8, H0[1] + 3], -172)], cap: ['Affondo con il ginocchio dietro a terra', 'Piede dietro preso con la mano e portato al gluteo'],
      set: 'In affondo con il ginocchio dietro a terra (su un tappetino), piede davanti piatto.', pos: 'Busto dritto, glutei stretti.',
      ese: ['Piega il ginocchio dietro e prendi il piede con la mano dello stesso lato.', 'Porta il tallone verso il gluteo e il bacino in avanti.', 'Tieni 30 secondi e cambia lato.'], cue: 'Bacino avanti e busto dritto: senti tutto il davanti della coscia.',
      why: 'Allunga quadricipite e flessori dell’anca insieme, più a fondo della versione in piedi.', err: ['Inarcare la schiena', 'Ginocchio davanti oltre la punta']}); }

  // --- braccia e polsi ---
  ST({id: 'st-polsi-ginocchio', n: 'Polsi a terra con le dita verso le ginocchia', sm: ['braccia'], dose: '20-30 s', m: 'Flessori dell’avambraccio', mm: 'flessori del polso e delle dita', st: 'kneel', benchSt: 'kneel', hand: true, presa: 'pro',
    fr: [[0, 0, Object.assign({t: 115, hd: -90}, KQ)], [8, 8, Object.assign({t: 108, hd: -90}, KQ, {h: [134, KNEE - 46]})]], cap: ['A quattro zampe, dita delle mani verso le ginocchia', 'Bacino indietro: si allunga sotto gli avambracci'],
    set: 'A quattro zampe, palmi a terra con le dita rivolte verso le ginocchia.', pos: 'Braccia tese, palmi ben appoggiati.',
    ese: ['Porta lentamente il bacino indietro.', 'Tieni i palmi a terra.', 'Tieni 20-30 secondi.'], cue: 'Vai indietro solo fin dove i palmi restano giù.',
    why: 'Allunga gli avambracci dopo tanta presa e prepara i polsi a piegamenti e plank.', err: ['Staccare i palmi', 'Forzare con dolore al polso']});
  ST({id: 'st-dorso-mani-terra', n: 'Dorso delle mani a terra', sm: ['braccia'], dose: '20-30 s', m: 'Estensori dell’avambraccio', mm: 'estensori del polso e delle dita', st: 'kneel', benchSt: 'kneel', hand: true, presa: 'sup',
    fr: [[0, 0, Object.assign({t: 115, hd: -90}, KQ)], [8, 8, Object.assign({t: 108, hd: -90}, KQ, {h: [134, KNEE - 46]})]], cap: ['A quattro zampe, dorso delle mani a terra', 'Bacino indietro: si allunga sopra gli avambracci'],
    set: 'A quattro zampe, dorso delle mani a terra con le dita verso le ginocchia.', pos: 'Braccia tese.',
    ese: ['Porta piano il bacino indietro.', 'Tieni il dorso delle mani appoggiato.', 'Tieni 20-30 secondi.'], cue: 'Movimento piccolo: si sente subito.',
    why: 'Allunga la parte sopra dell’avambraccio, utile contro il dolore al gomito.', err: ['Forzare']});
  { const S = [0, 0], W0 = [18, 6], W1 = [18, 28], [ua0, fa0] = armTo(S, W0, down), [ua1, fa1] = armTo(S, W1, down);
    ST({id: 'st-preghiera', n: 'Mani giunte a preghiera (polsi)', sm: ['braccia'], dose: '20-30 s', m: 'Flessori dell’avambraccio', mm: 'flessori del polso e delle dita', st: 'stand', hand: true, gz: 3, lat: 2,
      fr: [[ua0, fa0, {t: 180, hd: -70}], [ua1, fa1, {t: 180, hd: -80}]], cap: ['Palmi uniti davanti al petto', 'Mani abbassate tenendo i palmi uniti'],
      set: 'In piedi o seduto, palmi uniti davanti al petto, dita in alto.', pos: 'Gomiti aperti, spalle basse.',
      ese: ['Abbassa lentamente le mani tenendo i palmi uniti.', 'Fermati quando senti allungare gli avambracci.', 'Tieni 20-30 secondi.'], cue: 'I palmi non si staccano mai.',
      why: 'Allunga i polsi in modo semplice, ottimo per chi lavora al computer.', err: ['Staccare i palmi', 'Alzare le spalle']}); }
  ST({id: 'st-polsi-mobilita', n: 'Mobilità dei polsi (su e giù)', sm: ['braccia'], dyn: true, dose: '10-15 ripetizioni', m: 'Avambracci', mm: 'flessori ed estensori del polso', st: 'stand', hand: true,
    fr: [[88, 88, {t: 180, hd: -60}], [88, 88, {t: 180, hd: 60}]], cap: ['Braccia avanti, polsi piegati in su', 'Polsi piegati in giù'],
    set: 'In piedi, braccia tese avanti.', pos: 'Spalle basse.',
    ese: ['Piega i polsi verso l’alto.', 'Poi verso il basso.', 'Aggiungi anche cerchi nei due sensi.'], cue: 'Movimento ampio e lento.',
    why: 'Scalda i polsi prima di allenarsi (piegamenti, panca, plank).', err: ['Andare a scatti']});
})();
