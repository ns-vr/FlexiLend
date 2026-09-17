import React, { useState } from 'react';
import {
  Layers,
  Database,
  Smartphone,
  Activity,
  ShieldCheck,
  BrainCircuit,
  Sliders,
  Send,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { CyberButterfly } from './CyberButterfly';

interface ArchNode {
  id: string;
  name: string;
  category: 'INGRESS' | 'INTELLIGENCE' | 'GOVERNANCE' | 'OUTLET';
  icon: any;
  description: string;
  inputs: string[];
  outputs: string[];
  latency: string;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: 'cbs',
    name: 'CBS / LMS Core Ingress',
    category: 'INGRESS',
    icon: Database,
    description: 'B2B middleware connectors bridging Finacle, Tally, Mambu, and legacy core banking software via webhook adapters.',
    inputs: ['Bank Database', 'Loan Contracts'],
    outputs: ['Contractual EMI', 'Disbursement Schedules'],
    latency: '< 120ms',
  },
  {
    id: 'ingestion',
    name: 'Hybrid Data Ingestion',
    category: 'INGRESS',
    icon: Smartphone,
    description: 'Aggregates Account Aggregator FIU streams, UPI transactions, milk cooperative tallies, and Gemini Vision OCR mandi receipts.',
    inputs: ['Account Aggregator', 'APMC Receipts', 'Utility Feeds'],
    outputs: ['Normalized Cash Ledger', 'Income Signals'],
    latency: 'Real-time & Batch OCR',
  },
  {
    id: 'cashflow',
    name: 'Continuous Cash-Flow Engine',
    category: 'INTELLIGENCE',
    icon: Activity,
    description: 'Calculates rolling 12-month agricultural seasonality, disposable surplus, harvest flushes, and lean period cash deficits.',
    inputs: ['Normalized Cash Ledger', 'Crop Harvest Calendar'],
    outputs: ['Monthly Disposable Surplus', 'Volatility Delta'],
    latency: '< 45ms',
  },
  {
    id: 'foir',
    name: 'FOIR Regulatory Guard',
    category: 'GOVERNANCE',
    icon: ShieldCheck,
    description: 'Enforces statutory 50% debt-service ceiling across microfinance and non-microfinance indebtedness as per RBI 2022 directives.',
    inputs: ['Household Income', 'Existing Debt Service'],
    outputs: ['FOIR Ratio', 'Breach Flags'],
    latency: '< 15ms',
  },
  {
    id: 'stress',
    name: 'Dual-Layer Stress Classifier',
    category: 'INTELLIGENCE',
    icon: Layers,
    description: 'Disentangles Layer 01 Transient Stress (weather deficits, delayed harvest) from Layer 02 Structural Stress (permanent insolvency).',
    inputs: ['IMD Rainfall', 'APMC Mandi Volume', 'Repayment Track'],
    outputs: ['Stress Diagnostic', 'Confidence Score'],
    latency: '< 60ms',
  },
  {
    id: 'xai',
    name: 'Explainable AI (XAI) Engine',
    category: 'INTELLIGENCE',
    icon: BrainCircuit,
    description: 'SHAP-style attribution vectors combined with Gemini 3.8 Flash to formulate plain-language audit explanations for loan officers.',
    inputs: ['Telemetry Drivers', 'Stress Diagnostic'],
    outputs: ['Feature Weighting Bars', 'Audit Synthesis'],
    latency: '< 450ms',
  },
  {
    id: 'planner',
    name: 'Adaptive Plan & Liquidity Balancer',
    category: 'GOVERNANCE',
    icon: Sliders,
    description: 'Morphs monthly EMI down in lean months and stages harvest catch-up while ensuring total MFI collection exceeds statutory liquidity floors.',
    inputs: ['Disposable Surplus', 'MFI Liquidity Floor Buffer'],
    outputs: ['Flexi-EMI Schedule', 'Tenure Extension'],
    latency: '< 80ms',
  },
  {
    id: 'alerts',
    name: 'Empathetic Notification Gateway',
    category: 'OUTLET',
    icon: Send,
    description: 'Vernacular multi-channel dispatch (WhatsApp/SMS) alerting borrowers of adjusted schedules respectfully without coercive collection pressure.',
    inputs: ['Flexi-EMI Schedule', 'Borrower Phone'],
    outputs: ['WhatsApp Message', 'SMS Dispatch'],
    latency: '< 200ms',
  },
  {
    id: 'recovery',
    name: 'Closed-Loop Calibration Loop',
    category: 'OUTLET',
    icon: RotateCcw,
    description: 'Tracks on-time post-restructuring repayment performance (78.4% recovery) and backpropagates validation weights to the stress model.',
    inputs: ['Post-Restructure Repayment', 'Credit Officer Verification'],
    outputs: ['Model Weight Recalibration', 'Audit Log Entry'],
    latency: 'Continuous',
  },
];

