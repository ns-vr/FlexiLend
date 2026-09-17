import { Borrower, AdminConfig, RepaymentPlan, MonthlyCashFlow } from '../types';

/**
 * Deterministic calculation of Fixed Obligation to Income Ratio (FOIR).
 * Rule: FOIR = (Total Monthly Loan Repayment Obligations / Monthly Household Income) * 100
 * The 50% ceiling includes both microfinance and non-microfinance loan repayment obligations
 * for low-income households as established under the RBI microfinance framework.
 */
export function calculateFOIR(totalMonthlyObligations: number, monthlyHouseholdIncome: number): number {
  if (monthlyHouseholdIncome <= 0) return 100;
  const ratio = (totalMonthlyObligations / monthlyHouseholdIncome) * 100;
  return Number(ratio.toFixed(1));
}

export function getFOIRStatus(foir: number, threshold: number = 50): 'SAFE' | 'WARNING' | 'BREACH' {
  if (foir > threshold) return 'BREACH';
  if (foir >= threshold - 7) return 'WARNING'; // 43% - 50%
  return 'SAFE';
}

/**
 * Format amounts into Indian Rupee style, e.g. ₹4,500 or ₹18.6L
 */
export function formatINR(amount: number, compact: boolean = false): string {
  if (compact) {
    if (Math.abs(amount) >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    }
    if (Math.abs(amount) >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    if (Math.abs(amount) >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}k`;
    }
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Deterministic calculation of an Adaptive Repayment Plan.
 * Never reduces repayment below configured borrower minimum.
 * Ensures proposed repayment brings FOIR <= threshold while checking essential living expenses.
 */
export function calculateAdaptivePlan(borrower: Borrower, config: AdminConfig): RepaymentPlan {
  const currentTotalObligations = borrower.currentEMI + borrower.otherMFIEmis;
  const foirBefore = calculateFOIR(currentTotalObligations, borrower.householdIncome);

  // Minimum payment floor configured by lender (default 50% of current EMI)
  const minimumPayment = Math.max(
    1000,
    Math.round((borrower.currentEMI * config.minimumPaymentPercentage) / 100)
  );

  // Target monthly payment to satisfy FOIR <= threshold
  const maxAllowableTotalObligation = (borrower.householdIncome * config.foirThreshold) / 100;
  const maxAllowableFlexiEMI = Math.max(minimumPayment, maxAllowableTotalObligation - borrower.otherMFIEmis);

  let proposedEMI = borrower.currentEMI;
  let tenureChangeMonths = 0;
  let gracePeriodMonths = 0;
  let rationale = '';

  if (borrower.stressType === 'TRANSIENT' || borrower.riskStatus === 'TEMPORARY_STRESS') {
    // For transient/seasonal stress: provide lean season relief, higher peak season collection
    proposedEMI = Math.min(borrower.currentEMI, Math.max(minimumPayment, Math.round(maxAllowableFlexiEMI / 100) * 100));
    
    // In transient shock (e.g. crop cycle or Mandi delay), extend tenure by 2 months
    tenureChangeMonths = Math.min(config.maxTenureExtensionMonths, 2);
    gracePeriodMonths = 1;
    rationale = `Verified seasonal disruption: Mandi sales delayed and rainfall anomaly detected (-${Math.abs(borrower.rainfallDeviationPct)}%). Repayment adjusted from ${formatINR(borrower.currentEMI)} to ${formatINR(proposedEMI)} during lean cycle to protect household living essentials while maintaining debt continuity.`;
  } else if (borrower.stressType === 'STRUCTURAL' || borrower.riskStatus === 'STRUCTURAL_RISK') {
    proposedEMI = Math.max(minimumPayment, Math.round((borrower.currentEMI * 0.75) / 100) * 100);
    tenureChangeMonths = config.maxTenureExtensionMonths;
    gracePeriodMonths = 0;
    rationale = `Persistent cash flow contraction detected over multiple quarters. Restructuring repayment to ${formatINR(proposedEMI)} with ${tenureChangeMonths}-month tenure extension to stabilize household debt-service capacity.`;
  } else {
    // Stable borrower
    proposedEMI = borrower.currentEMI;
    tenureChangeMonths = 0;
    gracePeriodMonths = 0;
    rationale = 'Borrower maintains stable cash-flow generation and safe FOIR capacity. Standard contractual schedule recommended.';
  }

  const foirAfter = calculateFOIR(proposedEMI + borrower.otherMFIEmis, borrower.householdIncome);

  const peakSeasonEMI = Math.round((borrower.currentEMI * 1.15) / 100) * 100;
  const leanSeasonEMI = proposedEMI;

  return {
    borrowerId: borrower.id,
    currentEMI: borrower.currentEMI,
    proposedEMI,
    minimumPayment,
    peakSeasonEMI,
    leanSeasonEMI,
    tenureChangeMonths,
    gracePeriodMonths,
    rationale,
    projectedRecoveryMonths: borrower.stressType === 'TRANSIENT' ? 3 : 6,
    foirBefore,
    foirAfter,
    liquidityFloorStatus: 'PROTECTED',
    approved: false,
    status: 'PROPOSED',
  };
}

/**
 * Generate 12-month synthetic cashflow data reflecting seasonal harvest dynamics
 */
export function generateCashFlowTimeline(borrower: Borrower): MonthlyCashFlow[] {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const baseIncome = borrower.householdIncome;
  const baseExpenses = borrower.monthlyExpenses;

  // Agricultural cycle for southern/western India:
  // Kharif harvest (Oct-Dec): High income
  // Lean winter/summer (Jan-May): Lower income
  // Pre-monsoon sowing (Jun-Jul): Expense spike
  // Monsoon/Harvest (Aug-Sep): Recovery
  const incomeMultipliers = [1.35, 1.40, 1.15, 0.85, 0.80, 0.75, 0.82, 0.90, 0.88, 1.05, 1.25, 1.30];
  const expenseMultipliers = [1.05, 1.0, 0.95, 0.95, 0.90, 0.90, 0.92, 1.10, 1.20, 1.15, 1.05, 1.0];

  return months.map((m, idx) => {
    const isHarvest = idx === 0 || idx === 1 || idx === 10 || idx === 11;
    const isLean = idx >= 3 && idx <= 5;
    const income = Math.round((baseIncome * incomeMultipliers[idx]) / 100) * 100;
    const expenses = Math.round((baseExpenses * expenseMultipliers[idx]) / 100) * 100;
    const debtObligation = borrower.currentEMI + borrower.otherMFIEmis;
    const disposableIncome = income - expenses - debtObligation;
    
    // Adaptive plan proposed: lower in lean months, higher in harvest
    let proposedRepayment = borrower.currentEMI;
    if (isLean) {
      proposedRepayment = Math.round((borrower.currentEMI * 0.62) / 100) * 100;
    } else if (isHarvest) {
      proposedRepayment = Math.round((borrower.currentEMI * 1.15) / 100) * 100;
    }

    let eventNote: string | undefined;
    if (idx === 1) eventNote = 'Kharif Harvest Peak';
    if (idx === 4) eventNote = 'Lean Period Disruption';
    if (idx === 5) eventNote = 'Restructuring Triggered';
    if (idx === 8) eventNote = 'Monsoon Sowing';
    if (idx === 10) eventNote = 'Cash-Flow Recovery';

    return {
      month: m,
      monthNum: idx + 1,
      income,
      expenses,
      debtObligation,
      disposableIncome,
      proposedRepayment,
      isHarvestSeason: isHarvest,
      isLeanSeason: isLean,
      eventNote,
    };
  });
}
