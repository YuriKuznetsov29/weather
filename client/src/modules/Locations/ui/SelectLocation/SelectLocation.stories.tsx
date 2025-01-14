import type { Meta, StoryObj } from '@storybook/react'

import SelectLocation from './SelectLocation'

const meta = {
    title: 'widgets/SelectLocation',
    component: SelectLocation,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SelectLocation>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
