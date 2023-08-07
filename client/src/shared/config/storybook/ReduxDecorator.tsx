import { Provider } from 'react-redux'
import { store } from 'app/redux/store'
import { StoryFn } from '@storybook/react'

export const withRedux = (Story: StoryFn) => (
    <Provider store={store}>
        <Story />
    </Provider>
)
