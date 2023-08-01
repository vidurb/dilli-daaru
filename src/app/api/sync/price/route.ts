import { NextRequest, NextResponse } from 'next/server'

import { createProductsByVendorRequest, ExciseApiBrand, prisma } from '@/lib'

export async function GET(request: NextRequest) {
    const product = await prisma.product.findFirst({ where: { mrp: 0 } })
    if (!product) {
        return NextResponse.json({
            processed: 0,
            message: 'no products without price',
        })
    }
    const vendor = await prisma.vendor.findFirst({
        where: { products: { some: { id: product.id } } },
    })
    if (!vendor) {
        return NextResponse.json({
            processed: 0,
            message: 'no vendors for product',
        })
    }
    const apiProducts: ExciseApiBrand[] = await fetch(
        createProductsByVendorRequest(vendor)
    ).then((r) => r.json())
    const results = await Promise.allSettled(
        apiProducts.map((apiProduct) =>
            prisma.product.update({
                where: { externalKey: apiProduct.brandKey },
                data: { mrp: apiProduct.mrp },
            })
        )
    )
    return NextResponse.json({
        processed: results.filter((x) => x.status === 'fulfilled').length,
        failed: results.filter((x) => x.status === 'rejected').length,
        message: 'ok',
    })
}
