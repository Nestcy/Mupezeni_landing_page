import React, { useId } from 'react';

interface IllustrationProps {
  className?: string;
  size?: number | string;
}

/**
 * Premium SVG Illustration for AI Customer Support Worker
 * Consistent terracotta/ember brand styling featuring layered smart chat bubbles with instant-response audio waves.
 */
export const SupportWorkerIllustration: React.FC<IllustrationProps> = ({ className = 'w-12 h-12', size }) => {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, '');

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="AI Customer Support chat-bubble illustration"
    >
      <defs>
        {/* Glow & Gradient definitions */}
        <radialGradient id={`support-bg-glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D95A1A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9B2208" stopOpacity="0" />
        </radialGradient>
        
        <linearGradient id={`support-bubble-main-${id}`} x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D95A1A" />
          <stop offset="60%" stopColor="#B83A0A" />
          <stop offset="100%" stopColor="#7E1B06" />
        </linearGradient>

        <linearGradient id={`support-bubble-sec-${id}`} x1="10" y1="45" x2="55" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#25130A" />
          <stop offset="100%" stopColor="#120A05" />
        </linearGradient>

        <linearGradient id={`support-accent-gold-${id}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF5EB" />
          <stop offset="100%" stopColor="#F5EDE4" />
        </linearGradient>

        <filter id={`support-soft-shadow-${id}`} x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Ambient background glow circle */}
      <circle cx="50" cy="50" r="42" fill={`url(#support-bg-glow-${id})`} />

      {/* Outer Subtle Geometric Orbit / Pulse Ring */}
      <circle cx="50" cy="50" r="45" stroke="#D95A1A" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />

      {/* Primary Customer Support Chat Bubble (Large, elevated) */}
      <g filter={`url(#support-soft-shadow-${id})`}>
        <path
          d="M32 20H68C76.8366 20 84 27.1634 84 36V50C84 58.8366 76.8366 66 68 66H46L32 75V66H32C23.1634 66 16 58.8366 16 50V36C16 27.1634 23.1634 20 32 20Z"
          fill={`url(#support-bubble-main-${id})`}
          stroke="#F5EDE4"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
        {/* Subtle inner highlight arc */}
        <path
          d="M24 28C24 24 30 22 36 22H64C72 22 76 25 76 30"
          stroke={`url(#support-accent-gold-${id})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
      </g>

      {/* Instant Reply / Conversation Wave Elements inside primary bubble */}
      <g>
        {/* Sound wave bars representing active conversation & 2s reply */}
        <rect x="33" y="40" width="4.5" height="12" rx="2.25" fill="#FFF5EB" />
        <rect x="42" y="34" width="4.5" height="24" rx="2.25" fill="#FFF5EB" />
        <rect x="51" y="30" width="4.5" height="32" rx="2.25" fill="#FFF5EB" />
        <rect x="60" y="37" width="4.5" height="18" rx="2.25" fill="#FFF5EB" />
        <rect x="69" y="43" width="4.5" height="9" rx="2.25" fill="#FFF5EB" opacity="0.8" />
      </g>

      {/* Overlapping Secondary Incoming/Verification Bubble (Front Left) */}
      <g filter={`url(#support-soft-shadow-${id})`}>
        <path
          d="M20 54H44C49.5228 54 54 58.4772 54 64V72C54 77.5228 49.5228 82 44 82H32L24 88V82H20C14.4772 82 10 77.5228 10 72V64C10 58.4772 14.4772 54 20 54Z"
          fill={`url(#support-bubble-sec-${id})`}
          stroke="#D95A1A"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />
        {/* Small checkmark / verification tick inside secondary bubble */}
        <path
          d="M24 68L29 73L40 62"
          stroke="#34D399"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Floating 24/7 Sparkle / Status Star */}
      <g transform="translate(76, 16)">
        <path
          d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
          fill="#34D399"
        />
      </g>
    </svg>
  );
};

/**
 * Premium SVG Illustration for AI Marketing Worker
 * Consistent terracotta/ember brand styling featuring a megaphone/chart hybrid that projects sound waves transforming into ascending growth charts.
 */
