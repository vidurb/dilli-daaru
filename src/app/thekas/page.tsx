import { Vendor } from '@prisma/client'

import Locator from '@/app/thekas/locator'
import VendorCard from '@/app/thekas/vendor-card'
import Search from '@/components/search'
import { prisma } from '@/lib'

export default async function Thekas({
    searchParams: { s, lat, lng },
}: {
    searchParams: { s?: string; lat?: number; lng?: number }
}) {
    const vendors: Partial<Vendor & { dist_meters?: number }>[] =
        lat && lng
            ? await prisma.$queryRaw`select nearby_vendors(${lat}::float, ${lng}::float);`
            : await prisma.vendor.findMany({
                  where: {
                      ...(s !== undefined && { name: { search: s } }),
                  },
                  take: 10,
                  include: { products: true },
                  orderBy: {
                      products: {
                          _count: 'desc',
                      },
                  },
              })
    console.log({ lat, lng })
    return (
        <main className="flex min-h-screen flex-row items-top p-24">
            <div className="max-w-md mx-auto">
                <Search path={`thekas`} />
                {vendors.map((vendor, index) => (
                    <VendorCard vendor={vendor} key={index} />
                ))}
            </div>
            <Locator />
        </main>
    )
}
