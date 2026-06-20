import React from 'react';
import { Leaf, Brain, Zap, ShoppingBag, Coins, Heart, Backpack } from 'lucide-react';
import { motion } from 'framer-motion';
import { SHOP_ITEMS } from '../data/constants';

export default function GameHeader({ stash, paranoia, energy, coins, lives, munchies, inventory, onOpenShop, sounds }) {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-4 bg-black/60 backdrop-blur-md border-b border-neon-purple/30 sticky top-0 z-40"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Stash</span>
            <div className="flex items-center gap-1 text-neon-green font-bold text-xl drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">
              <Leaf className="w-5 h-5" />
              {stash}g
            </div>
          </div>
          
          <div className="flex flex-col pl-4 border-l border-white/10">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Vite</span>
            <div className="flex items-center gap-1 text-red-500 font-bold text-xl drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
              <Heart className="w-5 h-5 fill-current" />
              {lives}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Fondi</span>
            <div className="flex items-center gap-1 text-amber-300 font-bold text-xl drop-shadow-[0_0_5px_rgba(252,211,77,0.5)]">
              <Coins className="w-5 h-5" />
              {coins}
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { sounds.playClick(); onOpenShop(); }}
            className="p-2 rounded-xl bg-neon-purple/20 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all shadow-[0_0_15px_rgba(188,19,254,0.3)]"
          >
            <ShoppingBag className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]" />
          <div className="flex-1 h-3 bg-gray-900 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              className="h-full bg-gradient-to-r from-neon-blue to-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${paranoia}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
          <span className="text-xs font-bold text-neon-blue w-8 text-right">{paranoia}%</span>
        </div>

        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-neon-pink drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]" />
          <div className="flex-1 h-3 bg-gray-900 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              className="h-full bg-gradient-to-r from-neon-pink to-pink-400"
              initial={{ width: 0 }}
              animate={{ width: `${energy}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
          <span className="text-xs font-bold text-neon-pink w-8 text-right">{energy}%</span>
          {munchies && <motion.span 
            initial={{ scale: 0 }} 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-lg ml-1" 
            title="Fame Chimica! Il viaggio costa doppia energia."
          >
            🍕
          </motion.span>}
        </div>
      </div>

      {/* Zaino / Inventario */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <Backpack className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Zaino:</span>
        </div>
        <div className="flex gap-3">
          {Object.keys(inventory).map(key => {
            if (inventory[key] <= 0) return null;
            const itemDef = SHOP_ITEMS.find(i => i.id === key);
            if (!itemDef) return null;
            return (
              <div key={key} className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10" title={itemDef.name}>
                <span className="text-sm">{itemDef.emoji}</span>
                <span className="text-xs font-bold text-white">x{inventory[key]}</span>
              </div>
            );
          })}
          {Object.values(inventory).every(v => v === 0) && (
            <span className="text-xs text-gray-600 italic">Vuoto</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
