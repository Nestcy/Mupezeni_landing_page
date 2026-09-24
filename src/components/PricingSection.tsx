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
    <section className="py-16 sm:py-24 bg-[#050302] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            One Fixed Price. Zero Hidden Fees.
          </h2>
          <p className="text-sm text-[#A8A099]">
            Everything your retail business needs to operate autonomously online at a fraction of traditional hiring costs.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#1A0E08] via-[#0E0704] to-[#0A0503] border-2 border-[#E58330]/50 p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E58330] text-black text-xs font-bold font-mono px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
            Complete AI Retail Workforce
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#24130A] pb-8">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Mupezeni AI Team
              </h3>
              <p className="text-sm text-[#A8A099] max-w-md">
                Two dedicated AI workers managing your customer support and daily marketing, plus an included business insights dashboard.
              </p>
            </div>

            <div className="text-left md:text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk']">
                  K2,000
                </span>
                <span className="text-sm text-[#A8A099] font-mono">/ month</span>
              </div>
              <span className="text-xs text-emerald-400 font-mono block mt-1">
                Zero setup fees • Month-to-month
              </span>
            </div>
          </div>

          {/* Features list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {planFeatures.map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                <div className="w-5 h-5 rounded-md bg-[#E58330]/10 text-[#E58330] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className={feat.highlight ? 'text-white font-medium' : 'text-[#A8A099]'}>
                  {feat.text}
                </span>
              </div>
            ))}
          </div>

          {/* Guarantee pill */}
          <div className="p-4 rounded-2xl bg-[#140B06] border border-[#2D1A0F] flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="text-xs text-[#CFC7BF]">
              <strong>30-Day Money-Back Guarantee:</strong> Try the AI Team for a full month. If you are not completely satisfied with the time saved and sales inquiries handled, we refund 100% of your fee.
            </div>
          </div>

          {/* CTA button */}
          <div>
            <button
              onClick={onSelectPlan}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#E58330] to-[#FF9F4A] text-[#0A0604] font-extrabold text-base shadow-xl shadow-[#E58330]/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <span>Get Your AI Team</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-[11px] text-[#7A7169] font-mono mt-2">
              Setup takes 5–7 days • No long-term contracts • Cancel anytime
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
