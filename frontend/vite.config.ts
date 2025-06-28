import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist', // Output directory for the build
    assetsDir: 'assets', // Directory for static assets
  },
  server: {
    port: 3000, // Match Webpack devServer port
    open: true, // Automatically open the browser
    strictPort: true, // Fail if port 3000 is unavailable
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for src directory
    },
    extensions: ['.ts', '.tsx', '.js'], // Match Webpack extensions
  },
});