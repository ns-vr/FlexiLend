import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'magenta' | 'violet' | 'none';
  id?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  glow = 'none',
  id,
}) => {
  const glowStyles = {
    cyan: 'border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.08)] hover:border-cyan-500/50',
    magenta: 'border-pink-500/30 shadow-[0_0_20px_rgba(255,0,122,0.08)] hover:border-pink-500/50',
    violet: 'border-purple-500/30 shadow-[0_0_20px_rgba(138,43,226,0.08)] hover:border-purple-500/50',
    none: 'border-slate-800/80 hover:border-slate-700/80',
  };

  return (
    <div
      id={id}
      className={`relative rounded-xl border bg-[#12121E]/80 backdrop-blur-md transition-all duration-200 ${glowStyles[glow]} ${className}`}
    >
      {children}
    </div>
  );
};
