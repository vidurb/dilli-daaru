import type { Prisma } from '@prisma/client'
import { z } from 'zod'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
    'ReadUncommitted',
    'ReadCommitted',
    'RepeatableRead',
    'Serializable',
])

export const VendorScalarFieldEnumSchema = z.enum([
    'id',
    'externalId',
    'name',
    'address',
    'productTypes',
    'entity',
    'createdAt',
    'updatedAt',
    'gmapsPlaceId',
])

export const ProductScalarFieldEnumSchema = z.enum([
    'id',
    'externalKey',
    'externalId',
    'name',
    'image',
    'type',
    'category',
    'mrp',
    'createdAt',
    'updatedAt',
    'vendorsUpdatedAt',
])

export const SortOrderSchema = z.enum(['asc', 'desc'])

export const QueryModeSchema = z.enum(['default', 'insensitive'])

export const NullsOrderSchema = z.enum(['first', 'last'])

export const VendorOrderByRelevanceFieldEnumSchema = z.enum([
    'id',
    'externalId',
    'name',
    'address',
    'gmapsPlaceId',
])

export const ProductOrderByRelevanceFieldEnumSchema = z.enum([
    'id',
    'externalId',
    'name',
    'image',
])

export const ProductTypeSchema = z.enum(['IMPORTED', 'INDIAN', 'COUNTRY'])

export type ProductTypeType = `${z.infer<typeof ProductTypeSchema>}`

export const ProductCategorySchema = z.enum([
    'BEER',
    'WINE',
    'CIDER',
    'ALCOPOP',
    'WHISKEY',
    'VODKA',
    'GIN',
    'RUM',
    'TEQUILA',
    'BRANDY',
    'OTHER',
    'LIQUEUR',
])

export type ProductCategoryType = `${z.infer<typeof ProductCategorySchema>}`

export const EntitySchema = z.enum(['DSIIDC', 'DCCWS', 'DSCSC', 'DTTDC'])

