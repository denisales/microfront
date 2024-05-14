/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      federation({
        name: `cart`,
        filename: "remoteEntry.js",
        exposes: {
          '/routes' : './src/routes.tsx'
        },
        shared: ["react", "react-dom", "react-router-dom", "zustand"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: true,
      cssCodeSplit: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
