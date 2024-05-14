/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
// import { config } from "./src/mfe.config";
// import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// import scopeTailwind from "vite-plugin-scope-tailwind";



// //TODO: add Validação para verificar se o objeto config está correto
// const exposes = Object.entries(config.exposes).reduce((acc, [key, value]) => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const transformedPaths = value.reduce((pathsAcc: any, path) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const splittedPath: any = path.split("/");
//     const fileName = splittedPath.pop().replace(/\.[^/.]+$/, ""); // Remove a extensão do nome do arquivo
//     const transformedPath = `./${key}/${fileName}`;
//     pathsAcc[transformedPath] = path;
//     return pathsAcc;
//   }, {});
//   acc = { ...acc, ...transformedPaths };
//   return acc;
// }, {});

// const shared = ["react", "react-dom", "react-router-dom", "zustand"];

export default defineConfig(() => {
  //TODO: Melhorar o console log, deixar mais bonito.
  // console.log("########################");
  // console.log("Exposes:");
  // console.log(exposes);
  // console.log("Shared Libs:");
  // console.log(shared);
  // console.log("########################");

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
      cssCodeSplit: false,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
