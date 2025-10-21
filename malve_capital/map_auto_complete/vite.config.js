import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cors: {
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
