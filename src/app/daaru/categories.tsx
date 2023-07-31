'use client'

import { ProductCategory } from '@prisma/client'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { title } from 'radash'
import { useEffect, useState } from 'react'

import styles from './daaru.module.scss'

function ProductCategorySelect({
    category,
    handleSelect,
    handleOnlySelect,
    defaultChecked,
}: {
    category: ProductCategory
    handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleOnlySelect: (category: ProductCategory) => void
    defaultChecked: boolean
}) {
    return (
        <div className={styles.category}>
            <label
                htmlFor={category.toLowerCase()}
                className={styles.categoryLabel}
            >
                <input
                    type="checkbox"
                    id={category.toLowerCase()}
                    value={category}
                    checked={defaultChecked}
                    onChange={handleSelect}
                />
                {title(category.toLowerCase())}
            </label>
            <button onClick={() => handleOnlySelect(category)}>only</button>
        </div>
    )
}

export default function ProductCategories({
    selectedCategories,
}: {
    selectedCategories: Set<ProductCategory>
}) {
    const router = useRouter()
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
        // @ts-ignore: Next has to fix this
        const clonedSearchParams = new URLSearchParams()
        for (const category of Array.from(categories)) {
            clonedSearchParams.append('c', category)
        }
        if (searchParams.has('s')) {
            clonedSearchParams.set('s', searchParams.get('s')!)
        }
        router.push(`/daaru?${clonedSearchParams.toString()}`)
    }, [categories, router, searchParams])

    return (
        <div className={styles.categoryContainer}>
            <div className={styles.categoryLogoContainer}>
                <Image
                    src="/dd-logo.svg"
                    alt="Dilli Daaru"
                    className={styles.categoryLogo}
                    fill
                    priority
                />
            </div>
            <div className={styles.categorySectionTitle}>SOFT</div>
            <ProductCategorySelect
                category={ProductCategory.WINE}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.WINE)}
            />
            <ProductCategorySelect
                category={ProductCategory.BEER}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.BEER)}
            />
            <ProductCategorySelect
                category={ProductCategory.ALCOPOP}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.ALCOPOP)}
            />
            <ProductCategorySelect
                category={ProductCategory.CIDER}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.CIDER)}
            />
            <div className={styles.categorySectionTitle}>HARD</div>
            <ProductCategorySelect
                category={ProductCategory.GIN}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.RUM)}
            />
            <ProductCategorySelect
                category={ProductCategory.WHISKEY}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.WHISKEY)}
            />
            <ProductCategorySelect
                category={ProductCategory.VODKA}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.VODKA)}
            />
            <ProductCategorySelect
                category={ProductCategory.RUM}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.RUM)}
            />
            <ProductCategorySelect
                category={ProductCategory.TEQUILA}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.TEQUILA)}
            />
            <ProductCategorySelect
                category={ProductCategory.BRANDY}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.BRANDY)}
            />
            <div className={styles.categorySectionTitle}>OTHER</div>
            <ProductCategorySelect
                category={ProductCategory.LIQUEUR}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.LIQUEUR)}
            />
            <ProductCategorySelect
                category={ProductCategory.OTHER}
                handleSelect={handleSelect}
                handleOnlySelect={handleOnlySelect}
                defaultChecked={categories.has(ProductCategory.OTHER)}
            />
            <button
                onClick={() => {
                    setCategories(
                        new Set<ProductCategory>(Object.values(ProductCategory))
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
