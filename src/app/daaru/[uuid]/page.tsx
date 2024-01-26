import { notFound } from 'next/navigation'

import { LocationHelper, ProductCard, VendorCard } from '@/components'
import { ExtendedVendor, getNearbyVendorsWithProduct, prisma } from '@/lib/db'
import { translator } from '@/lib/uuid'

import styles from '../daaru.module.scss'

// export async function generateStaticParams() {
//     const products = await prisma.product.findMany({
//         select: { id: true },
//         where: { vendors: { some: {} } },
//     })
//
//     return products.map((product) => ({
//         uuid: translator.fromUUID(product.id),
//     }))
// }

export default async function Daaru({
    params: { uuid },
    searchParams: { lat, lng },
}: {
    params: { uuid: string }
    searchParams: { lat?: number; lng?: number }
}) {
    const product = await prisma.product.findUnique({
        where: { id: uuid.includes('-') ? uuid : translator.toUUID(uuid) },
        include: {
            vendors: true,
            _count: {
                select: { vendors: true },
            },
        },
    })
    if (!product) {
        return notFound()
    }
    const vendors: ExtendedVendor[] =
        lat && lng
            ? await getNearbyVendorsWithProduct(lat, lng, product.id)
            : product.vendors
    return (
        <main className={styles.mainContainer}>
            <div className="max-w-md mx-auto">
                <ProductCard product={product} />
                {vendors.map((vendor, index) => (
                    <VendorCard vendor={vendor} key={index} />
                ))}
            </div>
            <LocationHelper />
        </main>
    )
}

export const revalidate = 43200
