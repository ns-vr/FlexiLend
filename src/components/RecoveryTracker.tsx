import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  BarChart,
  History
} from 'lucide-react';
import { Borrower } from '../types';
import { formatINR } from '../utils/financial';

interface RecoveryTrackerProps {
  borrower: Borrower;
  onFeedback?: (improved: boolean) => void;
}

export const RecoveryTracker: React.FC<RecoveryTrackerProps> = ({
  borrower,
  onFeedback,
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);

  const handleFeedback = (isYes: boolean) => {
    setFeedbackGiven(isYes);
    onFeedback?.(isYes);
  };

  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <RotateCcw className="h-5 w-5 text-[#00F0FF]" />
            <h3 className="text-sm font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
              CLOSED-LOOP RECOVERY TRACKING
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Empirical validation comparing adaptive restructuring vs coercive collection
          </p>
        </div>

        {/* Highlight recovery delta */}
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1.5">
          <span className="text-xs text-slate-400">FlexiLend Recovery:</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">78.4%</span>
          <span className="text-[10px] text-slate-500 line-through">38.2% static</span>
        </div>
      </div>

      {/* 3-Phase Lifecycle Diagram */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Phase 1: Before Adjustment */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 relative">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            PHASE 01: PRE-ADJUSTMENT
          </div>
          <h4 className="text-sm font-bold text-white mb-2">Rigid Obligation</h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Contractual EMI:</span>
              <span className="text-slate-200 font-mono">{formatINR(borrower.currentEMI)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Household FOIR:</span>
              <span className="text-pink-400 font-bold font-mono">57.0% (Severe)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Default Probability:</span>
              <span className="text-amber-400 font-mono">74%</span>
            </div>
          </div>
          <div className="mt-3 text-[10px] text-slate-500 border-t border-slate-800 pt-2">
            Static collection calls cause borrower distress & SHG breakdown.
          </div>
        </div>

        {/* Phase 2: After Adjustment */}
        <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/20 p-4 relative shadow-[0_0_15px_rgba(0,240,255,0.08)]">
          <div className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider mb-1">
            PHASE 02: ADAPTIVE MORPH
          </div>
          <h4 className="text-sm font-bold text-white mb-2">Flexi-EMI Staged</h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Lean Season EMI:</span>
              <span className="text-[#00F0FF] font-bold font-mono">₹2,800</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Restructured FOIR:</span>
              <span className="text-emerald-400 font-bold font-mono">43.3% (Safe)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tenure Staged:</span>
              <span className="text-cyan-300 font-mono">+2 Months</span>
            </div>
          </div>
          <div className="mt-3 text-[10px] text-cyan-400 border-t border-cyan-500/20 pt-2">
            Affordable payment maintains positive habit & liquidity continuity.
          </div>
        </div>

        {/* Phase 3: Recovery Phase */}
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 relative shadow-[0_0_15px_rgba(16,185,129,0.08)]">
          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
            PHASE 03: RECOVERY TRACKING
          </div>
          <h4 className="text-sm font-bold text-white mb-2">Harvest Rebound</h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Observed On-Time Rate:</span>
              <span className="text-emerald-400 font-bold font-mono">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Harvest Catch-Up:</span>
              <span className="text-white font-mono">₹5,200 (Nov)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Cumulative Recovery:</span>
              <span className="text-emerald-400 font-bold font-mono">100% Principal</span>
            </div>
          </div>
          <div className="mt-3 text-[10px] text-emerald-400/80 border-t border-emerald-500/20 pt-2">
            Borrower successfully re-enters standard credit cycle without write-off.
          </div>
        </div>
      </div>

      {/* Credit Officer Feedback / Model Calibration Loop */}
      <div className="mt-5 rounded-lg bg-slate-900/80 border border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h5 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
            Did the adjustment improve repayment stability for this borrower?
          </h5>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Your verification calibrates the seasonal stress attribution weights for {borrower.location}.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {feedbackGiven === null ? (
            <>
              <button
                onClick={() => handleFeedback(true)}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>YES, STABILIZED</span>
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-pink-500/40 bg-pink-500/10 px-3 py-1.5 text-xs font-semibold text-pink-400 hover:bg-pink-500/20 transition-all"
              >
                <ThumbsDown className="h-3.5 w-3.5" />
                <span>NO, UNRESOLVED</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Feedback Recorded in Adaptive Weight Matrix</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
