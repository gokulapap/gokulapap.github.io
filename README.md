# Gokul A P — Portfolio

A premium DevSecOps-themed portfolio for **[@gokulapap](https://github.com/gokulapap)** — built with Next.js 14, Tailwind CSS, and Framer Motion. Dark-mode-first, dashboard-inspired, with a real interactive terminal.

## Stack

- **Next.js 14** (App Router, RSC, ISR for GitHub API)
- **TypeScript** — strict mode
- **Tailwind CSS** — custom design tokens, no template
- **Framer Motion** — micro-interactions, scroll animations
- **Lucide Icons**
- **GitHub REST API** — live star counts for every project

## Features

- Hero with ambient matrix rain + live DevSecOps dashboard tile (KPIs, sparklines, log tail)
- Interactive terminal (`whoami`, `skills`, `projects`, `sudo hire-me`, tab-complete, history)
- B&W duotone portrait with scanlines and emerald overlay
- CI/CD pipeline visualization (commit → build → scan → sign → deploy → observe)
- Project grid with **live** GitHub stars/forks via `/api/github`
- Timeline-style experience
- Animated counters, achievement cards
- Scroll-spy navbar, mobile sheet menu, system-status indicator
- Cursor glow, grid background, scanline overlays
- SEO meta, OpenGraph, dark color scheme
- Fully responsive

## Setup

```bash
# 1. install
npm install
# or: pnpm install / yarn

# 2. drop your portrait photo into public/
#    (expected at /public/gokul.jpg — any aspect ratio; 4:5 looks best)

# 3. run dev
npm run dev          # → http://localhost:3000

# 4. build for production
npm run build && npm run start
```

### Where to put your photo

The About section expects **`public/gokul.jpg`**. Drop your portrait there and it will be auto-duotoned (B&W → emerald/cyan gradient). If the file is missing, it gracefully falls back to your GitHub avatar.

## Folder structure

```
portfolio/
├── app/
│   ├── api/github/route.ts     # live GitHub stars / user stats (ISR, 30 min)
│   ├── globals.css             # design tokens, surface, glitch, scanlines
│   ├── layout.tsx              # fonts + metadata + SEO
│   └── page.tsx                # section composition
├── components/
│   ├── About.tsx               # portrait + narrative + /now panel
│   ├── Achievements.tsx        # counters + recognition cards
│   ├── Contact.tsx             # channels + mailto form
│   ├── CursorGlow.tsx          # soft radial cursor
│   ├── Experience.tsx          # vertical timeline
│   ├── Footer.tsx
│   ├── GridBackground.tsx      # grid + gradient orbs
│   ├── Hero.tsx                # name + live dashboard tile
│   ├── MatrixRain.tsx          # ambient canvas
│   ├── Navbar.tsx              # scroll-spy, mobile sheet, status
│   ├── Pipeline.tsx            # animated CI/CD stages
│   ├── Projects.tsx            # filterable grid + live stars
│   ├── SectionHeading.tsx
│   ├── Skills.tsx              # categorized stack + marquee
│   ├── Terminal.tsx            # interactive REPL
│   └── TerminalSection.tsx
├── lib/
│   └── data.ts                 # single source of truth — edit me
├── public/
│   ├── favicon.svg
│   └── gokul.jpg               # ← your photo goes here
├── next.config.mjs
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Customizing

- **All copy, projects, experience, skills** → `lib/data.ts`. Everything else reads from there.
- **Colors / effects** → `tailwind.config.ts` + `app/globals.css`.
- **Add a project** → push a new entry into the `projects` array; live stars work automatically.

## Deployment

Deploys to Vercel with zero config. Push this folder to a GitHub repo, import it on Vercel, and you're live.

```bash
vercel
```

## License

MIT — use, remix, and ship your own.
