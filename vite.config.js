import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [imagetools()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});