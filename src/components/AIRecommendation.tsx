import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function AIRecommendation({
  title = 'AI Recommendation',
  children,
  showFooter = true,
}: {
  title?: string;
  children: React.ReactNode;
  showFooter?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-accent)]/[0.07] to-[var(--color-accent-2)]/[0.03] p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-6 rounded-md bg-[var(--color-accent)]/15 flex items-center justify-center">
          <Sparkles size={12} className="text-[var(--color-accent)]" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
          {title}
        </span>
      </div>
      <div className="text-sm text-[var(--color-text-primary)] leading-relaxed">{children}</div>
      {showFooter && (
        <p className="text-[10px] text-[var(--color-text-tertiary)] mt-3 pt-3 border-t border-[var(--color-border)]">
          AI recommends. Humans decide.
        </p>
      )}
    </motion.div>
  );
}
