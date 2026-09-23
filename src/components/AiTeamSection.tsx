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
  Layers,
  Search,
  Compass,
  CheckSquare,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { PageId } from '../types';
import { AiWorkerIllustration } from './AiWorkerIllustrations';

interface AiTeamSectionProps {
  onNavigate: (page: PageId) => void;
}

export const AiTeamSection: React.FC<AiTeamSectionProps> = ({ onNavigate }) => {
  // Mobile tab: 'support' | 'marketing' | 'dashboard' | 'all'
  const [activeTab, setActiveTab] = useState<'support' | 'marketing' | 'dashboard' | 'all'>('support');

  const agenticSteps = [
    {
      step: '01',
      title: 'OBSERVE',
      subtitle: 'Interpret Information',
      description: 'Reads customer questions, monitors product inventory, checks incoming order status, and maintains continuous context across conversations.',
      icon: Search,
      badge: 'Context Awareness'
    },
    {
      step: '02',
      title: 'DECIDE',
      subtitle: 'Make Decisions Within Rules',
      description: 'Determines the right product recommendation, checks sizing fit, selects suitable promotional visuals, or calculates order totals within your clear guidelines.',
      icon: Compass,
      badge: 'Defined Boundaries'
    },
    {
      step: '03',
      title: 'ACT',
      subtitle: 'Take Appropriate Action',
      description: 'Sends real-time answers, schedules daily marketing posts for approval, delivers payment checkout links, and sends delivery slips directly to riders.',
      icon: CheckSquare,
      badge: 'Autonomous Execution'
    },
    {
      step: '04',
      title: 'ESCALATE',
      subtitle: 'Human Judgment First',
      description: 'Recognizes sensitive situations, unusual custom requests, or high-value matters and hands them smoothly over to the owner with full background context.',
      icon: AlertCircle,
      badge: 'Owner Control'
    }
  ];

  return (
    <section id="ai-team" className="py-12 sm:py-20 lg:py-28 relative bg-[#070503] border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[900px] h-[250px] sm:h-[500px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[100px] sm:blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-4 mb-8 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span className="text-[10px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              2 AI Workers + 1 Business Insights Dashboard
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Meet Your <span className="text-gradient-fire">AI Team</span>
          </h2>

          <p className="text-xs sm:text-base lg:text-lg text-[#FAFAF9]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Mupezeni gives retail businesses two dedicated AI workers that handle repetitive digital work around the clock, while the included Business Insights Dashboard keeps the owner in full control.
          </p>

          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-full bg-[#170E08] border border-white/10 text-xs sm:text-sm font-semibold text-white/90 font-syne">
              One AI team. One simple price: <span className="text-[#D95A1A] font-black">K2,000/month.</span>
            </span>
          </div>
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
              <span>Support Worker</span>
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
              <span>Marketing Worker</span>
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

        {/* Main Grid: 2 AI Workers + 1 Business Insights Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mb-12 sm:mb-16">
          
          {/* CARD 1: AI CUSTOMER SUPPORT WORKER */}
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
                      AI Worker 01
                    </span>
                    <h3 className="text-base sm:text-xl font-black font-syne text-white leading-tight">
                      AI Customer Support Worker
                    </h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#D95A1A] font-syne mt-0.5">
                      "Your customers don't have to wait."
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulation preview */}
              <div className="p-3 rounded-xl bg-[#090604] border border-white/5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] text-white/60">
                  <span className="text-white/70">Connected Channels (where integrated):</span>
                  <span className="text-emerald-400 font-bold">Continuous 24/7</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-[#20110A] text-[#D95A1A] text-[9px] font-bold">WhatsApp</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#160E09] text-white/70 text-[9px] font-medium">Instagram</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#160E09] text-white/70 text-[9px] font-medium">Facebook</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#160E09] text-white/70 text-[9px] font-medium">Web</span>
                </div>
                <div className="p-2 rounded-lg bg-[#140D08] border border-white/5 text-[11px] text-[#FAFAF9]/85 italic">
                  "Yes! The Chelsea Boots in Size 42 are in stock (K650). Delivery to Woodlands is K40 tomorrow morning. Would you like me to lock this in for you?"
                </div>
                <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                  <span className="flex items-center gap-1"><Check className="w-2.5 h-2.5" /> Product & FAQ Handled</span>
                  <span className="text-white/50">Lead Follow-Up Active</span>
                </div>
              </div>

              {/* Capabilities list */}
              <div className="space-y-1.5 flex-grow pt-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 font-syne block">
                  Responsibilities:
                </span>
                <ul className="space-y-1.5 text-xs text-[#FAFAF9]/80 font-syne">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Answers customer questions and routine FAQs around the clock</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Provides product information, sizing advice, and pricing details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Captures leads and proactively follows up with interested shoppers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Helps move casual enquiries toward confirmed, paid purchases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Works across existing digital channels where integrated</span>
                  </li>
                </ul>
              </div>

              {/* Outcome */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#1C0E08] border border-[#9B2208]/30 text-xs text-[#FAFAF9]/85">
                <span className="text-[10px] font-bold text-[#D95A1A] uppercase font-syne block">Operational Result:</span>
                <p className="font-semibold text-white">Your customers get answered instantly, even after hours and on weekends.</p>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3 bg-[#090604] border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-white/50">Always Online</span>
              <span className="text-[11px] text-[#D95A1A] font-syne font-bold">Continuous Support</span>
            </div>
          </div>

          {/* CARD 2: AI MARKETING WORKER */}
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
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                      AI Worker 02
                    </span>
                    <h3 className="text-base sm:text-xl font-black font-syne text-white leading-tight">
                      AI Marketing Worker
                    </h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#D95A1A] font-syne mt-0.5">
                      "Your business stays visible every day."
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulation preview */}
              <div className="p-3 rounded-xl bg-[#090604] border border-white/5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] text-white/60">
                  <span className="flex items-center gap-1 text-[#D95A1A] font-bold"><Calendar className="w-2.5 h-2.5" /> Content Baseline</span>
                  <span className="text-emerald-400 font-bold">~1 Post / Day (Up to 30/mo)</span>
                </div>
                <div className="p-2 rounded-lg bg-[#140D08] border border-white/5 text-[11px] text-[#FAFAF9]/85 italic">
                  "Weekend Drop: Branded product images and promotional launch captions prepared and queued for owner approval."
                </div>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#25130A] border border-[#9B2208]/30 text-[9px] text-[#D95A1A] font-bold">Branded Images</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#140D08] text-[9px] text-white/70 font-medium">Captions & Copy</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#140D08] text-[9px] text-white/70 font-medium">Content Calendar</span>
                </div>
              </div>

              {/* Capabilities list */}
              <div className="space-y-1.5 flex-grow pt-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 font-syne block">
                  Responsibilities:
                </span>
                <ul className="space-y-1.5 text-xs text-[#FAFAF9]/80 font-syne">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Creates daily social media content (~1 post per day, up to 30 posts/month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Generates branded marketing images and high-fidelity visuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Writes engaging captions, hashtags and promotional sales copy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Promotes inventory drops, seasonal campaigns, and special offers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                    <span>Maintains a content calendar and prepares posts for owner approval</span>
                  </li>
                </ul>
              </div>

              {/* Outcome */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#1C0E08] border border-[#9B2208]/30 text-xs text-[#FAFAF9]/85">
                <span className="text-[10px] font-bold text-[#D95A1A] uppercase font-syne block">Operational Result:</span>
                <p className="font-semibold text-white">Consistent brand visibility without requiring you to personally design or write every post.</p>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3 bg-[#090604] border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-white/50">Owner Approval Flow</span>
              <span className="text-[11px] text-[#D95A1A] font-syne font-bold">Daily Content</span>
            </div>
          </div>

          {/* CARD 3: BUSINESS INSIGHTS DASHBOARD (INCLUDED VISIBILITY LAYER - NOT A THIRD WORKER) */}
          <div className={`lg:col-span-4 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1C110A] via-[#140C07] to-[#0A0705] border-2 border-[#D95A1A]/60 shadow-2xl transition-all duration-300 flex-col justify-between overflow-hidden relative group ${
            activeTab === 'dashboard' || activeTab === 'all' ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="h-2 w-full bg-gradient-to-r from-[#D95A1A] via-[#F57C00] to-[#25D366]" />

            {/* Visibility Layer Header */}
            <div className="p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5 flex-grow flex flex-col relative">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2D160C] via-[#1E0F08] to-[#0A0705] border border-[#D95A1A]/70 p-2 shadow-lg shadow-[#D95A1A]/20 flex-shrink-0 flex items-center justify-center text-[#D95A1A]">
                    <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-[9px] sm:text-[10px] font-black uppercase font-syne">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Included Visibility Layer</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-black font-syne text-white leading-tight mt-1">
                      Business Insights Dashboard
                    </h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-emerald-400 font-syne mt-0.5">
                      "Know what's happening without digging through messages."
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Metrics Simulation Preview */}
              <div className="p-3 rounded-xl bg-[#090604] border border-white/5 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-xl bg-[#140D08] border border-white/5">
                    <span className="text-[10px] text-white/50 block">Today's Orders</span>
                    <span className="text-sm font-black text-emerald-400 font-syne">14 Orders</span>
                    <span className="text-[9px] text-white/40 block">Live customer feed</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#140D08] border border-white/5">
                    <span className="text-[10px] text-white/50 block">Restock Signals</span>
                    <span className="text-sm font-black text-[#D95A1A] font-syne">2 Items Low</span>
                    <span className="text-[9px] text-white/40 block">Inventory threshold</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-[#140D08] border border-white/5 text-[11px] text-[#FAFAF9]/85 italic">
                  "Daily visibility: Order activity, customer inquiries, and fast-moving product trends logged automatically."
                </div>
              </div>

              {/* Capabilities list */}
              <div className="space-y-1.5 flex-grow pt-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 font-syne block">
                  Visibility & Tracking Features:
                </span>
                <ul className="space-y-1.5 text-xs text-[#FAFAF9]/80 font-syne">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Real-time order activity and sales transaction trends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Product performance analysis and fast-moving items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Customer inquiry activity and channel engagement metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Automated restock signals when stock hits low thresholds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Included at no extra charge with your two AI workers</span>
                  </li>
                </ul>
              </div>

              {/* Note: Not a 3rd worker */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#1C0E08] border border-[#D95A1A]/30 text-xs text-[#FAFAF9]/85">
                <span className="text-[10px] font-bold text-emerald-400 uppercase font-syne block">Owner Visibility:</span>
                <p className="font-semibold text-white">Centralized business visibility so you always know what is happening without administrative headaches.</p>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3 bg-[#090604] border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-bold">Included Layer</span>
              <span className="text-[11px] text-emerald-400 font-syne font-bold">Zero Extra Cost</span>
            </div>
          </div>

        </div>

        {/* AGENTIC EXPLANATION SECTION: "AI workers that don't just answer. They work." */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#1A0E08] via-[#140C07] to-[#0A0705] border border-[#9B2208]/50 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D95A1A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-3xl space-y-3 mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20110A] border border-[#9B2208]/40 text-[10px] sm:text-xs font-bold text-[#D95A1A] font-syne uppercase tracking-wider">
              <Zap className="w-3 h-3 text-[#D95A1A]" />
              <span>Agentic Architecture</span>
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-syne text-white tracking-tight">
              AI workers that don't just answer. <span className="text-gradient-fire">They work.</span>
            </h3>

            <p className="text-xs sm:text-sm lg:text-base text-[#FAFAF9]/80 leading-relaxed">
              Mupezeni's AI workers are agentic systems built around specific business responsibilities. They can interpret information, make decisions within defined instructions, use connected business tools, take appropriate actions, maintain context, and escalate tasks requiring human judgment.
            </p>
          </div>

          {/* Visual Concept: OBSERVE → DECIDE → ACT → ESCALATE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {agenticSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#110A06] border border-white/10 hover:border-[#D95A1A]/50 transition-all flex flex-col justify-between space-y-3 relative group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black font-syne text-[#D95A1A]">
                        {step.step}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1C0E08] text-white/70 border border-white/5 font-syne">
                        {step.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#20110A] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A] flex-shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-sm font-black font-syne text-white tracking-wide">
                        {step.title}
                      </h4>
                    </div>

                    <p className="text-[11px] font-bold text-white/90 font-syne">
                      {step.subtitle}
                    </p>

                    <p className="text-[11px] text-[#FAFAF9]/70 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {idx < 3 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-[#1A0E08] border border-white/10 flex items-center justify-center text-[#D95A1A] text-xs font-bold">
                        →
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Supporting Brand Axiom */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0B0604] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-white/80 font-syne">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span><strong className="text-white">Give AI the repetitive work.</strong> Keep the judgment and customer relationships.</span>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] font-syne hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
            >
              <span>Get Your AI Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
