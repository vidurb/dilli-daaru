import {PrismaClient, Product, Vendor, ProductType, ProductCategory} from '@prisma/client'
import brands from '../brands_21_07_23.json' assert {type: "json"}
import vendors from '../vendors_21_07_23.json' assert {type: "json"}
import {ExciseApiBrand, ExciseApiVendor} from "../src/lib/excise-api";


const prisma = new PrismaClient()

const typeMap: Record<ExciseApiBrand["liquorType"], ProductType> = {
    "Indian Liquor": ProductType.INDIAN,
    "Foreign Liquor": ProductType.IMPORTED,
    "Country Liquor": ProductType.COUNTRY,
}

const categoryMap: Record<ExciseApiBrand["liquorCategory"], ProductCategory> = {
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

async function main() {
    await prisma.product.createMany({
        data: (brands as ExciseApiBrand[]).map((brand: ExciseApiBrand) => {
            return {
                externalKey: brand.brandKey,
                externalId: brand.brandId,
                name: brand.brandName,
                type: typeMap[brand.liquorType],
                category: categoryMap[brand.liquorCategory],
                mrp: brand.mrp,
                vendorsUpdatedAt: null
            }
        })
    })
    await prisma.vendor.createMany({
        data: (vendors as ExciseApiVendor[]).map((vendor: ExciseApiVendor) => {
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
        )
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
