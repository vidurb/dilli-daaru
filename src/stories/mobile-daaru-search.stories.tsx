import type {Meta, StoryObj} from '@storybook/react';

import {MobileDaaruSearch} from "@/components";

const meta: Meta<typeof MobileDaaruSearch> = {
    title: 'Components/Mobile Daaru Search',
    component : MobileDaaruSearch,
}

export default meta;

export const Primary: StoryObj<typeof MobileDaaruSearch> = {
    render: () => <MobileDaaruSearch />,
}