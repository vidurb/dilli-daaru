import {Product} from '@prisma/client'
import Image from "next/image";
import {ProductCategory} from "@prisma/client";
import {ComponentProps} from "react";
import alcopop from "../../../public/alcopop.svg";
import beer from "../../../public/beer.svg";
import gin from "../../../public/gin.svg";
import vodka from "../../../public/vodka.svg";
import whiskey from "../../../public/whiskey.svg";
import wine from "../../../public/wine.svg";
import {createVendorsByProductRequest} from "@/lib/excise-api";
import Link from "next/link";
import {translator} from "@/lib/uuid";

// TODO: Add images for brandy, country, liqueur, rum, tequila

export const categoryImageMap: Record<ProductCategory, ComponentProps<typeof Image>["src"]> = {
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

export async function ProductCard({product}: { product: Product }) {
    return (
        <div className="bg-white px-4 py-4 rounded shadow-sm ease-in-out duration-200 hover:shadow-md flex m-2">
            <Image
                src={categoryImageMap[product.category]}
                alt={product.category}
                className="border rounded border-solid border-slate-300 inline mr-4"
                width={64}
                height={64}
                priority
            />
            <div>
                <Link className="text-lg pb-1.5 leading-6 block" href={`/daaru/${translator.fromUUID(product.id)}`}>{product.name}</Link>
                <div className="bg-purple-700 text-white rounded inline-block px-1.5 py-0.5 mb-0.5">{product.category}</div>
                {/*<div className="text-slate-500 inline pl-3">0 thekas</div>*/}
            </div>
        </div>

    )
}

export default ProductCard