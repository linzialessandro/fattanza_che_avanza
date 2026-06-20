import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Skull, Coins, Heart, Package } from 'lucide-react';

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

        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl text-center py-8">
          
          {isVictory ? (
            <>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Award className="w-16 h-16 md:w-24 md:h-24 text-neon-blue drop-shadow-[0_0_30px_rgba(0,243,255,0.8)] mb-4 mx-auto" />
              </motion.div>
              <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue text-glow-blue mb-2 uppercase tracking-tight">
                Viaggio<br/>Completato!
              </h2>
              <p className="text-lg md:text-2xl text-green-200 mb-6 md:mb-8 font-light tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
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
              <h2 className="text-4xl md:text-7xl font-black text-red-500 text-glow-purple mb-2 uppercase tracking-tight">
                Busted!
              </h2>
              <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-md mx-auto px-4">
                {logText}
              </p>
            </>
          )}

          {/* Statistiche Finali */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-black/60 border border-gray-800 rounded-2xl p-4 md:p-6 w-full mb-8 backdrop-blur-sm shadow-2xl"
          >
            <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6 uppercase tracking-wider border-b border-gray-700 pb-2">
              Resoconto Viaggio
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-2xl md:text-3xl mb-1 md:mb-2">{character?.emoji || '👤'}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Archetipo</span>
                <span className="text-xs md:text-sm font-bold text-white text-center leading-tight">{character?.name || '-'}</span>
              </div>
              
              <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-xl border border-white/10">
                <Package className="w-6 h-6 md:w-8 md:h-8 text-green-400 mb-1 md:mb-2 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Stash</span>
                <span className="text-base md:text-lg font-bold text-green-400">{stash}g</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-xl border border-white/10">
                <Coins className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 mb-1 md:mb-2 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Monete</span>
                <span className="text-base md:text-lg font-bold text-yellow-400">🪙 {coins}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-xl border border-white/10">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-400 mb-1 md:mb-2 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Vite</span>
                <span className="text-base md:text-lg font-bold text-red-400">{lives}</span>
              </div>
            </div>

            <div className="bg-purple-900/40 border border-purple-500/50 p-3 md:p-4 rounded-xl flex items-center justify-center gap-3 md:gap-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <span className="text-3xl md:text-4xl animate-pulse drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">☯</span>
              <div className="text-left">
                <p className="text-xs md:text-sm text-purple-300 uppercase tracking-widest">Karma Ottenuto</p>
                <p className="text-2xl md:text-3xl font-black text-neon-purple drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">+{earnedKarma}</p>
              </div>
            </div>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: isVictory ? "0px 0px 40px rgba(0, 243, 255, 0.6)" : "0px 0px 40px rgba(239, 68, 68, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { sounds.playClick && sounds.playClick(); onRestart(); }}
            className={`group relative overflow-hidden text-black font-black text-lg md:text-xl py-3 px-8 md:py-4 md:px-12 rounded-full uppercase tracking-widest transition-all border-2 border-black
              ${isVictory 
                ? 'bg-gradient-to-r from-neon-blue to-neon-green shadow-[0_0_20px_rgba(0,243,255,0.5)]' 
                : 'bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
              }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isVictory ? 'Gioca Ancora' : 'Torna alla Base'}
            </span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
