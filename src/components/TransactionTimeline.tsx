import { motion } from 'framer-motion';
import { Settings2, FileCheck2, PlayCircle, UserCheck, Wallet2, Send } from 'lucide-react';
import type { StellarTransaction, TransactionType } from '@/types';
import { formatNumber } from '@/lib/format';
import { cx } from '@/lib/format';

const TYPE_ICON: Record<TransactionType, typeof Settings2> = {
  'Configuration Generated': Settings2,
  'Policy Updated': FileCheck2,
  'Simulation Completed': PlayCircle,
  'Human Approval Requested': UserCheck,
  'Wallet Signature': Wallet2,
  'Stellar Transaction': Send,
};

const STATUS_COLOR: Record<StellarTransaction['status'], string> = {
  Confirmed: 'text-[var(--color-positive)] bg-[var(--color-positive)]/10',
  Processing: 'text-[var(--color-warning)] bg-[var(--color-warning)]/10',
  Failed: 'text-[var(--color-negative)] bg-[var(--color-negative)]/10',
};

export function TransactionTimeline({ transactions }: { transactions: StellarTransaction[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[var(--color-border)]" />
      <div className="space-y-1">
        {transactions.map((tx, i) => {
          const Icon = TYPE_ICON[tx.type];
          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.35 }}
              className={cx(
                'relative flex gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors',
                tx.isHumanApproval && 'ring-1 ring-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.04]',
              )}
            >
              <div
                className={cx(
                  'relative z-10 h-10 w-10 rounded-full border flex items-center justify-center shrink-0',
                  tx.isHumanApproval
                    ? 'bg-[var(--color-accent)]/15 border-[var(--color-accent)]/40'
                    : 'bg-[var(--color-panel-2)] border-[var(--color-border)]',
                )}
              >
                <Icon size={15} className={tx.isHumanApproval ? 'text-[var(--color-accent-2)]' : 'text-[var(--color-accent)]'} />
              </div>
              <div className="flex-1 min-w-0 flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">{tx.type}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${STATUS_COLOR[tx.status]}`}>
                      {tx.status}
                    </span>
                    {tx.isHumanApproval && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[var(--color-accent-2)] bg-[var(--color-accent-2)]/10">
                        Human action
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5 truncate">
                    {formatNumber(tx.amountTokens)} shares &middot; {tx.asset}
                  </p>
                  <p className="text-[10px] font-mono text-[var(--color-text-tertiary)] mt-1 truncate">
                    {tx.wallet} &middot; {tx.stellarTxId.slice(0, 10)}…
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[var(--color-text-tertiary)] whitespace-nowrap">
                  {tx.timestamp}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
