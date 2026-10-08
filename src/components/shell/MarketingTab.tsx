import React, { useState } from 'react';
import { 
  Megaphone, 
  Sparkles, 
  Send, 
  Clock, 
  CheckCircle2, 
  Calendar,
  MessageSquare,
  Users,
  Flame,
  ArrowRight
} from 'lucide-react';
import { BusinessRoleItem } from '../../services/apiClient';

interface MarketingTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

export const MarketingTab: React.FC<MarketingTabProps> = ({ business, role }) => {
  const [selectedCampaignType, setSelectedCampaignType] = useState<'flash_sale' | 'abandoned_cart' | 'vip_broadcast'>('flash_sale');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [targetAudience, setTargetAudience] = useState('All Lusaka WhatsApp Shoppers (142 contacts)');
  const [generatedCopy, setGeneratedCopy] = useState(
    `🔥 Exclusive Weekend Flash Sale at ${business.name}!\nGet 15% OFF all in-stock sneakers and footwear this weekend only. Reply to this WhatsApp to claim your discount code or place your order with free express dispatch in Lusaka! 👟📦`
  );
  const [isScheduled, setIsScheduled] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Header with Preview Badge (Hard Rule 10) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#E58330]" />
            <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
              Autonomous AI Marketing & Campaigns
            </h2>
            {/* Marked PREVIEW per Hard Rule 10 */}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Preview
            </span>
          </div>
          <p className="text-xs font-dm text-[#F5EDE4]/70">
            Automate personalized promotions and re-engagement broadcasts across your customer WhatsApp channels.
          </p>
        </div>
      </div>

      {/* Campaign Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Settings Form */}
        <div className="lg:col-span-5 rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-syne font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E58330]" />
            <span>Generate New Broadcast</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-mono text-[#F5EDE4]/70 mb-1">Campaign Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'flash_sale', label: 'Flash Sale' },
                  { id: 'abandoned_cart', label: 'Cart Nudge' },
                  { id: 'vip_broadcast', label: 'VIP Broadcast' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedCampaignType(t.id as any);
                      if (t.id === 'abandoned_cart') {
                        setGeneratedCopy(`Hi from ${business.name}! We noticed you were eyeing our items. We reserved your size for the next 2 hours. Reply to complete order via Airtel Money!`);
                      } else if (t.id === 'vip_broadcast') {
                        setGeneratedCopy(`Special VIP alert for ${business.name} regulars! New arrivals just landed in Lusaka. Order before public release with priority delivery!`);
                      } else {
                        setGeneratedCopy(`🔥 Weekend Flash Sale at ${business.name}! Get ${discountPercent}% OFF in-stock items. Reply to order with same-day express delivery!`);
                      }
                    }}
                    className={`p-2 rounded-xl text-center font-syne font-bold transition-all cursor-pointer ${
                      selectedCampaignType === t.id
                        ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow'
                        : 'bg-white/5 text-[#F5EDE4]/60 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[#F5EDE4]/70 mb-1">Target Customer Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white"
              >
                <option value="All Lusaka WhatsApp Shoppers (142 contacts)">All Lusaka WhatsApp Shoppers (142 contacts)</option>
                <option value="Repeat Buyers (28 contacts)">Repeat Buyers (28 contacts)</option>
                <option value="Unfinished Enquiries Past 7 Days (45 contacts)">Unfinished Enquiries Past 7 Days (45 contacts)</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[#F5EDE4]/70 mb-1">Discount Offer (%)</label>
              <input
                type="number"
                min={5}
                max={50}
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-xs font-syne font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Message Preview</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#F5EDE4]/50">
                AI Worker Draft
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#070402] border border-white/5 space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#1B291A] border border-emerald-500/30 text-emerald-100 font-dm text-xs leading-relaxed whitespace-pre-line shadow">
                {generatedCopy}
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#F5EDE4]/50">
                <Users className="w-3.5 h-3.5 text-[#E58330]" />
                <span>Recipients: {targetAudience}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-[11px] font-dm text-[#F5EDE4]/50">
              * Broadcast will dispatch through connected WhatsApp Cloud API
            </span>

            <button
              type="button"
              onClick={() => {
                setIsScheduled(true);
                setTimeout(() => setIsScheduled(false), 3000);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#9B2208]/20 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isScheduled ? 'Broadcast Queued!' : 'Dispatch Campaign'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
