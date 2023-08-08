import type { Meta, StoryObj } from '@storybook/react'

import Page404 from './Page404'

const meta = {
    title: 'pages/Page404',
    component: Page404,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Page404>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
