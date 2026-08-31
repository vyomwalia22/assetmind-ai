import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Cpu, ShieldCheck, CheckCircle2, RotateCw } from 'lucide-react';
import { generateEligibilityProof, type ZKEligibilityResult } from '@/services/privacy';
import { cx } from '@/lib/format';

type Stage = 'idle' | 'investor' | 'generating' | 'verifying' | 'eligible';

const STAGES: { key: Stage; label: string; icon: typeof User }[] = [
  { key: 'investor', label: 'Investor', icon: User },
  { key: 'generating', label: 'Proof Generation', icon: Cpu },
  { key: 'verifying', label: 'Zero-Knowledge Verification', icon: ShieldCheck },
  { key: 'eligible', label: 'Eligible', icon: CheckCircle2 },
];

export function PrivacyProof({ className }: { className?: string }) {
  const [stage, setStage] = useState<Stage>('idle');
  const [result, setResult] = useState<ZKEligibilityResult | null>(null);

  const run = async () => {
    setResult(null);
    setStage('investor');
    await new Promise((r) => setTimeout(r, 500));
    setStage('generating');
    const proof = await generateEligibilityProof();
    setStage('verifying');
    await new Promise((r) => setTimeout(r, 700));
    setStage('eligible');
    setResult(proof);
  };

  const activeIndex = STAGES.findIndex((s) => s.key === stage);

  return (
    <div className={cx('rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-sm font-semibold">ZK Accreditation / Eligibility Proof</h3>
          <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1">Prototype / Testnet concept</p>
        </div>
        <button
          onClick={run}
          disabled={stage !== 'idle' && stage !== 'eligible'}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-panel-2)] px-3 py-1.5 text-xs font-medium hover:border-[var(--color-accent)]/50 disabled:opacity-50 transition-colors"
        >
          <RotateCw size={12} className={stage !== 'idle' && stage !== 'eligible' ? 'animate-spin' : ''} />
          {stage === 'idle' ? 'Run proof' : stage === 'eligible' ? 'Run again' : 'Running…'}
        </button>
      </div>

      <div className="flex items-center justify-between">
        {STAGES.map((s, i) => {
          const done = activeIndex > i || (activeIndex === i && stage === 'eligible');
          const active = activeIndex === i && stage !== 'eligible';
          return (
            <div key={s.key} className="flex-1 flex items-center">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={cx(
                    'h-11 w-11 rounded-full border flex items-center justify-center transition-colors duration-300',
                    done
                      ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                      : active
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                        : 'border-[var(--color-border)] bg-transparent',
                  )}
                >
                  <s.icon
                    size={17}
                    className={cx(done ? 'text-black' : active ? 'text-[var(--color-accent)] animate-pulse' : 'text-[var(--color-text-tertiary)]')}
                  />
                </div>
                <span
                  className={cx(
                    'text-[10px] font-mono text-center leading-tight',
                    done || active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]',
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STAGES.length - 1 && (
                <div className={cx('h-px flex-1 mx-1 -mt-5 transition-colors duration-500', activeIndex > i ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]')} />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {result && stage === 'eligible' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 grid sm:grid-cols-2 gap-3"
          >
            <div className="rounded-xl border border-[var(--color-positive)]/25 bg-[var(--color-positive)]/[0.06] p-4">
              <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-2">What is revealed</div>
              {result.revealed.map((r) => (
                <div key={r} className="text-xs text-[var(--color-positive)] font-mono flex items-center gap-1.5">
                  <CheckCircle2 size={11} /> {r}
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-2)] p-4">
              <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-2">What stays private</div>
              <div className="space-y-1">
                {result.keptPrivate.map((r) => (
                  <div key={r} className="text-xs text-[var(--color-text-tertiary)] font-mono">
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
