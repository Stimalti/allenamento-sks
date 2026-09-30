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
