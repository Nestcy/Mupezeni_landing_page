import React, { useState } from 'react';
import { 
  MessageSquare,
  Megaphone,
  BarChart3,
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Users,
  Check,
  Sparkles,
  ShieldCheck,
  Eye,
  Activity,
  Layers
} from 'lucide-react';
import { PageId } from '../types';
import { AiWorkerIllustration } from './AiWorkerIllustrations';

interface AiTeamSectionProps {
  onNavigate: (page: PageId) => void;
}

export const AiTeamSection: React.FC<AiTeamSectionProps> = ({ onNavigate }) => {
  // Mobile tab: 'support' | 'marketing' | 'dashboard' | 'all'
  const [activeTab, setActiveTab] = useState<'support' | 'marketing' | 'dashboard' | 'all'>('support');

  return (
    <section id="ai-team" className="py-12 sm:py-20 lg:py-28 relative bg-[#070503] border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[900px] h-[250px] sm:h-[500px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[100px] sm:blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-4 mb-8 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-4 sm:py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D95A1A]" />
            <span className="text-[10px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Your AI Workforce
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Meet Your <span className="text-gradient-fire">AI Teams</span>
          </h2>

          <p className="text-xs sm:text-base lg:text-lg text-[#FAFAF9]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Every <span className="font-roboto font-semibold text-white">Mupezeni</span> partner gets dedicated AI agents that manage customer interactions and marketing around the clock, plus an included business insights dashboard.
          </p>

          <p className="text-xs sm:text-sm font-semibold text-[#D95A1A] font-syne">
            "Every Mupezeni partner gets a dashboard showing orders, sales trends, and restock signals — included at no extra cost."
          </p>
        </div>

        {/* Mobile Switcher Bar (Mobile & Tablet) */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between p-1 bg-[#140D08] rounded-xl border border-white/10 max-w-sm mx-auto shadow-md">
            <button
              onClick={() => setActiveTab('support')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-syne font-bold text-[11px] transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>Support</span>
            </button>

            <button
              onClick={() => setActiveTab('marketing')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-syne font-bold text-[11px] transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                activeTab === 'marketing'
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Megaphone className="w-3 h-3" />
              <span>Marketing</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-syne font-bold text-[11px] transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3 h-3" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`py-1.5 px-2.5 rounded-lg font-syne font-bold text-[9px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <span>All</span>
            </button>
          </div>
        </div>

        {/* Main Grid: 2 Core Agents (Span 4 + 4) + 1 Included Dashboard (Span 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mb-8 sm:mb-12">
          
          {/* 1. AI CUSTOMER SUPPORT AGENT */}
          <div className={`lg:col-span-4 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#180E09]/95 via-[#120B07]/90 to-[#0A0705]/95 border border-[#9B2208]/40 hover:border-[#D95A1A]/70 shadow-2xl transition-all duration-300 flex-col justify-between overflow-hidden group ${
            activeTab === 'support' || activeTab === 'all' ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="h-1.5 w-full bg-gradient-to-r from-[#9B2208] to-[#D95A1A]" />

            <div className="p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5 flex-grow flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#25130A] via-[#190E08] to-[#0C0704] border border-[#9B2208]/50 p-1 shadow-lg shadow-[#9B2208]/25 flex-shrink-0 flex items-center justify-center relative">
                    <AiWorkerIllustration workerId="customer-support" className="w-full h-full" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-2 border-[#140D08]" />
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                      Core AI Agent
                    </span>
                    <h3 className="text-base sm:text-xl font-black font-syne text-white leading-tight">
                      AI Customer Support Agent
                    </h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#FAFAF9]/75 font-syne mt-0.5">
                      Your 24/7 digital sales & support agent
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulation preview */}
              <div className="p-3 rounded-xl bg-[#090604] border border-white/5 space-y-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-[#20110A] text-[#D95A1A] text-[9px] font-bold">WhatsApp</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#160E09] text-white/70 text-[9px] font-medium">Instagram</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#160E09] text-white/70 text-[9px] font-medium">Facebook</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#160E09] text-white/70 text-[9px] font-medium">Web</span>
                </div>
                <div className="p-2 rounded-lg bg-[#140D08] border border-white/5 text-[11px] text-[#FAFAF9]/85 italic">
                  "Yes! The Chelsea Boots in Size 42 are in stock (K650). Delivery to Woodlands is K40 tomorrow morning. Would you like me to lock this in?"
                </div>
                <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                  <span className="flex items-center gap-1"><Check className="w-2.5 h-2.5" /> Instant Stock Verified</span>
                  <span className="text-white/50">&lt;2s response</span>
                </div>
              </div>

              {/* Capabilities list */}
              <div className="space-y-1.5 flex-grow pt-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 font-syne block">
                  Key Capabilities:
                </span>
                <ul className="space-y-1.5 text-xs text-[#FAFAF9]/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Answers customer questions 24/7 across WhatsApp, IG, FB & Web</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Recommends products tailored to customer preferences and sizing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Follows up with leads and interested shoppers to close sales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Converts casual enquiries into confirmed, paid orders</span>
                  </li>
                </ul>
              </div>

              {/* Outcome */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#1C0E08] border border-[#9B2208]/30 text-xs text-[#FAFAF9]/85">
                <span className="text-[10px] font-bold text-[#D95A1A] uppercase font-syne block">Outcome:</span>
                <p className="font-semibold text-white">Serve 10x more customers without hiring support staff.</p>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3 bg-[#090604] border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-white/50">Always Online</span>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#D95A1A] hover:text-white font-syne cursor-pointer"
              >
                <span>Get Your AI Growth Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. AI MARKETING AGENT */}
          <div className={`lg:col-span-4 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#180E09]/95 via-[#120B07]/90 to-[#0A0705]/95 border border-[#9B2208]/40 hover:border-[#D95A1A]/70 shadow-2xl transition-all duration-300 flex-col justify-between overflow-hidden group ${
            activeTab === 'marketing' || activeTab === 'all' ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="h-1.5 w-full bg-gradient-to-r from-[#B83A0A] to-[#F57C00]" />

            <div className="p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5 flex-grow flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#25130A] via-[#190E08] to-[#0C0704] border border-[#9B2208]/50 p-1 shadow-lg shadow-[#9B2208]/25 flex-shrink-0 flex items-center justify-center relative">
                    <AiWorkerIllustration workerId="marketing-specialist" className="w-full h-full" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-2 border-[#140D08]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
                        Creative Engine
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#20110A] text-[#D95A1A] border border-[#9B2208]/40">
                        Add Anytime
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-black font-syne text-white leading-tight">
                      AI Marketing Agent
                    </h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#FAFAF9]/75 font-syne mt-0.5">
                      Your consistent creative content & campaigns agent
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulation preview */}
              <div className="p-3 rounded-xl bg-[#090604] border border-white/5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] text-white/60">
                  <span className="flex items-center gap-1 text-[#D95A1A] font-bold"><Calendar className="w-2.5 h-2.5" /> Weekly Calendar</span>
                  <span className="text-emerald-400 font-bold">Auto-Scheduled</span>
                </div>
                <div className="p-2 rounded-lg bg-[#140D08] border border-white/5 text-[11px] text-[#FAFAF9]/85 italic">
                  "Weekend Drop Promo generated with 3 carousel creatives + captions ready for your approval across Instagram & Facebook."
                </div>
                <div className="flex items-center gap-1 pt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#25130A] border border-[#9B2208]/30 text-[9px] text-[#D95A1A] font-bold">Owner-Approved Ads</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#140D08] text-[9px] text-white/70 font-medium">Reels & Graphics</span>
                </div>
              </div>

              {/* Capabilities list */}
              <div className="space-y-1.5 flex-grow pt-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 font-syne block">
                  Key Capabilities:
                </span>
                <ul className="space-y-1.5 text-xs text-[#FAFAF9]/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Creates engaging social posts, captions & promotional graphics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Generates product images, reels and short-form marketing videos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Plans consistent weekly content and campaign calendars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Runs targeted advertising with strict owner-approved budgets</span>
                  </li>
                </ul>
              </div>

              {/* Outcome */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#1C0E08] border border-[#9B2208]/30 text-xs text-[#FAFAF9]/85">
                <span className="text-[10px] font-bold text-[#D95A1A] uppercase font-syne block">Outcome:</span>
                <p className="font-semibold text-white">Consistent brand presence without hiring designers or copywriters.</p>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3 bg-[#090604] border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-white/50">Add anytime</span>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#D95A1A] hover:text-white font-syne cursor-pointer"
              >
                <span>Get Your AI Growth Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. INCLUDED BONUS: BUSINESS INSIGHTS DASHBOARD */}
          <div className={`lg:col-span-4 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1C110A] via-[#140C07] to-[#0A0705] border-2 border-[#D95A1A]/60 shadow-2xl transition-all duration-300 flex-col justify-between overflow-hidden relative group ${
            activeTab === 'dashboard' || activeTab === 'all' ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="h-2 w-full bg-gradient-to-r from-[#D95A1A] via-[#F57C00] to-[#25D366]" />

            {/* Bonus Tag Header */}
            <div className="p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5 flex-grow flex flex-col relative">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2D160C] via-[#1E0F08] to-[#0A0705] border border-[#D95A1A]/70 p-2 shadow-lg shadow-[#D95A1A]/20 flex-shrink-0 flex items-center justify-center text-[#D95A1A]">
                    <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-[9px] sm:text-[10px] font-black uppercase font-syne">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Included at No Extra Cost</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-black font-syne text-white leading-tight mt-1">
                      Business Insights Dashboard
                    </h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#FAFAF9]/75 font-syne mt-0.5">
                      Live command center for orders, stock & sales
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Metrics Simulation Preview */}
              <div className="p-3 rounded-xl bg-[#090604] border border-white/5 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-xl bg-[#140D08] border border-white/5">
                    <span className="text-[10px] text-white/50 block">Today's Sales</span>
                    <span className="text-sm font-black text-emerald-400 font-syne">K4,850</span>
                    <span className="text-[9px] text-white/40 block">14 orders logged</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#140D08] border border-white/5">
                    <span className="text-[10px] text-white/50 block">Restock Signals</span>
                    <span className="text-sm font-black text-[#D95A1A] font-syne">2 Items Low</span>
                    <span className="text-[9px] text-white/40 block">Reorder alert sent</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-[#140D08] border border-white/5 text-[11px] text-[#FAFAF9]/85 italic">
                  "Morning briefing: 14 weekend orders packed & ready for delivery riders. Beige Trench Coat needs reorder."
                </div>
              </div>

              {/* Capabilities list */}
              <div className="space-y-1.5 flex-grow pt-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 font-syne block">
                  What's Included:
                </span>
                <ul className="space-y-1.5 text-xs text-[#FAFAF9]/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Live tracking of incoming & completed orders across all channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Sales trends, revenue velocity & daily executive summaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Automated restock alerts and supplier reorder signals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Instant customer delivery slips formatted for riders</span>
                  </li>
                </ul>
              </div>

              {/* Outcome */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#1C0E08] border border-[#D95A1A]/30 text-xs text-[#FAFAF9]/85">
                <span className="text-[10px] font-bold text-emerald-400 uppercase font-syne block">Advantage:</span>
                <p className="font-semibold text-white">Full visibility into sales and stock without manual spreadsheet tracking.</p>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3 bg-[#090604] border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-bold">Always Included</span>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#D95A1A] hover:text-white font-syne cursor-pointer"
              >
                <span>Get Your AI Growth Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner: Collaboration Callout */}
        <div className="p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1A0E08] via-[#140C07] to-[#0A0705] border border-[#9B2208]/50 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#20110A] border border-[#9B2208]/30 text-[10px] sm:text-xs font-bold text-[#D95A1A] font-syne">
                <Zap className="w-3 h-3" />
                <span>Seamless Collaboration</span>
              </div>
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-syne text-white tracking-tight">
                AI Customer Support + AI Marketing + Insights Dashboard.
              </h3>
              <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed max-w-2xl">
                When your <strong>AI Customer Support Agent</strong> closes a sale on WhatsApp, your <strong>Insights Dashboard</strong> logs the order and prepares the delivery slip, while your <strong>AI Marketing Agent</strong> plans promotions for your fastest-moving products.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:opacity-95 shadow-md shadow-[#9B2208]/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Get Your AI Growth Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
