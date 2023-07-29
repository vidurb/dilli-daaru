import { PrismaClient, Product, Vendor } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getRandomProducts(quantity: number): Promise<Product[]> {
    return prisma.$queryRaw`SELECT * from "Product" ORDER BY random() LIMIT ${quantity}`
}

export async function getRandomVendors(quantity: number): Promise<Vendor[]> {
    return prisma.$queryRaw`SELECT "id", "externalId", "name", "address", "productTypes", "entity", "createdAt", "updatedAt", "gmapsPlaceId", "location"::text from "Vendor" ORDER BY random() LIMIT ${quantity} `
}
