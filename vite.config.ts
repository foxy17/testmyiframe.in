import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
    })
  ],
  // Configure for GitHub Pages deployment with custom domain
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Optimize for GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Ensure build exits cleanly in CI
    emptyOutDir: true,
    minify: 'esbuild',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    host: true,
  },
  clearScreen: false,
});
