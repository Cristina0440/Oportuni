 
 

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3002, // 👈 Aquí defines el puerto de desarrollo
//   },
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name:'host',
      filename:'remoteentry.js',
      exposes:{},
      remotes:{
        remote:'https://iotfinal-4082a.web.app/assets/remoteentry.js'
      },
      shared:['react','react-dom'] 
    })
  ], 
  build:{
    modulePreload:false,
    target:'esnext',
    minify:false,
    cssCodeSplit:false
  }

})
