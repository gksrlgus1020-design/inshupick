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
        navy: {
          DEFAULT: '#0A2540',
          light: '#103060',
          dark: '#061828',
        },
        gold: {
          DEFAULT: '#E8600A',
          light: '#FF7820',
          dark: '#C04E08',
        },
        slate: {
          bg: '#F4F7FF',
        },
      },
      fontFamily: {
        sans: [
          'Apple SD Gothic Neo',
          '맑은 고딕',
          'Noto Sans KR',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

export default config
