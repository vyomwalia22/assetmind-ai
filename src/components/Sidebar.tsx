import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  Sparkles,
  Boxes,
  Library,
  ShieldCheck,
  FileCheck2,
  Fingerprint,
  ArrowLeftRight,
  Settings,
  Wifi,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Logo, LogoMark } from '@/components/Logo';
import { useWallet } from '@/hooks/useWallet';
import { cx } from '@/lib/format';

const NAV_ITEMS = [
  { to: '/app', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/app/copilot', label: 'Issuance Copilot', icon: Sparkles },
  { to: '/app/assets', label: 'My Issuances', icon: Boxes },
  { to: '/app/marketplace', label: 'Issuance Library', icon: Library },
  { to: '/app/compliance', label: 'Compliance Studio', icon: FileCheck2 },
  { to: '/app/privacy', label: 'Privacy Studio', icon: ShieldCheck },
  { to: '/app/approval', label: 'Human Approval', icon: Fingerprint },
  { to: '/app/transactions', label: 'Activity', icon: ArrowLeftRight },
];

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const { wallet, openModal } = useWallet();

  return (
    <aside
      className={cx(
        'hidden md:flex flex-col shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] h-screen sticky top-0 transition-all duration-300',
        collapsed ? 'w-[76px]' : 'w-[248px]',
      )}
    >
      <div className={cx('h-16 flex items-center border-b border-[var(--color-border)]', collapsed ? 'justify-center px-0' : 'px-5')}>
        {collapsed ? <LogoMark size={26} /> : <Logo />}
      </div>

      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cx(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[var(--color-accent-soft)] text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.03]',
                collapsed && 'justify-center px-0',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-2)]" />
                )}
                <item.icon size={17} strokeWidth={1.8} />
                {!collapsed && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-3">
        <NavLink
          to="/app/settings"
          className={({ isActive }) =>
            cx(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors mb-2',
              isActive
                ? 'bg-[var(--color-accent-soft)] text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.03]',
              collapsed && 'justify-center px-0',
            )
          }
        >
          <Settings size={17} strokeWidth={1.8} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>

      <div className={cx('border-t border-[var(--color-border)] p-3 space-y-2.5', collapsed && 'flex flex-col items-center')}>
        <div
          className={cx(
            'flex items-center gap-2 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] px-3 py-2',
            collapsed && 'w-11 h-11 justify-center px-0',
          )}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-positive)] opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-positive)]" />
          </span>
          {!collapsed && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-text-secondary)]">
              <Wifi size={11} />
              Stellar Testnet
            </div>
          )}
        </div>

        <button
          onClick={openModal}
          className={cx(
            'w-full flex items-center gap-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-2.5 hover:border-[var(--color-border-strong)] transition-colors',
            collapsed && 'w-11 h-11 justify-center px-0',
          )}
        >
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] shrink-0" />
          {!collapsed && (
            <div className="text-left min-w-0">
              <div className="text-[11px] font-mono text-[var(--color-text-primary)] truncate">
                {wallet ? `${wallet.publicKey.slice(0, 4)}...${wallet.publicKey.slice(-4)}` : 'Connect wallet'}
              </div>
              <div className="text-[10px] text-[var(--color-text-tertiary)]">
                {wallet ? `${wallet.balanceXlm.toLocaleString()} XLM` : 'Not connected'}
              </div>
            </div>
          )}
        </button>

        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.03] transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
