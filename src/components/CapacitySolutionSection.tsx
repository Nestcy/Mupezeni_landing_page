import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquareText, 
  Megaphone, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

interface WorkStreamCard {
  id: string;
  category: string;
  statusBadge: string;
  headline: string;
  subItems: string[];
  throughput: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  desktopLayout: string;
  delay: number;
}

const WORK_STREAMS: WorkStreamCard[] = [
  {
    id: 'support',
    category: 'CUSTOMER SUPPORT',
    statusBadge: 'Continuous Frontline',
    headline: '12 conversations handled',
    subItems: [
      '3 enquiries answered',
      '5 product questions resolved',
      '4 follow-ups sent'
    ],
    throughput: 'Avg reply < 2.5s · WhatsApp & Web',
    accent: '#B83A0A',
    icon: MessageSquareText,
    desktopLayout: 'lg:col-span-6 lg:-rotate-0.5',
    delay: 0.1
  },
  {
    id: 'marketing',
    category: 'MARKETING',
    statusBadge: 'Daily Rhythm',
    headline: 'Weekly marketing running',
    subItems: [
      '4 posts prepared',
      '2 campaigns monitored',
      '17 customer responses tracked'
    ],
    throughput: 'Consistent social cadence active',
    accent: '#D95A1A',
    icon: Megaphone,
    desktopLayout: 'lg:col-span-6 lg:rotate-0.5 lg:translate-y-2',
    delay: 0.2
  },
  {
    id: 'sales',
    category: 'SALES',
    statusBadge: 'Pipeline Velocity',
    headline: 'Follow-ups moving',
    subItems: [
      '8 prospects followed up',
      '3 purchase conversations active'
    ],
    throughput: 'Zero dropped high-intent leads',
    accent: '#9B2208',
    icon: TrendingUp,
    desktopLayout: 'lg:col-span-6 lg:translate-y-1',
    delay: 0.3
  },
  {
    id: 'operations',
    category: 'BUSINESS OPERATIONS',
    statusBadge: 'Triage & Sync',
    headline: 'Business activity organized',
    subItems: [
      'Orders tracked',
      'Reports prepared',
      'Important decisions surfaced'
    ],
    throughput: 'Owner inbox cleared of noise',
    accent: '#B83A0A',
    icon: Layers,
    desktopLayout: 'lg:col-span-6 lg:-translate-y-1',
    delay: 0.4
  }
];

