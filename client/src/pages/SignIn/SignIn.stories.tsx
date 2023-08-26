import type { Meta, StoryObj } from '@storybook/react'

import SignIn from './SignIn'

const meta = {
    title: 'pages/SignIn',
    component: SignIn,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
