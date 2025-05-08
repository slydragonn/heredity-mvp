import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      host: true
    },
    define: {
      'import.meta.env.VITE_CONTRACT_ADDRESS': env.VITE_CONTRACT_ADDRESS,
    }
  }
})