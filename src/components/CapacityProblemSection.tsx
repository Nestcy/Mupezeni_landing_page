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
  TrendingUp,
  Activity
} from 'lucide-react';

import { MupezeniBirdIcon, SignalStar } from './MupezeniBrandMetaphor';

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
      label: '1× Business Activity'
    },
    expanding: {
      multiplier: 3,
      loadPct: '240%',
      loadLabel: 'High Pressure Capacity',
      activeItemsCount: 6,
      desc: 'Rapidly compounding volume. Unanswered messages accumulate, follow-ups slip, and founder time gets consumed.',
      label: '3× Business Activity'
    },
    high: {
      multiplier: 5,
      loadPct: '420%',
      loadLabel: 'Critical Capacity Deficit',
      activeItemsCount: 6,
      desc: 'Continuous operational friction. Customer demand outpaces available human hours, causing valuable opportunities to slip.',
      label: '5× Business Activity'
    }
  };

  const currentScale = scaleConfig[scaleLevel];

  return (
    <section 
      id="the-capacity-problem"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#0A0705] text-[#FAFAF9] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Background ambient light fields */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#B83A0A]/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(19,12,8,0.7),#0A0705_100%)] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-20 sm:space-y-24">
        
        {/* ================= TOP PART: THE REAL COST OF GROWTH ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Eyebrow */}
            <div className="space-y-2">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                The Real Cost of Growth
              </span>
              <div className="h-[1px] w-12 bg-[#9B2208]/50" />
            </div>

            {/* Headline with Editorial Italic accent */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-syne text-[#FAFAF9] tracking-tight leading-[1.12] text-balance">
              Growth creates more chances to sell. <span className="font-editorial text-[#F5EDE4]/90 block pt-1">It also creates more work.</span>
            </h2>

            {/* Body Copy */}
            <div className="space-y-4 text-base font-dm text-[#F5EDE4]/80 leading-relaxed font-normal">
              <p>
                More customers mean more conversations. More conversations mean more follow-ups. More products mean more questions. More marketing means more content. More activity means more decisions.
              </p>
              
              <div className="p-4 rounded-2xl bg-[#130C08] border border-white/[0.08] space-y-1 font-syne font-bold text-sm text-[#FAFAF9]">
                <div>The business grows.</div>
                <div className="text-[#B83A0A]">So does everything around it.</div>
              </div>
            </div>

            {/* Interactive Scale Controller */}
            <div className="pt-2 space-y-2.5">
              <div className="text-xs font-dm text-[#F5EDE4]/60 flex items-center justify-between">
                <span>Interactive Workload Scenario:</span>
                <span className="text-[#FAFAF9] font-medium font-syne">{currentScale.label}</span>
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
                    {stage === 'moderate' ? '1× Scale' : stage === 'expanding' ? '3× Scale' : '5× Scale'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Workload Visualization Composition */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#130C08] border border-white/[0.09] p-5 sm:p-7 lg:p-8 shadow-2xl overflow-hidden min-h-[560px] flex flex-col justify-between">
              
              {/* Subtle grid pattern background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Composition Header */}
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

              {/* Work Streams Grid */}
              <div className="relative z-10 my-auto py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                  {ACTIVITY_STREAMS.slice(0, currentScale.activeItemsCount).map((item, idx) => {
                    const Icon = item.icon;
                    const isHovered = activeItemHover === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.04 }}
                        onMouseEnter={() => setActiveItemHover(item.id)}
                        onMouseLeave={() => setActiveItemHover(null)}
                        className={`relative rounded-xl p-3.5 sm:p-4 bg-[#0A0705]/85 border transition-all duration-300 ${
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
                      </motion.div>
                    );
                  })}
                </div>

                {/* Central Operational Decisions Bar */}
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

              {/* Bottleneck Callout Footer */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#FAFAF9]">
                  <AlertCircle className="w-4 h-4 text-[#B83A0A] shrink-0" />
                  <span className="font-syne font-semibold">
                    The Capacity Constraint:
                  </span>
                  <span className="font-dm text-[#F5EDE4]/80">
                    Human team attention is finite and fixed.
                  </span>
                </div>

                <div className="flex items-center gap-2 font-syne font-bold text-[11px] px-3 py-1 rounded-lg bg-[#9B2208]/20 text-[#FAFAF9] border border-[#9B2208]/30">
                  <Activity className="w-3.5 h-3.5 text-[#B83A0A]" />
                  <span>Capacity Load: {currentScale.loadPct}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================= VISUAL CONTRAST: SEARCHING & ACTING ================= */}
        <div className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Without Capacity */}
            <div className="rounded-2xl bg-[#100906] border border-white/[0.07] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <span className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#F5EDE4]/50">
                  WITHOUT SUFFICIENT CAPACITY
                </span>
                <span className="text-[10px] font-mono text-[#E58330]/70">Limited Attention</span>
              </div>
              <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70">
                Customer enquiries, cart pauses, and follow-ups arrive continuously. As team hours run out, attention splits:
              </p>
              <div className="p-3.5 rounded-xl bg-[#0A0705] border border-white/[0.05] space-y-2 text-xs font-dm text-[#F5EDE4]/60">
                <div className="flex items-center justify-between">
                  <span>Signals appear across channels</span>
                  <span className="text-[#B83A0A] font-semibold">Inflow continues</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delayed responses & skipped follow-ups</span>
                  <span className="text-[#B83A0A]/80 font-mono text-[11px]">Chances slip away</span>
                </div>
              </div>
            </div>

            {/* Right: With Mupezeni */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1A0E08] to-[#120A06] border border-[#B83A0A]/40 p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <MupezeniBirdIcon size={20} />
                  <span className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#FAFAF9]">
                    WITH MUPEZENI
                  </span>
                </div>
                <span className="text-[10.5px] font-syne font-bold text-[#E58330]">
                  ✦ Signals Discovered
                </span>
              </div>
              <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/85">
                The Mupezeni seeker constantly scans signals, discovers potential sales, and puts AI workers in motion:
              </p>
              <div className="p-3.5 rounded-xl bg-[#0A0705] border border-[#B83A0A]/30 space-y-2 text-xs font-dm">
                <div className="flex items-center justify-between text-[#FAFAF9]">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#E58330]">✦</span>
                    <span>Bird detects buying intent & enquiries</span>
                  </span>
                  <span className="text-[#10B981] font-mono text-[11px]">Instant Signal</span>
                </div>
                <div className="flex items-center justify-between text-[#F5EDE4]/80">
                  <span>AI Worker responds & follows up</span>
                  <span className="text-[#FAFAF9] font-syne font-bold text-[11px]">Owner informed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM PART: THE STRUCTURAL PROBLEM ================= */}
        <div className="pt-10 border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight">
              The problem isn't growth.
            </h3>

            <div className="text-2xl sm:text-3xl lg:text-4xl font-editorial text-[#F5EDE4]/90 tracking-normal">
              It’s what growth asks you to keep up with.
            </div>

            <div className="space-y-3 text-base sm:text-lg font-dm text-[#F5EDE4]/80 leading-relaxed max-w-2xl mx-auto">
              <p>
                Every new customer, campaign, enquiry, order, and follow-up creates another piece of work.
              </p>
              <p>
                Eventually, the business isn’t constrained by demand. It’s constrained by how much work the team can actually absorb.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-block px-6 py-3 rounded-2xl bg-[#130C08] border border-[#9B2208]/50 text-base sm:text-lg font-syne font-extrabold text-[#FAFAF9] shadow-xl">
                That is where sales start <span className="font-editorial text-[#B83A0A] underline underline-offset-4">slipping through the cracks.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
