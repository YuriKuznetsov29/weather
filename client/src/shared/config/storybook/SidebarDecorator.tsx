import { StoryFn } from '@storybook/react'
import BarProvider from 'widgets/SideBar/BarProvider'
export const withSidebar = (Story: StoryFn) => <BarProvider initialState={true}><Story /></BarProvider>