import { ProductCategory } from '@prisma/client'

import ProductCategories from '@/app/daaru/categories'
import Search from '@/app/daaru/search'
import { ProductCard } from '@/components'
import { prisma } from '@/lib/db'

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
