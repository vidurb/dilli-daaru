import {PrismaClient, Product, ProductCategory, ProductType, Vendor} from '@prisma/client'
import brands from '../brands_21_07_23.json' assert {type: "json"}
import vendors from '../vendors_21_07_23.json' assert {type: "json"}

export const typeMap: Record<ExciseApiBrand["liquorType"], ProductType> = {
    "Indian Liquor": ProductType.INDIAN,
    "Foreign Liquor": ProductType.IMPORTED,
    "Country Liquor": ProductType.COUNTRY,
}

export const categoryMap: Record<ExciseApiBrand["liquorCategory"], ProductCategory> = {
    "Alcopop": ProductCategory.ALCOPOP,
    "Beer": ProductCategory.BEER,
    "Brandy": ProductCategory.BRANDY,
    "Country Liquor": ProductCategory.OTHER,
    "Draught Beer": ProductCategory.BEER,
    "Gin": ProductCategory.GIN,
    "Liqueur": ProductCategory.LIQUEUR,
    "Mixed Alcoholic Beverages": ProductCategory.ALCOPOP,
    "Rum": ProductCategory.RUM,
    "Vodka": ProductCategory.VODKA,
    "Whisky": ProductCategory.WHISKEY,
    "Wine": ProductCategory.WINE,
}


export type ExciseApiBrand = {
    brandKey: number
    brandId: string
    brandName: string
    liquorType: "Indian Liquor" | "Foreign Liquor" | "Country Liquor"
    liquorCategory: "Alcopop" | "Beer" | "Brandy" | "Country Liquor" | "Draught Beer" | "Gin" | "Liqueur" | "Mixed Alcoholic Beverages" | "Rum" | "Vodka" | "Whisky" | "Wine"
    warehouse: string
    status: "Y"
    brandAvailabilityDate: Date | null
    mrp: number
}

export type ExciseApiVendor = {
    vendId: string
    entityName: string
    entityType: "Corporation Vend"
    licenceId: string
    timing: string
    entityAddress: string
    district: "CENTRAL DELHI" | "EAST DELHI" | "NEW DELHI" | "NORTH DELHI" | "NORTH EAST DELHI" | "NORTH WEST DELHI" | "SOUTH DELHI" | "SOUTH WEST DELHI" | "WEST DELHI"
    serveForeignLiquor: "Y" | "N"
    clFlag: "Y" | "N"
    ilFlag: "Y" | "N"
    flFlag: "Y" | "N"
    liquorType: "CL" | "IL" | "IL,CL" | "IL,FL"
    entitySubTye: "DSIIDC" | "DCCWS" | "DSCSC" | "DTTDC"
    brandAvailibilty: []
}

export function mapExciseProduct(product: ExciseApiBrand): Omit<Product, "createdAt" | "updatedAt" | "id" | "image"> {
    return {
        externalId: product.brandId,
        externalKey: product.brandKey,
        name: product.brandName,
        type: typeMap[product.liquorType],
        category: categoryMap[product.liquorCategory],
        mrp: product.mrp,
        vendorsUpdatedAt: null
    }
}

export function mapExciseVendor(vendor: ExciseApiVendor): Omit<Vendor, "createdAt" | "updatedAt" | "id"> {
    const productTypes: ProductType[] = []
    if (vendor.clFlag === "Y") productTypes.push(ProductType.COUNTRY)
    if (vendor.ilFlag === "Y") productTypes.push(ProductType.IMPORTED)
    if (vendor.flFlag === "Y") productTypes.push(ProductType.IMPORTED)

    return {
        externalId: vendor.vendId,
        name: vendor.entityName,
        address: vendor.entityAddress,
        productTypes,
        entity: vendor.entitySubTye
    }
}


const prisma = new PrismaClient()

async function main() {
    await prisma.product.createMany({
        data: (brands as ExciseApiBrand[]).map(mapExciseProduct)
    })
    await prisma.vendor.createMany({
        data: (vendors as ExciseApiVendor[]).map(mapExciseVendor)
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
