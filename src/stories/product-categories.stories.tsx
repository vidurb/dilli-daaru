import { Meta, StoryObj } from '@storybook/react'

import ProductCategories from '@/components/product-categories'
import { ProductCategorySelect } from '@/components/product-category-select'
import { ProductCategory } from '@/types/enums'

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
