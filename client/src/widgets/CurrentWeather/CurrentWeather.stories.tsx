import type { Meta, StoryObj } from '@storybook/react'

import CurrentWeather from './CurrentWeather'

const meta = {
    title: 'widgets/CurrentWeather',
    component: CurrentWeather,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof CurrentWeather>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
