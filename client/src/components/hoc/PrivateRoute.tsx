import { useAppSelector } from 'app/providers/StoreProvider/config/hooks'
import { authStatusSelector } from 'modules/Authorization/store/selectors'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const auth = useAppSelector(authStatusSelector)

    if (!auth) {
        return <Navigate to="/signIn"></Navigate>
    }

    return children
}

export default PrivateRoute
