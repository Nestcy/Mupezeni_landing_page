import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  ArrowUpRight, 
  CheckCircle2, 
  MessageSquare, 
  TrendingUp, 
  BarChart3, 
  CreditCard, 
  Megaphone,
  X
} from 'lucide-react';
import supportWorkerImg from '../assets/images/ai_worker_01_customer_support_sales_1790759123892.png';
import marketingWorkerImg from '../assets/images/ai_worker_02_marketing_growth_1790759546208.png';
import dashboardPreviewImg from '../assets/images/ai_insights_dashboard_preview_1790420118811.png';
import { MupezeniBirdIcon } from './MupezeniBrandMetaphor';

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
      className="relative py-10 sm:py-16 lg:py-24 bg-[#0A0705] text-[#FAFAF9] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Background ambient lighting - Warm Mupezeni Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-[#9B2208]/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#B83A0A]/8 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(19,12,8,0.6),#0A0705_100%)] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 lg:space-y-16">
        
        {/* ================= 1. SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] sm:text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              Autonomous Workforce
            </span>
            <div className="h-[1px] w-10 sm:w-12 bg-[#9B2208]/50 mx-auto" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.15] text-balance">
            Two AI Workers. One Intelligence Layer.
          </h2>

          <p className="text-xs sm:text-base font-dm text-[#F5EDE4]/75 max-w-2xl mx-auto leading-relaxed">
            Mupezeni puts recurring customer, sales, and marketing work in motion while giving you a clear view of what’s happening across the business.
          </p>
        </div>

        {/* ================= 2. THE TWO AI WORKERS (Responsive Grid) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* ---------------- WORKER 01: CUSTOMER SUPPORT & SALES ---------------- */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="relative rounded-2xl sm:rounded-3xl bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/40 transition-all duration-300 p-4 sm:p-6 lg:p-7 flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-3 sm:space-y-4">
              
              {/* Card Header: Eyebrow + Status Indicator */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 sm:pb-3">
                <div className="space-y-0.5">
                  <span className="text-[9.5px] sm:text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#B83A0A] block">
                    AI WORKER 01
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black font-syne text-[#FAFAF9] tracking-tight">
                    CUSTOMER SUPPORT & SALES
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#0A0705] border border-white/[0.08] text-[9.5px] sm:text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold tracking-wide">ACTIVE</span>
                </div>
              </div>

              {/* Primary Narrative */}
              <div>
                <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/80 leading-relaxed">
                  Handles customer enquiries, product questions, sizing, and automated follow-ups across your active channels.
                </p>
              </div>

              {/* PRODUCT VISUAL */}
              <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0705] shadow-inner group/visual">
                <div className="aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden">
                  <img 
                    src={supportWorkerImg} 
                    alt="AI Worker 01 Customer Support and Sales Interface"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/visual:scale-[1.01]"
                  />
                </div>
                
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#0A0705]/85 backdrop-blur-md border border-white/[0.08] text-[9px] sm:text-[10px] font-mono text-[#F5EDE4]/60">
                  Worker 01 Product View
                </div>
              </div>

              {/* DISCOVERY METAPHOR BANNER */}
              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#0A0705] border border-white/[0.08] flex items-center justify-between text-[11px] sm:text-xs font-dm">
                <div className="flex items-center gap-1.5 text-[#FAFAF9] truncate">
                  <MupezeniBirdIcon size={15} />
                  <span className="text-[#E58330] font-bold">✦</span>
                  <span className="text-[#F5EDE4]/80 truncate">Discovers customer ready to buy</span>
                </div>
                <span className="text-emerald-400 font-syne font-bold text-[10px] sm:text-[10.5px] shrink-0 pl-1">Responds 0.8s →</span>
              </div>

              {/* RESPONSIBILITIES: Compact Labels */}
              <div className="space-y-1.5">
                <span className="text-[9.5px] sm:text-[10px] font-syne font-bold uppercase tracking-wider text-[#B83A0A] block">
                  Responsibilities:
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {[
                    'Customer chats',
                    'Product & stock',
                    'Sales enquiries',
                    'Follow-ups',
                    'Delivery quotes',
                    'Payment guidance'
                  ].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#0A0705] border border-white/[0.08] text-[10px] sm:text-[11px] font-dm text-[#F5EDE4]/90"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Card Footer: Channels & Worker Badge */}
            <div className="mt-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-2 text-[10.5px] sm:text-xs">
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-syne font-semibold uppercase tracking-wider text-[#F5EDE4]/50 text-[9.5px]">
                  Channels:
                </span>
                <span className="font-dm font-medium text-[#FAFAF9] truncate">
                  WhatsApp · IG · Web
                </span>
              </div>

              <div className="font-mono text-[#F5EDE4]/50 flex items-center gap-1 shrink-0 text-[10px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>ACTIVE</span>
              </div>
            </div>
          </motion.article>

          {/* ---------------- WORKER 02: MARKETING & GROWTH ---------------- */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="relative rounded-2xl sm:rounded-3xl bg-[#130C08] border border-white/[0.08] hover:border-[#B83A0A]/40 transition-all duration-300 p-4 sm:p-6 lg:p-7 flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-3 sm:space-y-4">
              
              {/* Card Header: Eyebrow + Status Indicator */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 sm:pb-3">
                <div className="space-y-0.5">
                  <span className="text-[9.5px] sm:text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#B83A0A] block">
                    AI WORKER 02
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black font-syne text-[#FAFAF9] tracking-tight">
                    MARKETING & GROWTH
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#0A0705] border border-white/[0.08] text-[9.5px] sm:text-[10px] font-mono text-[#D95A1A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D95A1A] animate-pulse" />
                  <span className="font-semibold tracking-wide">RUNNING</span>
                </div>
              </div>

              {/* Primary Narrative */}
              <div>
                <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/80 leading-relaxed">
                  Creates, organizes, and keeps recurring marketing campaigns and social content active across channels.
                </p>
              </div>

              {/* PRODUCT VISUAL */}
              <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0705] shadow-inner group/visual">
                <div className="aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden">
                  <img 
                    src={marketingWorkerImg} 
                    alt="AI Worker 02 Marketing and Growth Interface"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/visual:scale-[1.01]"
                  />
                </div>
                
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#0A0705]/85 backdrop-blur-md border border-white/[0.08] text-[9px] sm:text-[10px] font-mono text-[#F5EDE4]/60">
                  Worker 02 Product View
                </div>
              </div>

              {/* DISCOVERY METAPHOR BANNER */}
              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#0A0705] border border-white/[0.08] flex items-center justify-between text-[11px] sm:text-xs font-dm">
                <div className="flex items-center gap-1.5 text-[#FAFAF9] truncate">
                  <MupezeniBirdIcon size={15} />
                  <span className="text-[#E58330] font-bold">✦</span>
                  <span className="text-[#F5EDE4]/80 truncate">Discovers customer interest surge</span>
                </div>
                <span className="text-[#D95A1A] font-syne font-bold text-[10px] sm:text-[10.5px] shrink-0 pl-1">Acts Daily →</span>
              </div>

              {/* RESPONSIBILITIES: Compact Labels */}
              <div className="space-y-1.5">
                <span className="text-[9.5px] sm:text-[10px] font-syne font-bold uppercase tracking-wider text-[#B83A0A] block">
                  Responsibilities:
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {[
                    'Content creation',
                    'Campaign planning',
                    'Promotions',
                    'Re-engagement',
                    'Social posts',
                    'Trend tracking'
                  ].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#0A0705] border border-white/[0.08] text-[10px] sm:text-[11px] font-dm text-[#F5EDE4]/90"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Card Footer: Channels & Worker Badge */}
            <div className="mt-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-2 text-[10.5px] sm:text-xs">
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-syne font-semibold uppercase tracking-wider text-[#F5EDE4]/50 text-[9.5px]">
                  Channels:
                </span>
                <span className="font-dm font-medium text-[#FAFAF9] truncate">
                  WhatsApp · IG · FB · TikTok
                </span>
              </div>

              <div className="font-mono text-[#F5EDE4]/50 flex items-center gap-1 shrink-0 text-[10px]">
                <CheckCircle2 className="w-3 h-3 text-[#D95A1A]" />
                <span>RUNNING</span>
              </div>
            </div>
          </motion.article>

        </div>

        {/* ================= 3. BUSINESS INSIGHTS: CENTRAL VISIBILITY & CONTROL ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl sm:rounded-3xl bg-[#130C08] border border-white/[0.09] p-4 sm:p-7 lg:p-10 shadow-xl overflow-hidden space-y-4 sm:space-y-6"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

          {/* Intelligence Layer Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.07] pb-3 sm:pb-4">
            <div className="space-y-1 max-w-xl">
              <span className="text-[9.5px] sm:text-[10px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                Central Visibility Layer
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-syne text-[#FAFAF9] tracking-tight">
                See what’s happening across your business.
              </h3>
              <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/75">
                Your AI workers handle execution. You retain full real-time visibility into customer sentiment, sales, and demand signals.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenDashboard}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl bg-[#0A0705] hover:bg-[#1A0F0A] border border-white/15 text-white font-syne font-bold text-xs transition-all cursor-pointer shadow-md shrink-0"
            >
              <Eye className="w-3.5 h-3.5 text-[#B83A0A]" />
              <span>Open Dashboard</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F5EDE4]/60" />
            </button>
          </div>

          {/* HERO VISUAL: BUSINESS INSIGHTS IMAGE */}
          <div className="relative rounded-xl overflow-hidden border border-white/[0.1] bg-[#0A0705] shadow-lg group/dashboard">
            <div className="w-full overflow-hidden">
              <img 
                src={dashboardPreviewImg} 
                alt="Mupezeni Business Insights Dashboard: Customer Activity, Orders, Payments, Product Demand, and Signals"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover/dashboard:scale-[1.01]"
              />
            </div>

            {/* Subtle Overlay Strip with Product Context */}
            <div className="p-2 sm:p-2.5 bg-[#0A0705]/95 border-t border-white/[0.08] flex items-center justify-between gap-2 text-[10px] sm:text-xs font-dm text-[#F5EDE4]/70">
              <div className="flex items-center gap-1.5 truncate">
                <MupezeniBirdIcon size={15} />
                <span className="text-[#E58330] font-bold">✦</span>
                <span className="font-syne font-bold text-[#FAFAF9] truncate">Central pattern visibility</span>
              </div>
              <div className="text-[9.5px] sm:text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>INTELLIGENCE ACTIVE</span>
              </div>
            </div>
          </div>

          {/* SUPPORTING CONTENT: 5 Concise Reinforcements (Dense Responsive Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            <div className="p-2.5 rounded-lg bg-[#0A0705] border border-white/[0.06] space-y-0.5">
              <div className="text-[10.5px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-[#B83A0A] shrink-0" />
                <span>Customer Chats</span>
              </div>
              <p className="text-[10px] sm:text-[10.5px] font-dm text-[#F5EDE4]/65">
                Active customer enquiries
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0A0705] border border-white/[0.06] space-y-0.5">
              <div className="text-[10.5px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Orders & Payments</span>
              </div>
              <p className="text-[10px] sm:text-[10.5px] font-dm text-[#F5EDE4]/65">
                Locked & pending orders
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0A0705] border border-white/[0.06] space-y-0.5">
              <div className="text-[10.5px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#B83A0A] shrink-0" />
                <span>Product Demand</span>
              </div>
              <p className="text-[10px] sm:text-[10.5px] font-dm text-[#F5EDE4]/65">
                Top requested items
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0A0705] border border-white/[0.06] space-y-0.5">
              <div className="text-[10.5px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1">
                <Megaphone className="w-3 h-3 text-[#D95A1A] shrink-0" />
                <span>Marketing</span>
              </div>
              <p className="text-[10px] sm:text-[10.5px] font-dm text-[#F5EDE4]/65">
                Active promotions & reach
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0A0705] border border-white/[0.06] space-y-0.5 col-span-2 sm:col-span-1">
              <div className="text-[10.5px] font-syne font-bold text-[#FAFAF9] flex items-center gap-1">
                <BarChart3 className="w-3 h-3 text-[#B83A0A] shrink-0" />
                <span>Signals</span>
              </div>
              <p className="text-[10px] sm:text-[10.5px] font-dm text-[#F5EDE4]/65">
                Unattended opportunities
              </p>
            </div>
          </div>

        </motion.div>

        {/* ================= 4. FINAL STATEMENT: PAYOFF ================= */}
        <div className="pt-2 sm:pt-4 border-t border-white/[0.08]">
          <div className="max-w-2xl mx-auto text-center space-y-2.5 sm:space-y-3">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-syne text-[#FAFAF9] tracking-tight">
              Your business keeps moving. You stay in control.
            </h3>
            
            <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/75 leading-relaxed">
              «Mupezeni handles recurring digital work in the background while keeping you connected to the activity, customers, and signals that matter.»
            </p>

            <div className="pt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-syne font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-98 cursor-pointer"
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
