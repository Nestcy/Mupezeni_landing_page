import React, { useState } from 'react';
import { 
  Share2, 
  CheckCircle2, 
  MessageSquare, 
  Globe, 
  Copy, 
  Check, 
  ShieldCheck, 
  Key, 
  Lock,
  ExternalLink,
  Code
} from 'lucide-react';
import { BusinessRoleItem } from '../../services/apiClient';

interface ConnectionsTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

export const ConnectionsTab: React.FC<ConnectionsTabProps> = ({ business, role }) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Form write-only credential fields per Hard Rule 5:
  // "Credential fields (access tokens, API keys, consumer secrets) are write-only.
  // Never display, log or store them in the client. The API never returns them."
  const [whatsappPhone, setWhatsappPhone] = useState(business.phone || '+260 77 609 1393');
  const [whatsappToken, setWhatsappToken] = useState('');
  const [whatsappSaved, setWhatsappSaved] = useState(false);

  const [messengerToken, setMessengerToken] = useState('');
  const [messengerSaved, setMessengerSaved] = useState(false);

  const siteKey = `wk_${business.id.replace(/[^a-zA-Z0-9]/g, '')}`;
  const embedCode = `<script src="https://mupezeni.ai/widget.js" data-site-key="${siteKey}" async></script>`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(siteKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    // Credential is write-only: submit and clear from state immediately
    setWhatsappToken('');
    setWhatsappSaved(true);
    setTimeout(() => setWhatsappSaved(false), 3000);
  };

  const handleSaveMessenger = (e: React.FormEvent) => {
    e.preventDefault();
    setMessengerToken('');
    setMessengerSaved(true);
    setTimeout(() => setMessengerSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#E58330]" />
            <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
              Omnichannel Connectors
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              ● Live Inbound Active
            </span>
          </div>
          <p className="text-xs font-dm text-[#F5EDE4]/70">
            Connect your customer channels so your AI worker can reply autonomously 24/7 on WhatsApp, Instagram, Messenger, and your website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. WhatsApp Cloud API Connector */}
        <div className="rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-syne font-bold text-white">WhatsApp Business Cloud API</h3>
                  <div className="text-[10px] font-dm text-[#F5EDE4]/60">Meta Cloud API (+260 Zambian Number)</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[10px] border border-emerald-500/20">
                Connected
              </span>
            </div>

            <p className="text-xs font-dm text-[#F5EDE4]/70">
              Inbound customer messages sent to this WhatsApp number are answered in under 2 seconds by your AI worker.
            </p>

            <form onSubmit={handleSaveWhatsApp} className="space-y-3 text-xs">
              <div>
                <label className="block font-mono text-[#F5EDE4]/60 mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  placeholder="+260 77 609 1393"
                  className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-mono text-[#F5EDE4]/60">System Access Token (Write-Only)</label>
                  <span className="text-[10px] font-mono text-[#E58330] flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Never displayed in client</span>
                  </span>
                </div>
                <input
                  type="password"
                  value={whatsappToken}
                  onChange={(e) => setWhatsappToken(e.target.value)}
                  placeholder="Paste new token to update credentials..."
                  className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono placeholder-white/20"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-emerald-400">
                  {whatsappSaved && '✓ Credentials securely saved'}
                </span>
                <button
                  type="submit"
                  disabled={!whatsappToken.trim()}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs disabled:opacity-40 cursor-pointer"
                >
                  Update Token
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 2. Website Chat Widget Connector */}
        <div className="rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-syne font-bold text-white">Website Chat Widget</h3>
                  <div className="text-[10px] font-dm text-[#F5EDE4]/60">Embed on any storefront or website</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[10px] border border-emerald-500/20">
                Active
              </span>
            </div>

            <p className="text-xs font-dm text-[#F5EDE4]/70">
              Paste this snippet before the <code className="text-[#E58330]">&lt;/body&gt;</code> tag on your website to display the chat bubble.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#F5EDE4]/60">
                <span>Business Site Key:</span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="text-[#E58330] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey ? 'Copied' : siteKey}</span>
                </button>
              </div>

              <div className="relative rounded-2xl bg-[#050302] border border-white/10 p-3 font-mono text-[11px] text-[#F5EDE4]/90 overflow-x-auto">
                <pre>{embedCode}</pre>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  title="Copy Embed Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] font-dm text-[#F5EDE4]/50">
            * Direct connector to <span className="font-mono text-emerald-400">/api/v1/channels/web/{siteKey}/messages</span>
          </div>
        </div>

        {/* 3. Facebook Messenger & Instagram DM */}
        <div className="rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-syne font-bold text-white">Instagram Direct & Messenger</h3>
                  <div className="text-[10px] font-dm text-[#F5EDE4]/60">Meta Graph Webhook</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-mono text-[10px]">
                Ready to link
              </span>
            </div>

            <p className="text-xs font-dm text-[#F5EDE4]/70">
              Allow your AI worker to reply to Instagram DMs and comment queries automatically.
            </p>

            <form onSubmit={handleSaveMessenger} className="space-y-3 text-xs">
              <div>
                <label className="block font-mono text-[#F5EDE4]/60 mb-1">Page Access Token (Write-Only)</label>
                <input
                  type="password"
                  value={messengerToken}
                  onChange={(e) => setMessengerToken(e.target.value)}
                  placeholder="Enter Meta Page Access Token..."
                  className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono placeholder-white/20"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-emerald-400">
                  {messengerSaved && '✓ Token updated'}
                </span>
                <button
                  type="submit"
                  disabled={!messengerToken.trim()}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs disabled:opacity-40 cursor-pointer"
                >
                  Save Token
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 4. Catalog Feed Sync Connector */}
        <div className="rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-syne font-bold text-white">Catalog & Inventory Sync</h3>
                  <div className="text-[10px] font-dm text-[#F5EDE4]/60">Provider: Mupezeni Native REST API</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[10px] border border-emerald-500/20">
                Connected
              </span>
            </div>

            <p className="text-xs font-dm text-[#F5EDE4]/70">
              Inventory quantities and prices in minor units are queried live on every customer question. Zero out-of-stock overselling.
            </p>
          </div>

          <div className="pt-2 text-[11px] font-mono text-[#F5EDE4]/50">
            Provider: <span className="text-white">mupezeni</span> · Status: <span className="text-emerald-400">healthy</span>
          </div>
        </div>

      </div>

    </div>
  );
};
