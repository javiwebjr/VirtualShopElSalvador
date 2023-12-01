import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/" : "https://heyboss.vercel.app",
      "/uploads/": "https://heyboss.vercel.app"
    }
  }
})
