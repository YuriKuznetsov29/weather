import React from 'react'
import { createRoot } from 'react-dom/client'
import App from 'app/App'
import SideBarProvider from 'app/providers/SideBarProvider/ui/SideBarProvider'
import ErrorBoundary from 'app/providers/ErrorBoundary/ErrorBoundary'
import { Toaster } from 'react-hot-toast'
import './styles/index.scss'
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <StoreProvider>
                <SideBarProvider>
                    <App />
                </SideBarProvider>
            </StoreProvider>
            <Toaster />
        </ErrorBoundary>
    </React.StrictMode>
)
