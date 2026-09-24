import React, { useState } from 'react';
import { PageId, IndustrySolution } from '../types';
import { INDUSTRY_SOLUTIONS } from '../data/websiteData';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { Shirt, Smartphone, Sparkles, Armchair, ShoppingBag, Wrench, Check, ArrowRight, MessageSquare } from 'lucide-react';

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

  return (
    <div className="pt-24 pb-16 bg-[#030202] min-h-screen text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Sector Specialization</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Trained for Your Specific Retail Niche
          </h1>
          <p className="text-base text-[#A8A099]">
            A fashion boutique requires size advice; a hardware merchant requires technical BOQ quotes. Our AI workers adapt directly to your vertical.
          </p>
        </div>

        {/* Industry Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {INDUSTRY_SOLUTIONS.map(ind => {
            const Icon = industryIcons[ind.iconName] || Shirt;
            const active = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#E58330] text-black shadow-lg shadow-[#E58330]/20'
                    : 'bg-[#0E0805] text-[#A8A099] border border-[#24130A] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Card */}
        <div className="rounded-3xl bg-[#090503] border border-[#2B180D] p-6 sm:p-12 space-y-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#211208] pb-8">
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

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono shrink-0">
              ⚡ {current.metricsHighlight}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
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

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  Key Capabilities:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#A8A099]">
                  {current.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#E58330]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Real Sample Interaction */}
            <div className="rounded-2xl bg-[#120B07] border border-[#2B170D] p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#24130A] pb-2">
                  <span className="text-xs font-bold text-white">Live Channel Simulation</span>
                  <span className="text-[10px] font-mono text-[#E58330]">WhatsApp / IG</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#1C1008] border border-[#301B0E] text-white">
                    <span className="text-[10px] font-mono text-[#8C827A] block">Customer:</span>
                    "{current.sampleInteraction.customerQuery}"
                  </div>

                  <div className="p-3 rounded-xl bg-[#090503] border border-emerald-500/30 text-emerald-300">
                    <span className="text-[10px] font-mono text-emerald-400 block">AI Worker (2.1s):</span>
                    "{current.sampleInteraction.aiResponse}"
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#170E08] border border-[#2B170D] text-[11px] text-[#A8A099] font-mono">
                ✓ {current.sampleInteraction.outcomeNote}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1F120A] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#A8A099]">
              Every industry plan is strictly <strong>K2,000 / month flat</strong>.
            </span>
            <button
              onClick={onOpenBookingModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E58330] to-[#FF9F4A] text-black font-bold text-xs shadow-lg"
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
