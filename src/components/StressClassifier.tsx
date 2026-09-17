import React from 'react';
import { Layers, Activity, CheckCircle2, AlertTriangle, ArrowRight, Zap, CloudLightning } from 'lucide-react';
import { Borrower } from '../types';

interface StressClassifierProps {
  borrower: Borrower;
  onViewExplanation?: () => void;
}

export const StressClassifier: React.FC<StressClassifierProps> = ({
  borrower,
  onViewExplanation,
}) => {
  const isTransient = borrower.stressType === 'TRANSIENT';
  const isStructural = borrower.stressType === 'STRUCTURAL';

  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <Layers className="h-4 w-4 text-[#00F0FF]" />
          <h3 className="text-xs font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
            DUAL-LAYER STRESS ENGINE
          </h3>
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full">
          <Zap className="h-3 w-3 text-cyan-400" />
          <span>REAL-TIME TELEMETRY</span>
        </div>
      </div>

      {/* Layer 01 & Layer 02 Architecture Visual */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Layer 01: Transient Stress Card */}
        <div
          className={`relative rounded-lg p-3.5 border transition-all ${
            isTransient
              ? 'border-cyan-500/60 bg-cyan-950/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
              : 'border-slate-800 bg-slate-900/40 opacity-70'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400 font-semibold">
              LAYER 01
            </span>
            {isTransient && (
              <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded">
                ACTIVE SIGNAL
              </span>
            )}
          </div>
          <h4 className="text-sm font-bold text-white mb-1">TRANSIENT STRESS</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Cyclical anomalies, delayed harvest sales, monsoon variance, or temporary supply interruptions with intact underlying viability.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1 text-[10px] text-slate-400">
            <span className="bg-slate-800/70 px-1.5 py-0.5 rounded">Crop Cycle Lag</span>
            <span className="bg-slate-800/70 px-1.5 py-0.5 rounded">Mandi Delays</span>
            <span className="bg-slate-800/70 px-1.5 py-0.5 rounded">Rainfall Deficit</span>
          </div>
        </div>

        {/* Layer 02: Structural Stress Card */}
        <div
          className={`relative rounded-lg p-3.5 border transition-all ${
            isStructural
              ? 'border-pink-500/60 bg-pink-950/20 shadow-[0_0_15px_rgba(255,0,122,0.1)]'
              : 'border-slate-800 bg-slate-900/40 opacity-70'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono tracking-wider text-pink-400 font-semibold">
              LAYER 02
            </span>
            {isStructural && (
              <span className="text-[10px] font-bold text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded">
                ACTIVE SIGNAL
              </span>
            )}
          </div>
          <h4 className="text-sm font-bold text-white mb-1">STRUCTURAL STRESS</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Persistent multi-quarter revenue contraction, permanent business impairment, or systemic over-indebtedness requiring deep restructuring.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1 text-[10px] text-slate-400">
            <span className="bg-slate-800/70 px-1.5 py-0.5 rounded">Sustained Decline</span>
            <span className="bg-slate-800/70 px-1.5 py-0.5 rounded">Multi-MFI Default</span>
            <span className="bg-slate-800/70 px-1.5 py-0.5 rounded">Closure</span>
          </div>
        </div>
      </div>

      {/* Current Diagnostic Verdict */}
      <div className="mt-4 rounded-lg bg-slate-900/80 border border-slate-800 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              DIAGNOSTIC CLASSIFICATION
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-lg font-bold font-['Chakra_Petch',sans-serif] ${
                  isTransient ? 'text-[#00F0FF]' : isStructural ? 'text-[#FF007A]' : 'text-emerald-400'
                }`}
              >
                {borrower.stressType === 'NONE' ? 'STABLE SOLVENCY' : `${borrower.stressType} STRESS`}
              </span>
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                Confidence: {borrower.stressConfidence}%
              </span>
            </div>
          </div>

          <button
            onClick={onViewExplanation}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-[#00F0FF] hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)]"
          >
            <span>VIEW EXPLANATION</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Evidence Checklist */}
        <div className="mt-3 space-y-1.5 text-xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            Grounded Evidence:
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>Household income temporarily decreased 18% during pre-harvest lean period</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>Regional rainfall anomaly detected (-28% deficit in Mandya canal catchment)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>Mandi sugar mill crushing weighment receipts delayed by 18 days</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>Previous 10-month repayment history stable (clean repayment streak)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
