/**
 * Shared test styles for ad rendering
 * Extracted from src/assets/styles/global.css to keep in sync
 */

export const CSS_VARIABLES = `
  /* CSS Variables matching Astro's global.css */
  :root {
    --aw-color-primary: #c72f1c;
    --aw-color-secondary: #c72f1c;
    --aw-color-text-heading: rgb(45 45 45);
    --aw-color-text-default: rgb(71 85 95);
    --aw-color-bg-page: rgb(255 255 255);
  }

  .dark {
    --aw-color-primary: rgb(200 30 30);
    --aw-color-secondary: #61AFEF;
    --aw-color-text-heading: rgb(198 198 198);
    --aw-color-text-default: rgb(151 163 186);
    --aw-color-bg-page: rgb(15 23 42);
  }
`;

export const TAILWIND_CONFIG = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#c72f1c',
        secondary: '#c72f1c',
      },
    },
  },
};
