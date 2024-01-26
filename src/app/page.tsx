import { ProductCategory } from '@prisma/client'

import { ProductCard, ProductCategories } from '@/components'
import {} from '@/components'
import { prisma } from '@/lib'

import styles from './home.module.css'

const allCategories = new Set<ProductCategory>(Object.values(ProductCategory))

export default async function Home({
    searchParams: { c, s },
}: {
    searchParams: { c: ProductCategory[] | ProductCategory; s?: string }
}) {
    const search = s ?? ''
    const qpCategories = new Set<ProductCategory>(
        Array.isArray(c) ? c : c ? [c] : []
    )
    const productCategories =
        qpCategories.size > 0 ? qpCategories : allCategories
    const isTouched =
        productCategories.size !== allCategories.size || search.length > 0
    const products = await prisma.product.findMany({
        where: {
            category: {
                in: Array.from(productCategories),
            },
            ...(s && { name: { search: s } }),
        },
        take: 100,
        include: {
            _count: {
                select: { vendors: true },
            },
        },
        orderBy: {
            vendors: {
                _count: 'desc',
            },
        },
    })
    return (
        <main className={styles.home}>
            <div className={styles.categories}>
                <ProductCategories selectedCategories={productCategories} />
            </div>
            <div className={styles.products}>
                {products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </main>
    )
}
