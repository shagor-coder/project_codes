import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: ["https://app.mavrocrm.com", "https://app.gohighlevel.com"],
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: "iife",
      },
    },
  },
});
