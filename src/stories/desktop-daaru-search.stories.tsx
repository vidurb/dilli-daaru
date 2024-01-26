import type {Meta, StoryObj} from '@storybook/react';

import {DesktopDaaruSearch} from "@/components";

const meta: Meta<typeof DesktopDaaruSearch> = {
    title: 'Components/Desktop Daaru Search',
    component : DesktopDaaruSearch,
}

export default meta;

export const Primary: StoryObj<typeof DesktopDaaruSearch> = {
    render: () => <DesktopDaaruSearch />,
}