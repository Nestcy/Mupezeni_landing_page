import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle2, Bot } from 'lucide-react';
import { PageId } from '../types';

interface ConsultationCtaProps {
  onNavigateToContact: () => void;
  badgeText?: string;
  headline?: string;
  subheadline?: string;
}

export const ConsultationCtaSection: React.FC<ConsultationCtaProps> = ({
  onNavigateToContact,
  badgeText = 'Start Your Transformation',
  headline = 'Ready to build your AI Team?',
  subheadline = 'Every retailer gets a personalized setup and rollout plan — no obligation, no upfront lock-in.'
}) => {
  return (
    <section className="py-10 sm:py-28 relative bg-[#0A0705] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-b from-[#9B2208]/25 via-[#D95A1A]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1A0E09] via-[#130B07] to-[#0A0705] border border-[#9B2208]/40 shadow-2xl relative space-y-6 sm:space-y-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#20110A] border border-[#9B2208]/50 text-[10px] sm:text-xs font-bold text-[#D95A1A] uppercase tracking-widest font-syne mx-auto">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#D95A1A]" />
            <span>{badgeText}</span>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-2 sm:space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
              {headline}
            </h2>
            <p className="text-xs sm:text-lg text-[#FAFAF9]/80 font-normal leading-relaxed">
              {subheadline}
            </p>
          </div>

          {/* 3 Outcome Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-left max-w-3xl mx-auto pt-1 sm:pt-2">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0D0805] border border-white/5 flex items-start gap-2.5 sm:gap-3">
              <div className="p-1 sm:p-1.5 rounded-lg bg-[#9B2208]/20 text-[#D95A1A] mt-0.5">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-syne">1. Personalised Consultation</h4>
                <p className="text-[10px] sm:text-[11px] text-[#FAFAF9]/70 mt-0.5">Direct diagnostic of your channels & bottlenecks.</p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0D0805] border border-white/5 flex items-start gap-2.5 sm:gap-3">
              <div className="p-1 sm:p-1.5 rounded-lg bg-[#9B2208]/20 text-[#D95A1A] mt-0.5">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-syne">2. Setup & Foundation</h4>
                <p className="text-[10px] sm:text-[11px] text-[#FAFAF9]/70 mt-0.5">Physical store cataloging or online stack integration (Zero setup fees).</p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0D0805] border border-white/5 flex items-start gap-2.5 sm:gap-3">
              <div className="p-1 sm:p-1.5 rounded-lg bg-[#9B2208]/20 text-[#D95A1A] mt-0.5">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-syne">3. Autonomous Go-Live</h4>
                <p className="text-[10px] sm:text-[11px] text-[#FAFAF9]/70 mt-0.5">2 AI Workers active 24/7 with human escalation and owner control.</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <button
              onClick={onNavigateToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-syne font-black text-xs sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-2xl hover:shadow-[#9B2208]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer"
            >
              <span>Get Your AI Team</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-8 text-[11px] sm:text-xs text-[#FAFAF9]/75 pt-2 font-syne">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
              <span>Zero Obligation or Upfront Lock-in</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
              <span>24-Hour Review Turnaround</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
              <span>Tailored to Your Retail Stack</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
