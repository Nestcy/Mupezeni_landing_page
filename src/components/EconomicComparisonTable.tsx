import React from 'react';
import { ECONOMIC_COMPARISON } from '../data/websiteData';
import { Check, X, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const EconomicComparisonTable: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-mono tracking-widest text-[#E58330] uppercase font-semibold">
          Financial Comparison
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {ECONOMIC_COMPARISON.title}
        </h2>
        <p className="text-sm text-[#A8A099]">
          {ECONOMIC_COMPARISON.subtitle}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#2D1B0F] bg-[#0A0604] shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2D1B0F] bg-[#120B07]">
              <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#A8A099] w-2/5">
                Operational Function
              </th>
              <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#D17A2A] w-3/10 bg-[#1A0E08]/60">
                <div className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#E58330]" />
                  <span>Traditional Approach</span>
                </div>
              </th>
              <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#E58330] w-3/10 bg-[#241309] border-l border-[#3A1E0E]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E58330]" />
                  <span>Mupezeni AI Team</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F120A] text-sm">
            {ECONOMIC_COMPARISON.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-medium text-white">
                  <div className="space-y-0.5">
                    <div>{row.departmentRole}</div>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#A89E95] bg-[#140B06]/30">
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400/80 font-mono text-xs">✕</span>
                    <span className="text-xs">{row.humanStaffCost}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-emerald-300 font-semibold bg-[#1C0E07]/40 border-l border-[#2D180C]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-xs text-white">{row.mupezeniCost}</span>
                      <span className="block text-[10px] text-[#E58330] font-mono font-normal">
                        ({row.mupezeniBadge})
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#170C06] border-t-2 border-[#E58330]/40">
              <td className="py-5 px-6 font-bold text-white text-base">
                {ECONOMIC_COMPARISON.totalRow.label}
              </td>
              <td className="py-5 px-6 font-mono font-bold text-rose-300 text-sm bg-[#1A0C05]/50">
                {ECONOMIC_COMPARISON.totalRow.humanTotal}
              </td>
              <td className="py-5 px-6 font-mono font-bold text-emerald-400 text-lg bg-[#221008] border-l border-[#3D1E0C]">
                <div>
                  <span className="text-white font-['Space_Grotesk'] text-xl">{ECONOMIC_COMPARISON.totalRow.mupezeniTotal}</span>
                  <span className="block text-[11px] font-sans text-[#A8A099] font-normal">
                    {ECONOMIC_COMPARISON.totalRow.mupezeniNote}
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{ECONOMIC_COMPARISON.totalRow.savingsHighlight}</span>
        </div>
      </div>
    </div>
  );
};
