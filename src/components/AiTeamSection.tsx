import React, { useState } from 'react';
import { 
  MessageSquare,
  Megaphone,
  Settings,
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Users,
  Check
} from 'lucide-react';
import { AI_TEAM_MEMBERS } from '../data/websiteData';
import { PageId } from '../types';
import { AiWorkerIllustration } from './AiWorkerIllustrations';

interface AiTeamSectionProps {
  onNavigate: (page: PageId) => void;
}

export const AiTeamSection: React.FC<AiTeamSectionProps> = ({ onNavigate }) => {
  // Mobile worker tab: 'customer-support' | 'marketing-specialist' | 'business-manager' | 'all'
  const [mobileWorkerTab, setMobileWorkerTab] = useState<string>('customer-support');

  const visibleMembers = AI_TEAM_MEMBERS.filter(member => {
    if (mobileWorkerTab === 'all') return true;
    return member.id === mobileWorkerTab;
  });

  return (
    <section id="ai-team" className="py-8 sm:py-20 lg:py-28 relative bg-[#070503] border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[900px] h-[250px] sm:h-[500px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[100px] sm:blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-4 mb-4 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-4 sm:py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D95A1A]" />
            <span className="text-[10px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Your Digital Employees
            </span>
          </div>

          <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Meet Your <span className="text-gradient-fire">AI Teams</span>
          </h2>

          <p className="text-xs sm:text-base lg:text-lg text-[#FAFAF9]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Every Mupezeni partner gets a dedicated suite of scalable AI Teams that collaborate behind the scenes as digital employees to help your business grow.
          </p>

          {/* Principle pill */}
          <div className="pt-0.5 sm:pt-1">
            <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs md:text-sm font-semibold text-[#F5EDE4]/90 bg-[#160D09]/80 border border-[#9B2208]/30 px-2.5 py-1 rounded-xl font-syne text-center">
              <span className="text-[#D95A1A] flex-shrink-0">💡 Mindset:</span>
              <span className="hidden sm:inline">"I'm adding three intelligent digital teams to scale my business without growing payroll."</span>
              <span className="sm:hidden">Add 3 AI teams without growing payroll.</span>
            </span>
          </div>
        </div>

        {/* Mobile Worker Switcher Bar (Mobile & Tablet) */}
        <div className="lg:hidden mb-3 sm:mb-6">
          <div className="flex items-center justify-between p-1 bg-[#140D08] rounded-xl border border-white/10 max-w-sm mx-auto shadow-md">
            <button
              onClick={() => setMobileWorkerTab('customer-support')}
              className={`flex-1 py-1 px-1.5 sm:py-1.5 sm:px-2 rounded-lg font-syne font-bold text-[10px] sm:text-[11px] transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                mobileWorkerTab === 'customer-support'
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>Support</span>
            </button>

            <button
              onClick={() => setMobileWorkerTab('marketing-specialist')}
              className={`flex-1 py-1 px-1.5 sm:py-1.5 sm:px-2 rounded-lg font-syne font-bold text-[10px] sm:text-[11px] transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                mobileWorkerTab === 'marketing-specialist'
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Megaphone className="w-3 h-3" />
              <span>Marketing</span>
            </button>

            <button
              onClick={() => setMobileWorkerTab('business-manager')}
              className={`flex-1 py-1 px-1.5 sm:py-1.5 sm:px-2 rounded-lg font-syne font-bold text-[10px] sm:text-[11px] transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                mobileWorkerTab === 'business-manager'
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Settings className="w-3 h-3" />
              <span>Manager</span>
            </button>

            <button
              onClick={() => setMobileWorkerTab('all')}
              className={`py-1 px-2 sm:py-1.5 sm:px-2.5 rounded-lg font-syne font-bold text-[9px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                mobileWorkerTab === 'all'
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <span>All 3</span>
            </button>
          </div>
        </div>

        {/* Mobile Compact Cards View */}
        <div className={`lg:hidden gap-2.5 sm:gap-4 mb-5 sm:mb-10 ${
          mobileWorkerTab === 'all' ? 'grid grid-cols-1 sm:grid-cols-2' : 'space-y-2.5 sm:space-y-4'
        }`}>
          {visibleMembers.map(member => renderMobileCard(member))}
        </div>

        {/* Desktop View: Full 3-column Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 mb-14 sm:mb-16">
          {AI_TEAM_MEMBERS.map(member => renderDesktopCard(member))}
        </div>

        {/* Bottom Banner: How the 3 Teams Collaborate */}
        <div className="p-3.5 sm:p-8 lg:p-10 rounded-xl sm:rounded-3xl bg-gradient-to-br from-[#1A0E08] via-[#140C07] to-[#0A0705] border border-[#9B2208]/50 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-1.5 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#20110A] border border-[#9B2208]/30 text-[9px] sm:text-[11px] font-bold text-[#D95A1A] font-syne">
                <Zap className="w-3 h-3" />
                <span>Real-Time Collaboration</span>
              </div>
              <h3 className="text-sm sm:text-2xl lg:text-3xl font-black font-syne text-white tracking-tight">
                All 3 AI Teams collaborate in real time.
              </h3>
              <p className="text-[10px] sm:text-sm text-[#FAFAF9]/80 leading-relaxed max-w-2xl">
                When your <strong>AI Customer Support Team</strong> closes a sale, your <strong>AI Business Management Team</strong> updates inventory and prepares dispatch manifests, while your <strong>AI Marketing Team</strong> schedules spotlight promotions for high-demand items.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3 justify-center pt-1 sm:pt-0">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 sm:px-6 sm:py-3.5 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:opacity-95 shadow-md shadow-[#9B2208]/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Book My AI Growth Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );

  /* ULTRA COMPACT MOBILE CARD (Designed specifically for small screens) */
  function renderMobileCard(member: typeof AI_TEAM_MEMBERS[0]) {
    const isSupport = member.id === 'customer-support';
    const isMarketing = member.id === 'marketing-specialist';
    const isManager = member.id === 'business-manager';

    return (
      <div
        key={member.id}
        className="rounded-xl bg-gradient-to-b from-[#180E09] via-[#120B07] to-[#0A0705] border border-[#9B2208]/40 shadow-lg p-3 space-y-2"
      >
        {/* Header Row */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#25130A] via-[#1A0E08] to-[#0A0705] border border-[#9B2208]/40 p-0.5 flex-shrink-0 flex items-center justify-center relative shadow-sm">
            <AiWorkerIllustration workerId={member.id} className="w-full h-full" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-[#140D08]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne truncate">
                {member.badge}
              </span>
              <span className="text-[8px] text-emerald-400 font-bold font-syne whitespace-nowrap">
                {isSupport ? '24/7 Active' : isMarketing ? 'Auto-Schedule' : 'Live Sync'}
              </span>
            </div>
            <h3 className="text-xs font-black font-syne text-white leading-tight truncate">
              {member.title}
            </h3>
          </div>
        </div>

        {/* 1-line channel badge */}
        <div className="px-2 py-0.5 rounded bg-[#090604] border border-white/5 flex items-center justify-between text-[9px]">
          <span className="text-[#D95A1A] font-bold flex items-center gap-1 truncate">
            <Zap className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{member.mockVisual.headline}</span>
          </span>
          <span className="text-white/50 text-[8px] ml-1 flex-shrink-0">{member.mockVisual.metricsTag}</span>
        </div>

        {/* 4 Key Responsibilities in 2-Column Side-by-Side Grid */}
        <div className="grid grid-cols-2 gap-1 text-[9px] text-[#FAFAF9]/85">
          {member.responsibilities.slice(0, 4).map((resp, rIdx) => (
            <div key={rIdx} className="flex items-start gap-1 p-1 rounded bg-[#130B07] border border-white/5">
              <CheckCircle2 className="w-2.5 h-2.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
              <span className="leading-tight text-[8.5px] line-clamp-2">{resp}</span>
            </div>
          ))}
        </div>

        {/* Bottom Outcome & Deploy Button side-by-side */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
          <div className="flex-1 min-w-0 p-1.5 rounded-lg bg-[#20110A]/90 border border-[#9B2208]/30 flex items-center gap-1 text-[9px]">
            <TrendingUp className="w-2.5 h-2.5 text-[#D95A1A] flex-shrink-0" />
            <span className="text-[#FAFAF9] font-semibold leading-tight truncate">
              {member.businessOutcome}
            </span>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="py-1.5 px-2.5 rounded-lg font-syne font-bold text-[10px] text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] flex items-center justify-center gap-1 cursor-pointer shadow flex-shrink-0 whitespace-nowrap"
          >
            <span>Deploy</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    );
  }

  /* DESKTOP CARD VIEW */
  function renderDesktopCard(member: typeof AI_TEAM_MEMBERS[0]) {
    const isSupport = member.id === 'customer-support';
    const isMarketing = member.id === 'marketing-specialist';
    const isManager = member.id === 'business-manager';

    return (
      <div
        key={member.id}
        className="group relative rounded-3xl bg-gradient-to-b from-[#180E09]/95 via-[#120B07]/90 to-[#0A0705]/95 border border-[#9B2208]/35 hover:border-[#D95A1A]/70 shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      >
        <div className={`h-1.5 w-full bg-gradient-to-r ${member.avatarBg}`} />

        <div className="p-7 space-y-5 flex-grow flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#25130A] via-[#190E08] to-[#0C0704] border border-[#9B2208]/50 p-1 shadow-lg shadow-[#9B2208]/25 flex-shrink-0 flex items-center justify-center relative group-hover:border-[#D95A1A]/80 transition-all">
                <AiWorkerIllustration workerId={member.id} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#140D08]" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                  {member.badge}
                </span>
                <h3 className="text-2xl font-black font-syne text-white group-hover:text-[#FAFAF9] transition-colors leading-tight">
                  {member.title}
                </h3>
                <p className="text-xs font-semibold text-[#FAFAF9]/75 font-syne mt-0.5">
                  {member.roleDescription}
                </p>
              </div>
            </div>

            {/* Role indicator pill */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#180E09] border border-[#9B2208]/30 text-[10px] font-bold text-white/70 font-syne">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {isSupport && 'Chat Support'}
                {isMarketing && 'Megaphone Growth'}
                {isManager && 'Ops & Manifest'}
              </span>
            </div>
          </div>

          {/* Visual Simulation Box */}
          <div className="p-3.5 rounded-2xl bg-[#090604] border border-white/5 space-y-2.5 relative overflow-hidden group-hover:border-[#9B2208]/40 transition-colors">
            <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-white/5 font-syne">
              <span className="font-bold text-white/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{member.mockVisual.headline}</span>
              </span>
              <span className="text-[10px] text-[#D95A1A] font-bold">
                {member.mockVisual.metricsTag}
              </span>
            </div>

            {isSupport && (
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-[#20110A] text-[#D95A1A] text-[9px] font-bold">WhatsApp</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#160E09] text-white/70 text-[9px] font-medium">Instagram</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#160E09] text-white/70 text-[9px] font-medium">Facebook</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#160E09] text-white/70 text-[9px] font-medium">Web</span>
                </div>
                <div className="p-2 rounded-lg bg-[#140D08] border border-white/5 text-[11px] text-[#FAFAF9]/85 leading-relaxed italic">
                  {member.mockVisual.sampleSnippet}
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/50 pt-0.5">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Check className="w-2.5 h-2.5" /> Instant Stock Check
                  </span>
                  <span>&lt;2s response</span>
                </div>
              </div>
            )}

            {isMarketing && (
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-[10px] text-white/60">
                  <span className="flex items-center gap-1 text-[#D95A1A] font-bold">
                    <Calendar className="w-2.5 h-2.5" /> Weekly Calendar
                  </span>
                  <span className="text-emerald-400 font-bold">Auto-Scheduled</span>
                </div>
                <div className="p-2 rounded-lg bg-[#140D08] border border-white/5 text-[11px] text-[#FAFAF9]/85 leading-relaxed italic">
                  {member.mockVisual.sampleSnippet}
                </div>
                <div className="flex items-center gap-1 pt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#25130A] border border-[#9B2208]/30 text-[9px] text-[#D95A1A] font-bold">
                    Budget Protected
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#140D08] text-[9px] text-white/70 font-medium">
                    Reels & Graphics
                  </span>
                </div>
              </div>
            )}

            {isManager && (
              <div className="space-y-1.5 text-[11px]">
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-1.5 rounded-lg bg-[#140D08] border border-white/5">
                    <span className="text-[9px] text-white/50 block">Nighttime Orders</span>
                    <span className="text-xs font-bold text-emerald-400 font-syne">14 Confirmed</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#140D08] border border-white/5">
                    <span className="text-[9px] text-white/50 block">Inventory Alert</span>
                    <span className="text-xs font-bold text-[#D95A1A] font-syne">2 Items Low</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-[#140D08] border border-white/5 text-[11px] text-[#FAFAF9]/85 leading-relaxed italic">
                  {member.mockVisual.sampleSnippet}
                </div>
              </div>
            )}
          </div>

          {/* Responsibilities */}
          <div className="space-y-2 flex-grow pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-white/90 font-syne block">
              Responsibilities:
            </span>
            <ul className="space-y-1.5 text-xs text-[#FAFAF9]/80">
              {member.responsibilities.map((resp, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div className="pt-3 mt-auto">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#241209] to-[#160D08] border border-[#9B2208]/40 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D95A1A] uppercase tracking-wider font-syne">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Business Outcome</span>
              </div>
              <p className="text-xs md:text-sm font-bold text-[#FAFAF9] leading-snug">
                {member.businessOutcome}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#090604] border-t border-white/5 flex items-center justify-between">
          <span className="text-[11px] text-white/50 font-medium">
            Managed deployment
          </span>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#D95A1A] hover:text-white font-syne group-hover:translate-x-1 transition-all cursor-pointer"
          >
            <span>Deploy Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }
};
