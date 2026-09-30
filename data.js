/* Database esercizi — Atletica SKS (powerrack + panca + jammer arms + cavi)
   Convenzione angoli delle illustrazioni: 0 = giù, 90 = avanti (destra), 180 = su, -90 = indietro.
   fr = [frame partenza, frame arrivo], ogni frame = [angolo braccio, angolo avambraccio, {override}] */
const EX = [];
const E = o => EX.push(o);

/* ============================== PETTO ============================== */
E({id:'p-panca', n:'Panca piana con bilanciere', g:'petto', a:'Bilanciere', m:'Pettorali, tricipiti, deltoidi anteriori',
 st:'lie', eq:'bar', fr:[[180,180],[80,180]], cap:['Bilanciere sopra il petto, braccia distese','Bilanciere sfiora il petto, avambracci verticali'],
 set:'Rack con i safety a altezza petto. Panca piana sotto il bilanciere, occhi sotto la barra. Presa poco più larga delle spalle.',
 pos:'Scapole addotte e depresse (come se le infilassi nelle tasche posteriori), petto alto, piedi ben piantati a terra sotto le ginocchia, leggero arco lombare naturale.',
 ese:['Stacca il bilanciere e portalo sopra le spalle a braccia tese.','Scendi controllato in 2 secondi verso la parte bassa dello sterno, gomiti a ~45-60° dal busto (non a 90°).','Fai un breve stop sul petto senza rimbalzare.','Spingi "spingendo te stesso via dalla panca" e porta la barra in leggera diagonale fino sopra le spalle.'],
 cue:'Spingi con le mani verso il soffitto, tieni i gomiti sotto i polsi: l’avambraccio resta sempre verticale.',
 why:'È il grande esercizio di forza per la spinta orizzontale: carica petto, tricipiti e spalle con i carichi più alti possibili, quindi è il miglior stimolo per aumentare la forza della parte alta.',
 err:['Gomiti a 90° rispetto al busto (stress sulla spalla)','Sedere che si stacca dalla panca','Rimbalzo sul petto','Polsi piegati indietro']});

E({id:'p-incl-db', n:'Panca inclinata con manubri', g:'petto', a:'Manubri', m:'Petto alto (clavicolare), deltoidi anteriori, tricipiti',
 st:'inc', eq:'db', fr:[[178,180],[55,180]], cap:['Manubri sopra le spalle, braccia distese','Gomiti sotto il livello del busto, manubri ai lati del petto'],
 set:'Panca inclinata a 30° (non oltre: a 45-60° lavora quasi solo la spalla). Manubri sulle cosce, poi "calciali" in posizione.',
 pos:'Schiena e scapole ben appoggiate allo schienale, petto alto, piedi a terra. Polsi dritti, palmi in avanti o leggermente neutri.',
 ese:['Parti con i manubri sopra le spalle, braccia quasi tese.','Scendi lentamente allargando i gomiti a ~45° dal busto fino a sentire lo stiramento del petto.','Spingi verso l’alto e leggermente verso l’interno, senza far battere i manubri in cima.'],
 cue:'Pensa a spingere i gomiti verso il basso e dentro, non solo le mani verso l’alto.',
 why:'Con i manubri il range è più ampio e i due lati lavorano in modo indipendente (corregge gli squilibri). L’inclinazione porta lavoro sul petto alto, che completa la panca piana.',
 err:['Panca troppo inclinata','Gomiti svasati a 90°','Manubri che si toccano e rimbalzano','Scapole che si sollevano dallo schienale']});

E({id:'p-croci-alte', n:'Croci ai cavi alti (dall’alto verso il basso)', g:'petto', a:'Cavi', m:'Pettorali (porzione sternale/bassa)',
 st:'stand', v:'f', an:[[25,25],[275,25]], eq:'cable', fr:[[105,105],[30,-65,{t:176}]], cap:['Braccia aperte, leggermente sopra l’orizzontale','Mani unite davanti al basso ventre, gomiti appena piegati'],
 set:'Due cavi ALTI (puleggia al massimo), maniglie singole. Posizionati al centro tra le torri, un passo avanti rispetto alla linea dei cavi.',
 pos:'Busto inclinato in avanti di ~15°, posizione a passo (un piede avanti) per la stabilità. Gomiti fissi, leggermente piegati (circa 160°). Petto in fuori.',
 ese:['Parti con le braccia aperte, sentendo il petto stirarsi.','Porta le mani verso il basso e il centro, tracciando un arco come se abbracciassi un grosso albero.','Quando le mani si incontrano all’altezza dell’addome, stringi il petto per 1 secondo.','Risali lentamente controllando il cavo.'],
 cue:'Avvicina i gomiti e "stringi il petto" — non avvicinare semplicemente le mani. L’angolo del gomito non cambia durante tutto il movimento.',
 why:'Isola la parte centrale-bassa del petto lungo la sua direzione delle fibre. Il cavo mantiene tensione costante anche in chiusura, dove i manubri la perdono.',
 err:['Piegare e distendere i gomiti (diventa una spinta)','Usare lo slancio del busto','Spalle che salgono verso le orecchie']});

E({id:'p-croci-basse', n:'Croci ai cavi dal basso verso l’alto', g:'petto', a:'Cavi', m:'Petto alto (clavicolare), deltoidi anteriori',
 st:'stand', v:'f', an:[[25,210],[275,210]], eq:'cable', fr:[[25,15],[75,-100,{t:176}]], cap:['Mani ai lati delle cosce, braccia leggermente piegate','Mani unite all’altezza del petto alto/mento'],
 set:'Due cavi BASSI (puleggia al minimo), maniglie singole. Stai al centro, un piede avanti, busto leggermente inclinato in avanti.',
 pos:'Gomiti leggermente flessi e fissi. Petto in fuori, spalle basse. Il movimento è un arco dal basso verso l’alto davanti a te.',
 ese:['Parti con le mani lungo i fianchi, leggermente dietro al busto.','Solleva le braccia in arco verso l’alto-dentro, come a raccogliere qualcosa da terra e portarlo al viso.','Unisci le mani all’altezza del petto alto, stringi per 1 secondo.','Torna indietro lentamente fino a sentire lo stiramento.'],
 cue:'Porta i gomiti verso il centro del petto, immagina di "sollevare" con il gomito, non con la mano.',
 why:'Direzione delle fibre della parte alta del petto: completa lo sviluppo del petto "alto" e lavora l’ultima parte dell’accorciamento dove la panca è meno efficace.',
 err:['Alzare troppo le mani (entra il trapezio)','Slancio con la schiena','Gomiti completamente tesi o troppo piegati']});

E({id:'p-croci-petto', n:'Croci ai cavi all’altezza del petto', g:'petto', a:'Cavi', m:'Pettorali (centrale)',
 st:'stand', v:'f', an:[[25,64],[275,64]], eq:'cable', fr:[[95,95],[55,-110,{t:176}]], cap:['Braccia aperte a livello delle spalle','Mani unite davanti al petto'],
 set:'Due cavi all’altezza delle spalle (circa 130-140 cm da terra). Maniglie singole.',
 pos:'Passo in avanti, busto inclinato di ~10-15°, gomiti leggermente piegati e fissi. Petto in fuori.',
 ese:['Parti con le braccia aperte e senti lo stiramento del petto.','Chiudi in arco orizzontale portando le mani davanti allo sterno.','Contrai 1 secondo a braccia incrociate/mani unite.','Apri lentamente fino alla posizione iniziale.'],
 cue:'Stringi il petto come se volessi avvicinare i gomiti davanti a te.',
 why:'La versione più "pulita" della croce: lavora la parte centrale del petto con tensione costante, ideale come finale dopo i carichi pesanti.',
 err:['Braccia troppo distese (stress sul bicipite/spalla)','Spalle che vanno in avanti','Peso troppo alto che fa perdere l’arco']});

E({id:'p-press-cavi', n:'Chest press ai cavi in piedi', g:'petto', a:'Cavi', m:'Pettorali, tricipiti, deltoidi anteriori',
 st:'stand', eq:'cable', an:[45,62], fr:[[-70,70,{t:170}],[88,90,{t:170}]], cap:['Gomiti indietro, mani ai lati del petto','Braccia distese davanti al petto'],
 set:'Due cavi all’altezza del petto, stai di schiena alle torri con un piede avanti. Maniglie singole o doppie.',
 pos:'Busto inclinato leggermente in avanti, core contratto, stabile sul piede avanti. Gomiti a ~45° dal busto.',
 ese:['Parti con le mani vicino al petto, gomiti indietro.','Spingi le mani in avanti fino a braccia quasi tese, avvicinando i pugni.','Ritorna lentamente senza far appoggiare il peso.'],
 cue:'Spingi "attraverso" lo sterno, e alla fine avvicina leggermente i pugni (chiusura del petto).',
 why:'Spinta orizzontale con tensione costante e forte richiesta di stabilità del core; ottimo dopo la panca per accumulare volume senza stressare le articolazioni.',
 err:['Busto che si piega all’indietro','Spalle in avanti a fine corsa','Gomiti troppo larghi']});

E({id:'p-croci-panca', n:'Croci su panca piana con cavi bassi', g:'petto', a:'Cavi', m:'Pettorali, stiramento profondo',
 st:'lie', eq:'cable', an:[185,215], fr:[[178,180],[110,150]], cap:['Braccia sopra il petto, leggermente piegate','Braccia aperte, stiramento del petto'],
 set:'Panca piana posizionata al centro tra i due cavi BASSI (puleggia al minimo). Maniglie singole, portale sopra il petto sdraiandoti.',
 pos:'Scapole addotte e depresse, petto alto, piedi a terra. Gomiti leggermente piegati e fissi per tutto il movimento.',
 ese:['Parti con le braccia sopra il petto, palmi che si guardano.','Apri in arco controllato fino ad avere i gomiti appena sotto il livello della panca.','Chiudi portando i gomiti uno verso l’altro (non le mani).'],
 cue:'Non scendere oltre il punto in cui senti stiramento senza dolore alla spalla; chiudi avvicinando i gomiti.',
 why:'Il cavo mantiene tensione anche in alto, dove i manubri sarebbero "scarichi". Con la panca hai la massima stabilità per concentrarti sul petto.',
 err:['Scendere troppo in basso con le spalle','Trasformare il gesto in una panca piana','Scapole che si staccano dalla panca']});

E({id:'p-jammer-press', n:'Chest press con Jammer Arms su panca', g:'petto', a:'Jammer', m:'Pettorali, tricipiti, deltoidi anteriori',
 st:'lie', eq:'jam', an:[60,185], fr:[[80,180],[180,180]], cap:['Impugnature ai lati del petto','Braccia distese, spinta completa'],
 set:'Panca piana tra le jammer arms agganciate al rack in basso, dischi caricati sulle estremità. Regola le arms in modo che, da sdraiato, le impugnature siano all’altezza dei pettorali.',
 pos:'Scapole addotte, petto alto, piedi a terra. Le braccia si muovono in arco: il movimento è indipendente per ogni lato.',
 ese:['Parti con le impugnature ai lati del petto e i gomiti a ~45°.','Spingi fino a braccia quasi distese, avvicinando leggermente le mani.','Ritorna lento controllando la discesa dei dischi.'],
 cue:'Spingi "avvicinando" le impugnature sopra il petto, senza bloccare di colpo i gomiti.',
 why:'Il movimento indipendente delle jammer arms elimina la compensazione del lato forte e permette di spingere pesante con sicurezza (puoi lasciare andare in ogni momento).',
 err:['Schiena troppo inarcata','Spingere con una sola braccia più dell’altra','Bloccare i gomiti in cima']});

