import { Bell, Search, Wallet2 } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { wallet, openModal } = useWallet();

  return (
    <header className="sticky top-0 z-30 glass border-b border-[var(--color-border)]">
      <div className="h-16 px-4 md:px-8 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display font-semibold text-[15px] md:text-base text-[var(--color-text-primary)] truncate">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-[var(--color-text-tertiary)] truncate">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-2 w-64">
            <Search size={14} className="text-[var(--color-text-tertiary)]" />
            <input
              placeholder="Search issuances, activity…"
              className="bg-transparent outline-none text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] w-full"
            />
          </div>

          <button
            className="relative h-9 w-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Notifications"
          >
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
          </button>

          <button
            onClick={openModal}
            className="flex items-center gap-2 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 text-xs font-mono text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <Wallet2 size={13} />
            {wallet ? `${wallet.publicKey.slice(0, 4)}…${wallet.publicKey.slice(-4)}` : 'Connect'}
          </button>
        </div>
      </div>
    </header>
  );
}
