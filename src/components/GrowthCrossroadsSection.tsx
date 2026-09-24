import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Layers,
  Clock, 
  MessageSquare, 
  ShoppingBag, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck,
  Split,
  Workflow
} from 'lucide-react';
import { PageId } from '../types';

interface GrowthCrossroadsSectionProps {
  onNavigate: (page: PageId) => void;
}

export const GrowthCrossroadsSection: React.FC<GrowthCrossroadsSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'both' | 'traditional' | 'mupezeni'>('both');

  const retailWorkloads = [
    { label: 'Customer enquiries', icon: MessageSquare },
    { label: 'Social media', icon: Sparkles },
    { label: 'Product promotion', icon: ShoppingBag },
    { label: 'Customer follow-ups', icon: Clock },
    { label: 'Orders & checkout', icon: Workflow },
    { label: 'Business information', icon: BarChart3 }
  ];

  return (
    <section 
      id="growth-crossroads" 
      className="relative py-8 sm:py-20 bg-[#080503] overflow-hidden border-t border-white/5"
    >
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[750px] h-[300px] sm:h-[450px] bg-gradient-to-r from-[#9B2208]/15 via-[#D95A1A]/10 to-[#9B2208]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 sm:space-y-4 mb-6 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#D95A1A] font-syne">
              <Split className="w-3 h-3 text-[#D95A1A]" />
              <span>Operational Comparison</span>
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight"
          >
            The Digital <span className="text-gradient-fire">Workload Problem</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-base text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Retail businesses increasingly have to manage continuous customer demand across digital touchpoints:
          </motion.p>

          {/* Workload Chips */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 max-w-3xl mx-auto pt-1"
          >
            {retailWorkloads.map((item, i) => {
              const Icon = item.icon;
              return (
                <span 
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#140C07] border border-white/10 text-[11px] sm:text-xs text-white/90 font-syne"
                >
                  <Icon className="w-3 h-3 text-[#D95A1A]" />
                  <span>{item.label}</span>
                </span>
              );
            })}
          </motion.div>
        </div>

        {/* View Switcher: Mobile First Segmented Control */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center p-1 rounded-xl bg-[#120905] border border-white/10 text-xs font-syne">
              <button
                id="crossroads-tab-traditional"
                onClick={() => setActiveTab('traditional')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === 'traditional'
                    ? 'bg-[#2A1208] text-white shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Traditional Approach
              </button>
              <button
                id="crossroads-tab-both"
                onClick={() => setActiveTab('both')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold hidden md:inline-block ${
                  activeTab === 'both'
                    ? 'bg-[#9B2208] text-white shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Side-by-Side Comparison
              </button>
              <button
                id="crossroads-tab-mupezeni"
                onClick={() => setActiveTab('mupezeni')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === 'mupezeni'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Mupezeni AI Team ★
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className={`grid gap-3.5 sm:gap-8 ${
            activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'
          }`}>
            
            {/* TRADITIONAL APPROACH */}
            {(activeTab === 'both' || activeTab === 'traditional') && (
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-4 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#110A07] via-[#0E0805] to-[#0A0604] border border-white/10 relative flex flex-col justify-between space-y-4 sm:space-y-6 shadow-xl"
              >
                <div className="space-y-3 sm:space-y-4">
                  
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 flex-shrink-0">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-white/50 font-syne block">
                          Current Retail Method
                        </span>
                        <h3 className="text-base sm:text-2xl font-black font-syne text-white">
                          Traditional Approach
                        </h3>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/5 text-white/70 text-[10px] sm:text-xs font-bold font-syne border border-white/10">
                      Fragmented
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#FAFAF9]/75 leading-relaxed">
                    To keep customer support and marketing running consistently, a retailer may need to combine human staff, social media assistance, multiple software subscriptions, manual customer follow-up, and manual content creation.
                  </p>

                  {/* Drawbacks Breakdown */}
                  <div className="space-y-2 pt-1 text-xs sm:text-sm text-[#FAFAF9]/80 font-syne">
                    <div className="p-2.5 rounded-xl bg-[#140A06] border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">
                        What It Requires Assembling:
                      </span>
                      <ul className="space-y-1 text-[11px] sm:text-xs text-white/70 list-disc list-inside">
                        <li>Human staff or part-time helpers</li>
                        <li>Social media and marketing assistance</li>
                        <li>Multiple software subscriptions and messaging tools</li>
                        <li>Manual customer follow-up and DM checking</li>
                        <li>Time spent coordinating and managing all of the above</li>
                      </ul>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex items-start gap-2.5">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span><strong className="text-white">More coordination:</strong> The owner spends valuable hours aligning tools, schedules, and deliverables.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span><strong className="text-white">Multiple recurring costs:</strong> Disconnected tools and freelance help add up unpredictably.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span><strong className="text-white">Work stops when people are away:</strong> Evening queries, Sunday messages, and holiday inquiries sit waiting.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span><strong className="text-white">Fragmented information:</strong> Customer chats, stock queries, and promotion records stay scattered across personal phones.</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Summary */}
                <div className="pt-3 border-t border-white/5">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#0B0604] border border-white/10 text-[11px] sm:text-xs text-white/70 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white/40 flex-shrink-0" />
                    <span>Result: Heavy management overhead and disconnected customer touchpoints.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MUPEZENI APPROACH */}
            {(activeTab === 'both' || activeTab === 'mupezeni') && (
              <motion.div 
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-4 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1E0F09] via-[#140C07] to-[#0A0704] border-2 border-[#9B2208] shadow-2xl shadow-[#9B2208]/25 relative flex flex-col justify-between space-y-4 sm:space-y-6"
              >
                {/* Floating Top Pill */}
                <div className="absolute -top-3 right-4 sm:right-8 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider font-syne shadow-md">
                  Unified AI Workforce
                </div>

                <div className="space-y-3 sm:space-y-4">
                  
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white shadow-md shadow-[#9B2208]/30 flex-shrink-0">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#D95A1A] font-syne block">
                          The Mupezeni Approach
                        </span>
                        <h3 className="text-base sm:text-2xl font-black font-syne text-white">
                          Two AI Workers. One System.
                        </h3>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#24110A] text-[#D95A1A] text-[10px] sm:text-xs font-bold font-syne border border-[#9B2208]/50">
                      Integrated
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#FAFAF9]/90 leading-relaxed">
                    Mupezeni gives retail businesses two dedicated AI workers that handle repetitive digital work around the clock, with an included visibility dashboard to keep you in control.
                  </p>

                  {/* Components Breakdown */}
                  <div className="space-y-2 pt-1 text-xs sm:text-sm text-[#FAFAF9]/90 font-syne">
                    <div className="p-2.5 rounded-xl bg-[#1A0E08] border border-[#9B2208]/40 space-y-1">
                      <span className="text-[10px] font-bold text-[#D95A1A] uppercase tracking-wider block">
                        Included in One Simple Subscription:
                      </span>
                      <ul className="space-y-1 text-[11px] sm:text-xs text-white/90">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                          <span><strong className="text-white">AI Customer Support Worker:</strong> Answers inquiries, handles FAQs & follows up leads 24/7</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                          <span><strong className="text-white">AI Marketing Worker:</strong> Daily social content, branded visuals & promotional copy</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                          <span><strong className="text-white">Business Insights Dashboard:</strong> Orders, sales velocity & restock visibility</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Continuous operation:</strong> Digital inquiries and product questions are answered immediately without delay.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Automated workflows:</strong> Coordinated handoffs between customer support, lead follow-up, and marketing promotions.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Human judgment & escalation:</strong> Sensitive decisions and complex inquiries escalate gracefully to you.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Predictable economics:</strong> One simple monthly subscription with zero setup fees. Month-to-month.</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-[#170E08] border border-[#9B2208]/40 text-[10px] sm:text-xs text-[#FAFAF9] flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                    <span>Result: Digital consistency, continuous customer responsiveness, and peace of mind.</span>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-syne font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:shadow-lg hover:shadow-[#D95A1A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Your AI Team</span>
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
