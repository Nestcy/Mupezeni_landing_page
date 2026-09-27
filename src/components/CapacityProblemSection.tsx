import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  HelpCircle, 
  Clock, 
  Megaphone, 
  ShoppingCart, 
  FileText, 
  Sliders, 
  AlertCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface ActivityItem {
  id: string;
  category: string;
  title: string;
  meta: string;
  loadWeight: number; // 1 to 3
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  position: { desktop: string; mobile: string };
  time: string;
}

const ACTIVITY_STREAMS: ActivityItem[] = [
  {
    id: 'convos',
    category: 'Customer conversations',
    title: '8 unread inquiries across channels',
    meta: '"Is this available in black? How fast can it ship?"',
    loadWeight: 3,
    icon: MessageSquare,
    accentColor: '#B83A0A',
    position: { desktop: 'top-3 left-4', mobile: 'relative' },
    time: '2m ago'
  },
  {
    id: 'enquiries',
    category: 'Sales enquiries',
    title: 'Custom quote request awaiting response',
    meta: 'High-intent client asking for bulk pricing options',
    loadWeight: 3,
    icon: HelpCircle,
    accentColor: '#9B2208',
    position: { desktop: 'top-3 right-4', mobile: 'relative' },
    time: '8m ago'
  },
  {
    id: 'followups',
    category: 'Follow-ups',
    title: '14 warm leads with no touchpoint in 48h',
    meta: 'Pipeline velocity slowing down due to missed follow-ups',
    loadWeight: 2,
    icon: Clock,
    accentColor: '#B83A0A',
    position: { desktop: 'top-36 left-2', mobile: 'relative' },
    time: '18m ago'
  },
  {
    id: 'marketing',
    category: 'Marketing tasks',
    title: 'Weekly campaign draft delayed by 3 days',
    meta: 'Social promo, product copy, and newsletter pending review',
    loadWeight: 2,
    icon: Megaphone,
    accentColor: '#D95A1A',
    position: { desktop: 'top-36 right-2', mobile: 'relative' },
    time: '34m ago'
  },
  {
    id: 'orders',
    category: 'Orders',
    title: '27 orders queued for payment confirmation & dispatch',
    meta: 'Address verification, receipt checking, delivery coordination',
    loadWeight: 3,
    icon: ShoppingCart,
    accentColor: '#9B2208',
    position: { desktop: 'bottom-20 left-6', mobile: 'relative' },
    time: '45m ago'
  },
  {
    id: 'reports',
    category: 'Reports',
    title: 'End-of-week performance reconciliation unbuilt',
    meta: 'Channel revenue, ad spend, inventory turnover missing review',
    loadWeight: 1,
    icon: FileText,
    accentColor: '#B83A0A',
    position: { desktop: 'bottom-20 right-6', mobile: 'relative' },
    time: '1h ago'
  },
  {
    id: 'decisions',
    category: 'Operational decisions',
    title: 'Supplier pricing shift, restock priorities & staffing',
    meta: 'Critical bottleneck: 11 decisions waiting on owner sign-off',
    loadWeight: 3,
    icon: Sliders,
    accentColor: '#9B2208',
    position: { desktop: 'bottom-2 left-1/2 -translate-x-1/2', mobile: 'relative' },
    time: 'Just now'
  }
];

