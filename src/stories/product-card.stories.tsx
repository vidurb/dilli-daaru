import type {Meta, StoryObj} from '@storybook/react';

import {ProductCard} from "@/components";
import {fakeProductComplete} from "@/types/fake-data";

const meta: Meta<typeof ProductCard> = {
    title: 'Components/Product Card',
    component : ProductCard,
}

const product = fakeProductComplete();

export default meta;

export const Primary: StoryObj<typeof ProductCard> = {
    render: () => <ProductCard product={{...product, _count: {vendors: 1}}} />,
}