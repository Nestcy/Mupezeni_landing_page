import React from 'react';
import { motion } from 'motion/react';
import { Layers, Cpu, Users, Clock } from 'lucide-react';

interface BeliefPrinciple {
  number: string;
  title: string;
  quote: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRINCIPLES: BeliefPrinciple[] = [
  {
    number: '01',
    title: 'CAPACITY IS THE REAL CONSTRAINT',
    quote: 'Demand isn’t useful if the business cannot act on it.',
    subtext: 'When customer conversations and follow-ups outpace human capacity, valuable sales opportunities slip away. Mupezeni exists to expand that operational capacity.',
    icon: Layers
  },
  {
    number: '02',
    title: 'SOFTWARE SHOULD DO THE WORK',
    quote: 'Technology should reduce operational burden, not create another layer of it.',
    subtext: 'Business software has traditionally required people to operate it. We believe software should take responsibility for recurring business execution directly.',
    icon: Cpu
  },
  {
    number: '03',
    title: 'HUMANS SHOULD FOCUS ON WHAT MATTERS',
    quote: 'Judgment, relationships, creativity, strategy, and direction remain human.',
    subtext: 'AI handles continuous execution and persistence. The people behind the business stay focused on relationships, high-value strategy, and core leadership.',
    icon: Users
  },
  {
    number: '04',
    title: 'POTENTIAL SALES SHOULDN’T DEPEND ON SOMEONE BEING AVAILABLE',
    quote: 'A customer shouldn’t have to wait because the owner is busy.',
    subtext: 'A follow-up shouldn’t disappear because nobody remembered. Marketing shouldn’t stop because the team had a difficult day. Capacity should be persistent.',
    icon: Clock
  }
];

export const WhatWeBelieveSection: React.FC = () => {
  return (
    <section id="what-we-believe" className="py-20 sm:py-28 bg-[#0A0705] text-[#FAFAF9] relative overflow-hidden border-t border-b border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="space-y-2">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              Why Mupezeni Exists
            </span>
            <div className="h-[1px] w-12 bg-[#9B2208]/50 mx-auto" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Built for businesses that refuse to stop growing.
          </h2>

          <div className="space-y-3 text-base sm:text-lg font-dm text-[#F5EDE4]/80 leading-relaxed max-w-2xl mx-auto">
            <p>
              Growth creates opportunity. It also creates work.
            </p>
            <p className="text-sm sm:text-base text-[#F5EDE4]/70">
              More customers create more conversations. More conversations create more follow-ups. More demand creates more operational pressure. Eventually, the business needs more capacity. Mupezeni exists to provide it.
            </p>
          </div>

          <div className="pt-2">
            <div className="text-xl sm:text-2xl font-editorial text-[#FAFAF9]">
              Your business shouldn’t need more of your time to grow.
            </div>
          </div>
        </div>

        {/* 4 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="relative rounded-3xl bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/40 p-7 sm:p-9 space-y-5 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Principle Number & Title */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/[0.04] text-[#B83A0A]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-syne font-bold tracking-wider text-[#F5EDE4]/90">
                        {principle.number} — {principle.title}
                      </span>
                    </div>
                  </div>

                  {/* Core Quote */}
                  <div className="text-lg sm:text-xl font-editorial text-[#FAFAF9] leading-snug">
                    "{principle.quote}"
                  </div>

                  {/* Explanation */}
                  <p className="text-sm font-dm text-[#F5EDE4]/75 leading-relaxed">
                    {principle.subtext}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.04] text-[11px] font-dm text-[#F5EDE4]/40 flex items-center justify-between">
                  <span>Operating Principle</span>
                  <span className="text-[#B83A0A] font-syne font-semibold">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
