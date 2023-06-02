/* eslint-disable prettier/prettier */
import { defineConfig } from 'vitest/config'
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
        testTimeout: 1000000
    },
})

// npm install vitest/vite-tsconfig-paths -D