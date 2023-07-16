import { createContext } from "react"

interface BarContextProps {
    barState: boolean
    stateChange: () => void
  }
  
export const BarContext = createContext<BarContextProps>({} as BarContextProps)