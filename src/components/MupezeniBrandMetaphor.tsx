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
 * Hero Infographic: The Searching-For-Sales Visual Loop
 * Simplified Editorial Visual: Customer Signals -> Bird Scans -> ✦ Potential Sale Found -> AI Worker Responds
 */
export const HeroSearchingInfographic: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      label: 'SEARCH',
      sub: 'Scanning incoming customer signals across channels',
      badge: 'Unread WhatsApp & Web Traffic'
    },
    {
      label: 'FIND & IDENTIFY',
      sub: 'Bird identifies high-intent buying question',
      badge: '✦ Potential Sale Detected'
    },
    {
      label: 'ACT',
      sub: 'AI Worker confirms stock, pricing & answers delivery',
      badge: 'Autonomous Response in 0.8s'
    },
    {
      label: 'CAPTURE SALE',
      sub: 'Follow-up re-engages and secures order',
      badge: 'Sale captured · Human kept in control'
    }
  ];

  return (
    <div className={`relative rounded-2xl bg-[#130C08]/90 border border-white/10 p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden ${className}`}>
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B83A0A]/70 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <MupezeniBirdIcon size={24} />
          <div>
            <span className="text-xs font-syne font-bold uppercase tracking-wider text-[#FAFAF9] block">
              Searching For Sales
            </span>
            <span className="text-[10px] font-dm text-[#F5EDE4]/50">
              How Mupezeni discovers and acts on sales opportunities
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A0705] border border-white/10">
          <span className="text-[#E58330] text-xs">✦</span>
          <span className="text-[10px] font-dm font-semibold text-[#FAFAF9]/90 uppercase tracking-wider">
            Signal Active
          </span>
        </div>
      </div>

      {/* Visual Metaphor Diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 py-2">
        {steps.map((step, idx) => {
          const isActive = phase === idx;
          return (
            <div
              key={idx}
              className={`relative rounded-xl p-3 border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-b from-[#1E110A] to-[#140B07] border-[#B83A0A] shadow-[0_0_16px_rgba(184,58,10,0.25)]'
                  : 'bg-[#0A0705]/70 border-white/[0.06] opacity-75'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-syne font-bold tracking-widest text-[#B83A0A]">
                    STEP 0{idx + 1}
                  </span>
                  {isActive && (
                    <span className="text-[#E58330] text-xs animate-spin-slow">✦</span>
                  )}
                </div>

                <h4 className="text-xs font-syne font-bold text-[#FAFAF9]">
                  {step.label}
                </h4>

                <p className="text-[11px] font-dm text-[#F5EDE4]/70 leading-snug">
                  {step.sub}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-white/[0.06]">
                <span className={`text-[9.5px] font-mono block truncate ${isActive ? 'text-[#E58330] font-bold' : 'text-[#F5EDE4]/40'}`}>
                  {step.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress sequence bar */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] font-dm text-[#F5EDE4]/60">
        <div className="flex items-center gap-2">
          <span className="text-[#B83A0A] font-bold font-syne text-xs">SEARCH → FIND → IDENTIFY → ACT → SALE</span>
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                phase === dot ? 'w-5 bg-[#B83A0A]' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
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
