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
  ShieldCheck,
  ChevronRight,
  Layers
} from 'lucide-react';

import { industryImageMap, industryIconMap } from '../components/IndustryShowcaseSection';
import fashionImg from '../assets/images/retail_fashion_showcase_1790265502740.jpg';

interface IndustriesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('fashion');

  const current = INDUSTRY_SOLUTIONS.find(i => i.id === selectedIndustry) || INDUSTRY_SOLUTIONS[0];
  const CurrentIcon = industryIconMap[current.iconName] || Shirt;
  const currentImg = industryImageMap[current.id] || fashionImg;

  return (
    <div className="pt-24 pb-16 bg-[#030202] min-h-screen text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Full 6-Industry Dedicated Visual Suite</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Specialized AI Teams for Every <span className="text-gradient-fire">Retail Sector</span>
          </h1>
          <p className="text-base text-[#A8A099]">
            Explore how Mupezeni provides purpose-built conversational models, inventory logic, and payment workflows tailored directly to your specific vertical in Zambia.
          </p>
        </div>

        {/* 1. INTERACTIVE FULL 6-CARD VISUAL GALLERY GRID */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#211208] pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>All 6 Retail Verticals</span>
              <span className="text-xs font-mono text-[#E58330] font-normal px-2.5 py-0.5 rounded-full bg-[#1A0E08] border border-[#E58330]/30">
                Click any card to inspect
              </span>
            </h2>
            <span className="text-xs font-mono text-emerald-400">
              ⚡ 100% Pre-Trained Models
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {INDUSTRY_SOLUTIONS.map(item => {
              const Icon = industryIconMap[item.iconName] || Shirt;
              const imgSrc = industryImageMap[item.id] || fashionImg;
              const isSelected = selectedIndustry === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedIndustry(item.id);
                    document.getElementById('industry-deep-dive')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group relative rounded-3xl bg-[#090503] border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl cursor-pointer ${
                    isSelected 
                      ? 'border-[#E58330] ring-2 ring-[#E58330]/40 -translate-y-1' 
                      : 'border-[#26140A] hover:border-[#E58330]/60 hover:-translate-y-1'
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={`${item.name} Retail Store Interior`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-[#090503]/25 to-transparent" />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080503]/90 backdrop-blur-md border border-[#E58330]/60 text-white text-[11px] font-mono shadow-md">
                      <Icon className="w-3.5 h-3.5 text-[#E58330]" />
                      <span>{item.name}</span>
                    </div>

                    {/* Live Metric Tag */}
                    <div className="absolute bottom-3 left-3 right-3 inline-flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#080503]/90 backdrop-blur-md border border-white/10 text-xs text-emerald-300 font-mono">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {item.metricsHighlight.split(' ')[0]} {item.metricsHighlight.split(' ')[1]} {item.metricsHighlight.split(' ')[2]}
                      </span>
                      <span className="text-[10px] text-[#E58330] uppercase font-bold">Active</span>
                    </div>
                  </div>

                  {/* Body Preview */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#E58330] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#A8A099] leading-relaxed">
                        {item.tagline}
                      </p>

                      <div className="p-3 rounded-xl bg-[#120B07] border border-[#24130A] text-[11px] text-[#D4CDC5] space-y-1">
                        <span className="text-[10px] font-mono text-[#E58330] uppercase block font-semibold">
                          Specialized Capability:
                        </span>
                        <p className="line-clamp-2">{item.howMupezeniHelps}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#E58330] border-t border-[#1C1008]">
                      <span>Inspect Deep Dive & Simulation</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* 2. DEDICATED DEEP DIVE SECTION */}
        <div id="industry-deep-dive" className="pt-6 space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Active Focus: <span className="text-gradient-fire">{current.name}</span>
            </h2>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono shrink-0 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>{current.metricsHighlight}</span>
            </div>
          </div>

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
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{current.name}</h3>
                  <p className="text-sm text-[#C4BCB3]">{current.tagline}</p>
                </div>
              </div>

              <button
                onClick={onOpenBookingModal}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-xs shadow-lg shadow-[#9B2208]/35 hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Deploy for {current.name.split('&')[0]}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Dedicated Store Image (Span 5) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-[#331C10] shadow-xl group">
                  <img
                    src={currentImg}
                    alt={`${current.name} Dedicated Retail Space`}
                    referrerPolicy="no-referrer"
                    className="w-full h-64 sm:h-72 object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status overlay */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080503]/90 backdrop-blur-md border border-[#E58330]/60 text-white text-[11px] font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Domain Engine</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#090503]/85 backdrop-blur-md border border-white/10 text-xs text-[#D4CDC5] font-mono">
                    📍 Verified Zambian Retail Workflow
                  </div>
                </div>

                {/* Real Live Sample Interaction */}
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
                <span>Get Your AI Team For {current.name}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Consultation Callout */}
        <ConsultationCtaSection 
          onNavigateToContact={() => onNavigate('contact')}
          onNavigateToHowItWorks={() => onNavigate('how-it-works')}
        />

      </div>
    </div>
  );
};
