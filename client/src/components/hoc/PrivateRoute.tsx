import { useAppSelector } from "app/hooks"
import { authStatusSelector, statusAuthCheckSelector } from "app/selectors"
import { Navigate } from "react-router-dom"

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useAppSelector(authStatusSelector)
  const status = useAppSelector(statusAuthCheckSelector)

  if (!auth && status === "finished") {
    return <Navigate to='/signIn'></Navigate>
  }

  return children
}

export default PrivateRoute
