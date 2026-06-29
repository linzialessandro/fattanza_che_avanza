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
          className={`w-full max-w-md p-8 rounded-3xl border-2 shadow-2xl relative overflow-hidden glass-panel
            ${isSuccess ? 'bg-emerald-950/40 border-emerald-500/50 border-glow-green' : 'bg-red-950/40 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.4)]'}`}
        >
          {/* Sfondo sfumato */}
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 pointer-events-none ${isSuccess ? 'bg-neon-green/10' : 'bg-neon-red/10'}`}></div>

          <div className="flex justify-center mb-6 relative z-10">
            {isSuccess ? (
              <motion.div 
                animate={{ rotate: [0, -10, 10, 0] }} 
                transition={{ duration: 0.5, type: "spring" }}
              >
                <CheckCircle2 className="w-24 h-24 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
              </motion.div>
            ) : (
              <motion.div 
                animate={{ x: [-10, 10, -10, 10, 0] }} 
                transition={{ duration: 0.4 }}
              >
                <AlertTriangle className="w-24 h-24 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
              </motion.div>
            )}
          </div>
          
          <h2 className={`text-4xl font-black font-display text-center mb-4 z-10 relative uppercase tracking-widest
            ${isSuccess ? 'text-emerald-400 text-glow-green' : 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]'}`}>
            {isSuccess ? 'SUCCESSO!' : 'DISASTRO!'}
          </h2>
          
          <p className="text-gray-200 text-lg text-center mb-8 relative z-10 font-sans leading-relaxed">
            {logText}
          </p>

          {deltas && (
            <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-10 bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner">
              {deltas.paranoia !== 0 && (
                <div className={`flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg bg-black/60 border ${deltas.paranoia > 0 ? 'border-red-500/30 text-red-400' : 'border-blue-500/30 text-neon-blue'}`}>
                  <Brain className="w-4 h-4" />
                  {deltas.paranoia > 0 ? '+' : ''}{deltas.paranoia}%
                </div>
              )}
              {deltas.energy !== 0 && (
                <div className={`flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg bg-black/60 border ${deltas.energy > 0 ? 'border-pink-500/30 text-neon-pink' : 'border-orange-500/30 text-orange-400'}`}>
                  <Zap className="w-4 h-4" />
                  {deltas.energy > 0 ? '+' : ''}{deltas.energy}%
                </div>
              )}
              {deltas.stash !== 0 && (
                <div className={`flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg bg-black/60 border ${deltas.stash > 0 ? 'border-green-500/30 text-neon-green' : 'border-red-500/30 text-red-400'}`}>
                  <Leaf className="w-4 h-4" />
                  {deltas.stash > 0 ? '+' : ''}{deltas.stash}g
                </div>
              )}
              {deltas.coins !== 0 && (
                <div className={`flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg bg-black/60 border ${deltas.coins > 0 ? 'border-yellow-500/30 text-amber-300' : 'border-red-500/30 text-red-400'}`}>
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
            className={`w-full py-4 rounded-xl font-bold font-display uppercase tracking-widest text-xl shadow-lg transition-all relative z-10 border
              ${isSuccess 
                ? 'bg-emerald-500/20 border-emerald-500 hover:bg-emerald-500 text-emerald-400 hover:text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]' 
                : 'bg-red-600/20 border-red-500 hover:bg-red-600 text-red-400 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]'}`}
          >
            Continua Viaggio
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
