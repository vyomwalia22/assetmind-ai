/**
 * AI services layer — MOCK IMPLEMENTATION.
 *
 * AssetMind's AI is a COPILOT: it drafts, recommends, configures, validates,
 * simulates and explains issuance workflows. It never executes a transaction
 * or signs on behalf of a human. Every function below returns a proposed
 * DRAFT that still requires human review and a wallet signature.
 *
 * Designed so a real model call can be dropped in behind these signatures.
 */

export interface IssuanceDraft {
  assetName: string;
  assetClass: 'Private Credit';
  estimatedValue: number;
  tokenSupply: number;
  tokenPrice: number;
  investorAccess: 'Restricted';
  network: 'Stellar Testnet';
  transferRestrictions: boolean;
  clawback: boolean;
  sep8Policy: 'Draft generated';
  privacyProof: 'ZK eligibility proof';
}

function parseValue(text: string): number {
  const match = text.match(/\$?(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?/i);
  if (!match) return 5_000_000;
  const num = parseFloat(match[1]);
  const unit = (match[2] || '').toLowerCase();
  if (unit.startsWith('m')) return Math.round(num * 1_000_000);
  if (unit.startsWith('k')) return Math.round(num * 1_000);
  return Math.round(num);
}

function parseSupply(text: string, fallbackValue: number): number {
  const match = text.match(/(\d[\d,]*)\s*(shares?|units?|tokens?)/i);
  if (match) return parseInt(match[1].replace(/,/g, ''), 10);
  // Default to $100/share, matching the Atlas Private Credit Fund I convention.
  return Math.max(1, Math.round(fallbackValue / 100));
}

/**
 * Interpret a natural-language issuance request into a DRAFT configuration.
 * This is workflow assistance only — the draft always requires human review
 * and compliance sign-off before anything is signed or issued.
 */
export function interpretIssuanceCommand(command: string): IssuanceDraft {
  const estimatedValue = parseValue(command);
  const tokenSupply = parseSupply(command, estimatedValue);
  const tokenPrice = Math.max(1, Math.round((estimatedValue / tokenSupply) * 100) / 100);

  return {
    assetName: 'Atlas Private Credit Fund I',
    assetClass: 'Private Credit',
    estimatedValue,
    tokenSupply,
    tokenPrice,
    investorAccess: 'Restricted',
    network: 'Stellar Testnet',
    transferRestrictions: true,
    clawback: true,
    sep8Policy: 'Draft generated',
    privacyProof: 'ZK eligibility proof',
  };
}

export const REASONING_STEPS_DRAFT = [
  'Reading issuance request…',
  'Drafting asset configuration…',
  'Proposing transfer & clawback rules…',
  'Generating SEP-8 policy draft…',
  'Preparing privacy configuration…',
];

export const REASONING_STEPS_ANALYZE = [
  'Reading issuance portfolio…',
  'Cross-referencing compliance status…',
  'Computing concentration and readiness…',
  'Drafting recommendation…',
];

/** AI-generated observations about the issuer's book. Workflow assistance only. */
export function generateIssuerInsight(): string {
  const insights = [
    'Two issuances are ready for human review. Cascade Private Credit Warehouse has completed compliance and privacy configuration and is awaiting signature.',
    'Beacon Senior Secured Credit Fund has no compliance policy drafted yet. Recommend running the Issuance Copilot to generate a SEP-8 draft before submitting for review.',
    'Meridian Trade Finance Credit Pool is pending investor eligibility verification. Compliance review is the next blocking step before simulation.',
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}

/** Plain-language explanations the copilot can give about a policy control. Not legal advice. */
export const POLICY_EXPLANATIONS: Record<string, string> = {
  transferRestrictions:
    'Restricted transfers prevent tokens from being transferred to unauthorized or unverified accounts.',
  clawback:
    'Clawback allows the issuer to recover tokens from an investor account when permitted by the asset policy — for example, in the case of a compliance violation.',
  authorization:
    'Authorization required means the issuer (or its policy contract) must approve an account before it can hold or transact in this asset.',
  sep8: 'SEP-8 is a Stellar protocol for regulated assets that lets an issuer approve, reject or revise transactions before they settle.',
  eligibilityProof:
    'A zero-knowledge eligibility proof lets an investor prove they meet verification requirements without revealing the underlying identity documents to the issuer or the network.',
};
