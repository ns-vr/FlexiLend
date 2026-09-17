import React from 'react';
import { X, Sliders, Shield, RotateCcw, Check, UserCheck } from 'lucide-react';
import { AdminConfig, UserRole } from '../types';
import { formatINR } from '../utils/financial';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdminConfig;
  currentRole: UserRole;
  onUpdateConfig: (newConfig: Partial<AdminConfig>) => void;
  onUpdateRole: (role: UserRole) => void;
  onResetDefaults: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  currentRole,
  onUpdateConfig,
  onUpdateRole,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-[#0F0F1A] p-6 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-2.5">
            <Sliders className="h-5 w-5 text-[#00F0FF]" />
            <h3 className="text-base font-bold text-white font-['Chakra_Petch',sans-serif]">
              SYSTEM & REGULATORY PARAMETERS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Role Selector */}
        <div className="mb-5 space-y-2">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Simulated User Role & RBAC Persona:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {(['MFI_ADMIN', 'CREDIT_OFFICER', 'RISK_ANALYST', 'AUDITOR'] as UserRole[]).map(
              (role) => (
                <button
                  key={role}
                  onClick={() => onUpdateRole(role)}
                  className={`py-1.5 px-2 rounded text-[10px] font-mono font-bold transition-all ${
                    currentRole === role
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {role.replace('_', ' ')}
                </button>
              )
            )}
          </div>
        </div>

        {/* Sliders and Toggles */}
        <div className="space-y-4 text-xs">
          {/* Minimum Borrower Payment % */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-300">Minimum Borrower Payment Floor:</span>
              <span className="font-mono text-cyan-400 font-bold">{config.minimumPaymentPercentage}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="80"
              value={config.minimumPaymentPercentage}
              onChange={(e) =>
                onUpdateConfig({ minimumPaymentPercentage: Number(e.target.value) })
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Household FOIR Threshold */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-300">Household FOIR Statutory Ceiling:</span>
              <span className="font-mono text-amber-400 font-bold">{config.foirThreshold}% (RBI Rule)</span>
            </div>
            <input
              type="range"
              min="40"
              max="60"
              value={config.foirThreshold}
              onChange={(e) => onUpdateConfig({ foirThreshold: Number(e.target.value) })}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Max Allowable Tenure Extension */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-300">Max Allowable Tenure Extension:</span>
              <span className="font-mono text-purple-400 font-bold">+{config.maxTenureExtensionMonths} Months</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={config.maxTenureExtensionMonths}
              onChange={(e) =>
                onUpdateConfig({ maxTenureExtensionMonths: Number(e.target.value) })
              }
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          {/* Portfolio Liquidity Floor */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-300">Lender Minimum Liquidity Floor:</span>
              <span className="font-mono text-pink-400 font-bold">
                {formatINR(config.liquidityFloorAmount, true)}
              </span>
            </div>
            <input
              type="range"
              min="1200000"
              max="2000000"
              step="50000"
              value={config.liquidityFloorAmount}
              onChange={(e) =>
                onUpdateConfig({ liquidityFloorAmount: Number(e.target.value) })
              }
              className="w-full accent-pink-400 cursor-pointer"
            />
          </div>

          {/* Automated Approval Toggle */}
          <div className="flex items-center justify-between py-2 border-t border-slate-800">
            <div>
              <span className="text-slate-200 font-semibold block">
                Auto-Restructure Qualified Transient Loans
              </span>
              <span className="text-[10px] text-slate-500">
                Instantly stage plan if confidence exceeds 80% and liquidity floor is satisfied.
              </span>
            </div>
            <button
              onClick={() =>
                onUpdateConfig({ autoRestructureEnabled: !config.autoRestructureEnabled })
              }
              className={`h-6 w-11 rounded-full transition-colors p-1 flex items-center ${
                config.autoRestructureEnabled ? 'bg-cyan-500 justify-end' : 'bg-slate-800 justify-start'
              }`}
            >
              <span className="h-4 w-4 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={onResetDefaults}
            className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
