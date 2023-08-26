import type { Meta, StoryObj } from '@storybook/react'
import SignUp from './SignUp'

const meta = {
    title: 'pages/SignUp',
    component: SignUp,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
