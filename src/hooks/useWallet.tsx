import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { connectWallet as mockConnectWallet, type WalletConnection } from '@/services/stellar';

interface WalletContextValue {
  wallet: WalletConnection | null;
  connecting: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const connect = useCallback(async () => {
    setConnecting(true);
    try {
      const result = await mockConnectWallet();
      setWallet(result);
      setModalOpen(false);
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => setWallet(null), []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connecting,
        isModalOpen,
        openModal: () => setModalOpen(true),
        closeModal: () => setModalOpen(false),
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
