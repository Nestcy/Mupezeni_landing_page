import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Store,
  MessageSquare,
  Share2,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

const sellingTouchpoints = [
  { id: 'shop', label: 'Physical Shop', icon: Store, role: 'In-store inquiry capture & catalog search' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, role: '24/7 instant chat, MoMo & order confirmation' },
  { id: 'social', label: 'Social Media', icon: Share2, role: 'Auto DM replies & continuous marketing content' },
  { id: 'online', label: 'Online Store', icon: Globe, role: 'Cart recovery & live checkout assistance' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeChannelIdx, setActiveChannelIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveChannelIdx((prev) => (prev + 1) % sellingTouchpoints.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-16 sm:pt-20">
      
      {/* 1. HERO SECTION WITH COMPACT VIEWPORT PRESENCE & SCROLL/TRANSITION TOUCHPOINTS */}
      <section className="relative py-4 sm:py-6 lg:py-8 overflow-hidden bg-[#0A0705]">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -right-24 w-72 h-72 bg-[#B83A0A]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 text-left">
              
              {/* Brand Supporting Line Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm shadow-[#9B2208]/20">
                <span className="w-2 h-2 rounded-full bg-[#D95A1A] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
                  Your AI-Powered Business Team
                </span>
              </div>

              {/* Core Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.14]">
                Your business shouldn’t stop <span className="text-gradient-fire">when you do.</span>
              </h1>

              {/* Body Explanation (Full text, not summarized) */}
              <p className="text-xs sm:text-sm md:text-base text-[#FAFAF9]/85 font-normal leading-relaxed">
                Whether you sell from your shop, WhatsApp, social media, or an online store, Mupezeni helps you handle customer support and marketing with AI, so your business can keep serving customers while you focus on sourcing great products, running your operations, and growing.
              </p>

              {/* Dynamic Selling Touchpoints Ribbon with smooth transitions */}
              <div className="pt-0.5 space-y-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {sellingTouchpoints.map((tp, idx) => {
                    const Icon = tp.icon;
                    const isActive = idx === activeChannelIdx;
                    return (
                      <button
                        key={tp.id}
                        onClick={() => setActiveChannelIdx(idx)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-syne font-medium transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-[#2A1208] text-white border border-[#D95A1A]/60 shadow-sm shadow-[#D95A1A]/20'
                            : 'bg-[#120A06] text-white/60 hover:text-white/90 border border-white/5'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D95A1A]' : 'text-white/40'}`} />
                        <span>{tp.label}</span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChannelIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#160D08]/90 border border-[#9B2208]/30 text-[11px] font-syne text-[#FAFAF9]/85"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span className="text-[#D95A1A] font-semibold">{sellingTouchpoints[activeChannelIdx].label}:</span>
                    <span>{sellingTouchpoints[activeChannelIdx].role}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Primary Action Buttons */}
              <div className="pt-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 flex-wrap">
                <button
                  id="hero-btn-see-how-it-works"
                  onClick={() => onNavigate('how-it-works')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-syne font-bold text-xs sm:text-sm text-[#FAFAF9]/95 hover:text-white bg-[#140C07] hover:bg-[#1F120B] border border-white/15 hover:border-[#D95A1A]/50 transition-all duration-300 cursor-pointer shadow-md"
                >
                  <span>See How It Works</span>
                  <ChevronRight className="w-4 h-4 text-[#D95A1A] flex-shrink-0" />
                </button>

                <button
                  id="hero-btn-get-ai-team"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-xl hover:shadow-[#9B2208]/30 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap"
                >
                  <span>Get your AI Team</span>
                  <ArrowRight className="w-4 h-4 text-white flex-shrink-0" />
                </button>
              </div>

              {/* Supporting Brand Whisper */}
              <p className="text-[11px] sm:text-xs text-[#FAFAF9]/60 font-syne flex items-center gap-1.5 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
                <span>One AI team · Zero setup fees · 30-day money-back guarantee</span>
              </p>

            </div>

            {/* Right Interactive Preview & Demo Column */}
            <div className="lg:col-span-5 w-full">
              <div className="relative">
                {/* Outer decorative ambient glow ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9B2208] via-[#D95A1A] to-[#B83A0A] rounded-2xl blur-md opacity-35 -z-10" />
                
                <SimulatedVideoDemo 
                  onNavigateToContact={() => onNavigate('contact')} 
                  autoPlay={true}
                />
              </div>
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
