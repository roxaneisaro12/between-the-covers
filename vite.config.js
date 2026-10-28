
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/between-the-covers/',
  plugins: [tailwindcss()],
})
