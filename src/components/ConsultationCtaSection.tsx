import React, { useState } from 'react';
import { ConsultationBookingData } from '../types';
import { 
  generateWhatsAppBookingUrl, 
  generateMailtoLink, 
  saveConsultationToFirestore, 
  sendConsultationEmailNotification 
} from '../services/consultationService';
import { Send, CheckCircle2, MessageSquare, Phone, Mail, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface ConsultationCtaSectionProps {
  id?: string;
  onNavigateToContact?: () => void;
}

export const ConsultationCtaSection: React.FC<ConsultationCtaSectionProps> = ({ 
  id = 'consultation',
  onNavigateToContact
}) => {
  const [formData, setFormData] = useState<ConsultationBookingData>({
    businessName: '',
    ownerName: '',
    phoneCountryCode: '+260',
    phoneNumber: '',
    email: '',
    city: 'Lusaka',
    businessCategory: 'Fashion & Apparel',
    currentSalesChannels: ['WhatsApp', 'Instagram'],
    monthlyEnquiries: '50-200',
    biggestChallenge: 'Answering repetitive messages after hours and finding time to create daily marketing content.',
    preferredConsultationMethod: 'Google Meet',
    implementationPath: 'path1-build'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
      console.error('Consultation booking error:', err);
      setWhatsappUrl(generateWhatsAppBookingUrl(formData));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleChannel = (channel: string) => {
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

  return (
    <section id={id} className="py-16 sm:py-24 bg-[#050302] relative overflow-hidden border-t border-[#1F120A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>30-Minute Free Strategy Session</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get Your AI Team Ready to Deploy
          </h2>
          <p className="text-sm text-[#A8A099]">
            Book a 30-minute private consultation with our AI retail architect. We analyze your catalog, test your workflow, and demonstrate your custom AI workers live.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#0A0604] border border-[#2B180D] p-6 sm:p-10 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Store Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                    Retail Store / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Lusaka Urban Footwear"
                    className="w-full px-4 py-3 rounded-xl bg-[#140C07] border border-[#2D1B0F] text-white text-sm focus:outline-none focus:border-[#E58330]"
                  />
                </div>

                {/* Owner Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                    Owner / Managing Director Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder="e.g. Ernest Zimba"
                    className="w-full px-4 py-3 rounded-xl bg-[#140C07] border border-[#2D1B0F] text-white text-sm focus:outline-none focus:border-[#E58330]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                    WhatsApp Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.phoneCountryCode}
                      onChange={e => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                      className="px-3 py-3 rounded-xl bg-[#140C07] border border-[#2D1B0F] text-white text-xs font-mono focus:outline-none focus:border-[#E58330]"
                    >
                      <option value="+260">+260 (ZM)</option>
                      <option value="+27">+27 (ZA)</option>
                      <option value="+254">+254 (KE)</option>
                      <option value="+263">+263 (ZW)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+1">+1 (US)</option>
                    </select>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="97 123 4567"
                      className="w-full px-4 py-3 rounded-xl bg-[#140C07] border border-[#2D1B0F] text-white text-sm focus:outline-none focus:border-[#E58330]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@yourstore.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#140C07] border border-[#2D1B0F] text-white text-sm focus:outline-none focus:border-[#E58330]"
                  />
                </div>

                {/* Retail Category */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                    Retail Category
                  </label>
                  <select
                    value={formData.businessCategory}
                    onChange={e => setFormData({ ...formData, businessCategory: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#140C07] border border-[#2D1B0F] text-white text-sm focus:outline-none focus:border-[#E58330]"
                  >
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Electronics & Phones">Electronics & Phones</option>
                    <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                    <option value="Home & Furniture">Home & Furniture</option>
                    <option value="Supermarket & Food">Supermarket & Food</option>
                    <option value="Hardware & Building">Hardware & Building</option>
                    <option value="Other Retail">Other Retail</option>
                  </select>
                </div>

                {/* Preferred Format */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                    Preferred Session Format
                  </label>
                  <select
                    value={formData.preferredConsultationMethod}
                    onChange={e => setFormData({ ...formData, preferredConsultationMethod: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-[#140C07] border border-[#2D1B0F] text-white text-sm focus:outline-none focus:border-[#E58330]"
                  >
                    <option value="Google Meet">Google Meet (Screen share demo)</option>
                    <option value="Phone">WhatsApp Phone Call</option>
                    <option value="In Person">In Person (Lusaka Office/Store)</option>
                  </select>
                </div>
              </div>

              {/* Current Channels */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                  Current Customer Inflow Channels (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {['WhatsApp', 'Instagram', 'Facebook', 'TikTok', 'Physical Walk-ins', 'Website / E-Commerce'].map(ch => {
                    const active = formData.currentSalesChannels.includes(ch);
                    return (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => toggleChannel(ch)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          active
                            ? 'bg-gradient-to-r from-[#9B2208] to-[#B83010] text-white font-bold shadow-md'
                            : 'bg-[#140C07] text-[#A8A099] border border-[#2D1B0F] hover:text-white'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Biggest Operational Bottleneck */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                  Biggest Operational Challenge
                </label>
                <textarea
                  rows={2}
                  value={formData.biggestChallenge}
                  onChange={e => setFormData({ ...formData, biggestChallenge: e.target.value })}
                  placeholder="e.g. We get 80 DMs a day and miss orders while we are packaging."
                  className="w-full px-4 py-3 rounded-xl bg-[#140C07] border border-[#2D1B0F] text-white text-sm focus:outline-none focus:border-[#D95A1A]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#A8A099]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero commitment • Month-to-month • 30-day money-back guarantee</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-extrabold text-sm shadow-xl shadow-[#9B2208]/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Scheduling Session...</span>
                  ) : (
                    <>
                      <span>Book Free Strategy Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Strategy Request Received!</h3>
                <p className="text-sm text-[#A8A099] max-w-md mx-auto">
                  Thank you, {formData.ownerName}. Our AI architect will review <strong>{formData.businessName}</strong> and prepare your live demo environment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp for Instant Confirm</span>
                  </a>
                )}
                {mailtoUrl && (
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F140D] hover:bg-[#2C1C13] text-[#D4CDC5] font-semibold text-sm border border-[#3A2214] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
