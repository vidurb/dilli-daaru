import { ProductCategory } from '@prisma/client'
import { Meta, StoryObj } from '@storybook/react'

import ProductCategories from '@/components/product-categories'
import { ProductCategorySelect } from '@/components/product-category-select'

const meta = {
    title: 'Components/ProductCategories',
    component: ProductCategories,
    argTypes: {
        selectedCategories: {
            options: ProductCategory,
            control: { type: 'inline-check' },
        },
    },
} satisfies Meta<typeof ProductCategories>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: StoryObj<typeof ProductCategorySelect> = {}
