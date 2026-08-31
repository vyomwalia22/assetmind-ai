import { motion } from 'framer-motion';
import { useMemo } from 'react';

function useOrbitPoints(count: number, radius: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return { x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius, delay: i * 0.15 };
      }),
    [count, radius],
  );
}

export function StellarSection() {
  const inner = useOrbitPoints(6, 22);
  const outer = useOrbitPoints(10, 38);

  return (
    <section id="stellar" className="relative py-24 md:py-32 border-b border-[var(--color-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-square max-w-md mx-auto w-full order-2 lg:order-1">
          <svg viewBox="0 0 100 100" width="100%" height="100%" className="w-full h-full">
            <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(124,108,255,0.15)" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(67,231,255,0.1)" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="4" fill="var(--color-accent)" opacity="0.9" />
            {inner.map((p, i) => (
              <motion.circle
                key={`in-${i}`}
                cx={p.x}
                cy={p.y}
                r="1.4"
                fill="#9B8FFF"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, delay: p.delay, repeat: Infinity }}
              />
            ))}
            {outer.map((p, i) => (
              <motion.circle
                key={`out-${i}`}
                cx={p.x}
                cy={p.y}
                r="1"
                fill="#43E7FF"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 4, delay: p.delay, repeat: Infinity }}
              />
            ))}
            <motion.circle
              cx="50"
              cy="50"
              r="22"
              fill="none"
              stroke="rgba(124,108,255,0.35)"
              strokeWidth="0.4"
              strokeDasharray="2 3"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '50px 50px' }}
            />
          </svg>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-2)]">Infrastructure</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 tracking-tight">Powered by Stellar</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-4 max-w-md leading-relaxed">
            Stellar provides the settlement layer beneath AssetMind &mdash; fast finality, low transaction costs, and
            native asset issuance built for real-world asset movement at institutional scale.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-sm">
            {[
              ['~5s', 'Finality'],
              ['$0.00001', 'Avg. fee'],
              ['24/7', 'Settlement'],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="font-mono text-lg text-[var(--color-text-primary)]">{stat}</div>
                <div className="text-[11px] text-[var(--color-text-tertiary)]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
