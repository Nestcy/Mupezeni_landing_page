import React from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight, Bot, BarChart3, RotateCcw } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const planFeatures = [
    { text: 'AI Customer Support Worker (24/7 autonomous responses)', highlight: true },
    { text: 'AI Marketing Worker (~1 custom post & copy/day, up to 30 posts/month)', highlight: true },
    { text: 'Business Insights Dashboard (Real-time order & revenue analytics)', highlight: true },
    { text: 'WhatsApp Business API & Instagram DM integration', highlight: false },
    { text: 'Airtel Money, MTN MoMo & Zamtel payment instructions', highlight: false },
    { text: 'Instant stock & inventory checking for customers', highlight: false },
    { text: 'Delivery address collection & automated order formatting', highlight: false },
    { text: 'Full knowledge ingestion & prompt tuning for your brand', highlight: false },
    { text: 'No setup fee • Month-to-month flexibility (Cancel anytime)', highlight: true },
    { text: '30-Day 100% Money-Back Guarantee', highlight: true }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#050302] relative overflow-hidden border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 sm:space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-[10.5px] sm:text-[11px] font-mono">
            <Sparkles className="w-3 h-3" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-syne text-white tracking-tight">
            One Fixed Price. Zero Hidden Fees.
          </h2>
          <p className="text-xs sm:text-[13px] text-[#A8A099] leading-relaxed">
            Everything your retail business needs to operate autonomously online at a fraction of traditional hiring costs.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#1A0E08] via-[#0E0704] to-[#0A0503] border-2 border-[#E58330]/50 p-4 sm:p-6 lg:p-7 shadow-xl space-y-5">
          
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#E58330] text-black text-[9.5px] sm:text-[10px] font-bold font-mono px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
            Complete AI Retail Workforce
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#24130A] pb-4 sm:pb-5">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold font-syne text-white">
                Mupezeni AI Team
              </h3>
              <p className="text-xs text-[#A8A099] max-w-md leading-relaxed">
                Two dedicated AI workers managing your customer support and daily marketing, plus an included business insights dashboard.
              </p>
            </div>

            <div className="text-left md:text-right shrink-0">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white font-syne">
                  $100
                </span>
                <span className="text-xs text-[#A8A099] font-mono">/ month</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono block mt-0.5">
                Zero setup fees • Month-to-month
              </span>
            </div>
          </div>

          {/* Features list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
            {planFeatures.map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs">
                <div className="w-4 h-4 rounded bg-[#E58330]/10 text-[#E58330] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span className={feat.highlight ? 'text-white font-medium' : 'text-[#A8A099]'}>
                  {feat.text}
                </span>
              </div>
            ))}
          </div>

          {/* Guarantee pill */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#140B06] border border-[#2D1A0F] flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <div className="text-[11px] sm:text-xs text-[#CFC7BF] leading-relaxed">
              <strong>30-Day Money-Back Guarantee:</strong> Try the AI Team for a full month. If you are not completely satisfied with the time saved and sales inquiries handled, we refund 100% of your fee.
            </div>
          </div>

          {/* CTA button */}
          <div>
            <button
              onClick={onSelectPlan}
              className="w-full py-2.5 sm:py-3 px-5 rounded-lg bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#9B2208]/35 flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer font-syne"
            >
              <span>Get Your AI Team</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <p className="text-center text-[10.5px] text-[#7A7169] font-mono mt-1.5">
              Implementation: 4–6 weeks • Low-risk agreement • 30-day money-back guarantee
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
