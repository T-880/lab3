import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
    base: '/lab3/',
    plugins: [imagetools()],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});