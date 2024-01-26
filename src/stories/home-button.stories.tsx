import { Meta, StoryObj } from '@storybook/react'

import HomeButton from '@/components/home-button'

const meta = {
    title: 'Components/HomeButton',
    component: HomeButton,
} satisfies Meta<typeof HomeButton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: StoryObj<typeof HomeButton> = {}
