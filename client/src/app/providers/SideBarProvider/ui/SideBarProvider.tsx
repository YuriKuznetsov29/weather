import { ReactNode, useMemo, useState } from 'react'
import { SideBarContext } from '../lib/SideBarContext'

interface SideBarProviderProps {
    children: ReactNode
    initialState?: boolean
}

const SideBarProvider = ({ children, initialState }: SideBarProviderProps) => {
    const [barState, setBarState] = useState(initialState || false)

    const stateChange = (): void => {
        setBarState((prev) => !prev)
    }

    const defaultProps = useMemo(
        () => ({
            barState,
            stateChange,
        }),
        [barState]
    )

    return <SideBarContext.Provider value={defaultProps}>{children}</SideBarContext.Provider>
}

export default SideBarProvider
