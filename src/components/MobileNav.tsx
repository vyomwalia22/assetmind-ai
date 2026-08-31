import { NavLink } from 'react-router-dom';
import { LayoutGrid, Sparkles, Library, FileCheck2, Menu } from 'lucide-react';
import { cx } from '@/lib/format';

const ITEMS = [
  { to: '/app', label: 'Home', icon: LayoutGrid, end: true },
  { to: '/app/copilot', label: 'Copilot', icon: Sparkles },
  { to: '/app/marketplace', label: 'Library', icon: Library },
  { to: '/app/compliance', label: 'Compliance', icon: FileCheck2 },
  { to: '/app/settings', label: 'More', icon: Menu },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-[var(--color-border)] px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch justify-between">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cx(
                'flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
                isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]',
              )
            }
          >
            <item.icon size={18} strokeWidth={1.8} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
