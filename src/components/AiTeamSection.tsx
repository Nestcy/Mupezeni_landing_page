import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  ArrowUpRight, 
  CheckCircle2, 
  MessageSquare, 
  TrendingUp, 
  BarChart3, 
  Layers, 
  CreditCard, 
  Megaphone,
  X,
  ShieldCheck
} from 'lucide-react';
import supportWorkerImg from '../assets/images/ai_support_worker_action_1790420094582.jpg';
import marketingWorkerImg from '../assets/images/ai_marketing_worker_action_1790420107022.jpg';
import dashboardPreviewImg from '../assets/images/ai_insights_dashboard_preview_1790420118811.jpg';

interface AiTeamSectionProps {
  onGetStarted?: () => void;
  onOpenDashboard?: () => void;
}

export const AiTeamSection: React.FC<AiTeamSectionProps> = ({ 
  onGetStarted,
  onOpenDashboard 
}) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleOpenDashboard = () => {
    if (onOpenDashboard) {
      onOpenDashboard();
    } else {
      setIsPreviewModalOpen(true);
    }
  };

  return (
    <section 
      id="autonomous-workforce"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#0A0705] text-[#FAFAF9] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Background ambient lighting - Warm Mupezeni Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-[#9B2208]/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#B83A0A]/8 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(19,12,8,0.6),#0A0705_100%)] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-20 sm:space-y-24">
        
        {/* ================= 1. SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              Autonomous Workforce
            </span>
            <div className="h-[1px] w-12 bg-[#9B2208]/50 mx-auto" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.12] text-balance">
            Two AI Workers. One Intelligence Layer.
          </h2>

          <div className="text-lg sm:text-xl font-syne font-semibold text-[#F5EDE4]/90 tracking-tight">
            Your digital frontline, handled.
          </div>

          <p className="text-base font-dm text-[#F5EDE4]/75 max-w-2xl mx-auto leading-relaxed pt-1">
            Mupezeni puts recurring customer, sales, and marketing work in motion while giving you a clear view of what’s happening across the business.
          </p>
        </div>

        {/* ================= 2. THE TWO AI WORKERS (Desktop 2-Column Balanced Grid) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 lg:gap-9 items-stretch">
          
          {/* ---------------- WORKER 01: CUSTOMER SUPPORT & SALES ---------------- */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/40 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group shadow-2xl"
          >
            <div className="space-y-6">
              
              {/* Card Header: Eyebrow + Status Indicator */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="space-y-0.5">
                  <span className="text-[10.5px] font-syne font-bold uppercase tracking-[0.2em] text-[#B83A0A] block">
                    AI WORKER 01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-syne text-[#FAFAF9] tracking-tight">
                    CUSTOMER SUPPORT & SALES
                  </h3>
                </div>

                {/* Restrained Status Indicator */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0705] border border-white/[0.08] text-[10.5px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold tracking-wide">ACTIVE</span>
                </div>
              </div>

              {/* Primary Narrative */}
              <div className="space-y-2">
                <div className="text-base sm:text-lg font-bold font-syne text-[#FAFAF9] leading-snug">
                  Every customer conversation handled.
                </div>
                <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/75 leading-relaxed">
                  Handles customer enquiries, product questions, sales conversations and follow-ups across the channels where your customers reach you.
                </p>
              </div>

              {/* PRODUCT VISUAL: Customer Support & Sales Image (Occupies ~55-65% height) */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0705] shadow-inner group/visual">
                <div className="aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden">
                  <img 
                    src={supportWorkerImg} 
                    alt="AI Worker 01 Customer Support and Sales Interface"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/visual:scale-[1.015]"
                  />
                </div>
                
                {/* Visual Label */}
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-[#0A0705]/85 backdrop-blur-md border border-white/[0.08] text-[10px] font-mono text-[#F5EDE4]/60">
                  Worker 01 Product View
                </div>
              </div>

              {/* RESPONSIBILITIES: Compact Labels (Not a Feature Grid) */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#B83A0A] block">
                  Responsibilities:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Customer conversations',
                    'Product & stock questions',
                    'Sales enquiries',
                    'Follow-ups',
                    'Delivery questions',
                    'Payment guidance'
                  ].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#0A0705] border border-white/[0.08] text-[11px] font-dm text-[#F5EDE4]/90"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Card Footer: Channels & Worker Badge */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-syne font-semibold uppercase tracking-wider text-[#F5EDE4]/50">
                  Channels:
                </span>
                <span className="font-dm font-medium text-[#FAFAF9]">
                  WhatsApp · Instagram · Website
                </span>
              </div>

              <div className="text-[11px] font-mono text-[#F5EDE4]/50 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI WORKER 01 · ACTIVE</span>
              </div>
            </div>
          </motion.article>

          {/* ---------------- WORKER 02: MARKETING & GROWTH ---------------- */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative rounded-3xl bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/40 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group shadow-2xl"
          >
            <div className="space-y-6">
              
              {/* Card Header: Eyebrow + Status Indicator */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="space-y-0.5">
                  <span className="text-[10.5px] font-syne font-bold uppercase tracking-[0.2em] text-[#B83A0A] block">
                    AI WORKER 02
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-syne text-[#FAFAF9] tracking-tight">
                    MARKETING & GROWTH
                  </h3>
                </div>

                {/* Restrained Status Indicator */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0705] border border-white/[0.08] text-[10.5px] font-mono text-[#D95A1A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D95A1A] animate-pulse" />
                  <span className="font-semibold tracking-wide">RUNNING</span>
                </div>
              </div>

              {/* Primary Narrative */}
              <div className="space-y-2">
                <div className="text-base sm:text-lg font-bold font-syne text-[#FAFAF9] leading-snug">
                  Keep your marketing moving.
                </div>
                <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/75 leading-relaxed">
                  Creates, organizes, and keeps recurring marketing activity moving across your digital channels.
                </p>
              </div>

              {/* PRODUCT VISUAL: Marketing & Growth Image (Occupies ~55-65% height) */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0705] shadow-inner group/visual">
                <div className="aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden">
                  <img 
                    src={marketingWorkerImg} 
                    alt="AI Worker 02 Marketing and Growth Interface"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/visual:scale-[1.015]"
                  />
                </div>
                
                {/* Visual Label */}
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-[#0A0705]/85 backdrop-blur-md border border-white/[0.08] text-[10px] font-mono text-[#F5EDE4]/60">
                  Worker 02 Product View
                </div>
              </div>

              {/* RESPONSIBILITIES: Compact Labels (Not a Feature Grid) */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#B83A0A] block">
                  Responsibilities:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Content creation',
                    'Campaign preparation',
                    'Promotional offers',
                    'Customer re-engagement',
                    'Social activity',
                    'Marketing monitoring'
                  ].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#0A0705] border border-white/[0.08] text-[11px] font-dm text-[#F5EDE4]/90"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Card Footer: Channels & Worker Badge */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-syne font-semibold uppercase tracking-wider text-[#F5EDE4]/50">
                  Channels:
                </span>
                <span className="font-dm font-medium text-[#FAFAF9]">
                  WhatsApp Status · Instagram · Facebook · TikTok · Website
                </span>
              </div>

              <div className="text-[11px] font-mono text-[#F5EDE4]/50 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A]" />
                <span>AI WORKER 02 · RUNNING</span>
              </div>
            </div>
          </motion.article>

        </div>

        {/* ================= 3. BUSINESS INSIGHTS: CENTRAL VISIBILITY & CONTROL ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-[#130C08] border border-white/[0.09] p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden space-y-10"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

          {/* Intelligence Layer Header (The Transition from Workers to Visibility) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.07] pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="space-y-1.5">
                <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                  Central Visibility
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
                  See what’s happening across your business.
                </h3>
              </div>

              <p className="text-sm sm:text-base font-dm text-[#F5EDE4]/75 leading-relaxed">
                Your AI workers handle the work. Mupezeni gives you the visibility to understand what is happening, spot important signals, and step in whenever you want.
              </p>
            </div>

            {/* Control Interaction: View Business / Open Dashboard */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleOpenDashboard}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A0705] hover:bg-[#1A0F0A] border border-white/15 hover:border-[#B83A0A]/60 text-white font-syne font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-lg active:scale-98"
              >
                <Eye className="w-4 h-4 text-[#B83A0A]" />
                <span>Open Dashboard</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F5EDE4]/60" />
              </button>
            </div>
          </div>

          {/* HERO VISUAL: BUSINESS INSIGHTS IMAGE (Largest visual asset in the section, ~65-75% footprint) */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0A0705] shadow-2xl group/dashboard">
            <div className="w-full overflow-hidden">
              <img 
                src={dashboardPreviewImg} 
                alt="Mupezeni Business Insights Dashboard: Customer Activity, Orders, Payments, Product Demand, and Signals"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover/dashboard:scale-[1.01]"
              />
            </div>

            {/* Subtle Overlay Strip with Product Context */}
            <div className="p-3 sm:p-4 bg-[#0A0705]/95 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-dm text-[#F5EDE4]/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-syne font-bold text-[#FAFAF9]">Mupezeni Central Intelligence</span>
                <span aria-hidden="true">·</span>
                <span>Unified real-time visibility across all digital channels</span>
              </div>
              <div className="text-[11px] font-mono text-[#F5EDE4]/50">
                Single Owner View
              </div>
            </div>
          </div>

          {/* SUPPORTING CONTENT: 5 Concise Reinforcements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
            
            {/* 1. Customer Activity */}
            <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] space-y-1.5">
              <div className="text-[11px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1.5 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5 text-[#B83A0A] shrink-0" />
                <span>Customer Activity</span>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70 leading-relaxed">
                See conversations and customer activity.
              </p>
            </div>

            {/* 2. Orders & Payments */}
            <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] space-y-1.5">
              <div className="text-[11px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1.5 uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Orders & Payments</span>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70 leading-relaxed">
                Understand current order and payment activity.
              </p>
            </div>

            {/* 3. Product Demand */}
            <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] space-y-1.5">
              <div className="text-[11px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-[#B83A0A] shrink-0" />
                <span>Product Demand</span>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70 leading-relaxed">
                See what customers are asking for and what is gaining attention.
              </p>
            </div>

            {/* 4. Marketing */}
            <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] space-y-1.5">
              <div className="text-[11px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1.5 uppercase tracking-wider">
                <Megaphone className="w-3.5 h-3.5 text-[#D95A1A] shrink-0" />
                <span>Marketing</span>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70 leading-relaxed">
                Monitor campaigns and engagement.
              </p>
            </div>

            {/* 5. Business Signals */}
            <div className="p-4 rounded-xl bg-[#0A0705] border border-white/[0.06] space-y-1.5 sm:col-span-2 lg:col-span-1">
              <div className="text-[11px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1.5 uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5 text-[#B83A0A] shrink-0" />
                <span>Business Signals</span>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70 leading-relaxed">
                Surface patterns and activity that may require attention.
              </p>
            </div>

          </div>

        </motion.div>

        {/* ================= 4. FINAL STATEMENT: PAYOFF ================= */}
        <div className="pt-6 border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-syne text-[#FAFAF9] tracking-tight">
              Your business keeps moving. You stay in control.
            </h3>
            
            <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/80 leading-relaxed max-w-2xl mx-auto">
              «Mupezeni handles recurring digital work in the background while keeping you connected to the activity, customers, and signals that matter.»
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:shadow-2xl hover:shadow-[#9B2208]/40 text-white font-syne font-bold text-xs sm:text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer"
              >
                <span>Deploy Your AI Workforce</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ================= LIGHTBOX PREVIEW MODAL FOR DASHBOARD ================= */}
      <AnimatePresence>
        {isPreviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPreviewModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-6 lg:p-10 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#130C08] border border-white/20 p-5 sm:p-7 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="text-xs font-syne font-bold text-[#B83A0A] uppercase tracking-wider">
                    Central Visibility Layer
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black font-syne text-[#FAFAF9]">
                    Mupezeni Business Insights
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="p-2 rounded-xl bg-[#0A0705] text-[#FAFAF9]/80 hover:text-white border border-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0A0705]">
                <img 
                  src={dashboardPreviewImg} 
                  alt="High Resolution Dashboard View" 
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-dm text-[#F5EDE4]/70">
                <span>The owner retains full real-time oversight and can step into any workflow at any time.</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewModalOpen(false);
                    if (onGetStarted) onGetStarted();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#9B2208] text-white font-syne font-bold hover:bg-[#B83A0A] transition-colors cursor-pointer"
                >
                  Deploy AI Workforce
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
