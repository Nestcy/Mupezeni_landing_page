import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ArrowRight,
  Plus,
  RefreshCw,
  Edit3,
  Check,
  X,
  AlertTriangle,
  Play,
  Pause,
  XOctagon,
  Image as ImageIcon,
  UploadCloud,
  Hash,
  Copy,
  ExternalLink,
  ChevronDown,
  Layers,
  CalendarDays,
  ListFilter,
  CheckCheck,
  RotateCcw,
  Sliders,
  Share2,
  Globe,
  Instagram,
  Facebook,
  Phone,
  Video,
  ShieldCheck,
  HelpCircle,
  Eye,
  ChevronRight
} from 'lucide-react';
import { 
  apiClient, 
  BusinessRoleItem, 
  MarketingCampaign, 
  MarketingContentItem, 
  MarketingPlanPayload 
} from '../../services/apiClient';

interface MarketingTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

// Platforms configuration
const PLATFORM_CONFIG = {
  instagram: {
    label: 'Instagram',
    icon: Instagram,
    badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    color: '#E1306C'
  },
  whatsapp: {
    label: 'WhatsApp Status',
    icon: Phone,
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    color: '#25D366'
  },
  facebook: {
    label: 'Facebook Page',
    icon: Facebook,
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    color: '#1877F2'
  },
  tiktok: {
    label: 'TikTok',
    icon: Video,
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    color: '#EE1D52'
  },
  x: {
    label: 'X (Twitter)',
    icon: Share2,
    badgeBg: 'bg-neutral-500/10 text-neutral-300 border-neutral-500/30',
    color: '#FFFFFF'
  }
};

