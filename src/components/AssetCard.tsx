import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Users, Building2 } from 'lucide-react';
import type { Issuance } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/format';
import { AssetVisual } from '@/components/AssetVisual';
import { MiniAssetChart } from '@/components/AssetChart';
import { IssuanceStatus } from '@/components/IssuanceStatus';

const RISK_COLOR: Record<string, string> = {
  Low: 'text-[var(--color-positive)] bg-[var(--color-positive)]/10',
  Moderate: 'text-[var(--color-warning)] bg-[var(--color-warning)]/10',
  Elevated: 'text-[var(--color-negative)] bg-[var(--color-negative)]/10',
};

export function AssetCard({ asset, index = 0 }: { asset: Issuance; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.4), ease: 'easeOut' }}
      className="min-w-0"
    >
      <Link
        to={`/app/assets/${asset.id}`}
        className="group block rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] overflow-hidden hover:border-[var(--color-border-strong)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_50px_-24px_rgba(124,108,255,0.4)]"
      >
        <div className="relative h-32 overflow-hidden min-w-0">
          <AssetVisual
            category={asset.category}
            seed={asset.accentSeed}
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded-md bg-black/50 backdrop-blur border border-white/10 text-[var(--color-text-secondary)]">
              {asset.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <IssuanceStatus status={asset.status} />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
              {asset.name}
            </h3>
          </div>
          <p className="text-[11px] text-[var(--color-text-tertiary)] mb-3 flex items-center gap-1">
            <Building2 size={10} /> {asset.issuer}
          </p>

          <div className="grid grid-cols-2 gap-y-2 text-[11px] mb-3">
            <div>
              <div className="text-[var(--color-text-tertiary)]">Asset Value</div>
              <div className="font-mono text-[var(--color-text-primary)]">{formatCurrency(asset.totalValue, { compact: true })}</div>
            </div>
            <div>
              <div className="text-[var(--color-text-tertiary)]">Price / Share</div>
              <div className="font-mono text-[var(--color-text-primary)]">${asset.tokenPrice}</div>
            </div>
            <div>
              <div className="text-[var(--color-text-tertiary)]">Target Yield</div>
              <div className="font-mono text-[var(--color-positive)]">{formatPercent(asset.targetYield)}</div>
            </div>
            <div>
              <div className="text-[var(--color-text-tertiary)] flex items-center gap-1">
                <Users size={9} /> Investors
              </div>
              <div className="font-mono text-[var(--color-text-primary)]">{asset.investors.toLocaleString()}</div>
            </div>
          </div>

          <MiniAssetChart data={asset.performance} positive />

          <div className="flex items-center justify-between mt-2">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${RISK_COLOR[asset.riskLevel]}`}>
              {asset.riskLevel} risk
            </span>
            <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] flex items-center gap-1">
              <Lock size={9} /> {asset.investorAccess}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
