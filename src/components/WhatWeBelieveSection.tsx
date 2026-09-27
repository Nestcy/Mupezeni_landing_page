import React from 'react';
import { motion } from 'motion/react';
import { Layers, Cpu, Users, Sparkles } from 'lucide-react';

interface BeliefPrinciple {
  number: string;
  title: string;
  thesis: string;
  subtext: string;
  focusList?: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const BELIEFS: BeliefPrinciple[] = [
  {
    number: '01',
    title: 'CAPACITY IS THE REAL CONSTRAINT',
    thesis: 'Growth creates work.',
    subtext: 'When work grows faster than a company’s ability to handle it, capacity becomes the constraint. Mupezeni exists to expand that capacity.',
    icon: Layers
  },
  {
    number: '02',
    title: 'SOFTWARE SHOULD DO THE WORK',
    thesis: 'Business software has traditionally required people to operate it.',
    subtext: 'We believe the next generation should increasingly be able to operate alongside people. The system shouldn’t simply tell you what to do. Where appropriate, it should be able to do the work itself.',
    icon: Cpu
  },
  {
    number: '03',
    title: 'HUMANS SHOULD FOCUS ON WHAT MATTERS',
    thesis: 'AI should handle recurring execution.',
    subtext: 'The objective isn’t to remove people from businesses. It’s to remove unnecessary work from people.',
    focusList: ['Judgment', 'Relationships', 'Strategy', 'Creativity', 'Leadership', 'Important decisions'],
    icon: Users
  },
  {
    number: '04',
    title: 'ONE WORKFORCE, MANY BUSINESSES',
    thesis: 'Every business is different.',
    subtext: 'The workflows, customers, products, channels, and operating models vary. But the underlying problem is remarkably consistent: There is always more work than the team wants to manually handle. Mupezeni is built as a flexible AI workforce that adapts to your business.',
    icon: Sparkles
  }
];

export const WhatWeBelieveSection: React.FC = () => {
  return (
    <section id="what-we-believe" className="py-20 sm:py-28 bg-[#0A0705] text-[#FAFAF9] relative overflow-hidden border-t border-b border-white/[0.06]">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              What We Believe
            </span>
            <div className="h-[1px] w-12 bg-[#9B2208]/50 mx-auto" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Four Core Beliefs Behind Mupezeni
          </h2>

          <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/75 leading-relaxed">
            The foundation of our engineering philosophy and how we approach autonomous workforce architecture.
          </p>
        </div>

        {/* 4 Core Beliefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BELIEFS.map((belief, idx) => {
            const Icon = belief.icon;
            return (
              <motion.div
                key={belief.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="relative rounded-2xl bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/40 p-7 sm:p-9 space-y-5 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Header: Number and Title */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/[0.04] text-[#B83A0A]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-syne font-bold tracking-wider text-[#F5EDE4]/90">
                        {belief.number} — {belief.title}
                      </span>
                    </div>
                  </div>

                  {/* Thesis Statement */}
                  <div className="text-lg sm:text-xl font-bold font-syne text-[#FAFAF9] leading-snug">
                    {belief.thesis}
                  </div>

                  {/* Explanation Prose */}
                  <p className="text-sm font-dm text-[#F5EDE4]/75 leading-relaxed">
                    {belief.subtext}
                  </p>

                  {/* Optional Focus Elements for Humans */}
                  {belief.focusList && (
                    <div className="pt-2">
                      <div className="text-[11px] font-syne font-semibold uppercase tracking-wider text-[#B83A0A] mb-2">
                        People Focus On:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {belief.focusList.map((item, i) => (
                          <span 
                            key={i} 
                            className="text-xs font-dm px-2.5 py-1 rounded-md bg-[#0A0705] border border-white/[0.08] text-[#FAFAF9]/90"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/[0.04] text-[11px] font-dm text-[#F5EDE4]/40 flex items-center justify-between">
                  <span>Mupezeni Operating Thesis</span>
                  <span className="text-[#B83A0A] font-syne font-semibold">Principle {belief.number}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
