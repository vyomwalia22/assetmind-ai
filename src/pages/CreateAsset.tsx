import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Settings2,
  ArrowRight,
  CheckCircle2,
  Sparkle,
} from 'lucide-react';
import { interpretIssuanceCommand, type IssuanceDraft } from '@/services/ai';
import { AssetConfiguration } from '@/components/AssetConfiguration';
import { ComplianceStatus } from '@/components/ComplianceStatus';
import { PrivacyProof } from '@/components/PrivacyProof';
import { SimulationTimeline, type SimulationStep } from '@/components/SimulationTimeline';
import { HumanApproval } from '@/components/HumanApproval';
import { submitSignedIssuance } from '@/services/stellar';
import { useToast } from '@/hooks/useToast';
import { cx, formatCurrency } from '@/lib/format';
import type { ComplianceConfig } from '@/types';

const STEPS = ['Define Asset', 'Configure Rules', 'Compliance', 'Privacy', 'Review & Sign'];

type Mode = 'choose' | 'ai' | 'manual';

const SIM_STEPS: SimulationStep[] = [
  { label: 'Validation', detail: 'Asset configuration valid' },
  { label: 'Policy', detail: 'SEP-8 configuration generated' },
  { label: 'Restrictions', detail: 'Investor restrictions configured' },
  { label: 'Privacy', detail: 'Eligibility proof configured' },
  { label: 'Stellar', detail: 'Transaction structure prepared' },
];

function AIGeneratedTag() {
  return (
    <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase text-[var(--color-accent-2)] bg-[var(--color-accent-2)]/10 px-1.5 py-0.5 rounded">
      <Sparkle size={9} /> AI generated
    </span>
  );
}

