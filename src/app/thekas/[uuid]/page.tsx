import { Client } from '@googlemaps/google-maps-services-js'
import { Vendor } from '@prisma/client'
import { notFound } from 'next/navigation'

import { prisma } from '@/lib/db'
import { translator } from '@/lib/uuid'

const client = new Client({})

async function geocodeVendor(vendor: Vendor) {
    const geocodeResponse = await client.geocode({
        params: {
            address: vendor.address,
            key: process.env.GOOGLE_MAPS_API_KEY!,
        },
    })
    if (geocodeResponse.data.results.length >= 1) {
        const place = geocodeResponse.data.results[0]
        return prisma.vendor.update({
            where: { id: vendor.id },
            data: { gmapsPlaceId: place.place_id },
        })
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
    const geocodedVendor = vendor.gmapsPlaceId
        ? vendor
        : await geocodeVendor(vendor)
    return (
        <div>
            <code>{JSON.stringify(geocodedVendor)}</code>
        </div>
    )
}
