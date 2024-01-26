import { Meta, StoryObj } from '@storybook/react'

import { ProductCategorySelect } from '@/components'
import { ProductCategory } from '@/types/enums'

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
