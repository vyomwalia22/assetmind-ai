export type AssetCategory = 'Private Credit';

export type PrivacyStatus = 'Private' | 'Selective' | 'Public';
export type RiskLevel = 'Low' | 'Moderate' | 'Elevated';
export type VerificationStatus = 'Verified' | 'Pending' | 'Under Review';
export type IssuanceStatusType = 'Draft' | 'In Review' | 'Ready' | 'Issued';
export type ComplianceState = 'Configured' | 'Draft generated' | 'Pending';
export type InvestorAccess = 'Restricted';
export type InvestorEligibility = 'Verified investors';
export type TransactionAmountPrivacy = 'Prototype' | 'On' | 'Off';
export type IdentityDisclosure = 'Minimal' | 'Standard';

export interface AssetPerformancePoint {
  date: string;
  value: number;
}

export interface AssetOwnershipSlice {
  label: string;
  value: number;
}

export interface ComplianceConfig {
  sep8: ComplianceState;
  authorization: boolean;
  transferRestrictions: boolean;
  clawback: boolean;
  investorEligibility: InvestorEligibility;
  issuerControls: ComplianceState;
}

export interface PrivacyConfig {
  eligibilityProof: boolean;
  portfolioPrivacy: boolean;
  transactionAmountPrivacy: TransactionAmountPrivacy;
  identityDisclosure: IdentityDisclosure;
}

/** A private-credit issuance managed on AssetMind. Demo / testnet data only. */
export interface Issuance {
  id: string;
  name: string;
  issuer: string;
  category: AssetCategory;
  description: string;
  totalValue: number;
  tokenPrice: number;
  tokenSupply: number;
  sharesReserved: number;
  targetYield: number;
  maturity: string;
  investors: number;
  riskLevel: RiskLevel;
  privacy: PrivacyStatus;
  verification: VerificationStatus;
  status: IssuanceStatusType;
  investorAccess: InvestorAccess;
  network: 'Stellar Testnet';
  performance: AssetPerformancePoint[];
  ownership: AssetOwnershipSlice[];
  documents: { name: string; type: string; size: string }[];
  policyExplanations: { category: string; level: RiskLevel; note: string }[];
  compliance: ComplianceConfig;
  privacyConfig: PrivacyConfig;
  accentSeed: number;
}

export type TransactionType =
  | 'Configuration Generated'
  | 'Policy Updated'
  | 'Simulation Completed'
  | 'Human Approval Requested'
  | 'Wallet Signature'
  | 'Stellar Transaction';

export type TransactionStatus = 'Confirmed' | 'Processing' | 'Failed';

export interface StellarTransaction {
  id: string;
  type: TransactionType;
  amountTokens: number;
  asset: string;
  wallet: string;
  status: TransactionStatus;
  timestamp: string;
  stellarTxId: string;
  isHumanApproval?: boolean;
}

export interface PortfolioAllocation {
  label: AssetCategory;
  percent: number;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
