import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Flame, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Target,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Pause,
  Play,
  ShieldAlert,
  ShieldCheck,
  Check,
  Calendar,
  Layers,
  ShoppingBag,
  ArrowRight,
  Eye,
  RefreshCw,
  Plus,
  Sliders,
  ChevronRight,
  ChevronDown,
  Info,
  Clock,
  Send,
  X,
  Share2,
  Lock,
  ThumbsUp,
  BarChart3,
  Users,
  MapPin,
  Tag
} from 'lucide-react';
import { 
  apiClient, 
  formatMinorUnits, 
  BusinessRoleItem,
  MetaAdsConnectorState,
  AdAccount,
  AdDraft,
  AdDraftCreative,
  AdCampaign,
  AdCampaignInsights
} from '../../services/apiClient';

interface AdsTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

export const AdsTab: React.FC<AdsTabProps> = ({ business, role }) => {
  const currency = business.currency || 'ZMW';
  const isAdmin = role === 'owner' || role === 'admin';

  // Navigation sub-views
  const [activeSubTab, setActiveSubTab] = useState<'campaigns' | 'new_ad' | 'drafts' | 'settings'>('campaigns');

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Data state
  const [connector, setConnector] = useState<MetaAdsConnectorState | null>(null);
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [drafts, setDrafts] = useState<AdDraft[]>([]);
  const [productsList, setProductsList] = useState<any[]>([]);

  // Selected Campaign Insights Drawer
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [campaignInsights, setCampaignInsights] = useState<Record<string, AdCampaignInsights>>({});
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Connect flow states (POST .../authorize -> redirect -> callback -> GET .../assets -> complete)
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectStep, setConnectStep] = useState<'authorize' | 'authorizing' | 'select_assets' | 'completed'>('authorize');
  const [availableAssets, setAvailableAssets] = useState<{ ad_accounts: any[]; pages: any[] }>({ ad_accounts: [], pages: [] });
  const [selectedAdAccountToConnect, setSelectedAdAccountToConnect] = useState<string>('');
  const [selectedPageToConnect, setSelectedPageToConnect] = useState<string>('');
  const [connecting, setConnecting] = useState(false);

  // Edit Limits Modal
  const [showLimitsModal, setShowLimitsModal] = useState(false);
  const [editHardCapMajor, setEditHardCapMajor] = useState(5000);
  const [editMonthlyCapMajor, setEditMonthlyCapMajor] = useState(15000);
  const [savingLimits, setSavingLimits] = useState(false);

  // "New Ad" Form State
  const [goal, setGoal] = useState<'click_to_whatsapp' | 'catalog_sales' | 'store_traffic' | 'lead_generation'>('click_to_whatsapp');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [dailyBudgetMajor, setDailyBudgetMajor] = useState(120);
  const [startDateStr, setStartDateStr] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [endDateStr, setEndDateStr] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 8);
    return d.toISOString().slice(0, 10);
  });
  const [targetLocations, setTargetLocations] = useState<string[]>(['Lusaka (+25km)']);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(45);
  const [targetInterests, setTargetInterests] = useState<string[]>(['Sneakers', 'Streetwear Fashion', 'Urban Lifestyle']);
  const [targetGender, setTargetGender] = useState<'all' | 'men' | 'women'>('all');
  const [promptNotes, setPromptNotes] = useState('');
  const [creatingDraft, setCreatingDraft] = useState(false);

  // Active Draft under Review & Approval
  const [activeDraft, setActiveDraft] = useState<AdDraft | null>(null);
  const [selectedCreativeId, setSelectedCreativeId] = useState<string>('');
  const [approvingDraft, setApprovingDraft] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);

  // Fetch initial data
  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      // Load connector status
      try {
        const connRes = await apiClient.getMetaAdsConnector(business.id);
        setConnector(connRes.connector);
      } catch (e) {
        console.warn('Connector fetch note:', e);
      }

      // Load ad accounts & hard caps
      try {
        const accRes = await apiClient.getAdAccounts(business.id);
        setAdAccounts(accRes.accounts || []);
        if (accRes.accounts && accRes.accounts.length > 0) {
          setEditHardCapMajor(Math.round(accRes.accounts[0].hard_cap_minor_units / 100));
          setEditMonthlyCapMajor(Math.round(accRes.accounts[0].monthly_spend_cap_minor_units / 100));
        }
      } catch (e) {
        console.warn('Accounts fetch note:', e);
      }

      // Load campaigns
      try {
        const cmpRes = await apiClient.getAdCampaigns(business.id);
        setCampaigns(cmpRes.campaigns || []);
      } catch (e) {
        console.warn('Campaigns fetch note:', e);
      }

      // Load drafts
      try {
        const draftRes = await apiClient.getAdDrafts(business.id);
        const fetchedDrafts = draftRes.drafts || [];
        setDrafts(fetchedDrafts);
        // If there's an unapproved draft, show it ready for review
        const reviewDraft = fetchedDrafts.find(d => d.status === 'draft_review');
        if (reviewDraft && !activeDraft) {
          setActiveDraft(reviewDraft);
          setSelectedCreativeId(reviewDraft.selected_creative_id || reviewDraft.ai_creatives[0]?.id || '');
        }
      } catch (e) {
        console.warn('Drafts fetch note:', e);
      }

      // Load store products for selector
      try {
        const prodRes = await apiClient.getProducts(business.id);
        if (prodRes.products && prodRes.products.length > 0) {
          setProductsList(prodRes.products);
          if (!selectedProductId) {
            setSelectedProductId(prodRes.products[0].id);
          }
        }
      } catch (e) {
        console.warn('Products fetch note:', e);
      }

    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to initialize Ads dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [business.id]);

  // Load insights for selected campaign
  const loadCampaignInsights = async (campaignId: string) => {
    try {
      setLoadingInsights(true);
      const res = await apiClient.getAdCampaignInsights(business.id, campaignId);
      setCampaignInsights(prev => ({ ...prev, [campaignId]: res.insights }));
    } catch (err: any) {
      console.error('Failed to load campaign insights:', err);
    } finally {
      setLoadingInsights(false);
    }
  };

  const handleToggleInsights = (campaignId: string) => {
    if (selectedCampaignId === campaignId) {
      setSelectedCampaignId(null);
    } else {
      setSelectedCampaignId(campaignId);
      if (!campaignInsights[campaignId]) {
        loadCampaignInsights(campaignId);
      }
    }
  };

  // Connect Flow Execution: POST .../authorize -> redirect -> callback -> GET .../assets -> complete
  const handleStartConnect = async () => {
    try {
      setConnecting(true);
      setErrorMsg(null);
      setConnectStep('authorizing');

      // 1. Authorize: POST .../connectors/meta_ads/authorize
      const authRes = await apiClient.authorizeMetaAds(business.id);
      
      // Simulate OAuth handoff delay
      await new Promise(r => setTimeout(r, 1200));

      // 2. Fetch Assets: GET .../connectors/meta_ads/assets
      const assetsRes = await apiClient.getMetaAdsAssets(business.id);
      setAvailableAssets(assetsRes);

      if (assetsRes.ad_accounts && assetsRes.ad_accounts.length > 0) {
        setSelectedAdAccountToConnect(assetsRes.ad_accounts[0].id);
      }
      if (assetsRes.pages && assetsRes.pages.length > 0) {
        setSelectedPageToConnect(assetsRes.pages[0].id);
      }

      setConnectStep('select_assets');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Meta OAuth authorization failed');
      setConnectStep('authorize');
    } finally {
      setConnecting(false);
    }
  };

  const handleCompleteConnect = async () => {
    if (!selectedAdAccountToConnect || !selectedPageToConnect) {
      setErrorMsg('Please select both an ad account and a Facebook page');
      return;
    }
    try {
      setConnecting(true);
      setErrorMsg(null);
      const res = await apiClient.completeMetaAds(business.id, {
        ad_account_id: selectedAdAccountToConnect,
        page_id: selectedPageToConnect
      });
      setConnector(res.connector);
      setConnectStep('completed');
      setSuccessMsg('Meta Ads connected successfully! Ad account and catalog ready.');
      setTimeout(() => {
        setShowConnectModal(false);
        setConnectStep('authorize');
        loadData();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to complete Meta Ads connection');
    } finally {
      setConnecting(false);
    }
  };

  // Limits update: PUT .../ads/accounts/{aid}/limits
  const handleSaveLimits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setErrorMsg('Only owners and admins can edit hard caps.');
      return;
    }
    const currentAccount = adAccounts[0];
    if (!currentAccount) return;

    try {
      setSavingLimits(true);
      setErrorMsg(null);
      const res = await apiClient.updateAdAccountLimits(business.id, currentAccount.id, {
        hard_cap_minor_units: editHardCapMajor * 100,
        monthly_spend_cap_minor_units: editMonthlyCapMajor * 100,
        auto_pause_at_cap: true // Mandatory Hard Rule
      });
      setAdAccounts([res.account]);
      setShowLimitsModal(false);
      setSuccessMsg(`Hard spending cap updated to ${formatMinorUnits(res.account.hard_cap_minor_units, currency)}. Auto-pause protection active.`);
      setTimeout(() => setSuccessMsg(null), 4000);
      loadData();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to update spending limits');
    } finally {
      setSavingLimits(false);
    }
  };

  // "New Ad" Submit: POST .../ads/drafts
  const handleCreateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreatingDraft(true);
      setErrorMsg(null);

      const selProduct = productsList.find(p => p.id === selectedProductId);

      const res = await apiClient.createAdDraft(business.id, {
        goal,
        product_id: selectedProductId,
        product_name: selProduct ? (selProduct.name || selProduct.title) : undefined,
        daily_budget_minor_units: dailyBudgetMajor * 100,
        start_date: startDateStr,
        end_date: endDateStr,
        audience: {
          locations: targetLocations,
          age_min: ageMin,
          age_max: ageMax,
          interests: targetInterests,
          gender: targetGender
        },
        prompt_notes: promptNotes
      });

      setActiveDraft(res.draft);
      setSelectedCreativeId(res.draft.ai_creatives[0]?.id || '');
      setDrafts(prev => [res.draft, ...prev]);
      setActiveSubTab('drafts');
      setSuccessMsg('AI creatives generated! Please review creatives and approve maximum spend before launch.');
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to create ad draft');
    } finally {
      setCreatingDraft(false);
    }
  };

  // Approval screen click: POST .../ads/drafts/{id}/approve
  // "Ads never start without approval"
  const handleApproveDraft = async (draftId: string) => {
    try {
      setApprovingDraft(true);
      setErrorMsg(null);
      const res = await apiClient.approveAdDraft(business.id, draftId, selectedCreativeId);
      setSuccessMsg(res.message || 'Campaign approved and launched!');
      setActiveDraft(null);
      await loadData();
      setActiveSubTab('campaigns');
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to approve campaign');
    } finally {
      setApprovingDraft(false);
    }
  };

  const handleRejectDraft = async (draftId: string) => {
    try {
      setActionInProgress(true);
      await apiClient.rejectAdDraft(business.id, draftId, 'Rejected by operator');
      setActiveDraft(null);
      setSuccessMsg('Draft discarded.');
      await loadData();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to reject draft');
    } finally {
      setActionInProgress(false);
    }
  };

  // Campaign Pause/Resume
  const handlePauseCampaign = async (cid: string) => {
    try {
      setActionInProgress(true);
      const res = await apiClient.pauseAdCampaign(business.id, cid);
      setCampaigns(prev => prev.map(c => c.id === cid ? res.campaign : c));
      setSuccessMsg('Campaign paused.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to pause campaign');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleResumeCampaign = async (cid: string) => {
    try {
      setActionInProgress(true);
      const res = await apiClient.resumeAdCampaign(business.id, cid);
      setCampaigns(prev => prev.map(c => c.id === cid ? res.campaign : c));
      setSuccessMsg('Campaign resumed.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to resume campaign');
    } finally {
      setActionInProgress(false);
    }
  };

  const primaryAccount = adAccounts[0];
  const hardCapMinor = primaryAccount?.hard_cap_minor_units || 500000;
  const currentSpendMinor = primaryAccount?.current_spend_minor_units || 0;
  const spendPercentage = Math.min(100, Math.round((currentSpendMinor / hardCapMinor) * 100));
  const isCapped = currentSpendMinor >= hardCapMinor;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Toast Messages */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-dm flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-dm flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner: Header & Connector Status */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0D0805] border border-white/10 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9B2208] to-[#CD481B] flex items-center justify-center shadow-lg">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-syne font-bold text-white tracking-tight">
                Meta Ads & Click-to-WhatsApp
              </h2>
              {connector?.is_connected ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Meta Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Connector Setup Required
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70 max-w-2xl">
              Drive direct, high-intent WhatsApp conversations and catalog purchases straight into your AI worker. Guarded by strict hard spending caps and explicit human approvals.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {!connector?.is_connected ? (
              <button
                onClick={() => { setShowConnectModal(true); setConnectStep('authorize'); }}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#9B2208]/30 hover:brightness-110 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Connect Meta Ads</span>
              </button>
            ) : (
              <button
                onClick={() => { setShowConnectModal(true); handleStartConnect(); }}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-dm text-[#F5EDE4]/80 flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Switch Page / Account</span>
              </button>
            )}

            <button
              onClick={() => setActiveSubTab('new_ad')}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-syne font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#CD481B]" />
              <span>New Ad Campaign</span>
            </button>
          </div>
        </div>

        {/* Connected Assets Summary Bar */}
        {connector?.is_connected && (
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#F5EDE4]/60">
            <div className="flex items-center gap-1.5">
              <span className="text-[#F5EDE4]/40">Ad Account:</span>
              <span className="text-white font-medium">{primaryAccount?.account_name || 'Ernest Sneakers Meta Ads'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#F5EDE4]/40">Connected Page:</span>
              <span className="text-white font-medium">Ernest Sneakers Lusaka (Official)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#F5EDE4]/40">Currency:</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[#CD481B] font-bold">{currency}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#F5EDE4]/40">Destination:</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> WhatsApp AI Worker
              </span>
            </div>
          </div>
        )}
      </div>

      {/* HARD SPENDING CAPS & ACCOUNT LIMITS (Mandatory Requirement) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-syne font-bold text-white flex items-center gap-2">
                <span>Account Spending Guard & Hard Caps</span>
                {/* PROMINENT REQUIREMENT: UI MUST SHOW CAP & AUTO-PAUSES AT CAP */}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#CD481B]/20 text-[#E58330] border border-[#CD481B]/40">
                  auto-pauses at cap
                </span>
              </h3>
              <p className="text-[11px] font-dm text-[#F5EDE4]/60">
                Guaranteed safety stop: campaigns automatically pause the second cumulative spend hits your defined hard limit.
              </p>
            </div>
          </div>

          {isAdmin ? (
            <button
              onClick={() => setShowLimitsModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#F5EDE4] flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
            >
              <Sliders className="w-3.5 h-3.5 text-[#CD481B]" />
              <span>Edit Spending Caps</span>
            </button>
          ) : (
            <span className="text-[11px] font-mono text-[#F5EDE4]/40 italic">
              Admins only can edit caps
            </span>
          )}
        </div>

        {/* 3 Metric Cards for Hard Caps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-[#130C08] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5EDE4]/50">
              Hard Ceiling Cap
            </span>
            <div className="text-xl sm:text-2xl font-syne font-bold text-white tracking-tight">
              {formatMinorUnits(hardCapMinor, currency)}
            </div>
            <div className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Strict account safety ceiling</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#130C08] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5EDE4]/50">
              Current Spend ({currency})
            </span>
            <div className="text-xl sm:text-2xl font-syne font-bold text-[#F5EDE4] tracking-tight">
              {formatMinorUnits(currentSpendMinor, currency)}
            </div>
            <div className="text-[10px] font-mono text-[#F5EDE4]/50">
              {spendPercentage}% of hard cap utilized
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#130C08] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5EDE4]/50">
              Monthly Spend Budget
            </span>
            <div className="text-xl sm:text-2xl font-syne font-bold text-white tracking-tight">
              {formatMinorUnits(primaryAccount?.monthly_spend_cap_minor_units || 1500000, currency)}
            </div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Active billing cycle limit</span>
            </div>
          </div>
        </div>

        {/* Spend progress bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-[#F5EDE4]/60">Spend vs Hard Cap: {spendPercentage}%</span>
            <span className={isCapped ? 'text-rose-400 font-bold' : 'text-[#F5EDE4]/60'}>
              {isCapped ? 'Auto-paused at cap reached!' : `${formatMinorUnits(Math.max(0, hardCapMinor - currentSpendMinor), currency)} remaining before auto-pause`}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                spendPercentage > 85 ? 'bg-rose-500' : spendPercentage > 50 ? 'bg-amber-500' : 'bg-gradient-to-r from-[#9B2208] to-[#CD481B]'
              }`}
              style={{ width: `${spendPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto text-xs font-syne">
        <button
          onClick={() => setActiveSubTab('campaigns')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'campaigns'
              ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-bold shadow'
              : 'text-[#F5EDE4]/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Active Campaigns ({campaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('drafts')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 relative ${
            activeSubTab === 'drafts'
              ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-bold shadow'
              : 'text-[#F5EDE4]/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Creatives & Approvals</span>
          {drafts.filter(d => d.status === 'draft_review').length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-mono font-bold">
              {drafts.filter(d => d.status === 'draft_review').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('new_ad')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'new_ad'
              ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-bold shadow'
              : 'text-[#F5EDE4]/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Create New Ad</span>
        </button>
      </div>

      {/* VIEW 1: ACTIVE CAMPAIGNS & INSIGHTS */}
      {activeSubTab === 'campaigns' && (
        <div className="space-y-6">
          {campaigns.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0D0805] border border-white/10 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-[#CD481B]">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-syne font-bold text-white text-base">No active campaigns running</h4>
                <p className="text-xs font-dm text-[#F5EDE4]/60 max-w-sm mx-auto">
                  Create a new ad draft to generate AI-written creatives and launch your first Click-to-WhatsApp campaign.
                </p>
              </div>
              <button
                onClick={() => setActiveSubTab('new_ad')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs"
              >
                + Create First Campaign
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {campaigns.map((camp) => {
                const isSelected = selectedCampaignId === camp.id;
                const insights = campaignInsights[camp.id];

                return (
                  <div 
                    key={camp.id} 
                    className="rounded-3xl bg-[#0D0805] border border-white/10 overflow-hidden shadow-2xl transition hover:border-white/20"
                  >
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Top Bar of Card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h4 className="text-base font-syne font-bold text-white">
                              {camp.name}
                            </h4>

                            {/* Status badge */}
                            {camp.status === 'active' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active · Running
                              </span>
                            )}
                            {camp.status === 'paused' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                                <Pause className="w-2.5 h-2.5" />
                                Paused
                              </span>
                            )}
                            {camp.status === 'capped' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                                <ShieldAlert className="w-2.5 h-2.5" />
                                Auto-paused at Cap
                              </span>
                            )}
                            {camp.status === 'completed' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white/60">
                                Completed
                              </span>
                            )}

                            {/* Auto-pauses at cap badge per hard requirement */}
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#E58330] border border-white/10">
                              auto-pauses at cap
                            </span>
                          </div>

                          <div className="text-xs font-dm text-[#F5EDE4]/60 flex items-center gap-3">
                            <span>Goal: <strong className="text-white capitalize">{camp.goal.replace(/_/g, ' ')}</strong></span>
                            <span>•</span>
                            <span>Daily Budget: <strong className="text-white">{formatMinorUnits(camp.daily_budget_minor_units, currency)}/day</strong></span>
                            <span>•</span>
                            <span>Schedule: <strong className="text-white font-mono">{camp.start_date} to {camp.end_date}</strong></span>
                          </div>
                        </div>

                        {/* Action buttons: Pause / Resume / Insights */}
                        <div className="flex items-center gap-2">
                          {camp.status === 'active' && (
                            <button
                              onClick={() => handlePauseCampaign(camp.id)}
                              disabled={actionInProgress}
                              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#F5EDE4] flex items-center gap-1.5 transition cursor-pointer"
                            >
                              <Pause className="w-3.5 h-3.5 text-amber-400" />
                              <span>Pause</span>
                            </button>
                          )}

                          {camp.status === 'paused' && (
                            <button
                              onClick={() => handleResumeCampaign(camp.id)}
                              disabled={actionInProgress}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-1.5 transition cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5" />
                              <span>Resume</span>
                            </button>
                          )}

                          {camp.status === 'capped' && (
                            <button
                              onClick={() => setShowLimitsModal(true)}
                              className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-mono text-rose-300 flex items-center gap-1.5 transition cursor-pointer"
                            >
                              <Sliders className="w-3.5 h-3.5" />
                              <span>Raise Cap to Resume</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleToggleInsights(camp.id)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white border-transparent'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#F5EDE4]'
                            }`}
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                            <span>{isSelected ? 'Hide Insights' : 'Daily Insights'}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Creative Summary Snippet */}
                      <div className="p-3.5 rounded-2xl bg-[#130C08] border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={camp.creative.image_url}
                            alt="Creative"
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                          />
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-[#CD481B] uppercase tracking-wider">
                              Approved Creative
                            </span>
                            <h5 className="text-xs font-syne font-bold text-white line-clamp-1">
                              {camp.creative.headline}
                            </h5>
                            <p className="text-[11px] font-dm text-[#F5EDE4]/60 line-clamp-1">
                              {camp.creative.primary_text}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 shrink-0 text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-[#F5EDE4]/40 block">Total Spend</span>
                            <span className="text-white font-bold">{formatMinorUnits(camp.current_spend_minor_units, currency)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#F5EDE4]/40 block">Max Approved Spend</span>
                            <span className="text-white font-bold">{formatMinorUnits(camp.max_possible_spend_minor_units, currency)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#F5EDE4]/40 block">CTA Button</span>
                            <span className="text-emerald-400 font-bold">{camp.creative.call_to_action}</span>
                          </div>
                        </div>
                      </div>

                      {/* EXPANDED DAILY INSIGHTS (Requirement: spend, clicks, conversions) */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 border-t border-white/10 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-syne font-bold text-white flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-[#CD481B]" />
                              <span>Live Performance & Daily Insights</span>
                            </span>
                            <span className="text-[10px] font-mono text-[#F5EDE4]/50">
                              GET /businesses/{business.id}/ads/campaigns/{camp.id}/insights
                            </span>
                          </div>

                          {loadingInsights && !insights ? (
                            <div className="p-6 text-center text-xs font-mono text-[#F5EDE4]/60 animate-pulse">
                              Fetching real-time Meta telemetry insights...
                            </div>
                          ) : insights ? (
                            <div className="space-y-4">
                              {/* 4 Metric Cards */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                <div className="p-3.5 rounded-2xl bg-[#050302] border border-white/5 space-y-0.5">
                                  <span className="text-[10px] font-mono text-[#F5EDE4]/50">Campaign Spend</span>
                                  <div className="text-lg font-syne font-bold text-white">
                                    {formatMinorUnits(insights.total_spend_minor_units, currency)}
                                  </div>
                                  <span className="text-[10px] font-mono text-emerald-400">Under hard cap</span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-[#050302] border border-white/5 space-y-0.5">
                                  <span className="text-[10px] font-mono text-[#F5EDE4]/50">Link Clicks</span>
                                  <div className="text-lg font-syne font-bold text-white">
                                    {insights.total_clicks.toLocaleString()}
                                  </div>
                                  <span className="text-[10px] font-mono text-[#F5EDE4]/50">Avg CPC: {formatMinorUnits(insights.cpc_minor_units, currency)}</span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-[#050302] border border-white/5 space-y-0.5">
                                  <span className="text-[10px] font-mono text-[#F5EDE4]/50">WhatsApp Conversions</span>
                                  <div className="text-lg font-syne font-bold text-emerald-400">
                                    {insights.total_conversions} chats
                                  </div>
                                  <span className="text-[10px] font-mono text-[#F5EDE4]/50">Cost/conv: {formatMinorUnits(insights.cost_per_conversion_minor_units, currency)}</span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-[#050302] border border-white/5 space-y-0.5">
                                  <span className="text-[10px] font-mono text-[#F5EDE4]/50">Impressions & CTR</span>
                                  <div className="text-lg font-syne font-bold text-white">
                                    {insights.total_impressions.toLocaleString()}
                                  </div>
                                  <span className="text-[10px] font-mono text-[#CD481B]">{insights.average_ctr}% CTR</span>
                                </div>
                              </div>

                              {/* Daily Breakdown Table */}
                              <div className="rounded-2xl bg-[#050302] border border-white/5 overflow-hidden">
                                <div className="p-3 border-b border-white/5 text-[11px] font-mono text-[#F5EDE4]/60">
                                  Daily Activity Log
                                </div>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-left text-xs font-mono">
                                    <thead className="bg-white/5 text-[10px] text-[#F5EDE4]/50 uppercase">
                                      <tr>
                                        <th className="p-3">Period</th>
                                        <th className="p-3">Spend</th>
                                        <th className="p-3">Clicks</th>
                                        <th className="p-3">Conversions</th>
                                        <th className="p-3">Impressions</th>
                                        <th className="p-3">CTR</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-[#F5EDE4]/80">
                                      {insights.daily.map((dp, idx) => (
                                        <tr key={idx} className="hover:bg-white/[0.02]">
                                          <td className="p-3 font-medium text-white">{dp.date}</td>
                                          <td className="p-3">{formatMinorUnits(dp.spend_minor_units, currency)}</td>
                                          <td className="p-3 text-white">{dp.clicks}</td>
                                          <td className="p-3 text-emerald-400 font-bold">{dp.conversions}</td>
                                          <td className="p-3 text-[#F5EDE4]/60">{dp.impressions.toLocaleString()}</td>
                                          <td className="p-3 text-[#CD481B]">{dp.ctr}%</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: AI REVIEW & EXPLICIT APPROVAL SCREEN */}
      {/* "Show the AI-written creatives for review and a clear approval screen stating the maximum possible spend. Ads never start without approval." */}
      {activeSubTab === 'drafts' && (
        <div className="space-y-6">
          {!activeDraft ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0D0805] border border-white/10 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-[#CD481B]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-syne font-bold text-white text-base">No drafts pending review</h4>
                <p className="text-xs font-dm text-[#F5EDE4]/60 max-w-sm mx-auto">
                  All generated creatives have been reviewed and approved or launched. Create a new ad draft anytime!
                </p>
              </div>
              <button
                onClick={() => setActiveSubTab('new_ad')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs"
              >
                + Create New Ad Draft
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* CLEAR APPROVAL SCREEN STATING MAXIMUM POSSIBLE SPEND (MANDATORY REQUIREMENT) */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1C0E07] via-[#0D0805] to-[#050302] border-2 border-[#CD481B]/40 shadow-2xl space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#CD481B]" />
                      <h3 className="text-lg sm:text-xl font-syne font-bold text-white">
                        AI Ad Creatives Review & Approval
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        Requires Approval Click
                      </span>
                    </div>
                    <p className="text-xs font-dm text-[#F5EDE4]/70">
                      Carefully review the copy generated by the AI worker and inspect the maximum possible spend before starting.
                    </p>
                  </div>

                  {/* MAXIMUM POSSIBLE SPEND BOX (Mandatory Requirement) */}
                  <div className="p-4 rounded-2xl bg-[#050302] border border-[#CD481B]/50 text-right space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      Maximum Possible Spend
                    </span>
                    <div className="text-2xl font-syne font-bold text-white tracking-tight">
                      {formatMinorUnits(activeDraft.max_possible_spend_minor_units, currency)}
                    </div>
                    <span className="text-[10px] font-mono text-[#F5EDE4]/50 block">
                      {formatMinorUnits(activeDraft.daily_budget_minor_units, currency)}/day × {activeDraft.total_days} days
                    </span>
                  </div>
                </div>

                {/* SAFETY NOTICES: HARD CAP & AUTO-PAUSE */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-200">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Account Hard Cap: <strong>{formatMinorUnits(hardCapMinor, currency)}</strong> · Auto-pauses at cap strictly enforced</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-500/30">
                    Ads never start without approval
                  </span>
                </div>

                {/* Grid: Creative Options and Live Feed Mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                  
                  {/* Left Column: Creative Options Selector */}
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-syne font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#CD481B]" />
                      <span>Select Creative Variation</span>
                    </span>

                    <div className="space-y-3">
                      {activeDraft.ai_creatives.map((creative, index) => {
                        const isChosen = (selectedCreativeId || activeDraft.ai_creatives[0]?.id) === creative.id;
                        return (
                          <div
                            key={creative.id}
                            onClick={() => setSelectedCreativeId(creative.id)}
                            className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                              isChosen
                                ? 'bg-[#1C0E07] border-[#CD481B] shadow-lg shadow-[#9B2208]/20 ring-1 ring-[#CD481B]'
                                : 'bg-[#0D0805] border-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-syne font-bold text-white flex items-center gap-2">
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                                  isChosen ? 'bg-[#CD481B] text-white' : 'bg-white/10 text-white/60'
                                }`}>
                                  {index + 1}
                                </span>
                                <span>Variation {index + 1}</span>
                              </span>
                              {isChosen && (
                                <span className="text-[10px] font-mono text-[#CD481B] font-bold flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Selected
                                </span>
                              )}
                            </div>

                            <div className="space-y-1 text-xs">
                              <h5 className="font-syne font-bold text-white text-sm">
                                {creative.headline}
                              </h5>
                              <p className="font-dm text-[#F5EDE4]/70 text-xs">
                                {creative.primary_text}
                              </p>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-[11px] font-mono border-t border-white/5">
                              <span className="text-emerald-400">Button: {creative.call_to_action}</span>
                              <span className="text-[#F5EDE4]/50">{creative.description}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Targeting Summary */}
                    <div className="p-3.5 rounded-2xl bg-[#0D0805] border border-white/10 space-y-2 text-xs font-mono">
                      <span className="text-[#F5EDE4]/50 text-[10px] uppercase block">Target Audience</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDraft.audience.locations.map((loc, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[#F5EDE4]/80 text-[10px]">
                            📍 {loc}
                          </span>
                        ))}
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[#F5EDE4]/80 text-[10px]">
                          🎂 Ages {activeDraft.audience.age_min}-{activeDraft.audience.age_max}
                        </span>
                        {activeDraft.audience.interests.map((int, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[#CD481B] text-[10px]">
                            🏷️ {int}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Facebook / Instagram Mobile Ad Mockup */}
                  <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                    <span className="text-xs font-syne font-bold text-white flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#CD481B]" />
                      <span>Live Mobile Feed Preview</span>
                    </span>

                    {/* Mock phone feed card */}
                    {(() => {
                      const curCreative = activeDraft.ai_creatives.find(c => c.id === (selectedCreativeId || activeDraft.ai_creatives[0]?.id)) 
                        || activeDraft.ai_creatives[0];

                      return (
                        <div className="max-w-sm mx-auto w-full rounded-2xl bg-[#050302] border border-white/15 overflow-hidden shadow-2xl">
                          {/* Header */}
                          <div className="p-3 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9B2208] to-[#CD481B] text-white flex items-center justify-center font-bold text-xs">
                                {business.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-syne font-bold text-xs text-white flex items-center gap-1.5">
                                  <span>{business.name}</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                </div>
                                <div className="text-[10px] font-dm text-[#F5EDE4]/50">Sponsored · Lusaka, Zambia</div>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#F5EDE4]/60">Ad</span>
                          </div>

                          {/* Primary text */}
                          <div className="p-3 text-xs font-dm text-[#F5EDE4]/90">
                            {curCreative.primary_text}
                          </div>

                          {/* Image */}
                          <div className="h-52 bg-black relative overflow-hidden">
                            <img
                              src={curCreative.image_url}
                              alt="Ad Media"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Call to action footer */}
                          <div className="p-3 bg-[#0D0805] border-t border-white/5 flex items-center justify-between gap-2">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-mono text-[#F5EDE4]/40 uppercase tracking-wider block">
                                mupezeni.ai/whatsapp
                              </span>
                              <div className="font-syne font-bold text-xs text-white line-clamp-1">
                                {curCreative.headline}
                              </div>
                              <span className="text-[10px] font-dm text-[#F5EDE4]/60 block line-clamp-1">
                                {curCreative.description}
                              </span>
                            </div>

                            <button className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-syne font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-lg cursor-default">
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{curCreative.call_to_action}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Bottom Action Buttons: Explicit Approval Click */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => handleApproveDraft(activeDraft.id)}
                        disabled={approvingDraft}
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-syne font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50 cursor-pointer transition"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Approve & Launch Campaign ({formatMinorUnits(activeDraft.max_possible_spend_minor_units, currency)} Max)</span>
                      </button>

                      <button
                        onClick={() => handleRejectDraft(activeDraft.id)}
                        disabled={approvingDraft}
                        className="w-full sm:w-auto py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#F5EDE4]/70 hover:text-white transition cursor-pointer"
                      >
                        Discard Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: "NEW AD" FORM (Creates draft with POST .../ads/drafts) */}
      {activeSubTab === 'new_ad' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0805] border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="space-y-1">
              <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-[#CD481B]" />
                <span>Create New Ad Campaign</span>
              </h3>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                Configure your goal, featured product, daily budget, and audience. AI will draft professional creatives for your review.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#F5EDE4]/60 border border-white/10">
              POST /ads/drafts
            </span>
          </div>

          <form onSubmit={handleCreateDraft} className="space-y-6">
            
            {/* 1. Goal Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#F5EDE4]/80">
                Campaign Goal & Destination
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    id: 'click_to_whatsapp',
                    title: 'Click-to-WhatsApp',
                    desc: 'Direct shoppers to AI worker in chat',
                    icon: MessageSquare,
                    badge: 'Recommended'
                  },
                  {
                    id: 'catalog_sales',
                    title: 'Catalog Retargeting',
                    desc: 'Showcase sneaker inventory catalog',
                    icon: ShoppingBag,
                    badge: null
                  },
                  {
                    id: 'store_traffic',
                    title: 'Local Store Traffic',
                    desc: 'Drive visits to Cairo Road store',
                    icon: MapPin,
                    badge: null
                  },
                  {
                    id: 'lead_generation',
                    title: 'Customer Inquiries',
                    desc: 'Collect sizing and custom order leads',
                    icon: Users,
                    badge: null
                  }
                ].map((g) => {
                  const Icon = g.icon;
                  const isSelected = goal === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setGoal(g.id as any)}
                      className={`p-4 rounded-2xl border transition cursor-pointer space-y-1.5 ${
                        isSelected
                          ? 'bg-[#1C0E07] border-[#CD481B] ring-1 ring-[#CD481B]'
                          : 'bg-[#130C08] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-[#CD481B]' : 'text-[#F5EDE4]/60'}`} />
                        {g.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                            {g.badge}
                          </span>
                        )}
                      </div>
                      <div className="font-syne font-bold text-xs text-white">{g.title}</div>
                      <div className="text-[11px] font-dm text-[#F5EDE4]/60">{g.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Product Selector & Daily Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Product Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-[#F5EDE4]/80">
                  Select Product to Feature
                </label>
                {productsList.length > 0 ? (
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full bg-[#130C08] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-dm focus:outline-none focus:border-[#CD481B]"
                  >
                    {productsList.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name || p.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    readOnly
                    value="Air Force 1 Low Classic (Auto-selected from inventory)"
                    className="w-full bg-[#130C08] border border-white/10 rounded-2xl px-4 py-3 text-[#F5EDE4]/70 text-xs font-dm"
                  />
                )}
                <span className="text-[10px] font-mono text-[#F5EDE4]/40">
                  AI uses your product title, images, and prices to compose advertising copy.
                </span>
              </div>

              {/* Daily Budget */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-mono text-[#F5EDE4]/80">
                    Daily Budget ({currency})
                  </label>
                  <span className="text-[10px] font-mono text-amber-400">
                    Hard Cap: {formatMinorUnits(hardCapMinor, currency)}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#F5EDE4]/50">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min={20}
                    max={Math.round(hardCapMinor / 100)}
                    value={dailyBudgetMajor}
                    onChange={(e) => setDailyBudgetMajor(Math.max(20, Number(e.target.value)))}
                    className="w-full bg-[#130C08] border border-white/10 rounded-2xl pl-16 pr-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-[#CD481B]"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#F5EDE4]/50">
                  <span>Minor units: {dailyBudgetMajor * 100}</span>
                  <span>Major units: {formatMinorUnits(dailyBudgetMajor * 100, currency)}/day</span>
                </div>
              </div>
            </div>

            {/* 3. Dates & Calculation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono text-[#F5EDE4]/80">Start Date</label>
                <input
                  type="date"
                  value={startDateStr}
                  onChange={(e) => setStartDateStr(e.target.value)}
                  className="w-full bg-[#130C08] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-[#CD481B]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-[#F5EDE4]/80">End Date</label>
                <input
                  type="date"
                  value={endDateStr}
                  onChange={(e) => setEndDateStr(e.target.value)}
                  className="w-full bg-[#130C08] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-[#CD481B]"
                />
              </div>
            </div>

            {/* Total Duration & Max Spend Calculation Preview */}
            {(() => {
              const start = new Date(startDateStr);
              const end = new Date(endDateStr);
              const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
              const calcMaxSpendMinor = dailyBudgetMajor * 100 * days;

              return (
                <div className="p-4 rounded-2xl bg-[#130C08] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="text-[#F5EDE4]/50 block">Projected Campaign Duration:</span>
                    <strong className="text-white font-syne text-sm">{days} Days ({startDateStr} to {endDateStr})</strong>
                  </div>
                  <div className="sm:text-right space-y-0.5">
                    <span className="text-amber-400 block text-[10px] uppercase font-bold">Estimated Maximum Possible Spend:</span>
                    <strong className="text-white font-syne text-base text-[#CD481B]">{formatMinorUnits(calcMaxSpendMinor, currency)}</strong>
                  </div>
                </div>
              );
            })()}

            {/* 4. Audience Targeting */}
            <div className="p-5 rounded-2xl bg-[#130C08] border border-white/5 space-y-4">
              <span className="text-xs font-syne font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-[#CD481B]" />
                <span>Audience & Geographic Targeting</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-mono text-[#F5EDE4]/60 mb-1">Target Locations</label>
                  <input
                    type="text"
                    value={targetLocations.join(', ')}
                    onChange={(e) => setTargetLocations(e.target.value.split(',').map(s => s.trim()))}
                    className="w-full bg-[#050302] border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs"
                  />
                  <span className="text-[10px] font-mono text-[#F5EDE4]/40 mt-1 block">e.g. Lusaka (+25km), Kitwe, Ndola</span>
                </div>

                <div>
                  <label className="block font-mono text-[#F5EDE4]/60 mb-1">Age Bracket</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={18}
                      max={65}
                      value={ageMin}
                      onChange={(e) => setAgeMin(Number(e.target.value))}
                      className="w-full bg-[#050302] border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs text-center"
                    />
                    <span className="text-[#F5EDE4]/40 font-mono">to</span>
                    <input
                      type="number"
                      min={18}
                      max={65}
                      value={ageMax}
                      onChange={(e) => setAgeMax(Number(e.target.value))}
                      className="w-full bg-[#050302] border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[#F5EDE4]/60 mb-1">Gender</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['all', 'men', 'women'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setTargetGender(g)}
                        className={`p-2 rounded-xl text-center capitalize font-mono text-xs cursor-pointer ${
                          targetGender === g ? 'bg-[#CD481B] text-white font-bold' : 'bg-[#050302] text-[#F5EDE4]/60'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Prompt Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#F5EDE4]/80">
                Tone Notes & Key Angles (Optional)
              </label>
              <textarea
                rows={2}
                value={promptNotes}
                onChange={(e) => setPromptNotes(e.target.value)}
                placeholder="e.g. Emphasize authentic certification, instant WhatsApp delivery sizing, and Airtel/MTN mobile money payment options."
                className="w-full bg-[#130C08] border border-white/10 rounded-2xl p-4 text-white text-xs font-dm focus:outline-none focus:border-[#CD481B]"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={creatingDraft}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#9B2208]/30 transition cursor-pointer"
              >
                {creatingDraft ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Generating Creatives...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Creatives for Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CONNECT FLOW MODAL (POST .../authorize -> redirect -> callback -> GET .../assets -> complete) */}
      <AnimatePresence>
        {showConnectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-[#0D0805] border border-white/15 p-6 sm:p-7 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setShowConnectModal(false)}
                className="absolute top-5 right-5 text-[#F5EDE4]/40 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#CD481B] flex items-center justify-center text-white">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-syne font-bold text-lg text-white">
                    Connect Meta Ads
                  </h3>
                </div>
                <p className="text-xs font-dm text-[#F5EDE4]/70">
                  Integrate your Facebook Page & Meta Ad Account for automated Click-to-WhatsApp ads.
                </p>
              </div>

              {/* Step Progress */}
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/5 pb-3">
                <span className={connectStep === 'authorize' || connectStep === 'authorizing' ? 'text-[#CD481B] font-bold' : 'text-[#F5EDE4]/40'}>
                  1. OAuth Authorization
                </span>
                <span className={connectStep === 'select_assets' ? 'text-[#CD481B] font-bold' : 'text-[#F5EDE4]/40'}>
                  2. Select Assets
                </span>
                <span className={connectStep === 'completed' ? 'text-emerald-400 font-bold' : 'text-[#F5EDE4]/40'}>
                  3. Connected
                </span>
              </div>

              {/* STEP 1: Authorize */}
              {(connectStep === 'authorize' || connectStep === 'authorizing') && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 mx-auto flex items-center justify-center text-[#CD481B]">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-sm mx-auto">
                    <h4 className="font-syne font-bold text-white text-sm">
                      {connectStep === 'authorizing' ? 'Authorizing with Meta...' : 'Authorize Meta Graph Connection'}
                    </h4>
                    <p className="text-xs font-dm text-[#F5EDE4]/60">
                      We'll connect to Meta Business Manager to retrieve your Ad Account and Facebook Page. Credentials remain secure and write-only.
                    </p>
                  </div>
                  <button
                    onClick={handleStartConnect}
                    disabled={connecting}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {connecting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Authorizing & Exchanging Tokens...</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        <span>Authorize via Meta OAuth</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* STEP 2: Select Assets (Ad Account & Page) */}
              {connectStep === 'select_assets' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-[#F5EDE4]/80">
                      Pick Ad Account
                    </label>
                    <div className="space-y-2">
                      {availableAssets.ad_accounts.map((acc) => (
                        <div
                          key={acc.id}
                          onClick={() => setSelectedAdAccountToConnect(acc.id)}
                          className={`p-3.5 rounded-xl border text-xs font-mono cursor-pointer transition flex items-center justify-between ${
                            selectedAdAccountToConnect === acc.id
                              ? 'bg-[#1C0E07] border-[#CD481B] text-white'
                              : 'bg-[#130C08] border-white/10 text-[#F5EDE4]/70 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-white">{acc.name}</div>
                            <div className="text-[10px] text-[#F5EDE4]/50">ID: {acc.id} · Currency: {acc.currency}</div>
                          </div>
                          {selectedAdAccountToConnect === acc.id && (
                            <Check className="w-4 h-4 text-[#CD481B]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-[#F5EDE4]/80">
                      Pick Facebook Page
                    </label>
                    <div className="space-y-2">
                      {availableAssets.pages.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setSelectedPageToConnect(p.id)}
                          className={`p-3.5 rounded-xl border text-xs font-mono cursor-pointer transition flex items-center justify-between ${
                            selectedPageToConnect === p.id
                              ? 'bg-[#1C0E07] border-[#CD481B] text-white'
                              : 'bg-[#130C08] border-white/10 text-[#F5EDE4]/70 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-white">{p.name}</div>
                            <div className="text-[10px] text-[#F5EDE4]/50">Category: {p.category}</div>
                          </div>
                          {selectedPageToConnect === p.id && (
                            <Check className="w-4 h-4 text-[#CD481B]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteConnect}
                    disabled={connecting}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {connecting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving Selected Assets...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Complete Meta Ads Setup</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* STEP 3: Completed */}
              {connectStep === 'completed' && (
                <div className="py-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-syne font-bold text-white text-base">Meta Ads Connected</h4>
                    <p className="text-xs font-dm text-[#F5EDE4]/60">
                      Ad account and Facebook page configured successfully.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT LIMITS MODAL (PUT .../ads/accounts/{aid}/limits) */}
      <AnimatePresence>
        {showLimitsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-[#0D0805] border border-white/15 p-6 shadow-2xl space-y-5 relative"
            >
              <button
                onClick={() => setShowLimitsModal(false)}
                className="absolute top-5 right-5 text-[#F5EDE4]/40 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h3 className="font-syne font-bold text-base text-white">
                    Edit Account Spending Caps
                  </h3>
                </div>
                <p className="text-xs font-dm text-[#F5EDE4]/70">
                  Admins set hard account limits. The system automatically pauses campaigns once limits are reached.
                </p>
              </div>

              <form onSubmit={handleSaveLimits} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#F5EDE4]/80">
                    Hard Cap Ceiling ({currency})
                  </label>
                  <input
                    type="number"
                    min={100}
                    value={editHardCapMajor}
                    onChange={(e) => setEditHardCapMajor(Number(e.target.value))}
                    className="w-full bg-[#130C08] border border-white/10 rounded-2xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#CD481B]"
                  />
                  <span className="text-[10px] font-mono text-[#F5EDE4]/50">
                    Minor units: {editHardCapMajor * 100} · auto-pauses at cap strictly enforced
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#F5EDE4]/80">
                    Monthly Spend Cap ({currency})
                  </label>
                  <input
                    type="number"
                    min={500}
                    value={editMonthlyCapMajor}
                    onChange={(e) => setEditMonthlyCapMajor(Number(e.target.value))}
                    className="w-full bg-[#130C08] border border-white/10 rounded-2xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#CD481B]"
                  />
                  <span className="text-[10px] font-mono text-[#F5EDE4]/50">
                    Minor units: {editMonthlyCapMajor * 100}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Rule: auto_pause_at_cap is permanently locked to TRUE for operator security.</span>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={savingLimits}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    {savingLimits ? 'Saving Caps...' : 'Save New Caps'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLimitsModal(false)}
                    className="py-3 px-4 rounded-2xl bg-white/5 text-xs font-mono text-[#F5EDE4]/70 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
