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
  Database
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
  const [viewMode, setViewMode] = useState<'both' | 'path1' | 'path2'>('both');

  const path1Features = [
    { icon: Store, name: 'Branded Web Store', note: 'Mobile-first storefront' },
    { icon: ShoppingBag, name: 'Product Catalogue', note: 'Variants, sizes & stock' },
    { icon: CreditCard, name: 'MoMo & Card Checkout', note: 'Airtel, MTN & Visa' },
    { icon: MessageSquare, name: 'WhatsApp Commerce', note: '24/7 in-chat catalog & sales' },
    { icon: Share2, name: 'IG & FB Social Shop', note: 'DM-to-checkout automation' },
    { icon: Truck, name: 'Customer Deliveries', note: 'Yango, DHL & local delivery riders' },
    { icon: Bot, name: '3 AI Teams Deployed', note: 'Support, Marketing & Ops' }
  ];

  const path2Features = [
    { icon: Zap, name: 'Shopify 1-Click Sync', note: 'Live orders, products & stock' },
    { icon: Globe, name: 'WooCommerce API', note: 'WordPress native connector' },
    { icon: Store, name: 'Custom Website Embed', note: 'Zero downtime script/API' },
    { icon: Database, name: 'Live Stock & Products', note: 'Real-time stock protection' },
    { icon: Share2, name: 'Existing Social Hub', note: 'WhatsApp, IG & FB unified' },
    { icon: Bot, name: 'AI Teams Activated', note: 'Immediate inquiry offloading' }
  ];

  return (
    <section 
      id="solutions" 
      className="py-8 sm:py-16 lg:py-20 relative bg-[#070503] border-t border-white/5 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#D95A1A]" />
            <span className="text-[10px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Implementation Solutions
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Will Mupezeni Work with <span className="text-gradient-fire">My Business?</span>
          </h2>

          <p className="text-[11px] sm:text-sm md:text-base text-[#FAFAF9]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Yes. Whether starting from a physical shop or upgrading an established online store, choose your tailored implementation path.
          </p>
        </div>

        {/* Mobile View Toggle (Side-by-Side vs Single Path) */}
        <div className="flex sm:hidden justify-center mb-3">
          <div className="inline-flex p-0.5 rounded-lg bg-[#140D08] border border-white/10 text-[10px] font-syne font-bold">
            <button
              onClick={() => setViewMode('both')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'both' ? 'bg-[#24110A] text-white border border-[#9B2208]/50 shadow' : 'text-white/60'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('path1')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'path1' ? 'bg-[#24110A] text-[#D95A1A] border border-[#9B2208]/50 shadow' : 'text-white/60'
              }`}
            >
              Path 01: Build
            </button>
            <button
              onClick={() => setViewMode('path2')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'path2' ? 'bg-[#24110A] text-[#D95A1A] border border-[#9B2208]/50 shadow' : 'text-white/60'
              }`}
            >
              Path 02: Upgrade
            </button>
          </div>
        </div>

        {/* Dual Implementation Paths Grid - Side-by-Side Compact Layout */}
        <div className={`grid gap-2.5 sm:gap-5 lg:gap-6 mb-6 sm:mb-10 ${
          viewMode === 'both' 
            ? 'grid-cols-2 sm:grid-cols-2' 
            : 'grid-cols-1 max-w-lg mx-auto'
        }`}>
          
          {/* Path 1: Build Your Digital Store */}
          {(viewMode === 'both' || viewMode === 'path1') && (
            <div className="p-3 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#160E09] via-[#100A06] to-[#080503] border border-[#9B2208]/60 shadow-lg flex flex-col justify-between relative space-y-2 sm:space-y-4">
              
              <div className="space-y-2 sm:space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-1 pb-1.5 sm:pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white shadow flex-shrink-0">
                      <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                        Path 01
                      </span>
                      <h3 className="text-[11px] sm:text-lg font-black font-syne text-white leading-tight">
                        Build Digital Store
                      </h3>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-[#20100A] text-[#D95A1A] text-[8px] sm:text-[10px] font-syne font-bold border border-[#9B2208]/40 whitespace-nowrap">
                    No Online Store
                  </span>
                </div>

                <p className="text-[9.5px] sm:text-xs text-[#FAFAF9]/75 leading-tight">
                  For physical shops & boutiques. We construct your digital store, payments & deploy your AI workforce.
                </p>

                {/* Features List (Compact Micro-Cards) */}
                <div className="grid grid-cols-1 gap-1 sm:gap-1.5">
                  {path1Features.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-[#190E09]/70 border border-white/5"
                      >
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-[#24110A] text-[#D95A1A] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between gap-1">
                          <span className="text-[9px] sm:text-xs font-bold font-syne text-white truncate">
                            {item.name}
                          </span>
                          <span className="hidden md:inline text-[9px] text-[#FAFAF9]/60 truncate">
                            {item.note}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline & Action Footer */}
              <div className="pt-2 sm:pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5">
                <span className="text-[8.5px] sm:text-[11px] text-[#FAFAF9]/60 font-syne">
                  Timeline: <strong>4–6 Weeks</strong> (Custom Quoted)
                </span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-lg font-syne font-bold text-[9px] sm:text-xs text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:opacity-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Select Path 1</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Path 2: Upgrade Your Existing Business */}
          {(viewMode === 'both' || viewMode === 'path2') && (
            <div className="p-3 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#160E09] via-[#100A06] to-[#080503] border border-[#9B2208]/60 shadow-lg flex flex-col justify-between relative space-y-2 sm:space-y-4">
              
              <div className="space-y-2 sm:space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-1 pb-1.5 sm:pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#24110A] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A] shadow flex-shrink-0">
                      <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                        Path 02
                      </span>
                      <h3 className="text-[11px] sm:text-lg font-black font-syne text-white leading-tight">
                        Upgrade Existing
                      </h3>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-[#20100A] text-[#D95A1A] text-[8px] sm:text-[10px] font-syne font-bold border border-[#9B2208]/40 whitespace-nowrap">
                    Already Online
                  </span>
                </div>

                <p className="text-[9.5px] sm:text-xs text-[#FAFAF9]/75 leading-tight">
                  For brands on Shopify, WooCommerce, or custom sites. We integrate AI directly into your stack.
                </p>

                {/* Features List (Compact Micro-Cards) */}
                <div className="grid grid-cols-1 gap-1 sm:gap-1.5">
                  {path2Features.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-[#190E09]/70 border border-white/5"
                      >
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-[#24110A] text-[#D95A1A] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between gap-1">
                          <span className="text-[9px] sm:text-xs font-bold font-syne text-white truncate">
                            {item.name}
                          </span>
                          <span className="hidden md:inline text-[9px] text-[#FAFAF9]/60 truncate">
                            {item.note}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline & Action Footer */}
              <div className="pt-2 sm:pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5">
                <span className="text-[8.5px] sm:text-[11px] text-[#FAFAF9]/60 font-syne">
                  Timeline: <strong>4–6 Weeks</strong> (Custom Quoted)
                </span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-lg font-syne font-bold text-[9px] sm:text-xs text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:opacity-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Select Path 2</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Action Callout */}
        {showExploreButton && (
          <div className="text-center pt-1 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('solutions')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-syne font-bold text-[11px] sm:text-xs text-white bg-[#170E09] hover:bg-[#22130B] border border-[#9B2208]/40 transition-all cursor-pointer"
            >
              <span>Explore Full Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D95A1A]" />
            </button>
            
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-syne font-black text-[11px] sm:text-xs text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:opacity-95 transition-all cursor-pointer shadow whitespace-nowrap"
            >
              <span>Book My AI Growth Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