export const CapacitySolutionSection: React.FC = () => {
  const [activeStream, setActiveStream] = useState<string | null>(null);
  const [absorbedCounter, setAbsorbedCounter] = useState(384);
  const [capacityMode, setCapacityMode] = useState<'expanded' | 'surge'>('expanded');

  // Subtle live throughput counter
  useEffect(() => {
    const interval = setInterval(() => {
      setAbsorbedCounter(prev => prev + 1);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="the-capacity-solution"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#0A0705] text-[#FAFAF9] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Background ambient lighting - Warm Mupezeni Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[480px] bg-[#9B2208]/12 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[420px] h-[420px] bg-[#B83A0A]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_45%,rgba(19,12,8,0.75),#0A0705_100%)] pointer-events-none -z-10" />

      {/* Main container: 1200px–1280px standard */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-16 sm:space-y-20">
        
        {/* ================= TOP SECTION: NARRATIVE & HEADLINE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          
          {/* Left: Eyebrow + Headline */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2.5">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                The Capacity Solution
              </span>
              <div className="h-[1px] w-12 bg-[#9B2208]/50" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold font-syne text-[#FAFAF9] tracking-tight leading-[1.12] text-balance">
              Add capacity without adding more work to your plate.
            </h2>
          </div>

          {/* Right: Supporting Editorial Prose */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/85 leading-relaxed font-normal">
              Mupezeni gives growing businesses a team of AI employees that handles the repetitive work behind growth, from customer conversations and follow-ups to marketing and day-to-day operations.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-dm text-[#F5EDE4]/60">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B83A0A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9B2208]" />
              </span>
              <span>Proprietary autonomous operational layer</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#FAFAF9] font-medium font-syne">24/7 Execution</span>
            </div>
          </div>

        </div>

        {/* ================= EDITORIAL VISUAL COMPOSITION: YOUR BUSINESS, WITH MORE CAPACITY ================= */}
        <div className="relative rounded-3xl bg-[#130C08] border border-white/[0.09] p-6 sm:p-9 lg:p-11 shadow-2xl overflow-hidden">
          
          {/* Subtle grid lines background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

          {/* Header of the Visual Canvas */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.07] pb-6 mb-8">
            <div className="space-y-1">
              <div className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#B83A0A]">
                The Operating State
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-syne text-[#FAFAF9] tracking-tight">
                YOUR BUSINESS, WITH MORE CAPACITY.
              </h3>
            </div>

            {/* Capacity Telemetry Pill & Mode Switch */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="px-3.5 py-1.5 rounded-xl bg-[#0A0705] border border-white/[0.08] text-xs font-dm flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#B83A0A]" />
                <span className="text-[#F5EDE4]/70">Tasks absorbed:</span>
                <span className="font-syne font-bold text-[#FAFAF9] tabular-nums">
                  {capacityMode === 'surge' ? absorbedCounter * 2 : absorbedCounter}
                </span>
              </div>

              <div className="flex items-center p-1 rounded-xl bg-[#0A0705] border border-white/[0.08] text-[11px] font-dm">
                <button
                  onClick={() => setCapacityMode('expanded')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    capacityMode === 'expanded' ? 'bg-[#9B2208] text-white font-semibold' : 'text-[#F5EDE4]/60 hover:text-white'
                  }`}
                >
                  Active Absorption
                </button>
                <button
                  onClick={() => setCapacityMode('surge')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    capacityMode === 'surge' ? 'bg-[#9B2208] text-white font-semibold' : 'text-[#F5EDE4]/60 hover:text-white'
                  }`}
                >
                  Peak Scale (3x)
                </button>
              </div>
            </div>
          </div>

          {/* Core Visual Workspace: Activity Cards surrounding Central MUPEZENI.AI Node */}
          <div className="relative z-10">
            
            {/* SVG Connecting Flow Lines converging toward the center */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block opacity-40" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="solGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B83A0A" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#9B2208" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#F5EDE4" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path d="M 250 120 Q 400 240 580 270" stroke="url(#solGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
              <path d="M 900 120 Q 750 240 580 270" stroke="url(#solGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
              <path d="M 250 430 Q 400 320 580 290" stroke="url(#solGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
              <path d="M 900 430 Q 750 320 580 290" stroke="url(#solGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
            </svg>

            {/* Central MUPEZENI.AI Focal Element (Positioned in center of desktop layout) */}
            <div className="mb-8 lg:mb-10">
              <div className="max-w-md mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#180C07] via-[#241109] to-[#180C07] border border-[#B83A0A]/50 shadow-2xl text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,58,10,0.2),transparent_70%)] pointer-events-none" />
                
                <div className="relative space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-syne uppercase tracking-widest text-[#B83A0A] font-bold">
                    <Sparkles className="w-3 h-3 text-[#B83A0A]" />
                    <span>Autonomous Operating Core</span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black font-syne tracking-wider text-[#FAFAF9]">
                    MUPEZENI<span className="text-[#B83A0A]">.AI</span>
                  </div>

                  <p className="text-xs font-dm text-[#F5EDE4]/75 max-w-xs mx-auto leading-relaxed">
                    Absorbing repetitive customer conversations, marketing cycles, and routine ops so your human time stays protected.
                  </p>
                </div>
              </div>
            </div>

            {/* Organic Editorial Activity Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              {WORK_STREAMS.map((stream) => {
                const Icon = stream.icon;
                const isHovered = activeStream === stream.id;

                return (
                  <motion.div
                    key={stream.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: stream.delay }}
                    onMouseEnter={() => setActiveStream(stream.id)}
                    onMouseLeave={() => setActiveStream(null)}
                    className={`relative rounded-2xl p-5 sm:p-6 bg-[#0A0705]/90 border transition-all duration-300 flex flex-col justify-between ${stream.desktopLayout} ${
                      isHovered 
                        ? 'border-[#B83A0A] bg-[#160C08] shadow-xl shadow-[#9B2208]/20 scale-[1.01]' 
                        : 'border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {/* Card Header: Category & Status */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-white/[0.04] text-[#B83A0A]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-syne font-bold uppercase tracking-wider text-[#F5EDE4]/80">
                            {stream.category}
                          </span>
                        </div>

                        <div className="text-[11px] font-dm text-[#F5EDE4]/50 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Handled by AI</span>
                        </div>
                      </div>

                      {/* Primary Status Headline */}
                      <h4 className="text-base sm:text-lg font-bold font-syne text-[#FAFAF9] leading-snug">
                        {stream.headline}
                      </h4>

                      {/* Work Items Handled */}
                      <ul className="space-y-1.5 pt-1 text-xs font-dm text-[#F5EDE4]/85">
                        {stream.subItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#B83A0A] font-bold text-xs shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Footer: Throughput & Capacity Signal */}
                    <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-dm text-[#F5EDE4]/60">
                      <span>{stream.throughput}</span>
                      <span className="text-[#B83A0A] font-syne font-semibold flex items-center gap-1">
                        <span>Absorbed</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

        {/* ================= SECTION CLOSING STATEMENT ================= */}
        <div className="pt-4 border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-syne text-[#FAFAF9] tracking-tight">
              Growth shouldn’t require more of you.
            </h3>
            
            <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/80 leading-relaxed max-w-2xl mx-auto">
              «Mupezeni creates the capacity to handle more customers, more activity, and more growth without letting the work consume your business.»
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
