import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  X,
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  CalendarCheck,
  Store,
  RefreshCw,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  Zap,
  RotateCcw,
  TrendingUp,
  Share2,
  Coins
} from 'lucide-react';
import { PageId, ConsultationBookingData, CurrencyMode } from '../types';
import { PRICING_TIERS } from '../data/websiteData';
import { EconomicComparisonTable } from '../components/EconomicComparisonTable';
import { MoneyBackGuaranteeBanner } from '../components/MoneyBackGuaranteeBanner';
import { AnimatedPriceTicker } from '../components/AnimatedPriceTicker';
import { 
  generateWhatsAppBookingUrl, 
  generateMailtoLink,
  sendConsultationEmailNotification,
  saveConsultationToFirestore
} from '../services/consultationService';

interface ConsultationFormData {
  businessName: string;
  ownerName: string;
  phoneNumber: string;
  phoneCountryCode: string;
  email: string;
  currentMonthlySales: string;
  biggestOperationalPain: string;
  implementationPath: 'path1-build' | 'path2-upgrade';
  preferredConsultationMethod: 'WhatsApp Call' | 'Google Meet' | 'Phone Call' | 'In Person (Lusaka)';
}

interface PricingPageProps {
  onNavigate: (page: PageId) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [currency, setCurrency] = useState<CurrencyMode>('ZMW');
  const [selectedPlanId, setSelectedPlanId] = useState<'start' | 'grow' | 'scale'>('grow');
  const [formData, setFormData] = useState<ConsultationFormData>({
    businessName: '',
    ownerName: '',
    phoneNumber: '',
    phoneCountryCode: '+260',
    email: '',
    currentMonthlySales: '',
    biggestOperationalPain: '',
    implementationPath: 'path1-build',
    preferredConsultationMethod: 'WhatsApp Call'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');

  const planFeatures = [
    'AI Customer Support Worker (24/7 customer assistance)',
    'AI Marketing Worker (Daily content & branded output)',
    'Business Insights Dashboard (Visibility layer included)',
    'Daily marketing content (~1 post/day, up to 30 posts/month)',
    'Customer enquiries and proactive lead follow-up',
    'Product recommendations and FAQ assistance',
    'Branded marketing visuals and promotional images',
    'Engaging captions and persuasive promotional copy',
    'Business activity insights, orders & restock signals'
  ];

  const planTerms = [
    'Month-to-month commitment',
    'Zero setup fees',
    '30-day money-back guarantee'
  ];

  const steps = [
    {
      num: '01',
      title: 'Sign Agreement & Retail Audit',
      desc: 'Sign a low-risk onboarding agreement. We review your catalog, customer touchpoints, and digital rules (Weeks 1–2).'
    },
    {
      num: '02',
      title: 'Build & Collaborative Implementation',
      desc: 'We build your custom AI workers and work hands-on with your team to connect messaging channels and test edge cases (Weeks 3–4).'
    },
    {
      num: '03',
      title: 'Go Live, Installment & 30-Day Guarantee',
      desc: 'Deploy live to customers. Pay in flexible installments backed by our 100% 30-day money-back guarantee (Weeks 5–6).'
    }
  ];

  const faqs = [
    {
      q: 'What are the differences between START, GROW, and SCALE?',
      a: 'START (K500/mo or $25/mo) provides an AI Customer Support Employee across WhatsApp, Facebook, Instagram, TikTok, and Web for routine customer questions, FAQs, and lead follow-up with up to 5 social posts/mo. GROW (K2,000/mo or $100/mo) is our complete workforce plan with 24/7 support plus full marketing strategy, consistent social content, and real-time business intelligence. SCALE (from K4,000/mo or $200+/mo) delivers custom AI solutions, custom integrations, and specialized business processes.'
    },
    {
      q: 'Can I start with START (K500/mo or $25/mo) and upgrade to GROW later?',
      a: 'Absolutely. You can upgrade, downgrade, or pause anytime. Your AI employee will smoothly take on additional marketing and business intelligence workflows as your sales grow.'
    },
    {
      q: 'Can I pay in Zambian Kwacha (ZMW)?',
      a: 'Yes! We support local Zambian Kwacha payments via Airtel Money, MTN Mobile Money, Zamtel, and local bank transfers: K500/month for START, K2,000/month for GROW, and from K4,000/month for custom SCALE solutions, as well as international cards in USD ($25, $100, $200+/mo).'
    },
    {
      q: 'How does the 30-day money-back guarantee work?',
      a: 'Try your AI employee for 30 days. If the service does not provide meaningful operational value to your business, you can request a 100% refund. It is straightforward, zero-risk, and backed in both Kwacha and USD.'
    },
    {
      q: 'Are there any setup fees or upfront charges?',
      a: 'No. Setup is zero fee across all plans. Whether you need your digital catalog structured from a physical store or integrated with an existing online setup, there are no upfront engineering or setup fees.'
    },
    {
      q: 'Is the Business Insights Dashboard included in START?',
      a: 'No. START is focused strictly on frontline customer support. The Business Insights Dashboard, campaign reporting, and sales analytics are included in the GROW (K2,000/mo or $100/mo) and SCALE tiers.'
    },
    {
      q: 'Can I cancel or pause my subscription?',
      a: 'Yes. Mupezeni operates on a month-to-month basis with no long-term contracts or lock-ins. You remain in control at all times.'
    }
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingPayload: ConsultationBookingData = {
      businessName: formData.businessName,
      ownerName: formData.ownerName,
      phoneCountryCode: formData.phoneCountryCode,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      city: 'Lusaka / Zambia',
      businessCategory: 'Retail',
      currentSalesChannels: [formData.implementationPath === 'path1-build' ? 'Physical Shop / In-Store' : 'Shopify / WooCommerce / Online'],
      monthlyEnquiries: '50-200',
      biggestChallenge: formData.biggestOperationalPain || 'Deploying 2 AI workers for customer support and marketing',
      preferredConsultationMethod: formData.preferredConsultationMethod === 'In Person (Lusaka)' ? 'In Person' : (formData.preferredConsultationMethod === 'WhatsApp Call' ? 'Phone' : 'Google Meet'),
      implementationPath: formData.implementationPath
    };

    try {
      await sendConsultationEmailNotification(bookingPayload);
      await saveConsultationToFirestore(bookingPayload, true);
      const waLink = generateWhatsAppBookingUrl(bookingPayload);
      const mailLink = generateMailtoLink(bookingPayload);
      setWhatsappUrl(waLink);
      setMailtoUrl(mailLink);
      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission error:', err);
      setWhatsappUrl(generateWhatsAppBookingUrl(bookingPayload));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToBooking = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-16 bg-[#050302] min-h-screen text-[#FAFAF9]">
      
      {/* 1. ONBOARDING & SETUP: TWO TRACKS (ZERO SETUP FEES) */}
      <section className="relative py-10 sm:py-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[400px] bg-gradient-to-b from-[#D95A1A]/15 via-[#9B2208]/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-4 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#D95A1A] font-syne">
                <Sparkles className="w-3 h-3 text-[#D95A1A]" />
                <span>Zero Setup Fees · Onboarding Tracks</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight"
            >
              Two Implementation Tracks. <span className="text-gradient-fire">Zero Setup Fees.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm md:text-base text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed"
            >
              We connect Mupezeni to your business with zero setup fees, whether you operate from a physical shop or already sell online.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            
            {/* Track 1 Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#110A07] border border-[#9B2208]/40 hover:border-[#9B2208] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">Track 1</span>
                      <h3 className="text-sm sm:text-base font-bold font-syne text-white">Starting From a Physical Store</h3>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold font-syne">Zero Setup Fee</span>
                </div>

                <p className="text-xs text-[#FAFAF9]/70 leading-relaxed font-syne">
                  For walk-in boutiques, showrooms, or physical counters. We help establish the digital foundation required for your AI team: structuring your catalog, preparing messaging channels, and calibrating your AI workers.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#FAFAF9]/85 font-syne">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Product catalog & pricing structuring</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>WhatsApp & digital inquiry setup where supported</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>AI knowledge base & FAQ calibration</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#FAFAF9]/60 font-syne">Digital Foundation Setup</span>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-xs font-bold font-syne text-[#D95A1A] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Track 1</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Track 2 Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#110A07] border border-[#9B2208]/40 hover:border-[#9B2208] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#24110A] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A]">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">Track 2</span>
                      <h3 className="text-sm sm:text-base font-bold font-syne text-white">Already Selling Online</h3>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold font-syne">Zero Setup Fee</span>
                </div>

                <p className="text-xs text-[#FAFAF9]/70 leading-relaxed font-syne">
                  For stores already on Shopify, WooCommerce, or website platforms. We connect Mupezeni directly to your existing digital stack where supported with zero interruption to active sales.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#FAFAF9]/85 font-syne">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Existing catalog & platform connector setup</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Live social DM & customer messaging sync</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Brand voice, tone, and FAQ calibration</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#FAFAF9]/60 font-syne">Direct Stack Integration</span>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-xs font-bold font-syne text-[#D95A1A] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Track 2</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          <div className="text-center p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 max-w-2xl mx-auto">
            <p className="text-xs text-emerald-300 font-syne font-semibold flex items-center justify-center gap-1.5">
              <span>🛡️ Zero setup fees, month-to-month flexibility. Try your Mupezeni AI Team for 30 days backed by our money-back guarantee.</span>
            </p>
          </div>

        </div>
      </section>

      {/* 2. PRICING HERO & 3-TIER PLAN CARDS */}
      <section className="py-12 sm:py-18 border-t border-white/5 bg-[#090604] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[450px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* CONTINUOUS PRICES TICKER MOVING LEFT TO RIGHT */}
        <div className="mb-10 sm:mb-12">
          <AnimatedPriceTicker 
            currency={currency} 
            onSelectPlan={(id) => {
              setSelectedPlanId(id as any);
              scrollToBooking();
            }} 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-2.5 sm:space-y-4 mb-10 sm:mb-14 max-w-3xl mx-auto">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#E58330]/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#E58330] font-syne">
                <Sparkles className="w-3 h-3 text-[#E58330]" />
                <span>Transparent Pricing Tiers</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight">
              Choose the AI Employee Plan <br className="hidden sm:inline" />
              <span className="text-gradient-fire">Built for Your Growth Stage</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed">
              Deploy dedicated AI employees across WhatsApp, Facebook, Instagram, TikTok, and Web. Zero setup fees, cancel anytime, and 30-day money-back guarantee.
            </p>

            {/* CURRENCY TOGGLE BUTTONS: Zambia Kwacha vs International USD */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#A8A099] font-mono">
                <Coins className="w-3.5 h-3.5 text-[#E58330]" />
                <span>Select Currency:</span>
              </div>

              <div className="inline-flex p-1 rounded-2xl bg-[#140C07] border border-white/10 shadow-xl backdrop-blur-sm">
                {/* Zambia Kwacha Button */}
                <button
                  type="button"
                  onClick={() => setCurrency('ZMW')}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all duration-200 cursor-pointer ${
                    currency === 'ZMW'
                      ? 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white shadow-lg shadow-[#9B2208]/40 scale-100 ring-1 ring-white/20'
                      : 'text-[#A8A099] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>🇿🇲 Zambia Kwacha (ZMW)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 font-medium">
                    K500 · K2000 · K 4000/mo
                  </span>
                </button>

                {/* International USD Button */}
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all duration-200 cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-sky-600/40 scale-100 ring-1 ring-white/20'
                      : 'text-[#A8A099] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>🌐 International USD ($)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 font-medium">
                    $25 · $100 · $200+/mo
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 3-TIER CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12 sm:mb-16">
            
            {/* TIER 1: 🟢 START */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl bg-[#080E0B] border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                selectedPlanId === 'start' ? 'border-emerald-400 ring-2 ring-emerald-500/30' : 'border-emerald-500/30 hover:border-emerald-500/60'
              }`}
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    <span>🟢 START</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                      AI Customer Support Employee
                    </h3>
                    <p className="text-xs text-[#A8A099] mt-1 leading-snug">
                      Your AI employee for customer support.
                    </p>
                  </div>
                </div>

                <div className="pt-2 pb-3 border-y border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white font-syne">
                      {currency === 'ZMW' ? 'K500' : '$25'}
                    </span>
                    <span className="text-xs text-[#A8A099] font-mono">/ month</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-emerald-400 font-mono">
                      Single employee · Support focused
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {currency === 'ZMW' ? '≈ $25 / mo USD' : '≈ K500 / mo ZMW'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8A099] font-bold block">
                    Works across:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['WhatsApp', 'Facebook', 'Instagram', 'TikTok', 'Website / E-commerce'].map((channel) => (
                      <span 
                        key={channel}
                        className="px-2 py-0.5 rounded-md bg-[#111F18] border border-emerald-500/20 text-[10px] font-mono text-emerald-300"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8A099] font-bold block">
                    Handles:
                  </span>
                  <div className="space-y-1.5 text-xs text-[#D4CDC5]">
                    {[
                      'Customer questions',
                      'FAQs',
                      'Product & service information',
                      'Basic enquiries',
                      'Lead capture',
                      'Basic follow-up',
                      '24/7 customer responses',
                      'Marketing assistance',
                      'Up to 5 social posts/month'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-3.5 h-3.5 rounded bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug text-[11.5px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B635B] font-semibold block">
                    Not included:
                  </span>
                  {[
                    'No ongoing marketing consistency',
                    'No marketing strategy',
                    'No reporting',
                    'No business insights'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-[#6B635B]">
                      <X className="w-3 h-3 text-red-400/60 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setSelectedPlanId('start');
                    scrollToBooking();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#111F18] hover:bg-[#162920] border border-emerald-500/40 hover:border-emerald-500 text-emerald-300 font-syne font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-98"
                >
                  <span>Select START ({currency === 'ZMW' ? 'K500/mo' : '$25/mo'})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* TIER 2: 🔵 GROW (MOST POPULAR) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative rounded-3xl bg-gradient-to-b from-[#0F172A] via-[#0B1324] to-[#070D18] border-2 border-sky-400 shadow-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-sky-300 transition-all duration-300 lg:-translate-y-2"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-bold font-mono px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>MOST POPULAR · RECOMMENDED</span>
              </div>

              <div className="space-y-5">
                <div className="space-y-2 pt-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/40 text-sky-300 text-xs font-mono font-bold">
                    <span>🔵 GROW</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                      AI Business Growth Employee
                    </h3>
                    <p className="text-xs text-sky-200/90 mt-1 leading-snug">
                      Your AI employee for customer support, marketing & growth.
                    </p>
                  </div>
                </div>

                <div className="pt-2 pb-3 border-y border-sky-500/20">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white font-syne">
                      {currency === 'ZMW' ? 'K2,000' : '$100'}
                    </span>
                    <span className="text-xs text-[#A8A099] font-mono">/ month</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-sky-400 font-mono font-semibold">
                      Complete workforce · Support + Marketing + Insights
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {currency === 'ZMW' ? '≈ $100 / mo USD' : '≈ K2,000 / mo ZMW'}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300 font-medium">
                  ✓ Everything in START, plus:
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-sky-400" />
                      <span>Customer Growth</span>
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#D4CDC5]">
                      {['Lead qualification', 'Advanced follow-up', 'Customer re-engagement', 'Sales assistance'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1.5 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1">
                      <Share2 className="w-3 h-3 text-sky-400" />
                      <span>Marketing</span>
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#D4CDC5]">
                      {[
                        'Consistent social content',
                        'Content planning',
                        'Ongoing marketing',
                        'Promotional content',
                        'Marketing strategy',
                        'Campaign optimization'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1.5 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1">
                      <BarChart3 className="w-3 h-3 text-sky-400" />
                      <span>Business Intelligence</span>
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#D4CDC5]">
                      {['Reporting', 'Business insights', 'Growth opportunities', 'AI recommendations'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setSelectedPlanId('grow');
                    scrollToBooking();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-syne font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-sky-500/25 active:scale-98"
                >
                  <span>Select GROW ({currency === 'ZMW' ? 'K2,000/mo' : '$100/mo'})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* TIER 3: 🟣 SCALE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className={`rounded-3xl bg-[#0E0814] border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                selectedPlanId === 'scale' ? 'border-purple-400 ring-2 ring-purple-500/30' : 'border-purple-500/30 hover:border-purple-500/60'
              }`}
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                    <span>🟣 SCALE</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                      Custom AI Employees
                    </h3>
                    <p className="text-xs text-[#A8A099] mt-1 leading-snug">
                      AI employees built around your business.
                    </p>
                  </div>
                </div>

                <div className="pt-2 pb-3 border-y border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white font-syne">
                      {currency === 'ZMW' ? 'K4,000+' : '$200+'}
                    </span>
                    <span className="text-xs text-[#A8A099] font-mono">/ month</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-purple-400 font-mono">
                      Custom pricing based on requirements
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {currency === 'ZMW' ? '≈ $200+/mo USD' : '≈ K4,000+/mo ZMW'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8A099] font-bold block">
                    Custom Capabilities:
                  </span>
                  <div className="space-y-2 text-xs text-[#D4CDC5]">
                    {[
                      'Custom AI solutions',
                      'Custom AI employees',
                      'Custom integrations',
                      'Specialized business processes',
                      'Advanced reporting',
                      'Higher-volume requirements',
                      'Business-specific requirements',
                      'Custom pricing based on requirements'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-3.5 h-3.5 rounded bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug text-[11.5px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200/90 leading-relaxed font-mono text-[11px]">
                  Tailored for multi-branch retail, distributors, and custom workflows.
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setSelectedPlanId('scale');
                    scrollToBooking();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#1C102A] hover:bg-[#251538] border border-purple-500/40 hover:border-purple-500 text-purple-200 font-syne font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-98"
                >
                  <span>Select SCALE ({currency === 'ZMW' ? 'from K4,000/mo' : 'from $200+/mo'})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

          </div>

          {/* 30-Day Money-Back Guarantee Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8 max-w-3xl mx-auto"
          >
            <MoneyBackGuaranteeBanner />
          </motion.div>

          {/* Visual Economic Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mb-8 max-w-3xl mx-auto"
          >
            <EconomicComparisonTable />
          </motion.div>

        </div>
      </section>

      {/* 3. 3-STEP TIMELINE */}
      <section className="py-10 sm:py-14 border-t border-white/5 bg-[#050302]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
              Low-Risk Implementation Roadmap
            </span>
            <h2 className="text-xl sm:text-3xl font-black font-syne text-white">
              From Agreement to Active AI Team in 4–6 Weeks
            </h2>
            <p className="text-[11px] sm:text-xs text-[#FAFAF9]/70 max-w-lg mx-auto">
              A transparent, low-risk process: sign an agreement, we build and work with you on implementation, then launch on an installment backed by a 30-day money-back guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-[#0D0805] border border-white/5 hover:border-[#9B2208]/50 transition-all space-y-2"
              >
                <span className="text-lg sm:text-xl font-black font-syne text-[#D95A1A]">
                  {step.num}
                </span>
                <h3 className="text-xs sm:text-sm font-bold font-syne text-white">
                  {step.title}
                </h3>
                <p className="text-[10.5px] sm:text-xs text-[#FAFAF9]/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => onNavigate('how-it-works')}
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold font-syne text-[#FAFAF9]/80 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              <span>Read the detailed End-to-End Operating Workflow</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D95A1A]" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. EMBEDDED CONSULTATION BOOKING SECTION */}
      <section id="booking-form" className="py-10 sm:py-16 border-t border-white/10 bg-gradient-to-b from-[#0B0604] to-[#050302]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-4 sm:p-8 rounded-2xl bg-[#110A07] border border-[#9B2208]/40 shadow-xl relative overflow-hidden">
            <div className="max-w-xl mx-auto text-center space-y-2 mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1C0F0A] text-[#D95A1A] text-[10px] sm:text-xs font-bold font-syne">
                <CalendarCheck className="w-3 h-3" />
                <span>Zero-Risk Consultation</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black font-syne text-white">
                Get Your AI Team
              </h2>
              <p className="text-[11px] sm:text-xs text-[#FAFAF9]/75">
                Lock in your implementation spot. We analyze your store workflows and show you how your AI team will handle customer support, marketing, and business visibility.
              </p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white mx-auto shadow-lg shadow-[#9B2208]/40">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black font-syne text-white">
                    Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAFAF9]/80 max-w-md mx-auto">
                    Founder Ernest Zimba and our team will review your business information and reach out via WhatsApp or Email within 2 business hours.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-syne font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20ba59] shadow-lg transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirm via WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#FAFAF9]/60 hover:text-white underline"
                  >
                    Submit another response
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* Onboarding Track Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold font-syne text-white/90 uppercase tracking-wider block">
                    Which onboarding track best matches your business?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, implementationPath: 'path1-build' })}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        formData.implementationPath === 'path1-build'
                          ? 'bg-[#20100A] border-[#9B2208] text-white shadow-md'
                          : 'bg-[#140D08] border-white/5 text-[#FAFAF9]/70 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold font-syne text-xs sm:text-sm text-white">
                        <Store className="w-4 h-4 text-[#D95A1A]" />
                        <span>Track 1: Starting from a Physical Store</span>
                      </div>
                      <p className="text-[11px] text-[#FAFAF9]/60 mt-1">
                        Walk-in boutique, counter, or showroom setup (Zero setup fee).
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, implementationPath: 'path2-upgrade' })}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        formData.implementationPath === 'path2-upgrade'
                          ? 'bg-[#20100A] border-[#9B2208] text-white shadow-md'
                          : 'bg-[#140D08] border-white/5 text-[#FAFAF9]/70 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold font-syne text-xs sm:text-sm text-white">
                        <RefreshCw className="w-4 h-4 text-[#D95A1A]" />
                        <span>Track 2: Already Selling Online</span>
                      </div>
                      <p className="text-[11px] text-[#FAFAF9]/60 mt-1">
                        Already have website, Shopify, WooCommerce, or social DM base (Zero setup fee).
                      </p>
                    </button>
                  </div>
                </div>

                {/* Name & Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#FAFAF9]/80 font-syne">
                      Retail Store / Business Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Lusaka Chic Boutique"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080503] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/25"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#FAFAF9]/80 font-syne">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Kondwani Phiri"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080503] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/25"
                    />
                  </div>
                </div>

                {/* Contact: WhatsApp Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#FAFAF9]/80 font-syne">
                      WhatsApp / Phone Number *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.phoneCountryCode}
                        onChange={(e) => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                        className="w-20 px-2.5 py-2.5 rounded-xl bg-[#080503] border border-white/10 text-xs sm:text-sm text-white text-center font-mono"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="971 234 567"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080503] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/25"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#FAFAF9]/80 font-syne">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="owner@yourstore.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080503] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/25"
                    />
                  </div>
                </div>

                {/* Consultation Method */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#FAFAF9]/80 font-syne">
                    Preferred Consultation Channel
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['WhatsApp Call', 'Google Meet', 'Phone Call', 'In Person (Lusaka)'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredConsultationMethod: method })}
                        className={`py-2 px-3 rounded-lg text-xs font-syne font-medium transition-all ${
                          formData.preferredConsultationMethod === method
                            ? 'bg-[#9B2208] text-white border border-[#D95A1A]'
                            : 'bg-[#080503] border border-white/5 text-[#FAFAF9]/70 hover:text-white'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-syne font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:shadow-xl hover:shadow-[#9B2208]/40 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Get Your AI Team</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#FAFAF9]/50">
                  By submitting, you request a zero-obligation onboarding discussion. No credit card required.
                </p>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs font-syne text-emerald-400">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold">Protected by our 30-Day Money-Back Guarantee</span>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* 5. PRICING FAQS */}
      <section className="py-16 border-t border-white/5 bg-[#050302]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-3xl font-black font-syne text-white">
              Pricing Questions Answered
            </h3>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/70">
              Clear, transparent details on how your monthly subscription works.
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
                <p className="text-xs sm:text-sm text-[#FAFAF9]/75 pl-7 leading-relaxed font-syne">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
