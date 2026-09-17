import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { formatINR, getFOIRStatus } from '../utils/financial';

interface FOIRGaugeProps {
  income: number;
  existingObligations: number;
  currentOrProposedEMI: number;
  threshold?: number;
  label?: string;
}

export const FOIRGauge: React.FC<FOIRGaugeProps> = ({
  income,
  existingObligations,
  currentOrProposedEMI,
  threshold = 50,
  label = 'Household FOIR Monitor',
}) => {
  const totalObligations = existingObligations + currentOrProposedEMI;
  const foir = income > 0 ? Number(((totalObligations / income) * 100).toFixed(1)) : 100;
  const status = getFOIRStatus(foir, threshold);

  const statusConfig = {
    SAFE: {
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      badge: 'SAFE COMPLIANCE',
      icon: ShieldCheck,
      gaugeColor: '#10B981',
      desc: 'Comfortably within repayment capacity',
    },
    WARNING: {
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      badge: 'APPROACHING CEILING',
      icon: AlertTriangle,
      gaugeColor: '#F59E0B',
      desc: 'Nearing 50% regulatory ceiling',
    },
    BREACH: {
      color: 'text-[#FF007A]',
      bg: 'bg-pink-500/10 border-pink-500/30',
      badge: 'THRESHOLD BREACH',
      icon: AlertOctagon,
      gaugeColor: '#FF007A',
      desc: 'Exceeds 50% household income threshold',
    },
  }[status];

  const StatusIcon = statusConfig.icon;

  // Circular gauge arc calculations
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(foir, 100) / 100) * (circumference * 0.75);

  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
            {label}
          </span>
          <div className="group relative cursor-pointer">
            <Info className="h-3.5 w-3.5 text-slate-500 hover:text-cyan-400" />
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-900/95 p-2.5 text-[11px] text-slate-300 opacity-0 shadow-xl backdrop-blur-md transition-opacity group-hover:opacity-100 z-50">
              <span className="font-semibold text-cyan-400 block mb-1">RBI Microfinance Framework</span>
              The 50% monthly limit includes both microfinance and non-microfinance loan repayment obligations for low-income households. Prototype simulation rule.
            </div>
          </div>
        </div>

        <div className={`flex items-center space-x-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${statusConfig.bg} ${statusConfig.color}`}>
          <StatusIcon className="h-3 w-3" />
          <span>{statusConfig.badge}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Radial Gauge Visual */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg className="h-full w-full -rotate-135 transform" viewBox="0 0 120 120">
              {/* Background Track */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="9"
                fill="none"
                strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
                strokeLinecap="round"
              />
              {/* Active Value */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke={statusConfig.gaugeColor}
                strokeWidth="9"
                fill="none"
                strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
              />
            </svg>

            {/* Centered Value */}
            <div className="absolute text-center">
              <div className="text-2xl font-bold font-['Chakra_Petch',sans-serif] tracking-tight text-white">
                {foir}%
              </div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                FOIR Ratio
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400 mt-1">
            Threshold Ceiling: <span className="font-semibold text-white">{threshold}%</span>
          </div>
        </div>

        {/* Breakdown Values */}
        <div className="md:col-span-7 space-y-2 text-xs">
          <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
            <span className="text-slate-400">Monthly Household Income</span>
            <span className="font-semibold text-white font-mono">{formatINR(income)}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
            <span className="text-slate-400">Existing Other MFI Debt</span>
            <span className="font-semibold text-slate-300 font-mono">{formatINR(existingObligations)}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
            <span className="text-slate-400">Scheduled / Flexi EMI</span>
            <span className="font-semibold text-cyan-400 font-mono">{formatINR(currentOrProposedEMI)}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 font-medium">
            <span className="text-slate-300">Total Monthly Debt Service</span>
            <span className="font-bold text-white font-mono">{formatINR(totalObligations)}</span>
          </div>

          {/* Mini progress bar */}
          <div className="pt-1">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(foir, 100)}%`,
                  backgroundColor: statusConfig.gaugeColor,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0%</span>
              <span className="text-amber-400 font-medium">Ceiling 50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
