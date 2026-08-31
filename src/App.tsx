import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider } from '@/hooks/useWallet';
import { ToastProvider } from '@/hooks/useToast';
import { AppLayout } from '@/components/AppLayout';
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import IssuanceCopilot from '@/pages/IssuanceCopilot';
import Assets from '@/pages/Assets';
import Marketplace from '@/pages/Marketplace';
import AssetDetail from '@/pages/AssetDetail';
import CreateAsset from '@/pages/CreateAsset';
import Compliance from '@/pages/Compliance';
import Privacy from '@/pages/Privacy';
import Simulator from '@/pages/Simulator';
import HumanApprovalPage from '@/pages/HumanApprovalPage';
import Transactions from '@/pages/Transactions';
import Settings from '@/pages/Settings';

export default function App() {
  return (
    <WalletProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="copilot" element={<IssuanceCopilot />} />
              <Route path="assets" element={<Assets />} />
              <Route path="assets/:id" element={<AssetDetail />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="create" element={<CreateAsset />} />
              <Route path="compliance" element={<Compliance />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="simulator" element={<Simulator />} />
              <Route path="approval" element={<HumanApprovalPage />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </WalletProvider>
  );
}
