import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Store as StoreIcon, 
  Package, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Trash2, 
  ExternalLink,
  ShieldCheck, 
  Check, 
  AlertCircle, 
  Globe, 
  RefreshCw,
  Copy,
  Lock,
  MessageSquare,
  Facebook,
  Instagram,
  ShoppingBag,
  Zap,
  Phone,
  Radio
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageId } from '../types';
import { 
  apiClient, 
  BusinessRoleItem, 
  OnboardingResponse, 
  formatMinorUnits 
} from '../services/apiClient';

interface OnboardingPageProps {
  onNavigate: (page: PageId) => void;
}

type WizardStep = 1 | 2 | 3 | 4;

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onNavigate }) => {
  const { user, businesses, selectedBusiness, selectBusiness, refreshMe, isLoading: isAuthLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState<WizardStep>(() => {
    const params = new URLSearchParams(window.location.search);
    const stepParam = parseInt(params.get('step') || '0', 10);
    if (stepParam >= 1 && stepParam <= 4) return stepParam as WizardStep;
    return 1;
  });
  const [activeBusinessId, setActiveBusinessId] = useState<string>(
    selectedBusiness?.id || (businesses.length > 0 ? businesses[0].id : '')
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // ----------------------------------------------------
  // STEP 1: BUSINESS DETAILS STATE
  // POST /onboarding/businesses { name, path, country, currency, phone, email }
  // path: "existing_retail" | "mupezeni_managed"
  // ----------------------------------------------------
  const [bizName, setBizName] = useState(selectedBusiness?.name || '');
  const [bizPath, setBizPath] = useState<'existing_retail' | 'mupezeni_managed'>('existing_retail');
  const [country, setCountry] = useState('Zambia');
  const [currency, setCurrency] = useState('ZMW');
  const [phone, setPhone] = useState(selectedBusiness?.phone || '+260 77 609 1393');
  const [email, setEmail] = useState(user?.email || 'store@mupezeni.ai');

  // ----------------------------------------------------
  // STEP 2: CATALOG STATE
  // existing_retail -> choose Shopify or WooCommerce
  // mupezeni_managed -> Mupezeni Storefront
  // POST /businesses/{id}/connectors/catalog { provider, config, credentials }
  // ----------------------------------------------------
  const [catalogProvider, setCatalogProvider] = useState<'shopify' | 'woocommerce' | 'mupezeni'>(
    bizPath === 'mupezeni_managed' ? 'mupezeni' : 'shopify'
  );

  // Shopify form
  const [shopifyDomain, setShopifyDomain] = useState('');
  const [shopifyAccessToken, setShopifyAccessToken] = useState('');

  // WooCommerce form
  const [wooSiteUrl, setWooSiteUrl] = useState('');
  const [wooConsumerKey, setWooConsumerKey] = useState('');
  const [wooConsumerSecret, setWooConsumerSecret] = useState('');

  // ----------------------------------------------------
  // STEP 3: CHANNELS STATE
  // WhatsApp, Facebook, Instagram, Website chat
  // ----------------------------------------------------
  const [connectors, setConnectors] = useState<Array<{
    id: string;
    provider: string;
    status: string;
    name?: string;
    external_account_id?: string;
    connected_at?: string;
  }>>([]);

  // Website Chat
  const [webChatAllowedOrigins, setWebChatAllowedOrigins] = useState('https://mystore.com, https://localhost:3000');
  const [webChatSiteKey, setWebChatSiteKey] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Meta Authorize modal/asset picker
  const [authorizingProvider, setAuthorizingProvider] = useState<'whatsapp' | 'facebook' | 'instagram' | null>(null);
  const [authCode, setAuthCode] = useState('');
  const [authState, setAuthState] = useState('');
  const [availableAssets, setAvailableAssets] = useState<Array<{ id: string; name: string; phone_number?: string }>>([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);

  // ----------------------------------------------------
  // STEP 4: CHECKLIST & ACTIVATION
  // GET /businesses/{id}/onboarding
  // POST /businesses/{id}/onboarding/activate
  // ----------------------------------------------------
  const [onboardingData, setOnboardingData] = useState<OnboardingResponse | null>(null);
  const [isActivated, setIsActivated] = useState(false);

  // Load connectors & onboarding whenever activeBusinessId changes
  const loadBusinessData = async (bizId: string) => {
    if (!bizId) return;
    try {
      const [connData, obData] = await Promise.all([
        apiClient.getConnectors(bizId).catch(() => ({ connectors: [] })),
        apiClient.getOnboarding(bizId).catch(() => null)
      ]);

      if (connData?.connectors) {
        setConnectors(connData.connectors);
        const webConn = connData.connectors.find(c => c.provider === 'web');
        if (webConn) {
          setWebChatSiteKey(`wk_${bizId.replace(/[^a-zA-Z0-9]/g, '')}`);
        }
      }

      if (obData) {
        setOnboardingData(obData);
        if (obData.status === 'active') {
          setIsActivated(true);
        }
      }
    } catch (err) {
      console.warn('Onboarding load note:', err);
    }
  };

  useEffect(() => {
    if (activeBusinessId) {
      loadBusinessData(activeBusinessId);
    }
  }, [activeBusinessId]);

  // Sync catalog provider default when path changes
  useEffect(() => {
    if (bizPath === 'mupezeni_managed') {
      setCatalogProvider('mupezeni');
    } else if (catalogProvider === 'mupezeni') {
      setCatalogProvider('shopify');
    }
  }, [bizPath]);

  // ====================================================
  // STEP 1 HANDLER: POST /onboarding/businesses
  // ====================================================
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizName.trim()) {
      setErrorNotice('Please provide a business name.');
      return;
    }

    setIsSubmitting(true);
    setErrorNotice(null);

    try {
      const res = await apiClient.createOnboardingBusiness({
        name: bizName.trim(),
        path: bizPath,
        country: country.trim() || 'Zambia',
        currency: currency.trim() || 'ZMW',
        phone: phone.trim() || '+260 77 609 1393',
        email: email.trim() || (user?.email || 'store@mupezeni.ai')
      });

      if (res.business?.id || res.id) {
        const newBizId = res.business?.id || res.id;
        setActiveBusinessId(newBizId);
        selectBusiness(newBizId);
        await refreshMe();
        await loadBusinessData(newBizId);
        setSuccessNotice('Business created successfully! Proceeding to catalog connection.');
        setTimeout(() => setSuccessNotice(null), 3000);
        setCurrentStep(2);
      }
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to create business.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ====================================================
  // STEP 2 HANDLER: POST /businesses/{id}/connectors/catalog
  // ====================================================
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBusinessId) {
      setErrorNotice('No active business ID found. Please complete Step 1 first.');
      return;
    }

    setIsSubmitting(true);
    setErrorNotice(null);

    try {
      let config: any = {};
      let credentials: any = {};

      if (catalogProvider === 'shopify') {
        if (!shopifyDomain.trim()) {
          throw new Error('Please enter your Shopify store domain (e.g. mystore.myshopify.com)');
        }
        config = { shop_domain: shopifyDomain.trim() };
        credentials = { access_token: shopifyAccessToken.trim() };
      } else if (catalogProvider === 'woocommerce') {
        if (!wooSiteUrl.trim()) {
          throw new Error('Please enter your WooCommerce site URL (e.g. https://mystore.co.zm)');
        }
        config = { site_url: wooSiteUrl.trim() };
        credentials = {
          consumer_key: wooConsumerKey.trim(),
          consumer_secret: wooConsumerSecret.trim()
        };
      } else {
        // mupezeni_managed
        config = { provider: 'mupezeni_managed' };
      }

      await apiClient.connectCatalog(activeBusinessId, {
        provider: catalogProvider,
        config,
        credentials
      });

      // Clear write-only credentials from state immediately
      setShopifyAccessToken('');
      setWooConsumerSecret('');

      await loadBusinessData(activeBusinessId);
      setSuccessNotice('Catalog connected successfully! Now choose your shopper channels.');
      setTimeout(() => setSuccessNotice(null), 3000);
      setCurrentStep(3);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to connect catalog.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConnectMupezeniCatalog = async () => {
    if (!activeBusinessId) {
      setErrorNotice('No active business ID found. Please complete Step 1 first.');
      return;
    }
    setIsSubmitting(true);
    setErrorNotice(null);
    try {
      await apiClient.connectCatalog(activeBusinessId, {
        provider: 'mupezeni',
        config: { provider: 'mupezeni_managed' },
        credentials: {}
      });
      await loadBusinessData(activeBusinessId);
      setSuccessNotice('Connected provider "mupezeni" successfully!');
      setTimeout(() => setSuccessNotice(null), 3000);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to connect Mupezeni catalog.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ====================================================
  // STEP 3: META AUTHORIZE FLOW
  // POST .../connectors/{provider}/authorize -> redirect to authorize_url
  // /connect/callback route reads code+state, loads assets, then completes
  // ====================================================
  const handleStartMetaAuthorize = async (prov: 'whatsapp' | 'facebook' | 'instagram') => {
    if (!activeBusinessId) return;
    setIsSubmitting(true);
    setErrorNotice(null);

    try {
      const authRes = await apiClient.authorizeChannel(activeBusinessId, prov);
      if (authRes?.authorize_url) {
        // Redirect directly to authorize_url as specified
        window.location.href = authRes.authorize_url;
        return;
      }
      // Fallback redirect with constructed URL
      const c = authRes.code || `auth_${prov}_${Date.now()}`;
      const s = authRes.state || `st_${Date.now()}`;
      window.location.href = `/connect/callback?provider=${prov}&business_id=${encodeURIComponent(activeBusinessId)}&state=${encodeURIComponent(s)}&code=${encodeURIComponent(c)}`;
    } catch (err: any) {
      setErrorNotice(err?.message || `Failed to authorize ${prov}.`);
      setIsSubmitting(false);
    }
  };

  const handleCompleteMetaConnection = async () => {
    if (!authorizingProvider || !selectedAssetId || !activeBusinessId) return;
    setIsSubmitting(true);
    setErrorNotice(null);

    try {
      await apiClient.completeChannelConnection(activeBusinessId, authorizingProvider, {
        code: authCode,
        state: authState,
        external_account_id: selectedAssetId
      });

      setSuccessNotice(`Successfully connected ${authorizingProvider.toUpperCase()}!`);
      setTimeout(() => setSuccessNotice(null), 3000);
      setAuthorizingProvider(null);
      await loadBusinessData(activeBusinessId);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to complete channel connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Website Chat Connect: POST /businesses/{id}/connectors/web { allowed_origins }
  const handleConnectWebChat = async () => {
    if (!activeBusinessId) return;
    setIsSubmitting(true);
    setErrorNotice(null);

    try {
      const origins = webChatAllowedOrigins.split(',').map(s => s.trim()).filter(Boolean);
      const res = await apiClient.connectWebChat(activeBusinessId, { allowed_origins: origins });
      setWebChatSiteKey(res.site_key);
      setSuccessNotice('Website chat bubble generated!');
      setTimeout(() => setSuccessNotice(null), 3000);
      await loadBusinessData(activeBusinessId);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to connect web chat.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disconnect action: DELETE /businesses/{id}/connectors/{provider}
  const handleDisconnectConnector = async (provider: string) => {
    if (!activeBusinessId) return;
    try {
      await apiClient.disconnectConnector(activeBusinessId, provider);
      await loadBusinessData(activeBusinessId);
      setSuccessNotice(`Disconnected ${provider.toUpperCase()}.`);
      setTimeout(() => setSuccessNotice(null), 3000);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to disconnect channel.');
    }
  };

  // ====================================================
  // STEP 4 HANDLER: POST /businesses/{id}/onboarding/activate
  // enabled ONLY when can_activate is true
  // ====================================================
  const handleActivate = async () => {
    if (!activeBusinessId) return;
    setIsSubmitting(true);
    setErrorNotice(null);

    try {
      const res = await apiClient.activateOnboarding(activeBusinessId);
      if (res.status === 'active') {
        setIsActivated(true);
        setSuccessNotice('🎉 Store setup activated! Your autonomous AI retail workers are now LIVE.');
        await refreshMe();
        await loadBusinessData(activeBusinessId);
      }
    } catch (err: any) {
      setErrorNotice(err?.message || 'Cannot activate yet. Please complete all required connectors.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helpers for checking connector status
  const isChannelConnected = (provider: string) => {
    return connectors.some(c => c.provider === provider && c.status === 'connected');
  };

  const isCatalogConnected = connectors.some(c => ['shopify', 'woocommerce', 'mupezeni'].includes(c.provider));
  const hasAtLeastOneChannel = connectors.some(c => ['whatsapp', 'facebook', 'instagram', 'web'].includes(c.provider));
  const canActivate = onboardingData?.can_activate ?? (isCatalogConnected && hasAtLeastOneChannel);

  return (
    <div className="min-h-screen bg-[#040202] text-[#F7F5F0] pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* WIZARD HEADER & STEPPER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#140C07] border border-[#B83A0A]/40 text-xs font-mono text-[#E58330] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E58330]" />
            <span>4-Step Retail Worker Onboarding</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-syne text-white tracking-tight">
            Connect Your Store to Autonomous AI Workers
          </h1>

          <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70 max-w-xl mx-auto">
            Attach autonomous sales and marketing workers to your existing online store or launch with Mupezeni.
          </p>

          {/* Stepper Navigation Pills */}
          <div className="pt-4 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
            {[
              { num: 1, label: 'Business Details' },
              { num: 2, label: 'Catalog' },
              { num: 3, label: 'Channels' },
              { num: 4, label: 'Activate' }
            ].map(step => (
              <button
                key={step.num}
                type="button"
                onClick={() => {
                  // Allow jumping to steps only if business has been created
                  if (activeBusinessId || step.num === 1) {
                    setCurrentStep(step.num as WizardStep);
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-syne font-bold transition-all cursor-pointer ${
                  currentStep === step.num
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow-lg shadow-[#9B2208]/20'
                    : currentStep > step.num
                      ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                      : 'bg-white/[0.03] border border-white/10 text-[#F5EDE4]/50 hover:text-white'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                  currentStep === step.num
                    ? 'bg-white text-black'
                    : currentStep > step.num
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white/10 text-white'
                }`}>
                  {currentStep > step.num ? '✓' : step.num}
                </span>
                <span className="whitespace-nowrap">{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Global Notices */}
        {errorNotice && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-dm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorNotice}</span>
            </div>
            <button onClick={() => setErrorNotice(null)} className="text-rose-300 hover:text-white">✕</button>
          </div>
        )}

        {successNotice && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-dm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successNotice}</span>
            </div>
            <button onClick={() => setSuccessNotice(null)} className="text-emerald-300 hover:text-white">✕</button>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 1: BUSINESS DETAILS */}
        {/* POST /onboarding/businesses { name, path, country, currency, phone, email } */}
        {/* ========================================================= */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-[#0D0805] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="space-y-1 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#E58330]" />
                <h2 className="text-xl font-syne font-bold text-white">
                  Step 1: Business Details & Operational Setup
                </h2>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                Choose how your store operates and provide your business contact details.
              </p>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-5 text-xs">
              
              {/* Path Selection */}
              <div className="space-y-2">
                <label className="block font-mono text-[#F5EDE4]/70">
                  Select Your Operational Model (path)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div 
                    onClick={() => setBizPath('existing_retail')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      bizPath === 'existing_retail'
                        ? 'bg-[#1C120B] border-[#E58330] shadow-md'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-syne font-bold text-white text-sm">
                        I already sell online
                      </div>
                      <Radio className={`w-4 h-4 ${bizPath === 'existing_retail' ? 'text-[#E58330]' : 'text-white/30'}`} />
                    </div>
                    <p className="text-[11px] font-dm text-[#F5EDE4]/60">
                      Connect your existing <strong>Shopify</strong> or <strong>WooCommerce</strong> catalog without changing your current website.
                    </p>
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#E58330]">
                      path = "existing_retail"
                    </span>
                  </div>

                  <div 
                    onClick={() => setBizPath('mupezeni_managed')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      bizPath === 'mupezeni_managed'
                        ? 'bg-[#1C120B] border-[#E58330] shadow-md'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-syne font-bold text-white text-sm">
                        I need a store built
                      </div>
                      <Radio className={`w-4 h-4 ${bizPath === 'mupezeni_managed' ? 'text-[#E58330]' : 'text-white/30'}`} />
                    </div>
                    <p className="text-[11px] font-dm text-[#F5EDE4]/60">
                      Launch a managed online storefront hosted on Mupezeni with full catalog and delivery fee management.
                    </p>
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#E58330]">
                      path = "mupezeni_managed"
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="block font-mono text-[#F5EDE4]/70 mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  placeholder="e.g. Ernest Sneakers Lusaka"
                  className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:border-[#E58330]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Country */}
                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Zambia"
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                {/* Currency */}
                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">Currency (default ZMW)</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                  >
                    <option value="ZMW">ZMW (Zambian Kwacha - Default)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                    <option value="GBP">GBP (British Pound)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">Phone Number (+260)</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+260 77 609 1393"
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">Store Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="store@mupezeni.ai"
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !bizName.trim()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#9B2208]/20 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Business...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Catalog Setup</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: CATALOG CONNECTOR */}
        {/* existing_retail -> choose Shopify or WooCommerce -> POST .../catalog */}
        {/* mupezeni_managed -> Products screen / connect "mupezeni" */}
        {/* ========================================================= */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-[#0D0805] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="space-y-1 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#E58330]" />
                <h2 className="text-xl font-syne font-bold text-white">
                  Step 2: Connect Retail Catalog
                </h2>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                {bizPath === 'existing_retail'
                  ? 'Connect your existing Shopify or WooCommerce catalog so AI workers can search real stock.'
                  : 'Use your managed Mupezeni catalog. Products you configure are automatically available.'}
              </p>
            </div>

            <form onSubmit={handleStep2Submit} className="space-y-5 text-xs">
              
              {bizPath === 'existing_retail' ? (
                /* EXISTING RETAIL: SHOPIFY OR WOOCOMMERCE */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCatalogProvider('shopify')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        catalogProvider === 'shopify'
                          ? 'bg-[#1C120B] border-[#E58330] text-white shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-[#F5EDE4]/70'
                      }`}
                    >
                      <div className="font-syne font-bold text-sm">Shopify</div>
                      <div className="text-[10px] font-dm text-[#F5EDE4]/50 mt-0.5">name.myshopify.com + token</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCatalogProvider('woocommerce')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        catalogProvider === 'woocommerce'
                          ? 'bg-[#1C120B] border-[#E58330] text-white shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-[#F5EDE4]/70'
                      }`}
                    >
                      <div className="font-syne font-bold text-sm">WooCommerce</div>
                      <div className="text-[10px] font-dm text-[#F5EDE4]/50 mt-0.5">site_url + API keys</div>
                    </button>
                  </div>

                  {catalogProvider === 'shopify' && (
                    <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                      <div>
                        <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                          Shopify Domain (e.g. store.myshopify.com) *
                        </label>
                        <input
                          type="text"
                          required
                          value={shopifyDomain}
                          onChange={(e) => setShopifyDomain(e.target.value)}
                          placeholder="ernest-sneakers.myshopify.com"
                          className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono placeholder-white/30"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-mono text-[#F5EDE4]/70">Admin Access Token (Write-Only) *</label>
                          <span className="text-[10px] font-mono text-[#E58330] flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>Hard Rule 5 Write-Only</span>
                          </span>
                        </div>
                        <input
                          type="password"
                          required
                          value={shopifyAccessToken}
                          onChange={(e) => setShopifyAccessToken(e.target.value)}
                          placeholder="shpat_xxxxxxxxxxxxxxxxxxxx"
                          className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono placeholder-white/30"
                        />
                      </div>
                    </div>
                  )}

                  {catalogProvider === 'woocommerce' && (
                    <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                      <div>
                        <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                          WooCommerce Site URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={wooSiteUrl}
                          onChange={(e) => setWooSiteUrl(e.target.value)}
                          placeholder="https://mystore.co.zm"
                          className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[#F5EDE4]/70 mb-1">Consumer Key (Write-Only) *</label>
                          <input
                            type="password"
                            required
                            value={wooConsumerKey}
                            onChange={(e) => setWooConsumerKey(e.target.value)}
                            placeholder="ck_xxxxxxxxxxxxxxxx"
                            className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-[#F5EDE4]/70 mb-1">Consumer Secret (Write-Only) *</label>
                          <input
                            type="password"
                            required
                            value={wooConsumerSecret}
                            onChange={(e) => setWooConsumerSecret(e.target.value)}
                            placeholder="cs_xxxxxxxxxxxxxxxx"
                            className="w-full bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* MUPEZENI MANAGED */
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${isChannelConnected('mupezeni') ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                      <h4 className="font-syne font-bold text-white text-sm">
                        Mupezeni Native Managed Storefront & Catalog
                      </h4>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isChannelConnected('mupezeni')
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {isChannelConnected('mupezeni') ? '● Connected (mupezeni)' : 'Catalog Pending'}
                    </span>
                  </div>

                  <p className="text-xs font-dm text-[#F5EDE4]/70 leading-relaxed">
                    For Mupezeni-managed stores, first go to the Products screen to review or add your inventory, then connect provider <strong>"mupezeni"</strong> so your AI workers can autonomously search and sell products.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        window.history.pushState(null, '', '/dashboard?tab=products&from=onboarding');
                        onNavigate('dashboard');
                      }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-syne font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Package className="w-4 h-4 text-[#E58330]" />
                      <span>1. Go to Products Screen</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/40" />
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting || isChannelConnected('mupezeni')}
                      onClick={handleConnectMupezeniCatalog}
                      className={`p-3 rounded-xl font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                        isChannelConnected('mupezeni')
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          : 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>{isChannelConnected('mupezeni') ? 'Catalog Connected (mupezeni)' : '2. Connect Provider "mupezeni"'}</span>
                    </button>
                  </div>

                  {isChannelConnected('mupezeni') && (
                    <div className="pt-2 flex items-center justify-between border-t border-white/[0.05]">
                      <span className="text-[11px] font-mono text-emerald-400">
                        Provider: "mupezeni" · Status: Connected
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDisconnectConnector('mupezeni')}
                        className="text-xs font-syne font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Disconnect (DELETE)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Connecting Catalog...</span>
                    </>
                  ) : (
                    <>
                      <span>Save & Continue to Channels</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: CHANNELS */}
        {/* Cards for WhatsApp, Facebook, Instagram, Website chat */}
        {/* Meta cards call POST .../authorize -> redirect / callback -> POST .../complete */}
        {/* Website chat: POST .../connectors/web { allowed_origins } */}
        {/* ========================================================= */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-[#0D0805] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="space-y-1 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#E58330]" />
                <h2 className="text-xl font-syne font-bold text-white">
                  Step 3: Connect Customer Channels
                </h2>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                Link at least one customer channel. Your AI worker will answer inquiries and take orders automatically.
              </p>
            </div>

            {/* CHANNEL CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* 1. WHATSAPP CARD */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-syne font-bold text-white text-xs sm:text-sm">WhatsApp Business</h4>
                        <div className="text-[10px] font-dm text-[#F5EDE4]/50">Cloud API (+260 number)</div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isChannelConnected('whatsapp')
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {isChannelConnected('whatsapp') ? '● Connected' : 'Not Connected'}
                    </span>
                  </div>

                  <p className="text-[11px] font-dm text-[#F5EDE4]/65">
                    Answers shopper inquiries, confirms shoe/apparel sizes, and generates checkout links on WhatsApp.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {isChannelConnected('whatsapp') ? (
                    <button
                      type="button"
                      onClick={() => handleDisconnectConnector('whatsapp')}
                      className="text-xs font-syne font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartMetaAuthorize('whatsapp')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <span>Connect WhatsApp</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. FACEBOOK CARD */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Facebook className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-syne font-bold text-white text-xs sm:text-sm">Facebook Messenger</h4>
                        <div className="text-[10px] font-dm text-[#F5EDE4]/50">Meta Page Webhook</div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isChannelConnected('facebook')
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {isChannelConnected('facebook') ? '● Connected' : 'Not Connected'}
                    </span>
                  </div>

                  <p className="text-[11px] font-dm text-[#F5EDE4]/65">
                    Responds to Facebook page messages and queries from sponsored feed campaigns.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {isChannelConnected('facebook') ? (
                    <button
                      type="button"
                      onClick={() => handleDisconnectConnector('facebook')}
                      className="text-xs font-syne font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartMetaAuthorize('facebook')}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <span>Connect Facebook</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* 3. INSTAGRAM CARD */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-syne font-bold text-white text-xs sm:text-sm">Instagram Direct</h4>
                        <div className="text-[10px] font-dm text-[#F5EDE4]/50">Instagram Business DM</div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isChannelConnected('instagram')
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {isChannelConnected('instagram') ? '● Connected' : 'Not Connected'}
                    </span>
                  </div>

                  <p className="text-[11px] font-dm text-[#F5EDE4]/65">
                    Replies to Instagram direct messages, Story replies, and post comments 24/7.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {isChannelConnected('instagram') ? (
                    <button
                      type="button"
                      onClick={() => handleDisconnectConnector('instagram')}
                      className="text-xs font-syne font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartMetaAuthorize('instagram')}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <span>Connect Instagram</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* 4. WEBSITE CHAT WIDGET CARD */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#E58330]/20 text-[#E58330] flex items-center justify-center">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-syne font-bold text-white text-xs sm:text-sm">Website Chat Widget</h4>
                        <div className="text-[10px] font-dm text-[#F5EDE4]/50">Embeddable Bubble Widget</div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isChannelConnected('web')
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {isChannelConnected('web') ? '● Connected' : 'Not Connected'}
                    </span>
                  </div>

                  <p className="text-[11px] font-dm text-[#F5EDE4]/65">
                    Embed on any store or website. Generates a unique site key with allowed origin protection.
                  </p>

                  {!isChannelConnected('web') && (
                    <div className="space-y-1 pt-1">
                      <label className="block font-mono text-[10px] text-[#F5EDE4]/70">
                        Allowed Origins (comma-separated domains) *
                      </label>
                      <input
                        type="text"
                        value={webChatAllowedOrigins}
                        onChange={(e) => setWebChatAllowedOrigins(e.target.value)}
                        placeholder="https://mystore.com, https://localhost:3000"
                        className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-white/30 focus:border-[#E58330]"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/[0.05]">
                  {isChannelConnected('web') ? (
                    <button
                      type="button"
                      onClick={() => handleDisconnectConnector('web')}
                      className="text-xs font-syne font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Disconnect (DELETE)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleConnectWebChat}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer ml-auto"
                    >
                      <span>Connect Web Chat</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* WEBSITE CHAT EMBED SNIPPET (If connected or generated) */}
            {webChatSiteKey && (
              <div className="p-4 rounded-2xl bg-[#070402] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-syne font-bold text-white">
                  <span>Website Chat Embed Snippet</span>
                  <span className="font-mono text-[10px] text-emerald-400">Site Key: {webChatSiteKey}</span>
                </div>

                <div className="relative p-3 rounded-xl bg-black border border-white/5 font-mono text-[11px] text-[#F5EDE4]/90 overflow-x-auto">
                  <pre>{`<script src="https://mupezeni.ai/widget.js" data-site-key="${webChatSiteKey}" async></script>`}</pre>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`<script src="https://mupezeni.ai/widget.js" data-site-key="${webChatSiteKey}" async></script>`);
                      setCopiedSnippet(true);
                      setTimeout(() => setCopiedSnippet(false), 2000);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  >
                    {copiedSnippet ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Continue to Step 4 (Checklist & Activate)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STEP 4: CHECKLIST & ACTIVATION */}
        {/* GET .../onboarding, Activate button (POST .../activate) */}
        {/* enabled ONLY when can_activate is true */}
        {/* ========================================================= */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-[#0D0805] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="space-y-1 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-syne font-bold text-white">
                  Step 4: Checklist & AI Worker Activation
                </h2>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                Review your connected catalog and channels. When all prerequisites are ready, activate your AI workers!
              </p>
            </div>

            {/* CONNECTORS STATUS SUMMARY & DISCONNECT ACTION */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-syne font-bold text-white">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#E58330]" />
                  <span>Configured Connectors & Channels</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400">
                  {connectors.length} Connected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {[
                  { id: 'shopify', label: 'Shopify Store', type: 'Catalog' },
                  { id: 'woocommerce', label: 'WooCommerce Site', type: 'Catalog' },
                  { id: 'mupezeni', label: 'Mupezeni Managed', type: 'Catalog' },
                  { id: 'whatsapp', label: 'WhatsApp Business', type: 'Channel' },
                  { id: 'facebook', label: 'Facebook Messenger', type: 'Channel' },
                  { id: 'instagram', label: 'Instagram Direct', type: 'Channel' },
                  { id: 'web', label: 'Website Chat Widget', type: 'Channel' },
                ].map(prov => {
                  const isConn = isChannelConnected(prov.id);
                  const connDetails = connectors.find(c => c.provider === prov.id);
                  return (
                    <div 
                      key={prov.id}
                      className={`p-3 rounded-2xl border flex flex-col justify-between gap-2.5 transition-all ${
                        isConn 
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-white shadow-sm' 
                          : 'bg-white/[0.01] border-white/5 text-white/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5EDE4]/50">{prov.type}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isConn ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'bg-white/5 text-white/30'
                          }`}>
                            {isConn ? '● Connected' : 'Not Connected'}
                          </span>
                        </div>
                        <div className="font-syne font-bold text-xs text-white">{prov.label}</div>
                        {isConn && connDetails?.name && (
                          <div className="text-[10px] font-mono text-emerald-400/80 truncate">
                            {connDetails.name}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                        <span className="text-[10px] font-mono text-[#F5EDE4]/40">
                          {isConn ? 'Active' : 'Unlinked'}
                        </span>
                        {isConn && (
                          <button
                            type="button"
                            onClick={() => handleDisconnectConnector(prov.id)}
                            className="text-[11px] font-syne font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
                            title={`Disconnect ${prov.label}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Disconnect (DELETE)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CHECKLIST FROM GET /onboarding */}
            <div className="space-y-3">
              <h3 className="font-syne font-bold text-sm text-white">
                Readiness Verification Checklist
              </h3>

              <div className="space-y-2.5">
                {onboardingData?.steps?.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      step.completed
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-white'
                        : 'bg-white/[0.02] border-white/10 text-[#F5EDE4]/70'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                      step.completed ? 'bg-emerald-500 text-black font-bold' : 'border border-white/30 text-white/40'
                    }`}>
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-syne font-bold text-xs ${step.completed ? 'text-white' : 'text-white/80'}`}>
                          {step.title}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                          step.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/10 text-amber-300'
                        }`}>
                          {step.completed ? 'Ready' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-[11px] font-dm text-[#F5EDE4]/60 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVATION SECTION */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#170B06] to-[#251008] border border-[#B83A0A]/40 space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-syne font-bold text-white text-base">
                    {isActivated ? 'Store & AI Workers are ACTIVE' : 'Ready to Launch Autonomous Retail Worker?'}
                  </h4>
                  <p className="text-xs font-dm text-[#F5EDE4]/70">
                    {isActivated
                      ? 'Your workers are handling customer inquiries across WhatsApp and Web.'
                      : canActivate
                        ? 'All requirements are met! Click Activate to take your AI retail worker live.'
                        : 'Activation requires at least one catalog connector and at least one channel connector.'}
                  </p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold shrink-0 ${
                  canActivate ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/10 text-white/50'
                }`}>
                  can_activate: {canActivate ? 'true' : 'false'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-[11px] font-mono text-[#F5EDE4]/50">
                  Endpoint: <span className="text-white">POST /businesses/{activeBusinessId}/onboarding/activate</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-xs cursor-pointer"
                  >
                    Back to Channels
                  </button>

                  <button
                    type="button"
                    disabled={!canActivate || isSubmitting}
                    onClick={handleActivate}
                    className={`px-6 py-2.5 rounded-xl font-syne font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                      canActivate
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white shadow-emerald-900/30'
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Activating...</span>
                      </>
                    ) : isActivated ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Store Activated</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Activate Store Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Jump to Dashboard if already activated */}
            {isActivated && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-sm shadow-xl hover:brightness-110 cursor-pointer"
                >
                  Go to Merchant Dashboard →
                </button>
              </div>
            )}
          </motion.div>
        )}

      </div>

      {/* META ASSET PICKER MODAL (Step 3) */}
      <AnimatePresence>
        {authorizingProvider && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-[#120B07] border border-white/15 p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="space-y-0.5">
                  <h3 className="font-syne font-bold text-sm sm:text-base text-white capitalize">
                    Connect {authorizingProvider} Account
                  </h3>
                  <div className="text-[10px] font-mono text-[#E58330]">
                    code: {authCode.slice(0, 16)}... · state: {authState.slice(0, 12)}...
                  </div>
                </div>
                <button onClick={() => setAuthorizingProvider(null)} className="text-white/60 hover:text-white">✕</button>
              </div>

              {isLoadingAssets ? (
                <div className="py-8 text-center space-y-2">
                  <RefreshCw className="w-6 h-6 text-[#E58330] animate-spin mx-auto" />
                  <p className="text-xs font-mono text-[#E58330]">
                    Loading verified pages & phone numbers...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs font-dm text-[#F5EDE4]/70">
                    Select the specific {authorizingProvider} Page or WhatsApp number you want your AI worker to manage:
                  </p>

                  <div className="space-y-2">
                    {availableAssets.map((asset) => (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedAssetId(asset.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          selectedAssetId === asset.id
                            ? 'bg-[#1C120B] border-[#E58330] text-white shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-[#F5EDE4]/70 hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="font-syne font-bold text-xs text-white">{asset.name}</div>
                          {asset.phone_number && (
                            <div className="text-[10px] font-mono text-[#E58330]">{asset.phone_number}</div>
                          )}
                        </div>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          selectedAssetId === asset.id ? 'bg-[#E58330] text-black' : 'border border-white/20'
                        }`}>
                          {selectedAssetId === asset.id && '✓'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthorizingProvider(null)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 text-white text-xs font-syne"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting || !selectedAssetId}
                      onClick={handleCompleteMetaConnection}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs cursor-pointer shadow"
                    >
                      {isSubmitting ? 'Connecting...' : 'Complete Connection'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
