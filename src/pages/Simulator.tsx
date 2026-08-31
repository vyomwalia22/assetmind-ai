import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, ArrowRight, RotateCw } from 'lucide-react';
import { mockAssets } from '@/data/mockAssets';
import { SimulationTimeline, type SimulationStep } from '@/components/SimulationTimeline';
import { formatCurrency } from '@/lib/format';

const SIM_STEPS: SimulationStep[] = [
  { label: 'Validation', detail: 'Asset configuration valid' },
  { label: 'Policy', detail: 'SEP-8 configuration generated' },
  { label: 'Restrictions', detail: 'Investor restrictions configured' },
  { label: 'Privacy', detail: 'Eligibility proof configured' },
  { label: 'Stellar', detail: 'Transaction structure prepared' },
];

export default function Simulator() {
  const [selectedId, setSelectedId] = useState(mockAssets[0].id);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const asset = mockAssets.find((a) => a.id === selectedId) ?? mockAssets[0];
  const navigate = useNavigate();

  const run = () => {
    setDone(false);
    setRunning(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center mx-auto mb-4">
          <PlayCircle size={20} className="text-black" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-2">Issuance Simulator</h2>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
          Validate an issuance configuration end-to-end before it's handed to a human for review and signing.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <select
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setDone(false);
            setRunning(false);
          }}
          className="max-w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-2 text-xs font-mono text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]/50 truncate"
        >
          {mockAssets.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <button
          onClick={run}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] text-white text-xs font-medium px-4 py-2 hover:opacity-90 transition-opacity"
        >
          <RotateCw size={12} className={running && !done ? 'animate-spin' : ''} />
          {running ? 'Re-run simulation' : 'Run simulation'}
        </button>
      </div>

      {running && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
          <SimulationTimeline steps={SIM_STEPS} onComplete={() => setDone(true)} />

          <AnimatePresence>
            {done && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-[var(--color-border)] space-y-4">
                <p className="text-sm font-medium text-[var(--color-positive)]">Simulation successful</p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-[var(--color-text-tertiary)] mb-1">Est. token supply</div>
                    <div className="font-mono text-[var(--color-text-primary)]">{asset.tokenSupply.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[var(--color-text-tertiary)] mb-1">Est. issuance value</div>
                    <div className="font-mono text-[var(--color-text-primary)]">{formatCurrency(asset.totalValue, { compact: true })}</div>
                  </div>
                  <div>
                    <div className="text-[var(--color-text-tertiary)] mb-1">Network</div>
                    <div className="font-mono text-[var(--color-text-primary)]">{asset.network}</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/app/approval?asset=${asset.id}`)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity"
                >
                  Continue to Human Review <ArrowRight size={13} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
