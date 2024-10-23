// eslint-disable-next-line import/namespace
import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    build: {
        minify: 'terser',
    },
});
