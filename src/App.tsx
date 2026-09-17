import React, { useState, useEffect } from 'react';
import {
  Activity,
  Users,
  Sliders,
  Layers,
  Network,
  UploadCloud,
  Bell,
  RotateCcw,
  Cpu,
  BookOpen,
  Table,
  ShieldCheck,
  Settings,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Play,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Home,
  LogOut
} from 'lucide-react';
import { CyberButterfly } from './components/CyberButterfly';
import { MetricCard } from './components/MetricCard';
import { CashFlowChart } from './components/CashFlowChart';
import { FOIRGauge } from './components/FOIRGauge';
import { StressClassifier } from './components/StressClassifier';
import { XAIPanel } from './components/XAIPanel';
import { RepaymentPlanner } from './components/RepaymentPlanner';
import { SHGNetwork } from './components/SHGNetwork';
import { DataIngestion } from './components/DataIngestion';
import { BorrowerProfile } from './components/BorrowerProfile';
import { BorrowerDirectory } from './components/BorrowerDirectory';
import { AlertStream } from './components/AlertStream';
import { RecoveryTracker } from './components/RecoveryTracker';
import { ArchitectureView } from './components/ArchitectureView';
import { ResearchView } from './components/ResearchView';
import { MarketGapView } from './components/MarketGapView';
import { AuditTrailView } from './components/AuditTrailView';
import { SettingsModal } from './components/SettingsModal';
import { FlexiMuse } from './components/FlexiMuse';
import { LiveSimulation } from './components/LiveSimulation';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';

import {
  mockBorrowers,
  mockSHGGroups,
  mockTransactions,
  mockAlertSignals,
  mockAuditLogs,
  initialConfig,
  rameshXAIDrivers,
} from './data/mockData';
import {
  Borrower,
  AdminConfig,
  UserRole,
  Transaction,
  AlertSignal,
  AuditLogEntry,
  RepaymentPlan,
} from './types';
import { calculateAdaptivePlan, generateCashFlowTimeline } from './utils/financial';
import { fetchRiskExplanation } from './services/api';

