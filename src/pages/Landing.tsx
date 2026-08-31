import { Hero } from '@/components/landing/Hero';
import { FlowSection } from '@/components/landing/FlowSection';
import { DemoAssetSection } from '@/components/landing/DemoAssetSection';
import { PrivacySection } from '@/components/landing/PrivacySection';
import { AgentSection } from '@/components/landing/AgentSection';
import { LeontiefSection } from '@/components/landing/LeontiefSection';
import { StellarSection } from '@/components/landing/StellarSection';
import { Footer } from '@/components/landing/Footer';

export default function Landing() {
  return (
    <div className="bg-[var(--color-bg)] bg-noise min-h-screen">
      <Hero />
      <FlowSection />
      <DemoAssetSection />
      <AgentSection />
      <PrivacySection />
      <LeontiefSection />
      <StellarSection />
      <Footer />
    </div>
  );
}
