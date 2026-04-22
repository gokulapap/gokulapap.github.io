'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Award,
  ShieldAlert,
  Star,
  Container,
  GitFork,
  IndianRupee,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { achievements } from '@/lib/data';
import { SectionHeading } from './SectionHeading';

const iconMap: Record<string, LucideIcon> = {
  Award, ShieldAlert, Star, Container, GitFork, IndianRupee, Rocket,
};

const accentMap = {
  emerald: { text: 'text-accent-emerald', bg: 'bg-accent-emerald/10', border: 'border-accent-emerald/25' },
  cyan: { text: 'text-accent-cyan', bg: 'bg-accent-cyan/10', border: 'border-accent-cyan/25' },
  violet: { text: 'text-accent-violet', bg: 'bg-accent-violet/10', border: 'border-accent-violet/25' },
  amber: { text: 'text-accent-amber', bg: 'bg-accent-amber/10', border: 'border-accent-amber/25' },
  rose: { text: 'text-accent-rose', bg: 'bg-accent-rose/10', border: 'border-accent-rose/25' },
} as const;

// Numbers that appear as counters at the top of this section.
// "Google Hall of Fame" is kept only in the achievement cards below —
// "1x" as a counter tile reads oddly.
// Bounty amount (₹20L+) is similarly kept inside its combined card below.
const heroStats = [
  { label: 'Vulnerabilities Disclosed', value: 100, suffix: '+', accent: 'rose' as const },
  { label: 'Years Engineering', value: 4, suffix: '+', accent: 'cyan' as const },
  { label: 'OSS Projects', value: 60, suffix: '+', accent: 'violet' as const },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          kicker="06 / wins"
          title={
            <>
              Recognitions, disclosures, and <span className="gradient-text">receipts</span>.
            </>
          }
          subtitle="Work I'm proud of — and the numbers that back it."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {heroStats.map((s, i) => (
            <CounterTile key={s.label} {...s} delay={i * 0.08} />
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => {
            const Icon = iconMap[a.icon] ?? Award;
            const c = accentMap[a.accent];
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.015] p-5 hover:border-white/15 hover:bg-white/[0.03] transition"
              >
                <span className={`absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-60 ${c.bg}`} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className={`grid place-items-center h-10 w-10 rounded-lg border ${c.border} ${c.bg}`}>
                      <Icon className={`h-4 w-4 ${c.text}`} />
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-widest ${c.text}`}>
                      {a.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">
                    {a.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CounterTile({
  label, to, value, suffix, prefix, accent, delay,
}: {
  label: string;
  to?: number;
  value: number;
  suffix?: string;
  prefix?: string;
  accent: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose';
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [v, setV] = useState(0);
  const c = accentMap[accent];

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200 + delay * 1000;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className="surface p-4 text-center"
    >
      <div className={`font-display text-3xl md:text-4xl font-bold ${c.text}`}>
        {prefix && <span className="text-xl mr-0.5">{prefix}</span>}
        {v.toLocaleString()}
        {suffix && <span className="text-xl ml-0.5">{suffix}</span>}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
        {label}
      </div>
    </motion.div>
  );
}
