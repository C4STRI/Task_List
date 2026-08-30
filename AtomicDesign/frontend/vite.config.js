import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    // Permitir cloudflared y otros hosts externos
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.trycloudflare.com', // Permite cualquier subdominio de trycloudflare.com
    ],
    // Desabilitar HMR para funcionar correctamente con cloudflared
    hmr: {
      protocol: 'wss',
      host: 'localhost',
      port: 5173,
    },
  },
});
