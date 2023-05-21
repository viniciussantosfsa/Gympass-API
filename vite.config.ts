/* eslint-disable prettier/prettier */
import { defineConfig } from 'vitest/config'
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsconfigPaths()]
})

// npm install vitest/vite-tsconfig-paths -D