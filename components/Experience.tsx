'use client';

import { motion } from 'framer-motion';
import { Linkedin, ArrowUpRight, MapPin, Calendar, Briefcase } from 'lucide-react';
import { experience, profile } from '@/lib/data';
import { SectionHeading } from './SectionHeading';

const accent = {
  emerald: { bar: '#10b981', ring: 'ring-accent-emerald/40', text: 'text-accent-emerald' },
  cyan: { bar: '#22d3ee', ring: 'ring-accent-cyan/40', text: 'text-accent-cyan' },
  violet: { bar: '#8b5cf6', ring: 'ring-accent-violet/40', text: 'text-accent-violet' },
  amber: { bar: '#f59e0b', ring: 'ring-accent-amber/40', text: 'text-accent-amber' },
} as const;

export function Experience() {
  if (!experience.length) {
    return (
      <section id="experience" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            kicker="05 / experience"
            title={
              <>
                Full résumé lives on <span className="gradient-text">LinkedIn</span>.
              </>
            }
            subtitle="Rather than duplicate a résumé here, I keep the canonical record of roles, dates, and recommendations in one place."
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mt-14 surface p-8 md:p-10 max-w-3xl flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="grid place-items-center h-14 w-14 rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan shrink-0">
              <Linkedin className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl md:text-2xl text-white">
                linkedin.com/in/gokulap
              </h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                I keep my LinkedIn current — happy to share more depth over a
                conversation.
              </p>
            </div>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="btn-primary shrink-0">
              Open LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          kicker="05 / experience"
          title={
            <>
              Where I&apos;ve <span className="gradient-text">shipped</span>.
            </>
          }
          subtitle="Roles across DevOps and Site Reliability Engineering."
        />

        <div className="relative mt-16 max-w-4xl">
          <div
            className="absolute left-[22px] md:left-[26px] top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(180deg, rgba(16,185,129,0.5), rgba(34,211,238,0.35) 50%, rgba(139,92,246,0.3))',
            }}
          />

          <ol className="space-y-10">
            {experience.map((e, i) => {
              const a = accent[e.accent];
              return (
                <motion.li
                  key={`${e.company}-${i}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-14 md:pl-20"
                >
                  <span
                    className={`absolute left-[12px] md:left-[16px] top-1.5 grid place-items-center h-[22px] w-[22px] rounded-full bg-ink-950 ring-4 ${a.ring}`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: a.bar, boxShadow: `0 0 10px ${a.bar}` }}
                    />
                  </span>

                  <article className="surface p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl text-white font-semibold">
                          {e.role}
                        </h3>
                        <div className={`mt-1 flex flex-wrap items-center gap-3 text-[13px] ${a.text}`}>
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" />
                            {e.company}
                          </span>
                          <span className="text-white/30">·</span>
                          <span className="inline-flex items-center gap-1.5 text-white/55">
                            <MapPin className="h-3.5 w-3.5" />
                            {e.location}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-white/60">
                        <Calendar className="h-3 w-3" />
                        {e.period}
                      </span>
                    </div>

                    <ul className="mt-4 space-y-2 text-[14px] text-white/70 leading-relaxed">
                      {e.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3">
                          <span
                            className="mt-[9px] h-1 w-1 rounded-full shrink-0"
                            style={{ background: a.bar }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {e.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] px-2 py-0.5 rounded border border-white/10 bg-black/25 text-white/65"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
