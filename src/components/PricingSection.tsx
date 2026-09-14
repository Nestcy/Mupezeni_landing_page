import React from 'react';
import { motion } from 'motion/react';
import { 
  Handshake, 
  TrendingUp, 
  BarChart3, 
  ArrowRight, 
  Check, 
  Sparkles,
  Store,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { PageId } from '../types';
import { EconomicComparisonTable } from './EconomicComparisonTable';
import { MoneyBackGuaranteeBanner } from './MoneyBackGuaranteeBanner';

interface PricingSectionProps {
  onNavigate: (page: PageId) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate }) => {
  return (
    <section 
      id="pricing" 
      className="relative py-12 sm:py-20 bg-[#050302] overflow-hidden border-t border-white/5"
    >
      {/* Soft terracotta glow centered behind price */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[400px] bg-gradient-to-b from-[#D95A1A]/15 via-[#9B2208]/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 sm:space-y-4 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#D95A1A] font-syne">
              <Sparkles className="w-3 h-3 text-[#D95A1A]" />
              <span>Simple, Transparent Pricing</span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight"
          >
            One AI Team. <span className="text-gradient-fire">A Fraction of the Cost.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-base text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Hiring 3 human roles separately costs <span className="text-white font-semibold underline decoration-[#D95A1A]/60 underline-offset-2">K15,000–K30,000+/mo</span> in salaries alone — before NAPSA, training, or turnover risk.
          </motion.p>
        </div>

        {/* 1. Monthly Services — 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-8">
          
          {/* Card 1: AI Customer Support */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-gradient-to-b from-[#180E09] via-[#120B07] to-[#0A0705] border border-[#9B2208]/40 hover:border-[#D95A1A]/60 shadow-xl p-6 sm:p-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#20110A] text-[#D95A1A] border border-[#9B2208]/40 font-syne">
                  Core AI Agent
                </span>
                <span className="text-[11px] text-emerald-400 font-bold font-syne">24/7 Active</span>
              </div>

              <div>
                <h3 className="text-xl font-black font-syne text-white">AI Customer Support</h3>
                <p className="text-xs text-[#FAFAF9]/70 font-syne mt-0.5">Instant sales & enquiries on WhatsApp & Web</p>
              </div>

              <div className="pt-2 pb-1 border-y border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-syne text-white">K2,000</span>
                  <span className="text-xs text-[#FAFAF9]/60 font-syne">/month</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#FAFAF9]/80 font-syne">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                  <span>Answers customer messages 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                  <span>Recommends products tailored to size & preference</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                  <span>Follows up with leads to close sales</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                  <span>Instant stock verification and checkout links</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400 font-bold pt-1 border-t border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>30-Day 100% Money-Back Guarantee</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-2.5 rounded-xl font-syne font-bold text-xs text-white bg-[#20110A] hover:bg-[#2D160E] border border-[#9B2208]/60 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get Your AI Growth Team</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D95A1A]" />
            </button>
          </motion.div>

          {/* Card 2: AI Marketing */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl bg-gradient-to-b from-[#180E09] via-[#120B07] to-[#0A0705] border border-[#9B2208]/40 hover:border-[#D95A1A]/60 shadow-xl p-6 sm:p-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#20110A] text-[#D95A1A] border border-[#9B2208]/40 font-syne">
                  Creative Engine
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-syne">
                  Add Anytime
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black font-syne text-white">AI Marketing</h3>
                <p className="text-xs text-[#FAFAF9]/70 font-syne mt-0.5">Consistent social media content & ad campaigns</p>
              </div>

              <div className="pt-2 pb-1 border-y border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-syne text-white">K2,500</span>
                  <span className="text-xs text-[#FAFAF9]/60 font-syne">/month</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#FAFAF9]/80 font-syne">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                  <span>Creates posts, captions, reels & graphics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                  <span>Generates product photos & promotional drops</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                  <span>Plans weekly content calendars</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                  <span>Runs targeted ads with owner-approved budgets</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400 font-bold pt-1 border-t border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>30-Day 100% Money-Back Guarantee</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-2.5 rounded-xl font-syne font-bold text-xs text-white bg-[#20110A] hover:bg-[#2D160E] border border-[#9B2208]/60 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get Your AI Growth Team</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D95A1A]" />
            </button>
          </motion.div>

          {/* Card 3: Mupezeni AI Growth Team (Full Package) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-3xl bg-gradient-to-b from-[#221008] via-[#180C07] to-[#0D0805] border-2 border-[#D95A1A] shadow-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D95A1A] to-[#9B2208] text-white text-[10px] font-black uppercase font-syne px-3 py-1 rounded-bl-xl tracking-wider">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D95A1A]/20 text-[#D95A1A] border border-[#D95A1A]/50 font-syne">
                  Full AI Workforce
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black font-syne text-white">
                  <span className="font-roboto font-semibold">Mupezeni</span> AI Growth Team
                </h3>
                <p className="text-xs text-[#FAFAF9]/80 font-syne mt-0.5">Complete 24/7 sales, marketing & insights</p>
              </div>

              <div className="pt-2 pb-1 border-y border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-syne text-[#FAFAF9] drop-shadow">K5,000</span>
                  <span className="text-xs text-[#FAFAF9]/60 font-syne">/month</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#FAFAF9]/90 font-syne">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="font-bold text-white">AI Customer Support Agent (24/7)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="font-bold text-white">AI Marketing Agent (Creative studio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="font-bold text-emerald-400">Business Insights Dashboard Included</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Ongoing prompt & catalog optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Monthly executive performance reviews</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400 font-bold pt-1 border-t border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>30-Day 100% Money-Back Guarantee</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-3 rounded-xl font-syne font-black text-xs text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:opacity-95 shadow-lg shadow-[#9B2208]/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get Your AI Growth Team</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </motion.div>

        </div>

        {/* 2. Included Bonus Feature: Business Insights Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#170E08] via-[#1F120A] to-[#120B07] border border-[#D95A1A]/40 shadow-lg mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D160C] border border-[#D95A1A]/60 flex items-center justify-center text-[#D95A1A] flex-shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-syne">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>+ Also Included at No Extra Cost</span>
                </div>
                <h4 className="text-base sm:text-lg font-black font-syne text-white">
                  Business Insights Dashboard
                </h4>
                <p className="text-xs text-[#FAFAF9]/80 font-syne mt-0.5">
                  "Every <span className="font-roboto font-semibold text-white">Mupezeni</span> partner gets a dashboard showing orders, sales trends, and restock signals — included at no extra cost."
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-syne text-white/80">
              <span className="px-2.5 py-1 rounded-lg bg-[#0C0805] border border-white/5">✓ Live Order Feed</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0C0805] border border-white/5">✓ Sales Velocity</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0C0805] border border-white/5">✓ Restock Alerts</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0C0805] border border-white/5">✓ Rider Delivery Slips</span>
            </div>
          </div>
        </motion.div>

        {/* 30-Day Money-Back Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <MoneyBackGuaranteeBanner />
        </motion.div>

        {/* 3. One-Time Setup: 2-Column Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="text-center space-y-1 mb-5">
            <h3 className="text-lg sm:text-2xl font-black font-syne text-white">
              One-Time Setup & Foundation
            </h3>
            <p className="text-xs text-[#FAFAF9]/70 font-syne">
              Choose the implementation path suited to your current operational setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Path 1: Physical Store */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#100A06] border border-[#9B2208]/40 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-[#D95A1A]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
                      Path 1: Physical Store
                    </span>
                  </div>
                  <span className="text-xs text-white/60 font-syne">4–6 Weeks to Live</span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-syne text-white">K6,000</span>
                  <span className="text-xs text-[#FAFAF9]/60 font-syne">one-time setup</span>
                </div>

                <p className="text-xs text-[#FAFAF9]/75 leading-relaxed">
                  For walk-in boutiques & shops without a website. We build your digital store, upload products, connect Airtel/MTN MoMo, integrate WhatsApp, and calibrate your AI.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#FAFAF9]/80 font-syne">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Complete mobile-first online store & product catalogue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Airtel Money, MTN MoMo & Card payment checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>WhatsApp Commerce & social DM sales integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Yango & rider delivery slip integration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Path 2: Already Online */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#100A06] border border-[#9B2208]/40 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-[#D95A1A]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
                      Path 2: Already Online
                    </span>
                  </div>
                  <span className="text-xs text-white/60 font-syne">4–6 Weeks to Live</span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-syne text-white">K3,000</span>
                  <span className="text-xs text-[#FAFAF9]/60 font-syne">one-time setup</span>
                </div>

                <p className="text-xs text-[#FAFAF9]/75 leading-relaxed">
                  For brands already on Shopify, WooCommerce, or custom sites. We connect our AI directly into your stack with real-time stock sync and zero downtime.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#FAFAF9]/80 font-syne">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Direct Shopify & WooCommerce API connector setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Live bi-directional catalogue & stock feed sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Unified WhatsApp Business & social DM hub</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Historical brand voice & FAQ calibration</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <p className="text-center text-xs text-[#FAFAF9]/60 font-syne mt-3 italic">
            💡 Setup is a one-time investment in your digital foundation. Add the Marketing agent anytime afterward — no new setup fee.
          </p>
        </motion.div>

        {/* 4. Economic Reality Check Table Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-3xl mx-auto"
        >
          <EconomicComparisonTable />
        </motion.div>

        {/* CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-3"
        >
          <div className="flex flex-row items-center justify-center gap-3">
            <button
              id="pricing-btn-consultation"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-[0_0_30px_rgba(217,90,26,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap"
            >
              <span>Get Your AI Growth Team</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-syne font-bold text-xs text-white/90 hover:text-white bg-[#1A0E08] border border-white/10 hover:border-[#9B2208] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View Full Pricing Page</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D95A1A]" />
            </button>
          </div>

          <p className="text-xs text-[#FAFAF9]/60 max-w-md mx-auto leading-relaxed font-normal">
            Month-to-month flexibility. No long-term lock-in. Scale as your sales volume grows.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
