import { Client } from '@googlemaps/google-maps-services-js'
import { Vendor } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'

import ProductCard from '@/app/daaru/product-card'
import Locator from '@/app/thekas/locator'
import VendorCard from '@/app/thekas/vendor-card'
import Search from '@/components/search'
import { prisma } from '@/lib/db'
import { translator } from '@/lib/uuid'

const client = new Client({})

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
        >`UPDATE "Vendor" SET "location" = ${point}::geometry, "gmapsPlaceId" = ${place.place_id} WHERE id = ${vendor.id} RETURNING "id", "externalId", "name", "address", "productTypes", "entity", "createdAt", "updatedAt", "gmapsPlaceId", "location"::text;`
        return result[0]
    } else {
        return vendor
    }
}

export default async function Theka({
    params: { uuid },
}: {
    params: { uuid: string }
}) {
    const vendor = await prisma.vendor.findUnique({
        where: { id: uuid.includes('-') ? uuid : translator.toUUID(uuid) },
    })
    if (!vendor) {
        return notFound()
    }
    const [geocodedVendor, products] = await Promise.all([
        vendor.gmapsPlaceId ? vendor : geocodeVendor(vendor),
        prisma.product.findMany({
            where: { vendors: { some: { id: vendor.id } } },
        }),
    ])
    return (
        <main className="flex min-h-screen flex-row items-top p-24">
            <div className="max-w-md mx-auto">
                <VendorCard vendor={geocodedVendor} />
                {products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </main>
    )
}
