import { Product, Vendor } from '@prisma/client'
import { ProductCategory } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'

import { translator } from '@/lib/uuid'

import alcopop from '../../../public/alcopop.svg'
import beer from '../../../public/beer.svg'
import gin from '../../../public/gin.svg'
import vodka from '../../../public/vodka.svg'
import whiskey from '../../../public/whiskey.svg'
import wine from '../../../public/wine.svg'
import styles from './daaru.module.scss'

// TODO: Add images for brandy, country, liqueur, rum, tequila

export const categoryImageMap: Record<
    ProductCategory,
    ComponentProps<typeof Image>['src']
> = {
    [ProductCategory.ALCOPOP]: alcopop,
    [ProductCategory.BEER]: beer,
    [ProductCategory.BRANDY]: wine,
    [ProductCategory.CIDER]: beer,
    [ProductCategory.OTHER]: beer,
    [ProductCategory.GIN]: gin,
    [ProductCategory.LIQUEUR]: beer,
    [ProductCategory.RUM]: beer,
    [ProductCategory.TEQUILA]: beer,
    [ProductCategory.VODKA]: vodka,
    [ProductCategory.WHISKEY]: whiskey,
    [ProductCategory.WINE]: wine,
}

export async function ProductCard({
    product,
}: {
    product: Product & { vendors?: Vendor[] }
}) {
    return (
        <div className={styles.productCard}>
            <Image
                src={categoryImageMap[product.category]}
                alt={product.category}
                className="border rounded border-solid border-slate-300 inline mr-4"
                width={64}
                height={64}
                priority
            />
            <div>
                <Link
                    className={styles.productTitle}
                    href={`/daaru/${translator.fromUUID(product.id)}`}
                >
                    {product.name}
                </Link>
                <div className={styles.productCategoryPill}>
                    {product.category}
                </div>
                {product.vendors && (
                    <div className={styles.productCardText}>
                        {product.vendors?.length ?? 0} thekas
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCard
