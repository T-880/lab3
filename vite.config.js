import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
    base: '/lab3/',
    plugins: [imagetools()],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'src/index.html',
                sass: 'src/sass.html'
            },
            output: {
                assetFileNames: 'assets/[name]-[hash][extname]'
            }
        }
    }
});