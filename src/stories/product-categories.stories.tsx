import { Meta, StoryObj } from '@storybook/react'

import ProductCategories from '@/components/product-categories'
import { ProductCategorySelect } from '@/components/product-category-select'

import { ProductCategorySchema } from '../../prisma/generated/zod'

const meta = {
    title: 'Components/ProductCategories',
    component: ProductCategories,
    argTypes: {
        selectedCategories: {
            options: ProductCategorySchema.Enum,
            control: { type: 'inline-check' },
        },
    },
} satisfies Meta<typeof ProductCategories>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: StoryObj<typeof ProductCategorySelect> = {}
