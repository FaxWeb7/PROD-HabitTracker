import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      outDir: 'dist',
      manifest: {
        name: 'Трекер привычек',
        short_name: 'Привычки',
        description: 'Приложение для отслеживания полезных привычек с геймификацией',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo/android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'logo/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          },
        ]
      }
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
