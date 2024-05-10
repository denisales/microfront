/// <reference types="vite/client" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    server: {
      port: 8080,
    },
    preview: {
      port: 8080,
    },
    plugins: [
      react(),
      federation({
        name: `host`,
        remotes: {
          _: "_.js", // não remover
        },
        shared: ["react", "react-dom", "react-router-dom", "zustand"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: true,
      cssCodeSplit: false,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
