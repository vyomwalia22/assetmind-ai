import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cx } from '@/lib/format';

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

export function StatCard({
  label,
  value,
  format,
  delta,
  deltaPositive,
  icon: Icon,
  suffix,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: LucideIcon;
  suffix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const animated = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 relative overflow-hidden group hover:border-[var(--color-border-strong)] transition-colors"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--color-accent)]/[0.06] blur-2xl group-hover:bg-[var(--color-accent)]/[0.1] transition-colors" />
      <div className="flex items-center justify-between mb-3 relative">
        <span className="text-xs text-[var(--color-text-tertiary)]">{label}</span>
        {Icon && <Icon size={15} className="text-[var(--color-text-tertiary)]" />}
      </div>
      <div className="font-display text-2xl font-semibold text-[var(--color-text-primary)] relative">
        {format(animated)}
        {suffix}
      </div>
      {delta && (
        <div
          className={cx(
            'mt-2 inline-flex items-center text-[11px] font-mono px-1.5 py-0.5 rounded relative',
            deltaPositive
              ? 'text-[var(--color-positive)] bg-[var(--color-positive)]/10'
              : 'text-[var(--color-negative)] bg-[var(--color-negative)]/10',
          )}
        >
          {delta}
        </div>
      )}
    </motion.div>
  );
}
