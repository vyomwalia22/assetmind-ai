import { CheckCircle2, Circle, FileText } from 'lucide-react';
import type { ComplianceConfig } from '@/types';
import { cx } from '@/lib/format';

function Row({ label, active, value }: { label: string; active: boolean; value?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--color-border)] last:border-0">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <span className={cx('flex items-center gap-1.5 text-xs font-mono', active ? 'text-[var(--color-positive)]' : 'text-[var(--color-text-tertiary)]')}>
        {active ? <CheckCircle2 size={13} /> : <Circle size={13} />}
        {value ?? (active ? 'Active' : 'Not configured')}
      </span>
    </div>
  );
}

export function ComplianceStatus({ compliance, className }: { compliance: ComplianceConfig; className?: string }) {
  return (
    <div className={cx('rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5', className)}>
      <div className="flex items-center gap-2 mb-1">
        <FileText size={14} className="text-[var(--color-accent)]" />
        <h3 className="font-display text-sm font-semibold">Compliance</h3>
      </div>
      <div className="mt-3">
        <Row label="SEP-8 Policy" active={compliance.sep8 !== 'Pending'} value={compliance.sep8} />
        <Row label="Authorization" active={compliance.authorization} />
        <Row label="Transfer Restrictions" active={compliance.transferRestrictions} value={compliance.transferRestrictions ? 'Restricted' : undefined} />
        <Row label="Clawback" active={compliance.clawback} />
        <Row label="Investor Eligibility" active={true} value={compliance.investorEligibility} />
        <Row label="Issuer Controls" active={compliance.issuerControls === 'Configured'} value={compliance.issuerControls} />
      </div>
    </div>
  );
}
