import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitFork, 
  Users, 
  Sparkles, 
  ArrowRight, 
  X, 
  Check, 
  Clock, 
  DollarSign, 
  Zap, 
  AlertTriangle,
  MessageSquare,
  Flame,
  Layers,
  Repeat,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Activity,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../types';

interface GrowthCrossroadsSectionProps {
  onNavigate: (page: PageId) => void;
}

interface BottleneckStep {
  number: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  traditionalPain: string;
  aiSolution: string;
}

const BOTTLENECK_STEPS: BottleneckStep[] = [
  {
    number: '01',
    title: 'More Enquiries Arrive',
    shortDesc: 'Customers message on WhatsApp, Instagram, Facebook, and your store 24/7. Delayed replies mean lost sales to faster competitors.',
    icon: MessageSquare,
    traditionalPain: 'Overnight messages wait 12+ hours; buyers lose patience and buy elsewhere.',
    aiSolution: 'Autonomous reply in < 2 seconds with live inventory lookup & checkout links.'
  },
  {
    number: '02',
    title: 'Demand for Marketing',
    shortDesc: 'You need daily social media posts, product photography, video reels, and promotional broadcasts to keep customers buying.',
    icon: Flame,
    traditionalPain: 'Requires hiring graphic designers and copywriters with high recurring retainers.',
    aiSolution: 'Daily automated social assets, promotional captions, and catalog updates on autopilot.'
  },
  {
    number: '03',
    title: 'Complex Operations',
    shortDesc: 'Tracking orders across multiple channels, managing low stock, and writing dispatch notes eats away the owner\'s strategic focus.',
    icon: Layers,
    traditionalPain: 'Manual copy-pasting between WhatsApp chats, spreadsheets, and dispatch riders.',
    aiSolution: 'Unified order sync, low-stock warnings, and automated rider dispatch manifests.'
  },
  {
    number: '04',
    title: 'The Hiring Spiral',
    shortDesc: 'Payroll balloons, onboarding takes weeks, staff churn increases, and management becomes a full-time headache.',
    icon: Repeat,
    traditionalPain: 'Salaries spike to K15,000–K30,000+ with endless recruitment and turnover risk.',
    aiSolution: 'Single flat rate from K5,000/mo. Zero turnover, instant scale, zero onboarding delay.'
  }
];