export const MarketingWorkerIllustration: React.FC<IllustrationProps> = ({ className = 'w-12 h-12', size }) => {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, '');

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="AI Marketing Worker megaphone and chart hybrid illustration"
    >
      <defs>
        <radialGradient id={`marketing-bg-glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D95A1A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9B2208" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`marketing-horn-grad-${id}`} x1="16" y1="36" x2="56" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7E1B06" />
          <stop offset="40%" stopColor="#B83A0A" />
          <stop offset="100%" stopColor="#D95A1A" />
        </linearGradient>

        <linearGradient id={`marketing-chart-grad-${id}`} x1="45" y1="20" x2="85" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D95A1A" />
          <stop offset="100%" stopColor="#9B2208" />
        </linearGradient>

        <filter id={`marketing-soft-shadow-${id}`} x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Ambient background glow */}
      <circle cx="50" cy="50" r="42" fill={`url(#marketing-bg-glow-${id})`} />

      {/* Outer geometric orbit ring */}
      <circle cx="50" cy="50" r="45" stroke="#D95A1A" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />

      {/* Megaphone Handle */}
      <path
        d="M26 62L28 76C28.2 78 31 79 33 78L36 76"
        stroke="#F5EDE4"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />

      {/* Megaphone Back End / Cap */}
      <g filter={`url(#marketing-soft-shadow-${id})`}>
        <rect
          x="12"
          y="42"
          width="8"
          height="18"
          rx="3"
          fill="#1C0E07"
          stroke="#D95A1A"
          strokeWidth="1.5"
        />

        {/* Megaphone Cone Body */}
        <path
          d="M20 45L46 34C48 33 50 34.5 50 37V65C50 67.5 48 69 46 68L20 57V45Z"
          fill={`url(#marketing-horn-grad-${id})`}
          stroke="#F5EDE4"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />

        {/* Megaphone Bell Ring / Rim */}
        <ellipse
          cx="50"
          cy="51"
          rx="4"
          ry="15"
          fill="#25130A"
          stroke="#F5EDE4"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
      </g>

      {/* Soundwaves / Broadcast Waves that Emerge & Transition into Chart Bars */}
      <g filter={`url(#marketing-soft-shadow-${id})`}>
        {/* Radiating sound arc 1 */}
        <path
          d="M57 41C59.5 44 60.5 48 60 52C59.5 56 58 59 56 61"
          stroke="#D95A1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />

        {/* Radiating sound arc 2 */}
        <path
          d="M62 35C66 39 67.5 45 66.5 51C65.5 57 63 62 60 66"
          stroke="#D95A1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* Growth Chart Bars morphing from the megaphone output */}
        {/* Bar 1 (Short) */}
        <rect
          x="62"
          y="52"
          width="5.5"
          height="22"
          rx="2"
          fill="#24130B"
          stroke="#D95A1A"
          strokeWidth="1.2"
        />
        {/* Bar 2 (Medium) */}
        <rect
          x="71"
          y="42"
          width="5.5"
          height="32"
          rx="2"
          fill="#B83A0A"
          stroke="#F5EDE4"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        {/* Bar 3 (Tall Peak) */}
        <rect
          x="80"
          y="28"
          width="5.5"
          height="46"
          rx="2"
          fill={`url(#marketing-chart-grad-${id})`}
          stroke="#F5EDE4"
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />

        {/* Exponential Growth Trendline with Arrowhead */}
        <path
          d="M48 55C56 54 62 48 70 38L83 22"
          stroke="#FFF5EB"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M76 22H83V29"
          stroke="#FFF5EB"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Sparkle of Viral Conversion */}
      <g transform="translate(85, 14)">
        <path
          d="M5 0L6.5 3.5L10 5L6.5 6.5L5 10L3.5 6.5L0 5L3.5 3.5L5 0Z"
          fill="#D95A1A"
        />
      </g>
    </svg>
  );
};

/**
 * Premium SVG Illustration for AI Business Manager
 * Consistent terracotta/ember brand styling featuring an executive store manifest document seamlessly interlocked with precision mechanical gears.
 */
