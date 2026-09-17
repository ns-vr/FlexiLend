export type RiskStatus = 'STABLE' | 'WATCH' | 'TEMPORARY_STRESS' | 'STRUCTURAL_RISK';
export type StressType = 'NONE' | 'TRANSIENT' | 'STRUCTURAL' | 'CONTAGION_RISK';
export type RepaymentFrequency = 'MONTHLY' | 'FORTNIGHTLY' | 'WEEKLY';
export type UserRole = 'MFI_ADMIN' | 'CREDIT_OFFICER' | 'RISK_ANALYST' | 'AUDITOR';

export interface Borrower {
  id: string;
  borrowerId: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  location: string;
  district: string;
  state: string;
  occupation: string;
  householdIncome: number; // Monthly in ₹
  monthlyExpenses: number; // Essential living expenses
  existingDebt: number; // Total outstanding debt
  otherMFIEmis: number; // Monthly obligations from other lenders
  currentEMI: number; // Current scheduled EMI
  loanAmount: number;
  remainingPrincipal: number;
  interestRate: number; // Annual %
  tenureMonths: number;
  completedMonths: number;
  repaymentFrequency: RepaymentFrequency;
  groupId: string;
  groupName: string;
  riskStatus: RiskStatus;
  stressType: StressType;
  stressConfidence: number; // e.g. 82%
  primaryCropOrBusiness: string;
  lastMandiTransaction?: string;
  rainfallDeviationPct: number; // e.g. -28%
  repaymentHistory: number[]; // 1 for paid on-time, 0.5 for partial, 0 for missed
  creditScore: number;
  phone: string;
  avatarUrl?: string;
}

export interface Transaction {
  id: string;
  borrowerId: string;
  date: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  category: 'Mandi Receipt' | 'Milk Cooperative' | 'UPI Transfer' | 'Fertilizer/Seeds' | 'Utility' | 'Living Expense' | 'Loan Repayment' | 'Direct Benefit Transfer';
  source: 'Digital' | 'Offline OCR' | 'Account Aggregator' | 'Direct Benefit Transfer';
  confidence: number;
  merchantOrParty: string;
  notes?: string;
}

export interface MonthlyCashFlow {
  month: string;
  monthNum: number;
  income: number;
  expenses: number;
  debtObligation: number;
  disposableIncome: number;
  proposedRepayment: number;
  isHarvestSeason?: boolean;
  isLeanSeason?: boolean;
  eventNote?: string;
}

export interface StressEvent {
  id: string;
  borrowerId: string;
  type: 'SEASONAL_DROUGHT' | 'MANDI_DELAY' | 'PRICE_DROP' | 'PEST_OUTBREAK' | 'FAMILY_HEALTH' | 'SHG_CONTAGION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detectedDate: string;
  evidence: string[];
  status: 'ACTIVE' | 'RESOLVED' | 'MONITORING';
  stressLayer: 'TRANSIENT' | 'STRUCTURAL';
}

export interface RepaymentPlan {
  borrowerId: string;
  currentEMI: number;
  proposedEMI: number;
  minimumPayment: number;
  peakSeasonEMI: number;
  leanSeasonEMI: number;
  tenureChangeMonths: number;
  gracePeriodMonths: number;
  rationale: string;
  projectedRecoveryMonths: number;
  foirBefore: number;
  foirAfter: number;
  liquidityFloorStatus: 'PROTECTED' | 'AT_RISK';
  approved: boolean;
  status: 'PROPOSED' | 'ACTIVE' | 'COMPLETED';
}

export interface SHGGroup {
  groupId: string;
  groupName: string;
  village: string;
  district: string;
  leaderName: string;
  membersCount: number;
  memberIds: string[];
  repaymentRate: number; // Percentage, e.g. 91%
  stressedMembers: number;
  contagionRisk: 'LOW' | 'MODERATE' | 'HIGH';
  avgHouseholdIncome: number;
  meetingFrequency: 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY';
  clusterSector: string;
}

export interface AlertSignal {
  id: string;
  timestamp: string;
  type: 'INCOME' | 'UTILITY' | 'MANDI' | 'SHG' | 'FOIR';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  borrowerId?: string;
  borrowerName?: string;
  groupId?: string;
  evidenceMetric?: string;
  isRead: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  borrowerId?: string;
  borrowerName?: string;
  reason: string;
  status: 'SUCCESS' | 'FLAGGED' | 'COMPLETED';
  meta?: Record<string, any>;
}

export interface AdminConfig {
  foirThreshold: number; // 50%
  minimumPaymentPercentage: number; // 50% of current EMI
  liquidityFloorAmount: number; // ₹16.2 Lakhs
  currentPortfolioCollection: number; // ₹18.6 Lakhs
  maxTenureExtensionMonths: number; // 3 months
  maxGracePeriodMonths: number; // 2 months
  stressSensitivity: 'CONSERVATIVE' | 'BALANCED' | 'HIGH';
  shgContagionThreshold: number; // 25% of members
  autoAlertsEnabled: boolean;
  aiExplanationsEnabled: boolean;
}

export interface XAIDriver {
  name: string;
  contributionPct: number; // e.g. +32%
  direction: 'RISK_INCREASING' | 'RISK_DECREASING';
  evidenceValue: string;
  category: 'SEASONALITY' | 'WEATHER' | 'TRANSACTION' | 'OBLIGATION' | 'HISTORY';
}

export interface ExtractedDocument {
  id: string;
  fileName: string;
  docType: 'Mandi Receipt' | 'Cash Logbook' | 'Utility Bill' | 'Milk Union Slip';
  date: string;
  amount: number;
  transactionType: 'INCOME' | 'EXPENSE';
  merchant: string;
  category: string;
  confidence: number;
  rawTextPreview: string;
  status: 'EXTRACTED' | 'CONFIRMED' | 'DISCARDED';
}
