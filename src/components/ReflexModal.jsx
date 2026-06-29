import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { Target, StopCircle } from 'lucide-react';

export default function ReflexModal({ isOpen, target, paranoia, munchies, sounds, onComplete }) {
  const [step, setStep] = useState('waiting'); // waiting, rolling, result
  const [result, setResult] = useState(null);
  const [cursorPos, setCursorPos] = useState(0);
  
  const requestRef = useRef();
  const direction = useRef(1);
  const speed = useRef(1);

  // Calcola parametri in base alla difficoltà e paranoia
  // target va da 1 a 20. 
  // green zone decresce in modo esponenziale per rendere difficili gli Azzardi (target alti)
  const greenWidth = Math.max(5, 60 - Math.pow(target || 5, 1.8));
  const greenStart = 50 - (greenWidth / 2);
  const greenEnd = 50 + (greenWidth / 2);

  // Velocità base aumentata dalla difficoltà e dalla paranoia
  const baseSpeed = 1.5 + ((target || 5) * 0.1);
  const paranoiaMultiplier = 1 + ((paranoia || 0) / 100);
  const munchiesMultiplier = munchies ? 0.7 : 1.0; // Focus da fame chimica rallenta il cursore del 30%

  useEffect(() => {
    if (isOpen) {
      setStep('waiting');
      setResult(null);
      setCursorPos(0);
      direction.current = 1;
      speed.current = baseSpeed * paranoiaMultiplier * munchiesMultiplier;
    } else {
      cancelAnimationFrame(requestRef.current);
    }
  }, [isOpen, target, paranoia]);

  useAnimationFrame((time, delta) => {
    if (step === 'rolling') {
      let newPos = cursorPos + (speed.current * direction.current * (delta / 16));
      
      if (newPos > 100) {
        newPos = 100;
        direction.current = -1;
      } else if (newPos < 0) {
        newPos = 0;
        direction.current = 1;
      }
      
      setCursorPos(newPos);
    }
  });

  const handleStart = () => {
    if (step !== 'waiting') return;
    setStep('rolling');
    sounds.playHover();
  };

  const handleStop = () => {
    if (step !== 'rolling') return;
    
    setStep('result');
    const isSuccess = cursorPos >= greenStart && cursorPos <= greenEnd;
    
    // Per retrocompatibilità, restituiamo un "roll" >= target se successo, e 1 se fallimento.
    const mockRoll = isSuccess ? (target + 5) : 1;
    setResult(mockRoll);

    if (isSuccess) sounds.playChime();
    else sounds.playFail();

    setTimeout(() => {
      onComplete(mockRoll);
    }, 1500);
  };

  if (!isOpen) return null;

  const isSuccess = result !== null && result >= target;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div 
          className="w-full max-w-md flex flex-col items-center p-8 rounded-3xl glass-panel border border-neon-blue/30 shadow-[0_0_40px_rgba(0,243,255,0.15)] relative overflow-hidden"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-blue/10 to-transparent pointer-events-none"></div>

          <h2 className="text-3xl font-black font-display text-neon-blue mb-2 text-glow-blue tracking-wide">Test di Riflessi</h2>
          <p className="text-gray-300 mb-8 text-center text-sm font-sans px-4">
            Fermati nell'area verde. Attenzione: la <strong className="text-red-400">paranoia</strong> aumenta la velocità!
          </p>

          <div className="w-full h-14 bg-black/80 rounded-full border border-white/10 relative overflow-hidden mb-10 shadow-inner">
            {/* Background grid pattern for a techy look */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.05)_25%,transparent_26%,transparent_74%,rgba(255,255,255,0.05)_75%,transparent_76%)] bg-[length:20px_20px]"></div>

            {/* Green Zone */}
            <div 
              className="absolute top-0 bottom-0 bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.8)] opacity-90"
              style={{ left: `${greenStart}%`, width: `${greenWidth}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:10px_10px]"></div>
            </div>
            
            {/* Cursor */}
            <div 
              className="absolute top-0 bottom-0 w-1.5 bg-white drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
              style={{ left: `calc(${cursorPos}% - 3px)` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-8 border-2 border-white rounded-sm"></div>
            </div>
          </div>

          {step === 'waiting' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="w-full py-4 rounded-xl font-display tracking-widest uppercase bg-neon-blue/20 text-neon-blue border border-neon-blue font-bold text-xl shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:bg-neon-blue hover:text-black hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] flex items-center justify-center gap-3 transition-colors"
            >
              <Target className="w-6 h-6" /> Inizia Test
            </motion.button>
          )}

          {step === 'rolling' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStop}
              className="w-full py-4 rounded-xl font-display tracking-widest uppercase bg-neon-purple text-white font-bold text-xl shadow-[0_0_20px_rgba(188,19,254,0.6)] flex items-center justify-center gap-3 animate-pulse border border-neon-purple"
            >
              <StopCircle className="w-6 h-6" /> FERMA ORA!
            </motion.button>
          )}

          {step === 'result' && result !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-full py-4 text-center text-3xl font-black font-display uppercase tracking-widest rounded-xl border ${isSuccess ? 'text-emerald-400 bg-emerald-950/40 border-emerald-500/50 text-glow-green' : 'text-red-500 bg-red-950/40 border-red-500/50 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]'}`}
            >
              {isSuccess ? 'SUCCESSO!' : 'FALLIMENTO!'}
            </motion.div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
