/**
 * Stellar services layer — MOCK IMPLEMENTATION.
 *
 * This file isolates every point where AssetMind talks to the Stellar
 * network so the mock functions below can later be swapped for real
 * Soroban contract calls / Horizon & Freighter SDK calls without
 * touching any UI code.
 *
 * IMPORTANT: AssetMind's AI never signs or submits a transaction on its
 * own. Every write here represents an action a HUMAN takes with a
 * connected wallet (e.g. Freighter) after reviewing an AI-drafted
 * configuration. The AI prepares; the human approves; the wallet signs.
 */

import { generateTxId } from '@/data/mockTransactions';

export interface WalletConnection {
  publicKey: string;
  network: 'Stellar Testnet';
  balanceXlm: number;
  role: 'Human signer';
}

const MOCK_LATENCY = 650;

function delay<T>(value: T, ms: number = MOCK_LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/** Connect a Freighter wallet as the human signer. MOCK: deterministic testnet key. */
export async function connectWallet(): Promise<WalletConnection> {
  return delay({
    publicKey: 'GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37',
    network: 'Stellar Testnet',
    balanceXlm: 10248.42,
    role: 'Human signer',
  });
}

/** Fetch the current XLM balance for a connected wallet. MOCK. */
export async function getWalletBalance(publicKey: string): Promise<number> {
  void publicKey;
  return delay(10248.42, 300);
}

export interface IssuanceConfigParams {
  name: string;
  totalValue: number;
  tokenSupply: number;
  transferRestrictions: boolean;
  clawback: boolean;
  privacy: 'Private' | 'Selective' | 'Public';
}

export interface SignedIssuanceResult {
  assetId: string;
  stellarTxId: string;
  status: 'signed_and_submitted';
}

/**
 * Submit a HUMAN-SIGNED issuance transaction to Stellar Testnet. MOCK.
 * This must only be called after explicit human approval + wallet signature —
 * never called autonomously by the AI copilot.
 */
export async function submitSignedIssuance(params: IssuanceConfigParams): Promise<SignedIssuanceResult> {
  void params;
  return delay(
    {
      assetId: `issuance-${Math.random().toString(36).slice(2, 8)}`,
      stellarTxId: generateTxId(),
      status: 'signed_and_submitted',
    },
    1200,
  );
}

/** Look up a transaction by its Stellar transaction id. MOCK. */
export async function getTransaction(stellarTxId: string): Promise<{ confirmed: boolean; ledger: number }> {
  void stellarTxId;
  return delay({ confirmed: true, ledger: 51_284_119 + Math.floor(Math.random() * 1000) }, 400);
}

/** Fetch on-chain asset metadata by asset id. MOCK. */
export async function getAssetData(assetId: string): Promise<{ assetId: string; supply: number; issuer: string }> {
  return delay(
    {
      assetId,
      supply: 50_000,
      issuer: 'GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH',
    },
    400,
  );
}
