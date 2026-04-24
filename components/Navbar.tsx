'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import clsx from 'clsx';
import { profile } from '@/lib/data';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#achievements', label: 'Wins' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive('#' + visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-all',
          scrolled ? 'backdrop-blur-xl bg-ink-950/70 border-b border-white/5' : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8 py-4 md:py-5">
          <a href="#top" className="group flex items-center gap-3">
            {/* Infinity logomark — same mark as the favicon, for brand consistency */}
            <span className="relative grid place-items-center h-10 w-10 rounded-xl overflow-hidden bg-ink-900 border border-white/10 transition-all duration-300 group-hover:border-accent-emerald/50 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] group-hover:scale-[1.05]">
              <svg viewBox="0 0 32 32" className="w-[26px] h-[26px]" aria-hidden>
                <defs>
                  <linearGradient id="nav-mark" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 16 16 C 14 11.5 7 11.5 7 16 C 7 20.5 14 20.5 16 16 C 18 11.5 25 11.5 25 16 C 25 20.5 18 20.5 16 16 Z"
                  fill="none"
                  stroke="url(#nav-mark)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-[15px] font-semibold tracking-tight text-white">
                Gokul A P
              </span>
              <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 group-hover:text-accent-emerald transition-colors">
                DevOps Engineer
              </span>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-1 surface px-2 py-1.5 !rounded-full">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={clsx(
                      'relative px-3 py-1.5 text-[13px] rounded-full transition-colors',
                      isActive ? 'text-accent-cyan' : 'text-white/70 hover:text-white'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-accent-cyan/10 border border-accent-cyan/30"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              <IconLink href={profile.socials.github} label="GitHub">
                <Github className="h-4 w-4" />
              </IconLink>
              <IconLink href={profile.socials.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </IconLink>
              <IconLink href={profile.socials.email} label="Email">
                <Mail className="h-4 w-4" />
              </IconLink>
            </div>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex btn-ghost !py-2 !px-4 text-xs"
            >
              Resume
            </a>
            <a href="#contact" className="hidden sm:inline-flex btn-primary !py-2 !px-4 text-xs">
              Contact
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden grid place-items-center h-9 w-9 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-accent-cyan/40"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink-950/85 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col surface p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold">Gokul A P</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid place-items-center h-9 w-9 rounded-lg border border-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="mt-8 space-y-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base hover:bg-white/5"
                    >
                      <span>{l.label}</span>
                      <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-2">
                <IconLink href={profile.socials.github} label="GitHub">
                  <Github className="h-4 w-4" />
                </IconLink>
                <IconLink href={profile.socials.linkedin} label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </IconLink>
                <IconLink href={profile.socials.email} label="Email">
                  <Mail className="h-4 w-4" />
                </IconLink>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="ml-auto btn-primary !py-2 !px-4 text-xs"
                >
                  Contact
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid place-items-center h-9 w-9 rounded-lg border border-white/10 text-white/70 hover:text-accent-cyan hover:border-accent-cyan/40 transition-colors"
    >
      {children}
    </a>
  );
}
