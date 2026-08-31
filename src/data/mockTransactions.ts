import type { StellarTransaction } from '@/types';

function stellarTxId(seed: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  let s = seed * 9301 + 49297;
  for (let i = 0; i < 56; i++) {
    s = (s * 9301 + 49297) % 233280;
    out += chars[s % chars.length];
  }
  return out;
}

function wallet(seed: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = 'G';
  let s = seed * 7919 + 104729;
  for (let i = 0; i < 6; i++) {
    s = (s * 7919 + 104729) % 233280;
    out += chars[s % chars.length];
  }
  return out + '...' + chars[(s + 7) % chars.length] + chars[(s + 13) % chars.length] + chars[(s + 19) % chars.length] + chars[(s + 23) % chars.length];
}

/** Demo / Testnet activity feed for AssetMind issuance workflows. */
export const mockTransactions: StellarTransaction[] = [
  {
    id: 'tx-1',
    type: 'Configuration Generated',
    amountTokens: 50000,
    asset: 'Atlas Private Credit Fund I',
    wallet: wallet(1),
    status: 'Confirmed',
    timestamp: '12 mins ago',
    stellarTxId: stellarTxId(1),
  },
  {
    id: 'tx-2',
    type: 'Policy Updated',
    amountTokens: 50000,
    asset: 'Atlas Private Credit Fund I',
    wallet: wallet(2),
    status: 'Confirmed',
    timestamp: '24 mins ago',
    stellarTxId: stellarTxId(2),
  },
  {
    id: 'tx-3',
    type: 'Simulation Completed',
    amountTokens: 45000,
    asset: 'Cascade Private Credit Warehouse',
    wallet: wallet(3),
    status: 'Confirmed',
    timestamp: '1 hour ago',
    stellarTxId: stellarTxId(3),
  },
  {
    id: 'tx-4',
    type: 'Human Approval Requested',
    amountTokens: 45000,
    asset: 'Cascade Private Credit Warehouse',
    wallet: wallet(4),
    status: 'Processing',
    timestamp: '1 hour ago',
    stellarTxId: stellarTxId(4),
    isHumanApproval: true,
  },
  {
    id: 'tx-5',
    type: 'Wallet Signature',
    amountTokens: 50000,
    asset: 'Atlas Private Credit Fund I',
    wallet: wallet(5),
    status: 'Confirmed',
    timestamp: '3 hours ago',
    stellarTxId: stellarTxId(5),
    isHumanApproval: true,
  },
  {
    id: 'tx-6',
    type: 'Stellar Transaction',
    amountTokens: 50000,
    asset: 'Atlas Private Credit Fund I',
    wallet: wallet(6),
    status: 'Confirmed',
    timestamp: '3 hours ago',
    stellarTxId: stellarTxId(6),
  },
  {
    id: 'tx-7',
    type: 'Configuration Generated',
    amountTokens: 32000,
    asset: 'Meridian Trade Finance Credit Pool',
    wallet: wallet(7),
    status: 'Confirmed',
    timestamp: '9 hours ago',
    stellarTxId: stellarTxId(7),
  },
  {
    id: 'tx-8',
    type: 'Policy Updated',
    amountTokens: 80000,
    asset: 'Beacon Senior Secured Credit Fund',
    wallet: wallet(8),
    status: 'Failed',
    timestamp: '1 day ago',
    stellarTxId: stellarTxId(8),
  },
];

export function generateTxId(): string {
  return stellarTxId(Math.floor(Math.random() * 100000));
}
