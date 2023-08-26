import type { Meta, StoryObj } from '@storybook/react'

import Charts from './Charts'

const meta = {
    title: 'widgets/Charts',
    component: Charts,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Charts>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
