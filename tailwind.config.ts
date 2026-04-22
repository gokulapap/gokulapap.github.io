import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070c',
          900: '#080b13',
          800: '#0c111c',
          700: '#121829',
          600: '#1a2238',
          500: '#242d47',
        },
        accent: {
          emerald: '#10b981',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
      },
      fontFamily: {
        // Font names come from @fontsource-variable packages imported in layout.tsx.
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['"Space Grotesk Variable"', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 0 1px rgba(16,185,129,0.25), 0 0 32px rgba(16,185,129,0.22)',
        'glow-cyan': '0 0 0 1px rgba(34,211,238,0.25), 0 0 32px rgba(34,211,238,0.22)',
      },
      animation: {
        'blink': 'blink 1.1s step-end infinite',
        'shimmer': 'shimmer 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 36s linear infinite',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
