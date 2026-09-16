import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  Loader2
} from 'lucide-react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTimeMs, setCurrentTimeMs] = useState<number>(0);
  const [durationMs, setDurationMs] = useState<number>(43000);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);

  // Chapters for the 43-second MP4 demo video
  const chapters = [
    { startMs: 0, title: '01. Web Onboarding' },
    { startMs: 8000, title: '02. 24/7 WhatsApp & MoMo' },
    { startMs: 17000, title: '03. TikTok & FB Creative Studio' },
    { startMs: 26000, title: '04. Operations Hub & Manifest' },
    { startMs: 35000, title: '05. Deploy AI Team' }
  ];

  const currentChapter = chapters.reduce((prev, curr) => 
    currentTimeMs >= curr.startMs ? curr : prev
  , chapters[0]);

  // IntersectionObserver: Auto-play when visible, pause when scrolled away
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const isVisibleInitially = rect.top < window.innerHeight && rect.bottom > 0;
    setIsInViewport(isVisibleInitially);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
            if (videoRef.current && autoPlay) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } else {
            setIsInViewport(false);
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay]);

  // Play / Pause toggle
  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused || vid.ended) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  // Mute / Unmute toggle
  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;

    const nextMuted = !vid.muted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Seek handler
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const vid = videoRef.current;
    if (!vid || !durationMs) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSeconds = ratio * (durationMs / 1000);
    vid.currentTime = targetSeconds;
    setCurrentTimeMs(Math.floor(targetSeconds * 1000));
  };

  // Auto-hide controls when playing
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = Math.min(100, (currentTimeMs / (durationMs || 1)) * 100);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
      className={`relative w-full aspect-video rounded-xl sm:rounded-3xl bg-black border border-[#9B2208]/50 sm:border-2 sm:border-[#9B2208]/60 shadow-[0_0_40px_rgba(155,34,8,0.25)] overflow-hidden group select-none ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#9B2208]/20 via-transparent to-[#D95A1A]/15 pointer-events-none -z-10" />

      {/* Dedicated Native MP4 Video Player */}
      <video
        ref={videoRef}
        src="/demo.mp4"
        className="w-full h-full object-contain bg-black cursor-pointer"
        playsInline
        autoPlay={autoPlay}
        loop
        muted={isMuted}
        preload="auto"
        onClick={togglePlay}
        onLoadedMetadata={() => {
          setIsLoading(false);
          if (videoRef.current) {
            const dur = videoRef.current.duration;
            if (!isNaN(dur) && dur > 0) {
              setDurationMs(Math.floor(dur * 1000));
            }
          }
        }}
        onCanPlay={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTimeMs(Math.floor(videoRef.current.currentTime * 1000));
          }
        }}
      />

      {/* Loading Buffering Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2 pointer-events-none z-20">
          <Loader2 className="w-8 h-8 text-[#D95A1A] animate-spin" />
          <span className="text-xs font-syne text-white/80">Loading video demo...</span>
        </div>
      )}

      {/* Video Controls Overlay */}
      <div className={`absolute inset-0 pointer-events-none flex flex-col justify-between transition-opacity duration-300 ${
        showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
      }`}>
        
        {/* Top Header HUD */}
        <div className="p-2 sm:p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="font-syne font-bold text-white text-[10px] sm:text-sm tracking-wide truncate max-w-[200px] sm:max-w-md">
              Mupezeni AI Workforce · Product Walkthrough
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[9px] sm:text-[10px] font-mono text-white/90">
              demo.mp4 · 1080p
            </span>
          </div>
        </div>

        {/* Center Big Play Button (when paused) */}
        {!isPlaying && !isLoading && (
          <div 
            onClick={togglePlay}
            className="self-center cursor-pointer pointer-events-auto p-4 sm:p-5 rounded-full bg-[#9B2208]/80 hover:bg-[#9B2208] text-white shadow-2xl transition-all transform hover:scale-110 active:scale-95 border border-white/20"
            title="Play Video"
          >
            <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current translate-x-0.5" />
          </div>
        )}

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
              {formatTime(currentTimeMs)} / {formatTime(durationMs)}
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
                style={{ left: `${(ch.startMs / (durationMs || 1)) * 100}%` }}
                title={ch.title}
              />
            ))}
          </div>

          {/* Control Bar Actions */}
          <div className="flex items-center justify-between pt-0.5 sm:pt-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
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

// Export alias as VideoDemo as well
export const VideoDemo = SimulatedVideoDemo;
