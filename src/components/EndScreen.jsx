import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Skull, Coins, Heart, Package, Sparkles } from 'lucide-react';

export default function EndScreen({ 
  isVictory, 
  character, 
  stats, 
  earnedKarma, 
  logText, 
  onRestart, 
  sounds 
}) {
  const { stash, coins, lives, level } = stats;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto w-full"
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        {/* Sfondo animato a tema Reggae/Fattanza (come IntroScreen) */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/30 via-black to-black z-0 pointer-events-none"></div>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
            <Leaf className="w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] text-neon-green mix-blend-screen" />
        </motion.div>

        <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl text-center py-8 mt-12">
          
          {isVictory ? (
            <>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Award className="w-16 h-16 md:w-24 md:h-24 text-neon-blue drop-shadow-[0_0_30px_rgba(0,243,255,0.8)] mb-4 mx-auto" />
              </motion.div>
              <h2 className="text-4xl md:text-7xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue text-glow-blue mb-2 uppercase tracking-tight">
                Viaggio<br/>Completato!
              </h2>
              <p className="text-lg md:text-2xl text-neon-green mb-6 md:mb-8 font-light tracking-widest uppercase text-glow-green drop-shadow-lg">
                Sei una Leggenda
              </p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Skull className="w-16 h-16 md:w-24 md:h-24 text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)] mb-4 mx-auto" />
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black font-display text-red-500 text-glow-red mb-4 uppercase tracking-widest drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
                Busted!
              </h2>
              <div className="glass-card bg-red-950/40 border-red-500/30 p-6 rounded-2xl max-w-md mx-auto mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                <p className="text-base md:text-xl text-gray-200 font-sans leading-relaxed">
                  {logText}
                </p>
              </div>
            </>
          )}

          {/* Statistiche Finali */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`glass-panel border-2 rounded-3xl p-6 md:p-8 w-full mb-10 shadow-2xl relative overflow-hidden
              ${isVictory ? 'border-neon-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.15)]' : 'border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.15)]'}`}
          >
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 pointer-events-none 
              ${isVictory ? 'bg-neon-blue/10' : 'bg-red-500/10'}`}></div>

            <h3 className="text-xl md:text-2xl font-black font-display text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
              Resoconto Viaggio
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
              <div className="glass-card flex flex-col items-center justify-center p-4 rounded-2xl hover:border-white/20 transition-colors">
                <span className="text-3xl md:text-4xl mb-2 drop-shadow-md">{character?.emoji || '👤'}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Archetipo</span>
                <span className="text-sm md:text-base font-black font-display text-white text-center tracking-wide">{character?.name || '-'}</span>
              </div>
              
              <div className="glass-card flex flex-col items-center justify-center p-4 rounded-2xl border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-950/20 transition-colors">
                <Package className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Stash</span>
                <span className="text-lg md:text-2xl font-black font-display text-emerald-400 text-glow-green">{stash}g</span>
              </div>

              <div className="glass-card flex flex-col items-center justify-center p-4 rounded-2xl border-yellow-500/20 hover:border-yellow-500/40 bg-yellow-950/20 transition-colors">
                <Coins className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Monete</span>
                <span className="text-lg md:text-2xl font-black font-display text-yellow-400 text-glow-yellow">{coins}</span>
              </div>

              <div className="glass-card flex flex-col items-center justify-center p-4 rounded-2xl border-red-500/20 hover:border-red-500/40 bg-red-950/20 transition-colors">
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-red-400 mb-2 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Vite</span>
                <span className="text-lg md:text-2xl font-black font-display text-red-400">{lives}</span>
              </div>
            </div>

            <div className="bg-neon-purple/20 border-2 border-neon-purple/50 p-5 rounded-2xl flex items-center justify-center gap-5 shadow-[0_0_30px_rgba(177,0,232,0.3)]">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-neon-purple drop-shadow-[0_0_15px_rgba(177,0,232,0.8)] animate-pulse" />
              <div className="text-left">
                <p className="text-xs md:text-sm font-bold text-purple-300 uppercase tracking-[0.2em] mb-1">Karma Ottenuto</p>
                <p className="text-3xl md:text-4xl font-black font-display text-neon-purple text-glow-purple">+{earnedKarma}</p>
              </div>
            </div>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { sounds.playClick && sounds.playClick(); onRestart(); }}
            className={`group relative overflow-hidden text-black font-black font-display text-xl md:text-2xl py-4 px-10 md:py-5 md:px-14 rounded-full uppercase tracking-widest transition-all
              ${isVictory 
                ? 'bg-gradient-to-r from-neon-blue to-neon-green shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:shadow-[0_0_50px_rgba(0,243,255,0.8)]' 
                : 'bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:shadow-[0_0_50px_rgba(239,68,68,0.8)]'
              }`}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isVictory ? 'Gioca Ancora' : 'Torna alla Base'}
            </span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
