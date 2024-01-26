import { ProductCategory } from '@prisma/client'
import { Meta, StoryObj } from '@storybook/react'

import { ProductCard, ProductCategorySelect } from '@/components'

const meta = {
    title: 'Components/ProductCategorySelect',
    component: ProductCategorySelect,
    argTypes: {
        category: {
            options: ProductCategory,
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof ProductCategorySelect>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: StoryObj<typeof ProductCategorySelect> = {}
