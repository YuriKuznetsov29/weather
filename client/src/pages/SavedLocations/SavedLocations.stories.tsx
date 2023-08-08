import type { Meta, StoryObj } from '@storybook/react'
import SavedLocations from './SavedLocations'

const meta = {
    title: 'pages/SavedLocations',
    component: SavedLocations,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SavedLocations>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
