import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Key,
  Building2,
  ShieldCheck,
  ArrowRight,
  User,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { CyberButterfly } from './CyberButterfly';
import { UserRole } from '../types';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole, userEmail: string) => void;
  onBackToHome: () => void;
}

interface DemoPersona {
  role: UserRole;
  name: string;
  title: string;
  email: string;
  institution: string;
  description: string;
  badgeColor: string;
}

const DEMO_PERSONAS: DemoPersona[] = [
  {
    role: 'MFI_ADMIN',
    name: 'Priya Sundaram',
    title: 'Chief Risk Officer & Admin',
    email: 'cro.admin@bandhan-mfi.in',
    institution: 'Bandhan Microfinance Ltd',
    description: 'Full portfolio oversight, liquidity floor adjustments, and underwriting policy calibration.',
    badgeColor: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300',
  },
  {
    role: 'CREDIT_OFFICER',
    name: 'Anand Vernekar',
    title: 'Senior Field Credit Officer',
    email: 'anand.mandya@gramin-bank.in',
    institution: 'Kaveri Grameena Bank',
    description: 'Direct borrower engagement, APMC Mandi receipt OCR verification, and WhatsApp dispatch.',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300',
  },
  {
    role: 'RISK_ANALYST',
    name: 'Dr. Vikram Malhotra',
    title: 'Lead Quantitative Modeler',
    email: 'v.malhotra@bharat-nbfc.org',
    institution: 'Bharat Rural NBFC',
    description: 'Dual-layer stress tuning, SHAP explainable AI attribution, and SHG contagion network analysis.',
    badgeColor: 'border-purple-500/40 bg-purple-950/40 text-purple-300',
  },
  {
    role: 'AUDITOR',
    name: 'Meenakshi Iyer',
    title: 'Statutory Compliance Auditor',
    email: 'auditor.inspect@rbi-audit.gov.in',
    institution: 'RBI Microfinance Supervision Panel',
    description: 'Read-only regulatory compliance, 50% FOIR statutory ceiling enforcement, and immutable audit logs.',
    badgeColor: 'border-amber-500/40 bg-amber-950/40 text-amber-300',
  },
];

export function LoginPage({ onLoginSuccess, onBackToHome }: LoginPageProps) {
  const [selectedPersona, setSelectedPersona] = useState<DemoPersona>(DEMO_PERSONAS[0]);
  const [email, setEmail] = useState<string>(DEMO_PERSONAS[0].email);
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [institution, setInstitution] = useState<string>(DEMO_PERSONAS[0].institution);
  const [requireMfa, setRequireMfa] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('842910');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSelectPersona = (persona: DemoPersona) => {
    setSelectedPersona(persona);
    setEmail(persona.email);
    setInstitution(persona.institution);
    setPassword('••••••••••••');
    setAuthError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setAuthError('Please enter a valid institutional email');
      return;
    }

    setIsLoading(true);
    setAuthError(null);

    // Realistic authentication flow
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedPersona.role, email);
    }, 600);
  };

  const handleQuickDemoAccess = () => {
    onLoginSuccess(selectedPersona.role, selectedPersona.email);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between relative overflow-hidden">
      {/* Background cyber lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-[#0A0A0F]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>RETURN TO PUBLIC SITE</span>
            </button>

            <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="hidden sm:inline">256-BIT TLS 1.3 SECURE PORTAL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="relative z-10 my-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <CyberButterfly size={46} animated />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white font-['Chakra_Petch',sans-serif]">
              FLEXILEND INSTITUTIONAL ACCESS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Adaptive Repayment Middleware Console for Microfinance & NBFC Lenders
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 1-Click Persona Quick Logins */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>SELECT TEST DEMO PERSONA</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">1-CLICK SWITCH</span>
              </div>

              <div className="space-y-2.5">
                {DEMO_PERSONAS.map((persona) => {
                  const isSelected = selectedPersona.role === persona.role;
                  return (
                    <div
                      key={persona.role}
                      onClick={() => handleSelectPersona(persona)}
                      className={`rounded-xl border p-3.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-950/30 shadow-[0_0_20px_rgba(0,240,255,0.15)] ring-1 ring-cyan-500/50'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${persona.badgeColor}`}>
                            {persona.role.replace('_', ' ')}
                          </span>
                          <span className="text-xs font-bold text-white">{persona.name}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-[#00F0FF]" />}
                      </div>

                      <div className="text-[11px] text-slate-300 font-mono mt-1">{persona.title}</div>
                      <div className="text-[11px] text-cyan-400/90 font-mono">{persona.institution}</div>
                      <div className="text-[10px] text-slate-400 mt-1 leading-snug">{persona.description}</div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleQuickDemoAccess}
                className="w-full py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-mono font-bold text-[#00F0FF] transition-all flex items-center justify-center space-x-2"
              >
                <span>INSTANT GUEST LOGIN AS {selectedPersona.role.replace('_', ' ')}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Right Column: Credentials Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white">SECURE LOGIN CREDENTIALS</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    SSO READY
                  </span>
                </div>

                {authError && (
                  <div className="mb-4 rounded-lg bg-rose-950/40 border border-rose-500/50 p-2.5 text-xs text-rose-300 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Institution Select */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1.5 flex items-center space-x-1.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      <span>Financial Lending Entity</span>
                    </label>
                    <select
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="Bandhan Microfinance Ltd">Bandhan Microfinance Ltd</option>
                      <option value="Kaveri Grameena Bank">Kaveri Grameena Bank</option>
                      <option value="Bharat Rural NBFC">Bharat Rural NBFC</option>
                      <option value="RBI Microfinance Supervision Panel">RBI Microfinance Supervision Panel</option>
                      <option value="Ujjivan Small Finance Bank">Ujjivan Small Finance Bank</option>
                      <option value="NABARD Priority Credit Sandbox">NABARD Priority Credit Sandbox</option>
                    </select>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1.5 flex items-center space-x-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>Institutional Email ID</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@institution.in"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[11px] font-mono text-slate-300 flex items-center space-x-1.5">
                        <Key className="h-3.5 w-3.5 text-slate-400" />
                        <span>Security Password</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[10px] font-mono text-slate-400 hover:text-cyan-400 flex items-center space-x-1"
                      >
                        {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        <span>{showPassword ? 'HIDE' : 'SHOW'}</span>
                      </button>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  {/* MFA OTP Toggle */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="mfa-toggle" className="text-[11px] font-mono text-slate-300 cursor-pointer flex items-center space-x-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Hardware OTP / Auth App Verification</span>
                      </label>
                      <input
                        id="mfa-toggle"
                        type="checkbox"
                        checked={requireMfa}
                        onChange={(e) => setRequireMfa(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0 cursor-pointer"
                      />
                    </div>

                    {requireMfa && (
                      <div className="pt-2 border-t border-slate-800">
                        <div className="text-[10px] font-mono text-slate-400 mb-1">Enter 6-digit Time-based OTP:</div>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full text-center tracking-widest text-base font-mono font-bold rounded-lg border border-cyan-500/50 bg-slate-900 py-1.5 text-cyan-300 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-xs font-bold font-mono text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <span className="flex items-center space-x-2">
                        <span className="h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>AUTHENTICATING ROLE...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <span>LAUNCH MIDDLEWARE CONSOLE</span>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    ← Cancel and return to FlexiLend Homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#07070B] py-4 text-center text-[10px] font-mono text-slate-500">
        <div>AUTHORIZED ACCESS ONLY • CERT-IN & RBI MASTER DIRECTION 2022 COMPLIANT</div>
      </footer>
    </div>
  );
}
