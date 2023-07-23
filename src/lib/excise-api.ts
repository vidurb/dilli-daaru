import {Product} from "@prisma/client";

const authToken = "fb5bc83d-94ce-41c2-b9bb-9f198da0ff7d"

export function createVendorsByProductRequest(product: Product) {
    return new Request("https://delhiexcise.gov.in/api/BrandAPI/searchBrandAvailabilityByKey", {
        headers: {
            "Auth-Token": authToken,
            "BrandKey": product.externalKey.toString(),
        }
    })
}