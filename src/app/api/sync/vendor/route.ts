import { NextRequest, NextResponse } from 'next/server'

import { geocodeVendor } from '@/app/thekas/[uuid]/page'
import { getRandomVendors } from '@/lib'

export async function GET(request: NextRequest) {
    const vendors = await getRandomVendors(2)
    await Promise.all(vendors.map((vendor) => geocodeVendor(vendor)))
    return NextResponse.json({ message: 'ok', vendors })
}
