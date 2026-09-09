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
      title: 'Consultation & Retail Audit',
      desc: 'We conduct an in-depth strategic consultation to audit your catalog structure, sales channels, volume, and operational bottlenecks to build your tailored quote.'
    },
    {
      num: '02',
      title: 'Custom Scoping & Quote',
      desc: 'Because businesses vary in size and architecture, we provide a custom-tailored quote and implementation blueprint suited specifically to your operations.'
    },
    {
      num: '03',
      title: '4–6 Week Tailored Rollout',
      desc: 'Our engineering team custom-builds or integrates your digital store, trains multi-agent AI teams on your products, and ensures 100% verified go-live readiness.'
    }
  ];

  const faqs = [
    {
      q: 'How long does implementation take and how is it priced?',
      a: 'Implementation typically takes 4 to 6 weeks. Because businesses vary in size, catalog volume, and technical architecture, we begin with a comprehensive consultation and provide a custom quote tailored to your exact implementation requirements.'
    },
    {
      q: 'Does the base K5,000/month include both Path 1 (Build) and Path 2 (Upgrade)?',
      a: 'Yes. Our standard base plan covers your 3 dedicated AI Teams (Support, Marketing, and Operations). Custom setup and extended enterprise integrations are quoted transparently during your consultation.'
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
    <div className="pt-20 pb-16 bg-[#050302] min-h-screen text-[#FAFAF9]">
      
      {/* 1. APPLE-STYLE PRICING REVEAL HERO */}
      <section className="relative py-10 sm:py-16 overflow-hidden">
        {/* Soft terracotta glow centered behind price */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] h-[200px] sm:h-[350px] bg-gradient-to-b from-[#D95A1A]/15 via-[#9B2208]/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-2.5 sm:space-y-4 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#D95A1A] font-syne">
                Simple, transparent pricing
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne text-white tracking-tight"
            >
              One AI Team. A fraction of the cost.
            </motion.h1>

            {/* Sub-line */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm md:text-base text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed"
            >
              Hiring 3 human roles separately costs <span className="text-white font-semibold underline decoration-[#D95A1A]/60 underline-offset-2">K15,000–K30,000+/mo</span> in salaries alone — before NAPSA, training, or turnover.
            </motion.p>

            {/* Centerpiece price */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="pt-2 sm:pt-3"
            >
              <div className="inline-flex items-baseline justify-center gap-1.5 sm:gap-2.5 tracking-tight">
                <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne text-[#FAFAF9] tracking-tight drop-shadow-[0_10px_25px_rgba(217,90,26,0.2)]">
                  K5,000
                </span>
                <span className="text-base sm:text-xl md:text-2xl text-[#FAFAF9]/50 font-syne font-medium">
                  /month
                </span>
              </div>

              {/* Price block agents subline */}
              <p className="text-xs sm:text-sm font-bold font-syne text-[#F5EDE4] mt-1 sm:mt-1.5">
                Support Agent + Marketing Agent + Business Manager Agent — all included.
              </p>

              {/* Supporting line */}
              <p className="text-[11px] sm:text-xs text-[#FAFAF9]/60 font-medium max-w-lg mx-auto mt-0.5">
                Same coverage. Same output. No hiring, no onboarding, no turnover risk.
              </p>
            </motion.div>
          </div>

          {/* Visual Economic Comparison Table Anchor */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-6 sm:mb-8 max-w-2xl mx-auto"
          >
            <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#9B2208]/40 bg-[#0E0805] shadow-lg">
              <div className="px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-[#170B06] to-[#24110A] border-b border-white/10 flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne">
                  Economic Reality Check
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-white/60">
                  Monthly Zambian Retail Cost
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[10px] sm:text-xs font-syne text-[#FAFAF9]/70">
                      <th className="py-2 px-3 sm:px-4 font-semibold">Department Role</th>
                      <th className="py-2 px-3 sm:px-4 font-semibold text-white/50">Hiring 3 Human Staff</th>
                      <th className="py-2 px-3 sm:px-4 font-bold text-[#D95A1A] bg-[#180D08]/60">Mupezeni AI Team</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[10px] sm:text-xs font-syne">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-1.5 px-3 sm:px-4 font-medium text-white">Customer Support</td>
                      <td className="py-1.5 px-3 sm:px-4 text-white/60">~K3,300–9,500/mo</td>
                      <td className="py-1.5 px-3 sm:px-4 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (24/7)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-1.5 px-3 sm:px-4 font-medium text-white">Marketing & Content</td>
                      <td className="py-1.5 px-3 sm:px-4 text-white/60">~K3,600–10,400/mo</td>
                      <td className="py-1.5 px-3 sm:px-4 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (Daily)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-1.5 px-3 sm:px-4 font-medium text-white">Business Management</td>
                      <td className="py-1.5 px-3 sm:px-4 text-white/60">~K4,000–14,500/mo</td>
                      <td className="py-1.5 px-3 sm:px-4 font-bold text-[#25D366] bg-[#180D08]/60">✓ Included (Live)</td>
                    </tr>
                    <tr className="bg-[#1C0E08]/70 border-t border-[#9B2208]/60">
                      <td className="py-2 px-3 sm:px-4 font-black text-white text-[11px] sm:text-xs">Total Monthly Investment</td>
                      <td className="py-2 px-3 sm:px-4 font-bold text-white/60 text-[11px] sm:text-xs line-through decoration-red-500/80">K11,000–34,000+/mo</td>
                      <td className="py-2 px-3 sm:px-4 font-black text-sm sm:text-base bg-[#25120A] text-[#D95A1A]">K5,000/mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Elegant Horizontal Feature Rows (Compact) */}
          <div className="space-y-0 divide-y divide-white/10">
            {teams.map((team, idx) => {
              const Icon = team.icon;
              return (
                <motion.div
                  key={team.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 group"
                >
                  {/* Team Label with Icon */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-[220px]">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#170E09] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A] flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold font-syne text-white">
                      {team.title}
                    </h3>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-wrap sm:items-center sm:justify-end gap-1.5 sm:gap-4 text-[10px] sm:text-xs text-[#FAFAF9]/75 font-normal pl-9 sm:pl-0">
                    {team.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#D95A1A]/80 flex-shrink-0" />
                        <span className="text-[#FAFAF9]/85 font-syne">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Thin Divider Line */}
          <div className="border-t border-white/10 my-4 sm:my-6" />

          {/* Also Included Section */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-2 sm:space-y-3"
          >
            <p className="text-center text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white/45 font-syne">
              Also Included
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {alsoIncluded.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#0F0A07] border border-white/5"
                >
                  <div className="w-4 h-4 rounded-full bg-[#1A0E08] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A] flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#D95A1A]" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-[#FAFAF9]/80 font-syne font-medium truncate">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action Button */}
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-[0_0_30px_rgba(217,90,26,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-98 cursor-pointer"
            >
              <span>Book My AI Growth Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <p className="text-[10px] sm:text-xs text-[#FAFAF9]/60 max-w-md mx-auto mt-2 leading-relaxed">
              K5,000/month, all-inclusive. Simple, transparent pricing with no hidden fees.
            </p>
          </div>

        </div>
      </section>

      {/* 2. INTEGRATION WITH SOLUTIONS: BOTH PATHS INCLUDED */}
      <section className="py-8 sm:py-12 border-t border-white/5 bg-[#090604] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40">
              <Sparkles className="w-3 h-3 text-[#D95A1A]" />
              <span className="text-[10px] sm:text-xs font-bold font-syne uppercase tracking-wider text-[#F5EDE4]">
                Solutions Coverage
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-syne text-white tracking-tight">
              One Transparent Investment. Both Implementation Paths.
            </h2>
            <p className="text-[11px] sm:text-xs text-[#FAFAF9]/75 leading-relaxed">
              Whether building your digital footprint from scratch or plugging AI into existing Shopify/WooCommerce, your K5,000/month plan covers everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Path 1 Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#110A07] border border-[#9B2208]/40 hover:border-[#9B2208] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white">
                    <Store className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold font-syne uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1E0F0A] text-[#D95A1A] border border-[#9B2208]/30">
                    No Website Required
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-syne text-white">
                  Path 1: Build Your Digital Retail Business
                </h3>
                <p className="text-[11px] sm:text-xs text-[#FAFAF9]/70 leading-relaxed">
                  For walk-in boutiques and physical shops. We set up your digital storefront, upload your catalogue, configure payment rails, connect WhatsApp, and deploy your AI workforce.
                </p>
                <div className="space-y-1.5 pt-1.5 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Branded mobile online store & digital catalogue</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Airtel Money, MTN MoMo & Card checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>WhatsApp & Social commerce sync</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Yango & customer delivery rider integration</span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-[#FAFAF9]/60 font-syne">K5,000 /mo (All-Inclusive)</span>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-[11px] sm:text-xs font-bold font-syne text-[#D95A1A] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Path 1</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Path 2 Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#110A07] border border-[#9B2208]/40 hover:border-[#9B2208] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#24110A] border border-[#9B2208]/50 flex items-center justify-center text-[#D95A1A]">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold font-syne uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1E0F0A] text-[#D95A1A] border border-[#9B2208]/30">
                    Existing Online Stores
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-syne text-white">
                  Path 2: Upgrade Your Existing Business
                </h3>
                <p className="text-[11px] sm:text-xs text-[#FAFAF9]/70 leading-relaxed">
                  For stores already online. We plug our AI workforce directly into your Shopify, WooCommerce, or custom website with zero downtime and seamless live product sync.
                </p>
                <div className="space-y-1.5 pt-1.5 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Direct Shopify & WooCommerce connectors</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Live bi-directional catalogue & stock feed sync</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Unified WhatsApp Business & social DM hub</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#FAFAF9]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] flex-shrink-0" />
                    <span>Historical brand voice & FAQ training</span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-[#FAFAF9]/60 font-syne">K5,000 /mo (All-Inclusive)</span>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-[11px] sm:text-xs font-bold font-syne text-[#D95A1A] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Path 2</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTEGRATION WITH HOW IT WORKS: 3-STEP TIMELINE */}
      <section className="py-8 sm:py-12 border-t border-white/5 bg-[#050302]">
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
                className="p-3.5 sm:p-4 rounded-xl bg-[#0D0805] border border-white/5 hover:border-[#9B2208]/50 transition-all space-y-2"
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
