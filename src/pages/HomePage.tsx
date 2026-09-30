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
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenBookingModal = () => onNavigate('pricing') 
}) => {
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
        onGetAiTeam={() => onNavigate('contact')}
      />

      {/* 2. INTERACTIVE AGENT DEMO: Mobile Phone on Left + Customer Support & Marketing Description */}
      <InteractiveAgentDemo onNavigateToContact={onNavigate} />

      {/* 4. THE CAPACITY PROBLEM SECTION */}
      <CapacityProblemSection />

      {/* 4B. MUPEZENI IS ALWAYS LOOKING - BRAND DISCOVERY RIBBON */}
      <MupezeniSearchingBanner />

      {/* 5. THE CAPACITY SOLUTION SECTION */}
      <CapacitySolutionSection />

      {/* 6. MEET YOUR AI TEAM (2 AI Workers + 1 Business Insights Dashboard) */}
      <AiTeamSection onGetStarted={() => onNavigate('contact')} />

      {/* 7. PRICING: Transparent 3-Tier Plans (START $25/mo, GROW $100/mo, SCALE $200+/mo) */}
      <PricingSection 
        onSelectPlan={() => onNavigate('contact')} 
        onNavigateToHowItWorks={() => onNavigate('how-it-works')}
      />

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
