import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, PieChart as PieIcon, Coins, UserCheck } from 'lucide-react';
import { PrivacyProof } from '@/components/PrivacyProof';
import { cx } from '@/lib/format';

const SETTINGS = [
  { key: 'eligibility', label: 'Investor Eligibility Proof', icon: UserCheck, state: 'ON' as const },
  { key: 'portfolio', label: 'Portfolio Privacy', icon: PieIcon, state: 'ON' as const },
  { key: 'amount', label: 'Transaction Amount Privacy', icon: Coins, state: 'Prototype' as const },
  { key: 'identity', label: 'Identity Disclosure', icon: Eye, state: 'Minimal' as const },
];

function StateBadge({ state }: { state: 'ON' | 'Prototype' | 'Minimal' }) {
  return (
    <span
      className={cx(
        'text-[10px] font-mono px-2 py-0.5 rounded',
        state === 'ON' && 'text-[var(--color-positive)] bg-[var(--color-positive)]/10',
        state === 'Prototype' && 'text-[var(--color-warning)] bg-[var(--color-warning)]/10',
        state === 'Minimal' && 'text-[var(--color-accent-2)] bg-[var(--color-accent-2)]/10',
      )}
    >
      {state}
    </span>
  );
}

export default function Privacy() {
  const [toggles, setToggles] = useState({ eligibility: true, portfolio: true });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-2">
          Prove eligibility without exposing unnecessary information.
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">
          AssetMind demonstrates how an issuer can verify investor eligibility using a zero-knowledge proof concept
          &mdash; without collecting or exposing identity documents on-chain.
        </p>
      </div>

      <PrivacyProof />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
          <h3 className="font-display text-sm font-semibold mb-4">Privacy settings</h3>
          <div className="space-y-2">
            {SETTINGS.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <s.icon size={14} className="text-[var(--color-accent)]" />
                  <span className="text-sm text-[var(--color-text-primary)]">{s.label}</span>
                </div>
                {(s.key === 'eligibility' || s.key === 'portfolio') ? (
                  <button
                    onClick={() => setToggles((t) => ({ ...t, [s.key]: !t[s.key as 'eligibility' | 'portfolio'] }))}
                    role="switch"
                    aria-checked={toggles[s.key as 'eligibility' | 'portfolio']}
                    className={cx(
                      'h-6 w-11 rounded-full flex items-center px-0.5 transition-colors shrink-0',
                      toggles[s.key as 'eligibility' | 'portfolio'] ? 'bg-[var(--color-accent)] justify-end' : 'bg-[var(--color-panel-3)] justify-start',
                    )}
                  >
                    <span className="h-5 w-5 rounded-full bg-white block" />
                  </button>
                ) : (
                  <StateBadge state={s.state} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
          <h3 className="font-display text-sm font-semibold mb-4">What is revealed / what stays private</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-[var(--color-positive)]/25 bg-[var(--color-positive)]/[0.06] p-3.5">
              <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1.5">What is revealed</div>
              <div className="text-xs text-[var(--color-positive)] font-mono">Eligibility result</div>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-2)] p-3.5">
              <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1.5">What stays private</div>
              <div className="text-xs text-[var(--color-text-secondary)] font-mono">Underlying identity information</div>
            </div>
          </div>
          <p className="text-[10px] text-[var(--color-text-tertiary)] mt-4 pt-4 border-t border-[var(--color-border)]">
            Prototype / Testnet concept &mdash; not production-ready zero-knowledge infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}
