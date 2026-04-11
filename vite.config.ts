/// <reference types="vitest/config" />
import { devtools } from "@tanstack/devtools-vite";
import { defineConfig } from "vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

const config = defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    devtools(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium" }, { browser: "firefox" }],
    },
    exclude: ["**/node_modules/**", "**/.git/**", "**/e2e-tests/**"],
  },
  resolve: {
    tsconfigPaths: true,
  },
});

export default config;