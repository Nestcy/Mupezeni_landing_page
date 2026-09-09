import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Bot, 
  Sparkles,
  ArrowRight,
  Store,
  MessageSquare,
  RefreshCw,
  Database
} from 'lucide-react';
import { ConsultationBookingData, PageId } from '../types';
import { 
  sendConsultationEmailNotification, 
  saveConsultationToFirestore, 
  generateWhatsAppBookingUrl, 
  generateMailtoLink,
  ADMIN_NOTIFICATION_EMAIL,
  FOUNDER_WHATSAPP_NUMBER 
} from '../services/consultationService';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

const SALES_CHANNEL_OPTIONS = [
  'Physical Shop / In-Store',
  'WhatsApp',
  'Facebook Page / Messenger',
  'Instagram DMs / Stories',
  'Shopify Store',
  'WooCommerce Store',
  'TikTok Shop',
  'Amazon / eBay Marketplace',
  'Other'
];

const CATEGORY_OPTIONS = [
  'Fashion & Boutiques',
  'Electronics & Gadgets',
  'Furniture & Home Decor',
  'Hardware & Building Supplies',
  'Pharmacy & Wellness',
  'Beauty & Cosmetics',
  'Grocery & Supermarkets',
  'Other Retail'
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ConsultationBookingData>({
    businessName: '',
    ownerName: '',
    phoneCountryCode: '+260',
    phoneNumber: '',
    email: '',
    city: '',
    businessCategory: CATEGORY_OPTIONS[0],
    currentSalesChannels: ['WhatsApp', 'Physical Shop / In-Store'],
    monthlyEnquiries: '50-200',
    biggestChallenge: '',
    preferredConsultationMethod: 'Google Meet',
    implementationPath: 'path1-build',
    additionalDetails: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>('');
  const [savedDocId, setSavedDocId] = useState<string>('');
  const [emailSuccess, setEmailSuccess] = useState<boolean>(true);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [mailtoUrl, setMailtoUrl] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStep('Logging to Firestore database...');

    try {
      // 1. Send Email Notification to nestcy770@gmail.com
      setSubmissionStep('Dispatching email notification to founder inbox...');
      const emailRes = await sendConsultationEmailNotification(formData);
      setEmailSuccess(emailRes.success);

      // 2. Persist to Firebase Firestore under /consultations
      setSubmissionStep('Saving consultation record to Firebase database...');
      const dbRes = await saveConsultationToFirestore(formData, emailRes.success);
      setSavedDocId(dbRes.id);

      // 3. Generate instant WhatsApp booking URL & Mailto fallback
      const waUrl = generateWhatsAppBookingUrl(formData);
      const mUrl = generateMailtoLink(formData);
      setWhatsappUrl(waUrl);
      setMailtoUrl(mUrl);

      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } catch (err) {
      console.error('Booking submission error:', err);
      // Fallback: still show success with fallback links
      const waUrl = generateWhatsAppBookingUrl(formData);
      const mUrl = generateMailtoLink(formData);
      setWhatsappUrl(waUrl);
      setMailtoUrl(mUrl);
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-20">
      {/* 1. HERO HEADER */}
      <section className="relative pt-14 pb-14 sm:pt-20 sm:pb-20 bg-[#0A0705] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-b from-[#9B2208]/20 via-[#D95A1A]/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm">
            <CalendarCheck className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span className="text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Free AI Growth Consultation
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight max-w-4xl mx-auto">
            Book Your Free AI Growth{' '}
            <span className="text-gradient-fire">
              Consultation.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#FAFAF9]/80 font-normal max-w-2xl mx-auto leading-relaxed">
            Every retail store is unique. Tell us about your channels, products, and customer volume, and we will prepare a customized AI Growth Blueprint for your business.
          </p>
        </div>
      </section>

      {/* 2. FORM & CONTACT DETAILS SPLIT */}
      <section className="py-12 sm:py-20 bg-[#0D0805] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
            
            {/* Left: Contact Info & What to Expect (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#160E09] to-[#0A0705] border border-[#9B2208]/40 shadow-xl space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D95A1A] font-syne block">
                  Company Details
                </span>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#20110A] text-[#D95A1A] mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white font-syne">Headquarters</div>
                      <div className="text-[#FAFAF9]/70">Kamwala South, Lusaka, Zambia</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#20110A] text-[#D95A1A] mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white font-syne">Direct Email</div>
                      <div className="text-[#FAFAF9]/70 font-mono text-xs select-all">nestcy770@gmail.com</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#20110A] text-[#D95A1A] mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white font-syne">Direct WhatsApp</div>
                      <div className="text-[#FAFAF9]/70 font-mono text-xs">+260 973 732 409</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#20110A] text-[#D95A1A] mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white font-syne">Response Guarantee</div>
                      <div className="text-[#FAFAF9]/70">Review & blueprint response within 24 hours</div>
                    </div>
                  </div>
                </div>

                {/* What happens next Box */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white font-syne">
                    What happens next:
                  </h4>
                  <ul className="space-y-2 text-xs text-[#FAFAF9]/75">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                      <span>We conduct a 30-min consultation to review your store channels & catalogue.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                      <span>We provide a custom quote & tailored AI Growth Blueprint for your store size.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D95A1A] mt-0.5 flex-shrink-0" />
                      <span>4–6 week tailored engineering, testing & multi-agent rollout.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Founder Guarantee Note & Pricing Assurance */}
              <div className="p-6 rounded-3xl bg-[#140D08] border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white font-syne">
                  <ShieldCheck className="w-4 h-4 text-[#D95A1A]" />
                  <span>100% Free & No Obligation</span>
                </div>
                <p className="text-xs text-[#FAFAF9]/70 leading-relaxed">
                  You are under no obligation to purchase software. The consultation is designed to deliver immediate tactical clarity on how AI can accelerate your retail business.
                </p>
                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-syne">
                    <span className="font-bold text-white">Transparent Pricing:</span>
                    <span className="text-[#D95A1A] font-bold">K5,000 /mo</span>
                  </div>
                  <p className="text-[11px] text-[#FAFAF9]/60 leading-tight">
                    All-inclusive AI Support, Marketing, and Operations. Zero per-message license fees.
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('pricing')}
                    className="text-xs font-bold font-syne text-[#D95A1A] hover:text-white inline-flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>View full pricing breakdown</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Booking Form (Span 8) */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1A0E08] via-[#140C07] to-[#0A0705] border border-emerald-500/50 shadow-2xl space-y-6 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 font-syne uppercase tracking-wider">
                      Request Confirmed
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-syne text-white">
                      Consultation Request Received!
                    </h3>
                    <p className="text-sm sm:text-base text-[#FAFAF9]/80 max-w-xl mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{formData.ownerName}</strong>. Your consultation request for <strong className="text-white">{formData.businessName}</strong> has been received by Ernest Zimba. We are reviewing your store details and will reach out within 24 hours.
                    </p>
                  </div>

                  {/* Summary Confirmation Banner */}
                  <div className="p-4 rounded-2xl bg-[#0C0805] border border-emerald-500/30 text-left max-w-xl mx-auto space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-syne">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Next Step: 30-Minute AI Retail Strategy Session</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      We will review your active sales channels and design a concrete roadmap to automate your order intake and customer support.
                    </p>
                  </div>

                  {/* Primary WhatsApp Action Button */}
                  <div className="p-5 rounded-2xl bg-[#110A06] border border-[#9B2208]/30 max-w-xl mx-auto space-y-3">
                    <div className="text-xs font-bold text-white font-syne">
                      ⚡ Want an instant response?
                    </div>
                    <p className="text-xs text-white/70">
                      Send your pre-formatted booking details directly to Ernest on WhatsApp with 1 click:
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open Pre-Filled WhatsApp Chat (+260 973 732 409)</span>
                    </a>
                  </div>

                  {/* Summary Recap Box */}
                  <div className="p-5 rounded-2xl bg-[#0A0705] border border-white/10 text-left max-w-xl mx-auto space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">Store Name:</span>
                      <span className="text-white font-bold">{formData.businessName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">Category:</span>
                      <span className="text-white font-bold">{formData.businessCategory}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">Channels:</span>
                      <span className="text-white font-bold">{formData.currentSalesChannels.join(', ')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">Monthly Volume:</span>
                      <span className="text-white font-bold">{formData.monthlyEnquiries} chats/mo</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-white/50">Contact:</span>
                      <span className="text-white font-bold">{formData.phoneCountryCode} {formData.phoneNumber} ({formData.email})</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={mailtoUrl}
                      className="px-4 py-2.5 rounded-xl font-syne font-bold text-xs text-white/80 hover:text-white bg-[#1A0E08] border border-white/10 hover:border-white/20 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D95A1A]" />
                      <span>Open in Email App</span>
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 rounded-xl font-syne font-bold text-xs text-white/60 hover:text-white transition-all cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#160E09] via-[#120B07] to-[#0A0705] border border-[#9B2208]/40 shadow-2xl space-y-8"
                >
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-2xl font-black font-syne text-white">
                        Retail Diagnostic Form
                      </h3>
                      <span className="text-[11px] font-bold font-syne px-2.5 py-0.5 rounded-full bg-[#1C0F0A] text-[#D95A1A] border border-[#9B2208]/30 self-start sm:self-auto">
                        Pricing: K5,000/mo
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#FAFAF9]/75">
                      Please complete the fields below to help us tailor your AI Growth Blueprint.
                    </p>
                  </div>

                  {/* Implementation Path Preference Selector */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white font-syne">
                        Implementation Track Preference
                      </label>
                      <button
                        type="button"
                        onClick={() => onNavigate('solutions')}
                        className="text-[11px] font-semibold text-[#D95A1A] hover:text-white cursor-pointer underline"
                      >
                        Compare Path 1 vs Path 2
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, implementationPath: 'path1-build' })}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          formData.implementationPath === 'path1-build'
                            ? 'bg-[#24110A] border-[#9B2208] text-white shadow-md'
                            : 'bg-[#090604] border-white/10 text-[#FAFAF9]/70 hover:border-white/20'
                        }`}
                      >
                        <div className="font-bold text-xs font-syne text-white">Path 1: Build Store</div>
                        <p className="text-[10px] text-[#FAFAF9]/60 mt-0.5 leading-snug">No online presence yet</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, implementationPath: 'path2-upgrade' })}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          formData.implementationPath === 'path2-upgrade'
                            ? 'bg-[#24110A] border-[#9B2208] text-white shadow-md'
                            : 'bg-[#090604] border-white/10 text-[#FAFAF9]/70 hover:border-white/20'
                        }`}
                      >
                        <div className="font-bold text-xs font-syne text-white">Path 2: Upgrade Store</div>
                        <p className="text-[10px] text-[#FAFAF9]/60 mt-0.5 leading-snug">Shopify / WooCommerce / Custom</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, implementationPath: 'undecided' })}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          formData.implementationPath === 'undecided'
                            ? 'bg-[#24110A] border-[#9B2208] text-white shadow-md'
                            : 'bg-[#090604] border-white/10 text-[#FAFAF9]/70 hover:border-white/20'
                        }`}
                      >
                        <div className="font-bold text-xs font-syne text-white">Need Guidance</div>
                        <p className="text-[10px] text-[#FAFAF9]/60 mt-0.5 leading-snug">Decide during consultation</p>
                      </button>
                    </div>
                  </div>

                  {/* Row 1: Business Name & Owner Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white font-syne flex items-center gap-1">
                        <span>Business / Store Name</span>
                        <span className="text-[#D95A1A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lusaka Modern Boutiques"
                        value={formData.businessName}
                        onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090604] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/30 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white font-syne flex items-center gap-1">
                        <span>Your Full Name</span>
                        <span className="text-[#D95A1A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mary Tembo"
                        value={formData.ownerName}
                        onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090604] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white font-syne flex items-center gap-1">
                        <span>WhatsApp / Phone Number</span>
                        <span className="text-[#D95A1A]">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.phoneCountryCode}
                          onChange={e => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                          className="px-3 py-3 rounded-xl bg-[#090604] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D95A1A]"
                        >
                          <option value="+260">+260 (ZM)</option>
                          <option value="+27">+27 (ZA)</option>
                          <option value="+254">+254 (KE)</option>
                          <option value="+234">+234 (NG)</option>
                          <option value="+44">+44 (UK)</option>
                          <option value="+1">+1 (US)</option>
                          <option value="+263">+263 (ZW)</option>
                        </select>
                        <input
                          type="tel"
                          required
                          placeholder="97 1234567"
                          value={formData.phoneNumber}
                          onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#090604] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/30 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white font-syne flex items-center gap-1">
                        <span>Email Address</span>
                        <span className="text-[#D95A1A]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@store.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090604] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: City & Business Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white font-syne flex items-center gap-1">
                        <span>City / Location</span>
                        <span className="text-[#D95A1A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lusaka / Ndola / Livingstone"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090604] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/30 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white font-syne flex items-center gap-1">
                        <span>Retail Sector</span>
                        <span className="text-[#D95A1A]">*</span>
                      </label>
                      <select
                        value={formData.businessCategory}
                        onChange={e => setFormData({ ...formData, businessCategory: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090604] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white transition-colors"
                      >
                        {CATEGORY_OPTIONS.map(opt => (
                          <option key={opt} value={opt} className="bg-[#140D08]">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Current Active Sales Channels (Multi-select) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white font-syne block">
                      Where do you currently sell or receive customer inquiries? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {SALES_CHANNEL_OPTIONS.map(ch => {
                        const isChecked = formData.currentSalesChannels.includes(ch);
                        return (
                          <button
                            type="button"
                            key={ch}
                            onClick={() => handleChannelToggle(ch)}
                            className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                              isChecked
                                ? 'bg-[#20110A] border-[#9B2208] text-white'
                                : 'bg-[#090604] border-white/5 text-white/60 hover:text-white hover:border-white/20'
                            }`}
                          >
                            <span>{ch}</span>
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center ${isChecked ? 'bg-[#9B2208] text-white' : 'border border-white/20'}`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Monthly Enquiries & Preferred Consultation Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white font-syne block">
                        Estimated Monthly Customer Inquiries
                      </label>
                      <select
                        value={formData.monthlyEnquiries}
                        onChange={e => setFormData({ ...formData, monthlyEnquiries: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090604] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white"
                      >
                        <option value="<50" className="bg-[#140D08]">&lt; 50 inquiries / month</option>
                        <option value="50-200" className="bg-[#140D08]">50 – 200 inquiries / month</option>
                        <option value="200-500" className="bg-[#140D08]">200 – 500 inquiries / month</option>
                        <option value="500-1000" className="bg-[#140D08]">500 – 1,000 inquiries / month</option>
                        <option value="1000+" className="bg-[#140D08]">1,000+ inquiries / month</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white font-syne block">
                        Preferred Consultation Format
                      </label>
                      <select
                        value={formData.preferredConsultationMethod}
                        onChange={e => setFormData({ ...formData, preferredConsultationMethod: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090604] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white"
                      >
                        <option value="Google Meet" className="bg-[#140D08]">Google Meet (Video)</option>
                        <option value="Zoom" className="bg-[#140D08]">Zoom (Video)</option>
                        <option value="Phone" className="bg-[#140D08]">Direct Phone Call / WhatsApp Audio</option>
                        <option value="In Person" className="bg-[#140D08]">In Person (Lusaka Only)</option>
                      </select>
                    </div>
                  </div>

                  {/* Biggest Challenge */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white font-syne flex items-center gap-1">
                      <span>What is your biggest day-to-day retail bottleneck or headache?</span>
                      <span className="text-[#D95A1A]">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Missing evening customer inquiries on WhatsApp, spending 3 hours daily typing prices and delivery fees, abandoned carts on Instagram..."
                      value={formData.biggestChallenge}
                      onChange={e => setFormData({ ...formData, biggestChallenge: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#090604] border border-white/10 focus:border-[#D95A1A] focus:outline-none text-xs sm:text-sm text-white placeholder-white/30 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-syne font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-2xl hover:shadow-[#9B2208]/40 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer active:scale-98 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin text-white" />
                        <span>{submissionStep || 'Processing Consultation Request...'}</span>
                      </div>
                    ) : (
                      <>
                        <span>Book My AI Growth Consultation</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-white/50 space-y-1">
                    <p>
                      By submitting, you agree to receive a tailored retail growth assessment. Your contact details remain strictly confidential and will never be shared.
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
