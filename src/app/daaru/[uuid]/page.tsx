import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { fetchAndUpdateVendors } from '@/app/api/availability/route'
import { categoryImageMap } from '@/app/daaru/product-card'
import { prisma } from '@/lib/db'
import { areVendorsOpen } from '@/lib/utils'
import { translator } from '@/lib/uuid'

export default async function Daaru({
    params: { uuid },
}: {
    params: { uuid: string }
}) {
    const product = await prisma.product.findUnique({
        where: { id: uuid.includes('-') ? uuid : translator.toUUID(uuid) },
        include: { vendors: true },
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
        <main
            className={
                'flex min-h-screen flex-row items-center p-24 justify-center'
            }
        >
            <div className="bg-white px-4 py-4 rounded shadow-sm ease-in-out duration-200 hover:shadow-md flex m-2 dark:bg-slate-900 dark:border-slate-500 dark:border">
                <Image
                    src={categoryImageMap[product.category]}
                    alt={product.category}
                    className="border rounded border-solid border-slate-300 inline mr-4"
                    width={64}
                    height={64}
                    priority
                />
                <div>
                    <div className="text-lg pb-1.5 leading-6 block">
                        {product.name}
                    </div>
                    <div className="bg-purple-700 text-white rounded inline-block px-1.5 py-0.5 mb-0.5">
                        {product.category}
                    </div>
                    <ul className={'flex flex-col'}>
                        {vendors.map((vendor) => {
                            return (
                                <li
                                    className="text-slate-500 pl-3"
                                    key={vendor.id}
                                >
                                    <Link
                                        href={`/thekas/${translator.fromUUID(
                                            vendor.id
                                        )}`}
                                    >
                                        {vendor.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </main>
    )
}

export const revalidate = 43200
