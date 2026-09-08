import React, { useState } from 'react';
import { 
  MessageSquare, 
  Headphones, 
  ShoppingBag, 
  BarChart3, 
  Sparkles, 
  RotateCcw, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Users, 
  ArrowDown, 
  Layers, 
  Bot,
  Store,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { END_TO_END_WORKFLOW } from '../data/websiteData';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { PageId } from '../types';

interface HowItWorksProps {
  onNavigate: (page: PageId) => void;
}

export const HowItWorksPage: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const getStepIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className={className} />;
      case 'Headphones':
        return <Headphones className={className} />;
      case 'ShoppingBag':
        return <ShoppingBag className={className} />;
      case 'BarChart3':
        return <BarChart3 className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'RotateCcw':
        return <RotateCcw className={className} />;
      case 'TrendingUp':
      default:
        return <TrendingUp className={className} />;
    }
  };

  return (
    <div className="pt-20">
      {/* 1. HERO HEADER */}
      <section className="relative pt-14 pb-16 sm:pt-20 sm:pb-24 bg-[#0A0705] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] bg-gradient-to-b from-[#9B2208]/20 via-[#D95A1A]/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span className="text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              End-to-End Operating Workflow
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight max-w-4xl mx-auto">
            How AI Teams Collaborate Inside{' '}
            <span className="text-gradient-fire">
              Your Retail Business.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed">
            Discover how your AI Customer Support, Marketing, and Business Management teams work together seamlessly across every stage of the customer lifecycle—from first message to repeat purchase.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-syne font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:shadow-lg hover:shadow-[#9B2208]/30 transition-all cursor-pointer"
            >
              <span>Deploy Your Scalable AI Teams</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE WORKFLOW STAGES (STEP-BY-STEP) */}
      <section className="py-16 sm:py-24 bg-[#0D0805] border-t border-b border-white/5 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-bold text-[#D95A1A] uppercase tracking-wider font-syne block">
              The 7-Stage Retail Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-syne text-white tracking-tight">
              From Customer Enquiry to Compounding Growth
            </h2>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/75">
              Click any stage below to see how each AI team coordinates in real time to capture revenue and protect your margins.
            </p>
          </div>

          {/* Quick Stepper Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-10">
            {END_TO_END_WORKFLOW.map((step, idx) => {
              const isActive = selectedStep === idx;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setSelectedStep(idx)}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between h-28 ${
                    isActive 
                      ? 'bg-[#201009] border-[#D95A1A] shadow-lg shadow-[#9B2208]/30' 
                      : 'bg-[#120B07]/80 border-white/5 hover:border-[#9B2208]/40 hover:bg-[#160D09]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-black font-syne ${isActive ? 'text-[#D95A1A]' : 'text-white/40'}`}>
                      {step.stepNumber}
                    </span>
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#9B2208] text-white' : 'bg-[#1C100A] text-[#FAFAF9]/60'}`}>
                      {getStepIcon(step.iconName, 'w-3.5 h-3.5')}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block font-syne">{step.actor}</span>
                    <p className="text-xs font-bold font-syne text-white truncate">{step.stageTitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Stage Showcase */}
          {(() => {
            const current = END_TO_END_WORKFLOW[selectedStep];
            return (
              <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#1C0E08] via-[#140C07] to-[#0A0705] border-2 border-[#9B2208]/60 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#9B2208]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  
                  {/* Left Column: Actor & Overview */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#9B2208] text-white text-xs font-black font-syne uppercase tracking-wider">
                        Stage {current.stepNumber}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#24110A] text-[#D95A1A] border border-[#9B2208]/40 text-xs font-bold font-syne">
                        Actor: {current.actor}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-syne text-white tracking-tight">
                        {current.action}
                      </h3>
                      <p className="text-sm sm:text-base text-[#FAFAF9]/85 leading-relaxed">
                        {current.description}
                      </p>
                    </div>

                    {/* Key Details List */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                        What Happens Behind The Scenes:
                      </span>
                      <ul className="space-y-2">
                        {current.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Business Impact & Highlight Box */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-6 rounded-2xl bg-[#090604] border border-white/10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white shadow-lg shadow-[#9B2208]/30">
                          {getStepIcon(current.iconName, 'w-6 h-6')}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95A1A] font-syne block">
                            Business Outcome
                          </span>
                          <h4 className="text-base font-black font-syne text-white">
                            {current.stageTitle}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#FAFAF9]/90 font-medium leading-relaxed bg-[#1A0E08] p-3.5 rounded-xl border border-[#9B2208]/40">
                        "{current.businessImpact}"
                      </p>

                      <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/5 font-syne">
                        <span>Stage {selectedStep + 1} of {END_TO_END_WORKFLOW.length}</span>
                        <div className="flex gap-2">
                          <button
                            disabled={selectedStep === 0}
                            onClick={() => setSelectedStep(s => Math.max(0, s - 1))}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Prev
                          </button>
                          <button
                            disabled={selectedStep === END_TO_END_WORKFLOW.length - 1}
                            onClick={() => setSelectedStep(s => Math.min(END_TO_END_WORKFLOW.length - 1, s + 1))}
                            className="px-2.5 py-1 rounded-lg bg-[#9B2208] hover:bg-[#D95A1A] text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-bold"
                          >
                            Next Stage
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* 3. COMPLETE LINEAR TIMELINE OF THE WORKFLOW */}
      <section className="py-20 sm:py-28 relative bg-[#0A0705]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#D95A1A] uppercase tracking-wider font-syne block">
              Continuous Loop
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-syne text-white tracking-tight">
              The Synchronized Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/75">
              Notice how each AI team handles digital friction so that every customer interaction leads effortlessly into the next stage of growth.
            </p>
          </div>

          {/* Vertical Stack with Connector Arrows */}
          <div className="space-y-6 relative">
            
            {END_TO_END_WORKFLOW.map((step, idx) => (
              <div key={step.stepNumber} className="relative">
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#160E09] via-[#120B07] to-[#0A0705] border border-[#9B2208]/40 shadow-xl space-y-4 hover:border-[#D95A1A]/60 transition-all">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#24110A] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A] font-black font-syne text-sm">
                        {step.stepNumber}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#D95A1A] uppercase tracking-wider font-syne block">
                          {step.actor}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black font-syne text-white">
                          {step.action}
                        </h3>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#20110A] text-[#D95A1A] self-start sm:self-center">
                      {getStepIcon(step.iconName, 'w-5 h-5')}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="p-3 rounded-xl bg-[#080503] border border-white/5 flex items-center gap-2 text-xs text-[#FAFAF9]/90 font-medium">
                    <span className="text-[#D95A1A] font-bold font-syne">Business Impact:</span>
                    <span>{step.businessImpact}</span>
                  </div>

                </div>

                {/* Downward connecting indicator between steps */}
                {idx < END_TO_END_WORKFLOW.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-8 h-8 rounded-full bg-[#1A0E08] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A] shadow-md shadow-[#9B2208]/20">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>

          {/* Growth Loop Summary Callout */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1F1009] via-[#160B06] to-[#1F1009] border-2 border-[#9B2208] text-center space-y-3 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A130A] text-[#D95A1A] text-xs font-bold font-syne uppercase">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>The Compounding Effect</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-syne text-white">
              Serve 10 or 10,000 Customers with Zero Extra Overhead
            </h3>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/80 max-w-2xl mx-auto leading-relaxed">
              Because your AI Customer Support, Marketing, and Business Management teams scale automatically, you never have to scramble to hire or train new staff during peak seasons.
            </p>
          </div>

        </div>
      </section>

      {/* 4. THREE-WAY TEAM COLLABORATION MATRIX */}
      <section className="py-16 sm:py-24 bg-[#0D0805] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-[#D95A1A] uppercase tracking-wider font-syne block">
              Multi-Agent Orchestration
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-syne text-white">
              How Your 3 AI Teams Share Context
            </h2>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/75">
              No silos. No lost customer history. Every team works from the exact same real-time store state.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Team 1 */}
            <div className="p-6 rounded-3xl bg-[#140D08] border border-[#9B2208]/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D95A1A] uppercase font-syne block">Frontline</span>
                  <h4 className="text-base font-black font-syne text-white">Support & Sales Team</h4>
                </div>
              </div>
              <p className="text-xs text-[#FAFAF9]/75 leading-relaxed">
                Interacts directly with shoppers, captures buying intent, answers product queries, and locks in orders.
              </p>
              <div className="p-3 rounded-xl bg-[#090604] border border-white/5 text-xs text-white/80 space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#D95A1A] block">Feeds Data To:</span>
                <p>• Management (New order & address details)</p>
                <p>• Marketing (Shopper preferences & sizes)</p>
              </div>
            </div>

            {/* Team 2 */}
            <div className="p-6 rounded-3xl bg-[#140D08] border border-[#9B2208]/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B83A0A] to-[#F57C00] flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D95A1A] uppercase font-syne block">Growth</span>
                  <h4 className="text-base font-black font-syne text-white">Marketing Team</h4>
                </div>
              </div>
              <p className="text-xs text-[#FAFAF9]/75 leading-relaxed">
                Generates promotional content, creates reels and posts, and delivers targeted broadcasts to prior shoppers.
              </p>
              <div className="p-3 rounded-xl bg-[#090604] border border-white/5 text-xs text-white/80 space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#D95A1A] block">Receives Signals From:</span>
                <p>• Management (Slow-moving or hot inventory)</p>
                <p>• Support (Common questions to answer in ads)</p>
              </div>
            </div>

            {/* Team 3 */}
            <div className="p-6 rounded-3xl bg-[#140D08] border border-[#9B2208]/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7A1804] to-[#B83A0A] flex items-center justify-center text-white">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D95A1A] uppercase font-syne block">Operations</span>
                  <h4 className="text-base font-black font-syne text-white">Business Management</h4>
                </div>
              </div>
              <p className="text-xs text-[#FAFAF9]/75 leading-relaxed">
                Keeps stock balances accurate, logs financial velocity, and generates rider dispatch slips for the owner.
              </p>
              <div className="p-3 rounded-xl bg-[#090604] border border-white/5 text-xs text-white/80 space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#D95A1A] block">Coordinates For:</span>
                <p>• Retailer (Daily briefing & restock alerts)</p>
                <p>• Support (Real-time stock validation)</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CONSULTATION CTA SECTION */}
      <ConsultationCtaSection
        onNavigateToContact={() => onNavigate('contact')}
        badgeText="Scale Your Operations"
        headline="Ready to Deploy Your AI Teams?"
        subheadline="Book a strategic consultation to discover how Mupezeni's AI Teams can integrate into your retail workflow today."
      />
    </div>
  );
};
