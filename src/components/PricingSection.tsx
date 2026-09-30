import React, { useState, useRef, useEffect } from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  TrendingUp, 
  Share2,
  BarChart3,
  Coins,
  MoveRight
} from 'lucide-react';
import { CurrencyMode } from '../types';

interface PricingSectionProps {
  onSelectPlan?: (planId?: string) => void;
  onNavigateToHowItWorks?: () => void;
  initialCurrency?: CurrencyMode;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ 
  onSelectPlan,
  onNavigateToHowItWorks,
  initialCurrency = 'ZMW'
}) => {
  const [currency, setCurrency] = useState<CurrencyMode>(initialCurrency);
  const [activePlanIdx, setActivePlanIdx] = useState(1); // default to GROW (recommended)
  const [isAutoMoving, setIsAutoMoving] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToPlan = (index: number) => {
    setActivePlanIdx(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetCard = container.children[index] as HTMLElement;
      if (targetCard) {
        const targetLeft = targetCard.offsetLeft - container.offsetLeft - 16;
        container.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: 'smooth'
        });
      }
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const children = Array.from(container.children) as HTMLElement[];
      if (children.length > 0) {
        let closestIdx = 0;
        let minDiff = Infinity;
        children.forEach((child, idx) => {
          const diff = Math.abs(child.offsetLeft - container.offsetLeft - 16 - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });
        setActivePlanIdx(closestIdx);
      }
    }
  };

  const moveLeft = () => {
    const nextIdx = Math.max(0, activePlanIdx - 1);
    scrollToPlan(nextIdx);
  };

  const moveRight = () => {
    const nextIdx = Math.min(2, activePlanIdx + 1);
    scrollToPlan(nextIdx);
  };

  // Auto-move left to right timer
  useEffect(() => {
    if (!isAutoMoving) return;
    const timer = setInterval(() => {
      setActivePlanIdx((prev) => {
        const next = (prev + 1) % 3;
        scrollToPlan(next);
        return next;
      });
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoMoving]);

  return (
    <section id="pricing-section" className="py-12 sm:py-16 lg:py-20 bg-[#050302] relative overflow-hidden border-t border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#E58330]/30 text-[#E58330] text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing Tiers</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight">
            Choose the AI Employee Plan <br className="hidden sm:inline" />
            <span className="text-gradient-fire">Built for Your Growth Stage</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A099] max-w-2xl mx-auto leading-relaxed">
            Deploy dedicated AI employees across WhatsApp, Facebook, Instagram, TikTok, and Website. Zero setup fees, cancel anytime, and 30-day money-back guarantee.
          </p>

          {/* CURRENCY TOGGLE BUTTONS: Zambia Kwacha vs International USD */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#A8A099] font-mono">
              <Coins className="w-3.5 h-3.5 text-[#E58330]" />
              <span>Select Currency:</span>
            </div>

            <div className="inline-flex p-1 rounded-2xl bg-[#140C07] border border-white/10 shadow-xl backdrop-blur-sm">
              {/* Zambia Kwacha Button */}
              <button
                type="button"
                onClick={() => setCurrency('ZMW')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all duration-200 cursor-pointer ${
                  currency === 'ZMW'
                    ? 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white shadow-lg shadow-[#9B2208]/40 scale-100 ring-1 ring-white/20'
                    : 'text-[#A8A099] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🇿🇲 Zambia Kwacha (ZMW)</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 font-medium">
                  K500 · K2000 · K 4000/mo
                </span>
              </button>

              {/* International USD Button */}
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all duration-200 cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-sky-600/40 scale-100 ring-1 ring-white/20'
                    : 'text-[#A8A099] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🌐 International USD ($)</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 font-medium">
                  $25 · $100 · $200+/mo
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* HORIZONTAL MOVEMENT CONTROLS (Move Left to Right) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-b border-white/5 pb-3">
          {/* Quick jump tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => scrollToPlan(0)}
              className={`px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all cursor-pointer whitespace-nowrap ${
                activePlanIdx === 0
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-[#A8A099] hover:text-white bg-white/5 border border-transparent'
              }`}
            >
              🟢 1. START ({currency === 'ZMW' ? 'K500' : '$25'})
            </button>

            <button
              type="button"
              onClick={() => scrollToPlan(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all cursor-pointer whitespace-nowrap ${
                activePlanIdx === 1
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 shadow-sm'
                  : 'text-[#A8A099] hover:text-white bg-white/5 border border-transparent'
              }`}
            >
              🔵 2. GROW · Recommended ({currency === 'ZMW' ? 'K2,000' : '$100'})
            </button>

            <button
              type="button"
              onClick={() => scrollToPlan(2)}
              className={`px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all cursor-pointer whitespace-nowrap ${
                activePlanIdx === 2
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-[#A8A099] hover:text-white bg-white/5 border border-transparent'
              }`}
            >
              🟣 3. SCALE ({currency === 'ZMW' ? 'K4,000+' : '$200+'})
            </button>
          </div>

          {/* Left / Right horizontal controllers */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAutoMoving(!isAutoMoving)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all cursor-pointer ${
                isAutoMoving 
                  ? 'bg-[#9B2208]/40 border border-[#B83010] text-white shadow-md' 
                  : 'bg-[#140C07] border border-white/10 text-[#A8A099] hover:text-white'
              }`}
              title="Toggle continuous left-to-right movement"
            >
              <MoveRight className={`w-3.5 h-3.5 ${isAutoMoving ? 'text-[#D95A1A] animate-pulse' : ''}`} />
              <span>{isAutoMoving ? 'Moving L→R (Active)' : 'Auto Move L→R'}</span>
            </button>

            <div className="flex items-center gap-1 bg-[#140C07] p-1 rounded-xl border border-white/10 shadow-md">
              <button
                type="button"
                onClick={moveLeft}
                disabled={activePlanIdx === 0}
                className="p-1.5 rounded-lg text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Move Left"
                aria-label="Move left horizontally"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono px-1.5 text-[#A8A099]">
                {activePlanIdx + 1}/3
              </span>
              <button
                type="button"
                onClick={moveRight}
                disabled={activePlanIdx === 2}
                className="p-1.5 rounded-lg text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Move Right"
                aria-label="Move right horizontally"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* HORIZONTAL MOVING PRICING CARDS TRACK (Moving Left to Right) */}
        <div className="relative">
          {/* Subtle side fade overlays on desktop */}
          <div className="hidden xl:block absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#050302] to-transparent pointer-events-none z-10" />
          <div className="hidden xl:block absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#050302] to-transparent pointer-events-none z-10" />

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory gap-5 sm:gap-6 lg:gap-7 items-stretch pb-6 pt-3 px-1 scroll-smooth"
            style={{ 
              scrollbarWidth: 'thin', 
              scrollbarColor: '#B83010 #140C07' 
            }}
          >
            
            {/* TIER 1: 🟢 START */}
            <div className="w-[85vw] max-w-[350px] sm:w-[380px] lg:w-[calc(33.333%-1rem)] lg:min-w-[340px] shrink-0 snap-center relative rounded-2xl sm:rounded-3xl bg-[#080E0B] border border-emerald-500/30 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/60 transition-all duration-300 shadow-xl group">
              <div className="space-y-5">
                
                {/* Badge & Title */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    <span>🟢 START</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                      AI Customer Support Employee
                    </h3>
                    <p className="text-xs text-[#A8A099] mt-1 leading-snug">
                      Your AI employee for customer support.
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="pt-2 pb-3 border-y border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white font-syne">
                      {currency === 'ZMW' ? 'K500' : '$25'}
                    </span>
                    <span className="text-xs text-[#A8A099] font-mono">/ month</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-emerald-400 font-mono">
                      Single employee · Support focused
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {currency === 'ZMW' ? '≈ $25 / mo USD' : '≈ K500 / mo ZMW'}
                    </span>
                  </div>
                </div>

                {/* Works Across */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8A099] font-bold block">
                    Works across:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['WhatsApp', 'Facebook', 'Instagram', 'TikTok', 'Website / E-commerce'].map((channel) => (
                      <span 
                        key={channel}
                        className="px-2 py-0.5 rounded-md bg-[#111F18] border border-emerald-500/20 text-[10px] font-mono text-emerald-300"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Handles List */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8A099] font-bold block">
                    Handles:
                  </span>
                  <div className="space-y-1.5 text-xs text-[#D4CDC5]">
                    {[
                      'Customer questions',
                      'FAQs',
                      'Product & service information',
                      'Basic enquiries',
                      'Lead capture',
                      'Basic follow-up',
                      '24/7 customer responses',
                      'Marketing assistance',
                      'Up to 5 social posts/month'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-3.5 h-3.5 rounded bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug text-[11.5px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not Included / Limitations */}
                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B635B] font-semibold block">
                    Not included:
                  </span>
                  {[
                    'No ongoing marketing consistency',
                    'No marketing strategy',
                    'No reporting',
                    'No business insights'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-[#6B635B]">
                      <X className="w-3 h-3 text-red-400/60 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <button
                  onClick={() => onSelectPlan && onSelectPlan('start')}
                  className="w-full py-3 px-4 rounded-xl bg-[#111F18] hover:bg-[#162920] border border-emerald-500/40 hover:border-emerald-500 text-emerald-300 font-syne font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-98"
                >
                  <span>Get START ({currency === 'ZMW' ? 'K500/mo' : '$25/mo'})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* TIER 2: 🔵 GROW (MOST POPULAR) */}
            <div className="w-[85vw] max-w-[350px] sm:w-[380px] lg:w-[calc(33.333%-1rem)] lg:min-w-[340px] shrink-0 snap-center relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0F172A] via-[#0B1324] to-[#070D18] border-2 border-sky-400 shadow-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-sky-300 transition-all duration-300 lg:-translate-y-1 group">
              
              {/* Top Most Popular Ribbon */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-bold font-mono px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1 whitespace-nowrap">
                <Sparkles className="w-3 h-3" />
                <span>MOST POPULAR · RECOMMENDED</span>
              </div>

              <div className="space-y-5">
                
                {/* Badge & Title */}
                <div className="space-y-2 pt-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/40 text-sky-300 text-xs font-mono font-bold">
                    <span>🔵 GROW</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                      AI Business Growth Employee
                    </h3>
                    <p className="text-xs text-sky-200/90 mt-1 leading-snug">
                      Your AI employee for customer support, marketing & growth.
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="pt-2 pb-3 border-y border-sky-500/20">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white font-syne">
                      {currency === 'ZMW' ? 'K2,000' : '$100'}
                    </span>
                    <span className="text-xs text-[#A8A099] font-mono">/ month</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-sky-400 font-mono font-semibold">
                      Complete workforce · Support + Marketing + Insights
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {currency === 'ZMW' ? '≈ $100 / mo USD' : '≈ K2,000 / mo ZMW'}
                    </span>
                  </div>
                </div>

                {/* Inclusions highlight */}
                <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300 font-medium">
                  ✓ Everything in START, plus:
                </div>

                {/* 3 Categories of Grow Capabilities */}
                <div className="space-y-3.5 text-xs">
                  
                  {/* 1. Customer Growth */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-sky-400" />
                      <span>Customer Growth</span>
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#D4CDC5]">
                      {['Lead qualification', 'Advanced follow-up', 'Customer re-engagement', 'Sales assistance'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Marketing */}
                  <div className="space-y-1.5 pt-1.5 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1">
                      <Share2 className="w-3 h-3 text-sky-400" />
                      <span>Marketing</span>
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#D4CDC5]">
                      {[
                        'Consistent social content',
                        'Content planning',
                        'Ongoing marketing',
                        'Promotional content',
                        'Marketing strategy',
                        'Campaign optimization'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Business Intelligence */}
                  <div className="space-y-1.5 pt-1.5 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1">
                      <BarChart3 className="w-3 h-3 text-sky-400" />
                      <span>Business Intelligence</span>
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#D4CDC5]">
                      {['Reporting', 'Business insights', 'Growth opportunities', 'AI recommendations'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <button
                  onClick={() => onSelectPlan && onSelectPlan('grow')}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-syne font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-sky-500/25 active:scale-98"
                >
                  <span>Deploy AI Growth Employee ({currency === 'ZMW' ? 'K2,000/mo' : '$100/mo'})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TIER 3: 🟣 SCALE */}
            <div className="w-[85vw] max-w-[350px] sm:w-[380px] lg:w-[calc(33.333%-1rem)] lg:min-w-[340px] shrink-0 snap-center relative rounded-2xl sm:rounded-3xl bg-[#0E0814] border border-purple-500/30 p-6 sm:p-7 flex flex-col justify-between hover:border-purple-500/60 transition-all duration-300 shadow-xl group">
              <div className="space-y-5">
                
                {/* Badge & Title */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                    <span>🟣 SCALE</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                      Custom AI Employees
                    </h3>
                    <p className="text-xs text-[#A8A099] mt-1 leading-snug">
                      AI employees built around your business.
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="pt-2 pb-3 border-y border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white font-syne">
                      {currency === 'ZMW' ? 'K4,000+' : '$200+'}
                    </span>
                    <span className="text-xs text-[#A8A099] font-mono">/ month</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-purple-400 font-mono">
                      Custom pricing based on requirements
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {currency === 'ZMW' ? '≈ $200+/mo USD' : '≈ K4,000+/mo ZMW'}
                    </span>
                  </div>
                </div>

                {/* Scope */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8A099] font-bold block">
                    Custom Capabilities:
                  </span>
                  <div className="space-y-2 text-xs text-[#D4CDC5]">
                    {[
                      'Custom AI solutions',
                      'Custom AI employees',
                      'Custom integrations',
                      'Specialized business processes',
                      'Advanced reporting',
                      'Higher-volume requirements',
                      'Business-specific requirements',
                      'Custom pricing based on requirements'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-3.5 h-3.5 rounded bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug text-[11.5px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200/90 leading-relaxed font-mono text-[11px]">
                  Tailored for multi-branch retailers, distributors, and custom workflows.
                </div>

              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <button
                  onClick={() => onSelectPlan && onSelectPlan('scale')}
                  className="w-full py-3 px-4 rounded-xl bg-[#1C102A] hover:bg-[#251538] border border-purple-500/40 hover:border-purple-500 text-purple-200 font-syne font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-98"
                >
                  <span>Request Custom Solution ({currency === 'ZMW' ? 'from K4,000/mo' : 'from $200+/mo'})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Guarantee and terms footer whisper */}
        <div className="p-4 rounded-2xl bg-[#0D0805] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#CFC7BF] max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong>30-Day Money-Back Guarantee:</strong> Zero setup fees, month-to-month commitment, cancel anytime. Backed in {currency === 'ZMW' ? 'Zambian Kwacha (K500, K2,000, K4,000)' : 'USD ($25, $100, $200+)'}.
            </span>
          </div>
          <button
            onClick={() => {
              if (onNavigateToHowItWorks) {
                onNavigateToHowItWorks();
              } else if (onSelectPlan) {
                onSelectPlan('how-it-works');
              }
            }}
            className="text-[#E58330] hover:text-white font-mono text-xs underline underline-offset-4 cursor-pointer whitespace-nowrap"
          >
            See How It Works →
          </button>
        </div>

      </div>
    </section>
  );
};