/* ============================== SPALLE ============================== */
E({id:'s-military', n:'Military press con bilanciere', g:'spalle', a:'Bilanciere', m:'Deltoidi anteriori e laterali, tricipiti, core',
 st:'stand', eq:'bar', fr:[[15,175],[180,180]], cap:['Bilanciere sulle clavicole','Braccia distese sopra la testa'],
 set:'Bilanciere nel rack all’altezza poco sotto le spalle. Presa di poco più larga delle spalle, barra appoggiata sulle clavicole e sui deltoidi anteriori.',
 pos:'Piedi alla larghezza delle spalle, glutei e addome contratti, gomiti appena davanti alla barra. Testa neutra.',
 ese:['Stacca la barra dal rack e fai un passo indietro.','Spingi la barra verticalmente, spostando la testa indietro per farla passare.','Quando la barra è sopra la testa, spingi la testa "attraverso le braccia" e blocca sopra le spalle.','Scendi controllato fino alle clavicole.'],
 cue:'Gomiti sotto la barra durante la salita, spingi "il soffitto" con il bilanciere.',
 why:'È il movimento di forza principale per le spalle e il tronco: il carico si sposta lungo tutto il corpo, migliorando forza e stabilità della cintura scapolare.',
 err:['Schiena troppo inarcata','Gomiti troppo larghi','Barra che va in avanti','Non bloccare sopra la testa']});

E({id:'s-press-db', n:'Shoulder press con manubri su panca', g:'spalle', a:'Manubri', m:'Deltoidi, tricipiti',
 st:'seat', eq:'db', fr:[[15,175],[178,180]], cap:['Manubri all’altezza delle spalle','Braccia distese sopra la testa'],
 set:'Panca regolata quasi verticale (80-85°), schiena ben appoggiata. Manubri portati sulle spalle.',
 pos:'Piedi ben piantati, glutei e schiena appoggiati, core contratto. Polsi sopra i gomiti.',
 ese:['Parti con i gomiti poco davanti al piano delle spalle e i manubri sopra di esse.','Spingi verticalmente fino a braccia quasi tese.','Scendi lentamente fino a che i manubri sono all’altezza delle orecchie/spalle.'],
 cue:'Spingi i gomiti verso l’alto e leggermente verso l’interno, come se "chiudessi" sopra la testa.',
 why:'Più libertà di movimento rispetto al bilanciere e stabilizzatori più coinvolti. Riduce il rischio di compensi tra i due lati.',
 err:['Schiena inarcata','Lasciare cadere i manubri in avanti','Non usare l’intero range']});

E({id:'s-laterali', n:'Alzate laterali al cavo basso', g:'spalle', a:'Cavi', m:'Deltoide laterale (mediale)',
 st:'stand', v:'f', one:true, an:[[25,212]], eq:'cable', fr:[[10,10],[92,92]], cap:['Braccio lungo il fianco','Braccio all’altezza della spalla'],
 set:'Cavo BASSO, maniglia singola. Stai di lato alla torre; la mano lontana dal cavo lavora, cavo che passa davanti al corpo.',
 pos:'Busto leggermente inclinato verso il lato opposto a quello che lavora, gomito leggermente piegato, mano in presa neutra.',
 ese:['Parti con il braccio lungo il fianco (leggermente davanti).','Solleva il braccio lateralmente fino all’altezza delle spalle, il gomito guida il movimento.','Fermati a 90°: oltre entra il trapezio.','Scendi lentamente (3 secondi).'],
 cue:'Sollevare il gomito, non la mano: immagina di versare una brocca d’acqua con il dito mignolo leggermente alto.',
 why:'Il cavo mantiene il carico anche alla partenza (dove i manubri non lavorano), allungando la tensione sul deltoide laterale: spalle più larghe e stabili.',
 err:['Usare lo slancio del busto','Alzare oltre l’altezza della spalla','Spalla alta verso l’orecchio']});

E({id:'s-frontali', n:'Alzate frontali al cavo basso', g:'spalle', a:'Cavi', m:'Deltoide anteriore',
 st:'stand', eq:'cable', an:[45,210], fr:[[-5,-5],[90,90]], cap:['Braccio lungo il fianco','Braccio all’altezza della spalla, davanti'],
 set:'Cavo BASSO con barra o corda. Stai di schiena alla torre, il cavo passa tra le gambe.',
 pos:'Piedi alla larghezza del bacino, core contratto, gomiti leggermente piegati.',
 ese:['Parti con le mani davanti alle cosce.','Solleva la barra in avanti fino all’altezza delle spalle.','Scendi lentamente controllando il cavo.'],
 cue:'Solleva con la spalla, mantenendo il petto alto e il busto fermo.',
 why:'La spalla anteriore è già molto attiva nelle spinte; questo esercizio la rinforza e ne equilibra il lavoro, utile se vuoi migliorare la forza nelle distensioni sopra la testa.',
 err:['Dondolare indietro','Andare oltre la spalla','Gomiti troppo piegati']});

E({id:'s-facepull', n:'Face pull ai cavi', g:'spalle', a:'Cavi', m:'Deltoide posteriore, cuffia dei rotatori, trapezio medio',
 st:'stand', eq:'cable', an:[250,38], fr:[[88,90,{t:176}],[-80,150,{t:184}]], cap:['Braccia distese davanti, corda all’altezza del viso','Mani ai lati del viso, gomiti alti e larghi'],
 set:'Cavo ALTO (all’altezza del viso o poco sopra), corda. Afferrala con le mani palmo-a-palmo (pollici verso di te). Fai 2 passi indietro.',
 pos:'Piedi alla larghezza delle spalle, leggermente indietro con il peso, petto alto, scapole ben appoggiate.',
 ese:['Parti con le braccia distese davanti a te.','Tira la corda verso il viso aprendo le mani ai lati delle orecchie e portando i gomiti alti e dietro.','Alla fine le mani sono ai lati del viso, pollici verso di te, gomiti all’altezza delle spalle.','Ritorna lentamente.'],
 cue:'Porta i gomiti indietro e in alto ("a W") e ruota esternamente le spalle: non tirare con i bicipiti.',
 why:'Fondamentale per la salute della spalla: bilancia tutte le spinte (panca, military) rinforzando la cuffia e il deltoide posteriore. Senza di lui la forza nelle spinte si blocca o si finisce infortunati.',
 err:['Peso troppo alto e tirare indietro con la schiena','Gomiti bassi','Tirare con le braccia invece che con le scapole']});

E({id:'s-posteriori', n:'Alzate posteriori ai cavi incrociati', g:'spalle', a:'Cavi', m:'Deltoide posteriore, romboidi',
 st:'stand', v:'f', cross:true, an:[[25,30],[275,30]], eq:'cable', fr:[[30,-30],[95,95]], cap:['Braccia in avanti, cavi incrociati','Braccia aperte ai lati'],
 set:'Due cavi ALTI (o medi), maniglie incrociate: la mano destra prende il cavo sinistro e viceversa. Busto leggermente inclinato in avanti.',
 pos:'Piedi alla larghezza delle spalle, petto alto, gomiti leggermente piegati.',
 ese:['Parti con le braccia davanti al petto, cavi incrociati.','Apri le braccia lateralmente come una croce, portando i gomiti dietro.','Stringi le scapole un secondo e ritorna lentamente.'],
 cue:'Apri i gomiti verso l’esterno e porta le braccia "indietro", senza sollevare le spalle.',
 why:'Lavora il deltoide posteriore e i romboidi: migliora la postura e la stabilità della spalla, riducendo il rischio di infortuni nelle spinte pesanti.',
 err:['Usare il trapezio (spalle alte)','Oscillare con il busto','Peso troppo alto']});

E({id:'s-jammer-press', n:'Shoulder press con Jammer Arms (un braccio)', g:'spalle', a:'Jammer', m:'Deltoidi, tricipiti, core',
 st:'stand', eq:'jam', one:true, an:[60,170], fr:[[15,175],[178,180]], cap:['Impugnatura alla spalla','Braccio disteso in alto'],
 set:'Jammer arm alla massima altezza utile per la tua altezza, dischi sull’estremità. Stai davanti al rack, un piede avanti.',
 pos:'Core contratto, bacino neutro, gomito appena davanti alla linea della spalla.',
 ese:['Parti con l’impugnatura all’altezza della spalla.','Spingi verticalmente distendendo il braccio, leggermente in avanti perché segue l’arco.','Scendi lentamente.'],
 cue:'Il bacino non ruota: stringi i glutei e spingi il soffitto con il gomito.',
 why:'Il lavoro monolaterale sviluppa forza e stabilità del core (anti-rotazione) e pareggia eventuali squilibri tra le due spalle.',
 err:['Inarcare la schiena','Ruotare il busto','Spingere con le gambe']});

E({id:'s-upright', n:'Upright row al cavo basso', g:'spalle', a:'Cavi', m:'Deltoidi laterali, trapezio',
 st:'stand', v:'f', bar:true, an:[[150,215]], eq:'cable', fr:[[15,-10],[70,-70]], cap:['Barra davanti alle cosce, braccia distese','Barra sotto il mento, gomiti alti'],
 set:'Cavo BASSO con barra dritta o corda. Presa larga poco più delle spalle.',
 pos:'Busto eretto, petto alto, peso sui talloni.',
 ese:['Parti con la barra davanti alle cosce.','Solleva la barra verticalmente facendo guidare i gomiti verso l’alto.','Fermati quando i gomiti sono all’altezza delle spalle (barra a metà petto).','Scendi lentamente.'],
 cue:'Gomiti alti e larghi, la barra scorre vicina al corpo.',
 why:'Sviluppa deltoidi laterali e trapezio superiore insieme; utile per la "larghezza" delle spalle. Mantieni la presa larga e la salita moderata per non stressare l’articolazione.',
 err:['Tirare troppo in alto (sopra le spalle)','Presa troppo stretta','Dondolare con il busto']});

E({id:'s-rot-est', n:'Rotazione esterna al cavo (cuffia)', g:'spalle', a:'Cavi', m:'Cuffia dei rotatori (sottospinato, piccolo rotondo)',
 st:'stand', v:'f', one:true, an:[[25,105]], eq:'cable', fr:[[5,-90],[5,75]], cap:['Gomito al fianco, avambraccio verso l’addome','Avambraccio ruotato verso l’esterno'],
 set:'Cavo MEDIO (all’altezza dell’ombelico), maniglia. Stai di lato alla torre, la mano lontana dal cavo lavora.',
 pos:'Gomito piegato a 90° e appoggiato al fianco (puoi mettere un asciugamano sotto). Polso neutro.',
 ese:['Parti con l’avambraccio davanti all’addome.','Ruota l’avambraccio verso l’esterno, il gomito resta fermo.','Ritorna lentamente.'],
 cue:'Il gomito non si stacca dal fianco: si muove solo l’avambraccio.',
 why:'Rinforza la cuffia dei rotatori, che stabilizza la spalla durante panca e military. Molto importante per spingere più pesante senza dolori.',
 err:['Staccare il gomito dal fianco','Peso troppo alto','Ruotare il busto']});

/* ============================== SCHIENA ============================== */
E({id:'b-rackpull', n:'Rack pull (stacco dai pin)', g:'schiena', a:'Bilanciere', m:'Dorsali, trapezio, erettori spinali, glutei, femorali',
 st:'hinge', eq:'bar', fr:[[0,0,{t:140,h:[132,120],th:18,sh:-8}],[0,0,{t:178,h:[148,118],th:0,sh:0}]], cap:['Bilanciere sui pin all’altezza delle ginocchia','Posizione eretta, bilanciere in vita'],
 set:'Regola i pin del rack così che la barra parta appena sotto le ginocchia. Presa alla larghezza delle spalle (prona o mista).',
 pos:'Piedi alla larghezza del bacino sotto la barra, schiena neutra, petto alto, dorsali "bloccati" (come se spremessi un’arancia sotto le ascelle).',
 ese:['Prendi la barra, tendi il corpo e spingi i piedi nel pavimento.','Alza la barra sfilando i glutei e il petto insieme, la barra scorre vicina alle cosce.','Blocca in alto con glutei contratti, senza iperestendere.','Riporta la barra sui pin controllando.'],
 cue:'"Spingi il pavimento" con le gambe, poi estendi le anche: la schiena resta rigida.',
 why:'Permette di caricare molto più di un rematore e di sviluppare forza nei dorsali, nel trapezio e negli erettori nella parte alta dello stacco: costruisce la base della forza della schiena.',
 err:['Schiena arrotondata','Barra lontana dal corpo','Iperestensione in alto','Usare i lombari al posto di glutei e gambe']});

