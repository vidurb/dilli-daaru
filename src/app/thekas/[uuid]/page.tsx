import { Client } from '@googlemaps/google-maps-services-js'
import { ProductCategory, Vendor } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'

import ProductCategories from '@/app/daaru/categories'
import ProductCard from '@/app/daaru/product-card'
import Locator from '@/app/thekas/locator'
import VendorCard from '@/app/thekas/vendor-card'
import Search from '@/components/search'
import { prisma } from '@/lib/db'
import { translator } from '@/lib/uuid'

const client = new Client({})

const allCategories = new Set<ProductCategory>(Object.values(ProductCategory))

export async function geocodeVendor(vendor: Vendor) {
    const geocodeResponse = await client.geocode({
        params: {
            address: vendor.address,
            key: process.env.GOOGLE_MAPS_API_KEY!,
        },
    })
    if (
        geocodeResponse.data.status === 'OK' &&
        geocodeResponse.data.results.length >= 1
    ) {
        const place = geocodeResponse.data.results[0]
        const point = `Point(${place.geometry.location.lng} ${place.geometry.location.lat})`
        const result = await prisma.$queryRaw<
            Vendor[]
        >`UPDATE "Vendor" SET "location" = ${point}::geometry, "gmapsPlaceId" = ${place.place_id} WHERE id = ${vendor.id} RETURNING "id", "externalId", "name", "address", "productTypes", "entity", "createdAt", "updatedAt", "gmapsPlaceId", ST_AsText("location") as location;`
        return result[0]
    } else {
        return vendor
    }
}

export default async function Theka({
    params: { uuid },
    searchParams: { c, s },
}: {
    params: { uuid: string }
    searchParams: { c: ProductCategory[] | ProductCategory; s?: string }
}) {
    const vendor = await prisma.vendor.findUnique({
        where: { id: uuid.includes('-') ? uuid : translator.toUUID(uuid) },
    })
    if (!vendor) {
        return notFound()
    }
    const qpCategories = new Set<ProductCategory>(
        Array.isArray(c) ? c : c ? [c] : []
    )
    const productCategories =
        qpCategories.size > 0 ? qpCategories : allCategories
    const [geocodedVendor, products] = await Promise.all([
        vendor.gmapsPlaceId ? vendor : geocodeVendor(vendor),
        prisma.product.findMany({
            where: {
                vendors: { some: { id: vendor.id } },
                category: {
                    in: Array.from(productCategories),
                },
                ...(s && { name: { search: s } }),
            },
        }),
    ])
    return (
        <main className="flex min-h-screen flex-col sm:flex-row items-top p-2 sm:p-6 md:p-12">
            <Suspense
                fallback={
                    <div className="rounded shadow-md w-full max-w-xs">
                        <Skeleton className={'w-full h-full'} />
                    </div>
                }
            >
                <ProductCategories
                    selectedCategories={productCategories}
                    path={`thekas/${uuid}`}
                />
            </Suspense>
            <div className="max-w-md mx-auto">
                <VendorCard vendor={geocodedVendor} />
                <Suspense fallback={<Skeleton className={'h-12 mx-2'} />}>
                    <Search
                        path={`thekas/${uuid}`}
                        placeholder={`What's your fix?`}
                    />
                </Suspense>
                {products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </main>
    )
}
