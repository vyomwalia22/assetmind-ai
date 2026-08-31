import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl mx-auto leading-tight">
          Draft your first issuance in minutes.
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-4 max-w-md mx-auto">
          The AI copilot prepares the configuration. You review, your compliance team signs off, and your wallet
          signs.
        </p>
        <button
          onClick={() => navigate('/app/create')}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-6 py-3.5 hover:opacity-90 transition-opacity"
        >
          Start an Issuance <ArrowRight size={15} />
        </button>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo subtitle={false} />
          <p className="text-[11px] font-mono text-[var(--color-text-tertiary)] text-center">
            Demo / Testnet &mdash; not a real investment opportunity. &copy; 2026 AssetMind Labs.
          </p>
        </div>
      </div>
    </footer>
  );
}
