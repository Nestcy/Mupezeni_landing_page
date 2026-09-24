import React from 'react';
import { PageId } from '../types';
import { AI_TEAM_MEMBERS, BUSINESS_INSIGHTS_DASHBOARD_DATA, AGENTIC_FRAMEWORK_STEPS } from '../data/websiteData';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { MessageSquareText, Sparkles, BarChart3, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface SolutionsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <div className="pt-24 pb-16 bg-[#030202] min-h-screen text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Workforce Specifications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            The Two AI Workers Driving Your Store
          </h1>
          <p className="text-base text-[#A8A099]">
            Deep dive into the operational capabilities of your AI Customer Support Worker, AI Marketing Worker, and the included Business Insights Dashboard.
          </p>
        </div>

        {/* Worker 1: Customer Support */}
        <div className="rounded-3xl bg-[#090503] border border-[#26150C] p-6 sm:p-12 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>Frontline Operational Worker</span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                AI Customer Support Worker
              </h2>
              <p className="text-sm text-[#C4BCB3] leading-relaxed">
                Operating 24 hours a day, 7 days a week. Connects directly to your WhatsApp Business API, Instagram Direct Messages, and Website LiveChat. It instantly answers pricing inquiries, verifies stock levels, calculates delivery fees, and sends mobile money payment instructions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#140C07] border border-[#2E180E] space-y-2 text-xs font-mono shrink-0">
              <div className="text-[#E58330]">Channels Covered:</div>
              <div className="text-white">• WhatsApp Business</div>
              <div className="text-white">• Instagram Direct</div>
              <div className="text-white">• Web LiveChat</div>
              <div className="text-emerald-400 pt-1">Avg Response: &lt; 2.5 seconds</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#E58330] font-semibold">
                Core Autonomous Work
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D4CDC5]">
                {AI_TEAM_MEMBERS[0].responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-[#120B07] border border-[#2B170D] p-5 space-y-3">
              <span className="text-xs font-bold text-white block">Sample Real-World Dialogue</span>
              <div className="text-xs font-mono text-[#D4CDC5] space-y-2 bg-[#080402] p-3 rounded-lg border border-[#1F120A] leading-relaxed">
                <p className="text-[#8C827A]">// WhatsApp Inflow at 22:15 PM</p>
                <p><span className="text-[#E58330]">Customer:</span> "Are the black sneakers size 43 available? How much with delivery to Kabulonga?"</p>
                <p><span className="text-emerald-400">AI Worker:</span> "Yes, we have 2 pairs in size 43 left! Price is K750 + K30 delivery to Kabulonga (Total: K780). Can dispatch tomorrow by 09:30 AM. Shall I reserve for you?"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Worker 2: Marketing Worker */}
        <div className="rounded-3xl bg-[#090503] border border-[#26150C] p-6 sm:p-12 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Creative Social Worker</span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                AI Marketing Worker
              </h2>
              <p className="text-sm text-[#C4BCB3] leading-relaxed">
                Produces ~1 custom branded social media post every day (up to 30 posts/month). High-resolution branded product graphics paired with persuasive, conversion-focused promotional captions and relevant Zambian hashtags.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#140C07] border border-[#2E180E] space-y-2 text-xs font-mono shrink-0">
              <div className="text-[#E58330]">Creative Output:</div>
              <div className="text-white">• ~1 Post Generated Daily</div>
              <div className="text-white">• Up to 30 Posts / Month</div>
              <div className="text-white">• Formatted for IG & FB</div>
              <div className="text-amber-400 pt-1">Agency Quality at $100/mo</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#E58330] font-semibold">
                Daily Marketing Routine
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D4CDC5]">
                {AI_TEAM_MEMBERS[1].responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-[#120B07] border border-[#2B170D] p-5 space-y-3">
              <span className="text-xs font-bold text-white block">Sample Caption Generation</span>
              <div className="text-xs font-mono text-[#D4CDC5] space-y-2 bg-[#080402] p-3 rounded-lg border border-[#1F120A] leading-relaxed">
                <p className="text-[#8C827A]">// Automated Payday Promo Post</p>
                <p className="italic">"Step out in confidence this weekend. Our bestselling Italian Brogues are back in stock. Hand-stitched leather for lasting comfort. Free Lusaka delivery on all orders today! Tap the link in bio to order via WhatsApp."</p>
                <p className="text-[#E58330]">#LusakaMenStyle #ZambiaRetail #PaydaySpecial</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Layer */}
        <div className="rounded-3xl bg-gradient-to-r from-[#140C07] via-[#0E0704] to-[#140C07] border border-[#E58330]/30 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E58330]/10 text-[#E58330] border border-[#E58330]/30">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#E58330] uppercase font-semibold">Included Visibility Layer</span>
              <h3 className="text-2xl font-bold text-white">Business Insights Dashboard</h3>
            </div>
          </div>
          <p className="text-sm text-[#A8A099] max-w-2xl">
            Never wonder what your AI workers are doing. View incoming customer sentiment, top converting items, inventory reorder triggers, and total revenue captured in real-time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {BUSINESS_INSIGHTS_DASHBOARD_DATA.features.map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#090503] border border-[#24130A] space-y-1.5">
                <div className="text-xs font-bold text-white">{f.title}</div>
                <p className="text-xs text-[#9E958C]">{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center py-8 space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Ready to deploy your AI Team for $100/month?
          </h3>
          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-extrabold text-sm shadow-xl shadow-[#9B2208]/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Get Your AI Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