E({id:'b-row-bar', n:'Rematore con bilanciere', g:'schiena', a:'Bilanciere', m:'Dorsali, romboidi, trapezio, bicipiti',
 st:'hinge', eq:'bar', fr:[[0,0,{t:108,th:14,sh:-6}],[-70,10,{t:108,th:14,sh:-6}]], cap:['Bilanciere appeso a braccia distese','Bilanciere al basso addome/ombelico'],
 set:'Bilanciere da terra o dai pin bassi. Presa prona poco più larga delle spalle (o supina per maggiore bicipite).',
 pos:'Busto inclinato a ~60-70° rispetto alla verticale, ginocchia leggermente flesse, schiena neutra, sguardo a terra poco davanti.',
 ese:['Parti con la barra appesa a braccia distese.','Tira la barra verso l’addome portando i gomiti indietro e vicino al corpo.','Contrai le scapole per 1 secondo.','Scendi in modo controllato.'],
 cue:'Avvicina i gomiti alla schiena (non tirare con le mani). La barra sfiora le cosce.',
 why:'Il rematore pesante è il principale costruttore di spessore della schiena e di forza di trazione, equilibrando la panca.',
 err:['Busto che si alza ad ogni ripetizione','Tirare con i bicipiti','Schiena arrotondata','Slancio eccessivo']});

E({id:'b-lat-larga', n:'Lat machine ai cavi, presa larga', g:'schiena', a:'Cavi', m:'Gran dorsale, romboidi, bicipiti',
 st:'seat', v:'f', seatF:true, bar:true, an:[[150,14]], eq:'cable', fr:[[150,160],[35,172]], cap:['Braccia distese sopra la testa','Barra all’altezza delle clavicole, gomiti in basso'],
 set:'Cavo ALTO con barra lat. Presa pronata, circa 1,5 volte la larghezza delle spalle. Siediti bloccando le cosce (sotto il bilanciere o in una panca con imbottitura).',
 pos:'Petto alto, leggera inclinazione indietro (~10°), scapole basse.',
 ese:['Parti con le braccia distese e le scapole leggermente alzate (stretching del dorsale).','Abbassa prima le scapole, poi tira la barra verso le clavicole.','Porta i gomiti verso i fianchi e verso il basso.','Risali lentamente fino alla posizione iniziale.'],
 cue:'Porta i gomiti verso le tasche dei pantaloni (non tirare con le mani).',
 why:'Sviluppa l’ampiezza del dorso e la forza di trazione verticale, che poi ti serve per le trazioni.',
 err:['Dondolare indietro con il busto','Tirare la barra dietro la nuca','Spalle che salgono verso le orecchie']});

E({id:'b-lat-neutra', n:'Lat machine, presa neutra stretta', g:'schiena', a:'Cavi', m:'Gran dorsale (parte bassa), romboidi, bicipiti',
 st:'seat', eq:'cable', an:[145,14], fr:[[170,175,{t:184}],[15,155,{t:196}]], cap:['Braccia distese, triangolo sopra la testa','Triangolo al petto, gomiti lungo i fianchi'],
 set:'Cavo ALTO con maniglia triangolo (o V). Presa neutra (palmi che si guardano). Cosce bloccate.',
 pos:'Busto leggermente inclinato indietro, petto alto, scapole basse.',
 ese:['Parti a braccia distese.','Tira il triangolo verso lo sterno, portando i gomiti in basso e indietro.','Contrai 1 secondo.','Risali lentamente.'],
 cue:'Gomiti verso le tasche, petto verso la maniglia: il movimento è un "tirare i gomiti in giù".',
 why:'La presa neutra stretta carica la parte bassa del gran dorsale e riduce lo stress sulla spalla: ottima per forza e volume.',
 err:['Busto che oscilla','Tirare con le braccia','Non completare il range']});

E({id:'b-row-cavo', n:'Rematore al cavo basso seduto', g:'schiena', a:'Cavi', m:'Romboidi, trapezio medio, dorsali, bicipiti',
 st:'seat', eq:'cable', an:[258,205], fr:[[90,90,{t:168}],[-35,88,{t:186}]], cap:['Braccia distese, busto leggermente avanti','Maniglia all’addome, gomiti indietro'],
 set:'Cavo BASSO con maniglia a V (o barra stretta). Siediti sulla panca con i piedi appoggiati, ginocchia leggermente flesse.',
 pos:'Schiena neutra, busto eretto o leggermente inclinato indietro a fine corsa, petto alto.',
 ese:['Parti con le braccia distese e le scapole in avanti (stretching).','Porta i gomiti indietro vicino ai fianchi e avvicina le scapole.','La maniglia arriva all’addome.','Ritorna lentamente con le scapole che si aprono.'],
 cue:'Avvicina i gomiti alle costole e stringi le scapole — immagina di tenere una matita tra le scapole.',
 why:'Il rematore al cavo mantiene tensione costante sullo spessore della schiena (romboidi, trapezio medio) e migliora la postura.',
 err:['Dondolare con il busto avanti/indietro','Spalle sollevate','Schiena arrotondata']});

E({id:'b-lat-ginocchio', n:'Lat pulldown in ginocchio a un braccio', g:'schiena', a:'Cavi', m:'Gran dorsale, romboidi, core',
 st:'kneel', one:true, an:[210,12], eq:'cable', fr:[[172,176,{t:186}],[10,155,{t:176}]], cap:['Braccio disteso in alto','Gomito al fianco, maniglia al petto'],
 set:'Cavo ALTO con maniglia singola. Inginocchiati davanti alla torre (tappetino sotto le ginocchia), busto leggermente inclinato indietro.',
 pos:'Core contratto, bacino neutro, petto alto. La mano libera appoggiata al fianco o al rack.',
 ese:['Parti con il braccio disteso verso l’alto (stirando il dorsale).','Tira il gomito verso il fianco, leggermente davanti al corpo.','Contrai il dorsale 1 secondo.','Risali lentamente.'],
 cue:'Gomito in basso e verso la tasca, il busto resta fermo.',
 why:'Lavoro unilaterale che permette un range più ampio e una migliore connessione mente-muscolo con il dorsale; la posizione in ginocchio blocca le gambe e isola la schiena.',
 err:['Ruotare il busto','Usare lo slancio','Braccia che si piegano troppo presto']});

E({id:'b-row-singolo', n:'Rematore a un braccio al cavo basso', g:'schiena', a:'Cavi', m:'Dorsali, romboidi, trapezio',
 st:'hinge', one:true, an:[245,212], eq:'cable', fr:[[50,55],[-70,-5]], cap:['Braccio disteso verso il cavo','Gomito dietro il busto'],
 set:'Cavo BASSO con maniglia singola. Piedi a passo (piede opposto avanti), una mano appoggiata al rack o al ginocchio.',
 pos:'Busto inclinato a ~45-60°, schiena neutra, spalla non ruotata.',
 ese:['Parti con il braccio disteso verso il cavo.','Porta il gomito in alto e dietro, vicino al busto, come se volessi "tirare il gomito alla tasca posteriore".','Contrai 1 secondo.','Ritorna lento.'],
 cue:'Gomito indietro e in alto, spalla bassa, niente rotazione del busto.',
 why:'Il rematore unilaterale permette di caricare in modo sicuro e correggere gli squilibri tra le due metà della schiena.',
 err:['Ruotare il busto','Tirare con il bicipite','Schiena arrotondata']});

E({id:'b-pulldown-braccia-tese', n:'Pulldown a braccia tese ai cavi', g:'schiena', a:'Cavi', m:'Gran dorsale (isolamento), tricipite lungo',
 st:'stand', eq:'cable', an:[235,18], fr:[[135,135,{t:160}],[5,5,{t:166}]], cap:['Braccia tese in alto davanti a te','Barra alle cosce, braccia tese'],
 set:'Cavo ALTO con barra o corda. Stai a 50-60 cm dalla torre, busto leggermente inclinato in avanti.',
 pos:'Piedi alla larghezza del bacino, gomiti quasi tesi e fissi (leggera flessione), core contratto.',
 ese:['Parti con le braccia tese davanti al viso.','Abbassa la barra verso le cosce mantenendo le braccia quasi tese.','Stringi i dorsali alla fine 1 secondo.','Risali lentamente.'],
 cue:'Immagina di "spingere il cavo verso le cosce" con i dorsali: i gomiti non si piegano.',
 why:'Isola il gran dorsale senza l’intervento dei bicipiti: ottimo come pre-stanchezza o finale per sentire davvero il muscolo lavorare.',
 err:['Piegare i gomiti e trasformarlo in un’estensione di tricipiti','Busto che oscilla','Peso troppo alto']});

E({id:'b-row-jammer', n:'Rematore con Jammer Arms (T-bar)', g:'schiena', a:'Jammer', m:'Dorsali, romboidi, trapezio, bicipiti',
 st:'hinge', eq:'jam', an:[250,205], fr:[[20,20,{t:115}],[-55,-10,{t:115}]], cap:['Impugnature davanti alle ginocchia','Gomiti indietro, impugnature al petto basso'],
 set:'Jammer arms caricate con dischi, posizionate basse davanti a te. Usa la presa neutra o pronata. Piedi a larghezza delle anche.',
 pos:'Busto inclinato a ~45-60°, schiena neutra, ginocchia morbide.',
 ese:['Parti con le braccia distese.','Tira le impugnature verso il petto basso portando i gomiti indietro.','Contrai le scapole.','Scendi lentamente.'],
 cue:'Gomiti alle costole, scapole che si avvicinano; il busto resta fermo.',
 why:'Permette di rematare pesante con una traiettoria guidata e una presa neutra, più facile per i dorsali e meno stressante per i polsi e la schiena bassa.',
 err:['Inclinarsi troppo in piedi','Usare lo slancio delle gambe','Schiena arrotondata']});

E({id:'b-trazioni', n:'Trazioni alla sbarra', g:'schiena', a:'Corpo libero', m:'Gran dorsale, bicipiti, romboidi, core',
 st:'hang', eq:'hb', fr:[[180,180],[25,170,{h:[150,88]}]], cap:['Sospeso a braccia distese','Mento sopra la sbarra'],
 set:'Sbarra del powerrack. Presa prona poco più larga delle spalle (o neutra/supina se ti senti meglio).',
 pos:'Corpo teso, gambe leggermente piegate dietro, core contratto, scapole attive.',
 ese:['Parti sospeso con spalle "attive" (non completamente rilassate).','Tira i gomiti in basso e indietro portando il petto verso la sbarra.','Mento sopra la sbarra.','Scendi lentamente a braccia distese.'],
 cue:'Porta il petto verso la sbarra e i gomiti verso le tasche.',
 why:'L’esercizio di forza per eccellenza per la schiena e le braccia: usa il peso corporeo e si può caricare con una cintura per aumentare la forza.',
 err:['Dondolare (kipping)','Non scendere completamente','Spalle alle orecchie']});

E({id:'b-scrollate', n:'Scrollate con bilanciere', g:'schiena', a:'Bilanciere', m:'Trapezio superiore',
 st:'stand', eq:'bar', fr:[[0,0],[0,0,{tl:64}]], cap:['Spalle rilassate, bilanciere davanti alle cosce','Spalle alzate verso le orecchie'],
 set:'Bilanciere dal rack a altezza cosce (o dai pin). Presa pronata alla larghezza delle spalle.',
 pos:'Busto eretto, petto alto, braccia tese e rilassate, sguardo avanti.',
 ese:['Parti con le braccia distese.','Solleva le spalle verso le orecchie, senza piegare i gomiti.','Contrai 1-2 secondi in alto.','Scendi lentamente.'],
 cue:'Spalle dritte verso l’alto, non ruotare in avanti o indietro.',
 why:'Rinforza il trapezio superiore, che sostiene il carico in stacchi, rematori e in ogni movimento di "tenuta": aiuta a migliorare la forza complessiva della schiena.',
 err:['Ruotare le spalle','Piegare i gomiti','Usare slancio']});

