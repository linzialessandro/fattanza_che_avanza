// src/data/constants.js

export const LEGISLATION_TYPES = {
  LEGAL: { name: "Legale / Regolamentato", color: "text-emerald-400 bg-emerald-950/50 border-emerald-500", danger: 1 },
  TOLLERATO: { name: "Tolleranza Grigia", color: "text-amber-400 bg-amber-950/50 border-amber-500", danger: 2.5 },
  DECRIMINALIZZATO: { name: "Decriminalizzato (Multe)", color: "text-sky-400 bg-sky-950/50 border-sky-500", danger: 3 },
  ILLEGALE: { name: "Illegale / Sanzioni", color: "text-orange-400 bg-orange-950/50 border-orange-500", danger: 5 },
  SEVERO: { name: "Penale Severo", color: "text-rose-500 bg-rose-950/50 border-rose-600", danger: 8 }
};

export const COUNTRIES = [
  {
    id: 1, name: "Italia", flag: "🇮🇹", status: "DECRIMINALIZZATO",
    desc: "L'inizio del viaggio. Uso medico legale, ma il possesso ricreativo è depenalizzato: niente carcere, ma sanzioni amministrative come ritiro patente o passaporto (D.P.R. 309/90).",
    munchie: "Pizza Margherita al taglio",
    checkpoints: [
      {
        title: "Autostrada A23",
        text: "La polizia stradale ti ferma. Hai nascosto i semi nel cruscotto, ma un cane abbaia in lontananza.",
        options: [
          { label: "Usa 'Scammuffo'", power: "scammuffo", result: "success", text: "Lo spray annulla ogni traccia. L'agente ti restituisce i documenti senza domande.", successParanoia: 0 },
          { label: "Mostra flemma e sorridi", difficulty: 4, successText: "La tua calma è disarmante. L'agente non ha motivo di sospettare e ti congeda.", failText: "L'ansia ti tradisce. Ispezionano l'auto e trovano la tua erba personale. Ti lasciano i semi, ma becchi una multa.", successParanoia: 10, failParanoia: 35, failStash: -2, failCoins: -80 },
          { label: "Racconta una balla colossale all'agente (Azzardo)", difficulty: 7, successText: "L'agente non solo ci crede, ma si commuove e ti lascia 50 monete per il disturbo!", failText: "L'agente si offende e ti fa una ramanzina epica, confiscandoti tutto lo stash e multandoti.", successParanoia: 15, successCoins: 50, failParanoia: 50, failStash: -5, failCoins: -150 }
        ]
      },
      {
        title: "Stazione di Bologna - L'Ombra del Lupo",
        text: "Mentre aspetti la coincidenza, noti un uomo in trench scuro. È l'Ispettore Lupo dell'Interpol, e sta puntando proprio te.",
        options: [
          { label: "Usa 'Via di Fuga'", power: "via_fuga", result: "success", text: "Salti al volo sul Regionale Veloce appena le porte si chiudono. Lupo impreca dalla banchina.", successParanoia: 0 },
          { label: "Mescolati in una comitiva di turisti", difficulty: 6, successText: "Ti metti un cappellino da pescatore e sparisci nella folla. Lupo perde le tue tracce.", failText: "Lupo ti afferra per uno spallaccio. Riesci a divincolarti, ma perdi lo zaino con le scorte.", successParanoia: 10, failParanoia: 50, failStash: -4, failCoins: -50 },
          { label: "Scivola nei bagni per nascondere i semi (Azzardo)", difficulty: 8, successText: "Riesci a imboscare i semi nei condotti. Lupo ti ferma ma sei pulito. Recuperi i semi più tardi.", failText: "Lupo ti segue nei bagni e ti sbatte al muro. Ti requisisce l'erba e ti segnala nel database europeo.", successParanoia: 15, failParanoia: 70, failStash: -6, failCoins: -200 }
        ]
      },
      {
        title: "Posto di blocco alpino",
        text: "Sei vicino al confine. I Carabinieri fermano tutte le auto dirette a Nord.",
        options: [
          { label: "Usa 'Canna di Pace'", power: "canna_pace", result: "success", text: "Prima del blocco, offri da fumare al contadino sul trattore che ti dà un passaggio per vie sterrate.", successParanoia: 0 },
          { label: "Nascondi i semi nelle calze", difficulty: 5, successText: "Le mani in tasca e aria infreddolita. Ti controllano i documenti e ti lasciano andare.", failText: "Notano il tuo nervosismo. Ti smontano le portiere e trovano l'erba ricreativa.", successParanoia: 10, failParanoia: 45, failStash: -3, failCoins: -100 },
          { label: "Bypassa il blocco a fari spenti (Azzardo)", difficulty: 8, successText: "Mossa da film d'azione! Li superi nel buio totale. Guadagni terreno prezioso e trovi una scorciatoia sicura.", failText: "Finisci in un fossato! Arrivano i soccorsi e... i Carabinieri. Peggio di così non si può.", successParanoia: 15, successEnergy: 10, failParanoia: 80, failStash: -5, failCoins: -150 }
        ]
      }
    ]
  },
  {
    id: 2, name: "Francia", flag: "🇫🇷", status: "ILLEGALE",
    desc: "Il cerchio si stringe. Pur essendo tra i maggiori consumatori in Europa, la Francia punisce il possesso con l'Amende Forfaitaire (200€) dal 2020 per evitare processi lunghi.",
    munchie: "Croissant caldo al burro",
    checkpoints: [
      {
        title: "Gare de Lyon, Parigi",
        text: "La Gendarmerie ha transennato i binari con unità cinofile. Cercano il corriere dei semi del Verde Assoluto.",
        options: [
          { label: "Usa 'Scammuffo'", power: "scammuffo", result: "success", text: "Neutralizzi l'odore dei semi e dello stash. Passi davanti ai cani senza un battito di ciglia.", successParanoia: 0 },
          { label: "Fingi di essere un giornalista in ritardo", difficulty: 5, successText: "Mostri un pass falso e fai una scenata in francese. Ti lasciano passare per sfinimento.", failText: "L'agente non ci casca. Trovano il tuo grinder. Multa immediata di 200€ e sequestro.", successParanoia: 10, failParanoia: 60, failStash: -4, failCoins: -200 },
          { label: "Imboscati nel treno merci adiacente (Azzardo)", difficulty: 8, successText: "Salti nel vagone merci e viaggi gratis fino a Lione! Risparmi tempo ed eviti controlli.", failText: "Cadi malamente e vieni beccato dai ferrovieri. Ti consegnano direttamente alla polizia.", successParanoia: 15, successEnergy: 15, failParanoia: 75, failStash: -5, failCoins: -250 }
        ]
      },
      {
        title: "Vicolo nel Quartiere Latino",
        text: "L'Ispettore Lupo in borghese ti sbarra la strada. 'I semi, ragazzo. Consegnameli e nessuno si farà male.'",
        options: [
          { label: "Usa 'Via di Fuga'", power: "via_fuga", result: "success", text: "Lanci un bidone della spazzatura e scompari nel labirinto di vicoli parigini.", successParanoia: 0 },
          { label: "Fai il finto tonto in inglese", difficulty: 6, successText: "'I'm sorry monsieur, I'm looking for the Louvre?'. Lupo esita un istante, e tu ti dilegui.", failText: "Lupo ti sbatte contro il muro. 'Non giocare con me'. Ti perquisisce trovando tutto tranne i semi.", successParanoia: 10, failParanoia: 80, failStash: -8, failCoins: -150 },
          { label: "Attacco frontale: Spingi Lupo (Azzardo)", difficulty: 9, successText: "Lo prendi alla sprovvista! Cade a terra e gli rubi perfino l'erba sequestrata.", failText: "È un agente addestrato. Ti immobilizza in due secondi. Passi la notte in cella.", successParanoia: 15, successStash: 10, failParanoia: 100, failStash: -10, failCoins: -300 }
        ]
      },
      {
        title: "Periferia di Marsiglia",
        text: "Un posto di blocco improvviso della polizia locale. Chiedono di ispezionare il bagagliaio.",
        options: [
          { label: "Usa 'Collirio'", power: "collirio", result: "success", text: "Occhi di ghiaccio. Trasudi innocenza. I gendarmi guardano superficialmente e ti fanno andare.", successParanoia: 0 },
          { label: "Protesta invocando i diritti civili", difficulty: 4, successText: "Inizi a citare leggi inventate, creando una fila di clacson. I poliziotti, esasperati, ti mandano via.", failText: "Si arrabbiano e chiamano un superiore. Smontano l'auto e trovano lo stash ricreativo.", successParanoia: 10, failParanoia: 50, failStash: -5, failCoins: -150 },
          { label: "Nascondi i semi nello scarico (Azzardo)", difficulty: 7, successText: "Fissato col nastro termico. Geniale! Passi indenne l'ispezione approfondita e trovi vecchi contanti nel cruscotto.", failText: "Lo scarico brucia la bustina del tuo stash ricreativo. L'odore affumicato fa scattare l'arresto.", successParanoia: 15, successCoins: 100, failParanoia: 65, failStash: -10, failCoins: -200 }
        ]
      }
    ]
  },
  {
    id: 3, name: "Germania", flag: "🇩🇪", status: "LEGAL",
    desc: "Dal 1° aprile 2024 è legale! Possesso consentito fino a 25g in pubblico, 50g in casa e 3 piante. I 'Cannabis Social Club' distribuiscono ai residenti.",
    munchie: "Brezel caldo salato e senape",
    checkpoints: [
      {
        title: "Social Club di Monaco",
        text: "Cerchi rifugio nel club per incontrare un contatto botanico. Il presidente vuole pesare la tua erba per le regole d'ingresso.",
        options: [
          { label: "Usa 'Canna di Pace'", power: "canna_pace", result: "success", text: "Condividi un po' del tuo fiore migliore. Il presidente sorride e ti fa entrare senza controlli.", successParanoia: 0 },
          { label: "Pesatura ufficiale (Devi essere sotto i 25g)", difficulty: 2, successText: "La bilancia dice 18g. Perfetto! Ti offrono anche un tè alla canapa di benvenuto.", failText: "La bilancia impazzisce e segna 26g! Le regole sono regole: ti cacciano via scortesemente.", successParanoia: 10, successEnergy: 10, failParanoia: 20, failStash: -5 },
          { label: "Ruba un clone di genetica rara (Azzardo)", difficulty: 8, successText: "Nel caos della serra sottraghi un clone fenomenale. Questa genetica vale una fortuna!", failText: "Le telecamere ti riprendono. Interviene la sicurezza del club e ti buttano fuori in malo modo.", successParanoia: 15, successStash: 10, failParanoia: 45, failStash: -5, failCoins: -50 }
        ]
      },
      {
        title: "Alexanderplatz, Berlino",
        text: "Un informatore di Lupo ti fotografa mentre sei seduto in piazza. La polizia tedesca, seppur tollerante, si avvicina.",
        options: [
          { label: "Usa 'Via di Fuga'", power: "via_fuga", result: "success", text: "Ti alzi e ti confondi tra la folla dello shopping, l'informatore perde le tracce.", successParanoia: 0 },
          { label: "Dimostra che stai fumando a 105 metri da una scuola", difficulty: 3, successText: "Apri il GPS: sei esattamente nella zona verde legale. I poliziotti annuiscono e ti lasciano stare.", failText: "L'app segna 95 metri. Sei in zona rossa! Ti confiscano la canna e ti fanno la multa.", successParanoia: 10, failParanoia: 30, failStash: -2, failCoins: -50 },
          { label: "Spaventa l'informatore (Azzardo)", difficulty: 7, successText: "Gli rubi la macchina fotografica, la vendi al banco pegni e la getti nella fontana. L'Ispettore Lupo è cieco per un po'!", failText: "La polizia vede l'aggressione e ti arresta per vandalismo.", successParanoia: 15, successCoins: 150, failParanoia: 50, failCoins: -100 }
        ]
      },
      {
        title: "Autobahn",
        text: "Guidi verso Nord a 200 km/h. Un'auto nera non marchiata ti sta pedinando.",
        options: [
          { label: "Usa 'Scammuffo'", power: "scammuffo", result: "success", text: "Prendi un'uscita secondaria e spruzzi l'auto per non farti rintracciare dai cani se ti fermano. L'auto tira dritto.", successParanoia: 0 },
          { label: "Accellera a 240 km/h", difficulty: 6, successText: "Il motore urla, semini l'inseguitore in stile Autobahn senza limiti!", failText: "Motore in surriscaldamento. Devi fermarti in corsia d'emergenza. L'auto nera ti affianca e requisisce il carico.", successParanoia: 10, failParanoia: 50, failStash: -5, failCoins: -100 },
          { label: "Frenata improvvisa e deviazione (Azzardo)", difficulty: 8, successText: "Li prendi di sorpresa e li fai sbandare! Trovi uno zainetto con erba e soldi abbandonato al lato.", failText: "Perdi il controllo e strisci il guardrail. Danni all'auto e ti beccano in pieno.", successParanoia: 15, successStash: 5, successCoins: 100, failParanoia: 70, failStash: -4, failCoins: -200 }
        ]
      }
    ]
  },
  {
    id: 4, name: "Svizzera", flag: "🇨🇭", status: "DECRIMINALIZZATO",
    desc: "Dal 2012 il possesso sotto i 10g è depenalizzato con multa di 100 franchi. Attivi progetti pilota (es. Züri Can) per la vendita legale nelle farmacie.",
    munchie: "Rösti croccante di patate",
    checkpoints: [
      {
        title: "Dogana di Chiasso",
        text: "Le guardie di confine, allertate da Lupo, fermano il tuo veicolo. Cercano i semi del Verde Assoluto.",
        options: [
          { label: "Usa 'Scammuffo'", power: "scammuffo", result: "success", text: "I cani passano. I semi, inseriti nel pacco batterie, non vengono rilevati.", successParanoia: 0 },
          { label: "Mostra lo stash personale legale (sotto i 10g)", difficulty: 4, successText: "Dichiari onestamente 5g. Le guardie si concentrano su quello, ignorando i semi nascosti.", failText: "La bilancia è severissima: 10.5g! Sequestro e multa salatissima in franchi svizzeri.", successParanoia: 10, failParanoia: 45, failStash: -5, failCoins: -120 },
          { label: "Falsifica un lasciapassare diplomatico (Azzardo)", difficulty: 8, successText: "Incredibile! Ci credono e si scusano per il disturbo donandoti dei contanti per il 'ritardo'.", failText: "Il QR code rivela che è il menù del kebab. Sequestro totale e fermo doganale.", successParanoia: 15, successCoins: 200, failParanoia: 75, failStash: -8, failCoins: -200 }
        ]
      },
      {
        title: "Dispensario Pilota di Zurigo",
        text: "Cerchi un contatto nel progetto 'Züri Can'. Un uomo sospetto ti fissa dalla vetrina.",
        options: [
          { label: "Usa 'Collirio'", power: "collirio", result: "success", text: "Entri deciso, ignorando l'uomo con sguardo imperturbabile. Il contatto ti riceve.", successParanoia: 0 },
          { label: "Fai finta di essere un paziente svizzero", difficulty: 5, successText: "Parli un misto di tedesco e francese svizzero. Riesci a ottenere informazioni vitali e un campione gratis.", failText: "Il farmacista capisce che non sei del posto. Chiama la sicurezza.", successParanoia: 10, successStash: 5, failParanoia: 30, failStash: -2, failCoins: -50 },
          { label: "Affronta l'uomo sospetto (Azzardo)", difficulty: 7, successText: "Era un ricettatore! Lo metti in fuga e recuperi la sua sacca caduta piena di fiori e contanti.", failText: "Era un agente dell'Interpol in borghese. Ti sbatte a terra.", successParanoia: 15, successStash: 8, successCoins: 100, failParanoia: 80, failStash: -5, failCoins: -100 }
        ]
      },
      {
        title: "Rifugio Alpino",
        text: "Una bufera ti blocca in un rifugio. Sospetti che uno degli sciatori sia l'Ispettore Lupo travestito.",
        options: [
          { label: "Usa 'Canna di Pace'", power: "canna_pace", result: "success", text: "Offri da fumare al gruppo. Lo sciatore declina, ma l'atmosfera si rilassa e capisci che è innocuo.", successParanoia: 0 },
          { label: "Dormi con lo zaino abbracciato", difficulty: 4, successText: "Passi una notte insonne ma al sicuro. Nessuno tocca la tua roba.", failText: "Ti addormenti profondamente e qualcuno ti fruga nello zaino, rubando metà dello stash.", successParanoia: 10, failParanoia: 50, failStash: -5 },
          { label: "Esci nella bufera notturna (Azzardo)", difficulty: 8, successText: "Sopravvivi al freddo glaciale. Tutta quell'aria gelida ti rende lucidissimo e inarrestabile.", failText: "Principio di assideramento. Devi chiedere aiuto ai soccorsi, esponendo tutto il carico.", successParanoia: 15, successEnergy: 20, failParanoia: 90, failStash: -8, failCoins: -150 }
        ]
      }
    ]
  },
  {
    id: 5, name: "Spagna", flag: "🇪🇸", status: "TOLLERATO",
    desc: "Consumo e coltivazione privati tollerati, ma il possesso in pubblico è punito da multe salate (Ley Mordaza). I Cannabis Social Club operano in un'area grigia legale.",
    munchie: "Churros caldi",
    checkpoints: [
      {
        title: "Uscita da un Social Club a Barcellona",
        text: "I Mossos d'Esquadra ti aspettano fuori. Sanno che hai appena ritirato materiale per la missione.",
        options: [
          { label: "Usa 'Via di Fuga'", power: "via_fuga", result: "success", text: "Sbuchi dall'uscita di emergenza posteriore ed eviti la pattuglia.", successParanoia: 0 },
          { label: "Nascondi tutto nell'intimo", difficulty: 5, successText: "Perquisizione superficiale per strada. La Ley Mordaza stavolta non ti colpisce.", failText: "Controllo invasivo. Trovano l'erba. Multa salatissima in strada.", successParanoia: 10, failParanoia: 50, failStash: -4, failCoins: -150 },
          { label: "Unisciti a una festa di addio al nubilato", difficulty: 3, successText: "Ti mascheri tra piume rosa e fischietti. I poliziotti ridono e le ragazze ti offrono da bere.", failText: "Le ragazze litigano con la polizia e vieni coinvolto. Tutti schedati.", successParanoia: 10, successEnergy: 10, failParanoia: 40, failStash: -2, failCoins: -80 }
        ]
      },
      {
        title: "Barceloneta sotto il sole",
        text: "La polizia locale in quad pattuglia la spiaggia. Lupo potrebbe aver piazzato informatori tra i venditori ambulanti.",
        options: [
          { label: "Usa 'Scammuffo'", power: "scammuffo", result: "success", text: "Ti cospargi di crema solare e spray neutralizzante. Sembri un turista qualcunque.", successParanoia: 0 },
          { label: "Nascondi i semi in un castello di sabbia", difficulty: 6, successText: "Il quad passa senza distruggerlo. Recuperi il bottino intatto.", failText: "Un bambino calpesta il castello! Perdi la roba nella sabbia.", successParanoia: 10, failParanoia: 35, failStash: -6 },
          { label: "Compra Mojito per i venditori per fare caciara (Azzardo)", difficulty: 7, successText: "Il caos di venditori crea un muro umano e i turisti ti lasciano una grossa mancia per lo show.", failText: "La polizia fa una retata sui venditori di Mojito e finisci in mezzo ai fermi.", successParanoia: 15, successCoins: 80, failParanoia: 60, failStash: -3, failCoins: -100 }
        ]
      },
      {
        title: "Check-in al Traghetto per Ibiza",
        text: "Ispettore Lupo è al varco. Sta ispezionando personalmente i bagagli a mano.",
        options: [
          { label: "Usa 'Collirio'", power: "collirio", result: "success", text: "Sostieni lo sguardo di Lupo con fermezza assoluta. Lui tentenna e ti lascia passare.", successParanoia: 0 },
          { label: "Metti lo zaino in fondo a un carrello bagagli enorme", difficulty: 5, successText: "Lupo, sfinito, guarda solo le valigie in cima. Passi miracolosamente.", failText: "Lupo fa svuotare tutto il carrello. Trovano lo zaino. Multa e confisca.", successParanoia: 10, failParanoia: 70, failStash: -8, failCoins: -200 },
          { label: "Infiltrati nella stiva VIP (Azzardo)", difficulty: 8, successText: "Zero controlli! Trovi una festa privata e i marinai ti regalano erba spagnola clamorosa.", failText: "Un marinaio ti becca e ti denuncia a Lupo. Il viaggio è un inferno.", successParanoia: 15, successStash: 8, failParanoia: 90, failStash: -10, failCoins: -150 }
        ]
      }
    ]
  },
  {
    id: 6, name: "Regno Unito", flag: "🇬🇧", status: "ILLEGALE",
    desc: "Classificata come droga di 'Classe B'. Il possesso può comportare fino a 5 anni di carcere, sebbene piccole quantità portino spesso solo a multe o avvertimenti.",
    munchie: "Fish & Chips e Vinegar",
    checkpoints: [
      {
        title: "Dogana di Dover",
        text: "Border Force con cani molecolari e l'Ispettore Lupo che supervisiona i monitor a raggi X.",
        options: [
          { label: "Usa 'Scammuffo'", power: "scammuffo", result: "success", text: "Le confezioni sottovuoto e lo spray schermano ogni odore e radiazione. Entri nel Regno.", successParanoia: 0 },
          { label: "Mettiti d'accordo con un camionista ignaro", difficulty: 7, successText: "Incolli il pacchetto sotto al rimorchio di un camion. Lo recuperi oltre il confine sano e salvo.", failText: "Il camionista se ne accorge prima dell'imbarco e lo getta via. Perdi metà stash.", successParanoia: 15, failParanoia: 60, failStash: -6 },
          { label: "Fingi un malore estremo (Azzardo)", difficulty: 8, successText: "Il caos obbliga i medici a farti passare in ambulanza e rubi antidolorifici e contanti dall'ambulanza stessa.", failText: "Lupo interviene e capisce che stai fingendo. Arresto doganale immediato.", successParanoia: 15, successCoins: 120, failParanoia: 90, failStash: -10, failCoins: -300 }
        ]
      },
      {
        title: "Le Strade di Camden",
        text: "Mentre cerchi un rifugio, una telecamera CCTV collegata a un sistema di riconoscimento facciale ti aggancia.",
        options: [
          { label: "Usa 'Via di Fuga'", power: "via_fuga", result: "success", text: "Scompari dentro un mercato sotterraneo di dischi punk. Il sistema ti perde.", successParanoia: 0 },
          { label: "Copri il viso con sciarpa e occhiali", difficulty: 5, successText: "Eludi l'algoritmo di polizia predittiva. Riesci a respirare.", failText: "Una pattuglia a piedi insospettita dal tuo abbigliamento ti ferma. Sequestro e sanzione pesante.", successParanoia: 10, failParanoia: 70, failStash: -5, failCoins: -200 },
          { label: "Hackera il terminale della polizia (Azzardo)", difficulty: 9, successText: "Cancelli i tuoi dati e ti autotrasferisci i fondi confescati dalla polizia. Sei un fantasma ricco!", failText: "Tracciano il tuo IP in tre secondi. Ti piomba addosso la SWAT britannica.", successParanoia: 15, successCoins: 300, failParanoia: 100, failStash: -10, failCoins: -300 }
        ]
      },
      {
        title: "La Metropolitana (Tube)",
        text: "Lupo chiude le porte del vagone da fuori. Sei in trappola, la polizia ti attende alla prossima fermata.",
        options: [
          { label: "Usa 'Collirio'", power: "collirio", result: "success", text: "Rimani glaciale. All'apertura delle porte cammini fiero tra gli agenti e passi inosservato.", successParanoia: 0 },
          { label: "Forza le porte d'emergenza", difficulty: 6, successText: "Riesci a scappare nel tunnel oscuro sfidando la sorte e trovi un borsone abbandonato.", failText: "Le porte non cedono. All'arrivo in stazione sei in manette.", successParanoia: 10, successStash: 5, successCoins: 50, failParanoia: 80, failStash: -8, failCoins: -250 },
          { label: "Tira il freno d'emergenza e scappa (Azzardo)", difficulty: 8, successText: "Frenata violenta! Nel panico sfuggi nella notte trovando uno zaino abbandonato pieno di energy drink.", failText: "Il treno si blocca, ma la polizia arriva dal tunnel. Nessuna via d'uscita.", successParanoia: 15, successEnergy: 20, failParanoia: 100, failStash: -12, failCoins: -400 }
        ]
      }
    ]
  },
  {
    id: 7, name: "Paesi Bassi", flag: "🇳🇱", status: "TOLLERATO",
    desc: "Famosi per i Coffeeshop, ma la produzione è illegale ('Backdoor problem'). Tollerato il possesso fino a 5g e 5 piante (Gedoogbeleid).",
    munchie: "Stroopwafel caldo al caramello",
    checkpoints: [
      {
        title: "Amsterdam Centraal",
        text: "Agenti in borghese pattugliano le uscite. Cercano chiunque abbia bagagli sospetti.",
        options: [
          { label: "Usa 'Scammuffo'", power: "scammuffo", result: "success", text: "Neutralizzi l'odore dei semi del Verde Assoluto e passi come un normale turista.", successParanoia: 0 },
          { label: "Infilati in un gruppo di ciclisti", difficulty: 4, successText: "Noleggi una bici al volo e sgommi via tra la folla. Che senso di libertà!", failText: "Cadi dalla bici. Gli agenti si avvicinano e ti perquisiscono trovando il grosso dello stash.", successParanoia: 10, failParanoia: 45, failStash: -5, failCoins: -80 },
          { label: "Aizza un gruppo di hooligans (Azzardo)", difficulty: 7, successText: "La polizia si distrae completamente per sedare la rissa. Nella confusione trovi portafogli a terra.", failText: "Gli hooligans se la prendono proprio con te e la polizia interviene arrestando tutti.", successParanoia: 15, successCoins: 100, failParanoia: 70, failStash: -4, failCoins: -100 }
        ]
      },
      {
        title: "Il Contatto nel Coffeeshop",
        text: "Il contatto vuole i semi. L'Ispettore Lupo entra improvvisamente dalla porta principale.",
        options: [
          { label: "Usa 'Via di Fuga'", power: "via_fuga", result: "success", text: "Scappi dal tetto usando la scala anti-incendio. I semi sono ancora con te.", successParanoia: 0 },
          { label: "Nascondi i semi sotto il tavolo", difficulty: 6, successText: "Lupo interroga te e il contatto, ma non trova prove. I semi sono salvi.", failText: "Lupo guarda sotto il tavolo. Trova il tuo stash, ma tu riesci a fuggire con i semi.", successParanoia: 10, failParanoia: 60, failStash: -8, failCoins: -100 },
          { label: "Scambia la busta con camomilla (Azzardo)", difficulty: 8, successText: "Gioco di prestigio pazzesco! Lupo requisisce la camomilla. Il contatto impressionato ti premia.", failText: "Lupo nota il trucco. Ti sbatte al muro. Multa colossale.", successParanoia: 15, successStash: 10, successCoins: 150, failParanoia: 90, failStash: -5, failCoins: -200 }
        ]
      },
      {
        title: "Canali di Notte",
        text: "Una motovedetta della polizia fluviale illumina la tua barchetta con un faro.",
        options: [
          { label: "Usa 'Canna di Pace'", power: "canna_pace", result: "success", text: "Offri ai poliziotti una birra artigianale dal frigo della barca. Spengono il faro e ti salutano.", successParanoia: 0 },
          { label: "Fingi di essere una coppia in vena romantica", difficulty: 3, successText: "Abbracci il primo sconosciuto sulla barca. La polizia ride e vi lascia in pace.", failText: "L'ufficiale riconosce la tua faccia dai file di Lupo. Controllo immediato e sequestro.", successParanoia: 10, failParanoia: 50, failStash: -6, failCoins: -120 },
          { label: "Tuffati nel canale gelato (Azzardo)", difficulty: 8, successText: "Nuoti fino alla riva opposta sfidando la morte. Nel fondale trovi un portafogli smarrito!", failText: "L'acqua è letale. La polizia ti 'salva' e ti arresta per direttissima.", successParanoia: 15, successCoins: 200, failParanoia: 80, failStash: -10, failCoins: -150 }
        ]
      }
    ]
  },
  {
    id: 8, name: "Repubblica Ceca", flag: "🇨🇿", status: "DECRIMINALIZZATO",
    desc: "Tra le più liberali: possesso fino a 10g e 5 piante depenalizzato dal 2010. Uso medico legale. Praga è la vera 'Amsterdam dell'Est'.",
    munchie: "Trdelník alla cannella",
    checkpoints: [
      {
        title: "Confine Ceco - L'ultimo Sbarramento",
        text: "Lupo in persona guida il posto di blocco al confine. È la resa dei conti.",
        options: [
          { label: "Usa 'Scammuffo'", power: "scammuffo", result: "success", text: "Il sistema di occultamento chimico è perfetto. I cani impazziscono ma le macchine tacciono. Passi.", successParanoia: 0 },
          { label: "Mostra permessi governativi falsi", difficulty: 7, successText: "I documenti sembrano firmati dal Ministro dell'Agricoltura. Lupo, furente, è costretto a farti passare.", failText: "Lupo riconosce il falso. Sequestra tutto lo stash, ma nella concitazione salvi i semi miracolosamente.", successParanoia: 15, failParanoia: 80, failStash: -15, failCoins: -300 },
          { label: "Sfondamento con l'auto (Azzardo)", difficulty: 9, successText: "Sfonda la sbarra a 150 km/h! Sei oltre il confine e trovi 300 euro sparsi nel cruscotto rotto!", failText: "Spuntoni per strada. Gomme bucate e fine della corsa. Perdi tutto.", successParanoia: 15, successCoins: 300, failParanoia: 100, failStash: -20, failCoins: -500 }
        ]
      },
      {
        title: "Laboratorio Clandestino a Praga",
        text: "Devi consegnare i semi per iniziare la coltivazione. Ma la mafia russa vuole la genetica.",
        options: [
          { label: "Usa 'Via di Fuga'", power: "via_fuga", result: "success", text: "Fuggi dai tetti di Praga portando i semi in un vero santuario sicuro.", successParanoia: 0 },
          { label: "Negozia con i russi", difficulty: 6, successText: "Cedi alcune talee minori in cambio di protezione e soldi. Un accordo eccellente.", failText: "I russi non vogliono negoziare. Ti rubano soldi ed erba, ma nascondi i semi nel pavimento.", successParanoia: 10, successCoins: 150, failParanoia: 70, failStash: -8, failCoins: -200 },
          { label: "Sfida il capo a braccio di ferro (Azzardo)", difficulty: 8, successText: "Vinci clamorosamente! Guadagni il loro rispetto e un borsone di erba ceca potentissima.", failText: "Ti rompe il braccio. Perdi soldi e stash per pagare i medici clandestini.", successParanoia: 15, successStash: 15, successCoins: 200, failParanoia: 90, failStash: -10, failCoins: -250 }
        ]
      },
      {
        title: "La Collina del Verde Assoluto",
        text: "Sei arrivato. Pianti il primo seme, ma Lupo compare da dietro un albero. 'È finita'.",
        options: [
          { label: "Usa 'Canna di Pace'", power: "canna_pace", result: "success", text: "Offri a Lupo l'ultima canna. Lui, stremato, accetta. Fumate assieme ammirando Praga. Hai vinto.", successParanoia: 0 },
          { label: "Discorso Epico sulle Libertà", difficulty: 7, successText: "Le tue parole commuovono Lupo, che non solo si ritira, ma ti dona la taglia che aveva su di te per la tua missione!", failText: "Lupo è cinico. Ti arresta a un passo dal traguardo. Ma il seme ormai è nella terra.", successParanoia: 15, successCoins: 500, failParanoia: 100, failStash: -20, failCoins: -500 },
          { label: "Scompare in una nuvola fumogena (Azzardo)", difficulty: 9, successText: "Ninja style! Scompari rubando la sacca delle prove a Lupo. La leggenda è nata.", failText: "Il fumogeno fa cilecca. Lupo ti ammanetta scuotendo la testa.", successParanoia: 15, successStash: 20, successCoins: 1000, failParanoia: 100, failStash: -20, failCoins: 0 }
        ]
      }
    ]
  }
];

