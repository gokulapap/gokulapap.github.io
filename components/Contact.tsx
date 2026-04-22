'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  Copy,
  Check,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react';
import { profile } from '@/lib/data';
import { SectionHeading } from './SectionHeading';

// Form submissions are handled by Formsubmit (https://formsubmit.co) —
// free, no signup, no backend. On first submission from the site, they
// send a confirmation email to the recipient; click the link once and
// the endpoint is active forever.
//
// To swap providers: point FORM_ENDPOINT at Web3Forms / Formspree / etc.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = profile.email;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          kicker="07 / contact"
          title={
            <>
              Let&apos;s build something <span className="gradient-text">together</span>.
            </>
          }
          subtitle="Consulting, full-time roles, open-source collaboration, or security research — the inbox is open."
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-3"
          >
            <div className="surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                    primary
                  </span>
                  <div className="mt-2 font-display text-lg font-semibold">Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="mt-1 inline-block text-accent-cyan hover:text-accent-emerald transition break-all"
                  >
                    {email}
                  </a>
                </div>
                <button
                  onClick={copy}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs hover:border-accent-cyan/40 hover:text-accent-cyan transition"
                >
                  {copied ? (
                    <><Check className="h-3.5 w-3.5 text-accent-emerald" />copied</>
                  ) : (
                    <><Copy className="h-3.5 w-3.5" />copy</>
                  )}
                </button>
              </div>
            </div>

            <ChannelRow icon={<Github className="h-4 w-4" />} label="GitHub" value="@gokulapap" href={profile.socials.github} accent="emerald" />
            <ChannelRow icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="in/gokulap" href={profile.socials.linkedin} accent="cyan" />
            <ChannelRow icon={<Twitter className="h-4 w-4" />} label="Twitter / X" value="@CodingGokul" href={profile.socials.twitter} accent="violet" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 surface p-6 md:p-8"
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
              send a message
            </span>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ChannelRow({
  icon, label, value, href, accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  accent: 'emerald' | 'cyan' | 'violet';
}) {
  const c = accent === 'emerald'
    ? 'border-accent-emerald/25 text-accent-emerald'
    : accent === 'cyan'
    ? 'border-accent-cyan/25 text-accent-cyan'
    : 'border-accent-violet/25 text-accent-violet';

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.015] p-4 hover:border-white/15 hover:bg-white/[0.03] transition"
    >
      <div className="flex items-center gap-3">
        <span className={`grid place-items-center h-9 w-9 rounded-lg border ${c} bg-black/25`}>
          {icon}
        </span>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/45">{label}</div>
          <div className="font-display text-sm font-semibold text-white">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-accent-cyan transition" />
    </a>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email: senderEmail,
          message: msg,
          _subject: `Portfolio message from ${name || 'someone'}`,
          _captcha: 'false',
          _template: 'table',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === 'true' || data.success === true)) {
        setStatus('sent');
        setName('');
        setSenderEmail('');
        setMsg('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="mt-6 rounded-lg border border-accent-emerald/30 bg-accent-emerald/5 p-5 flex items-start gap-3">
        <Check className="h-5 w-5 text-accent-emerald shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-medium">Message sent.</p>
          <p className="mt-1 text-sm text-white/60">
            Thanks for reaching out. I&apos;ll get back to you at the address
            you provided.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-3 text-xs font-mono text-accent-emerald hover:underline underline-offset-4"
          >
            send another →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="name" required>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full bg-transparent border-0 outline-none focus:outline-none text-sm placeholder-white/30"
          />
        </Field>
        <Field label="email" required>
          <input
            required
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full bg-transparent border-0 outline-none focus:outline-none text-sm placeholder-white/30"
          />
        </Field>
      </div>
      <Field label="message" required>
        <textarea
          required
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows={5}
          placeholder="What would you like to talk about?"
          className="w-full bg-transparent border-0 outline-none focus:outline-none text-sm placeholder-white/30 resize-none"
        />
      </Field>

      {status === 'error' && (
        <div className="rounded-md border border-accent-rose/40 bg-accent-rose/5 p-3 text-xs text-accent-rose flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            Couldn&apos;t send right now. Email me directly at{' '}
            <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
              {profile.email}
            </a>
            .
          </span>
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}

function Field({ label, children, required }: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="group block rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 transition-colors focus-within:border-accent-cyan/60 focus-within:bg-white/[0.035] hover:border-white/20">
      <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 group-focus-within:text-accent-cyan transition-colors">
        {label}
        {required && <span className="text-accent-rose/70 ml-1">*</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
