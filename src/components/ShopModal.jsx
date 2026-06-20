import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHOP_ITEMS } from '../data/constants';
import { X, ShoppingBag, Coins } from 'lucide-react';

export default function ShopModal({ isOpen, onClose, coins, inventory, character, stash, onBuy, onSell, sounds, currentCountry }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="w-full max-w-lg glass-panel border border-neon-purple/30 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-neon-purple/10">
            <div className="flex items-center gap-2 text-neon-purple">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Mercato Nero</h2>
            </div>
            <button onClick={() => { sounds.playClick(); onClose(); }} className="p-1 rounded-full hover:bg-white/10 text-gray-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 flex justify-between items-center bg-black/20">
            <span className="text-gray-300 font-medium">I tuoi fondi:</span>
            <div className="flex items-center gap-1 text-amber-300 text-xl font-bold">
              <Coins className="w-5 h-5 drop-shadow-[0_0_5px_rgba(252,211,77,0.8)]" />
              {coins}
            </div>
          </div>

          <div className="p-4 overflow-y-auto space-y-3">
            <div className="glass-card p-3 rounded-xl flex justify-between items-center gap-4 border border-rose-500/30 bg-rose-900/20">
              <div className="text-3xl drop-shadow-md">💰</div>
              <div className="flex-1">
                <h4 className="font-bold text-white flex items-center gap-2">
                  Vendi Stash (-5g)
                </h4>
                <p className="text-xs text-rose-300 mt-1">Sbarazzati di 5g in eccesso per 50 monete sonanti.</p>
                <div className="mt-2 text-xs font-bold text-gray-300">
                  Stash Attuale: <span className={stash >= 5 ? "text-emerald-400" : "text-red-500"}>{stash}g</span>
                </div>
              </div>
              <motion.button
                whileHover={stash >= 5 ? { scale: 1.05 } : {}}
                whileTap={stash >= 5 ? { scale: 0.95 } : {}}
                onClick={() => stash >= 5 && onSell()}
                className={`px-4 py-2 rounded-lg font-bold shadow-lg min-w-[80px] transition-colors
                  ${stash >= 5 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-black hover:from-emerald-400 hover:to-emerald-500' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'}`}
              >
                +50 🪙
              </motion.button>
            </div>

            {currentCountry && (currentCountry.status === "LEGAL" || currentCountry.status === "TOLLERATO") && (
              <div className="glass-card p-3 rounded-xl flex justify-between items-center gap-4 border border-emerald-500/30 bg-emerald-900/20">
                <div className="text-3xl drop-shadow-md">🌿</div>
                <div className="flex-1">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    Rifornimento Legale (+5g)
                  </h4>
                  <p className="text-xs text-emerald-400 mt-1">Acquista 5g di erba di alta qualità in sicurezza.</p>
                </div>
                <motion.button
                  whileHover={coins >= 50 ? { scale: 1.05 } : {}}
                  whileTap={coins >= 50 ? { scale: 0.95 } : {}}
                  onClick={() => coins >= 50 && onBuy({ id: "buy_weed", cost: 50 })}
                  className={`px-4 py-2 rounded-lg font-bold shadow-lg min-w-[80px] transition-colors
                    ${coins >= 50 
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-black hover:from-emerald-400 hover:to-emerald-500' 
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'}`}
                >
                  50 🪙
                </motion.button>
              </div>
            )}
            {SHOP_ITEMS.map((item) => {
              const cost = character.id === "accademico" ? Math.round(item.cost * 0.85) : item.cost;
              const canAfford = coins >= cost;
              const currentQty = inventory[item.id] || 0;

              return (
                <div key={item.id} className="glass-card p-3 rounded-xl flex justify-between items-center gap-4 border border-white/5">
                  <div className="text-3xl drop-shadow-md">{item.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      {item.name} 
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                    <div className="mt-2 text-xs font-bold text-gray-300">
                      Nello Zaino: <span className={currentQty > 0 ? "text-neon-blue" : "text-gray-500"}>{currentQty}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={canAfford ? { scale: 1.05 } : {}}
                    whileTap={canAfford ? { scale: 0.95 } : {}}
                    onClick={() => canAfford && onBuy(item)}
                    className={`px-4 py-2 rounded-lg font-bold shadow-lg min-w-[80px] transition-colors
                      ${canAfford 
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500' 
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'}`}
                  >
                    {cost} 🪙
                  </motion.button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