export const CapacityProblemSection: React.FC = () => {
  const [scaleLevel, setScaleLevel] = useState<'moderate' | 'expanding' | 'high'>('high');
  const [activeItemHover, setActiveItemHover] = useState<string | null>(null);

  // Subtle counter animation simulating growing activity
  const [inflowCount, setInflowCount] = useState(148);

  useEffect(() => {
    const timer = setInterval(() => {
      setInflowCount(prev => (prev > 210 ? 148 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const scaleMultipliers = {
    moderate: { label: 'Initial Traction', multiplier: 1, loadPct: '78%', bottleneckWarning: 'Capacity Approaching Limit' },
    expanding: { label: 'Fast Growth', multiplier: 2.2, loadPct: '135%', bottleneckWarning: 'Bottleneck Active — Owner Trapped in Ops' },
    high: { label: 'High Growth', multiplier: 4.5, loadPct: '240%', bottleneckWarning: 'Work Growth Outpaces Human Hours' }
  };

  const currentScale = scaleMultipliers[scaleLevel];

  return (
    <section 
      id="the-capacity-problem"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#0A0705] text-[#FAFAF9] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Background ambient light fields */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#9B2208]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#B83A0A]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(19,12,8,0.7),#0A0705_100%)] pointer-events-none -z-10" />

      {/* Container restricted to 1200px–1280px standard */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* Editorial Grid: Narrative Left, Abstract Visual Workload Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: EDITORIAL STATEMENT ================= */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Eyebrow */}
            <div className="space-y-3">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                The Capacity Problem
              </span>
              <div className="h-[1px] w-12 bg-[#9B2208]/50" />
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-syne text-[#FAFAF9] tracking-tight leading-[1.12] text-balance">
              Your business shouldn’t need more of your time to grow.
            </h2>

            {/* Supporting Copy */}
            <div className="space-y-4 text-base sm:text-lg font-dm text-[#F5EDE4]/80 leading-relaxed font-normal">
              <p>
                As your business grows, everything around it grows too. More customers. More conversations. More follow-ups. More marketing. More operations. More decisions.
              </p>
            </div>

            {/* Strong Visual Statement Card */}
            <div className="p-6 rounded-2xl bg-[#130C08] border border-white/[0.08] shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9B2208]/15 via-transparent to-transparent opacity-60" />
              
              <div className="relative space-y-3">
                <div className="text-[11px] font-syne font-semibold uppercase tracking-wider text-[#B83A0A]">
                  The Structural Irony
                </div>
                <div className="text-xl sm:text-2xl font-black font-syne text-[#FAFAF9] tracking-tight">
                  MORE GROWTH <span className="text-[#B83A0A]">→</span> MORE WORK
                </div>
                <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70 leading-relaxed">
                  Every new customer, campaign, and revenue milestone introduces an exponential accumulation of daily operational obligations.
                </p>
              </div>
            </div>

            {/* Central Idea Final Statement */}
            <div className="pt-2 border-t border-white/[0.07] space-y-2">
              <div className="text-lg sm:text-xl font-syne font-bold text-[#FAFAF9] leading-snug">
                The problem isn’t growth.
              </div>
              <div className="text-base sm:text-lg font-syne font-semibold text-[#B83A0A]">
                It’s that the work grows with it.
              </div>
            </div>

            {/* Interactive Stage Controller (Subtle scale demonstration) */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#F5EDE4]/60 font-dm">
                <span>Simulate Business Scale:</span>
                <span className="text-[#FAFAF9] font-medium">{currentScale.label}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-[#130C08] border border-white/[0.06]">
                {(['moderate', 'expanding', 'high'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setScaleLevel(stage)}
                    className={`py-2 px-3 rounded-lg text-xs font-dm font-medium transition-all duration-200 cursor-pointer ${
                      scaleLevel === stage 
                        ? 'bg-[#9B2208] text-white shadow-md font-semibold' 
                        : 'text-[#F5EDE4]/60 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {stage === 'moderate' ? '1x Scale' : stage === 'expanding' ? '3x Scale' : '5x Scale'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: ABSTRACT WORKLOAD ACCUMULATION COMPOSITION ================= */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#130C08] border border-white/[0.09] p-5 sm:p-7 lg:p-8 shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
              
              {/* Subtle grid pattern background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              {/* Converging SVG Flow Lines toward Central Human Bottleneck */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none opacity-30" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAFAF9" stopOpacity="0.1" />
                    <stop offset="70%" stopColor="#B83A0A" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#9B2208" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                {/* Radial lines from cards to center */}
                <line x1="20%" y1="15%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="80%" y1="15%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="15%" y1="40%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="85%" y1="40%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20%" y1="85%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="80%" y1="85%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Composition Header / Live Workload Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#B83A0A] animate-pulse" />
                  <span className="text-xs font-syne font-bold text-[#FAFAF9] tracking-wide">
                    Live Operational Workload
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-dm text-[#F5EDE4]/60">
                  <div className="flex items-center gap-1.5">
                    <span>Active tasks piling up:</span>
                    <span className="font-syne font-bold text-[#FAFAF9] tabular-nums">
                      {Math.round(inflowCount * currentScale.multiplier)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Central Focal Point: The Finite Capacity Bottleneck */}
              <div className="relative z-10 my-auto py-6">
                
                {/* Visual Work Accumulation Cards Grid (Floating and structured) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  {ACTIVITY_STREAMS.slice(0, 6).map((item, idx) => {
                    const Icon = item.icon;
                    const isHovered = activeItemHover === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        onMouseEnter={() => setActiveItemHover(item.id)}
                        onMouseLeave={() => setActiveItemHover(null)}
                        className={`relative rounded-xl p-3.5 sm:p-4 bg-[#0A0705]/80 border transition-all duration-300 ${
                          isHovered 
                            ? 'border-[#B83A0A] bg-[#160D09] shadow-lg shadow-[#9B2208]/15 transform -translate-y-0.5' 
                            : 'border-white/[0.08] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-white/[0.04] text-[#F5EDE4]">
                              <Icon className="w-3.5 h-3.5 text-[#B83A0A]" />
                            </div>
                            <span className="text-xs font-syne font-bold text-[#FAFAF9]">
                              {item.category}
                            </span>
                          </div>
                          <span className="text-[10px] font-dm text-[#F5EDE4]/40 shrink-0">
                            {item.time}
                          </span>
                        </div>

                        <div className="text-xs font-dm font-medium text-[#F5EDE4] mb-1 leading-snug">
                          {item.title}
                        </div>

                        <p className="text-[11px] font-dm text-[#F5EDE4]/60 leading-relaxed italic line-clamp-2">
                          {item.meta}
                        </p>

                        {/* Density indicator indicator dots */}
                        <div className="mt-2.5 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-[#F5EDE4]/50">
                          <span>Volume at current scale</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 4 }).map((_, dotIdx) => (
                              <div 
                                key={dotIdx}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  dotIdx < (scaleLevel === 'high' ? 4 : scaleLevel === 'expanding' ? 3 : 2)
                                    ? 'bg-[#B83A0A]' 
                                    : 'bg-white/10'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* The 7th Item: Central Operational Decisions Bar */}
                <div className="rounded-xl p-4 bg-gradient-to-r from-[#180C07] via-[#221008] to-[#180C07] border border-[#9B2208]/40 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#9B2208]/20 text-[#B83A0A] shrink-0">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-syne font-bold text-[#FAFAF9]">
                          Operational decisions & strategic triage
                        </div>
                        <div className="text-[11px] font-dm text-[#F5EDE4]/70">
                          Supplier negotiations, restock allocations, customer escalations
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-syne font-extrabold text-[#B83A0A]">
                        {scaleLevel === 'high' ? '19 Decisions Awaiting Review' : scaleLevel === 'expanding' ? '9 Decisions Pending' : '4 Decisions Pending'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Central Focal Bottleneck Callout Footer */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#FAFAF9]">
                  <AlertCircle className="w-4 h-4 text-[#B83A0A] shrink-0" />
                  <span className="font-syne font-semibold">
                    The Bottleneck:
                  </span>
                  <span className="font-dm text-[#F5EDE4]/80">
                    Human team capacity is fixed at 24 hours in a day.
                  </span>
                </div>

                <div className="flex items-center gap-2 font-syne font-bold text-[11px] px-3 py-1 rounded-lg bg-[#9B2208]/20 text-[#FAFAF9] border border-[#9B2208]/30">
                  <span>Capacity Load: {currentScale.loadPct}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
