import React from 'react';
import { Quote, Sparkles, ShieldCheck, Zap, Bot, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface WhatWeBelieveSectionProps {
  onNavigate?: (page: PageId) => void;
}

const BELIEFS = [
  {
    quote: "Businesses shouldn't have to increase payroll every time demand increases.",
    author: "Operating Principle 01",
    subtitle: "Scale Without Payroll Bloat",
    description: "Retail demand spikes during seasonal rushes, flash drops, and late evenings. Your capacity to serve customers and capture revenue should scale seamlessly without demanding proportional additions to your monthly wage bill.",
    icon: ShieldCheck,
    accent: "from-[#9B2208] to-[#D95A1A]"
  },
  {
    quote: "Technology should help retailers compete with much larger businesses.",
    author: "Operating Principle 02",
    subtitle: "Democratic Leverage",
    description: "Enterprise conglomerates spend millions on around-the-clock call centers and creative agencies. Mupezeni equips ambitious independent retailers with identical institutional firepower at a fraction of the cost.",
    icon: Zap,
    accent: "from-[#D95A1A] to-[#F57C00]"
  },
  {
    quote: "AI should amplify entrepreneurs rather than replace them.",
    author: "Operating Principle 03",
    subtitle: "Amplify the Business Owner",
    description: "Our mission is not to replace human retail owners or physical teams. We remove the repetitive digital friction—answering the same price question 80 times a day—so you can focus on sourcing, quality, and leadership.",
    icon: Sparkles,
    accent: "from-[#7A1804] to-[#9B2208]"
  },
  {
    quote: "The future belongs to businesses combining human judgement with intelligent AI Teams.",
    author: "Operating Principle 04",
    subtitle: "Human Judgment + AI Teams",
    description: "Intelligent digital workers handle tireless 24/7 speed, memory, and automated workflows. Human retail founders provide taste, curation, ethical standards, and physical inventory mastery.",
    icon: Bot,
    accent: "from-[#B83A0A] to-[#D95A1A]"
  }
];

export const WhatWeBelieveSection: React.FC<WhatWeBelieveSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 relative bg-[#090503] border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[#D95A1A] text-xs font-bold font-syne uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span>Our Core Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            What We Believe
          </h2>

          <p className="text-sm sm:text-lg text-[#FAFAF9]/80 font-normal leading-relaxed">
            Mupezeni was founded on a simple conviction: technology should give business owners back their time and empower them to build enduring, high-margin retail businesses.
          </p>
        </div>

        {/* 4 Premium Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {BELIEFS.map((belief, idx) => {
            const Icon = belief.icon;
            return (
              <div 
                key={idx}
                className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#150D08] via-[#110A06] to-[#0A0704] border border-[#9B2208]/30 hover:border-[#9B2208]/60 hover:shadow-2xl hover:shadow-[#9B2208]/15 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#20100A] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#D95A1A] font-syne px-3 py-1 rounded-full bg-[#1E0F09] border border-[#9B2208]/20">
                      {belief.author}
                    </span>
                  </div>

                  <blockquote className="text-xl sm:text-2xl font-black font-syne text-white tracking-tight leading-snug group-hover:text-[#FAFAF9] transition-colors">
                    "{belief.quote}"
                  </blockquote>

                  <p className="text-xs sm:text-sm text-[#FAFAF9]/75 leading-relaxed">
                    {belief.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#D95A1A] font-syne uppercase tracking-wider text-[11px]">
                    {belief.subtitle}
                  </span>
                  <span className="text-white/40 font-syne">Principle 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consultation Prompt */}
        {onNavigate && (
          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-syne font-black text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-xl hover:shadow-[#9B2208]/30 transition-all cursor-pointer"
            >
              <span>Book My AI Growth Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