export default function CreateIssuance() {
  const [stepIndex, setStepIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('choose');
  const [aiInput, setAiInput] = useState('');
  const [draft, setDraft] = useState<IssuanceDraft | null>(null);
  const [aiPopulated, setAiPopulated] = useState(false);

  const [manual, setManual] = useState({
    name: '',
    issuer: '',
    value: '',
    supply: '50000',
    maturity: '36 months',
    yield: '10.5',
    investorType: 'Verified investors',
  });

  const [transferRestrictions, setTransferRestrictions] = useState(true);
  const [clawback, setClawback] = useState(true);
  const [authorization, setAuthorization] = useState(true);

  const [simDone, setSimDone] = useState(false);
  const [approvalState, setApprovalState] = useState<'idle' | 'signing' | 'signed'>('idle');

  const navigate = useNavigate();
  const { push } = useToast();

  const goStep = (i: number) => setStepIndex(Math.max(0, Math.min(STEPS.length - 1, i)));

  const runAI = () => {
    if (!aiInput.trim()) return;
    const d = interpretIssuanceCommand(aiInput);
    setDraft(d);
    setManual({
      name: d.assetName,
      issuer: 'Atlas Capital Partners',
      value: String(d.estimatedValue),
      supply: String(d.tokenSupply),
      maturity: '36 months',
      yield: '10.5',
      investorType: 'Verified investors',
    });
    setAiPopulated(true);
    goStep(1);
  };

  const runManual = () => {
    const value = parseFloat(manual.value.replace(/[^0-9.]/g, '')) || 5_000_000;
    const supply = parseInt(manual.supply, 10) || 50_000;
    setDraft({
      assetName: manual.name || 'New Private Credit Issuance',
      assetClass: 'Private Credit',
      estimatedValue: value,
      tokenSupply: supply,
      tokenPrice: Math.round((value / supply) * 100) / 100,
      investorAccess: 'Restricted',
      network: 'Stellar Testnet',
      transferRestrictions,
      clawback,
      sep8Policy: 'Draft generated',
      privacyProof: 'ZK eligibility proof',
    });
    setAiPopulated(false);
    goStep(1);
  };

  const complianceConfig: ComplianceConfig = {
    sep8: 'Draft generated',
    authorization,
    transferRestrictions,
    clawback,
    investorEligibility: 'Verified investors',
    issuerControls: 'Configured',
  };

  const runSimAndApprove = () => setSimDone(false);

  const signWithWallet = async () => {
    if (!draft) return;
    setApprovalState('signing');
    await submitSignedIssuance({
      name: draft.assetName,
      totalValue: draft.estimatedValue,
      tokenSupply: draft.tokenSupply,
      transferRestrictions,
      clawback,
      privacy: 'Private',
    });
    setApprovalState('signed');
    push({ variant: 'success', title: 'Issuance signed', description: 'Human-approved transaction submitted to Stellar Testnet.' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cx(
                  'h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-mono border transition-colors',
                  i < stepIndex
                    ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
                    : i === stepIndex
                      ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                      : 'border-[var(--color-border)] text-[var(--color-text-tertiary)]',
                )}
              >
                {i < stepIndex ? <CheckCircle2 size={14} /> : String(i + 1).padStart(2, '0')}
              </div>
              <span
                className={cx(
                  'text-[10px] font-mono hidden sm:block text-center',
                  i <= stepIndex ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]',
                )}
              >
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cx('h-px flex-1 mx-2', i < stepIndex ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]')} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Define Asset */}
        {stepIndex === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {mode === 'choose' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setMode('ai')}
                  className="text-left rounded-2xl border border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-accent)]/[0.08] to-transparent p-6 hover:border-[var(--color-accent)]/60 transition-colors"
                >
                  <Sparkles size={20} className="text-[var(--color-accent)] mb-4" />
                  <h3 className="font-display font-semibold mb-1.5">Describe with AI</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    Tell the copilot what you want to issue and it will draft the asset, structure and rules for
                    your review.
                  </p>
                </button>
                <button
                  onClick={() => setMode('manual')}
                  className="text-left rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 hover:border-[var(--color-border-strong)] transition-colors"
                >
                  <Settings2 size={20} className="text-[var(--color-text-secondary)] mb-4" />
                  <h3 className="font-display font-semibold mb-1.5">Configure manually</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    Set every field yourself with full control over the issuance definition.
                  </p>
                </button>
              </div>
            )}

            {mode === 'ai' && (
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
                <label className="text-xs text-[var(--color-text-tertiary)] mb-2 block">Describe your issuance</label>
                <textarea
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  rows={3}
                  placeholder="Create a $5M private credit issuance with 50,000 shares for verified investors."
                  className="w-full resize-none rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] outline-none p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)]/50 transition-colors"
                />
                <div className="flex justify-between mt-4">
                  <button onClick={() => setMode('choose')} className="text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                    Back
                  </button>
                  <button
                    onClick={runAI}
                    disabled={!aiInput.trim()}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    Generate draft <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}

            {mode === 'manual' && (
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Asset name</label>
                    <input
                      value={manual.name}
                      onChange={(e) => setManual((m) => ({ ...m, name: e.target.value }))}
                      placeholder="e.g. Vantage Private Credit Fund II"
                      className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] outline-none p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Issuer</label>
                    <input
                      value={manual.issuer}
                      onChange={(e) => setManual((m) => ({ ...m, issuer: e.target.value }))}
                      placeholder="e.g. Vantage Capital Partners"
                      className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] outline-none p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Asset type</label>
                  <div className="rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] p-3 text-sm text-[var(--color-text-secondary)] font-mono">
                    Private Credit
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Asset value ($)</label>
                    <input
                      value={manual.value}
                      onChange={(e) => setManual((m) => ({ ...m, value: e.target.value }))}
                      placeholder="5,000,000"
                      className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] outline-none p-3 text-sm font-mono text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Token supply</label>
                    <input
                      value={manual.supply}
                      onChange={(e) => setManual((m) => ({ ...m, supply: e.target.value }))}
                      className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] outline-none p-3 text-sm font-mono text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Target yield (%)</label>
                    <input
                      value={manual.yield}
                      onChange={(e) => setManual((m) => ({ ...m, yield: e.target.value }))}
                      className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] outline-none p-3 text-sm font-mono text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Maturity</label>
                    <input
                      value={manual.maturity}
                      onChange={(e) => setManual((m) => ({ ...m, maturity: e.target.value }))}
                      className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] outline-none p-3 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Investor type</label>
                    <div className="rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] p-3 text-sm text-[var(--color-text-secondary)] font-mono">
                      {manual.investorType}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setMode('choose')} className="text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                    Back
                  </button>
                  <button
                    onClick={runManual}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity"
                  >
                    Continue <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 1: Configure Rules */}
        {stepIndex === 1 && draft && (
          <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-semibold">Proposed asset & rules</h3>
              {aiPopulated && <AIGeneratedTag />}
            </div>
            <AssetConfiguration draft={draft} />

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 space-y-4">
              <h4 className="font-display text-sm font-semibold">Configure Rules</h4>
              {[
                { label: 'Transfer restrictions', desc: 'Only verified investor wallets may hold or receive shares.', value: transferRestrictions, set: setTransferRestrictions },
                { label: 'Clawback', desc: 'Issuer retains authority to recover shares when permitted by policy.', value: clawback, set: setClawback },
                { label: 'Authorization required', desc: 'The issuer must approve an account before it can transact.', value: authorization, set: setAuthorization },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                  <div>
                    <div className="text-sm text-[var(--color-text-primary)]">{row.label}</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{row.desc}</div>
                  </div>
                  <button
                    onClick={() => row.set(!row.value)}
                    role="switch"
                    aria-checked={row.value}
                    className={cx(
                      'h-6 w-11 rounded-full flex items-center px-0.5 transition-colors shrink-0',
                      row.value ? 'bg-[var(--color-accent)] justify-end' : 'bg-[var(--color-panel-3)] justify-start',
                    )}
                  >
                    <span className="h-5 w-5 rounded-full bg-white block" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-2">
              <button onClick={() => goStep(0)} className="text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                Back
              </button>
              <button
                onClick={() => goStep(2)}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity"
              >
                Continue to compliance <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Compliance */}
        {stepIndex === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-semibold">Compliance configuration</h3>
              <AIGeneratedTag />
            </div>
            <ComplianceStatus compliance={complianceConfig} />
            <p className="text-[11px] text-[var(--color-text-tertiary)] rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-3">
              AI-generated configuration is for workflow assistance and requires human/compliance review.
            </p>
            <div className="flex justify-between pt-2">
              <button onClick={() => goStep(1)} className="text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                Back
              </button>
              <button
                onClick={() => goStep(3)}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity"
              >
                Continue to privacy <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Privacy */}
        {stepIndex === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Privacy configuration</h3>
            <PrivacyProof />
            <div className="flex justify-between pt-2">
              <button onClick={() => goStep(2)} className="text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                Back
              </button>
              <button
                onClick={() => {
                  runSimAndApprove();
                  goStep(4);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity"
              >
                Review & sign <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Review & Sign (Simulation + Human Approval) */}
        {stepIndex === 4 && draft && (
          <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
              <h3 className="font-display text-sm font-semibold mb-4">Issuance Simulator</h3>
              <SimulationTimeline steps={SIM_STEPS} onComplete={() => setSimDone(true)} />
              <AnimatePresence>
                {simDone && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 pt-4 border-t border-[var(--color-border)]">
                    <p className="text-sm font-medium text-[var(--color-positive)] mb-3">Simulation successful</p>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <div className="text-[var(--color-text-tertiary)] mb-1">Est. token supply</div>
                        <div className="font-mono text-[var(--color-text-primary)]">{draft.tokenSupply.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[var(--color-text-tertiary)] mb-1">Est. issuance value</div>
                        <div className="font-mono text-[var(--color-text-primary)]">{formatCurrency(draft.estimatedValue, { compact: true })}</div>
                      </div>
                      <div>
                        <div className="text-[var(--color-text-tertiary)] mb-1">Network</div>
                        <div className="font-mono text-[var(--color-text-primary)]">{draft.network}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {simDone && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
                    <h3 className="font-display text-lg font-semibold mb-1 text-center">Review before signing</h3>
                    <p className="text-xs text-[var(--color-text-tertiary)] text-center mb-6">
                      AssetMind's AI never signs on your behalf. Confirm the summary below, then sign with your
                      connected wallet.
                    </p>
                    <HumanApproval
                      aiState="complete"
                      humanState={approvalState === 'idle' ? 'active' : approvalState === 'signing' ? 'active' : 'complete'}
                      walletState={approvalState === 'signed' ? 'complete' : approvalState === 'signing' ? 'active' : 'pending'}
                    />
                  </div>

                  {approvalState !== 'signed' ? (
                    <div className="flex justify-center">
                      <button
                        onClick={signWithWallet}
                        disabled={approvalState === 'signing'}
                        className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-6 py-3 disabled:opacity-60 hover:opacity-90 transition-opacity"
                      >
                        {approvalState === 'signing' ? 'Waiting for signature…' : 'Approve & Sign with Freighter'}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <CheckCircle2 size={36} className="text-[var(--color-positive)] mx-auto mb-3" />
                      <h4 className="font-display text-lg font-semibold mb-1">Issuance signed and submitted</h4>
                      <p className="text-xs font-mono text-[var(--color-text-tertiary)] mb-6">
                        Stellar Testnet tx: TXAM{Math.random().toString(36).slice(2, 10).toUpperCase()}
                      </p>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => navigate('/app/assets')}
                          className="rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-5 py-2.5 hover:opacity-90 transition-opacity"
                        >
                          View my issuances
                        </button>
                        <button
                          onClick={() => navigate('/app')}
                          className="rounded-lg border border-[var(--color-border)] text-sm font-medium px-5 py-2.5 hover:border-[var(--color-border-strong)] transition-colors"
                        >
                          Back to dashboard
                        </button>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-tertiary)] mt-6">
                        Asset ready for Leontief onboarding &mdash; integration concept / prototype.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!simDone && (
              <div className="flex justify-start">
                <button onClick={() => goStep(3)} className="text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                  Back
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
