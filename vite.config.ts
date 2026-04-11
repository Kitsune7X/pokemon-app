/// <reference types="vitest/config" />
import { devtools } from "@tanstack/devtools-vite";
import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";

const config = defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    devtools(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],

  resolve: {
    tsconfigPaths: true,
  },
});

export default config;
