import { Product, Vendor } from '@prisma/client'
import { ProductCategory } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'

import { translator } from '@/lib/uuid'

import alcopop from '../../../public/alcopop.svg'
import beer from '../../../public/beer.svg'
import brandy from '../../../public/brandy.svg'
import cider from '../../../public/cider.svg'
import country from '../../../public/country.svg'
import gin from '../../../public/gin.svg'
import liqueur from '../../../public/liqueur.svg'
import other from '../../../public/other.svg'
import rum from '../../../public/rum.svg'
import tequila from '../../../public/tequila.svg'
import vodka from '../../../public/vodka.svg'
import whiskey from '../../../public/whiskey.svg'
import wine from '../../../public/wine.svg'
import styles from './daaru.module.scss'

// TODO: Add images for country
// TODO: Set up a list of colors for each product category pill - Gyan will find TW colors.

export const categoryImageMap: Record<
    ProductCategory,
    ComponentProps<typeof Image>['src']
> = {
    [ProductCategory.ALCOPOP]: alcopop,
    [ProductCategory.BEER]: beer,
    [ProductCategory.BRANDY]: brandy,
    [ProductCategory.CIDER]: cider,
    [ProductCategory.COUNTRY]: country,
    [ProductCategory.OTHER]: other,
    [ProductCategory.GIN]: gin,
    [ProductCategory.LIQUEUR]: liqueur,
    [ProductCategory.RUM]: rum,
    [ProductCategory.TEQUILA]: tequila,
    [ProductCategory.VODKA]: vodka,
    [ProductCategory.WHISKEY]: whiskey,
    [ProductCategory.WINE]: wine,
}

export async function ProductCard({
    product,
}: {
    product: Product & Partial<{ _count: { vendors: number } }>
}) {
    return (
        <div className={styles.productCard}>
            <Image
                src={categoryImageMap[product.category]}
                alt={product.category}
                className={styles.productCategoryImage}
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
                {product._count && (
                    <div className={styles.productCardText}>
                        {product._count.vendors} thekas
                    </div>
                )}
                {product.mrp > 0 && (
                    <div className={`text-yellow-800`}>
                        ₹{product.mrp.toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCard
