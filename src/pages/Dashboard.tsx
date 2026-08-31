import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Wallet, ClipboardCheck, ShieldCheck, ArrowRight, Sparkles, Waypoints } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { AssetCard } from '@/components/AssetCard';
import { TransactionTimeline } from '@/components/TransactionTimeline';
import { AIRecommendation } from '@/components/AIRecommendation';
import { IssuanceStatus } from '@/components/IssuanceStatus';
import { mockAssets } from '@/data/mockAssets';
import { mockTransactions } from '@/data/mockTransactions';
import { generateIssuerInsight } from '@/services/ai';
import { formatCurrency } from '@/lib/format';

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning.' : hour < 18 ? 'Good afternoon.' : 'Good evening.';
  const activeIssuance = mockAssets[0];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="text-sm text-[var(--color-text-tertiary)]">{greeting}</p>
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mt-1">
          Your issuance command center.
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Issuances" value={3} format={(n) => String(Math.round(n)).padStart(2, '0')} delta="1 ready to sign" icon={Layers} />
        <StatCard label="Assets Under Management" value={20_700_000} format={(n) => formatCurrency(n, { compact: true })} delta="Across 4 issuances" icon={Wallet} />
        <StatCard label="Pending Reviews" value={2} format={(n) => String(Math.round(n)).padStart(2, '0')} delta="Awaiting human approval" icon={ClipboardCheck} />
        <StatCard label="Compliance Status" value={98} format={(n) => Math.round(n).toString()} suffix="%" delta="SEP-8 coverage" deltaPositive icon={ShieldCheck} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold">Active issuances</h3>
            <Link
              to="/app/assets"
              className="text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-2)] transition-colors flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 min-w-0">
            {mockAssets.slice(0, 2).map((asset, i) => (
              <AssetCard asset={asset} key={asset.id} index={i} />
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <h3 className="font-display text-base font-semibold">AI Copilot activity</h3>
            <Link
              to="/app/transactions"
              className="text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-2)] transition-colors flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-2">
            <TransactionTimeline transactions={mockTransactions.slice(0, 4)} />
          </div>
        </div>

        <div className="space-y-6">
          <Link
            to="/app/copilot"
            className="group block rounded-2xl border border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-accent)]/[0.1] to-transparent p-5 hover:border-[var(--color-accent)]/50 transition-colors"
          >
            <div className="h-9 w-9 rounded-lg bg-[var(--color-accent)]/15 flex items-center justify-center mb-4">
              <Sparkles size={16} className="text-[var(--color-accent)]" />
            </div>
            <h4 className="font-display font-semibold mb-1.5">Open the Issuance Copilot</h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Draft a new private-credit issuance in plain language. The AI prepares the configuration &mdash; you
              review and sign.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent-2)] group-hover:gap-2 transition-all">
              Start an issuance <ArrowRight size={12} />
            </span>
          </Link>

          <AIRecommendation title="AI Copilot Insight">{generateIssuerInsight()}</AIRecommendation>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Waypoints size={14} className="text-[var(--color-accent-2)]" />
              <h4 className="font-display text-sm font-semibold">Leontief Issuance</h4>
            </div>
            <div className="space-y-2.5 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-tertiary)]">Status</span>
                <span className="font-mono text-[var(--color-accent-2)]">Ready for onboarding</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-tertiary)]">Asset</span>
                <span className="font-mono text-[var(--color-text-primary)] truncate ml-2">{activeIssuance.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-tertiary)]">Structure</span>
                <span className="font-mono text-[var(--color-text-primary)]">ld-shares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-tertiary)]">Policy</span>
                <span className="font-mono text-[var(--color-text-primary)]">Restricted</span>
              </div>
            </div>
            <Link
              to={`/app/assets/${activeIssuance.id}`}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-panel-2)] text-xs font-medium py-2.5 hover:border-[var(--color-accent-2)]/50 transition-colors"
            >
              Prepare for Leontief
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
            <h4 className="font-display text-sm font-semibold mb-4">Compliance overview</h4>
            <div className="space-y-3">
              {[
                ['SEP-8', 'Configured'],
                ['Transfer Restrictions', 'Active'],
                ['Clawback', 'Active'],
                ['Investor Eligibility', 'Verified'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-secondary)]">{label}</span>
                  <span className="font-mono text-[var(--color-positive)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IssuanceStatus status="Ready" />
          <p className="text-xs text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-text-primary)] font-medium">Cascade Private Credit Warehouse</span> has
            completed configuration, compliance and privacy setup and is ready for human review.
          </p>
        </div>
        <Link
          to="/app/approval"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent-2)] hover:gap-2.5 transition-all shrink-0"
        >
          Review before signing <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
