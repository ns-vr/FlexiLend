import React from 'react';
import { Check, X, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { CyberButterfly } from './CyberButterfly';

interface ComparisonRow {
  dimension: string;
  traditionalLMS: string;
  flexiLend: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    dimension: 'Repayment Structure',
    traditionalLMS: 'Rigid fixed-EMI schedule regardless of crop failure, rainfall deficit, or lean seasons.',
    flexiLend: 'Dynamic cash-flow synchronized Flexi-EMI with automated lean dips & harvest catch-up.',
  },
  {
    dimension: 'Data Telemetry',
    traditionalLMS: 'Static credit bureau snapshots at origination; zero visibility between monthly cycles.',
    flexiLend: 'Continuous hybrid ingestion: Account Aggregator, UPI, milk union slips, and Gemini Vision OCR mandi receipts.',
  },
  {
    dimension: 'Stress Detection',
    traditionalLMS: 'Lagging PAR 30/60/90 default recognition after payments have already bounced.',
    flexiLend: 'Preemptive Dual-Layer Stress Engine (Transient cyclical vs Structural insolvency) 15-45 days prior.',
  },
  {
    dimension: 'Regulatory Compliance',
    traditionalLMS: 'Static FOIR checked only once at loan inception; unmonitored during mid-loan stress.',
    flexiLend: 'Continuous FOIR Guard dynamically ensuring household debt service remains under the 50% RBI ceiling.',
  },
  {
    dimension: 'Group Liability (SHG/JLG)',
    traditionalLMS: 'Treats peer delinquency as individual fraud; forces group members into severe social friction.',
    flexiLend: 'Interactive SHG Contagion Network graph isolating regional external shocks from moral hazard.',
  },
  {
    dimension: 'Explainability & Auditing',
    traditionalLMS: 'Opaque black-box scoring or rigid branch manager discretion without formal rationale.',
    flexiLend: 'SHAP-style quantitative feature weights coupled with plain-language Gemini audit synthesis.',
  },
  {
    dimension: 'Lender Liquidity Safety',
    traditionalLMS: 'Ad-hoc moratoriums that threaten NBFC ALM and cash reserves.',
    flexiLend: 'Hardcoded MFI Liquidity Floor Balancer safeguarding portfolio cash requirements before approvals.',
  },
  {
    dimension: 'Borrower Communication',
    traditionalLMS: 'Aggressive collection agent calls, intimidating legal notices, and stigmatizing visits.',
    flexiLend: 'Empathetic automated notifications via WhatsApp/SMS explaining adjusted obligations respectfully.',
  },
  {
    dimension: 'Empirical Loan Recovery',
    traditionalLMS: '38.2% recovery under coercive collection and write-offs.',
    flexiLend: '78.4% recovery after proactive adaptive restructuring.',
  },
  {
    dimension: 'Core Banking Integration',
    traditionalLMS: 'Requires high-risk multi-year rip-and-replace core LMS transformations.',
    flexiLend: 'Non-invasive B2B middleware layer integrating via webhooks and REST adapters with Finacle, Tally, etc.',
  },
];

export const MarketGapView: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <CyberButterfly size={32} />
          <div>
            <h2 className="text-lg font-bold text-white font-['Chakra_Petch',sans-serif]">
              MARKET GAP & COMPETITIVE COMPARISON MATRIX
            </h2>
            <p className="text-xs text-slate-400">
              Why traditional loan management systems fail low-income borrowers — and how FlexiLend transforms microfinance middleware
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4 w-1/4">Evaluation Dimension</th>
                <th className="py-3 px-4 w-[37%] text-pink-400">Traditional LMS / Static Banking</th>
                <th className="py-3 px-4 w-[38%] text-[#00F0FF] bg-cyan-950/20">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#00F0FF]" />
                    <span>FlexiLend Adaptive Middleware</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white font-['Chakra_Petch',sans-serif]">
                    {row.dimension}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 leading-relaxed">
                    <div className="flex items-start space-x-2">
                      <X className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
                      <span>{row.traditionalLMS}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-200 leading-relaxed bg-cyan-950/10">
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span className="font-medium text-white">{row.flexiLend}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
