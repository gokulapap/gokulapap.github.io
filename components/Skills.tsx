'use client';

import { motion } from 'framer-motion';
import {
  Boxes,
  ShieldCheck,
  Cloud,
  Activity,
  Code2,
  Cpu,
  Globe,
  GitBranch,
  Database,
  type LucideIcon,
} from 'lucide-react';
import { skills } from '@/lib/data';
import { SectionHeading } from './SectionHeading';

const iconMap: Record<string, LucideIcon> = {
  Boxes,
  ShieldCheck,
  Cloud,
  Activity,
  Code2,
  Cpu,
  Globe,
  GitBranch,
  Database,
};

const accentMap = {
  emerald: { dot: '#10b981', text: 'text-accent-emerald', border: 'border-accent-emerald/30', bg: 'bg-accent-emerald/5' },
  cyan: { dot: '#22d3ee', text: 'text-accent-cyan', border: 'border-accent-cyan/30', bg: 'bg-accent-cyan/5' },
  violet: { dot: '#8b5cf6', text: 'text-accent-violet', border: 'border-accent-violet/30', bg: 'bg-accent-violet/5' },
  amber: { dot: '#f59e0b', text: 'text-accent-amber', border: 'border-accent-amber/30', bg: 'bg-accent-amber/5' },
} as const;

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          kicker="02 / stack"
          title={
            <>
              A toolkit for <span className="gradient-text">shipping & hardening</span> at scale.
            </>
          }
          subtitle="The stack I've used in production — opinions earned the hard way."
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            const a = accentMap[cat.accent];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.015] p-5 hover:border-white/10 hover:bg-white/[0.03] transition"
              >
                <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl opacity-60 ${a.bg}`} />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`grid place-items-center h-9 w-9 rounded-lg border ${a.border} ${a.bg}`}>
                      <Icon className={`h-4 w-4 ${a.text}`} />
                    </span>
                    <h3 className="font-display font-semibold text-base text-white">
                      {cat.label}
                    </h3>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.dot, boxShadow: `0 0 10px ${a.dot}` }} />
                </div>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] px-2 py-1 rounded border border-white/5 bg-black/20 text-white/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <Marquee />
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    'Kubernetes', 'ArgoCD', 'Terraform', 'Python', 'Go', 'Vault', 'Kyverno',
    'OPA', 'Trivy', 'Snyk', 'Burp Suite', 'Metasploit', 'Prometheus',
    'Grafana', 'Docker', 'Helm', 'Istio', 'Keda', 'AWS', 'GCP', 'Azure',
    'Cosign', 'OWASP ZAP', 'MCP',
  ];
  return (
    <div className="mt-14 relative overflow-hidden rounded-xl border border-white/5 bg-black/30 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
           style={{ background: 'linear-gradient(90deg, rgba(5,7,12,1), transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
           style={{ background: 'linear-gradient(270deg, rgba(5,7,12,1), transparent)' }} />
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-[13px] text-white/50">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-3">
            <span>{it}</span>
            <span className="text-accent-emerald">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
