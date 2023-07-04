import { useAppSelector } from "app/hooks"
import { authStatusSelector } from "app/selectors"
import { Navigate } from "react-router-dom"
import SavedLocations from "../../pages/SavedLocations"

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = useAppSelector(authStatusSelector)

  return <>{children}</>
}

export default PrivateRoute
