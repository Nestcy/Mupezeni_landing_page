import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'beside' | 'stacked';
  showTagline?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  layout = 'beside',
  showTagline = false, 
  onClick 
}) => {
  const sizeClasses = {
    sm: { 
      icon: 'w-9 h-9 sm:w-10 sm:h-10', 
      text: 'text-xs sm:text-sm tracking-[0.38em]', 
      subtext: 'text-[9px] sm:text-[10px] tracking-[0.2em]' 
    },
    md: { 
      icon: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16', 
      text: 'text-sm sm:text-base lg:text-lg xl:text-xl tracking-[0.4em]', 
      subtext: 'text-[10px] sm:text-xs tracking-[0.25em]' 
    },
    lg: { 
      icon: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24', 
      text: 'text-lg sm:text-xl lg:text-2xl tracking-[0.42em]', 
      subtext: 'text-xs sm:text-sm tracking-[0.28em]' 
    },
    xl: { 
      icon: 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28', 
      text: 'text-2xl sm:text-3xl lg:text-4xl tracking-[0.42em]', 
      subtext: 'text-sm sm:text-base tracking-[0.3em]' 
    }
  };

  const current = sizeClasses[size];

  return (
    <div 
      onClick={onClick}
      className={`flex ${layout === 'stacked' ? 'flex-col items-center text-center gap-2.5' : 'items-center gap-3.5 sm:gap-4'} select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className={`relative ${current.icon} flex items-center justify-center shrink-0`}>
        <img
          src="/logo.png"
          alt="Mupezeni Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(217,90,26,0.85)]"
        />
      </div>

      <div className={`flex flex-col ${layout === 'stacked' ? 'items-center' : 'justify-center'}`}>
        <span className={`brand-name leading-none pl-[0.4em] ${current.text}`}>
          MUPEZENI
        </span>
        {showTagline && (
          <span className={`text-[#A8A099] uppercase font-medium mt-1.5 font-syne ${current.subtext}`}>
            AI Retail Workforce
          </span>
        )}
      </div>
    </div>
  );
};
