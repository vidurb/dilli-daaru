import { Meta, StoryObj } from '@storybook/react'

import { VendorCard } from '@/components'
import { fakeVendorExtended } from '@/types/extended-fake-data'

const meta = {
    title: 'Components/VendorCard',
    component: VendorCard,
} satisfies Meta<typeof VendorCard>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: StoryObj<typeof VendorCard> = {
    render: () => <VendorCard vendor={fakeVendorExtended()} />,
}
