import React from 'react';
import { motion } from 'motion/react';
import { Bot, UserCheck, Check, Sparkles } from 'lucide-react';

export const HumanAiSection: React.FC = () => {
  const mupezeniItems = [
    'Customer responses',
    'Follow-ups',
    'Re-engagement',
    'Content preparation',
    'Marketing activity',
    'Recurring workflows',
    'Business signals'
  ];

  const humanItems = [
    'Judgment',
    'Relationships',
    'Inventory',
    'Sourcing',
    'Strategy',
    'Approvals',
    'Direction'
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0A0705] text-[#FAFAF9] relative overflow-hidden border-t border-b border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              Division of Labor
            </span>
            <div className="h-[1px] w-12 bg-[#9B2208]/50 mx-auto" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.12]">
            AI handles the persistence. <span className="font-editorial text-[#F5EDE4]/90 block pt-1">You handle the business.</span>
          </h2>

          <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/75 max-w-2xl mx-auto leading-relaxed">
            Mupezeni isn't designed to replace the people who run the business. It handles the recurring work that demands attention but doesn't always deserve your time.
          </p>
        </div>

        {/* 2-Column Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Column 1: Mupezeni Handles */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/40 p-7 sm:p-9 space-y-6 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A0705] border border-white/[0.08] flex items-center justify-center text-[#B83A0A]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#B83A0A] block">
                    Persistent Execution
                  </span>
                  <h3 className="text-xl font-bold font-syne text-[#FAFAF9]">
                    MUPEZENI HANDLES
                  </h3>
                </div>
              </div>

              <ul className="space-y-3">
                {mupezeniItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-dm text-[#F5EDE4]/90">
                    <div className="w-4 h-4 rounded-full bg-[#B83A0A]/20 border border-[#B83A0A]/40 text-[#B83A0A] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.04] text-xs font-mono text-[#F5EDE4]/50">
              Autonomous, 24/7 continuous frontline capacity
            </div>
          </motion.div>

          {/* Column 2: You Handle */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#130C08] border border-white/[0.08] hover:border-white/20 p-7 sm:p-9 space-y-6 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A0705] border border-white/[0.08] flex items-center justify-center text-[#FAFAF9]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#F5EDE4]/60 block">
                    Human Leadership
                  </span>
                  <h3 className="text-xl font-bold font-syne text-[#FAFAF9]">
                    YOU HANDLE
                  </h3>
                </div>
              </div>

              <ul className="space-y-3">
                {humanItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-dm text-[#F5EDE4]/90">
                    <div className="w-4 h-4 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.04] text-xs font-mono text-[#F5EDE4]/50">
              High-value strategy, sourcing & core business judgment
            </div>
          </motion.div>

        </div>

        {/* Closing payoff */}
        <div className="text-center pt-4">
          <div className="text-2xl sm:text-3xl font-extrabold font-syne text-[#FAFAF9] tracking-tight">
            Your business keeps moving.{' '}
            <span className="font-editorial text-[#B83A0A]">You stay in control.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
