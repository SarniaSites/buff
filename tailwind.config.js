/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  Buff – Tailwind config
//  Brand colours live here. Change them once and rebuild:
//    npm install   (first time only)
//    npm run build
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    // listed in full so the small "xs" step sorts before the others
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      // laptops that are wide but not very tall (e.g. 1280×720)
      short: { raw: '(min-width: 1024px) and (max-height: 820px)' },
    },
    extend: {
      colors: {
        // Blush pink – the background of the Buff logo (#f2dcdf = blush-200)
        blush: {
          50: '#fcf7f7',
          100: '#f8eced',
          200: '#f2dcdf',
          300: '#e7c3c8',
          400: '#d79fa8',
        },
        // Gold – the logo lettering and frame (#c3a577 = gold-400).
        // Darker steps are used for text so it stays readable on light backgrounds.
        gold: {
          100: '#f3ead9',
          200: '#e6d5b4',
          300: '#d6bd8f',
          400: '#c3a577',
          500: '#b38f55',
          600: '#96743f',
          700: '#795c31',
        },
        // Warm off-black for text – softened from the near-black in the cover photo
        ink: {
          900: '#231d1b',
          800: '#352c29',
          700: '#4d423e',
          600: '#6a5d58',
          500: '#8a7c76',
        },
        // Kraft paper tone – the paper every nail photo is shot on
        kraft: {
          100: '#f6efe6',
          200: '#ece0cf',
          300: '#dccab0',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      letterSpacing: {
        logo: '0.32em',
      },
      maxWidth: {
        site: '76rem',
      },
    },
  },
  plugins: [],
};
