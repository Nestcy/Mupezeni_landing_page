import React from 'react';
import { 
  ArrowRight, 
  ChevronRight
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { InteractiveAgentDemo } from '../components/InteractiveAgentDemo';
import { CapacityProblemSection } from '../components/CapacityProblemSection';
import { CapacitySolutionSection } from '../components/CapacitySolutionSection';
import { AiTeamSection } from '../components/AiTeamSection';
import { FounderTrustSection } from '../components/FounderTrustSection';
import { PricingSection } from '../components/PricingSection';
import { WhatWeBelieveSection } from '../components/WhatWeBelieveSection';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { MupezeniSearchingBanner } from '../components/MupezeniBrandMetaphor';
import { PageId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal?: () => void;
  onOpenCinematicDemo?: () => void;
  onOpenPolicy?: (type: 'terms' | 'privacy' | 'guarantee') => void;
  onOpenGetAiTeam?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenBookingModal = () => onNavigate('pricing'),
  onOpenCinematicDemo,
  onOpenPolicy,
  onOpenGetAiTeam
}) => {
  const handleGetAiTeam = onOpenGetAiTeam || onOpenBookingModal;

  return (
    <div className="pt-16 sm:pt-20">
      
      {/* 1. HERO SECTION */}
      <HeroSection 
        onSeeHowItWorks={() => {
          const el = document.getElementById('how-mupezeni-works-demo');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            onNavigate('how-it-works');
          }
        }}
        onGetAiTeam={handleGetAiTeam}
      />

      {/* 2. INTERACTIVE AGENT DEMO: Mobile Phone on Left + Customer Support & Marketing Description */}
      <InteractiveAgentDemo onNavigateToContact={handleGetAiTeam} />

      {/* 3. LIVE CONNECTOR TESTING BANNER */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1A0E08] via-[#2A140B] to-[#160B06] border border-[#E58330]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/20 text-[#E58330] text-xs font-mono font-bold">
              <span>⚡ LIVE CONNECTOR SANDBOX</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
              Test AI Support & Sales Workers with Real Store Catalogs
            </h3>
            <p className="text-xs sm:text-sm text-[#F5EDE4]/75 font-dm max-w-2xl leading-relaxed">
              Test the AI Web Bubble with real-time visitor radar tracking, or test the WhatsApp Commerce Assistant querying inventory and generating 1-click checkout links across Mupezeni, Shopify, and WooCommerce.
            </p>
          </div>

          <button
            onClick={() => onNavigate('ai-workers-test')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#CD481B] text-white font-syne font-bold text-xs sm:text-sm shadow-xl shadow-[#9B2208]/40 hover:scale-105 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Open AI Testing Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. THE CAPACITY PROBLEM SECTION */}
      <CapacityProblemSection />

      {/* 4B. MUPEZENI IS ALWAYS LOOKING - BRAND DISCOVERY RIBBON */}
      <MupezeniSearchingBanner />

      {/* 5. THE CAPACITY SOLUTION SECTION */}
      <CapacitySolutionSection />

      {/* 6. MEET YOUR AI TEAM (2 AI Workers + 1 Business Insights Dashboard) */}
      <AiTeamSection onGetStarted={handleGetAiTeam} />

      {/* 7. PRICING: Transparent 3-Tier Plans (START $25/mo, GROW $100/mo, SCALE $200+/mo) */}
      <PricingSection 
        onSelectPlan={handleGetAiTeam} 
        onNavigateToHowItWorks={() => onNavigate('how-it-works')}
      />

      {/* 8. FOUNDER TRUST & ENGINEERING LEADERSHIP */}
      <FounderTrustSection 
        onNavigate={onNavigate}
        onOpenBookingModal={handleGetAiTeam}
      />

      {/* 9. BUSINESS PHILOSOPHY */}
      <WhatWeBelieveSection />

      {/* 10. FINAL CTA SECTION */}
      <ConsultationCtaSection
        onNavigateToContact={handleGetAiTeam}
        onNavigateToHowItWorks={() => onNavigate('how-it-works')}
      />

    </div>
  );
};
