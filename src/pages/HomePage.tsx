import React from 'react';
import { 
  ArrowRight, 
  ChevronRight
} from 'lucide-react';
import { InteractiveAgentDemo } from '../components/InteractiveAgentDemo';
import heroSymbolicNetworkImg from '../assets/images/hero_mupezeni_symbolic_network_1790307199473.jpg';
import { CapacityProblemSection } from '../components/CapacityProblemSection';
import { CapacitySolutionSection } from '../components/CapacitySolutionSection';
import { AiTeamSection } from '../components/AiTeamSection';
import { FounderTrustSection } from '../components/FounderTrustSection';
import { PricingSection } from '../components/PricingSection';
import { WhatWeBelieveSection } from '../components/WhatWeBelieveSection';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { PageId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal?: () => void;
  onOpenCinematicDemo?: () => void;
  onOpenPolicy?: (type: 'terms' | 'privacy' | 'guarantee') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenBookingModal = () => onNavigate('pricing') 
}) => {
  return (
    <div className="pt-16 sm:pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-[#0A0705]">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-gradient-to-b from-[#9B2208]/25 via-[#D95A1A]/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-[#B83A0A]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 -left-20 w-72 h-72 bg-[#E58330]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Dynamic Mupezeni Symbolic Infographic Backdrop */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src={heroSymbolicNetworkImg}
            alt="Mupezeni Autonomous Retail Intelligence Network"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45 mix-blend-screen scale-105 filter brightness-110 contrast-110"
          />
          {/* Layered Vignette and Gradient Shielding for Crystal-Clear Typography */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0705]/90 via-[#0A0705]/50 to-[#0A0705]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#0A0705_85%)]" />
          {/* Subtle Grid Lines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5833008_1px,transparent_1px),linear-gradient(to_bottom,#E5833008_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
          
          {/* Core Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.12] max-w-3xl mx-auto">
            Your business shouldn’t stop <span className="text-gradient-fire">when you do.</span>
          </h1>

          {/* Body Explanation */}
          <p className="text-sm sm:text-base text-[#FAFAF9]/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Whether you sell from your shop, WhatsApp, social media, or an online store, Mupezeni powers your customer support and marketing with autonomous AI workers — so your store keeps closing sales 24/7 while you focus on inventory, sourcing, and growth.
          </p>

          {/* Primary Action Buttons - Side by Side */}
          <div className="pt-2 flex flex-row items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              id="hero-btn-see-how-it-works"
              onClick={() => {
                const el = document.getElementById('how-mupezeni-works-demo');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigate('how-it-works');
                }
              }}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl font-syne font-bold text-xs sm:text-sm text-[#FAFAF9]/95 hover:text-white bg-[#140C07] hover:bg-[#1F120B] border border-white/20 hover:border-[#D95A1A]/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#D95A1A]/10 whitespace-nowrap shrink-0"
            >
              <span>See How It Works</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D95A1A] flex-shrink-0" />
            </button>

            <button
              id="hero-btn-get-ai-team"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:shadow-2xl hover:shadow-[#9B2208]/50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Get your AI Team</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE AGENT DEMO: Mobile Phone on Left + Customer Support & Marketing Description */}
      <InteractiveAgentDemo onNavigateToContact={onNavigate} />

      {/* 4. THE CAPACITY PROBLEM SECTION */}
      <CapacityProblemSection />

      {/* 5. THE CAPACITY SOLUTION SECTION */}
      <CapacitySolutionSection />

      {/* 6. MEET YOUR AI TEAM (2 AI Workers + 1 Business Insights Dashboard) */}
      <AiTeamSection onGetStarted={() => onNavigate('contact')} />

      {/* 7. PRICING: Transparent 3-Tier Plans (START $25/mo, GROW $100/mo, SCALE $200+/mo) */}
      <PricingSection onSelectPlan={() => onNavigate('contact')} />

      {/* 8. FOUNDER TRUST & ENGINEERING LEADERSHIP */}
      <FounderTrustSection 
        onNavigate={onNavigate}
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 9. BUSINESS PHILOSOPHY */}
      <WhatWeBelieveSection />

      {/* 10. FINAL CTA SECTION */}
      <ConsultationCtaSection
        onNavigateToContact={() => onNavigate('contact')}
      />

    </div>
  );
};
