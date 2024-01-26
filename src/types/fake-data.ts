import { faker } from '@faker-js/faker'
import { Entity,ProductCategory, ProductType } from '@prisma/client'
import Decimal from 'decimal.js'

export function fakeVendor() {
    return {
        externalId: faker.lorem.words(5),
        name: faker.person.fullName(),
        address: faker.lorem.words(5),
        productTypes: faker.helpers.arrayElements([
            ProductType.IMPORTED,
            ProductType.INDIAN,
            ProductType.COUNTRY,
        ] as const),
        entity: faker.helpers.arrayElement([
            Entity.DSIIDC,
            Entity.DCCWS,
            Entity.DSCSC,
            Entity.DTTDC,
        ] as const),
        updatedAt: faker.date.anytime(),
        gmapsPlaceId: null,
    }
}
export function fakeVendorComplete() {
    return {
        id: faker.string.uuid(),
        externalId: faker.lorem.words(5),
        name: faker.person.fullName(),
        address: faker.lorem.words(5),
        productTypes: faker.helpers.arrayElements([
            ProductType.IMPORTED,
            ProductType.INDIAN,
            ProductType.COUNTRY,
        ] as const),
        entity: faker.helpers.arrayElement([
            Entity.DSIIDC,
            Entity.DCCWS,
            Entity.DSCSC,
            Entity.DTTDC,
        ] as const),
        createdAt: new Date(),
        updatedAt: faker.date.anytime(),
        gmapsPlaceId: null,
    }
}
export function fakeProduct() {
    return {
        externalKey: faker.number.int(),
        externalId: faker.lorem.words(5),
        name: faker.person.fullName(),
        image: null,
        type: faker.helpers.arrayElement([
            ProductType.IMPORTED,
            ProductType.INDIAN,
            ProductType.COUNTRY,
        ] as const),
        category: faker.helpers.arrayElement([
            ProductCategory.BEER,
            ProductCategory.WINE,
            ProductCategory.CIDER,
            ProductCategory.ALCOPOP,
            ProductCategory.WHISKEY,
            ProductCategory.VODKA,
            ProductCategory.GIN,
            ProductCategory.RUM,
            ProductCategory.TEQUILA,
            ProductCategory.BRANDY,
            ProductCategory.OTHER,
            ProductCategory.LIQUEUR,
        ] as const),
        mrp: faker.number.int(),
        updatedAt: faker.date.anytime(),
        vendorsUpdatedAt: null,
    }
}
export function fakeProductComplete() {
    return {
        id: faker.string.uuid(),
        externalKey: faker.number.int(),
        externalId: faker.lorem.words(5),
        name: faker.person.fullName(),
        image: null,
        type: faker.helpers.arrayElement([
            ProductType.IMPORTED,
            ProductType.INDIAN,
            ProductType.COUNTRY,
        ] as const),
        category: faker.helpers.arrayElement([
            ProductCategory.BEER,
            ProductCategory.WINE,
            ProductCategory.CIDER,
            ProductCategory.ALCOPOP,
            ProductCategory.WHISKEY,
            ProductCategory.VODKA,
            ProductCategory.GIN,
            ProductCategory.RUM,
            ProductCategory.TEQUILA,
            ProductCategory.BRANDY,
            ProductCategory.OTHER,
            ProductCategory.LIQUEUR,
        ] as const),
        mrp: faker.number.int(),
        createdAt: new Date(),
        updatedAt: faker.date.anytime(),
        vendorsUpdatedAt: null,
    }
}
