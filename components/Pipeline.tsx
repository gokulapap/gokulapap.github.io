'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  GitCommit,
  Package,
  ScanLine,
  FileCheck2,
  Rocket,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import { pipelineStages } from '@/lib/data';
import { SectionHeading } from './SectionHeading';

const iconMap: Record<string, LucideIcon> = {
  GitCommit, Package, Scan: ScanLine, FileCheck2, Rocket, Activity,
};

export function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-100px', once: false });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const i = setInterval(() => {
      setActive((a) => (a + 1) % pipelineStages.length);
    }, 1500);
    return () => clearInterval(i);
  }, [inView]);

  return (
    <section id="pipeline" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          kicker="03 / pipeline"
          title={
            <>
              How I ship code, <span className="gradient-text">safely</span>.
            </>
          }
          subtitle="Every code change goes through six automated checks before it reaches users. If any step fails, the change stops — it never touches production. Here's what each step does."
        />

        <div className="mt-14 surface p-6 md:p-10 overflow-hidden">

          {/* Desktop: horizontal */}
          <div className="mt-8 hidden md:block">
            <div className="relative">
              <div className="absolute top-7 left-0 right-0 h-px bg-white/10" />
              <motion.div
                className="absolute top-7 left-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, #10b981, #22d3ee, #8b5cf6)',
                  boxShadow: '0 0 14px rgba(34,211,238,0.55)',
                }}
                animate={{ width: `${((active + 1) / pipelineStages.length) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />

              <div className="relative grid grid-cols-6 gap-2">
                {pipelineStages.map((s, i) => {
                  const Icon = iconMap[s.icon] ?? GitCommit;
                  const isActive = i <= active;
                  const isCurrent = i === active;
                  return (
                    <div key={s.id} className="flex flex-col items-center text-center">
                      <motion.div
                        animate={isCurrent ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                        transition={{ duration: 1.2, repeat: isCurrent ? Infinity : 0 }}
                        className={`relative grid place-items-center h-14 w-14 rounded-full border-2 transition-colors duration-500 ${
                          isActive
                            ? 'border-accent-emerald bg-accent-emerald/10 text-accent-emerald'
                            : 'border-white/10 bg-white/[0.02] text-white/40'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {isCurrent && (
                          <span className="absolute inset-0 rounded-full border-2 border-accent-emerald/40 animate-ping" />
                        )}
                      </motion.div>
                      <div className="mt-3 font-mono text-[10px] tracking-widest text-white/50">
                        STAGE {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="mt-1 font-display font-semibold text-sm text-white">{s.label}</div>
                      <div className="mt-1 font-mono text-[10px] text-accent-cyan">{s.sub}</div>
                      <div className="mt-2 text-[11px] text-white/55 max-w-[160px]">{s.detail}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="mt-8 md:hidden space-y-3">
            {pipelineStages.map((s, i) => {
              const Icon = iconMap[s.icon] ?? GitCommit;
              const isActive = i <= active;
              return (
                <div key={s.id}
                  className={`flex gap-3 items-start rounded-xl border p-3 transition ${
                    isActive ? 'border-accent-emerald/30 bg-accent-emerald/5' : 'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <div className={`grid place-items-center h-10 w-10 rounded-lg border shrink-0 ${
                    isActive ? 'border-accent-emerald/50 text-accent-emerald' : 'border-white/10 text-white/40'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-sm">{s.label}</span>
                      <span className="font-mono text-[10px] text-accent-cyan">{s.sub}</span>
                    </div>
                    <div className="mt-1 text-[12px] text-white/60">{s.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 rounded-lg border border-white/5 bg-black/40 p-4 font-mono text-[12px]"
          >
            <div className="flex items-center gap-2 text-accent-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
              <span>[{pipelineStages[active].label.toLowerCase()}]</span>
              <span className="text-white/60">{pipelineStages[active].detail}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
