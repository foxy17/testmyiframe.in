import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
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
      input: {
        main: 'index.html',
        guide: 'guide.html',
      },
      output: {
        manualChunks: undefined,
        // Ensure proper asset naming for GitHub Pages
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
      // Ensure rollup exits cleanly
      onwarn: () => {},
    },
    // Ensure build exits cleanly in CI
    emptyOutDir: true,
    minify: 'esbuild',
    // Explicitly disable watch mode for builds
    watch: command === 'build' ? null : undefined,
    // Ensure assets are handled properly
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    host: true,
    // Configure file watching
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**'],
      usePolling: false,
    },
  },
  // Configure preview to match production behavior
  preview: {
    port: 4173,
    host: true,
  },
  clearScreen: false,
  // Ensure process exits after build
  logLevel: command === 'build' ? 'info' : 'info',
}));
