import type { Issuance } from '@/types';

function perf(base: number, points = 12, volatility = 0.02): { date: string; value: number }[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let v = base * 0.94;
  return months.slice(0, points).map((m) => {
    v = v * (1 + (Math.random() - 0.3) * volatility);
    return { date: m, value: Math.round(v) };
  });
}

/**
 * Demo / Testnet data only. These are fictional private-credit issuances used to
 * illustrate the AssetMind issuance workflow — none represent a real offering.
 */
export const mockAssets: Issuance[] = [
  {
    id: 'atlas-private-credit-fund-i',
    name: 'Atlas Private Credit Fund I',
    issuer: 'Atlas Capital Partners',
    category: 'Private Credit',
    description:
      'A senior secured private-credit vehicle extending capital to mid-market operating businesses. Structured as restricted shares on Stellar Testnet with quarterly yield distributions, transfer restrictions, and clawback authority retained by the issuer.',
    totalValue: 5_000_000,
    tokenPrice: 100,
    tokenSupply: 50_000,
    sharesReserved: 12_400,
    targetYield: 10.5,
    maturity: '36 months',
    investors: 214,
    riskLevel: 'Moderate',
    privacy: 'Private',
    verification: 'Verified',
    status: 'Issued',
    investorAccess: 'Restricted',
    network: 'Stellar Testnet',
    performance: perf(100),
    ownership: [
      { label: 'Issuer Reserve', value: 18 },
      { label: 'Verified Investors', value: 71 },
      { label: 'Warehouse Facility', value: 11 },
    ],
    documents: [
      { name: 'Issuance Configuration Summary', type: 'PDF', size: '1.1 MB' },
      { name: 'SEP-8 Policy Draft', type: 'PDF', size: '340 KB' },
      { name: 'Loan Book Summary', type: 'XLSX', size: '480 KB' },
    ],
    policyExplanations: [
      { category: 'Transfer Restrictions', level: 'Low', note: 'Transfers are restricted to wallets that have passed investor eligibility verification.' },
      { category: 'Clawback', level: 'Low', note: 'The issuer retains clawback authority to recover shares when permitted by the asset policy.' },
      { category: 'Compliance Policy', level: 'Moderate', note: 'SEP-8 policy draft covers authorization, freeze and clawback flags. Requires compliance sign-off before mainnet issuance.' },
      { category: 'Privacy', level: 'Low', note: 'Investor eligibility is proven via a zero-knowledge prototype without exposing underlying identity data.' },
    ],
    compliance: {
      sep8: 'Configured',
      authorization: true,
      transferRestrictions: true,
      clawback: true,
      investorEligibility: 'Verified investors',
      issuerControls: 'Configured',
    },
    privacyConfig: {
      eligibilityProof: true,
      portfolioPrivacy: true,
      transactionAmountPrivacy: 'Prototype',
      identityDisclosure: 'Minimal',
    },
    accentSeed: 1,
  },
  {
    id: 'meridian-trade-finance-credit-pool',
    name: 'Meridian Trade Finance Credit Pool',
    issuer: 'Meridian Credit Partners',
    category: 'Private Credit',
    description:
      'A 90-day rolling private-credit pool financing verified trade receivables. Currently in compliance review ahead of investor eligibility finalization.',
    totalValue: 3_200_000,
    tokenPrice: 100,
    tokenSupply: 32_000,
    sharesReserved: 32_000,
    targetYield: 9.1,
    maturity: '90 days (rolling)',
    investors: 0,
    riskLevel: 'Moderate',
    privacy: 'Private',
    verification: 'Pending',
    status: 'In Review',
    investorAccess: 'Restricted',
    network: 'Stellar Testnet',
    performance: perf(100, 6, 0.01),
    ownership: [{ label: 'Issuer Reserve', value: 100 }],
    documents: [{ name: 'Draft Issuance Configuration', type: 'PDF', size: '640 KB' }],
    policyExplanations: [
      { category: 'Transfer Restrictions', level: 'Low', note: 'Draft configuration restricts transfers to verified investor wallets.' },
      { category: 'Clawback', level: 'Low', note: 'Clawback proposed as enabled, pending compliance sign-off.' },
      { category: 'Compliance Policy', level: 'Moderate', note: 'SEP-8 policy draft is under compliance review.' },
      { category: 'Privacy', level: 'Low', note: 'ZK eligibility proof configuration proposed, not yet finalized.' },
    ],
    compliance: {
      sep8: 'Draft generated',
      authorization: true,
      transferRestrictions: true,
      clawback: true,
      investorEligibility: 'Verified investors',
      issuerControls: 'Configured',
    },
    privacyConfig: {
      eligibilityProof: true,
      portfolioPrivacy: true,
      transactionAmountPrivacy: 'Prototype',
      identityDisclosure: 'Minimal',
    },
    accentSeed: 2,
  },
  {
    id: 'beacon-senior-secured-credit-fund',
    name: 'Beacon Senior Secured Credit Fund',
    issuer: 'Beacon Asset Management',
    category: 'Private Credit',
    description:
      'A senior secured lending fund for lower mid-market issuers. Asset configuration has been drafted with the AI copilot and awaits investor eligibility and compliance setup.',
    totalValue: 8_000_000,
    tokenPrice: 100,
    tokenSupply: 80_000,
    sharesReserved: 80_000,
    targetYield: 11.2,
    maturity: '48 months',
    investors: 0,
    riskLevel: 'Elevated',
    privacy: 'Private',
    verification: 'Pending',
    status: 'Draft',
    investorAccess: 'Restricted',
    network: 'Stellar Testnet',
    performance: perf(100, 4, 0.006),
    ownership: [{ label: 'Issuer Reserve', value: 100 }],
    documents: [{ name: 'AI-Generated Draft Configuration', type: 'PDF', size: '210 KB' }],
    policyExplanations: [
      { category: 'Transfer Restrictions', level: 'Moderate', note: 'Not yet configured — defaults to unrestricted until rules are set.' },
      { category: 'Clawback', level: 'Moderate', note: 'Not yet configured.' },
      { category: 'Compliance Policy', level: 'Elevated', note: 'SEP-8 policy has not been drafted yet.' },
      { category: 'Privacy', level: 'Moderate', note: 'Privacy configuration not yet started.' },
    ],
    compliance: {
      sep8: 'Pending',
      authorization: false,
      transferRestrictions: false,
      clawback: false,
      investorEligibility: 'Verified investors',
      issuerControls: 'Draft generated',
    },
    privacyConfig: {
      eligibilityProof: false,
      portfolioPrivacy: false,
      transactionAmountPrivacy: 'Off',
      identityDisclosure: 'Standard',
    },
    accentSeed: 3,
  },
  {
    id: 'cascade-private-credit-warehouse',
    name: 'Cascade Private Credit Warehouse',
    issuer: 'Cascade Capital',
    category: 'Private Credit',
    description:
      'A warehouse facility structured for private-credit originators ahead of a broader syndication. Configuration, compliance and privacy are complete and this issuance is ready for human review and signing.',
    totalValue: 4_500_000,
    tokenPrice: 100,
    tokenSupply: 45_000,
    sharesReserved: 45_000,
    targetYield: 10.0,
    maturity: '24 months',
    investors: 0,
    riskLevel: 'Moderate',
    privacy: 'Private',
    verification: 'Verified',
    status: 'Ready',
    investorAccess: 'Restricted',
    network: 'Stellar Testnet',
    performance: perf(100, 5, 0.008),
    ownership: [{ label: 'Issuer Reserve', value: 100 }],
    documents: [
      { name: 'Issuance Configuration Summary', type: 'PDF', size: '980 KB' },
      { name: 'SEP-8 Policy Draft', type: 'PDF', size: '310 KB' },
    ],
    policyExplanations: [
      { category: 'Transfer Restrictions', level: 'Low', note: 'Configured — transfers restricted to verified investor wallets.' },
      { category: 'Clawback', level: 'Low', note: 'Enabled and ready for review.' },
      { category: 'Compliance Policy', level: 'Low', note: 'SEP-8 policy draft complete, awaiting human sign-off.' },
      { category: 'Privacy', level: 'Low', note: 'ZK eligibility proof configured for this issuance.' },
    ],
    compliance: {
      sep8: 'Configured',
      authorization: true,
      transferRestrictions: true,
      clawback: true,
      investorEligibility: 'Verified investors',
      issuerControls: 'Configured',
    },
    privacyConfig: {
      eligibilityProof: true,
      portfolioPrivacy: true,
      transactionAmountPrivacy: 'Prototype',
      identityDisclosure: 'Minimal',
    },
    accentSeed: 4,
  },
];

export function getAssetById(id: string): Issuance | undefined {
  return mockAssets.find((a) => a.id === id);
}
