import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Layers,
  Activity,
  BrainCircuit,
  UploadCloud,
  Network
} from 'lucide-react';
import { CyberButterfly } from './CyberButterfly';

interface SimulationStep {
  step: number;
  title: string;
  summary: string;
  detail: string;
  targetView: string;
  metricHighlight: string;
}

const SIMULATION_STEPS: SimulationStep[] = [
  {
    step: 1,
    title: 'Ingest Borrower Profile',
    summary: 'Ramesh Kumar (Mandya, Karnataka) - ₹85,000 agricultural loan active.',
    detail: 'Core Banking System syncs contractual loan details: ₹4,500 monthly EMI, 10-month pristine repayment track record.',
    targetView: 'profile',
    metricHighlight: 'Loan: ₹85,000 • EMI: ₹4,500',
  },
  {
    step: 2,
    title: 'Cash-Flow Anomaly Detected',
    summary: 'Monthly household income dips 18% during pre-harvest lean window.',
    detail: 'Continuous account aggregator & APMC weighment slips reveal sugarcane harvest delay, lowering monthly income to ₹21,000.',
    targetView: 'cashflow',
    metricHighlight: 'Income: ₹28,000 → ₹21,000 (-18%)',
  },
  {
    step: 3,
    title: 'Regional Weather Correlation',
    summary: 'IMD regional sensor detects -28% rainfall anomaly in Mandya canal basin.',
    detail: 'External satellite & meteorology stream feeds regional stress context to eliminate borrower-specific moral hazard.',
    targetView: 'stress',
    metricHighlight: 'Rainfall Deficit: -28%',
  },
  {
    step: 4,
    title: 'Cash-Flow Recalculation',
    summary: 'Disposable income falls into negative territory under static ₹4,500 EMI.',
    detail: 'Under a rigid fixed schedule, household basic sustenance would be compromised, accelerating default risk.',
    targetView: 'cashflow',
    metricHighlight: 'Surplus: -₹1,500 Deficit',
  },
  {
    step: 5,
    title: 'FOIR Regulatory Evaluation',
    summary: 'Household debt obligations hit 57%, breaching the 50% RBI ceiling.',
    detail: 'FlexiLend FOIR Guard flags violation: ₹4,500 EMI + ₹1,700 other obligations exceed 50% of ₹21,000 income.',
    targetView: 'foir',
    metricHighlight: 'FOIR: 57.0% (BREACH >50%)',
  },
  {
    step: 6,
    title: 'Dual-Layer Stress Classification',
    summary: 'Classified as TRANSIENT STRESS with 82% algorithmic confidence.',
    detail: 'Layer 01 confirms temporary crop-cycle lag with viable future harvest rather than permanent business deterioration.',
    targetView: 'stress',
    metricHighlight: 'Signal: TRANSIENT (82% Conf)',
  },
  {
    step: 7,
    title: 'SHG Cluster Contagion Analysis',
    summary: 'Kaveri Mahila Sangha (SHG-104) analyzed for peer contagion risk.',
    detail: 'Joint liability network reveals 3 peers facing identical sugar mill delays; isolates systemic local issue from fraud.',
    targetView: 'shg',
    metricHighlight: 'SHG Contagion: MODERATE',
  },
  {
    step: 8,
    title: 'Explainable AI (XAI) Attribution',
    summary: 'SHAP-style drivers isolate seasonal dip (+32%) and rainfall (+24%).',
    detail: 'Gemini synthesis generates transparent plain-language audit justification for credit officer review.',
    targetView: 'xai',
    metricHighlight: 'Top Driver: Seasonal Dip (+32%)',
  },
  {
    step: 9,
    title: 'Adaptive Flexi-EMI Generated',
    summary: 'Monthly obligation dynamically lowered: ₹4,500 → ₹2,800 for 3 months.',
    detail: 'Tenure extended by +2 months; post-adjustment FOIR recovers to 43.3% within safe regulatory bounds.',
    targetView: 'planner',
    metricHighlight: 'Flexi-EMI: ₹2,800 • FOIR: 43.3%',
  },
  {
    step: 10,
    title: 'Lender Liquidity Floor Verified',
    summary: 'MFI Portfolio Collection protected at ₹17.4L (> ₹16.2L statutory floor).',
    detail: 'Liquidity Balancer verifies portfolio-wide liquidity buffer before staging the loan modification.',
    targetView: 'planner',
    metricHighlight: 'MFI Floor: PROTECTED (+₹1.2L buffer)',
  },
  {
    step: 11,
    title: 'Empathetic Borrower Alert Dispatched',
    summary: 'Simulated WhatsApp message delivered to Ramesh Kumar in vernacular tone.',
    detail: 'Notification explains the adjusted ₹2,800 EMI without aggressive collection threats, preserving borrower trust.',
    targetView: 'alerts',
    metricHighlight: 'WhatsApp Dispatched to +91 98451 22910',
  },
  {
    step: 12,
    title: 'Closed-Loop Recovery Initiated',
    summary: 'Harvest catch-up planned for Month 11 (November) with 78.4% projected recovery.',
    detail: 'Borrower transitions into monitored recovery phase, avoiding bad debt provisioning or coercive recovery agents.',
    targetView: 'recovery',
    metricHighlight: 'Recovery: 78.4% vs 38.2% Static',
  },
];

