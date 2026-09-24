import React from 'react';
import { AI_TEAM_MEMBERS, BUSINESS_INSIGHTS_DASHBOARD_DATA } from '../data/websiteData';
import { MessageSquareText, Sparkles, Check, ArrowRight, BarChart3, Clock, Zap, CheckCircle2 } from 'lucide-react';

interface AiTeamSectionProps {
  onGetStarted?: () => void;
}

export const AiTeamSection: React.FC<AiTeamSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#030202] relative overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-[10.5px] sm:text-[11px] font-mono">
            <Zap className="w-3 h-3" />
            <span>Dedicated Retail Workforce</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-syne text-white tracking-tight leading-tight">
            Two AI Workers. One Dashboard. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E58330] via-[#FF9F4A] to-[#F5B26B]">
              Your Entire Digital Frontline Handled.
            </span>
          </h2>
          <p className="text-xs sm:text-[13px] text-[#A8A099] max-w-xl mx-auto leading-relaxed">
            Not passive software tools or empty templates. These are autonomous AI workers executing daily retail tasks in customer conversations and social marketing.
          </p>
        </div>

        {/* 2 AI Workers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {AI_TEAM_MEMBERS.map((worker) => {
            const isSupport = worker.id === 'customer-support';
            const Icon = isSupport ? MessageSquareText : Sparkles;

            return (
              <div
                key={worker.id}
                className="relative rounded-xl sm:rounded-2xl bg-[#0A0604] border border-[#26150C] p-4 sm:p-5 lg:p-6 flex flex-col justify-between hover:border-[#E58330]/40 transition-all shadow-lg space-y-4"
              >
                <div className="space-y-3.5 sm:space-y-4">
                  {/* Top Badge & Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center border ${worker.avatarBg}`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <span className="text-[9.5px] sm:text-[10px] font-mono text-[#E58330] font-semibold tracking-wider uppercase block">
                          {worker.badge}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold font-syne text-white">
                          {worker.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#C4BCB3] leading-relaxed">
                    {worker.roleDescription}
                  </p>

                  {/* Responsibilities */}
                  <div className="space-y-1.5">
                    <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                      Core Daily Responsibilities:
                    </span>
                    <ul className="space-y-1 text-[11px] sm:text-xs text-[#E0D8D0]">
                      {worker.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#E58330] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mock Visual Preview */}
                  <div className="rounded-lg bg-[#120B07] border border-[#2A160D] p-2.5 sm:p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-xs font-bold text-white font-syne">{worker.mockVisual.headline}</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        {worker.mockVisual.metricsTag}
                      </span>
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] font-mono text-[#A8A099] bg-[#070402] p-2 sm:p-2.5 rounded-md border border-[#1F1008] whitespace-pre-line leading-relaxed">
                      {worker.mockVisual.sampleSnippet}
                    </p>
                  </div>
                </div>

                {/* Business Outcome Footer */}
                <div className="pt-2.5 border-t border-[#1C1008] flex items-center gap-2 text-[11px] sm:text-xs text-[#A8A099]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Business Outcome:</strong> {worker.businessOutcome}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Business Insights Dashboard Section (Included Visibility Layer) */}
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#140C07] via-[#0E0805] to-[#140C07] border border-[#E58330]/30 p-4 sm:p-6 lg:p-7 shadow-xl space-y-4 sm:space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-[10.5px] sm:text-[11px] font-mono">
                <BarChart3 className="w-3 h-3" />
                <span>{BUSINESS_INSIGHTS_DASHBOARD_DATA.badge}</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black font-syne text-white">
                {BUSINESS_INSIGHTS_DASHBOARD_DATA.title}
              </h3>
              <p className="text-xs text-[#A8A099] max-w-xl leading-relaxed">
                {BUSINESS_INSIGHTS_DASHBOARD_DATA.subtitle}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-xs font-syne shadow-md shadow-[#9B2208]/35 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Deploy Full AI Team • $100/mo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {BUSINESS_INSIGHTS_DASHBOARD_DATA.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-2.5 sm:p-3 rounded-lg bg-[#090503] border border-[#26150C] space-y-1"
              >
                <div className="text-[11px] sm:text-xs font-bold text-white font-syne">
                  {feat.title}
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#9E958C] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
