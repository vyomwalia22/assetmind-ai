import { motion } from 'framer-motion';
import { Sparkles, UserCheck, Wallet2, ArrowDown, CheckCircle2 } from 'lucide-react';
import { cx } from '@/lib/format';

type StageState = 'complete' | 'active' | 'pending';

const STAGES: { key: 'ai' | 'human' | 'wallet'; title: string; icon: typeof Sparkles; labels: Record<StageState, string> }[] = [
  { key: 'ai', title: 'AI Copilot', icon: Sparkles, labels: { complete: 'Prepared', active: 'Preparing…', pending: 'Not started' } },
  { key: 'human', title: 'Human Review', icon: UserCheck, labels: { complete: 'Approved', active: 'Required', pending: 'Waiting' } },
  { key: 'wallet', title: 'Wallet', icon: Wallet2, labels: { complete: 'Signed', active: 'Signature required', pending: 'Awaiting review' } },
];

export function HumanApproval({
  aiState = 'complete',
  humanState = 'active',
  walletState = 'pending',
  className,
}: {
  aiState?: StageState;
  humanState?: StageState;
  walletState?: StageState;
  className?: string;
}) {
  const states: Record<string, StageState> = { ai: aiState, human: humanState, wallet: walletState };

  return (
    <div className={cx('flex flex-col items-center gap-0', className)}>
      {STAGES.map((stage, i) => {
        const state = states[stage.key];
        return (
          <div key={stage.key} className="flex flex-col items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className={cx(
                'w-full max-w-xs rounded-2xl border p-5 flex items-center gap-4 transition-colors',
                state === 'complete' && 'border-[var(--color-positive)]/30 bg-[var(--color-positive)]/[0.06]',
                state === 'active' && 'border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.08]',
                state === 'pending' && 'border-[var(--color-border)] bg-[var(--color-panel)]',
              )}
            >
              <div
                className={cx(
                  'h-11 w-11 rounded-full flex items-center justify-center shrink-0',
                  state === 'complete' && 'bg-[var(--color-positive)]',
                  state === 'active' && 'bg-[var(--color-accent)]',
                  state === 'pending' && 'bg-[var(--color-panel-2)] border border-[var(--color-border)]',
                )}
              >
                {state === 'complete' ? (
                  <CheckCircle2 size={18} className="text-black" />
                ) : (
                  <stage.icon size={18} className={state === 'active' ? 'text-black' : 'text-[var(--color-text-tertiary)]'} />
                )}
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-[var(--color-text-primary)]">{stage.title}</div>
                <div
                  className={cx(
                    'text-xs font-mono mt-0.5',
                    state === 'complete' && 'text-[var(--color-positive)]',
                    state === 'active' && 'text-[var(--color-accent-2)]',
                    state === 'pending' && 'text-[var(--color-text-tertiary)]',
                  )}
                >
                  {stage.labels[state]}
                </div>
              </div>
            </motion.div>
            {i < STAGES.length - 1 && (
              <div className="py-2 text-[var(--color-text-tertiary)]">
                <ArrowDown size={16} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
