import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    // Gzip compression for production
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false,
    }),
    // Brotli compression for production (better compression than gzip)
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Bundle analyzer - generates stats.html
    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: "treemap", // sunburst, treemap, network
    }),
  ],
  base: "/cpsc240-exam3-study-guide/",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          problems: [
            "./src/components/problems/Problem1",
            "./src/components/problems/Problem2",
            "./src/components/problems/Problem3",
            "./src/components/problems/Problem4",
          ],
          alternate: [
            "./src/components/alternate/AlternateProblem1",
            "./src/components/alternate/AlternateProblem2",
            "./src/components/alternate/AlternateProblem3",
            "./src/components/alternate/AlternateProblem4",
            "./src/components/alternate/AlternateProblem5",
            "./src/components/alternate/AlternateProblem6",
            "./src/components/alternate/AlternateProblem7",
            "./src/components/alternate/AlternateProblem8",
          ],
        },
        // Optimize file naming for better caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/test/", "*.config.js", "*.config.cjs", "dist/"],
    },
  },
});
