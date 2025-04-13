import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Helper to safely parse port from environment
const getPort = () => {
  const port = process.env.PORT ? Number(process.env.PORT) : 5173
  return isNaN(port) ? 5173 : port
}

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: process.env.NODE_ENV === 'development' ? {
      clientPort: 5173,
      protocol: 'ws',
      host: 'localhost'
    } : undefined,
    port: getPort(),
    strictPort: true
  },
  preview: {
    port: getPort(),
    strictPort: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
