"use client";

import Image from "next/image";
import {ProductCategory} from "@prisma/client";
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useState} from "react";
import {title} from 'radash'


function ProductCategorySelect({category, handleSelect, defaultChecked}: {
    category: ProductCategory,
    handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void,
    defaultChecked: boolean
}) {
    return (
        <div className="option"><input type="checkbox" id={category.toLowerCase()} value={category}
                                       defaultChecked={defaultChecked}
                                       onChange={handleSelect}
        /><label
            htmlFor={category.toLowerCase()}>{title(category.toLowerCase())}</label></div>

    )
}

export default function ProductCategories({selectedCategories}: { selectedCategories: ProductCategory[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [categories, setCategories] = useState(new Set<ProductCategory>(selectedCategories ?? []))

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

    useEffect(() => {
        // @ts-ignore: Next has to fix this
        const clonedSearchParams = new URLSearchParams()
        for (const category of Array.from(categories)) {
            clonedSearchParams.append('categories', category)
        }
        if (searchParams.has("search")) {
            clonedSearchParams.set("search", searchParams.get("search")!)
        }
        router.push(`/daaru?${clonedSearchParams.toString()}`)
    }, [categories])

    return (
        <div className="bg-white px-12 py-12 rounded shadow-md">
            <Image
                src="/dd-logo.svg"
                alt="Dilli Daaru"
                className="dark:invert pb-4"
                width={160}
                height={24}
                priority
            />

            <div className="section-title">SOFT</div>
            <ProductCategorySelect category={ProductCategory.WINE} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.WINE)}/>
            <ProductCategorySelect category={ProductCategory.BEER} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.BEER)}/>
            <ProductCategorySelect category={ProductCategory.ALCOPOP} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.ALCOPOP)}/>
            <ProductCategorySelect category={ProductCategory.CIDER} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.CIDER)}/>
            <div className="section-title">HARD</div>
            <ProductCategorySelect category={ProductCategory.GIN} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.RUM)}/>
            <ProductCategorySelect category={ProductCategory.WHISKEY} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.WHISKEY)}/>
            <ProductCategorySelect category={ProductCategory.VODKA} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.VODKA)}/>
            <ProductCategorySelect category={ProductCategory.RUM} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.RUM)}/>
            <ProductCategorySelect category={ProductCategory.TEQUILA} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.TEQUILA)}/>
            <ProductCategorySelect category={ProductCategory.BRANDY} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.BRANDY)}/>
            <div className="section-title">OTHER</div>
            <ProductCategorySelect category={ProductCategory.LIQUEUR} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.LIQUEUR)}/>
            <ProductCategorySelect category={ProductCategory.OTHER} handleSelect={handleSelect}
                                   defaultChecked={categories.has(ProductCategory.OTHER)}/>
            <button onClick={() => {setCategories(new Set<ProductCategory>(Object.values(ProductCategory)))}}>SELECT ALL</button>
            <button onClick={() => {setCategories(new Set<ProductCategory>([]))}}>DESELECT ALL</button>

        </div>
    )
}