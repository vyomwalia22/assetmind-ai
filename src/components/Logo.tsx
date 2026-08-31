import { cx } from '@/lib/format';

export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="am-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C6CFF" />
          <stop offset="1" stopColor="#43E7FF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#am-grad)" fillOpacity="0.12" />
      <path
        d="M9 22.5L15.5 9.5L22 22.5"
        stroke="url(#am-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.6 17.3H19.4" stroke="url(#am-grad)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="15.5" cy="9.5" r="1.7" fill="#43E7FF" />
      <circle cx="9" cy="22.5" r="1.5" fill="#7C6CFF" />
      <circle cx="22" cy="22.5" r="1.5" fill="#7C6CFF" />
    </svg>
  );
}

export function Logo({ className, subtitle = true }: { className?: string; subtitle?: boolean }) {
  return (
    <div className={cx('flex items-center gap-2.5', className)}>
      <LogoMark />
      <div className="leading-none">
        <div className="font-display font-semibold text-[15px] tracking-tight text-[var(--color-text-primary)]">
          AssetMind
        </div>
        {subtitle && (
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-text-tertiary)] mt-0.5">
            AI &times; Private Credit &times; Compliance
          </div>
        )}
      </div>
    </div>
  );
}
