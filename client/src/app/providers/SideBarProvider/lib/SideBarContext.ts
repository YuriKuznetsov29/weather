import { createContext } from 'react'

interface SideBarContextProps {
    barState: boolean
    stateChange: () => void
}

export const SideBarContext = createContext<SideBarContextProps>({} as SideBarContextProps)
