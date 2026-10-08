import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Users, 
  Building2, 
  Lock, 
  Phone, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle,
  Trash2
} from 'lucide-react';
import { BusinessRoleItem } from '../../services/apiClient';

interface SettingsTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ business, role }) => {
  const [bizName, setBizName] = useState(business.name);
  const [currency, setCurrency] = useState(business.currency || 'ZMW');
  const [location, setLocation] = useState(business.location || 'Lusaka, Zambia');
  const [phone, setPhone] = useState(business.phone || '+260 77 609 1393');
  const [isSaved, setIsSaved] = useState(false);

  // Delivery & Mobile Money Settings
  const [airtelNumber, setAirtelNumber] = useState('+260 97 123 4567');
  const [mtnNumber, setMtnNumber] = useState('+260 96 987 6543');
  const [expressDeliveryFee, setExpressDeliveryFee] = useState(45);

  const isOwnerOrAdmin = role === 'owner' || role === 'admin';
  const isMember = role === 'member';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#E58330]" />
            <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
              Store & Business Settings
            </h2>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border capitalize ${
              role === 'owner' 
                ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' 
                : role === 'admin' 
                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' 
                  : 'bg-white/10 text-[#F5EDE4]/70 border-white/20'
            }`}>
              Your Role: {role || 'Owner'}
            </span>
          </div>
          <p className="text-xs font-dm text-[#F5EDE4]/70">
            Configure currency minor units, Zambian Mobile Money numbers, delivery fees, and team permissions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile Settings (Col 7) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-syne font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#E58330]" />
            <span>Store Profile & Operations</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-mono text-[#F5EDE4]/60 mb-1">Business Name</label>
              <input
                type="text"
                value={bizName}
                onChange={(e) => setBizName(e.target.value)}
                disabled={isMember}
                className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[#F5EDE4]/60 mb-1">Store Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled={isMember}
                  className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono disabled:opacity-50"
                >
                  <option value="ZMW">ZMW (Zambian Kwacha - Default)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="GBP">GBP (British Pound)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[#F5EDE4]/60 mb-1">Support Phone (+260)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isMember}
                  className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[#F5EDE4]/60 mb-1">Store Location & Dispatch Hub</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isMember}
                placeholder="e.g. East Park Mall, Lusaka"
                className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white disabled:opacity-50"
              />
            </div>

            {/* Delivery and Mobile Money */}
            <div className="pt-2 border-t border-white/[0.06] space-y-3">
              <h4 className="font-syne font-bold text-white text-xs">
                Mobile Money & Delivery Options
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[#F5EDE4]/60 mb-1">Airtel Money Merchant/Phone</label>
                  <input
                    type="text"
                    value={airtelNumber}
                    onChange={(e) => setAirtelNumber(e.target.value)}
                    disabled={isMember}
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[#F5EDE4]/60 mb-1">MTN Mobile Money Number</label>
                  <input
                    type="text"
                    value={mtnNumber}
                    onChange={(e) => setMtnNumber(e.target.value)}
                    disabled={isMember}
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[#F5EDE4]/60 mb-1">
                  Lusaka Express Delivery Fee ({currency})
                </label>
                <input
                  type="number"
                  value={expressDeliveryFee}
                  onChange={(e) => setExpressDeliveryFee(Number(e.target.value))}
                  disabled={isMember}
                  className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono disabled:opacity-50"
                />
              </div>
            </div>

            {/* Hard Rule 4: Hide admin-only actions from members */}
            {isMember ? (
              <div className="p-3 rounded-xl bg-white/5 text-[#F5EDE4]/60 text-xs font-dm flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>You are signed in as a Team Member. Business operational settings can only be saved by Admins or Owners.</span>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400">
                  {isSaved && '✓ Settings updated'}
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs cursor-pointer shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Team Roles & Permissions (Col 5) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-syne font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Team & Role Enforcement</span>
            </h3>

            <p className="text-xs font-dm text-[#F5EDE4]/70">
              Per platform access rules, roles are strictly enforced by the server on every API call.
            </p>

            <div className="space-y-2.5">
              {[
                { roleName: 'Owner', desc: 'Full control over billing, credentials, domain, and team.' },
                { roleName: 'Admin', desc: 'Can manage products, review orders, and approve discounts.' },
                { roleName: 'Member', desc: 'Can monitor inbox conversations and respond to customers.' }
              ].map((r) => (
                <div key={r.roleName} className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-syne font-bold text-xs text-white">
                      {r.roleName}
                    </span>
                    {role?.toLowerCase() === r.roleName.toLowerCase() && (
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-dm text-[#F5EDE4]/60">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Admin-only Danger Zone: Hidden from members per Hard Rule 4 */}
          {isOwnerOrAdmin && (
            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-syne font-bold text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Admin Actions</span>
              </div>
              <p className="text-[11px] font-dm text-[#F5EDE4]/50">
                Admin controls: Only visible to owners and administrators.
              </p>
              <button
                type="button"
                className="w-full py-2 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 border border-rose-500/30 text-xs font-syne font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Store Business (Admin Only)</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
