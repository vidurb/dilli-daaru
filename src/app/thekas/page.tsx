import VendorCard from '@/app/thekas/vendor-card'
import Search from '@/components/search'
import { prisma } from '@/lib'

export default async function Thekas({
    searchParams: { s },
}: {
    searchParams: { s?: string }
}) {
    const vendors = await prisma.vendor.findMany({
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
    return (
        <main className="flex min-h-screen flex-row items-top p-24">
            <div className="max-w-md mx-auto">
                <Search path={`thekas`} />
                {vendors.map((vendor, index) => (
                    <VendorCard vendor={vendor} key={index} />
                ))}
                ]{' '}
            </div>
        </main>
    )
}
