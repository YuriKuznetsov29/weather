import { StoryFn } from '@storybook/react'
import SideBarProvider from 'app/providers/SideBarProvider/ui/SideBarProvider'
export const withSidebar = (Story: StoryFn) => (
    <SideBarProvider initialState={true}>
        <Story />
    </SideBarProvider>
)
