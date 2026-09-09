import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Sparkles, 
  BarChart3, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ShoppingBag, 
  Share2, 
  Flame, 
  Bot, 
  ArrowUpRight,
  ShieldCheck,
  Package,
  Layers
} from 'lucide-react';

export const HeroCollaborativeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'support' | 'marketing' | 'operations'>('all');
  const [chatStep, setChatStep] = useState(0);

  // Simulated live conversation ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setChatStep(prev => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 sm:mt-12 rounded-xl sm:rounded-3xl bg-[#0F0A07]/90 border border-[#9B2208]/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-xl transition-all duration-300">
      
      {/* Top Window Bar */}
      <div className="px-3 py-2 sm:px-6 sm:py-3.5 bg-[#150D08] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-white/30 text-xs hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-white/90 font-syne tracking-wide">
              Mupezeni Live OS · 3 Teams
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-[#090604] border border-white/10 text-[9px] sm:text-xs font-syne">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg transition-all cursor-pointer ${activeTab === 'all' ? 'bg-[#9B2208] text-white font-bold' : 'text-white/60 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('support')}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg transition-all cursor-pointer ${activeTab === 'support' ? 'bg-[#9B2208] text-white font-bold' : 'text-white/60 hover:text-white'}`}
          >
            Support
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg transition-all cursor-pointer ${activeTab === 'marketing' ? 'bg-[#9B2208] text-white font-bold' : 'text-white/60 hover:text-white'}`}
          >
            Marketing
          </button>
          <button 
            onClick={() => setActiveTab('operations')}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg transition-all cursor-pointer ${activeTab === 'operations' ? 'bg-[#9B2208] text-white font-bold' : 'text-white/60 hover:text-white'}`}
          >
            Ops
          </button>
        </div>
      </div>

      {/* Main Dashboard Workspace */}
      <div className="p-3 sm:p-6 lg:p-8 space-y-3 sm:space-y-6">
        
        {/* Real-time Status Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#140C07] border border-white/5 space-y-0.5 sm:space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-xs text-white/60 font-syne truncate">Response Time</span>
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D95A1A]" />
            </div>
            <p className="text-base sm:text-2xl font-black font-syne text-white tracking-tight">1.8s</p>
            <span className="text-[9px] sm:text-[10px] text-emerald-400 font-medium block truncate">99.4% answered</span>
          </div>

          <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#140C07] border border-white/5 space-y-0.5 sm:space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-xs text-white/60 font-syne truncate">Night Sales</span>
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D95A1A]" />
            </div>
            <p className="text-base sm:text-2xl font-black font-syne text-white tracking-tight">K 6,420</p>
            <span className="text-[9px] sm:text-[10px] text-emerald-400 font-medium block truncate">14 night orders</span>
          </div>

          <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#140C07] border border-white/5 space-y-0.5 sm:space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-xs text-white/60 font-syne truncate">Campaigns</span>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D95A1A]" />
            </div>
            <p className="text-base sm:text-2xl font-black font-syne text-white tracking-tight">4 Live</p>
            <span className="text-[9px] sm:text-[10px] text-[#D95A1A] font-medium block truncate">IG & WhatsApp drops</span>
          </div>

          <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#140C07] border border-white/5 space-y-0.5 sm:space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-xs text-white/60 font-syne truncate">Dispatch</span>
              <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D95A1A]" />
            </div>
            <p className="text-base sm:text-2xl font-black font-syne text-white tracking-tight">18 Ready</p>
            <span className="text-[9px] sm:text-[10px] text-white/70 font-medium block truncate">Synced manifests</span>
          </div>
        </div>

        {/* The 3 AI Teams Live Workstreams */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5">
          
          {/* Stream 1: AI Customer Support Team (Span 4) */}
          {(activeTab === 'all' || activeTab === 'support') && (
            <div className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#130B07] border border-[#9B2208]/30 space-y-2.5 sm:space-y-3 flex flex-col justify-between ${activeTab === 'support' ? 'lg:col-span-12' : 'lg:col-span-4'}`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#9B2208]/40 border border-[#9B2208]/60 flex items-center justify-center text-[#D95A1A]">
                      <Headphones className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold font-syne text-white">AI Support Team</h4>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Replying on WhatsApp
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#20100A] text-[#D95A1A] font-syne font-bold">
                    Active
                  </span>
                </div>

                {/* Simulated Conversation Bubble */}
                <div className="space-y-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-[#1C100A] text-white/90 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-white/50">
                      <span>Shopper (WhatsApp)</span>
                      <span>Just now</span>
                    </div>
                    <p className="text-[11px] text-white">
                      "Hi! Do you have the Chelsea Boots in Size 42, and can you deliver to Kabulonga today?"
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#24120A] border border-[#9B2208]/40 text-white space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-[#D95A1A] font-bold font-syne">
                      <span>AI Support Team</span>
                      <span>&lt;2s reply</span>
                    </div>
                    <p className="text-[11px] text-white/95">
                      "Yes! We have 2 pairs in Size 42 ready in-store. Delivery to Kabulonga is K40 via our rider today before 3 PM. Shall I reserve your pair and send the payment prompt?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/60">
                <span>Stock checked in 0.4s</span>
                <span className="text-emerald-400 font-bold">✓ Cart Confirmed</span>
              </div>
            </div>
          )}

          {/* Stream 2: AI Marketing Team (Span 4) */}
          {(activeTab === 'all' || activeTab === 'marketing') && (
            <div className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#130B07] border border-[#9B2208]/30 space-y-2.5 sm:space-y-3 flex flex-col justify-between ${activeTab === 'marketing' ? 'lg:col-span-12' : 'lg:col-span-4'}`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#B83A0A]/40 border border-[#B83A0A]/60 flex items-center justify-center text-[#F57C00]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold font-syne text-white">AI Marketing Team</h4>
                      <span className="text-[10px] text-[#D95A1A] font-medium">
                        Generating Weekend Drop
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#20100A] text-[#F57C00] font-syne font-bold">
                    Campaign Live
                  </span>
                </div>

                {/* Campaign Card Preview */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-[#1C100A] border border-white/5 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-white font-syne">Weekend Flash Sale Drop</span>
                    <span className="text-emerald-400">Scheduled 10:00 AM</span>
                  </div>
                  <p className="text-[11px] text-white/80 leading-relaxed">
                    "🔥 New Arrival Alert: 15 curated linen sets just landed. VIP broadcast generated for 480 past shoppers with 1-click WhatsApp order buttons."
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#2A130A] text-[10px] text-[#D95A1A] font-syne">
                      Target: Past Buyers
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#2A130A] text-[10px] text-[#D95A1A] font-syne">
                      Budget: Approved
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/60">
                <span>Reach: 2,400+ targeted shoppers</span>
                <span className="text-[#D95A1A] font-bold">Auto-Publishing</span>
              </div>
            </div>
          )}

          {/* Stream 3: AI Business Management Team (Span 4) */}
          {(activeTab === 'all' || activeTab === 'operations') && (
            <div className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#130B07] border border-[#9B2208]/30 space-y-2.5 sm:space-y-3 flex flex-col justify-between ${activeTab === 'operations' ? 'lg:col-span-12' : 'lg:col-span-4'}`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#7A1804]/40 border border-[#9B2208]/60 flex items-center justify-center text-[#D95A1A]">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold font-syne text-white">AI Operations Team</h4>
                      <span className="text-[10px] text-white/60 font-medium">
                        Store Analytics & Slips
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#20100A] text-[#D95A1A] font-syne font-bold">
                    Synced
                  </span>
                </div>

                {/* Operations Updates */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-[#1C100A] border border-white/5 space-y-1.5 sm:space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-white font-syne">Daily Operations Briefing</span>
                    <span className="text-white/40">Updated 2m ago</span>
                  </div>
                  <ul className="space-y-1 sm:space-y-1.5 text-[11px] text-white/80">
                    <li className="flex items-center justify-between">
                      <span>• Morning Orders Logged:</span>
                      <span className="font-bold text-white">18 packages</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>• Low Inventory Alert:</span>
                      <span className="text-amber-400 font-medium">Khaki Chinos (3 left)</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>• Rider Dispatch Manifests:</span>
                      <span className="text-emerald-400 font-medium">Generated & Printed</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/60">
                <span>Owner Dashboard Synchronized</span>
                <span className="text-white/80 font-bold">100% Automated</span>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Live Collaboration Bar */}
      <div className="px-3 py-2 sm:px-6 sm:py-3 bg-[#0D0704] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left text-[10px] sm:text-xs text-white/60">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D95A1A]" />
          <span className="font-syne text-white/80 text-[10px] sm:text-xs">
            Real-time multi-agent orchestration: all 3 teams share inventory, orders, and customer history.
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] text-[#D95A1A] font-bold font-syne">
          Zero employee turnover · 24/7 responsiveness
        </span>
      </div>

    </div>
  );
};
