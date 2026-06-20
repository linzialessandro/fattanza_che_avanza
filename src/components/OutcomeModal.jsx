import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Brain, Zap, Leaf, Coins } from 'lucide-react';

export default function OutcomeModal({ isOpen, outcomeType, logText, deltas, onNext, sounds }) {
  if (!isOpen) return null;

  const isSuccess = outcomeType === 'success';

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.8, y: 100, rotateX: 45 }}
          animate={{ scale: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.8, y: 100, rotateX: 45 }}
          transition={{ type: "spring", damping: 15 }}
          className={`w-full max-w-md p-6 rounded-3xl border-2 shadow-2xl relative overflow-hidden
            ${isSuccess ? 'bg-emerald-950/80 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : 'bg-red-950/80 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)]'}`}
        >
          <div className="flex justify-center mb-4 relative z-10">
            {isSuccess ? (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 0.5, type: "spring" }}
              >
                <CheckCircle2 className="w-20 h-20 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
              </motion.div>
            ) : (
              <motion.div 
                animate={{ x: [-10, 10, -10, 10, 0] }} 
                transition={{ duration: 0.4 }}
              >
                <AlertTriangle className="w-20 h-20 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
              </motion.div>
            )}
          </div>
          
          <h2 className={`text-3xl font-black text-center mb-4 z-10 relative
            ${isSuccess ? 'text-emerald-400 text-glow-green' : 'text-red-500 text-glow-purple'}`}>
            {isSuccess ? 'SUCCESSO!' : 'DISASTRO!'}
          </h2>
          
          <p className="text-gray-200 text-lg text-center mb-6 relative z-10">
            {logText}
          </p>

          {deltas && (
            <div className="flex flex-wrap justify-center gap-4 mb-8 relative z-10 bg-black/40 p-4 rounded-xl border border-white/5">
              {deltas.paranoia !== 0 && (
                <div className={`flex items-center gap-1 font-bold ${deltas.paranoia > 0 ? 'text-red-400' : 'text-neon-blue'}`}>
                  <Brain className="w-4 h-4" />
                  {deltas.paranoia > 0 ? '+' : ''}{deltas.paranoia}%
                </div>
              )}
              {deltas.energy !== 0 && (
                <div className={`flex items-center gap-1 font-bold ${deltas.energy > 0 ? 'text-neon-pink' : 'text-orange-400'}`}>
                  <Zap className="w-4 h-4" />
                  {deltas.energy > 0 ? '+' : ''}{deltas.energy}%
                </div>
              )}
              {deltas.stash !== 0 && (
                <div className={`flex items-center gap-1 font-bold ${deltas.stash > 0 ? 'text-neon-green' : 'text-red-400'}`}>
                  <Leaf className="w-4 h-4" />
                  {deltas.stash > 0 ? '+' : ''}{deltas.stash}g
                </div>
              )}
              {deltas.coins !== 0 && (
                <div className={`flex items-center gap-1 font-bold ${deltas.coins > 0 ? 'text-amber-300' : 'text-red-400'}`}>
                  <Coins className="w-4 h-4" />
                  {deltas.coins > 0 ? '+' : ''}{deltas.coins}
                </div>
              )}
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { sounds.playClick(); onNext(); }}
            className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transition-colors relative z-10
              ${isSuccess 
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black' 
                : 'bg-red-600 hover:bg-red-500 text-white'}`}
          >
            Continua Viaggio
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
