import React from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { ChannelsMarquee } from '../components/ChannelsMarquee';
import { SimulatedVideoDemo } from '../components/CinematicDemo/SimulatedVideoDemo';
import { GrowthCrossroadsSection } from '../components/GrowthCrossroadsSection';
import { AiTeamSection } from '../components/AiTeamSection';
import { PricingSection } from '../components/PricingSection';
import { WhatWeBelieveSection } from '../components/WhatWeBelieveSection';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { PageId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20">
      
      {/* 1. HERO SECTION WITH NEW CLEAR POSITIONING & FIRST-VIEW DEMO */}
      <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-20 overflow-hidden bg-[#0A0705]">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#9B2208]/20 via-[#D95A1A]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-[#B83A0A]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
            
            {/* Brand Supporting Line Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm shadow-[#9B2208]/20">
              <span className="w-2 h-2 rounded-full bg-[#D95A1A] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
                Grow your retail business while you sleep
              </span>
            </div>

            {/* Core Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.12] sm:leading-[1.08]">
              Your AI Team for Retail
            </h1>

            {/* Sub-headline: Proposition + Price */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-syne text-[#FAFAF9]/90">
                Customer support. Marketing. Business insights.
              </h2>
              <div className="inline-block px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#9B2208]/40 via-[#D95A1A]/30 to-[#9B2208]/40 border border-[#D95A1A]/50">
                <span className="text-xl sm:text-3xl font-black font-syne text-white">
                  K2,000<span className="text-sm sm:text-base font-normal text-[#FAFAF9]/80"> / month</span>
                </span>
              </div>
            </div>

            {/* Body Explanation */}
            <p className="text-xs sm:text-base md:text-lg text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed">
              Two agentic AI workers handle the repetitive digital work of your retail business while you focus on products, customers and growth.
            </p>

            {/* 3 Core Axioms */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-white/90 font-syne pt-1">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#140C07] border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your customers get answered</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#140C07] border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your business stays visible</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#140C07] border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>You stay informed</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
              <button
                id="hero-btn-get-ai-team"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-syne font-black text-xs sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-2xl hover:shadow-[#9B2208]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap"
              >
                <span>Get Your AI Team</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
              </button>

              <button
                id="hero-btn-see-how-it-works"
                onClick={() => onNavigate('how-it-works')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl font-syne font-bold text-xs sm:text-base text-[#FAFAF9]/90 hover:text-white bg-[#100A06] hover:bg-[#180E09] border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D95A1A] flex-shrink-0" />
              </button>
            </div>

            {/* Supporting Brand Whisper */}
            <p className="text-[11px] sm:text-xs text-[#FAFAF9]/60 font-syne flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
              <span>One AI team. One simple price. Give AI the repetitive work — keep the judgment.</span>
            </p>

          </div>

          {/* FLAGSHIP DEMO VIDEO */}
          <div className="pt-8 sm:pt-12 max-w-5xl mx-auto">
            <div className="relative">
              {/* Outer decorative ambient glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9B2208] via-[#D95A1A] to-[#B83A0A] rounded-2xl sm:rounded-3xl blur-lg opacity-40 -z-10" />
              
              <SimulatedVideoDemo 
                onNavigateToContact={() => onNavigate('contact')} 
                autoPlay={true}
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. CHANNELS MARQUEE */}
      <ChannelsMarquee />

      {/* 3. THE DIGITAL WORKLOAD PROBLEM: Traditional Approach vs Mupezeni */}
      <GrowthCrossroadsSection onNavigate={onNavigate} />

      {/* 4. MEET YOUR AI TEAM (2 AI Workers + 1 Business Insights Dashboard) */}
      <AiTeamSection onNavigate={onNavigate} />

      {/* 5. PRICING: Single K2,000/month Plan */}
      <PricingSection onNavigate={onNavigate} />

      {/* 6. BUSINESS PHILOSOPHY */}
      <WhatWeBelieveSection onNavigate={onNavigate} />

      {/* 7. FINAL CTA SECTION */}
      <ConsultationCtaSection
        onNavigateToContact={() => onNavigate('contact')}
      />

    </div>
  );
};
