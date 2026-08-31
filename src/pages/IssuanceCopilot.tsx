import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  PlusCircle,
  LineChart,
  ShieldQuestion,
  Lock,
  RefreshCw,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { ReasoningTimeline } from '@/components/ReasoningTimeline';
import { AIRecommendation } from '@/components/AIRecommendation';
import {
  interpretIssuanceCommand,
  REASONING_STEPS_DRAFT,
  REASONING_STEPS_ANALYZE,
  generateIssuerInsight,
  type IssuanceDraft,
} from '@/services/ai';
import { formatCurrency, formatNumber } from '@/lib/format';

const SUGGESTIONS = [
  { label: 'Create a $5M issuance', icon: PlusCircle, kind: 'draft' as const, prompt: 'Create a $5M private credit issuance for verified investors.' },
  { label: 'Review compliance readiness', icon: FileCheck2, kind: 'analyze' as const, prompt: 'Review compliance readiness across my issuances.' },
  { label: 'Explain clawback', icon: ShieldQuestion, kind: 'analyze' as const, prompt: 'Explain how clawback works for this issuance.' },
  { label: 'Summarize my book', icon: LineChart, kind: 'analyze' as const, prompt: 'Summarize my active issuances and readiness.' },
];

type Phase = 'idle' | 'reasoning' | 'result';

function ConfigRow({ label, value, done }: { label: string; value: string; done: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--color-border)] last:border-0">
      <span className="text-xs text-[var(--color-text-tertiary)]">{label}</span>
      <span className={`flex items-center gap-1.5 text-xs font-mono ${done ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'}`}>
        {done ? <CheckCircle2 size={12} className="text-[var(--color-positive)]" /> : <Circle size={12} />}
        {value}
      </span>
    </div>
  );
}

export default function IssuanceCopilot() {
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [kind, setKind] = useState<'draft' | 'analyze'>('draft');
  const [draft, setDraft] = useState<IssuanceDraft | null>(null);
  const [insight, setInsight] = useState('');
  const navigate = useNavigate();

  const submit = (command: string, forcedKind?: 'draft' | 'analyze') => {
    if (!command.trim()) return;
    const isDraft = forcedKind === 'draft' || (!forcedKind && /(issu|creat|draft|structure)/i.test(command));
    setKind(isDraft ? 'draft' : 'analyze');
    setInput(command);
    setPhase('reasoning');
    if (isDraft) {
      setDraft(interpretIssuanceCommand(command));
    } else {
      setInsight(generateIssuerInsight());
    }
  };

  const reset = () => {
    setPhase('idle');
    setInput('');
    setDraft(null);
    setInsight('');
  };

  return (
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
      {/* Left: conversation */}
      <div className="min-h-[520px]">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div key="idle" exit={{ opacity: 0 }} className="text-center pt-6 md:pt-12">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center mx-auto mb-6">
                <Sparkles size={22} className="text-black" />
              </div>
              <h2 className="font-display text-2xl md:text-[28px] font-semibold tracking-tight mb-2">
                What would you like to structure?
              </h2>
              <p className="text-sm text-[var(--color-text-tertiary)] mb-8 max-w-md mx-auto">
                I&rsquo;m ready to draft an issuance configuration. You&rsquo;ll review every control before anything
                is signed.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(input);
                }}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-2 flex items-center gap-2 mb-6"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Create a $5M private credit issuance for verified investors…"
                  className="flex-1 bg-transparent outline-none px-3 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="h-10 w-10 rounded-xl bg-[var(--color-accent)] text-white flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
                  aria-label="Send"
                >
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => submit(s.prompt, s.kind)}
                    className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-3.5 py-2 text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    <s.icon size={13} />
                    {s.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {phase !== 'idle' && (
            <motion.div key="thread" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 space-y-6">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[var(--color-panel-2)] border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text-primary)]">
                  {input}
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center shrink-0">
                  <Sparkles size={14} className="text-black" />
                </div>
                <div className="flex-1 rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
                  {phase === 'reasoning' && (
                    <ReasoningTimeline
                      steps={kind === 'draft' ? REASONING_STEPS_DRAFT : REASONING_STEPS_ANALYZE}
                      onComplete={() => setTimeout(() => setPhase('result'), 250)}
                    />
                  )}

                  <AnimatePresence>
                    {phase === 'result' && kind === 'draft' && draft && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                        <p className="text-sm text-[var(--color-text-primary)]">
                          I&rsquo;ve drafted an issuance configuration based on your requirements. Review the
                          proposed controls before signing.
                        </p>
                        <p className="text-xs text-[var(--color-text-tertiary)]">
                          The live configuration panel has been updated on the right. Nothing has been submitted or
                          signed &mdash; this is a draft for your review.
                        </p>
                        <button
                          onClick={() => navigate('/app/create')}
                          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity"
                        >
                          Review Draft <ArrowRight size={13} />
                        </button>
                      </motion.div>
                    )}

                    {phase === 'result' && kind === 'analyze' && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        <AIRecommendation title="Copilot Analysis">{insight}</AIRecommendation>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {phase === 'result' && (
                <div className="text-center">
                  <button
                    onClick={reset}
                    className="text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Ask something else
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: live issuance configuration */}
      <div className="lg:sticky lg:top-24 space-y-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display text-sm font-semibold">Live Issuance Configuration</h3>
            {draft && (
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent-2)]">
                Draft
              </span>
            )}
          </div>
          <p className="text-[11px] text-[var(--color-text-tertiary)] mb-4">Updates live as the copilot drafts.</p>

          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1">Asset</div>
            <ConfigRow label="Class" value="Private Credit" done={!!draft} />
            <ConfigRow label="Value" value={draft ? formatCurrency(draft.estimatedValue) : '—'} done={!!draft} />
          </div>

          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1">Token Structure</div>
            <ConfigRow label="Supply" value={draft ? `${formatNumber(draft.tokenSupply)} shares` : '—'} done={!!draft} />
            <ConfigRow label="Price" value={draft ? `$${draft.tokenPrice} / share` : '—'} done={!!draft} />
          </div>

          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1 flex items-center gap-1">
              <Lock size={9} /> Transfer Controls
            </div>
            <ConfigRow label="Restrictions" value={draft ? 'Restricted transfers' : '—'} done={!!draft} />
          </div>

          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1">Investor Eligibility</div>
            <ConfigRow label="Access" value={draft ? draft.investorAccess : '—'} done={!!draft} />
          </div>

          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1 flex items-center gap-1">
              <ShieldCheck size={9} /> Compliance Policy
            </div>
            <ConfigRow label="SEP-8" value={draft ? draft.sep8Policy : '—'} done={!!draft} />
          </div>

          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1 flex items-center gap-1">
              <RefreshCw size={9} /> Clawback
            </div>
            <ConfigRow label="Status" value={draft ? 'Enabled' : '—'} done={!!draft} />
          </div>

          <div className="mb-5">
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1">Privacy</div>
            <ConfigRow label="Proof" value={draft ? draft.privacyProof : '—'} done={!!draft} />
            <ConfigRow label="Network" value={draft ? draft.network : '—'} done={!!draft} />
          </div>

          <button
            onClick={() => navigate('/app/create')}
            disabled={!draft}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium py-2.5 disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Review Draft <ArrowRight size={13} />
          </button>
          <p className="text-[10px] text-[var(--color-text-tertiary)] text-center mt-3">
            AI recommends. Humans decide.
          </p>
        </div>
      </div>
    </div>
  );
}
