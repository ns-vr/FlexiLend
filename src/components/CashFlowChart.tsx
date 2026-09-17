import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';
import { MonthlyCashFlow } from '../types';
import { formatINR } from '../utils/financial';
import { Calendar, Eye, Activity, CloudRain, Sprout, AlertCircle, RefreshCw } from 'lucide-react';

interface CashFlowChartProps {
  data: MonthlyCashFlow[];
  title?: string;
  subtitle?: string;
  onEventClick?: (note: string) => void;
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({
  data,
  title = 'PORTFOLIO CASH-FLOW & REPAYMENT PRESSURE',
  subtitle = 'Continuous cash-flow telemetry vs scheduled loan obligations',
  onEventClick,
}) => {
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '12M'>('12M');
  const [visibleSeries, setVisibleSeries] = useState({
    income: true,
    expenses: true,
    debtObligation: true,
    disposableIncome: true,
    proposedRepayment: true,
  });
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Filter based on timeRange
  const filteredData = React.useMemo(() => {
    if (timeRange === '1M') return data.slice(-1);
    if (timeRange === '3M') return data.slice(-3);
    if (timeRange === '6M') return data.slice(-6);
    return data;
  }, [data, timeRange]);

  const toggleSeries = (key: keyof typeof visibleSeries) => {
    setVisibleSeries((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const itemData = payload[0]?.payload as MonthlyCashFlow;

    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md text-xs z-50 min-w-[200px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 font-semibold text-slate-200">
          <span>Month: {label}</span>
          {itemData?.eventNote && (
            <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] text-cyan-300 font-normal">
              {itemData.eventNote}
            </span>
          )}
        </div>
        <div className="space-y-1.5 font-mono">
          {payload.map((p: any) => (
            <div key={p.name} className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                {p.name}:
              </span>
              <span className="font-medium text-white">{formatINR(p.value)}</span>
            </div>
          ))}
        </div>
        {itemData?.isHarvestSeason && (
          <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1 pt-1 border-t border-slate-800">
            <Sprout className="h-3 w-3" /> Peak harvest cash-inflow window
          </div>
        )}
        {itemData?.isLeanSeason && (
          <div className="mt-2 text-[10px] text-pink-400 flex items-center gap-1 pt-1 border-t border-slate-800">
            <CloudRain className="h-3 w-3" /> Lean period: vulnerable to payment delay
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-[#00F0FF]" />
            <h3 className="text-sm font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
              {title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-1 bg-slate-900/90 rounded-lg p-1 border border-slate-800">
          {(['1M', '3M', '6M', '12M'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-all ${
                timeRange === range
                  ? 'bg-cyan-500/20 text-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Series Filter Toggles */}
      <div className="flex flex-wrap items-center gap-2 py-3">
        <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
          <Eye className="h-3 w-3" /> Series:
        </span>

        <button
          onClick={() => toggleSeries('income')}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border ${
            visibleSeries.income
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
              : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Income
        </button>

        <button
          onClick={() => toggleSeries('expenses')}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border ${
            visibleSeries.expenses
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
              : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Expenses
        </button>

        <button
          onClick={() => toggleSeries('debtObligation')}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border ${
            visibleSeries.debtObligation
              ? 'bg-pink-500/10 border-pink-500/40 text-[#FF007A]'
              : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-[#FF007A]" />
          Fixed EMI Obligation
        </button>

        <button
          onClick={() => toggleSeries('proposedRepayment')}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border ${
            visibleSeries.proposedRepayment
              ? 'bg-cyan-500/10 border-cyan-500/40 text-[#00F0FF]'
              : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-[#00F0FF]" />
          Flexi-EMI Target
        </button>

        <button
          onClick={() => toggleSeries('disposableIncome')}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border ${
            visibleSeries.disposableIncome
              ? 'bg-purple-500/10 border-purple-500/40 text-[#8A2BE2]'
              : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-[#8A2BE2]" />
          Disposable Surplus
        </button>
      </div>

      {/* Main Recharts Container */}
      <div className="h-72 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              tickFormatter={(v) => `₹${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Visual Markers & Contextual Highlights */}
            {React.createElement(ReferenceArea as any, {
              x1: 'Jan',
              x2: 'Mar',
              fill: '#FF007A',
              fillOpacity: 0.05,
            })}
            {React.createElement(ReferenceArea as any, {
              x1: 'Oct',
              x2: 'Nov',
              fill: '#10B981',
              fillOpacity: 0.05,
            })}

            {/* Series */}
            {visibleSeries.income && (
              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#10B981"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#10B981' }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            )}

            {visibleSeries.expenses && (
              <Line
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#F59E0B"
                strokeWidth={2}
                strokeDasharray="4 2"
                dot={false}
              />
            )}

            {visibleSeries.debtObligation && (
              <Line
                type="stepAfter"
                dataKey="debtObligation"
                name="Fixed Static EMI"
                stroke="#FF007A"
                strokeWidth={2.2}
                dot={false}
              />
            )}

            {visibleSeries.proposedRepayment && (
              <Line
                type="monotone"
                dataKey="proposedRepayment"
                name="Adaptive Flexi-EMI"
                stroke="#00F0FF"
                strokeWidth={3}
                dot={{ r: 4, fill: '#00F0FF' }}
              />
            )}

            {visibleSeries.disposableIncome && (
              <Bar
                dataKey="disposableIncome"
                name="Disposable Surplus"
                fill="#8A2BE2"
                opacity={0.35}
                radius={[4, 4, 0, 0]}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Visual Marker Badges / Annotations */}
      <div className="mt-3 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/60 text-xs">
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
          Observed Milestones:
        </span>
        <button
          onClick={() => {
            setSelectedEvent('Kharif Harvest Peak (Oct-Nov): Inflow surges to ₹39,200');
            onEventClick?.('Harvest Peak');
          }}
          className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] text-emerald-300 hover:bg-emerald-500/20"
        >
          <Sprout className="h-3 w-3" /> Harvest Peak (Nov)
        </button>
        <button
          onClick={() => {
            setSelectedEvent('Lean Crop Season (Feb-Apr): Rainfall deficit -28% reduces cash flow to ₹21,000');
            onEventClick?.('Monsoon Deficit');
          }}
          className="inline-flex items-center gap-1 rounded-full border border-pink-500/30 bg-pink-500/10 px-2.5 py-0.5 text-[10px] text-pink-300 hover:bg-pink-500/20"
        >
          <CloudRain className="h-3 w-3" /> Rainfall Deficit (Feb)
        </button>
        <button
          onClick={() => {
            setSelectedEvent('Mandi Settlement Delay (Mar): Sugar Mill crushing payments delayed 18 days');
            onEventClick?.('Mandi Delay');
          }}
          className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] text-amber-300 hover:bg-amber-500/20"
        >
          <AlertCircle className="h-3 w-3" /> Mandi Delay (Mar)
        </button>
        <button
          onClick={() => {
            setSelectedEvent('Restructuring Activated (Apr): EMI dynamically adjusted ₹4,500 → ₹2,800');
            onEventClick?.('Restructuring');
          }}
          className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] text-[#00F0FF] hover:bg-cyan-500/20"
        >
          <RefreshCw className="h-3 w-3" /> Flexi-EMI Morph (Apr)
        </button>
      </div>

      {selectedEvent && (
        <div className="mt-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 p-2 text-xs text-cyan-200 flex items-center justify-between">
          <span>{selectedEvent}</span>
          <button
            onClick={() => setSelectedEvent(null)}
            className="text-slate-400 hover:text-white text-[10px] ml-2"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
