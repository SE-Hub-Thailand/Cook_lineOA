import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
// export default defineConfig({
//   // server: {
//   //   port: 3000, // กำหนดพอร์ตที่ต้องการ
//   // },
//     plugins: [react()],
//   })

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://cookkeptback.sehub-thailand.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'
// import fs from 'fs'
// import path from 'path'

// export default defineConfig({
//   server: {
//     https: {
//       key: '/root/Cook_lineOA/key.pem',
//       cert: '/root/Cook_lineOA/cert.pem',
//     },
//     host: true,  // หรือใช้ '--host' ก็ได้
//     port: 5173,  // คุณสามารถเปลี่ยน port ได้ถ้าต้องการ
//   },
//   plugins: [react()],
// })
