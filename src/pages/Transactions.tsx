import { useState } from 'react';
import { mockTransactions } from '@/data/mockTransactions';
import { TransactionTimeline } from '@/components/TransactionTimeline';
import type { TransactionStatus } from '@/types';
import { cx } from '@/lib/format';

const STATUS_FILTERS: ('All' | TransactionStatus)[] = ['All', 'Confirmed', 'Processing', 'Failed'];

export default function Transactions() {
  const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]>('All');

  const filtered =
    filter === 'All' ? mockTransactions : mockTransactions.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">
        Configuration drafts, policy updates, simulations, human approvals and Stellar transactions across your
        issuances.
      </p>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cx(
              'rounded-full px-4 py-2 text-xs font-medium border transition-colors',
              filter === f
                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
                : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-2 md:p-3">
        {filtered.length > 0 ? (
          <TransactionTimeline transactions={filtered} />
        ) : (
          <p className="text-sm text-[var(--color-text-secondary)] text-center py-16">
            No activity with this status.
          </p>
        )}
      </div>
    </div>
  );
}
