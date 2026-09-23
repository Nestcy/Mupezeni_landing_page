import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Sparkles,
  Store,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Zap,
  BarChart3,
  Bot
} from 'lucide-react';
import { PageId } from '../types';
import { EconomicComparisonTable } from './EconomicComparisonTable';
import { MoneyBackGuaranteeBanner } from './MoneyBackGuaranteeBanner';

interface PricingSectionProps {
  onNavigate: (page: PageId) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate }) => {
  const planFeatures = [
    'AI Customer Support Worker (24/7 customer assistance)',
    'AI Marketing Worker (Daily content & branded output)',
    'Business Insights Dashboard (Visibility layer included)',
    'Daily marketing content (~1 post/day, up to 30 posts/month)',
    'Customer enquiries and proactive lead follow-up',
    'Product recommendations and FAQ assistance',
    'Branded marketing visuals and promotional images',
    'Engaging captions and persuasive promotional copy',
    'Business activity insights, orders & restock signals'
  ];

  const planTerms = [
    'Month-to-month flexibility',
    'Zero setup fees',
    '30-day money-back guarantee'
  ];

  return (
    <section 
      id="pricing" 
      className="relative py-12 sm:py-24 bg-[#050302] overflow-hidden border-t border-white/5"
    >
      {/* Terracotta glow centered behind price */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[400px] bg-gradient-to-b from-[#D95A1A]/15 via-[#9B2208]/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 sm:space-y-4 mb-8 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#D95A1A] font-syne">
              <Sparkles className="w-3 h-3 text-[#D95A1A]" />
              <span>One AI Team · One Simple Price</span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight"
          >
            Your AI Team for Retail. <span className="text-gradient-fire">K2,000/month.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-base text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Customer support. Marketing. Business insights. Two agentic AI workers handle the repetitive digital work of your retail business while you remain in control.
          </motion.p>
        </div>

        {/* ONE CLEAR PRICING CARD */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-b from-[#221008] via-[#180C07] to-[#0D0805] border-2 border-[#D95A1A] shadow-2xl p-6 sm:p-10 relative overflow-hidden space-y-6 sm:space-y-8"
          >
            {/* Top highlight banner */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D95A1A] to-[#9B2208] text-white text-[10px] sm:text-xs font-black uppercase font-syne px-4 py-1 rounded-bl-xl tracking-wider shadow">
              All-Inclusive Retail Plan
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#D95A1A]/20 text-[#D95A1A] border border-[#D95A1A]/50 font-syne">
                  2 AI Workers + 1 Dashboard
                </span>
                <span className="text-xs text-emerald-400 font-bold font-syne flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Continuous 24/7
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black font-syne text-white">
                  <span className="font-roboto font-semibold">Mupezeni</span> AI Team
                </h3>
                <p className="text-xs sm:text-sm text-[#FAFAF9]/80 font-syne mt-1">
                  Customer support. Marketing. Business insights.
                </p>
              </div>

              {/* Price display */}
              <div className="pt-3 pb-2 border-y border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-6xl font-black font-syne text-white tracking-tight">K2,000</span>
                  <span className="text-sm sm:text-base text-[#FAFAF9]/70 font-syne">/ month</span>
                </div>
                <span className="text-xs text-[#FAFAF9]/60 font-syne">
                  Zero setup fee • Month-to-month
                </span>
              </div>
            </div>

            {/* Inclusions List */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white/90 font-syne block">
                Everything Included:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-[13px] text-[#FAFAF9]/90 font-syne">
                {planFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms Strip */}
            <div className="p-3.5 rounded-2xl bg-[#120804] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-syne">
              {planTerms.map((term, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white/90 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#D95A1A] flex-shrink-0" />
                  <span>{term}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-4 rounded-2xl font-syne font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:opacity-95 shadow-xl shadow-[#9B2208]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get Your AI Team</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <p className="text-[11px] text-center text-[#FAFAF9]/60 font-syne">
                No long-term contracts. 30-day money-back guarantee based on operational value.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 30-Day Money-Back Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 sm:mb-14"
        >
          <MoneyBackGuaranteeBanner />
        </motion.div>

        {/* Setup & Implementation: Two Practical Tracks (No Setup Fees) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 sm:mb-14"
        >
          <div className="text-center space-y-1.5 mb-5 sm:mb-8">
            <span className="text-[10px] sm:text-xs uppercase font-bold text-[#D95A1A] tracking-wider font-syne">
              Implementation & Onboarding
            </span>
            <h3 className="text-lg sm:text-2xl font-black font-syne text-white">
              Zero Setup Fees · Tailored to Where Your Business Stands
            </h3>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/70 font-syne max-w-xl mx-auto">
              Whether you are already selling online or running a physical shop, we prepare your AI team at zero setup cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Track 1: Physical Store */}
            <div className="p-5 sm:p-7 rounded-2xl bg-[#100A06] border border-[#9B2208]/40 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-[#D95A1A]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
                      Starting from a Physical Store?
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold font-syne">Zero Setup Fee</span>
                </div>

                <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed font-syne">
                  We help establish the digital foundation required for your AI team: organizing your product information, setting up digital catalog access, and connecting customer channels where supported.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#FAFAF9]/80 font-syne">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Product catalog & pricing structuring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Digital inquiry channel preparation (WhatsApp & Web)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>AI knowledge base & FAQ calibration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Track 2: Already Online */}
            <div className="p-5 sm:p-7 rounded-2xl bg-[#100A06] border border-[#9B2208]/40 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-[#D95A1A]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
                      Already Selling Online?
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold font-syne">Zero Setup Fee</span>
                </div>

                <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed font-syne">
                  We connect Mupezeni to your existing digital business stack where supported, integrating your catalog, messaging channels, and store workflows with zero downtime.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#FAFAF9]/80 font-syne">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Existing website & catalog connector setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Social DM & messaging channel connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Seamless onboarding with zero disruption to daily sales</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Traditional Approach vs Mupezeni Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14 max-w-3xl mx-auto"
        >
          <EconomicComparisonTable />
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-3 pt-2"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto w-full px-2 sm:px-0">
            <button
              id="pricing-btn-consultation"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-[0_0_30px_rgba(217,90,26,0.35)] transition-all cursor-pointer"
            >
              <span>Get Your AI Team</span>
              <ArrowRight className="w-4 h-4 text-white flex-shrink-0" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-syne font-bold text-xs text-white/90 hover:text-white bg-[#1A0E08] border border-white/10 hover:border-[#9B2208] transition-all cursor-pointer"
            >
              <span>View Full Pricing Page</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-[#FAFAF9]/60 max-w-md mx-auto leading-relaxed font-normal">
            Month-to-month flexibility. No setup fee. Backed by our 30-day money-back guarantee.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
