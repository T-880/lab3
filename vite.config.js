import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  base: '/lab3/',
  plugins: [imagetools()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        sass: 'src/sass.html',
        anim: 'src/animering.html',
        diag: 'src/diagram.html',
        kart: 'src/karta.html'
        
      }
    }
  }
});