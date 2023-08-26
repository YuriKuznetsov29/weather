import type { Meta, StoryObj } from '@storybook/react'

import Precipitations from './Precipitations'

const meta = {
    title: 'widgets/Precipitations',
    component: Precipitations,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Precipitations>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
