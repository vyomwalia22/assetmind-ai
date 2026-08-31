import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NetworkField } from '@/components/NetworkField';
import { AICommandHero } from '@/components/AICommandHero';
import { Logo } from '@/components/Logo';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="absolute inset-0 grid-dots opacity-40" />
      <NetworkField className="absolute inset-0 w-full h-full opacity-70" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[var(--color-accent)]/[0.08] blur-[140px] rounded-full pointer-events-none" />

      <nav className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--color-text-secondary)]">
          <a href="#flow" className="hover:text-[var(--color-text-primary)] transition-colors">How it works</a>
          <a href="#copilot" className="hover:text-[var(--color-text-primary)] transition-colors">Copilot</a>
          <a href="#privacy" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy</a>
          <a href="#leontief" className="hover:text-[var(--color-text-primary)] transition-colors">Leontief</a>
        </div>
        <button
          onClick={() => navigate('/app/create')}
          className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-panel)] px-4 py-2 text-sm font-medium hover:border-[var(--color-accent)]/50 transition-colors"
        >
          Start an Issuance
        </button>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-24 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-1.5 text-[11px] font-mono text-[var(--color-text-secondary)] mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-positive)]" />
            AI &times; Private Credit &times; Compliance &times; Privacy &times; Stellar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[36px] sm:text-5xl lg:text-[52px] font-semibold leading-[1.08] tracking-tight text-[var(--color-text-primary)]"
          >
            Issue private credit on Stellar, <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent">with an AI copilot.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-lg leading-relaxed"
          >
            AssetMind helps issuers configure asset rules, compliance policies and privacy settings &mdash; then
            simulate the issuance before a human signs the final transaction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => navigate('/app/create')}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-5 py-3 hover:opacity-90 transition-opacity"
            >
              Start an Issuance <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate('/app')}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-colors"
            >
              Explore Demo
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 text-[11px] font-mono text-[var(--color-text-tertiary)]"
          >
            Built for issuers, fund managers and Stellar anchors. AI recommends. Humans decide.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <AICommandHero />
        </motion.div>
      </div>
    </section>
  );
}
