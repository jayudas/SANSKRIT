import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        devanagari: ['Noto Sans Devanagari', 'serif'],
      },
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee6e3',
          200: '#fdd0cb',
          300: '#faaaa3',
          400: '#f6776c',
          500: '#ed4f3e',
          600: '#da3420',
          700: '#b82817',
          800: '#982417',
          900: '#7e241a',
        },
      },
    },
  },
  plugins: [],
}
export default config