/* ============================== BICIPITI ============================== */
E({id:'c-curl-bar', n:'Curl con bilanciere', g:'bicipiti', a:'Bilanciere', m:'Bicipiti, brachiale',
 st:'stand', eq:'bar', fr:[[5,5],[8,150]], cap:['Braccia distese davanti alle cosce','Bilanciere all’altezza delle spalle'],
 set:'Bilanciere (dritto o EZ). Presa supina alla larghezza delle spalle.',
 pos:'Piedi alla larghezza del bacino, petto alto, gomiti lungo i fianchi, leggermente davanti.',
 ese:['Parti con le braccia distese.','Fletti i gomiti portando la barra verso le spalle, senza far oscillare il busto.','Contrai 1 secondo in alto.','Scendi controllato in 2-3 secondi.'],
 cue:'Gomiti fermi ai fianchi: si muove solo l’avambraccio.',
 why:'Il curl con bilanciere permette di usare i carichi più alti per il bicipite: è la base del lavoro di forza sulla flessione del gomito.',
 err:['Dondolare con il busto','Gomiti che vanno in avanti','Non estendere completamente']});

E({id:'c-curl-cavo', n:'Curl al cavo basso con barra', g:'bicipiti', a:'Cavi', m:'Bicipiti',
 st:'stand', eq:'cable', an:[245,212], fr:[[3,3],[8,150]], cap:['Braccia distese davanti alle cosce','Barra alle spalle'],
 set:'Cavo BASSO con barra dritta o EZ. Stai a 40-50 cm dalla torre, piedi alla larghezza del bacino.',
 pos:'Gomiti lungo i fianchi, petto alto, core contratto.',
 ese:['Parti con le braccia distese davanti alle cosce.','Fletti i gomiti portando la barra alle spalle.','Contrai 1 secondo.','Scendi lentamente lasciando che il cavo tenga tensione.'],
 cue:'Stringi i gomiti ai fianchi e "porta la barra alle spalle".',
 why:'Il cavo garantisce una tensione costante sul bicipite, anche in basso e in alto, dove il bilanciere perde carico.',
 err:['Oscillare con il busto','Gomiti in avanti','Peso troppo alto']});

E({id:'c-curl-alti', n:'Curl ai cavi alti (double biceps)', g:'bicipiti', a:'Cavi', m:'Bicipiti (porzione lunga e breve)',
 st:'stand', v:'f', an:[[25,25],[275,25]], eq:'cable', fr:[[90,92],[90,205]], cap:['Braccia aperte a T, mani verso i cavi','Mani ai lati della testa (posa bicipiti)'],
 set:'Due cavi ALTI (all’altezza delle spalle o poco sopra). Maniglie singole. Stai al centro delle torri.',
 pos:'Braccia a T, gomiti all’altezza delle spalle e fermi, petto alto.',
 ese:['Parti con le braccia aperte e i palmi verso l’alto.','Fletti i gomiti portando le mani verso la testa (come in una posa di double biceps).','Contrai 1-2 secondi.','Torna lentamente.'],
 cue:'I gomiti restano alti e fermi; porta le mani vicino alle orecchie.',
 why:'Posizione di massimo accorciamento del bicipite: sviluppa il picco e la forza finale della flessione.',
 err:['Abbassare i gomiti','Tirare con le spalle','Peso troppo alto']});

E({id:'c-incl', n:'Curl su panca inclinata con manubri', g:'bicipiti', a:'Manubri', m:'Bicipiti (capo lungo)',
 st:'inc', eq:'db', fr:[[-5,-5],[-5,140]], cap:['Braccia distese, stirate all’indietro','Manubri alle spalle'],
 set:'Panca inclinata a 45-60°, schiena ben appoggiata. Manubri in mano, braccia lungo i fianchi.',
 pos:'Spalle appoggiate allo schienale, gomiti leggermente dietro il busto per allungare il bicipite.',
 ese:['Parti con le braccia distese e i palmi verso l’alto (supinazione).','Fletti i gomiti senza muoverli in avanti.','Contrai 1 secondo.','Scendi lentamente fino allo stiramento completo.'],
 cue:'Ruota il mignolo verso l’alto in alto ("supina") e mantieni i gomiti indietro.',
 why:'L’inclinazione mette il bicipite in massimo allungamento: stimola molto il capo lungo e migliora la forza in partenza.',
 err:['Gomiti in avanti','Schiena che si stacca','Dondolare']});

E({id:'c-concentrato', n:'Curl concentrato', g:'bicipiti', a:'Manubri', m:'Bicipiti (picco), brachiale',
 st:'seat', eq:'db', one:true, fr:[[10,10,{t:140}],[10,150,{t:140}]], cap:['Braccio disteso, gomito sulla coscia','Manubrio alla spalla'],
 set:'Seduto su panca, gambe larghe, manubrio in una mano. Appoggia il gomito all’interno della coscia.',
 pos:'Busto inclinato in avanti, schiena neutra, gomito fisso contro la coscia.',
 ese:['Parti con il braccio disteso.','Fletti il gomito portando il manubrio verso la spalla.','Contrai forte 1-2 secondi.','Scendi lentamente.'],
 cue:'Il gomito non si muove: immagina che sia incollato alla coscia.',
 why:'Massimo isolamento del bicipite: elimina ogni compenso e concentra lo stimolo sulla contrazione.',
 err:['Usare il busto','Gomito che si sposta','Peso troppo alto']});

E({id:'c-hammer', n:'Curl a martello con corda al cavo basso', g:'bicipiti', a:'Cavi', m:'Brachiale, brachioradiale, bicipiti',
 st:'stand', eq:'cable', an:[245,212], fr:[[3,3],[8,150]], cap:['Corda lungo le cosce, presa neutra','Mani alle spalle, polsi dritti'],
 set:'Cavo BASSO con corda. Presa neutra (pollici verso l’alto). Stai vicino alla torre.',
 pos:'Gomiti fermi ai fianchi, petto alto, polsi dritti.',
 ese:['Parti con le braccia distese.','Fletti i gomiti portando la corda verso le spalle.','A fine corsa apri leggermente le mani.','Scendi lentamente.'],
 cue:'Pollici verso l’alto per tutto il movimento, gomiti bloccati ai fianchi.',
 why:'Colpisce brachiale e brachioradiale: aumentano lo spessore del braccio e migliorano la forza di presa e di flessione del gomito.',
 err:['Dondolare','Polsi piegati','Gomiti avanti']});

E({id:'c-curl-singolo', n:'Curl al cavo basso a un braccio', g:'bicipiti', a:'Cavi', m:'Bicipiti',
 st:'stand', one:true, eq:'cable', an:[245,212], fr:[[3,3],[8,150]], cap:['Braccio disteso davanti alla coscia','Maniglia alla spalla'],
 set:'Cavo BASSO con maniglia singola. Stai di lato o frontale alla torre, una mano appoggiata.',
 pos:'Gomito lungo il fianco, busto fermo, palmo verso l’alto.',
 ese:['Parti con il braccio disteso.','Fletti il gomito portando la maniglia alla spalla ruotando il palmo in supinazione.','Contrai 1 secondo.','Scendi lentamente.'],
 cue:'Ruota il palmo verso il viso nella salita e stringi il bicipite in alto.',
 why:'Il lavoro unilaterale permette di concentrarti su ogni braccio e di correggere eventuali differenze di forza.',
 err:['Busto che oscilla','Gomito che si sposta','Polso piegato']});

/* ============================== AVAMBRACCI ============================== */
E({id:'w-wrist-curl', n:'Wrist curl al cavo basso', g:'avambracci', a:'Cavi', m:'Flessori dell’avambraccio',
 st:'seat', hand:true, eq:'cable', an:[250,205], fr:[[25,90,{t:150,hd:40}],[25,90,{t:150,hd:-45}]], cap:['Polsi flessi verso il basso (mano aperta)','Polsi flessi in alto (pugno chiuso)'],
 set:'Cavo BASSO con barra corta. Siediti davanti alla torre, avambracci appoggiati sulle cosce o su una panca, palmi verso l’alto.',
 pos:'Polsi oltre il bordo dell’appoggio, avambracci fermi, schiena leggermente inclinata.',
 ese:['Lascia scendere la barra aprendo le dita fino a un’ampia flessione del polso.','Chiudi le dita e fletti il polso portando la barra in alto.','Contrai 1 secondo.','Scendi lentamente.'],
 cue:'Solo il polso si muove; usa tutto il range fino alla punta delle dita.',
 why:'Gli avambracci sono spesso il punto debole nella presa su stacchi, rematori e trazioni: rinforzarli migliora la forza complessiva.',
 err:['Muovere l’avambraccio','Peso troppo alto','Range troppo corto']});

E({id:'w-wrist-ext', n:'Estensioni polso al cavo (presa prona)', g:'avambracci', a:'Cavi', m:'Estensori dell’avambraccio',
 st:'seat', hand:true, eq:'cable', an:[250,205], fr:[[25,90,{t:150,hd:35}],[25,90,{t:150,hd:-40}]], cap:['Polsi flessi verso il basso','Polsi estesi verso l’alto'],
 set:'Cavo BASSO con barra corta. Avambracci sulle cosce, palmi verso il basso.',
 pos:'Avambracci fermi, polsi oltre il bordo delle cosce.',
 ese:['Lascia scendere la barra flettendo il polso verso il basso.','Estendi il polso portando la barra in alto.','Contrai 1 secondo.','Scendi lentamente.'],
 cue:'Usa pesi leggeri e movimenti lenti: gli estensori sono piccoli.',
 why:'Bilancia la forza dei flessori e protegge i gomiti (epicondilite) che si infiammano spesso con i carichi pesanti.',
 err:['Peso troppo alto','Muovere l’avambraccio','Range limitato']});

E({id:'w-reverse-curl', n:'Reverse curl al cavo (presa prona)', g:'avambracci', a:'Cavi', m:'Brachioradiale, estensori, brachiale',
 st:'stand', eq:'cable', an:[245,212], fr:[[3,3],[8,150]], cap:['Barra lungo le cosce, presa prona','Barra alle spalle'],
 set:'Cavo BASSO con barra dritta o EZ. Presa prona (palmi verso il basso) alla larghezza delle spalle.',
 pos:'Gomiti fermi ai fianchi, polsi dritti, petto alto.',
 ese:['Parti con le braccia distese.','Fletti i gomiti portando la barra alle spalle senza far flettere i polsi.','Contrai 1 secondo.','Scendi lentamente.'],
 cue:'Polsi rigidi e gomiti fermi; il lavoro è sull’avambraccio.',
 why:'Sviluppa il brachioradiale e gli estensori: più spessore dell’avambraccio e più forza di presa.',
 err:['Polsi che si piegano','Dondolare','Peso troppo alto']});

/* ============================== TRICIPITI ============================== */
E({id:'t-push-corda', n:'Pushdown con corda al cavo alto', g:'tricipiti', a:'Cavi', m:'Tricipiti (tutti i capi)',
 st:'stand', eq:'cable', an:[195,18], fr:[[5,110,{t:174}],[5,15,{t:174}]], cap:['Gomiti a 90° lungo i fianchi','Braccia distese, corda aperta in basso'],
 set:'Cavo ALTO con corda. Stai a 30-40 cm dalla torre, leggermente inclinato in avanti.',
 pos:'Gomiti lungo i fianchi, bloccati, petto alto, spalle basse.',
 ese:['Parti con i gomiti a 90°.','Estendi i gomiti spingendo la corda in basso.','A fine corsa apri la corda ai lati delle cosce e contrai il tricipite 1 secondo.','Risali lentamente, senza portare i gomiti indietro.'],
 cue:'Fai scendere le mani senza muovere i gomiti e apri la corda in fondo.',
 why:'Esercizio base per il volume e la forza di lockout: i tricipiti sono i muscoli limitanti in panca e military.',
 err:['Gomiti che si sollevano','Inclinarsi troppo sul cavo','Usare lo slancio']});

E({id:'t-push-barra', n:'Pushdown con barra V al cavo alto', g:'tricipiti', a:'Cavi', m:'Tricipiti (capo laterale e mediale)',
 st:'stand', eq:'cable', an:[195,18], fr:[[5,110,{t:174}],[5,15,{t:174}]], cap:['Gomiti a 90° lungo i fianchi','Braccia distese, barra alle cosce'],
 set:'Cavo ALTO con barra V (o dritta). Presa prona alla larghezza delle spalle.',
 pos:'Gomiti lungo i fianchi, bloccati, petto alto.',
 ese:['Parti con i gomiti a 90°.','Spingi la barra in basso fino a braccia tese.','Contrai il tricipite 1 secondo.','Risali lentamente.'],
 cue:'Gomiti incollati ai fianchi, spingi verso il basso tenendo il polso rigido.',
 why:'Permette di usare carichi più alti rispetto alla corda: costruisce forza di spinta utile per panca e military.',
 err:['Gomiti in avanti','Polsi flessi','Busto che oscilla']});

E({id:'t-push-inverso', n:'Pushdown a un braccio, presa inversa', g:'tricipiti', a:'Cavi', m:'Tricipiti (capo mediale)',
 st:'stand', one:true, eq:'cable', an:[195,18], fr:[[5,110,{t:174}],[5,15,{t:174}]], cap:['Gomito a 90° al fianco','Braccio disteso'],
 set:'Cavo ALTO con maniglia singola. Presa supina (palmo verso l’alto).',
 pos:'Gomito incollato al fianco, busto leggermente inclinato in avanti.',
 ese:['Parti con il gomito a 90°.','Estendi il gomito spingendo la maniglia in basso.','Contrai il tricipite 1 secondo.','Risali lentamente.'],
 cue:'Gomito fermo, palmo verso l’alto, spingi in linea retta.',
 why:'La presa inversa porta più lavoro sul capo mediale, il "fondo" del tricipite, che supporta il lockout nelle spinte pesanti.',
 err:['Gomito che si sposta','Polso piegato','Slancio del busto']});

E({id:'t-overhead-corda', n:'Estensioni sopra la testa con corda al cavo', g:'tricipiti', a:'Cavi', m:'Tricipiti (capo lungo)',
 st:'stand', eq:'cable', an:[45,175], fr:[[172,-40,{t:168}],[172,165,{t:168}]], cap:['Gomiti in alto, corda dietro la testa','Braccia distese sopra la testa'],
 set:'Cavo BASSO o MEDIO con corda. Stai di schiena alla torre, un passo avanti, corda che passa sopra la testa.',
 pos:'Busto leggermente inclinato in avanti, gomiti alti e stretti, vicino alla testa.',
 ese:['Parti con i gomiti piegati e le mani dietro la testa.','Estendi i gomiti portando la corda in alto davanti a te.','Contrai 1 secondo.','Ritorna lentamente senza far aprire i gomiti.'],
 cue:'I gomiti restano puntati verso il soffitto e vicini alla testa.',
 why:'Il capo lungo del tricipite è il più grosso e lavora solo con il braccio sopra la testa: senza questo esercizio perdi massa e forza di lockout.',
 err:['Gomiti che si aprono','Inarcare la schiena','Peso troppo alto']});

E({id:'t-french-cavo', n:'French press ai cavi su panca', g:'tricipiti', a:'Cavi', m:'Tricipiti (capo lungo e mediale)',
 st:'lie', eq:'cable', an:[40,200], fr:[[178,178],[178,-115]], cap:['Braccia distese sopra il petto','Avambracci verso la testa, gomiti fermi'],
 set:'Panca piana con la testa rivolta verso la torre, cavo BASSO con corda o barra EZ.',
 pos:'Schiena appoggiata, piedi a terra, gomiti fissi e leggermente inclinati verso la testa.',
 ese:['Parti con le braccia distese sopra il petto.','Piega i gomiti portando le mani verso la testa, i gomiti restano fermi.','Estendi i gomiti tornando alla posizione iniziale.'],
 cue:'Solo gli avambracci si muovono, i gomiti restano puntati al soffitto.',
 why:'Il cavo dietro la testa dà tensione costante sul capo lungo, anche in fondo al movimento.',
 err:['Gomiti che si aprono','Peso troppo alto','Usare le spalle']});

E({id:'t-kickback', n:'Kickback al cavo', g:'tricipiti', a:'Cavi', m:'Tricipiti (contrazione massima)',
 st:'hinge', one:true, eq:'cable', an:[245,212], fr:[[-88,0,{t:100}],[-88,-88,{t:100}]], cap:['Gomito alto, avambraccio verticale','Braccio disteso indietro'],
 set:'Cavo BASSO con maniglia singola. Stai di fianco alla torre, una mano appoggiata a un appoggio, busto parallelo al pavimento.',
 pos:'Gomito alto, all’altezza del busto, braccio parallelo al busto.',
 ese:['Parti con il gomito a 90°.','Estendi il braccio indietro fino a distenderlo completamente.','Contrai 1-2 secondi.','Ritorna lentamente.'],
 cue:'Il braccio resta fermo e parallelo al busto, muovi solo l’avambraccio.',
 why:'Massima contrazione del tricipite in accorciamento: il cavo mantiene carico anche in fondo, dove i manubri non lavorano.',
 err:['Gomito che scende','Slancio del busto','Peso troppo alto']});

E({id:'t-panca-stretta', n:'Panca presa stretta con bilanciere', g:'tricipiti', a:'Bilanciere', m:'Tricipiti, petto interno, deltoidi anteriori',
 st:'lie', eq:'bar', fr:[[180,180],[65,180]], cap:['Bilanciere sopra il petto, braccia distese','Bilanciere al petto, gomiti stretti'],
 set:'Panca piana con rack e safety. Presa alla larghezza delle spalle (non più stretta, per non stressare i polsi).',
 pos:'Scapole addotte, petto alto, gomiti vicini al busto (~30°).',
 ese:['Stacca il bilanciere e portalo sopra il petto.','Scendi controllato facendo sfiorare la parte bassa del petto, gomiti vicini al busto.','Spingi verso l’alto estendendo completamente i gomiti.'],
 cue:'Gomiti vicini al busto, spingi la barra indietro verso le spalle.',
 why:'Costruisce la forza di lockout: è la variante di panca più "tricipite", con carichi elevati.',
 err:['Presa troppo stretta','Gomiti larghi','Sedere che si alza']});

E({id:'t-over-db', n:'Estensioni sopra la testa con manubrio', g:'tricipiti', a:'Manubri', m:'Tricipiti (capo lungo)',
 st:'seat', eq:'db', fr:[[172,-40],[178,170]], cap:['Manubrio dietro la testa, gomiti in alto','Braccia distese sopra la testa'],
 set:'Panca regolata quasi verticale o seduto con schiena appoggiata. Un manubrio tenuto con due mani.',
 pos:'Schiena appoggiata, gomiti alti e vicini alla testa, core contratto.',
 ese:['Parti con il manubrio dietro la testa e i gomiti alti.','Estendi i gomiti portando il manubrio sopra la testa.','Scendi lentamente controllando.'],
 cue:'Gomiti fermi, punta il soffitto con i gomiti.',
 why:'Lavora il capo lungo del tricipite con un carico libero e ampio stiramento.',
 err:['Gomiti larghi','Schiena inarcata','Peso eccessivo']});

/* ============================== GAMBE ============================== */
E({id:'g-squat', n:'Squat con bilanciere (rack)', g:'gambe', a:'Bilanciere', m:'Quadricipiti, glutei, core, adduttori',
 st:'stand', eq:'bar', fr:[[-70,118,{t:176}],[-70,118,{t:140,h:[112,163],th:80,sh:-15}]], cap:['In piedi con il bilanciere sul trapezio','Cosce parallele (o sotto), busto inclinato'],
 set:'Rack con safety a altezza appena sotto il fondo dello squat. Barra sul trapezio (high bar) o sui deltoidi posteriori (low bar).',
 pos:'Piedi alla larghezza delle spalle o poco più, punte leggermente aperte. Gomiti bassi, petto alto, core contratto.',
 ese:['Stacca il bilanciere e fai 2 passi indietro.','Inspira, contrai il core e scendi spingendo le ginocchia in fuori e i fianchi indietro.','Scendi fino a cosce parallele o leggermente sotto.','Spingi i piedi nel pavimento e risali con busto fermo.'],
 cue:'"Spingi il pavimento via da te", ginocchia in linea con le punte dei piedi.',
 why:'Il principale costruttore di forza delle gambe e del tronco, con ricaduta su stacchi, saltelli e tutto l’allenamento.',
 err:['Ginocchia che cadono verso l’interno','Talloni che si alzano','Schiena che si arrotonda in basso','Scendere troppo poco']});

E({id:'g-front-squat', n:'Squat frontale con bilanciere', g:'gambe', a:'Bilanciere', m:'Quadricipiti, glutei, core, schiena alta',
 st:'stand', eq:'bar', fr:[[85,-102,{t:176}],[85,-102,{t:158,h:[118,163],th:80,sh:-15}]], cap:['Barra sulle clavicole, gomiti alti','Cosce parallele, busto verticale'],
 set:'Rack con safety. Barra sulle clavicole e sui deltoidi anteriori, presa a clean (dita sotto la barra) o a braccia incrociate.',
 pos:'Gomiti alti e davanti, petto alto, core contratto, sguardo avanti.',
 ese:['Stacca la barra e fai 2 passi indietro.','Scendi verticalmente portando le ginocchia in fuori.','Raggiungi cosce parallele o più sotto.','Risali spingendo i piedi nel pavimento con gomiti alti.'],
 cue:'Gomiti alti sempre: se cadono, la barra rotola via.',
 why:'Lavora di più i quadricipiti e richiede più core e schiena alta rispetto al back squat: ottimo complemento per la forza.',
 err:['Gomiti bassi','Busto che cede in avanti','Talloni che si alzano']});

E({id:'g-leg-ext', n:'Leg extension su panca', g:'gambe', a:'Panca', m:'Quadricipiti',
 st:'seat', eq:'pad', fr:[[30,10,{t:185,sh:0}],[30,10,{t:185,sh:85}]], cap:['Ginocchia a 90°, cuscino sulle caviglie','Gambe distese in avanti'],
 set:'Panca regolata a 80-90°, attacco leg extension regolato in modo che il perno sia allineato con le ginocchia e il rullo sia sopra le caviglie.',
 pos:'Schiena appoggiata, mani che tengono i lati della panca, ginocchia allineate.',
 ese:['Parti con le ginocchia flesse a 90°.','Estendi le ginocchia fino a distendere completamente le gambe.','Contrai il quadricipite 1 secondo.','Scendi lentamente in 2-3 secondi.'],
 cue:'Punte dei piedi verso di te, estendi fino a "spremere" il quadricipite in alto.',
 why:'Isola il quadricipite (in particolare il retto femorale) con poco stress sulla schiena: ottimo come complemento allo squat.',
 err:['Slancio','Bacino che si solleva','Non scendere con controllo']});

E({id:'g-leg-curl', n:'Leg curl al cavo in piedi (cavigliera)', g:'gambe', a:'Cavi', m:'Femorali',
 st:'stand', sup:true, cp:'ankle', eq:'cable', an:[245,212], fr:[[80,90,{t:170,sh:0}],[80,90,{t:170,sh:-105}]], cap:['Gamba distesa, cavigliera attaccata','Tallone verso il gluteo'],
 set:'Cavo BASSO con cavigliera. Stai davanti alla torre tenendoti al rack con una mano.',
 pos:'Busto leggermente inclinato in avanti, gamba d’appoggio morbida, bacino neutro.',
 ese:['Parti con la gamba distesa dietro.','Fletti il ginocchio portando il tallone verso il gluteo.','Contrai 1 secondo.','Scendi lentamente controllando.'],
 cue:'Il bacino non si muove: tira il tallone al gluteo.',
 why:'Rinforza i femorali (equilibrio con i quadricipiti) e protegge le ginocchia.',
 err:['Inarcare la schiena','Slancio','Peso troppo alto']});

