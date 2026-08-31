import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export function PrivacyShield({ score = 92, size = 200 }: { score?: number; size?: number }) {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={8}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#shield-grad)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="shield-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C6CFF" />
            <stop offset="100%" stopColor="#43E7FF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <ShieldCheck size={20} className="text-[var(--color-accent-2)] mb-1" />
        <span className="font-display text-3xl font-bold text-[var(--color-text-primary)]">{score}</span>
        <span className="text-[10px] font-mono text-[var(--color-text-tertiary)]">/ 100</span>
      </div>
    </div>
  );
}
