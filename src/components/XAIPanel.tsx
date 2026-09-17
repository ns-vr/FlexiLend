import React, { useState } from 'react';
import { Sparkles, BrainCircuit, BarChart3, Database, ChevronDown, ChevronUp, Check, ShieldAlert } from 'lucide-react';
import { Borrower, RepaymentPlan, XAIDriver } from '../types';
import { formatINR } from '../utils/financial';

interface XAIPanelProps {
  borrower: Borrower;
  plan: RepaymentPlan;
  drivers: XAIDriver[];
  aiExplanation?: {
    summary: string;
    evidence: string[];
    impact: string;
    recommendation: string;
  };
  isLoading?: boolean;
}

export const XAIPanel: React.FC<XAIPanelProps> = ({
  borrower,
  plan,
  drivers,
  aiExplanation,
  isLoading = false,
}) => {
  const [showSourceData, setShowSourceData] = useState(false);

  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="h-5 w-5 text-[#00F0FF]" />
          <div>
            <h3 className="text-sm font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
              WHY DID FLEXILEND RECOMMEND THIS?
            </h3>
            <p className="text-[11px] text-slate-400">
              Transparent SHAP-style attribution & algorithmic rationale
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs">
            <span className="text-slate-400 mr-1.5">Adjustment:</span>
            <span className="line-through text-slate-500 font-mono mr-1.5">{formatINR(plan.currentEMI)}</span>
            <span className="font-bold text-[#00F0FF] font-mono">{formatINR(plan.proposedEMI)}</span>
          </div>
        </div>
      </div>

      {/* Top Drivers Attribution Bars */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Key Contributing Drivers (% Weighting)
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            Positive: Strains Affordability | Negative: Dampens Risk
          </span>
        </div>

        <div className="space-y-2.5">
          {drivers.map((driver, idx) => {
            const isPositive = driver.contributionPct > 0;
            const absVal = Math.abs(driver.contributionPct);

            return (
              <div key={idx} className="rounded-lg bg-slate-900/50 p-2.5 border border-slate-800/70">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-slate-200 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isPositive ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                    />
                    {driver.name}
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      isPositive ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {isPositive ? `+${driver.contributionPct}%` : `${driver.contributionPct}%`}
                  </span>
                </div>

                {/* Contribution Bar */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isPositive
                        ? 'bg-gradient-to-r from-amber-500 to-pink-500'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.min(absVal * 2.5, 100)}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400 mt-1.5 flex justify-between items-center">
                  <span className="truncate">{driver.evidenceValue}</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase shrink-0 ml-2">
                    {driver.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Narrative Section */}
      <div className="mt-5 rounded-lg bg-slate-900/90 border border-slate-800 p-4 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-[#00F0FF]" />
            <span>AI EXPLAINABILITY SYNTHESIS (GEMINI ENGINE)</span>
          </div>
          {isLoading && (
            <span className="text-[10px] font-mono text-cyan-400 animate-pulse">
              ANALYZING TELEMETRY...
            </span>
          )}
        </div>

        <p className="text-xs text-slate-300 leading-relaxed italic">
          "{aiExplanation?.summary ||
            'Repayment was reduced because verified income declined during a seasonal disruption. Historical payment behavior remains stable and the detected signals are consistent with temporary stress rather than persistent deterioration.'}"
        </p>

        {aiExplanation?.evidence && aiExplanation.evidence.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Evaluated Verification Points:
            </span>
            {aiExplanation.evidence.map((ev, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                <Check className="h-3 w-3 text-cyan-400 mt-0.5 shrink-0" />
                <span>{ev}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-800/80">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Impact</span>
            <span className="text-slate-300">
              {aiExplanation?.impact ||
                'Maintains debt continuity while protecting household subsistence cash flow.'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Recommendation</span>
            <span className="text-cyan-300">
              {aiExplanation?.recommendation ||
                'Approve 3-month temporary relief. Re-evaluate post-harvest in Month 11.'}
            </span>
          </div>
        </div>

        {/* Source Data Collapsible */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={() => setShowSourceData(!showSourceData)}
            className="flex items-center justify-between w-full text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-cyan-400" />
              SHOW SOURCE TELEMETRY DATA
            </span>
            {showSourceData ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showSourceData && (
            <div className="mt-3 rounded bg-slate-950 p-3 font-mono text-[11px] text-slate-300 space-y-1.5 border border-slate-800">
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">APMC Mandi Yard:</span>
                <span className="text-cyan-400">{borrower.lastMandiTransaction}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">IMD Rainfall Deficit:</span>
                <span className="text-pink-400">{borrower.rainfallDeviationPct}% vs 10-yr mean</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">Repayment Consistency:</span>
                <span className="text-emerald-400">100% on-time (10 consecutive cycles)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pre-Adjustment FOIR:</span>
                <span className="text-amber-400">{plan.foirBefore}% (Ceiling: 50%)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-500">
        <ShieldAlert className="h-3 w-3 text-slate-500 shrink-0" />
        <span>
          Prototype XAI audit trail: Designed for credit officer transparency. Not an RBI-certified audit.
        </span>
      </div>
    </div>
  );
};
