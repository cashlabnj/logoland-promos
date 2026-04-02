import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#86efac',
          400: '#4ade80',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
        },
        accent: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        dark: {
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
          950: '#030712',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'plus-jakarta': ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'in': 'fadeIn 200ms ease-in-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(22, 163, 74, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 0 10px rgba(22, 163, 74, 0)',
          },
        },
      },
      transitionDuration: {
        350: '350ms',
        450: '450ms',
      },
      boxShadow: {
        glow: '0 0 20px rgba(22, 163, 74, 0.3)',
        'glow-lg': '0 0 40px rgba(22, 163, 74, 0.2)',
        inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
