import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Handshake, 
  TrendingUp, 
  BarChart3, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Store, 
  RefreshCw, 
  CalendarCheck, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  Zap,
  Phone,
  Send,
  MessageSquare
} from 'lucide-react';
import { PageId, ConsultationBookingData } from '../types';
import { EconomicComparisonTable } from '../components/EconomicComparisonTable';
import { MoneyBackGuaranteeBanner } from '../components/MoneyBackGuaranteeBanner';
import { 
  sendConsultationEmailNotification, 
  saveConsultationToFirestore, 
  generateWhatsAppBookingUrl, 
  generateMailtoLink,
  FOUNDER_WHATSAPP_NUMBER 
} from '../services/consultationService';

interface PricingPageProps {
  onNavigate: (page: PageId) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  // Booking Form State
  const [formData, setFormData] = useState<ConsultationBookingData>({
    businessName: '',
    ownerName: '',
    phoneCountryCode: '+260',
    phoneNumber: '',
    email: '',
    city: 'Lusaka',
    businessCategory: 'Fashion & Boutiques',
    currentSalesChannels: ['WhatsApp', 'Physical Shop / In-Store'],
    monthlyEnquiries: '50-200',
    biggestChallenge: 'Need 24/7 customer response and hands-off digital marketing',
    preferredConsultationMethod: 'Google Meet',
    implementationPath: 'path1-build',
    additionalDetails: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');

  const monthlyTiers = [
    {
      id: 'support',
      title: 'AI Customer Support',
      subtitle: 'Instant sales & enquiries on WhatsApp & Web',
      price: 'K2,000',
      period: '/month',
      badge: 'Core AI Agent',
      badgeColor: 'bg-[#20110A] text-[#D95A1A] border-[#9B2208]/40',
      popular: false,
      features: [
        'Answers customer messages 24/7 across WhatsApp, IG, FB & Web',
        'Recommends products tailored to size & style preference',
        'Follows up with leads and interested shoppers to close sales',
        'Instant stock verification and direct payment links',
        'Human escalation handoff when personal touch is needed',
        '30-Day 100% Money-Back Guarantee (Risk-Free)'
      ],
      ctaText: 'Get Your AI Growth Team'
    },
    {
      id: 'marketing',
      title: 'AI Marketing',
      subtitle: 'Consistent social media content & ad campaigns',
      price: 'K2,500',
      period: '/month',
      badge: 'Creative Engine',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      tag: 'Add Anytime',
      popular: false,
      features: [
        'Creates posts, captions, reels and short-form videos',
        'Generates product visuals and seasonal promotional drops',
        'Plans and maintains weekly content calendars',
        'Runs targeted ads with owner-approved budgets and safeguards',
        'Syncs automatically with your product catalog changes',
        '30-Day 100% Money-Back Guarantee (Risk-Free)'
      ],
      ctaText: 'Get Your AI Growth Team'
    },
    {
      id: 'growth-team',
      title: 'Mupezeni AI Growth Team',
      subtitle: 'Complete 24/7 sales, marketing & insights',
      price: 'K5,000',
      period: '/month',
      badge: 'Full AI Workforce',
      badgeColor: 'bg-[#D95A1A]/20 text-[#D95A1A] border-[#D95A1A]/50',
      tag: 'Best Value',
      popular: true,
      features: [
        'AI Customer Support Agent (24/7 omnichannel sales)',
        'AI Marketing Agent (Continuous creative studio)',
        'Business Insights Dashboard (Included at no extra cost)',
        'Ongoing prompt, product & catalog optimization',
        'Monthly strategic business review with our lead engineer',
        'Priority feature requests & dedicated WhatsApp support',
        '30-Day 100% Money-Back Guarantee (Full Refund)'
      ],
      ctaText: 'Get Your AI Growth Team'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Consultation & Retail Audit',
      desc: 'We conduct a diagnostic session to audit your catalog structure, sales channels, volume, and customer touchpoints.'
    },
    {
      num: '02',
      title: 'Setup & Digital Foundation',
      desc: 'Whether building your store (Path 1: K6,000) or connecting Shopify/WooCommerce (Path 2: K3,000), our team handles the integration.'
    },
    {
      num: '03',
      title: 'AI Calibration & 24/7 Launch',
      desc: 'We train your AI workforce on your catalog, test responses across WhatsApp & Web, and launch your automated growth team.'
    }
  ];

  const faqs = [
    {
      q: 'Do you offer a money-back guarantee if I don\'t see value?',
      a: 'Yes, 100%. Every Mupezeni client is backed by our 30-Day 100% Money-Back Guarantee. If within the first 30 days of going live with your AI workforce you feel Mupezeni has not delivered tangible business value, saved you dozens of operating hours, or driven customer conversions, simply message our team. We will issue a prompt 100% refund of your monthly subscription fee back to your Airtel Money, MTN MoMo, or bank account — no questions asked and zero risk to your business.'
    },
    {
      q: 'Can I start with just AI Customer Support and add Marketing later?',
      a: 'Absolutely. You can start with the AI Customer Support Agent at K2,000/month and add the AI Marketing Agent (K2,500/month) at any time. Adding Marketing requires no additional setup fee.'
    },
    {
      q: 'What is the Business Insights Dashboard and is it really included free?',
      a: 'Yes. Every Mupezeni partner receives the Business Insights Dashboard at no extra cost. It provides live tracking of orders, sales trends, supplier restock signals, and one-click rider delivery slips.'
    },
    {
      q: 'How does the one-time setup fee work?',
      a: 'Setup is a one-time investment in your digital foundation. If you have no online store (Path 1), setup is K6,000 (4–6 weeks go-live) for complete store build, payments, inventory, and AI calibration. If you already have Shopify or WooCommerce (Path 2), setup is K3,000 (4–6 weeks go-live) for direct API sync and AI calibration.'
    },
    {
      q: 'How does this compare to hiring human employees in Zambia?',
      a: 'Hiring a customer support agent (~K3,300–K9,500), a marketer (~K3,600–K10,400), and an operations manager (~K4,000–K14,500) separately costs K15,000–K30,000+ a month in salaries alone — before NAPSA, training, or turnover risk. Mupezeni provides 24/7 coverage, instant replies, and proactive content creation starting from K2,000/mo or K5,000/mo for the full AI Growth Team.'
    },
    {
      q: 'Can I cancel or pause my subscription?',
      a: 'Yes. Mupezeni operates on a transparent month-to-month commitment with no locked-in long-term contracts. You stay because of the compounding revenue and time saved.'
    }
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendConsultationEmailNotification(formData);
      await saveConsultationToFirestore(formData, true);
      const waLink = generateWhatsAppBookingUrl(formData);
      const mailLink = generateMailtoLink(formData);
      setWhatsappUrl(waLink);
      setMailtoUrl(mailLink);
      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission error:', err);
      setWhatsappUrl(generateWhatsAppBookingUrl(formData));
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
      
      {/* 1. PRICING HERO & MONTHLY TIERS */}
      <section className="relative py-10 sm:py-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[400px] bg-gradient-to-b from-[#D95A1A]/15 via-[#9B2208]/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-2.5 sm:space-y-4 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#D95A1A] font-syne">
                <Sparkles className="w-3 h-3 text-[#D95A1A]" />
                <span>Simple, Transparent Pricing</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight"
            >
              One AI Team. <span className="text-gradient-fire">A Fraction of the Cost.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm md:text-base text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed"
            >
              Hiring 3 human roles separately costs <span className="text-white font-semibold underline decoration-[#D95A1A]/60 underline-offset-2">K15,000–K30,000+/mo</span> in salaries alone — before NAPSA, training, or turnover risk.
            </motion.p>
          </div>

          {/* 3 Monthly Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-8">
            {monthlyTiers.map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 relative transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-b from-[#221008] via-[#180C07] to-[#0D0805] border-2 border-[#D95A1A] shadow-2xl overflow-hidden'
                    : 'bg-gradient-to-b from-[#180E09] via-[#120B07] to-[#0A0705] border border-[#9B2208]/40 hover:border-[#D95A1A]/60 shadow-xl'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D95A1A] to-[#9B2208] text-white text-[10px] font-black uppercase font-syne px-3 py-1 rounded-bl-xl tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-syne ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                    {tier.tag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-syne">
                        {tier.tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-black font-syne text-white">
                      {tier.id === 'growth-team' ? (
                        <>
                          <span className="font-roboto font-semibold">Mupezeni</span> AI Growth Team
                        </>
                      ) : (
                        tier.title
                      )}
                    </h3>
                    <p className="text-xs text-[#FAFAF9]/70 font-syne mt-0.5">{tier.subtitle}</p>
                  </div>

                  <div className="pt-2 pb-1 border-y border-white/5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black font-syne text-white">{tier.price}</span>
                      <span className="text-xs text-[#FAFAF9]/60 font-syne">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-[#FAFAF9]/80 font-syne">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${tier.popular ? 'text-emerald-400' : 'text-[#D95A1A]'}`} />
                        <span className={tier.popular && fIdx < 3 ? 'font-bold text-white' : ''}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={scrollToBooking}
                  className={`w-full py-3 rounded-xl font-syne font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] text-white hover:opacity-95 shadow-lg shadow-[#9B2208]/30 font-black'
                      : 'bg-[#20110A] text-white hover:bg-[#2D160E] border border-[#9B2208]/60'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Business Insights Dashboard Bonus Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#170E08] via-[#1F120A] to-[#120B07] border border-[#D95A1A]/40 shadow-lg mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2D160C] border border-[#D95A1A]/60 flex items-center justify-center text-[#D95A1A] flex-shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-syne">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>+ Also Included at No Extra Cost</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black font-syne text-white">
                    Business Insights Dashboard
                  </h4>
                  <p className="text-xs text-[#FAFAF9]/80 font-syne mt-0.5">
                    "Every <span className="font-roboto font-semibold text-white">Mupezeni</span> partner gets a dashboard showing orders, sales trends, and restock signals — included at no extra cost."
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] font-syne text-white/80">
                <span className="px-2.5 py-1 rounded-lg bg-[#0C0805] border border-white/5">✓ Live Order Feed</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0C0805] border border-white/5">✓ Sales Velocity</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0C0805] border border-white/5">✓ Restock Alerts</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0C0805] border border-white/5">✓ Rider Delivery Slips</span>
              </div>
            </div>
          </motion.div>

          {/* 30-Day Money-Back Guarantee Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="mb-8 max-w-3xl mx-auto"
          >
            <MoneyBackGuaranteeBanner />
          </motion.div>

          {/* Visual Economic Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mb-8 max-w-3xl mx-auto"
          >
            <EconomicComparisonTable />
          </motion.div>

        </div>
      </section>

      {/* 2. ONE-TIME SETUP: 2-COLUMN COMPARISON */}
      <section className="py-10 sm:py-14 border-t border-white/5 bg-[#090604] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40">
              <Sparkles className="w-3 h-3 text-[#D95A1A]" />
              <span className="text-[10px] sm:text-xs font-bold font-syne uppercase tracking-wider text-[#F5EDE4]">
                Digital Foundation
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-syne text-white tracking-tight">
              One-Time Setup & Integration
            </h2>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/75 leading-relaxed">
              Choose the setup path engineered for your current business model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
            
            {/* Path 1 Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#110A07] border border-[#9B2208]/40 hover:border-[#9B2208] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">Path 1</span>
                      <h3 className="text-sm sm:text-base font-bold font-syne text-white">Starting From Physical Store</h3>
                    </div>
                  </div>
                  <span className="text-xs text-white/60 font-syne">4–6 Weeks to Live</span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-syne text-white">K6,000</span>
                  <span className="text-xs text-[#FAFAF9]/60 font-syne">one-time setup</span>
                </div>

                <p className="text-xs text-[#FAFAF9]/70 leading-relaxed">
                  For walk-in boutiques, showrooms, or physical shops. We build your digital store, upload products, connect Airtel/MTN MoMo, integrate WhatsApp, and calibrate your AI.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#FAFAF9]/85 font-syne">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Branded mobile online store & digital catalogue</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Airtel Money, MTN MoMo & Card checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>WhatsApp Commerce & social DM sales integration</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Yango & rider delivery slip integration</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#FAFAF9]/60 font-syne">Foundation & Store Build</span>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-xs font-bold font-syne text-[#D95A1A] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Path 1</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Path 2 Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#110A07] border border-[#9B2208]/40 hover:border-[#9B2208] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#24110A] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A]">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne block">Path 2</span>
                      <h3 className="text-sm sm:text-base font-bold font-syne text-white">Already Online</h3>
                    </div>
                  </div>
                  <span className="text-xs text-white/60 font-syne">4–6 Weeks to Live</span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-syne text-white">K3,000</span>
                  <span className="text-xs text-[#FAFAF9]/60 font-syne">one-time setup</span>
                </div>

                <p className="text-xs text-[#FAFAF9]/70 leading-relaxed">
                  For stores already on Shopify, WooCommerce, or custom sites. We connect our AI directly into your stack with real-time stock sync and zero downtime.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#FAFAF9]/85 font-syne">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Direct Shopify & WooCommerce API connector setup</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Live bi-directional catalogue & stock feed sync</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Unified WhatsApp Business & social DM hub</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Historical brand voice & FAQ training</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#FAFAF9]/60 font-syne">Direct API Connector</span>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-xs font-bold font-syne text-[#D95A1A] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Path 2</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          <p className="text-center text-xs text-[#FAFAF9]/60 font-syne mt-2 italic">
            💡 Setup is a one-time investment in your digital foundation. Add the Marketing agent anytime afterward — no new setup fee.
          </p>

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
              From Consultation to Autonomous Revenue in 3 Steps
            </h2>
            <p className="text-[11px] sm:text-xs text-[#FAFAF9]/70 max-w-lg mx-auto">
              Our engineering team handles setup end-to-end so you never deal with code or technical bottlenecks.
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
                <span>Zero-Risk Growth Consultation</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black font-syne text-white">
                Book Your AI Growth Consultation
              </h2>
              <p className="text-[11px] sm:text-xs text-[#FAFAF9]/75">
                Lock in your implementation spot. We analyze your catalog, recommend your optimal path, and show you live demos of your AI workforce.
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
                    Consultation Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAFAF9]/80 max-w-md mx-auto">
                    Founder Ernest Zimba and our engineering team will review your store details and contact you via WhatsApp or Email within 2 business hours.
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
                      <span>Confirm Faster via WhatsApp</span>
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
                
                {/* Path Choice Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold font-syne text-white/90 uppercase tracking-wider block">
                    Which implementation path best matches your business?
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
                        <span>Path 1: Physical Store (K6,000 setup)</span>
                      </div>
                      <p className="text-[11px] text-[#FAFAF9]/60 mt-1">
                        Starting from physical shop, showroom, or social media only (4–6 weeks go-live).
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
                        <span>Path 2: Already Online (K3,000 setup)</span>
                      </div>
                      <p className="text-[11px] text-[#FAFAF9]/60 mt-1">
                        Already have Shopify, WooCommerce, or custom website (4–6 weeks go-live).
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
                    {(['Google Meet', 'Zoom', 'Phone', 'In Person'] as const).map((method) => (
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
                    <span>Dispatching Consultation Booking...</span>
                  ) : (
                    <>
                      <span>Confirm & Book My Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#FAFAF9]/50">
                  By submitting, you agree to our 30-minute diagnostic session. No credit card required.
                </p>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs font-syne text-emerald-400">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold">Protected by our 30-Day 100% Money-Back Guarantee</span>
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
              Clear, transparent details on how your monthly investment works.
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

    </div>
  );
};
