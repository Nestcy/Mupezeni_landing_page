import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
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
  RotateCcw
} from 'lucide-react';
import { PageId, ConsultationBookingData } from '../types';
import { EconomicComparisonTable } from '../components/EconomicComparisonTable';
import { MoneyBackGuaranteeBanner } from '../components/MoneyBackGuaranteeBanner';
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
      title: 'Consultation & Retail Audit',
      desc: 'We review your catalog, customer touchpoints, and digital setup to prepare your AI workers.'
    },
    {
      num: '02',
      title: 'Onboarding & Channel Connection',
      desc: 'Whether starting from a physical shop or connecting an existing store, we set up your channels at zero setup cost.'
    },
    {
      num: '03',
      title: 'AI Calibration & Live Activation',
      desc: 'We calibrate the AI Customer Support and Marketing workers with your products, rules, and brand voice.'
    }
  ];

  const faqs = [
    {
      q: 'What is included in the K2,000/month subscription?',
      a: 'Everything. You receive the AI Customer Support Worker (handles routine customer conversations, FAQs, product info, and lead follow-up 24/7), the AI Marketing Worker (creates daily social media content, branded images, and promotional copy), and the Business Insights Dashboard (live visibility into orders, sales trends, and restock signals).'
    },
    {
      q: 'How does the 30-day money-back guarantee work?',
      a: 'Try your Mupezeni AI Team for 30 days. If the service does not provide meaningful operational value to your business, you can request a refund according to our guarantee terms. It is straightforward and risk-free.'
    },
    {
      q: 'Are there any setup fees or upfront charges?',
      a: 'No. Setup is zero fee. Whether you need your digital catalog structured from a physical store or integrated with an existing online setup, there are no upfront engineering or setup fees.'
    },
    {
      q: 'Is the Business Insights Dashboard a third AI worker?',
      a: 'No. It is the visibility layer included alongside your two AI workers. It centralizes order activity, sales velocity, product performance, and restock signals so you stay informed without digging through chats.'
    },
    {
      q: 'Can I cancel or pause my subscription?',
      a: 'Yes. Mupezeni operates on a month-to-month basis with no long-term contracts or lock-ins. You remain in control at all times.'
    },
    {
      q: 'How does this compare to the traditional approach?',
      a: 'Traditionally, keeping support and marketing running requires assembling separate people, freelance help, multiple software tools, and continuous manual oversight. Mupezeni deploys two specialized AI workers and a centralized dashboard for one predictable subscription of K2,000/month.'
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

      {/* 2. PRICING HERO & SINGLE PLAN CARD */}
      <section className="py-12 sm:py-18 border-t border-white/5 bg-[#090604] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[400px] bg-gradient-to-b from-[#D95A1A]/10 via-[#9B2208]/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-2.5 sm:space-y-4 mb-8 sm:mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#D95A1A] font-syne">
                <Sparkles className="w-3 h-3 text-[#D95A1A]" />
                <span>One AI Team · One Simple Price</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight">
              Your AI Team for Retail. <span className="text-gradient-fire">K2,000/month.</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed">
              Instead of assembling separate people, tools and workflows for customer support and marketing... deploy one AI team for K2,000/month.
            </p>
          </div>

          {/* ONE CLEAR PRICING CARD */}
          <div className="max-w-2xl mx-auto mb-10 sm:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-gradient-to-b from-[#221008] via-[#180C07] to-[#0D0805] border-2 border-[#D95A1A] shadow-2xl p-6 sm:p-10 relative overflow-hidden space-y-6 sm:space-y-8"
            >
              {/* Top highlight banner */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D95A1A] to-[#9B2208] text-white text-[10px] sm:text-xs font-black uppercase font-syne px-4 py-1 rounded-bl-xl tracking-wider shadow">
                Complete AI Workforce Plan
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#D95A1A]/20 text-[#D95A1A] border border-[#D95A1A]/50 font-syne">
                    2 AI Workers + 1 Business Insights Dashboard
                  </span>
                  <span className="text-xs text-emerald-400 font-bold font-syne flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Always Active
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black font-syne text-white">
                    <span className="font-roboto font-semibold">Mupezeni</span> AI Team
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAFAF9]/80 font-syne mt-1">
                    Customer support. Marketing. Business insights.
                  </p>
                </div>

                {/* Price display */}
                <div className="pt-3 pb-2 border-y border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-6xl font-black font-syne text-white tracking-tight">K2,000</span>
                    <span className="text-sm sm:text-base text-[#FAFAF9]/70 font-syne">/ month</span>
                  </div>
                  <span className="text-xs text-[#FAFAF9]/60 font-syne">
                    Zero setup fee • Month-to-month
                  </span>
                </div>
              </div>

              {/* Inclusions List */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white/90 font-syne block">
                  Includes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-[13px] text-[#FAFAF9]/90 font-syne">
                  {planFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms Strip */}
              <div className="p-3.5 rounded-2xl bg-[#120804] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-syne">
                {planTerms.map((term, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-white/90 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#D95A1A] flex-shrink-0" />
                    <span>{term}</span>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={scrollToBooking}
                  className="w-full py-4 rounded-2xl font-syne font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:opacity-95 shadow-xl shadow-[#9B2208]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Get Your AI Team</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
                <p className="text-[11px] text-center text-[#FAFAF9]/60 font-syne">
                  No setup fee. 30-day money-back guarantee based on operational value.
                </p>
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
              The Implementation Roadmap
            </span>
            <h2 className="text-xl sm:text-3xl font-black font-syne text-white">
              From Consultation to Active AI Team in 3 Steps
            </h2>
            <p className="text-[11px] sm:text-xs text-[#FAFAF9]/70 max-w-lg mx-auto">
              We handle the configuration and calibration end-to-end so you never deal with technical bottlenecks.
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
                  className="w-full py-4 rounded-xl font-syne font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-xl hover:shadow-[#9B2208]/30 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
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
