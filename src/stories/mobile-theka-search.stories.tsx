import type {Meta, StoryObj} from '@storybook/react';

import {MobileThekaSearch} from "@/components";

const meta: Meta<typeof MobileThekaSearch> = {
    title: 'Components/Mobile Theka Search',
    component : MobileThekaSearch,
}

export default meta;

export const Primary: StoryObj<typeof MobileThekaSearch> = {
    render: () => <MobileThekaSearch />,
}