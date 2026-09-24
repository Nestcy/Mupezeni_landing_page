import React from 'react';
import { PageId } from '../types';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-16 bg-[#030202] min-h-screen text-[#F7F5F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Merchant Communication</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Connect With Our Retail Team
          </h1>
          <p className="text-base text-[#A8A099]">
            Have questions about custom catalog ingestion, WhatsApp API verification, or regional delivery routing? Speak with our team directly.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#090503] border border-[#24130A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">WhatsApp Fast Lane</h4>
            <p className="text-xs text-[#A8A099]">
              Instant text replies for retailers wanting a rapid quotation or onboarding timeline.
            </p>
            <a
              href="https://wa.me/260970000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-mono text-[#E58330] hover:underline pt-1"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-[#090503] border border-[#24130A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Email Inquiries</h4>
            <p className="text-xs text-[#A8A099]">
              For custom merchant partnerships, enterprise stores, and supplier integration.
            </p>
            <a
              href="mailto:hello.mupezeni@gmail.com"
              className="inline-block text-xs font-mono text-[#E58330] hover:underline pt-1"
            >
              hello.mupezeni@gmail.com &rarr;
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-[#090503] border border-[#24130A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Lusaka Operations</h4>
            <p className="text-xs text-[#A8A099]">
              Serving physical and online retailers throughout Lusaka, Copperbelt, and Southern Province.
            </p>
            <span className="inline-block text-xs font-mono text-[#E58330] pt-1">
              Lusaka, Zambia
            </span>
          </div>
        </div>

        {/* Consultation Form */}
        <ConsultationCtaSection />

      </div>
    </div>
  );
};
