import React from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck
} from 'lucide-react';
import { ChannelsMarquee } from '../components/ChannelsMarquee';
import { InteractiveAgentDemo } from '../components/InteractiveAgentDemo';
import heroAiInfographicImg from '../assets/images/ai_workforce_infographic_1790257271796.jpg';
import { GrowthCrossroadsSection } from '../components/GrowthCrossroadsSection';
import { AiTeamSection } from '../components/AiTeamSection';
import { IndustryShowcaseSection } from '../components/IndustryShowcaseSection';
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
      
      {/* 1. HERO SECTION WITH COMPACT VIEWPORT PRESENCE */}
      <section className="relative py-4 sm:py-6 lg:py-8 overflow-hidden bg-[#0A0705]">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -right-24 w-72 h-72 bg-[#B83A0A]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="relative max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3 sm:space-y-3.5">
          {/* AI Infographic Hero Background */}
          <div className="absolute -inset-x-4 sm:-inset-x-12 -inset-y-6 sm:-inset-y-10 -z-10 pointer-events-none overflow-hidden rounded-2xl">
            <img
              src={heroAiInfographicImg}
              alt="AI Workforce Infographic"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-40 mix-blend-screen scale-100 filter brightness-110 contrast-105"
            />
            {/* Ambient Radial and Vertical Fade to maintain contrast and readable typography */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0705]/85 via-[#0A0705]/40 to-[#0A0705]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0A0705_85%)]" />
          </div>

          {/* Core Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.15] max-w-2xl mx-auto">
            Your business shouldn’t stop <span className="text-gradient-fire">when you do.</span>
          </h1>

          {/* Body Explanation (Full text, not summarized) */}
          <p className="text-xs sm:text-sm text-[#FAFAF9]/85 font-normal leading-relaxed max-w-xl mx-auto">
            Whether you sell from your shop, WhatsApp, social media, or an online store, Mupezeni helps you handle customer support and marketing with AI, so your business can keep serving customers while you focus on sourcing great products, running your operations, and growing.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 flex-wrap">
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
              className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl font-syne font-bold text-xs text-[#FAFAF9]/95 hover:text-white bg-[#140C07] hover:bg-[#1F120B] border border-white/15 hover:border-[#D95A1A]/50 transition-all duration-300 cursor-pointer shadow-md"
            >
              <span>See How It Works</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
            </button>

            <button
              id="hero-btn-get-ai-team"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-syne font-black text-xs text-white bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:shadow-xl hover:shadow-[#9B2208]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap"
            >
              <span>Get your AI Team</span>
              <ArrowRight className="w-3.5 h-3.5 text-white flex-shrink-0" />
            </button>
          </div>

          {/* Supporting Brand Whisper */}
          <p className="text-[10px] sm:text-[11px] text-[#FAFAF9]/60 font-syne flex items-center justify-center gap-1 pt-0.5">
            <ShieldCheck className="w-3 h-3 text-[#25D366] flex-shrink-0" />
            <span>One AI team · Zero setup fees · 30-day money-back guarantee</span>
          </p>
        </div>
      </section>

      {/* 2. CHANNELS MARQUEE */}
      <ChannelsMarquee />

      {/* 3. INTERACTIVE AGENT DEMO: Mobile Phone on Left + Customer Support & Marketing Description */}
      <InteractiveAgentDemo onNavigateToContact={onNavigate} />

      {/* 4. THE DIGITAL WORKLOAD PROBLEM: Traditional Approach vs Mupezeni */}
      <GrowthCrossroadsSection onNavigate={onNavigate} />

      {/* 5. MEET YOUR AI TEAM (2 AI Workers + 1 Business Insights Dashboard) */}
      <AiTeamSection onGetStarted={() => onNavigate('contact')} />

      {/* 6. INDUSTRY-SPECIFIC RETAIL SHOWCASE WITH REAL VISUALS */}
      <IndustryShowcaseSection 
        onNavigate={onNavigate}
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 7. FOUNDER TRUST & ENGINEERING LEADERSHIP */}
      <FounderTrustSection 
        onNavigate={onNavigate}
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 8. PRICING: Single $100/month Plan */}
      <PricingSection onSelectPlan={() => onNavigate('contact')} />

      {/* 9. BUSINESS PHILOSOPHY */}
      <WhatWeBelieveSection />

      {/* 10. FINAL CTA SECTION */}
      <ConsultationCtaSection
        onNavigateToContact={() => onNavigate('contact')}
      />

    </div>
  );
};
