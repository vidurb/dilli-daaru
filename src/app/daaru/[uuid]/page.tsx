import dayjs from 'dayjs'
import { notFound } from 'next/navigation'

import { fetchAndUpdateVendors } from '@/app/api/availability/route'
import { categoryImageMap, ProductCard } from '@/app/daaru/product-card'
import VendorCard from '@/app/thekas/vendor-card'
import { prisma } from '@/lib/db'
import { areVendorsOpen } from '@/lib/utils'
import { translator } from '@/lib/uuid'

import styles from '../daaru.module.scss'

export default async function Daaru({
    params: { uuid },
}: {
    params: { uuid: string }
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
    const vendors =
        product.vendorsUpdatedAt &&
        dayjs(product.vendorsUpdatedAt).isSame(dayjs(), 'day')
            ? product.vendors
            : areVendorsOpen()
            ? await fetchAndUpdateVendors(product)
            : product.vendors
    return (
        <main className={styles.mainContainer}>
            <div className="max-w-md mx-auto">
                <ProductCard product={product} />
                {vendors.map((vendor, index) => (
                    <VendorCard vendor={vendor} key={index} />
                ))}
            </div>
        </main>
    )
}

export const revalidate = 43200
