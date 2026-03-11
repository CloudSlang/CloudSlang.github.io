import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  server: {
    host: true,   // bind to 0.0.0.0 so the site is reachable on the local network
    port: 5173,
  },
  build: {
    outDir: '../public',
    emptyOutDir: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        '404': resolve(__dirname, 'src/404.html'),
      },
    },
  },
});
