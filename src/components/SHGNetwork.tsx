import React, { useState } from 'react';
import { Users, AlertTriangle, ShieldCheck, Info, Network, ZoomIn, ZoomOut } from 'lucide-react';
import { Borrower, SHGGroup } from '../types';

interface SHGNetworkProps {
  borrowers: Borrower[];
  groups: SHGGroup[];
  selectedBorrower: Borrower;
  onSelectBorrower: (b: Borrower) => void;
}

export const SHGNetwork: React.FC<SHGNetworkProps> = ({
  borrowers,
  groups,
  selectedBorrower,
  onSelectBorrower,
}) => {
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string | 'ALL'>('SHG-104');
  const [hoveredNode, setHoveredNode] = useState<Borrower | null>(null);

  // Focus group details
  const currentGroup = groups.find((g) => g.groupId === selectedBorrower.groupId) || groups[0];

  // Layout node positions in circular/cluster coordinates for the SVG canvas
  const nodePositions = React.useMemo(() => {
    // 5 group hub centers
    const hubCenters: Record<string, { x: number; y: number; name: string }> = {
      'SHG-104': { x: 220, y: 170, name: 'SHG-104 (Mandya)' },
      'SHG-108': { x: 540, y: 130, name: 'SHG-108 (Nashik)' },
      'JLG-201': { x: 180, y: 360, name: 'JLG-201 (Thanjavur)' },
      'SHG-305': { x: 520, y: 340, name: 'SHG-305 (Ramanagara)' },
      'SHG-402': { x: 380, y: 250, name: 'SHG-402 (Warangal)' },
    };

    return borrowers.slice(0, 20).map((b, idx) => {
      const hub = hubCenters[b.groupId] || { x: 350, y: 240, name: b.groupName };
      // Distribute in a rosette around hub
      const angle = (idx * 1.3) % (2 * Math.PI);
      const radius = 52 + ((idx * 17) % 35);
      const x = Math.max(30, Math.min(670, hub.x + radius * Math.cos(angle)));
      const y = Math.max(30, Math.min(450, hub.y + radius * Math.sin(angle)));
      return { borrower: b, x, y, hub };
    });
  }, [borrowers]);

  const getNodeColor = (b: Borrower) => {
    switch (b.riskStatus) {
      case 'STABLE':
        return '#10B981'; // Green
      case 'WATCH':
        return '#F59E0B'; // Yellow
      case 'TEMPORARY_STRESS':
        return '#F97316'; // Orange
      case 'STRUCTURAL_RISK':
        return '#FF007A'; // Magenta
      default:
        return '#10B981';
    }
  };

  const currentGroupMembers = borrowers.filter((b) => b.groupId === currentGroup.groupId);
  const stressedInGroup = currentGroupMembers.filter(
    (b) => b.riskStatus === 'TEMPORARY_STRESS' || b.riskStatus === 'STRUCTURAL_RISK'
  );

  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-[#00F0FF]" />
            <h3 className="text-sm font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
              SHG FINANCIAL STRESS NETWORK
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Detecting joint-liability cluster contagion & synchronized regional stress
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Stable
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Watch
          </span>
          <span className="flex items-center gap-1 text-orange-400">
            <span className="h-2 w-2 rounded-full bg-orange-400" /> Stress
          </span>
          <span className="flex items-center gap-1 text-pink-400">
            <span className="h-2 w-2 rounded-full bg-[#FF007A]" /> High Risk
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* SVG Network Canvas */}
        <div className="lg:col-span-8 rounded-lg bg-slate-950/70 border border-slate-800/80 relative overflow-hidden h-[420px]">
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B0A_1px,transparent_1px),linear-gradient(to_bottom,#1E293B0A_1px,transparent_1px)] bg-[size:24px_24px]" />

          <svg className="h-full w-full" viewBox="0 0 700 480">
            <defs>
              <filter id="hubGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting Links between nodes and their SHG Hub */}
            {nodePositions.map((pos) => {
              const isSelectedGroup = pos.borrower.groupId === selectedBorrower.groupId;
              const isSelectedBorrower = pos.borrower.id === selectedBorrower.id;

              return (
                <line
                  key={`link-${pos.borrower.id}`}
                  x1={pos.hub.x}
                  y1={pos.hub.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={
                    isSelectedBorrower
                      ? '#00F0FF'
                      : isSelectedGroup
                      ? 'rgba(0, 240, 255, 0.4)'
                      : 'rgba(51, 65, 85, 0.3)'
                  }
                  strokeWidth={isSelectedBorrower ? 2 : isSelectedGroup ? 1.4 : 0.8}
                  strokeDasharray={isSelectedGroup ? 'none' : '2,2'}
                />
              );
            })}

            {/* Inter-node contagion links for stressed members in same group */}
            {nodePositions
              .filter(
                (p) =>
                  p.borrower.groupId === selectedBorrower.groupId &&
                  (p.borrower.riskStatus === 'TEMPORARY_STRESS' ||
                    p.borrower.riskStatus === 'STRUCTURAL_RISK')
              )
              .map((p1, idx, arr) =>
                arr.slice(idx + 1).map((p2) => (
                  <line
                    key={`contagion-${p1.borrower.id}-${p2.borrower.id}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="#FF007A"
                    strokeWidth={1.5}
                    strokeDasharray="4,3"
                    className="animate-pulse"
                  />
                ))
              )}

            {/* Group Hub Center Nodes */}
            {groups.map((grp) => {
              const hubCoords: Record<string, { x: number; y: number }> = {
                'SHG-104': { x: 220, y: 170 },
                'SHG-108': { x: 540, y: 130 },
                'JLG-201': { x: 180, y: 360 },
                'SHG-305': { x: 520, y: 340 },
                'SHG-402': { x: 380, y: 250 },
              };
              const coord = hubCoords[grp.groupId] || { x: 350, y: 240 };
              const isSelected = grp.groupId === selectedBorrower.groupId;

              return (
                <g key={`hub-${grp.groupId}`} className="cursor-pointer">
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={isSelected ? 18 : 14}
                    fill="#1A1A2E"
                    stroke={isSelected ? '#00F0FF' : '#475569'}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    filter="url(#hubGlow)"
                  />
                  <text
                    x={coord.x}
                    y={coord.y + 4}
                    textAnchor="middle"
                    fill={isSelected ? '#00F0FF' : '#94A3B8'}
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {grp.groupId.split('-')[1]}
                  </text>
                  <text
                    x={coord.x}
                    y={coord.y + 26}
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="9"
                    fontWeight="500"
                  >
                    {grp.groupName.split(' ')[0]}
                  </text>
                </g>
              );
            })}

            {/* Individual Borrower Nodes */}
            {nodePositions.map((pos) => {
              const isSelected = pos.borrower.id === selectedBorrower.id;
              const isSameGroup = pos.borrower.groupId === selectedBorrower.groupId;
              const nodeColor = getNodeColor(pos.borrower);

              return (
                <g
                  key={pos.borrower.id}
                  onClick={() => onSelectBorrower(pos.borrower)}
                  onMouseEnter={() => setHoveredNode(pos.borrower)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer transition-transform hover:scale-125"
                >
                  {/* Selection Pulse Ring */}
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={14}
                      fill="none"
                      stroke="#00F0FF"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                      className="animate-spin origin-center"
                    />
                  )}

                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 9 : isSameGroup ? 7.5 : 5.5}
                    fill={nodeColor}
                    stroke="#0A0A0F"
                    strokeWidth="1.5"
                    className="drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]"
                  />

                  {/* Label on selected or same group */}
                  {(isSelected || isSameGroup) && (
                    <text
                      x={pos.x}
                      y={pos.y - 11}
                      textAnchor="middle"
                      fill={isSelected ? '#00F0FF' : '#E2E8F0'}
                      fontSize={isSelected ? '10' : '8'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {pos.borrower.name.split(' ')[0]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Hover Card Floating inside canvas */}
          {hoveredNode && (
            <div className="absolute top-3 left-3 pointer-events-none rounded-lg border border-slate-700 bg-slate-900/90 p-2.5 text-xs backdrop-blur-md z-20">
              <div className="font-bold text-white">{hoveredNode.name}</div>
              <div className="text-[10px] text-slate-400">{hoveredNode.location} • {hoveredNode.occupation}</div>
              <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px]">
                <span className="text-slate-400">Status:</span>
                <span
                  style={{ color: getNodeColor(hoveredNode) }}
                  className="font-bold"
                >
                  {hoveredNode.riskStatus}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Selected Group Analytics Panel */}
        <div className="lg:col-span-4 space-y-3">
          <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                  ACTIVE GROUP CLUSTER
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">{currentGroup.groupName}</h4>
              </div>
              <span className="text-xs font-mono font-bold text-[#00F0FF] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                {currentGroup.groupId}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Total Group Members</span>
                <span className="font-semibold text-white font-mono">{currentGroup.membersCount}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Stressed Members</span>
                <span className="font-bold text-amber-400 font-mono">
                  {currentGroup.stressedMembers} / {currentGroup.membersCount}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Group Repayment Rate</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {currentGroup.repaymentRate}%
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Contagion Signal</span>
                <span
                  className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                    currentGroup.contagionRisk === 'HIGH'
                      ? 'bg-pink-500/20 text-[#FF007A]'
                      : currentGroup.contagionRisk === 'MODERATE'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {currentGroup.contagionRisk} RISK
                </span>
              </div>
            </div>

            {/* Contagion Warning Box */}
            <div className="mt-3 rounded-lg bg-amber-950/20 border border-amber-500/30 p-2.5 text-xs text-amber-200">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>Cluster Contagion Pattern</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                <strong className="text-amber-300">3 borrowers</strong> in {currentGroup.groupName} exhibit synchronized income decline tied to delayed Mandya sugar mill crushings.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-3 text-[10px] text-slate-400 flex items-start gap-1.5">
            <Info className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
            <span>
              This is an algorithmic risk-monitoring visualization for group-lending peer dynamics, not a prediction of individual wrongdoing.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
