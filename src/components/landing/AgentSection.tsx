import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const COMMANDS = [
  {
    q: 'Create a $5M private credit issuance for verified investors.',
    a: "I've drafted an issuance configuration: $5M value, 50,000 shares at $100, restricted transfers and a SEP-8 policy draft. Review the proposed controls before signing.",
  },
  {
    q: 'Explain how clawback works for this issuance.',
    a: 'Clawback allows the issuer to recover shares from an investor account when permitted by the asset policy \u2014 for example, on a compliance violation. This requires human/compliance review before it is finalized.',
  },
  {
    q: 'Is Atlas Private Credit Fund I ready to sign?',
    a: 'Not yet \u2014 investor eligibility verification is still pending. I can run the simulator once compliance configuration is complete.',
  },
  {
    q: 'Prepare this issuance for Leontief onboarding.',
    a: "I've prepared a hand-off summary for Leontief's ld-shares infrastructure. This is a prototype hand-off \u2014 a human still needs to review and initiate onboarding.",
  },
];

export function AgentSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="copilot" className="relative py-24 md:py-32 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-2)]">Issuance Copilot</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 tracking-tight leading-tight">
            A copilot that drafts. Never one that executes.
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-4 max-w-md leading-relaxed">
            AssetMind AI drafts, recommends, configures, validates and explains issuance workflows. It never signs a
            transaction on your behalf &mdash; a human always reviews and a wallet always signs.
          </p>

          <div className="mt-8 space-y-2">
            {COMMANDS.map((c, i) => (
              <button
                key={c.q}
                onClick={() => setActive(i)}
                className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition-colors ${
                  active === i
                    ? 'border-[var(--color-accent)]/50 bg-[var(--color-accent)]/[0.06] text-[var(--color-text-primary)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                &ldquo;{c.q}&rdquo;
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 min-h-[220px] flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center">
              <Sparkles size={13} className="text-black" />
            </div>
            <span className="text-xs font-mono text-[var(--color-text-tertiary)]">AssetMind Copilot response</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-[15px] text-[var(--color-text-primary)] leading-relaxed font-mono"
            >
              {COMMANDS[active].a}
            </motion.p>
          </AnimatePresence>
          <p className="text-[10px] text-[var(--color-text-tertiary)] mt-6 pt-4 border-t border-[var(--color-border)]">
            AI recommends. Humans decide.
          </p>
        </div>
      </div>
    </section>
  );
}
