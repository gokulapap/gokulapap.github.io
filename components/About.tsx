'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Boxes, ShieldCheck, Cpu } from 'lucide-react';
import { profile } from '@/lib/data';
import { SectionHeading } from './SectionHeading';

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          kicker="01 / about"
          title={
            <>
              A DevOps Engineer with a <span className="gradient-text">security mindset</span>.
            </>
          }
          subtitle="DevOps is the day job — Kubernetes, ArgoCD, deployment automation. Security is how I think about the systems I build: defensible by default, with the tooling to prove it."
        />

        <div className="mt-16 grid lg:grid-cols-12 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <Portrait />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-5 text-white/75 leading-relaxed text-[15px] md:text-base">
              <p>
                I&apos;m a DevOps engineer with four years of production
                experience across site reliability and applied security
                research. Most of my work lives in Python, Go, and shell —
                infrastructure automation that turns slow, manual engineering
                workflows into fast, repeatable pipelines.
              </p>
              <p>
                At Moveworks, I work on the DevOps team — deployment
                automation on Argo Workflows, CI guardrails for Kubernetes
                manifests, and Kubecost-driven resource rightsizing across
                production and gov environments. Before that, a year and a
                half as an SRE at ShopUp — cluster security hardening,
                Helm-based CI/CD, and Teleport-backed access infrastructure.
              </p>
              <p>
                On the security side, I&apos;ve been hunting bugs in production
                web systems since college — a mix of public bug-bounty programs
                and private engagements. That research tends to show up in
                open-source tooling I maintain:{' '}
                <a
                  href="https://github.com/gokulapap/Reconator"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-emerald hover:underline underline-offset-2"
                >
                  Reconator
                </a>{' '}
                (automated reconnaissance for pentesters) and{' '}
                <a
                  href="https://github.com/gokulapap/bugbounty-mcp-server"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-emerald hover:underline underline-offset-2"
                >
                  bugbounty-mcp-server
                </a>{' '}
                (an MCP server that brings offensive-security tooling directly
                into LLM agents).
              </p>
              <p>
                Outside work, I&apos;m building{' '}
                <a
                  href="https://www.devops-ctf.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-cyan hover:underline underline-offset-2"
                >
                  devops-ctf.com
                </a>
                {' '}— a Capture-The-Flag platform built for DevOps engineers,
                where each challenge drops you into a per-user sandbox to debug
                a realistic production incident. It&apos;s the closest thing
                I&apos;ve shipped to a full product.
              </p>
            </div>

            {/* What I do */}
            <div className="grid md:grid-cols-3 gap-3">
              <DoPanel
                icon={<Boxes className="h-4 w-4" />}
                accent="emerald"
                title="DevOps"
                lines={['Kubernetes · Helm', 'ArgoCD · Argo Workflows', 'Terraform · Atlantis']}
              />
              <DoPanel
                icon={<ShieldCheck className="h-4 w-4" />}
                accent="cyan"
                title="Security"
                lines={['Pentesting · Bug Bounty', 'Trivy · Snyk · Kyverno', 'Burp · OWASP ZAP']}
              />
              <DoPanel
                icon={<Cpu className="h-4 w-4" />}
                accent="violet"
                title="Automation"
                lines={['Python · Go · Bash', 'FastAPI · Selenium', 'LLM agents · MCP']}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  const [imgError, setImgError] = useState(false);
  const src = imgError ? profile.avatar : '/gokul.jpg';

  return (
    <div className="relative">
      <div className="relative aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden rounded-2xl">
        <div
          className="absolute -inset-[1.5px] rounded-2xl opacity-80"
          style={{
            background:
              'conic-gradient(from 140deg at 50% 50%, #10b981, #22d3ee, #8b5cf6, #10b981)',
          }}
        />
        <div className="absolute inset-0 rounded-2xl bg-ink-950" />
        <div className="absolute inset-[1.5px] rounded-[14px] overflow-hidden bg-ink-900">
          <img
            src={src}
            alt={profile.name}
            className="absolute inset-0 h-full w-full object-cover object-center"
            /* Pure B&W — one tonal scale as requested */
            style={{ filter: 'grayscale(100%) contrast(1.05) brightness(0.95)' }}
            onError={() => setImgError(true)}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, transparent 55%, rgba(5,7,12,0.7) 100%)',
            }}
          />
          <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between">
            <div className="font-mono text-[10px] leading-tight text-white/85">
              <div className="text-accent-emerald">ID_0x57899332</div>
              <div>{profile.name.toUpperCase()}</div>
              <div className="text-white/55">{profile.title}</div>
            </div>
            <div className="text-right font-mono text-[10px] text-white/60">
              <div>{profile.location}</div>
            </div>
          </div>
        </div>
      </div>

      {imgError && (
        <p className="mt-3 text-center text-[11px] font-mono text-white/40">
          drop your portrait at <span className="text-accent-cyan">public/gokul.jpg</span>
        </p>
      )}
    </div>
  );
}

function DoPanel({
  icon,
  title,
  lines,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  accent: 'emerald' | 'cyan' | 'violet';
}) {
  const map: Record<string, string> = {
    emerald: 'text-accent-emerald border-accent-emerald/25',
    cyan: 'text-accent-cyan border-accent-cyan/25',
    violet: 'text-accent-violet border-accent-violet/25',
  };
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.015] p-4 hover:bg-white/[0.03] transition">
      <div className={`flex items-center gap-2 ${map[accent].split(' ')[0]}`}>
        <span className={`grid place-items-center h-7 w-7 rounded-md border ${map[accent]} bg-black/30`}>
          {icon}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider">{title}</span>
      </div>
      <ul className="mt-3 space-y-1 text-[13px] text-white/70">
        {lines.map((l) => (
          <li key={l} className="flex gap-2">
            <span className="text-white/30">·</span>
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
