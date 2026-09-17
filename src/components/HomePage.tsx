import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Network,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Play,
  LogIn,
  Sliders,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Lock,
  Building2,
  Calendar,
  FileText,
  UserCheck
} from 'lucide-react';
import { CyberButterfly } from './CyberButterfly';

interface HomePageProps {
  onLaunchConsole: (targetTab?: string) => void;
  onGoToLogin: () => void;
  onRunSimulation: () => void;
}

export function HomePage({ onLaunchConsole, onGoToLogin, onRunSimulation }: HomePageProps) {
  const [activeComparisonTab, setActiveComparisonTab] = useState<'legacy' | 'flexilend'>('flexilend');

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0A0A0F]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <CyberButterfly size={36} animated />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-extrabold tracking-wider text-white font-['Chakra_Petch',sans-serif] group-hover:text-[#00F0FF] transition-colors">
                    FLEXILEND
                  </span>
                  <span className="rounded bg-cyan-500/10 border border-cyan-500/30 px-1.5 py-0.5 text-[9px] font-mono text-[#00F0FF] font-bold">
                    MIDDLEWARE
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>INTELLIGENT ADAPTIVE REPAYMENT ENGINE</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-xs font-mono text-slate-300">
              <a href="#problem-solution" className="hover:text-cyan-400 transition-colors">
                VALUE ENGINE
              </a>
              <a href="#features" className="hover:text-cyan-400 transition-colors">
                PLATFORM MODULES
              </a>
              <a href="#case-study" className="hover:text-cyan-400 transition-colors">
                CASE TELEMETRY
              </a>
              <a href="#compliance" className="hover:text-cyan-400 transition-colors">
                RBI COMPLIANCE
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onGoToLogin}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
              >
                <LogIn className="h-3.5 w-3.5 text-cyan-400" />
                <span>SIGN IN</span>
              </button>

              <button
                onClick={() => onLaunchConsole('dashboard')}
                className="relative inline-flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-95 transition-all font-mono"
              >
                <span>LAUNCH CONSOLE</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/60">
        {/* Glow & Cyber grid effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-300">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>B2B Middleware for MFIs, NBFCs & Rural Banks</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Chakra_Petch',sans-serif] leading-[1.1]">
                Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-red-400">Static Debt</span> into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-purple-400">
                  Adaptive Repayment Intelligence
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Rural and microfinance borrowers face volatile cash flows from crop cycles and seasonal shocks, while legacy loan systems enforce rigid monthly EMIs. FlexiLend sits as non-invasive middleware to ingest continuous telemetry, enforce the <span className="text-cyan-300 font-semibold">RBI 50% FOIR statutory ceiling</span>, and safely morph schedules without sacrificing lender liquidity.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onLaunchConsole('dashboard')}
                  className="inline-flex items-center space-x-2 rounded-xl bg-[#00F0FF] px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] active:scale-95 transition-all font-mono"
                >
                  <Activity className="h-4 w-4" />
                  <span>OPEN MIDDLEWARE CONSOLE</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>

                <button
                  onClick={onRunSimulation}
                  className="inline-flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/90 px-5 py-3 text-sm font-bold text-slate-200 hover:border-cyan-500/60 hover:text-cyan-300 hover:bg-slate-800 transition-all font-mono shadow-sm"
                >
                  <Play className="h-4 w-4 text-cyan-400 fill-cyan-400" />
                  <span>START 12-STEP SIMULATION</span>
                </button>

                <button
                  onClick={onGoToLogin}
                  className="inline-flex items-center space-x-2 rounded-xl border border-slate-800 px-4 py-3 text-sm font-mono text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                >
                  <UserCheck className="h-4 w-4 text-slate-400" />
                  <span>DEMO PERSONA LOGIN</span>
                </button>
              </div>

              {/* Verified Metrics Strip */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80">
                <div className="border-l-2 border-cyan-500 pl-3">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white">₹186.4 Cr</div>
                  <div className="text-[11px] font-mono text-slate-400">Monitored Portfolio</div>
                </div>
                <div className="border-l-2 border-emerald-500 pl-3">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">78.4%</div>
                  <div className="text-[11px] font-mono text-slate-400">Adaptive Recovery vs 38.2% Static</div>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-purple-300">50% Cap</div>
                  <div className="text-[11px] font-mono text-slate-400">RBI FOIR Statutory Guard</div>
                </div>
                <div className="border-l-2 border-amber-500 pl-3">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">24,860</div>
                  <div className="text-[11px] font-mono text-slate-400">Borrower Network Monitored</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Teaser Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono text-slate-300 font-bold">LIVE TELEMETRY INTERCEPT</span>
                  </div>
                  <span className="rounded bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                    MANDYA DISTRICT CLUSTER
                  </span>
                </div>

                {/* Borrower Snapshot */}
                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">Ramesh Kumar (Sugarcane Farmer)</div>
                      <div className="text-xs text-slate-400 font-mono">Gejjalagere, Mandya • SHG-104</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                      TRANSIENT STRESS
                    </span>
                  </div>

                  {/* Cash Flow vs EMI Dynamic Transformation */}
                  <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80 space-y-2.5">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Monsoon Rainfall Deficit:</span>
                      <span className="text-rose-400 font-bold">-28% vs Normal</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Sugar Mill Crushing Delay:</span>
                      <span className="text-amber-400 font-bold">+18 Days</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Pre-Adjustment Household FOIR:</span>
                      <span className="text-rose-400 font-bold">58.4% (Violates RBI Cap)</span>
                    </div>

                    <div className="h-px bg-slate-800 my-1" />

                    {/* Morph visual */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="rounded-lg bg-rose-950/20 border border-rose-500/30 p-2.5">
                        <div className="text-[10px] font-mono text-slate-400">Rigid Contractual EMI</div>
                        <div className="text-lg font-mono font-bold text-rose-400 line-through">₹4,500</div>
                        <div className="text-[10px] text-rose-300 mt-1">Default Risk: 92%</div>
                      </div>

                      <div className="rounded-lg bg-cyan-950/30 border border-cyan-500/50 p-2.5 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                        <div className="text-[10px] font-mono text-cyan-300 flex items-center justify-between">
                          <span>FlexiLend Adaptive</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        </div>
                        <div className="text-lg font-mono font-bold text-[#00F0FF]">₹2,800</div>
                        <div className="text-[10px] text-cyan-200 mt-1 font-mono">FOIR: 43.3% • +2 Mo Tenure</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300 font-mono flex items-center justify-between">
                    <span className="text-slate-400">Lender Liquidity Floor:</span>
                    <span className="text-emerald-400 font-bold">₹18.6L Collection (Floor: ₹16.2L) ✓</span>
                  </div>
                </div>

                {/* Teaser CTA */}
                <button
                  onClick={() => onLaunchConsole('planner')}
                  className="w-full mt-2 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-mono font-bold text-cyan-300 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>TEST ADAPTIVE PLANNER IN CONSOLE</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Engine / Problem vs Solution Comparison */}
      <section id="problem-solution" className="py-20 border-b border-slate-800/60 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
              THE STRUCTURAL DILEMMA IN MICROFINANCE
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold font-['Chakra_Petch',sans-serif] text-white">
              Why Traditional Lending Systems Fail Rural Cash Flows
            </p>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Microfinance borrowers experience biological cash flow volatility. Legacy Loan Management Systems (LMS) treat every missed payment as willful delinquency, triggering harsh collection tactics and group contagion.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1 font-mono text-xs">
              <button
                onClick={() => setActiveComparisonTab('legacy')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  activeComparisonTab === 'legacy'
                    ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                LEGACY STATIC LMS MODEL
              </button>
              <button
                onClick={() => setActiveComparisonTab('flexilend')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  activeComparisonTab === 'flexilend'
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                FLEXILEND ADAPTIVE MIDDLEWARE
              </button>
            </div>
          </div>

          {/* Side by side or active view */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 w-fit text-cyan-400">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-['Chakra_Petch',sans-serif] text-white">
                Continuous Telemetry vs Stale Bureau Scores
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                {activeComparisonTab === 'legacy'
                  ? 'Legacy systems rely on 30-day delayed bureau pull data. By the time a score drops, the borrower is already in late-stage default.'
                  : 'FlexiLend ingests daily/weekly telemetry from Account Aggregator, milk dairy payments, and APMC Mandi weighment OCR receipts to detect stress 45 days in advance.'}
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-300">
                {activeComparisonTab === 'legacy' ? '• 30-day lag on distress recognition' : '• 45-day preemptive warning horizon'}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 w-fit text-purple-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-['Chakra_Petch',sans-serif] text-white">
                Dual-Layer Stress vs Uniform Penalties
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                {activeComparisonTab === 'legacy'
                  ? 'Imposes automatic bounce fees and penal interest on farmers whose harvest was delayed by rain, exacerbating insolvency.'
                  : 'Distinguishes Layer 01 Transient Stress (weather anomaly, delayed mandi mill) from Layer 02 Structural Default using SHAP explainable AI.'}
              </p>
              <div className="pt-2 text-[11px] font-mono text-purple-300">
                {activeComparisonTab === 'legacy' ? '• Penal interest triggers distress sales' : '• Empathetic lean-period EMI reduction'}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 w-fit text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-['Chakra_Petch',sans-serif] text-white">
                Deterministic RBI 50% FOIR Compliance
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                {activeComparisonTab === 'legacy'
                  ? 'Ignores cumulative inter-MFI borrowing until regulatory inspections, risking systemic over-indebtedness fines.'
                  : 'Enforces strict mathematical ceiling: total household debt service cannot exceed 50% of verified monthly household cash flow as per RBI 2022 guidelines.'}
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-300">
                {activeComparisonTab === 'legacy' ? '• Non-compliant household over-leveraging' : '• 100% automated regulatory audit trail'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Modules Breakdown */}
      <section id="features" className="py-20 border-b border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">ARCHITECTURE MODULES</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Chakra_Petch',sans-serif] text-white mt-2">
                A Complete Middleware Stack
              </h2>
            </div>
            <button
              onClick={() => onLaunchConsole('architecture')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>EXPLORE TOPOLOGY DIAGRAM</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => onLaunchConsole('planner')}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Sliders className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-400">MODULE 01</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Flexi-EMI Morphing Planner
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Dynamically computes lean-period EMI reductions, balloon catch-up installments during harvest windfalls, and tenure extensions.
              </p>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onLaunchConsole('stress')}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-purple-400">MODULE 02</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                Dual-Layer Stress Classifier & XAI
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Uses SHAP feature attributions and server-side Gemini intelligence to explain root causes: rainfall anomaly, Mandi delays, and healthcare emergencies.
              </p>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onLaunchConsole('shg')}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Network className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-emerald-400">MODULE 03</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                SHG / JLG Peer Contagion Firebreak
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Maps Self-Help Group dependency topologies to prevent one borrower's distress from cascading into collective group refusal.
              </p>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => onLaunchConsole('ingestion')}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400">MODULE 04</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Multimodal OCR & Aggregator Ingress
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Ingests paper APMC Mandi receipts, cooperative milk vouchers, and pump electricity bills with automated confidence extraction.
              </p>
            </div>

            {/* Card 5 */}
            <div
              onClick={() => onLaunchConsole('recovery')}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-amber-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-amber-400">MODULE 05</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Closed-Loop Recovery Tracking
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Demonstrates that adaptive borrowers achieve 78.4% cure rates compared to only 38.2% under rigid coercive collection.
              </p>
            </div>

            {/* Card 6 */}
            <div
              onClick={() => onLaunchConsole('audit')}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-400">MODULE 06</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Tamper-Evident Regulatory Audit Logs
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Every policy modification, EMI adjustment, and FOIR check is cryptographically recorded for seamless RBI compliance inspections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="case-study" className="py-20 border-b border-slate-800/60 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">EMPIRICAL BENCHMARK</span>
              <h2 className="text-3xl font-extrabold font-['Chakra_Petch',sans-serif] text-white">
                Ramesh Kumar's Trajectory: Default vs Resilience
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                In July 2026, sugarcane farmers in Mandya experienced a 28% rainfall deficit. Under a standard contract, Ramesh would have defaulted, had his credit score destroyed, and turned to moneylenders.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                FlexiLend automatically lowered his EMI from ₹4,500 to ₹2,800 for 3 months, kept household FOIR at 43.3%, and restored the standard schedule once Mandi auction proceeds cleared in October.
              </p>

              <div className="pt-2 flex items-center space-x-4">
                <button
                  onClick={() => onLaunchConsole('dashboard')}
                  className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
                >
                  <span>INSPECT RAMESH IN DASHBOARD</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-3">
                  <span className="text-slate-400">OUTCOME COMPARISON MATRIX</span>
                  <span className="text-cyan-400 font-bold">MANDYA SUGARCANE COHORT</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-rose-950/20 border border-rose-500/30 p-4 space-y-2">
                    <div className="text-xs font-mono font-bold text-rose-400 flex items-center space-x-1.5">
                      <AlertTriangle className="h-4 w-4" />
                      <span>STATIC EMI OUTCOME</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                      <li>• Missed 2 consecutive installments</li>
                      <li>• PAR 30 delinquency triggered</li>
                      <li>• High SHG peer conflict in village</li>
                      <li>• Net Lender Recovery: <strong>38.2%</strong></li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-cyan-950/20 border border-cyan-500/40 p-4 space-y-2">
                    <div className="text-xs font-mono font-bold text-cyan-300 flex items-center space-x-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>FLEXILEND RECOVERY</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                      <li>• Zero missed payment marks on bureau</li>
                      <li>• FOIR strictly contained at 43.3%</li>
                      <li>• High trust & zero peer harassment</li>
                      <li>• Net Lender Recovery: <strong>78.4%</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory & Institutional Assurance */}
      <section id="compliance" className="py-16 border-b border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">REGULATORY ALIGNMENT</h2>
            <p className="text-2xl font-bold font-['Chakra_Petch',sans-serif] text-white">
              Built Specifically for the RBI Microfinance Master Directions 2022
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <ShieldCheck className="h-6 w-6 text-cyan-400 mb-3" />
              <h4 className="text-sm font-bold text-white">50% FOIR Statutory Cap</h4>
              <p className="text-xs text-slate-400 mt-1">
                Deterministic ceiling mathematically guarantees repayments never exceed 50% of monthly household income.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <Building2 className="h-6 w-6 text-purple-400 mb-3" />
              <h4 className="text-sm font-bold text-white">Zero Core-Banking Disruption</h4>
              <p className="text-xs text-slate-400 mt-1">
                Plugs directly into Finacle, Temenos, and Mambu via REST webhooks without migrating database engines.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <Lock className="h-6 w-6 text-emerald-400 mb-3" />
              <h4 className="text-sm font-bold text-white">Non-Coercive Outreach</h4>
              <p className="text-xs text-slate-400 mt-1">
                Automates respectful vernacular communication and removes the need for high-pressure recovery agents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-6">
          <CyberButterfly size={48} animated />
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Chakra_Petch',sans-serif] text-white">
            Experience Adaptive Lending Intelligence
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Test the live platform with realistic rural borrower telemetry, interactive stress simulations, and automated RBI compliance reporting.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => onLaunchConsole('dashboard')}
              className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-95 transition-all font-mono"
            >
              <span>ENTER MIDDLEWARE CONSOLE</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onGoToLogin}
              className="inline-flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-mono text-slate-200 hover:border-cyan-500/60 hover:text-cyan-300 transition-all"
            >
              <LogIn className="h-4 w-4 text-cyan-400" />
              <span>INSTITUTIONAL LOGIN</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#07070B] py-8 text-xs font-mono text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>FLEXILEND MIDDLEWARE • VERSION 3.8 PRODUCTION READY</span>
          </div>
          <div className="flex items-center space-x-6 text-slate-400">
            <button onClick={() => onLaunchConsole('research')} className="hover:text-cyan-300">
              Regulatory Framework
            </button>
            <button onClick={() => onLaunchConsole('market-gap')} className="hover:text-cyan-300">
              LMS Market Comparison
            </button>
            <button onClick={onGoToLogin} className="hover:text-cyan-300">
              Authorized Sign In
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