export const BusinessManagerIllustration: React.FC<IllustrationProps> = ({ className = 'w-12 h-12', size }) => {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, '');

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="AI Business Manager document and gear illustration"
    >
      <defs>
        <radialGradient id={`manager-bg-glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D95A1A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9B2208" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`manager-doc-grad-${id}`} x1="18" y1="18" x2="62" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#221209" />
          <stop offset="100%" stopColor="#120A05" />
        </linearGradient>

        <linearGradient id={`manager-gear-grad-${id}`} x1="45" y1="45" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D95A1A" />
          <stop offset="50%" stopColor="#B83A0A" />
          <stop offset="100%" stopColor="#7E1B06" />
        </linearGradient>

        <linearGradient id={`manager-small-gear-${id}`} x1="60" y1="20" x2="90" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5EDE4" />
          <stop offset="100%" stopColor="#C47E5A" />
        </linearGradient>

        <filter id={`manager-soft-shadow-${id}`} x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Ambient background glow */}
      <circle cx="50" cy="50" r="42" fill={`url(#manager-bg-glow-${id})`} />

      {/* Outer geometric orbit ring */}
      <circle cx="50" cy="50" r="45" stroke="#D95A1A" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />

      {/* 1. Executive Business Document / Manifest (Left/Center) */}
      <g filter={`url(#manager-soft-shadow-${id})`}>
        {/* Document Sheet with Folded Top-Right Corner */}
        <path
          d="M20 22C20 18.6863 22.6863 16 26 16H48L62 30V74C62 77.3137 59.3137 80 56 80H26C22.6863 80 20 77.3137 20 74V22Z"
          fill={`url(#manager-doc-grad-${id})`}
          stroke="#D95A1A"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />

        {/* Folded Corner Triangle */}
        <path
          d="M48 16V28C48 29.1046 48.8954 30 50 30H62L48 16Z"
          fill="#9B2208"
          stroke="#F5EDE4"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Data & Order Manifest Lines on Document */}
        <rect x="27" y="28" width="14" height="2.5" rx="1.25" fill="#D95A1A" />
        <rect x="27" y="36" width="22" height="2.5" rx="1.25" fill="#F5EDE4" fillOpacity="0.7" />
        <rect x="27" y="44" width="18" height="2.5" rx="1.25" fill="#F5EDE4" fillOpacity="0.5" />
        <rect x="27" y="52" width="14" height="2.5" rx="1.25" fill="#F5EDE4" fillOpacity="0.5" />
        
        {/* Approved / Checkmark Stamp on Document */}
        <circle cx="34" cy="66" r="6" fill="#1C0E07" stroke="#34D399" strokeWidth="1.5" />
        <path d="M31.5 66L33.5 68L37 64" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* 2. Precision Mechanical Gears Interlocking with Document */}
      {/* Secondary Top-Right Small Gear */}
      <g filter={`url(#manager-soft-shadow-${id})`}>
        <path
          d="M74 24L76 22M76 34L74 32M80 26L82 24M80 32L82 34M71 27H69M87 27H89M78 20V18M78 36V38"
          stroke={`url(#manager-small-gear-${id})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="78" cy="28" r="6.5" fill="#180D07" stroke={`url(#manager-small-gear-${id})`} strokeWidth="2" />
        <circle cx="78" cy="28" r="2.5" fill="#F5EDE4" />
      </g>

      {/* Primary Large Gear (Bottom Right, Interlocking with Document) */}
      <g filter={`url(#manager-soft-shadow-${id})`}>
        {/* Outer Teeth (8-point precision cog) */}
        <path
          d="
            M65 47 L67 44 H73 L75 47
            L79 48.5 L82 46.5 L86 50.5 L84 53.5
            L85.5 57.5 L88.5 59.5 V65.5 L85.5 67.5
            L84 71.5 L86 74.5 L82 78.5 L79 76.5
            L75 78 L73 81 H67 L65 78
            L61 76.5 L58 78.5 L54 74.5 L56 71.5
            L54.5 67.5 L51.5 65.5 V59.5 L54.5 57.5
            L56 53.5 L54 50.5 L58 46.5 L61 48.5 Z
          "
          fill={`url(#manager-gear-grad-${id})`}
          stroke="#F5EDE4"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />

        {/* Inner Gear Recess */}
        <circle cx="70" cy="62.5" r="10.5" fill="#140A05" stroke="#D95A1A" strokeWidth="1.5" />
        
        {/* Center Axle Hub */}
        <circle cx="70" cy="62.5" r="4.5" fill="#F5EDE4" />
        <circle cx="70" cy="62.5" r="2" fill="#7E1B06" />
      </g>

      {/* Sync Status Glow Point */}
      <g transform="translate(18, 14)">
        <circle cx="3" cy="3" r="2" fill="#34D399" />
        <circle cx="3" cy="3" r="3.5" stroke="#34D399" strokeWidth="0.8" opacity="0.6" />
      </g>
    </svg>
  );
};

export const AiWorkerIllustration: React.FC<{
  workerId: string;
  className?: string;
  size?: number | string;
}> = ({ workerId, className, size }) => {
  switch (workerId) {
    case 'customer-support':
      return <SupportWorkerIllustration className={className} size={size} />;
    case 'marketing-specialist':
      return <MarketingWorkerIllustration className={className} size={size} />;
    case 'business-manager':
      return <BusinessManagerIllustration className={className} size={size} />;
    default:
      return <SupportWorkerIllustration className={className} size={size} />;
  }
};
