import { Vendor } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { geocodeVendor } from '@/app/thekas/[uuid]/page'
import { getRandomVendors } from '@/lib'

async function geocodeVendorIfNecessary(vendor: Vendor) {
    if (!vendor.gmapsPlaceId) {
        return geocodeVendor(vendor)
    }
}

export async function GET(request: NextRequest) {
    const vendors = await getRandomVendors(2)
    await Promise.all(vendors.map((vendor) => geocodeVendorIfNecessary(vendor)))
    return NextResponse.json({ message: 'ok', vendors })
}

export const dynamic = 'force-dynamic'
