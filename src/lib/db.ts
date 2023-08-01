import { PrismaClient, Product, Vendor } from '@prisma/client'
import { GeoJSON } from 'geojson'

import { translator } from '@/lib/uuid'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

export const xprisma = prisma.$extends({
    result: {
        product: {
            shortUuid: {
                needs: { id: true },
                compute(product) {
                    return translator.fromUUID(product.id)
                },
            },
        },
        vendor: {
            shortUuid: {
                needs: { id: true },
                compute(vendor) {
                    return translator.fromUUID(vendor.id)
                },
            },
        },
    },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getRandomProducts(quantity: number): Promise<Product[]> {
    return prisma.$queryRaw`SELECT * from "Product" ORDER BY random() LIMIT ${quantity}`
}

export async function getRandomVendors(quantity: number): Promise<Vendor[]> {
    return prisma.$queryRaw`SELECT "id", "externalId", "name", "address", "productTypes", "entity", "createdAt", "updatedAt", "gmapsPlaceId", "location"::text from "Vendor" ORDER BY random() LIMIT ${quantity} `
}

export type ExtendedVendor = Vendor & {
    dist_meters?: number
    location?: GeoJSON
}

export async function getNearbyVendors(
    lat: number,
    lng: number,
    search?: string
): Promise<ExtendedVendor[]> {
    if (search && search.length > 0) {
        return prisma.$queryRaw<
            ExtendedVendor[]
        >`SELECT "id", "externalId", "name", "address", "productTypes", "entity", "createdAt", "updatedAt", "gmapsPlaceId", ST_AsGeoJSON(location)::json as location, st_distance(location, st_point(${lng}::float, ${lat}::float)::geography) as dist_meters from "Vendor" WHERE to_tsvector('english', name) @@ to_tsquery('english', ${search}) ORDER BY location <-> st_point(${lng}::float, ${lat}::float)::geography LIMIT 10`
    } else {
        return prisma.$queryRaw<
            ExtendedVendor[]
        >`SELECT "id", "externalId", "name", "address", "productTypes", "entity", "createdAt", "updatedAt", "gmapsPlaceId", ST_AsGeoJSON(location)::json as location, st_distance(location, st_point(${lng}::float, ${lat}::float)::geography) as dist_meters from "Vendor" ORDER BY location <-> st_point(${lng}::float, ${lat}::float)::geography LIMIT 10`
    }
}

export async function getNearbyVendorsWithProduct(
    lat: number,
    lng: number,
    productId: string
): Promise<ExtendedVendor[]> {
    return prisma.$queryRaw<
        ExtendedVendor[]
    >`SELECT "id", "externalId", "name", "address", "productTypes", "entity", "createdAt", "updatedAt", "gmapsPlaceId", ST_AsGeoJSON(location)::json as location, st_distance(location, st_point(${lng}::float, ${lat}::float)::geography) as dist_meters from "Vendor" WHERE id in (SELECT "B" from "_ProductToVendor" WHERE "A" = ${productId}) ORDER BY location <-> st_point(${lng}::float, ${lat}::float)::geography LIMIT 10`
}
