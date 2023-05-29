/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDBUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable.')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment>{
    name: 'prisma',
    async setup() {
        const schema = randomUUID()
        const databaseURL = generateDBUrl(schema)

        process.env.DATABASE_URL = databaseURL

        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(
                    `DROP DATABASE IF EXISTS \`${schema}\``
                )
                await prisma.$disconnect()
            },
        }
    }
}