import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, 
  Store as StoreIcon,
  ShieldCheck, 
  Users, 
  Building2, 
  Lock, 
  Phone, 
  Mail,
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Palette,
  UploadCloud,
  Eye,
  Sparkles,
  ShoppingBag,
  RefreshCw,
  Send,
  MessageSquare
} from 'lucide-react';
import { apiClient, BusinessRoleItem } from '../../services/apiClient';

interface SettingsTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

interface StoreColors {
  primary: string;
  accent: string;
  background: string;
  text: string;
}

interface StoreContact {
  phone: string;
  email: string;
  address?: string;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ business, role }) => {
  const [activeSection, setActiveSection] = useState<'storefront' | 'operations'>('storefront');

  // Store Settings (GET/PATCH /businesses/{id}/store)
  const [storeName, setStoreName] = useState(business.name);
  const [storeSlug, setStoreSlug] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [aboutText, setAboutText] = useState('Curated retail store managed with autonomous AI workers by Mupezeni.');
  const [colors, setColors] = useState<StoreColors>({
    primary: '#B83010',
    accent: '#E58330',
    background: '#070503',
    text: '#FAFAF9'
  });
  const [contact, setContact] = useState<StoreContact>({
    phone: business.phone || '+260 77 609 1393',
    email: 'store@mupezeni.ai',
    address: 'East Park Mall, Lusaka, Zambia'
  });
  const [isPublished, setIsPublished] = useState(false);

  // Operations state
  const [currency, setCurrency] = useState(business.currency || 'ZMW');
  const [location, setLocation] = useState(business.location || 'Lusaka, Zambia');
  const [airtelNumber, setAirtelNumber] = useState('+260 97 123 4567');
  const [mtnNumber, setMtnNumber] = useState('+260 96 987 6543');
  const [expressDeliveryFee, setExpressDeliveryFee] = useState(45);

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isOwnerOrAdmin = role === 'owner' || role === 'admin';
  const isMember = role === 'member';

  // Load Store Settings via GET /businesses/{id}/store
  const loadStore = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.getStore(business.id);
      if (res?.store) {
        const s = res.store;
        setStoreName(s.name || business.name);
        setStoreSlug(s.slug || business.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        setLogoUrl(s.logo_url || s.logo || '');
        setAboutText(s.about || s.description || 'Curated retail store managed with autonomous AI workers.');
        if (s.colors) {
          setColors({
            primary: s.colors.primary || '#B83010',
            accent: s.colors.accent || '#E58330',
            background: s.colors.background || '#070503',
            text: s.colors.text || '#FAFAF9'
          });
        }
        if (s.contact) {
          setContact({
            phone: s.contact.phone || s.contact_phone || business.phone || '+260 77 609 1393',
            email: s.contact.email || s.contact_email || 'store@mupezeni.ai',
            address: s.contact.address || 'East Park Mall, Lusaka'
          });
        }
        setIsPublished(Boolean(s.is_published));
      }
    } catch (err) {
      console.warn('Store load note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStore();
  }, [business.id]);

  // Handle Logo Upload via POST /businesses/{id}/media (multipart)
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    setErrorNotice(null);
    try {
      const res = await apiClient.uploadMedia(business.id, file);
      if (res?.url) {
        setLogoUrl(res.url);
        setSuccessNotice('Logo uploaded! Click "Save Store Settings" to apply.');
        setTimeout(() => setSuccessNotice(null), 3000);
      }
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to upload logo image.');
    } finally {
      setIsUploadingLogo(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Save Store Settings: PATCH /businesses/{id}/store
  const handleSaveStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) {
      setErrorNotice('Store name is required.');
      return;
    }

    const cleanSlug = storeSlug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-') || 'store';
    setIsSaving(true);
    setErrorNotice(null);

    try {
      await apiClient.updateStore(business.id, {
        name: storeName.trim(),
        slug: cleanSlug,
        logo: logoUrl.trim(),
        logo_url: logoUrl.trim(),
        colors,
        about: aboutText.trim(),
        contact
      });

      setStoreSlug(cleanSlug);
      setSuccessNotice('✓ Store settings saved successfully!');
      setTimeout(() => setSuccessNotice(null), 3500);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to update store settings.');
    } finally {
      setIsSaving(false);
    }
  };

  // Publish Storefront: POST /businesses/{id}/store/publish
  const handlePublishStore = async () => {
    setIsPublishing(true);
    setErrorNotice(null);
    try {
      // First save latest edits
      await apiClient.updateStore(business.id, {
        name: storeName.trim(),
        slug: storeSlug.trim() || 'store',
        logo: logoUrl.trim(),
        logo_url: logoUrl.trim(),
        colors,
        about: aboutText.trim(),
        contact
      });

      const res = await apiClient.publishStore(business.id);
      if (res?.is_published || res?.success) {
        setIsPublished(true);
        setSuccessNotice('🎉 Storefront published live! Accessible to shoppers worldwide.');
        setTimeout(() => setSuccessNotice(null), 4000);
      }
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to publish storefront.');
    } finally {
      setIsPublishing(false);
    }
  };

  const storefrontPublicUrl = `${window.location.origin}/s/${storeSlug || 'store'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storefrontPublicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Notifications */}
      {successNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-dm flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}
      {errorNotice && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-dm flex items-center gap-2 shadow-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorNotice}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <StoreIcon className="w-4 h-4 text-[#E58330]" />
            <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
              Store Settings & Live Storefront
            </h2>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              isPublished 
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              {isPublished ? '● Published' : 'Draft Mode'}
            </span>
          </div>
          <p className="text-xs font-dm text-[#F5EDE4]/70">
            Customize your store URL, brand logo, palette colors, story, and WhatsApp contact with real-time live preview.
          </p>
        </div>

        {/* Action Buttons: Publish + Visit */}
        <div className="flex items-center gap-2.5">
          <a
            href={`/s/${storeSlug || 'store'}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-xs flex items-center gap-1.5 border border-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E58330]" />
            <span>Open /s/{storeSlug || 'store'}</span>
          </a>

          {!isMember && (
            <button
              type="button"
              onClick={handlePublishStore}
              disabled={isPublishing}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#9B2208]/20 cursor-pointer disabled:opacity-50"
            >
              {isPublishing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isPublished ? 'Re-Publish Store' : 'Publish Storefront'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
        <button
          type="button"
          onClick={() => setActiveSection('storefront')}
          className={`px-4 py-2 rounded-2xl text-xs font-syne font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'storefront'
              ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow-md'
              : 'text-[#F5EDE4]/60 hover:text-white bg-white/[0.02]'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Branding & Live Preview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('operations')}
          className={`px-4 py-2 rounded-2xl text-xs font-syne font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'operations'
              ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow-md'
              : 'text-[#F5EDE4]/60 hover:text-white bg-white/[0.02]'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Operations & Team Roles</span>
        </button>
      </div>

      {/* SECTION 1: STORE SETTINGS & LIVE PREVIEW */}
      {activeSection === 'storefront' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Form: Col 7 */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <StoreIcon className="w-4 h-4 text-[#E58330]" />
                <h3 className="text-sm font-syne font-bold text-white">
                  Storefront Settings (GET & PATCH /businesses/{'{id}'}/store)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#F5EDE4]/50">
                Live Preview Sync
              </span>
            </div>

            <form onSubmit={handleSaveStore} className="space-y-4 text-xs font-dm">
              {/* Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                    Store Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => {
                      setStoreName(e.target.value);
                      if (!storeSlug) {
                        setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                      }
                    }}
                    disabled={isMember}
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#E58330]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                    Store Slug (/s/:slug) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-white/40 text-[11px]">
                      /s/
                    </span>
                    <input
                      type="text"
                      required
                      value={storeSlug}
                      onChange={(e) => setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ''))}
                      disabled={isMember}
                      placeholder="urban-boutique"
                      className="w-full bg-[#130C08] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white font-mono text-[11px] disabled:opacity-50 focus:outline-none focus:border-[#E58330]"
                    />
                  </div>
                </div>
              </div>

              {/* Logo Upload & URL */}
              <div className="p-3.5 rounded-2xl bg-[#130C08] border border-white/10 space-y-2">
                <label className="block font-mono text-[#F5EDE4]/80">
                  Store Logo
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-black border border-white/15 overflow-hidden flex items-center justify-center shrink-0">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Store logo" className="w-full h-full object-cover" />
                    ) : (
                      <StoreIcon className="w-6 h-6 text-white/30" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="store-logo-file"
                      />
                      <label
                        htmlFor="store-logo-file"
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-syne font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-white/10"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-[#E58330]" />
                        <span>{isUploadingLogo ? 'Uploading...' : 'Upload Logo File'}</span>
                      </label>
                      <span className="text-[10px] font-mono text-[#F5EDE4]/50">
                        POST /businesses/{'{id}'}/media
                      </span>
                    </div>

                    <input
                      type="url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="Or enter logo image URL..."
                      className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Colors Palette */}
              <div className="p-3.5 rounded-2xl bg-[#130C08] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[#F5EDE4]/80 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#E58330]" />
                    <span>Storefront Brand Colors</span>
                  </label>
                  <span className="text-[10px] font-mono text-[#F5EDE4]/50">Hex / Pickers</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Primary */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#F5EDE4]/60 block">Primary Accent</span>
                    <div className="flex items-center gap-1.5 bg-[#0D0805] border border-white/10 rounded-xl p-1.5">
                      <input
                        type="color"
                        value={colors.primary}
                        onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={colors.primary}
                        onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                        className="w-full bg-transparent text-[11px] font-mono text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Secondary/Accent */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#F5EDE4]/60 block">Secondary Accent</span>
                    <div className="flex items-center gap-1.5 bg-[#0D0805] border border-white/10 rounded-xl p-1.5">
                      <input
                        type="color"
                        value={colors.accent}
                        onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={colors.accent}
                        onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                        className="w-full bg-transparent text-[11px] font-mono text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Background */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#F5EDE4]/60 block">Background</span>
                    <div className="flex items-center gap-1.5 bg-[#0D0805] border border-white/10 rounded-xl p-1.5">
                      <input
                        type="color"
                        value={colors.background}
                        onChange={(e) => setColors({ ...colors, background: e.target.value })}
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={colors.background}
                        onChange={(e) => setColors({ ...colors, background: e.target.value })}
                        className="w-full bg-transparent text-[11px] font-mono text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#F5EDE4]/60 block">Text Color</span>
                    <div className="flex items-center gap-1.5 bg-[#0D0805] border border-white/10 rounded-xl p-1.5">
                      <input
                        type="color"
                        value={colors.text}
                        onChange={(e) => setColors({ ...colors, text: e.target.value })}
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={colors.text}
                        onChange={(e) => setColors({ ...colors, text: e.target.value })}
                        className="w-full bg-transparent text-[11px] font-mono text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* About Text */}
              <div>
                <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                  About Store / Description
                </label>
                <textarea
                  rows={2}
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  placeholder="Share your brand story, sourcing principles, and store vision..."
                  className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
                />
              </div>

              {/* Contact (Phone, Email, Address) */}
              <div className="p-3.5 rounded-2xl bg-[#130C08] border border-white/10 space-y-2.5">
                <label className="block font-mono text-[#F5EDE4]/80">
                  Store Contact & WhatsApp Fallback Channel
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-mono text-[10px] text-[#F5EDE4]/50 mb-0.5">
                      WhatsApp / Phone (+260)
                    </label>
                    <input
                      type="text"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      placeholder="+260 77 609 1393"
                      className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-[#F5EDE4]/50 mb-0.5">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="store@mupezeni.ai"
                      className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#F5EDE4]/50 mb-0.5">
                    Dispatch Hub / Store Location
                  </label>
                  <input
                    type="text"
                    value={contact.address || ''}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    placeholder="e.g. East Park Mall, Great East Road, Lusaka"
                    className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] flex items-center gap-1.5 border border-white/10 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLink ? 'Copied Link' : 'Copy Store URL'}</span>
                  </button>
                </div>

                {!isMember && (
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#9B2208]/20 cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Store Settings</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Live Preview: Col 5 */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0D0805] border border-white/10 p-5 space-y-4 shadow-xl sticky top-20">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-syne font-bold text-white">
                  Live Storefront Preview
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Live Rendering
              </span>
            </div>

            <p className="text-[11px] font-dm text-[#F5EDE4]/60">
              Interactive preview matching the public storefront at <code className="text-[#E58330] font-mono">/s/{storeSlug || 'slug'}</code>.
            </p>

            {/* Simulated Mobile / Web Store Card */}
            <div 
              className="rounded-2xl border border-white/20 p-4 space-y-3.5 shadow-2xl transition-all"
              style={{ 
                backgroundColor: colors.background || '#070503',
                color: colors.text || '#FAFAF9'
              }}
            >
              {/* Header Bar */}
              <div 
                className="p-3 rounded-xl flex items-center justify-between shadow-sm border border-white/10"
                style={{ backgroundColor: colors.primary || '#B83010' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black/40 overflow-hidden flex items-center justify-center border border-white/20 shrink-0">
                    {logoUrl ? (
                      <img src={logoUrl} alt="logo" className="w-full h-full object-cover" />
                    ) : (
                      <StoreIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-xs text-white leading-tight">
                      {storeName || 'My Urban Store'}
                    </h4>
                    <span className="text-[9.5px] font-mono opacity-80 text-white">
                      /s/{storeSlug || 'store'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-white">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.2 rounded-full">
                    3
                  </span>
                </div>
              </div>

              {/* About description in preview */}
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                  About Our Store
                </span>
                <p className="text-[11px] font-dm opacity-90 line-clamp-2">
                  {aboutText}
                </p>
              </div>

              {/* Mock Product Card with Colors */}
              <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40 space-y-2">
                <div className="h-28 bg-black/70 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
                    alt="Sample Product" 
                    className="w-full h-full object-cover"
                  />
                  <span 
                    className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded-full text-white font-bold"
                    style={{ backgroundColor: colors.accent || '#E58330' }}
                  >
                    ZMW 850.00
                  </span>
                </div>

                <div className="p-3 pt-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-syne font-bold text-xs">
                      Men's Classic Low Runner
                    </span>
                  </div>

                  {/* Buttons in Card: Add to Cart + WhatsApp */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      className="py-1.5 px-2 rounded-lg text-white font-syne font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm"
                      style={{ backgroundColor: colors.primary || '#B83010' }}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      type="button"
                      className="py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* WhatsApp Fallback Footer in Preview */}
              <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">{contact.phone}</span>
                </div>
                <span className="text-[9.5px] font-mono text-emerald-400">
                  ● Order via WhatsApp Fallback Active
                </span>
              </div>
            </div>

            {/* Quick Link bar */}
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <span className="font-mono text-[10px] text-[#F5EDE4]/50 block">
                Public Storefront Endpoint
              </span>
              <div className="flex items-center justify-between bg-black/40 p-2 rounded-xl font-mono text-[11px] text-[#E58330] overflow-hidden">
                <span className="truncate">GET /public/stores/{storeSlug || 'store'}</span>
                <span className="text-white/40 text-[9px] shrink-0 pl-2">200 OK</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: OPERATIONS & TEAM ROLES */}
      {activeSection === 'operations' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Operations & Mobile Money (Col 7) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-syne font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#E58330]" />
              <span>Store Operations & Mobile Money</span>
            </h3>

            <div className="space-y-3.5 text-xs">
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
              </div>

              {/* Delivery and Mobile Money */}
              <div className="pt-2 border-t border-white/[0.06] space-y-3">
                <h4 className="font-syne font-bold text-white text-xs">
                  Zambian Mobile Money & Local Dispatch
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

              {isMember && (
                <div className="p-3 rounded-xl bg-white/5 text-[#F5EDE4]/60 text-xs font-dm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>You are signed in as a Team Member. Operational settings can only be saved by Admins or Owners.</span>
                </div>
              )}
            </div>
          </div>

          {/* Team Roles & Permissions (Col 5) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-syne font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Team & Role Enforcement</span>
              </h3>

              <p className="text-xs font-dm text-[#F5EDE4]/70">
                Per platform security rules, roles are strictly enforced on every API call.
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
          </div>

        </div>
      )}

    </div>
  );
};
