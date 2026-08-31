import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  r: number;
  delay: number;
  duration: number;
}

function makeNodes(count: number, seed: number): Node[] {
  const nodes: Node[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: rand() * 100,
      y: rand() * 100,
      r: 1 + rand() * 2.2,
      delay: rand() * 4,
      duration: 6 + rand() * 6,
    });
  }
  return nodes;
}

export function NetworkField({ className }: { className?: string }) {
  const nodes = useMemo(() => makeNodes(34, 17), []);
  const centerX = 88;
  const centerY = 28;

  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="nf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C6CFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7C6CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={centerX} cy={centerY} r="14" fill="url(#nf-glow)" />
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="2.4"
        fill="#43E7FF"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {nodes.map((n, i) => (
        <g key={i}>
          <motion.line
            x1={n.x}
            y1={n.y}
            x2={centerX}
            y2={centerY}
            stroke="rgba(124,108,255,0.1)"
            strokeWidth="0.1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: n.duration, delay: n.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            r={n.r * 0.32}
            fill="#9B8FFF"
            initial={{ cx: n.x, cy: n.y, opacity: 0 }}
            animate={{
              cx: [n.x, centerX],
              cy: [n.y, centerY],
              opacity: [0, 0.55, 0],
            }}
            transition={{
              duration: n.duration,
              delay: n.delay,
              repeat: Infinity,
              ease: 'easeIn',
            }}
          />
        </g>
      ))}
    </svg>
  );
}
