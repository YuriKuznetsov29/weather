import type { Meta, StoryObj } from '@storybook/react'

import TenDays from './TenDays'

const meta = {
    title: 'pages/TenDays',
    component: TenDays,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof TenDays>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
