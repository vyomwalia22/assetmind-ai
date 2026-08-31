import type { AssetCategory } from '@/types';

const CATEGORY_PATTERNS: Record<AssetCategory, { from: string; to: string }> = {
  'Private Credit': { from: '#7C6CFF', to: '#43E7FF' },
};

export function AssetVisual({ category, seed = 1, className }: { category: AssetCategory; seed?: number; className?: string }) {
  const { from, to } = CATEGORY_PATTERNS[category];
  const id = `av-${category.replace(/\s/g, '')}-${seed}`;

  // deterministic pseudo-random bars from seed
  const bars = Array.from({ length: 14 }, (_, i) => {
    const v = Math.abs(Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453) % 1;
    return 18 + v * 60;
  });

  return (
    <svg viewBox="0 0 400 200" width="100%" height="100%" className={className} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} stopOpacity="0.5" />
          <stop offset="1" stopColor={to} stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#08090b" stopOpacity="0" />
          <stop offset="1" stopColor="#08090b" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="#111318" />
      <rect width="400" height="200" fill={`url(#${id})`} opacity="0.5" />
      {Array.from({ length: 10 }).map((_, r) =>
        Array.from({ length: 20 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 21 + 6} cy={r * 21 + 6} r="1" fill="rgba(255,255,255,0.06)" />
        )),
      )}
      <g transform="translate(20,150)">
        {bars.map((h, i) => (
          <rect
            key={i}
            x={i * 27}
            y={-h}
            width="14"
            height={h}
            rx="2"
            fill={from}
            opacity={0.25 + (i / bars.length) * 0.4}
          />
        ))}
      </g>
      <rect width="400" height="200" fill={`url(#${id}-fade)`} />
    </svg>
  );
}