interface LiveSimulationProps {
  onNavigateView: (view: string) => void;
  onCompleteSimulation?: () => void;
}

export const LiveSimulation: React.FC<LiveSimulationProps> = ({
  onNavigateView,
  onCompleteSimulation,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = SIMULATION_STEPS[currentStepIdx];

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < SIMULATION_STEPS.length - 1) {
            const next = prev + 1;
            onNavigateView(SIMULATION_STEPS[next].targetView);
            return next;
          } else {
            setIsPlaying(false);
            onCompleteSimulation?.();
            return prev;
          }
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, onNavigateView, onCompleteSimulation]);

  const goToStep = (idx: number) => {
    setCurrentStepIdx(idx);
    onNavigateView(SIMULATION_STEPS[idx].targetView);
  };

  const handleNext = () => {
    if (currentStepIdx < SIMULATION_STEPS.length - 1) {
      goToStep(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      goToStep(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    goToStep(0);
  };

  return (
    <div className="rounded-xl border border-cyan-500/40 bg-[#0F0F1A]/95 p-5 shadow-[0_0_30px_rgba(0,240,255,0.12)] backdrop-blur-xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-2xl pointer-events-none" />

      {/* Header with Butterfly */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <CyberButterfly size={36} animated={isPlaying} />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                LIVE DEMO ENGINE
              </span>
              <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-[#00F0FF]">
                12-STEP METAMORPHOSIS
              </span>
            </div>
            <h3 className="text-base font-bold text-white font-['Chakra_Petch',sans-serif]">
              Rigid Loan → Adaptive Financial Structure
            </h3>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`inline-flex items-center space-x-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                : 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-cyan-400'
            }`}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isPlaying ? 'PAUSE STORY' : 'AUTO-PLAY DEMO'}</span>
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white disabled:opacity-30"
            title="Previous Step"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIdx === SIMULATION_STEPS.length - 1}
            className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white disabled:opacity-30"
            title="Next Step"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          <button
            onClick={handleReset}
            className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Stepper Dots Bar */}
      <div className="mt-4 flex items-center justify-between gap-1 overflow-x-auto py-2">
        {SIMULATION_STEPS.map((step, idx) => {
          const isActive = idx === currentStepIdx;
          const isPassed = idx < currentStepIdx;

          return (
            <button
              key={step.step}
              onClick={() => goToStep(idx)}
              className={`flex-1 min-w-[28px] h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#00F0FF] to-[#FF007A] shadow-[0_0_10px_rgba(0,240,255,0.8)] scale-y-125'
                  : isPassed
                  ? 'bg-cyan-700/60'
                  : 'bg-slate-800'
              }`}
              title={`Step ${step.step}: ${step.title}`}
            />
          );
        })}
      </div>

      {/* Active Step Showcase Card */}
      <div className="mt-4 rounded-xl bg-slate-900/90 border border-slate-800 p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-[#00F0FF] font-bold">
              STEP {currentStep.step} OF 12
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-purple-400 font-semibold uppercase">{currentStep.title}</span>
          </div>

          <h4 className="text-lg font-bold text-white font-['Chakra_Petch',sans-serif]">
            {currentStep.summary}
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {currentStep.detail}
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center space-y-2.5">
          <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-2.5 text-right w-full">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">
              Observed Impact
            </span>
            <span className="text-sm font-bold text-[#00F0FF] font-mono block mt-0.5">
              {currentStep.metricHighlight}
            </span>
          </div>

          <button
            onClick={() => onNavigateView(currentStep.targetView)}
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300"
          >
            <span>Jump to {currentStep.targetView.toUpperCase()} module</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