export default function App() {
  // Navigation & View State
  const [viewMode, setViewMode] = useState<'home' | 'login' | 'app'>('home');
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('cro.admin@bandhan-mfi.in');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [showSimulation, setShowSimulation] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Application Data State
  const [borrowers, setBorrowers] = useState<Borrower[]>(mockBorrowers);
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower>(mockBorrowers[0]);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [alerts, setAlerts] = useState<AlertSignal[]>(mockAlertSignals);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(initialConfig);
  const [userRole, setUserRole] = useState<UserRole>('MFI_ADMIN');

  // AI Explanation State
  const [aiExplanation, setAiExplanation] = useState<{
    summary: string;
    evidence: string[];
    impact: string;
    recommendation: string;
  } | undefined>(undefined);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Derived current borrower adaptive plan
  const currentPlan = calculateAdaptivePlan(selectedBorrower, adminConfig);
  const currentCashFlow = generateCashFlowTimeline(selectedBorrower);

  // Fetch AI explanation on borrower change
  useEffect(() => {
    let isMounted = true;
    async function loadExplanation() {
      setIsAiLoading(true);
      try {
        const res = await fetchRiskExplanation(
          selectedBorrower,
          rameshXAIDrivers,
          currentPlan
        );
        if (isMounted) {
          setAiExplanation(res);
        }
      } catch (err) {
        console.warn('Fallback explanation used:', err);
      } finally {
        if (isMounted) setIsAiLoading(false);
      }
    }
    loadExplanation();
    return () => {
      isMounted = false;
    };
  }, [selectedBorrower.id]);

  // Handlers
  const handleAddTransaction = (newTxn: Transaction) => {
    setTransactions((prev) => [newTxn, ...prev]);
  };

  const handleAppendAuditLog = (action: string, details: string) => {
    const entry: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: userRole.replace('_', ' '),
      role: userRole,
      action,
      borrowerId: selectedBorrower.id,
      borrowerName: selectedBorrower.name,
      reason: details,
      status: 'COMPLETED',
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  const handleUpdateConfig = (newCfg: Partial<AdminConfig>) => {
    setAdminConfig((prev) => ({ ...prev, ...newCfg }));
  };

  const handleResetDefaults = () => {
    setAdminConfig(initialConfig);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'borrowers', label: 'Borrowers', icon: Users },
    { id: 'planner', label: 'Flexi-EMI Planner', icon: Sliders },
    { id: 'stress', label: 'Stress Engine & XAI', icon: Layers },
    { id: 'shg', label: 'SHG Network', icon: Network },
    { id: 'ingestion', label: 'Data Ingestion', icon: UploadCloud },
    { id: 'alerts', label: 'Alerts & Dispatch', icon: Bell },
    { id: 'recovery', label: 'Recovery Tracker', icon: RotateCcw },
    { id: 'architecture', label: 'Architecture', icon: Cpu },
    { id: 'research', label: 'Research & Policy', icon: BookOpen },
    { id: 'market-gap', label: 'Market Gap', icon: Table },
    { id: 'audit', label: 'Audit Logs', icon: ShieldCheck },
  ];

  // Render Homepage
  if (viewMode === 'home') {
    return (
      <HomePage
        onLaunchConsole={(targetTab) => {
          if (targetTab) setCurrentTab(targetTab);
          setViewMode('app');
        }}
        onGoToLogin={() => setViewMode('login')}
        onRunSimulation={() => {
          setViewMode('app');
          setShowSimulation(true);
        }}
      />
    );
  }

  // Render Login Page
  if (viewMode === 'login') {
    return (
      <LoginPage
        onLoginSuccess={(role, email) => {
          setUserRole(role);
          setCurrentUserEmail(email);
          handleAppendAuditLog('SESSION_AUTHENTICATED', `Authorized login as ${role} (${email}).`);
          setViewMode('app');
        }}
        onBackToHome={() => setViewMode('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0A0A0F]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo & Brand */}
            <div
              onClick={() => setCurrentTab('dashboard')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <CyberButterfly size={34} animated />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-extrabold tracking-wider text-white font-['Chakra_Petch',sans-serif] group-hover:text-[#00F0FF] transition-colors">
                    FLEXILEND
                  </span>
                  <span className="rounded bg-cyan-500/10 border border-cyan-500/30 px-1.5 py-0.2 text-[9px] font-mono text-[#00F0FF] font-bold">
                    MIDDLEWARE
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SYSTEM ONLINE • RBI FOIR GUARD 50%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Role */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              {/* Return to Public Portal */}
              <button
                onClick={() => setViewMode('home')}
                className="hidden md:inline-flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
                title="Return to Public Homepage"
              >
                <Home className="h-3.5 w-3.5 text-cyan-400" />
                <span>HOME</span>
              </button>

              {/* Prominent Live Simulation Button */}
              <button
                onClick={() => setShowSimulation(!showSimulation)}
                className="relative inline-flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-95 transition-all font-mono"
              >
                <Play className="h-3.5 w-3.5 fill-slate-950" />
                <span>{showSimulation ? 'HIDE SIMULATION' : 'RUN LIVE SIMULATION'}</span>
              </button>

              {/* User Role Badge */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="hidden sm:flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
                title={`Current user: ${currentUserEmail}`}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>{userRole.replace('_', ' ')}</span>
              </button>

              {/* Settings Trigger */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                title="System Settings"
              >
                <Settings className="h-4 w-4" />
              </button>

              {/* Sign Out Trigger */}
              <button
                onClick={() => {
                  handleAppendAuditLog('SESSION_LOGOUT', `User ${userRole} (${currentUserEmail}) signed out.`);
                  setViewMode('login');
                }}
                className="inline-flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-mono text-slate-400 hover:border-rose-500/50 hover:text-rose-300 transition-all"
                title={`Signed in as ${currentUserEmail} • Click to Sign Out`}
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">SIGN OUT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Sub-Navigation Tabs */}
        <div className="border-t border-slate-800/60 bg-[#0D0D17]/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none text-xs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center space-x-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-[#00F0FF] border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.2)] font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#00F0FF]' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Collapsible 12-Step Guided Live Simulation */}
        {showSimulation && (
          <LiveSimulation
            onNavigateView={(view) => {
              // Map simulation view name to currentTab
              const viewMap: Record<string, string> = {
                profile: 'borrowers',
                cashflow: 'dashboard',
                stress: 'stress',
                foir: 'dashboard',
                shg: 'shg',
                xai: 'stress',
                planner: 'planner',
                alerts: 'alerts',
                recovery: 'recovery',
              };
              setCurrentTab(viewMap[view] || 'dashboard');
            }}
            onCompleteSimulation={() => {
              handleAppendAuditLog(
                'LIVE_SIMULATION_COMPLETED',
                'Completed full 12-step end-to-end adaptive metamorphosis simulation.'
              );
            }}
          />
        )}

        {/* VIEW 1: DASHBOARD */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Metamorphic Hero Visual Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#121226] via-[#10101F] to-[#180B26] p-6 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-widest">
                      TRANSFORM STATIC LOANS INTO ADAPTIVE REPAYMENT INTELLIGENCE
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-['Chakra_Petch',sans-serif]">
                    Intelligent B2B Middleware for Microfinance, NBFCs & Banks
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Synchronizing rigid loan repayments with real-world rural agricultural cash flows. Protecting borrowers under the RBI 50% FOIR ceiling while guaranteeing lender liquidity floors.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
                    <button
                      onClick={() => setCurrentTab('planner')}
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                      EXPLORE FLEXI-EMI PLANNER
                    </button>
                    <button
                      onClick={() => setCurrentTab('architecture')}
                      className="rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white"
                    >
                      VIEW ARCHITECTURE PIPELINE
                    </button>
                  </div>
                </div>

                {/* Hero Cybernetic Butterfly Visual */}
                <div className="flex flex-col items-center justify-center shrink-0">
                  <CyberButterfly size={110} animated />
                  <span className="mt-2 text-[10px] font-mono text-cyan-400 uppercase tracking-widest text-center">
                    Rigid Loan → Adaptive Structure
                  </span>
                </div>
              </div>
            </div>

            {/* 6 Executive Metric Cards (Section 12) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
              <MetricCard
                title="TOTAL ACTIVE LOANS"
                value="24,860"
                trend="+3.2% MoM"
                subtitle="₹186.4 Cr Portfolio"
                icon={Activity}
                accentColor="cyan"
                sparklineData={[22, 23, 23.5, 24, 24.2, 24.8]}
                onClick={() => setCurrentTab('borrowers')}
              />
              <MetricCard
                title="AT-RISK BORROWERS"
                value="1,284"
                trend="-4.1% MoM"
                trendPositive={true}
                subtitle="Preemptively flagged"
                icon={AlertTriangle}
                accentColor="magenta"
                sparklineData={[18, 16, 15, 14, 13.5, 12.8]}
                onClick={() => setCurrentTab('stress')}
              />
              <MetricCard
                title="ADAPTIVE PLANS"
                value="742"
                trend="+18.5% Active"
                subtitle="Active Flexi-EMIs"
                icon={Sliders}
                accentColor="violet"
                sparklineData={[2, 4, 5.5, 6.2, 6.8, 7.4]}
                onClick={() => setCurrentTab('planner')}
              />
              <MetricCard
                title="PORTFOLIO AT RISK"
                value="6.8%"
                trend="-1.4% (PAR 30)"
                trendPositive={true}
                subtitle="Industry avg 9.8%"
                icon={TrendingUp}
                accentColor="amber"
                sparklineData={[9.8, 9.2, 8.5, 7.8, 7.2, 6.8]}
                onClick={() => setCurrentTab('recovery')}
              />
              <MetricCard
                title="ABOVE FOIR THRESHOLD"
                value="213"
                trend="Flagged >50%"
                trendPositive={false}
                subtitle="Reviewed by Guard"
                icon={ShieldCheck}
                accentColor="magenta"
                sparklineData={[32, 28, 26, 24, 22, 21.3]}
                onClick={() => setCurrentTab('planner')}
              />
              <MetricCard
                title="RECOVERY POST-RESTRUCTURE"
                value="78.4%"
                trend="vs 38.2% Static"
                subtitle="+40.2% Net Gain"
                icon={CheckCircle2}
                accentColor="emerald"
                sparklineData={[38, 45, 55, 64, 72, 78.4]}
                onClick={() => setCurrentTab('recovery')}
              />
            </div>

            {/* Main Central Workspace: Cash Flow & FOIR Guard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <CashFlowChart
                  data={currentCashFlow}
                  title={`PORTFOLIO CASH-FLOW TELEMETRY: ${selectedBorrower.name.toUpperCase()}`}
                  subtitle="Synchronizing actual crop harvest income with adaptive repayment curves"
                  onEventClick={(note) => {
                    handleAppendAuditLog('EVENT_INSPECTED', `Observed milestone event: ${note}`);
                  }}
                />
              </div>

              <div className="lg:col-span-4 space-y-4">
                <FOIRGauge
                  income={selectedBorrower.householdIncome}
                  existingObligations={selectedBorrower.otherMFIEmis}
                  currentOrProposedEMI={currentPlan.proposedEMI}
                  threshold={adminConfig.foirThreshold}
                  label="HOUSEHOLD FOIR MONITOR"
                />

                {/* Selected Borrower Quick Switch Card */}
                <div className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      CURRENT BORROWER FOCUS
                    </span>
                    <button
                      onClick={() => setCurrentTab('borrowers')}
                      className="text-[10px] text-cyan-400 hover:underline font-mono"
                    >
                      Switch Borrower →
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{selectedBorrower.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {selectedBorrower.location} • {selectedBorrower.occupation}
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#00F0FF] bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/30">
                      ₹{selectedBorrower.currentEMI.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stress & XAI Section on Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <StressClassifier
                  borrower={selectedBorrower}
                  onViewExplanation={() => setCurrentTab('stress')}
                />
              </div>
              <div className="lg:col-span-6">
                <XAIPanel
                  borrower={selectedBorrower}
                  plan={currentPlan}
                  drivers={rameshXAIDrivers}
                  aiExplanation={aiExplanation}
                  isLoading={isAiLoading}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: BORROWERS */}
        {currentTab === 'borrowers' && (
          <div className="space-y-6">
            <BorrowerProfile
              borrower={selectedBorrower}
              transactions={transactions}
              onOpenPlanner={() => setCurrentTab('planner')}
              onOpenXAI={() => setCurrentTab('stress')}
            />

            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white font-['Chakra_Petch',sans-serif] mb-3 uppercase tracking-wider">
                PORTFOLIO BORROWER DIRECTORY (25+ SAMPLE BORROWERS)
              </h3>
              <BorrowerDirectory
                borrowers={borrowers}
                selectedBorrower={selectedBorrower}
                onSelectBorrower={(b) => setSelectedBorrower(b)}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: REPAYMENT PLANNER & LIQUIDITY BALANCER */}
        {currentTab === 'planner' && (
          <div className="space-y-6">
            <RepaymentPlanner
              borrower={selectedBorrower}
              config={adminConfig}
              onUpdateConfig={handleUpdateConfig}
              onApprovePlan={(plan) => {
                handleAppendAuditLog(
                  'ADAPTIVE_PLAN_APPROVED',
                  `Approved Flexi-EMI for ${selectedBorrower.name}: ₹${plan.currentEMI} → ₹${plan.proposedEMI} (+${plan.tenureChangeMonths} mo tenure).`
                );
              }}
              onSendAlert={() => setCurrentTab('alerts')}
            />

            <FOIRGauge
              income={selectedBorrower.householdIncome}
              existingObligations={selectedBorrower.otherMFIEmis}
              currentOrProposedEMI={currentPlan.proposedEMI}
              threshold={adminConfig.foirThreshold}
              label="FOIR RESTRUCTURING IMPACT VERIFICATION"
            />
          </div>
        )}

        {/* VIEW 4: STRESS ENGINE & XAI */}
        {currentTab === 'stress' && (
          <div className="space-y-6">
            <StressClassifier
              borrower={selectedBorrower}
              onViewExplanation={() => {}}
            />

            <XAIPanel
              borrower={selectedBorrower}
              plan={currentPlan}
              drivers={rameshXAIDrivers}
              aiExplanation={aiExplanation}
              isLoading={isAiLoading}
            />
          </div>
        )}

        {/* VIEW 5: SHG NETWORK */}
        {currentTab === 'shg' && (
          <div className="space-y-6">
            <SHGNetwork
              borrowers={borrowers}
              groups={mockSHGGroups}
              selectedBorrower={selectedBorrower}
              onSelectBorrower={(b) => setSelectedBorrower(b)}
            />
          </div>
        )}

        {/* VIEW 6: DATA INGESTION */}
        {currentTab === 'ingestion' && (
          <div className="space-y-6">
            <DataIngestion
              onAddTransaction={handleAddTransaction}
              onAuditLog={handleAppendAuditLog}
            />
          </div>
        )}

        {/* VIEW 7: ALERTS & DISPATCH */}
        {currentTab === 'alerts' && (
          <div className="space-y-6">
            <AlertStream
              alerts={alerts}
              selectedBorrower={selectedBorrower}
              onSelectAlertBorrower={(bId) => {
                const b = borrowers.find((item) => item.id === bId);
                if (b) setSelectedBorrower(b);
              }}
              onAuditLog={handleAppendAuditLog}
            />
          </div>
        )}

        {/* VIEW 8: RECOVERY TRACKER */}
        {currentTab === 'recovery' && (
          <div className="space-y-6">
            <RecoveryTracker
              borrower={selectedBorrower}
              onFeedback={(improved) => {
                handleAppendAuditLog(
                  'FEEDBACK_RECORDED',
                  `Credit officer confirmed restructuring ${improved ? 'stabilized' : 'unresolved'} for ${selectedBorrower.name}.`
                );
              }}
            />
          </div>
        )}

        {/* VIEW 9: ARCHITECTURE */}
        {currentTab === 'architecture' && <ArchitectureView />}

        {/* VIEW 10: RESEARCH & POLICY */}
        {currentTab === 'research' && <ResearchView />}

        {/* VIEW 11: MARKET GAP */}
        {currentTab === 'market-gap' && <MarketGapView />}

        {/* VIEW 12: AUDIT LOGS */}
        {currentTab === 'audit' && (
          <AuditTrailView logs={auditLogs} />
        )}
      </main>

      {/* Floating AI Assistant: Flexi Muse */}
      <FlexiMuse currentBorrower={selectedBorrower} />

      {/* Admin Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={adminConfig}
        currentRole={userRole}
        onUpdateConfig={handleUpdateConfig}
        onUpdateRole={(r) => {
          setUserRole(r);
          handleAppendAuditLog('ROLE_SWITCHED', `Switched active session persona to ${r}.`);
        }}
        onResetDefaults={handleResetDefaults}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-[#07070C] py-6 text-center text-xs text-slate-500 font-mono">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <CyberButterfly size={18} />
            <span className="text-slate-400 font-semibold">FlexiLend Intelligence Platform</span>
            <span>• RBI Microfinance Framework 2022 Compliant</span>
          </div>
          <div>
            Built with Gemini 3.8 Flash • Deterministic FOIR Protection • Liquidity Floor Safeguard
          </div>
        </div>
      </footer>
    </div>
  );
}
