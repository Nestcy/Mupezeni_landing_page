import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Target,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { formatMinorUnits } from '../../services/apiClient';
import { BusinessRoleItem } from '../../services/apiClient';

interface AdsTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

export const AdsTab: React.FC<AdsTabProps> = ({ business, role }) => {
  const [dailyBudgetMajor, setDailyBudgetMajor] = useState(150);
  const [adObjective, setAdObjective] = useState<'click_to_whatsapp' | 'catalog_sales'>('click_to_whatsapp');
  const [isLaunched, setIsLaunched] = useState(false);

  const currency = business.currency || 'ZMW';
  const dailyBudgetMinor = dailyBudgetMajor * 100;

  return (
    <div className="space-y-6">
      
      {/* Header with Preview Badge (Hard Rule 10) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#CD481B]" />
            <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
              AI Click-to-WhatsApp Ads
            </h2>
            {/* Marked PREVIEW per Hard Rule 10 */}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Preview
            </span>
          </div>
          <p className="text-xs font-dm text-[#F5EDE4]/70">
            Drive high-intent shoppers from Facebook & Instagram directly into chat conversations handled by your AI worker.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ad Campaign Setup */}
        <div className="lg:col-span-5 rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-syne font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-[#E58330]" />
            <span>Targeting & Budget</span>
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block font-mono text-[#F5EDE4]/70 mb-1">Campaign Objective</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAdObjective('click_to_whatsapp')}
                  className={`p-2 rounded-xl text-center font-syne font-bold cursor-pointer ${
                    adObjective === 'click_to_whatsapp'
                      ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow'
                      : 'bg-white/5 text-[#F5EDE4]/60'
                  }`}
                >
                  Click-to-WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setAdObjective('catalog_sales')}
                  className={`p-2 rounded-xl text-center font-syne font-bold cursor-pointer ${
                    adObjective === 'catalog_sales'
                      ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow'
                      : 'bg-white/5 text-[#F5EDE4]/60'
                  }`}
                >
                  Catalog Retargeting
                </button>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                Daily Budget ({currency})
              </label>
              <input
                type="number"
                min={20}
                value={dailyBudgetMajor}
                onChange={(e) => setDailyBudgetMajor(Number(e.target.value))}
                className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
              />
              <span className="text-[10px] font-mono text-[#F5EDE4]/50 mt-1 block">
                Minor units: {dailyBudgetMinor} · Major: {formatMinorUnits(dailyBudgetMinor, currency)}
              </span>
            </div>

            <div>
              <label className="block font-mono text-[#F5EDE4]/70 mb-1">Target Geographic Location</label>
              <input
                type="text"
                readOnly
                value="Lusaka, Zambia (+25km radius) · Ages 18-45"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[#F5EDE4]/80 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Ad Mockup */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-xs font-syne font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#CD481B]" />
                <span>Sponsored Social Feed Ad Mockup</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                AI Worker Destination
              </span>
            </div>

            {/* Simulated Feed Ad */}
            <div className="max-w-sm mx-auto rounded-2xl bg-[#050302] border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-3 flex items-center gap-2.5 border-b border-white/5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9B2208] to-[#CD481B] text-white flex items-center justify-center font-bold text-xs">
                  {business.name.charAt(0)}
                </div>
                <div>
                  <div className="font-syne font-bold text-xs text-white">{business.name}</div>
                  <div className="text-[9px] font-dm text-[#F5EDE4]/50">Sponsored · Lusaka</div>
                </div>
              </div>

              <div className="h-44 bg-black/60 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" 
                  alt="Product" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="p-3 space-y-2 bg-[#0C0805]">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-mono text-[#F5EDE4]/60 uppercase">MEN'S FOOTWEAR</div>
                    <div className="text-xs font-syne font-bold text-white">Lusaka Same-Day Express Delivery</div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-[11px] flex items-center gap-1 shadow">
                    <MessageSquare className="w-3 h-3" />
                    <span>Send WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-[11px] font-dm text-[#F5EDE4]/50">
              * Connected directly to your WhatsApp Business endpoint
            </span>

            <button
              type="button"
              onClick={() => {
                setIsLaunched(true);
                setTimeout(() => setIsLaunched(false), 3000);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#9B2208]/20 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isLaunched ? 'Campaign Active!' : 'Launch Click-to-WhatsApp Ad'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
