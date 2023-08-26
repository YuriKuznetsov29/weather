import type { Meta, StoryObj } from '@storybook/react'
import Tomorrow from './Tomorrow'

const meta = {
    title: 'pages/Tomorrow',
    component: Tomorrow,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Tomorrow>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
