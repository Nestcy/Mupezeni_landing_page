import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MoneyBackGuaranteeBannerProps {
  onLearnMore?: () => void;
}

export const MoneyBackGuaranteeBanner: React.FC<MoneyBackGuaranteeBannerProps> = ({ onLearnMore }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#170E08] via-[#100905] to-[#170E08] border border-[#E58330]/30 p-6 sm:p-8 shadow-xl">
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#E58330]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#E58330]/10 border border-[#E58330]/30 text-[#E58330] shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E58330] font-semibold">Risk-Free Guarantee</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E58330]" />
              <span className="text-xs text-[#A8A099]">30-Day Period</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Try Your AI Team for 30 Days. 100% Guaranteed.
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A099] max-w-xl">
              If your AI workers do not save you hours of manual work and improve customer response speed within the first month, we will refund 100% of your K2,000 fee. No hassles, no questions asked.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>Zero Setup Fees</span>
          </div>
          {onLearnMore && (
            <button
              onClick={onLearnMore}
              className="text-xs text-[#E58330] hover:text-[#FFA959] underline font-medium transition-colors"
            >
              Policy Details &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
