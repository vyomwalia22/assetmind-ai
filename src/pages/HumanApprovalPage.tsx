import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { mockAssets } from '@/data/mockAssets';
import { HumanApproval } from '@/components/HumanApproval';
import { submitSignedIssuance } from '@/services/stellar';
import { useToast } from '@/hooks/useToast';
import { formatCurrency, formatNumber } from '@/lib/format';

export default function HumanApprovalPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { push } = useToast();
  const defaultId = mockAssets.find((a) => a.status === 'Ready')?.id ?? mockAssets[0].id;
  const [selectedId, setSelectedId] = useState(params.get('asset') ?? defaultId);
  const [state, setState] = useState<'idle' | 'signing' | 'signed'>('idle');
  const asset = mockAssets.find((a) => a.id === selectedId) ?? mockAssets[0];

  const sign = async () => {
    setState('signing');
    await submitSignedIssuance({
      name: asset.name,
      totalValue: asset.totalValue,
      tokenSupply: asset.tokenSupply,
      transferRestrictions: asset.compliance.transferRestrictions,
      clawback: asset.compliance.clawback,
      privacy: asset.privacy,
    });
    setState('signed');
    push({ variant: 'success', title: 'Signed', description: `${asset.name} was signed and submitted to Stellar Testnet.` });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-2">Review before signing</h2>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
          AssetMind's AI copilot never signs a transaction. It prepares the configuration &mdash; a human always
          reviews and signs with a connected wallet.
        </p>
      </div>

      <div className="flex justify-center">
        <select
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setState('idle');
          }}
          className="max-w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-2 text-xs font-mono text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]/50 truncate"
        >
          {mockAssets.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
        <h3 className="font-display text-sm font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          {[
            ['Asset', asset.name],
            ['Token supply', `${formatNumber(asset.tokenSupply)} shares`],
            ['Investor restrictions', asset.compliance.transferRestrictions ? 'Restricted' : 'None'],
            ['Clawback', asset.compliance.clawback ? 'Enabled' : 'Disabled'],
            ['Privacy', asset.privacy],
            ['Compliance policy', asset.compliance.sep8],
            ['Network', asset.network],
            ['Asset value', formatCurrency(asset.totalValue, { compact: true })],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-[var(--color-text-tertiary)] mb-1">{label}</div>
              <div className="font-mono text-[var(--color-text-primary)]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
        <HumanApproval
          aiState="complete"
          humanState={state === 'signed' ? 'complete' : 'active'}
          walletState={state === 'signed' ? 'complete' : state === 'signing' ? 'active' : 'pending'}
        />
      </div>

      <AnimatePresence mode="wait">
        {state !== 'signed' ? (
          <motion.div key="cta" className="flex justify-center">
            <button
              onClick={sign}
              disabled={state === 'signing'}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-6 py-3 disabled:opacity-60 hover:opacity-90 transition-opacity"
            >
              {state === 'signing' ? 'Waiting for signature…' : 'Approve & Sign with Freighter'}
            </button>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <CheckCircle2 size={36} className="text-[var(--color-positive)] mx-auto mb-3" />
            <h4 className="font-display text-lg font-semibold mb-1">Signed and submitted</h4>
            <p className="text-xs font-mono text-[var(--color-text-tertiary)] mb-6">
              Stellar Testnet tx: TXAM{Math.random().toString(36).slice(2, 10).toUpperCase()}
            </p>
            <button
              onClick={() => navigate(`/app/assets/${asset.id}`)}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] text-sm font-medium px-5 py-2.5 hover:border-[var(--color-accent)]/50 transition-colors"
            >
              View issuance <ArrowRight size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
