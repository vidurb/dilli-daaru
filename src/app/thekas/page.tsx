import { LocationHelper } from '@/components'
import DesktopDaaruSearch from '@/components/desktop-daaru-search'
import VendorCard from '@/components/vendor-card'
import { ExtendedVendor, getNearbyVendors, prisma } from '@/lib'

export default async function Thekas({
    searchParams: { s, lat, lng, requestLocation },
}: {
    searchParams: {
        s?: string
        lat?: number
        lng?: number
        requestLocation?: string
    }
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
        <main className="flex min-h-screen flex-col sm:flex-row items-start p-2 sm:p-6 md:p-12">
            <div className="max-w-md mx-auto">
                <DesktopDaaruSearch placeholder={`Where ya at?`} />
                {vendors.map((vendor, index) => (
                    <VendorCard vendor={vendor} key={index} titleLink={true} />
                ))}
            </div>
            <LocationHelper />
        </main>
    )
}
