import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    base: 'http://localhost:8085/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                // Use constant names for entry JS and CSS
                entryFileNames: 'assets/app.js',
                chunkFileNames: 'assets/chunk-[name].js',
                assetFileNames: (assetInfo: any) => {
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'assets/app.css'; // constant CSS file name
                    }
                    return 'assets/[name][extname]'; // fallback for other assets
                },
            },
        },
    },
})