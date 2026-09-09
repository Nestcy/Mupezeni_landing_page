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

const SALES_CHANNEL_OPTIONS = [
  'Physical Shop / In-Store',
  'WhatsApp',
  'Facebook Page / Messenger',
  'Instagram DMs / Stories',
  'Shopify Store',
  'WooCommerce Store',
  'Other'
];

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

  const teams = [
    {
      icon: Handshake,
      title: 'AI Customer Support Team',
      features: [
        'Answers customer messages 24/7',
        'Recommends products',
        'Follows up with leads'
      ]
    },
    {
      icon: TrendingUp,
      title: 'AI Marketing Team',
      features: [
        'Creates posts, captions, images and videos',
        'Plans campaigns',
        'Runs ads with your approval'
      ]
    },
    {
      icon: BarChart3,
      title: 'AI Business Management Team',
      features: [
        'Business reports',
        'Sales insights',
        'Growth recommendations'
      ]
    }
  ];

  const alsoIncluded = [
    'AI onboarding and setup',
    'Integration with your existing sales channels',
    'Ongoing optimisation',
    'Monthly business reviews'
  ];

  const steps = [
    {
      num: '01',
      title: 'Free AI Retail Diagnostic',
      desc: 'A focused 30-minute session to audit your sales channels, catalog structure, and operational bottlenecks.'
    },
    {
      num: '02',
      title: 'Engineering & Integration',
      desc: 'We construct your digital storefront (Path 1) or connect to Shopify/WooCommerce (Path 2) in 48 hours to 5 days.'
    },
    {
      num: '03',
      title: 'Autonomous Go-Live',
      desc: 'Your AI Teams take over customer support, marketing creation, and operational reporting 24/7.'
    }
  ];

  const faqs = [
    {
      q: 'Does the K5,000/month include both Path 1 (Build) and Path 2 (Upgrade)?',
      a: 'Yes. Our base monthly plan includes either Path 1 (building your digital store, payments, and social setup) or Path 2 (connecting directly to your existing Shopify, WooCommerce, or website).'
    },
    {
      q: 'Are there hidden software license fees or per-message charges?',
      a: 'No. You do not pay per-message API fees or hidden software licenses. You get an all-inclusive AI workforce at a predictable, fixed monthly rate.'
    },
    {
      q: 'How does this compare to hiring human employees?',
      a: 'Hiring a customer support agent (~K3,300–K9,500), a marketer (~K3,600–K10,400), and a business manager (~K4,000–K14,500) separately can cost you K15,000–K30,000+ a month in salaries alone — before NAPSA, training, or turnover risk. Mupezeni provides 24/7 coverage, instant responses, and proactive execution across all three roles for just K5,000/month.'
    },
    {
      q: 'Can I cancel or pause my subscription?',
      a: 'Yes. Mupezeni operates on a transparent month-to-month commitment with no locked-in long-term contracts. You stay because of the compounding revenue and time saved.'
    }
  ];

  const handleChannelToggle = (channel: string) => {
    setFormData(prev => {
      const exists = prev.currentSalesChannels.includes(channel);
      return {
        ...prev,
        currentSalesChannels: exists
          ? prev.currentSalesChannels.filter(c => c !== channel)
          : [...prev.currentSalesChannels, channel]
      };
    });
  };

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
      // Still show confirmation with fallback links
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
    <div className="pt-20 pb-20 bg-[#050302] min-h-screen text-[#FAFAF9]">
      
      {/* 1. APPLE-STYLE PRICING REVEAL HERO */}
      <section className="relative py-20 sm:py-32 lg:py-36 overflow-hidden">
        {/* Soft terracotta glow centered behind price */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] lg:w-[850px] h-[250px] sm:h-[450px] bg-gradient-to-b from-[#D95A1A]/20 via-[#9B2208]/15 to-transparent rounded-full blur-[140px] sm:blur-[200px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#D95A1A] font-syne">
                Simple, transparent pricing
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black font-syne text-white tracking-tight"
            >
              One AI Team. A fraction of the cost.
            </motion.h1>

            {/* Sub-line */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-[#FAFAF9]/80 font-normal max-w-3xl mx-auto leading-relaxed"
            >
              Hiring a customer support agent, a marketer, and a business manager separately can cost you <span className="text-white font-semibold underline decoration-[#D95A1A]/60 underline-offset-4">K15,000–K30,000+ a month</span> in salaries alone — before NAPSA, training, or turnover.
            </motion.p>

            {/* Huge centerpiece price */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="pt-4 sm:pt-6"
            >
              <div className="inline-flex items-baseline justify-center gap-2 sm:gap-4 tracking-tight">
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-syne text-[#FAFAF9] tracking-tight drop-shadow-[0_15px_40px_rgba(217,90,26,0.2)]">
                  K5,000
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#FAFAF9]/50 font-syne font-medium">
                  /month
                </span>
              </div>

              {/* Price block agents subline */}
              <p className="text-sm sm:text-base font-bold font-syne text-[#F5EDE4] mt-2 sm:mt-3">
                Customer Support Agent + Marketing Agent + Business Manager Agent — all included.
              </p>

              {/* Supporting line (small text under price) */}
              <p className="text-xs sm:text-sm text-[#FAFAF9]/60 font-medium max-w-xl mx-auto mt-2">
                Same coverage. Same output. No hiring, no onboarding, no turnover risk.
              </p>
            </motion.div>
          </div>

          {/* Visual Economic Comparison Table Anchor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 sm:mb-20 max-w-3xl mx-auto"
          >
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#9B2208]/40 bg-[#0E0805] shadow-2xl">
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#170B06] to-[#24110A] border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                  Economic Reality Check
                </span>
                <span className="text-[11px] font-semibold text-white/60">
                  Monthly Zambian Retail Cost
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-xs sm:text-sm font-syne text-[#FAFAF9]/70">
                      <th className="py-3.5 px-4 sm:px-6 font-semibold">Department Role</th>
                      <th className="py-3.5 px-4 sm:px-6 font-semibold text-white/50">Hiring 3 Human Staff</th>
                      <th className="py-3.5 px-4 sm:px-6 font-bold text-[#D95A1A] bg-[#180D08]/60">Mupezeni AI Team</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs sm:text-sm font-syne">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Customer Support</td>
                      <td className="py-3.5 px-4 sm:px-6 text-white/60">~K3,300–9,500/mo</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (24/7)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Marketing & Content</td>
                      <td className="py-3.5 px-4 sm:px-6 text-white/60">~K3,600–10,400/mo</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (Daily)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Business Management</td>
                      <td className="py-3.5 px-4 sm:px-6 text-white/60">~K4,000–14,500/mo</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (Live)</td>
                    </tr>
                    <tr className="bg-[#1C0E08]/70 border-t-2 border-[#9B2208]/60">
                      <td className="py-4 px-4 sm:px-6 font-black text-white text-sm sm:text-base">Total Monthly Investment</td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-white/60 text-sm sm:text-base line-through decoration-red-500/80">K11,000–34,000+/mo</td>
                      <td className="py-4 px-4 sm:px-6 font-black text-[#FAFAF9] text-base sm:text-lg bg-[#25120A] text-[#D95A1A]">K5,000/mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Elegant Horizontal Feature Rows (No Cards, Floating Whitespace) */}
          <div className="space-y-0 divide-y divide-white/10">
            {teams.map((team, idx) => {
              const Icon = team.icon;
              return (
                <motion.div
                  key={team.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 group"
                >
                  {/* Team Label with Icon */}
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-[280px]">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#170E09] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A] group-hover:border-[#D95A1A]/60 group-hover:scale-105 transition-all duration-300 flex-shrink-0 shadow-sm shadow-[#9B2208]/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-syne text-white group-hover:text-[#FAFAF9] transition-colors">
                      {team.title}
                    </h3>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap md:justify-end gap-2.5 sm:gap-6 text-xs sm:text-sm text-[#FAFAF9]/75 font-normal">
                    {team.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D95A1A]/80 flex-shrink-0" />
                        <span className="text-[#FAFAF9]/85 font-syne">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Thin Divider Line */}
          <div className="border-t border-white/10 my-12 sm:my-16" />

          {/* Also Included Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="text-center text-xs sm:text-sm uppercase tracking-widest font-bold text-white/45 font-syne">
              Also Included
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {alsoIncluded.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 text-left py-2"
                >
                  <div className="w-5 h-5 rounded-full bg-[#1A0E08] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A] flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#D95A1A]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#FAFAF9]/80 font-syne font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action Button */}
          <div className="text-center mt-12 sm:mt-16">
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-xl font-syne font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-[0_0_40px_rgba(217,90,26,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer"
            >
              <span>Get Your AI Team</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/50 max-w-xl mx-auto mt-4 leading-relaxed">
              Starting from K5,000/month. Final pricing depends on your business size, sales channels and implementation requirements.
            </p>
          </div>

        </div>
      </section>

      {/* 2. INTEGRATION WITH SOLUTIONS: BOTH PATHS INCLUDED */}
      <section className="py-16 sm:py-24 border-t border-white/5 bg-[#090604] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#9B2208]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#D95A1A]" />
              <span className="text-xs font-bold font-syne uppercase tracking-wider text-[#F5EDE4]">
                Solutions Coverage
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-syne text-white tracking-tight">
              One Transparent Investment. Both Implementation Paths.
            </h2>
            <p className="text-xs sm:text-base text-[#FAFAF9]/75 leading-relaxed">
              Whether you are building your digital footprint from scratch or plugging AI into an existing Shopify or WooCommerce storefront, your K5,000/month plan has you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Path 1 Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#110A07] border border-[#9B2208]/40 hover:border-[#9B2208] transition-all space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white">
                    <Store className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold font-syne uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1E0F0A] text-[#D95A1A] border border-[#9B2208]/30">
                    No Website Required
                  </span>
                </div>
                <h3 className="text-xl font-bold font-syne text-white">
                  Path 1: Build Your Digital Retail Business
                </h3>
                <p className="text-xs sm:text-sm text-[#FAFAF9]/70 leading-relaxed">
                  For walk-in boutiques and physical shops. We set up your digital storefront, upload your catalogue, configure payment rails, connect WhatsApp, and deploy your AI workforce.
                </p>
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#D95A1A]" />
                    <span>Branded mobile online store & digital catalogue</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#D95A1A]" />
                    <span>Airtel Money, MTN MoMo & Card checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#D95A1A]" />
                    <span>WhatsApp & Social commerce sync</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#D95A1A]" />
                    <span>Yango & DHL delivery dispatch integration</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#FAFAF9]/60 font-syne">Base: K5,000 /mo</span>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-xs font-bold font-syne text-[#D95A1A] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Path 1 Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Path 2 Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#110A07] border border-[#9B2208]/40 hover:border-[#9B2208] transition-all space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#24110A] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A]">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold font-syne uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1E0F0A] text-[#D95A1A] border border-[#9B2208]/30">
                    Existing Online Stores
                  </span>
                </div>
                <h3 className="text-xl font-bold font-syne text-white">
                  Path 2: Upgrade Your Existing Business
                </h3>
                <p className="text-xs sm:text-sm text-[#FAFAF9]/70 leading-relaxed">
                  For stores already online. We plug our AI workforce directly into your Shopify, WooCommerce, or custom website with zero downtime and seamless inventory sync.
                </p>
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#D95A1A]" />
                    <span>Direct Shopify & WooCommerce REST API connectors</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#D95A1A]" />
                    <span>Live bi-directional catalogue & stock feed sync</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#D95A1A]" />
                    <span>Unified WhatsApp Business & social DM hub</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#D95A1A]" />
                    <span>Historical brand voice & FAQ training</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#FAFAF9]/60 font-syne">Base: K5,000 /mo</span>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-xs font-bold font-syne text-[#D95A1A] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Path 2 Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTEGRATION WITH HOW IT WORKS: 3-STEP TIMELINE */}
      <section className="py-16 sm:py-24 border-t border-white/5 bg-[#050302]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
              The Implementation Roadmap
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-syne text-white">
              From Consultation to Autonomous Revenue in 3 Steps
            </h2>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/70 max-w-xl mx-auto">
              Our engineering team handles setup end-to-end so you never deal with code or technical bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#0D0805] border border-white/5 hover:border-[#9B2208]/50 transition-all space-y-3"
              >
                <span className="text-2xl font-black font-syne text-[#D95A1A]">
                  {step.num}
                </span>
                <h3 className="text-base font-bold font-syne text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-[#FAFAF9]/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('how-it-works')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-syne text-[#FAFAF9]/80 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              <span>Read the detailed Day 1 to Day 30 Operating Workflow</span>
              <ArrowRight className="w-4 h-4 text-[#D95A1A]" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. EMBEDDED CONSULTATION BOOKING SECTION */}
      <section id="booking-form" className="py-16 sm:py-28 border-t border-white/10 bg-gradient-to-b from-[#0B0604] to-[#050302]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#110A07] border-2 border-[#9B2208]/40 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C0F0A] text-[#D95A1A] text-xs font-bold font-syne">
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Zero-Risk Growth Consultation</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-syne text-white">
                Book Your AI Growth Consultation
              </h2>
              <p className="text-xs sm:text-sm text-[#FAFAF9]/75">
                Lock in your implementation spot. We analyze your catalog, recommend your optimal path, and show you live demos of your AI Teams.
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
                        <span>Path 1: Build Digital Store</span>
                      </div>
                      <p className="text-[11px] text-[#FAFAF9]/60 mt-1">
                        Starting from physical shop, showroom, or social media only.
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
                        <span>Path 2: Upgrade Existing Store</span>
                      </div>
                      <p className="text-[11px] text-[#FAFAF9]/60 mt-1">
                        Already have Shopify, WooCommerce, or custom website.
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
