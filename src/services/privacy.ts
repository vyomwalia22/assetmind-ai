/**
 * Privacy services layer — PROTOTYPE / TESTNET CONCEPT.
 *
 * Demonstrates how AssetMind proves investor eligibility without exposing
 * unnecessary identity information. This is NOT production-grade zero-
 * knowledge infrastructure — it is a mock that models the shape of a real
 * ZK eligibility flow so the UI, timing and outcomes can be demonstrated.
 */

const MOCK_LATENCY = 550;

function delay<T>(value: T, ms: number = MOCK_LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export type ZKProofStage = 'investor' | 'proof_generation' | 'verification' | 'eligible';

export interface ZKEligibilityResult {
  eligible: boolean;
  proofId: string;
  revealed: string[];
  keptPrivate: string[];
}

/**
 * Generate a mock zero-knowledge eligibility proof for a verified investor.
 * PROTOTYPE: reveals only the eligibility result, never identity fields.
 */
export async function generateEligibilityProof(): Promise<ZKEligibilityResult> {
  return delay({
    eligible: true,
    proofId: `zk-${Math.random().toString(36).slice(2, 10)}`,
    revealed: ['Eligibility result: Verified investor'],
    keptPrivate: ['Name', 'Address', 'Government ID', 'Underlying identity documents'],
  });
}
