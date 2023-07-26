import Image from 'next/image'
import {ProductCategory} from "@prisma/client";
import {prisma} from "@/lib/db";
import {ProductCard} from "@/components";
import ProductCategories from "@/app/daaru/categories";

interface ProductSearchParams {
    category: ProductCategory[],
    searchString?: string
}

const defaultSearchParams: ProductSearchParams = {
    category: Object.values(ProductCategory),
}


export default async function Daaru({searchParams: {categories, search}}: {
    searchParams: { categories: ProductCategory[], search?: string }
}) {
    const productCategories = Array.isArray(categories) && categories.length > 0 ? categories : defaultSearchParams.category
    const products = await prisma.product.findMany({
        where: {
            category: {
                in: productCategories
            },
            ...(search !== undefined && {name: {search: search}})
        }
    })

    return (


        <main className="flex min-h-screen flex-row items-top p-24">

            <ProductCategories selectedCategories={productCategories}/>

            <div className='max-w-md mx-auto'>
                <div
                    className="relative flex items-center w-full h-12 rounded-md shadow-sm focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>

                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="What's your fix?"/>

                </div>
                {products.map((product) => ProductCard({product}))}
            </div>
        </main>
    )
}
