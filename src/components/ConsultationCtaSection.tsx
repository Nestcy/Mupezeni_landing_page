import React, { useState } from 'react';
import { ConsultationBookingData } from '../types';
import { 
  generateWhatsAppBookingUrl, 
  generateMailtoLink, 
  saveConsultationToFirestore, 
  sendConsultationEmailNotification 
} from '../services/consultationService';
import { Send, CheckCircle2, MessageSquare, Phone, Mail, ShieldCheck, Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ConsultationCtaSectionProps {
  id?: string;
  onNavigateToContact?: () => void;
  onNavigateToHowItWorks?: () => void;
}

export const ConsultationCtaSection: React.FC<ConsultationCtaSectionProps> = ({ 
  id = 'consultation',
  onNavigateToContact,
  onNavigateToHowItWorks
}) => {
  const [formData, setFormData] = useState<ConsultationBookingData>({
    businessName: '',
    ownerName: '',
    phoneCountryCode: '+260',
    phoneNumber: '',
    email: '',
    city: 'Lusaka',
    businessCategory: 'Retail & Commerce',
    currentSalesChannels: ['WhatsApp', 'Instagram'],
    monthlyEnquiries: '50-200',
    biggestChallenge: 'Staying responsive to after-hour customer enquiries and keeping marketing active.',
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

  const handleContactClick = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      window.location.hash = '#contact';
    }
  };

  const handleHowItWorksClick = () => {
    if (onNavigateToHowItWorks) {
      onNavigateToHowItWorks();
    } else {
      window.location.hash = '#how-it-works';
    }
  };

  return (
    <section id={id} className="py-20 sm:py-28 bg-[#0A0705] text-[#FAFAF9] relative overflow-hidden border-t border-b border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#9B2208]/12 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-14">
        
        {/* Main CTA Block */}
        <div className="rounded-3xl bg-gradient-to-r from-[#180C07] via-[#221008] to-[#180C07] border border-[#B83A0A]/40 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                The Decisive Question
              </span>
              <div className="h-[1px] w-12 bg-[#9B2208]/50 mx-auto" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
              How many potential sales are you leaving unattended?
            </h2>

            <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/85 max-w-xl mx-auto leading-relaxed">
              Your business is already creating opportunities. Mupezeni helps you{' '}
              <span className="font-editorial text-xl sm:text-2xl text-[#FAFAF9] italic">
                act on more of them.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={handleContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-syne font-bold text-sm shadow-xl shadow-[#9B2208]/40 hover:shadow-[#9B2208]/60 hover:scale-105 active:scale-98 transition-all cursor-pointer"
              >
                <span>Get Your AI Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleHowItWorksClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#0A0705] border border-white/15 hover:border-white/30 text-[#FAFAF9] font-syne font-bold text-sm transition-all cursor-pointer"
              >
                <span>See How It Works</span>
                <ArrowUpRight className="w-4 h-4 text-[#F5EDE4]/60" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
