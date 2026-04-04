const svgToDataUri = require('mini-svg-data-uri');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans, "")', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono, "")', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        divider: {
          light: colors.slate[200],
          dark: colors.slate[800],
        },
      },
      animation: {
        'bounce-x': 'bounce-x 1s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'breathe': 'breathe 2.5s ease-in-out infinite',
      },
      keyframes: {
        'bounce-x': {
          '0%, 100%': {
            transform: 'translateX(25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 4px 2px rgba(139, 92, 246, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 12px 6px rgba(139, 92, 246, 0.6)',
          },
        },
        'breathe': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 8px 4px rgba(139, 92, 246, 0.4)',
          },
          '50%': {
            transform: 'scale(1.3)',
            boxShadow: '0 0 20px 10px rgba(139, 92, 246, 0.7)',
          },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('fm', '.fm &');
    },
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}" stroke-dasharray="5 3" transform="scale(1, -1)"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      );
    },
    require('@headlessui/tailwindcss'),
    require('tailwindcss-accent')({
      colors: ['violet', 'blue'],
      root: 'violet',
    }),
  ],
};
