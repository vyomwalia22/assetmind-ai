import { AnimatePresence, motion } from 'framer-motion';
import { X, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/useToast';

export function WalletModal() {
  const { isModalOpen, closeModal, connect, connecting, wallet } = useWallet();
  const { push } = useToast();

  const handleConnect = async () => {
    await connect();
    push({ variant: 'success', title: 'Wallet connected', description: 'Freighter linked to Stellar Testnet.' });
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Connect wallet"
            className="relative w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {!wallet ? (
              <>
                <h2 className="font-display text-lg font-semibold mb-1">Connect wallet</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Connect a Stellar wallet as the human signer. AssetMind's AI copilot never signs transactions on
                  your behalf — it only prepares them for your review.
                </p>

                <button
                  onClick={handleConnect}
                  disabled={connecting}
                  className="w-full flex items-center justify-between rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-panel-2)] px-4 py-3.5 hover:border-[var(--color-accent)]/50 transition-colors disabled:opacity-70"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center text-xs font-bold text-black">
                      F
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">Freighter</div>
                      <div className="text-[11px] text-[var(--color-text-tertiary)]">Stellar browser wallet</div>
                    </div>
                  </div>
                  {connecting ? (
                    <Loader2 size={16} className="animate-spin text-[var(--color-accent)]" />
                  ) : (
                    <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">Connect</span>
                  )}
                </button>

                <div className="mt-4 flex items-start gap-2 text-[11px] text-[var(--color-text-tertiary)]">
                  <ShieldCheck size={13} className="mt-0.5 shrink-0" />
                  Connecting is simulated in this demo — no real wallet extension is required.
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={18} className="text-[var(--color-positive)]" />
                  <h2 className="font-display text-lg font-semibold">Wallet connected</h2>
                </div>
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-2)] p-4 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-text-tertiary)]">Network</span>
                    <span className="font-mono text-[var(--color-text-primary)]">{wallet.network}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-text-tertiary)]">Role</span>
                    <span className="font-mono text-[var(--color-text-primary)]">{wallet.role}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-text-tertiary)]">Wallet</span>
                    <span className="font-mono text-[var(--color-text-primary)]">
                      {wallet.publicKey.slice(0, 6)}…{wallet.publicKey.slice(-6)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-text-tertiary)]">Balance</span>
                    <span className="font-mono text-[var(--color-text-primary)]">
                      {wallet.balanceXlm.toLocaleString()} XLM
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="mt-4 w-full rounded-xl bg-[var(--color-accent)] text-white text-sm font-medium py-3 hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
