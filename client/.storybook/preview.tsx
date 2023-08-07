import type { Preview } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { withRedux } from '../src/shared/config/storybook/ReduxDecorator'

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [withRouter, withRedux],
}

export default preview
