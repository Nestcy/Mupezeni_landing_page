import React from 'react';
import { Sparkles, ArrowRight, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CurrencyMode } from '../types';

interface AnimatedPriceTickerProps {
  currency?: CurrencyMode;
  onSelectPlan?: (planId: string) => void;
  className?: string;
}

export const AnimatedPriceTicker: React.FC<AnimatedPriceTickerProps> = ({ 
  currency = 'ZMW',
  onSelectPlan,
  className = ''
}) => {
  const tickerItems = [
    {
      id: 'start',
      badge: '🟢 START',
      priceZmw: 'K500 / month',
      priceUsd: '$25 / month',
      role: 'AI Customer Support Employee',
      tag: 'Support Focused',
      colorClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
    },
    {
      id: 'grow',
      badge: '🔵 GROW (MOST POPULAR)',
      priceZmw: 'K2,000 / month',
      priceUsd: '$100 / month',
      role: 'AI Business Growth Employee',
      tag: 'Support + Marketing + Insights',
      colorClass: 'border-sky-500/50 bg-sky-950/30 text-sky-300'
    },
    {
      id: 'scale',
      badge: '🟣 SCALE',
      priceZmw: 'K4,000+ / month',
      priceUsd: '$200+ / month',
      role: 'Custom AI Employees',
      tag: 'Bespoke Workflows & Integrations',
      colorClass: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
    },
    {
      id: 'guarantee',
      badge: '🛡️ 30-DAY GUARANTEE',
      priceZmw: '100% Risk-Free',
      priceUsd: 'Zero Risk',
      role: '30-Day Money-Back Guarantee',
      tag: 'Month-to-Month Freedom',
      colorClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
    },
    {
      id: 'setup',
      badge: '⚡ ZERO SETUP FEES',
      priceZmw: 'K0 Onboarding',
      priceUsd: '$0 Setup',
      role: 'Full Implementation & Catalog Ingestion',
      tag: 'Physical Shop & Online Stores',
      colorClass: 'border-[#E58330]/40 bg-[#1A0E08] text-[#E58330]'
    },
    {
      id: 'channels',
      badge: '📱 OMNICHANNEL',
      priceZmw: '5 Channels',
      priceUsd: 'Active 24/7',
      role: 'WhatsApp, Facebook, Instagram, TikTok & Web',
      tag: 'Instant Responses',
      colorClass: 'border-teal-500/40 bg-teal-950/20 text-teal-300'
    }
  ];

  // Repeat for seamless infinite marquee loop
  const loopItems = [...tickerItems, ...tickerItems];

  return (
    <div 
      aria-label="Live Prices and Packages Ticker"
      className={`relative w-full overflow-hidden bg-gradient-to-r from-[#0D0805] via-[#050302] to-[#0D0805] border-y border-white/10 py-2.5 sm:py-3 select-none ${className}`}
    >
      {/* Subtle indicator tag on left for desktop */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#160B06] border border-[#E58330]/30 text-[10px] font-mono text-[#E58330] shadow-lg pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>PRICES MOVING L→R</span>
      </div>

      {/* Edge gradient masks for smooth fade in/out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#050302] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#050302] to-transparent z-10" />

      {/* Marquee Track moving LEFT TO RIGHT */}
      <div className="flex w-max items-center gap-3 sm:gap-4 animate-marquee-ltr cursor-pointer hover:[animation-play-state:paused]">
        {loopItems.map((item, index) => {
          const displayPrice = currency === 'ZMW' ? item.priceZmw : item.priceUsd;
          const secondaryPrice = currency === 'ZMW' ? item.priceUsd : item.priceZmw;

          return (
            <div
              key={`${item.id}-${index}`}
              onClick={() => onSelectPlan && item.id !== 'guarantee' && item.id !== 'setup' && item.id !== 'channels' && onSelectPlan(item.id)}
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border ${item.colorClass} hover:brightness-125 transition-all flex-shrink-0 shadow-sm`}
            >
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                {item.badge}
              </span>

              <span className="h-3 w-[1px] bg-white/15" />

              <div className="flex items-baseline gap-1.5">
                <span className="text-xs sm:text-sm font-black font-syne text-white tracking-tight">
                  {displayPrice}
                </span>
                <span className="text-[10px] font-mono text-white/50">
                  ({secondaryPrice})
                </span>
              </div>

              <span className="h-3 w-[1px] bg-white/15 hidden sm:inline" />

              <span className="text-[11px] text-white/80 hidden sm:inline">
                {item.role}
              </span>

              <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-white/60 font-mono hidden md:inline">
                {item.tag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
