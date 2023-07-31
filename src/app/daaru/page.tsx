import { ProductCategory } from '@prisma/client'
import { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'

import ProductCategories from '@/app/daaru/categories'
import ProductCard from '@/app/daaru/product-card'
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
            ...(s && { name: { search: s } }),
        },
        take: productCategories.size === allCategories.size ? 10 : 100,

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
        <main className={styles.mainContainer}>
            <Suspense
                fallback={
                    <div className="rounded shadow-md w-full max-w-xs">
                        <Skeleton className={'w-full h-full'} />
                    </div>
                }
            >
                <ProductCategories
                    selectedCategories={productCategories}
                    path={'daaru'}
                />
            </Suspense>
            <div className={styles.dataContainer}>
                <Suspense fallback={<Skeleton className={'h-12 mx-2'} />}>
                    <Search path={`daaru`} placeholder={`What's your fix?`} />
                </Suspense>
                {products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </main>
    )
}
