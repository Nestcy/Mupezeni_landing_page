import React from 'react';
import { 
  ArrowRight, 
  ChevronRight
} from 'lucide-react';
import heroSymbolicNetworkImg from '../assets/images/hero_mupezeni_symbolic_network_1790307199473.jpg';
import { HeroSearchingInfographic } from './MupezeniBrandMetaphor';

interface HeroSectionProps {
  onSeeHowItWorks: () => void;
  onGetAiTeam: () => void;
}

const CHANNELS = [
  'Shopify',
  'Online Stores',
  'Physical Stores',
  'WhatsApp',
  'Instagram',
  'Facebook',
  'TikTok',
  'WooCommerce',
  'Website / E-commerce',
  'Social Commerce',
  'Marketplace Stores',
  'Direct-to-Customer'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSeeHowItWorks,
  onGetAiTeam
}) => {
  return (
    <section className="relative pt-8 sm:pt-14 pb-12 lg:pb-16 overflow-hidden bg-[#0A0705] border-b border-white/[0.06]">
      {/* Ambient background depth gradients - Terracotta atmospheric warmth */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] lg:w-[1100px] h-[520px] bg-gradient-to-b from-[#9B2208]/20 via-[#B83A0A]/10 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#B83A0A]/12 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#9B2208]/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Atmospheric Symbolic Backdrop Image */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <img
          src={heroSymbolicNetworkImg}
          alt="Mupezeni Autonomous Retail Intelligence Network"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen scale-105 filter brightness-105 contrast-125"
        />
        {/* Layered Vignette and Gradient Shielding for Crystal-Clear Typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0705]/95 via-[#0A0705]/75 to-[#0A0705]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,#0A0705_80%)]" />
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F5EDE405_1px,transparent_1px),linear-gradient(to_bottom,#F5EDE405_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero Layout */}
        <div className="max-w-4xl flex flex-col items-start text-left space-y-6 sm:space-y-8 py-4 sm:py-6">
          
          {/* 1. HERO EYEBROW */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#130C08] border border-white/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B83A0A] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-dm font-semibold uppercase tracking-widest text-[#F5EDE4]/75">
              MUPEZENI AUTONOMOUS RETAIL INTELLIGENCE NETWORK
            </span>
          </div>

          {/* 2. MAIN HEADLINE */}
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.08]">
            Don't let your next sale{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5EDE4] via-[#FAFAF9] to-[#E58330]">
              slip through the cracks.
            </span>
          </h1>

          {/* 3. SUPPORTING COPY */}
          <p className="text-base sm:text-lg lg:text-xl text-[#F5EDE4]/85 font-dm font-normal leading-relaxed max-w-3xl">
            Every enquiry, abandoned cart, unanswered message, and unfinished customer conversation can represent a potential sale. Mupezeni puts autonomous AI workers behind your customer support and marketing, helping you respond, follow up, re-engage, and create more chances to sell.
          </p>

          {/* 4. CTA AREA */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            {/* Primary CTA */}
            <button
              id="hero-btn-see-how-it-works"
              onClick={onSeeHowItWorks}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl font-syne font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#CD481B] hover:shadow-[0_0_28px_rgba(184,58,10,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer shadow-lg shrink-0"
            >
              <span>See How It Works</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* Secondary CTA */}
            <button
              id="hero-btn-get-ai-team"
              onClick={onGetAiTeam}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-xl font-syne font-semibold text-sm sm:text-base text-[#F5EDE4] bg-[#130C08] hover:bg-[#1E130D] border border-white/15 hover:border-[#B83A0A]/50 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer shrink-0"
            >
              <span>Get Your AI Team</span>
              <ChevronRight className="w-4 h-4 text-[#CD481B]" />
            </button>
          </div>

          {/* 5. MICRO-COPY UNDER CTA */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/65 font-medium">
              AI workers for customer support, sales & marketing.
            </p>
          </div>

          {/* 5B. BRANDED SEARCHING FOR SALES INFOGRAPHIC */}
          <div className="w-full pt-4">
            <HeroSearchingInfographic />
          </div>

        </div>
      </div>

      {/* 6. PLATFORM / CHANNEL MARQUEE */}
      <div className="mt-12 sm:mt-16 pt-6 pb-2 border-t border-white/[0.08] bg-[#070503]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
          <p className="text-[11px] sm:text-xs font-syne font-bold tracking-widest text-[#F5EDE4]/50 uppercase text-center sm:text-left">
            BUILT FOR RETAILERS WHO SELL THROUGH
          </p>
        </div>

        {/* Continuous Horizontal Marquee */}
        <div className="relative w-full overflow-hidden mask-fade-edges py-1">
          <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
            {/* Sequence 1 */}
            {CHANNELS.map((channel, idx) => (
              <div 
                key={`ch-1-${idx}`} 
                className="inline-flex items-center gap-4 text-xs sm:text-sm font-dm font-medium text-[#F5EDE4]/70 hover:text-white transition-colors duration-200"
              >
                <span>{channel}</span>
                <span className="text-[#B83A0A] text-xs">✦</span>
              </div>
            ))}
            
            {/* Sequence 2 for seamless infinite loop */}
            {CHANNELS.map((channel, idx) => (
              <div 
                key={`ch-2-${idx}`} 
                className="inline-flex items-center gap-4 text-xs sm:text-sm font-dm font-medium text-[#F5EDE4]/70 hover:text-white transition-colors duration-200"
              >
                <span>{channel}</span>
                <span className="text-[#B83A0A] text-xs">✦</span>
              </div>
            ))}

            {/* Sequence 3 for ultra-wide displays */}
            {CHANNELS.map((channel, idx) => (
              <div 
                key={`ch-3-${idx}`} 
                className="inline-flex items-center gap-4 text-xs sm:text-sm font-dm font-medium text-[#F5EDE4]/70 hover:text-white transition-colors duration-200"
              >
                <span>{channel}</span>
                <span className="text-[#B83A0A] text-xs">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
