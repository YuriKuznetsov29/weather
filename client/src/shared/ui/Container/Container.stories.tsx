import type { Meta, StoryObj } from '@storybook/react'

import Container from './Container'

const meta = {
    title: 'shared/Container',
    component: Container,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        children: <div>Text</div>,
    },
}