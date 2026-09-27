import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDown, 
  AlertTriangle,
  MessageSquare, 
  Megaphone, 
  TrendingDown,
  Sparkles,
  ChevronDown,
  Clock,
  DollarSign,
  UserX
} from 'lucide-react';
import { PageId } from '../types';
import enquiryFatigueImg from '../assets/images/problem_enquiry_fatigue_1790425892923.jpg';
import marketingDelayImg from '../assets/images/problem_marketing_delay_1790425907228.jpg';
import overheadChurnImg from '../assets/images/problem_overhead_churn_1790425920818.jpg';

interface GrowthCrossroadsSectionProps {
  onNavigate?: (page: PageId) => void;
  onOpenBookingModal?: () => void;
}

export const GrowthCrossroadsSection: React.FC<GrowthCrossroadsSectionProps> = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const scrollToAiWorkers = () => {
    const el = document.getElementById('ai-workers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stories = [
    {
      id: 'enquiries',
      step: '01',
      tag: 'Customer Enquiries',
      title: 'The Endless WhatsApp DM Grind',
      subtitle: 'Repetitive sizing, prices & missed late-night buyers.',
      image: enquiryFatigueImg,
      badge: '15m – 8h Reply Delay',
      icon: MessageSquare,
      quickStat: '$350–$600/mo or 15h founder time',
      hiddenDetails: [
        'Answering the exact same 5 questions hundreds of times every week.',
        'High-intent customers message past 8 PM and buy from competitors when no one replies.',
        'Hiring support staff means recurring payroll, training churn, and constant supervision.'
      ]
    },
    {
      id: 'marketing',
      step: '02',
      tag: 'Social Marketing',
      title: 'Slow Agencies & Midnight Flyers',
      subtitle: 'Waiting days for promo drafts or drafting posts at 1 AM.',
      image: marketingDelayImg,
      badge: '3 – 7 Day Turnaround',
      icon: Megaphone,
      quickStat: '$400–$800/mo retainer',
      hiddenDetails: [
        'Agencies take days to deliver generic flyers disconnected from live store inventory.',
        'Founders stay up until 1 AM drafting captions instead of focusing on sourcing and operations.',
        'Marketing stops the moment you get busy running the physical shop.'
      ]
    },
    {
      id: 'overhead',
      step: '03',
      tag: 'Founder Drain',
      title: 'High Payroll, Zero Freedom',
      subtitle: 'Paying for fragmented roles, yet growth stays bottlenecked.',
      image: overheadChurnImg,
      badge: '25+ Hours Lost Weekly',
      icon: TrendingDown,
      quickStat: '$750–$1,400+/mo combined cost',
      hiddenDetails: [
        'Heavy fixed monthly overhead across wages, airtime, and outside agency retainers.',
        'Staff turnover repeatedly resets your operational workflow back to square one.',
        'The founder remains trapped in manual firefighting with zero time to scale.'
      ]
    }
  ];

  return (
    <section 
      id="growth-crossroads" 
      className="relative py-14 sm:py-18 lg:py-22 bg-[#060403] overflow-hidden border-t border-white/[0.08]"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#9B2208]/12 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Streamlined Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#180A05] border border-red-500/30 text-xs font-mono tracking-widest text-red-400 uppercase">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>The Traditional Bottleneck</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Two Heavy Roles. <span className="text-gradient-fire">Endless Friction.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A099] max-w-xl mx-auto leading-relaxed">
            Managing customer chat enquiries and continuous social marketing manually limits your revenue and drains your time.
          </p>
        </div>

        {/* 3 Visual Storytelling Cards (Image-First, Minimal Copy) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, idx) => {
            const isExpanded = expandedCard === story.id;
            const Icon = story.icon;

            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-[#0D0704] border border-red-500/20 overflow-hidden shadow-xl hover:border-red-500/40 transition-all flex flex-col justify-between"
              >
                {/* Visual Stock Image Container with Cinematic Scrim */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#160B06]">
                  <img
                    src={story.image}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0704] via-[#0D0704]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white font-medium">
                    <span className="text-red-400 font-bold">{story.step}</span>
                    <span className="text-white/40">·</span>
                    <span>{story.tag}</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-red-950/90 border border-red-500/30 text-red-300 text-[10px] font-mono font-bold shadow">
                    {story.badge}
                  </div>
                </div>

                {/* Minimal Card Body */}
                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-syne text-white leading-snug">
                        {story.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#A8A099] leading-relaxed">
                      {story.subtitle}
                    </p>
                  </div>

                  {/* Expandable / Collapsible Hidden Detail via Tailwind & State */}
                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#D4CDC5]">
                      <span className="text-red-400 font-semibold">{story.quickStat}</span>
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : story.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-[#A8A099] hover:text-white transition-colors cursor-pointer py-1"
                      >
                        <span>{isExpanded ? 'Less' : 'Details'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-1.5 pt-2 overflow-hidden text-[11px] text-[#8C827A]"
                        >
                          {story.hiddenDetails.map((detail, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-red-400 font-bold shrink-0">✕</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clean, High-Impact Transition Bridge to the Next Component */}
        <div className="pt-2">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#180C07] via-[#221008] to-[#180C07] border border-[#D95A1A]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#E58330] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Solution</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-syne text-white">
                Replace this friction with autonomous AI workers.
              </h3>
              <p className="text-xs text-[#A8A099]">
                See how two dedicated workers manage your frontline support and daily campaigns for $100/mo.
              </p>
            </div>

            <button
              onClick={scrollToAiWorkers}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:brightness-110 text-white font-syne font-bold text-xs shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap group shrink-0"
            >
              <span>See the 2 AI Workers Below</span>
              <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
