import React from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Film,
  Play
} from 'lucide-react';
import { ChannelsMarquee } from '../components/ChannelsMarquee';
import { SimulatedVideoDemo } from '../components/CinematicDemo/SimulatedVideoDemo';
import { GrowthCrossroadsSection } from '../components/GrowthCrossroadsSection';
import { AiTeamSection } from '../components/AiTeamSection';
import { ImplementationPathsSection } from '../components/ImplementationPathsSection';
import { ScaleOverheadSection } from '../components/ScaleOverheadSection';
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
      
      {/* 1. HERO SECTION WITH FIRST-VIEW DEMO VIDEO */}
      <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-20 overflow-hidden bg-[#0A0705]">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#9B2208]/20 via-[#D95A1A]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-[#B83A0A]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
            
            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm shadow-[#9B2208]/20">
              <span className="w-2 h-2 rounded-full bg-[#D95A1A] animate-pulse"></span>
              <span className="text-[11px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
                The AI Business Growth Company for Retail
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.12] sm:leading-[1.08]">
              Grow your retail business{' '}
              <span className="text-gradient-fire block sm:inline">
                while you sleep.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-base md:text-lg text-[#FAFAF9]/80 font-normal max-w-3xl mx-auto leading-relaxed">
              Whether you sell from your shop, WhatsApp, Facebook, Instagram, or an online store, <span className="font-roboto font-semibold text-white">Mupezeni</span> gives you an AI Team that serves customers, markets your business, and tracks your operations — around the clock — while you focus on sourcing great products and delivering them to your customers.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <button
                id="hero-btn-build-workforce"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl font-syne font-black text-xs sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-2xl hover:shadow-[#9B2208]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap"
              >
                <span>Get Your AI Growth Team</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white flex-shrink-0" />
              </button>

              <button
                id="hero-btn-see-how-it-works"
                onClick={() => onNavigate('how-it-works')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl font-syne font-bold text-xs sm:text-base text-[#FAFAF9]/80 hover:text-white bg-[#100A06] hover:bg-[#180E09] border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D95A1A] flex-shrink-0" />
              </button>
            </div>

            {/* Trust Micro-Badge */}
            <p className="text-[11px] sm:text-xs text-[#FAFAF9]/60 font-syne flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
              <span>Real-time AI, working across every channel your customers already use</span>
            </p>

          </div>

          {/* ======================================================== */}
          {/* THE FIRST THING RETAILERS SEE: FLAGSHIP 43s DEMO VIDEO   */}
          {/* ======================================================== */}
          <div className="pt-8 sm:pt-12 max-w-5xl mx-auto">
            <div className="relative">
              {/* Outer decorative ambient glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9B2208] via-[#D95A1A] to-[#B83A0A] rounded-2xl sm:rounded-3xl blur-lg opacity-40 -z-10" />
              
              <SimulatedVideoDemo 
                onNavigateToContact={() => onNavigate('contact')} 
                autoPlay={true}
              />
            </div>

            {/* Video Sub-caption / Storyline chapters indicator */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs font-syne text-white/60">
              <span className="text-[#D95A1A] font-bold">Walkthrough Storyline:</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">01. Web Onboarding</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">02. 24/7 WhatsApp & MoMo</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">03. TikTok & FB Video Studio</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">04. Morning Operations Hub</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TRUST BAR / CHANNELS MARQUEE */}
      <ChannelsMarquee />

      {/* 3. THE RETAIL GROWTH CROSSROADS: Motion Graphics Dilemma (The 4 Compounding Bottlenecks & Two Paths to Scale) */}
      <GrowthCrossroadsSection onNavigate={onNavigate} />

      {/* 4. MEET YOUR AI TEAMS */}
      <AiTeamSection onNavigate={onNavigate} />

      {/* 5. IMPLEMENTATION SOLUTIONS: Will Mupezeni Work With My Business? (Path 1 vs Path 2) */}
      <ImplementationPathsSection onNavigate={onNavigate} />

      {/* 6. WHY AI TEAMS: THE ECONOMIC COMPARISON (Scale Your Business, Not Your Overhead) */}
      <ScaleOverheadSection onNavigate={onNavigate} />

      {/* 7. ⭐ PRICING (Apple-style reveal: K5,000/month, horizontal feature rows, unboxed whitespace) */}
      <PricingSection onNavigate={onNavigate} />

      {/* 8. BUSINESS PHILOSOPHY (What We Believe) */}
      <WhatWeBelieveSection onNavigate={onNavigate} />

      {/* 9. FINAL CTA SECTION */}
      <ConsultationCtaSection
        onNavigateToContact={() => onNavigate('contact')}
      />

    </div>
  );
};
