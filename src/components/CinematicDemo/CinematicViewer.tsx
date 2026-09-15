import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Headphones, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Clock, 
  ShoppingBag, 
  ArrowRight,
  Terminal,
  Send,
  MessageSquare,
  Flame,
  Check,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { CINEMATIC_INDUSTRIES, IndustryScenario, CinematicScene, CinematicSceneStep } from './cinematicData';
import { soundFx } from './audioFx';

interface CinematicViewerProps {
  initialIndustryId?: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onNavigateToContact?: () => void;
}

export const CinematicViewer: React.FC<CinematicViewerProps> = ({
  initialIndustryId = 'fashion',
  isFullscreen = false,
  onToggleFullscreen,
  onNavigateToContact
}) => {
  // Industry & Scene selection
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(initialIndustryId);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Playback progress (in milliseconds elapsed in current scene)
  const [sceneElapsedMs, setSceneElapsedMs] = useState<number>(0);

  // Interactive Sandbox Mode Toggle
  const [isSandboxMode, setIsSandboxMode] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [sandboxLog, setSandboxLog] = useState<Array<{ role: 'user' | 'agent' | 'tool'; content: string; time: string }>>([
    { role: 'user', content: 'Do you have the Italian Linen Set in Champagne Gold size Medium?', time: '11:47 PM' },
    { role: 'tool', content: 'store.inventory.query({ sku: "LIN-GLD-M" }) => In Stock (4 remaining, K850)', time: '11:47 PM' },
    { role: 'agent', content: 'Yes! We have 4 units left of the Champagne Gold Linen Set in Size M (K850). Delivery to Woodlands is K40 tomorrow morning. Would you like me to send the MoMo prompt?', time: '11:47 PM' }
  ]);
  const [isSandboxThinking, setIsSandboxThinking] = useState<boolean>(false);

  const activeIndustry = CINEMATIC_INDUSTRIES.find(i => i.id === selectedIndustryId) || CINEMATIC_INDUSTRIES[0];
  const activeScene = activeIndustry.scenes[currentSceneIndex] || activeIndustry.scenes[0];
  const sceneDurationMs = (activeScene?.durationSeconds || 12) * 1000;

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Sound Mute Synchronization
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundFx.setMuted(nextMute);
  };

  // Playback timer tick
  useEffect(() => {
    if (!isPlaying || isSandboxMode) return;

    const interval = setInterval(() => {
      setSceneElapsedMs(prev => {
        const next = prev + 50 * playbackSpeed;
        if (next >= sceneDurationMs) {
          // Advance to next scene or loop
          setCurrentSceneIndex(currIdx => {
            const nextIdx = (currIdx + 1) % activeIndustry.scenes.length;
            return nextIdx;
          });
          soundFx.playChime();
          return 0;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, sceneDurationMs, isSandboxMode, activeIndustry.scenes.length]);

  // Reset scene elapsed on manual scene switch
  const handleSceneSelect = (index: number) => {
    setCurrentSceneIndex(index);
    setSceneElapsedMs(0);
    soundFx.playClick();
  };

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustryId(industryId);
    setCurrentSceneIndex(0);
    setSceneElapsedMs(0);
    soundFx.playClick();
  };

  const handleRestart = () => {
    setSceneElapsedMs(0);
    setIsPlaying(true);
    soundFx.playClick();
  };

  // Visible steps in the current scene based on timeline
  const visibleSteps = activeScene.steps.filter(step => step.timeOffsetMs <= sceneElapsedMs);

  // Auto-scroll chat to bottom as new steps appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleSteps.length, sceneElapsedMs]);

  // Sound trigger when new step appears
  const lastStepCountRef = useRef<number>(0);
  useEffect(() => {
    if (visibleSteps.length > lastStepCountRef.current && visibleSteps.length > 0) {
      const latest = visibleSteps[visibleSteps.length - 1];
      if (latest.actionType === 'order_complete') {
        soundFx.playChime();
      } else if (latest.actionType === 'visual_generate') {
        soundFx.playShimmer();
      } else if (latest.actionType === 'tool_call') {
        soundFx.playPulse();
      } else {
        soundFx.playClick();
      }
    }
    lastStepCountRef.current = visibleSteps.length;
  }, [visibleSteps.length]);

  // Handle Custom Sandbox interaction
  const handleSendSandboxPrompt = (promptText?: string) => {
    const textToSend = promptText || customPrompt;
    if (!textToSend.trim() || isSandboxThinking) return;

    soundFx.playClick();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setSandboxLog(prev => [...prev, { role: 'user', content: textToSend, time: nowTime }]);
    setCustomPrompt('');
    setIsSandboxThinking(true);

    setTimeout(() => {
      soundFx.playPulse();
      setSandboxLog(prev => [
        ...prev,
        {
          role: 'tool',
          content: `inventory.liveLookup({ query: "${textToSend.slice(0, 24)}" }) => Stock Verified in 0.4s. 3 units reserved. Delivery Lusaka Central available.`,
          time: nowTime
        }
      ]);
    }, 900);

    setTimeout(() => {
      soundFx.playChime();
      let responseText = `Hi! ⚡ Yes, we have this ready in stock at our ${activeIndustry.city} hub. We can arrange express delivery to your doorstep today. Would you like me to send the MoMo payment prompt?`;
      if (textToSend.toLowerCase().includes('price') || textToSend.toLowerCase().includes('how much')) {
        responseText = `The price is K650 with complimentary packaging. Lusaka express delivery is K35. Would you like to lock this order in?`;
      } else if (textToSend.toLowerCase().includes('airtel') || textToSend.toLowerCase().includes('momo') || textToSend.toLowerCase().includes('pay')) {
        responseText = `We support instant 1-click Airtel Money and MTN MoMo payment prompts. Your transaction is verified in under 3 seconds!`;
      }

      setSandboxLog(prev => [...prev, { role: 'agent', content: responseText, time: nowTime }]);
      setIsSandboxThinking(false);
    }, 2200);
  };

  const progressPercent = Math.min(100, Math.max(0, (sceneElapsedMs / sceneDurationMs) * 100));

  return (
    <div className={`w-full bg-[#080503] text-white rounded-2xl border border-[#9B2208]/40 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
      isFullscreen ? 'h-full max-h-[94vh]' : 'min-h-[640px]'
    }`}>
      
      {/* 1. TOP CINEMATIC CONTROLS & TELEMETRY BAR */}
      <div className="px-3 sm:px-5 py-2.5 bg-[#120B07] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Window Dots & Industry Identifier */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="h-4 w-[1px] bg-white/15 mx-1 hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-syne font-bold text-white tracking-wide">
              {activeIndustry.storeName}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#20100A] text-[#D95A1A] border border-[#9B2208]/40 font-mono hidden md:inline-block">
              {activeIndustry.city}
            </span>
          </div>
        </div>

        {/* Middle: Mode Switcher (Cinema vs Sandbox) */}
        <div className="flex items-center p-0.5 rounded-xl bg-[#090503] border border-white/10 text-xs font-syne">
          <button
            onClick={() => { setIsSandboxMode(false); setIsPlaying(true); }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              !isSandboxMode 
                ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white font-bold shadow' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Cinema Demo</span>
          </button>

          <button
            onClick={() => { setIsSandboxMode(true); setIsPlaying(false); }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              isSandboxMode 
                ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white font-bold shadow' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Interactive Sandbox</span>
          </button>
        </div>

        {/* Right: Quick Tools (Sound, Speed, Fullscreen) */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-xs font-syne ${
              isMuted 
                ? 'bg-[#180E09] border-white/10 text-white/50 hover:text-white' 
                : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 font-bold'
            }`}
            title={isMuted ? "Unmute sound effects" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
            <span className="text-[10px] hidden sm:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          {/* Playback Speed */}
          {!isSandboxMode && (
            <button
              onClick={() => setPlaybackSpeed(s => s === 1 ? 1.5 : s === 1.5 ? 2 : 1)}
              className="px-2 py-1 rounded-lg bg-[#180E09] border border-white/10 hover:border-white/20 text-[10px] font-mono font-bold text-white/80 hover:text-white cursor-pointer"
              title="Playback speed"
            >
              {playbackSpeed}x
            </button>
          )}

          {/* Fullscreen Trigger */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="p-1.5 rounded-lg bg-[#180E09] border border-white/10 hover:border-[#D95A1A]/50 text-white/70 hover:text-white cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. INDUSTRY SELECTOR TABS BAR */}
      <div className="px-3 sm:px-5 py-2 bg-[#0E0805] border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider font-syne pr-1 hidden sm:inline">
            Retail Sector:
          </span>
          {CINEMATIC_INDUSTRIES.map(industry => {
            const isSelected = industry.id === selectedIndustryId;
            return (
              <button
                key={industry.id}
                onClick={() => handleIndustrySelect(industry.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-syne font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#22120A] text-white font-bold border border-[#9B2208]/60 shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{industry.avatarBadge.split(' ')[0]}</span>
                <span>{industry.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live System Metric Pulse */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-syne text-white/60 flex-shrink-0">
          <div className="flex items-center gap-1 text-emerald-400">
            <Zap className="w-3 h-3" />
            <span>Latency: <strong>1.4s</strong></span>
          </div>
          <div className="flex items-center gap-1 text-[#D95A1A]">
            <ShieldCheck className="w-3 h-3" />
            <span>3 Agents Synced</span>
          </div>
        </div>
      </div>

      {/* 3. CINEMA MODE SCENE PROGRESS & TIMELINE HUD (When in Cinema Mode) */}
      {!isSandboxMode && (
        <div className="px-3 sm:px-5 py-2 bg-[#0B0704] border-b border-white/10 space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#9B2208]/30 text-[#D95A1A] border border-[#9B2208]/50 font-mono text-[10px] font-bold">
                SCENE {activeScene.sceneNumber}/03
              </span>
              <span className="font-syne font-bold text-white">
                {activeScene.title}
              </span>
              <span className="text-[11px] text-white/50 hidden md:inline">
                ({activeScene.timeTag})
              </span>
            </div>

            {/* Scene Selectors */}
            <div className="flex items-center gap-1 self-end sm:self-auto">
              {activeIndustry.scenes.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => handleSceneSelect(idx)}
                  className={`px-2 py-0.5 rounded text-[10px] font-syne transition-all cursor-pointer ${
                    currentSceneIndex === idx
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  Scene {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Smooth Scrubbing Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* 4. MAIN INTERACTIVE STAGE & CHAT WORKSPACE */}
      <div className="flex-1 p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
        
        {/* Left / Center: The Live Multi-Agent Execution Stream (Span 8) */}
        <div className="lg:col-span-8 flex flex-col bg-[#0E0805] rounded-xl border border-white/10 overflow-hidden shadow-inner h-[380px] sm:h-[440px]">
          
          {/* Stream Header */}
          <div className="px-3 py-2 bg-[#150D09] border-b border-white/5 flex items-center justify-between text-xs font-syne">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#D95A1A]" />
              <span className="font-bold text-white">
                {isSandboxMode ? 'Interactive Merchant Sandbox' : 'Live Omnichannel Stream'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Agent Core Active</span>
            </div>
          </div>

          {/* Chat Messages / Storyboard Container */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 font-sans text-xs scroll-smooth"
          >
            {/* If in Cinema Mode */}
            {!isSandboxMode ? (
              <>
                {visibleSteps.map((step) => {
                  if (step.actionType === 'thought') {
                    return (
                      <div key={step.id} className="p-2.5 rounded-lg bg-[#140C07] border border-[#9B2208]/25 text-[11px] text-[#FAFAF9]/80 font-mono space-y-1 animate-fadeIn">
                        <div className="flex items-center gap-1.5 text-[#D95A1A] font-bold">
                          <Sparkles className="w-3 h-3" />
                          <span>AI Agent Thought Protocol</span>
                        </div>
                        <p className="leading-relaxed">{step.content}</p>
                      </div>
                    );
                  }

                  if (step.actionType === 'tool_call' && step.toolDetails) {
                    return (
                      <div key={step.id} className="p-2.5 rounded-lg bg-[#070402] border border-white/10 font-mono text-[11px] space-y-1.5 animate-fadeIn">
                        <div className="flex items-center justify-between text-white/50 text-[10px]">
                          <span className="flex items-center gap-1 text-amber-400">
                            <Terminal className="w-3 h-3" />
                            <span>Tool Execution: <strong>{step.toolDetails.toolName}</strong></span>
                          </span>
                          <span>⚡ {step.toolDetails.latencyMs}ms</span>
                        </div>
                        <div className="text-white/60 text-[10px] bg-black/40 p-1.5 rounded truncate">
                          Input: {step.toolDetails.input}
                        </div>
                        <div className="text-emerald-400 text-[10px] bg-emerald-950/20 p-1.5 rounded border border-emerald-500/20">
                          Output: {step.toolDetails.output}
                        </div>
                      </div>
                    );
                  }

                  if (step.actionType === 'visual_generate' && step.visualCard) {
                    return (
                      <div key={step.id} className="p-3 rounded-xl bg-gradient-to-br from-[#1C0F0A] to-[#120A06] border border-[#9B2208]/50 space-y-2 animate-fadeIn shadow-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D95A1A] text-white font-bold font-syne">
                            {step.visualCard.badge}
                          </span>
                          <span className="text-[10px] text-amber-400 font-mono font-bold">
                            {step.visualCard.discount}
                          </span>
                        </div>
                        <h4 className="font-syne font-bold text-white text-sm">
                          {step.visualCard.headline}
                        </h4>
                        <p className="text-white/80 text-[11px] leading-relaxed">
                          {step.visualCard.caption}
                        </p>
                        <div className="pt-1 flex items-center justify-between text-[10px] text-white/50 border-t border-white/5">
                          <span>✓ Auto-formatted for WhatsApp & Instagram</span>
                          <span className="text-emerald-400 font-bold">1-Click Publish Ready</span>
                        </div>
                      </div>
                    );
                  }

                  if (step.actionType === 'order_complete') {
                    return (
                      <div key={step.id} className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 space-y-1 animate-fadeIn">
                        <div className="flex items-center gap-1.5 font-bold font-syne text-xs text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Transaction Completed</span>
                        </div>
                        <p className="text-white/90 text-xs">{step.content}</p>
                      </div>
                    );
                  }

                  // Regular message (Shopper vs AI Agent)
                  const isShopper = step.agent === 'shopper';
                  return (
                    <div 
                      key={step.id} 
                      className={`flex flex-col ${isShopper ? 'items-start' : 'items-end'} animate-fadeIn`}
                    >
                      <div className="text-[10px] text-white/50 font-syne mb-1 px-1 flex items-center gap-1">
                        {isShopper ? <Smartphone className="w-3 h-3 text-emerald-400" /> : <Sparkles className="w-3 h-3 text-[#D95A1A]" />}
                        <span>{step.agentName}</span>
                      </div>
                      <div className={`p-3 rounded-2xl max-w-[85%] sm:max-w-[75%] leading-relaxed ${
                        isShopper 
                          ? 'bg-[#1C130D] text-white/95 rounded-tl-sm border border-white/10' 
                          : 'bg-gradient-to-r from-[#8B1C05] to-[#B83A0A] text-white rounded-tr-sm shadow-md font-medium'
                      }`}>
                        <p className="whitespace-pre-line">{step.content}</p>
                      </div>
                    </div>
                  );
                })}

                {visibleSteps.length === 0 && (
                  <div className="h-full flex items-center justify-center text-white/40 font-syne text-xs">
                    Initializing Scene Stream...
                  </div>
                )}
              </>
            ) : (
              /* If in Sandbox Mode */
              <>
                {sandboxLog.map((log, idx) => (
                  <div key={idx} className={`flex flex-col ${log.role === 'user' ? 'items-start' : 'items-end'} animate-fadeIn`}>
                    <div className="text-[10px] text-white/50 font-syne mb-1 px-1 flex items-center gap-1">
                      <span>{log.role === 'user' ? 'Shopper (WhatsApp)' : log.role === 'tool' ? 'System Telemetry' : 'Mupezeni AI Agent'}</span>
                      <span>· {log.time}</span>
                    </div>
                    {log.role === 'tool' ? (
                      <div className="w-full p-2 rounded bg-black/50 border border-white/10 font-mono text-[10px] text-amber-300">
                        {log.content}
                      </div>
                    ) : (
                      <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        log.role === 'user'
                          ? 'bg-[#1C130D] text-white rounded-tl-sm border border-white/10'
                          : 'bg-gradient-to-r from-[#8B1C05] to-[#B83A0A] text-white rounded-tr-sm font-medium'
                      }`}>
                        {log.content}
                      </div>
                    )}
                  </div>
                ))}

                {isSandboxThinking && (
                  <div className="flex items-center gap-2 text-xs text-[#D95A1A] font-syne animate-pulse p-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI Agent querying inventory & generating response...</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sandbox Interactive Input Bar */}
          {isSandboxMode ? (
            <div className="p-2.5 bg-[#120B07] border-t border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[10px] font-syne text-white/70">
                <span className="text-white/40 flex-shrink-0">Try Prompt:</span>
                <button
                  onClick={() => handleSendSandboxPrompt('Do you have this in stock and can I get it delivered to Kabulonga today?')}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 whitespace-nowrap cursor-pointer"
                >
                  "Stock & Kabulonga Delivery?"
                </button>
                <button
                  onClick={() => handleSendSandboxPrompt('How much is this and do you take Airtel Money?')}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 whitespace-nowrap cursor-pointer"
                >
                  "Price & Airtel Money?"
                </button>
                <button
                  onClick={() => handleSendSandboxPrompt('What is your warranty and return policy?')}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 whitespace-nowrap cursor-pointer"
                >
                  "Warranty & Returns?"
                </button>
              </div>

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendSandboxPrompt(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Type any customer question to test your AI worker..."
                  className="flex-1 px-3 py-2 rounded-lg bg-[#070402] border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D95A1A]"
                />
                <button
                  type="submit"
                  disabled={!customPrompt.trim() || isSandboxThinking}
                  className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white font-bold text-xs font-syne disabled:opacity-40 cursor-pointer flex items-center gap-1"
                >
                  <span>Send</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          ) : (
            /* Cinema Playback Transport Bar */
            <div className="px-3 py-2 bg-[#120B07] border-t border-white/10 flex items-center justify-between text-xs font-syne">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-[#9B2208] text-white hover:bg-[#B83A0A] transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlaying ? 'Pause' : 'Play Demo'}</span>
                </button>

                <button
                  onClick={handleRestart}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                  title="Restart Scene"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[11px] text-white/60 font-mono">
                {Math.floor(sceneElapsedMs / 1000)}s / {activeScene.durationSeconds}s
              </div>
            </div>
          )}

        </div>

        {/* Right: Live 3-Agent Live Co-Pilot Radar & Executive Stats (Span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
          
          {/* Agent Active Hub Card */}
          <div className="p-3.5 rounded-xl bg-[#120B07] border border-[#9B2208]/30 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
                Orchestration Radar
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 font-bold">
                100% Autonomous
              </span>
            </div>

            {/* 3 Co-Pilot Status Rows */}
            <div className="space-y-2">
              
              {/* Agent 1 */}
              <div className={`p-2 rounded-lg border transition-all flex items-center justify-between ${
                activeScene.focusAgent === 'support'
                  ? 'bg-[#20100A] border-[#D95A1A]/60 shadow-sm'
                  : 'bg-[#0A0604] border-white/5 opacity-70'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#9B2208]/40 flex items-center justify-center text-[#D95A1A]">
                    <Headphones className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold font-syne text-white">Support Agent</h5>
                    <p className="text-[9px] text-white/60">WhatsApp & DMs</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-emerald-400">
                  {activeScene.focusAgent === 'support' ? '⚡ Active' : 'Idle'}
                </span>
              </div>

              {/* Agent 2 */}
              <div className={`p-2 rounded-lg border transition-all flex items-center justify-between ${
                activeScene.focusAgent === 'marketing'
                  ? 'bg-[#20100A] border-[#D95A1A]/60 shadow-sm'
                  : 'bg-[#0A0604] border-white/5 opacity-70'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#B83A0A]/40 flex items-center justify-center text-[#F57C00]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold font-syne text-white">Marketing Agent</h5>
                    <p className="text-[9px] text-white/60">Creative Studio</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-[#F57C00]">
                  {activeScene.focusAgent === 'marketing' ? '✨ Staging Drop' : 'Idle'}
                </span>
              </div>

              {/* Agent 3 */}
              <div className={`p-2 rounded-lg border transition-all flex items-center justify-between ${
                activeScene.focusAgent === 'operations'
                  ? 'bg-[#20100A] border-[#D95A1A]/60 shadow-sm'
                  : 'bg-[#0A0604] border-white/5 opacity-70'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#7A1804]/40 flex items-center justify-center text-[#D95A1A]">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold font-syne text-white">Operations Agent</h5>
                    <p className="text-[9px] text-white/60">Logistics & Slips</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-[#D95A1A]">
                  {activeScene.focusAgent === 'operations' ? '📊 Reconciling' : 'Idle'}
                </span>
              </div>

            </div>
          </div>

          {/* Quick Business Outcome Callout */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#180E09] to-[#0D0704] border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold font-syne text-white">
              <Flame className="w-3.5 h-3.5 text-[#D95A1A]" />
              <span>The Mupezeni Impact</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-[#FAFAF9]/80 font-syne">
              <li className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Under 2-second response time 24/7</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Zero staffing churn, zero training delays</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>Fixed K5,000/mo (Save K25,000+/mo)</span>
              </li>
            </ul>

            {onNavigateToContact && (
              <button
                onClick={onNavigateToContact}
                className="w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r from-[#9B2208] to-[#D95A1A] font-syne font-bold text-xs text-white hover:opacity-95 shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Deploy This For Your Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
