import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { z } from 'zod'

import { translator } from '@/lib/uuid'
import styles from '@/styles/product-card.module.css'

import { ProductSchema } from '../../prisma/generated/zod'
import {
    ProductCategorySchema,
    ProductCategoryType as ProductCategory,
} from '../../prisma/generated/zod'
import alcopop from '../../public/alcopop.svg'
import beer from '../../public/beer.svg'
import brandy from '../../public/brandy.svg'
import cider from '../../public/cider.svg'
import gin from '../../public/gin.svg'
import liqueur from '../../public/liqueur.svg'
import other from '../../public/other.svg'
import rum from '../../public/rum.svg'
import tequila from '../../public/tequila.svg'
import vodka from '../../public/vodka.svg'
import whiskey from '../../public/whiskey.svg'
import wine from '../../public/wine.svg'

export const categoryImageMap: Record<
    ProductCategory,
    ComponentProps<typeof Image>['src']
> = {
    [ProductCategorySchema.Enum.ALCOPOP]: alcopop,
    [ProductCategorySchema.Enum.BEER]: beer,
    [ProductCategorySchema.Enum.BRANDY]: brandy,
    [ProductCategorySchema.Enum.CIDER]: cider,
    [ProductCategorySchema.Enum.OTHER]: other,
    [ProductCategorySchema.Enum.GIN]: gin,
    [ProductCategorySchema.Enum.LIQUEUR]: liqueur,
    [ProductCategorySchema.Enum.RUM]: rum,
    [ProductCategorySchema.Enum.TEQUILA]: tequila,
    [ProductCategorySchema.Enum.VODKA]: vodka,
    [ProductCategorySchema.Enum.WHISKEY]: whiskey,
    [ProductCategorySchema.Enum.WINE]: wine,
}

export function ProductCard({
    product,
}: {
    product: z.infer<typeof ProductSchema> &
        Partial<{ _count: { vendors: number } }>
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
