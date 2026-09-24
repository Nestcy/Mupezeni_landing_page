import React, { useState, useEffect } from 'react';
import { 
  MessageSquareText, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  Send, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  Share2, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  Store, 
  Zap, 
  Check, 
  AlertCircle,
  Eye,
  Sliders,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon,
  FileText,
  Layers,
  Smartphone,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import sonyHeadphonesAdImg from '../assets/images/sony_headphones_ad_1790256456952.jpg';

interface InteractiveAgentDemoProps {
  onNavigateToContact?: (page: PageId) => void;
  className?: string;
}

type DemoTab = 'support' | 'marketing';
type SupportScenario = 'inquiry_catalog' | 'abandoned_cart';
type MarketingScenario = 'catalog_sync_idea' | 'budget_approval_cross';
type AdVariationTab = 'whatsapp' | 'instagram' | 'tiktok' | 'catalog';

export const InteractiveAgentDemo: React.FC<InteractiveAgentDemoProps> = ({
  onNavigateToContact,
  className = ''
}) => {
  // Main Tab
  const [activeTab, setActiveTab] = useState<DemoTab>('support');

  // Sub scenarios
  const [supportScenario, setSupportScenario] = useState<SupportScenario>('inquiry_catalog');
  const [marketingScenario, setMarketingScenario] = useState<MarketingScenario>('catalog_sync_idea');

  // Ad variation preview tab
  const [selectedAdVariation, setSelectedAdVariation] = useState<AdVariationTab>('whatsapp');

  // Step state within current scenario (0, 1, 2)
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Marketing approval state
  const [isBudgetApproved, setIsBudgetApproved] = useState<boolean>(false);
  const [includePaidAds, setIncludePaidAds] = useState<boolean>(true);
  const [allocatedBudget, setAllocatedBudget] = useState<number>(350);
  const [isFlow1CrossPosted, setIsFlow1CrossPosted] = useState<boolean>(false);

  // Gemini AI Generated Ad Creative state
  const [adImageSrc, setAdImageSrc] = useState<string>(sonyHeadphonesAdImg);
  const [isGeneratingAdImage, setIsGeneratingAdImage] = useState<boolean>(false);
  const [imageGenerationNotice, setImageGenerationNotice] = useState<string | null>(null);

  const handleRegenerateAdImage = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsGeneratingAdImage(true);
    setImageGenerationNotice(null);
    try {
      const res = await fetch('/api/generate-ad-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productTitle: 'Sony WH-CH720N Wireless ANC Headphones',
          description: 'Lightweight over-ear Bluetooth 5.3 headset with Integrated Processor V1, 35hr battery, dual noise sensor technology'
        })
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        setAdImageSrc(data.imageUrl);
        setImageGenerationNotice('New creative generated with Gemini 3.1 Flash Image!');
      } else {
        setImageGenerationNotice('Active: Pre-rendered Gemini 3.1 Flash Image creative');
      }
    } catch {
      setImageGenerationNotice('Active: Pre-rendered Gemini 3.1 Flash Image creative');
    } finally {
      setIsGeneratingAdImage(false);
    }
  };

  // Cart recovery state
  const [isCartRecovered, setIsCartRecovered] = useState<boolean>(false);

  // Reset steps when scenario or tab changes
  useEffect(() => {
    setStepIdx(0);
    setIsBudgetApproved(false);
    setIsCartRecovered(false);
    setIsFlow1CrossPosted(false);
  }, [activeTab, supportScenario, marketingScenario]);

  // Autoplay ticker
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setStepIdx((prev) => {
        if (prev < 2) return prev + 1;
        return 0; // loop back
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, activeTab, supportScenario, marketingScenario]);

  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

  return (
    <section 
      id="how-mupezeni-works-demo"
      className={`py-8 sm:py-12 lg:py-14 bg-[#060403] relative overflow-hidden border-t border-b border-[#1C1008] ${className}`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#9B2208]/15 to-[#D95A1A]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#B83A0A]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 shadow-sm shadow-[#9B2208]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D95A1A] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Interactive Workforce Simulation
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-syne text-white tracking-tight leading-tight">
            See Exactly How Mupezeni Works <br className="hidden sm:inline" />
            <span className="text-gradient-fire">For Support & Agentic Marketing</span>
          </h2>

          <p className="text-xs sm:text-[13px] text-[#FAFAF9]/80 font-normal max-w-xl mx-auto leading-relaxed">
            Experience the two autonomous AI workers running your frontline. On the left, test real customer WhatsApp conversations and merchant approval gates in the mobile phone mockup.
          </p>

          {/* MAIN MODE TABS: Customer Support Worker vs Agentic Marketing Worker */}
          <div className="pt-1 flex items-center justify-center">
            <div className="inline-flex p-1 rounded-xl bg-[#110A06] border border-[#2D1A10] shadow-lg">
              <button
                onClick={() => {
                  setActiveTab('support');
                  setIsAutoPlaying(true);
                }}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg font-syne font-bold text-xs transition-all duration-300 cursor-pointer ${
                  activeTab === 'support'
                    ? 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white shadow-md shadow-[#9B2208]/35'
                    : 'text-[#A8A099] hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>Customer Support Worker</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('marketing');
                  setIsAutoPlaying(true);
                }}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg font-syne font-bold text-xs transition-all duration-300 cursor-pointer ${
                  activeTab === 'marketing'
                    ? 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white shadow-md shadow-[#9B2208]/35'
                    : 'text-[#A8A099] hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Agentic Marketing Worker</span>
              </button>
            </div>
          </div>

          {/* SUB SCENARIOS CHIPS */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-0.5">
            {activeTab === 'support' ? (
              <>
                <button
                  onClick={() => setSupportScenario('inquiry_catalog')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-syne font-semibold transition-all cursor-pointer ${
                    supportScenario === 'inquiry_catalog'
                      ? 'bg-[#2A140A] text-[#F5EDE4] border border-[#D95A1A]/60 shadow-sm'
                      : 'bg-[#120B07] text-[#FAFAF9]/60 hover:text-white border border-white/5'
                  }`}
                >
                  Scenario 1: Live Inquiry, Catalog & Pricing Check
                </button>
                <button
                  onClick={() => setSupportScenario('abandoned_cart')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-syne font-semibold transition-all cursor-pointer ${
                    supportScenario === 'abandoned_cart'
                      ? 'bg-[#2A140A] text-[#F5EDE4] border border-[#D95A1A]/60 shadow-sm'
                      : 'bg-[#120B07] text-[#FAFAF9]/60 hover:text-white border border-white/5'
                  }`}
                >
                  Scenario 2: E-Com Abandoned Basket Recovery
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setMarketingScenario('catalog_sync_idea')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-syne font-semibold transition-all cursor-pointer ${
                    marketingScenario === 'catalog_sync_idea'
                      ? 'bg-[#2A140A] text-[#F5EDE4] border border-[#D95A1A]/60 shadow-sm'
                      : 'bg-[#120B07] text-[#FAFAF9]/60 hover:text-white border border-white/5'
                  }`}
                >
                  Flow 1: Catalog Ingestion, Ad Variations & Cross-Posting
                </button>
                <button
                  onClick={() => setMarketingScenario('budget_approval_cross')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-syne font-semibold transition-all cursor-pointer ${
                    marketingScenario === 'budget_approval_cross'
                      ? 'bg-[#2A140A] text-[#F5EDE4] border border-[#D95A1A]/60 shadow-sm'
                      : 'bg-[#120B07] text-[#FAFAF9]/60 hover:text-white border border-white/5'
                  }`}
                >
                  Flow 2: Predefined Cadence, Budget Approval & Cross-Posting
                </button>
              </>
            )}
          </div>

        </div>

        {/* CENTERED ULTRA-REALISTIC MOBILE PHONE MOCKUP */}
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          
          {/* Phone Container */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[480px] sm:h-[520px] bg-[#070504] rounded-[28px] p-2.5 sm:p-3 border-[4px] border-[#22160F] shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(155,34,8,0.22)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden select-none">
              
              {/* Phone Dynamic Island / Camera Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-40 flex items-center justify-end px-1 shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#121015] border border-white/10 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-[#1D3557]/60" />
                </div>
              </div>

              {/* Top Phone Status Bar (Time, Signal, Wifi, Battery) */}
              <div className="relative z-30 pt-0.5 px-2.5 flex items-center justify-between text-[9px] font-semibold text-white/80 font-mono">
                <span>09:41</span>
                <div className="flex items-center gap-1 text-white/75 text-[8.5px]">
                  <span>5G</span>
                  <div className="w-3 h-1.5 rounded-[2px] border border-white/70 p-[1px] flex items-center">
                    <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Phone App Header Bar */}
              <div className="relative z-20 mt-1 px-2 py-1 rounded-md bg-[#140C07] border border-[#2F1C12] flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-[#9B2208] to-[#D95A1A] flex items-center justify-center text-white shrink-0 shadow-sm">
                    {activeTab === 'support' ? (
                      <MessageSquareText className="w-3 h-3" />
                    ) : (
                      <Sparkles className="w-3 h-3 text-amber-300" />
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-[#140C07]" />
                  </div>

                  <div className="truncate">
                    <div className="flex items-center gap-1">
                      <span className="font-syne font-bold text-[10px] text-white truncate">
                        {activeTab === 'support' ? 'Support AI' : 'Marketing AI'}
                      </span>
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#25D366] shrink-0" />
                    </div>
                    <p className="text-[8.5px] font-mono text-emerald-400 leading-none">
                      {activeTab === 'support' ? '24/7 Live' : 'Active'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-white/50 text-[8.5px]">
                  <span className="px-1 py-0.5 rounded bg-black/50 border border-white/10 font-mono">
                    {activeTab === 'support' ? 'WhatsApp' : 'v2.4'}
                  </span>
                </div>
              </div>

              {/* Phone Screen Dynamic Body */}
              <div className="relative z-10 flex-1 my-1.5 overflow-y-auto px-1 space-y-2.5 no-scrollbar text-left text-xs">
                
                {/* ======================================================== */}
                {/* SCENARIO 1A: CUSTOMER SUPPORT - INQUIRY & CATALOG CHECK */}
                {/* ======================================================== */}
                {activeTab === 'support' && supportScenario === 'inquiry_catalog' && (
                  <div className="space-y-2.5">
                    {/* Customer Message 1 */}
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-[85%] bg-[#1E140E] border border-white/10 p-2.5 rounded-2xl rounded-tl-sm text-white/90 text-[11px] shadow-sm space-y-1"
                    >
                      <p>Hi! Do you have the Soundcore Wireless Earbuds in black in stock? How much with delivery to Woodlands?</p>
                      <span className="text-[9px] text-white/40 font-mono block text-right">09:41 AM</span>
                    </motion.div>

                    {/* Step 1 or higher: Agent Catalog & Price Lookup Pill */}
                    {stepIdx >= 1 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-2 rounded-xl bg-[#0D0805] border border-[#D95A1A]/40 text-[10px] font-mono space-y-1 shadow-md"
                      >
                        <div className="flex items-center justify-between text-[#D95A1A] font-bold">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-400" />
                            <span>Catalog Query: soundcore_earbuds_blk</span>
                          </span>
                          <span className="text-emerald-400">0.4s query</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[9px] text-white/70 pt-0.5">
                          <div>Stock: <span className="text-white font-bold">14 units</span></div>
                          <div>Price: <span className="text-white font-bold">K850</span></div>
                          <div className="col-span-2">Woodlands Delivery: <span className="text-white font-bold">K50 (Total K900)</span></div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 1 or higher: AI Outgoing WhatsApp Response */}
                    {stepIdx >= 1 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-auto max-w-[88%] bg-gradient-to-r from-[#8B1E05] to-[#B33508] p-2.5 rounded-2xl rounded-tr-sm text-white text-[11px] shadow-md space-y-1"
                      >
                        <p>
                          Hello! Yes, we have 14 units of the Soundcore Earbuds (Black) available right now at <strong>K850</strong>. Delivery to Woodlands is <strong>K50</strong> (Total: <strong>K900</strong>).
                        </p>
                        <p className="pt-0.5 text-[10.5px] text-white/90">
                          Would you like to reserve yours now via <strong>MTN MoMo</strong> or <strong>Airtel Money</strong>?
                        </p>
                        <div className="flex items-center justify-end gap-1 text-[9px] text-white/60 font-mono">
                          <span>09:41 AM</span>
                          <span className="text-emerald-300">✓✓</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Customer agrees + Instant Merchant Reservation Code */}
                    {stepIdx >= 2 && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-[70%] bg-[#1E140E] border border-white/10 p-2 rounded-2xl rounded-tl-sm text-white/90 text-[11px]"
                        >
                          <p>Yes please, MTN MoMo!</p>
                          <span className="text-[9px] text-white/40 font-mono block text-right">09:42 AM</span>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="ml-auto max-w-[88%] bg-[#140C07] border border-[#25D366]/40 p-2.5 rounded-xl text-white text-[10.5px] shadow-lg space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-emerald-400 font-bold text-[10px] font-mono">
                            <span>Order #MZ-4109 Reserved</span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Ready</span>
                          </div>
                          <p className="text-white/80 text-[10px]">
                            Pay <strong>K900</strong> to MTN Merchant Code: <span className="font-mono text-amber-300 font-bold">096-742-108</span>. Reply with your SMS confirmation to dispatch immediately!
                          </p>
                          <div className="p-1 rounded bg-black/40 text-[9px] text-emerald-300 font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>Stock reserved: 13 units remaining</span>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>
                )}

                {/* ======================================================== */}
                {/* SCENARIO 1B: CUSTOMER SUPPORT - ABANDONED CART RECOVERY */}
                {/* ======================================================== */}
                {activeTab === 'support' && supportScenario === 'abandoned_cart' && (
                  <div className="space-y-2.5">
                    {/* Abandoned Cart System Alert */}
                    <motion.div 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300 space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-amber-400" />
                          <span>E-Com Trigger: Basket Left</span>
                        </span>
                        <span>25m ago</span>
                      </div>
                      <p className="text-white/70 text-[9.5px]">
                        Nike Air Force 1 '07 (Size 42) · Value: <strong className="text-white">K1,800</strong> · Checkout not completed
                      </p>
                    </motion.div>

                    {/* AI Agent Automated Proactive Recovery Outreach */}
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="ml-auto max-w-[88%] bg-gradient-to-r from-[#8B1E05] to-[#B33508] p-2.5 rounded-2xl rounded-tr-sm text-white text-[11px] shadow-md space-y-1"
                    >
                      <p>
                        Hi Chileshe 👋 We noticed you left the <strong>Nike Air Force 1 '07 (Size 42)</strong> in your basket!
                      </p>
                      <p className="pt-0.5 text-[10.5px] text-white/90">
                        Did you encounter an issue at checkout, or did you need help confirming your delivery location in Lusaka? We've held your pair for 2 hours so you don't miss out.
                      </p>
                      <span className="text-[9px] text-white/60 font-mono block text-right">10:15 AM · Sent</span>
                    </motion.div>

                    {/* Step 1 or higher: Customer Explains Problem */}
                    {stepIdx >= 1 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-[85%] bg-[#1E140E] border border-white/10 p-2.5 rounded-2xl rounded-tl-sm text-white/90 text-[11px] space-y-1"
                      >
                        <p>Oh thanks for following up! My card was failing at checkout. Can I pay cash on delivery or Airtel Money instead?</p>
                        <span className="text-[9px] text-white/40 font-mono block text-right">10:18 AM</span>
                      </motion.div>
                    )}

                    {/* Step 2: Agent Guides Toward Completed Sale */}
                    {stepIdx >= 2 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-auto max-w-[88%] bg-[#140C07] border border-emerald-500/40 p-2.5 rounded-xl text-white text-[10.5px] shadow-lg space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-emerald-400 font-bold text-[10px] font-mono">
                          <span>Sale Saved & Converted!</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Recovered</span>
                        </div>
                        <p className="text-white/90 text-[10px]">
                          Absolutely! I've switched your order to <strong>Airtel Money / Pay on Delivery</strong>. Your pair is locked in for delivery tomorrow at 10:00 AM!
                        </p>
                        <div className="p-1 rounded bg-black/50 text-[9px] text-emerald-300 font-mono flex items-center justify-between">
                          <span>Revenue Saved: +K1,800</span>
                          <span>Zero Human Intervention</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* ======================================================== */}
                {/* SCENARIO 2A: MARKETING AGENT - CATALOG INGESTION & ADS   */}
                {/* ======================================================== */}
                {activeTab === 'marketing' && marketingScenario === 'catalog_sync_idea' && (
                  <div className="space-y-2.5">
                    {/* Step 0: Catalog Product Ingestion & Description Extraction */}
                    <motion.div 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-xl bg-[#110A06] border border-[#2D1A10] space-y-1.5 text-[10px]"
                    >
                      <div className="flex items-center justify-between text-[#D95A1A] font-bold font-mono">
                        <span className="flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5" />
                          <span>1. Product Ingested from Catalog</span>
                        </span>
                        <span className="text-emerald-400 font-mono text-[9px]">SKU #MZ-702</span>
                      </div>
                      
                      {/* Raw Catalog Item Box */}
                      <div className="p-2 rounded-lg bg-black/50 border border-white/5 space-y-1">
                        <div className="flex items-center justify-between text-[9.5px]">
                          <span className="font-bold text-white font-syne">Sony WH-CH720N Wireless ANC</span>
                          <span className="font-mono text-emerald-400 font-bold">K1,450 · 18 in stock</span>
                        </div>
                        <p className="text-white/60 text-[8.5px] leading-tight line-clamp-2 italic">
                          "Lightweight over-ear Bluetooth 5.3 headset with Integrated Processor V1, 35hr battery, dual noise sensor technology, multipoint connection."
                        </p>
                      </div>

                      {/* AI Angle Extraction Tags */}
                      <div className="flex items-center gap-1 flex-wrap text-[8px] font-mono text-amber-300">
                        <span className="px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">✓ 35h Battery</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">✓ Studio ANC</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">✓ Lusaka Same-Day</span>
                      </div>
                    </motion.div>

                    {/* Step 1: Generated Ad Variations & Digital Catalog */}
                    <motion.div 
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-xl bg-gradient-to-br from-[#160D08] to-[#25120A] border border-[#D95A1A]/40 space-y-2 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded bg-[#D95A1A]/20 text-[#D95A1A] text-[9px] font-mono font-bold flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          <span>2. Generated Ad Variations & Catalog</span>
                        </span>
                        <span className="text-emerald-400 text-[9px] font-mono">Ready to Post</span>
                      </div>

                      {/* Interactive Format Switcher */}
                      <div className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-black/60 border border-white/5 text-[8.5px] font-mono font-semibold">
                        <button
                          type="button"
                          onClick={() => setSelectedAdVariation('whatsapp')}
                          className={`py-1 rounded text-center transition-all cursor-pointer ${
                            selectedAdVariation === 'whatsapp'
                              ? 'bg-[#D95A1A] text-white font-bold shadow-sm'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedAdVariation('instagram')}
                          className={`py-1 rounded text-center transition-all cursor-pointer ${
                            selectedAdVariation === 'instagram'
                              ? 'bg-[#D95A1A] text-white font-bold shadow-sm'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          IG / FB
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedAdVariation('tiktok')}
                          className={`py-1 rounded text-center transition-all cursor-pointer ${
                            selectedAdVariation === 'tiktok'
                              ? 'bg-[#D95A1A] text-white font-bold shadow-sm'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          TikTok
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedAdVariation('catalog')}
                          className={`py-1 rounded text-center transition-all cursor-pointer ${
                            selectedAdVariation === 'catalog'
                              ? 'bg-[#D95A1A] text-white font-bold shadow-sm'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Catalog
                        </button>
                      </div>

                      {/* Variation Content Card */}
                      <div className="p-2 rounded-lg bg-black/50 border border-white/10 text-[9px] space-y-1.5 min-h-[90px] flex flex-col justify-center">
                        {selectedAdVariation === 'whatsapp' && (
                          <div className="space-y-1.5 text-white/90">
                            <div className="flex items-center justify-between text-[8px] text-emerald-400 font-mono">
                              <span>WhatsApp Status & Broadcast</span>
                              <span className="flex items-center gap-1 text-amber-300">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>Gemini Visual</span>
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/10">
                              <img
                                src={adImageSrc}
                                alt="Sony Headphones Gemini Creative"
                                className="w-11 h-11 rounded-md object-cover border border-[#D95A1A]/40 shrink-0 shadow"
                              />
                              <p className="leading-snug text-[8.5px] text-white/90">
                                "🎧 Tired of noisy Lusaka traffic? <strong>Sony 35-Hour ANC Headphones</strong> now in stock! Only <strong>K1,450</strong> (18 units). Tap reply to pay via MTN MoMo / Airtel Money now."
                              </p>
                            </div>

                            <div className="pt-0.5 flex items-center justify-between text-[8px] text-white/50">
                              <span>Includes MoMo prompt CTA</span>
                              <span className="text-emerald-300">✓ In stock check</span>
                            </div>
                          </div>
                        )}

                        {selectedAdVariation === 'instagram' && (
                          <div className="space-y-1.5">
                            {/* Real AI-generated image creative */}
                            <div className="relative rounded-lg overflow-hidden border border-[#D95A1A]/30 bg-black/80 group">
                              <div className="relative aspect-[16/10] w-full overflow-hidden">
                                <img
                                  src={adImageSrc}
                                  alt="Sony WH-CH720N Gemini AI Ad Creative"
                                  className={`w-full h-full object-cover transition-all duration-300 ${
                                    isGeneratingAdImage ? 'opacity-40 blur-xs scale-105' : 'opacity-100 scale-100'
                                  }`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />
                                
                                {/* Gemini Model Badge */}
                                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[7.5px] font-mono font-bold text-amber-300 flex items-center gap-1 shadow-sm">
                                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                  <span>Gemini 3.1 Flash Image</span>
                                </div>

                                {/* Regenerate Trigger Button */}
                                <button
                                  type="button"
                                  onClick={handleRegenerateAdImage}
                                  disabled={isGeneratingAdImage}
                                  className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-[#9B2208]/90 hover:bg-[#B83A0A] active:scale-95 text-white text-[7.5px] font-mono flex items-center gap-1 transition-all cursor-pointer shadow"
                                  title="Generate new ad visual with Gemini API"
                                >
                                  {isGeneratingAdImage ? (
                                    <span className="animate-spin text-[8px]">↻</span>
                                  ) : (
                                    <RotateCcw className="w-2.5 h-2.5" />
                                  )}
                                  <span>{isGeneratingAdImage ? 'Generating...' : 'Regen Visual'}</span>
                                </button>

                                {/* Tag Overlay on Ad Visual */}
                                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[8px] font-mono">
                                  <span className="px-1.5 py-0.5 rounded bg-[#D95A1A]/90 text-white font-bold">
                                    35H BATTERY · DUAL ANC
                                  </span>
                                  <span className="text-emerald-300 font-bold bg-black/75 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                    K1,450
                                  </span>
                                </div>
                              </div>
                            </div>

                            {imageGenerationNotice && (
                              <div className="text-[7.5px] font-mono text-emerald-400 flex items-center gap-1">
                                <Check className="w-2.5 h-2.5 shrink-0" />
                                <span>{imageGenerationNotice}</span>
                              </div>
                            )}

                            <p className="text-white/80 leading-snug line-clamp-2 text-[8.5px]">
                              "Drown out the noise. Experience studio-grade acoustic clarity for K1,450. Free same-day delivery in Lusaka. Tap link in bio to buy or DM to order."
                            </p>
                            <div className="flex items-center justify-between text-[7.5px] font-mono text-[#D95A1A]">
                              <span>#LusakaRetail #TechZambia #AudioDeals</span>
                              <span className="text-white/40">Feed & Carousel ready</span>
                            </div>
                          </div>
                        )}

                        {selectedAdVariation === 'tiktok' && (
                          <div className="space-y-1.5 text-white/90">
                            <div className="flex items-center justify-between text-[8px] text-amber-300 font-mono">
                              <span>Short-Form Video Hook</span>
                              <span>Viral Hook</span>
                            </div>
                            <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/10">
                              <img
                                src={adImageSrc}
                                alt="Visual concept"
                                className="w-10 h-10 rounded-md object-cover border border-white/10 shrink-0"
                              />
                              <p className="leading-snug italic text-white/95 text-[8.5px] flex-1">
                                "POV: You found wireless headphones that actually last 35 hours in Zambia 🎧⚡ K1,450 flat with warranty. Comment 'LINK' for instant reservation!"
                              </p>
                            </div>
                            <div className="text-[7.5px] text-white/60 font-mono">
                              Call to action: Directs comments to WhatsApp DM checkout.
                            </div>
                          </div>
                        )}

                        {selectedAdVariation === 'catalog' && (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[8px] text-emerald-400 font-mono">
                              <span>Digital Catalog Showcase Card</span>
                              <span>Synced 18 Units</span>
                            </div>
                            <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/10">
                              <img
                                src={adImageSrc}
                                alt="Sony WH-CH720N"
                                className="w-10 h-10 rounded-md object-cover border border-[#D95A1A]/40 shrink-0 shadow-sm"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="font-bold text-white text-[9.5px] truncate">Sony WH-CH720N ANC</div>
                                <div className="text-emerald-400 font-mono font-bold text-[9px]">
                                  K1,450 <span className="text-white/40 line-through text-[8px]">K1,650</span>
                                </div>
                              </div>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[8px] font-mono">
                                In Stock
                              </span>
                            </div>
                            <div className="text-[7.5px] text-white/60 text-center font-mono">
                              Auto-synced with WhatsApp Business Catalog
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Approval & Cross-Posting Action Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsFlow1CrossPosted(true);
                          setStepIdx(2);
                        }}
                        className={`w-full py-1.5 rounded-lg font-syne font-bold text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
                          isFlow1CrossPosted || stepIdx >= 2
                            ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                            : 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:opacity-95 text-white active:scale-98'
                        }`}
                      >
                        {isFlow1CrossPosted || stepIdx >= 2 ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Approved & Cross-Posted to 4 Platforms!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Approve & Cross-Post to All Platforms</span>
                          </>
                        )}
                      </button>
                    </motion.div>

                    {/* Step 2 or Approved: Cross-Posting Live Sync */}
                    {(stepIdx >= 2 || isFlow1CrossPosted) && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2 rounded-xl bg-[#0F0A06] border border-emerald-500/30 text-[9.5px] space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-emerald-400 font-mono font-bold">
                          <span>3. Multi-Platform Cross-Posting Live:</span>
                          <span className="text-[8px] bg-emerald-500/20 px-1 py-0.5 rounded">Synced</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 font-mono text-[8.5px] text-white/80">
                          <div className="p-1 rounded bg-black/40 border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>WhatsApp Catalog: Live</span>
                          </div>
                          <div className="p-1 rounded bg-black/40 border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Facebook Shop: Live</span>
                          </div>
                          <div className="p-1 rounded bg-black/40 border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Instagram Feed: Live</span>
                          </div>
                          <div className="p-1 rounded bg-black/40 border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>TikTok Showcase: Live</span>
                          </div>
                        </div>
                        <p className="text-white/60 text-[8.5px] text-center">
                          All customer messages from these ads route back to Customer Support Worker.
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* ======================================================== */}
                {/* SCENARIO 2B: MARKETING AGENT - BUDGET APPROVAL & CROSS   */}
                {/* ======================================================== */}
                {activeTab === 'marketing' && marketingScenario === 'budget_approval_cross' && (
                  <div className="space-y-2.5">
                    {/* Approval Gate Dialog Header */}
                    <motion.div 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 rounded-xl bg-[#110A06] border border-[#2D1A10] text-[10px] space-y-1"
                    >
                      <div className="flex items-center justify-between text-amber-300 font-bold font-mono">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Owner Approval Gate Required</span>
                        </span>
                        <span className="text-[9px] text-white/50">Strict Control</span>
                      </div>
                      <p className="text-white/70 text-[9.5px]">
                        Zero ads or spend are initiated without your tap. You control campaign duration, cadence, and ad spend.
                      </p>
                    </motion.div>

                    {/* Predefined Run Time & Cadence Specs */}
                    <motion.div 
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-xl bg-[#170E08] border border-white/10 text-[10px] space-y-1.5"
                    >
                      <div className="grid grid-cols-2 gap-1 text-[9px] text-white/75 font-mono">
                        <div>Duration: <strong className="text-white">72 Hours</strong></div>
                        <div>Cadence: <strong className="text-white">2 Stories + 1 Feed/day</strong></div>
                      </div>

                      {/* Paid Ads Budget Cadence Toggle */}
                      <div className="pt-1 border-t border-white/10 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-white font-semibold">Include Paid Social Ads:</span>
                          <button
                            onClick={() => setIncludePaidAds(!includePaidAds)}
                            className={`px-2 py-0.5 rounded text-[9px] font-mono cursor-pointer transition-colors ${
                              includePaidAds ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/10 text-white/50'
                            }`}
                          >
                            {includePaidAds ? 'Enabled' : 'Organic Only'}
                          </button>
                        </div>

                        {includePaidAds && (
                          <div className="p-1.5 rounded bg-black/50 border border-[#D95A1A]/30 text-[9px] flex items-center justify-between">
                            <span className="text-white/80">Proposed Spend:</span>
                            <span className="font-mono text-amber-300 font-bold">K{allocatedBudget} (~$14) / 3 days</span>
                          </div>
                        )}
                      </div>

                      {/* Interactive Approval Action Button */}
                      <button
                        onClick={() => {
                          setIsBudgetApproved(true);
                          setStepIdx(2);
                        }}
                        className={`w-full mt-1.5 py-1.5 rounded-lg font-syne font-bold text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
                          isBudgetApproved
                            ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                            : 'bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:opacity-95 text-white active:scale-98'
                        }`}
                      >
                        {isBudgetApproved ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Approved & Active!</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve K{allocatedBudget} Budget & Launch</span>
                          </>
                        )}
                      </button>
                    </motion.div>

                    {/* Step 2 or Approved: Cross-Posting Live Deployment */}
                    {(stepIdx >= 2 || isBudgetApproved) && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2 rounded-xl bg-[#0F0A06] border border-emerald-500/30 text-[9.5px] space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-emerald-400 font-mono font-bold">
                          <span>Cross-Posting Live:</span>
                          <span>Auto Synced</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 font-mono text-[9px] text-white/80">
                          <div className="p-1 rounded bg-black/40 border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>WhatsApp: Live</span>
                          </div>
                          <div className="p-1 rounded bg-black/40 border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Facebook: Live</span>
                          </div>
                          <div className="p-1 rounded bg-black/40 border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Instagram: Live</span>
                          </div>
                          <div className="p-1 rounded bg-black/40 border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>TikTok: Queued</span>
                          </div>
                        </div>
                        <p className="text-white/60 text-[8.5px] text-center">
                          All inquiries routed back to Customer Support Worker seamlessly.
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}

              </div>

              {/* Phone Interactive Step Scrubber / Controller on Bottom of phone */}
              <div className="relative z-30 pt-1 pb-0.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/60">
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={toggleAutoPlay}
                    className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                    title={isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
                  >
                    {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                  </button>
                  <span>Step {stepIdx + 1}/3</span>
                </div>

                {/* Step Dots */}
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStepIdx(s)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        stepIdx === s ? 'w-4 bg-[#D95A1A]' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setStepIdx((prev) => (prev + 1) % 3)}
                  className="px-2 py-0.5 rounded bg-[#1F120B] hover:bg-[#2F1A0E] text-white/90 text-[9px] cursor-pointer flex items-center gap-0.5"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Phone Home Bar */}
              <div className="w-24 h-0.5 bg-white/30 rounded-full mx-auto mt-1" />

            </div>

            {/* Mobile Reassurance Under Phone */}
            <p className="mt-2.5 text-[10.5px] text-[#A8A099] font-syne text-center flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive preview · Tap any step or switch flows above</span>
            </p>

          </div>

        </div>

      </section>
  );
};
