import type { Meta, StoryObj } from '@storybook/react'
import { withSidebar } from 'shared/config/storybook/SidebarDecorator'
import SideBar from './SideBar'

const meta = {
    title: 'widgets/SideBar',
    decorators: [withSidebar],
    component: SideBar,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SideBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
