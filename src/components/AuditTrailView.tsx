import React, { useState } from 'react';
import { ShieldCheck, Download, Search, Filter } from 'lucide-react';
import { AuditLogEntry } from '../types';

interface AuditTrailViewProps {
  logs: AuditLogEntry[];
  onExportCSV?: () => void;
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({ logs, onExportCSV }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('ALL');

  const filteredLogs = logs.filter((log) => {
    const targetText = log.borrowerName || log.borrowerId || '';
    const detailsText = log.reason || '';
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      detailsText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      targetText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'ALL' || log.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleExport = () => {
    const headers = 'ID,Timestamp,User,Role,Action,Target,Reason,Status\n';
    const rows = logs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.user}","${l.role}","${l.action}","${l.borrowerName || l.borrowerId || ''}","${(l.reason || '').replace(/"/g, '""')}","${l.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flexilend_audit_trail_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-6 w-6 text-[#00F0FF]" />
            <div>
              <h2 className="text-base font-bold text-white font-['Chakra_Petch',sans-serif]">
                TAMPER-EVIDENT REGULATORY AUDIT LOG
              </h2>
              <p className="text-xs text-slate-400">
                Immutable, cryptographically verifiable record of all algorithmic restructurings, OCR ingestion, and alerts
              </p>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-[#00F0FF] transition-all font-mono"
          >
            <Download className="h-3.5 w-3.5" />
            <span>EXPORT AUDIT CSV</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search action, user, or borrower..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-1 text-xs">
            {['ALL', 'MFI_ADMIN', 'CREDIT_OFFICER', 'RISK_ANALYST', 'AUDITOR'].map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  filterRole === role
                    ? 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {role.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-[10px] font-mono uppercase text-slate-500">
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">User / Actor</th>
                <th className="py-2.5 px-4">Role</th>
                <th className="py-2.5 px-4">Action</th>
                <th className="py-2.5 px-4">Target Entity</th>
                <th className="py-2.5 px-4">Telemetry Rationale</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-4 text-slate-200 font-semibold">{log.user}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        log.role === 'MFI_ADMIN'
                          ? 'bg-cyan-500/10 text-[#00F0FF]'
                          : log.role === 'CREDIT_OFFICER'
                          ? 'bg-purple-500/10 text-purple-400'
                          : log.role === 'AUDITOR'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {log.borrowerName || log.borrowerId || 'System'}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-sans text-xs max-w-md leading-relaxed">
                    {log.reason}
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 text-[9px]">
                      {log.status}
                    </span>
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
