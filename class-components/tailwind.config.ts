/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
    },
    extend: {
      colors: {
        gray900: 'oklch(0.31 0.05 264.72)',
        gray200: 'oklch(0.96 0.01 275.67)',
        activeThemeDark: 'oklch(40.091% 0.06655 264.771)',
        activeThemeLight: 'oklch(0.84 0.03 266.54)',
      },
      fontSize: {
        body: '14px',
        detail: '16px',
      },
      fontWeight: {
        light: '300',
        semibold: '600',
        bold: '800',
      },
      container: {
        center: 'true',
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
