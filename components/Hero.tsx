'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  FileText,
  Mail,
  MapPin,
  Shield,
  Award,
} from 'lucide-react';
import { profile } from '@/lib/data';

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-52 md:pb-28"
    >
      {/* Ambient gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 0%, rgba(16,185,129,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 75% 10%, rgba(34,211,238,0.16), transparent 55%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-white/60"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
          <span>Bangalore, India · DevOps Engineer</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 sm:mt-6 font-display text-[1.85rem] sm:text-[2.5rem] md:text-6xl lg:text-7xl xl:text-[80px] font-bold tracking-tight leading-[1.1] sm:leading-[1.05] md:leading-[1.02]"
        >
          Hi, I&apos;m <span className="gradient-text">Gokul A P</span>.
          <br />
          <span className="text-white/90">
            I build platforms that <span className="text-white">ship safely</span>.
          </span>
        </motion.h1>

        {/* Supporting paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 sm:mt-7 max-w-2xl text-[15px] sm:text-lg md:text-xl text-white/65 leading-relaxed"
        >
          Software Engineer, DevOps at Moveworks — working on Kubernetes
          deployment automation and resource rightsizing. On the side, I hunt
          bugs, maintain open-source security tooling, and built{' '}
          <a
            href="https://www.devops-ctf.com"
            target="_blank"
            rel="noreferrer"
            className="text-white underline underline-offset-4 decoration-accent-emerald/50 hover:decoration-accent-emerald"
          >
            devops-ctf.com
          </a>
          .
        </motion.p>

        {/* Key numbers inline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 text-[13px] sm:text-sm"
        >
          <span className="inline-flex items-center gap-2 text-white/80">
            <Award className="h-4 w-4 text-accent-cyan" />
            <span className="font-medium text-white">Google</span>
            <span className="text-white/55">Hall of Fame</span>
          </span>
          <span className="inline-flex items-center gap-2 text-white/80">
            <Shield className="h-4 w-4 text-accent-emerald" />
            <span className="font-medium text-white">100+</span>
            <span className="text-white/55">vulnerabilities disclosed</span>
          </span>
          <span className="inline-flex items-center gap-2 text-white/80">
            <span className="font-display font-bold text-accent-violet">60+</span>
            <span className="text-white/55">OSS projects</span>
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3"
        >
          <a href="#projects" className="btn-primary">
            View my work
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <FileText className="h-4 w-4" />
            Download Resume
          </a>
          <a href="#contact" className="btn-ghost">
            <Mail className="h-4 w-4" />
            Get in touch
          </a>
        </motion.div>

      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-6 items-center gap-2 text-white/40 text-xs font-mono hover:text-accent-cyan transition"
      >
        <span>scroll</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
}
