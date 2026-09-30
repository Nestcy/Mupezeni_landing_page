import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  HelpCircle, 
  Clock, 
  Megaphone, 
  ShoppingCart, 
  Sliders, 
  AlertCircle,
  Activity
} from 'lucide-react';

import { MupezeniBirdIcon } from './MupezeniBrandMetaphor';

interface ActivityItem {
  id: string;
  category: string;
  title: string;
  meta: string;
  loadWeight: number;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  time: string;
}

const ACTIVITY_STREAMS: ActivityItem[] = [
  {
    id: 'convos',
    category: 'Customer conversations',
    title: '8 unread enquiries across channels',
    meta: '"Do you have this in black? How fast can it ship?"',
    loadWeight: 3,
    icon: MessageSquare,
    accentColor: '#B83A0A',
    time: '2m ago'
  },
  {
    id: 'enquiries',
    category: 'Sales enquiries',
    title: 'Custom quote request awaiting response',
    meta: 'High-intent buyer asking for bulk pricing options',
    loadWeight: 3,
    icon: HelpCircle,
    accentColor: '#9B2208',
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
    time: '18m ago'
  },
  {
    id: 'orders',
    category: 'Orders & questions',
    title: '6 orders pending payment verification',
    meta: 'Customers asking for bank references & delivery timing',
    loadWeight: 3,
    icon: ShoppingCart,
    accentColor: '#9B2208',
    time: '1h ago'
  },
  {
    id: 'marketing',
    category: 'Marketing tasks',
    title: 'Weekly campaign content due for launch',
    meta: 'Daily social posts, product visual assets & captions needed',
    loadWeight: 2,
    icon: Megaphone,
    accentColor: '#D95A1A',
    time: '34m ago'
  },
  {
    id: 'decisions',
    category: 'Operational decisions',
    title: 'Supplier restock allocations & pricing adjustments',
    meta: 'Critical founder-level operational decisions awaiting review',
    loadWeight: 3,
    icon: Sliders,
    accentColor: '#B83A0A',
    time: '2h ago'
  }
];

