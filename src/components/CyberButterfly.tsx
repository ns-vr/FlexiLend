import React from 'react';

interface CyberButterflyProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const CyberButterfly: React.FC<CyberButterflyProps> = ({
  className = '',
  size = 32,
  animated = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-[0_0_12px_rgba(0,240,255,0.4)] ${
          animated ? 'animate-pulse' : ''
        }`}
      >
        <defs>
          <linearGradient id="cyberWingLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#8A2BE2" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FF007A" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="cyberWingRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF007A" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#8A2BE2" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="cyberSpine" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FF007A" />
          </linearGradient>
          <filter id="glowCyan">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left Upper Wing - Angular Cybernetic Facets */}
        <polygon
          points="50,48 20,18 8,36 32,54 50,50"
          fill="url(#cyberWingLeft)"
          stroke="#00F0FF"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon
          points="20,18 36,8 50,30 35,42"
          fill="rgba(0, 240, 255, 0.25)"
          stroke="#00F0FF"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        {/* Left Lower Wing */}
        <polygon
          points="50,52 32,58 18,74 38,82 48,64"
          fill="url(#cyberWingLeft)"
          stroke="#8A2BE2"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Right Upper Wing */}
        <polygon
          points="50,48 80,18 92,36 68,54 50,50"
          fill="url(#cyberWingRight)"
          stroke="#FF007A"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon
          points="80,18 64,8 50,30 65,42"
          fill="rgba(255, 0, 122, 0.25)"
          stroke="#FF007A"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        {/* Right Lower Wing */}
        <polygon
          points="50,52 68,58 82,74 62,82 52,64"
          fill="url(#cyberWingRight)"
          stroke="#8A2BE2"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Circuit traces on wings */}
        <line x1="28" y1="32" x2="44" y2="44" stroke="#00F0FF" strokeWidth="0.8" />
        <circle cx="28" cy="32" r="1.5" fill="#00F0FF" />
        <line x1="72" y1="32" x2="56" y2="44" stroke="#FF007A" strokeWidth="0.8" />
        <circle cx="72" cy="32" r="1.5" fill="#FF007A" />

        {/* Central Metamorphic Cyber Spine */}
        <line
          x1="50"
          y1="22"
          x2="50"
          y2="78"
          stroke="url(#cyberSpine)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glowCyan)"
        />
        {/* Antennae */}
        <path
          d="M 50 22 Q 42 12 36 10"
          stroke="#00F0FF"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="36" cy="10" r="1.5" fill="#00F0FF" />
        <path
          d="M 50 22 Q 58 12 64 10"
          stroke="#FF007A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="64" cy="10" r="1.5" fill="#FF007A" />

        {/* Core Nexus node */}
        <circle cx="50" cy="50" r="3" fill="#FFFFFF" filter="url(#glowCyan)" />
      </svg>
    </div>
  );
};
