const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-purple)',
        },
      },
      maxWidth: {
        container: '65ch',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          contain: (value) => ({
            maxWidth: value,
            width: '100%',
            marginInline: 'auto',
          }),
        },
        {
          values: theme('maxWidth'),
        },
      );
    }),
  ],
};
