import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck2, ShieldCheck, Lock, RefreshCw, Users, Building2, Sparkles, ChevronDown } from 'lucide-react';
import { mockAssets } from '@/data/mockAssets';
import { ComplianceStatus } from '@/components/ComplianceStatus';
import { POLICY_EXPLANATIONS } from '@/services/ai';
import { cx } from '@/lib/format';

const CONTROL_ICONS = [
  { key: 'sep8', label: 'SEP-8 Policy', icon: FileCheck2, explain: POLICY_EXPLANATIONS.sep8 },
  { key: 'authorization', label: 'Authorization', icon: ShieldCheck, explain: POLICY_EXPLANATIONS.authorization },
  { key: 'transferRestrictions', label: 'Transfer Restrictions', icon: Lock, explain: POLICY_EXPLANATIONS.transferRestrictions },
  { key: 'clawback', label: 'Clawback', icon: RefreshCw, explain: POLICY_EXPLANATIONS.clawback },
  { key: 'investorEligibility', label: 'Investor Eligibility', icon: Users, explain: 'Investors must complete eligibility verification before holding shares.' },
  { key: 'issuerControls', label: 'Issuer Controls', icon: Building2, explain: 'The issuer retains configured administrative controls over this asset.' },
];

export default function Compliance() {
  const [selectedId, setSelectedId] = useState(mockAssets[0].id);
  const [expanded, setExpanded] = useState<string | null>('sep8');
  const [reviewed, setReviewed] = useState(false);
  const asset = mockAssets.find((a) => a.id === selectedId) ?? mockAssets[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">
          Institutional compliance controls for private-credit issuance. AI-generated configuration is for workflow
          assistance and requires human/compliance review.
        </p>
        <select
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setReviewed(false);
          }}
          className="max-w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-2 text-xs font-mono text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]/50 truncate"
        >
          {mockAssets.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        <ComplianceStatus compliance={asset.compliance} />

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} className="text-[var(--color-accent)]" />
            <h3 className="font-display text-sm font-semibold">AI explanation</h3>
          </div>
          <div className="space-y-2">
            {CONTROL_ICONS.map((c) => (
              <div key={c.key} className="rounded-lg border border-[var(--color-border)] overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === c.key ? null : c.key)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-primary)]">
                    <c.icon size={13} className="text-[var(--color-accent)]" />
                    {c.label}
                  </span>
                  <ChevronDown
                    size={13}
                    className={cx('text-[var(--color-text-tertiary)] transition-transform', expanded === c.key && 'rotate-180')}
                  />
                </button>
                {expanded === c.key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-3.5 pb-3 text-[11px] text-[var(--color-text-tertiary)] leading-relaxed"
                  >
                    {c.explain}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[var(--color-text-tertiary)] mt-4 pt-4 border-t border-[var(--color-border)]">
            AI-generated configuration is for workflow assistance and requires human/compliance review. AssetMind does
            not provide legal advice.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
        <h3 className="font-display text-sm font-semibold mb-3">SEP-8 policy preview</h3>
        <pre className="rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-border)] p-4 text-[11px] font-mono text-[var(--color-text-secondary)] overflow-x-auto">
{`{
  "asset_code": "${asset.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 6)}",
  "authorization_required": ${asset.compliance.authorization},
  "authorization_revocable": true,
  "clawback_enabled": ${asset.compliance.clawback},
  "transfer_restrictions": "${asset.compliance.transferRestrictions ? 'restricted' : 'none'}",
  "investor_eligibility": "${asset.compliance.investorEligibility}",
  "status": "${asset.compliance.sep8}"
}`}
        </pre>
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
            <input
              type="checkbox"
              checked={reviewed}
              onChange={(e) => setReviewed(e.target.checked)}
              className="h-4 w-4 rounded accent-[var(--color-accent)]"
            />
            I have reviewed this policy draft
          </label>
          <button
            disabled={!reviewed}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Review policy
          </button>
        </div>
      </div>
    </div>
  );
}
