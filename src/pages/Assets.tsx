import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { AssetCard } from '@/components/AssetCard';
import { mockAssets } from '@/data/mockAssets';

export default function Assets() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Private-credit issuances you manage on AssetMind. Demo / Testnet data.
        </p>
        <Link
          to="/app/create"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity shrink-0"
        >
          <PlusCircle size={15} />
          Start an Issuance
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0">
        {mockAssets.map((asset, i) => (
          <AssetCard asset={asset} key={asset.id} index={i} />
        ))}
      </div>
    </div>
  );
}
