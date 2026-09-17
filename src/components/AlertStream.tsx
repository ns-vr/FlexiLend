import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  AlertOctagon,
  Info,
  Send,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AlertSignal, Borrower } from '../types';
import { fetchGeneratedNotification } from '../services/api';

interface AlertStreamProps {
  alerts: AlertSignal[];
  selectedBorrower: Borrower;
  onSelectAlertBorrower?: (borrowerId: string) => void;
  onAuditLog?: (action: string, reason: string) => void;
}

export const AlertStream: React.FC<AlertStreamProps> = ({
  alerts,
  selectedBorrower,
  onSelectAlertBorrower,
  onAuditLog,
}) => {
  const [activeChannel, setActiveChannel] = useState<'WhatsApp' | 'SMS'>('WhatsApp');
  const [customMessage, setCustomMessage] = useState(
    `Namaste ${selectedBorrower.name} ji, your loan repayment for this month has been adjusted from ₹${selectedBorrower.currentEMI.toLocaleString('en-IN')} to ₹2,800 based on your current seasonal crop cycle. Your next payment date remains unchanged. Thank you for your continued partnership with FlexiLend.`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const handleRegenerateNotification = async () => {
    setIsGenerating(true);
    try {
      const res = await fetchGeneratedNotification(selectedBorrower, 2800, activeChannel);
      setCustomMessage(res.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = () => {
    setSentSuccess(true);
    onAuditLog?.(
      'BORROWER_ALERT_DISPATCHED',
      `Sent ${activeChannel} notification to ${selectedBorrower.name} (${selectedBorrower.phone}): EMI adjusted to ₹2,800.`
    );
    setTimeout(() => setSentSuccess(false), 4000);
  };

  const filteredAlerts = alerts.filter(
    (a) => filterSeverity === 'ALL' || a.severity === filterSeverity
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Early-Warning Center Stream (Section 22) */}
      <div className="lg:col-span-7 rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-[#00F0FF]" />
            <h3 className="text-xs font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
              EARLY-WARNING SIGNALS STREAM
            </h3>
          </div>

          <div className="flex items-center space-x-1 text-xs">
            {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  filterSeverity === sev
                    ? 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Signals List */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredAlerts.map((alert) => {
            const severityStyle = {
              CRITICAL: 'border-pink-500/40 bg-pink-950/20 text-[#FF007A]',
              WARNING: 'border-amber-500/40 bg-amber-950/20 text-amber-400',
              INFO: 'border-cyan-500/40 bg-cyan-950/20 text-[#00F0FF]',
            }[alert.severity];

            const SeverityIcon = {
              CRITICAL: AlertOctagon,
              WARNING: AlertTriangle,
              INFO: Info,
            }[alert.severity];

            return (
              <div
                key={alert.id}
                onClick={() => alert.borrowerId && onSelectAlertBorrower?.(alert.borrowerId)}
                className={`rounded-lg border p-3 transition-all hover:border-slate-600 cursor-pointer ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-pink-950/10 border-pink-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[10px] font-mono text-slate-500 mt-0.5 shrink-0">
                      {alert.timestamp}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{alert.message}</span>
                        {alert.borrowerName && (
                          <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 px-1.5 py-0.2 rounded">
                            {alert.borrowerName}
                          </span>
                        )}
                        {alert.groupId && (
                          <span className="text-[10px] text-purple-400 font-mono bg-purple-500/10 px-1.5 py-0.2 rounded">
                            {alert.groupId}
                          </span>
                        )}
                      </div>
                      {alert.evidenceMetric && (
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {alert.evidenceMetric}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`rounded border px-1.5 py-0.5 text-[9px] font-mono font-bold shrink-0 ${severityStyle}`}
                  >
                    {alert.severity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Automated Borrower Alerts (Section 23) */}
      <div className="lg:col-span-5 rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-[#00F0FF]" />
            <h3 className="text-xs font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
              AUTOMATED BORROWER NOTIFICATION
            </h3>
          </div>

          <div className="flex items-center space-x-1 bg-slate-900 rounded p-1 border border-slate-800">
            <button
              onClick={() => setActiveChannel('WhatsApp')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                activeChannel === 'WhatsApp'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setActiveChannel('SMS')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                activeChannel === 'SMS'
                  ? 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SMS
            </button>
          </div>
        </div>

        {/* Message Preview Mock Phone Container */}
        <div className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/60 pb-2">
            <span>Recipient: <strong className="text-white">{selectedBorrower.name}</strong></span>
            <span className="font-mono text-cyan-400">{selectedBorrower.phone}</span>
          </div>

          {/* Chat Bubble */}
          <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/30 p-3 text-xs text-slate-200 leading-relaxed font-sans relative">
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={4}
              className="w-full bg-transparent border-0 resize-none focus:outline-none text-xs text-slate-200"
            />
            <div className="text-[10px] text-emerald-400/70 text-right mt-1 font-mono">
              FlexiLend Automated Dispatch • 09:45 AM
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleRegenerateNotification}
              disabled={isGenerating}
              className="inline-flex items-center space-x-1 text-[11px] text-cyan-400 hover:underline"
            >
              <Sparkles className="h-3 w-3" />
              <span>{isGenerating ? 'Drafting with Gemini...' : 'Regenerate Vernacular Phrasing'}</span>
            </button>

            <span className="text-[10px] text-slate-500 font-mono">
              {activeChannel} Gateway
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={handleSendMessage}
            className="w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-600 py-2.5 text-xs font-bold text-slate-950 uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all"
          >
            <Send className="h-3.5 w-3.5" />
            <span>SEND TEST MESSAGE</span>
          </button>

          {sentSuccess && (
            <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/40 p-2 text-center text-xs text-emerald-300 font-mono flex items-center justify-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="h-4 w-4" />
              <span>Simulated dispatch delivered to {selectedBorrower.phone}! Audit log entry created.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
