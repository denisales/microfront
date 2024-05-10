/// <reference types="vite/client" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      react(),
      federation({
        name: `${process.env.VITE_APP_NAME || "remote_app"}`,
        filename: "remoteEntry.js",
        remotes: {
          cart: `${process.env.VITE_MFE_CART}`,
        },
        exposes: {
          "./pages/products": "./src/pages/Products.tsx",
        },
        shared: ["react", "react-dom", "react-router-dom", "zustand"],
        // shared: ["zustand"],
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
