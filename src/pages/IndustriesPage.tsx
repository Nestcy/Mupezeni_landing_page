import React, { useState } from 'react';
import { PageId, IndustrySolution } from '../types';
import { INDUSTRY_SOLUTIONS } from '../data/websiteData';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { 
  Shirt, 
  Smartphone, 
  Sparkles, 
  Armchair, 
  ShoppingBag, 
  Wrench, 
  Check, 
  ArrowRight, 
  MessageSquare,
  CheckCircle2,
  Zap,
  ShieldCheck
} from 'lucide-react';

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

interface IndustriesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('fashion');

  const industryIcons: Record<string, any> = {
    Shirt,
    Smartphone,
    Sparkles,
    Armchair,
    ShoppingBag,
    Wrench
  };

  const current = INDUSTRY_SOLUTIONS.find(i => i.id === selectedIndustry) || INDUSTRY_SOLUTIONS[0];
  const CurrentIcon = industryIcons[current.iconName] || Shirt;
  const currentImg = industryImages[current.id] || fashionImg;

  return (
    <div className="pt-24 pb-16 bg-[#030202] min-h-screen text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Sector Specialization & Real Visuals</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Trained for Your Specific Retail Niche
          </h1>
          <p className="text-base text-[#A8A099]">
            A fashion boutique requires size advice; a hardware merchant requires technical BOQ quotes. Our AI workers adapt directly to your vertical.
          </p>
        </div>

        {/* Industry Selector Tabs */}
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
                    ? 'bg-[#E58330] text-black shadow-lg shadow-[#E58330]/25 scale-105'
                    : 'bg-[#0E0805] text-[#A8A099] border border-[#24130A] hover:text-white hover:border-[#3D2012]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Card */}
        <div className="rounded-3xl bg-[#090503] border border-[#2B180D] p-6 sm:p-10 lg:p-12 space-y-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#211208] pb-6">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-[#E58330]/10 border border-[#E58330]/30 text-[#E58330]">
                <CurrentIcon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#E58330] uppercase font-semibold">
                  {current.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{current.name}</h2>
                <p className="text-sm text-[#C4BCB3]">{current.tagline}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono shrink-0 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>{current.metricsHighlight}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Real Store Showcase Image (Span 5) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#331C10] shadow-xl group">
                <img
                  src={currentImg}
                  alt={`${current.name} Retail Store Environment`}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Status overlay */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080503]/90 backdrop-blur-md border border-[#E58330]/60 text-white text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Autonomous AI Active</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#090503]/85 backdrop-blur-md border border-white/10 text-xs text-[#D4CDC5] font-mono">
                  📍 Verified Lusaka Retailer Architecture
                </div>
              </div>

              {/* Real Sample Interaction */}
              <div className="rounded-2xl bg-[#120B07] border border-[#2B170D] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-[#24130A] pb-2">
                  <span className="text-xs font-bold text-white">Live Channel Simulation</span>
                  <span className="text-[10px] font-mono text-[#E58330]">WhatsApp / IG</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#1C1008] border border-[#301B0E] text-white">
                    <span className="text-[10px] font-mono text-[#8C827A] block">Customer Inquiry:</span>
                    "{current.sampleInteraction.customerQuery}"
                  </div>

                  <div className="p-3 rounded-xl bg-[#090503] border border-emerald-500/30 text-emerald-300">
                    <span className="text-[10px] font-mono text-emerald-400 block">AI Worker (2.1s):</span>
                    "{current.sampleInteraction.aiResponse}"
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-[#170E08] text-[11px] text-[#A8A099] font-mono">
                  ✓ {current.sampleInteraction.outcomeNote}
                </div>
              </div>
            </div>

            {/* Right: Operational Details & Features (Span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                  The Operational Bottleneck:
                </h4>
                <p className="text-xs sm:text-sm text-[#A89E95] leading-relaxed">
                  {current.challenge}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#E58330] font-semibold">
                  How Mupezeni Solves It:
                </h4>
                <p className="text-xs sm:text-sm text-[#D4CDC5] leading-relaxed">
                  {current.howMupezeniHelps}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  Key Capabilities for {current.name}:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keyFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#120B07] border border-[#24130A] text-xs text-[#D4CDC5]">
                      <Check className="w-4 h-4 text-[#E58330] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation & Guarantee Strip */}
              <div className="p-4 rounded-2xl bg-[#140C07] border border-[#26140A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#A8A099]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4–6 week onboarding with 30-day money-back guarantee.</span>
                </div>
                <span className="font-mono text-[#E58330] font-bold shrink-0">$100/mo flat</span>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-[#1F120A] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#A8A099]">
              Every industry plan is strictly <strong>$100 / month flat</strong>. Zero setup fees.
            </span>
            <button
              onClick={onOpenBookingModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-xs shadow-lg shadow-[#9B2208]/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Get Your AI Team For {current.name}
            </button>
          </div>
        </div>

        {/* Consultation Callout */}
        <ConsultationCtaSection />

      </div>
    </div>
  );
};
