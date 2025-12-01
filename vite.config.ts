import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/love-calendar/', // 반드시 GitHub repo 이름과 동일해야 함
})

