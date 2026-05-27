import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Change this to your backend's actual port (e.g., 3000 or 5000)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (_err, _req, _res) => {
            console.log('proxy error', _err);
          });
          proxy.on('proxyReq', (_proxyReq, _req, _res) => {
            console.log('Sending Request to the Target:', _req.method, _req.url);
          });
          proxy.on('proxyRes', (_proxyRes, _req, _res) => {
            console.log('Received Response from the Target:', _proxyRes.statusCode, _req.url);
          });
        },
      }
    }
  }
})