E({id:'g-bulgaro', n:'Affondi bulgari con bilanciere/manubri', g:'gambe', a:'Manubri', m:'Quadricipiti, glutei, adduttori',
 st:'stand', eq:'db', rl:[68,182], bench:'bulg', fr:[[0,0,{t:178,h:[140,120],th:15,sh:-5}],[0,0,{t:170,h:[140,160],th:80,sh:-15}]], cap:['In piedi, piede posteriore sulla panca','Ginocchio anteriore a 90°'],
 set:'Panca piana dietro di te, piede posteriore appoggiato (dorso o punta). Manubri ai lati o bilanciere sul trapezio.',
 pos:'Piede anteriore a ~60-70 cm dalla panca, busto leggermente inclinato in avanti.',
 ese:['Scendi verticalmente piegando il ginocchio anteriore.','Il ginocchio posteriore quasi tocca terra.','Spingi sul piede anteriore e risali.'],
 cue:'Il peso è sul piede anteriore, scendi in verticale.',
 why:'Lavoro unilaterale che costruisce forza e stabilità e riduce gli squilibri tra le due gambe.',
 err:['Piede troppo vicino','Ginocchio che cade verso l’interno','Busto troppo inclinato']});

E({id:'g-rdl', n:'Stacco rumeno con bilanciere', g:'gambe', a:'Bilanciere', m:'Femorali, glutei, erettori spinali',
 st:'stand', eq:'bar', fr:[[0,0,{t:178}],[0,0,{t:135,h:[115,120],th:25,sh:-5}]], cap:['In piedi, barra davanti alle cosce','Busto inclinato, barra sotto le ginocchia'],
 set:'Bilanciere dal rack a altezza anche. Presa pronata alla larghezza delle spalle.',
 pos:'Piedi alla larghezza del bacino, ginocchia leggermente flesse e fisse, schiena neutra.',
 ese:['Spingi i fianchi indietro facendo scendere la barra lungo le cosce.','Scendi fino a sentire lo stiramento dei femorali (barra a metà tibia).','Spingi i fianchi in avanti e torna in piedi.'],
 cue:'Fianchi indietro come se dovessi chiudere una porta con il sedere.',
 why:'Costruisce femorali e glutei, protegge la schiena e migliora il trasferimento di forza in squat e stacchi.',
 err:['Schiena arrotondata','Barra lontana dalle gambe','Ginocchia che si piegano troppo']});

E({id:'g-hip-thrust', n:'Hip thrust con bilanciere', g:'gambe', a:'Bilanciere', m:'Glutei, femorali',
 st:'lie', eq:'barh', benchSt:'ht', fr:[[0,0,{h:[180,200],t:236,th:122,sh:5}],[0,0,{h:[183,170],t:272,th:98,sh:3}]], cap:['Bacino a terra, schiena sulla panca','Bacino in alto, corpo in linea'],
 set:'Panca piana, schiena (bordo inferiore delle scapole) appoggiata alla panca. Bilanciere sul bacino con un cuscino.',
 pos:'Piedi a terra alla larghezza del bacino, ginocchia a 90° a fine movimento, mento verso il petto.',
 ese:['Parti con il bacino basso.','Spingi i talloni e solleva il bacino fino ad allineare ginocchia, bacino e spalle.','Contrai i glutei 1-2 secondi.','Scendi lentamente.'],
 cue:'Sguardo avanti, costole giù, spingi con i talloni e contrai i glutei.',
 why:'Il miglior esercizio per la forza dei glutei, che sostiene squat e stacco.',
 err:['Inarcare la schiena','Piedi troppo vicini o lontani','Spingere sulle punte']});

E({id:'g-pullthrough', n:'Pull-through al cavo', g:'gambe', a:'Cavi', m:'Glutei, femorali',
 st:'stand', eq:'cable', an:[45,212], fr:[[-45,-50,{t:130,h:[120,120],th:18,sh:-8}],[3,3,{t:178,h:[148,118],th:0,sh:0}]], cap:['Fianchi indietro, corda tra le gambe','Busto eretto, glutei contratti'],
 set:'Cavo BASSO con corda. Stai di schiena alla torre, corda che passa tra le gambe.',
 pos:'Piedi a larghezza delle spalle, ginocchia leggermente flesse, schiena neutra.',
 ese:['Spingi i fianchi indietro lasciando che la corda scivoli tra le gambe.','Spingi i fianchi in avanti fino a essere dritto.','Contrai i glutei 1 secondo.'],
 cue:'Il movimento viene dai fianchi, come uno stacco rumeno con la corda.',
 why:'Insegna la cerniera dell’anca con tensione costante sui glutei e i femorali.',
 err:['Piegare troppo le ginocchia','Schiena arrotondata','Usare le braccia']});

E({id:'g-calf', n:'Calf raise in piedi', g:'gambe', a:'Bilanciere', m:'Polpacci (gastrocnemio, soleo)',
 st:'stand', eq:'bar', fr:[[-70,118,{}],[-70,118,{lift:11,ft:-45}]], cap:['Piedi appoggiati a terra','Sulle punte'],
 set:'Bilanciere sul trapezio come nello squat (o manubri). Puoi usare un gradino sotto le punte.',
 pos:'Piedi alla larghezza del bacino, gambe quasi tese.',
 ese:['Parti con i talloni a terra o sotto il gradino.','Sali sulle punte il più in alto possibile.','Contrai 1 secondo.','Scendi lentamente.'],
 cue:'Spingi con l’alluce e sali più in alto che puoi.',
 why:'Rinforza i polpacci, stabilizzatori di caviglia e ginocchio in squat e salti.',
 err:['Rimbalzi','Range corto','Ginocchia piegate']});

E({id:'g-kickback', n:'Kickback glutei al cavo', g:'gambe', a:'Cavi', m:'Glutei, femorali',
 st:'stand', sup:true, cp:'ankle', eq:'cable', an:[245,212], fr:[[80,90,{t:168,th:0,sh:0}],[80,90,{t:168,th:-35,sh:-35}]], cap:['Gamba sotto il bacino','Gamba portata indietro'],
 set:'Cavo BASSO con cavigliera. Stai davanti alla torre tenendoti al rack, gamba di lavoro con cavigliera.',
 pos:'Busto leggermente inclinato in avanti, core contratto, bacino neutro.',
 ese:['Parti con la gamba di lavoro sotto il corpo.','Porta la gamba indietro mantenendo il ginocchio quasi teso.','Contrai i glutei 1 secondo.','Ritorna lentamente.'],
 cue:'Il bacino non ruota, muovi solo la gamba.',
 why:'Isola i glutei con tensione costante: migliora la forza dei glutei e la stabilità del bacino.',
 err:['Inarcare la schiena','Slancio','Ruotare il bacino']});

/* ============================== ADDOMINALI ============================== */
E({id:'a-crunch-cavo', n:'Crunch al cavo in ginocchio', g:'addome', a:'Cavi', m:'Retto dell’addome',
 st:'kneel', eq:'cable', an:[205,14], fr:[[90,-125,{t:180}],[90,-125,{t:135}]], cap:['In ginocchio, corda alla testa','Busto flesso, gomiti verso le ginocchia'],
 set:'Cavo ALTO con corda. Inginocchiati (tappetino) davanti alla torre, corda tenuta ai lati della testa.',
 pos:'Bacino fermo, schiena neutra, gomiti vicini.',
 ese:['Parti con la schiena dritta.','Fletti il busto portando i gomiti verso le ginocchia (arrotondando la colonna).','Contrai gli addominali 1 secondo.','Ritorna lentamente.'],
 cue:'Avvicina le costole al bacino, non tirare con le braccia.',
 why:'Permette di caricare progressivamente l’addome, cosa fondamentale per la stabilità del core nelle alzate pesanti.',
 err:['Muovere i fianchi','Tirare con le braccia','Peso troppo alto']});

E({id:'a-pallof', n:'Pallof press', g:'addome', a:'Cavi', m:'Core (anti-rotazione), obliqui',
 st:'stand', eq:'cable', an:[250,75], fr:[[45,-30,{t:180}],[88,90,{t:180}]], cap:['Mani al petto, cavo laterale','Braccia distese, resistendo alla rotazione'],
 set:'Cavo MEDIO (all’altezza del petto) con maniglia. Stai di lato alla torre.',
 pos:'Piedi alla larghezza delle spalle, ginocchia morbide, bacino neutro.',
 ese:['Parti con le mani al petto.','Spingi le mani in avanti distendendo le braccia resistendo alla rotazione.','Mantieni 2 secondi e ritorna al petto.'],
 cue:'Non farti ruotare dal cavo: busto e bacino fermi.',
 why:'Il core lavora per impedire il movimento: migliora la stabilità del tronco in squat, stacco e panca.',
 err:['Ruotare il busto','Piegarsi lateralmente','Peso troppo alto']});

E({id:'a-woodchop', n:'Woodchop al cavo (alto-basso)', g:'addome', a:'Cavi', m:'Obliqui, core',
 st:'stand', eq:'cable', an:[250,18], fr:[[140,140,{t:180}],[10,-10,{t:160}]], cap:['Mani in alto, sopra la spalla','Mani in basso, di fianco al ginocchio'],
 set:'Cavo ALTO con maniglia. Stai di lato alla torre, piedi larghi.',
 pos:'Ginocchia morbide, braccia quasi tese, sguardo avanti.',
 ese:['Parti con le mani in alto, sopra la spalla vicina al cavo.','Tira la maniglia in diagonale verso il ginocchio opposto ruotando il busto.','Ritorna lentamente.'],
 cue:'La rotazione parte dal busto e dai fianchi, le braccia restano tese.',
 why:'Rinforza gli obliqui e la trasmissione di forza tra gambe e busto.',
 err:['Usare solo le braccia','Ginocchia rigide','Peso eccessivo']});

E({id:'a-leg-raise', n:'Leg raise su panca', g:'addome', a:'Corpo libero', m:'Retto dell’addome (parte bassa), flessori anca',
 st:'lie', fr:[[-90,-90,{h:[185,178],th:90,sh:90}],[-90,-90,{h:[185,178],th:172,sh:172}]], cap:['Gambe distese in avanti, vicino alla panca','Gambe verticali, bacino leggermente staccato'],
 set:'Panca piana. Sdraiati e tieni la panca dietro la testa con le mani.',
 pos:'Schiena bassa ben appoggiata, gambe tese (o leggermente piegate).',
 ese:['Parti con le gambe distese sopra la panca.','Solleva le gambe fino alla verticale.','Stacca leggermente il bacino portando i piedi verso il soffitto.','Scendi lentamente senza far arcuare la schiena.'],
 cue:'Porta i piedi verso il soffitto e stacca il bacino, non solo le gambe.',
 why:'Lavora la parte bassa dell’addome: utile per la stabilità del bacino sotto carichi pesanti.',
 err:['Schiena che si inarca','Slancio','Gambe che cadono di colpo']});

E({id:'a-rollout', n:'Ab rollout con bilanciere', g:'addome', a:'Bilanciere', m:'Retto dell’addome, core, dorsali',
 st:'kneel', eq:'bar', fr:[[2,2,{t:115}],[70,70,{h:[132,200],t:95,th:-75,sh:-90}]], cap:['In ginocchio, bilanciere sotto le spalle','Corpo disteso, bilanciere avanti'],
 set:'Bilanciere con dischi piccoli (o ruota addominale). Inginocchiati su un tappetino.',
 pos:'Schiena neutra o leggermente arrotondata, glutei contratti, core forte.',
 ese:['Parti in ginocchio con il bilanciere davanti alle ginocchia.','Fai rotolare il bilanciere in avanti distendendo il corpo.','Fermati appena prima che la schiena cominci a cedere.','Torna indietro contraendo l’addome.'],
 cue:'Costole verso il bacino, non far scendere la schiena bassa.',
 why:'Uno dei migliori esercizi per il core: forza il retto addominale in allungamento e stabilizza il bacino in tutti i sollevamenti.',
 err:['Schiena che si inarca','Scendere troppo','Usare solo le braccia']});

