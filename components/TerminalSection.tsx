'use client';

import { motion } from 'framer-motion';
import { Terminal } from './Terminal';
import { SectionHeading } from './SectionHeading';

export function TerminalSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <SectionHeading
            kicker="hands-on"
            title={
              <>
                Or, try the <span className="gradient-text">terminal</span>.
              </>
            }
            subtitle="Every DevOps engineer lives in a prompt. Type `help` to start."
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-white/40 flex flex-wrap gap-2"
          >
            <span className="kbd">help</span>
            <span className="kbd">whoami</span>
            <span className="kbd">skills</span>
            <span className="kbd">projects</span>
            <span className="kbd">sudo hire-me</span>
          </motion.div>
        </div>
        <Terminal />
      </div>
    </section>
  );
}
