import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
  })

// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'
// import fs from 'fs'
// import path from 'path'

// export default defineConfig({
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
//       cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
//     },
//     host: true,  // หรือใช้ '--host' ก็ได้
//     port: 5173,  // คุณสามารถเปลี่ยน port ได้ถ้าต้องการ
//   },
//   plugins: [react()],
// })
