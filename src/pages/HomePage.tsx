import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck,
  Zap,
  Bot,
  Activity,
  Sparkles,
  Layers
} from 'lucide-react';
import { ChannelsMarquee } from '../components/ChannelsMarquee';
import { InteractiveAgentDemo } from '../components/InteractiveAgentDemo';
import heroSymbolicNetworkImg from '../assets/images/hero_mupezeni_symbolic_network_1790307199473.jpg';
import heroAiEcosystemImg from '../assets/images/hero_mupezeni_ai_ecosystem_1790307213928.jpg';
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
  const [backdropMode, setBackdropMode] = useState<'network' | 'ecosystem'>('network');

  return (
    <div className="pt-16 sm:pt-20">
      
      {/* 1. HERO SECTION WITH RICH SYMBOLIC MUPEZENI INFOGRAPHIC BACKDROP */}
      <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-[#0A0705]">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-gradient-to-b from-[#9B2208]/25 via-[#D95A1A]/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-[#B83A0A]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 -left-20 w-72 h-72 bg-[#E58330]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Dynamic Mupezeni Symbolic Infographic Backdrop */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src={backdropMode === 'network' ? heroSymbolicNetworkImg : heroAiEcosystemImg}
            alt="Mupezeni Autonomous Retail Intelligence Network"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45 mix-blend-screen scale-105 filter brightness-110 contrast-110 transition-all duration-700"
          />
          {/* Layered Vignette and Gradient Shielding for Crystal-Clear Typography */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0705]/90 via-[#0A0705]/50 to-[#0A0705]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#0A0705_85%)]" />
          {/* Subtle Grid Lines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5833008_1px,transparent_1px),linear-gradient(to_bottom,#E5833008_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-5">
          
          {/* Top Symbolic Badge & Visual Mode Switcher */}
          <div className="inline-flex items-center gap-2 p-1 pl-3 pr-1.5 rounded-full bg-[#180E09]/90 border border-[#E58330]/35 backdrop-blur-md text-[11px] font-mono text-[#E58330] shadow-xl">
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Mupezeni Autonomous Retail Core</span>
            </span>
            <div className="h-3.5 w-px bg-[#3D2012]" />
            <button
              onClick={() => setBackdropMode(prev => prev === 'network' ? 'ecosystem' : 'network')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2A140A] hover:bg-[#3B1D0E] text-[#D4CDC5] hover:text-white text-[10px] transition-all cursor-pointer pointer-events-auto"
              title="Switch between Neural Commerce Network and Agent Architecture view"
            >
              <Layers className="w-3 h-3 text-[#E58330]" />
              <span>{backdropMode === 'network' ? 'View Architecture' : 'View Network'}</span>
            </button>
          </div>

          {/* Core Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.12] max-w-3xl mx-auto">
            Your business shouldn’t stop <span className="text-gradient-fire">when you do.</span>
          </h1>

          {/* Body Explanation */}
          <p className="text-sm sm:text-base text-[#FAFAF9]/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Whether you sell from your shop, WhatsApp, social media, or an online store, Mupezeni powers your customer support and marketing with autonomous AI workers — so your store keeps closing sales 24/7 while you focus on inventory, sourcing, and growth.
          </p>

          {/* Floating Infographic Micro-Pills (Symbolizing Mupezeni Core Features) */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#140C07]/80 border border-[#2B180D] backdrop-blur-sm text-[11px] font-mono text-[#D4CDC5]">
              <Zap className="w-3.5 h-3.5 text-[#E58330]" />
              <span>&lt;2.4s WhatsApp Auto-Replies</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#140C07]/80 border border-[#2B180D] backdrop-blur-sm text-[11px] font-mono text-[#D4CDC5]">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>2 Dedicated AI Workers</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#140C07]/80 border border-[#2B180D] backdrop-blur-sm text-[11px] font-mono text-[#D4CDC5]">
              <Activity className="w-3.5 h-3.5 text-[#E58330]" />
              <span>Live Mobile Money Sync</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
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
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-syne font-bold text-xs sm:text-sm text-[#FAFAF9]/95 hover:text-white bg-[#140C07] hover:bg-[#1F120B] border border-white/20 hover:border-[#D95A1A]/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#D95A1A]/10"
            >
              <span>See How It Works</span>
              <ChevronRight className="w-4 h-4 text-[#D95A1A] flex-shrink-0" />
            </button>

            <button
              id="hero-btn-get-ai-team"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:shadow-2xl hover:shadow-[#9B2208]/50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap"
            >
              <span>Get your AI Team</span>
              <ArrowRight className="w-4 h-4 text-white flex-shrink-0" />
            </button>
          </div>

          {/* Supporting Brand Whisper */}
          <p className="text-xs text-[#FAFAF9]/65 font-syne flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>One complete AI team · $100/mo flat · Zero setup fees · 30-day money-back guarantee</span>
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
