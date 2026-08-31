import { LeontiefIntegration } from '@/components/LeontiefIntegration';

export function LeontiefSection() {
  return (
    <section id="leontief" className="relative py-24 md:py-32 border-b border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="max-w-xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-2)]">Issuance Infrastructure</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 tracking-tight">
            An AI front-end for Leontief, not a competitor to it.
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3">
            AssetMind helps issuers prepare and configure restricted assets. Leontief provides the underlying
            infrastructure for tokenized shares on Stellar.
          </p>
        </div>

        <LeontiefIntegration />
      </div>
    </section>
  );
}
