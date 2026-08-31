import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Lock, ShieldCheck, Fingerprint } from 'lucide-react';
import { AssetVisual } from '@/components/AssetVisual';
import { mockAssets } from '@/data/mockAssets';
import { formatCurrency, formatNumber } from '@/lib/format';

export function DemoAssetSection() {
  const asset = mockAssets[0];

  return (
    <section id="assets" className="relative py-24 md:py-32 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-2)]">One asset class, done well</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 tracking-tight leading-tight">
            Built for issuers managing restricted private-credit assets.
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-4 max-w-md leading-relaxed">
            AssetMind's MVP is deliberately narrow: private credit, restricted transfers, and a compliance-first
            workflow &mdash; not a general marketplace for tokenizing anything.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-8 max-w-sm">
            {[
              { Icon: Building2, label: 'Private credit issuers' },
              { Icon: ShieldCheck, label: 'Compliance officers' },
              { Icon: Lock, label: 'Restricted transfers' },
              { Icon: Fingerprint, label: 'ZK eligibility proofs' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                <Icon size={13} className="text-[var(--color-accent)] shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] overflow-hidden"
        >
          <div className="relative h-40">
            <AssetVisual category={asset.category} seed={asset.accentSeed} className="w-full h-full" />
            <span className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2 py-1 rounded-md bg-black/50 backdrop-blur border border-white/10 text-[var(--color-text-secondary)]">
              Demo / Testnet
            </span>
          </div>
          <div className="p-6">
            <h3 className="font-display text-lg font-semibold mb-1">{asset.name}</h3>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-5">{asset.issuer} &middot; Private Credit</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                ['Asset value', formatCurrency(asset.totalValue)],
                ['Token supply', `${formatNumber(asset.tokenSupply)} shares`],
                ['Price', `$${asset.tokenPrice}`],
                ['Investor access', asset.investorAccess],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)] mb-1">{label}</div>
                  <div className="font-mono text-sm text-[var(--color-text-primary)]">{value}</div>
                </div>
              ))}
            </div>

            <Link
              to="/app/create"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-2)] hover:gap-3 transition-all"
            >
              Start an issuance like this <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
