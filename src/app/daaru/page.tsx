import { ProductCategory } from '@prisma/client'

import ProductCategories from '@/app/daaru/categories'
import { ProductCard } from '@/components'
import Search from '@/components/search'
import { prisma } from '@/lib/db'

import styles from './daaru.module.scss'

const allCategories = new Set<ProductCategory>(Object.values(ProductCategory))

export default async function Daaru({
    searchParams: { c, s },
}: {
    searchParams: { c: ProductCategory[] | ProductCategory; s?: string }
}) {
    const qpCategories = new Set<ProductCategory>(
        Array.isArray(c) ? c : c ? [c] : []
    )
    const productCategories =
        qpCategories.size > 0 ? qpCategories : allCategories
    const products = await prisma.product.findMany({
        where: {
            category: {
                in: Array.from(productCategories),
            },
            ...(s !== undefined && { name: { search: s } }),
        },
        take: productCategories.size === allCategories.size ? 10 : 100,
        include: { vendors: true },
        orderBy: {
            vendors: {
                _count: 'desc',
            },
        },
    })

    return (
        <main className={styles.mainContainer}>
            <ProductCategories selectedCategories={productCategories} />

            <div className={styles.dataContainer}>
                <Search path={`daaru`} />
                {products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </main>
    )
}