/* ---- extra gambe/glutei (usati soprattutto nella sezione Giulia) ---- */
E({id:'g-sumo', n:'Sumo squat con manubrio (goblet)', g:'gambe', a:'Manubri', m:'Glutei, adduttori, quadricipiti',
 st:'stand', eq:'db', fr:[[50,-70,{t:178}],[50,-70,{t:150,h:[112,163],th:80,sh:-15}]], cap:['In piedi, manubrio al petto, piedi larghi','Scesa profonda, busto eretto'],
 set:'Un manubrio (o kettlebell) tenuto verticalmente contro il petto con entrambe le mani.',
 pos:'Piedi molto più larghi delle spalle, punte aperte a 30-45°, ginocchia che seguono la direzione dei piedi, petto alto.',
 ese:['Inspira e scendi dritto in verticale spingendo le ginocchia in fuori.','Scendi finché le cosce sono parallele o sotto, mantenendo il busto eretto.','Spingi i piedi nel pavimento e contrai i glutei in alto.'],
 cue:'Spingi le ginocchia fuori sopra le punte dei piedi, come se volessi "strappare" il pavimento in due.',
 why:'La posizione larga porta molto lavoro su glutei e adduttori con un carico modesto e poco stress per la schiena: ottimo per imparare lo squat.',
 err:['Ginocchia che cadono verso l’interno','Talloni che si alzano','Busto che si piega in avanti']});

E({id:'g-split', n:'Split squat (affondo statico)', g:'gambe', a:'Manubri', m:'Glutei, quadricipiti, adduttori',
 st:'stand', eq:'db', rl:[96,220], fr:[[0,0,{t:178,h:[135,122],th:10,sh:-5}],[0,0,{t:172,h:[135,164],th:80,sh:-12}]], cap:['In piedi a passo, peso sul piede davanti','Ginocchio davanti a 90°, dietro quasi a terra'],
 set:'Passo lungo (circa 70-80 cm), due manubri ai lati. Puoi appoggiarti al rack con una mano all’inizio.',
 pos:'Busto leggermente inclinato in avanti per coinvolgere di più i glutei, peso sul tallone davanti.',
 ese:['Scendi in verticale piegando entrambe le ginocchia.','Il ginocchio dietro sfiora il pavimento, quello davanti resta sopra la caviglia.','Spingi sul piede davanti e risali.'],
 cue:'Spingi il tallone davanti nel pavimento e porta il bacino in avanti alla fine della salita.',
 why:'Lavoro unilaterale: forte stimolo al gluteo con carichi leggeri e meno schiena rispetto allo squat.',
 err:['Passo troppo corto','Ginocchio davanti oltre le punte con tallone staccato','Busto che oscilla']});

E({id:'g-abd-cavo', n:'Abduzione anca al cavo (cavigliera)', g:'gambe', a:'Cavi', m:'Gluteo medio e piccolo, tensore della fascia lata',
 st:'stand', v:'f', one:true, legs:true, cp:'ankle', an:[[25,212]], eq:'cable', fr:[[5,5,{ab:0}],[5,5,{ab:30}]], cap:['Gamba accanto all’altra, cavo che tira verso l’interno','Gamba aperta lateralmente'],
 set:'Cavo BASSO con cavigliera sulla caviglia della gamba di lavoro. Stai di fianco alla torre, gamba di lavoro lontana dal cavo, una mano al rack.',
 pos:'Busto dritto, bacino fermo, punta del piede dritta in avanti.',
 ese:['Parti con la gamba vicina all’altra (il cavo passa davanti al corpo).','Apri la gamba di lato fino a circa 30-40°, senza inclinare il busto.','Contrai il gluteo 1 secondo e ritorna lentamente.'],
 cue:'Porta il tallone in fuori e leggermente indietro: movimento corto e controllato.',
 why:'Il gluteo medio stabilizza il bacino e le ginocchia: fondamentale per squat, affondi e per la forma laterale dei glutei.',
 err:['Inclinare il busto di lato','Slancio','Ruotare la punta verso l’alto']});

E({id:'g-add-cavo', n:'Adduzione anca al cavo (cavigliera)', g:'gambe', a:'Cavi', m:'Adduttori',
 st:'stand', v:'f', one:true, legs:true, cp:'ankle', an:[[275,212]], eq:'cable', fr:[[5,5,{ab:30}],[5,5,{ab:-5}]], cap:['Gamba aperta, cavo che tira verso l’esterno','Gamba portata oltre la linea centrale'],
 set:'Cavo BASSO con cavigliera sulla gamba di lavoro, stai di fianco alla torre con la gamba di lavoro vicina al cavo, una mano al rack.',
 pos:'Busto dritto, bacino fermo.',
 ese:['Parti con la gamba aperta verso il cavo.','Porta la gamba verso e davanti all’altra.','Ritorna lentamente.'],
 cue:'Movimento pulito e lento, senza oscillare con il busto.',
 why:'Gli adduttori lavorano in squat e affondi e sono spesso deboli: equilibrano l’abduzione e proteggono le ginocchia.',
 err:['Slancio','Busto che si piega','Carico troppo alto']});

E({id:'g-squat-cavo', n:'Squat al cavo (goblet con maniglia)', g:'gambe', a:'Cavi', m:'Quadricipiti, glutei, adduttori, core',
 st:'stand', eq:'cable', an:[255,120], fr:[[50,-70,{t:178}],[50,-70,{t:150,h:[112,163],th:80,sh:-15}]], cap:['In piedi, maniglia al petto, cavo in avanti','Scesa profonda, il cavo ti bilancia in avanti'],
 set:'Cavo MEDIO-BASSO (circa all’altezza dell’anca) con maniglia singola o corda. Tienila al petto con due mani e allontanati dalla torre finché il cavo è in tensione.',
 pos:'Piedi alla larghezza delle spalle o più larghi (sumo), punte aperte, gomiti vicini al busto, petto alto. Il cavo ti tira in avanti: resisti con il core.',
 ese:['Inspira e scendi in verticale, ginocchia in fuori sopra le punte dei piedi.','Scendi fino a cosce parallele o sotto, con il cavo che ti fa da contrappeso.','Spingi i piedi nel pavimento e risali contraendo i glutei in alto.'],
 cue:'Spingi le ginocchia in fuori e "siediti in mezzo alle gambe": il cavo ti aiuta a restare dritta.',
 why:'Il cavo ti fa da contrappeso: riesci a scendere più profonda e dritta rispetto a uno squat a corpo libero, con molto lavoro su glutei e cosce e poco carico sulla schiena. Ottimo per imparare lo squat.',
 err:['Ginocchia che cadono verso l’interno','Talloni che si alzano','Lasciarsi tirare in avanti dal cavo']});

E({id:'g-rdl-cavo', n:'Stacco rumeno al cavo basso', g:'gambe', a:'Cavi', m:'Femorali, glutei, erettori spinali',
 st:'stand', eq:'cable', an:[45,212], fr:[[0,0,{t:178}],[0,0,{t:135,h:[115,120],th:25,sh:-5}]], cap:['In piedi, barra davanti alle cosce, cavo dietro','Busto inclinato, fianchi indietro'],
 set:'Cavo BASSO con barra dritta (o corda). Stai di schiena alla torre, a circa un passo, con il cavo che passa tra le gambe.',
 pos:'Piedi alla larghezza del bacino, ginocchia morbide e ferme, schiena neutra, scapole indietro.',
 ese:['Spingi i fianchi indietro facendo scendere la barra lungo le cosce.','Scendi fino a sentire lo stiramento dei femorali, schiena sempre dritta.','Spingi i fianchi in avanti, contrai i glutei e torna in piedi senza inarcare la schiena.'],
 cue:'Fianchi indietro come per chiudere una porta con il sedere; il cavo tira e i glutei lo riportano su.',
 why:'Il cavo dà tensione costante: anche in alto i glutei devono lavorare per chiudere il movimento, cosa che con il bilanciere non succede. Costruisce femorali e glutei con un carico ben controllabile.',
 err:['Schiena arrotondata','Piegare troppo le ginocchia','Inarcare la schiena in alto']});

E({id:'p-panca-cavi', n:'Panca piana con cavi (chest press su panca)', g:'petto', a:'Cavi', m:'Pettorali, tricipiti, deltoidi anteriori',
 st:'lie', eq:'cable', an:[40,200], fr:[[80,180],[180,180]], cap:['Maniglie ai lati del petto, cavi in tensione','Braccia distese sopra il petto'],
 set:'Panca piana tra le due torri con la testa verso i cavi, cavi BASSI (puleggia al minimo) con maniglie singole. Prendi le maniglie da seduto, poi sdraiati tenendole al petto.',
 pos:'Scapole addotte e depresse, petto alto, piedi a terra. Gomiti a ~45° dal busto.',
 ese:['Parti con le maniglie ai lati del petto, gomiti sotto i polsi.','Spingi verso l’alto avvicinando le mani sopra il petto.','Contrai il petto 1 secondo in alto.','Scendi lentamente controllando il cavo.'],
 cue:'Spingi i gomiti verso il centro del petto: il cavo tira sempre, anche in alto.',
 why:'Come la panca, ma con tensione costante e le due braccia indipendenti: il petto lavora anche in chiusura, dove con il bilanciere si "scarica".',
 err:['Gomiti troppo larghi','Schiena inarcata','Peso troppo alto e movimento corto']});

E({id:'p-incl-cavi', n:'Panca inclinata con cavi', g:'petto', a:'Cavi', m:'Petto alto (clavicolare), deltoidi anteriori, tricipiti',
 st:'inc', eq:'cable', an:[40,215], fr:[[55,180],[178,180]], cap:['Maniglie ai lati del petto alto','Braccia distese, mani unite sopra il petto'],
 set:'Panca a 30° tra le torri, cavi BASSI con maniglie singole. Siediti con la schiena ben appoggiata.',
 pos:'Petto alto, scapole indietro e giù, piedi a terra. Polsi dritti.',
 ese:['Parti con le maniglie all’altezza del petto alto.','Spingi in alto e leggermente verso il centro.','Contrai 1 secondo.','Ritorna lentamente.'],
 cue:'Spingi "verso il mento" con i gomiti che si avvicinano in alto.',
 why:'Il petto alto sviluppato con tensione costante: sostituisce la panca inclinata con i manubri e carica meno le spalle.',
 err:['Panca troppo inclinata','Gomiti svasati','Usare lo slancio']});

E({id:'s-press-cavo', n:'Shoulder press ai cavi (seduto)', g:'spalle', a:'Cavi', m:'Deltoidi, tricipiti',
 st:'seat', eq:'cable', an:[40,215], fr:[[15,175],[178,180]], cap:['Maniglie all’altezza delle spalle','Braccia distese sopra la testa'],
 set:'Panca verticale (80-85°) tra le torri, cavi BASSI con maniglie singole. Portale sulle spalle.',
 pos:'Schiena appoggiata, core contratto, polsi sopra i gomiti.',
 ese:['Parti con le maniglie all’altezza delle spalle.','Spingi in alto in linea verticale, avvicinando le mani.','Scendi lentamente fino alle orecchie.'],
 cue:'Gomiti sotto le maniglie, spingi "il soffitto" senza inarcare la schiena.',
 why:'Il cavo mantiene tensione in ogni punto: le spalle lavorano in modo continuo e i due lati si sincronizzano da soli.',
 err:['Schiena inarcata','Gomiti che vanno indietro','Corsa incompleta']});

E({id:'c-curl-panca-cavo', n:'Curl su panca inclinata ai cavi', g:'bicipiti', a:'Cavi', m:'Bicipiti (capo lungo)',
 st:'inc', eq:'cable', an:[40,212], fr:[[-5,-5],[-5,140]], cap:['Braccia distese, bicipiti in allungamento','Maniglie alle spalle'],
 set:'Panca inclinata a 45-60° davanti a una torre, cavi BASSI con maniglie singole. Siediti con la schiena appoggiata e le braccia lungo i fianchi, leggermente indietro.',
 pos:'Spalle appoggiate, gomiti fermi e leggermente dietro il busto.',
 ese:['Parti con le braccia distese e il bicipite ben allungato.','Fletti i gomiti portando le maniglie alle spalle, palmi verso l’alto.','Contrai 1 secondo.','Scendi lentamente fino all’allungamento completo.'],
 cue:'Gomiti fermi indietro: il bicipite parte da allungato e con il cavo resta in tensione fino in cima.',
 why:'Bicipite in massimo allungamento con tensione costante: molto stimolo senza barare con il busto.',
 err:['Gomiti in avanti','Schiena staccata dalla panca','Dondolare']});

