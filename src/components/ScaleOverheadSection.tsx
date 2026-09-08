import React from 'react';
import { 
  TrendingUp, 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Users, 
  Scale, 
  Sparkles 
} from 'lucide-react';
import { GROWTH_COMPARISON } from '../data/websiteData';
import { PageId } from '../types';

interface ScaleOverheadSectionProps {
  onNavigate: (page: PageId) => void;
}

export const ScaleOverheadSection: React.FC<ScaleOverheadSectionProps> = ({ onNavigate }) => {
  return (
    <section id="scale-overhead" className="py-20 sm:py-28 relative bg-[#070503] border-t border-white/5 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Scale className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span className="text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              The Economic Advantage
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Scale Your Business,{' '}
            <span className="text-gradient-fire block sm:inline">
              Not Your Overhead.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#FAFAF9]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Growth naturally creates more enquiries, support requests, and operational complexity. Traditionally that meant hiring more people. Mupezeni provides an entirely new economic model.
          </p>
        </div>

        {/* 2-Column Comparison Layout (Side-by-side on mobile and desktop) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:gap-8 mb-12">
          
          {/* Column 1: Traditional Growth */}
          <div className="p-3 sm:p-7 lg:p-10 rounded-xl sm:rounded-3xl bg-gradient-to-b from-[#140D08]/90 via-[#0F0A06] to-[#0A0705] border border-red-950/40 shadow-xl flex flex-col justify-between relative group">
            <div className="space-y-3 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 sm:pb-4 border-b border-white/5 gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center text-red-400 flex-shrink-0">
                    <Users className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-red-400/80 font-syne block">
                      The Old Approach
                    </span>
                    <h3 className="text-xs sm:text-2xl font-black font-syne text-white leading-tight">
                      Traditional Growth
                    </h3>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-950/30 text-red-400 border border-red-900/30 text-[8px] sm:text-xs font-bold font-syne whitespace-nowrap">
                  Compounding Costs
                </span>
              </div>

              <p className="text-[10px] sm:text-sm text-[#FAFAF9]/70 leading-normal sm:leading-relaxed">
                As customer volume increases, overhead spikes proportionally with more payroll and management strain.
              </p>

              {/* Items List */}
              <ul className="space-y-1.5 sm:space-y-3 pt-1 sm:pt-2">
                {GROWTH_COMPARISON.traditional.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1 sm:gap-3 text-[9px] sm:text-sm text-[#FAFAF9]/75">
                    <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-tight sm:leading-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 sm:mt-8 pt-2.5 sm:pt-5 border-t border-white/5">
              <div className="p-2 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#080503] border border-red-950/50 flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs text-red-400/90 font-medium">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 flex-shrink-0" />
                <span className="leading-tight sm:leading-normal">Result: Shrinking profit margins as revenue grows.</span>
              </div>
            </div>
          </div>

          {/* Column 2: Growth with Mupezeni */}
          <div className="p-3 sm:p-7 lg:p-10 rounded-xl sm:rounded-3xl bg-gradient-to-b from-[#201009] via-[#160B06] to-[#0A0705] border-2 border-[#9B2208]/70 shadow-2xl shadow-[#9B2208]/20 flex flex-col justify-between relative group">
            
            {/* Top highlight pill */}
            <div className="absolute -top-2.5 sm:-top-3.5 right-2 sm:right-8 px-2 py-0.5 sm:px-4 sm:py-1 rounded-full bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white text-[8px] sm:text-[11px] font-black uppercase tracking-wider font-syne shadow-lg whitespace-nowrap">
              Scalable Leverage
            </div>

            <div className="space-y-3 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 sm:pb-4 border-b border-white/10 gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white shadow-md shadow-[#9B2208]/40 flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                      The Mupezeni Model
                    </span>
                    <h3 className="text-xs sm:text-2xl font-black font-syne text-white leading-tight">
                      Growth with Mupezeni
                    </h3>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#2A130A] text-[#D95A1A] border border-[#9B2208]/50 text-[8px] sm:text-xs font-bold font-syne whitespace-nowrap">
                  Fixed Investment
                </span>
              </div>

              <p className="text-[10px] sm:text-sm text-[#FAFAF9]/90 leading-normal sm:leading-relaxed">
                Your AI Teams absorb exponential customer demand instantly across every digital channel while payroll remains lean.
              </p>

              {/* Items List */}
              <ul className="space-y-1.5 sm:space-y-3 pt-1 sm:pt-2">
                {GROWTH_COMPARISON.mupezeni.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1 sm:gap-3 text-[9px] sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span className="leading-tight sm:leading-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 sm:mt-8 pt-2.5 sm:pt-5 border-t border-white/10">
              <div className="p-2 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#1A0E08] border border-[#9B2208]/50 flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs text-[#FAFAF9] font-semibold">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                <span className="leading-tight sm:leading-normal">Result: Expanding profit margins and unconstrained scale.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Anchor Conclusion Statement */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1A0E08] via-[#140C07] to-[#1A0E08] border border-[#9B2208]/50 text-center max-w-4xl mx-auto shadow-xl space-y-4">
          <p className="text-base sm:text-lg md:text-xl font-bold font-syne text-white leading-relaxed">
            "{GROWTH_COMPARISON.conclusion}"
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:opacity-95 shadow-lg shadow-[#9B2208]/30 transition-all cursor-pointer"
            >
              <span>Build Your Scalable AI Teams</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
