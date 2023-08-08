import type { Meta, StoryObj } from '@storybook/react'

import Main from './Main'

const meta = {
    title: 'pages/Main',
    component: Main,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Main>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
