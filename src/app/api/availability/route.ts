import { Product, Vendor } from '@prisma/client'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

import {
    createProductsByVendorRequest,
    ExciseApiBrand,
    translator,
} from '@/lib'
import { prisma } from '@/lib/db'
import {
    createVendorsByProductRequest,
    ExciseApiVendor,
} from '@/lib/excise-api'
import { areVendorsOpen } from '@/lib/utils'

export async function fetchAndUpdateVendors(product: Product) {
    const apiVendors: ExciseApiVendor[] = await fetch(
        createVendorsByProductRequest(product)
    ).then((r) => r.json())
    const vendorsIds = apiVendors.map((v) => v.vendId)
    const vendors = await prisma.vendor.findMany({
        where: { externalId: { in: vendorsIds } },
    })
    await prisma.product.update({
        where: {
            id: product.id,
        },
        data: {
            vendors: {
                set: vendors.map((v) => ({ id: v.id })),
            },
            vendorsUpdatedAt: new Date(),
        },
    })
    return vendors
}

export async function GET(request: NextRequest) {
    const productId = request.nextUrl.searchParams.get('productId')
    if (productId) {
        const product = await prisma.product.findUnique({
            where: {
                id: productId.includes('-')
                    ? productId
                    : translator.toUUID(productId),
            },
            include: { vendors: true },
        })
        if (product) {
            if (
                product.vendorsUpdatedAt &&
                dayjs(product.vendorsUpdatedAt).isSame(dayjs(), 'day')
            ) {
                return NextResponse.json({ vendors: product.vendors })
            } else {
                if (areVendorsOpen()) {
                    const vendors = await fetchAndUpdateVendors(product)
                    return NextResponse.json(vendors)
                } else {
                    return NextResponse.json({ vendors: product.vendors })
                }
            }
        } else {
            return NextResponse.json(
                { error: 'product not found' },
                { status: 404 }
            )
        }
    } else {
        return NextResponse.json(
            { error: 'productId is required' },
            { status: 400 }
        )
    }
}

export const dynamic = 'force-dynamic'
