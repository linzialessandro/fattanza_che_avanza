import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Pizza } from 'lucide-react';

export default function InfoPanel({ isOpen, onClose, currentCountry, sounds }) {
  if (!isOpen || !currentCountry) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-md glass-panel border border-neon-blue/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.15)] relative"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-neon-blue/10 rounded-full blur-[60px] -z-10 pointer-events-none"></div>

          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/40">
            <div className="flex items-center gap-3 text-neon-blue">
              <BookOpen className="w-6 h-6 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
              <h2 className="text-2xl font-bold font-display tracking-wide">{currentCountry.name}</h2>
            </div>
            <button onClick={() => { sounds.playClick(); onClose(); }} className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 relative z-10">
            <p className="text-gray-300 leading-relaxed mb-6 font-sans text-sm">
              {currentCountry.desc}
            </p>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-center gap-4 shadow-inner">
              <div className="p-3 bg-orange-500/20 rounded-full border border-orange-500/30">
                <Pizza className="w-6 h-6 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Munchie Locale Consigliato:</p>
                <p className="font-bold font-display text-white text-lg tracking-wide">{currentCountry.munchie}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
