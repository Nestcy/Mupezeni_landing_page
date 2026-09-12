import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Sparkles, 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Package,
  CheckCircle2
} from 'lucide-react';

export const HeroCollaborativeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'support' | 'marketing' | 'operations'>('all');

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl sm:rounded-2xl bg-[#0F0A07]/95 border border-[#9B2208]/40 shadow-xl overflow-hidden backdrop-blur-md transition-all duration-300">
      
      {/* Top Window Bar */}
      <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#150D08] border-b border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-amber-500/80" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1.5 pl-1 border-l border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-white/90 font-syne tracking-wide">
              <span className="font-roboto font-bold">Mupezeni</span> Live OS · 3 Autonomous Teams
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-0.5 rounded-lg bg-[#090604] border border-white/10 text-[9px] sm:text-[11px] font-syne">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${activeTab === 'all' ? 'bg-[#9B2208] text-white font-bold shadow' : 'text-white/60 hover:text-white'}`}
          >
            All Teams
          </button>
          <button 
            onClick={() => setActiveTab('support')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${activeTab === 'support' ? 'bg-[#9B2208] text-white font-bold shadow' : 'text-white/60 hover:text-white'}`}
          >
            Support
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${activeTab === 'marketing' ? 'bg-[#9B2208] text-white font-bold shadow' : 'text-white/60 hover:text-white'}`}
          >
            Marketing
          </button>
          <button 
            onClick={() => setActiveTab('operations')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${activeTab === 'operations' ? 'bg-[#9B2208] text-white font-bold shadow' : 'text-white/60 hover:text-white'}`}
          >
            Ops
          </button>
        </div>
      </div>

      {/* Main Dashboard Workspace - Compact Single Screen Session */}
      <div className="p-2.5 sm:p-4 space-y-2.5 sm:space-y-3">
        
        {/* Real-time 4-Metric Grid */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
          <div className="p-1.5 sm:p-2.5 rounded-lg bg-[#140C07] border border-white/5 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] sm:text-[10px] text-white/60 font-syne truncate">Speed</span>
              <Zap className="w-2.5 h-2.5 text-[#D95A1A]" />
            </div>
            <p className="text-xs sm:text-base font-black font-syne text-white tracking-tight">1.8s</p>
            <span className="text-[7.5px] sm:text-[9px] text-emerald-400 font-medium block truncate">99.4% fast</span>
          </div>

          <div className="p-1.5 sm:p-2.5 rounded-lg bg-[#140C07] border border-white/5 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] sm:text-[10px] text-white/60 font-syne truncate">Night Sales</span>
              <TrendingUp className="w-2.5 h-2.5 text-[#D95A1A]" />
            </div>
            <p className="text-xs sm:text-base font-black font-syne text-white tracking-tight">K6,420</p>
            <span className="text-[7.5px] sm:text-[9px] text-emerald-400 font-medium block truncate">14 orders</span>
          </div>

          <div className="p-1.5 sm:p-2.5 rounded-lg bg-[#140C07] border border-white/5 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] sm:text-[10px] text-white/60 font-syne truncate">Campaigns</span>
              <Sparkles className="w-2.5 h-2.5 text-[#D95A1A]" />
            </div>
            <p className="text-xs sm:text-base font-black font-syne text-white tracking-tight">4 Live</p>
            <span className="text-[7.5px] sm:text-[9px] text-[#D95A1A] font-medium block truncate">IG & WhatsApp</span>
          </div>

          <div className="p-1.5 sm:p-2.5 rounded-lg bg-[#140C07] border border-white/5 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] sm:text-[10px] text-white/60 font-syne truncate">Dispatch</span>
              <Package className="w-2.5 h-2.5 text-[#D95A1A]" />
            </div>
            <p className="text-xs sm:text-base font-black font-syne text-white tracking-tight">18 Ready</p>
            <span className="text-[7.5px] sm:text-[9px] text-white/70 font-medium block truncate">Synced slips</span>
          </div>
        </div>

        {/* 3 AI Teams Live Workstreams (Compact Side-by-Side Deck) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
          
          {/* Stream 1: AI Customer Support Team */}
          {(activeTab === 'all' || activeTab === 'support') && (
            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#130B07] border border-[#9B2208]/30 flex flex-col justify-between space-y-1.5 ${activeTab === 'support' ? 'sm:col-span-3' : ''}`}>
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-[#9B2208]/40 flex items-center justify-center text-[#D95A1A]">
                      <Headphones className="w-3 h-3" />
                    </div>
                    <h4 className="text-[11px] sm:text-xs font-bold font-syne text-white truncate">AI Support Team</h4>
                  </div>
                  <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded bg-[#20100A] text-emerald-400 font-syne font-bold">
                    WhatsApp 24/7
                  </span>
                </div>

                <div className="p-1.5 rounded-md bg-[#1C100A] space-y-1 text-[9px] sm:text-[10px]">
                  <p className="text-white/70 truncate">
                    <strong>Shopper:</strong> "Chelsea Boots Size 42?"
                  </p>
                  <p className="text-white/95 border-t border-white/5 pt-0.5">
                    <strong className="text-[#D95A1A]">AI:</strong> "2 pairs in stock. Kabulonga delivery K40 by 3 PM."
                  </p>
                </div>
              </div>

              <div className="pt-1 border-t border-white/5 flex items-center justify-between text-[8px] sm:text-[9px] text-white/60">
                <span>Checked in 0.4s</span>
                <span className="text-emerald-400 font-bold">✓ Cart Confirmed</span>
              </div>
            </div>
          )}

          {/* Stream 2: AI Marketing Team */}
          {(activeTab === 'all' || activeTab === 'marketing') && (
            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#130B07] border border-[#9B2208]/30 flex flex-col justify-between space-y-1.5 ${activeTab === 'marketing' ? 'sm:col-span-3' : ''}`}>
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-[#B83A0A]/40 flex items-center justify-center text-[#F57C00]">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <h4 className="text-[11px] sm:text-xs font-bold font-syne text-white truncate">AI Marketing Team</h4>
                  </div>
                  <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded bg-[#20100A] text-[#F57C00] font-syne font-bold">
                    Weekend Drop
                  </span>
                </div>

                <div className="p-1.5 rounded-md bg-[#1C100A] space-y-1 text-[9px] sm:text-[10px]">
                  <p className="text-white/80 line-clamp-2">
                    "🔥 New Linen Sets landed. Broadcast generated for 480 VIP shoppers with 1-click checkout."
                  </p>
                </div>
              </div>

              <div className="pt-1 border-t border-white/5 flex items-center justify-between text-[8px] sm:text-[9px] text-white/60">
                <span>Reach: 2,400+ targeted</span>
                <span className="text-[#D95A1A] font-bold">Auto-Publishing</span>
              </div>
            </div>
          )}

          {/* Stream 3: AI Business Management Team */}
          {(activeTab === 'all' || activeTab === 'operations') && (
            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#130B07] border border-[#9B2208]/30 flex flex-col justify-between space-y-1.5 ${activeTab === 'operations' ? 'sm:col-span-3' : ''}`}>
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-[#7A1804]/40 flex items-center justify-center text-[#D95A1A]">
                      <BarChart3 className="w-3 h-3" />
                    </div>
                    <h4 className="text-[11px] sm:text-xs font-bold font-syne text-white truncate">AI Ops Team</h4>
                  </div>
                  <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded bg-[#20100A] text-[#D95A1A] font-syne font-bold">
                    Synced
                  </span>
                </div>

                <div className="p-1.5 rounded-md bg-[#1C100A] space-y-0.5 text-[9px] sm:text-[10px] text-white/80">
                  <div className="flex justify-between">
                    <span>• Orders Logged:</span>
                    <span className="font-bold text-white">18 packs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Low Stock Alert:</span>
                    <span className="text-amber-400 font-medium">Chinos (3 left)</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 border-t border-white/5 flex items-center justify-between text-[8px] sm:text-[9px] text-white/60">
                <span>Slips printed</span>
                <span className="text-white/80 font-bold">100% Automated</span>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Live Collaboration Bar */}
      <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0D0704] border-t border-white/5 flex items-center justify-between text-[8.5px] sm:text-[10px] text-white/60">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D95A1A]" />
          <span className="font-syne text-white/80">
            Real-time multi-agent orchestration across inventory, orders & sales
          </span>
        </div>
        <span className="text-[#D95A1A] font-bold font-syne hidden sm:inline">
          Zero turnover · 24/7 coverage
        </span>
      </div>

    </div>
  );
};
