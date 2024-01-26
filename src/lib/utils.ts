import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import {
    ProductCategorySchema,
    ProductCategoryType,
} from '../../prisma/generated/zod'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)
dayjs.tz.setDefault('Asia/Kolkata')

export function areVendorsOpen() {
    return dayjs
        .tz()
        .isBetween(
            dayjs.tz().set('hour', 10).set('minute', 0).set('second', 0),
            dayjs.tz().set('hour', 22).set('minute', 0).set('second', 0)
        )
}

const categorySynonyms = {
    [ProductCategorySchema.Enum.WHISKEY]: ['whisky', 'whiskey'],
    [ProductCategorySchema.Enum.VODKA]: ['vodka'],
    [ProductCategorySchema.Enum.ALCOPOP]: [],
    [ProductCategorySchema.Enum.RUM]: ['rum'],
    [ProductCategorySchema.Enum.GIN]: ['gin'],
    [ProductCategorySchema.Enum.BEER]: ['beer'],
    [ProductCategorySchema.Enum.WINE]: ['wine'],
    [ProductCategorySchema.Enum.CIDER]: ['cider'],
    [ProductCategorySchema.Enum.OTHER]: ['other'],
    [ProductCategorySchema.Enum.BRANDY]: ['brandy'],
    [ProductCategorySchema.Enum.TEQUILA]: ['tequila'],
    [ProductCategorySchema.Enum.LIQUEUR]: ['liqueur'],
}

export function cleanProductName(
    productName: string,
    productCategory: ProductCategoryType
) {
    let cleanedProductName = productName.toLowerCase()
    for (const category of categorySynonyms[productCategory]) {
        cleanedProductName = cleanedProductName.replace(category, '')
    }
    return cleanedProductName.trim()
}
