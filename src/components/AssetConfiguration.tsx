import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Lock, RefreshCw } from 'lucide-react';
import type { IssuanceDraft } from '@/services/ai';
import { formatCurrency, formatNumber } from '@/lib/format';

const ROWS: { key: keyof IssuanceDraft; label: string }[] = [
  { key: 'assetName', label: 'Asset' },
  { key: 'assetClass', label: 'Asset class' },
  { key: 'estimatedValue', label: 'Asset value' },
  { key: 'tokenSupply', label: 'Token supply' },
  { key: 'tokenPrice', label: 'Price per share' },
  { key: 'investorAccess', label: 'Investor access' },
  { key: 'network', label: 'Network' },
];

function formatValue(key: keyof IssuanceDraft, draft: IssuanceDraft): string {
  const value = draft[key];
  if (key === 'estimatedValue') return formatCurrency(value as number);
  if (key === 'tokenSupply') return `${formatNumber(value as number)} shares`;
  if (key === 'tokenPrice') return `$${value}`;
  return String(value);
}

export function AssetConfiguration({
  draft,
  onReview,
  ctaLabel = 'Review Draft',
}: {
  draft: IssuanceDraft;
  onReview?: () => void;
  ctaLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-xl border border-[var(--color-accent)]/30 bg-gradient-to-b from-[var(--color-accent)]/[0.06] to-transparent p-5"
    >
      <div className="flex items-center gap-1.5 mb-4 text-[11px] font-mono text-[var(--color-accent-2)]">
        <Sparkles size={12} />
        AI-generated draft
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {ROWS.map((row, i) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1">
              {row.label}
            </div>
            <div className="font-mono text-sm text-[var(--color-text-primary)]">{formatValue(row.key, draft)}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md bg-[var(--color-panel-2)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
          <Lock size={10} /> {draft.transferRestrictions ? 'Restricted transfers' : 'Unrestricted'}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md bg-[var(--color-panel-2)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
          <RefreshCw size={10} /> Clawback {draft.clawback ? 'enabled' : 'disabled'}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md bg-[var(--color-panel-2)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
          <ShieldCheck size={10} /> {draft.sep8Policy}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md bg-[var(--color-panel-2)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
          {draft.privacyProof}
        </span>
      </div>

      {onReview && (
        <button
          onClick={onReview}
          className="w-full sm:w-auto inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          {ctaLabel} &rarr;
        </button>
      )}
    </motion.div>
  );
}
