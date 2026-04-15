/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: path.resolve(process.cwd(), "src/routes"), // your routes folder
      generatedRouteTree: path.resolve(process.cwd(), "src/routeTree.gen.ts"), // output path for generated file
    }),
    react(),
    tailwindcss({ optimize: { minify: true } }),
    svgr({ include: "**/*.svg" }),
    {
      name: "exclude-msw",
      apply: "build", // Only run during build
      closeBundle() {
        const mswPath = path.resolve(__dirname, "dist/mockServiceWorker.js");
        if (fs.existsSync(mswPath)) {
          fs.unlinkSync(mswPath);
          console.log("Successfully removed mockServiceWorker.js from build.");
        }
      },
    },
  ],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/setupTests.ts"],
    exclude: [
      "**/node_modules/**",
      "**/.git/**",
      "**/e2e/**/*.{ts,tsx}",
      "**/*.e2e.{test,spec}.{ts,tsx}",
    ],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/"),
    },
  },
  build: {
    rollupOptions: {
      // Exclude specific files or patterns from the bundle
      external: [/src\/mocks\/.*/],
    },
  },
});
