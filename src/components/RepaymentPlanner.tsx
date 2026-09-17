import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sliders,
  ArrowRightLeft,
  RotateCcw
} from 'lucide-react';
import { Borrower, AdminConfig, RepaymentPlan } from '../types';
import { formatINR, calculateAdaptivePlan } from '../utils/financial';

interface RepaymentPlannerProps {
  borrower: Borrower;
  config: AdminConfig;
  onUpdateConfig: (newConfig: Partial<AdminConfig>) => void;
  onApprovePlan?: (plan: RepaymentPlan) => void;
  onSendAlert?: () => void;
}

export const RepaymentPlanner: React.FC<RepaymentPlannerProps> = ({
  borrower,
  config,
  onUpdateConfig,
  onApprovePlan,
  onSendAlert,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'PLAN' | 'LIQUIDITY_CONTROLS'>('PLAN');
  const [planApproved, setPlanApproved] = useState(false);

  const plan = calculateAdaptivePlan(borrower, config);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 900);
  };

  const handleApprove = () => {
    setPlanApproved(true);
    onApprovePlan?.(plan);
  };

  // Liquidity collection simulation based on config
  const totalSimulatedCollection = config.currentPortfolioCollection;
  const isFloorProtected = totalSimulatedCollection >= config.liquidityFloorAmount;

  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <ArrowRightLeft className="h-5 w-5 text-[#00F0FF]" />
            <h3 className="text-base font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
              FLEXI-EMI ADAPTIVE PLANNER
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronizing cash-flow affordability with MFI liquidity floor guarantees
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 bg-slate-900 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('PLAN')}
            className={`rounded px-3 py-1 text-xs font-semibold transition-all ${
              activeTab === 'PLAN'
                ? 'bg-cyan-500/20 text-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Adaptive Schedule
          </button>
          <button
            onClick={() => setActiveTab('LIQUIDITY_CONTROLS')}
            className={`rounded px-3 py-1 text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'LIQUIDITY_CONTROLS'
                ? 'bg-purple-500/20 text-[#8A2BE2] shadow-[0_0_8px_rgba(138,43,226,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="h-3 w-3" />
            Liquidity Controls
          </button>
        </div>
      </div>

      {activeTab === 'PLAN' ? (
        <div className="mt-5 space-y-5">
          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Plan Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
                  TRADITIONAL FIXED PLAN
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                  RIGID SCHEDULE
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-xs text-slate-400 block">Monthly Contractual EMI</span>
                  <div className="text-2xl font-bold text-slate-200 font-['Chakra_Petch',sans-serif] mt-0.5">
                    {formatINR(borrower.currentEMI)}
                  </div>
                  <span className="text-[10px] text-pink-400 block mt-0.5">
                    Fixed regardless of harvest/lean cycles
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/60">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Schedule</span>
                    <span className="text-slate-300 font-medium">12 / 24 Months</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Grace Period</span>
                    <span className="text-slate-300 font-medium">0 Months</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">FOIR Pressure</span>
                    <span className="text-pink-400 font-medium">{plan.foirBefore}% (High)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Default Risk</span>
                    <span className="text-amber-400 font-medium">Elevated in lean</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FlexiLend Adaptive Plan Card */}
            <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/20 p-4 shadow-[0_0_20px_rgba(0,240,255,0.08)] relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                <span className="text-[11px] font-mono text-[#00F0FF] font-semibold uppercase">
                  FLEXILEND ADAPTIVE PLAN
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-[#00F0FF] px-2 py-0.5 rounded font-mono font-bold">
                  RECOMMENDED
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block">Lean Season EMI</span>
                    <div className="text-2xl font-bold text-[#00F0FF] font-['Chakra_Petch',sans-serif] mt-0.5">
                      {formatINR(plan.leanSeasonEMI)}
                    </div>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">
                      Reduced for 3 lean months
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Peak Season EMI</span>
                    <div className="text-2xl font-bold text-white font-['Chakra_Petch',sans-serif] mt-0.5">
                      {formatINR(plan.peakSeasonEMI)}
                    </div>
                    <span className="text-[10px] text-cyan-300 block mt-0.5">
                      Harvest surplus flush
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-cyan-500/20">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Borrower Minimum</span>
                    <span className="text-white font-medium">{formatINR(plan.minimumPayment)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Tenure Extension</span>
                    <span className="text-cyan-300 font-medium">+{plan.tenureChangeMonths} Months</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Restructured FOIR</span>
                    <span className="text-emerald-400 font-bold">{plan.foirAfter}% (Safe)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Projected Recovery</span>
                    <span className="text-white font-medium">{plan.projectedRecoveryMonths} Months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-slate-950 uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'RECALCULATING CONSTRAINTS...' : 'GENERATE ADAPTIVE PLAN'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!planApproved ? (
                <button
                  onClick={handleApprove}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>APPROVE & STAGE RESTRUCTURING</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-3 py-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> PLAN ACTIVE & STAGED
                </span>
              )}

              {onSendAlert && (
                <button
                  onClick={onSendAlert}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 text-xs font-bold text-[#00F0FF] hover:bg-cyan-500/20 transition-all"
                >
                  <span>NOTIFY BORROWER</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Liquidity Controls Tab */
        <div className="mt-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-slate-900/80 p-3.5 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-mono">Current Portfolio Inflow</span>
              <div className="text-xl font-bold text-white font-['Chakra_Petch',sans-serif] mt-1">
                {formatINR(config.currentPortfolioCollection, true)}
              </div>
              <span className="text-[10px] text-emerald-400 mt-0.5 block">24,860 Active Borrowers</span>
            </div>

            <div className="rounded-lg bg-slate-900/80 p-3.5 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-mono">MFI Liquidity Floor</span>
              <div className="text-xl font-bold text-pink-400 font-['Chakra_Petch',sans-serif] mt-1">
                {formatINR(config.liquidityFloorAmount, true)}
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Statutory Capital Buffer</span>
            </div>

            <div className="rounded-lg bg-slate-900/80 p-3.5 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-mono">Floor Protection Status</span>
              <div className="flex items-center gap-1.5 mt-1">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="text-base font-bold text-emerald-400 font-['Chakra_Petch',sans-serif]">
                  PROTECTED
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Surplus: +₹2.4L above threshold</span>
            </div>
          </div>

          {/* Interactive Simulation Sliders */}
          <div className="rounded-lg bg-slate-900/60 p-4 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">
              Lender Constraint Knobs
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Slider 1: Minimum Borrower Payment % */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Minimum Borrower Payment Floor</span>
                  <span className="font-mono text-cyan-400 font-bold">{config.minimumPaymentPercentage}% of EMI</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="80"
                  value={config.minimumPaymentPercentage}
                  onChange={(e) =>
                    onUpdateConfig({ minimumPaymentPercentage: Number(e.target.value) })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">
                  Floor guarantees debt habituation during severe crop distress.
                </span>
              </div>

              {/* Slider 2: FOIR Threshold */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Household FOIR Ceiling</span>
                  <span className="font-mono text-amber-400 font-bold">{config.foirThreshold}% Max</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="60"
                  value={config.foirThreshold}
                  onChange={(e) => onUpdateConfig({ foirThreshold: Number(e.target.value) })}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">
                  RBI benchmark for total low-income indebtedness is 50%.
                </span>
              </div>

              {/* Slider 3: Max Tenure Extension */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Max Allowable Tenure Extension</span>
                  <span className="font-mono text-purple-400 font-bold">+{config.maxTenureExtensionMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={config.maxTenureExtensionMonths}
                  onChange={(e) =>
                    onUpdateConfig({ maxTenureExtensionMonths: Number(e.target.value) })
                  }
                  className="w-full accent-purple-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">
                  Caps duration extensions to prevent excessive ALM mismatch.
                </span>
              </div>

              {/* Slider 4: Minimum Liquidity Collection Floor */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Lender Portfolio Collection Floor</span>
                  <span className="font-mono text-pink-400 font-bold">
                    {formatINR(config.liquidityFloorAmount, true)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1200000"
                  max="2000000"
                  step="50000"
                  value={config.liquidityFloorAmount}
                  onChange={(e) =>
                    onUpdateConfig({ liquidityFloorAmount: Number(e.target.value) })
                  }
                  className="w-full accent-pink-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">
                  Algorithm halts automatic restructuring approvals if portfolio touches this line.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
