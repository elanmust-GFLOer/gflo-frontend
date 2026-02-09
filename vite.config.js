import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify('1.0.0'),
    'import.meta.env.VITE_GFLO_PHILOSOPHY': JSON.stringify('Sovereign AI-Web3 Ecosystem')
  }
})
