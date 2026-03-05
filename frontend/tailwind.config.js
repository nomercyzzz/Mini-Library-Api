/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        bg: '#0d0d0d',
        surface: '#161616',
        border: '#2a2a2a',
        purple: {
          main: '#7c3aed',
          hover: '#6d28d9',
          glow: 'rgba(124, 58, 237, 0.4)',
          subtle: 'rgba(124, 58, 237, 0.1)',
          border: 'rgba(124, 58, 237, 0.25)',
        },
        error: {
          bg: '#1a0a0a',
          border: '#5c1a1a',
          text: '#ff6b6b',
        }
      },
    }
  },
}