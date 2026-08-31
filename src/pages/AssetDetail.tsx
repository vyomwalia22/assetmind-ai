import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowLeft, FileText, Building2, Sparkles, Waypoints } from 'lucide-react';
import { getAssetById } from '@/data/mockAssets';
import { mockTransactions } from '@/data/mockTransactions';
import { AssetVisual } from '@/components/AssetVisual';
import { AssetPerformanceChart } from '@/components/AssetChart';
import { TransactionTimeline } from '@/components/TransactionTimeline';
import { IssuanceStatus } from '@/components/IssuanceStatus';
import { ComplianceStatus } from '@/components/ComplianceStatus';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/format';

const PIE_COLORS = ['#7C6CFF', '#43E7FF', '#3DDC97', '#FFB454'];

const REVIEW_QUESTIONS = [
  'What are the transfer restrictions?',
  'Explain the clawback policy',
  'How is investor eligibility verified?',
];

export default function AssetDetail() {
  const { id } = useParams();
  const asset = id ? getAssetById(id) : undefined;
  const [asked, setAsked] = useState(false);

  if (!asset) return <Navigate to="/app/marketplace" replace />;

  const relatedTx = mockTransactions.filter((t) => t.asset === asset.name).slice(0, 4);

  return (
    <div className="space-y-8">
      <Link
        to="/app/marketplace"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <ArrowLeft size={13} /> Back to issuance library
      </Link>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden border border-[var(--color-border)]"
        >
          <div className="relative h-56">
            <AssetVisual category={asset.category} seed={asset.accentSeed} className="w-full h-full" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-1 rounded-md bg-black/50 backdrop-blur border border-white/10 text-[var(--color-text-secondary)]">
                  {asset.category}
                </span>
                <h1 className="font-display text-2xl font-semibold mt-2 text-[var(--color-text-primary)]">
                  {asset.name}
                </h1>
                <p className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1">
                  <Building2 size={11} /> {asset.issuer}
                </p>
              </div>
              <IssuanceStatus status={asset.status} />
            </div>
          </div>
          <div className="bg-[var(--color-panel)] p-5">
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{asset.description}</p>
            <p className="text-[10px] font-mono text-[var(--color-text-tertiary)] mt-3">
              Demo / Testnet &mdash; fictional issuance for illustration only.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 content-start">
          {[
            ['Asset Value', formatCurrency(asset.totalValue, { compact: true })],
            ['Price / Share', `$${asset.tokenPrice}`],
            ['Share Supply', formatNumber(asset.tokenSupply)],
            ['Target Yield', formatPercent(asset.targetYield)],
            ['Maturity', asset.maturity],
            ['Network', asset.network],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
              <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1">{label}</div>
              <div className="font-mono text-sm text-[var(--color-text-primary)]">{value}</div>
            </div>
          ))}

          <Link
            to="/app/approval"
            className="col-span-2 rounded-xl bg-[var(--color-accent)] text-white text-sm font-medium py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Review before signing
          </Link>
          <Link
            to="/app/copilot"
            className="col-span-2 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-panel)] text-xs font-medium py-2.5 hover:border-[var(--color-accent)]/50 transition-colors flex items-center justify-center gap-2"
          >
            <Waypoints size={12} /> Prepare for Leontief
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
          <h3 className="font-display text-sm font-semibold mb-4">Performance</h3>
          <AssetPerformanceChart data={asset.performance} />
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
          <h3 className="font-display text-sm font-semibold mb-4">Ownership distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={asset.ownership}
                dataKey="value"
                nameKey="label"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
              >
                {asset.ownership.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--color-panel-2)',
                  border: '1px solid var(--color-border-strong)',
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {asset.ownership.map((slice, i) => (
              <div key={slice.label} className="flex items-center gap-2 text-[11px]">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="text-[var(--color-text-secondary)] truncate">{slice.label}</span>
                <span className="ml-auto font-mono text-[var(--color-text-primary)]">{slice.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="space-y-6">
          <ComplianceStatus compliance={asset.compliance} />

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
            <h3 className="font-display text-sm font-semibold mb-4">Activity</h3>
            {relatedTx.length > 0 ? (
              <TransactionTimeline transactions={relatedTx} />
            ) : (
              <p className="text-xs text-[var(--color-text-tertiary)] py-6 text-center">No recent activity for this issuance.</p>
            )}

            <h3 className="font-display text-sm font-semibold mb-3 mt-6">Documents</h3>
            <div className="space-y-2">
              {asset.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-3.5 py-2.5 hover:border-[var(--color-border-strong)] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText size={14} className="text-[var(--color-text-tertiary)] shrink-0" />
                    <span className="text-xs text-[var(--color-text-primary)] truncate">{doc.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] shrink-0 ml-2">
                    {doc.type} &middot; {doc.size}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-accent)]/[0.07] to-transparent p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} className="text-[var(--color-accent)]" />
            <h3 className="font-display text-sm font-semibold">AI Review</h3>
          </div>

          {!asked ? (
            <div className="space-y-2">
              {REVIEW_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => setAsked(true)}
                  className="w-full text-left rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3.5 py-2.5 text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  &ldquo;{q}&rdquo;
                </button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
              {asset.policyExplanations.map((r) => (
                <div key={r.category} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">{r.category}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        r.level === 'Low'
                          ? 'text-[var(--color-positive)] bg-[var(--color-positive)]/10'
                          : r.level === 'Moderate'
                            ? 'text-[var(--color-warning)] bg-[var(--color-warning)]/10'
                            : 'text-[var(--color-negative)] bg-[var(--color-negative)]/10'
                      }`}
                    >
                      {r.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-tertiary)] leading-relaxed">{r.note}</p>
                </div>
              ))}
              <p className="text-[10px] text-[var(--color-text-tertiary)] pt-2">
                Workflow assistance only &mdash; not legal advice. AI recommends. Humans decide.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