export const ArchitectureView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchNode>(ARCH_NODES[4]);

  return (
    <div className="space-y-5">
      {/* Overview Banner */}
      <div className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <CyberButterfly size={32} />
            <div>
              <h2 className="text-lg font-bold text-white font-['Chakra_Petch',sans-serif]">
                FLEXILEND MIDDLEWARE ARCHITECTURE
              </h2>
              <p className="text-xs text-slate-400">
                End-to-end B2B middleware topology connecting core banking, real-time telemetry, and adaptive loan execution
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 font-mono text-[10px]">
            <span className="rounded bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 text-cyan-300">
              API STATUS: 200 OK
            </span>
            <span className="rounded bg-purple-500/10 border border-purple-500/30 px-2 py-1 text-purple-300">
              GEMINI FLASH v3.8
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Topology Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Topology Nodes Pipeline */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
          <div className="text-xs font-bold text-white uppercase font-mono tracking-wider mb-4 flex items-center justify-between">
            <span>Execution Pipeline (Click to Inspect)</span>
            <span className="text-[10px] text-slate-500 font-normal">Deterministic Finance + Gemini XAI</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ARCH_NODES.map((node, idx) => {
              const Icon = node.icon;
              const isSelected = selectedNode.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`group cursor-pointer rounded-xl border p-3.5 transition-all relative ${
                    isSelected
                      ? 'border-cyan-500/60 bg-cyan-950/20 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                      : 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono text-slate-500">
                      STEP 0{idx + 1}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        node.category === 'INGRESS'
                          ? 'bg-blue-500/10 text-blue-400'
                          : node.category === 'INTELLIGENCE'
                          ? 'bg-cyan-500/10 text-[#00F0FF]'
                          : node.category === 'GOVERNANCE'
                          ? 'bg-purple-500/10 text-purple-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      {node.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 group-hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-white font-['Chakra_Petch',sans-serif] leading-tight">
                      {node.name}
                    </span>
                  </div>

                  <div className="mt-2.5 text-[10px] text-slate-400 line-clamp-2">
                    {node.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Deep-Dive Drawer */}
        <div className="lg:col-span-4 rounded-xl border border-cyan-500/30 bg-slate-900/90 p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            {React.createElement(selectedNode.icon, {
              className: 'h-5 w-5 text-[#00F0FF]',
            })}
            <div>
              <h3 className="text-sm font-bold text-white font-['Chakra_Petch',sans-serif]">
                {selectedNode.name}
              </h3>
              <span className="text-[10px] font-mono text-cyan-400">
                Latency SLA: {selectedNode.latency}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedNode.description}
          </p>

          <div className="space-y-3 text-xs pt-2">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                Upstream Inputs:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.inputs.map((inp, i) => (
                  <span
                    key={i}
                    className="rounded bg-slate-800/80 border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300 font-mono"
                  >
                    {inp}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                Downstream Egress Outputs:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.outputs.map((out, i) => (
                  <span
                    key={i}
                    className="rounded bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 text-[10px] text-cyan-300 font-mono"
                  >
                    {out}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-950/80 border border-slate-800 p-3 text-[11px] text-slate-400">
            <span className="font-semibold text-white block mb-1">Zero Core Disruption Guarantee</span>
            FlexiLend operates as a non-invasive API layer. Core lending systems (LMS) remain the authoritative ledger of record while FlexiLend supplies real-time adaptive servicing instructions.
          </div>
        </div>
      </div>
    </div>
  );
};
