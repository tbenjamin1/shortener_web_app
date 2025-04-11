import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        root: './',
        base: '/',
        open: true,
        port: 5175
    },
});
