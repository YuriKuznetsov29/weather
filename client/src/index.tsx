import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'
import App from 'app/App'

import './styles/index.scss'
import BarProvider from 'widgets/SideBar/BarProvider'
import ErrorBoundary from 'app/providers/ErrorBoundary/ErrorBoundary'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <BarProvider>
                    <App />
                </BarProvider>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
)
