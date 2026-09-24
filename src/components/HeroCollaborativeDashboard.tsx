import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  BarChart3, 
  MessageSquare, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Send, 
  ShieldCheck, 
  Package, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface HeroCollaborativeDashboardProps {
  onCtaClick?: () => void;
}

export const HeroCollaborativeDashboard: React.FC<HeroCollaborativeDashboardProps> = ({ onCtaClick }) => {
  const [activeTab, setActiveTab] = useState<'command' | 'support' | 'marketing' | 'insights'>('command');

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Outer Glow & Shell */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1E110A] to-[#0A0604] p-1 sm:p-2 border border-[#E58330]/30 shadow-2xl shadow-[#E58330]/15 overflow-hidden">
        
        {/* Background ambient light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#E58330]/15 blur-3xl pointer-events-none" />

        {/* Dashboard Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-[#0E0805] rounded-xl sm:rounded-2xl border border-[#26140B] text-xs">
          {/* Status badge */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-emerald-400 font-semibold tracking-wide uppercase text-[11px]">
                AI System Active
              </span>
            </div>
            <span className="text-[#594F47] hidden sm:inline">•</span>
            <span className="text-[#A8A099] font-mono text-[11px] hidden sm:inline">
              Lusaka Retail Cluster • 2 AI Workers
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-[#180E09] p-1 rounded-xl border border-[#301B0F] w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('command')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all whitespace-nowrap ${
                activeTab === 'command'
                  ? 'bg-[#E58330] text-[#0A0604] font-bold shadow-md'
                  : 'text-[#A8A099] hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Live Command</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all whitespace-nowrap ${
                activeTab === 'support'
                  ? 'bg-[#E58330] text-[#0A0604] font-bold shadow-md'
                  : 'text-[#A8A099] hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Support Worker</span>
            </button>

            <button
              onClick={() => setActiveTab('marketing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all whitespace-nowrap ${
                activeTab === 'marketing'
                  ? 'bg-[#E58330] text-[#0A0604] font-bold shadow-md'
                  : 'text-[#A8A099] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Marketing Worker</span>
            </button>

            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all whitespace-nowrap ${
                activeTab === 'insights'
                  ? 'bg-[#E58330] text-[#0A0604] font-bold shadow-md'
                  : 'text-[#A8A099] hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        {/* Dashboard Main Canvas */}
        <div className="p-3 sm:p-5 min-h-[360px] bg-[#070403] rounded-xl sm:rounded-2xl mt-2 border border-[#1F120A]">
          
          {/* 1. LIVE COMMAND TAB */}
          {activeTab === 'command' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Left Column: Support Feed */}
              <div className="rounded-xl bg-[#0F0805] border border-[#2D1A0F] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#24150C] pb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs text-white">AI Support Worker</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    24/7 Active
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#180E09] border border-[#2D1B0F] space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#A8A099]">
                      <span className="text-white font-medium">WhatsApp • Chilenje</span>
                      <span className="text-[10px] font-mono">1m ago</span>
                    </div>
                    <p className="text-[#CFC7BF]">
                      "Size 42 Chelsea Boots in stock? Can pay now."
                    </p>
                    <div className="pt-1 flex items-center gap-1.5 text-emerald-400 text-[11px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Order secured • MTN MoMo K850</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#180E09] border border-[#2D1B0F] space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#A8A099]">
                      <span className="text-white font-medium">Instagram DM • Roma</span>
                      <span className="text-[10px] font-mono">4m ago</span>
                    </div>
                    <p className="text-[#CFC7BF]">
                      "What time does your store close in Longacres?"
                    </p>
                    <div className="pt-1 flex items-center gap-1.5 text-emerald-400 text-[11px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Answered: Open till 18:00 + Delivery</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-[#8C837A] font-mono pt-1">
                  ⚡ Avg reply time: 2.1s • 41 inquiries today
                </div>
              </div>

              {/* Middle Column: Marketing Feed */}
              <div className="rounded-xl bg-[#0F0805] border border-[#2D1A0F] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#24150C] pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs text-white">AI Marketing Worker</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    1 Post / Day
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#180E09] border border-[#2D1B0F] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Today's Daily Post</span>
                    <span className="text-[10px] font-mono text-emerald-400">Scheduled 09:30</span>
                  </div>
                  <div className="h-28 rounded-md bg-gradient-to-br from-[#2D1A0F] to-[#140C07] border border-[#3D2214] p-2 flex flex-col justify-between text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#E58330]">Spotlight: Premium Loafers</span>
                      <span className="text-[10px] bg-black/50 px-1.5 py-0.5 rounded text-white">IG & FB</span>
                    </div>
                    <p className="text-[11px] text-[#E0D8D0] line-clamp-2 italic">
                      "Crafted for elegance and durability. Walk into the boardroom with total confidence..."
                    </p>
                    <div className="text-[10px] text-[#E58330] font-mono">
                      #ZambianFashion #LusakaStyle
                    </div>
                  </div>
                  <div className="text-[11px] text-[#A8A099]">
                    Auto-generated caption, branded imagery & hashtag set.
                  </div>
                </div>

                <div className="text-[11px] text-[#8C837A] font-mono pt-1">
                  📅 28 of 30 monthly campaigns created
                </div>
              </div>

              {/* Right Column: Business Insights */}
              <div className="rounded-xl bg-[#0F0805] border border-[#2D1A0F] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#24150C] pb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#E58330]" />
                    <span className="font-bold text-xs text-white">Business Insights</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8A099]">Live Feed</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-[#180E09] border border-[#2D1B0F] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#A8A099] uppercase">Today's AI Revenue</span>
                      <div className="text-base font-bold text-white font-['Space_Grotesk']">K7,850</div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      +32% vs last wk
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#180E09] border border-[#2D1B0F] space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-white font-medium">Top Requested SKU</span>
                      <span className="text-[#E58330] font-mono">18 Inquiries</span>
                    </div>
                    <p className="text-xs text-[#A8A099]">Italian Leather Oxford (Black)</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs flex items-center gap-2 text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>Low Stock Alert: Only 2 units remaining in Size 41.</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#8C837A] font-mono pt-1">
                  📊 Visibility layer included free
                </div>
              </div>
            </div>
          )}

          {/* 2. SUPPORT WORKER DEEP DIVE */}
          {activeTab === 'support' && (
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="flex items-center justify-between bg-[#120A06] p-3 rounded-xl border border-[#2B180D]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Customer Support Worker (WhatsApp)</h4>
                    <span className="text-[10px] text-emerald-400 font-mono">Real-time Retail Dialogue Simulation</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#A8A099]">Phone: +260 97 ... 482</span>
              </div>

              {/* Chat thread */}
              <div className="p-4 rounded-xl bg-[#0A0503] border border-[#24130A] space-y-3 text-xs">
                {/* User query */}
                <div className="flex justify-end">
                  <div className="max-w-xs bg-[#1F140D] border border-[#3A2214] p-3 rounded-2xl rounded-tr-none text-white space-y-1">
                    <p>Good evening. Do you have the Chelsea boot in brown size 43? And how much to deliver to Avondale?</p>
                    <span className="text-[9px] text-[#8A8178] block text-right font-mono">20:41 PM</span>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="max-w-md bg-[#160E08] border border-[#E58330]/30 p-3.5 rounded-2xl rounded-tl-none text-[#F2ECE4] space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#E58330]">
                      <Bot className="w-3.5 h-3.5" />
                      <span>AI Support Worker (Replied in 1.8s)</span>
                    </div>
                    <p className="leading-relaxed">
                      Good evening! Yes, we have <strong>2 pairs left</strong> in Brown Size 43 at <strong>K850</strong>. 
                      Delivery to Avondale is <strong>K40</strong> via our express rider and can arrive tomorrow morning before 10:00 AM.
                    </p>
                    <p className="text-[#D1C6BB] text-[11px]">
                      Would you like to reserve them now? We accept Airtel Money, MTN MoMo, or Card on delivery.
                    </p>
                    <span className="text-[9px] text-[#8A8178] block font-mono">20:41 PM • Autonomous</span>
                  </div>
                </div>

                {/* Customer replies */}
                <div className="flex justify-end">
                  <div className="max-w-xs bg-[#1F140D] border border-[#3A2214] p-3 rounded-2xl rounded-tr-none text-white space-y-1">
                    <p>Yes please! Send me the MTN MoMo merchant code.</p>
                    <span className="text-[9px] text-[#8A8178] block text-right font-mono">20:42 PM</span>
                  </div>
                </div>

                {/* AI completes order */}
                <div className="flex justify-start">
                  <div className="max-w-md bg-[#160E08] border border-emerald-500/30 p-3.5 rounded-2xl rounded-tl-none text-[#F2ECE4] space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Payment Prompt & Order Registered</span>
                    </div>
                    <p className="leading-relaxed">
                      Merchant Code: <strong>MTN MoMo: 096 000 0000 (Mupezeni Footwear)</strong>. Total: <strong>K890</strong> (including Avondale delivery).
                    </p>
                    <p className="text-[11px] text-[#A8A099]">
                      Please share your delivery address and recipient name once paid, and your dispatch slip will be generated automatically!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. MARKETING WORKER DEEP DIVE */}
          {activeTab === 'marketing' && (
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0F0805] border border-[#2D1B0F] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Daily Social Creative Preview</span>
                  <span className="text-[10px] font-mono text-[#E58330]">Batch #24</span>
                </div>
                
                {/* Visual Card */}
                <div className="rounded-xl overflow-hidden border border-[#3A2012] bg-[#160D08]">
                  <div className="h-44 bg-gradient-to-br from-[#2D160A] via-[#1A0D06] to-[#0A0503] p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono bg-[#E58330] text-black font-bold px-2 py-0.5 rounded">
                        NEW ARRIVAL SPOTLIGHT
                      </span>
                      <span className="text-[10px] text-white/80 font-mono">1080 x 1080 px</span>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-lg font-black text-white tracking-wide">
                        THE EXECUTIVE CLASSIC
                      </div>
                      <div className="text-xs text-[#E58330] font-mono">
                        Available in Lusaka • 100% Genuine Leather
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#A8A099]">
                      <span>Brand Color Synced</span>
                      <span>Ready for Feed</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#A8A099]">
                  Generated automatically according to your product catalog and store brand colors.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0F0805] border border-[#2D1B0F] space-y-3 text-xs">
                <span className="text-xs font-bold text-white block">Accompanying Sales Copy</span>
                
                <div className="p-3 rounded-lg bg-[#140B06] border border-[#29170D] space-y-2 text-[#D9D1C7] leading-relaxed">
                  <p>
                    "Elevate every step. Designed for the modern professional who demands both timeless elegance and all-day comfort.
                  </p>
                  <p>
                    Hand-burnished leather. Cushioned insole. Ready to make a statement at your next meeting.
                  </p>
                  <p className="text-[#E58330] font-semibold">
                    📍 Shop in store or order via WhatsApp for same-day Lusaka delivery. Drop a DM or message +260 97... to secure your size."
                  </p>
                  <div className="pt-2 text-[10px] text-[#8C8279] font-mono">
                    Tags: #LusakaFashion #ZambianMenStyle #RetailZambia #CorporateStyle
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>~1 Post created daily (up to 30 custom posts per month).</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. BUSINESS INSIGHTS DEEP DIVE */}
          {activeTab === 'insights' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#0F0805] border border-[#29160D]">
                  <span className="text-[10px] font-mono text-[#A8A099] uppercase">Monthly AI Orders</span>
                  <div className="text-xl font-bold text-white font-['Space_Grotesk'] mt-1">142</div>
                  <span className="text-[10px] text-emerald-400 font-mono">+28% this month</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0F0805] border border-[#29160D]">
                  <span className="text-[10px] font-mono text-[#A8A099] uppercase">Revenue Captured</span>
                  <div className="text-xl font-bold text-[#E58330] font-['Space_Grotesk'] mt-1">K114,800</div>
                  <span className="text-[10px] text-emerald-400 font-mono">via Support Worker</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0F0805] border border-[#29160D]">
                  <span className="text-[10px] font-mono text-[#A8A099] uppercase">After-Hours Sales</span>
                  <div className="text-xl font-bold text-white font-['Space_Grotesk'] mt-1">46%</div>
                  <span className="text-[10px] text-[#A8A099] font-mono">7 PM – 6 AM</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0F0805] border border-[#29160D]">
                  <span className="text-[10px] font-mono text-[#A8A099] uppercase">Hours Saved / Wk</span>
                  <div className="text-xl font-bold text-emerald-400 font-['Space_Grotesk'] mt-1">18.5 hrs</div>
                  <span className="text-[10px] text-emerald-400 font-mono">Zero typing DMs</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0F0805] border border-[#29160D] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Stock Restock Predictor</span>
                  <span className="text-[10px] font-mono text-[#E58330]">Proactive Retail Intelligence</span>
                </div>
                <div className="p-3 rounded-lg bg-[#140B06] border border-[#2A160D] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="text-white font-medium">Linen Summer Shirt (Navy / L)</span>
                      <span className="block text-[10px] text-[#A8A099]">3 units remaining • Velocity: 5 units/week</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                    Reorder by Friday
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Dashboard Bottom Action Banner */}
        <div className="mt-2 p-3 bg-[#0B0604] rounded-xl sm:rounded-2xl border border-[#26140A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#A8A099] text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Both AI workers + dashboard included for <strong>K2,000 / month flat</strong>. No setup fee.
            </span>
          </div>

          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#E58330] hover:bg-[#FFA959] text-black font-bold transition-colors shadow-md shadow-[#E58330]/20"
          >
            <span>Deploy This AI Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
