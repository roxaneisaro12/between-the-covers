
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/between-the-covers/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        about: resolve(process.cwd(), 'about.html'),
        favorites: resolve(process.cwd(), 'favorites.html'),
      },
    },
  },
})
