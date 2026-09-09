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
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Globe, 
  Database,
  Clock,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { PageId } from '../types';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';

interface SolutionsPageProps {
  onNavigate: (page: PageId) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate }) => {
  const [selectedPath, setSelectedPath] = useState<'path1' | 'path2'>('path1');

  const path1Detailed = [
    {
      title: '1. Online Store Built for Your Brand',
      badge: 'Zero Code Required',
      description: 'We build a high-converting, mobile-first digital storefront matching your brand identity so customers can discover, browse, and buy from any device.',
      deliverables: ['Custom domain & branded styling', 'Lightning-fast mobile load speed', 'Automated search & category filters']
    },
    {
      title: '2. Complete Digital Product Catalogue',
      badge: 'Organized Inventory',
      description: 'Your physical inventory is photographed, categorized, and uploaded with accurate descriptions, sizes, colors, and live stock tracking.',
      deliverables: ['SKU & variant management', 'Stock alert thresholds', 'High-definition image galleries']
    },
    {
      title: '3. Automated Payment Setup',
      badge: 'Instant Collections',
      description: 'Direct integration with local and international payment methods, ensuring you never miss a sale due to checkout friction.',
      deliverables: ['Airtel Money & MTN MoMo integrations', 'Visa & Mastercard processing', 'Instant payment verification notices']
    },
    {
      title: '4. WhatsApp Commerce Integration',
      badge: 'High-Intent Channel',
      description: 'Connect your business number to automated 24/7 product browsing, size verification, and payment link generation directly inside WhatsApp chat.',
      deliverables: ['Official WhatsApp Business API setup', 'Automated product catalog in chat', 'Instant payment confirmation receipts']
    },
    {
      title: '5. Facebook & Instagram Integration',
      badge: 'Social Sales Engine',
      description: 'Turn your social media accounts into active sales funnels. Every comment, direct message, or post mention is captured and converted.',
      deliverables: ['Instagram DM-to-checkout automation', 'Facebook Page Messenger shop link', 'Automatic responses to price/size comments']
    },
    {
      title: '6. Delivery Dispatch Integration',
      badge: 'Last-Mile Fulfillment',
      description: 'Orders automatically generate delivery slips and dispatch alerts routed directly to Yango Delivery, DHL, or your trusted local courier riders.',
      deliverables: ['Automated delivery slip generation', 'Customer live tracking updates', 'Courier notification via WhatsApp']
    },
    {
      title: '7. AI Team Deployment',
      badge: 'Autonomous Workforce',
      description: 'Deploy all three Mupezeni AI Teams to serve customers, publish marketing materials, and track store performance 24 hours a day, 7 days a week.',
      deliverables: ['24/7 AI Customer Support Team', 'AI Creative Marketing Department', 'AI Business Management & Daily Reports']
    }
  ];

  const path2Detailed = [
    {
      title: '1. Shopify Store Integration',
      badge: '1-Click API Connector',
      description: 'Direct API integration with your existing Shopify store. Syncs live products, inventory counts, collections, and order fulfillment in real time.',
      deliverables: ['Zero-code Shopify webhook setup', 'Live product stock synchronization', 'Automated order status checking']
    },
    {
      title: '2. WooCommerce Store Integration',
      badge: 'WordPress Native',
      description: 'Native connector for WordPress and WooCommerce storefronts, ensuring instantaneous stock updates and frictionless conversational checkout.',
      deliverables: ['Secure WooCommerce REST API sync', 'Database inventory mapping', 'Multi-currency checkout support']
    },
    {
      title: '3. Custom Website & Storefront Integration',
      badge: 'Flexible Embeds',
      description: 'Have a custom web application or legacy portal? Our lightweight APIs and webhook bridges plug into your stack with zero architectural rework.',
      deliverables: ['REST & Webhook endpoints', 'Lightweight client-side script', 'Custom backend data connectors']
    },
    {
      title: '4. Existing Catalogue & Stock Feed Sync',
      badge: 'Real-Time Sync',
      description: 'Connects directly to your existing product database, Google Sheets, or ERP system so your AI Teams always quote exact pricing and available stock.',
      deliverables: ['Bi-directional inventory sync', 'Price change propagation in seconds', 'Out-of-stock prevention safeguards']
    },
    {
      title: '5. Existing Social Channels Handshake',
      badge: 'Multi-Channel Unification',
      description: 'We plug your existing WhatsApp Business number, Instagram account, and Facebook Page into one synchronized AI coordination hub.',
      deliverables: ['Unified inbox across all channels', 'Zero loss of existing chat histories', 'Seamless human escalation fallback']
    },
    {
      title: '6. AI Team Deployment & Calibration',
      badge: 'Brand Voice Aligned',
      description: 'We train your AI Teams on your historical customer service transcripts, return policies, and product details for instant, accurate execution.',
      deliverables: ['Custom brand voice calibration', 'Immediate offloading of 80%+ inquiries', 'Night & weekend autonomous coverage']
    }
  ];

  const faqs = [
    {
      q: 'I only operate a physical boutique with a personal phone. Is Mupezeni too advanced for me?',
      a: 'Not at all. Implementation Path 1 is specifically engineered for you. We handle everything from creating your digital store and payment setup to deploying your AI Teams so you can start making sales online while keeping your physical store running smoothly.'
    },
    {
      q: 'We already have an active Shopify store and staff. Will this disrupt our daily operations?',
      a: 'Zero disruption. Implementation Path 2 connects seamlessly via official APIs in under 48 hours. Your existing team continues using your current Shopify dashboard, while Mupezeni’s AI Teams handle the repetitive customer queries, social outreach, and late-night inquiries.'
    },
    {
      q: 'How long does implementation take from consultation to go-live?',
      a: 'For businesses without an online store (Path 1), the complete setup and AI deployment takes 3 to 5 business days. For businesses with an existing website or Shopify store (Path 2), integration typically takes 48 hours.'
    },
    {
      q: 'Can we still use our own delivery riders and local couriers?',
      a: 'Yes. Our delivery integration can connect directly with your existing courier contacts, or we can integrate automated dispatch with providers like Yango Delivery and DHL.'
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-[#070503] min-h-screen text-[#FAFAF9]">
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#9B2208]/20 via-[#D95A1A]/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span className="text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Implementation Solutions
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.1]">
            Will Mupezeni Work with{' '}
            <span className="text-gradient-fire block sm:inline">
              Your Business?
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-[#FAFAF9]/80 max-w-3xl mx-auto leading-relaxed">
            Yes. Every retail business is at a different stage of digital maturity. We provide two engineered implementation paths so you can deploy an AI workforce without technical friction or operational disruption.
          </p>

          {/* Interactive Path Toggle */}
          <div className="pt-6 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#140D08] border border-white/10 shadow-xl max-w-xl w-full">
              <button
                onClick={() => setSelectedPath('path1')}
                className={`flex-1 py-3 px-4 rounded-xl font-syne font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  selectedPath === 'path1'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow-lg shadow-[#9B2208]/30'
                    : 'text-[#FAFAF9]/70 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Path 1: Build Digital Store</span>
              </button>
              
              <button
                onClick={() => setSelectedPath('path2')}
                className={`flex-1 py-3 px-4 rounded-xl font-syne font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  selectedPath === 'path2'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow-lg shadow-[#9B2208]/30'
                    : 'text-[#FAFAF9]/70 hover:text-white'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Path 2: Upgrade Existing Store</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Implementation Path Breakdown */}
      <section className="py-8 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {selectedPath === 'path1' ? (
            /* PATH 1 CONTENT */
            <motion.div
              key="path1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Path Overview Banner */}
              <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1C0F0A] via-[#140C07] to-[#0A0704] border border-[#9B2208] shadow-2xl relative overflow-hidden">
                <div className="max-w-3xl space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                    Implementation Path 01
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black font-syne text-white">
                    Build Your Digital Retail Business
                  </h2>
                  <p className="text-xs sm:text-base text-[#FAFAF9]/80 leading-relaxed">
                    Designed for retailers currently operating exclusively from physical shops, showrooms, or personal messaging. We construct your entire digital retail ecosystem and launch your autonomous AI Teams.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold font-syne text-[#D95A1A]">
                    <span className="px-3 py-1 rounded-full bg-[#24110A] border border-[#9B2208]/40">Physical Boutiques</span>
                    <span className="px-3 py-1 rounded-full bg-[#24110A] border border-[#9B2208]/40">Wholesalers & Distributors</span>
                    <span className="px-3 py-1 rounded-full bg-[#24110A] border border-[#9B2208]/40">Walk-in Retailers</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Architecture Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {path1Detailed.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-7 rounded-2xl bg-[#110A07] border border-white/5 hover:border-[#9B2208]/50 transition-all duration-200 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-bold font-syne px-2.5 py-1 rounded-full bg-[#1C0F0A] text-[#D95A1A] border border-[#9B2208]/30">
                          {step.badge}
                        </span>
                        <span className="text-xs font-mono text-white/40">Step 0{idx + 1}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-syne text-white group-hover:text-[#FAFAF9]">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FAFAF9]/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 space-y-1.5">
                      {step.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-[#FAFAF9]/85 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* PATH 2 CONTENT */
            <motion.div
              key="path2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Path Overview Banner */}
              <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1C0F0A] via-[#140C07] to-[#0A0704] border border-[#9B2208] shadow-2xl relative overflow-hidden">
                <div className="max-w-3xl space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                    Implementation Path 02
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black font-syne text-white">
                    Upgrade Your Existing Business
                  </h2>
                  <p className="text-xs sm:text-base text-[#FAFAF9]/80 leading-relaxed">
                    Designed for brands already selling online via Shopify, WooCommerce, or custom storefronts. We integrate our AI workforce directly into your current tech stack with zero downtime and no migration hassles.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold font-syne text-[#D95A1A]">
                    <span className="px-3 py-1 rounded-full bg-[#24110A] border border-[#9B2208]/40">Shopify Stores</span>
                    <span className="px-3 py-1 rounded-full bg-[#24110A] border border-[#9B2208]/40">WooCommerce / WordPress</span>
                    <span className="px-3 py-1 rounded-full bg-[#24110A] border border-[#9B2208]/40">Custom E-commerce Sites</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Architecture Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {path2Detailed.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-7 rounded-2xl bg-[#110A07] border border-white/5 hover:border-[#9B2208]/50 transition-all duration-200 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-bold font-syne px-2.5 py-1 rounded-full bg-[#1C0F0A] text-[#D95A1A] border border-[#9B2208]/30">
                          {step.badge}
                        </span>
                        <span className="text-xs font-mono text-white/40">Step 0{idx + 1}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-syne text-white group-hover:text-[#FAFAF9]">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FAFAF9]/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 space-y-1.5">
                      {step.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-[#FAFAF9]/85 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* Implementation FAQs */}
      <section className="py-12 sm:py-20 border-t border-white/5 bg-[#050302]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-3xl font-black font-syne text-white">
              Implementation Questions Answered
            </h3>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/70">
              Clear answers on how Mupezeni integrates with your everyday retail workflow.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#0D0805] border border-white/5 space-y-2"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-[#D95A1A] flex-shrink-0 mt-1" />
                  <h4 className="text-sm sm:text-base font-bold font-syne text-white">
                    {faq.q}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#FAFAF9]/75 pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Integration Banner */}
      <section className="py-12 border-t border-white/10 bg-gradient-to-r from-[#170B06] via-[#1F0E08] to-[#170B06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F0805]/90 border border-[#9B2208]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20110A] border border-[#9B2208]/50 text-[#D95A1A] text-xs font-bold font-syne">
                <span>Predictable Transparent Pricing</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-syne text-white">
                Both Paths Start at K5,000 /month
              </h3>
              <p className="text-xs sm:text-sm text-[#FAFAF9]/75 max-w-xl">
                No per-message surcharges or hidden license fees. Complete 24/7 AI Support, Marketing, and Operations with setup included.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => onNavigate('pricing')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-syne font-bold text-xs sm:text-sm text-white bg-[#20100A] border border-[#9B2208] hover:border-[#D95A1A] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>View Full Pricing Plan</span>
                <ArrowRight className="w-4 h-4 text-[#D95A1A]" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-syne font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:shadow-lg hover:shadow-[#9B2208]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Call to Action */}
      <ConsultationCtaSection
        onNavigateToContact={() => onNavigate('contact')}
      />

    </div>
  );
};
