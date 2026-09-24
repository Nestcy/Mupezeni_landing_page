import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  ArrowRight, 
  X, 
  Maximize2, 
  Minimize2, 
  Flame, 
  Star,
  Activity,
  ChevronDown
} from 'lucide-react';
import { GrowthCrossroadsSection } from './GrowthCrossroadsSection';
import { PageId } from '../types';

interface EmblemMotionSequenceProps {
  onNavigate: (page: PageId) => void;
  onTriggerComplete?: () => void;
}

export const EmblemMotionSequence: React.FC<EmblemMotionSequenceProps> = ({ 
  onNavigate,
  onTriggerComplete 
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'swoop' | 'swallow' | 'shockwave' | 'completed'>('idle');
  const [showModalStage, setShowModalStage] = useState<boolean>(false);
  const [targetMode, setTargetMode] = useState<'scroll' | 'popup'>('scroll');

  const startMotionSequence = (mode: 'scroll' | 'popup' = targetMode) => {
    if (isPlaying) return;
    setTargetMode(mode);
    setIsPlaying(true);
    setAnimationPhase('swoop');

    // Sequence timing
    // Phase 1: Swoop across towards the star (0 - 1200ms)
    setTimeout(() => {
      setAnimationPhase('swallow');
    }, 1100);

    // Phase 2: Swallow star & trigger shockwave explosion (1100 - 1800ms)
    setTimeout(() => {
      setAnimationPhase('shockwave');
    }, 1500);

    // Phase 3: Transition to Growth Crossroads (1900ms)
    setTimeout(() => {
      setAnimationPhase('completed');
      setIsPlaying(false);

      if (mode === 'popup') {
        setShowModalStage(true);
      } else {
        // Smoothly glide viewport to the Growth Crossroads section
        const targetElement = document.getElementById('growth-crossroads');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Trigger a temporary spotlight glow on the section
          targetElement.classList.add('ring-4', 'ring-[#D95A1A]', 'shadow-[0_0_80px_rgba(217,90,26,0.6)]');
          setTimeout(() => {
            targetElement.classList.remove('ring-4', 'ring-[#D95A1A]', 'shadow-[0_0_80px_rgba(217,90,26,0.6)]');
          }, 3200);
        }
      }

      if (onTriggerComplete) {
        onTriggerComplete();
      }
    }, 2200);
  };

  return (
    <>
      {/* -------------------------------------------------------------
          1. IN-HERO INTERACTIVE MOTION GRAPHICS LAUNCHPAD
          ------------------------------------------------------------- */}
      <div className="relative max-w-4xl mx-auto my-2.5 sm:my-6 p-2.5 sm:p-5 rounded-xl sm:rounded-3xl bg-gradient-to-r from-[#170C06] via-[#1F1008] to-[#170C06] border border-[#9B2208]/50 shadow-xl shadow-[#9B2208]/20 overflow-hidden group">
        
        {/* Background ambient pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D95A1A]/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-row items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Interactive Trajectory Preview (Side-by-side on mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-6 flex-1 min-w-0">
            
            {/* The Soaring Swallow Emblem Source */}
            <div className="relative flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] p-0.5 flex items-center justify-center shadow-md shadow-[#9B2208]/40 animate-pulse">
                <div className="w-full h-full bg-[#140A06] rounded-[7px] sm:rounded-[14px] flex items-center justify-center overflow-hidden p-0.5 sm:p-1">
                  <img
                    src="/logo.png"
                    alt="Mupezeni Soaring Swallow"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(217,90,26,0.8)]"
                  />
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-[10px] uppercase font-bold text-[#D95A1A] font-syne tracking-wider block">
                  AI Swallow
                </span>
                <span className="text-xs font-bold text-white font-syne">
                  <span className="font-brand font-light tracking-[0.2em]">MUPEZENI</span> Emblem
                </span>
              </div>
            </div>

            {/* Trajectory Flight Path */}
            <div className="flex-1 max-w-[50px] sm:max-w-[180px] flex flex-col items-center gap-0.5 sm:gap-1">
              <div className="w-full h-[1.5px] sm:h-[2px] bg-gradient-to-r from-[#D95A1A] via-[#F5A623] to-[#FFD700] relative flex items-center">
                {/* Traveling particle spark */}
                <motion.div 
                  animate={{ x: [0, 40, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-[0_0_8px_#FFD700] -translate-y-[3px] sm:-translate-y-[4px]"
                />
              </div>
              <span className="text-[7px] sm:text-[10px] uppercase tracking-widest text-amber-200/70 font-syne font-semibold flex items-center gap-0.5 whitespace-nowrap">
                <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#FFD700]" />
                <span className="hidden xs:inline">Leap</span>
              </span>
            </div>

            {/* The Gold Star Target */}
            <div className="relative flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="w-8 h-8 sm:w-13 sm:h-13 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#FFD700] p-0.5 flex items-center justify-center shadow-md shadow-[#FFD700]/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#181105] rounded-[7px] sm:rounded-[14px] flex items-center justify-center relative overflow-hidden">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-[#FFD700] fill-[#FFD700] animate-spin" style={{ animationDuration: '8s' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FFD700]/20 to-transparent animate-pulse" />
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-[10px] uppercase font-bold text-[#FFD700] font-syne tracking-wider block">
                  Gold Star
                </span>
                <span className="text-xs font-bold text-white font-syne">
                  Scaling Crossroads
                </span>
              </div>
            </div>

          </div>

          {/* Action Buttons (Compact on mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => startMotionSequence('scroll')}
              disabled={isPlaying}
              className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2.5 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-syne font-black text-[11px] sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:shadow-xl hover:shadow-[#9B2208]/40 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="sm:hidden">{isPlaying ? 'Swallowing...' : 'Fast-Forward'}</span>
              <span className="hidden sm:inline">{isPlaying ? 'Swallowing Star...' : 'Launch Motion Leap'}</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              onClick={() => startMotionSequence('popup')}
              disabled={isPlaying}
              title="Open Crossroads in Pop-up Stage"
              className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#120B07] hover:bg-[#1E110A] border border-[#9B2208]/40 text-[#D95A1A] hover:text-white transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* -------------------------------------------------------------
          2. FULLSCREEN CINEMATIC MOTION GRAPHICS OVERLAY
          ------------------------------------------------------------- */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl overflow-hidden pointer-events-auto"
          >
            {/* Cosmic speed rays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(217,90,26,0.3)_0%,_rgba(10,7,5,0.95)_70%)]" />

            {/* Kinetic Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                    scale: 0.5
                  }}
                  animate={{
                    x: [null, Math.random() * window.innerWidth],
                    y: [null, Math.random() * window.innerHeight],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.5, 0.2]
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#D95A1A] to-[#FFD700] blur-[1px]"
                />
              ))}
            </div>

            {/* The Flight Stage Container */}
            <div className="relative w-full max-w-4xl h-80 flex items-center justify-between px-8 sm:px-16">
              
              {/* Flight Motion Trail Beam */}
              <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-[#9B2208] via-[#D95A1A] to-[#FFD700] shadow-[0_0_20px_#D95A1A]" />

              {/* TARGET: The Golden Star */}
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={
                  animationPhase === 'swallow' 
                    ? { scale: [1, 2.2, 0], rotate: [0, 180, 720], opacity: [1, 1, 0] }
                    : animationPhase === 'shockwave' 
                    ? { scale: 0, opacity: 0 }
                    : { scale: [1, 1.2, 1], rotate: 360 }
                }
                transition={{ duration: animationPhase === 'swallow' ? 0.6 : 3, repeat: animationPhase === 'idle' ? Infinity : 0, ease: 'easeInOut' }}
                className="absolute right-12 sm:right-24 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
              >
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
                  {/* Star Outer Halo */}
                  <div className="absolute inset-0 bg-[#FFD700]/30 rounded-full blur-xl animate-pulse" />
                  
                  {/* Golden Star Core */}
                  <Star className="w-16 h-16 sm:w-24 sm:h-24 text-[#FFD700] fill-[#FFD700] filter drop-shadow-[0_0_25px_rgba(255,215,0,0.9)]" />
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-white animate-bounce" />
                </div>
              </motion.div>

              {/* ACTOR: The Mupezeni Soaring Swallow Emblem */}
              <motion.div
                initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                animate={
                  animationPhase === 'swoop' 
                    ? { 
                        x: [0, (window.innerWidth > 640 ? 520 : 260)], 
                        y: [0, -40, 0], 
                        scale: [1, 1.4, 1.8],
                        rotate: [0, -10, 15] 
                      }
                    : animationPhase === 'swallow' || animationPhase === 'shockwave'
                    ? { 
                        x: (window.innerWidth > 640 ? 520 : 260),
                        y: 0,
                        scale: [1.8, 2.5, 2],
                        rotate: 360
                      }
                    : { x: 0, y: 0, scale: 1 }
                }
                transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute left-12 sm:left-24 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#9B2208] via-[#B83A0A] to-[#D95A1A] p-1 shadow-[0_0_50px_rgba(217,90,26,0.8)] flex items-center justify-center">
                  
                  {/* Trailing Fire Jet Plasma */}
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-20 h-10 bg-gradient-to-l from-[#D95A1A] to-transparent blur-md rounded-full pointer-events-none" />
                  
                  <div className="w-full h-full bg-[#120804] rounded-[22px] flex items-center justify-center overflow-hidden p-2">
                    <img
                      src="/logo.png"
                      alt="Mupezeni Soaring Swallow"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]"
                    />
                  </div>
                </div>
              </motion.div>

              {/* SHOCKWAVE EXPLOSION ON IMPACT */}
              {animationPhase === 'shockwave' && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 8], opacity: [1, 0] }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="absolute right-12 sm:right-24 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-[#FFD700] bg-radial from-[#FFD700]/40 to-transparent shadow-[0_0_100px_#FFD700] z-40 pointer-events-none"
                />
              )}

            </div>

            {/* Kinetic Caption */}
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm sm:text-base font-black font-syne uppercase tracking-widest text-[#FFD700] flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5 text-[#D95A1A] animate-pulse" />
                <span><span className="font-brand font-light tracking-[0.2em] text-white">MUPEZENI</span> Swallow Absorbing Guiding Star</span>
              </motion.p>
              <p className="text-xs text-white/70 font-syne">
                Directing to The Retail Growth Crossroads...
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------
          3. POP-UP MODAL STAGE (ZERO-SCROLL THEATER MODE)
          ------------------------------------------------------------- */}
      <AnimatePresence>
        {showModalStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-[#0A0705] border-2 border-[#9B2208] rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto"
            >
              {/* Modal Top Bar */}
              <div className="sticky top-0 z-50 flex items-center justify-between p-4 sm:p-6 bg-[#0E0805]/95 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D95A1A] font-syne block">
                      Motion Theater Mode
                    </span>
                    <h3 className="text-base sm:text-lg font-black font-syne text-white">
                      The Retail Scaling Crossroads
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowModalStage(false);
                      const targetElement = document.getElementById('growth-crossroads');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#180E08] hover:bg-[#24130A] border border-white/10 text-xs text-white/80 font-syne font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View In Page</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setShowModalStage(false)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Embedded Interactive Growth Crossroads Section */}
              <div className="p-2 sm:p-4">
                <GrowthCrossroadsSection onNavigate={(page) => {
                  setShowModalStage(false);
                  onNavigate(page);
                }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