export const MarketingTab: React.FC<MarketingTabProps> = ({ business, role }) => {
  // Campaigns & Content state
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<MarketingCampaign | null>(null);
  const [contentItems, setContentItems] = useState<MarketingContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // View state: 'cards' or 'calendar'
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('cards');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // "New Plan" Generator Form Modal
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [isSubmittingPlan, setIsSubmittingPlan] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingCampaignId, setGeneratingCampaignId] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState('Analyzing Lusaka retail catalog...');

  // New Plan form fields
  const [planPlatforms, setPlanPlatforms] = useState<string[]>(['instagram', 'whatsapp', 'facebook', 'tiktok']);
  const [planPostCount, setPlanPostCount] = useState<number>(5);
  const [planStartDate, setPlanStartDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [planCadence, setPlanCadence] = useState<'daily' | 'twice_daily' | 'three_per_week' | 'weekly'>('daily');
  const [planProducts, setPlanProducts] = useState<string>('Nike Air Force 1 Classic, Adidas Samba OG, Air Jordan 4 Retro');
  const [planTone, setPlanTone] = useState<string>(
    'Warm, aspirational Zambian streetwear culture. Emphasize same-day Lusaka express delivery (East Park, Woodlands, Kabulonga) and Airtel / MTN Mobile Money payment on dispatch.'
  );

  // Edit Content Modal
  const [editingItem, setEditingItem] = useState<MarketingContentItem | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editScheduledAt, setEditScheduledAt] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Action status banners
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [copiedHashId, setCopiedHashId] = useState<string | null>(null);

  // Load campaigns on mount
  useEffect(() => {
    fetchCampaigns();
  }, [business.id]);

  // When active campaign changes, fetch its content
  useEffect(() => {
    if (activeCampaign?.id) {
      fetchContent(activeCampaign.id);
    }
  }, [activeCampaign?.id]);

  // Polling during 'generating' state
  useEffect(() => {
    if (!isGenerating || !generatingCampaignId) return;

    const interval = setInterval(async () => {
      try {
        const res = await apiClient.getMarketingCampaign(business.id, generatingCampaignId);
        if (res?.campaign) {
          if (res.campaign.status !== 'generating') {
            setIsGenerating(false);
            setGeneratingCampaignId(null);
            setShowNewPlanModal(false);
            setActiveCampaign(res.campaign);
            await fetchCampaigns();
            await fetchContent(res.campaign.id);
            setActionNotice('✨ AI Marketing Campaign plan generated successfully! Review posts below.');
            setTimeout(() => setActionNotice(null), 4000);
          } else {
            // Cycle generation steps for nice UX
            setGenerationStep(prev => {
              if (prev.includes('catalog')) return 'Synthesizing high-engagement social copy...';
              if (prev.includes('copy')) return 'Assigning high-resolution catalog visuals...';
              if (prev.includes('visuals')) return 'Computing Africa/Lusaka CAT schedule timestamps...';
              return 'Finalizing approval hashes & readying plan...';
            });
          }
        }
      } catch (err) {
        console.warn('Poll campaign error:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isGenerating, generatingCampaignId, business.id]);

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.getMarketingCampaigns(business.id);
      const list = res.campaigns || [];
      setCampaigns(list);
      if (list.length > 0 && !activeCampaign) {
        setActiveCampaign(list[0]);
      } else if (activeCampaign) {
        const found = list.find(c => c.id === activeCampaign.id);
        if (found) setActiveCampaign(found);
      }
    } catch (err: any) {
      console.warn('Failed to load campaigns:', err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch content for campaign
  const fetchContent = async (cid: string) => {
    try {
      setIsRefreshing(true);
      const res = await apiClient.getMarketingContent(business.id, cid);
      setContentItems(res.items || []);
      if (res.campaign) {
        setActiveCampaign(res.campaign);
      }
    } catch (err: any) {
      console.warn('Failed to load content:', err?.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Submit "New Plan" Form: POST /businesses/{id}/marketing/plans (returns 202)
  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (planPlatforms.length === 0) {
      setErrorNotice('Please select at least one publishing platform.');
      return;
    }

    setIsSubmittingPlan(true);
    setErrorNotice(null);

    try {
      const payload: MarketingPlanPayload = {
        platforms: planPlatforms,
        number_of_posts: planPostCount,
        start_date: planStartDate,
        cadence: planCadence,
        products_to_feature: planProducts.split(',').map(s => s.trim()).filter(Boolean),
        tone_notes: planTone
      };

      const res = await apiClient.createMarketingPlan(business.id, payload);
      const cid = res.campaign_id;
      setGeneratingCampaignId(cid);
      setIsGenerating(true);
      setGenerationStep('Analyzing Lusaka retail catalog & sizing...');
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to initialize marketing campaign plan.');
      setIsSubmittingPlan(false);
    }
  };

  // Approve All: POST /campaigns/{cid}/approve with each content id and content_hash
  const handleApproveAll = async () => {
    if (!activeCampaign) return;
    setErrorNotice(null);

    const pendingOrEdited = contentItems.filter(
      i => i.status === 'pending_approval' || i.status === 'needs_reapproval'
    );

    if (pendingOrEdited.length === 0) {
      setActionNotice('All posts in this campaign are already approved!');
      setTimeout(() => setActionNotice(null), 3000);
      return;
    }

    try {
      setIsRefreshing(true);
      const itemsPayload = pendingOrEdited.map(i => ({
        id: i.id,
        content_hash: i.content_hash
      }));

      const res = await apiClient.approveMarketingCampaignAll(business.id, activeCampaign.id, itemsPayload);
      if (res.items) {
        setContentItems(res.items);
      }
      setActionNotice(`✅ Approved ${res.approved_count} post(s). Ready for scheduled autonomous publication.`);
      setTimeout(() => setActionNotice(null), 4000);
      await fetchCampaigns();
      await fetchContent(activeCampaign.id);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to approve campaign posts.');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Per-post approve
  const handleApproveSingle = async (item: MarketingContentItem) => {
    setErrorNotice(null);
    try {
      const res = await apiClient.approveMarketingContent(business.id, item.id, item.content_hash);
      if (res.item) {
        setContentItems(prev => prev.map(p => p.id === item.id ? res.item : p));
      }
      setActionNotice(`✅ Post approved (Hash: ${item.content_hash.slice(0, 8)}).`);
      setTimeout(() => setActionNotice(null), 3000);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Approval failed. Content hash mismatch?');
    }
  };

  // Per-post reject
  const handleRejectSingle = async (item: MarketingContentItem) => {
    setErrorNotice(null);
    try {
      const res = await apiClient.rejectMarketingContent(business.id, item.id, 'Declined by brand owner');
      if (res.item) {
        setContentItems(prev => prev.map(p => p.id === item.id ? res.item : p));
      }
      setActionNotice('Post marked as rejected.');
      setTimeout(() => setActionNotice(null), 3000);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to reject post.');
    }
  };

  // Open Edit Modal
  const openEditModal = (item: MarketingContentItem) => {
    setEditingItem(item);
    setEditCaption(item.caption);
    setEditScheduledAt(item.scheduled_at.slice(0, 16));
    setEditImageUrl(item.image_url);
  };

  // Save Content Edit: PATCH /businesses/{id}/marketing/content/{contentId}
  // Marks as "needs re-approval" per user requirement
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSavingEdit(true);
    setErrorNotice(null);

    try {
      const isoDate = new Date(editScheduledAt).toISOString();
      const res = await apiClient.updateMarketingContent(business.id, editingItem.id, {
        caption: editCaption,
        scheduled_at: isoDate,
        image_url: editImageUrl
      });

      if (res.item) {
        setContentItems(prev => prev.map(p => p.id === editingItem.id ? res.item : p));
      }

      setEditingItem(null);
      setActionNotice('⚠️ Changes saved! Marked as "Needs Re-approval" with fresh content hash.');
      setTimeout(() => setActionNotice(null), 4500);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to update content.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Campaign Controls: Pause, Resume, Cancel
  const handlePauseCampaign = async () => {
    if (!activeCampaign) return;
    try {
      const res = await apiClient.pauseMarketingCampaign(business.id, activeCampaign.id);
      setActiveCampaign(res.campaign);
      setActionNotice('Campaign paused. Scheduled auto-dispatch suspended.');
      setTimeout(() => setActionNotice(null), 3000);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to pause campaign.');
    }
  };

  const handleResumeCampaign = async () => {
    if (!activeCampaign) return;
    try {
      const res = await apiClient.resumeMarketingCampaign(business.id, activeCampaign.id);
      setActiveCampaign(res.campaign);
      setActionNotice('Campaign resumed. Scheduled auto-dispatch is active.');
      setTimeout(() => setActionNotice(null), 3000);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to resume campaign.');
    }
  };

  const handleCancelCampaign = async () => {
    if (!activeCampaign) return;
    if (!window.confirm('Are you sure you want to cancel this campaign? Remaining unpublished posts will be terminated.')) return;
    try {
      const res = await apiClient.cancelMarketingCampaign(business.id, activeCampaign.id);
      setActiveCampaign(res.campaign);
      setActionNotice('Campaign cancelled.');
      setTimeout(() => setActionNotice(null), 3000);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to cancel campaign.');
    }
  };

  // Explicit Publish: "Never publish without an explicit approval click."
  const handlePublishNow = async (item: MarketingContentItem) => {
    if (item.status === 'pending_approval' || item.status === 'needs_reapproval') {
      setErrorNotice('Cannot publish: explicit approval click is required first.');
      return;
    }

    try {
      const res = await apiClient.publishMarketingContent(business.id, item.id);
      if (res.item) {
        setContentItems(prev => prev.map(p => p.id === item.id ? res.item : p));
      }
      setActionNotice('🚀 Post successfully dispatched and published live!');
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to publish post.');
    }
  };

  // Retry Failed Dispatch
  const handleRetryPost = async (item: MarketingContentItem) => {
    try {
      const res = await apiClient.retryMarketingContent(business.id, item.id);
      if (res.item) {
        setContentItems(prev => prev.map(p => p.id === item.id ? res.item : p));
      }
      setActionNotice('🔄 Dispatch retried and publication completed!');
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Retry failed.');
    }
  };

  // Image Upload helper via apiClient.uploadMedia
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const res = await apiClient.uploadMedia(business.id, file);
      if (res.url) {
        setEditImageUrl(res.url);
        setActionNotice('Image uploaded successfully.');
        setTimeout(() => setActionNotice(null), 2500);
      }
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to upload image.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Filter content
  const filteredItems = contentItems.filter(item => {
    if (filterPlatform !== 'all' && item.platform !== filterPlatform) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  // Status Pill renderer
  const renderStatusBadge = (status: MarketingContentItem['status']) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <CheckCheck className="w-3 h-3 text-emerald-400" />
            <span>Published</span>
          </span>
        );
      case 'publishing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/10 text-sky-300 border border-sky-500/30 animate-pulse">
            <RefreshCw className="w-3 h-3 text-sky-400 animate-spin" />
            <span>Publishing...</span>
          </span>
        );
      case 'scheduled':
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{status === 'scheduled' ? 'Scheduled' : 'Approved'}</span>
          </span>
        );
      case 'needs_reapproval':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>Needs Re-approval</span>
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <XOctagon className="w-3 h-3 text-rose-400" />
            <span>Failed</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-neutral-500/20 text-neutral-300 border border-neutral-500/30">
            <X className="w-3 h-3 text-neutral-400" />
            <span>Rejected</span>
          </span>
        );
      case 'pending_approval':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Pending Approval</span>
          </span>
        );
    }
  };

  // Group content items by day for calendar view
  const calendarDaysMap: { [dateKey: string]: MarketingContentItem[] } = {};
  contentItems.forEach(item => {
    const key = item.scheduled_at.slice(0, 10);
    if (!calendarDaysMap[key]) calendarDaysMap[key] = [];
    calendarDaysMap[key].push(item);
  });
  const sortedCalendarDays = Object.keys(calendarDaysMap).sort();

  return (
    <div className="space-y-6 font-dm">
      
      {/* Notifications */}
      <AnimatePresence>
        {actionNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{actionNotice}</span>
            </div>
            <button type="button" onClick={() => setActionNotice(null)} className="text-emerald-400/60 hover:text-emerald-200">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {errorNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorNotice}</span>
            </div>
            <button type="button" onClick={() => setErrorNotice(null)} className="text-rose-400/60 hover:text-rose-200">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER: Autonomous AI Marketing */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0D0805] border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9B2208] to-[#E58330] flex items-center justify-center text-white shadow">
              <Megaphone className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-syne font-bold text-white tracking-tight">
              Autonomous AI Marketing
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#E58330]/15 text-[#E58330] border border-[#E58330]/30 font-bold uppercase tracking-wider">
              Autonomous Agent
            </span>
          </div>
          <p className="text-xs text-[#F5EDE4]/70 max-w-2xl">
            Generate, schedule, and autonomously publish social marketing campaigns across Instagram, WhatsApp Status, Facebook, and TikTok in <span className="text-amber-300 font-mono">Africa/Lusaka</span> timezone. Explicit approval required before release.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => {
              if (activeCampaign) fetchContent(activeCampaign.id);
              fetchCampaigns();
            }}
            disabled={isRefreshing}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#F5EDE4]/70 hover:text-white text-xs flex items-center gap-2 transition cursor-pointer"
            title="Refresh campaign and posts"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setShowNewPlanModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#9B2208] via-[#CD481B] to-[#E58330] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#9B2208]/25 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate New Plan</span>
          </button>
        </div>
      </div>

      {/* CAMPAIGN BAR & CONTROLS */}
      {activeCampaign ? (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#0F0A06] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Campaign Selector & Meta */}
          <div className="flex items-center gap-3.5 flex-wrap">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={activeCampaign.id}
                  onChange={(e) => {
                    const c = campaigns.find(item => item.id === e.target.value);
                    if (c) setActiveCampaign(c);
                  }}
                  className="bg-[#180E09] border border-white/15 rounded-xl px-3 py-1.5 text-white font-syne font-bold text-sm cursor-pointer focus:outline-none focus:border-[#E58330]"
                >
                  {campaigns.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.content_count || 0} posts)
                    </option>
                  ))}
                </select>

                {/* Campaign Status Badge */}
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                  activeCampaign.status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : activeCampaign.status === 'paused'
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : activeCampaign.status === 'generating'
                    ? 'bg-sky-500/10 text-sky-300 border-sky-500/30 animate-pulse'
                    : activeCampaign.status === 'cancelled'
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    : 'bg-white/10 text-white/70 border-white/15'
                }`}>
                  ● {activeCampaign.status}
                </span>

                <span className="text-[11px] font-mono text-[#F5EDE4]/50 hidden sm:inline">
                  Cadence: <span className="text-white capitalize">{activeCampaign.cadence.replace('_', ' ')}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#F5EDE4]/60">
                <span>Start: {activeCampaign.start_date}</span>
                <span>•</span>
                <span>Timezone: <span className="text-amber-300">Africa/Lusaka (CAT)</span></span>
              </div>
            </div>
          </div>

          {/* Campaign Controls: Pause, Resume, Cancel, Approve All */}
          <div className="flex items-center gap-2.5 flex-wrap">
            
            {/* Pause / Resume Controls */}
            {activeCampaign.status === 'active' && (
              <button
                type="button"
                onClick={handlePauseCampaign}
                className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                title="Pause automated scheduled publication"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
            )}

            {activeCampaign.status === 'paused' && (
              <button
                type="button"
                onClick={handleResumeCampaign}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                title="Resume automated scheduled publication"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            {activeCampaign.status !== 'cancelled' && (
              <button
                type="button"
                onClick={handleCancelCampaign}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/30 text-[#F5EDE4]/50 hover:text-rose-300 text-xs transition cursor-pointer"
                title="Cancel Campaign"
              >
                <XOctagon className="w-4 h-4" />
              </button>
            )}

            {/* "Approve All" sends POST .../campaigns/{cid}/approve with each content id and content_hash */}
            <button
              type="button"
              onClick={handleApproveAll}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
              title="Validate and approve all pending/edited posts with cryptographic content hashes"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve All Posts</span>
            </button>
          </div>

        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-[#0D0805] border border-white/10 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-[#E58330] mx-auto opacity-70" />
          <h3 className="text-base font-syne font-bold text-white">No Marketing Campaigns Yet</h3>
          <p className="text-xs text-[#F5EDE4]/60 max-w-md mx-auto">
            Click "Generate New Plan" to autonomously create your first multi-channel social promotion plan.
          </p>
          <button
            type="button"
            onClick={() => setShowNewPlanModal(true)}
            className="px-4 py-2 rounded-xl bg-[#9B2208] text-white text-xs font-syne font-bold hover:brightness-110 cursor-pointer"
          >
            Create First Plan
          </button>
        </div>
      )}

      {/* FILTER & VIEW TOGGLE BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-2xl bg-[#0A0604] border border-white/5 text-xs">
        
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[#F5EDE4]/50 flex items-center gap-1 text-[11px]">
            <ListFilter className="w-3 h-3" />
            Filter:
          </span>

          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="bg-[#130C08] border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs cursor-pointer focus:outline-none"
          >
            <option value="all">All Channels</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp Status</option>
            <option value="facebook">Facebook</option>
            <option value="tiktok">TikTok</option>
            <option value="x">X (Twitter)</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#130C08] border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs cursor-pointer focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending_approval">Pending Approval</option>
            <option value="needs_reapproval">Needs Re-approval</option>
            <option value="approved">Approved</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="failed">Failed Dispatch</option>
          </select>
        </div>

        {/* View Mode Toggle: Cards / Calendar */}
        <div className="flex items-center gap-1 bg-[#130C08] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded-lg font-syne font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white/15 text-white shadow'
                : 'text-[#F5EDE4]/50 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>List & Cards</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1 rounded-lg font-syne font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              viewMode === 'calendar'
                ? 'bg-white/15 text-white shadow'
                : 'text-[#F5EDE4]/50 hover:text-white'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Calendar View</span>
          </button>
        </div>

      </div>

      {/* CONTENT DISPLAY: CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => {
            const pConf = PLATFORM_CONFIG[item.platform] || PLATFORM_CONFIG.instagram;
            const PlatformIcon = pConf.icon;
            const isApproved = item.status === 'approved' || item.status === 'scheduled';
            const isPublished = item.status === 'published';
            const isNeedsReapproval = item.status === 'needs_reapproval';
            const isFailed = item.status === 'failed';

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-3xl bg-[#0D0805] border flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-200 ${
                  isNeedsReapproval
                    ? 'border-amber-500/50 ring-1 ring-amber-500/20'
                    : isFailed
                    ? 'border-rose-500/50 ring-1 ring-rose-500/20'
                    : isPublished
                    ? 'border-emerald-500/30'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Card Top Banner */}
                <div>
                  
                  {/* Image & Badges Overlay */}
                  <div className="relative aspect-video w-full bg-[#1A110B] overflow-hidden group">
                    <img
                      src={item.image_url}
                      alt={item.caption.slice(0, 30)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Platform Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`px-2.5 py-1 rounded-xl text-[11px] font-syne font-bold border flex items-center gap-1.5 shadow-md backdrop-blur-md ${pConf.badgeBg}`}>
                        <PlatformIcon className="w-3.5 h-3.5" />
                        <span>{pConf.label}</span>
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 shadow-md">
                      {renderStatusBadge(item.status)}
                    </div>

                    {/* Scheduled Time in Lusaka (CAT) */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90 drop-shadow">
                      <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{item.scheduled_at_lusaka || item.scheduled_at}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-3">
                    
                    {/* Caption Preview */}
                    <div className="p-3 rounded-2xl bg-[#070402] border border-white/5 text-xs text-[#F5EDE4]/90 whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto font-dm">
                      {item.caption}
                    </div>

                    {/* Needs Re-approval Alert */}
                    {isNeedsReapproval && (
                      <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-[11px] flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Edited copy/date/image. Requires explicit re-approval.</span>
                      </div>
                    )}

                    {/* Failed Alert & Reason */}
                    {isFailed && item.failure_reason && (
                      <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-rose-300">
                          <XOctagon className="w-3.5 h-3.5 text-rose-400" />
                          <span>Dispatch Failed:</span>
                        </div>
                        <p className="text-[11px] font-mono leading-tight">{item.failure_reason}</p>
                        {item.retry_count && (
                          <div className="text-[10px] text-rose-300/80 font-mono">
                            Retries attempted: {item.retry_count}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content Hash Metadata (Requirement c) */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#F5EDE4]/40 pt-1 border-t border-white/5">
                      <div className="flex items-center gap-1">
                        <Hash className="w-3 h-3 text-amber-400/70" />
                        <span>Hash:</span>
                        <span className="text-amber-300/90 font-bold">{item.content_hash.slice(0, 10)}...</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(item.content_hash);
                          setCopiedHashId(item.id);
                          setTimeout(() => setCopiedHashId(null), 2000);
                        }}
                        className="hover:text-white transition flex items-center gap-0.5 cursor-pointer"
                        title="Copy cryptographic content hash"
                      >
                        {copiedHashId === item.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedHashId === item.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="p-4 sm:p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2 flex-wrap">
                  
                  {/* Left: Edit button */}
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    disabled={isPublished}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                      isPublished
                        ? 'opacity-40 cursor-not-allowed border-white/5 text-white/40'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80 hover:text-white'
                    }`}
                    title="Edit copy, date/time, or image (marks post as needs re-approval)"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Edit</span>
                  </button>

                  {/* Right Actions: Approve, Reject, Publish Now, Retry */}
                  <div className="flex items-center gap-1.5">
                    
                    {/* If failed: Retry Button */}
                    {isFailed && (
                      <button
                        type="button"
                        onClick={() => handleRetryPost(item)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:brightness-110 text-white text-xs font-syne font-bold flex items-center gap-1.5 shadow cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry Dispatch</span>
                      </button>
                    )}

                    {/* If pending or needs re-approval: Approve & Reject */}
                    {(item.status === 'pending_approval' || item.status === 'needs_reapproval') && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleRejectSingle(item)}
                          className="p-1.5 rounded-xl hover:bg-rose-500/20 text-[#F5EDE4]/40 hover:text-rose-300 transition cursor-pointer"
                          title="Reject post"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApproveSingle(item)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-syne font-bold flex items-center gap-1.5 transition cursor-pointer shadow"
                          title="Approve this post explicitly"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Approve</span>
                        </button>
                      </>
                    )}

                    {/* Explicit Publish button for approved/scheduled posts */}
                    {/* "Never publish without an explicit approval click." */}
                    {(item.status === 'approved' || item.status === 'scheduled') && (
                      <button
                        type="button"
                        onClick={() => handlePublishNow(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white text-xs font-syne font-bold flex items-center gap-1.5 shadow-md shadow-[#9B2208]/20 transition cursor-pointer"
                        title="Dispatch and publish live now"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Now</span>
                      </button>
                    )}

                    {/* Published live indicator */}
                    {isPublished && (
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCheck className="w-4 h-4" />
                        <span>Live on {pConf.label}</span>
                      </span>
                    )}

                  </div>

                </div>

              </motion.div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="col-span-full p-12 text-center rounded-3xl bg-[#0D0805] border border-white/5 space-y-2 text-[#F5EDE4]/60 text-xs">
              <p>No posts match the selected platform and status filters.</p>
            </div>
          )}
        </div>
      )}

      {/* CONTENT DISPLAY: CALENDAR VIEW (Requirement b) */}
      {viewMode === 'calendar' && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0D0805] border border-white/10 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-syne font-bold text-white flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#E58330]" />
                <span>Publishing Schedule (Africa/Lusaka Timezone)</span>
              </h3>
              <p className="text-xs text-[#F5EDE4]/60">
                Central Africa Time (UTC+2) calendar matrix showing planned broadcast cadence.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-white/5 text-[#F5EDE4]/70">
              {contentItems.length} Total Posts
            </span>
          </div>

          <div className="space-y-4">
            {sortedCalendarDays.map(dateKey => {
              const dayItems = calendarDaysMap[dateKey];
              const dateObj = new Date(dateKey + 'T00:00:00');
              const dateFormatted = new Intl.DateTimeFormat('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }).format(dateObj);

              return (
                <div key={dateKey} className="rounded-2xl bg-[#130C08] border border-white/10 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E58330]" />
                      <span className="font-syne font-bold text-white text-xs">{dateFormatted}</span>
                      <span className="text-[10px] font-mono text-[#F5EDE4]/50">({dateKey})</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#F5EDE4]/70">
                      {dayItems.length} post{dayItems.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {dayItems.map(item => {
                      const pConf = PLATFORM_CONFIG[item.platform] || PLATFORM_CONFIG.instagram;
                      const PlatformIcon = pConf.icon;

                      return (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-[#090503] border border-white/10 flex items-start gap-3 hover:border-white/20 transition group"
                        >
                          <img
                            src={item.image_url}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${pConf.badgeBg}`}>
                                <PlatformIcon className="w-2.5 h-2.5" />
                                <span>{pConf.label}</span>
                              </span>
                              {renderStatusBadge(item.status)}
                            </div>
                            <p className="text-[11px] text-[#F5EDE4]/80 line-clamp-2 font-dm leading-snug">
                              {item.caption}
                            </p>
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#F5EDE4]/40 pt-1">
                              <span>{item.scheduled_at_lusaka.slice(0, 17)} CAT</span>
                              <button
                                type="button"
                                onClick={() => openEditModal(item)}
                                className="text-amber-400 hover:text-amber-300 font-bold"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: "NEW PLAN" GENERATOR FORM (Requirement a) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showNewPlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl rounded-3xl bg-[#0D0805] border border-white/15 p-6 sm:p-7 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <h3 className="text-lg font-syne font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#E58330]" />
                    <span>Create New Autonomous Campaign Plan</span>
                  </h3>
                  <p className="text-xs text-[#F5EDE4]/70">
                    Configure campaign parameters for AI worker generation. Calls <span className="font-mono text-amber-300">POST /marketing/plans</span>.
                  </p>
                </div>
                {!isGenerating && (
                  <button
                    type="button"
                    onClick={() => setShowNewPlanModal(false)}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* GENERATING STATE OVERLAY: Requirement (a) */}
              {isGenerating ? (
                <div className="py-12 px-6 text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#9B2208] to-[#E58330] animate-ping opacity-25" />
                    <div className="relative w-20 h-20 rounded-full bg-[#180E09] border border-white/20 flex items-center justify-center shadow-xl">
                      <Sparkles className="w-8 h-8 text-[#E58330] animate-spin" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-syne font-bold text-white">
                      Generating Autonomous Marketing Plan...
                    </h4>
                    <p className="text-xs text-amber-300 font-mono">
                      Polling <span className="text-white">GET /marketing/campaigns/{generatingCampaignId}</span> (202 Accepted)
                    </p>
                    <p className="text-xs text-[#F5EDE4]/70 italic max-w-md mx-auto">
                      "{generationStep}"
                    </p>
                  </div>

                  <div className="w-full max-w-sm mx-auto h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#9B2208] via-[#CD481B] to-[#E58330] animate-pulse w-3/4 rounded-full" />
                  </div>
                </div>
              ) : (
                /* Plan Input Form */
                <form onSubmit={handleCreatePlan} className="space-y-4 text-xs font-dm">
                  
                  {/* Platforms selection */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[#F5EDE4]/80 text-[11px] font-bold">
                      Target Social Publishing Platforms *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.entries(PLATFORM_CONFIG).map(([key, conf]) => {
                        const Icon = conf.icon;
                        const isSelected = planPlatforms.includes(key);
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                if (planPlatforms.length > 1) {
                                  setPlanPlatforms(planPlatforms.filter(p => p !== key));
                                }
                              } else {
                                setPlanPlatforms([...planPlatforms, key]);
                              }
                            }}
                            className={`p-2.5 rounded-2xl border text-left flex items-center gap-2 transition cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#9B2208]/30 to-[#CD481B]/20 border-[#CD481B] text-white shadow'
                                : 'bg-[#130C08] border-white/10 text-white/50 hover:text-white'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="font-syne font-bold text-xs">{conf.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Number of posts & Cadence */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[#F5EDE4]/80 text-[11px]">
                        Number of Posts to Generate
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={14}
                        value={planPostCount}
                        onChange={(e) => setPlanPostCount(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[#F5EDE4]/80 text-[11px]">
                        Publishing Cadence
                      </label>
                      <select
                        value={planCadence}
                        onChange={(e) => setPlanCadence(e.target.value as any)}
                        className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3.5 py-2.5 text-white cursor-pointer"
                      >
                        <option value="daily">Daily (1 post / day at 10:00 CAT)</option>
                        <option value="twice_daily">Twice Daily (10:00 & 18:00 CAT)</option>
                        <option value="three_per_week">3 Times a Week (Mon, Wed, Fri)</option>
                        <option value="weekly">Weekly Drop (Every 7 days)</option>
                      </select>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[#F5EDE4]/80 text-[11px]">
                      Campaign Start Date (Africa/Lusaka CAT)
                    </label>
                    <input
                      type="date"
                      value={planStartDate}
                      onChange={(e) => setPlanStartDate(e.target.value)}
                      className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono"
                      required
                    />
                  </div>

                  {/* Products to Feature */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[#F5EDE4]/80 text-[11px]">
                      Products to Feature (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={planProducts}
                      onChange={(e) => setPlanProducts(e.target.value)}
                      placeholder="e.g. Nike Air Force 1, Adidas Samba OG, Air Jordan 4"
                      className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/20"
                    />
                  </div>

                  {/* Tone Notes */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[#F5EDE4]/80 text-[11px]">
                      Tone Notes & Guidelines
                    </label>
                    <textarea
                      rows={3}
                      value={planTone}
                      onChange={(e) => setPlanTone(e.target.value)}
                      className="w-full bg-[#130C08] border border-white/10 rounded-xl p-3 text-white placeholder-white/20 leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowNewPlanModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs transition cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmittingPlan}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#CD481B] to-[#E58330] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#9B2208]/20 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isSubmittingPlan ? 'Submitting...' : 'Generate Plan (POST /marketing/plans)'}</span>
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL 2: EDIT CONTENT ITEM (Requirement b) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-xl rounded-3xl bg-[#0D0805] border border-white/15 p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="space-y-0.5">
                  <h3 className="text-base font-syne font-bold text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Edit Post Details & Schedule</span>
                  </h3>
                  <p className="text-[11px] text-[#F5EDE4]/60">
                    Editing marks this item as <span className="text-amber-300 font-bold">Needs Re-approval</span> and recalculates its content hash.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs font-dm">
                {/* Caption */}
                <div className="space-y-1">
                  <label className="block font-mono text-[#F5EDE4]/70 text-[11px]">
                    Post Caption & Copy *
                  </label>
                  <textarea
                    rows={4}
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl p-3 text-white leading-relaxed"
                    required
                  />
                </div>

                {/* Scheduled Date/Time in Africa/Lusaka */}
                <div className="space-y-1">
                  <label className="block font-mono text-[#F5EDE4]/70 text-[11px]">
                    Scheduled Date & Time (Africa/Lusaka CAT) *
                  </label>
                  <input
                    type="datetime-local"
                    value={editScheduledAt}
                    onChange={(e) => setEditScheduledAt(e.target.value)}
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                    required
                  />
                </div>

                {/* Image URL & File Upload */}
                <div className="space-y-1">
                  <label className="block font-mono text-[#F5EDE4]/70 text-[11px]">
                    Visual Image URL
                  </label>
                  <input
                    type="url"
                    value={editImageUrl}
                    onChange={(e) => setEditImageUrl(e.target.value)}
                    className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                    required
                  />

                  {/* Upload media file */}
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 font-mono cursor-pointer transition">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{isUploadingImage ? 'Uploading image...' : 'Upload Local Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>

                    {editImageUrl && (
                      <span className="text-[10px] text-[#F5EDE4]/50 font-mono">
                        Image Preview Ready
                      </span>
                    )}
                  </div>
                </div>

                {/* Preview Image */}
                {editImageUrl && (
                  <div className="w-full h-28 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center">
                    <img src={editImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSavingEdit}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isSavingEdit ? 'Saving...' : 'Save & Mark Needs Re-approval (PATCH)'}</span>
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
