import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { AssetCard } from '@/components/AssetCard';
import { mockAssets } from '@/data/mockAssets';
import type { IssuanceStatusType } from '@/types';
import { cx } from '@/lib/format';

const FILTERS: ('All' | IssuanceStatusType)[] = ['All', 'Draft', 'In Review', 'Ready', 'Issued'];

export default function Marketplace() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return mockAssets;
    return mockAssets.filter((a) => a.status === filter);
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
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
        <Link
          to="/app/create"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-panel)] text-xs font-medium px-3.5 py-2 hover:border-[var(--color-accent)]/50 transition-colors shrink-0"
        >
          <PlusCircle size={13} />
          Start an Issuance
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-16 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">No issuances match this filter yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0">
          {filtered.map((asset, i) => (
            <AssetCard asset={asset} key={asset.id} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
