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
                30-Day Money-Back Guarantee
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 tracking-wider">
                Risk-Free
              </span>
            </div>
            <p className="text-[11px] text-[#FAFAF9]/75 mt-0.5">
              Try your Mupezeni AI Team for 30 days. If the service does not provide meaningful operational value to your business, you can request a refund according to the guarantee terms.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-emerald-400 whitespace-nowrap">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Risk-Free</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="money-back-guarantee-banner"
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1C0E08] via-[#140A05] to-[#0D0704] border border-emerald-500/40 sm:border-2 p-3.5 sm:p-7 shadow-xl shadow-black/40 ${className}`}
    >
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9B2208]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Shield & Core Message */}
        <div className="flex items-start gap-3 sm:gap-4 flex-1">
          <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-lg shadow-emerald-500/10">
            <ShieldCheck className="w-4 h-4 sm:w-7 sm:h-7" />
          </div>

          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9px] sm:text-xs font-black font-syne uppercase tracking-wider">
                Risk-Free Evaluation
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-white/50">
                Operational Value Assurance
              </span>
            </div>

            <h3 className="text-sm sm:text-xl font-black font-syne text-white tracking-tight">
              30-Day Money-Back Guarantee
            </h3>

            <p className="text-[11px] sm:text-sm text-[#FAFAF9]/80 leading-relaxed max-w-2xl">
              Try your <span className="text-white font-semibold">Mupezeni AI Team</span> for 30 days. If the service does not provide meaningful operational value to your business, you can request a refund according to the guarantee terms — straightforward, transparent, and hassle-free.
            </p>
          </div>
        </div>

        {/* Right: Key Assurance Points */}
        <div className="w-full md:w-auto md:min-w-[240px] pt-2.5 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-6 grid grid-cols-2 md:flex md:flex-col gap-1.5 md:gap-2 text-[11px] sm:text-xs font-syne">
          <div className="flex items-center gap-1.5 text-white/90">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
            <span>Full 30-day live testing</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/90">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
            <span>Zero setup fees to start</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/90">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
            <span>Month-to-month commitment</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#D95A1A] font-semibold">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Processed promptly upon request</span>
          </div>
        </div>

      </div>
    </div>
  );
};
