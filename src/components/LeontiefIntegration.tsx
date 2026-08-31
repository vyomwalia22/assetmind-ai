import { motion } from 'framer-motion';
import { Sparkles, Settings2, ShieldCheck, Layers, Waypoints } from 'lucide-react';
import { cx } from '@/lib/format';

const NODES = [
  { icon: Sparkles, label: 'AssetMind AI', sub: 'Issuance copilot' },
  { icon: Settings2, label: 'Issuance Configuration', sub: 'Asset & token structure' },
  { icon: ShieldCheck, label: 'Compliance & Restrictions', sub: 'SEP-8, clawback, eligibility' },
  { icon: Waypoints, label: 'Leontief', sub: 'Issuance infrastructure' },
  { icon: Layers, label: 'ld-shares', sub: 'Restricted share primitive' },
];

export function LeontiefIntegration({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cx('rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6', className)}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display text-sm font-semibold">Issuance Infrastructure</h3>
        <span className="text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded-md bg-white/[0.06] border border-white/10 text-[var(--color-text-tertiary)]">
          Integration concept
        </span>
      </div>
      <p className="text-xs text-[var(--color-text-tertiary)] mb-6 max-w-md">
        AssetMind helps issuers prepare and configure restricted assets. Leontief provides the underlying
        infrastructure for tokenized shares.
      </p>

      <div className={cx('flex items-stretch', compact ? 'flex-col gap-2' : 'flex-col md:flex-row md:items-center gap-2 md:gap-0')}>
        {NODES.map((node, i) => (
          <div key={node.label} className={cx('flex items-center', compact ? 'flex-row' : 'md:flex-1 md:flex-col')}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className={cx(
                'rounded-xl border p-3.5 flex items-center gap-3 md:flex-col md:text-center md:gap-2 w-full',
                node.label === 'Leontief'
                  ? 'border-[var(--color-accent-2)]/40 bg-[var(--color-accent-2)]/[0.07]'
                  : 'border-[var(--color-border)] bg-[var(--color-panel-2)]',
              )}
            >
              <div
                className={cx(
                  'h-9 w-9 rounded-lg flex items-center justify-center shrink-0',
                  node.label === 'Leontief' ? 'bg-[var(--color-accent-2)]/20' : 'bg-[var(--color-accent)]/15',
                )}
              >
                <node.icon size={16} className={node.label === 'Leontief' ? 'text-[var(--color-accent-2)]' : 'text-[var(--color-accent)]'} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-[var(--color-text-primary)] whitespace-nowrap">{node.label}</div>
                <div className="text-[10px] text-[var(--color-text-tertiary)]">{node.sub}</div>
              </div>
            </motion.div>
            {i < NODES.length - 1 && (
              <div className={cx('flex items-center justify-center shrink-0 text-[var(--color-text-tertiary)]', compact ? 'w-6' : 'w-6 md:w-8 md:h-8')}>
                <svg width="20" height="20" viewBox="0 0 20 20" className={compact ? '' : 'md:-rotate-90'}>
                  <path d="M4 10h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-[10px] text-[var(--color-text-tertiary)] mt-6 pt-4 border-t border-[var(--color-border)]">
        Built for the Stellar ecosystem. No live Leontief integration exists yet — this diagram illustrates the
        intended issuance path.
      </p>
    </div>
  );
}
