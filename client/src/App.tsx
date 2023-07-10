import Main from "pages/Main"
import Tomorrow from "pages/Tomorrow"
import ErrorPage from "components/ErrorPage/ErrorPage"
import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom"
import TenDays from "pages/TenDays"
import { useEffect } from "react"
import { useAppDispatch } from "app/hooks"
import { checkAuth } from "app/slices/loginSlice"
import SavedLocatons from "pages/SavedLocations"
import PrivateRoute from "components/hoc/PrivateRoute"
import SignUp from "pages/SignUp"
import SignIn from "pages/SingnIn"
import { storage } from "services/storage"
import { setCurrentLocation } from "app/slices/locationSlice"
import { getLocation, getCoordinateLocation } from "services/getData"

const router = createHashRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tomorrow",
    element: <Tomorrow />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tenDays",
    element: <TenDays />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signUp",
    element: (
      <SignUp />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signIn",
    element: (
      <SignIn />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/savedLocations",
    element: (
      <PrivateRoute>
        <SavedLocatons />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
])

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth())
    }

    if (storage('currentLocation')) {
      const {lat, lon, city, timezone, country} = storage('currentLocation')
      dispatch(setCurrentLocation({lat: lat, lon: lon, city: city, timezone: timezone, country: country}))
    } else {
      getLocation()
      .then(res => res.city)
      .then(city => {
          getCoordinateLocation(city)
          .then(location => {
              const {latitude, longitude, name, timezone, country} = location.results[0]
              dispatch(setCurrentLocation({lat: latitude, lon: longitude, city: name, timezone: timezone, country: country}))
          })
      })
    }
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
