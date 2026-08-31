import { motion } from 'framer-motion';
import { FileText, Settings2, ShieldCheck, Fingerprint, UserCheck } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Define Asset',
    body: 'Describe the private-credit issuance in plain language or configure it manually \u2014 value, share supply and price.',
    icon: FileText,
  },
  {
    n: '02',
    title: 'Configure Rules',
    body: 'The copilot proposes transfer restrictions, clawback and authorization settings for your review.',
    icon: Settings2,
  },
  {
    n: '03',
    title: 'Compliance',
    body: 'AssetMind drafts a SEP-8 policy and issuer controls, flagged clearly for compliance review.',
    icon: ShieldCheck,
  },
  {
    n: '04',
    title: 'Privacy',
    body: 'Configure a zero-knowledge eligibility proof so investors verify status without exposing identity data.',
    icon: Fingerprint,
  },
  {
    n: '05',
    title: 'Review & Sign',
    body: 'Run the simulator, then a human reviews everything and signs with a connected Stellar wallet.',
    icon: UserCheck,
  },
];

export function FlowSection() {
  return (
    <section id="flow" className="relative py-24 md:py-32 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-2)]">Issuance Workflow</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 tracking-tight">
            From issuer intent to a signed transaction
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3">
            The AI copilot drafts every step. A human always reviews and signs before anything reaches Stellar.
          </p>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="hidden lg:block absolute top-[26px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border-strong)] to-transparent" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="relative z-10 h-[52px] w-[52px] rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-panel)] flex items-center justify-center mb-5">
                <step.icon size={20} className="text-[var(--color-accent)]" strokeWidth={1.6} />
              </div>
              <div className="font-mono text-[11px] text-[var(--color-text-tertiary)] mb-1.5">{step.n}</div>
              <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
