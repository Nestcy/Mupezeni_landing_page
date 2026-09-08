import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  onClick?: () => void;
  /** Optional background badge if needed, defaults to clean transparent 'none' */
  badgeStyle?: 'none' | 'white' | 'dark' | 'glass';
  /** Optional override class name for the emblem wrapper */
  emblemClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  onClick,
  badgeStyle = 'none',
  emblemClassName,
}) => {
  const emblemSizes = {
    sm: 'w-12 h-9 sm:w-14 sm:h-10',
    md: 'w-18 h-13 sm:w-22 sm:h-16 md:w-28 md:h-20',
    lg: 'w-24 h-18 sm:w-30 sm:h-22 md:w-36 md:h-26',
    xl: 'w-36 h-26 sm:w-48 sm:h-34 md:w-60 md:h-42',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const badgeStyles = {
    none: 'bg-transparent',
    white: 'bg-white p-1.5 rounded-2xl shadow-md border border-white/80',
    glass: 'bg-white/95 p-1.5 rounded-2xl backdrop-blur-md shadow-md border border-white/80',
    dark: 'bg-[#1C0E07] p-1.5 rounded-2xl border border-[#9B2208]/40 shadow-inner',
  };

  return (
    <div 
      onClick={onClick}
      className={`group flex items-center gap-3 sm:gap-4 cursor-pointer select-none ${className}`}
      id="mupezeni-brand-logo"
    >
      {/* Exact uploaded logo image */}
      <div 
        className={`relative ${emblemClassName || emblemSizes[size]} flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg ${badgeStyles[badgeStyle]} transition-all duration-300`}
      >
        <img
          src="/logo.png"
          alt="Mupezeni Soaring Swallow and Guiding Star"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-150 filter drop-shadow-[0_4px_14px_rgba(217,90,26,0.45)] transition-transform duration-300 group-hover:scale-165"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`font-syne font-black tracking-tight text-[#FAFAF9] ${textSizes[size]} leading-none`}>
            Mupezeni
          </span>
          <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D95A1A] animate-pulse"></span>
        </div>
        {showTagline ? (
          <span className="text-[11px] sm:text-xs font-medium text-[#F5EDE4]/80 tracking-wider uppercase mt-1.5 font-syne">
            AI Workforce · Retail
          </span>
        ) : (
          <span className="text-[10px] sm:text-xs font-semibold text-[#D95A1A] tracking-widest uppercase mt-0.5 font-syne">
            AI for Retail
          </span>
        )}
      </div>
    </div>
  );
};
