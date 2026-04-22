'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  GitFork,
  ExternalLink,
  Github,
  Sparkles,
  Globe,
  Radio,
} from 'lucide-react';
import clsx from 'clsx';
import { projects, type Project } from '@/lib/data';
import { SectionHeading } from './SectionHeading';

type LiveStat = {
  repo: string;
  stars: number;
  forks: number;
  language: string | null;
};

const filters: ('All' | Project['tags'][number])[] = [
  'All', 'DevOps', 'Security', 'Platform', 'Automation', 'AI', 'CLI',
];

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [live, setLive] = useState<Record<string, LiveStat>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hit GitHub's public API directly so the site works on any static host
    // (Vercel, GitHub Pages, Cloudflare Pages) — no backend needed.
    // Rate limit is 60 req/hr per IP which is plenty for a portfolio.
    const repos = projects
      .map((p) => p.repo)
      .filter((r): r is string => Boolean(r));
    if (!repos.length) {
      setLoading(false);
      return;
    }
    Promise.all(
      repos.map((repo) =>
        fetch(`https://api.github.com/repos/${repo}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((d) =>
            d
              ? ({
                  repo,
                  stars: d.stargazers_count ?? 0,
                  forks: d.forks_count ?? 0,
                  language: d.language ?? null,
                } as LiveStat)
              : null
          )
          .catch(() => null)
      )
    )
      .then((results) => {
        const m: Record<string, LiveStat> = {};
        for (const r of results) if (r) m[r.repo] = r;
        setLive(m);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => projects.filter((p) => filter === 'All' ? true : (p.tags as string[]).includes(filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          kicker="04 / projects"
          title={
            <>
              Things I&apos;ve shipped that <span className="gradient-text">other people use</span>.
            </>
          }
          subtitle="Open-source tooling, a live platform, and security research — with live GitHub metrics."
        />

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                'rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition',
                filter === f
                  ? 'text-ink-950 bg-gradient-to-r from-accent-emerald to-accent-cyan'
                  : 'text-white/60 border border-white/10 bg-white/[0.02] hover:text-white hover:border-white/20'
              )}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] text-white/40">
            {loading ? 'fetching live stars…' : `${filtered.length} projects`}
          </span>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className={p.flagship ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <ProjectCard project={p} live={p.repo ? live[p.repo] : undefined} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/gokulapap?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <Github className="h-4 w-4" />
            All 60+ repos on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, live }: { project: Project; live?: LiveStat }) {
  const stars = live?.stars ?? 0;
  const forks = live?.forks ?? 0;
  const lang = live?.language ?? null;
  const isHosted = !project.repo && (project.website || project.live);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={clsx(
        'group relative flex h-full flex-col overflow-hidden rounded-xl border bg-white/[0.015] p-5 transition',
        project.flagship ? 'border-accent-emerald/25 hover:border-accent-emerald/50' : 'border-white/5 hover:border-accent-cyan/30',
        'hover:bg-white/[0.03]'
      )}
    >
      {project.flagship && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full blur-3xl opacity-50"
          style={{ background: 'radial-gradient(closest-side, rgba(16,185,129,0.5), transparent)' }}
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex flex-wrap items-center gap-1.5">
          {project.live && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/40 text-accent-emerald px-2 py-0.5 font-mono text-[10px]">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-70 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-emerald" />
              </span>
              LIVE
            </span>
          )}
          {project.highlight && !project.live && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-amber/10 border border-accent-amber/30 text-accent-amber px-2 py-0.5 font-mono text-[10px]">
              <Sparkles className="h-3 w-3" /> FEATURED
            </span>
          )}
          {project.flagship && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-violet px-2 py-0.5 font-mono text-[10px]">
              FLAGSHIP
            </span>
          )}
        </div>
        <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-accent-cyan transition-colors shrink-0" />
      </div>

      <h3 className={clsx(
        'relative mt-3 font-display font-semibold text-white group-hover:text-accent-cyan transition-colors',
        project.flagship ? 'text-2xl' : 'text-lg'
      )}>
        {project.name}
      </h3>

      <p className={clsx(
        'relative mt-2 text-white/65 leading-relaxed',
        project.flagship ? 'text-[15px]' : 'text-sm'
      )}>
        {project.description}
      </p>

      {project.impact && (
        <p className="relative mt-3 text-xs italic text-accent-emerald/85">
          → {project.impact}
        </p>
      )}

      {project.stackHint && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {project.stackHint.map((s) => (
            <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded border border-white/10 bg-black/25 text-white/65">
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span key={t} className={clsx('font-mono text-[10px] px-2 py-0.5 rounded-full border', tagClass(t))}>
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-auto pt-5 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-white/55">
        {isHosted ? (
          <span className="inline-flex items-center gap-2 text-accent-emerald">
            <Radio className="h-3 w-3" />
            <span className="truncate max-w-[200px]">{project.website?.replace(/^https?:\/\//, '')}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 text-accent-amber" />
              {stars}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork className="h-3 w-3 text-accent-violet" />
              {forks}
            </span>
          </span>
        )}
        {lang ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: langColor(lang) }} />
            {lang}
          </span>
        ) : isHosted ? (
          <span className="inline-flex items-center gap-1.5">
            <Globe className="h-3 w-3" />
            live
          </span>
        ) : null}
      </div>
    </a>
  );
}

function tagClass(tag: string) {
  switch (tag) {
    case 'DevOps':
    case 'Platform':
      return 'bg-accent-emerald/10 border-accent-emerald/25 text-accent-emerald';
    case 'Security':
      return 'bg-accent-cyan/10 border-accent-cyan/25 text-accent-cyan';
    case 'Automation':
      return 'bg-accent-violet/10 border-accent-violet/25 text-accent-violet';
    case 'Cloud':
      return 'bg-accent-amber/10 border-accent-amber/25 text-accent-amber';
    case 'AI':
      return 'bg-accent-rose/10 border-accent-rose/25 text-accent-rose';
    case 'CLI':
      return 'bg-white/5 border-white/15 text-white/75';
    default:
      return 'bg-white/5 border-white/10 text-white/60';
  }
}

function langColor(lang: string) {
  const m: Record<string, string> = {
    Python: '#3572A5', Go: '#00ADD8', TypeScript: '#3178c6', JavaScript: '#f1e05a',
    Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c', Rust: '#dea584',
  };
  return m[lang] ?? '#8a95ad';
}
