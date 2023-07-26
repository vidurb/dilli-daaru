"use client";

import Image from "next/image";
import {ProductCategory} from "@prisma/client";
import {useRouter} from 'next/navigation'
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

    const [categories, setCategories] = useState(selectedCategories)

    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            setCategories([...categories, e.target.value as ProductCategory])
        } else {
            setCategories([...categories.filter((category) => category !== e.target.value as ProductCategory)])
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams()
        for (const category of categories) {
            searchParams.append('categories', category)
        }
        router.push(`/daaru?${searchParams.toString()}`)
    }, [categories, router])

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
                                   defaultChecked={categories.includes(ProductCategory.WINE)}/>
            <ProductCategorySelect category={ProductCategory.BEER} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.BEER)}/>
            <ProductCategorySelect category={ProductCategory.ALCOPOP} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.ALCOPOP)}/>
            <ProductCategorySelect category={ProductCategory.CIDER} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.CIDER)}/>
            <div className="section-title">HARD</div>
            <ProductCategorySelect category={ProductCategory.GIN} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.RUM)}/>
            <ProductCategorySelect category={ProductCategory.WHISKEY} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.WHISKEY)}/>
            <ProductCategorySelect category={ProductCategory.VODKA} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.VODKA)}/>
            <ProductCategorySelect category={ProductCategory.RUM} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.RUM)}/>
            <ProductCategorySelect category={ProductCategory.TEQUILA} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.TEQUILA)}/>
            <ProductCategorySelect category={ProductCategory.BRANDY} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.BRANDY)}/>
            <div className="section-title">OTHER</div>
            <ProductCategorySelect category={ProductCategory.LIQUEUR} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.LIQUEUR)}/>
            <ProductCategorySelect category={ProductCategory.OTHER} handleSelect={handleSelect}
                                   defaultChecked={categories.includes(ProductCategory.OTHER)}/>
            <button>SELECT ALL</button>
            <button>DESELECT ALL</button>

        </div>
    )
}