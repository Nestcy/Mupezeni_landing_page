import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GitFork, 
  Users, 
  Sparkles, 
  ArrowRight, 
  X, 
  Check, 
  Activity
} from 'lucide-react';
import { PageId } from '../types';

interface GrowthCrossroadsSectionProps {
  onNavigate: (page: PageId) => void;
}

export const GrowthCrossroadsSection: React.FC<GrowthCrossroadsSectionProps> = ({ onNavigate }) => {
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
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-5 mb-8 sm:mb-14">
          
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
            THE CROSSROADS DIVERGENCE (PATH 01 vs PATH 02)
            ==================================================================== */}
        <div className="relative pt-2 sm:pt-4">
          
          {/* Transition Divider with Motion Badge */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-12">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
            <div className="px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-[#160B06] border border-[#9B2208]/40 text-[#D95A1A] text-[10px] sm:text-xs font-bold font-syne uppercase tracking-widest flex items-center gap-1.5 sm:gap-2 shadow-lg">
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D95A1A]" />
              <span>Two Divergent Paths</span>
            </div>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
          </div>

          {/* View Controller (Both, Path 1, Path 2) */}
          <div className="flex items-center justify-center mb-5 sm:mb-8">
            <div className="inline-flex p-1 rounded-xl bg-[#120B07] border border-white/10 text-[10px] sm:text-xs font-syne font-bold">
              <button
                onClick={() => setActiveTab('both')}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'both'
                    ? 'bg-[#24110A] text-white border border-[#9B2208]/50 shadow-md'
                    : 'text-[#FAFAF9]/60 hover:text-white'
                }`}
              >
                Side-by-Side
              </button>
              <button
                onClick={() => setActiveTab('path1')}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'path1'
                    ? 'bg-red-950/40 text-red-300 border border-red-900/50 shadow-md'
                    : 'text-[#FAFAF9]/60 hover:text-white'
                }`}
              >
                Path 01: Hiring
              </button>
              <button
                onClick={() => setActiveTab('path2')}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'path2'
                    ? 'bg-[#24110A] text-[#D95A1A] border border-[#9B2208]/50 shadow-md'
                    : 'text-[#FAFAF9]/60 hover:text-white'
                }`}
              >
                Path 02: AI
              </button>
            </div>
          </div>

          {/* Side-by-Side Divergent Comparison Grid */}
          <div className={`grid gap-3.5 sm:gap-8 ${
            activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'
          }`}>
            
            {/* PATH 01: The Continuous Hiring Route (Fragile Scale) */}
            {(activeTab === 'both' || activeTab === 'path1') && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-3.5 sm:p-7 lg:p-9 rounded-xl sm:rounded-3xl bg-gradient-to-b from-[#110A07] via-[#0E0805] to-[#0A0604] border border-red-950/40 relative flex flex-col justify-between space-y-3.5 sm:space-y-6 shadow-xl"
              >
                <div className="space-y-3 sm:space-y-5">
                  
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center text-red-400 flex-shrink-0">
                        <Users className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-red-400/80 font-syne block">
                          Path 01 · The Old Way
                        </span>
                        <h3 className="text-sm sm:text-2xl font-black font-syne text-white">
                          The Continuous Hiring Route
                        </h3>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-red-950/40 text-red-400 text-[10px] sm:text-xs font-bold font-syne border border-red-900/30">
                      Fragile
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-sm text-[#FAFAF9]/70 leading-normal sm:leading-relaxed">
                    Hiring more staff for customer service, social media, and inventory as order volumes rise. Every new customer requires more human hours, shifting the bottleneck to payroll.
                  </p>

                  {/* Drawbacks Breakdown */}
                  <ul className="space-y-2 sm:space-y-3 pt-0.5 sm:pt-1 text-[11px] sm:text-sm text-[#FAFAF9]/75">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="p-0.5 sm:p-1 rounded-md bg-red-950/60 border border-red-900/40 text-red-400 mt-0.5 flex-shrink-0">
                        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Ballooning Payroll:</strong> Fixed salary liabilities (K15,000–K30,000+/mo) across support (~K3,300–K9,500), marketing (~K3,600–K10,400), and ops (~K4,000–K14,500) that must be paid regardless of sales.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="p-0.5 sm:p-1 rounded-md bg-red-950/60 border border-red-900/40 text-red-400 mt-0.5 flex-shrink-0">
                        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Recruitment & Turnover:</strong> Weeks spent interviewing, training, and retraining staff when people leave.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="p-0.5 sm:p-1 rounded-md bg-red-950/60 border border-red-900/40 text-red-400 mt-0.5 flex-shrink-0">
                        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Limited Human Hours:</strong> Inquiries after 6:00 PM and on weekends sit unread until Monday morning.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="p-0.5 sm:p-1 rounded-md bg-red-950/60 border border-red-900/40 text-red-400 mt-0.5 flex-shrink-0">
                        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Managerial Burnout:</strong> The owner becomes an exhausted manager babysitting shifts.
                      </span>
                    </li>
                  </ul>

                </div>

                {/* Path 1 Bottom Summary */}
                <div className="pt-2.5 sm:pt-4 border-t border-white/5">
                  <div className="p-2 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#0B0604] border border-red-950/60 text-[10px] sm:text-xs text-red-400/90 flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span>The bottleneck shifts to your payroll and management capacity.</span>
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
                className="p-3.5 sm:p-7 lg:p-9 rounded-xl sm:rounded-3xl bg-gradient-to-br from-[#1E0F09] via-[#140C07] to-[#0A0704] border-2 border-[#9B2208] shadow-2xl shadow-[#9B2208]/25 relative flex flex-col justify-between space-y-3.5 sm:space-y-6"
              >
                {/* Floating Top Pill */}
                <div className="absolute -top-3 right-4 sm:right-10 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white text-[9px] sm:text-[11px] font-black uppercase tracking-wider font-syne shadow-lg">
                  The <span className="font-roboto font-bold">Mupezeni</span> Model
                </div>

                <div className="space-y-3 sm:space-y-5">
                  
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white shadow-md shadow-[#9B2208]/30 flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#D95A1A] font-syne block">
                          Path 02 · Modern Retail
                        </span>
                        <h3 className="text-sm sm:text-2xl font-black font-syne text-white">
                          The Intelligent AI Workforce
                        </h3>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#24110A] text-[#D95A1A] text-[10px] sm:text-xs font-bold font-syne border border-[#9B2208]/50">
                      Leverage
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-sm text-[#FAFAF9]/90 leading-normal sm:leading-relaxed">
                    Deploying three coordinated AI Teams across customer support, marketing, and operations that scale instantly without growing payroll.
                  </p>

                  {/* Advantages Breakdown */}
                  <ul className="space-y-2 sm:space-y-3 pt-0.5 sm:pt-1 text-[11px] sm:text-sm text-[#FAFAF9]/90 font-medium">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="p-0.5 sm:p-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Predictable, Fixed Cost:</strong> AI Support (K2,000) + AI Marketing (K2,500) + Free Dashboard — complete AI team for K5,000/mo with zero payroll bloat.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="p-0.5 sm:p-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">24/7 Instant Execution:</strong> Inquiries answered in under 2 seconds across WhatsApp, IG, FB and Web.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="p-0.5 sm:p-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Zero Employee Turnover:</strong> AI Teams never call in sick, quit, or lose institutional knowledge.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="p-0.5 sm:p-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span>
                        <strong className="text-white">Owner Freedom:</strong> Focus purely on finding great products from suppliers and delivering them to your customers while AI handles the digital front.
                      </span>
                    </li>
                  </ul>

                </div>

                {/* Path 2 Bottom Action & Summary */}
                <div className="pt-2.5 sm:pt-4 border-t border-white/10 space-y-2.5 sm:space-y-3">
                  <div className="p-2 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#170E08] border border-[#9B2208]/40 text-[10px] sm:text-xs text-[#FAFAF9] flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                    <span>Result: Expanding profit margins and operational peace of mind.</span>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-syne font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:shadow-lg hover:shadow-[#D95A1A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Deploy Your AI Workforce Today</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
