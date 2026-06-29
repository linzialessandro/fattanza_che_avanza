import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEGISLATION_TYPES, SHOP_ITEMS } from '../data/constants';
import { MapPin, Info, ArrowRight, AlertTriangle, Wind, HeartPulse, Droplets, Flame, SprayCan, FastForward, Pizza } from 'lucide-react';

const shopIcons = {
  "tisana_reset": HeartPulse,
  "scammuffo": SprayCan,
  "collirio": Droplets,
  "canna_pace": Flame,
  "via_fuga": FastForward,
  "munchie_kit": Pizza
};

export default function PlayingScreen({ currentCountry, currentCheckpoint, inventory, onAction, onSmoke, onShowInfo, sounds }) {
  if (!currentCountry || !currentCheckpoint) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex-1 w-full max-w-2xl mx-auto p-4 flex flex-col pt-8"
    >
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] z-10 relative">{currentCountry.flag}</span>
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full z-0"></div>
          </div>
          <div>
            <h2 className="text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-400 text-glow-blue uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{currentCountry.name}</h2>
            <div className={`text-xs px-3 py-1.5 rounded-lg inline-flex items-center mt-2 font-bold tracking-widest uppercase border ${LEGISLATION_TYPES[currentCountry.status].color} shadow-lg`}>
              {LEGISLATION_TYPES[currentCountry.status].name}
            </div>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { sounds.playHover(); onShowInfo(); }}
          className="p-3 rounded-xl glass-card border-white/20 hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
        >
          <Info className="w-6 h-6 text-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]" />
        </motion.button>
      </div>

      <motion.div 
        key={currentCheckpoint.title}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="glass-panel p-8 rounded-3xl mb-6 flex-1 flex flex-col relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-pink/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 text-neon-pink mb-5 border-b border-white/10 pb-4">
          <MapPin className="w-6 h-6 drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]" />
          <h3 className="text-2xl font-bold font-display tracking-wide">{currentCheckpoint.title}</h3>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed flex-1 mb-8 font-sans font-medium">
          {currentCheckpoint.text}
        </p>

        <div className="space-y-4 mt-auto z-10">
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
              const Icon = powerItem ? shopIcons[opt.power] : ArrowRight;

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={!isDisabled ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!isDisabled ? { scale: 0.98 } : {}}
                  onClick={() => !isDisabled && onAction(opt)}
                  className={`w-full text-left p-5 rounded-2xl border flex items-center justify-between transition-all shadow-lg backdrop-blur-md
                    ${isDisabled
                      ? 'bg-red-950/20 border-red-900/30 opacity-60 cursor-not-allowed'
                      : opt.power 
                        ? 'bg-neon-purple/10 border-neon-purple/50 hover:bg-neon-purple/20 hover:border-glow-purple hover:border-neon-purple/80' 
                        : 'glass-card hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'}`}
                >
                  <div className="pr-4">
                    <div className="font-bold text-white text-lg font-display tracking-wide">{opt.label}</div>
                    {opt.difficulty && (
                      <div className="text-xs text-gray-400 mt-2 font-medium tracking-widest uppercase flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div key={i} className={`h-1.5 w-3 rounded-full ${i < opt.difficulty ? 'bg-neon-red shadow-[0_0_5px_rgba(255,42,42,0.8)]' : 'bg-gray-800'}`}></div>
                          ))}
                        </div>
                        Rischio: {opt.difficulty}/10
                      </div>
                    )}
                    {opt.power && powerItem && (
                      <div className={`text-xs mt-2 font-bold flex items-center gap-2 ${isDisabled ? 'text-red-400' : 'text-neon-purple text-glow-purple'}`}>
                        {isDisabled ? <AlertTriangle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                        <span className="uppercase tracking-wider">Richiede: {powerItem.name}</span>
                        <span className="ml-1 bg-black/40 px-2 py-0.5 rounded-full text-gray-400 font-medium">Nello zaino: {inventory[opt.power] || 0}</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 rounded-full ${isDisabled ? 'bg-red-900/10' : opt.power ? 'bg-neon-purple/20' : 'bg-white/5'}`}>
                    <ArrowRight className={`w-6 h-6 ${isDisabled ? 'text-red-900/50' : opt.power ? 'text-neon-purple drop-shadow-[0_0_5px_rgba(177,0,232,0.8)]' : 'text-gray-400'}`} />
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pulsante Fuma Attivo */}
        <div className="mt-8 pt-6 border-t border-white/10 z-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSmoke && onSmoke()}
            className="w-full relative group overflow-hidden bg-cyber-darker border border-emerald-500/30 hover:border-glow-green hover:border-neon-green/80 p-5 rounded-2xl flex items-center justify-center gap-5 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 to-green-900/20 group-hover:from-emerald-900/60 group-hover:to-green-800/40 transition-colors"></div>
            
            <div className="relative z-10 p-3 bg-black/50 rounded-xl border border-emerald-500/20 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all">
              <Wind className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            </div>
            
            <div className="text-left relative z-10">
              <div className="font-black font-display text-emerald-400 text-2xl tracking-widest uppercase drop-shadow-md group-hover:text-glow-green transition-all">Rolla e Rilassati</div>
              <div className="flex gap-2 mt-2 font-bold text-xs uppercase tracking-wider">
                <span className="bg-black/60 border border-emerald-500/20 px-2.5 py-1 rounded-md text-emerald-300">-2g Stash</span>
                <span className="bg-black/60 border border-orange-500/20 px-2.5 py-1 rounded-md text-orange-400">-15 Energia</span>
                <span className="bg-black/60 border border-blue-500/20 px-2.5 py-1 rounded-md text-blue-300">-25 Paranoia</span>
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
