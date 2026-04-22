'use client';

import { motion } from 'framer-motion';

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-white/55">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
        <span className="uppercase tracking-wider">{kicker}</span>
      </div>
      <h2 className="mt-4 font-display text-[1.6rem] sm:text-3xl md:text-5xl font-semibold tracking-tight leading-[1.15] sm:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-white/60 text-[14.5px] sm:text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
