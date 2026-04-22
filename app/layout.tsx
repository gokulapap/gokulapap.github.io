import type { Metadata, Viewport } from 'next';
// Self-hosted font files via @fontsource — no network calls to fonts.gstatic.com.
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { profile } from '@/lib/data';

const SITE_URL = 'https://gokulap.me';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.title} · DevOps Engineer · Bangalore`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name, url: profile.socials.github }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    'Gokul A P',
    'Gokul AP',
    'gokulapap',
    'DevOps Engineer',
    'DevOps Engineer Bangalore',
    'DevOps Engineer India',
    'Software Engineer DevOps',
    'Senior DevOps Engineer',
    'Site Reliability Engineer',
    'SRE Bangalore',
    'Bug Bounty Hunter',
    'Security Researcher',
    'Kubernetes Engineer',
    'ArgoCD',
    'Argo Workflows',
    'Terraform',
    'Helm',
    'Python DevOps',
    'Moveworks',
    'Google Hall of Fame',
    'DevOps CTF',
    'Reconator',
    'bugbounty-mcp-server',
    'Cloud Security Researcher',
    'GitOps',
    'CI/CD',
    'Platform Engineering',
  ],
  category: 'technology',
  classification: 'Technology · Portfolio · DevOps',
  alternates: {
    canonical: '/',
    languages: { 'en-IN': '/', 'x-default': '/' },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_IN',
    url: SITE_URL,
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    siteName: `${profile.name} · Portfolio`,
    firstName: 'Gokul',
    lastName: 'A P',
    username: 'gokulapap',
    images: [
      {
        url: profile.avatar,
        width: 460,
        height: 460,
        alt: `${profile.name} — ${profile.title}`,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    creator: '@CodingGokul',
    site: '@CodingGokul',
    images: [profile.avatar],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    // Fill these in when you verify ownership on search consoles.
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
  other: {
    // Extra signals search engines & social crawlers pick up.
    'twitter:label1': 'Based in',
    'twitter:data1': 'Bangalore, India',
    'twitter:label2': 'Working at',
    'twitter:data2': 'Moveworks',
  },
};

export const viewport: Viewport = {
  themeColor: '#05070c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// --- Structured data (JSON-LD) ---
// Two schemas: Person (for knowledge-panel / rich-results) and ProfilePage
// (tells Google this URL is a personal profile).
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: profile.name,
  alternateName: ['Gokul AP', 'gokulapap'],
  url: SITE_URL,
  image: profile.avatar,
  jobTitle: profile.title,
  worksFor: {
    '@type': 'Organization',
    name: 'Moveworks',
    url: 'https://www.moveworks.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  nationality: { '@type': 'Country', name: 'India' },
  description: profile.summary,
  knowsAbout: [
    'DevOps',
    'Site Reliability Engineering',
    'Kubernetes',
    'ArgoCD',
    'Argo Workflows',
    'Terraform',
    'Helm',
    'AWS',
    'Google Cloud Platform',
    'Cloud Security',
    'Bug Bounty',
    'Penetration Testing',
    'Python Automation',
    'CI/CD',
    'GitOps',
    'Infrastructure as Code',
  ],
  knowsLanguage: ['English', 'Tamil'],
  sameAs: [
    profile.socials.github,
    profile.socials.linkedin,
    profile.socials.twitter,
    profile.socials.blog,
    profile.socials.instagram,
  ],
  award: [
    'Google Hall of Fame — reported security vulnerability in Google Hangouts',
    '100+ responsibly-disclosed security vulnerabilities across public and private bug-bounty programs',
  ],
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'DevOps & Security Consulting',
      description:
        'Kubernetes platform engineering, CI/CD automation, and security research consulting.',
    },
  },
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile`,
  name: `${profile.name} — ${profile.title}`,
  url: SITE_URL,
  description: profile.summary,
  mainEntity: { '@id': `${SITE_URL}/#person` },
  about: { '@id': `${SITE_URL}/#person` },
  inLanguage: 'en-IN',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${profile.name} · Portfolio`,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE_URL}/#person` },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* DNS prefetch for the one external origin we call at runtime */}
        <link rel="dns-prefetch" href="//api.github.com" />
        <link rel="preconnect" href="https://api.github.com" crossOrigin="" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans bg-ink-950 text-[#e6edf7] antialiased">
        {children}
      </body>
    </html>
  );
}