E({id:'b-row-busto-cavi', n:'Rematore ai cavi a busto inclinato', g:'schiena', a:'Cavi', m:'Dorsali, romboidi, trapezio, bicipiti',
 st:'hinge', eq:'cable', an:[250,212], fr:[[50,55],[-70,-5]], cap:['Braccia tese verso i cavi','Gomiti dietro al busto, scapole chiuse'],
 set:'Cavi BASSI con maniglie singole, una per mano (o una barra). Stai a un passo dalla torre, busto inclinato di ~45° e schiena neutra, ginocchia morbide.',
 pos:'Piedi alla larghezza delle spalle, sguardo a terra, core contratto.',
 ese:['Parti con le braccia tese e le scapole in avanti.','Porta i gomiti indietro e in alto vicino al busto, avvicinando le scapole.','Contrai 1 secondo.','Ritorna lentamente.'],
 cue:'Gomiti alle tasche posteriori, non tirare con le mani.',
 why:'Il rematore con carichi importanti ma senza peso sulla schiena: il cavo non "cade" mai e tiene tensione ovunque.',
 err:['Busto che si alza','Tirare con i bicipiti','Schiena arrotondata']});

/* ============================== PIANI DI ALLENAMENTO ============================== */
const GRUPPI = {petto:'Petto', spalle:'Spalle', schiena:'Schiena', bicipiti:'Bicipiti', tricipiti:'Tricipiti', avambracci:'Avambracci', gambe:'Gambe', addome:'Addome'};

/* sets, reps (testo), rec = recupero, ruolo = a cosa serve in questa seduta, opt = opzionale */
const PLAN = [
 {id:'g1', nome:'Giorno 1', sotto:'Petto + Tricipiti', obiettivo:'Forza nella spinta orizzontale. Panca pesante come primo esercizio (quando sei più fresco), poi tutto ai cavi: petto per volume e tricipiti, che sono il "limite" della panca.',
  ex:[
   {e:'p-panca', s:5, r:'5', rec:'3 min', ruolo:'Esercizio principale di forza: carico alto, tecnica perfetta.'},
   {e:'p-jammer-press', s:3, r:'8', rec:'2 min', ruolo:'Spinta pesante con traiettoria indipendente.'},
   {e:'p-incl-cavi', s:3, r:'10-12', rec:'90 s', ruolo:'Petto alto ai cavi: tensione costante, poco stress sulle spalle.'},
   {e:'p-press-cavi', s:3, r:'10-12', rec:'90 s', ruolo:'Spinta in piedi: tensione costante e core attivo.', opt:true},
   {e:'p-croci-alte', s:3, r:'12-15', rec:'75 s', ruolo:'Petto (parte centrale-bassa) ai cavi alti.'},
   {e:'p-croci-basse', s:3, r:'12-15', rec:'75 s', ruolo:'Petto alto ai cavi bassi.'},
   {e:'t-push-corda', s:4, r:'10-12', rec:'75 s', ruolo:'Tricipiti: volume e forza di lockout.'},
   {e:'t-overhead-corda', s:3, r:'12', rec:'75 s', ruolo:'Capo lungo del tricipite (il più grosso).'},
   {e:'t-panca-stretta', s:3, r:'6', rec:'2 min', ruolo:'Forza di lockout con il bilanciere.', opt:true}
  ]},
 {id:'g2', nome:'Giorno 2', sotto:'Schiena + Bicipiti + Avambracci', obiettivo:'Forza nella trazione. Rack pull pesante, poi la schiena quasi tutta ai cavi, infine bicipiti e avambracci ai cavi.',
  ex:[
   {e:'b-rackpull', s:4, r:'5', rec:'3 min', ruolo:'Esercizio principale di forza: catena posteriore e presa.'},
   {e:'b-lat-larga', s:4, r:'8-10', rec:'2 min', ruolo:'Ampiezza e forza di trazione verticale.'},
   {e:'b-row-busto-cavi', s:4, r:'8-10', rec:'2 min', ruolo:'Rematore pesante senza carico sulla schiena.'},
   {e:'b-row-cavo', s:3, r:'10-12', rec:'90 s', ruolo:'Spessore della schiena con tensione costante.'},
   {e:'b-row-singolo', s:3, r:'10 per lato', rec:'75 s', ruolo:'Dorsali e romboidi, un braccio alla volta.'},
   {e:'b-pulldown-braccia-tese', s:3, r:'12-15', rec:'75 s', ruolo:'Isolamento del dorsale, senza bicipiti.', opt:true},
   {e:'c-curl-cavo', s:3, r:'10-12', rec:'75 s', ruolo:'Bicipiti: tensione costante.'},
   {e:'c-curl-alti', s:3, r:'12', rec:'75 s', ruolo:'Bicipiti in contrazione massima (posa double biceps).'},
   {e:'c-curl-panca-cavo', s:3, r:'10-12', rec:'75 s', ruolo:'Bicipiti in allungamento con tensione costante.', opt:true},
   {e:'w-wrist-curl', s:3, r:'15', rec:'60 s', ruolo:'Presa più forte per stacchi e trazioni.'},
   {e:'w-reverse-curl', s:3, r:'12', rec:'60 s', ruolo:'Estensori e gomito (prevenzione).', opt:true}
  ]},
 {id:'g3', nome:'Giorno 3', sotto:'Spalle + Bicipiti + Tricipiti', obiettivo:'Forza sopra la testa e salute della spalla, poi braccia insieme ai cavi in superserie (un esercizio di bicipiti e uno di tricipiti senza pausa, poi recuperi).',
  ex:[
   {e:'s-military', s:5, r:'5', rec:'3 min', ruolo:'Esercizio principale di forza: spalle e tronco.'},
   {e:'s-jammer-press', s:3, r:'8', rec:'2 min', ruolo:'Forza monolaterale, anti-rotazione del core.'},
   {e:'s-press-cavo', s:3, r:'10-12', rec:'90 s', ruolo:'Spinta sopra la testa ai cavi: tensione continua.'},
   {e:'s-laterali', s:4, r:'12-15', rec:'60 s', ruolo:'Larghezza delle spalle (deltoide laterale) al cavo.'},
   {e:'s-facepull', s:4, r:'15', rec:'60 s', ruolo:'Salute della spalla: deltoide posteriore e cuffia.'},
   {e:'s-posteriori', s:3, r:'15', rec:'60 s', ruolo:'Deltoide posteriore ai cavi incrociati.', opt:true},
   {e:'s-rot-est', s:2, r:'15', rec:'45 s', ruolo:'Cuffia dei rotatori (prevenzione).', opt:true},
   {e:'t-french-cavo', s:3, r:'10-12', rec:'senza pausa', ruolo:'Superserie 1A: tricipiti (capo lungo e mediale).'},
   {e:'c-curl-singolo', s:3, r:'10-12', rec:'90 s dopo la coppia', ruolo:'Superserie 1B: bicipiti, un braccio alla volta.'},
   {e:'t-push-barra', s:3, r:'12', rec:'senza pausa', ruolo:'Superserie 2A: tricipiti, volume ai cavi.'},
   {e:'c-hammer', s:3, r:'12', rec:'90 s dopo la coppia', ruolo:'Superserie 2B: brachiale e spessore del braccio.'}
  ]},
 {id:'g4', nome:'Giorno 4', sotto:'Gambe + Addominali', obiettivo:'Forza delle gambe e del core, che sostengono tutti gli altri sollevamenti. Squat pesante, poi catena posteriore ai cavi e addominali.',
  ex:[
   {e:'g-squat', s:5, r:'5', rec:'3 min', ruolo:'Esercizio principale di forza: gambe e tronco.'},
   {e:'g-rdl-cavo', s:3, r:'10', rec:'2 min', ruolo:'Femorali e glutei con tensione costante.'},
   {e:'g-squat-cavo', s:3, r:'12', rec:'90 s', ruolo:'Squat guidato dal cavo: cosce e glutei.'},
   {e:'g-leg-ext', s:3, r:'12', rec:'75 s', ruolo:'Quadricipiti con poco stress sulla schiena.'},
   {e:'g-leg-curl', s:3, r:'12', rec:'75 s', ruolo:'Femorali al cavo con cavigliera.'},
   {e:'g-kickback', s:3, r:'12 per lato', rec:'60 s', ruolo:'Glutei al cavo.', opt:true},
   {e:'g-calf', s:4, r:'12-15', rec:'60 s', ruolo:'Polpacci.', opt:true},
   {e:'a-crunch-cavo', s:3, r:'12', rec:'60 s', ruolo:'Addome con carico progressivo.'},
   {e:'a-pallof', s:3, r:'10 per lato', rec:'60 s', ruolo:'Core anti-rotazione.'},
   {e:'a-woodchop', s:3, r:'12 per lato', rec:'60 s', ruolo:'Obliqui al cavo.', opt:true}
  ]},
 {id:'gA', profilo:'giulia', nome:'Giulia A', sotto:'Gambe + Glutei + Addominali', obiettivo:'Gambe e glutei con molti cavi. Parti con l’hip thrust (principale stimolo per il gluteo), poi squat e abduzione al cavo, affondi e leg extension. Scegli un peso con cui l’ultima ripetizione è difficile ma tecnicamente pulita.',
  ex:[
   {e:'g-hip-thrust', s:4, r:'8-10', rec:'2 min', ruolo:'Esercizio principale: il miglior stimolo per il gluteo grande.'},
   {e:'g-squat-cavo', s:3, r:'12', rec:'90 s', ruolo:'Squat guidato dal cavo: cosce e glutei con poco carico sulla schiena.'},
   {e:'g-split', s:3, r:'10 per gamba', rec:'90 s', ruolo:'Forza e stabilità monolaterale, forte stimolo al gluteo.'},
   {e:'g-abd-cavo', s:3, r:'15 per lato', rec:'60 s', ruolo:'Gluteo medio al cavo: forma e stabilità del bacino.'},
   {e:'g-leg-ext', s:3, r:'12-15', rec:'75 s', ruolo:'Quadricipiti, isolamento.'},
   {e:'g-calf', s:3, r:'15', rec:'60 s', ruolo:'Polpacci.', opt:true},
   {e:'a-crunch-cavo', s:3, r:'12-15', rec:'60 s', ruolo:'Addominali al cavo.'},
   {e:'a-pallof', s:3, r:'10 per lato', rec:'60 s', ruolo:'Core anti-rotazione.', opt:true}
  ]},
 {id:'gB', profilo:'giulia', nome:'Giulia B', sotto:'Gambe + Femorali + Addominali', obiettivo:'Catena posteriore quasi tutta ai cavi: glutei e femorali. Stacco rumeno al cavo come esercizio principale, poi pull-through, kickback e leg curl.',
  ex:[
   {e:'g-rdl-cavo', s:4, r:'10', rec:'2 min', ruolo:'Esercizio principale: femorali e glutei con tensione costante.'},
   {e:'g-pullthrough', s:4, r:'12-15', rec:'90 s', ruolo:'Cerniera d’anca al cavo: gluteo in contrazione a ogni ripetizione.'},
   {e:'g-kickback', s:3, r:'12-15 per lato', rec:'60 s', ruolo:'Isolamento del gluteo grande.'},
   {e:'g-leg-curl', s:3, r:'12', rec:'75 s', ruolo:'Femorali al cavo con cavigliera.'},
   {e:'g-bulgaro', s:3, r:'10 per gamba', rec:'90 s', ruolo:'Gluteo e quadricipiti in unilaterale.'},
   {e:'g-add-cavo', s:3, r:'15 per lato', rec:'60 s', ruolo:'Adduttori (equilibrio con l’abduzione).', opt:true},
   {e:'a-woodchop', s:3, r:'12 per lato', rec:'60 s', ruolo:'Addominali obliqui al cavo.'}
  ]}
];
