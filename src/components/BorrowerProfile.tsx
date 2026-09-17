import React from 'react';
import {
  User,
  MapPin,
  Briefcase,
  Phone,
  CreditCard,
  Percent,
  Calendar,
  Layers,
  CloudRain,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  History
} from 'lucide-react';
import { Borrower, Transaction } from '../types';
import { formatINR, calculateFOIR } from '../utils/financial';
import { CashFlowChart } from './CashFlowChart';
import { generateCashFlowTimeline } from '../utils/financial';

interface BorrowerProfileProps {
  borrower: Borrower;
  transactions: Transaction[];
  onOpenPlanner?: () => void;
  onOpenXAI?: () => void;
}

export const BorrowerProfile: React.FC<BorrowerProfileProps> = ({
  borrower,
  transactions,
  onOpenPlanner,
  onOpenXAI,
}) => {
  const cashFlowTimeline = generateCashFlowTimeline(borrower);
  const totalObligations = borrower.currentEMI + borrower.otherMFIEmis;
  const foir = calculateFOIR(totalObligations, borrower.householdIncome);

  const borrowerTxns = transactions.filter((t) => t.borrowerId === borrower.id);

  return (
    <div className="space-y-5">
      {/* Borrower Identity Header Banner */}
      <div className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 text-[#00F0FF] font-['Chakra_Petch',sans-serif] text-2xl font-bold">
              {borrower.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-white font-['Chakra_Petch',sans-serif]">
                  {borrower.name}
                </h2>
                <span className="font-mono text-xs text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                  {borrower.borrowerId}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                    borrower.riskStatus === 'TEMPORARY_STRESS'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : borrower.riskStatus === 'STRUCTURAL_RISK'
                      ? 'bg-pink-500/20 text-[#FF007A] border border-pink-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {borrower.riskStatus.replace('_', ' ')}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  {borrower.location}, {borrower.state}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-purple-400" />
                  {borrower.occupation} ({borrower.primaryCropOrBusiness})
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  {borrower.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            {onOpenXAI && (
              <button
                onClick={onOpenXAI}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-[#00F0FF] transition-all"
              >
                Explain Risk (XAI)
              </button>
            )}
            {onOpenPlanner && (
              <button
                onClick={onOpenPlanner}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all font-mono"
              >
                Adaptive Repayment
              </button>
            )}
          </div>
        </div>

        {/* 6 Key Borrower Financial Parameters */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-800/80">
          <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Loan Amount</span>
            <span className="text-base font-bold text-white font-['Chakra_Petch',sans-serif]">
              {formatINR(borrower.loanAmount)}
            </span>
          </div>

          <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Current EMI</span>
            <span className="text-base font-bold text-[#00F0FF] font-['Chakra_Petch',sans-serif]">
              {formatINR(borrower.currentEMI)}
            </span>
          </div>

          <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Monthly Income</span>
            <span className="text-base font-bold text-white font-['Chakra_Petch',sans-serif]">
              {formatINR(borrower.householdIncome)}
            </span>
          </div>

          <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Household FOIR</span>
            <span className="text-base font-bold text-amber-400 font-['Chakra_Petch',sans-serif]">
              {foir}%
            </span>
          </div>

          <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Group Affiliation</span>
            <span className="text-xs font-bold text-purple-400 font-mono truncate block mt-1">
              {borrower.groupId}
            </span>
          </div>

          <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Weather Anomaly</span>
            <span className="text-base font-bold text-pink-400 font-['Chakra_Petch',sans-serif]">
              {borrower.rainfallDeviationPct}%
            </span>
          </div>
        </div>
      </div>

      {/* 12-Month Cash Flow Timeline Graph */}
      <CashFlowChart
        data={cashFlowTimeline}
        title={`12-MONTH CASH-FLOW TIMELINE: ${borrower.name.toUpperCase()}`}
        subtitle="Visualizing harvest peaks, lean season dips, and the adaptive repayment target"
      />

      {/* Ingested Transactions Table */}
      <div className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
          <div className="flex items-center space-x-2">
            <History className="h-4 w-4 text-[#00F0FF]" />
            <h3 className="text-xs font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
              TELEMETRY TRANSACTIONS & RECORDED SLIPS
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {borrowerTxns.length} Verified Entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-500">
                <th className="pb-2">Date</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Source</th>
                <th className="pb-2">Merchant / Party</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {borrowerTxns.length > 0 ? (
                borrowerTxns.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-800/30">
                    <td className="py-2.5 text-slate-300">{txn.date}</td>
                    <td className="py-2.5 text-slate-200">{txn.category}</td>
                    <td className="py-2.5">
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-cyan-400">
                        {txn.source}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-300 max-w-xs truncate">{txn.merchantOrParty}</td>
                    <td
                      className={`py-2.5 text-right font-bold ${
                        txn.type === 'CREDIT' ? 'text-emerald-400' : 'text-slate-300'
                      }`}
                    >
                      {txn.type === 'CREDIT' ? '+' : '-'}
                      {formatINR(txn.amount)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-slate-500">
                    No transactions ingested yet for this borrower.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
