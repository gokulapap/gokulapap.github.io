// Single source of truth for the portfolio.
// IMPORTANT: Only verified, user-confirmed content lives here.
// The `experience` array is intentionally empty — drop in your LinkedIn
// roles and bullets as you're comfortable. Everything else is sourced from
// github.com/gokulapap README or explicitly provided by the user.

export const profile = {
  name: 'Gokul A P',
  handle: 'gokulapap',
  // Real title at Moveworks. "DevOps Engineer" is used as the casual
  // branding label in the Hero / About copy; "Software Engineer, DevOps"
  // is the formal title shown in Experience entries.
  title: 'Software Engineer, DevOps',
  tagline: 'Pythonist · Web Pentester · Automation Geek · DevOps Engineer',
  location: 'Bangalore, India',
  email: 'apgokul008@gmail.com',
  resumeUrl:
    'https://drive.google.com/file/d/1DMduvlCWw_Y9Td9yEoSWNpeWp69JRS0V/view?usp=sharing',
  // Falls back to GitHub avatar when /public/gokul.jpg is missing.
  avatar: 'https://avatars.githubusercontent.com/u/57899332?v=4',
  // Roles — verified from the typing SVG on profile README.
  roles: [
    'Python Developer',
    'Web Pentester',
    'CTF Player',
    'Automation Developer',
    'DevOps Engineer',
    'Bug Bounty Hunter',
    'Cloud Security Researcher',
  ],
  // Summary — derived directly from profile README content.
  summary:
    'Gokul A P is a DevOps Engineer at Moveworks specialising in Kubernetes, ArgoCD, and infrastructure automation. Google Hall of Fame recipient with 100+ responsibly-disclosed security vulnerabilities and 60+ open-source projects spanning DevOps and security tooling.',
  socials: {
    github: 'https://github.com/gokulapap',
    linkedin: 'https://www.linkedin.com/in/gokulap',
    twitter: 'https://twitter.com/CodingGokul',
    blog: 'https://gokulapap.github.io',
    telegram: 'https://t.me/gokul_ap',
    instagram: 'https://www.instagram.com/gokulapap',
    email: 'mailto:apgokul008@gmail.com',
  },
};

// Intentionally empty — the achievement cards below carry these numbers in
// human-readable context rather than as a wall of disembodied counters.
export const stats: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  accent: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose';
}[] = [];

export type SkillCategory = {
  id: string;
  label: string;
  accent: 'emerald' | 'cyan' | 'violet' | 'amber';
  icon: string;
  items: string[];
};

