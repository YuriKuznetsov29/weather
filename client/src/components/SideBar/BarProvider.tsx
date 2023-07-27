import { ReactNode, useMemo, useState } from 'react';
import { BarContext } from './BarContext';

interface BarProviderProps {
    children: ReactNode
}

const BarProvider = ({children}: BarProviderProps) => {
    const [barState, setBarState] = useState(false)

    const stateChange = (): void => {
        setBarState(prev => !prev)
    }

    const defaultProps = useMemo(() => ({
        barState,
        stateChange
    }), [barState])

    return (
        <BarContext.Provider value={defaultProps}>
            {children}
        </BarContext.Provider>
    );
};

export default BarProvider;