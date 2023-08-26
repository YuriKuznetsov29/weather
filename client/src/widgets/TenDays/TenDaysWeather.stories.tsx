import type { Meta, StoryObj } from '@storybook/react'
import TenDaysWeather from './TenDaysWeather'

const meta = {
    title: 'widgets/TenDaysWeather',
    component: TenDaysWeather,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof TenDaysWeather>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