export const GrowthCrossroadsSection: React.FC<GrowthCrossroadsSectionProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'both' | 'path1' | 'path2'>('both');

  return (
    <section 
      id="growth-crossroads" 
      className="py-16 sm:py-24 lg:py-32 relative bg-[#070503] border-t border-b border-white/5 overflow-hidden transition-all duration-700 scroll-mt-12"
    >
      {/* Motion Graphics Ambient Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#9B2208]/20 via-[#D95A1A]/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#B83A0A]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#9B2208]/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Subtle Motion Grid Canvas */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFF 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: The Core Problem Statement */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-5 mb-12 sm:mb-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[#D95A1A] text-xs font-bold font-syne uppercase tracking-wider shadow-sm"
          >
            <GitFork className="w-3.5 h-3.5 animate-pulse text-[#D95A1A]" />
            <span>The Retail Scaling Dilemma</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.12]"
          >
            Growing your business shouldn't mean{' '}
            <span className="text-gradient-fire block sm:inline">
              hiring endlessly.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base lg:text-lg text-[#FAFAF9]/80 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            As your retail business gains momentum, the digital workload compounds exponentially. When customer enquiries flood in, you reach a defining crossroads: how you choose to scale dictates your margins and your sanity.
          </motion.p>
        </div>

        {/* ====================================================================
            PART 1: THE COMPOUNDING BOTTLENECK (MOTION GRAPHIC TIMELINE)
            ==================================================================== */}
        <div className="mb-14 sm:mb-20">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D95A1A] animate-ping" />
              <h3 className="text-xs sm:text-sm font-bold font-syne uppercase tracking-widest text-[#F5EDE4]">
                The Compounding Growth Pressure
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-[#FAFAF9]/50">
              Interactive Flow · Click any stage to inspect resolution
            </span>
          </div>

          {/* 4-Step Interactive Motion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative">
            
            {BOTTLENECK_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#1E0F09] to-[#140A06] border-[#9B2208] shadow-[0_0_30px_rgba(217,90,26,0.2)]'
                      : 'bg-[#100B07]/80 hover:bg-[#150D09] border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Glowing connector beam between cards on desktop */}
                  {idx < BOTTLENECK_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-gradient-to-r from-[#D95A1A]/60 to-transparent z-10" />
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black font-syne text-xs sm:text-sm transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-br from-[#9B2208] to-[#D95A1A] text-white shadow-md' 
                        : 'bg-[#1A0E08] text-[#D95A1A] border border-[#9B2208]/30 group-hover:border-[#9B2208]'
                    }`}>
                      {step.number}
                    </div>
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'text-[#D95A1A]' : 'text-white/40 group-hover:text-white/70'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-base sm:text-lg font-black font-syne text-white mb-2 group-hover:text-[#FAFAF9]">
                    {step.title}
                  </h4>

                  <p className="text-xs text-[#FAFAF9]/70 leading-relaxed">
                    {step.shortDesc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-syne">
                    <span className={isSelected ? 'text-[#D95A1A] font-bold' : 'text-white/40'}>
                      {isSelected ? 'Active Focus' : 'Inspect'}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-[#D95A1A] translate-x-0.5' : 'text-white/30 group-hover:translate-x-0.5'
                    }`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dynamic Motion Graphic Inspector Callout */}
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#170C07] via-[#120905] to-[#170C07] border border-[#9B2208]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#9B2208]/30 text-[#D95A1A] font-syne">
                  Stage {BOTTLENECK_STEPS[activeStep].number} Impact
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-syne">
                  {BOTTLENECK_STEPS[activeStep].title}
                </span>
              </div>
              <p className="text-xs text-[#FAFAF9]/70">
                <strong className="text-red-400 font-medium">Hiring Trap:</strong> {BOTTLENECK_STEPS[activeStep].traditionalPain}
              </p>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-[#090604] border border-[#25D366]/30 text-xs text-[#FAFAF9] flex items-center gap-2.5 flex-shrink-0 w-full md:w-auto">
              <Check className="w-4 h-4 text-[#25D366] flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#25D366] font-bold font-syne block">
                  Mupezeni Resolution
                </span>
                <span className="text-xs text-white/90">
                  {BOTTLENECK_STEPS[activeStep].aiSolution}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ====================================================================
            PART 2: THE CROSSROADS DIVERGENCE (PATH 01 vs PATH 02)
            ==================================================================== */}
        <div className="relative pt-6">
          
          {/* Transition Divider with Motion Badge */}
          <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
            <div className="px-4 py-1 rounded-full bg-[#160B06] border border-[#9B2208]/40 text-[#D95A1A] text-[11px] sm:text-xs font-bold font-syne uppercase tracking-widest flex items-center gap-2 shadow-lg">
              <Activity className="w-3.5 h-3.5 text-[#D95A1A]" />
              <span>Two Divergent Paths · Choose Your Scale</span>
            </div>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
          </div>

          {/* View Controller (Both, Path 1, Path 2) */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex p-1 rounded-xl bg-[#120B07] border border-white/10 text-xs font-syne font-bold">
              <button
                onClick={() => setActiveTab('both')}
                className={`px-3 sm:px-5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'both'
                    ? 'bg-[#24110A] text-white border border-[#9B2208]/50 shadow-md'
                    : 'text-[#FAFAF9]/60 hover:text-white'
                }`}
              >
                Side-by-Side Comparison
              </button>
              <button
                onClick={() => setActiveTab('path1')}
                className={`px-3 sm:px-5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'path1'
                    ? 'bg-red-950/40 text-red-300 border border-red-900/50 shadow-md'
                    : 'text-[#FAFAF9]/60 hover:text-white'
                }`}
              >
                Path 01: Hiring Route
              </button>
              <button
                onClick={() => setActiveTab('path2')}
                className={`px-3 sm:px-5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'path2'
                    ? 'bg-[#24110A] text-[#D95A1A] border border-[#9B2208]/50 shadow-md'
                    : 'text-[#FAFAF9]/60 hover:text-white'
                }`}
              >
                Path 02: AI Workforce
              </button>
            </div>
          </div>

          {/* Side-by-Side Divergent Comparison Grid */}
          <div className={`grid gap-6 sm:gap-8 ${
            activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'
          }`}>
            
            {/* PATH 01: The Continuous Hiring Route (Fragile Scale) */}
            {(activeTab === 'both' || activeTab === 'path1') && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 sm:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#110A07] via-[#0E0805] to-[#0A0604] border border-red-950/40 relative flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-5">
                  
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center text-red-400 flex-shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-red-400/80 font-syne block">
                          Path 01 · The Old Way
                        </span>
                        <h3 className="text-lg sm:text-2xl font-black font-syne text-white">
                          The Continuous Hiring Route
                        </h3>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-red-950/40 text-red-400 text-xs font-bold font-syne border border-red-900/30">
                      Fragile Scale
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#FAFAF9]/70 leading-relaxed">
                    Hiring more staff for customer service, social media, and inventory as order volumes rise. Every new customer requires more human hours, shifting the bottleneck to payroll.
                  </p>

                  {/* Drawbacks Breakdown */}
                  <ul className="space-y-3 pt-1 text-xs sm:text-sm text-[#FAFAF9]/75">
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-md bg-red-950/60 border border-red-900/40 text-red-400 mt-0.5 flex-shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Ballooning Payroll:</strong> Fixed salary liabilities (K15,000–K30,000+) that must be paid regardless of whether sales are high or slow.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-md bg-red-950/60 border border-red-900/40 text-red-400 mt-0.5 flex-shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Recruitment & Turnover:</strong> Weeks spent interviewing, training, and retraining staff when people inevitably leave.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-md bg-red-950/60 border border-red-900/40 text-red-400 mt-0.5 flex-shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Limited Human Hours:</strong> Inquiries after 6:00 PM and on weekends sit unread until the next business day.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-md bg-red-950/60 border border-red-900/40 text-red-400 mt-0.5 flex-shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Managerial Burnout:</strong> The owner becomes an exhausted manager babysitting shifts instead of building the business.
                      </span>
                    </li>
                  </ul>

                </div>

                {/* Path 1 Bottom Summary */}
                <div className="pt-4 border-t border-white/5">
                  <div className="p-3.5 rounded-xl bg-[#0B0604] border border-red-950/60 text-xs text-red-400/90 flex items-center gap-2.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span>The bottleneck simply shifts from your time to your payroll and management capacity.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PATH 02: The Intelligent AI Workforce (Infinite Leverage) */}
            {(activeTab === 'both' || activeTab === 'path2') && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 sm:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1E0F09] via-[#140C07] to-[#0A0704] border-2 border-[#9B2208] shadow-2xl shadow-[#9B2208]/25 relative flex flex-col justify-between space-y-6"
              >
                {/* Floating Top Pill */}
                <div className="absolute -top-3.5 right-6 sm:right-10 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white text-[11px] font-black uppercase tracking-wider font-syne shadow-lg">
                  The Mupezeni Model
                </div>

                <div className="space-y-5">
                  
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white shadow-md shadow-[#9B2208]/30 flex-shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#D95A1A] font-syne block">
                          Path 02 · Modern Retail
                        </span>
                        <h3 className="text-lg sm:text-2xl font-black font-syne text-white">
                          The Intelligent AI Workforce
                        </h3>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#24110A] text-[#D95A1A] text-xs font-bold font-syne border border-[#9B2208]/50">
                      Infinite Leverage
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#FAFAF9]/90 leading-relaxed">
                    Deploying three coordinated AI Teams across customer support, marketing, and operations that scale instantly without growing payroll.
                  </p>

                  {/* Advantages Breakdown */}
                  <ul className="space-y-3 pt-1 text-xs sm:text-sm text-[#FAFAF9]/90 font-medium">
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Predictable, Fixed Cost:</strong> A clear monthly investment starting at K5,000 without payroll inflation or hidden surprises.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">24/7 Instant Execution:</strong> Inquiries answered in under 2 seconds across WhatsApp, Instagram, Facebook and Web—even at 2:00 AM.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Zero Employee Turnover:</strong> Your AI Teams never call in sick, never quit, and continuously retain your business knowledge.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Owner Freedom:</strong> You focus purely on inventory, sourcing, relationships, and dispatch while AI operates the digital front.
                      </span>
                    </li>
                  </ul>

                </div>

                {/* Path 2 Bottom Action & Summary */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#170E08] border border-[#9B2208]/40 text-xs text-[#FAFAF9] flex items-center gap-2.5 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                    <span>Result: Expanding profit margins and complete operational peace of mind.</span>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full py-3 px-4 rounded-xl font-syne font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:shadow-lg hover:shadow-[#D95A1A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Deploy Your AI Workforce Today</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
