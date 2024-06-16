import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        define: {
            'process.env.API_URL': JSON.stringify(env.API_URL),
            'process.env.API_IMAGES_URL': JSON.stringify(env.API_IMAGES_URL),
        },
        base: '/',
        preview: {
            port: 3000,
            strictPort: true,
        },
        server: {
            port: 3000,
            strictPort: true,
            host: true,
            origin: 'http://0.0.0.0:3000',
        },
    };
});
