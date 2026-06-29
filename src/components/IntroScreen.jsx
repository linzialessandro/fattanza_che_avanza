import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ARCHETYPES } from '../data/constants';
import { 
  Leaf, Lock, Unlock, Settings, Copy, Download, Upload, Info, X, 
  GraduationCap, Sprout, Briefcase, Sparkles, Scale, Landmark,
  Coins, Zap, Eye
} from 'lucide-react';
import { getProgress, unlockArchetype, exportProgress, importProgress } from '../data/progressManager';

const archetypeIcons = {
  "accademico": GraduationCap,
  "coltivatore": Sprout,
  "pendolare": Briefcase,
  "guru": Sparkles,
  "avvocato": Scale,
  "europarlamentare": Landmark
};

export default function IntroScreen({ onSelect, sounds }) {
  const [progress, setProgress] = useState(getProgress());

  const [showSettings, setShowSettings] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [importCode, setImportCode] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const [exportMessage, setExportMessage] = useState("");
  const [importMessage, setImportMessage] = useState("");

  const handleStartInteraction = () => {
    setHasInteracted(true);
    sounds.playClick();
  };

  const handleArchetypeClick = (arch) => {
    const isUnlocked = progress.unlockedArchetypes.includes(arch.id);
    if (isUnlocked) {
      onSelect(arch);
    } else {
      const result = unlockArchetype(arch.id, arch.unlockCost);
      if (result.success) {
        sounds.playChime();
        setProgress(result.progress);
      } else {
        sounds.playFail();
      }
    }
  };

  const handleExport = () => {
    const code = exportProgress();
    navigator.clipboard.writeText(code);
    setExportMessage("Copiato!");
    setTimeout(() => setExportMessage(""), 3000);
  };

  const handleImport = () => {
    if (!importCode) return;
    const result = importProgress(importCode);
    if (result.success) {
      sounds.playChime();
      setProgress(result.progress);
      setImportMessage("Importato con successo!");
      setTimeout(() => {
        setImportMessage("");
        setShowSettings(false);
      }, 2000);
      setImportCode("");
    } else {
      sounds.playFail();
      setImportMessage("Codice non valido.");
      setTimeout(() => setImportMessage(""), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 w-full"
    >
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-cyber-dark overflow-y-auto w-full"
          >
            <div className="min-h-screen flex flex-col items-center justify-center py-8">
              <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-green-dim via-cyber-dark to-cyber-darker z-0 pointer-events-none"></div>
            
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            >
               <Leaf className="w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] text-neon-green mix-blend-screen" />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-4xl">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-12 flex flex-col items-center w-full"
              >
                <Leaf className="w-20 h-20 md:w-28 md:h-28 text-neon-green mb-6 drop-shadow-[0_0_30px_rgba(57,255,20,1)]" />
                <h1 className="text-5xl md:text-8xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-neon-green to-green-800 text-center uppercase tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,1)] leading-none text-glow-green">
                  Fattanza<br/>che Avanza
                </h1>
                <p className="text-xl md:text-3xl mt-6 text-green-200 font-display font-light tracking-[0.3em] md:tracking-[0.5em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Eurotrip 2026</p>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 60px rgba(57, 255, 20, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartInteraction}
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-neon-green text-black font-black text-2xl md:text-4xl px-10 md:px-16 py-5 md:py-8 rounded-full shadow-[0_0_40px_rgba(57,255,20,0.6)] uppercase tracking-widest mb-8 transition-all border-4 border-black font-display"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 md:gap-4 w-full">
                  <Leaf className="w-6 h-6 md:w-8 md:h-8 animate-pulse text-green-900" />
                  Inizia Viaggio
                  <Leaf className="w-6 h-6 md:w-8 md:h-8 animate-pulse text-green-900" />
                </span>
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { sounds.playClick && sounds.playClick(); setShowInstructionsModal(true); }}
                className="bg-cyber-surface/90 text-gray-300 font-bold text-lg md:text-xl px-10 py-4 rounded-full border border-white/10 hover:border-neon-green/60 hover:text-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all backdrop-blur-sm font-display"
              >
                Istruzioni e Info
              </motion.button>

              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-10 flex items-center gap-3 bg-black/50 px-6 py-2 rounded-full border border-white/10"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-red shadow-[0_0_10px_rgba(255,42,42,0.8)]"></span>
                </span>
                <p className="text-gray-300 text-xs md:text-sm tracking-widest uppercase font-semibold">
                  Attiva l'audio per un'esperienza immersiva
                </p>
              </motion.div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 relative"
      >
        <Leaf className="w-20 h-20 text-neon-green mx-auto mb-4 drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]" />
        <h1 className="text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue text-glow-green uppercase tracking-widest leading-tight">
          Fattanza<br />che Avanza
        </h1>
        <p className="text-xl mt-2 text-gray-400 font-light font-display tracking-wider">Eurotrip 2026</p>
      </motion.div>

      <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-30">
        <div className="glass-card rounded-xl p-3 flex flex-col items-center">
          <span className="text-xs text-purple-300 font-bold uppercase tracking-wider mb-1">Karma Accumulato</span>
          <span className="text-2xl font-black font-display text-neon-purple text-glow-purple flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> {progress.karma}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { sounds.playClick(); setShowInfoModal(true); }}
            className="glass-card p-2 rounded-full hover:bg-white/10 hover:border-neon-blue/50 transition-colors"
          >
            <Info className="w-5 h-5 text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
          </button>
          <button
            onClick={() => { sounds.playClick(); setShowSettings(!showSettings); }}
            className="glass-card p-2 rounded-full hover:bg-white/10 hover:border-gray-400/50 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showInfoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl glass-panel border-neon-blue/30 rounded-2xl p-8 relative shadow-[0_0_30px_rgba(0,243,255,0.15)]"
            >
              <button 
                onClick={() => { sounds.playClick(); setShowInfoModal(false); }} 
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-8 h-8 text-neon-blue drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
                <h2 className="text-3xl font-bold font-display text-white">Il Progetto Fattanza</h2>
              </div>
              
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed text-left font-sans">
                <p>
                  <strong className="text-white">Fattanza che Avanza: Eurotrip 2026</strong> nasce come progetto educativo sperimentale che utilizza la gamification per far luce sulla complessa e frammentata situazione legislativa riguardante la cannabis in Europa.
                </p>
                <p>
                  Il gioco non è un invito al consumo o al traffico di sostanze illegali, azioni che condanniamo e sconsigliamo. Piuttosto, mira a evidenziare le incoerenze tra nazioni confinanti nell'Area Schengen, dove le normative variano drasticamente da un sistema legale regolamentato, alla tolleranza, fino a sanzioni penali severe.
                </p>
                <p>
                  Le dinamiche del gioco, incluse le scelte strategiche e la gestione del rischio (basate su logiche di <em>Teoria dei Giochi</em>), riflettono metaforicamente lo stress, i pericoli e le assurdità affrontate da chi viaggia a causa della mancanza di una legislazione armonizzata.
                </p>
                <div className="bg-neon-blue/10 border border-neon-blue/30 p-4 rounded-xl mt-6">
                  <p className="text-neon-blue font-bold mb-2 flex items-center gap-2"><Info className="w-4 h-4"/> Fonti e Dati</p>
                  <p className="text-sm">Le informazioni legali presenti nel gioco per le varie nazioni sono tratte da dati storici e di dominio pubblico aggiornati. Per un quadro completo e reale sulla legislazione europea e globale in merito, puoi consultare la pagina Wikipedia dedicata:</p>
                  <a href="https://it.wikipedia.org/wiki/Legalità_della_cannabis" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold underline hover:text-blue-300 block mt-2 break-all">
                    https://it.wikipedia.org/wiki/Legalità_della_cannabis
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInstructionsModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl glass-panel border-neon-green/30 rounded-2xl p-8 relative overflow-y-auto max-h-[90vh] shadow-[0_0_30px_rgba(57,255,20,0.15)]"
            >
              <button 
                onClick={() => { sounds.playClick && sounds.playClick(); setShowInstructionsModal(false); }} 
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-4xl font-black font-display text-neon-green mb-8 uppercase text-center tracking-wider text-glow-green">Istruzioni di Gioco</h2>
              
              <div className="space-y-6 text-gray-300 text-sm leading-relaxed text-left font-sans">
                <div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2 flex items-center gap-2"><Sparkles className="text-neon-purple w-5 h-5"/> Obiettivo</h3>
                  <p>Attraversa i paesi dell'Area Schengen sopravvivendo ai controlli. Ogni nazione ha una propria legislazione sulle droghe leggere che influenza la difficoltà dei controlli.</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold font-display text-white mb-3 flex items-center gap-2"><Briefcase className="text-neon-blue w-5 h-5"/> Risorse</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="glass-card p-3 rounded-lg border-white/5"><strong className="text-green-400 flex items-center gap-2 mb-1"><Leaf className="w-4 h-4"/> Stash:</strong> La quantità di erba che porti con te. Più ne hai, più i controlli sono difficili (+1 difficoltà se &ge; 15g).</li>
                    <li className="glass-card p-3 rounded-lg border-white/5"><strong className="text-red-400 flex items-center gap-2 mb-1"><Eye className="w-4 h-4"/> Paranoia:</strong> Il tuo livello di stress. A 100 perdi una vita. Ad alta paranoia tutto trema.</li>
                    <li className="glass-card p-3 rounded-lg border-white/5"><strong className="text-yellow-400 flex items-center gap-2 mb-1"><Zap className="w-4 h-4"/> Energia:</strong> Scende col tempo. A 0 svieni (aumento drastico paranoia).</li>
                    <li className="glass-card p-3 rounded-lg border-white/5"><strong className="text-yellow-500 flex items-center gap-2 mb-1"><Coins className="w-4 h-4"/> Coins:</strong> Usale per corrompere, pagare multe o comprare oggetti allo shop.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-display text-white mb-3 flex items-center gap-2"><Settings className="text-gray-400 w-5 h-5"/> Meccaniche</h3>
                  <ul className="space-y-3">
                    <li className="glass-card p-4 rounded-lg border-white/5"><strong>Azione:</strong> Scegli se Nasconderti, Parlare, Scappare o usare Poteri. Affronterai una prova di riflessi: ferma il cursore nell'area verde! La larghezza dipende dalla difficoltà e dalla legislazione.</li>
                    <li className="glass-card p-4 rounded-lg border-white/5"><strong>Fumare:</strong> Consuma 2g e 15 Energia, abbassa drasticamente la Paranoia (-25). Causa "Fame Chimica" (prossime azioni costano -10 Energia invece di -5).</li>
                    <li className="glass-card p-4 rounded-lg border-white/5"><strong>Shop & Poteri:</strong> Accedi allo Shop per vendere/comprare stash, vite extra o "Poteri" speciali monouso come il Collirio o lo Scammuffo (successo automatico).</li>
                  </ul>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500 text-center uppercase tracking-widest">
                  Gioca responsabilmente
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm glass-panel border-neon-blue/30 rounded-xl p-6 mb-8 relative z-20 shadow-[0_0_20px_rgba(0,243,255,0.1)]"
          >
            <h4 className="text-neon-blue font-bold font-display text-lg mb-2 flex items-center gap-2"><Download className="w-5 h-5" /> Backup Dati</h4>
            <p className="text-xs text-gray-400 mb-4 text-left">Esporta o importa il tuo salvataggio tramite codice testo.</p>

            <button onClick={handleExport} className="w-full py-3 bg-purple-900/40 hover:bg-purple-800/60 border border-neon-purple/50 rounded-lg mb-2 text-sm text-purple-300 font-bold flex items-center justify-center gap-2 transition-colors">
              <Copy className="w-4 h-4" /> Copia Codice
            </button>
            {exportMessage && <p className="text-xs text-green-400 mb-3 font-bold">{exportMessage}</p>}
            {!exportMessage && <div className="mb-3"></div>}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Incolla codice qui..."
                className="flex-1 bg-black/60 border border-white/10 focus:border-neon-blue/50 outline-none rounded-lg px-3 text-sm text-white transition-colors"
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
              />
              <button onClick={handleImport} className="py-2 px-4 bg-neon-blue/20 hover:bg-neon-blue/40 border border-neon-blue/50 rounded-lg text-sm text-neon-blue font-bold flex items-center gap-2 transition-colors">
                <Upload className="w-4 h-4" /> Carica
              </button>
            </div>
            {importMessage && <p className={`text-xs mt-3 font-bold ${importMessage.includes("successo") ? "text-green-400" : "text-red-400"}`}>{importMessage}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {ARCHETYPES.map((arch, idx) => {
          const isUnlocked = progress.unlockedArchetypes.includes(arch.id);
          const canUnlock = !isUnlocked && progress.karma >= arch.unlockCost;
          const Icon = archetypeIcons[arch.id] || Sparkles;

          return (
            <motion.div
              key={arch.id}
              whileHover={isUnlocked ? { scale: 1.03 } : canUnlock ? { scale: 1.03 } : {}}
              whileTap={isUnlocked || canUnlock ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className={`glass-panel p-6 rounded-2xl cursor-pointer text-left relative overflow-hidden group transition-all duration-300
                ${!isUnlocked ? 'opacity-80 grayscale-[0.4]' : ''}
                ${isUnlocked ? 'hover:border-glow-green hover:border-neon-green/50' : canUnlock ? 'hover:border-glow-purple hover:border-neon-purple/50' : 'border-white/5'}
              `}
              onClick={() => handleArchetypeClick(arch)}
              onMouseEnter={() => (isUnlocked || canUnlock) && sounds.playHover()}
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500
                ${isUnlocked ? 'from-neon-green/10 to-transparent' : canUnlock ? 'from-neon-purple/10 to-transparent' : ''}`}></div>

              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-black/40 border ${isUnlocked ? 'border-neon-green/30 text-neon-green' : 'border-white/10 text-gray-400'} drop-shadow-md`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold font-display ${isUnlocked ? 'text-white text-glow-green' : 'text-gray-300'}`}>{arch.name}</h3>
                    <p className={`text-sm font-medium tracking-wide uppercase mt-1 ${isUnlocked ? 'text-neon-blue' : 'text-gray-500'}`}>{arch.role}</p>
                  </div>
                </div>
                {!isUnlocked && (
                  <div className="flex flex-col items-end">
                    {canUnlock ? <Unlock className="text-neon-purple w-6 h-6 mb-1 drop-shadow-[0_0_8px_rgba(177,0,232,0.8)]" /> : <Lock className="text-gray-500 w-6 h-6 mb-1" />}
                    <span className={`text-sm font-bold flex items-center gap-1 ${canUnlock ? 'text-neon-purple text-glow-purple' : 'text-red-400'}`}>
                      <Sparkles className="w-3 h-3"/> {arch.unlockCost}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-300 mb-5 relative z-10 leading-relaxed font-sans">{arch.desc}</p>
              
              <div className="flex flex-wrap gap-2 text-xs relative z-10 font-medium">
                <span className="bg-cyber-dark/80 text-green-400 px-3 py-1.5 rounded-lg border border-green-500/20 flex items-center gap-1"><Leaf className="w-3 h-3"/> Stash: {arch.stats.stash}g</span>
                <span className="bg-cyber-dark/80 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20 flex items-center gap-1"><Eye className="w-3 h-3"/> Ansia: {arch.stats.paranoia}%</span>
                <span className="bg-cyber-dark/80 text-yellow-400 px-3 py-1.5 rounded-lg border border-yellow-500/20 flex items-center gap-1"><Coins className="w-3 h-3"/> Coins: {arch.stats.coins}</span>
              </div>

              {!isUnlocked && canUnlock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20">
                  <span className="text-xl font-bold font-display text-neon-purple text-glow-purple bg-cyber-darker px-6 py-3 rounded-full border border-neon-purple/50 shadow-[0_0_20px_rgba(177,0,232,0.4)] flex items-center gap-2">
                    <Unlock className="w-5 h-5"/> Sblocca Archetipo
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 mb-6 max-w-2xl px-4 text-center">
        <p className="text-xs text-gray-500/60 leading-relaxed font-sans tracking-wide">
          <strong className="text-gray-400">Disclaimer:</strong> Questo gioco ha uno scopo puramente educativo e satirico.
          Non intende in alcun modo incitare all'uso di sostanze stupefacenti o a comportamenti illegali.
          L'obiettivo è esplorare la complessità e talvolta l'assurdità delle normative europee
          attraverso la metodologia della gamification. Gioca responsabilmente.
        </p>
      </div>
    </motion.div>
  );
}
