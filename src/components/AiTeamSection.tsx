import React from 'react';
import { AI_TEAM_MEMBERS, BUSINESS_INSIGHTS_DASHBOARD_DATA } from '../data/websiteData';
import { MessageSquareText, Sparkles, Check, ArrowRight, BarChart3, Clock, Zap, CheckCircle2 } from 'lucide-react';

interface AiTeamSectionProps {
  onGetStarted?: () => void;
}

export const AiTeamSection: React.FC<AiTeamSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#030202] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>Dedicated Retail Workforce</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Two AI Workers. One Dashboard. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E58330] via-[#FF9F4A] to-[#F5B26B]">
              Your Entire Digital Frontline Handled.
            </span>
          </h2>
          <p className="text-base text-[#A8A099] max-w-2xl mx-auto">
            Not passive software tools or empty templates. These are autonomous AI workers executing daily retail tasks in customer conversations and social marketing.
          </p>
        </div>

        {/* 2 AI Workers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {AI_TEAM_MEMBERS.map((worker) => {
            const isSupport = worker.id === 'customer-support';
            const Icon = isSupport ? MessageSquareText : Sparkles;

            return (
              <div
                key={worker.id}
                className="relative rounded-2xl bg-[#0A0604] border border-[#26150C] p-6 sm:p-8 flex flex-col justify-between hover:border-[#E58330]/40 transition-all shadow-xl space-y-6"
              >
                <div className="space-y-6">
                  {/* Top Badge & Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${worker.avatarBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#E58330] font-semibold tracking-wider uppercase block">
                          {worker.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          {worker.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#C4BCB3] leading-relaxed">
                    {worker.roleDescription}
                  </p>

                  {/* Responsibilities */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                      Core Daily Responsibilities:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#E0D8D0]">
                      {worker.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#E58330] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mock Visual Preview */}
                  <div className="rounded-xl bg-[#120B07] border border-[#2A160D] p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{worker.mockVisual.headline}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {worker.mockVisual.metricsTag}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#A8A099] bg-[#070402] p-3 rounded-lg border border-[#1F1008] whitespace-pre-line leading-relaxed">
                      {worker.mockVisual.sampleSnippet}
                    </p>
                  </div>
                </div>

                {/* Business Outcome Footer */}
                <div className="pt-4 border-t border-[#1C1008] flex items-center gap-3 text-xs text-[#A8A099]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Business Outcome:</strong> {worker.businessOutcome}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Business Insights Dashboard Section (Included Visibility Layer) */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#140C07] via-[#0E0805] to-[#140C07] border border-[#E58330]/30 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{BUSINESS_INSIGHTS_DASHBOARD_DATA.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {BUSINESS_INSIGHTS_DASHBOARD_DATA.title}
              </h3>
              <p className="text-sm text-[#A8A099] max-w-xl">
                {BUSINESS_INSIGHTS_DASHBOARD_DATA.subtitle}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E58330] hover:bg-[#FFA959] text-[#0A0604] font-bold text-sm shadow-lg shadow-[#E58330]/20 transition-colors"
              >
                <span>Deploy Full AI Team • K2,000/mo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUSINESS_INSIGHTS_DASHBOARD_DATA.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#090503] border border-[#26150C] space-y-2"
              >
                <div className="text-xs font-bold text-white font-['Space_Grotesk']">
                  {feat.title}
                </div>
                <p className="text-xs text-[#9E958C] leading-relaxed">
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
