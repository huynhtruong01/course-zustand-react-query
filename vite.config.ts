import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

const config = defineConfig(() => {
    const aliases = {
        '@': path.resolve(__dirname, './src/'),
    }
    return {
        plugins: [react()],
        server: {
            port: 3000,
        },
        resolve: {
            alias: aliases,
        },
    }
})

export default config
