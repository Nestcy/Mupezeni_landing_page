import React from 'react';
import { ShieldCheck, RotateCcw, Clock, CheckCircle2 } from 'lucide-react';

interface MoneyBackGuaranteeBannerProps {
  compact?: boolean;
  className?: string;
}

export const MoneyBackGuaranteeBanner: React.FC<MoneyBackGuaranteeBannerProps> = ({
  compact = false,
  className = ''
}) => {
  if (compact) {
    return (
      <div 
        id="money-back-guarantee-compact"
        className={`p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#170C07] via-[#1F1008] to-[#170C07] border border-emerald-500/30 flex items-center justify-between gap-3 shadow-md ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold font-syne text-white">
                30-Day 100% Money-Back Guarantee
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 tracking-wider">
                Risk-Free
              </span>
            </div>
            <p className="text-[11px] text-[#FAFAF9]/75 mt-0.5">
              If you don’t see tangible value, saved hours, or revenue growth within 30 days, we’ll refund your subscription in full.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-emerald-400 whitespace-nowrap">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Zero Hassle</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="money-back-guarantee-banner"
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C0E08] via-[#140A05] to-[#0D0704] border-2 border-emerald-500/40 p-5 sm:p-7 shadow-xl shadow-black/40 ${className}`}
    >
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9B2208]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left: Shield & Core Message */}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-lg shadow-emerald-500/10">
            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-black font-syne uppercase tracking-wider">
                100% Risk-Free Trial
              </span>
              <span className="text-[11px] font-semibold text-white/50">
                Founder-Backed Guarantee
              </span>
            </div>

            <h3 className="text-base sm:text-xl font-black font-syne text-white tracking-tight">
              30-Day 100% Money-Back Guarantee
            </h3>

            <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed max-w-2xl">
              We stand completely behind the financial and operational impact of <span className="text-white font-semibold">Mupezeni</span>. If within your first 30 days of active deployment you do not see tangible business value, saved hours, or improved customer conversions, simply let our team know. We will refund 100% of your monthly subscription fee — no awkward questions, no fine print.
            </p>
          </div>
        </div>

        {/* Right: Key Assurance Points */}
        <div className="w-full md:w-auto md:min-w-[240px] pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-6 flex flex-col gap-2 text-xs font-syne">
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Full 30 days of live testing</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Prompt Airtel, MTN & bank refund</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Keep your digitized catalog data</span>
          </div>
          <div className="flex items-center gap-2 text-[#D95A1A] font-semibold pt-1">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>Refund processed in 24–48 hours</span>
          </div>
        </div>

      </div>
    </div>
  );
};
