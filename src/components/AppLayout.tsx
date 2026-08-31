import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { Topbar } from '@/components/Topbar';
import { WalletModal } from '@/components/WalletModal';

const TITLES: Record<string, { title: string; subtitle?: string }> = {
  '/app': { title: 'Overview', subtitle: 'Your issuance command center' },
  '/app/copilot': { title: 'Issuance Copilot', subtitle: 'AI drafts. You review. The wallet signs.' },
  '/app/assets': { title: 'My Issuances', subtitle: 'Private-credit issuances you manage on AssetMind' },
  '/app/marketplace': { title: 'Issuance Library', subtitle: 'Issuer-side view of every configured issuance' },
  '/app/compliance': { title: 'Compliance Studio', subtitle: 'SEP-8 policy, restrictions and issuer controls' },
  '/app/privacy': { title: 'Privacy Studio', subtitle: 'Prove eligibility without exposing unnecessary information' },
  '/app/approval': { title: 'Human Approval', subtitle: 'Review before signing' },
  '/app/simulator': { title: 'Issuance Simulator', subtitle: 'Validate the configuration before human review' },
  '/app/transactions': { title: 'Activity', subtitle: 'Configuration, compliance and signing history' },
  '/app/create': { title: 'Create Private Credit Issuance', subtitle: 'Guided issuance workflow with an AI copilot' },
  '/app/settings': { title: 'Settings', subtitle: 'Account, security and preferences' },
};

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const match =
    TITLES[location.pathname] ??
    (location.pathname.startsWith('/app/assets/') ? { title: 'Issuance Detail', subtitle: 'Configuration, compliance and privacy for this issuance' } : { title: 'AssetMind' });

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] bg-noise">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex-1 min-w-0 pb-16 md:pb-0">
        <Topbar title={match.title} subtitle={match.subtitle} />
        <main className="px-4 md:px-8 py-6 md:py-8 max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
      <MobileNav />
      <WalletModal />
    </div>
  );
}