export type EntityType = `${z.infer<typeof EntitySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// VENDOR SCHEMA
/////////////////////////////////////////

export const VendorSchema = z.object({
    productTypes: ProductTypeSchema.array(),
    entity: EntitySchema,
    id: z.string().uuid(),
    externalId: z.string(),
    name: z.string(),
    address: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    gmapsPlaceId: z.string().nullable(),
})

export type Vendor = z.infer<typeof VendorSchema>

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
    type: ProductTypeSchema,
    category: ProductCategorySchema,
    id: z.string().uuid(),
    externalKey: z.number().int(),
    externalId: z.string(),
    name: z.string(),
    image: z.string().nullable(),
    mrp: z.number().int(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    vendorsUpdatedAt: z.coerce.date().nullable(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// VENDOR
//------------------------------------------------------

export const VendorIncludeSchema: z.ZodType<Prisma.VendorInclude> = z
    .object({
        products: z
            .union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([z.boolean(), z.lazy(() => VendorCountOutputTypeArgsSchema)])
            .optional(),
    })
    .strict()

export const VendorArgsSchema: z.ZodType<Prisma.VendorDefaultArgs> = z
    .object({
        select: z.lazy(() => VendorSelectSchema).optional(),
        include: z.lazy(() => VendorIncludeSchema).optional(),
    })
    .strict()

export const VendorCountOutputTypeArgsSchema: z.ZodType<Prisma.VendorCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z.lazy(() => VendorCountOutputTypeSelectSchema).nullish(),
        })
        .strict()

export const VendorCountOutputTypeSelectSchema: z.ZodType<Prisma.VendorCountOutputTypeSelect> =
    z
        .object({
            products: z.boolean().optional(),
        })
        .strict()

export const VendorSelectSchema: z.ZodType<Prisma.VendorSelect> = z
    .object({
        id: z.boolean().optional(),
        externalId: z.boolean().optional(),
        name: z.boolean().optional(),
        address: z.boolean().optional(),
        productTypes: z.boolean().optional(),
        entity: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        updatedAt: z.boolean().optional(),
        gmapsPlaceId: z.boolean().optional(),
        products: z
            .union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([z.boolean(), z.lazy(() => VendorCountOutputTypeArgsSchema)])
            .optional(),
    })
    .strict()

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z
    .object({
        vendors: z
            .union([z.boolean(), z.lazy(() => VendorFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => ProductCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict()

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z
    .object({
        select: z.lazy(() => ProductSelectSchema).optional(),
        include: z.lazy(() => ProductIncludeSchema).optional(),
    })
    .strict()

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
        })
        .strict()

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> =
    z
        .object({
            vendors: z.boolean().optional(),
        })
        .strict()

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z
    .object({
        id: z.boolean().optional(),
        externalKey: z.boolean().optional(),
        externalId: z.boolean().optional(),
        name: z.boolean().optional(),
        image: z.boolean().optional(),
        type: z.boolean().optional(),
        category: z.boolean().optional(),
        mrp: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        updatedAt: z.boolean().optional(),
        vendorsUpdatedAt: z.boolean().optional(),
        vendors: z
            .union([z.boolean(), z.lazy(() => VendorFindManyArgsSchema)])
            .optional(),
        _count: z
            .union([
                z.boolean(),
                z.lazy(() => ProductCountOutputTypeArgsSchema),
            ])
            .optional(),
    })
    .strict()

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const VendorWhereInputSchema: z.ZodType<Prisma.VendorWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => VendorWhereInputSchema),
                z.lazy(() => VendorWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => VendorWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => VendorWhereInputSchema),
                z.lazy(() => VendorWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        externalId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        address: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        productTypes: z
            .lazy(() => EnumProductTypeNullableListFilterSchema)
            .optional(),
        entity: z
            .union([
                z.lazy(() => EnumEntityFilterSchema),
                z.lazy(() => EntitySchema),
            ])
            .optional(),
        createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        gmapsPlaceId: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        products: z.lazy(() => ProductListRelationFilterSchema).optional(),
    })
    .strict()

export const VendorOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.VendorOrderByWithRelationAndSearchRelevanceInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
            productTypes: z.lazy(() => SortOrderSchema).optional(),
            entity: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            gmapsPlaceId: z
                .union([
                    z.lazy(() => SortOrderSchema),
                    z.lazy(() => SortOrderInputSchema),
                ])
                .optional(),
            products: z
                .lazy(() => ProductOrderByRelationAggregateInputSchema)
                .optional(),
            _relevance: z
                .lazy(() => VendorOrderByRelevanceInputSchema)
                .optional(),
        })
        .strict()

export const VendorWhereUniqueInputSchema: z.ZodType<Prisma.VendorWhereUniqueInput> =
    z
        .union([
            z.object({
                id: z.string().uuid(),
                externalId: z.string(),
            }),
            z.object({
                id: z.string().uuid(),
            }),
            z.object({
                externalId: z.string(),
            }),
        ])
        .and(
            z
                .object({
                    id: z.string().uuid().optional(),
                    externalId: z.string().optional(),
                    AND: z
                        .union([
                            z.lazy(() => VendorWhereInputSchema),
                            z.lazy(() => VendorWhereInputSchema).array(),
                        ])
                        .optional(),
                    OR: z
                        .lazy(() => VendorWhereInputSchema)
                        .array()
                        .optional(),
                    NOT: z
                        .union([
                            z.lazy(() => VendorWhereInputSchema),
                            z.lazy(() => VendorWhereInputSchema).array(),
                        ])
                        .optional(),
                    name: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    address: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    productTypes: z
                        .lazy(() => EnumProductTypeNullableListFilterSchema)
                        .optional(),
                    entity: z
                        .union([
                            z.lazy(() => EnumEntityFilterSchema),
                            z.lazy(() => EntitySchema),
                        ])
                        .optional(),
                    createdAt: z
                        .union([
                            z.lazy(() => DateTimeFilterSchema),
                            z.coerce.date(),
                        ])
                        .optional(),
                    updatedAt: z
                        .union([
                            z.lazy(() => DateTimeFilterSchema),
                            z.coerce.date(),
                        ])
                        .optional(),
                    gmapsPlaceId: z
                        .union([
                            z.lazy(() => StringNullableFilterSchema),
                            z.string(),
                        ])
                        .optional()
                        .nullable(),
                    products: z
                        .lazy(() => ProductListRelationFilterSchema)
                        .optional(),
                })
                .strict()
        )

export const VendorOrderByWithAggregationInputSchema: z.ZodType<Prisma.VendorOrderByWithAggregationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
            productTypes: z.lazy(() => SortOrderSchema).optional(),
            entity: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            gmapsPlaceId: z
                .union([
                    z.lazy(() => SortOrderSchema),
                    z.lazy(() => SortOrderInputSchema),
                ])
                .optional(),
            _count: z
                .lazy(() => VendorCountOrderByAggregateInputSchema)
                .optional(),
            _max: z.lazy(() => VendorMaxOrderByAggregateInputSchema).optional(),
            _min: z.lazy(() => VendorMinOrderByAggregateInputSchema).optional(),
        })
        .strict()

export const VendorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VendorScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => VendorScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(() => VendorScalarWhereWithAggregatesInputSchema)
                        .array(),
                ])
                .optional(),
            OR: z
                .lazy(() => VendorScalarWhereWithAggregatesInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => VendorScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(() => VendorScalarWhereWithAggregatesInputSchema)
                        .array(),
                ])
                .optional(),
            id: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            externalId: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            name: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            address: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            productTypes: z
                .lazy(() => EnumProductTypeNullableListFilterSchema)
                .optional(),
            entity: z
                .union([
                    z.lazy(() => EnumEntityWithAggregatesFilterSchema),
                    z.lazy(() => EntitySchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.lazy(() => DateTimeWithAggregatesFilterSchema),
                    z.coerce.date(),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.lazy(() => DateTimeWithAggregatesFilterSchema),
                    z.coerce.date(),
                ])
                .optional(),
            gmapsPlaceId: z
                .union([
                    z.lazy(() => StringNullableWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ProductWhereInputSchema),
                z.lazy(() => ProductWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ProductWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ProductWhereInputSchema),
                z.lazy(() => ProductWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        externalKey: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        externalId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        image: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        type: z
            .union([
                z.lazy(() => EnumProductTypeFilterSchema),
                z.lazy(() => ProductTypeSchema),
            ])
            .optional(),
        category: z
            .union([
                z.lazy(() => EnumProductCategoryFilterSchema),
                z.lazy(() => ProductCategorySchema),
            ])
            .optional(),
        mrp: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        vendorsUpdatedAt: z
            .union([
                z.lazy(() => DateTimeNullableFilterSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
        vendors: z.lazy(() => VendorListRelationFilterSchema).optional(),
    })
    .strict()

export const ProductOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationAndSearchRelevanceInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalKey: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            image: z
                .union([
                    z.lazy(() => SortOrderSchema),
                    z.lazy(() => SortOrderInputSchema),
                ])
                .optional(),
            type: z.lazy(() => SortOrderSchema).optional(),
            category: z.lazy(() => SortOrderSchema).optional(),
            mrp: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            vendorsUpdatedAt: z
                .union([
                    z.lazy(() => SortOrderSchema),
                    z.lazy(() => SortOrderInputSchema),
                ])
                .optional(),
            vendors: z
                .lazy(() => VendorOrderByRelationAggregateInputSchema)
                .optional(),
            _relevance: z
                .lazy(() => ProductOrderByRelevanceInputSchema)
                .optional(),
        })
        .strict()

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> =
    z
        .union([
            z.object({
                id: z.string().uuid(),
                externalKey: z.number().int(),
            }),
            z.object({
                id: z.string().uuid(),
            }),
            z.object({
                externalKey: z.number().int(),
            }),
        ])
        .and(
            z
                .object({
                    id: z.string().uuid().optional(),
                    externalKey: z.number().int().optional(),
                    AND: z
                        .union([
                            z.lazy(() => ProductWhereInputSchema),
                            z.lazy(() => ProductWhereInputSchema).array(),
                        ])
                        .optional(),
                    OR: z
                        .lazy(() => ProductWhereInputSchema)
                        .array()
                        .optional(),
                    NOT: z
                        .union([
                            z.lazy(() => ProductWhereInputSchema),
                            z.lazy(() => ProductWhereInputSchema).array(),
                        ])
                        .optional(),
                    externalId: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    name: z
                        .union([z.lazy(() => StringFilterSchema), z.string()])
                        .optional(),
                    image: z
                        .union([
                            z.lazy(() => StringNullableFilterSchema),
                            z.string(),
                        ])
                        .optional()
                        .nullable(),
                    type: z
                        .union([
                            z.lazy(() => EnumProductTypeFilterSchema),
                            z.lazy(() => ProductTypeSchema),
                        ])
                        .optional(),
                    category: z
                        .union([
                            z.lazy(() => EnumProductCategoryFilterSchema),
                            z.lazy(() => ProductCategorySchema),
                        ])
                        .optional(),
                    mrp: z
                        .union([
                            z.lazy(() => IntFilterSchema),
                            z.number().int(),
                        ])
                        .optional(),
                    createdAt: z
                        .union([
                            z.lazy(() => DateTimeFilterSchema),
                            z.coerce.date(),
                        ])
                        .optional(),
                    updatedAt: z
                        .union([
                            z.lazy(() => DateTimeFilterSchema),
                            z.coerce.date(),
                        ])
                        .optional(),
                    vendorsUpdatedAt: z
                        .union([
                            z.lazy(() => DateTimeNullableFilterSchema),
                            z.coerce.date(),
                        ])
                        .optional()
                        .nullable(),
                    vendors: z
                        .lazy(() => VendorListRelationFilterSchema)
                        .optional(),
                })
                .strict()
        )

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalKey: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            image: z
                .union([
                    z.lazy(() => SortOrderSchema),
                    z.lazy(() => SortOrderInputSchema),
                ])
                .optional(),
            type: z.lazy(() => SortOrderSchema).optional(),
            category: z.lazy(() => SortOrderSchema).optional(),
            mrp: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            vendorsUpdatedAt: z
                .union([
                    z.lazy(() => SortOrderSchema),
                    z.lazy(() => SortOrderInputSchema),
                ])
                .optional(),
            _count: z
                .lazy(() => ProductCountOrderByAggregateInputSchema)
                .optional(),
            _avg: z
                .lazy(() => ProductAvgOrderByAggregateInputSchema)
                .optional(),
            _max: z
                .lazy(() => ProductMaxOrderByAggregateInputSchema)
                .optional(),
            _min: z
                .lazy(() => ProductMinOrderByAggregateInputSchema)
                .optional(),
            _sum: z
                .lazy(() => ProductSumOrderByAggregateInputSchema)
                .optional(),
        })
        .strict()

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(() => ProductScalarWhereWithAggregatesInputSchema)
                        .array(),
                ])
                .optional(),
            OR: z
                .lazy(() => ProductScalarWhereWithAggregatesInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),
                    z
                        .lazy(() => ProductScalarWhereWithAggregatesInputSchema)
                        .array(),
                ])
                .optional(),
            id: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            externalKey: z
                .union([
                    z.lazy(() => IntWithAggregatesFilterSchema),
                    z.number(),
                ])
                .optional(),
            externalId: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            name: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional(),
            image: z
                .union([
                    z.lazy(() => StringNullableWithAggregatesFilterSchema),
                    z.string(),
                ])
                .optional()
                .nullable(),
            type: z
                .union([
                    z.lazy(() => EnumProductTypeWithAggregatesFilterSchema),
                    z.lazy(() => ProductTypeSchema),
                ])
                .optional(),
            category: z
                .union([
                    z.lazy(() => EnumProductCategoryWithAggregatesFilterSchema),
                    z.lazy(() => ProductCategorySchema),
                ])
                .optional(),
            mrp: z
                .union([
                    z.lazy(() => IntWithAggregatesFilterSchema),
                    z.number(),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.lazy(() => DateTimeWithAggregatesFilterSchema),
                    z.coerce.date(),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.lazy(() => DateTimeWithAggregatesFilterSchema),
                    z.coerce.date(),
                ])
                .optional(),
            vendorsUpdatedAt: z
                .union([
                    z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
                    z.coerce.date(),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const VendorCreateInputSchema: z.ZodType<Prisma.VendorCreateInput> = z
    .object({
        id: z.string().uuid().optional(),
        externalId: z.string(),
        name: z.string(),
        address: z.string(),
        productTypes: z
            .union([
                z.lazy(() => VendorCreateproductTypesInputSchema),
                z.lazy(() => ProductTypeSchema).array(),
            ])
            .optional(),
        entity: z.lazy(() => EntitySchema),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
        gmapsPlaceId: z.string().optional().nullable(),
        products: z
            .lazy(() => ProductCreateNestedManyWithoutVendorsInputSchema)
            .optional(),
    })
    .strict()

export const VendorUncheckedCreateInputSchema: z.ZodType<Prisma.VendorUncheckedCreateInput> =
    z
        .object({
            id: z.string().uuid().optional(),
            externalId: z.string(),
            name: z.string(),
            address: z.string(),
            productTypes: z
                .union([
                    z.lazy(() => VendorCreateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z.lazy(() => EntitySchema),
            createdAt: z.coerce.date().optional(),
            updatedAt: z.coerce.date().optional(),
            gmapsPlaceId: z.string().optional().nullable(),
            products: z
                .lazy(
                    () =>
                        ProductUncheckedCreateNestedManyWithoutVendorsInputSchema
                )
                .optional(),
        })
        .strict()

export const VendorUpdateInputSchema: z.ZodType<Prisma.VendorUpdateInput> = z
    .object({
        id: z
            .union([
                z.string().uuid(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        externalId: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        address: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        productTypes: z
            .union([
                z.lazy(() => VendorUpdateproductTypesInputSchema),
                z.lazy(() => ProductTypeSchema).array(),
            ])
            .optional(),
        entity: z
            .union([
                z.lazy(() => EntitySchema),
                z.lazy(() => EnumEntityFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        createdAt: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        updatedAt: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        gmapsPlaceId: z
            .union([
                z.string(),
                z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        products: z
            .lazy(() => ProductUpdateManyWithoutVendorsNestedInputSchema)
            .optional(),
    })
    .strict()

export const VendorUncheckedUpdateInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            productTypes: z
                .union([
                    z.lazy(() => VendorUpdateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z
                .union([
                    z.lazy(() => EntitySchema),
                    z.lazy(() => EnumEntityFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            gmapsPlaceId: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
            products: z
                .lazy(
                    () =>
                        ProductUncheckedUpdateManyWithoutVendorsNestedInputSchema
                )
                .optional(),
        })
        .strict()

export const VendorCreateManyInputSchema: z.ZodType<Prisma.VendorCreateManyInput> =
    z
        .object({
            id: z.string().uuid().optional(),
            externalId: z.string(),
            name: z.string(),
            address: z.string(),
            productTypes: z
                .union([
                    z.lazy(() => VendorCreateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z.lazy(() => EntitySchema),
            createdAt: z.coerce.date().optional(),
            updatedAt: z.coerce.date().optional(),
            gmapsPlaceId: z.string().optional().nullable(),
        })
        .strict()

export const VendorUpdateManyMutationInputSchema: z.ZodType<Prisma.VendorUpdateManyMutationInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            productTypes: z
                .union([
                    z.lazy(() => VendorUpdateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z
                .union([
                    z.lazy(() => EntitySchema),
                    z.lazy(() => EnumEntityFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            gmapsPlaceId: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const VendorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateManyInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            productTypes: z
                .union([
                    z.lazy(() => VendorUpdateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z
                .union([
                    z.lazy(() => EntitySchema),
                    z.lazy(() => EnumEntityFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            gmapsPlaceId: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z
    .object({
        id: z.string().uuid().optional(),
        externalKey: z.number().int(),
        externalId: z.string(),
        name: z.string(),
        image: z.string().optional().nullable(),
        type: z.lazy(() => ProductTypeSchema),
        category: z.lazy(() => ProductCategorySchema),
        mrp: z.number().int(),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
        vendorsUpdatedAt: z.coerce.date().optional().nullable(),
        vendors: z
            .lazy(() => VendorCreateNestedManyWithoutProductsInputSchema)
            .optional(),
    })
    .strict()

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> =
    z
        .object({
            id: z.string().uuid().optional(),
            externalKey: z.number().int(),
            externalId: z.string(),
            name: z.string(),
            image: z.string().optional().nullable(),
            type: z.lazy(() => ProductTypeSchema),
            category: z.lazy(() => ProductCategorySchema),
            mrp: z.number().int(),
            createdAt: z.coerce.date().optional(),
            updatedAt: z.coerce.date().optional(),
            vendorsUpdatedAt: z.coerce.date().optional().nullable(),
            vendors: z
                .lazy(
                    () =>
                        VendorUncheckedCreateNestedManyWithoutProductsInputSchema
                )
                .optional(),
        })
        .strict()

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z
    .object({
        id: z
            .union([
                z.string().uuid(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        externalKey: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        externalId: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        image: z
            .union([
                z.string(),
                z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        type: z
            .union([
                z.lazy(() => ProductTypeSchema),
                z.lazy(() => EnumProductTypeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        category: z
            .union([
                z.lazy(() => ProductCategorySchema),
                z.lazy(
                    () => EnumProductCategoryFieldUpdateOperationsInputSchema
                ),
            ])
            .optional(),
        mrp: z
            .union([
                z.number().int(),
                z.lazy(() => IntFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        createdAt: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        updatedAt: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        vendorsUpdatedAt: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
            ])
            .optional()
            .nullable(),
        vendors: z
            .lazy(() => VendorUpdateManyWithoutProductsNestedInputSchema)
            .optional(),
    })
    .strict()

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalKey: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            image: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
            type: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(
                        () => EnumProductTypeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            category: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(
                        () =>
                            EnumProductCategoryFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            mrp: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            vendorsUpdatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => NullableDateTimeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
            vendors: z
                .lazy(
                    () =>
                        VendorUncheckedUpdateManyWithoutProductsNestedInputSchema
                )
                .optional(),
        })
        .strict()

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> =
    z
        .object({
            id: z.string().uuid().optional(),
            externalKey: z.number().int(),
            externalId: z.string(),
            name: z.string(),
            image: z.string().optional().nullable(),
            type: z.lazy(() => ProductTypeSchema),
            category: z.lazy(() => ProductCategorySchema),
            mrp: z.number().int(),
            createdAt: z.coerce.date().optional(),
            updatedAt: z.coerce.date().optional(),
            vendorsUpdatedAt: z.coerce.date().optional().nullable(),
        })
        .strict()

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalKey: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            image: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
            type: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(
                        () => EnumProductTypeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            category: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(
                        () =>
                            EnumProductCategoryFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            mrp: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            vendorsUpdatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => NullableDateTimeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalKey: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            image: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
            type: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(
                        () => EnumProductTypeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            category: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(
                        () =>
                            EnumProductCategoryFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            mrp: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            vendorsUpdatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => NullableDateTimeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
    .object({
        equals: z.string().optional(),
        in: z.string().array().optional(),
        notIn: z.string().array().optional(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        mode: z.lazy(() => QueryModeSchema).optional(),
        not: z
            .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
            .optional(),
    })
    .strict()

export const EnumProductTypeNullableListFilterSchema: z.ZodType<Prisma.EnumProductTypeNullableListFilter> =
    z
        .object({
            equals: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional()
                .nullable(),
            has: z
                .lazy(() => ProductTypeSchema)
                .optional()
                .nullable(),
            hasEvery: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            hasSome: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            isEmpty: z.boolean().optional(),
        })
        .strict()

export const EnumEntityFilterSchema: z.ZodType<Prisma.EnumEntityFilter> = z
    .object({
        equals: z.lazy(() => EntitySchema).optional(),
        in: z
            .lazy(() => EntitySchema)
            .array()
            .optional(),
        notIn: z
            .lazy(() => EntitySchema)
            .array()
            .optional(),
        not: z
            .union([
                z.lazy(() => EntitySchema),
                z.lazy(() => NestedEnumEntityFilterSchema),
            ])
            .optional(),
    })
    .strict()

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
    .object({
        equals: z.coerce.date().optional(),
        in: z.coerce.date().array().optional(),
        notIn: z.coerce.date().array().optional(),
        lt: z.coerce.date().optional(),
        lte: z.coerce.date().optional(),
        gt: z.coerce.date().optional(),
        gte: z.coerce.date().optional(),
        not: z
            .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
            .optional(),
    })
    .strict()

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
    z
        .object({
            equals: z.string().optional().nullable(),
            in: z.string().array().optional().nullable(),
            notIn: z.string().array().optional().nullable(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            search: z.string().optional(),
            mode: z.lazy(() => QueryModeSchema).optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(() => NestedStringNullableFilterSchema),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> =
    z
        .object({
            every: z.lazy(() => ProductWhereInputSchema).optional(),
            some: z.lazy(() => ProductWhereInputSchema).optional(),
            none: z.lazy(() => ProductWhereInputSchema).optional(),
        })
        .strict()

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
    .object({
        sort: z.lazy(() => SortOrderSchema),
        nulls: z.lazy(() => NullsOrderSchema).optional(),
    })
    .strict()

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> =
    z
        .object({
            _count: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const VendorOrderByRelevanceInputSchema: z.ZodType<Prisma.VendorOrderByRelevanceInput> =
    z
        .object({
            fields: z.union([
                z.lazy(() => VendorOrderByRelevanceFieldEnumSchema),
                z.lazy(() => VendorOrderByRelevanceFieldEnumSchema).array(),
            ]),
            sort: z.lazy(() => SortOrderSchema),
            search: z.string(),
        })
        .strict()

export const VendorCountOrderByAggregateInputSchema: z.ZodType<Prisma.VendorCountOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
            productTypes: z.lazy(() => SortOrderSchema).optional(),
            entity: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            gmapsPlaceId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const VendorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VendorMaxOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
            entity: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            gmapsPlaceId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const VendorMinOrderByAggregateInputSchema: z.ZodType<Prisma.VendorMinOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            address: z.lazy(() => SortOrderSchema).optional(),
            entity: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            gmapsPlaceId: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
    z
        .object({
            equals: z.string().optional(),
            in: z.string().array().optional(),
            notIn: z.string().array().optional(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            search: z.string().optional(),
            mode: z.lazy(() => QueryModeSchema).optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(() => NestedStringWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedStringFilterSchema).optional(),
            _max: z.lazy(() => NestedStringFilterSchema).optional(),
        })
        .strict()

export const EnumEntityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEntityWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => EntitySchema).optional(),
            in: z
                .lazy(() => EntitySchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => EntitySchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => EntitySchema),
                    z.lazy(() => NestedEnumEntityWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedEnumEntityFilterSchema).optional(),
            _max: z.lazy(() => NestedEnumEntityFilterSchema).optional(),
        })
        .strict()

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
    z
        .object({
            equals: z.coerce.date().optional(),
            in: z.coerce.date().array().optional(),
            notIn: z.coerce.date().array().optional(),
            lt: z.coerce.date().optional(),
            lte: z.coerce.date().optional(),
            gt: z.coerce.date().optional(),
            gte: z.coerce.date().optional(),
            not: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
            _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
        })
        .strict()

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
    z
        .object({
            equals: z.string().optional().nullable(),
            in: z.string().array().optional().nullable(),
            notIn: z.string().array().optional().nullable(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            search: z.string().optional(),
            mode: z.lazy(() => QueryModeSchema).optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NestedStringNullableWithAggregatesFilterSchema
                    ),
                ])
                .optional()
                .nullable(),
            _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
            _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
            _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
        })
        .strict()

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
    .object({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([z.number(), z.lazy(() => NestedIntFilterSchema)])
            .optional(),
    })
    .strict()

export const EnumProductTypeFilterSchema: z.ZodType<Prisma.EnumProductTypeFilter> =
    z
        .object({
            equals: z.lazy(() => ProductTypeSchema).optional(),
            in: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(() => NestedEnumProductTypeFilterSchema),
                ])
                .optional(),
        })
        .strict()

export const EnumProductCategoryFilterSchema: z.ZodType<Prisma.EnumProductCategoryFilter> =
    z
        .object({
            equals: z.lazy(() => ProductCategorySchema).optional(),
            in: z
                .lazy(() => ProductCategorySchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => ProductCategorySchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(() => NestedEnumProductCategoryFilterSchema),
                ])
                .optional(),
        })
        .strict()

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
    z
        .object({
            equals: z.coerce.date().optional().nullable(),
            in: z.coerce.date().array().optional().nullable(),
            notIn: z.coerce.date().array().optional().nullable(),
            lt: z.coerce.date().optional(),
            lte: z.coerce.date().optional(),
            gt: z.coerce.date().optional(),
            gte: z.coerce.date().optional(),
            not: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => NestedDateTimeNullableFilterSchema),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const VendorListRelationFilterSchema: z.ZodType<Prisma.VendorListRelationFilter> =
    z
        .object({
            every: z.lazy(() => VendorWhereInputSchema).optional(),
            some: z.lazy(() => VendorWhereInputSchema).optional(),
            none: z.lazy(() => VendorWhereInputSchema).optional(),
        })
        .strict()

export const VendorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VendorOrderByRelationAggregateInput> =
    z
        .object({
            _count: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const ProductOrderByRelevanceInputSchema: z.ZodType<Prisma.ProductOrderByRelevanceInput> =
    z
        .object({
            fields: z.union([
                z.lazy(() => ProductOrderByRelevanceFieldEnumSchema),
                z.lazy(() => ProductOrderByRelevanceFieldEnumSchema).array(),
            ]),
            sort: z.lazy(() => SortOrderSchema),
            search: z.string(),
        })
        .strict()

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalKey: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            image: z.lazy(() => SortOrderSchema).optional(),
            type: z.lazy(() => SortOrderSchema).optional(),
            category: z.lazy(() => SortOrderSchema).optional(),
            mrp: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            vendorsUpdatedAt: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const ProductAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput> =
    z
        .object({
            externalKey: z.lazy(() => SortOrderSchema).optional(),
            mrp: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalKey: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            image: z.lazy(() => SortOrderSchema).optional(),
            type: z.lazy(() => SortOrderSchema).optional(),
            category: z.lazy(() => SortOrderSchema).optional(),
            mrp: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            vendorsUpdatedAt: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            externalKey: z.lazy(() => SortOrderSchema).optional(),
            externalId: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            image: z.lazy(() => SortOrderSchema).optional(),
            type: z.lazy(() => SortOrderSchema).optional(),
            category: z.lazy(() => SortOrderSchema).optional(),
            mrp: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            vendorsUpdatedAt: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const ProductSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSumOrderByAggregateInput> =
    z
        .object({
            externalKey: z.lazy(() => SortOrderSchema).optional(),
            mrp: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict()

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
    z
        .object({
            equals: z.number().optional(),
            in: z.number().array().optional(),
            notIn: z.number().array().optional(),
            lt: z.number().optional(),
            lte: z.number().optional(),
            gt: z.number().optional(),
            gte: z.number().optional(),
            not: z
                .union([
                    z.number(),
                    z.lazy(() => NestedIntWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
            _sum: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedIntFilterSchema).optional(),
            _max: z.lazy(() => NestedIntFilterSchema).optional(),
        })
        .strict()

export const EnumProductTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumProductTypeWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => ProductTypeSchema).optional(),
            in: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(
                        () => NestedEnumProductTypeWithAggregatesFilterSchema
                    ),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedEnumProductTypeFilterSchema).optional(),
            _max: z.lazy(() => NestedEnumProductTypeFilterSchema).optional(),
        })
        .strict()

export const EnumProductCategoryWithAggregatesFilterSchema: z.ZodType<Prisma.EnumProductCategoryWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => ProductCategorySchema).optional(),
            in: z
                .lazy(() => ProductCategorySchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => ProductCategorySchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(
                        () =>
                            NestedEnumProductCategoryWithAggregatesFilterSchema
                    ),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z
                .lazy(() => NestedEnumProductCategoryFilterSchema)
                .optional(),
            _max: z
                .lazy(() => NestedEnumProductCategoryFilterSchema)
                .optional(),
        })
        .strict()

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
    z
        .object({
            equals: z.coerce.date().optional().nullable(),
            in: z.coerce.date().array().optional().nullable(),
            notIn: z.coerce.date().array().optional().nullable(),
            lt: z.coerce.date().optional(),
            lte: z.coerce.date().optional(),
            gt: z.coerce.date().optional(),
            gte: z.coerce.date().optional(),
            not: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => NestedDateTimeNullableWithAggregatesFilterSchema
                    ),
                ])
                .optional()
                .nullable(),
            _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
            _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
            _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
        })
        .strict()

export const VendorCreateproductTypesInputSchema: z.ZodType<Prisma.VendorCreateproductTypesInput> =
    z
        .object({
            set: z.lazy(() => ProductTypeSchema).array(),
        })
        .strict()

export const ProductCreateNestedManyWithoutVendorsInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutVendorsInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ProductCreateWithoutVendorsInputSchema),
                    z
                        .lazy(() => ProductCreateWithoutVendorsInputSchema)
                        .array(),
                    z.lazy(
                        () => ProductUncheckedCreateWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUncheckedCreateWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => ProductCreateOrConnectWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductCreateOrConnectWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const ProductUncheckedCreateNestedManyWithoutVendorsInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutVendorsInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ProductCreateWithoutVendorsInputSchema),
                    z
                        .lazy(() => ProductCreateWithoutVendorsInputSchema)
                        .array(),
                    z.lazy(
                        () => ProductUncheckedCreateWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUncheckedCreateWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => ProductCreateOrConnectWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductCreateOrConnectWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
    z
        .object({
            set: z.string().optional(),
        })
        .strict()

export const VendorUpdateproductTypesInputSchema: z.ZodType<Prisma.VendorUpdateproductTypesInput> =
    z
        .object({
            set: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            push: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const EnumEntityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEntityFieldUpdateOperationsInput> =
    z
        .object({
            set: z.lazy(() => EntitySchema).optional(),
        })
        .strict()

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
    z
        .object({
            set: z.coerce.date().optional(),
        })
        .strict()

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
    z
        .object({
            set: z.string().optional().nullable(),
        })
        .strict()

export const ProductUpdateManyWithoutVendorsNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutVendorsNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ProductCreateWithoutVendorsInputSchema),
                    z
                        .lazy(() => ProductCreateWithoutVendorsInputSchema)
                        .array(),
                    z.lazy(
                        () => ProductUncheckedCreateWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUncheckedCreateWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => ProductCreateOrConnectWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductCreateOrConnectWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            ProductUpsertWithWhereUniqueWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUpsertWithWhereUniqueWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            set: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            ProductUpdateWithWhereUniqueWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUpdateWithWhereUniqueWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            ProductUpdateManyWithWhereWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUpdateManyWithWhereWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => ProductScalarWhereInputSchema),
                    z.lazy(() => ProductScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const ProductUncheckedUpdateManyWithoutVendorsNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutVendorsNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ProductCreateWithoutVendorsInputSchema),
                    z
                        .lazy(() => ProductCreateWithoutVendorsInputSchema)
                        .array(),
                    z.lazy(
                        () => ProductUncheckedCreateWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUncheckedCreateWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => ProductCreateOrConnectWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductCreateOrConnectWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            ProductUpsertWithWhereUniqueWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUpsertWithWhereUniqueWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            set: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ProductWhereUniqueInputSchema),
                    z.lazy(() => ProductWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            ProductUpdateWithWhereUniqueWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUpdateWithWhereUniqueWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            ProductUpdateManyWithWhereWithoutVendorsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ProductUpdateManyWithWhereWithoutVendorsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => ProductScalarWhereInputSchema),
                    z.lazy(() => ProductScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const VendorCreateNestedManyWithoutProductsInputSchema: z.ZodType<Prisma.VendorCreateNestedManyWithoutProductsInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => VendorCreateWithoutProductsInputSchema),
                    z
                        .lazy(() => VendorCreateWithoutProductsInputSchema)
                        .array(),
                    z.lazy(
                        () => VendorUncheckedCreateWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUncheckedCreateWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => VendorCreateOrConnectWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorCreateOrConnectWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const VendorUncheckedCreateNestedManyWithoutProductsInputSchema: z.ZodType<Prisma.VendorUncheckedCreateNestedManyWithoutProductsInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => VendorCreateWithoutProductsInputSchema),
                    z
                        .lazy(() => VendorCreateWithoutProductsInputSchema)
                        .array(),
                    z.lazy(
                        () => VendorUncheckedCreateWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUncheckedCreateWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => VendorCreateOrConnectWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorCreateOrConnectWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
    z
        .object({
            set: z.number().optional(),
            increment: z.number().optional(),
            decrement: z.number().optional(),
            multiply: z.number().optional(),
            divide: z.number().optional(),
        })
        .strict()

export const EnumProductTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumProductTypeFieldUpdateOperationsInput> =
    z
        .object({
            set: z.lazy(() => ProductTypeSchema).optional(),
        })
        .strict()

export const EnumProductCategoryFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumProductCategoryFieldUpdateOperationsInput> =
    z
        .object({
            set: z.lazy(() => ProductCategorySchema).optional(),
        })
        .strict()

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
    z
        .object({
            set: z.coerce.date().optional().nullable(),
        })
        .strict()

export const VendorUpdateManyWithoutProductsNestedInputSchema: z.ZodType<Prisma.VendorUpdateManyWithoutProductsNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => VendorCreateWithoutProductsInputSchema),
                    z
                        .lazy(() => VendorCreateWithoutProductsInputSchema)
                        .array(),
                    z.lazy(
                        () => VendorUncheckedCreateWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUncheckedCreateWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => VendorCreateOrConnectWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorCreateOrConnectWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            VendorUpsertWithWhereUniqueWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUpsertWithWhereUniqueWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            set: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            VendorUpdateWithWhereUniqueWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUpdateWithWhereUniqueWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            VendorUpdateManyWithWhereWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUpdateManyWithWhereWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => VendorScalarWhereInputSchema),
                    z.lazy(() => VendorScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const VendorUncheckedUpdateManyWithoutProductsNestedInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateManyWithoutProductsNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => VendorCreateWithoutProductsInputSchema),
                    z
                        .lazy(() => VendorCreateWithoutProductsInputSchema)
                        .array(),
                    z.lazy(
                        () => VendorUncheckedCreateWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUncheckedCreateWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => VendorCreateOrConnectWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorCreateOrConnectWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            VendorUpsertWithWhereUniqueWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUpsertWithWhereUniqueWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            set: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => VendorWhereUniqueInputSchema),
                    z.lazy(() => VendorWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            VendorUpdateWithWhereUniqueWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUpdateWithWhereUniqueWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            VendorUpdateManyWithWhereWithoutProductsInputSchema
                    ),
                    z
                        .lazy(
                            () =>
                                VendorUpdateManyWithWhereWithoutProductsInputSchema
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => VendorScalarWhereInputSchema),
                    z.lazy(() => VendorScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
    .object({
        equals: z.string().optional(),
        in: z.string().array().optional(),
        notIn: z.string().array().optional(),
        lt: z.string().optional(),
        lte: z.string().optional(),
        gt: z.string().optional(),
        gte: z.string().optional(),
        contains: z.string().optional(),
        startsWith: z.string().optional(),
        endsWith: z.string().optional(),
        search: z.string().optional(),
        not: z
            .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
            .optional(),
    })
    .strict()

export const NestedEnumEntityFilterSchema: z.ZodType<Prisma.NestedEnumEntityFilter> =
    z
        .object({
            equals: z.lazy(() => EntitySchema).optional(),
            in: z
                .lazy(() => EntitySchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => EntitySchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => EntitySchema),
                    z.lazy(() => NestedEnumEntityFilterSchema),
                ])
                .optional(),
        })
        .strict()

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
    z
        .object({
            equals: z.coerce.date().optional(),
            in: z.coerce.date().array().optional(),
            notIn: z.coerce.date().array().optional(),
            lt: z.coerce.date().optional(),
            lte: z.coerce.date().optional(),
            gt: z.coerce.date().optional(),
            gte: z.coerce.date().optional(),
            not: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => NestedDateTimeFilterSchema),
                ])
                .optional(),
        })
        .strict()

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
    z
        .object({
            equals: z.string().optional().nullable(),
            in: z.string().array().optional().nullable(),
            notIn: z.string().array().optional().nullable(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            search: z.string().optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(() => NestedStringNullableFilterSchema),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
    z
        .object({
            equals: z.string().optional(),
            in: z.string().array().optional(),
            notIn: z.string().array().optional(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            search: z.string().optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(() => NestedStringWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedStringFilterSchema).optional(),
            _max: z.lazy(() => NestedStringFilterSchema).optional(),
        })
        .strict()

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
    .object({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([z.number(), z.lazy(() => NestedIntFilterSchema)])
            .optional(),
    })
    .strict()

export const NestedEnumEntityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEntityWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => EntitySchema).optional(),
            in: z
                .lazy(() => EntitySchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => EntitySchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => EntitySchema),
                    z.lazy(() => NestedEnumEntityWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedEnumEntityFilterSchema).optional(),
            _max: z.lazy(() => NestedEnumEntityFilterSchema).optional(),
        })
        .strict()

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
    z
        .object({
            equals: z.coerce.date().optional(),
            in: z.coerce.date().array().optional(),
            notIn: z.coerce.date().array().optional(),
            lt: z.coerce.date().optional(),
            lte: z.coerce.date().optional(),
            gt: z.coerce.date().optional(),
            gte: z.coerce.date().optional(),
            not: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
            _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
        })
        .strict()

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
    z
        .object({
            equals: z.string().optional().nullable(),
            in: z.string().array().optional().nullable(),
            notIn: z.string().array().optional().nullable(),
            lt: z.string().optional(),
            lte: z.string().optional(),
            gt: z.string().optional(),
            gte: z.string().optional(),
            contains: z.string().optional(),
            startsWith: z.string().optional(),
            endsWith: z.string().optional(),
            search: z.string().optional(),
            not: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NestedStringNullableWithAggregatesFilterSchema
                    ),
                ])
                .optional()
                .nullable(),
            _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
            _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
            _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
        })
        .strict()

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
    z
        .object({
            equals: z.number().optional().nullable(),
            in: z.number().array().optional().nullable(),
            notIn: z.number().array().optional().nullable(),
            lt: z.number().optional(),
            lte: z.number().optional(),
            gt: z.number().optional(),
            gte: z.number().optional(),
            not: z
                .union([
                    z.number(),
                    z.lazy(() => NestedIntNullableFilterSchema),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const NestedEnumProductTypeFilterSchema: z.ZodType<Prisma.NestedEnumProductTypeFilter> =
    z
        .object({
            equals: z.lazy(() => ProductTypeSchema).optional(),
            in: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(() => NestedEnumProductTypeFilterSchema),
                ])
                .optional(),
        })
        .strict()

export const NestedEnumProductCategoryFilterSchema: z.ZodType<Prisma.NestedEnumProductCategoryFilter> =
    z
        .object({
            equals: z.lazy(() => ProductCategorySchema).optional(),
            in: z
                .lazy(() => ProductCategorySchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => ProductCategorySchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(() => NestedEnumProductCategoryFilterSchema),
                ])
                .optional(),
        })
        .strict()

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
    z
        .object({
            equals: z.coerce.date().optional().nullable(),
            in: z.coerce.date().array().optional().nullable(),
            notIn: z.coerce.date().array().optional().nullable(),
            lt: z.coerce.date().optional(),
            lte: z.coerce.date().optional(),
            gt: z.coerce.date().optional(),
            gte: z.coerce.date().optional(),
            not: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => NestedDateTimeNullableFilterSchema),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
    z
        .object({
            equals: z.number().optional(),
            in: z.number().array().optional(),
            notIn: z.number().array().optional(),
            lt: z.number().optional(),
            lte: z.number().optional(),
            gt: z.number().optional(),
            gte: z.number().optional(),
            not: z
                .union([
                    z.number(),
                    z.lazy(() => NestedIntWithAggregatesFilterSchema),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
            _sum: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedIntFilterSchema).optional(),
            _max: z.lazy(() => NestedIntFilterSchema).optional(),
        })
        .strict()

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
    .object({
        equals: z.number().optional(),
        in: z.number().array().optional(),
        notIn: z.number().array().optional(),
        lt: z.number().optional(),
        lte: z.number().optional(),
        gt: z.number().optional(),
        gte: z.number().optional(),
        not: z
            .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
            .optional(),
    })
    .strict()

export const NestedEnumProductTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumProductTypeWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => ProductTypeSchema).optional(),
            in: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => ProductTypeSchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(
                        () => NestedEnumProductTypeWithAggregatesFilterSchema
                    ),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z.lazy(() => NestedEnumProductTypeFilterSchema).optional(),
            _max: z.lazy(() => NestedEnumProductTypeFilterSchema).optional(),
        })
        .strict()

export const NestedEnumProductCategoryWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumProductCategoryWithAggregatesFilter> =
    z
        .object({
            equals: z.lazy(() => ProductCategorySchema).optional(),
            in: z
                .lazy(() => ProductCategorySchema)
                .array()
                .optional(),
            notIn: z
                .lazy(() => ProductCategorySchema)
                .array()
                .optional(),
            not: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(
                        () =>
                            NestedEnumProductCategoryWithAggregatesFilterSchema
                    ),
                ])
                .optional(),
            _count: z.lazy(() => NestedIntFilterSchema).optional(),
            _min: z
                .lazy(() => NestedEnumProductCategoryFilterSchema)
                .optional(),
            _max: z
                .lazy(() => NestedEnumProductCategoryFilterSchema)
                .optional(),
        })
        .strict()

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
    z
        .object({
            equals: z.coerce.date().optional().nullable(),
            in: z.coerce.date().array().optional().nullable(),
            notIn: z.coerce.date().array().optional().nullable(),
            lt: z.coerce.date().optional(),
            lte: z.coerce.date().optional(),
            gt: z.coerce.date().optional(),
            gte: z.coerce.date().optional(),
            not: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => NestedDateTimeNullableWithAggregatesFilterSchema
                    ),
                ])
                .optional()
                .nullable(),
            _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
            _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
            _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
        })
        .strict()

export const ProductCreateWithoutVendorsInputSchema: z.ZodType<Prisma.ProductCreateWithoutVendorsInput> =
    z
        .object({
            id: z.string().uuid().optional(),
            externalKey: z.number().int(),
            externalId: z.string(),
            name: z.string(),
            image: z.string().optional().nullable(),
            type: z.lazy(() => ProductTypeSchema),
            category: z.lazy(() => ProductCategorySchema),
            mrp: z.number().int(),
            createdAt: z.coerce.date().optional(),
            updatedAt: z.coerce.date().optional(),
            vendorsUpdatedAt: z.coerce.date().optional().nullable(),
        })
        .strict()

export const ProductUncheckedCreateWithoutVendorsInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutVendorsInput> =
    z
        .object({
            id: z.string().uuid().optional(),
            externalKey: z.number().int(),
            externalId: z.string(),
            name: z.string(),
            image: z.string().optional().nullable(),
            type: z.lazy(() => ProductTypeSchema),
            category: z.lazy(() => ProductCategorySchema),
            mrp: z.number().int(),
            createdAt: z.coerce.date().optional(),
            updatedAt: z.coerce.date().optional(),
            vendorsUpdatedAt: z.coerce.date().optional().nullable(),
        })
        .strict()

export const ProductCreateOrConnectWithoutVendorsInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutVendorsInput> =
    z
        .object({
            where: z.lazy(() => ProductWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => ProductCreateWithoutVendorsInputSchema),
                z.lazy(() => ProductUncheckedCreateWithoutVendorsInputSchema),
            ]),
        })
        .strict()

export const ProductUpsertWithWhereUniqueWithoutVendorsInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutVendorsInput> =
    z
        .object({
            where: z.lazy(() => ProductWhereUniqueInputSchema),
            update: z.union([
                z.lazy(() => ProductUpdateWithoutVendorsInputSchema),
                z.lazy(() => ProductUncheckedUpdateWithoutVendorsInputSchema),
            ]),
            create: z.union([
                z.lazy(() => ProductCreateWithoutVendorsInputSchema),
                z.lazy(() => ProductUncheckedCreateWithoutVendorsInputSchema),
            ]),
        })
        .strict()

export const ProductUpdateWithWhereUniqueWithoutVendorsInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutVendorsInput> =
    z
        .object({
            where: z.lazy(() => ProductWhereUniqueInputSchema),
            data: z.union([
                z.lazy(() => ProductUpdateWithoutVendorsInputSchema),
                z.lazy(() => ProductUncheckedUpdateWithoutVendorsInputSchema),
            ]),
        })
        .strict()

export const ProductUpdateManyWithWhereWithoutVendorsInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutVendorsInput> =
    z
        .object({
            where: z.lazy(() => ProductScalarWhereInputSchema),
            data: z.union([
                z.lazy(() => ProductUpdateManyMutationInputSchema),
                z.lazy(
                    () => ProductUncheckedUpdateManyWithoutVendorsInputSchema
                ),
            ]),
        })
        .strict()

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => ProductScalarWhereInputSchema),
                    z.lazy(() => ProductScalarWhereInputSchema).array(),
                ])
                .optional(),
            OR: z
                .lazy(() => ProductScalarWhereInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => ProductScalarWhereInputSchema),
                    z.lazy(() => ProductScalarWhereInputSchema).array(),
                ])
                .optional(),
            id: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            externalKey: z
                .union([z.lazy(() => IntFilterSchema), z.number()])
                .optional(),
            externalId: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            name: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            image: z
                .union([z.lazy(() => StringNullableFilterSchema), z.string()])
                .optional()
                .nullable(),
            type: z
                .union([
                    z.lazy(() => EnumProductTypeFilterSchema),
                    z.lazy(() => ProductTypeSchema),
                ])
                .optional(),
            category: z
                .union([
                    z.lazy(() => EnumProductCategoryFilterSchema),
                    z.lazy(() => ProductCategorySchema),
                ])
                .optional(),
            mrp: z
                .union([z.lazy(() => IntFilterSchema), z.number()])
                .optional(),
            createdAt: z
                .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
                .optional(),
            updatedAt: z
                .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
                .optional(),
            vendorsUpdatedAt: z
                .union([
                    z.lazy(() => DateTimeNullableFilterSchema),
                    z.coerce.date(),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const VendorCreateWithoutProductsInputSchema: z.ZodType<Prisma.VendorCreateWithoutProductsInput> =
    z
        .object({
            id: z.string().uuid().optional(),
            externalId: z.string(),
            name: z.string(),
            address: z.string(),
            productTypes: z
                .union([
                    z.lazy(() => VendorCreateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z.lazy(() => EntitySchema),
            createdAt: z.coerce.date().optional(),
            updatedAt: z.coerce.date().optional(),
            gmapsPlaceId: z.string().optional().nullable(),
        })
        .strict()

export const VendorUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.VendorUncheckedCreateWithoutProductsInput> =
    z
        .object({
            id: z.string().uuid().optional(),
            externalId: z.string(),
            name: z.string(),
            address: z.string(),
            productTypes: z
                .union([
                    z.lazy(() => VendorCreateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z.lazy(() => EntitySchema),
            createdAt: z.coerce.date().optional(),
            updatedAt: z.coerce.date().optional(),
            gmapsPlaceId: z.string().optional().nullable(),
        })
        .strict()

export const VendorCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.VendorCreateOrConnectWithoutProductsInput> =
    z
        .object({
            where: z.lazy(() => VendorWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => VendorCreateWithoutProductsInputSchema),
                z.lazy(() => VendorUncheckedCreateWithoutProductsInputSchema),
            ]),
        })
        .strict()

export const VendorUpsertWithWhereUniqueWithoutProductsInputSchema: z.ZodType<Prisma.VendorUpsertWithWhereUniqueWithoutProductsInput> =
    z
        .object({
            where: z.lazy(() => VendorWhereUniqueInputSchema),
            update: z.union([
                z.lazy(() => VendorUpdateWithoutProductsInputSchema),
                z.lazy(() => VendorUncheckedUpdateWithoutProductsInputSchema),
            ]),
            create: z.union([
                z.lazy(() => VendorCreateWithoutProductsInputSchema),
                z.lazy(() => VendorUncheckedCreateWithoutProductsInputSchema),
            ]),
        })
        .strict()

export const VendorUpdateWithWhereUniqueWithoutProductsInputSchema: z.ZodType<Prisma.VendorUpdateWithWhereUniqueWithoutProductsInput> =
    z
        .object({
            where: z.lazy(() => VendorWhereUniqueInputSchema),
            data: z.union([
                z.lazy(() => VendorUpdateWithoutProductsInputSchema),
                z.lazy(() => VendorUncheckedUpdateWithoutProductsInputSchema),
            ]),
        })
        .strict()

export const VendorUpdateManyWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.VendorUpdateManyWithWhereWithoutProductsInput> =
    z
        .object({
            where: z.lazy(() => VendorScalarWhereInputSchema),
            data: z.union([
                z.lazy(() => VendorUpdateManyMutationInputSchema),
                z.lazy(
                    () => VendorUncheckedUpdateManyWithoutProductsInputSchema
                ),
            ]),
        })
        .strict()

export const VendorScalarWhereInputSchema: z.ZodType<Prisma.VendorScalarWhereInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => VendorScalarWhereInputSchema),
                    z.lazy(() => VendorScalarWhereInputSchema).array(),
                ])
                .optional(),
            OR: z
                .lazy(() => VendorScalarWhereInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => VendorScalarWhereInputSchema),
                    z.lazy(() => VendorScalarWhereInputSchema).array(),
                ])
                .optional(),
            id: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            externalId: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            name: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            address: z
                .union([z.lazy(() => StringFilterSchema), z.string()])
                .optional(),
            productTypes: z
                .lazy(() => EnumProductTypeNullableListFilterSchema)
                .optional(),
            entity: z
                .union([
                    z.lazy(() => EnumEntityFilterSchema),
                    z.lazy(() => EntitySchema),
                ])
                .optional(),
            createdAt: z
                .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
                .optional(),
            updatedAt: z
                .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
                .optional(),
            gmapsPlaceId: z
                .union([z.lazy(() => StringNullableFilterSchema), z.string()])
                .optional()
                .nullable(),
        })
        .strict()

export const ProductUpdateWithoutVendorsInputSchema: z.ZodType<Prisma.ProductUpdateWithoutVendorsInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalKey: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            image: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
            type: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(
                        () => EnumProductTypeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            category: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(
                        () =>
                            EnumProductCategoryFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            mrp: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            vendorsUpdatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => NullableDateTimeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const ProductUncheckedUpdateWithoutVendorsInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutVendorsInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalKey: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            image: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
            type: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(
                        () => EnumProductTypeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            category: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(
                        () =>
                            EnumProductCategoryFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            mrp: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            vendorsUpdatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => NullableDateTimeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const ProductUncheckedUpdateManyWithoutVendorsInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutVendorsInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalKey: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            image: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
            type: z
                .union([
                    z.lazy(() => ProductTypeSchema),
                    z.lazy(
                        () => EnumProductTypeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            category: z
                .union([
                    z.lazy(() => ProductCategorySchema),
                    z.lazy(
                        () =>
                            EnumProductCategoryFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional(),
            mrp: z
                .union([
                    z.number().int(),
                    z.lazy(() => IntFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            vendorsUpdatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => NullableDateTimeFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const VendorUpdateWithoutProductsInputSchema: z.ZodType<Prisma.VendorUpdateWithoutProductsInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            productTypes: z
                .union([
                    z.lazy(() => VendorUpdateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z
                .union([
                    z.lazy(() => EntitySchema),
                    z.lazy(() => EnumEntityFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            gmapsPlaceId: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const VendorUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateWithoutProductsInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            productTypes: z
                .union([
                    z.lazy(() => VendorUpdateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z
                .union([
                    z.lazy(() => EntitySchema),
                    z.lazy(() => EnumEntityFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            gmapsPlaceId: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

export const VendorUncheckedUpdateManyWithoutProductsInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateManyWithoutProductsInput> =
    z
        .object({
            id: z
                .union([
                    z.string().uuid(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            externalId: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            name: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            address: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            productTypes: z
                .union([
                    z.lazy(() => VendorUpdateproductTypesInputSchema),
                    z.lazy(() => ProductTypeSchema).array(),
                ])
                .optional(),
            entity: z
                .union([
                    z.lazy(() => EntitySchema),
                    z.lazy(() => EnumEntityFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            updatedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional(),
            gmapsPlaceId: z
                .union([
                    z.string(),
                    z.lazy(
                        () => NullableStringFieldUpdateOperationsInputSchema
                    ),
                ])
                .optional()
                .nullable(),
        })
        .strict()

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const VendorFindFirstArgsSchema: z.ZodType<Prisma.VendorFindFirstArgs> =
    z
        .object({
            select: VendorSelectSchema.optional(),
            include: VendorIncludeSchema.optional(),
            where: VendorWhereInputSchema.optional(),
            orderBy: z
                .union([
                    VendorOrderByWithRelationAndSearchRelevanceInputSchema.array(),
                    VendorOrderByWithRelationAndSearchRelevanceInputSchema,
                ])
                .optional(),
            cursor: VendorWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    VendorScalarFieldEnumSchema,
                    VendorScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict()

export const VendorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VendorFindFirstOrThrowArgs> =
    z
        .object({
            select: VendorSelectSchema.optional(),
            include: VendorIncludeSchema.optional(),
            where: VendorWhereInputSchema.optional(),
            orderBy: z
                .union([
                    VendorOrderByWithRelationAndSearchRelevanceInputSchema.array(),
                    VendorOrderByWithRelationAndSearchRelevanceInputSchema,
                ])
                .optional(),
            cursor: VendorWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    VendorScalarFieldEnumSchema,
                    VendorScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict()

export const VendorFindManyArgsSchema: z.ZodType<Prisma.VendorFindManyArgs> = z
    .object({
        select: VendorSelectSchema.optional(),
        include: VendorIncludeSchema.optional(),
        where: VendorWhereInputSchema.optional(),
        orderBy: z
            .union([
                VendorOrderByWithRelationAndSearchRelevanceInputSchema.array(),
                VendorOrderByWithRelationAndSearchRelevanceInputSchema,
            ])
            .optional(),
        cursor: VendorWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z
            .union([
                VendorScalarFieldEnumSchema,
                VendorScalarFieldEnumSchema.array(),
            ])
            .optional(),
    })
    .strict()

export const VendorAggregateArgsSchema: z.ZodType<Prisma.VendorAggregateArgs> =
    z
        .object({
            where: VendorWhereInputSchema.optional(),
            orderBy: z
                .union([
                    VendorOrderByWithRelationAndSearchRelevanceInputSchema.array(),
                    VendorOrderByWithRelationAndSearchRelevanceInputSchema,
                ])
                .optional(),
            cursor: VendorWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict()

export const VendorGroupByArgsSchema: z.ZodType<Prisma.VendorGroupByArgs> = z
    .object({
        where: VendorWhereInputSchema.optional(),
        orderBy: z
            .union([
                VendorOrderByWithAggregationInputSchema.array(),
                VendorOrderByWithAggregationInputSchema,
            ])
            .optional(),
        by: VendorScalarFieldEnumSchema.array(),
        having: VendorScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict()

export const VendorFindUniqueArgsSchema: z.ZodType<Prisma.VendorFindUniqueArgs> =
    z
        .object({
            select: VendorSelectSchema.optional(),
            include: VendorIncludeSchema.optional(),
            where: VendorWhereUniqueInputSchema,
        })
        .strict()

export const VendorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VendorFindUniqueOrThrowArgs> =
    z
        .object({
            select: VendorSelectSchema.optional(),
            include: VendorIncludeSchema.optional(),
            where: VendorWhereUniqueInputSchema,
        })
        .strict()

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> =
    z
        .object({
            select: ProductSelectSchema.optional(),
            include: ProductIncludeSchema.optional(),
            where: ProductWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ProductOrderByWithRelationAndSearchRelevanceInputSchema.array(),
                    ProductOrderByWithRelationAndSearchRelevanceInputSchema,
                ])
                .optional(),
            cursor: ProductWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ProductScalarFieldEnumSchema,
                    ProductScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict()

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> =
    z
        .object({
            select: ProductSelectSchema.optional(),
            include: ProductIncludeSchema.optional(),
            where: ProductWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ProductOrderByWithRelationAndSearchRelevanceInputSchema.array(),
                    ProductOrderByWithRelationAndSearchRelevanceInputSchema,
                ])
                .optional(),
            cursor: ProductWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ProductScalarFieldEnumSchema,
                    ProductScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict()

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> =
    z
        .object({
            select: ProductSelectSchema.optional(),
            include: ProductIncludeSchema.optional(),
            where: ProductWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ProductOrderByWithRelationAndSearchRelevanceInputSchema.array(),
                    ProductOrderByWithRelationAndSearchRelevanceInputSchema,
                ])
                .optional(),
            cursor: ProductWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
            distinct: z
                .union([
                    ProductScalarFieldEnumSchema,
                    ProductScalarFieldEnumSchema.array(),
                ])
                .optional(),
        })
        .strict()

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> =
    z
        .object({
            where: ProductWhereInputSchema.optional(),
            orderBy: z
                .union([
                    ProductOrderByWithRelationAndSearchRelevanceInputSchema.array(),
                    ProductOrderByWithRelationAndSearchRelevanceInputSchema,
                ])
                .optional(),
            cursor: ProductWhereUniqueInputSchema.optional(),
            take: z.number().optional(),
            skip: z.number().optional(),
        })
        .strict()

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z
    .object({
        where: ProductWhereInputSchema.optional(),
        orderBy: z
            .union([
                ProductOrderByWithAggregationInputSchema.array(),
                ProductOrderByWithAggregationInputSchema,
            ])
            .optional(),
        by: ProductScalarFieldEnumSchema.array(),
        having: ProductScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict()

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> =
    z
        .object({
            select: ProductSelectSchema.optional(),
            include: ProductIncludeSchema.optional(),
            where: ProductWhereUniqueInputSchema,
        })
        .strict()

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> =
    z
        .object({
            select: ProductSelectSchema.optional(),
            include: ProductIncludeSchema.optional(),
            where: ProductWhereUniqueInputSchema,
        })
        .strict()

export const VendorCreateArgsSchema: z.ZodType<Prisma.VendorCreateArgs> = z
    .object({
        select: VendorSelectSchema.optional(),
        include: VendorIncludeSchema.optional(),
        data: z.union([
            VendorCreateInputSchema,
            VendorUncheckedCreateInputSchema,
        ]),
    })
    .strict()

export const VendorUpsertArgsSchema: z.ZodType<Prisma.VendorUpsertArgs> = z
    .object({
        select: VendorSelectSchema.optional(),
        include: VendorIncludeSchema.optional(),
        where: VendorWhereUniqueInputSchema,
        create: z.union([
            VendorCreateInputSchema,
            VendorUncheckedCreateInputSchema,
        ]),
        update: z.union([
            VendorUpdateInputSchema,
            VendorUncheckedUpdateInputSchema,
        ]),
    })
    .strict()

export const VendorCreateManyArgsSchema: z.ZodType<Prisma.VendorCreateManyArgs> =
    z
        .object({
            data: z.union([
                VendorCreateManyInputSchema,
                VendorCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict()

export const VendorDeleteArgsSchema: z.ZodType<Prisma.VendorDeleteArgs> = z
    .object({
        select: VendorSelectSchema.optional(),
        include: VendorIncludeSchema.optional(),
        where: VendorWhereUniqueInputSchema,
    })
    .strict()

export const VendorUpdateArgsSchema: z.ZodType<Prisma.VendorUpdateArgs> = z
    .object({
        select: VendorSelectSchema.optional(),
        include: VendorIncludeSchema.optional(),
        data: z.union([
            VendorUpdateInputSchema,
            VendorUncheckedUpdateInputSchema,
        ]),
        where: VendorWhereUniqueInputSchema,
    })
    .strict()

export const VendorUpdateManyArgsSchema: z.ZodType<Prisma.VendorUpdateManyArgs> =
    z
        .object({
            data: z.union([
                VendorUpdateManyMutationInputSchema,
                VendorUncheckedUpdateManyInputSchema,
            ]),
            where: VendorWhereInputSchema.optional(),
        })
        .strict()

export const VendorDeleteManyArgsSchema: z.ZodType<Prisma.VendorDeleteManyArgs> =
    z
        .object({
            where: VendorWhereInputSchema.optional(),
        })
        .strict()

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z
    .object({
        select: ProductSelectSchema.optional(),
        include: ProductIncludeSchema.optional(),
        data: z.union([
            ProductCreateInputSchema,
            ProductUncheckedCreateInputSchema,
        ]),
    })
    .strict()

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z
    .object({
        select: ProductSelectSchema.optional(),
        include: ProductIncludeSchema.optional(),
        where: ProductWhereUniqueInputSchema,
        create: z.union([
            ProductCreateInputSchema,
            ProductUncheckedCreateInputSchema,
        ]),
        update: z.union([
            ProductUpdateInputSchema,
            ProductUncheckedUpdateInputSchema,
        ]),
    })
    .strict()

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> =
    z
        .object({
            data: z.union([
                ProductCreateManyInputSchema,
                ProductCreateManyInputSchema.array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict()

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z
    .object({
        select: ProductSelectSchema.optional(),
        include: ProductIncludeSchema.optional(),
        where: ProductWhereUniqueInputSchema,
    })
    .strict()

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z
    .object({
        select: ProductSelectSchema.optional(),
        include: ProductIncludeSchema.optional(),
        data: z.union([
            ProductUpdateInputSchema,
            ProductUncheckedUpdateInputSchema,
        ]),
        where: ProductWhereUniqueInputSchema,
    })
    .strict()

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> =
    z
        .object({
            data: z.union([
                ProductUpdateManyMutationInputSchema,
                ProductUncheckedUpdateManyInputSchema,
            ]),
            where: ProductWhereInputSchema.optional(),
        })
        .strict()

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> =
    z
        .object({
            where: ProductWhereInputSchema.optional(),
        })
        .strict()