export const CapacityProblemSection: React.FC = () => {
  const [scaleLevel, setScaleLevel] = useState<'moderate' | 'expanding' | 'high'>('expanding');
  const [activeItemHover, setActiveItemHover] = useState<string | null>(null);
  const [inflowCount, setInflowCount] = useState(48);

  useEffect(() => {
    const interval = setInterval(() => {
      setInflowCount(prev => (prev > 120 ? 45 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scaleConfig = {
    moderate: {
      multiplier: 1,
      loadPct: '100%',
      loadLabel: 'Standard Load',
      activeItemsCount: 4,
      desc: 'Base operational cadence. Manageable during standard hours, but vulnerable to after-hour delays.',
      label: '1× Activity'
    },
    expanding: {
      multiplier: 3,
      loadPct: '240%',
      loadLabel: 'High Pressure Capacity',
      activeItemsCount: 4,
      desc: 'Compounding volume. Unanswered messages accumulate, follow-ups slip.',
      label: '3× Activity'
    },
    high: {
      multiplier: 5,
      loadPct: '420%',
      loadLabel: 'Critical Capacity Deficit',
      activeItemsCount: 4,
      desc: 'Continuous operational friction. Customer demand outpaces available human hours.',
      label: '5× Activity'
    }
  };

  const currentScale = scaleConfig[scaleLevel];

  return (
    <section 
      id="the-capacity-problem"
      className="relative py-12 sm:py-16 lg:py-20 bg-[#0A0705] text-[#FAFAF9] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Background ambient light fields */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#B83A0A]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* ================= TOP PART: THE REAL COST OF GROWTH ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Eyebrow */}
            <div className="space-y-1.5">
              <span className="text-[10px] sm:text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                The Real Cost of Growth
              </span>
              <div className="h-[1px] w-10 bg-[#9B2208]/50" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-syne text-[#FAFAF9] tracking-tight leading-[1.15]">
              Growth creates more chances to sell. <span className="font-editorial text-[#F5EDE4]/90 block pt-0.5">It also creates more work.</span>
            </h2>

            {/* Body Copy */}
            <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/80 leading-relaxed font-normal">
              More customers mean more conversations, follow-ups, and product questions. Eventually, the business isn’t constrained by demand — it’s constrained by how much work human capacity can absorb.
            </p>

            <div className="p-3 rounded-xl bg-[#130C08] border border-white/[0.08] flex items-center justify-between text-xs font-syne font-bold text-[#FAFAF9]">
              <span>The business grows.</span>
              <span className="text-[#B83A0A]">So does the operational friction.</span>
            </div>

            {/* Interactive Scale Controller */}
            <div className="pt-1 space-y-1.5">
              <div className="text-[11px] font-dm text-[#F5EDE4]/60 flex items-center justify-between">
                <span>Workload Scenario:</span>
                <span className="text-[#FAFAF9] font-medium font-syne">{currentScale.label}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#130C08] border border-white/[0.06]">
                {(['moderate', 'expanding', 'high'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setScaleLevel(stage)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-dm font-medium transition-all duration-200 cursor-pointer ${
                      scaleLevel === stage 
                        ? 'bg-[#9B2208] text-white shadow-md font-semibold' 
                        : 'text-[#F5EDE4]/60 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {stage === 'moderate' ? '1× Load' : stage === 'expanding' ? '3× Load' : '5× Load'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Workload Visualization */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-[#130C08] border border-white/[0.09] p-4 sm:p-5 lg:p-6 shadow-xl overflow-hidden">
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#B83A0A] animate-pulse" />
                  <span className="text-xs font-syne font-bold text-[#FAFAF9] tracking-wide">
                    Live Operational Workload
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-dm text-[#F5EDE4]/70">
                  <span>Tasks piling up:</span>
                  <span className="font-syne font-bold text-[#E58330] tabular-nums">
                    {Math.round(inflowCount * currentScale.multiplier)}
                  </span>
                </div>
              </div>

              {/* Work Streams Grid */}
              <div className="relative z-10 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {ACTIVITY_STREAMS.slice(0, currentScale.activeItemsCount).map((item, idx) => {
                    const Icon = item.icon;
                    const isHovered = activeItemHover === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.03 }}
                        onMouseEnter={() => setActiveItemHover(item.id)}
                        onMouseLeave={() => setActiveItemHover(null)}
                        className={`relative rounded-xl p-2.5 sm:p-3 bg-[#0A0705]/90 border transition-all duration-200 ${
                          isHovered 
                            ? 'border-[#B83A0A] bg-[#160D09] shadow-md shadow-[#9B2208]/15' 
                            : 'border-white/[0.07] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1.5 mb-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <Icon className="w-3.5 h-3.5 text-[#B83A0A] shrink-0" />
                            <span className="text-[11px] font-syne font-bold text-[#FAFAF9] truncate">
                              {item.category}
                            </span>
                          </div>
                          <span className="text-[9.5px] font-dm text-[#F5EDE4]/40 shrink-0">
                            {item.time}
                          </span>
                        </div>

                        <div className="text-[11.5px] font-dm font-medium text-[#F5EDE4] leading-snug line-clamp-1">
                          {item.title}
                        </div>

                        <p className="text-[10.5px] font-dm text-[#F5EDE4]/60 italic truncate mt-0.5">
                          {item.meta}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Central Operational Decisions Bar */}
                <div className="rounded-xl p-2.5 sm:p-3 bg-gradient-to-r from-[#180C07] via-[#221008] to-[#180C07] border border-[#9B2208]/40 shadow-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <div className="p-1 rounded-md bg-[#9B2208]/20 text-[#B83A0A] shrink-0">
                      <Sliders className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs font-syne font-bold text-[#FAFAF9] truncate">
                      Operational & restock decisions
                    </div>
                  </div>
                  <div className="text-xs font-syne font-extrabold text-[#B83A0A] shrink-0">
                    {scaleLevel === 'high' ? '19 Awaiting' : scaleLevel === 'expanding' ? '9 Pending' : '4 Pending'}
                  </div>
                </div>

                {/* Bottleneck Callout Footer */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[#FAFAF9]">
                    <AlertCircle className="w-3.5 h-3.5 text-[#B83A0A] shrink-0" />
                    <span className="font-dm text-[#F5EDE4]/80 text-[11px] sm:text-xs">
                      Human attention is finite. Opportunities wait.
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-syne font-bold text-[10.5px] px-2.5 py-0.5 rounded-md bg-[#9B2208]/20 text-[#FAFAF9] border border-[#9B2208]/30">
                    <Activity className="w-3 h-3 text-[#B83A0A]" />
                    <span>Load: {currentScale.loadPct}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* ================= VISUAL CONTRAST & CLOSING INSIGHT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 pt-1">
          {/* Left: Without Capacity */}
          <div className="rounded-xl bg-[#100906] border border-white/[0.07] p-3.5 sm:p-4 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#F5EDE4]/50">
                WITHOUT DEDICATED CAPACITY
              </span>
              <span className="text-[9.5px] font-mono text-[#E58330]/70">Limited Attention</span>
            </div>
            <p className="text-xs font-dm text-[#F5EDE4]/70 leading-relaxed">
              Messages arrive 24/7 across WhatsApp, Instagram, and web. As attention runs out, response delays cause high-intent buyers to leave.
            </p>
          </div>

          {/* Right: With Mupezeni */}
          <div className="rounded-xl bg-gradient-to-br from-[#1A0E08] to-[#120A06] border border-[#B83A0A]/40 p-3.5 sm:p-4 space-y-2 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <MupezeniBirdIcon size={16} />
                <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#FAFAF9]">
                  WITH MUPEZENI WORKFORCE
                </span>
              </div>
              <span className="text-[10px] font-syne font-bold text-[#E58330]">
                ✦ Signals Captured
              </span>
            </div>
            <p className="text-xs font-dm text-[#F5EDE4]/85 leading-relaxed">
              AI workers handle instant product availability, quotes, and customer follow-up within seconds — keeping sales conversations alive.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
