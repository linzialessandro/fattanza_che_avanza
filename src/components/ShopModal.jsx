import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHOP_ITEMS } from '../data/constants';
import { X, ShoppingBag, Coins, Banknote, Leaf, HeartPulse, SprayCan, Droplets, Flame, FastForward, Pizza } from 'lucide-react';

const shopIcons = {
  "tisana_reset": HeartPulse,
  "scammuffo": SprayCan,
  "collirio": Droplets,
  "canna_pace": Flame,
  "via_fuga": FastForward,
  "munchie_kit": Pizza
};

export default function ShopModal({ isOpen, onClose, coins, inventory, character, stash, onBuy, onSell, sounds, currentCountry }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="w-full max-w-lg glass-panel border border-neon-purple/50 rounded-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-[0_0_40px_rgba(177,0,232,0.15)] relative"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-neon-purple/20 rounded-full blur-[60px] -z-10 pointer-events-none"></div>

          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/40">
            <div className="flex items-center gap-3 text-neon-purple">
              <ShoppingBag className="w-7 h-7 drop-shadow-[0_0_10px_rgba(177,0,232,0.8)]" />
              <h2 className="text-3xl font-black font-display tracking-wide text-glow-purple">Mercato Nero</h2>
            </div>
            <button onClick={() => { sounds.playClick(); onClose(); }} className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-5 flex justify-between items-center bg-cyber-dark border-b border-white/5">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">I tuoi fondi a disposizione</span>
            <div className="flex items-center gap-2 text-yellow-400 text-2xl font-black font-display text-glow-yellow drop-shadow-[0_0_10px_rgba(255,234,0,0.5)]">
              <Coins className="w-6 h-6" />
              {coins}
            </div>
          </div>

          <div className="p-5 overflow-y-auto space-y-4 relative z-10 custom-scrollbar">
            {/* Vendi Stash */}
            <div className="glass-card p-4 rounded-xl flex justify-between items-center gap-4 border border-rose-500/30 bg-rose-950/30 hover:border-rose-500/50 transition-colors group">
              <div className="p-3 bg-black/50 rounded-xl border border-rose-500/20 group-hover:shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-shadow">
                <Banknote className="w-8 h-8 text-rose-400 drop-shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold font-display text-white text-lg tracking-wide flex items-center gap-2">
                  Vendi Stash <span className="text-rose-400 text-sm">(-5g)</span>
                </h4>
                <p className="text-xs text-gray-400 mt-1 font-sans">Sbarazzati di 5g in eccesso per monete sonanti.</p>
                <div className="mt-2 text-xs font-bold text-gray-400 tracking-wider uppercase">
                  Stash Attuale: <span className={stash >= 5 ? "text-emerald-400" : "text-red-500"}>{stash}g</span>
                </div>
              </div>
              <motion.button
                whileHover={stash >= 5 ? { scale: 1.05 } : {}}
                whileTap={stash >= 5 ? { scale: 0.95 } : {}}
                onClick={() => stash >= 5 && onSell()}
                className={`px-5 py-3 rounded-xl font-bold shadow-lg min-w-[90px] font-display text-lg tracking-wider transition-all border
                  ${stash >= 5 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
                    : 'bg-black/50 border-gray-700/50 text-gray-600 cursor-not-allowed'}`}
              >
                +50 🪙
              </motion.button>
            </div>

            {/* Rifornimento Legale (Conditional) */}
            {currentCountry && (currentCountry.status === "LEGAL" || currentCountry.status === "TOLLERATO") && (
              <div className="glass-card p-4 rounded-xl flex justify-between items-center gap-4 border border-emerald-500/30 bg-emerald-950/30 hover:border-emerald-500/50 transition-colors group">
                <div className="p-3 bg-black/50 rounded-xl border border-emerald-500/20 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-shadow">
                  <Leaf className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold font-display text-white text-lg tracking-wide flex items-center gap-2">
                    Rifornimento <span className="text-emerald-400 text-sm">(+5g)</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 font-sans">Acquista 5g di erba di alta qualità in sicurezza.</p>
                </div>
                <motion.button
                  whileHover={coins >= 50 ? { scale: 1.05 } : {}}
                  whileTap={coins >= 50 ? { scale: 0.95 } : {}}
                  onClick={() => coins >= 50 && onBuy({ id: "buy_weed", cost: 50 })}
                  className={`px-5 py-3 rounded-xl font-bold shadow-lg min-w-[90px] font-display text-lg tracking-wider transition-all border
                    ${coins >= 50 
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]' 
                      : 'bg-black/50 border-gray-700/50 text-gray-600 cursor-not-allowed'}`}
                >
                  50 🪙
                </motion.button>
              </div>
            )}

            {/* Altri Items */}
            <div className="pt-2">
              <h3 className="text-xs text-neon-purple font-bold tracking-[0.2em] uppercase mb-4 pl-1">Oggetti Speciali</h3>
              <div className="space-y-4">
                {SHOP_ITEMS.map((item) => {
                  const cost = character.id === "accademico" ? Math.round(item.cost * 0.85) : item.cost;
                  const canAfford = coins >= cost;
                  const currentQty = inventory[item.id] || 0;
                  const Icon = shopIcons[item.id] || ShoppingBag;

                  return (
                    <div key={item.id} className="glass-card p-4 rounded-xl flex justify-between items-center gap-4 border border-white/5 hover:border-white/10 transition-colors group">
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5 group-hover:border-neon-blue/30 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all">
                        <Icon className="w-8 h-8 text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold font-display text-white text-lg tracking-wide flex items-center gap-2">
                          {item.name} 
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 font-sans">{item.desc}</p>
                        <div className="mt-2 text-xs font-bold text-gray-500 tracking-wider uppercase">
                          Nello Zaino: <span className={currentQty > 0 ? "text-neon-blue" : "text-gray-400"}>{currentQty}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={canAfford ? { scale: 1.05 } : {}}
                        whileTap={canAfford ? { scale: 0.95 } : {}}
                        onClick={() => canAfford && onBuy(item)}
                        className={`px-5 py-3 rounded-xl font-bold shadow-lg min-w-[90px] font-display text-lg tracking-wider transition-all border
                          ${canAfford 
                            ? 'bg-amber-500/20 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]' 
                            : 'bg-black/50 border-gray-700/50 text-gray-600 cursor-not-allowed'}`}
                      >
                        {cost} 🪙
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
