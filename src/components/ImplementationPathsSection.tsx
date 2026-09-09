import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Store, 
  RefreshCw, 
  ShoppingBag, 
  CreditCard, 
  MessageSquare, 
  Share2, 
  Truck, 
  Bot, 
  Check, 
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
  const [activeTab, setActiveTab] = useState<'build' | 'upgrade'>('build');

  const path1Features = [
    {
      icon: Store,
      title: 'Online store',
      desc: 'Clean, fast, mobile-optimized digital storefront branded for your business.'
    },
    {
      icon: ShoppingBag,
      title: 'Product catalogue',
      desc: 'Complete digital inventory organized with clear variants, sizes, and photos.'
    },
    {
      icon: CreditCard,
      title: 'Payment setup',
      desc: 'Seamless checkout via Mobile Money (Airtel/MTN) and Debit/Credit cards.'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp integration',
      desc: 'Automated 24/7 product browsing, consultation, and ordering in WhatsApp.'
    },
    {
      icon: Share2,
      title: 'Facebook & Instagram integration',
      desc: 'Direct DM-to-checkout automation across all your social channels.'
    },
    {
      icon: Truck,
      title: 'Delivery integration',
      desc: 'Automated dispatch routing with Yango Delivery, DHL, and local courier riders.'
    },
    {
      icon: Bot,
      title: 'AI Team deployment',
      desc: 'All three AI Teams (Support, Marketing, Management) activated and operating 24/7.'
    }
  ];

  const path2Features = [
    {
      icon: Zap,
      title: 'Shopify integration',
      desc: 'Instant 1-click connector with your live Shopify products, orders, and customer data.'
    },
    {
      icon: Globe,
      title: 'WooCommerce integration',
      desc: 'Native synchronization with your WordPress and WooCommerce storefront.'
    },
    {
      icon: Store,
      title: 'Existing website integration',
      desc: 'Lightweight API or script embeds into any custom web platform with zero disruption.'
    },
    {
      icon: Database,
      title: 'Existing catalogue integration',
      desc: 'Live bi-directional sync with your current inventory levels and stock feeds.'
    },
    {
      icon: Share2,
      title: 'Existing social channels',
      desc: 'Connects directly to your established WhatsApp Business, Instagram, and Facebook.'
    },
    {
      icon: Bot,
      title: 'AI Team deployment',
      desc: 'AI Teams take over repetitive inquiries, daily marketing, and reporting immediately.'
    }
  ];

  return (
    <section 
      id="solutions" 
      className="py-14 sm:py-24 lg:py-32 relative bg-[#070503] border-t border-white/5 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span className="text-[11px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Implementation Solutions
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Will Mupezeni Work with{' '}
            <span className="text-gradient-fire block sm:inline">
              My Business?
            </span>
          </h2>

          <p className="text-xs sm:text-base lg:text-lg text-[#FAFAF9]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Yes. Whether you are starting from a physical shop with no online presence or running an established e-commerce brand, Mupezeni provides two tailored implementation paths.
          </p>
        </div>

        {/* Mobile Segmented Switcher */}
        <div className="flex lg:hidden justify-center mb-8">
          <div className="inline-flex p-1 rounded-2xl bg-[#140D08] border border-white/10 w-full max-w-md">
            <button
              onClick={() => setActiveTab('build')}
              className={`flex-1 py-2.5 px-3 rounded-xl font-syne font-bold text-xs transition-all ${
                activeTab === 'build'
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow-md'
                  : 'text-[#FAFAF9]/70 hover:text-white'
              }`}
            >
              Path 1: Build Digital Store
            </button>
            <button
              onClick={() => setActiveTab('upgrade')}
              className={`flex-1 py-2.5 px-3 rounded-xl font-syne font-bold text-xs transition-all ${
                activeTab === 'upgrade'
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow-md'
                  : 'text-[#FAFAF9]/70 hover:text-white'
              }`}
            >
              Path 2: Upgrade Existing
            </button>
          </div>
        </div>

        {/* Dual Implementation Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          
          {/* Path 1: Build Your Digital Retail Business */}
          <div 
            className={`p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#140D08] via-[#0E0906] to-[#080503] border transition-all duration-300 flex flex-col justify-between relative ${
              activeTab === 'build' ? 'border-[#9B2208] shadow-2xl shadow-[#9B2208]/20' : 'border-white/10 hidden lg:flex'
            }`}
          >
            {/* Top Indicator */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white shadow-md shadow-[#9B2208]/30 flex-shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                      Implementation Path 01
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black font-syne text-white">
                      Build Your Digital Retail Business
                    </h3>
                  </div>
                </div>
              </div>

              {/* Sub-label */}
              <div className="px-3 py-1.5 rounded-lg bg-[#20100A] border border-[#9B2208]/40 inline-block text-xs font-syne font-semibold text-[#D95A1A]">
                For businesses without an online presence
              </div>

              <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
                If you currently sell only from a physical shop, boutique, or personal messaging, we build your complete end-to-end digital sales infrastructure and deploy your AI workforce.
              </p>

              {/* Features List */}
              <div className="space-y-3 pt-2">
                {path1Features.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-[#170E09]/70 border border-white/5 hover:border-[#9B2208]/40 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#24110A] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A] flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold font-syne text-white">
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#FAFAF9]/70 leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#FAFAF9]/60 font-syne">
                Timeline: Go-live in 3 to 5 business days
              </span>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D95A1A] hover:text-[#FAFAF9] transition-colors cursor-pointer font-syne"
              >
                <span>Choose Path 1</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Path 2: Upgrade Your Existing Business */}
          <div 
            className={`p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#140D08] via-[#0E0906] to-[#080503] border transition-all duration-300 flex flex-col justify-between relative ${
              activeTab === 'upgrade' ? 'border-[#9B2208] shadow-2xl shadow-[#9B2208]/20' : 'border-white/10 hidden lg:flex'
            }`}
          >
            {/* Top Indicator */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#24110A] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A] shadow-md flex-shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">
                      Implementation Path 02
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black font-syne text-white">
                      Upgrade Your Existing Business
                    </h3>
                  </div>
                </div>
              </div>

              {/* Sub-label */}
              <div className="px-3 py-1.5 rounded-lg bg-[#20100A] border border-[#9B2208]/40 inline-block text-xs font-syne font-semibold text-[#D95A1A]">
                For businesses already online
              </div>

              <p className="text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed">
                If you already run a website, Shopify, WooCommerce, or active social sales pages, we integrate directly with your existing stack. Zero migration headache, zero downtime.
              </p>

              {/* Features List */}
              <div className="space-y-3 pt-2">
                {path2Features.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-[#170E09]/70 border border-white/5 hover:border-[#9B2208]/40 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#24110A] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A] flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold font-syne text-white">
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#FAFAF9]/70 leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#FAFAF9]/60 font-syne">
                Timeline: Direct API setup in 48 hours
              </span>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D95A1A] hover:text-[#FAFAF9] transition-colors cursor-pointer font-syne"
              >
                <span>Choose Path 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Action Callout */}
        {showExploreButton && (
          <div className="text-center pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('solutions')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-syne font-bold text-xs sm:text-sm text-white bg-[#170E09] hover:bg-[#22130B] border border-[#9B2208]/40 hover:border-[#9B2208]/80 transition-all cursor-pointer"
            >
              <span>Explore Detailed Solutions Architecture</span>
              <ArrowRight className="w-4 h-4 text-[#D95A1A]" />
            </button>
            
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-xl hover:shadow-[#9B2208]/30 transition-all cursor-pointer"
            >
              <span>Book Your Implementation Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
