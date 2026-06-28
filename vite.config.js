import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/meridian/', // served from a GitHub Pages subpath
  plugins: [react()],
  server: { host: true },
})
