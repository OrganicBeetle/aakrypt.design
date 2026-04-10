import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F1F0EE',
        charcoal: '#2C353C',
        stone: '#AFB3B6',
        powder: '#BCC9CC',
        ink: '#0A0A0A',
        ash: '#141414',
        chalk: '#F5F0EB',
        mist: '#9A9A9A',
        accent: '#C8A96E',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        seasons: ['The Seasons', 'Cormorant Garamond', 'serif'],
        display: ['Oswald', 'Arial Narrow', 'sans-serif'],
        heading: ['Oswald', 'Arial Narrow', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
