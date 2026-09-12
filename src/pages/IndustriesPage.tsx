import React, { useState } from 'react';
import { 
  Shirt, 
  Smartphone, 
  Armchair, 
  Wrench, 
  HeartPulse, 
  Sparkles, 
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Bot,
  MessageSquare,
  TrendingUp,
  Store,
  ChevronRight
} from 'lucide-react';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { INDUSTRY_SOLUTIONS } from '../data/websiteData';
import { PageId, IndustrySolution } from '../types';

interface IndustriesPageProps {
  onNavigate: (page: PageId) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(INDUSTRY_SOLUTIONS[0].id);

  const selectedSolution = INDUSTRY_SOLUTIONS.find(s => s.id === selectedIndustryId) || INDUSTRY_SOLUTIONS[0];

  const getIndustryIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className={className} />;
      case 'Smartphone':
        return <Smartphone className={className} />;
      case 'Armchair':
        return <Armchair className={className} />;
      case 'Wrench':
        return <Wrench className={className} />;
      case 'HeartPulse':
        return <HeartPulse className={className} />;
      case 'Sparkle':
        return <Sparkles className={className} />;
      case 'ShoppingBag':
      default:
        return <ShoppingBag className={className} />;
    }
  };

  return (
    <div className="pt-20">
      {/* 1. HERO HEADER */}
      <section className="relative pt-14 pb-16 sm:pt-20 sm:pb-24 bg-[#0A0705] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-b from-[#9B2208]/20 via-[#D95A1A]/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Store className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span className="text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Specialized Industry Workforces
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight max-w-4xl mx-auto">
            Tailored AI systems for every{' '}
            <span className="text-gradient-fire">
              retail sector.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#FAFAF9]/80 font-normal max-w-3xl mx-auto leading-relaxed">
            A boutique fashion store faces entirely different customer questions than a hardware depot or a neighborhood pharmacy. We calibrate your AI workers to the exact vocabulary, catalogue nuances, and logistics of your industry.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE SECTOR SWITCHER */}
      <section className="py-12 bg-[#0D0805] border-t border-b border-white/5 sticky top-16 z-30 backdrop-blur-xl bg-[#0D0805]/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {INDUSTRY_SOLUTIONS.map((industry) => {
              const isSelected = industry.id === selectedIndustryId;
              return (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustryId(industry.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-syne whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow-lg shadow-[#9B2208]/30 scale-102'
                      : 'bg-[#140D08] text-[#FAFAF9]/70 hover:text-white hover:bg-[#1E110A] border border-white/5'
                  }`}
                >
                  {getIndustryIcon(industry.iconName, 'w-4 h-4')}
                  <span>{industry.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DETAILED INDUSTRY SOLUTION VIEW */}
      <section className="py-16 sm:py-24 bg-[#0A0705] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#160E09] via-[#120B07] to-[#0A0705] border border-[#9B2208]/40 shadow-2xl space-y-10">
            
            {/* Header Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#20110A] border border-[#9B2208]/40 text-[#D95A1A]">
                    {getIndustryIcon(selectedSolution.iconName, 'w-6 h-6')}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                      {selectedSolution.badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-syne text-white">
                      {selectedSolution.name}
                    </h2>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-white/90 font-medium font-syne">
                  {selectedSolution.tagline}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#090604] border border-[#9B2208]/30 max-w-sm">
                <span className="text-[10px] font-bold uppercase text-[#D95A1A] font-syne block mb-1">
                  Observed Impact
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  {selectedSolution.metricsHighlight}
                </p>
              </div>
            </div>

            {/* Challenge & Mupezeni Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Challenge */}
              <div className="p-6 rounded-2xl bg-[#090604] border border-white/5 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-syne flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  The Retail Bottleneck
                </span>
                <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
                  {selectedSolution.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="p-6 rounded-2xl bg-[#1A0E08] border border-[#9B2208]/40 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-syne flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  How <span className="font-roboto font-bold">Mupezeni</span> Solves It
                </span>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                  {selectedSolution.howMupezeniHelps}
                </p>
              </div>

            </div>

            {/* Key Capabilities & Live Interaction Simulation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Key Features (Span 5) */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-base font-bold font-syne text-white uppercase tracking-wider">
                  Configured AI Worker Capabilities
                </h3>

                <div className="space-y-3">
                  {selectedSolution.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0D0805] border border-white/5 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-[#FAFAF9]/85">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Chat Mockup (Span 7) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
                    Simulated Live Interaction
                  </span>
                  <span className="text-[11px] text-white/50">Channel: WhatsApp</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#090604] border border-[#9B2208]/30 space-y-4">
                  {/* Customer Bubble */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-[#160D09] border border-white/5 text-xs text-[#FAFAF9]/90 space-y-1">
                      <span className="text-[10px] text-white/40 block font-syne">Customer Inquiry</span>
                      <p className="leading-relaxed">"{selectedSolution.sampleInteraction.customerQuery}"</p>
                    </div>
                  </div>

                  {/* AI Worker Bubble */}
                  <div className="flex justify-end">
                    <div className="max-w-[90%] p-4 rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#2A1108] to-[#1E0D06] border border-[#9B2208]/60 text-xs text-white space-y-2 shadow-md shadow-[#9B2208]/20">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#D95A1A] font-syne pb-0.5">
                        <Bot className="w-3.5 h-3.5" />
                        <span><span className="font-roboto font-bold">Mupezeni</span> AI Worker (Response Time: 3.2s)</span>
                      </div>
                      <p className="leading-relaxed text-[#FAFAF9]">
                        "{selectedSolution.sampleInteraction.aiResponse}"
                      </p>
                    </div>
                  </div>

                  {/* Outcome Note */}
                  <div className="p-2.5 rounded-xl bg-[#140D08] border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{selectedSolution.sampleInteraction.outcomeNote}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Sector CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold font-syne text-white">
                  Deploy AI for your {selectedSolution.name} business
                </h4>
                <p className="text-xs text-[#FAFAF9]/70 mt-0.5">
                  We customize the knowledge base and stock triggers specifically to your catalog.
                </p>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-syne font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:shadow-lg hover:shadow-[#9B2208]/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Book My AI Growth Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* All 7 Industry Grid Overview */}
          <div className="mt-20 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-black font-syne text-white">
                All 7 Supported Retail Verticals
              </h3>
              <p className="text-xs sm:text-sm text-[#FAFAF9]/70">
                Click any industry to explore tailored AI workflows and live scenarios.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {INDUSTRY_SOLUTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedIndustryId(item.id);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    item.id === selectedIndustryId
                      ? 'bg-[#20110A] border-[#9B2208] shadow-md shadow-[#9B2208]/20'
                      : 'bg-[#0D0805] border-white/5 hover:border-white/20 hover:bg-[#140D08]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-[#1A0E08] text-[#D95A1A]">
                        {getIndustryIcon(item.iconName, 'w-5 h-5')}
                      </div>
                      <ChevronRight className={`w-4 h-4 ${item.id === selectedIndustryId ? 'text-[#D95A1A]' : 'text-white/30'}`} />
                    </div>

                    <h4 className="text-base font-bold font-syne text-white">
                      {item.name}
                    </h4>

                    <p className="text-xs text-[#FAFAF9]/70 line-clamp-2">
                      {item.tagline}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. CONSULTATION CTA SECTION */}
      <ConsultationCtaSection
        onNavigateToContact={() => onNavigate('contact')}
        badgeText="Sector-Specific Blueprint"
        headline="Ready to Automate Your Retail Specialty?"
        subheadline="Schedule a consultation to explore how Mupezeni's AI workforce can be mapped directly to your shop, products, and channels."
      />
    </div>
  );
};
