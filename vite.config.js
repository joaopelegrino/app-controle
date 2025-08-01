import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  define: {
    __DEV__: JSON.stringify(true)
  },
  esbuild: {
    sourcemap: 'inline'
  }
})