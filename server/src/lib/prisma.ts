import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'], // mostra cada chamada requisitada no banco
})
