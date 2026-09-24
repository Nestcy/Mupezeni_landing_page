import React from 'react';
import { PHILOSOPHY_PRINCIPLES } from '../data/websiteData';
import { Zap, ShieldCheck, CheckCircle2, Quote } from 'lucide-react';

export const WhatWeBelieveSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#070403] relative overflow-hidden border-t border-[#1F120A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#E58330] uppercase font-semibold">
            Our Core Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built on Uncompromising Retail Discipline
          </h2>
          <p className="text-sm text-[#A8A099]">
            We designed Mupezeni specifically around how high-volume retail actually operates across Zambia and Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PHILOSOPHY_PRINCIPLES.map(item => {
            const icons: Record<string, any> = {
              Zap,
              ShieldCheck,
              CheckCircle2
            };
            const Icon = icons[item.iconName] || Zap;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#0F0805] border border-[#26150C] p-6 sm:p-8 space-y-4 hover:border-[#E58330]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <div className="relative pl-4 border-l-2 border-[#E58330]/50 italic text-xs text-[#D9D1C7]">
                    "{item.quote}"
                  </div>
                  <p className="text-xs sm:text-sm text-[#A8A099] leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
