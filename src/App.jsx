import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { COUNTRIES, LEGISLATION_TYPES } from './data/constants';
import { sounds } from './audio/SoundEngine';
import { addKarma } from './data/progressManager';

import IntroScreen from './components/IntroScreen';
import GameHeader from './components/GameHeader';
import PlayingScreen from './components/PlayingScreen';
import ShopModal from './components/ShopModal';
import OutcomeModal from './components/OutcomeModal';
import InfoPanel from './components/InfoPanel';
import ReflexModal from './components/ReflexModal';
import EndScreen from './components/EndScreen';

export default function App() {
  const [gameState, setGameState] = useState("INTRO"); // INTRO, PLAYING, LEVEL_SUCCESS, GAMEOVER, VICTORY
  const [character, setCharacter] = useState(null);
  const [level, setLevel] = useState(0); 
  const [checkpointIndex, setCheckpointIndex] = useState(0);
  
  // Game Resources
  const [stash, setStash] = useState(10);
  const [paranoia, setParanoia] = useState(20);
  const [energy, setEnergy] = useState(100);
  const [coins, setCoins] = useState(100);
  const [lives, setLives] = useState(3);
  const [inventory, setInventory] = useState({
    scammuffo: 1,
    collirio: 1,
    canna_pace: 0,
    via_fuga: 0
  });

  const [munchies, setMunchies] = useState(false); // Fame Chimica

  // UI State
  const [logText, setLogText] = useState("");
  const [outcomeType, setOutcomeType] = useState(null);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [lastDeltas, setLastDeltas] = useState(null); // Traccia le variazioni per mostrarle a schermo
  
  const [earnedKarma, setEarnedKarma] = useState(0);

  // Reflex State
  const [showReflexModal, setShowReflexModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const [levelCheckpoints, setLevelCheckpoints] = useState([]);

  // BGM Ambient (Tranquillità) e Gestione Volume
  useEffect(() => {
    if (gameState === "PLAYING") {
      sounds.stopIntroMusic();
      sounds.startBGM();
      sounds.setParanoiaLevel(paranoia);
    } else if (gameState === "INTRO") {
      sounds.stopBGM();
      // Ritardiamo leggermente l'avvio della musica intro per permettere il primo click unlock (gestito da Howler)
      // ma dato che autoUnlock è attivo, se l'utente è appena arrivato non suonerà finché non fa click.
      sounds.startIntroMusic();
    } else {
      sounds.stopBGM();
      sounds.stopIntroMusic();
    }
  }, [gameState, paranoia]);

  // Orchestrazione Effetti Sonori di Stato
  useEffect(() => {
    // Ora il motore audio gestisce tutto dinamicamente in base allo stato
    // senza bisogno di intervalli che sparano suoni sintetizzati
  }, [paranoia, gameState, munchies, energy]);

  // Intro -> Seleziona personaggio
  const handleSelectCharacter = (arch) => {
    sounds.playBubble();
    sounds.stopIntroMusic(); // Stoppa forzatamente ed immediatamente la musica qui
    
    setCharacter(arch);
    setStash(arch.stats.stash);
    setParanoia(arch.stats.paranoia);
    setEnergy(arch.stats.energy);
    setCoins(arch.stats.coins);
    setLives(3);
    setEarnedKarma(0);
    setMunchies(false);
    
    if (arch.id === "guru") {
      setInventory({ scammuffo: 2, collirio: 2, canna_pace: 1, via_fuga: 1 });
    } else {
      setInventory({ scammuffo: 1, collirio: 1, canna_pace: 0, via_fuga: 0 });
    }

    setLevel(0);
    setCheckpointIndex(0);
    
    // Pick random 3 checkpoints for level 0
    const country = COUNTRIES[0];
    const shuffled = [...country.checkpoints].sort(() => 0.5 - Math.random());
    setLevelCheckpoints(shuffled.slice(0, 3));
    
    setGameState("PLAYING");
  };

  const currentCountry = COUNTRIES[level];
  const currentCheckpoint = levelCheckpoints[checkpointIndex];

  // Logic azione
  const handleAction = (option) => {
    sounds.playClick();
    
    if (option.power) {
      if (inventory[option.power] <= 0) {
        setLogText("Non hai questo potere nel tuo zaino! Devi inventarti qualcos'altro o fare un salto al negozio di ristoro.");
        setOutcomeType("fail");
        setShowOutcomeModal(true);
        sounds.playFail();
        return;
      }
      setInventory(prev => ({ ...prev, [option.power]: prev[option.power] - 1 }));
      applyOutcome(option, true);
    } else {
      const dangerFactor = LEGISLATION_TYPES[currentCountry.status].danger;
      let target = Math.ceil(option.difficulty + (dangerFactor / 2));
      
      // Il malus della paranoia influisce solo sulla velocità del cursore in ReflexModal.
      // Malus: Se lo stash è grosso (>= 15g), c'è odore ed è sospetto. +1 alla difficoltà.
      if (stash >= 15) {
        target += 1;
      }
      
      setPendingAction({ option, target });
      setShowReflexModal(true);
    }
  };

  const handleReflexComplete = (roll) => {
    setShowReflexModal(false);
    const { option, target } = pendingAction;
    
    let isSuccess = roll >= target;
    let isCommuterBypass = false;

    if (!isSuccess && character.id === "pendolare" && Math.random() < 0.20) {
      isSuccess = true;
      isCommuterBypass = true;
    }

    applyOutcome(option, isSuccess, isCommuterBypass);
    setPendingAction(null);
  };

  const applyOutcome = (option, isSuccess, isCommuterBypass = false) => {
    let text = "";
    let deltaParanoia = 0;
    let deltaStash = 0;
    let deltaCoins = 0;
    let deltaEnergy = munchies ? -10 : -5; 

    if (isSuccess) {
      setOutcomeType("success");
      sounds.playChime(); // Suono di successo!
      text = option.power ? option.text : option.successText;
      
      if (isCommuterBypass) {
        text = "🎒 [PENDOLARE SCHENGEN] Hai fallito malamente l'azione, ma un ispettore ha visto il tuo abbonamento ferroviario internazionale e ti ha fatto passare per pena! " + text;
      }

      deltaParanoia = option.successParanoia !== undefined ? option.successParanoia : -10;
      deltaStash = option.successStash !== undefined ? option.successStash : 0;
      deltaCoins = option.successCoins !== undefined ? option.successCoins : 0;
      if (option.successEnergy !== undefined) deltaEnergy += option.successEnergy;
      
      // Meccanica Adrenalina: Se la paranoia è >= 80 e non è un potere (è un check di abilità/dado vinto)
      if (!option.power && paranoia >= 80) {
        deltaEnergy += 10;
        text += " [ADRENALINA: Il brivido del pericolo ti ha rigenerato +10 Energia!]";
      }
    } else {
      setOutcomeType("fail");
      text = option.failText;
      
      const status = currentCountry.status;
      const isSevere = status === "ILLEGALE" || status === "SEVERO";
      const isDecrim = status === "DECRIMINALIZZATO";

      if (isSevere) {
        deltaParanoia = 50 - paranoia; // Resetta a 50 per evitare il doppio malus (Attacco di panico subito dopo)
        deltaCoins = -200;
        deltaStash = -10;
        text += " (Fermo di polizia: Hai perso 1 Vita e gran parte del carico. Lo shock azzera la paranoia!)";
        setLives(prev => prev - 1);
      } else if (isDecrim) {
        deltaParanoia = 25;
        deltaCoins = -150;
        deltaStash = -5;
        text += " (Multa salata: Hai perso monete e parte del carico!)";
      } else {
        deltaParanoia = 15;
        deltaCoins = -80;
        deltaStash = -2;
        text += " (Multa amministrativa: Piccola perdita di risorse.)";
      }

      // Override se ci sono valori espliciti (es. Azzardi)
      if (option.failParanoia !== undefined) deltaParanoia = option.failParanoia;
      if (option.failStash !== undefined) deltaStash = option.failStash;
      if (option.failCoins !== undefined) deltaCoins = option.failCoins;
      
      // Controllo bancarotta: se non puoi pagare la multa
      if (coins + deltaCoins < 0) {
        let remaining = Math.abs(coins + deltaCoins);
        deltaCoins = -coins; // Azzerato
        let extraSequestro = Math.ceil(remaining / 20);
        deltaStash -= extraSequestro;
        text += ` Non avendo abbastanza soldi per la multa, ti hanno sequestrato altri ${extraSequestro}g!`;
      }
    }

    if (character.id === "accademico" && deltaParanoia > 0) {
      deltaParanoia = Math.round(deltaParanoia * 0.75);
    }

    setParanoia(prev => Math.min(100, Math.max(0, prev + Math.round(deltaParanoia))));
    setStash(prev => Math.max(0, prev + deltaStash));
    setCoins(prev => prev + deltaCoins);
    setEnergy(prev => Math.max(0, prev + deltaEnergy));
    setLogText(text);
    setLastDeltas({ paranoia: Math.round(deltaParanoia), energy: deltaEnergy, stash: deltaStash, coins: deltaCoins });
    
    // Mostriamo il modal di outcome
    // Attendiamo un pizzico se veniamo dal dado per evitare flash di modali
    setTimeout(() => {
      setShowOutcomeModal(true);
    }, 100);
  };

  const endGame = (isVictory) => {
    const baseKarma = (level * 100) + (isVictory ? 1000 : 0);
    const bonusKarma = Math.floor(coins * 1.5); // 1.5 Karma for every coin left
    const totalKarma = baseKarma + bonusKarma;
    addKarma(totalKarma);
    setEarnedKarma(totalKarma);
    
    setGameState(isVictory ? "VICTORY" : "GAMEOVER");
    if (isVictory) sounds.playChime();
    else sounds.playFail();
  };

  const handleNext = () => {
    setShowOutcomeModal(false);

    let currentLives = lives;
    let par = paranoia;
    let ene = energy;
    let sta = stash;
    
    if (currentLives <= 0) {
      setLogText("Hai esaurito tutti i tentativi (Vite). Hai rinunciato alla missione e sei tornato a casa. Gioco finito.");
      endGame(false);
      return;
    }

    // Controlliamo i malus di stato critico (Panic Attack o Svenimento)
    if (par >= 100) {
      currentLives -= 1;
      setLives(currentLives);
      setParanoia(50); // Reset parziale dopo l'attacco di panico
      setStash(prev => Math.max(0, prev - 5)); // Perde molta roba fuggendo
      setLogText("Hai avuto un attacco di panico enorme! Hai buttato via un bel po' di roba e sei fuggito al prossimo step. (Hai perso 1 Vita).");
      setOutcomeType("fail");
      setTimeout(() => setShowOutcomeModal(true), 100);
      return; // Rimane nel modal e aspetta il prossimo next
    }

    if (ene <= 0) {
      setEnergy(50); // Reset energia ma senza perdere vita
      setLogText("Sei svenuto per la stanchezza in mezzo alla strada. Al risveglio sei confuso e disorientato.");
      setParanoia(prev => Math.min(100, prev + 25));
      setOutcomeType("fail");
      setTimeout(() => setShowOutcomeModal(true), 100);
      return; // Rimane nel modal
    }

    // Se finisci lo stash, il viaggio continua comunque. Non si perde per mancanza di erba.

    // Passiamo al prossimo checkpoint indipendentemente dal successo o fallimento (se siamo ancora vivi)
    if (checkpointIndex + 1 < levelCheckpoints.length) {
      setCheckpointIndex(prev => prev + 1);
    } else {
      if (level === COUNTRIES.length - 1) {
        endGame(true);
      } else {
        if (character.id === "coltivatore") {
          setStash(prev => prev + 1);
        }
        // Nessun punto di ristoro: il viaggio è crudele e l'energia non si recupera automaticamente
        setGameState("LEVEL_SUCCESS");
        sounds.playBorderPass();
      }
    }
  };

  const startNextLevel = () => {
    sounds.stopBorderPass && sounds.stopBorderPass();
    const nextLevel = level + 1;
    setLevel(nextLevel);
    setCheckpointIndex(0);
    
    const country = COUNTRIES[nextLevel];
    if (country) {
      const shuffled = [...country.checkpoints].sort(() => 0.5 - Math.random());
      setLevelCheckpoints(shuffled.slice(0, 3));
    }
    
    setGameState("PLAYING");
  };

  const handleBuyItem = (item) => {
    const cost = character.id === "accademico" ? Math.round(item.cost * 0.85) : item.cost;
    if (coins >= cost) {
      sounds.playBubble();
      setCoins(prev => prev - cost);
      
      if (item.id === "buy_weed") {
        setStash(prev => prev + 5);
      } else if (item.id === "tisana_reset") {
        setLives(prev => prev + 1);
      } else if (item.id === "munchie_kit") {
        setEnergy(prev => Math.min(100, prev + 40));
        setMunchies(false);
      } else {
        setInventory(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
      }
    } else {
      sounds.playFail();
    }
  };

  const handleSellStash = () => {
    if (stash >= 5) {
      sounds.playBubble();
      setStash(prev => Math.max(0, prev - 5));
      setCoins(prev => prev + 50);
    } else {
      sounds.playFail();
    }
  };

  const restartGame = () => {
    setCharacter(null);
    setGameState("INTRO");
  };

  const handleSmoke = () => {
    if (stash >= 2 && energy >= 15 && paranoia > 0) {
      if (sounds.playSmoke) sounds.playSmoke();
      setStash(prev => Math.max(0, prev - 2));
      setEnergy(prev => Math.max(0, prev - 15));
      setParanoia(prev => Math.max(0, prev - 25));
      setMunchies(true);
    } else {
      sounds.playFail();
    }
  };

  const isHighParanoia = paranoia >= 70;
  const isCriticalParanoia = paranoia >= 85;

  return (
    <div className={`min-h-screen flex flex-col relative pb-safe transition-colors duration-1000 ${isCriticalParanoia ? 'bg-red-950/20' : ''}`}>
      {/* Vignetta rossa per paranoia */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500" 
        style={{ 
          boxShadow: isHighParanoia ? 'inset 0 0 150px rgba(220, 38, 38, 0.4)' : 'none',
          opacity: isCriticalParanoia ? 1 : (isHighParanoia ? 0.5 : 0) 
        }} 
      />
      
      <AnimatePresence mode="wait">
        {gameState === "INTRO" && (
          <IntroScreen key="intro" onSelect={handleSelectCharacter} sounds={sounds} />
        )}

        {gameState === "PLAYING" && (
          <motion.div 
            key="playing" 
            className="flex flex-col min-h-screen w-full relative z-10"
            animate={isCriticalParanoia ? { x: [-2, 2, -2, 2, 0] } : {}}
            transition={isCriticalParanoia ? { repeat: Infinity, duration: 0.5 } : {}}
          >
            <GameHeader 
              stash={stash} 
              paranoia={paranoia} 
              energy={energy} 
              coins={coins} 
              lives={lives}
              munchies={munchies}
              inventory={inventory}
              onOpenShop={() => setShowShopModal(true)} 
              sounds={sounds}
            />
            <PlayingScreen 
              currentCountry={currentCountry} 
              currentCheckpoint={currentCheckpoint} 
              inventory={inventory}
              onAction={handleAction} 
              onSmoke={handleSmoke}
              onShowInfo={() => setShowInfoPanel(true)} 
              sounds={sounds}
            />
          </motion.div>
        )}

        {gameState === "LEVEL_SUCCESS" && (
          <motion.div 
            key="level_success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10"
          >
            <h2 className="text-4xl font-black text-neon-green text-glow-green mb-4 uppercase">
              Confine Superato!
            </h2>
            <p className="text-xl text-gray-300 mb-6">Hai superato indenne {currentCountry.name}.</p>
            
            <div className="bg-black/60 border border-white/10 p-6 rounded-2xl mb-8 flex flex-col items-center shadow-inner">
              <span className="text-4xl mb-2">🛂</span>
              <p className="text-gray-300 font-bold mb-2">Confine Superato</p>
              <p className="text-sm text-gray-400 max-w-sm">Ti lasci alle spalle {currentCountry.name}, ma il viaggio è lungo. Non hai tempo di riposarti né di mangiare, devi muoverti. L'ombra di Lupo potrebbe essere già dietro l'angolo.</p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { sounds.playClick(); startNextLevel(); }}
              className="bg-neon-green text-black font-bold text-xl py-4 px-10 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.5)]"
            >
              Prossima Tappa
            </motion.button>
          </motion.div>
        )}

        {(gameState === "GAMEOVER" || gameState === "VICTORY") && (
          <EndScreen
            key="endscreen"
            isVictory={gameState === "VICTORY"}
            character={character}
            stats={{ stash, coins, lives, level }}
            earnedKarma={earnedKarma}
            logText={logText}
            onRestart={restartGame}
            sounds={sounds}
          />
        )}
      </AnimatePresence>

      <ShopModal 
        isOpen={showShopModal} 
        onClose={() => setShowShopModal(false)} 
        coins={coins} 
        inventory={inventory} 
        character={character} 
        stash={stash}
        onBuy={handleBuyItem} 
        onSell={handleSellStash}
        sounds={sounds}
        currentCountry={COUNTRIES[level]}
      />
      
      <ReflexModal
        isOpen={showReflexModal}
        target={pendingAction?.target}
        paranoia={paranoia}
        munchies={munchies}
        sounds={sounds}
        onComplete={handleReflexComplete}
      />

      <OutcomeModal 
        isOpen={showOutcomeModal} 
        outcomeType={outcomeType} 
        logText={logText} 
        deltas={lastDeltas}
        onNext={handleNext} 
        sounds={sounds}
      />

      <InfoPanel 
        isOpen={showInfoPanel} 
        onClose={() => setShowInfoPanel(false)} 
        currentCountry={currentCountry} 
        sounds={sounds}
      />
    </div>
  );
}
