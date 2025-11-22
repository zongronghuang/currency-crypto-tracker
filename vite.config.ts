/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

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
  ],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/mocks/setupTests.ts"],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/"),
    },
  },
});
