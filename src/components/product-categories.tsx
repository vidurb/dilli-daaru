'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ProductCategorySelect } from '@/components/product-category-select'
import styles from '@/styles/product-categories.module.css'

import {
    ProductCategorySchema,
    ProductCategoryType as ProductCategory,
} from '../../prisma/generated/zod'

export function ProductCategories({
    selectedCategories,
}: {
    selectedCategories: Set<ProductCategory> | Array<ProductCategory>
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [categories, setCategories] = useState(
        new Set<ProductCategory>(selectedCategories ?? [])
    )

    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            const newCategories = new Set(categories)
            newCategories.add(e.target.value as ProductCategory)
            setCategories(newCategories)
        } else {
            const newCategories = new Set(categories)
            newCategories.delete(e.target.value as ProductCategory)
            setCategories(newCategories)
        }
    }

    function handleOnlySelect(category: ProductCategory) {
        const newCategories = new Set<ProductCategory>([category])
        setCategories(newCategories)
    }

    useEffect(() => {
        const clonedSearchParams = new URLSearchParams(
            searchParams as unknown as URLSearchParams
        )
        clonedSearchParams.delete('c')
        for (const category of Array.from(categories)) {
            clonedSearchParams.append('c', category)
        }
        router.replace(`${pathname}?${clonedSearchParams.toString()}`)
    }, [categories, router, searchParams, pathname])

    return (
        <div className={styles.categoryContainer}>
            <div className={styles.categorySectionTitle}>SOFT</div>
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.WINE}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategorySchema.Enum.WINE)}
            />
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.BEER}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategorySchema.Enum.BEER)}
            />
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.ALCOPOP}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(
                    ProductCategorySchema.Enum.ALCOPOP
                )}
            />
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.CIDER}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(
                    ProductCategorySchema.Enum.CIDER
                )}
            />
            <div className={styles.categorySectionTitle}>HARD</div>
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.GIN}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategorySchema.Enum.GIN)}
            />
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.WHISKEY}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(
                    ProductCategorySchema.Enum.WHISKEY
                )}
            />
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.VODKA}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(
                    ProductCategorySchema.Enum.VODKA
                )}
            />
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.RUM}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategorySchema.Enum.RUM)}
            />
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.TEQUILA}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(
                    ProductCategorySchema.Enum.TEQUILA
                )}
            />
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.BRANDY}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(
                    ProductCategorySchema.Enum.BRANDY
                )}
            />
            <div className={styles.categorySectionTitle}>OTHER</div>
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.LIQUEUR}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(
                    ProductCategorySchema.Enum.LIQUEUR
                )}
            />
            <ProductCategorySelect
                category={ProductCategorySchema.Enum.OTHER}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(
                    ProductCategorySchema.Enum.OTHER
                )}
            />
            <button
                onClick={() => {
                    setCategories(
                        new Set<ProductCategory>(
                            Object.values(ProductCategorySchema.Enum)
                        )
                    )
                }}
                className={styles.categoryButton}
            >
                SELECT ALL
            </button>
            <button
                onClick={() => {
                    setCategories(new Set<ProductCategory>([]))
                }}
                className={styles.categoryButton}
            >
                DESELECT ALL
            </button>
        </div>
    )
}
