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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md glass-panel border border-neon-blue/30 rounded-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-neon-blue/10">
            <div className="flex items-center gap-2 text-neon-blue">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-xl font-bold">Info: {currentCountry.name}</h2>
            </div>
            <button onClick={() => { sounds.playClick(); onClose(); }} className="p-1 rounded-full hover:bg-white/10 text-gray-400">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-300 leading-relaxed mb-6">
              {currentCountry.desc}
            </p>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <Pizza className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Munchie Locale Consigliato:</p>
                <p className="font-bold text-white">{currentCountry.munchie}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
