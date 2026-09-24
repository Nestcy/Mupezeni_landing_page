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
  Bot,
  MessageSquare
} from 'lucide-react';
import { PageId } from '../types';
import { INDUSTRY_SOLUTIONS } from '../data/websiteData';

import fashionImg from '../assets/images/retail_fashion_showcase_1790265502740.jpg';
import electronicsImg from '../assets/images/retail_electronics_showcase_1790265516709.jpg';
import hardwareImg from '../assets/images/retail_hardware_showcase_1790265529076.jpg';
import groceryImg from '../assets/images/retail_grocery_supermarket_1790265542486.jpg';
import beautyImg from '../assets/images/retail_beauty_cosmetics_1790265559369.jpg';
import furnitureImg from '../assets/images/retail_furniture_decor_1790265570722.jpg';

const industryImages: Record<string, string> = {
  fashion: fashionImg,
  electronics: electronicsImg,
  beauty: beautyImg,
  furniture: furnitureImg,
  groceries: groceryImg,
  hardware: hardwareImg,
};

const industryIcons: Record<string, any> = {
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
  const [selectedIndustry, setSelectedIndustry] = useState<string>('fashion');

  const current = INDUSTRY_SOLUTIONS.find(i => i.id === selectedIndustry) || INDUSTRY_SOLUTIONS[0];
  const CurrentIcon = industryIcons[current.iconName] || Shirt;
  const currentImg = industryImages[current.id] || fashionImg;

  return (
    <section className="py-20 relative bg-[#040202] border-y border-[#1E110A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#E58330]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E58330]/10 border border-[#E58330]/25 text-[#E58330] text-xs font-mono font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>Real-World Retail Specializations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Trained for <span className="text-gradient-fire">Your Exact Retail Niche</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8A099]">
            From Lusaka fashion boutiques to busy Kamwala hardware depots, your AI Team adapts directly to the specific inventory vocabulary, pricing logic, and delivery workflows of your business.
          </p>
        </div>

        {/* Industry Pill Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {INDUSTRY_SOLUTIONS.map(ind => {
            const Icon = industryIcons[ind.iconName] || Shirt;
            const active = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white shadow-xl shadow-[#9B2208]/30 scale-105'
                    : 'bg-[#0E0805] text-[#A8A099] border border-[#24130A] hover:text-white hover:border-[#3D2012]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Showcase Card */}
        <div className="rounded-3xl bg-[#080503] border border-[#2B180D] p-6 sm:p-10 shadow-2xl overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: Real Store Showcase Image with Live Badge Overlay */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#3D2012] shadow-2xl group">
                <img
                  src={currentImg}
                  alt={`${current.name} Retail Store Interior`}
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-84 object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badge: AI Worker Active */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090503]/90 backdrop-blur-md border border-[#E58330]/50 text-white text-xs font-mono shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AI Team Active • WhatsApp & IG</span>
                </div>

                {/* Bottom Metric Pill */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0A0604]/90 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{current.metricsHighlight}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#E58330] uppercase">
                    {current.badge.split('•')[0]}
                  </span>
                </div>
              </div>

              {/* Tagline below image */}
              <div className="flex items-center gap-2 text-xs text-[#C4BCB3] italic pl-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#E58330] shrink-0" />
                <span>"{current.tagline}"</span>
              </div>
            </div>

            {/* Right: Operational Breakdown & Live WhatsApp Simulation */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Challenge & Solution */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-mono">
                  <span>Common Store Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-[#A8A099] leading-relaxed">
                  {current.challenge}
                </p>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E58330]/15 border border-[#E58330]/30 text-[#E58330] text-[11px] font-mono">
                  <span>Mupezeni Autonomous Resolution</span>
                </div>
                <p className="text-xs sm:text-sm text-[#D4CDC5] font-medium leading-relaxed">
                  {current.howMupezeniHelps}
                </p>
              </div>

              {/* Sample Interaction Snippet */}
              <div className="rounded-xl bg-[#110A06] border border-[#2B180D] p-4 space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between border-b border-[#24130A] pb-1.5">
                  <span className="text-[11px] font-bold text-white">Live Speed Simulation</span>
                  <span className="text-[10px] font-mono text-[#E58330]">Response time: 2.1s</span>
                </div>
                <div className="p-2 rounded-lg bg-[#190F09] text-[#FAFAF9]/90 text-[11px]">
                  <span className="text-[#8C827A] font-mono text-[10px] block">Customer Inquiry:</span>
                  "{current.sampleInteraction.customerQuery}"
                </div>
                <div className="p-2 rounded-lg bg-[#07130A] border border-emerald-500/30 text-emerald-300 text-[11px]">
                  <span className="text-emerald-400 font-mono text-[10px] block">AI Worker:</span>
                  "{current.sampleInteraction.aiResponse}"
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenBookingModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-xs shadow-lg shadow-[#9B2208]/30 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Deploy for {current.name} • $100/mo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('industries')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#140C07] border border-[#2B180D] hover:border-[#E58330]/40 text-[#D4CDC5] hover:text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>View All 6 Verticals</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
