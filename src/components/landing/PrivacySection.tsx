import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const PUBLIC_ITEMS = ['Asset verification', 'Eligibility result', 'Transaction verification'];
const PRIVATE_ITEMS = ['Investor identity documents', 'Government ID', 'Underlying portfolio detail'];

export function PrivacySection() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section id="privacy" className="relative py-24 md:py-32 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-2)]">Privacy Studio</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 tracking-tight leading-tight">
            Prove eligibility <br /> without exposing identity.
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-4 max-w-md leading-relaxed">
            A zero-knowledge eligibility proof lets an investor prove they meet verification requirements without
            handing identity documents to the issuer or the network. Prototype / Testnet concept.
          </p>

          <button
            onClick={() => setRevealed((r) => !r)}
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-panel)] px-4 py-2.5 text-sm font-medium hover:border-[var(--color-accent)]/50 transition-colors"
          >
            {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
            {revealed ? 'Hide private layer' : 'Reveal private layer'}
          </button>
        </div>

        <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 md:p-8 overflow-hidden">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wide text-[var(--color-text-tertiary)] mb-3">
                Public on Stellar
              </div>
              <div className="space-y-2">
                {PUBLIC_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-2)] px-3 py-2.5 text-xs text-[var(--color-text-primary)]"
                  >
                    <CheckCircle2 size={13} className="text-[var(--color-positive)] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wide text-[var(--color-text-tertiary)] mb-3">
                Kept private
              </div>
              <div className="space-y-2">
                {PRIVATE_ITEMS.map((item) => (
                  <motion.div
                    key={item}
                    className="relative rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-2)] px-3 py-2.5 text-xs overflow-hidden"
                  >
                    <motion.div
                      animate={{ opacity: revealed ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 backdrop-blur-md bg-[var(--color-panel-2)]/60 flex items-center px-3"
                    >
                      <span className="h-2 w-24 rounded-full bg-white/10" />
                    </motion.div>
                    <motion.span
                      animate={{ opacity: revealed ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[var(--color-text-primary)]"
                    >
                      {item}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
