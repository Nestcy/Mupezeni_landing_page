import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  ShoppingCart, 
  Heart, 
  Clock, 
  ShoppingBag, 
  Megaphone, 
  User, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Zap
} from 'lucide-react';

/**
 * Mupezeni Soaring Bird Emblem Component
 */
export const MupezeniBirdIcon: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
}> = ({ className = '', size = 28, glow = true }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <span 
          className="absolute inset-0 rounded-full bg-[#B83A0A]/30 blur-sm animate-pulse pointer-events-none" 
        />
      )}
      <img
        src="/logo.png"
        alt="Mupezeni Seeker"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(217,90,26,0.6)]"
      />
    </div>
  );
};

/**
 * Found Signal Star ✦
 */
export const SignalStar: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}> = ({ size = 'md', label, className = '' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#B83A0A]/15 border border-[#B83A0A]/40 text-[#FAFAF9] font-syne font-semibold shadow-[0_0_12px_rgba(184,58,10,0.3)] ${sizeClasses[size]} ${className}`}
    >
      <span className="text-[#E58330] animate-pulse">✦</span>
      {label && <span className="text-[11px] tracking-wide uppercase font-dm font-bold text-[#F5EDE4]/90">{label}</span>}
    </span>
  );
};

/**
 * Hero Infographic: The Searching-For-Sales Mini Loop
 * A very small, sleek and compact brand indicator: Search → Find → Act → Sale
 */
export const HeroSearchingInfographic: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: 'SEARCH', hint: 'Scanning signals' },
    { label: 'FIND', hint: '✦ Intent identified' },
    { label: 'ACT', hint: 'AI Worker replies' },
    { label: 'SALE', hint: 'Order captured' }
  ];

  return (
    <div className={`inline-flex flex-wrap items-center gap-2 sm:gap-2.5 py-1.5 px-3 sm:px-3.5 rounded-xl sm:rounded-full bg-[#130C08]/90 border border-white/10 shadow-md backdrop-blur-sm text-xs ${className}`}>
      {/* Seeker Bird Icon & Label */}
      <div className="flex items-center gap-1.5 shrink-0">
        <MupezeniBirdIcon size={15} />
        <span className="text-[11px] font-syne font-bold text-[#FAFAF9]">
          Searching For Sales
        </span>
        <span className="text-[#E58330] text-[10px] animate-pulse">✦</span>
      </div>

      <div className="hidden sm:block h-3 w-[1px] bg-white/15 shrink-0" />

      {/* Mini Flow Pipeline */}
      <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[10.5px] font-mono">
        {steps.map((step, idx) => {
          const isActive = phase === idx;
          return (
            <div key={idx} className="flex items-center gap-1 sm:gap-1.5">
              <span
                className={`px-1.5 py-0.5 rounded transition-all duration-300 ${
                  isActive
                    ? 'bg-[#B83A0A] text-white font-bold shadow-sm shadow-[#B83A0A]/40'
                    : 'text-[#F5EDE4]/60 bg-white/[0.03]'
                }`}
                title={step.hint}
              >
                {step.label}
              </span>
              {idx < steps.length - 1 && (
                <span className="text-[#F5EDE4]/30 text-[9px]">→</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Active Micro-hint */}
      <span className="hidden md:inline-block text-[10px] font-mono text-emerald-400/90 pl-1 border-l border-white/10">
        {steps[phase].hint}
      </span>
    </div>
  );
};

/**
 * Reusable Discovery Infographic: "MUPEZENI IS ALWAYS LOOKING"
 * Used between major sections as a continuous visual ribbon.
 */
export const MupezeniSearchingBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [highlightIdx, setHighlightIdx] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % 6);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const signals = [
    { label: 'NEW ENQUIRY', icon: MessageSquare, channel: 'WhatsApp' },
    { label: 'CUSTOMER RETURNED', icon: User, channel: 'Instagram' },
    { label: 'PRODUCT VIEW SPIKE', icon: ShoppingBag, channel: 'Online Store' },
    { label: 'ABANDONED CART', icon: ShoppingCart, channel: 'Shopify' },
    { label: 'FOLLOW-UP WAITING', icon: Clock, channel: 'Web Chat' },
    { label: 'CAMPAIGN INTERACTION', icon: Megaphone, channel: 'Facebook' }
  ];

  return (
    <div className={`w-full py-8 bg-[#090604] border-y border-white/[0.07] overflow-hidden ${className}`}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <MupezeniBirdIcon size={26} />
            <div>
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                MUPEZENI IS ALWAYS LOOKING
              </span>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                Continuous signal discovery across all customer touchpoints
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-dm text-[#F5EDE4]/60">
            <span>Discovered signal</span>
            <span className="text-[#E58330] font-bold">✦</span>
            <span>becomes</span>
            <span className="font-syne font-bold text-[#FAFAF9] px-2 py-0.5 rounded bg-[#B83A0A]/20 border border-[#B83A0A]/40 text-[10.5px]">
              POTENTIAL SALE
            </span>
          </div>
        </div>

        {/* Dynamic Signals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {signals.map((sig, idx) => {
            const Icon = sig.icon;
            const isFound = highlightIdx === idx;
            return (
              <div
                key={idx}
                className={`relative p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  isFound
                    ? 'bg-[#1C1009] border-[#B83A0A] shadow-[0_0_20px_rgba(184,58,10,0.3)] scale-102'
                    : 'bg-[#0E0906] border-white/[0.05] hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isFound ? 'bg-[#B83A0A] text-white shadow-sm' : 'bg-white/[0.05] text-[#F5EDE4]/60'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {isFound ? (
                    <span className="text-xs text-[#E58330] animate-bounce">✦</span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  )}
                </div>

                <div>
                  <div className={`text-[10.5px] font-syne font-bold uppercase tracking-tight ${
                    isFound ? 'text-[#FAFAF9]' : 'text-[#F5EDE4]/75'
                  }`}>
                    {sig.label}
                  </div>
                  <div className="text-[9.5px] font-dm text-[#F5EDE4]/40 mt-0.5 flex items-center justify-between">
                    <span>{sig.channel}</span>
                    {isFound && (
                      <span className="text-[#E58330] font-mono font-semibold">FOUND</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
