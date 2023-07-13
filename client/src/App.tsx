import ErrorPage from "components/ErrorPage/ErrorPage"
import { RouterProvider, createHashRouter } from "react-router-dom"
import { Suspense, useEffect } from "react"
import { useAppDispatch } from "app/hooks"
import { checkAuth } from "app/slices/loginSlice"
import { storage } from "services/storage"
import { setCurrentLocation } from "app/slices/locationSlice"
import { getLocation, getCoordinateLocation } from "services/getData"
import { MainAsync } from "pages/Main/Main.async"
import { SavedLocationsAsync } from "pages/SavedLocations/SavedLocations.async"
import { SignInAsync } from "pages/SignIn/SignIn.async"
import { SignUpAsync } from "pages/SignUp/SignUp.async"
import { TenDaysAsync } from "pages/TenDays/TenDays.async"
import { TomorrowAsync } from "pages/Tomorrow/Tomorrow.async"
import Page404 from "components/Page404/Page404"
import Spinner from "components/Spinner/Spinner"

const router = createHashRouter([
  {
    path: "/",
    element: <MainAsync />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tomorrow",
    element: <TomorrowAsync />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tenDays",
    element: <TenDaysAsync />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signUp",
    element: (
      <SignUpAsync />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signIn",
    element: (
      <SignInAsync />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/savedLocations",
    element: (
        <SavedLocationsAsync />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: (
        <Page404 />
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
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
