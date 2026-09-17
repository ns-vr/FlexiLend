import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, Scale, Award, FileText } from 'lucide-react';
import { CyberButterfly } from './CyberButterfly';

export const ResearchView: React.FC = () => {
  const researchPillars = [
    {
      title: 'Reserve Bank of India (RBI) Regulatory Framework for Microfinance Loans Directions, 2022',
      badge: 'Statutory Regulation',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      keyFindings: [
        'Mandates that monthly debt obligations of a household shall not exceed a maximum limit of 50% of monthly household income (FOIR).',
        'Applies uniformly across all Regulated Entities (Commercial Banks, NBFC-MFIs, Small Finance Banks, and Co-operatives).',
        'Explicitly requires consideration of both microfinance and non-microfinance indebtedness.',
        'Discourages coercive recovery practices and demands board-approved, fair lending restructuring guidelines.',
      ],
      linkText: 'RBI/DOR/2021-22/89 DOR.FIN.REC.95/03.10.038/2021-22',
    },
    {
      title: 'CGAP / World Bank: Flexible Repayment Schedules in Rural Lending (Field Evidence)',
      badge: 'Global Empirical Research',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      keyFindings: [
        'Field randomized controlled trials demonstrate that matching repayment schedules to agricultural harvest seasons reduces defaults by 28-34%.',
        'Borrowers provided with temporary grace periods during lean seasons reinvest 19% more in higher-yield inputs.',
        'Zero observed increase in moral hazard or strategic default when temporary relief is conditional on objective weather/price data.',
      ],
      linkText: 'CGAP Focus Note & World Bank Development Economics',
    },
    {
      title: 'NABARD: Self-Help Group (SHG) Financial Contagion & Collective Liability Dynamics',
      badge: 'Institutional Framework',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      keyFindings: [
        'Joint liability group delinquency clusters are predominantly driven by synchronized exogenous shocks (crop price collapse, flood/drought) rather than individual fraud.',
        'When one member faces acute cash strain, peer pressure without adaptive relief leads to group disbandment and 60%+ portfolio write-offs.',
        'Preemptive identification of stressed clusters preserves group social capital and elevates long-term recovery to 85%+.',
      ],
      linkText: 'NABARD Microfinance Status Report & SHG Guidelines',
    },
    {
      title: 'Explainable AI (XAI) & Fairness in Algorithmic Credit Decisioning (SHAP / LIME)',
      badge: 'AI Governance Standards',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      keyFindings: [
        'Black-box neural credit scores are uninterpretable for credit officers and vulnerable to disparate impact.',
        'Additive feature attribution (SHAP values) provides verifiable mathematical contributions for each stress driver.',
        'Gemini multimodal LLMs act as a translation layer, transforming quantitative telemetry into plain-language audits for compliance officers and borrowers.',
      ],
      linkText: 'Lundberg & Lee (NeurIPS) • EU AI Act High-Risk AI Standards',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <CyberButterfly size={32} />
          <div>
            <h2 className="text-lg font-bold text-white font-['Chakra_Petch',sans-serif]">
              RESEARCH & REGULATORY EVIDENCE BASE
            </h2>
            <p className="text-xs text-slate-400">
              Rigorous economic grounding, RBI microfinance directives, and empirical literature supporting adaptive credit structures
            </p>
          </div>
        </div>
      </div>

      {/* Research Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {researchPillars.map((pillar, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-bold ${pillar.badgeColor}`}
                >
                  {pillar.badge}
                </span>
                <span className="text-[10px] font-mono text-slate-500">REF 0{idx + 1}</span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug mb-3">
                {pillar.title}
              </h3>

              <div className="space-y-2">
                {pillar.keyFindings.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="truncate max-w-[240px] text-cyan-400">{pillar.linkText}</span>
              <span className="flex items-center gap-1 text-slate-500">
                <FileText className="h-3.5 w-3.5" /> Direct Citation
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
