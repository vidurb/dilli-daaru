import {prisma} from "@/lib/db";
import {fetchBrands, fetchVendors, mapExciseProduct, mapExciseVendor} from "@/lib/excise-api";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
) {
    const [exciseProducts, exciseVendors, dbProducts, dbVendors] = await Promise.all([
        fetchBrands(),
        fetchVendors(),
        prisma.product.findMany({select: {externalKey: true}}),
        prisma.vendor.findMany({select: {externalId: true}})
    ])
    const missingVendors = exciseVendors.filter(v => !dbVendors.find(dv => dv.externalId === v.vendId))
    const missingProducts = exciseProducts.filter(v => !dbProducts.find(dv => dv.externalKey === v.brandKey))
    await Promise.all([
        prisma.product.createMany({
            data: missingProducts.map(p => mapExciseProduct(p))
        }),
        prisma.vendor.createMany({
            data: missingVendors.map(v => mapExciseVendor(v))
        })
    ])
    return NextResponse.json({
        vendors: missingVendors.length,
        products: missingProducts.length
    })
}