// Each item verified against the profile README tech stack section.
export const skills: SkillCategory[] = [
  {
    id: 'code',
    label: 'Languages & Frameworks',
    accent: 'emerald',
    icon: 'Code2',
    items: [
      'Python',
      'Go',
      'Bash',
      'TypeScript',
      'Flask',
      'Django',
      'FastAPI',
      'Selenium',
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Orchestration',
    accent: 'emerald',
    icon: 'Boxes',
    items: [
      'Kubernetes',
      'Helm',
      'Kustomize',
      'Docker',
      'Podman',
      'Terraform',
      'Atlantis',
      'ArgoCD',
      'Argo Workflows',
      'Istio',
      'Keda',
      'Bazel',
    ],
  },
  {
    id: 'ci',
    label: 'CI / CD',
    accent: 'violet',
    icon: 'GitBranch',
    items: ['GitHub Actions', 'Jenkins', 'CircleCI', 'Travis CI', 'ArgoCD', 'Argo Workflows'],
  },
  {
    id: 'security',
    label: 'Security Tooling',
    accent: 'cyan',
    icon: 'ShieldCheck',
    items: [
      'Burp Suite',
      'OWASP ZAP',
      'Metasploit',
      'Trivy',
      'Snyk',
      'PingSafe',
      'HackTheBox',
      'TryHackMe',
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    accent: 'amber',
    icon: 'Cloud',
    items: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean', 'Firebase', 'Heroku', 'Vercel', 'Netlify'],
  },
  {
    id: 'obs',
    label: 'Observability & Platform',
    accent: 'violet',
    icon: 'Activity',
    items: [
      'Prometheus',
      'Grafana',
      'VictoriaMetrics',
      'OpenSearch',
      'Kafka',
      'HashiCorp Vault',
      'Teleport',
      'Kyverno',
      'OPA',
      'Cloud Custodian',
      'Kubecost',
      'PagerDuty',
    ],
  },
  {
    id: 'data',
    label: 'Databases',
    accent: 'emerald',
    icon: 'Database',
    items: ['PostgreSQL', 'MySQL', 'OracleSQL', 'SQLite', 'Redis', 'MongoDB'],
  },
];

export type Project = {
  name: string;
  description: string;
  url: string;
  repo?: string;       // owner/repo — omit for private/hosted projects
  website?: string;    // optional live URL (shown if no repo)
  tags: ('DevOps' | 'Security' | 'Automation' | 'Cloud' | 'AI' | 'CLI' | 'Platform')[];
  highlight?: boolean;
  flagship?: boolean;
  live?: boolean;
  impact?: string;
  stackHint?: string[];
};

// Every project below is on github.com/gokulapap or user-confirmed (DevOps CTF).
export const projects: Project[] = [
  {
    name: 'DevOps CTF',
    description:
      'Interactive Capture-The-Flag platform where engineers debug realistic production incidents in a browser-based terminal — CrashLoopBackOffs, broken Helm releases, leaked secrets, flaky CI pipelines, and more. Real kubectl / helm / terraform inside per-user Kubernetes sandboxes.',
    url: 'https://www.devops-ctf.com',
    website: 'https://www.devops-ctf.com',
    tags: ['DevOps', 'Platform', 'Security'],
    highlight: true,
    flagship: true,
    live: true,
    stackHint: ['React', 'Django', 'PostgreSQL', 'Redis', 'Kubernetes', 'xterm.js', 'Terraform'],
  },
  {
    name: 'Reconator',
    description:
      'Automated reconnaissance framework for pentesting & bug bounty — orchestrates 20+ tools into a single pipeline.',
    url: 'https://github.com/gokulapap/Reconator',
    repo: 'gokulapap/Reconator',
    tags: ['Security', 'Automation', 'CLI'],
    highlight: true,
  },
  {
    name: 'bugbounty-mcp-server',
    description:
      'Comprehensive MCP server for bug-bounty hunting — brings pentesting tooling directly into LLM agents.',
    url: 'https://github.com/gokulapap/bugbounty-mcp-server',
    repo: 'gokulapap/bugbounty-mcp-server',
    tags: ['Security', 'AI', 'Automation'],
    highlight: true,
  },
  {
    name: 'wappalyzer-cli',
    description:
      'Fast CLI re-implementation of Wappalyzer — identifies web technologies in bulk scans.',
    url: 'https://github.com/gokulapap/wappalyzer-cli',
    repo: 'gokulapap/wappalyzer-cli',
    tags: ['Security', 'CLI'],
  },
  {
    name: 'Pentesting-Resources',
    description:
      'Curated collection of pentesting and bug-bounty resources used daily by hunters.',
    url: 'https://github.com/gokulapap/Pentesting-Resources',
    repo: 'gokulapap/Pentesting-Resources',
    tags: ['Security'],
  },
  {
    name: 'kustomize_to_helm',
    description:
      'Framework for migrating large Kustomize estates to Helm charts without manual rewrites.',
    url: 'https://github.com/gokulapap/kustomize_to_helm',
    repo: 'gokulapap/kustomize_to_helm',
    tags: ['DevOps', 'Automation'],
  },
  {
    name: 'submax',
    description: 'All-in-one subdomain enumeration utility — fan-out to multiple sources, de-duplicate, resolve.',
    url: 'https://github.com/gokulapap/submax',
    repo: 'gokulapap/submax',
    tags: ['Security', 'CLI'],
  },
  {
    name: 'bugdork',
    description: 'Google-dorking engine for vulnerability discovery — parameterized dork packs for common CWEs.',
    url: 'https://github.com/gokulapap/bugdork',
    repo: 'gokulapap/bugdork',
    tags: ['Security', 'Automation'],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
  accent: 'emerald' | 'cyan' | 'violet' | 'amber';
  link?: string;
};

// Real roles from LinkedIn. DevOps CTF founder role is intentionally
// excluded per user preference — it's showcased in Projects instead.
export const experience: Experience[] = [
  {
    role: 'Senior Software Engineer, DevOps',
    company: 'Moveworks',
    period: 'Mar 2026 — Present',
    location: 'Bengaluru, Karnataka · On-site',
    accent: 'emerald',
    bullets: [
      'Led Kubernetes resource rightsizing across production and gov environments using Kubecost; built Grafana dashboards and alerts that surface under- and over-utilised workloads across hundreds of services.',
      'Hardened CI validation for Kubernetes manifests and ArgoCD apps; introduced HA instance families for Spot node groups to reduce interruptions on non-prod clusters.',
    ],
    stack: ['Kubernetes', 'AWS', 'Kubecost', 'Grafana', 'ArgoCD'],
  },
  {
    role: 'Software Engineer, DevOps',
    company: 'Moveworks',
    period: 'Aug 2024 — Mar 2026',
    location: 'Bengaluru, Karnataka · On-site',
    accent: 'emerald',
    bullets: [
      'Built deployment automation on Argo Workflows (workflow utilities, input validation, CI dry-run checks) for multi-region Kubernetes clusters; migrated pipelines from Jenkins to Argo and drove the Kustomize → Helm migration across platform services.',
      'Led a large-scale AWS RDS PostgreSQL upgrade (v12 → v16) across ~480 instances, 5 regions and 11 environments; shipped Cloud Custodian policies with Slack alerts to clean up unused AMIs, EBS volumes, and idle resources.',
    ],
    stack: ['Argo Workflows', 'Kubernetes', 'AWS', 'Helm', 'Kustomize', 'Cloud Custodian'],
  },
  {
    role: 'Site Reliability Engineer 1',
    company: 'ShopUp',
    period: 'Jun 2023 — Aug 2024',
    location: 'Bengaluru, Karnataka · On-site',
    accent: 'cyan',
    bullets: [
      'Hardened Kubernetes security — migrated all application pods to run as non-root and moved authentication to GCP Workload Identity for keyless access from workloads and GitHub Actions.',
      'Built Trivy-based vulnerability-scanning pipelines that auto-open remediation PRs; designed Helm-based CI/CD and deployed internal platform tooling (SonarQube, OpenMetadata, Apache Flink).',
    ],
    stack: ['GCP', 'Kubernetes', 'Trivy', 'Helm', 'CI/CD'],
  },
  {
    role: 'Site Reliability Engineer Intern',
    company: 'ShopUp',
    period: 'Dec 2022 — Jun 2023',
    location: 'Bengaluru, Karnataka · On-site',
    accent: 'violet',
    bullets: [
      'Implemented centralised infrastructure access via Teleport (Kubernetes, MySQL, PostgreSQL) with GitHub Teams integration for role-based access.',
      'Built automated security-testing pipelines (URL fuzzing) and hardened internal API security — strengthened CORS and HTTP headers, remediated findings from internal and third-party assessments.',
    ],
    stack: ['Teleport', 'Kubernetes', 'GCP', 'Python'],
  },
];

export type Achievement = {
  title: string;
  detail: string;
  tag: string;
  accent: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose';
  icon: string;
  link?: string;
};

// Merged: vulnerabilities + bounties live together — same story, one card.
export const achievements: Achievement[] = [
  {
    title: 'Google Hall of Fame',
    detail:
      'Recognised for reporting a security vulnerability in Google Hangouts.',
    tag: 'RECOGNITION',
    accent: 'cyan',
    icon: 'Award',
  },
  {
    title: '100+ Vulnerabilities · ₹20L+ in rewards',
    detail:
      'Responsibly disclosed across public and private bug-bounty programs — spanning auth bypass, IDOR, SSRF, and cloud misconfigurations.',
    tag: 'BUG BOUNTY',
    accent: 'rose',
    icon: 'ShieldAlert',
  },
  {
    title: 'DevOps CTF — Launched',
    detail:
      'Built and launched devops-ctf.com — production platform with per-user Kubernetes sandboxes and real DevOps tooling in-browser.',
    tag: 'PRODUCT',
    accent: 'emerald',
    icon: 'Rocket',
    link: 'https://www.devops-ctf.com',
  },
  {
    title: 'Reconator — Open Source',
    detail:
      'Automated reconnaissance framework used by bug-bounty hunters worldwide.',
    tag: 'OPEN SOURCE',
    accent: 'violet',
    icon: 'Star',
    link: 'https://github.com/gokulapap/Reconator',
  },
  {
    title: 'Docker & Cloud Research',
    detail:
      'Identified Docker security flaws and cloud misconfigurations; shipped Trivy-based scanning & remediation automation.',
    tag: 'RESEARCH',
    accent: 'emerald',
    icon: 'Container',
  },
  {
    title: '60+ OSS Projects',
    detail:
      'Security, DevOps, and automation tooling — free, permissively licensed, and actively maintained.',
    tag: 'COMMUNITY',
    accent: 'amber',
    icon: 'GitFork',
  },
];

// The shape of a deploy pipeline I'd set up — six steps, generic enough
// for any team, specific enough to show I know the shape. No tool-name
// stuffing; the detail lines carry the tech where it matters.
export const pipelineStages = [
  {
    id: 'commit',
    label: 'COMMIT',
    sub: 'review & merge',
    detail: 'Signed commits, peer review, and CI tests pass before anything merges.',
    icon: 'GitCommit',
  },
  {
    id: 'build',
    label: 'BUILD',
    sub: 'reproducible',
    detail: 'The code becomes a container image — built the same way, every time.',
    icon: 'Package',
  },
  {
    id: 'scan',
    label: 'SCAN',
    sub: 'security checks',
    detail: 'Automated scans for vulnerabilities, leaked secrets, and policy violations.',
    icon: 'Scan',
  },
  {
    id: 'sign',
    label: 'SIGN',
    sub: 'verified artifact',
    detail: 'Only clean, signed artifacts leave the pipeline — the cluster verifies signatures on the way in.',
    icon: 'FileCheck2',
  },
  {
    id: 'deploy',
    label: 'DEPLOY',
    sub: 'progressive',
    detail: 'A small slice of traffic sees the change first; once it looks healthy, it rolls out to everyone.',
    icon: 'Rocket',
  },
  {
    id: 'observe',
    label: 'OBSERVE',
    sub: 'slos & alerts',
    detail: 'Health is tracked against SLOs. If something regresses, the deploy reverses itself automatically.',
    icon: 'Activity',
  },
];
