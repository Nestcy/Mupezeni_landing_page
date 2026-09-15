import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Smartphone,
  ShieldCheck,
  Zap,
  TrendingUp,
  Package,
  Layers,
  ShoppingBag,
  Clock,
  Send,
  Eye,
  Video,
  Image as ImageIcon,
  Share2,
  Facebook,
  Instagram,
  Truck,
  BarChart3,
  Store,
  Bot
} from 'lucide-react';
import { soundFx } from './audioFx';

interface SimulatedVideoDemoProps {
  onNavigateToContact?: () => void;
  className?: string;
  autoPlay?: boolean;
}

export const SimulatedVideoDemo: React.FC<SimulatedVideoDemoProps> = ({
  onNavigateToContact,
  className = '',
  autoPlay = true
}) => {
  // Video playback state (43 seconds default walkthrough, or dynamic for native MP4)
  const TOTAL_DURATION_MS = 43000;
  const [videoDurationMs, setVideoDurationMs] = useState<number>(43000);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);

  // Embedded video source - defaults directly to the uploaded /demo.mp4
  const [embeddedVideoSrc, setEmbeddedVideoSrc] = useState<string | null>('/demo.mp4');

  const nativeVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Fallback check: verify /demo.mp4 is available
  useEffect(() => {
    let isCancelled = false;
    const verifyVideo = async () => {
      try {
        const res = await fetch('/demo.mp4', { method: 'HEAD' });
        if (res.ok && !isCancelled) {
          setEmbeddedVideoSrc('/demo.mp4');
        } else if (!isCancelled) {
          // Fall back to built-in pixel-perfect simulation if file is not found
          setEmbeddedVideoSrc(null);
        }
      } catch (err) {
        // Fallback to built-in simulation
        if (!isCancelled) setEmbeddedVideoSrc(null);
      }
    };
    verifyVideo();
    return () => {
      isCancelled = true;
    };
  }, []);

  // IntersectionObserver: Play when in view, pause when scrolled past it
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check initial visibility right away
    const rect = el.getBoundingClientRect();
    const isVisibleInitially = rect.top < window.innerHeight && rect.bottom > 0;
    setIsPlaying(isVisibleInitially);
    setIsInViewport(isVisibleInitially);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
            setIsPlaying(true);
          } else {
            setIsInViewport(false);
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 5 Chapters matching the exact 43-second video:
  // 1. Onboarding on Mupezeni Website (0s - 8s)
  // 2. 24/7 AI Customer Support & Instant MoMo (8s - 17s)
  // 3. Creative Social Studio: TikTok, Reels & FB (17s - 26s)
  // 4. Operations Dashboard & Route Manifest (26s - 35s)
  // 5. Mupezeni Outro & Deploy AI Team (35s - 43s)
  const chapters = [
    { startMs: 0, title: '01. Website Onboarding' },
    { startMs: 8000, title: '02. 24/7 WhatsApp & MoMo' },
    { startMs: 17000, title: '03. Creative Social Studio' },
    { startMs: 26000, title: '04. Operations Dashboard' },
    { startMs: 35000, title: '05. Deploy AI Team' }
  ];

  const currentChapter = chapters.reduce((prev, curr) => 
    elapsedMs >= curr.startMs ? curr : prev
  , chapters[0]);

  // Audio mute toggle
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
    if (nativeVideoRef.current) {
      nativeVideoRef.current.muted = next;
    }
  };

  // Synchronize native video element if present
  useEffect(() => {
    const vid = nativeVideoRef.current;
    if (!vid) return;

    if (isPlaying) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isPlaying, embeddedVideoSrc]);

  // Playback loop (runs at ~40ms for silky playback when in viewport)
  useEffect(() => {
    if (embeddedVideoSrc) return; // native video handles its own time updates
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setElapsedMs(prev => {
        const next = prev + 40;
        // When video reaches end, seamlessly loop back to start
        if (next >= TOTAL_DURATION_MS) {
          return 0;
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isPlaying, embeddedVideoSrc]);

  // Native video time updater with auto-loop
  const handleNativeTimeUpdate = () => {
    if (nativeVideoRef.current) {
      setElapsedMs(Math.floor(nativeVideoRef.current.currentTime * 1000));
    }
  };

  // Sound Milestones triggered at key moments (only if unmuted)
  const playedMilestonesRef = useRef<{ [key: string]: boolean }>({});
  useEffect(() => {
    if (elapsedMs < 100) {
      playedMilestonesRef.current = {};
    }

    if (!isPlaying || isMuted) return;

    // Milestone 1: Cursor clicks "Get Your AI Growth Team" at ~4.5s
    if (elapsedMs >= 4500 && !playedMilestonesRef.current['hero_click']) {
      playedMilestonesRef.current['hero_click'] = true;
      soundFx.playClick();
    }

    // Milestone 2: Cursor clicks "Deploy 3 AI Agents" in consultation wizard at ~7.8s
    if (elapsedMs >= 7800 && !playedMilestonesRef.current['deploy_click']) {
      playedMilestonesRef.current['deploy_click'] = true;
      soundFx.playPulse();
    }

    // Milestone 3: Support chat incoming message at ~9.5s
    if (elapsedMs >= 9500 && !playedMilestonesRef.current['msg_in']) {
      playedMilestonesRef.current['msg_in'] = true;
      soundFx.playClick();
    }

    // Milestone 4: MoMo payment approved chime at ~15.5s
    if (elapsedMs >= 15500 && !playedMilestonesRef.current['momo_paid']) {
      playedMilestonesRef.current['momo_paid'] = true;
      soundFx.playChime();
    }

    // Milestone 5: Marketing social campaign auto-deployed at ~23.0s
    if (elapsedMs >= 23000 && !playedMilestonesRef.current['social_deploy']) {
      playedMilestonesRef.current['social_deploy'] = true;
      soundFx.playPulse();
    }

    // Milestone 6: Ops Dashboard revenue counter shimmer at ~27.0s
    if (elapsedMs >= 27000 && !playedMilestonesRef.current['ops_shimmer']) {
      playedMilestonesRef.current['ops_shimmer'] = true;
      soundFx.playShimmer();
    }

    // Milestone 7: Outro fiery supernova burst at ~36.0s
    if (elapsedMs >= 36000 && !playedMilestonesRef.current['outro_burst']) {
      playedMilestonesRef.current['outro_burst'] = true;
      soundFx.playChime();
    }
  }, [elapsedMs, isPlaying, isMuted]);

  // Auto-hide controls when playing
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const activeDuration = embeddedVideoSrc ? videoDurationMs : TOTAL_DURATION_MS;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetMs = Math.floor(ratio * activeDuration);
    setElapsedMs(targetMs);
    if (nativeVideoRef.current) {
      nativeVideoRef.current.currentTime = targetMs / 1000;
    }
    soundFx.playClick();
  };

  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = Math.min(100, (elapsedMs / (activeDuration || 1)) * 100);

  // Scene Identification (exact matches to 43s video):
  const isAct1 = elapsedMs < 8000;
  const isAct2 = elapsedMs >= 8000 && elapsedMs < 17000;
  const isAct3 = elapsedMs >= 17000 && elapsedMs < 26000;
  const isAct4 = elapsedMs >= 26000 && elapsedMs < 35000;
  const isAct5 = elapsedMs >= 35000;

  // Act 1 sub-states:
  // 0 - 5.5s: Hero landing page
  // 5.5s - 8s: Consultation / Onboarding Wizard Open
  const isAct1WizardOpen = elapsedMs >= 5500;
  const isAct1WizardSubmitted = elapsedMs >= 7600;

  // Simulated Mouse Cursor 1 (Hero click: 1s to 5.5s)
  const showCursorHero = elapsedMs >= 800 && elapsedMs <= 5500;
  const cursorHeroProgress = Math.min(1, Math.max(0, (elapsedMs - 800) / 3800));
  const cursorHeroX = 80 - (80 - 45) * Math.sin((cursorHeroProgress * Math.PI) / 2);
  const cursorHeroY = 78 - (78 - 62) * Math.sin((cursorHeroProgress * Math.PI) / 2);
  const isHeroClicking = elapsedMs >= 4400 && elapsedMs <= 5200;

  // Simulated Mouse Cursor 2 (Onboarding submit button click: 5.6s to 7.8s)
  const showCursorWizard = elapsedMs >= 5600 && elapsedMs <= 7900;
  const cursorWizardProgress = Math.min(1, Math.max(0, (elapsedMs - 5600) / 1800));
  const cursorWizardX = 40 + (50 - 40) * Math.sin((cursorWizardProgress * Math.PI) / 2);
  const cursorWizardY = 50 + (68 - 50) * Math.sin((cursorWizardProgress * Math.PI) / 2);
  const isWizardClicking = elapsedMs >= 7400 && elapsedMs <= 7800;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full aspect-video rounded-xl sm:rounded-3xl bg-[#060302] border border-[#9B2208]/50 sm:border-2 sm:border-[#9B2208]/60 shadow-[0_0_40px_rgba(155,34,8,0.25)] overflow-hidden group select-none ${className}`}
    >
      {/* Ambient studio backdrop glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#9B2208]/20 via-transparent to-[#D95A1A]/15 pointer-events-none -z-10" />

      {/* ========================================================= */}
      {/* EMBEDDED NATIVE VIDEO PLAYER (If MP4 source is available)  */}
      {/* ========================================================= */}
      {embeddedVideoSrc ? (
        <video
          ref={nativeVideoRef}
          src={embeddedVideoSrc}
          className="w-full h-full object-contain sm:object-cover bg-black"
          playsInline
          loop
          muted={isMuted}
          onLoadedMetadata={() => {
            if (nativeVideoRef.current && !isNaN(nativeVideoRef.current.duration) && nativeVideoRef.current.duration > 0) {
              setVideoDurationMs(Math.floor(nativeVideoRef.current.duration * 1000));
            }
          }}
          onTimeUpdate={handleNativeTimeUpdate}
        />
      ) : (
        /* ========================================================= */
        /* PIXEL-PERFECT 43S EMBEDDED DEMO (Zero Upload Required)    */
        /* ========================================================= */
        <div className={`relative w-full h-full p-2.5 sm:p-5 flex flex-col transition-transform duration-700 ease-out origin-center ${
          isAct2 ? 'scale-[1.01]' : isAct3 ? 'scale-[1.01]' : isAct5 ? 'scale-100' : 'scale-100'
        }`}>

          {/* 1. Simulated Browser Address Bar */}
          <div className="w-full flex items-center justify-between pb-2 sm:pb-3 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-sm" />
              </div>
              <div className="hidden sm:flex items-center gap-1.5 ml-2 px-3 py-1 rounded-md bg-[#130B07] border border-white/10 text-[11px] font-mono text-white/70">
                <span className="text-emerald-400">https://</span>
                <span>
                  {isAct1 && !isAct1WizardOpen && 'mupezeni.com'}
                  {isAct1 && isAct1WizardOpen && 'mupezeni.com/consultation?store=kabulonga-luxe'}
                  {isAct2 && 'web.whatsapp.com/chat/natasha-m'}
                  {isAct3 && 'mupezeni.com/creative-studio'}
                  {isAct4 && 'mupezeni.com/operations-hub'}
                  {isAct5 && 'mupezeni.com/deploy'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Live Viewport Auto-Play Indicator */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#120A06] border border-white/10 text-[10px] font-mono text-white/70">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span>{isPlaying ? 'Auto-Playing in View' : 'Paused (Off Screen)'}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#9B2208]/30 border border-[#9B2208]/50 text-[#D95A1A] text-[10px] font-mono font-bold hidden sm:inline">
                4K 60fps
              </span>
            </div>
          </div>

          {/* 2. MAIN VIEWPORT (5 ACTS) */}
          <div className="relative flex-1 w-full mt-2.5 sm:mt-3.5 rounded-xl sm:rounded-2xl bg-[#0C0704] border border-white/10 p-3 sm:p-5 overflow-hidden flex flex-col justify-between shadow-2xl">

            {/* ======================================================== */}
            {/* ACT 1: LANDING ON MUPEZENI & DEPLOY 3 AI AGENTS (0-8s)   */}
            {/* ======================================================== */}
            {isAct1 && (
              <div className="w-full h-full flex flex-col justify-between animate-fadeIn relative">
                
                {/* 1A: Before Wizard Open: Actual Mupezeni Website Hero */}
                {!isAct1WizardOpen && (
                  <div className="w-full h-full flex flex-col justify-between py-1">
                    
                    {/* Top navbar on site */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#9B2208] to-[#D95A1A] flex items-center justify-center font-black text-white text-xs">
                          M
                        </div>
                        <span className="font-syne font-black text-white text-sm">MUPEZENI · AI FOR RETAIL</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-3 text-[11px] font-syne text-white/70">
                        <span>Solutions</span>
                        <span>Pricing</span>
                        <span>How It Works</span>
                      </div>
                      <div className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-syne font-bold">
                        ● ACCEPTING LUSAKA COMPANY RETAILERS
                      </div>
                    </div>

                    {/* Hero copy */}
                    <div className="text-center space-y-2.5 max-w-2xl mx-auto my-auto">
                      <h2 className="text-xl sm:text-3xl md:text-4xl font-black font-syne text-white tracking-tight leading-tight">
                        Grow your retail business{' '}
                        <span className="text-gradient-fire">while you sleep.</span>
                      </h2>

                      <p className="text-xs sm:text-sm text-white/75 font-syne max-w-lg mx-auto">
                        Mupezeni gives you an AI Team that serves customers, markets your business, and tracks your operations around the clock.
                      </p>

                      {/* Hero CTA Button that cursor clicks */}
                      <div className="pt-2 flex items-center justify-center">
                        <button 
                          className={`px-6 py-2.5 rounded-xl font-syne font-black text-xs sm:text-sm text-white shadow-xl transition-all duration-200 flex items-center gap-2 ${
                            isHeroClicking 
                              ? 'scale-95 bg-[#D95A1A] ring-4 ring-[#D95A1A]/40' 
                              : 'bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A]'
                          }`}
                        >
                          <span>Get Your AI Growth Team</span>
                          <ArrowRight className="w-4 h-4" />
                          {isHeroClicking && (
                            <span className="absolute inset-0 rounded-xl bg-white/40 animate-ping pointer-events-none" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-center text-[10px] text-white/50 font-syne">
                      Real-time AI, working across every channel your customers already use
                    </div>

                  </div>
                )}

                {/* 1B: Wizard Open: Merchant Consultation & Agent Setup */}
                {isAct1WizardOpen && (
                  <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 rounded-xl bg-[#120B07] border border-[#9B2208]/60 shadow-2xl animate-fadeIn my-auto max-w-2xl mx-auto">
                    
                    <div className="text-center space-y-1 pb-2 border-b border-white/10">
                      <h4 className="font-syne font-black text-white text-sm sm:text-base">
                        Merchant Consultation & Agent Setup:
                      </h4>
                      <p className="text-xs text-[#D95A1A] font-syne font-bold">
                        Kabulonga Luxe Apparel
                      </p>
                    </div>

                    {/* 3 Green Checkmark Steps */}
                    <div className="space-y-2.5 my-auto max-w-md mx-auto w-full">
                      
                      <div className="p-2.5 rounded-lg bg-[#180E09] border border-white/10 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-white font-syne">Store Profile Verified</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#180E09] border border-white/10 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-white font-syne">WhatsApp & Social Accounts Linked</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#180E09] border border-white/10 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-white font-syne">248 Catalog SKUs Synced</span>
                      </div>

                    </div>

                    {/* Deploy 3 AI Agents button */}
                    <div className="pt-2 flex justify-center">
                      <button
                        className={`px-8 py-3 rounded-xl font-syne font-black text-xs sm:text-sm text-white transition-all duration-200 flex items-center gap-2 ${
                          isWizardClicking
                            ? 'scale-95 bg-[#D95A1A]'
                            : isAct1WizardSubmitted
                            ? 'bg-emerald-600'
                            : 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A]'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Deploy 3 AI Agents</span>
                        {isWizardClicking && (
                          <span className="absolute inset-0 rounded-xl bg-white/40 animate-ping pointer-events-none" />
                        )}
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* ======================================================== */}
            {/* ACT 2: AI SUPPORT AGENT & WHATSAPP MOMO PAYMENT (8-17s)   */}
            {/* ======================================================== */}
            {isAct2 && (
              <div className="w-full h-full flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                
                {/* Left: AI Support Terminal & Catalog Lookup */}
                <div className="w-full sm:w-1/2 space-y-2 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-syne font-bold text-white">
                      <div className="w-5 h-5 rounded bg-[#9B2208] flex items-center justify-center text-white text-[10px]">
                        M
                      </div>
                      <span>AI Support Agent · Mupezeni AI FOR RETAIL</span>
                    </div>
                  </div>

                  {/* Product Catalog Card SKU-482 */}
                  <div className="p-3 rounded-xl bg-[#150D08] border border-[#9B2208]/50 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-syne">
                      <span className="text-white font-bold">Product Catalog (248 Items)</span>
                      <span className="text-emerald-400 font-mono">LIVE QUERY</span>
                    </div>

                    <div className="p-2 rounded-lg bg-[#1F120A] border border-white/5 flex items-center gap-3">
                      <div className="w-12 h-14 rounded bg-[#331B0E] border border-white/10 flex items-center justify-center text-[#D95A1A] font-bold text-xs">
                        👗
                      </div>
                      <div className="space-y-0.5 text-[10px] font-mono">
                        <div className="text-white font-bold">SKU-482 · Champagne Linen Set</div>
                        <div className="text-emerald-400">Size M (4 in stock) · Price: K850</div>
                        <div className="text-white/60">Delivery Zone: Woodlands (+K40)</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-[#140C07] border border-white/10 font-mono text-[10px] text-emerald-400">
                    &gt; AI Auto-Reply dispatched in 1.1s · MoMo prompt requested
                  </div>
                </div>

                {/* Right: Simulated WhatsApp iPhone Chat */}
                <div className="w-full sm:w-[290px] rounded-2xl bg-[#111B21] border border-white/10 shadow-2xl overflow-hidden flex flex-col text-xs font-sans">
                  
                  {/* WhatsApp Top Bar */}
                  <div className="px-3 py-2 bg-[#202C33] border-b border-white/5 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#9B2208] flex items-center justify-center font-bold text-[10px]">
                        KL
                      </div>
                      <div>
                        <div className="font-bold text-[11px] leading-none">Kabulonga Luxe (AI Verified)</div>
                        <div className="text-[9px] text-emerald-400 font-mono">online</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40">11:47 PM</span>
                  </div>

                  {/* Chat messages */}
                  <div className="p-2.5 space-y-2 bg-[#0B141A] min-h-[200px] flex flex-col justify-end text-[11px]">
                    
                    {/* Customer query */}
                    <div className="self-start max-w-[85%] p-2 rounded-lg bg-[#202C33] text-white/90 rounded-tl-sm shadow">
                      <p>Hi! Do you have the Champagne Gold Linen Two-Piece in Size M? Can it be delivered to Woodlands tomorrow morning?</p>
                      <span className="text-[8px] text-white/40 float-right mt-1">11:47 PM</span>
                    </div>

                    {/* AI reply */}
                    <div className="self-end max-w-[90%] p-2 rounded-lg bg-[#005C4B] text-white rounded-tr-sm shadow">
                      <p>Hi Natasha! ✨ Yes, 4 sets available in Size M (K850). Delivery to Woodlands is K40 before 11 AM (Total: K890).</p>
                      <span className="text-[8px] text-white/60 float-right mt-1">11:47 PM · ⚡ 1.1s</span>
                    </div>

                    {/* MoMo payment approved alert */}
                    <div className="p-2 rounded-lg bg-[#182229] border border-emerald-500/50 text-emerald-300 text-[10px] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Order #8921 Locked</span>
                        </span>
                        <span className="font-mono">K890.00</span>
                      </div>
                      <div className="text-white/70 text-[9px]">
                        MTN MoMo / Airtel Money: Approved · PIN Verified
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* ======================================================== */}
            {/* ACT 3: CREATIVE MARKETING STUDIO & CROSS-POST (17-26s)   */}
            {/* ======================================================== */}
            {isAct3 && (
              <div className="w-full h-full flex flex-col justify-between animate-fadeIn space-y-2.5">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D95A1A]" />
                    <h4 className="font-syne font-bold text-white text-xs sm:text-sm">
                      Mupezeni Creative Marketing Studio
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    ● AUTONOMOUS SYNTHESIS
                  </span>
                </div>

                {/* 3-Column Studio: Ingest -> Create -> Cross-Post */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 flex-1 items-center">
                  
                  {/* Col 1: Catalog Asset Ingested */}
                  <div className="p-2.5 rounded-xl bg-[#140C07] border border-white/10 space-y-2 h-full flex flex-col justify-between">
                    <div className="text-xs font-bold text-white font-syne">Catalog Asset Ingested</div>
                    <div className="p-2 rounded-lg bg-[#1F120A] space-y-1 text-[10px]">
                      <div className="text-[#D95A1A] font-bold">Champagne Gold Linen Set</div>
                      <div className="text-emerald-400 font-mono">Price: K850.00</div>
                      <div className="text-white/60 italic">"High-velocity weekend drop..."</div>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono">✓ High-res photos extracted</div>
                  </div>

                  {/* Col 2: TikTok/Reels Video Ad */}
                  <div className="p-2.5 rounded-xl bg-[#180E09] border border-[#9B2208]/60 space-y-2 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-bold text-white font-syne">
                      <span>Weekend Luxury Drop</span>
                      <span className="text-[10px] text-pink-400 font-mono">9:16 Video</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#24130B] to-[#381B0E] text-[10px] space-y-1 border border-[#9B2208]/40">
                      <div className="text-white font-bold flex items-center justify-between">
                        <span>Limited Lusaka Stock</span>
                        <span className="text-amber-400">K850</span>
                      </div>
                      <div className="text-white/70">Tap WhatsApp to Order</div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#D95A1A] w-2/3 animate-pulse" />
                      </div>
                    </div>
                    <div className="text-[10px] text-amber-300 font-mono">✓ Upbeat soundtrack attached</div>
                  </div>

                  {/* Col 3: Cross-Posting Checkmarks */}
                  <div className="p-2.5 rounded-xl bg-[#140C07] border border-white/10 space-y-1.5 h-full flex flex-col justify-between">
                    <div className="text-xs font-bold text-white font-syne">Cross-posting Live</div>
                    
                    <div className="space-y-1 text-[10px]">
                      <div className="flex items-center justify-between p-1.5 rounded bg-[#1A0F0A]">
                        <span className="flex items-center gap-1.5 text-blue-400">
                          <Facebook className="w-3.5 h-3.5" />
                          <span className="text-white">Facebook Page</span>
                        </span>
                        <span className="text-emerald-400 font-mono">Published Live</span>
                      </div>

                      <div className="flex items-center justify-between p-1.5 rounded bg-[#1A0F0A]">
                        <span className="flex items-center gap-1.5 text-pink-400">
                          <Instagram className="w-3.5 h-3.5" />
                          <span className="text-white">TikTok (#LusakaFashion)</span>
                        </span>
                        <span className="text-emerald-400 font-mono">Published Live</span>
                      </div>

                      <div className="flex items-center justify-between p-1.5 rounded bg-[#1A0F0A]">
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <Smartphone className="w-3.5 h-3.5" />
                          <span className="text-white">Instagram Feed & Story</span>
                        </span>
                        <span className="text-emerald-400 font-mono">Published Live</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-emerald-400 font-mono font-bold">
                      🔥 Live Views: 1,868 · 24 Inquiries
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ======================================================== */}
            {/* ACT 4: OPERATIONS & LOGISTICS HUB (26-35s)                */}
            {/* ======================================================== */}
            {isAct4 && (
              <div className="w-full h-full flex flex-col justify-between animate-fadeIn space-y-2">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#D95A1A]" />
                    <div>
                      <h4 className="font-syne font-black text-white text-xs sm:text-sm">
                        Mupezeni Operations & Logistics Hub
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-white/50">07:30 AM</span>
                  </div>
                </div>

                {/* Big Overnight Revenue Banner */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#170E08] via-[#21120B] to-[#170E08] border border-emerald-500/40 text-center space-y-0.5">
                  <div className="text-lg sm:text-3xl font-black font-syne text-emerald-400 animate-pulse">
                    K18,450.00 ZMW
                  </div>
                  <div className="text-[10px] text-white/60 font-syne">
                    (Generated While You Slept)
                  </div>
                </div>

                {/* Metrics + Rider Manifest */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-[#140C07] border border-white/10">
                    <div className="text-base sm:text-xl font-bold font-syne text-white">21</div>
                    <div className="text-[9px] text-emerald-400 font-mono">Orders Completed (100% MoMo)</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#140C07] border border-white/10">
                    <div className="text-base sm:text-xl font-bold font-syne text-white">43</div>
                    <div className="text-[9px] text-white/60 font-mono">Customer Inquiries (Avg 1.2s)</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 p-2 rounded-lg bg-[#140C07] border border-white/10">
                    <div className="text-base sm:text-xl font-bold font-syne text-amber-400">14.8x</div>
                    <div className="text-[9px] text-white/60 font-mono">Marketing ROI (ROAS)</div>
                  </div>
                </div>

                {/* Logistics route slips */}
                <div className="p-2 rounded-lg bg-[#120B07] border border-[#9B2208]/40 flex items-center justify-between text-[10px] font-mono">
                  <div className="text-white/80">
                    <span className="text-[#D95A1A] font-bold">Lusaka Dispatch: </span>
                    <span>Rider Alex (14 Woodlands & Kabulonga) · Rider Kelvin (7 Rhodes Park)</span>
                  </div>
                  <span className="text-emerald-400 font-bold hidden sm:inline">Zero manual intervention.</span>
                </div>

              </div>
            )}

            {/* ======================================================== */}
            {/* ACT 5: BRAND OUTRO & DEPLOY CALL TO ACTION (35-43s)       */}
            {/* ======================================================== */}
            {isAct5 && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center animate-fadeIn space-y-3 my-auto">
                
                {/* Flaming bird icon symbol */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#9B2208] via-[#D95A1A] to-amber-400 flex items-center justify-center text-white shadow-2xl shadow-[#D95A1A]/40 animate-pulse">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-[#D95A1A]/30 blur-xl -z-10" />
                </div>

                {/* Brand title */}
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-4xl font-black font-syne text-white tracking-wide">
                    MUPEZENI
                  </h3>
                  <p className="text-xs sm:text-sm font-syne text-[#D95A1A] font-bold">
                    The AI Business Growth Company for Retail
                  </p>
                </div>

                <div className="text-[11px] sm:text-xs text-white/70 font-syne space-x-2">
                  <span>Fixed K5,000 / month</span>
                  <span>·</span>
                  <span>Zero Revenue Cuts</span>
                  <span>·</span>
                  <span>Dedicated to Zambian Retail</span>
                </div>

                {/* Final CTA Button */}
                {onNavigateToContact && (
                  <button
                    onClick={onNavigateToContact}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] font-syne font-black text-xs sm:text-sm text-white hover:scale-105 shadow-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Deploy Your AI Team Today · mupezeni.com</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

              </div>
            )}

          </div>

          {/* 3. SIMULATED MOUSE CURSOR */}
          {showCursorHero && (
            <div 
              className="absolute pointer-events-none transition-all duration-75 z-40"
              style={{ 
                left: `${cursorHeroX}%`, 
                top: `${cursorHeroY}%`,
                transform: 'translate(-20%, -20%)'
              }}
            >
              <svg 
                className={`w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xl transition-transform duration-100 ${
                  isHeroClicking ? 'scale-90 rotate-[-5deg]' : 'scale-100'
                }`} 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z" 
                  fill="#FFFFFF" 
                  stroke="#000000" 
                  strokeWidth="1.5" 
                  strokeLinejoin="round"
                />
              </svg>
              {isHeroClicking && (
                <span className="absolute -top-1 -left-1 w-8 h-8 rounded-full border-2 border-white/80 animate-ping pointer-events-none" />
              )}
            </div>
          )}

          {showCursorWizard && (
            <div 
              className="absolute pointer-events-none transition-all duration-75 z-40"
              style={{ 
                left: `${cursorWizardX}%`, 
                top: `${cursorWizardY}%`,
                transform: 'translate(-20%, -20%)'
              }}
            >
              <svg 
                className={`w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xl transition-transform duration-100 ${
                  isWizardClicking ? 'scale-90 rotate-[-5deg]' : 'scale-100'
                }`} 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z" 
                  fill="#FFFFFF" 
                  stroke="#000000" 
                  strokeWidth="1.5" 
                  strokeLinejoin="round"
                />
              </svg>
              {isWizardClicking && (
                <span className="absolute -top-1 -left-1 w-8 h-8 rounded-full border-2 border-white/80 animate-ping pointer-events-none" />
              )}
            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* VIDEO PLAYER CHROME & TIMELINE SCRUBBER                   */}
      {/* ========================================================= */}
      <div className={`absolute inset-0 pointer-events-none flex flex-col justify-between transition-opacity duration-300 ${
        showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
      }`}>
        
        {/* Top Video Header HUD */}
        <div className="p-2 sm:p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="font-syne font-bold text-white text-[10px] sm:text-sm tracking-wide truncate max-w-[200px] sm:max-w-md">
              Mupezeni AI Workforce · Product Walkthrough
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[9px] sm:text-[10px] font-mono text-white/90">
              4K 60fps · Omni Video
            </span>
          </div>
        </div>

        {/* Bottom Video Transport & Timeline Bar */}
        <div className="p-2 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent pointer-events-auto space-y-1.5 sm:space-y-2">
          
          {/* Chapter Markers & Current Title */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-syne text-white/70">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[#D95A1A] font-bold">Walkthrough:</span>
              <span className="text-white font-bold truncate max-w-[140px] sm:max-w-xs">
                {currentChapter.title}
              </span>
            </div>
            <div className="font-mono text-[9px] sm:text-[11px] text-white/60">
              {formatTime(elapsedMs)} / {formatTime(activeDuration)}
            </div>
          </div>

          {/* Interactive Timeline Scrubber */}
          <div 
            onClick={handleSeek}
            className="group/scrubber relative w-full h-1.5 sm:h-2 bg-white/20 hover:h-2 sm:hover:h-3 rounded-full cursor-pointer transition-all duration-150 flex items-center"
          >
            {/* Progress Fill */}
            <div 
              className="h-full bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-white rounded-full shadow-lg scale-0 group-hover/scrubber:scale-100 transition-transform" />
            </div>

            {/* Chapter Milestone Dots */}
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                className="absolute top-0 bottom-0 w-0.5 bg-white/40 pointer-events-none"
                style={{ left: `${(ch.startMs / (activeDuration || 1)) * 100}%` }}
                title={ch.title}
              />
            ))}
          </div>

          {/* Control Bar Actions (No Rewind Button, No Fullscreen Button, Auto-play on Viewport) */}
          <div className="flex items-center justify-between pt-0.5 sm:pt-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  if (elapsedMs >= activeDuration) setElapsedMs(0);
                  setIsPlaying(!isPlaying);
                  soundFx.playClick();
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px] sm:text-xs"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />}
                <span className="text-[9px] sm:text-[10px] hidden xs:inline">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={toggleMute}
                className="text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px] sm:text-xs"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-pulse" />}
                <span className="text-[9px] sm:text-[10px] hidden xs:inline">{isMuted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {onNavigateToContact && (
                <button
                  onClick={onNavigateToContact}
                  className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-gradient-to-r from-[#9B2208] to-[#D95A1A] font-syne font-bold text-[10px] sm:text-xs text-white hover:opacity-95 shadow transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Get AI Team</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
