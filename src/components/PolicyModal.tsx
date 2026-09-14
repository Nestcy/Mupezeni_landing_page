import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-gradient-to-b from-[#180E09] to-[#0A0705] border border-[#9B2208]/60 p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2C1008] border border-[#9B2208]/40 flex items-center justify-center text-[#D95A1A]">
              {type === 'privacy' ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <h3 className="text-xl font-black font-syne text-[#FAFAF9]">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#FAFAF9]/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto py-6 space-y-4 text-xs sm:text-sm text-[#FAFAF9]/80 leading-relaxed pr-2">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Last Updated: 2026</strong>
              </p>
              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">1. Overview</h4>
              <p>
                Mupezeni Technologies ("Mupezeni", "we", "our") respects the privacy and confidentiality of retail businesses, merchant owners, and their end customers. This policy describes how we collect, process, and protect data when you use our AI workforce platform.
              </p>

              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">2. Merchant Data Ownership</h4>
              <p>
                Your retail data, product catalogues, customer communications, and transaction histories remain 100% your proprietary property. Mupezeni does not sell, lease, or share your proprietary retail data with third parties.
              </p>

              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">3. Messaging & AI Privacy</h4>
              <p>
                Customer messages received via connected channels (WhatsApp, Instagram, Facebook, Web) are processed strictly for real-time customer support, order matching, inventory coordination, and automated sales workflows as authorized by the merchant.
              </p>

              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">4. Data Security</h4>
              <p>
                We apply bank-grade encryption in transit (TLS 1.3) and at rest (AES-256) across all message queues and database systems.
              </p>

              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">5. Contact</h4>
              <p>
                For privacy inquiries or data access requests, please email us at <span className="text-[#D95A1A]">nestcy770@gmail.com</span>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Last Updated: 2026</strong>
              </p>
              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">1. Acceptance of Terms</h4>
              <p>
                By applying to or participating in the Mupezeni Founding Retailer Program or deploying Mupezeni AI workers, you agree to these Terms of Service.
              </p>

              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">2. Platform Role</h4>
              <p>
                Mupezeni provides software and autonomous AI workflows to assist retailers in handling inquiries, marketing broadcasts, and order notifications. Merchants remain solely responsible for the quality, sourcing, fulfillment, and warranty of the physical goods they sell.
              </p>

              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">3. Founding Retailer Privileges</h4>
              <p>
                Founding cohort members receive grandfathered pricing, direct access to the product engineering channel, priority onboarding, and early feature deployments.
              </p>

              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">4. Acceptable Use</h4>
              <p>
                Merchants must comply with local commerce laws, consumer protection regulations, and official WhatsApp Business terms. Spamming or selling prohibited goods is strictly forbidden.
              </p>

              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">5. 30-Day 100% Money-Back Guarantee</h4>
              <p>
                Every new partner is backed by our 30-Day 100% Money-Back Guarantee. If within the first thirty (30) calendar days of active AI agent deployment you determine that Mupezeni has not provided tangible business value, saved operational hours, or improved your sales conversions, you may request a 100% refund of your initial monthly subscription fee. Refunds are disbursed within 24–48 hours via your original payment method (Airtel Money, MTN MoMo, or bank transfer).
              </p>

              <h4 className="font-bold text-[#FAFAF9] font-syne text-sm">6. Inquiries</h4>
              <p>
                Questions regarding platform terms may be directed to <span className="text-[#D95A1A]">nestcy770@gmail.com</span> (Kamwala South, Lusaka, Zambia).
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#9B2208] text-xs font-bold text-white hover:bg-[#D95A1A] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
