import { Vendor } from '@prisma/client'
import { GeoJSON } from 'geojson'

import VendorCard from '@/app/thekas/vendor-card'
import { LocationHelper } from '@/components'
import Search from '@/components/search'
import { ExtendedVendor, getNearbyVendors, prisma } from '@/lib'

export default async function Thekas({
    searchParams: { s, lat, lng },
}: {
    searchParams: { s?: string; lat?: number; lng?: number }
}) {
    const vendors: ExtendedVendor[] =
        lat && lng
            ? await getNearbyVendors(lat, lng, s)
            : await prisma.vendor.findMany({
                  where: {
                      ...(s !== undefined && { name: { search: s } }),
                  },
                  take: 10,
                  orderBy: {
                      products: {
                          _count: 'desc',
                      },
                  },
              })
    return (
        <main className="flex min-h-screen flex-row items-top p-24">
            <div className="max-w-md mx-auto">
                <Search placeholder={`Where ya at?`} />
                {vendors.map((vendor, index) => (
                    <VendorCard vendor={vendor} key={index} />
                ))}
            </div>
            <LocationHelper />
        </main>
    )
}
