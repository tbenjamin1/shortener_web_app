import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()], // Add the Vue plugin here
    test: {
        globals: true,
        environment: 'jsdom', // Simulates a DOM environment for Vue components
    },
});
