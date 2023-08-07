import type { Meta, StoryObj } from '@storybook/react'

import Spinner from './Spinner'

const meta = {
    title: 'shared/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        visible: true,
    },
}
