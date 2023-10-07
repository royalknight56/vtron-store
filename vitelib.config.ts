import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  root: "./src/apps/",
  server: {
    port: 3001,
  },
  build: {
    target: "esnext",
    lib: {
      name: "webdav",
      entry: "webdav.ts",
    },

    minify: false,
    outDir: "./",
    rollupOptions: {
      output: {
        entryFileNames: "[name].[format].js",
        chunkFileNames: "[name].[format].js",
        assetFileNames: "[name].[format].js",
        format: "esm",
        name: "webdav",
      },
    },
  },
});
