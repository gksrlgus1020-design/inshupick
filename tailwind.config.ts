import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E1D35',
          mid: '#0A2540',
          light: '#1A3A6B',
        },
        orange: {
          brand: '#E8600A',
          hover: '#C04E08',
          light: '#FFF0E8',
        },
        surface: '#F5F8FF',
        ink: '#0E1D35',
        'ink-2': '#64748B',
        border: '#E2E8F0',
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
        card: '0 1px 3px rgba(14,29,53,0.06), 0 4px 16px rgba(14,29,53,0.04)',
        'card-hover': '0 4px 12px rgba(14,29,53,0.10), 0 12px 32px rgba(14,29,53,0.07)',
        cta: '0 4px 20px rgba(232,96,10,0.30)',
        btn: '0 2px 8px rgba(14,29,53,0.15)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
