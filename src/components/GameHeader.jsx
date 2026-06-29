import React from 'react';
import { Leaf, Brain, Zap, ShoppingBag, Coins, Heart, Backpack, Flame, Droplets, SprayCan, FastForward, HeartPulse, Pizza } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHOP_ITEMS } from '../data/constants';

const shopIcons = {
  "tisana_reset": HeartPulse,
  "scammuffo": SprayCan,
  "collirio": Droplets,
  "canna_pace": Flame,
  "via_fuga": FastForward,
  "munchie_kit": Pizza
};

export default function GameHeader({ stash, paranoia, energy, coins, lives, munchies, inventory, onOpenShop, sounds }) {
  // Animazioni in base allo stato
  const isHighParanoia = paranoia > 80;
  const isLowEnergy = energy < 20;

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-4 glass-panel border-b border-neon-purple/30 sticky top-0 z-40 rounded-b-3xl"
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Stash</span>
            <div className="flex items-center gap-1 text-neon-green font-bold text-xl drop-shadow-[0_0_8px_rgba(57,255,20,0.6)] font-display">
              <Leaf className="w-5 h-5" />
              {stash}g
            </div>
          </div>
          
          <div className="flex flex-col pl-4 border-l border-white/10">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Vite</span>
            <div className="flex items-center gap-1 text-red-500 font-bold text-xl drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] font-display">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-5 h-5 fill-current" />
              </motion.div>
              {lives}
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Fondi</span>
            <div className="flex items-center gap-1 text-yellow-400 font-bold text-xl drop-shadow-[0_0_8px_rgba(255,234,0,0.6)] font-display">
              <Coins className="w-5 h-5" />
              {coins}
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { sounds.playClick(); onOpenShop(); }}
            className="p-3 rounded-xl bg-neon-purple/20 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all shadow-[0_0_15px_rgba(177,0,232,0.3)] hover:shadow-[0_0_25px_rgba(177,0,232,0.6)] ml-2"
          >
            <ShoppingBag className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Barra Paranoia */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={isHighParanoia ? { scale: [1, 1.2, 1], color: ["#00f3ff", "#ff2a2a", "#00f3ff"] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Brain className="w-5 h-5 text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
          </motion.div>
          <div className="flex-1 h-3 bg-black/50 rounded-full overflow-hidden border border-white/10 relative">
            <motion.div 
              className={`h-full absolute left-0 top-0 bg-gradient-to-r ${isHighParanoia ? 'from-red-500 to-neon-red' : 'from-neon-blue to-blue-400'}`}
              initial={{ width: 0 }}
              animate={{ width: `${paranoia}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
            {/* Animazione "scossa" ad alta paranoia */}
            {isHighParanoia && (
              <motion.div 
                className="absolute inset-0 bg-white/20"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              />
            )}
          </div>
          <span className={`text-xs font-bold font-display w-10 text-right ${isHighParanoia ? 'text-neon-red text-glow-red' : 'text-neon-blue'}`}>{paranoia}%</span>
        </div>

        {/* Barra Energia */}
        <div className="flex items-center gap-3 relative">
          <motion.div
            animate={isLowEnergy ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Zap className="w-5 h-5 text-neon-pink drop-shadow-[0_0_8px_rgba(255,0,127,0.8)]" />
          </motion.div>
          <div className="flex-1 h-3 bg-black/50 rounded-full overflow-hidden border border-white/10 relative">
            <motion.div 
              className={`h-full absolute left-0 top-0 bg-gradient-to-r ${isLowEnergy ? 'from-red-500 to-neon-red' : 'from-neon-pink to-pink-400'}`}
              initial={{ width: 0 }}
              animate={{ width: `${energy}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
          </div>
          <span className={`text-xs font-bold font-display w-10 text-right ${isLowEnergy ? 'text-neon-red' : 'text-neon-pink'}`}>{energy}%</span>
          
          <AnimatePresence>
            {munchies && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: [1, 1.2, 1], opacity: 1 }} 
                exit={{ scale: 0, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -right-2 -top-6 bg-yellow-900/80 p-1.5 rounded-full border border-yellow-500 shadow-[0_0_10px_rgba(255,234,0,0.5)]" 
                title="Fame Chimica! Il viaggio costa doppia energia."
              >
                <Pizza className="w-4 h-4 text-yellow-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Zaino / Inventario */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <Backpack className="w-4 h-4 text-gray-400 drop-shadow-md" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Zaino:</span>
        </div>
        <div className="flex gap-3">
          {Object.keys(inventory).map(key => {
            if (inventory[key] <= 0) return null;
            const itemDef = SHOP_ITEMS.find(i => i.id === key);
            if (!itemDef) return null;
            const Icon = shopIcons[key] || ShoppingBag;
            
            return (
              <motion.div 
                key={key} 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/10 shadow-sm" 
                title={itemDef.name}
              >
                <Icon className="w-3.5 h-3.5 text-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]" />
                <span className="text-xs font-bold text-white font-display">x{inventory[key]}</span>
              </motion.div>
            );
          })}
          {Object.values(inventory).every(v => v === 0) && (
            <span className="text-xs text-gray-600 italic font-display">Vuoto</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
