import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const sizeClasses = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', subtext: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-xl', subtext: 'text-[10px]' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', subtext: 'text-xs' }
  };

  const current = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className={`relative ${current.icon} rounded-lg bg-gradient-to-br from-[#1E110A] to-[#0A0604] border border-[#E58330]/40 flex items-center justify-center shadow-lg shadow-[#E58330]/10 overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E58330]/20 to-transparent opacity-60 pointer-events-none" />
        <svg viewBox="0 0 24 24" className="w-5/6 h-5/6 text-[#E58330]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20V6L12 14L20 6V20" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight text-white font-['Space_Grotesk'] ${current.text}`}>
          MUPEZENI<span className="text-[#E58330]">.</span>
        </span>
        {showTagline && (
          <span className={`font-mono text-[#A8A29E] tracking-wider uppercase ${current.subtext}`}>
            AI Retail Workforce
          </span>
        )}
      </div>
    </div>
  );
};
