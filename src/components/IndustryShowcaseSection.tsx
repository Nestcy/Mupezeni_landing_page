import React, { useState } from 'react';
import { 
  Shirt, 
  Smartphone, 
  Sparkles, 
  Armchair, 
  ShoppingBag, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Clock, 
  MessageSquare,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { PageId, IndustrySolution } from '../types';
import { INDUSTRY_SOLUTIONS } from '../data/websiteData';

import fashionImg from '../assets/images/retail_fashion_showcase_1790265502740.jpg';
import electronicsImg from '../assets/images/retail_electronics_showcase_1790265516709.jpg';
import hardwareImg from '../assets/images/retail_hardware_showcase_1790265529076.jpg';
import groceryImg from '../assets/images/retail_grocery_supermarket_1790265542486.jpg';
import beautyImg from '../assets/images/retail_beauty_cosmetics_1790265559369.jpg';
import furnitureImg from '../assets/images/retail_furniture_decor_1790265570722.jpg';

export const industryImageMap: Record<string, string> = {
  fashion: fashionImg,
  electronics: electronicsImg,
  beauty: beautyImg,
  furniture: furnitureImg,
  groceries: groceryImg,
  hardware: hardwareImg,
};

export const industryIconMap: Record<string, any> = {
  Shirt,
  Smartphone,
  Sparkles,
  Armchair,
  ShoppingBag,
  Wrench
};

interface IndustryShowcaseSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal?: () => void;
}

export const IndustryShowcaseSection: React.FC<IndustryShowcaseSectionProps> = ({
  onNavigate,
  onOpenBookingModal = () => onNavigate('pricing')
}) => {
  const [activeModalIndustry, setActiveModalIndustry] = useState<IndustrySolution | null>(null);

  return (
    <section className="py-20 relative bg-[#040202] border-y border-[#1E110A] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#E58330]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E58330]/10 border border-[#E58330]/25 text-[#E58330] text-xs font-mono font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>Dedicated Retail Specialization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Trained for <span className="text-gradient-fire">Your Exact Retail Industry</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8A099]">
            Every retail sector in Zambia operates differently. Our AI workers come pre-trained with domain-specific inventory vocabulary, quotation logic, and customer workflows.
          </p>
        </div>

        {/* FULL 6-CARD VISUAL INDUSTRY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {INDUSTRY_SOLUTIONS.map((item) => {
            const Icon = industryIconMap[item.iconName] || Shirt;
            const imgSrc = industryImageMap[item.id] || fashionImg;

            return (
              <div
                key={item.id}
                className="group relative rounded-3xl bg-[#090503] border border-[#26140A] hover:border-[#E58330]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#9B2208]/20 hover:-translate-y-1"
              >
                {/* Top Image Container */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={`${item.name} Retail Store Display`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                  />

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-[#090503]/20 to-transparent" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080503]/90 backdrop-blur-md border border-[#E58330]/60 text-white text-[11px] font-mono shadow-md">
                    <Icon className="w-3.5 h-3.5 text-[#E58330]" />
                    <span>{item.name}</span>
                  </div>

                  {/* Metric Pill Tag */}
                  <div className="absolute bottom-3 left-3 right-3 inline-flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#080503]/90 backdrop-blur-md border border-white/10 text-xs text-emerald-300 font-mono">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {item.metricsHighlight.split(' ')[0]} {item.metricsHighlight.split(' ')[1]} {item.metricsHighlight.split(' ')[2]}
                    </span>
                    <span className="text-[10px] text-[#E58330] uppercase font-bold">Verified</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#E58330] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#A8A099] mt-1 leading-relaxed">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Operational Problem & Solution Preview */}
                    <div className="p-3 rounded-xl bg-[#120B07] border border-[#24130A] space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">The Bottleneck:</span>
                        <p className="text-[#A89E95] text-[11px] line-clamp-2">{item.challenge}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#E58330] font-bold block">AI Resolution:</span>
                        <p className="text-[#D4CDC5] text-[11px] line-clamp-2">{item.howMupezeniHelps}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => setActiveModalIndustry(item)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#170E08] hover:bg-[#21130A] border border-[#301B0E] hover:border-[#E58330]/40 text-xs font-mono text-[#E58330] transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>View Live Channel Simulation</span>
                    </button>

                    <button
                      onClick={onOpenBookingModal}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-xs shadow-md shadow-[#9B2208]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>Deploy for {item.name.split('&')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#170E08] via-[#0D0704] to-[#170E08] border border-[#E58330]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              Do you operate in a different retail category?
            </h4>
            <p className="text-xs text-[#A8A099]">
              Our 4–6 week onboarding customizes catalog ingestion and dialect tuning for any retail business in Africa.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B0F09] border border-[#3D2012] hover:border-[#E58330] text-white text-xs font-semibold hover:bg-[#24130A] transition-all cursor-pointer"
          >
            <span>Discuss Custom Store Setup</span>
            <ChevronRight className="w-4 h-4 text-[#E58330]" />
          </button>
        </div>

      </div>

      {/* POPUP MODAL: Interactive Live Channel Simulation for Selected Industry */}
      {activeModalIndustry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0C0704] border border-[#2B180D] p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#211208] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E58330]/15 text-[#E58330]">
                  {React.createElement(industryIconMap[activeModalIndustry.iconName] || Shirt, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {activeModalIndustry.name}
                  </h3>
                  <p className="text-xs font-mono text-[#E58330]">
                    {activeModalIndustry.badge}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveModalIndustry(null)}
                className="p-2 rounded-full bg-[#1A0E08] text-[#A8A099] hover:text-white hover:bg-[#2B170D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Store Banner */}
            <div className="relative h-40 rounded-2xl overflow-hidden border border-[#2B180D]">
              <img
                src={industryImageMap[activeModalIndustry.id] || fashionImg}
                alt={activeModalIndustry.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0704] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C0704]/90 border border-white/10 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeModalIndustry.metricsHighlight}</span>
              </div>
            </div>

            {/* Real Interaction Simulation Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A099]">
                <span>WhatsApp Customer Conversation</span>
                <span className="text-[#E58330]">Instant 2.1s Auto-Reply</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#190F09] border border-[#2B180D] text-white">
                  <span className="text-[10px] font-mono text-[#8C827A] block mb-1">Customer Inquiry:</span>
                  "{activeModalIndustry.sampleInteraction.customerQuery}"
                </div>

                <div className="p-3.5 rounded-2xl bg-[#06140A] border border-emerald-500/30 text-emerald-300">
                  <span className="text-[10px] font-mono text-emerald-400 block mb-1">Mupezeni AI Worker:</span>
                  "{activeModalIndustry.sampleInteraction.aiResponse}"
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#140C07] text-[11px] text-[#A8A099] font-mono">
                ✓ {activeModalIndustry.sampleInteraction.outcomeNote}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#211208]">
              <span className="text-xs text-[#A8A099]">
                Includes 4–6 week onboarding & 30-day money-back guarantee.
              </span>
              <button
                onClick={() => {
                  setActiveModalIndustry(null);
                  onOpenBookingModal();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-xs shadow-lg shadow-[#9B2208]/40 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Deploy for {activeModalIndustry.name.split('&')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
