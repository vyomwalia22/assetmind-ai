import { useState } from 'react';
import { Wallet2, Bell, ShieldCheck, User } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { cx } from '@/lib/format';

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={cx(
        'h-6 w-11 rounded-full flex items-center px-0.5 transition-colors shrink-0',
        checked ? 'bg-[var(--color-accent)] justify-end' : 'bg-[var(--color-panel-3)] justify-start',
      )}
    >
      <span className="h-5 w-5 rounded-full bg-white block" />
    </button>
  );
}

export default function Settings() {
  const { wallet, openModal, disconnect } = useWallet();
  const [notifs, setNotifs] = useState({ transactions: true, approval: true, yield: true, marketing: false });
  const [twoFa, setTwoFa] = useState(true);

  return (
    <div className="max-w-2xl space-y-6">
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
        <div className="flex items-center gap-2 mb-5">
          <User size={15} className="text-[var(--color-accent)]" />
          <h3 className="font-display text-sm font-semibold">Account</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Display name</label>
            <input
              defaultValue="Compliance Officer"
              className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] outline-none p-3 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)]/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--color-text-tertiary)] mb-1.5 block">Email</label>
            <input
              defaultValue="compliance@atlascapital.demo"
              className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] outline-none p-3 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)]/50 transition-colors"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
        <div className="flex items-center gap-2 mb-5">
          <Wallet2 size={15} className="text-[var(--color-accent)]" />
          <h3 className="font-display text-sm font-semibold">Wallet</h3>
        </div>
        {wallet ? (
          <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
            <div>
              <div className="text-xs font-mono text-[var(--color-text-primary)]">
                {wallet.publicKey.slice(0, 8)}…{wallet.publicKey.slice(-8)}
              </div>
              <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                {wallet.network} &middot; {wallet.balanceXlm.toLocaleString()} XLM
              </div>
            </div>
            <button
              onClick={disconnect}
              className="text-xs font-mono text-[var(--color-negative)] hover:opacity-80 transition-opacity"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={openModal}
            className="rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity"
          >
            Connect wallet
          </button>
        )}
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck size={15} className="text-[var(--color-accent)]" />
          <h3 className="font-display text-sm font-semibold">Security</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[var(--color-text-primary)]">Two-factor authentication</div>
            <div className="text-[11px] text-[var(--color-text-tertiary)]">Require a code at sign-in</div>
          </div>
          <Toggle checked={twoFa} onChange={() => setTwoFa((v) => !v)} label="Two-factor authentication" />
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
        <div className="flex items-center gap-2 mb-5">
          <Bell size={15} className="text-[var(--color-accent)]" />
          <h3 className="font-display text-sm font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          {(
            [
              ['transactions', 'Signed transaction confirmations'],
              ['approval', 'Human approval requests'],
              ['yield', 'Compliance & policy updates'],
              ['marketing', 'Product updates'],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-primary)]">{label}</span>
              <Toggle
                checked={notifs[key]}
                onChange={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                label={label}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
