import { Product } from '@prisma/client'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

import { fetchAndUpdateVendors } from '@/app/api/availability/route'
import { getRandomProducts } from '@/lib'
import { areVendorsOpen } from '@/lib/utils'

async function updateProduct(product: Product) {
    if (
        !product.vendorsUpdatedAt ||
        (!dayjs(product.vendorsUpdatedAt).isSame(dayjs(), 'day') &&
            areVendorsOpen())
    ) {
        return fetchAndUpdateVendors(product)
    }
}

export async function GET(request: NextRequest) {
    const products = await getRandomProducts(5)
    await Promise.all(products.map((product) => updateProduct(product)))
    return NextResponse.json({ message: 'ok', products })
}
