import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


export async function getRandomProducts(quantity: number) {
    const productsCount = await prisma.product.count();
    const skip = Math.floor(Math.random() * productsCount);
    return await prisma.product.findMany({
        take: quantity,
        skip: skip,
    });
}