export const ARCHETYPES = [
  { id: "accademico", name: "L'Accademico Razionale", role: "Matematico", emoji: "👨‍🏫", desc: "Paga il 15% in meno nel negozio e riduce la Paranoia.", bonus: "Sconto 15%, Paranoia ridotta", stats: { stash: 12, paranoia: 15, energy: 90, coins: 350 }, passive: (state) => ({ ...state, paranoiaGrowthModifier: 0.75 }) },
  { id: "coltivatore", name: "Il Coltivatore Esperto", role: "Pollice Verde", emoji: "👨‍🌾", desc: "Genera +1g ad ogni livello superato.", bonus: "+1g gratis a livello", stats: { stash: 18, paranoia: 25, energy: 80, coins: 250 }, passive: null },
  { id: "pendolare", name: "Il Pendolare Schengen", role: "Esperto Treni", emoji: "🎒", desc: "Probabilità del 20% di superare i dadi difficili in automatico.", bonus: "Dadi bypass, più monete", stats: { stash: 10, paranoia: 20, energy: 100, coins: 400 }, passive: null, unlockCost: 400 },
  { id: "guru", name: "Il Guru della Canapa", role: "Filosofo", emoji: "🧙‍♂️", desc: "Inizia con poteri speciali e tolleranza alta.", bonus: "2 poteri extra", stats: { stash: 15, paranoia: 10, energy: 85, coins: 200 }, passive: null, unlockCost: 1000 },
  { id: "avvocato", name: "L'Avvocato dei Fattoni", role: "Difensore Legale", emoji: "💼", desc: "Parla fluentemente il 'legalese'. Parte con molte monete per pagare multe o corrompere e una paranoia bassissima.", bonus: "Tantissime Monete, Paranoia Base Bassa", stats: { stash: 8, paranoia: 5, energy: 80, coins: 800 }, passive: null, unlockCost: 1800 },
  { id: "europarlamentare", name: "L'Europarlamentare Green", role: "Diplomatico", emoji: "🇪🇺", desc: "Sfrutta l'immunità diplomatica per viaggiare con scorte industriali. Ha un budget infinito e viaggia comodissimo.", bonus: "Stash immenso, Energia massima, Denaro illimitato", stats: { stash: 35, paranoia: 0, energy: 150, coins: 1500 }, passive: null, unlockCost: 3500 }
];

export const SHOP_ITEMS = [
  { id: "tisana_reset", name: "Tisana del Reset (Vita Extra)", desc: "Riparti con karma pulito se fallisci. Aggiunge 1 Vita.", cost: 100, emoji: "❤️" },
  { id: "scammuffo", name: "Spray Scammuffo", desc: "Bypassa i checkpoint per cani e odori al 100%.", cost: 40, emoji: "🧴" },
  { id: "collirio", name: "Collirio Rinfrescante", desc: "Sgonfia l'ansia da contatto visivo con la polizia.", cost: 30, emoji: "💧" },
  { id: "canna_pace", name: "Canna di Pace", desc: "Corrompe o distrae pacificamente i civili/guardie.", cost: 50, emoji: "🕊️" },
  { id: "via_fuga", name: "Via di Fuga", desc: "Fuggi da controlli di blocco improvvisi.", cost: 60, emoji: "🏃" },
  { id: "munchie_kit", name: "Kit Munchies", desc: "Ripristina 40% Energia e cura la Fame Chimica.", cost: 25, emoji: "🍕" }
];
