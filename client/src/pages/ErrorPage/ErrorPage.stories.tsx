import type { Meta, StoryObj } from '@storybook/react'

import ErrorPage from './ErrorPage'

const meta = {
    title: 'pages/ErrorPage',
    component: ErrorPage,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ErrorPage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
