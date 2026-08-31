import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { interpretIssuanceCommand, REASONING_STEPS_DRAFT, type IssuanceDraft } from '@/services/ai';
import { ReasoningTimeline } from '@/components/ReasoningTimeline';
import { AssetConfiguration } from '@/components/AssetConfiguration';

const EXAMPLE = 'I want to issue $5M of private credit shares for verified investors.';

type Phase = 'idle' | 'reasoning' | 'result';

export function AICommandHero() {
  const [value, setValue] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [draft, setDraft] = useState<IssuanceDraft | null>(null);
  const navigate = useNavigate();

  const runCommand = (command: string) => {
    if (!command.trim()) return;
    setValue(command);
    setPhase('reasoning');
    setDraft(interpretIssuanceCommand(command));
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)]/80 backdrop-blur-xl p-1.5 shadow-[0_30px_80px_-30px_rgba(124,108,255,0.35)]">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center">
            <Sparkles size={13} className="text-black" />
          </div>
          <span className="text-xs font-mono text-[var(--color-text-tertiary)]">AssetMind AI &middot; Issuance Copilot</span>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div key="idle" exit={{ opacity: 0 }} className="space-y-3">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={EXAMPLE}
                rows={3}
                className="w-full resize-none bg-transparent outline-none text-[15px] leading-snug text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]"
              />
              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                <button
                  onClick={() => runCommand(EXAMPLE)}
                  className="text-[11px] font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-2)] transition-colors"
                >
                  Try example command
                </button>
                <button
                  onClick={() => runCommand(value)}
                  disabled={!value.trim()}
                  className="flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] text-white text-xs font-medium px-4 py-2 disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  Draft configuration <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          )}

          {phase === 'reasoning' && (
            <motion.div key="reasoning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-xs text-[var(--color-text-secondary)] font-mono mb-4">&ldquo;{value}&rdquo;</p>
              <ReasoningTimeline
                steps={REASONING_STEPS_DRAFT}
                stepDuration={420}
                onComplete={() => setTimeout(() => setPhase('result'), 300)}
              />
            </motion.div>
          )}

          {phase === 'result' && draft && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AssetConfiguration draft={draft} onReview={() => navigate('/app/create')} />
              <button
                onClick={() => {
                  setPhase('idle');
                  setValue('');
                }}
                className="mt-3 text-[11px] font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Try another command
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
