import type {Meta, StoryObj} from '@storybook/react';

import {DDLoader} from "@/components";

const meta: Meta<typeof DDLoader> = {
    title: 'Components/DD Loader',
    component : DDLoader,
}

export default meta;

export const Primary: StoryObj<typeof DDLoader> = {
    render: () => <DDLoader />,
}