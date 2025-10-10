import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: { '2xl': '1rem' },
      colors: { background: '#0b1220', foreground: '#e5edf5' }
    },
  },
  plugins: [],
}
export default config
