import { useAppSelector } from 'app/redux/hooks'
import { authStatusSelector } from 'app/redux/selectors'
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
