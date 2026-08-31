import type { IssuanceStatusType } from '@/types';
import { cx } from '@/lib/format';

const STATUS_STYLES: Record<IssuanceStatusType, string> = {
  Draft: 'text-[var(--color-text-tertiary)] bg-white/[0.06] border-white/10',
  'In Review': 'text-[var(--color-warning)] bg-[var(--color-warning)]/10 border-[var(--color-warning)]/25',
  Ready: 'text-[var(--color-accent-2)] bg-[var(--color-accent-2)]/10 border-[var(--color-accent-2)]/25',
  Issued: 'text-[var(--color-positive)] bg-[var(--color-positive)]/10 border-[var(--color-positive)]/25',
};

export function IssuanceStatus({ status, className }: { status: IssuanceStatusType; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded-md border',
        STATUS_STYLES[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
