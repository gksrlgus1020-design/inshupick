import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          DEFAULT: '#7C3AED',
          hover: '#6D28D9',
          light: '#F5F3FF',
          mid: '#8B5CF6',
          dark: '#4C1D95',
        },
        orange: {
          brand: '#F97316',
          hover: '#EA6C0B',
          light: '#FFF7ED',
        },
        pink: {
          brand: '#EC4899',
          light: '#FDF2F8',
        },
        surface: '#FAFAFE',
        ink: '#0F0A1E',
        'ink-2': '#6B7280',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Apple SD Gothic Neo',
          '맑은 고딕',
          'Noto Sans KR',
          'sans-serif',
        ],
      },
      fontSize: {
        body: ['18px', { lineHeight: '1.75' }],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15,10,30,0.06), 0 4px 16px rgba(15,10,30,0.04)',
        'card-hover': '0 8px 24px rgba(124,58,237,0.12), 0 2px 8px rgba(15,10,30,0.06)',
        cta: '0 4px 24px rgba(249,115,22,0.35)',
        btn: '0 2px 8px rgba(124,58,237,0.20)',
        glow: '0 0 40px rgba(124,58,237,0.15)',
      },
      backgroundImage: {
        'gradient-violet': 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
        'gradient-warm': 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
        'gradient-mesh-card': 'linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(99,102,241,0.04) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
