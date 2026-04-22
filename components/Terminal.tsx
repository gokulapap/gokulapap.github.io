'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile, skills, projects, achievements } from '@/lib/data';

type Line = { type: 'in' | 'out'; content: React.ReactNode };

const WELCOME = (
  <div className="text-white/70">
    <div>
      <span className="text-accent-emerald">$</span> Welcome. This shell is interactive.
    </div>
    <div className="text-white/55 mt-1">
      Type <span className="text-accent-emerald">help</span> for commands, or try{' '}
      <span className="text-accent-emerald">whoami</span>,{' '}
      <span className="text-accent-emerald">projects</span>,{' '}
      <span className="text-accent-emerald">sudo hire-me</span>.
    </div>
  </div>
);

const commands: Record<string, () => React.ReactNode> = {
  help: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
      {[
        ['help', 'list commands'],
        ['whoami', 'about me'],
        ['skills', 'the stack'],
        ['projects', 'list featured projects'],
        ['wins', 'achievements'],
        ['contact', 'how to reach me'],
        ['neofetch', 'system info card'],
        ['sudo hire-me', 'open contact section'],
        ['clear', 'clear the screen'],
        ['exit', 'close terminal'],
      ].map(([c, d]) => (
        <div key={c} className="flex gap-3">
          <span className="text-accent-emerald min-w-[110px]">{c}</span>
          <span className="text-white/55">{d}</span>
        </div>
      ))}
    </div>
  ),
  whoami: () => (
    <div className="space-y-1">
      <div>
        <span className="text-accent-cyan">{profile.name}</span>
        <span className="text-white/50"> — {profile.title}</span>
      </div>
      <div className="text-white/70 max-w-2xl whitespace-pre-line">{profile.summary}</div>
    </div>
  ),
  skills: () => (
    <div className="space-y-1">
      {skills.map((s) => (
        <div key={s.id}>
          <span className="text-accent-emerald">▸ {s.label}</span>
          <span className="text-white/55">
            {' '}— {s.items.slice(0, 6).join(' · ')}
            {s.items.length > 6 ? ' · …' : ''}
          </span>
        </div>
      ))}
    </div>
  ),
  projects: () => (
    <div className="space-y-1">
      {projects.slice(0, 6).map((p) => (
        <div key={p.name} className="flex gap-2 items-baseline">
          <span className="text-accent-cyan min-w-[180px]">{p.name}</span>
          <span className="text-white/60 truncate">{p.description}</span>
        </div>
      ))}
    </div>
  ),
  wins: () => (
    <div className="space-y-1">
      {achievements.map((a) => (
        <div key={a.title}>
          <span className="text-accent-amber">★ {a.title}</span>
          <span className="text-white/55"> — {a.detail}</span>
        </div>
      ))}
    </div>
  ),
  achievements: () => commands.wins(),
  contact: () => (
    <div className="space-y-1">
      <div>
        <span className="text-accent-emerald">email   </span>
        <a className="text-accent-cyan underline underline-offset-2" href={profile.socials.email}>{profile.email}</a>
      </div>
      <div>
        <span className="text-accent-emerald">github  </span>
        <a className="text-accent-cyan underline underline-offset-2" href={profile.socials.github} target="_blank" rel="noreferrer">{profile.socials.github}</a>
      </div>
      <div>
        <span className="text-accent-emerald">linkedin</span>{' '}
        <a className="text-accent-cyan underline underline-offset-2" href={profile.socials.linkedin} target="_blank" rel="noreferrer">{profile.socials.linkedin}</a>
      </div>
    </div>
  ),
  socials: () => commands.contact(),
  neofetch: () => (
    <div className="grid md:grid-cols-[auto_1fr] gap-4">
      <pre className="text-accent-emerald text-[10px] leading-[1.1]">{`
    .--.
   |o_o |
   |:_/ |
  //   \\ \\
 (|     | )
/'\\_   _/\`\\
\\___)=(___/
`}</pre>
      <div className="font-mono text-[12px] space-y-0.5">
        <Row k="OS" v="Arch + macOS" />
        <Row k="Shell" v="zsh · bash" />
        <Row k="IDE" v="VS Code · Neovim" />
        <Row k="Cloud" v="AWS · GCP · Azure" />
        <Row k="Orchestr." v="Kubernetes · Argo" />
        <Row k="IaC" v="Terraform · Helm" />
        <Row k="Security" v="Burp · ZAP · Trivy" />
        <Row k="Langs" v="Python · Go · Bash · TS" />
        <Row k="Location" v={profile.location} />
      </div>
    </div>
  ),
  'sudo hire-me': () => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
    return <div className="text-accent-emerald">[sudo] ✓ authenticated. Scrolling to /contact ...</div>;
  },
  exit: () => <span className="text-white/40">Session ended. (refresh to reopen)</span>,
};

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <span className="text-accent-cyan">{k.padEnd(12)}</span>
      <span className="text-white/70">{v}</span>
    </div>
  );
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ type: 'out', content: WELCOME }]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [closed, setClosed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: 'smooth' });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    setLines((p) => [
      ...p,
      { type: 'in', content: <div><Prompt /><span className="text-white">{cmd}</span></div> },
    ]);

    if (cmd === 'clear') { setLines([]); return; }
    if (cmd === 'exit') {
      setLines((p) => [...p, { type: 'out', content: commands.exit!() }]);
      setClosed(true);
      return;
    }
    const handler = commands[cmd.toLowerCase()];
    if (!handler) {
      setLines((p) => [
        ...p,
        {
          type: 'out',
          content: (
            <span className="text-white/60">
              command not found: <span className="text-accent-rose">{cmd}</span> — try{' '}
              <span className="border border-accent-cyan/40 text-accent-cyan px-1.5 py-0.5 text-[11px]">help</span>
            </span>
          ),
        },
      ]);
      return;
    }
    setLines((p) => [...p, { type: 'out', content: handler() }]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const v = input;
      setInput('');
      run(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const next = histIdx + 1;
      if (next >= history.length) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(next); setInput(history[next]); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.toLowerCase();
      if (!partial) return;
      const match = Object.keys(commands).find((c) => c.startsWith(partial));
      if (match) setInput(match);
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="surface relative overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-rose/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-emerald/70" />
          </span>
          <span className="font-mono text-xs text-white/55">~/gokul — zsh — 120×30</span>
        </div>
        <div className="font-mono text-[10px] text-white/35">
          ↑/↓ history · Tab complete · Ctrl+L clear
        </div>
      </div>

      <div ref={scrollRef} className="h-[380px] md:h-[420px] overflow-y-auto p-4 md:p-5 font-mono text-[13px] leading-[1.6]">
        {lines.map((l, i) => (
          <div key={i} className="mb-2">{l.content}</div>
        ))}
        {!closed && (
          <div className="flex items-center">
            <Prompt />
            <input
              ref={inputRef}
              spellCheck={false}
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              className="flex-1 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none text-white caret-accent-emerald"
              style={{ boxShadow: 'none' }}
              aria-label="Terminal input"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Prompt() {
  return (
    <span className="text-white/80 mr-1.5">
      <span className="text-accent-emerald">gokul</span>
      <span className="text-white/30">@</span>
      <span className="text-accent-cyan">devsecops</span>
      <span className="text-white/30">:</span>
      <span className="text-accent-violet">~</span>
      <span className="text-white/60">$</span>{' '}
    </span>
  );
}
