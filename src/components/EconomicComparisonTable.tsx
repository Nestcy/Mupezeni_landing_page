import React from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { ECONOMIC_COMPARISON_TABLE } from '../data/websiteData';
import { PageId } from '../types';

interface EconomicComparisonTableProps {
  compact?: boolean;
  showCta?: boolean;
  onNavigate?: (page: PageId) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const EconomicComparisonTable: React.FC<EconomicComparisonTableProps> = ({
  compact = false,
  showCta = false,
  onNavigate,
  className = '',
  title,
  subtitle
}) => {
  const data = ECONOMIC_COMPARISON_TABLE;

  return (
    <div 
      className={`overflow-hidden rounded-2xl border border-[#9B2208]/40 bg-[#0E0805] shadow-xl ${className}`}
    >
      {/* Table Header Bar */}
      <div className="px-4 py-3 bg-gradient-to-r from-[#170B06] via-[#1E0F0A] to-[#24110A] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D95A1A] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
            {title || data.title}
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold text-[#FAFAF9]/60 font-syne">
          {subtitle || data.subtitle}
        </span>
      </div>

      {/* Mobile-First Card View (<640px) */}
      <div className="block sm:hidden divide-y divide-white/5 font-syne">
        {data.rows.map((row, idx) => (
          <div key={idx} className="p-3.5 space-y-2 bg-[#0C0704]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                {row.departmentRole}
              </span>
              <span className="text-[10px] font-semibold text-emerald-300/90 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                {row.mupezeniBadge}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-[#140A06] border border-white/5">
                <span className="text-[9px] uppercase font-bold text-white/50 block mb-0.5">
                  Traditional Approach
                </span>
                <span className="text-white/70 font-medium text-[11px] leading-snug block">
                  {row.humanStaffCost}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#1A0E08] border border-[#9B2208]/40">
                <span className="text-[9px] uppercase font-bold text-[#D95A1A] block mb-0.5">
                  Mupezeni AI Team
                </span>
                <span className="text-emerald-400 font-bold text-[11px] leading-snug block">
                  {row.mupezeniCost}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Total Card */}
        <div className="p-3.5 bg-gradient-to-r from-[#1A0E08] via-[#24110A] to-[#1A0E08] border-t-2 border-[#9B2208] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white uppercase tracking-wider">
              {data.totalRow.label}
            </span>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <Check className="w-3 h-3" />
              <span>{data.totalRow.savingsHighlight}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#120804] border border-white/5">
              <span className="text-[9px] uppercase font-bold text-white/50 block mb-0.5">
                Traditional Approach
              </span>
              <span className="text-white/70 font-medium text-xs block leading-tight">
                {data.totalRow.humanTotal}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#28120B] border border-[#9B2208]">
              <span className="text-[9px] uppercase font-bold text-[#D95A1A] block mb-0.5">
                Mupezeni AI Team
              </span>
              <span className="text-base font-black text-white block leading-tight">
                {data.totalRow.mupezeniTotal}
              </span>
              <span className="text-[9px] text-emerald-400/90 font-medium">
                {data.totalRow.mupezeniNote}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop & Tablet Table Container (>=640px) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-white/10 text-[11px] sm:text-xs font-syne text-[#FAFAF9]/75 bg-[#120A06]">
              <th className="py-3 px-3.5 sm:px-4 font-bold">Operational Area</th>
              <th className="py-3 px-3.5 sm:px-4 font-semibold text-white/60">Traditional Approach</th>
              <th className="py-3 px-3.5 sm:px-4 font-black text-[#D95A1A] bg-[#1C0E08]">
                <span className="font-roboto font-bold">Mupezeni</span> AI Team
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs font-syne">
            {data.rows.map((row, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-2.5 sm:py-3 px-3.5 sm:px-4 font-medium text-white">
                  <div className="flex items-center gap-1.5">
                    <span>{row.departmentRole}</span>
                  </div>
                </td>
                <td className="py-2.5 sm:py-3 px-3.5 sm:px-4 text-white/70 font-normal">
                  {row.humanStaffCost}
                </td>
                <td className="py-2.5 sm:py-3 px-3.5 sm:px-4 font-bold text-emerald-400 bg-[#160D08]/80">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>{row.mupezeniCost}</span>
                    <span className="text-[10px] font-semibold text-emerald-300/80 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                      ({row.mupezeniBadge})
                    </span>
                  </div>
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-[#1C0E08]/90 border-t-2 border-[#9B2208]/60">
              <td className="py-3.5 px-3.5 sm:px-4 font-black text-white text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <span>{data.totalRow.label}</span>
                </div>
              </td>
              <td className="py-3.5 px-3.5 sm:px-4 font-medium text-white/70 text-xs sm:text-sm">
                <span>{data.totalRow.humanTotal}</span>
              </td>
              <td className="py-3.5 px-3.5 sm:px-4 font-black text-sm sm:text-base bg-[#24110A] text-[#D95A1A]">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-base sm:text-lg text-white font-black">{data.totalRow.mupezeniTotal}</span>
                  <span className="text-[10px] sm:text-xs font-normal text-white/60">
                    {data.totalRow.mupezeniNote}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 mt-1">
                  <Check className="w-3 h-3" />
                  <span>{data.totalRow.savingsHighlight}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Guarantee & Transparency Strip */}
      <div className="px-4 py-2.5 bg-[#080503] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-syne text-[#FAFAF9]/75">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
          <span>30-Day Money-Back Guarantee — Risk-free trial for operational value</span>
        </div>
        <span className="text-white/50 text-[10px]">
          Month-to-month • Zero setup fees • No lock-in
        </span>
      </div>

      {/* Footer banner or CTA */}
      {showCta && onNavigate && (
        <div className="px-4 py-3 bg-[#0B0604] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-[#FAFAF9]/70 text-[11px] text-center sm:text-left">
            Two AI workers + business insights dashboard for K2,000/month.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl font-syne font-bold text-xs text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Get Your AI Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
