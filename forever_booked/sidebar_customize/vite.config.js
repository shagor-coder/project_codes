// vite.config.js
export default {
  // Other Vite configuration options...
  server: {
    // Enable HMR
    hmr: true,
    // If you want to preserve state during HMR, set this option to 'true'
    // This will keep the current application state (e.g., form data, scroll position) intact during module replacement.
    hmrOptions: {
      preserveState: true,
    },
  },
};
