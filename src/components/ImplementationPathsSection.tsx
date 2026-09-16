import React, { useState } from 'react';
import { 
  Store, 
  RefreshCw, 
  ShoppingBag, 
  CreditCard, 
  MessageSquare, 
  Share2, 
  Truck, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Zap,
  Globe,
  Database,
  Clock
} from 'lucide-react';
import { PageId } from '../types';

interface ImplementationPathsSectionProps {
  onNavigate: (page: PageId) => void;
  showExploreButton?: boolean;
}

export const ImplementationPathsSection: React.FC<ImplementationPathsSectionProps> = ({ 
  onNavigate,
  showExploreButton = true 
}) => {
  const [viewMode, setViewMode] = useState<'path1' | 'path2' | 'both'>('path1');

  const path1Features = [
    { icon: Store, name: 'Branded Web Store', note: 'Mobile-first storefront' },
    { icon: ShoppingBag, name: 'Product Catalogue', note: 'Variants, sizes & stock' },
    { icon: CreditCard, name: 'MoMo & Card Checkout', note: 'Airtel, MTN & Visa' },
    { icon: MessageSquare, name: 'WhatsApp Commerce', note: '24/7 in-chat catalog & sales' },
    { icon: Share2, name: 'IG & FB Social Shop', note: 'DM-to-checkout automation' },
    { icon: Truck, name: 'Customer Deliveries', note: 'Yango & local riders' },
    { icon: Bot, name: 'AI Workforce Deployed', note: 'Support, Marketing & Insights' }
  ];

  const path2Features = [
    { icon: Zap, name: 'Shopify 1-Click Sync', note: 'Live orders & stock' },
    { icon: Globe, name: 'WooCommerce API', note: 'WordPress native sync' },
    { icon: Store, name: 'Custom Site Embed', note: 'Zero downtime script' },
    { icon: Database, name: 'Live Stock & Products', note: 'Stock protection' },
    { icon: Share2, name: 'Existing Social Hub', note: 'WhatsApp & IG unified' },
    { icon: Bot, name: 'AI Workforce Activated', note: 'Support, Marketing & Insights' }
  ];

  return (
    <section 
      id="solutions" 
      className="py-8 sm:py-16 lg:py-20 relative bg-[#070503] border-t border-white/5 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#D95A1A]" />
            <span className="text-[10px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Implementation Solutions
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Will <span className="font-roboto font-bold">Mupezeni</span> Work with <span className="text-gradient-fire">My Business?</span>
          </h2>

          <p className="text-[11px] sm:text-sm md:text-base text-[#FAFAF9]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Yes. Whether starting from a physical boutique or upgrading an established online store, choose your tailored implementation path.
          </p>
        </div>

        {/* Path View Toggle */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex p-1 rounded-xl bg-[#140D08] border border-white/10 text-[11px] font-syne font-bold">
            <button
              onClick={() => setViewMode('path1')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'path1' ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow-md' : 'text-white/60 hover:text-white'
              }`}
            >
              Path 01: Physical Store
            </button>
            <button
              onClick={() => setViewMode('path2')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'path2' ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow-md' : 'text-white/60 hover:text-white'
              }`}
            >
              Path 02: Already Online
            </button>
            <button
              onClick={() => setViewMode('both')}
              className={`hidden sm:inline-block px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'both' ? 'bg-[#24110A] text-white border border-[#9B2208]/50 shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              Side-by-Side
            </button>
          </div>
        </div>

        {/* Dual Implementation Paths Grid */}
        <div className={`grid gap-4 sm:gap-6 mb-6 sm:mb-10 ${
          viewMode === 'both' 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 max-w-2xl mx-auto'
        }`}>
          
          {/* Path 1: Build Your Digital Store */}
          {(viewMode === 'both' || viewMode === 'path1') && (
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[#160E09] via-[#100A06] to-[#080503] border border-[#9B2208]/60 shadow-xl flex flex-col justify-between relative space-y-4">
              
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white shadow flex-shrink-0">
                      <Store className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                        Path 01 · Physical Shop
                      </span>
                      <h3 className="text-sm sm:text-xl font-black font-syne text-white leading-tight">
                        Build Your Digital Store
                      </h3>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#20100A] text-[#D95A1A] text-[9px] sm:text-xs font-syne font-bold border border-[#9B2208]/40 whitespace-nowrap">
                    No Website Needed
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
                  For physical shops, boutiques, and retail outlets. We construct your digital store, payments & deploy your complete AI workforce.
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1">
                  {path1Features.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 p-2 rounded-xl bg-[#190E09]/70 border border-white/5"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#24110A] text-[#D95A1A] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold font-syne text-white block truncate">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#FAFAF9]/60 block truncate">
                            {item.note}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline & Action Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="text-xs font-syne text-[#FAFAF9]/80 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D95A1A]" />
                  <span>Timeline: <strong className="text-white font-bold">4–6 Weeks to Live</strong></span>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="py-2 px-3.5 sm:px-4 rounded-xl font-syne font-bold text-xs text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <span>Select Path 1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Path 2: Upgrade Your Existing Business */}
          {(viewMode === 'both' || viewMode === 'path2') && (
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[#160E09] via-[#100A06] to-[#080503] border border-[#9B2208]/60 shadow-xl flex flex-col justify-between relative space-y-4">
              
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#24110A] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A] shadow flex-shrink-0">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                        Path 02 · Existing Store
                      </span>
                      <h3 className="text-sm sm:text-xl font-black font-syne text-white leading-tight">
                        Upgrade Existing Business
                      </h3>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#20100A] text-[#D95A1A] text-[9px] sm:text-xs font-syne font-bold border border-[#9B2208]/40 whitespace-nowrap">
                    Already Online
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
                  For brands on Shopify, WooCommerce, or custom sites. We integrate AI directly into your stack with zero downtime.
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1">
                  {path2Features.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 p-2 rounded-xl bg-[#190E09]/70 border border-white/5"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#24110A] text-[#D95A1A] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold font-syne text-white block truncate">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#FAFAF9]/60 block truncate">
                            {item.note}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline & Action Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="text-xs font-syne text-[#FAFAF9]/80 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D95A1A]" />
                  <span>Timeline: <strong className="text-white font-bold">4–6 Weeks to Live</strong></span>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="py-2 px-3.5 sm:px-4 rounded-xl font-syne font-bold text-xs text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <span>Select Path 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Action Callout */}
        {showExploreButton && (
          <div className="text-center pt-1 flex items-center justify-center">
            <button
              onClick={() => onNavigate('solutions')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-syne font-bold text-xs text-white bg-[#170E09] hover:bg-[#22130B] border border-[#9B2208]/40 hover:border-[#D95A1A]/60 transition-all cursor-pointer shadow"
            >
              <span>Explore Full Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D95A1A]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
