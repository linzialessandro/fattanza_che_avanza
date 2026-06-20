import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEGISLATION_TYPES, SHOP_ITEMS } from '../data/constants';
import { MapPin, Info, ArrowRight, AlertTriangle } from 'lucide-react';

export default function PlayingScreen({ currentCountry, currentCheckpoint, inventory, onAction, onSmoke, onShowInfo, sounds }) {
  if (!currentCountry || !currentCheckpoint) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex-1 w-full max-w-2xl mx-auto p-4 flex flex-col pt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">{currentCountry.flag}</span>
          <div>
            <h2 className="text-3xl font-black text-glow-blue text-neon-blue uppercase tracking-wider">{currentCountry.name}</h2>
            <div className={`text-xs px-2 py-1 rounded inline-block mt-1 font-bold ${LEGISLATION_TYPES[currentCountry.status].color}`}>
              {LEGISLATION_TYPES[currentCountry.status].name}
            </div>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { sounds.playHover(); onShowInfo(); }}
          className="p-2 rounded-full bg-white/5 border border-white/20 hover:bg-white/10"
        >
          <Info className="w-6 h-6 text-neon-blue" />
        </motion.button>
      </div>

      <motion.div 
        key={currentCheckpoint.title}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="glass-panel p-6 rounded-2xl mb-6 flex-1 flex flex-col"
      >
        <div className="flex items-center gap-2 text-neon-pink mb-4">
          <MapPin className="w-5 h-5" />
          <h3 className="text-xl font-bold">{currentCheckpoint.title}</h3>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed flex-1 mb-8">
          {currentCheckpoint.text}
        </p>

        <div className="space-y-3 mt-auto">
          <AnimatePresence>
            {currentCheckpoint.options.map((opt, idx) => {
              let isDisabled = false;
              let powerItem = null;
              if (opt.power) {
                powerItem = SHOP_ITEMS.find(i => i.id === opt.power);
                if (inventory[opt.power] <= 0) {
                  isDisabled = true;
                }
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={!isDisabled ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!isDisabled ? { scale: 0.98 } : {}}
                  onClick={() => !isDisabled && onAction(opt)}
                  className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-colors
                    ${isDisabled
                      ? 'bg-red-900/10 border-red-900/30 opacity-50 cursor-not-allowed'
                      : opt.power 
                        ? 'bg-neon-purple/10 border-neon-purple/50 hover:bg-neon-purple/20' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <div>
                    <div className="font-semibold text-white">{opt.label}</div>
                    {opt.difficulty && (
                      <div className="text-xs text-gray-400 mt-1">
                        Livello di Rischio: {opt.difficulty}/10
                      </div>
                    )}
                    {opt.power && powerItem && (
                      <div className={`text-xs mt-1 font-bold flex items-center gap-1 ${isDisabled ? 'text-red-400' : 'text-neon-purple'}`}>
                        {isDisabled && <AlertTriangle className="w-3 h-3" />}
                        Richiede: {powerItem.emoji} {powerItem.name} 
                        <span className="ml-1 text-gray-400 font-normal">(Nello zaino: {inventory[opt.power] || 0})</span>
                      </div>
                    )}
                  </div>
                  <ArrowRight className={`w-5 h-5 ${isDisabled ? 'text-red-900/50' : opt.power ? 'text-neon-purple' : 'text-gray-400'}`} />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pulsante Fuma Attivo */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSmoke && onSmoke()}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-950 to-green-900 border border-emerald-500/50 p-4 rounded-xl flex items-center justify-center gap-4 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-4xl relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">💨</span>
            <div className="text-left relative z-10">
              <div className="font-bold text-emerald-400 text-xl tracking-wider drop-shadow-md">ROLLA E RILASSATI</div>
              <div className="text-xs mt-1 font-medium bg-black/40 px-2 py-1 rounded inline-block">
                <span className="text-emerald-300">-2g Stash</span> • <span className="text-orange-400">-5 Energia</span> • <span className="text-blue-300">-25 Paranoia</span>
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
