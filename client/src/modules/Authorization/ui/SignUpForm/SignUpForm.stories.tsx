import type { Meta, StoryObj } from '@storybook/react'

import SignUpForm from './SignUpForm'

const meta = {
    title: 'widgets/SignUpForm',
    component: SignUpForm,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
