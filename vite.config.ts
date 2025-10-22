import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
   server: {
    //host: '13.53.182.102',  
    host: '0.0.0.0',
    port: 4173   
  },
})
