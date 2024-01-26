import type {Meta, StoryObj} from '@storybook/react';

import {DefaultLoader} from "@/components";

const meta: Meta<typeof DefaultLoader> = {
    title: 'Components/Default Loader',
    component : DefaultLoader,
}

export default meta;

export const Primary: StoryObj<typeof DefaultLoader> = {
    render: () => <DefaultLoader />,
}