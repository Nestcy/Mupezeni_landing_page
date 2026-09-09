import React from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { ChannelsMarquee } from '../components/ChannelsMarquee';
import { HeroCollaborativeDashboard } from '../components/HeroCollaborativeDashboard';
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
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-10 sm:pt-14 sm:pb-16 overflow-hidden bg-[#0A0705]">
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
              Whether you sell from your shop, WhatsApp, Facebook, Instagram or an online store, Mupezeni gives you intelligent AI Teams that help serve customers, market your business and manage digital operations around the clock while you focus on finding great products from suppliers and delivering them to your customers.
            </p>

            {/* Buttons (Side-by-side on mobile and desktop) */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <button
                id="hero-btn-build-workforce"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl font-syne font-black text-xs sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-2xl hover:shadow-[#9B2208]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap"
              >
                <span>Book My AI Growth Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white flex-shrink-0" />
              </button>

              <button
                id="hero-btn-see-how-it-works"
                onClick={() => onNavigate('how-it-works')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:px-6 sm:py-3.5 rounded-xl font-syne font-bold text-xs sm:text-base text-[#FAFAF9] bg-[#140D08] hover:bg-[#1E110A] border border-[#9B2208]/30 hover:border-[#9B2208]/60 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D95A1A] flex-shrink-0" />
              </button>
            </div>

            {/* Timeline expectation note */}
            <p className="text-[11px] sm:text-xs text-[#FAFAF9]/60 font-syne flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
              <span>Custom-trained on your products & live across your store within 4 weeks of onboarding</span>
            </p>

          </div>

          {/* Hero Interactive Collaborative Dashboard Preview */}
          <div className="mt-6 sm:mt-8">
            <HeroCollaborativeDashboard />
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR / CHANNELS MARQUEE */}
      <ChannelsMarquee />

      {/* 3. THE RETAIL GROWTH CROSSROADS: Motion Graphics Dilemma (The 4 Compounding Bottlenecks & Two Paths to Scale) */}
      <GrowthCrossroadsSection onNavigate={onNavigate} />

      {/* 4. MEET YOUR AI TEAMS */}
      <AiTeamSection onNavigate={onNavigate} />

      {/* 6. IMPLEMENTATION SOLUTIONS: Will Mupezeni Work With My Business? (Path 1 vs Path 2) */}
      <ImplementationPathsSection onNavigate={onNavigate} />

      {/* 7. WHY AI TEAMS: THE ECONOMIC COMPARISON (Scale Your Business, Not Your Overhead) */}
      <ScaleOverheadSection onNavigate={onNavigate} />

      {/* 8. ⭐ PRICING (Apple-style reveal: K5,000/month, horizontal feature rows, unboxed whitespace) */}
      <PricingSection onNavigate={onNavigate} />

      {/* 9. BUSINESS PHILOSOPHY (What We Believe) */}
      <WhatWeBelieveSection onNavigate={onNavigate} />

      {/* 10. FINAL CTA SECTION */}
      <ConsultationCtaSection
        onNavigateToContact={() => onNavigate('contact')}
      />

    </div>
  );
};
