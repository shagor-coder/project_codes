import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: ["https://crm.nurturebeast.com", "https://app.gohighlevel.com"],
    },
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "./src/main.js",
    },
  },
});
