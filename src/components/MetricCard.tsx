import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  id?: string;
  title: string;
  value: string | number;
  trend?: string;
  trendPositive?: boolean;
  subtitle?: string;
  icon: LucideIcon;
  accentColor?: 'cyan' | 'magenta' | 'violet' | 'amber' | 'emerald';
  sparklineData?: number[];
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  value,
  trend,
  trendPositive = true,
  subtitle,
  icon: Icon,
  accentColor = 'cyan',
  sparklineData = [12, 14, 18, 15, 20, 24, 28],
  onClick,
}) => {
  const accentClasses = {
    cyan: {
      border: 'hover:border-cyan-500/50',
      text: 'text-[#00F0FF]',
      bg: 'bg-cyan-500/10',
      glow: 'shadow-[0_0_15px_rgba(0,240,255,0.06)]',
      spark: '#00F0FF',
    },
    magenta: {
      border: 'hover:border-pink-500/50',
      text: 'text-[#FF007A]',
      bg: 'bg-pink-500/10',
      glow: 'shadow-[0_0_15px_rgba(255,0,122,0.06)]',
      spark: '#FF007A',
    },
    violet: {
      border: 'hover:border-purple-500/50',
      text: 'text-[#8A2BE2]',
      bg: 'bg-purple-500/10',
      glow: 'shadow-[0_0_15px_rgba(138,43,226,0.06)]',
      spark: '#8A2BE2',
    },
    amber: {
      border: 'hover:border-amber-500/50',
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.06)]',
      spark: '#f59e0b',
    },
    emerald: {
      border: 'hover:border-emerald-500/50',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.06)]',
      spark: '#10b981',
    },
  }[accentColor];

  // SVG sparkline path
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const points = sparklineData
    .map((d, i) => {
      const x = (i / (sparklineData.length - 1)) * 70;
      const y = 24 - ((d - minVal) / range) * 20;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      id={id}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-4 backdrop-blur-md transition-all duration-200 ${accentClasses.border} ${accentClasses.glow} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accentClasses.bg} ${accentClasses.text}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl font-bold tracking-tight text-white font-['Chakra_Petch',sans-serif]">
          {value}
        </div>

        {/* Mini Sparkline */}
        <div className="h-6 w-18 opacity-80 transition-opacity group-hover:opacity-100">
          <svg viewBox="0 0 70 24" className="h-full w-full overflow-visible">
            <polyline
              fill="none"
              stroke={accentClasses.spark}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      {(trend || subtitle) && (
        <div className="mt-2 flex items-center justify-between text-xs">
          {trend && (
            <span
              className={`inline-flex items-center font-medium ${
                trendPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {trend}
            </span>
          )}
          {subtitle && <span className="text-[11px] text-slate-500">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
