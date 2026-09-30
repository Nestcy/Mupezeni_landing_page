import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquareText, 
  Sparkles, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  Send, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Layers, 
  Smartphone, 
  Share2, 
  TrendingUp, 
  AlertCircle, 
  CheckCheck,
  RotateCcw,
  Play,
  Pause,
  SlidersHorizontal,
  Box
} from 'lucide-react';
import { PageId } from '../types';
import sonyHeadphonesAdImg from '../assets/images/sony_headphones_ad_1790256456952.jpg';
import { MupezeniBirdIcon, SignalStar } from './MupezeniBrandMetaphor';

interface InteractiveAgentDemoProps {
  onNavigateToContact?: (page: PageId) => void;
  className?: string;
}

type DemoTab = 'support' | 'marketing' | 'insights';

export const InteractiveAgentDemo: React.FC<InteractiveAgentDemoProps> = ({
  onNavigateToContact,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<DemoTab>('support');
  const [stepIdx, setStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto progression timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setStepIdx((prev) => (prev < 2 ? prev + 1 : 0));
    }, 4200);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeTab]);

  const resetAndSwitchTab = (tab: DemoTab) => {
    setActiveTab(tab);
    setStepIdx(0);
  };

  return (
    <section 
      id="how-mupezeni-works-demo"
      className={`py-10 sm:py-16 lg:py-24 bg-[#070403] relative overflow-hidden border-t border-b border-white/[0.06] ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#B83A0A]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10 lg:space-y-12">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] sm:text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
              See It In Action
            </span>
            <div className="h-[1px] w-10 sm:w-12 bg-[#9B2208]/50 mx-auto" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            This is what an AI workforce looks like at work.
          </h2>

          <p className="text-xs sm:text-base lg:text-lg font-dm text-[#F5EDE4]/75 max-w-2xl mx-auto leading-relaxed">
            Not another chatbot. Not another dashboard you have to manage. AI workers that handle recurring work and keep moving when you are busy.
          </p>
        </div>

        {/* ================= DEMO CONTROLS: 3 TABS ================= */}
        <div className="flex flex-col items-center justify-center gap-2.5 sm:gap-4">
          <div className="inline-flex p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-[#130C08] border border-white/[0.08] shadow-2xl max-w-full overflow-x-auto no-scrollbar gap-1">
            
            {/* Tab 1: Customer Support & Sales */}
            <button
              onClick={() => resetAndSwitchTab('support')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-syne font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white shadow-md shadow-[#9B2208]/40 scale-100'
                  : 'text-[#F5EDE4]/60 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <MessageSquareText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Customer Support & Sales</span>
            </button>

            {/* Tab 2: Marketing & Growth */}
            <button
              onClick={() => resetAndSwitchTab('marketing')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-syne font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === 'marketing'
                  ? 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white shadow-md shadow-[#9B2208]/40 scale-100'
                  : 'text-[#F5EDE4]/60 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Marketing & Growth</span>
            </button>

            {/* Tab 3: Business Insights */}
            <button
              onClick={() => resetAndSwitchTab('insights')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-syne font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === 'insights'
                  ? 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white shadow-md shadow-[#9B2208]/40 scale-100'
                  : 'text-[#F5EDE4]/60 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Business Insights</span>
            </button>

          </div>

          {/* Stepper Scrubber & Auto-Play toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-mono text-[#F5EDE4]/60">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#130C08] border border-white/[0.08] hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-3 h-3 text-[#B83A0A]" /> : <Play className="w-3 h-3 text-emerald-400" />}
              <span>{isAutoPlaying ? 'Auto Step' : 'Paused'}</span>
            </button>
            <div className="flex items-center gap-1 sm:gap-1.5">
              {[0, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setStepIdx(s)}
                  className={`h-1 sm:h-1.5 rounded-full transition-all cursor-pointer ${
                    stepIdx === s ? 'w-5 sm:w-6 bg-[#B83A0A]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span>Step {stepIdx + 1}/3</span>
          </div>
        </div>

        {/* ================= INTERACTIVE DEMO STAGE ================= */}
        <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-[#130C08] border border-white/[0.09] p-3.5 sm:p-7 lg:p-10 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* ---------------- DEMO TAB 01: CUSTOMER SUPPORT & SALES ---------------- */}
            {activeTab === 'support' && (
              <motion.div
                key="tab-support"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start md:items-center"
              >
                {/* Left: Authentic Conversation Simulation */}
                <div className="md:col-span-7 space-y-2.5 sm:space-y-4">
                  {/* Discovery Metaphor Header */}
                  <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#0A0705] border border-white/[0.08] text-[11px] sm:text-xs font-dm">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MupezeniBirdIcon size={16} />
                      <span className="text-[#E58330] font-bold">✦</span>
                      <span className="text-[10px] sm:text-[11px] font-syne font-bold text-[#FAFAF9]">BUYING INTENT DISCOVERED</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[9.5px] sm:text-[10.5px]">AI WORKER RESPONDS</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-syne font-bold text-[#F5EDE4]/60 border-b border-white/[0.06] pb-2 sm:pb-3">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400" />
                      <span>Live Customer Chat (WhatsApp / Web)</span>
                    </span>
                    <span className="font-mono text-[9.5px] sm:text-[10px]">Active Session</span>
                  </div>

                  {/* Message 1: Customer */}
                  <div className="flex items-start gap-2 sm:gap-2.5 max-w-[92%] sm:max-w-[90%]">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 text-[11px] sm:text-xs font-bold font-syne flex items-center justify-center shrink-0">
                      C
                    </div>
                    <div className="p-2.5 sm:p-3.5 rounded-2xl rounded-tl-none bg-[#0A0705] border border-white/[0.08] text-xs sm:text-sm font-dm text-[#FAFAF9] shadow-sm">
                      "Hi, do you still have the black one in medium?"
                    </div>
                  </div>

                  {/* Message 2: Mupezeni Worker */}
                  <div className="flex items-start justify-end gap-2 sm:gap-2.5 pl-4 sm:pl-8">
                    <div className="p-2.5 sm:p-3.5 rounded-2xl rounded-tr-none bg-[#1F120A] border border-[#B83A0A]/40 text-xs sm:text-sm font-dm text-[#FAFAF9] shadow-md space-y-1">
                      <div className="text-[9.5px] sm:text-[10px] font-syne font-bold text-[#B83A0A] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Mupezeni Customer Support Worker</span>
                      </div>
                      <p>
                        "Yes. The black medium is currently available. Would you like me to help you with delivery options?"
                      </p>
                      <div className="text-[9px] font-mono text-[#F5EDE4]/40 text-right flex items-center justify-end gap-1 pt-0.5">
                        <span>Replied in 1.8s</span>
                        <CheckCheck className="w-3 h-3 text-[#B83A0A]" />
                      </div>
                    </div>
                  </div>

                  {/* Message 3 (Step 2+): Customer confirmation & Follow-up */}
                  {stepIdx >= 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 sm:gap-2.5 max-w-[92%] sm:max-w-[90%]"
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 text-[11px] sm:text-xs font-bold font-syne flex items-center justify-center shrink-0">
                        C
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-2xl rounded-tl-none bg-[#0A0705] border border-white/[0.08] text-xs font-dm text-[#FAFAF9]">
                        "Yes please, how much is same-day delivery to Roma?"
                      </div>
                    </motion.div>
                  )}

                  {/* Message 4 (Step 3): Delivery & Payment Lock */}
                  {stepIdx >= 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start justify-end gap-2 sm:gap-2.5 pl-4 sm:pl-8"
                    >
                      <div className="p-2.5 sm:p-3.5 rounded-2xl rounded-tr-none bg-[#1F120A] border border-[#B83A0A]/40 text-xs font-dm text-[#FAFAF9] shadow-md space-y-1">
                        <p>
                          "Delivery to Roma is K40 via dispatch rider. Your total is locked at K690. Shall I send our payment transfer details to confirm dispatch?"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right: Structural Intent & Pipeline Indicators */}
                <div className="md:col-span-5 space-y-2 sm:space-y-3 bg-[#0A0705] p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-white/[0.08]">
                  <div className="text-[10px] sm:text-xs font-syne font-bold uppercase tracking-wider text-[#B83A0A] flex items-center justify-between">
                    <span>Autonomous Intent Logic</span>
                    <span className="text-[9.5px] sm:text-[10px] font-mono text-[#F5EDE4]/40">Live Parsing</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-2 sm:gap-2.5">
                    {/* Indicator 1: Product Match */}
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#130C08] border border-white/[0.06] space-y-0.5">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9]">
                        <span>PRODUCT MATCH</span>
                        <span className="text-emerald-400 font-mono text-[10px] sm:text-[11px]">Available</span>
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/70">
                        Black / Medium (Stock: 6 units verified)
                      </p>
                    </div>

                    {/* Indicator 2: Buying Intent */}
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#130C08] border border-white/[0.06] space-y-0.5">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9]">
                        <span>BUYING INTENT</span>
                        <span className="text-[#B83A0A] font-mono text-[10px] sm:text-[11px] font-bold">High Intent</span>
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/70">
                        Specific size & delivery timeframe requested
                      </p>
                    </div>

                    {/* Indicator 3: Follow-Up & Potential Sale */}
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#130C08] border border-white/[0.06] space-y-0.5">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9]">
                        <span>POTENTIAL SALE</span>
                        <span className="text-emerald-400 font-mono text-[10px] sm:text-[11px]">Active Progress</span>
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/70">
                        Customer moving toward checkout completion
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------- DEMO TAB 02: MARKETING & GROWTH ---------------- */}
            {activeTab === 'marketing' && (
              <motion.div
                key="tab-marketing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start md:items-center"
              >
                {/* Left: Campaign Pipeline from Idea to Distribution */}
                <div className="md:col-span-7 space-y-2.5 sm:space-y-4">
                  {/* Discovery Metaphor Header */}
                  <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#0A0705] border border-white/[0.08] text-[11px] sm:text-xs font-dm">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MupezeniBirdIcon size={16} />
                      <span className="text-[#E58330] font-bold">✦</span>
                      <span className="text-[10px] sm:text-[11px] font-syne font-bold text-[#FAFAF9]">CUSTOMER INTEREST IDENTIFIED</span>
                    </div>
                    <span className="text-[#D95A1A] font-mono text-[9.5px] sm:text-[10.5px]">FOLLOW-UP READY</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-syne font-bold text-[#F5EDE4]/60 border-b border-white/[0.06] pb-2 sm:pb-3">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#D95A1A]" />
                      <span>Marketing Workflow Engine (Active Production)</span>
                    </span>
                    <span className="font-mono text-[9.5px] sm:text-[10px]">Cadence Active</span>
                  </div>

                  {/* Workflow Steps */}
                  <div className="space-y-2 sm:space-y-2.5">
                    
                    {/* Step 1: Product Selected */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#0A0705] border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className="p-1 sm:p-1.5 rounded-lg bg-[#B83A0A]/20 text-[#B83A0A]">
                          <Box className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9]">PRODUCT SELECTED</div>
                          <div className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/60">New Arrivals: Wireless Studio Headset</div>
                        </div>
                      </div>
                      <span className="text-[9.5px] sm:text-[10px] font-mono text-emerald-400 font-bold">✓ Selected</span>
                    </div>

                    {/* Step 2: Campaign Idea & Caption */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#0A0705] border border-white/[0.08] space-y-1 sm:space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9] flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#B83A0A]" />
                          <span>CAMPAIGN IDEA & CAPTION</span>
                        </div>
                        <span className="text-[9.5px] sm:text-[10px] font-mono text-emerald-400 font-bold">Generated</span>
                      </div>
                      <p className="text-[11px] sm:text-xs font-dm text-[#F5EDE4]/80 italic bg-[#130C08] p-2 sm:p-2.5 rounded-lg border border-white/[0.04]">
                        "Upgrade your daily focus. 35-hour battery life, active noise cancellation, and instant Lusaka delivery. Tap to order in black or silver."
                      </p>
                    </div>

                    {/* Step 3: Multi-Channel Ready */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#0A0705] border border-white/[0.08] flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9]">DISTRIBUTION CHANNELS</div>
                        <div className="text-[10px] sm:text-[11px] font-dm text-[#F5EDE4]/60">WhatsApp Status · Instagram · Facebook · TikTok</div>
                      </div>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#B83A0A]/20 text-[#B83A0A] font-syne font-bold text-[9.5px] sm:text-[10px]">
                        Human Review / Ready
                      </span>
                    </div>

                  </div>
                </div>

                {/* Right: Activity & Response Feed */}
                <div className="md:col-span-5 space-y-2 sm:space-y-3 bg-[#0A0705] p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-white/[0.08]">
                  <div className="text-[10px] sm:text-xs font-syne font-bold uppercase tracking-wider text-[#B83A0A] flex items-center justify-between">
                    <span>Campaign Engagement</span>
                    <span className="text-[9.5px] sm:text-[10px] font-mono text-[#F5EDE4]/40">Live Response</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-2 sm:gap-2.5">
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#130C08] border border-white/[0.06] space-y-0.5">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9]">
                        <span>MARKETING WORKER</span>
                        <span className="text-emerald-400 font-mono text-[9.5px] sm:text-[10px]">Completed</span>
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/70">
                        Campaign formatted across feeds
                      </p>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#130C08] border border-white/[0.06] space-y-0.5">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9]">
                        <span>CUSTOMER INTEREST</span>
                        <span className="text-[#B83A0A] font-mono text-[10px] sm:text-[11px] font-bold">17 Interactions</span>
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/70">
                        17 inquiries generated from WhatsApp & IG
                      </p>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#130C08] border border-white/[0.06] space-y-0.5">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9]">
                        <span>FOLLOW-UP HANDOFF</span>
                        <span className="text-emerald-400 font-mono text-[9.5px] sm:text-[10px]">3 Engaged</span>
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/70">
                        Customer Support Worker takes over chats
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------- DEMO TAB 03: BUSINESS INSIGHTS ---------------- */}
            {activeTab === 'insights' && (
              <motion.div
                key="tab-insights"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start md:items-center"
              >
                {/* Left: 3 Real-world Business Signals */}
                <div className="md:col-span-7 space-y-2 sm:space-y-3.5">
                  {/* Discovery Metaphor Header */}
                  <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#0A0705] border border-white/[0.08] text-[11px] sm:text-xs font-dm">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MupezeniBirdIcon size={16} />
                      <span className="text-[#E58330] font-bold">✦✦</span>
                      <span className="text-[10px] sm:text-[11px] font-syne font-bold text-[#FAFAF9]">CENTRAL BUSINESS SIGNALS</span>
                    </div>
                    <span className="text-sky-400 font-mono text-[9.5px] sm:text-[10.5px]">POTENTIAL SALES HIGHLIGHTED</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-syne font-bold text-[#F5EDE4]/60 border-b border-white/[0.06] pb-2 sm:pb-3">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-sky-400" />
                      <span>Business Intelligence & Signal Detection</span>
                    </span>
                    <span className="font-mono text-[9.5px] sm:text-[10px]">Live Signals</span>
                  </div>

                  {/* Signal 1 */}
                  <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#0A0705] border border-white/[0.08] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-syne font-bold text-[#B83A0A] uppercase tracking-wider">
                        Business Signal
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 rounded bg-[#9B2208]/20 text-[#B83A0A] text-[9.5px] sm:text-[10px] font-syne font-bold">
                        Action Needed
                      </span>
                    </div>
                    <div className="text-[11.5px] sm:text-sm font-bold font-syne text-[#FAFAF9]">
                      7 purchase conversations ended without a sale.
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/70">
                      Recommendation: Review follow-up sequence and trigger re-engagement incentives.
                    </p>
                  </div>

                  {/* Signal 2 */}
                  <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#0A0705] border border-white/[0.08] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-syne font-bold text-sky-400 uppercase tracking-wider">
                        Product Signal
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[9.5px] sm:text-[10px] font-syne font-bold">
                        Stock Alert
                      </span>
                    </div>
                    <div className="text-[11.5px] sm:text-sm font-bold font-syne text-[#FAFAF9]">
                      Black / Size 42 requested 14 times this week.
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/70">
                      Recommendation: Increase supplier restock quantity before stock reaches zero.
                    </p>
                  </div>

                  {/* Signal 3 */}
                  <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#0A0705] border border-white/[0.08] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-syne font-bold text-emerald-400 uppercase tracking-wider">
                        Marketing Signal
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9.5px] sm:text-[10px] font-syne font-bold">
                        High Velocity
                      </span>
                    </div>
                    <div className="text-[11.5px] sm:text-sm font-bold font-syne text-[#FAFAF9]">
                      New arrivals campaign generated 31 customer interactions.
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] font-dm text-[#F5EDE4]/70">
                      Recommendation: Replicate lookbook format for weekend collection launch.
                    </p>
                  </div>
                </div>

                {/* Right: Owner Control & Visibility Lens */}
                <div className="md:col-span-5 space-y-2.5 sm:space-y-4 bg-[#0A0705] p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-white/[0.08] text-center sm:text-left">
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[10px] sm:text-xs font-syne font-bold uppercase tracking-wider text-[#B83A0A]">
                      The Strategic Question
                    </span>
                    <h4 className="text-base sm:text-lg font-bold font-syne text-[#FAFAF9]">
                      Where are potential sales being left unattended?
                    </h4>
                  </div>

                  <p className="text-[11px] sm:text-xs font-dm text-[#F5EDE4]/75 leading-relaxed">
                    Business Insights brings customer activity, sales velocity, product demand, and uncompleted orders into a single view so you know exactly where interest is building.
                  </p>

                  <div className="p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#130C08] border border-white/[0.06] text-[11px] sm:text-xs font-syne font-bold text-[#FAFAF9]">
                    What happened? Where is interest building? Where are opportunities waiting?
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
