import { ProductCategory } from '@prisma/client'

import ProductCategories from '@/app/daaru/categories'
import Search from '@/app/daaru/search'
import { ProductCard } from '@/components'
import { prisma } from '@/lib/db'

const allCategories = new Set<ProductCategory>(Object.values(ProductCategory))

export default async function Daaru({
    searchParams: { categories, search },
}: {
    searchParams: { categories: ProductCategory[]; search?: string }
}) {
    const qpCategories = new Set<ProductCategory>(categories ?? [])
    const productCategories =
        qpCategories.size > 0 ? qpCategories : allCategories
    const products = await prisma.product.findMany({
        where: {
            category: {
                in: Array.from(productCategories),
            },
            ...(search !== undefined && { name: { search: search } }),
        },
        take: productCategories.size === allCategories.size ? 10 : 100,
    })

    return (
        <main className="flex min-h-screen flex-row items-top p-24">
            <ProductCategories selectedCategories={productCategories} />

            <div className="max-w-md mx-auto">
                <Search />
                {products.map((product) => ProductCard({ product }))}
            </div>
        </main>
    )
}
