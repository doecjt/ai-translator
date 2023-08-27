import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImports from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        IconResolver(),
      ],
      dts: './src/components.d.ts',
    }),
    AutoImports({
      imports: ['vue'],
      dts: './src/auto-imports.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
