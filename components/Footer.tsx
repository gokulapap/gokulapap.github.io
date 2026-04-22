'use client';

import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { profile } from '@/lib/data';

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 mt-10">
      <div className="mx-auto max-w-6xl px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-white/45">
          Designed & built in Bangalore by {profile.name}.
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid place-items-center h-9 w-9 rounded-lg border border-white/10 text-white/65 hover:text-accent-emerald hover:border-accent-emerald/40 transition"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid place-items-center h-9 w-9 rounded-lg border border-white/10 text-white/65 hover:text-accent-cyan hover:border-accent-cyan/40 transition"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={profile.socials.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="grid place-items-center h-9 w-9 rounded-lg border border-white/10 text-white/65 hover:text-accent-violet hover:border-accent-violet/40 transition"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href={profile.socials.email}
            aria-label="Email"
            className="grid place-items-center h-9 w-9 rounded-lg border border-white/10 text-white/65 hover:text-accent-amber hover:border-accent-amber/40 transition"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/60 hover:text-accent-emerald hover:border-accent-emerald/40 transition"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Top
          </a>
        </div>
      </div>
    </footer>
  );
}
