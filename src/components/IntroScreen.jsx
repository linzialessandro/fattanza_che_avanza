import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ARCHETYPES } from '../data/constants';
import { Leaf, Lock, Unlock, Settings, Copy, Download, Upload, Info, X } from 'lucide-react';
import { getProgress, unlockArchetype, exportProgress, importProgress } from '../data/progressManager';

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
    // Howler auto-unlocks upon the first user interaction (click),
    // and any queued audio (like startIntroMusic from App.jsx) will immediately begin playing!
  };

  const handleArchetypeClick = (arch) => {
    const isUnlocked = progress.unlockedArchetypes.includes(arch.id);
    if (isUnlocked) {
      onSelect(arch);
    } else {
      // Try to unlock
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
      {!hasInteracted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Sfondo animato a tema */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/30 via-black to-black z-0"></div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          >
             <Leaf className="w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] text-neon-green mix-blend-screen" />
          </motion.div>

          {/* Effetto profondità simulato con CSS puro e ombre */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-4xl">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-12 flex flex-col items-center w-full"
            >
              <Leaf className="w-20 h-20 md:w-28 md:h-28 text-neon-green mb-6 drop-shadow-[0_0_30px_rgba(57,255,20,1)]" />
              <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-neon-green to-green-800 text-center uppercase tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,1)] leading-none filter drop-shadow-md">
                Fattanza<br/>che Avanza
              </h1>
              <p className="text-xl md:text-3xl mt-6 text-green-200 font-light tracking-[0.3em] md:tracking-[0.5em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Eurotrip 2026</p>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 60px rgba(57, 255, 20, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartInteraction}
              className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-neon-green text-black font-black text-2xl md:text-4xl px-10 md:px-16 py-5 md:py-8 rounded-full shadow-[0_0_40px_rgba(57,255,20,0.6)] uppercase tracking-widest mb-8 transition-all border-4 border-black"
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
              className="bg-gray-900/90 text-gray-300 font-bold text-lg md:text-xl px-10 py-4 rounded-full border border-gray-700 hover:border-neon-green/60 hover:text-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all backdrop-blur-sm"
            >
              Istruzioni e Info
            </motion.button>

            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-10 flex items-center gap-3 bg-black/50 px-6 py-2 rounded-full border border-gray-800"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <p className="text-gray-300 text-xs md:text-sm tracking-widest uppercase font-semibold">
                Attiva l'audio per un'esperienza immersiva
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 relative"
      >
        <Leaf className="w-20 h-20 text-neon-green mx-auto mb-4 drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]" />
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue text-glow-green uppercase tracking-widest leading-tight">
          Fattanza<br />che Avanza
        </h1>
        <p className="text-xl mt-2 text-gray-400 font-light tracking-wider">Eurotrip 2026</p>
      </motion.div>

      <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-30">
        <div className="bg-black/40 border border-purple-500/30 rounded-xl p-3 flex flex-col items-center">
          <span className="text-xs text-purple-300 font-bold uppercase tracking-wider mb-1">Karma Accumulato</span>
          <span className="text-2xl font-black text-neon-purple drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
            ☯ {progress.karma}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { sounds.playClick(); setShowInfoModal(true); }}
            className="bg-black/40 p-2 rounded-full border border-gray-600 hover:bg-white/10"
          >
            <Info className="w-5 h-5 text-neon-blue" />
          </button>
          <button
            onClick={() => { sounds.playClick(); setShowSettings(!showSettings); }}
            className="bg-black/40 p-2 rounded-full border border-gray-600 hover:bg-white/10"
          >
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-full max-w-2xl bg-black border border-neon-blue/50 rounded-2xl p-6 relative"
          >
            <button 
              onClick={() => { sounds.playClick(); setShowInfoModal(false); }} 
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-gray-400"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-8 h-8 text-neon-blue" />
              <h2 className="text-2xl font-bold text-white">Il Progetto Fattanza</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed text-left">
              <p>
                <strong>Fattanza che Avanza: Eurotrip 2026</strong> nasce come progetto educativo sperimentale che utilizza la gamification per far luce sulla complessa e frammentata situazione legislativa riguardante la cannabis in Europa.
              </p>
              <p>
                Il gioco non è un invito al consumo o al traffico di sostanze illegali, azioni che condanniamo e sconsigliamo. Piuttosto, mira a evidenziare le incoerenze tra nazioni confinanti nell'Area Schengen, dove le normative variano drasticamente da un sistema legale regolamentato, alla tolleranza, fino a sanzioni penali severe.
              </p>
              <p>
                Le dinamiche del gioco, incluse le scelte strategiche e la gestione del rischio (basate su logiche di <em>Teoria dei Giochi</em>), riflettono metaforicamente lo stress, i pericoli e le assurdità affrontate da chi viaggia a causa della mancanza di una legislazione armonizzata.
              </p>
              <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded mt-4">
                <p className="text-neon-blue font-bold mb-1">Fonti e Dati</p>
                <p>Le informazioni legali presenti nel gioco per le varie nazioni sono tratte da dati storici e di dominio pubblico aggiornati. Per un quadro completo e reale sulla legislazione europea e globale in merito, puoi consultare la pagina Wikipedia dedicata:</p>
                <a href="https://it.wikipedia.org/wiki/Legalità_della_cannabis" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 block mt-2 break-all">
                  https://it.wikipedia.org/wiki/Legalità_della_cannabis
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showInstructionsModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-full max-w-3xl bg-gray-900 border border-neon-green/50 rounded-2xl p-6 relative overflow-y-auto max-h-[90vh]"
          >
            <button 
              onClick={() => { sounds.playClick && sounds.playClick(); setShowInstructionsModal(false); }} 
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-gray-400"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold text-neon-green mb-6 uppercase text-center tracking-wider">Istruzioni di Gioco</h2>
            
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed text-left">
              <h3 className="text-xl font-bold text-white mt-4">Obiettivo</h3>
              <p>Attraversa i paesi dell'Area Schengen sopravvivendo ai controlli. Ogni nazione ha una propria legislazione sulle droghe leggere che influenza la difficoltà dei controlli.</p>
              
              <h3 className="text-xl font-bold text-white mt-4">Risorse</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Stash (🌿):</strong> La quantità di erba che porti con te. Più ne hai, più i controlli sono difficili (+1 difficoltà se &ge; 15g).</li>
                <li><strong>Paranoia (👁️):</strong> Il tuo livello di stress. Se arriva a 100, hai un attacco di panico e perdi una vita e parte dello stash. Ad alta paranoia (rosso) tutto trema.</li>
                <li><strong>Energia (⚡):</strong> Scende col tempo e le azioni. Se arriva a 0, svieni (aumento drastico paranoia).</li>
                <li><strong>Coins (🪙):</strong> Usa le monete per corrompere, pagare multe o comprare oggetti allo shop.</li>
                <li><strong>Vite (❤️):</strong> Ne hai 3. Se scendono a 0, Game Over.</li>
              </ul>

              <h3 className="text-xl font-bold text-white mt-4">Meccaniche</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Azione:</strong> Scegli se Nasconderti, Parlare, Scappare o usare Poteri. Affronterai una prova di riflessi: ferma il cursore nell'area verde! La larghezza dell'area verde dipende dalla difficoltà dell'azione e dalla legislazione del paese, mentre la tua Paranoia aumenta la velocità del cursore.</li>
                <li><strong>Fumare (💨):</strong> Consuma 2g di stash e 15 Energia, ma abbassa drasticamente la Paranoia (-25). Causa "Fame Chimica" (prossime azioni costano -10 Energia invece di -5).</li>
                <li><strong>Shop & Poteri (🛒):</strong> Durante i livelli puoi accedere allo Shop per vendere stash in cambio di monete, comprare erba, vite extra (Tisana Reset) o rigenerare energia. Puoi anche acquistare "Poteri" speciali monouso come il Collirio (per sviare i sospetti) o lo Scammuffo (nascondiglio infallibile) da usare durante i controlli per avere successo automatico senza dover superare la prova di riflessi.</li>
                <li><strong>Karma (☯):</strong> Si guadagna sopravvivendo. Usalo nel menu principale per sbloccare nuovi archetipi di personaggi.</li>
              </ul>
              
              <div className="mt-8 pt-4 border-t border-gray-700 text-xs text-gray-500 text-center">
                <strong>Disclaimer:</strong> Questo gioco ha uno scopo puramente educativo e satirico. Non intende in alcun modo incitare all'uso di sostanze stupefacenti o a comportamenti illegali. L'obiettivo è esplorare la complessità e talvolta l'assurdità delle normative europee attraverso la metodologia della gamification. Le meccaniche di gioco servono solo a simulare lo stress derivante dalla mancanza di armonizzazione legislativa. Gioca responsabilmente.
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-black/80 border border-neon-blue/30 rounded-xl p-4 mb-6 relative z-20"
        >
          <h4 className="text-neon-blue font-bold mb-3 flex items-center gap-2"><Download className="w-4 h-4" /> Backup (Mobile Friendly)</h4>
          <p className="text-xs text-gray-400 mb-3 text-left">Esporta un codice testo che puoi copiare o incollare per trasferire i salvataggi.</p>

          <button onClick={handleExport} className="w-full py-2 bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500/50 rounded mb-2 text-sm text-purple-300 font-bold flex items-center justify-center gap-2">
            <Copy className="w-4 h-4" /> Copia codice di Salvataggio
          </button>
          {exportMessage && <p className="text-xs text-green-400 mb-3 font-bold">{exportMessage}</p>}
          {!exportMessage && <div className="mb-3"></div>}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Incolla codice qui..."
              className="flex-1 bg-black/50 border border-gray-600 rounded px-2 text-sm text-white"
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
            />
            <button onClick={handleImport} className="py-2 px-3 bg-neon-blue/20 hover:bg-neon-blue/40 border border-neon-blue/50 rounded text-sm text-neon-blue font-bold flex items-center gap-1">
              <Upload className="w-4 h-4" /> Carica
            </button>
          </div>
          {importMessage && <p className={`text-xs mt-2 font-bold ${importMessage.includes("successo") ? "text-green-400" : "text-red-400"}`}>{importMessage}</p>}
        </motion.div>
      )}

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {ARCHETYPES.map((arch, idx) => {
          const isUnlocked = progress.unlockedArchetypes.includes(arch.id);
          const canUnlock = !isUnlocked && progress.karma >= arch.unlockCost;

          return (
            <motion.div
              key={arch.id}
              whileHover={isUnlocked || canUnlock ? { scale: 1.05, borderColor: isUnlocked ? "rgba(57,255,20,0.5)" : "rgba(168,85,247,0.5)" } : {}}
              whileTap={isUnlocked || canUnlock ? { scale: 0.95 } : {}}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-panel p-6 rounded-2xl cursor-pointer text-left relative overflow-hidden group 
                ${!isUnlocked ? 'opacity-80 grayscale-[0.5]' : ''}`}
              onClick={() => handleArchetypeClick(arch)}
              onMouseEnter={() => (isUnlocked || canUnlock) && sounds.playHover()}
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity
                ${isUnlocked ? 'from-neon-green/10 to-transparent' : canUnlock ? 'from-neon-purple/20 to-transparent' : ''}`}></div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{arch.emoji}</span>
                  <div>
                    <h3 className={`text-2xl font-bold ${isUnlocked ? 'text-white text-glow-green' : 'text-gray-400'}`}>{arch.name}</h3>
                    <p className={`text-sm ${isUnlocked ? 'text-neon-blue' : 'text-gray-500'}`}>{arch.role}</p>
                  </div>
                </div>
                {!isUnlocked && (
                  <div className="flex flex-col items-end">
                    {canUnlock ? <Unlock className="text-neon-purple w-6 h-6 mb-1" /> : <Lock className="text-gray-500 w-6 h-6 mb-1" />}
                    <span className={`text-sm font-bold ${canUnlock ? 'text-neon-purple' : 'text-red-400'}`}>
                      {arch.unlockCost} Karma
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-300 mb-4">{arch.desc}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-green-900/50 text-green-300 px-2 py-1 rounded border border-green-500/30">Stash: {arch.stats.stash}g</span>
                <span className="bg-red-900/50 text-red-300 px-2 py-1 rounded border border-red-500/30">Ansia: {arch.stats.paranoia}%</span>
                <span className="bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded border border-yellow-500/30">Coins: 🪙 {arch.stats.coins}</span>
              </div>

              {!isUnlocked && canUnlock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xl font-bold text-neon-purple bg-purple-900/80 px-4 py-2 rounded-full border border-purple-500">
                    Sblocca ora!
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 mb-4 max-w-2xl px-4 text-center">
        <p className="text-xs text-gray-500/80 leading-relaxed border-t border-gray-800 pt-4">
          <strong className="text-gray-400">Disclaimer:</strong> Questo gioco ha uno scopo puramente educativo e satirico.
          Non intende in alcun modo incitare all'uso di sostanze stupefacenti o a comportamenti illegali.
          L'obiettivo è esplorare la complessità e talvolta l'assurdità delle normative europee
          attraverso la metodologia della gamification. Gioca responsabilmente.
        </p>
      </div>
    </motion.div>
  );
}
