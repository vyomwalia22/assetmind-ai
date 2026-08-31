import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

export function ReasoningTimeline({
  steps,
  onComplete,
  stepDuration = 550,
}: {
  steps: string[];
  onComplete?: () => void;
  stepDuration?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    if (steps.length === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setActiveIndex(i + 1);
          if (i === steps.length - 1) onComplete?.();
        }, stepDuration * (i + 1)),
      );
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.join('|')]);

  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <div key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                  done
                    ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                    : active
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                      : 'border-[var(--color-border)] bg-transparent'
                }`}
              >
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check size={11} className="text-black" strokeWidth={3} />
                    </motion.div>
                  ) : active ? (
                    <Loader2 size={11} className="animate-spin text-[var(--color-accent)]" />
                  ) : null}
                </AnimatePresence>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-px flex-1 min-h-[18px] transition-colors duration-500 ${
                    done ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
                  }`}
                />
              )}
            </div>
            <div
              className={`pb-4 text-sm font-mono transition-colors duration-300 ${
                done || active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'
              }`}
            >
              {step}
            </div>
          </div>
        );
      })}
    </div>
  );
}
