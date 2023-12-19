module.exports = {
  content: ["public/**/*.html"],
  darkMode: 'class',
  theme: {
    fontSize: {
      '2xs': '0.6875rem',
      'xs': '0.8125rem',
      'sm': '0.9375rem',
      'base': '1rem',
      'xl': '1.125rem',
      '2xl': '1.375rem',
      '3xl': '1.625rem',
    },
    extend: {
      screens: {
        '2xs': '18.75em',
        'xsm': '21.875em',
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '35': '8.75rem',
      },
      colors: {
        'azure-radiance': '#0079FF',
        'polo-blue': '#90A4D4',
        'lynch': '#697C9A',
        'kashmir-blue': '#4B6A9B',
        'ebony-clay': '#2B3442',
        'zircon': '#F6F8FF',
        'big-stone': '#141D2F',
        'cloud-burst': '#1E2A47',
        'white': '#FEFEFE',
      },
      fontFamily: {
        'mono': ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'dark': '0 1rem 1.875rem -0.625rem rgba(70, 96, 187, 0.20)'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}