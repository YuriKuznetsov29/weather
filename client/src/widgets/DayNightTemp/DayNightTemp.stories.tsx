import type { Meta, StoryObj } from '@storybook/react'

import DayNightTemp from './DayNightTemp'

const meta = {
    title: 'widgets/DayNightTemp',
    component: DayNightTemp,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof DayNightTemp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        dayTemp: 25,
        nightTemp: 10
    },
}
