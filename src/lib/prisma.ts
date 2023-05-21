/* eslint-disable prettier/prettier */
import { env } from '../env/index' // TODO FIX ME!
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({ 
    log: env.NODE_ENV === 'dev' ? ['query']: []
})