import { Meta, StoryObj } from '@storybook/react'

import { ProductCategorySelect } from '@/components'

import { ProductCategorySchema } from '../../prisma/generated/zod'

const meta = {
    title: 'Components/ProductCategorySelect',
    component: ProductCategorySelect,
    argTypes: {
        category: {
            options: ProductCategorySchema.Enum,
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof ProductCategorySelect>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: StoryObj<typeof ProductCategorySelect> = {}
