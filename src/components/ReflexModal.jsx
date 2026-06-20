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
          className="w-full max-w-sm flex flex-col items-center p-8 rounded-3xl glass-panel border border-neon-blue/50"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-neon-blue mb-4">Mettiti alla prova!</h2>
          <p className="text-gray-300 mb-6 text-center text-sm">
            Fermati nell'area verde. La paranoia aumenta la velocità!
          </p>

          <div className="w-full h-12 bg-gray-900 rounded-full border-2 border-gray-700 relative overflow-hidden mb-8 shadow-[0_0_15px_rgba(0,0,0,0.8)_inset]">
            {/* Green Zone */}
            <div 
              className="absolute top-0 bottom-0 bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
              style={{ left: `${greenStart}%`, width: `${greenWidth}%` }}
            ></div>
            
            {/* Cursor */}
            <div 
              className="absolute top-0 bottom-0 w-2 bg-white drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
              style={{ left: `calc(${cursorPos}% - 4px)` }}
            ></div>
          </div>

          {step === 'waiting' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 rounded-full bg-neon-blue text-black font-bold text-xl shadow-[0_0_15px_rgba(0,243,255,0.5)] flex items-center gap-2"
            >
              <Target className="w-6 h-6" /> Inizia
            </motion.button>
          )}

          {step === 'rolling' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStop}
              className="px-8 py-4 rounded-full bg-neon-purple text-white font-bold text-xl shadow-[0_0_20px_rgba(188,19,254,0.8)] flex items-center gap-2 animate-pulse"
            >
              <StopCircle className="w-6 h-6" /> STOP!
            </motion.button>
          )}

          {step === 'result' && result !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-3xl font-black uppercase ${isSuccess ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]'}`}
            >
              {isSuccess ? 'SUCCESSO!' : 'FALLIMENTO!'}
            </motion.div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
