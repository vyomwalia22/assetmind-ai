/**
 * Leontief integration layer — INTEGRATION CONCEPT / PROTOTYPE.
 *
 * AssetMind positions itself as an AI issuance front-end FOR Leontief,
 * not a competing infrastructure layer. Leontief is described here as the
 * underlying issuance infrastructure that turns a configured, compliant
 * issuance into ld-shares on Stellar.
 *
 * No live Leontief integration exists yet. Every function below is a
 * clearly-labeled mock so the UI can demonstrate the intended workflow
 * without claiming a real connection.
 */

const MOCK_LATENCY = 900;

function delay<T>(value: T, ms: number = MOCK_LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export type LeontiefOnboardingStatus = 'not_started' | 'ready_for_onboarding' | 'prepared' | 'onboarded';

export interface LeontiefPrepareParams {
  issuanceId: string;
  assetName: string;
  tokenSupply: number;
  transferRestrictions: boolean;
  clawback: boolean;
}

export interface LeontiefPrepareResult {
  status: 'prepared';
  ldShareClass: string;
  note: string;
}

/**
 * Prepare a configured issuance for Leontief onboarding. INTEGRATION CONCEPT:
 * simulates handing off a restricted asset configuration to Leontief's
 * ld-shares issuance infrastructure. Does not call a real Leontief API.
 */
export async function prepareForLeontief(params: LeontiefPrepareParams): Promise<LeontiefPrepareResult> {
  return delay({
    status: 'prepared',
    ldShareClass: `ld-shares:${params.issuanceId}`,
    note: 'Prototype hand-off — no live Leontief integration exists yet.',
  });
}
