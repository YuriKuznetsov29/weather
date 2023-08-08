import type { Meta, StoryObj } from '@storybook/react'

import Header from './Header'

const meta = {
    title: 'widgets/Header',
    component: Header,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        background: true
    },
}
