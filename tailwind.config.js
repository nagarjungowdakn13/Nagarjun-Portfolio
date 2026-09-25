/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F5',
        'paper-soft': '#F2EFE7',
        ink: '#181A20',
        'ink-soft': '#565A64',
        hairline: '#E3DFD3',
        gold: '#8A5A1F',
        'gold-soft': '#F1E6D2',
        charcoal: '#101218',
        'charcoal-soft': '#171A22',
        cream: '#EDEAE0',
        'cream-soft': '#96917F',
        'hairline-dark': 'rgba(255,255,255,0.10)',
        brass: '#D4AF6A',
        'brass-soft': 'rgba(212,175,106,0.10)',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
