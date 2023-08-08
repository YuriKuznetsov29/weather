import type { Meta, StoryObj } from '@storybook/react'

import RecentLocations from './RecentLocations'

const meta = {
    title: 'widgets/RecentLocations',
    component: RecentLocations,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof RecentLocations>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
