import type { Preview } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { withRedux } from '../src/shared/config/storybook/ReduxDecorator'
import { withStyle } from '../src/shared/config/storybook/StyleDecorator'
import { withLocalStorage } from '../src/shared/config/storybook/LocalStorageDecorator'

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
    decorators: [withRouter, withLocalStorage, withRedux, withStyle],
}

export default preview
