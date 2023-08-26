import type { Meta, StoryObj } from '@storybook/react'
import Input from 'shared/ui/Input/Input'
import Background from './Background'

const meta = {
    title: 'widgets/Background',
    component: Background,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Background>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        children: <Input placeholder='text' type='text'></Input>
    },
}
