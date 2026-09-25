/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        'paper-soft': '#F3F5F9',
        ink: '#0B1E3B',
        'ink-soft': '#4B5768',
        hairline: '#E1E5EC',
        gold: '#96681C',
        'gold-soft': '#F3E8D2',
        charcoal: '#0A1526',
        'charcoal-soft': '#0F1D33',
        cream: '#E9ECF3',
        'cream-soft': '#8792A6',
        'hairline-dark': 'rgba(212,175,106,0.16)',
        brass: '#D9B45E',
        'brass-soft': 'rgba(217,180,94,0.12)',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,30,59,0.04), 0 8px 24px -12px rgba(11,30,59,0.12)',
        'card-hover': '0 4px 12px rgba(11,30,59,0.06), 0 16px 40px -12px rgba(11,30,59,0.18)',
        'card-dark': '0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -12px rgba(0,0,0,0.5)',
        'card-dark-hover': '0 4px 16px rgba(217,180,94,0.08), 0 20px 48px -16px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
