import React from 'react';
import { motion } from 'motion/react';
import { Layers, CheckCircle2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export const BusinessOutcomeSection: React.FC<{ onGetStarted?: () => void }> = ({ onGetStarted }) => {
  const absorbedStreams = [
    { title: 'Customer Work', desc: 'Inquiries, sizing, stock checks, pricing & delivery guidance' },
    { title: 'Marketing Work', desc: 'Daily post preparation, campaign copy & multi-channel distribution' },
    { title: 'Follow-Up Work', desc: 'Re-engaging quiet buyers & abandoned checkouts' },
    { title: 'Business Signals', desc: 'Real-time detection of high-demand items & revenue bottlenecks' },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0A0705] text-[#FAFAF9] relative overflow-hidden border-t border-b border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#9B2208]/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-20">
        
        {/* Part 1: More capacity. Not more complexity. */}
        <div className="rounded-3xl bg-[#130C08] border border-white/[0.08] p-8 sm:p-12 lg:p-14 shadow-2xl space-y-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              Capacity vs Complexity
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight">
              More capacity. Not more complexity.
            </h2>

            <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/75 max-w-2xl mx-auto leading-relaxed">
              Adding software often means adding another dashboard, another login, another process, and another thing to manage. Mupezeni takes a different approach.
            </p>

            <div className="pt-2 text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-[#FAFAF9]">
              Software should do the work.{' '}
              <span className="font-editorial text-[#B83A0A] block pt-1">Not create more work.</span>
            </div>
          </div>

          {/* 4 Absorbed Streams */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {absorbedStreams.map((stream, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#0A0705] border border-white/[0.06] space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B83A0A]" />
                  <h3 className="text-sm font-bold font-syne text-[#FAFAF9]">
                    {stream.title}
                  </h3>
                </div>
                <p className="text-xs font-dm text-[#F5EDE4]/70 leading-relaxed">
                  {stream.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: The Goal Isn't More Automation. It's More Sales Opportunities Acted On. */}
        <div className="max-w-3xl mx-auto text-center space-y-6 pt-4">
          <div className="space-y-2">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              The Real Commercial Payoff
            </span>
            <div className="h-[1px] w-12 bg-[#9B2208]/50 mx-auto" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            The goal isn't more automation.{' '}
            <span className="font-editorial text-[#F5EDE4]/90 block pt-1">
              It’s more sales opportunities acted on.
            </span>
          </h2>

          <div className="space-y-4 text-base sm:text-lg font-dm text-[#F5EDE4]/80 leading-relaxed font-normal">
            <p>
              Every response that happens on time. Every follow-up that doesn't get forgotten. Every customer who gets another reason to buy. Every marketing action that keeps the business visible.
            </p>
            <p className="text-sm sm:text-base text-[#F5EDE4]/65">
              These are small moments. Together, they shape how much business a company can actually handle.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
