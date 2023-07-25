import {Product, ProductCategory, ProductType, Vendor} from "@prisma/client";

export const authToken = "fb5bc83d-94ce-41c2-b9bb-9f198da0ff7d"

export function createVendorsByProductRequest(product: Product) {
    return new Request("https://delhiexcise.gov.in/api/BrandAPI/searchBrandAvailabilityByKey", {
        headers: {
            "Auth-Token": authToken,
            "BrandKey": product.externalKey.toString(),
        }
    })
}

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



export function mapExciseProduct(product: ExciseApiBrand): Omit<Product, "createdAt" | "updatedAt" | "id" | "image" > {
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

export async function fetchBrands(): Promise<ExciseApiBrand[]> {
    return fetch("https://delhiexcise.gov.in/api/BrandAPI/searchBrandByName", {
        headers: {
            "Auth-Token": "fb5bc83d-94ce-41c2-b9bb-9f198da0ff7d"
        }
    }).then(x => x.json())
}

export async function fetchVendors(): Promise<ExciseApiVendor[]> {
    return fetch("https://delhiexcise.gov.in/api/RetailVendAPI/searchRetailVendByAddress", {
        headers: {
            "Auth-Token": "fb5bc83d-94ce-41c2-b9bb-9f198da0ff7d"
        }
    }).then(x => x.json())
}