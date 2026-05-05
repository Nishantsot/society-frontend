import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000
  },
  
  // 🔥 Development Proxy for Socket.IO
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:8080',   // Backend local port
        ws: true,
        changeOrigin: true,
      }
    }
  }
})