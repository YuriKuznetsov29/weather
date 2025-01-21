import ErrorPage from 'pages/ErrorPage/ErrorPage'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import { useAppDispatch } from 'app/providers/StoreProvider/config/hooks'
import { storage } from 'services/storage'
import { getLocation, getCoordinateLocation } from 'services/DataService/getData'
import { MainAsync } from 'pages/Main/Main.async'
import { SavedLocationsAsync } from 'pages/SavedLocations/SavedLocations.async'
import { SignInAsync } from 'pages/SignIn/SignIn.async'
import { SignUpAsync } from 'pages/SignUp/SignUp.async'
import { TenDaysAsync } from 'pages/TenDays/TenDays.async'
import { TomorrowAsync } from 'pages/Tomorrow/Tomorrow.async'
import Page404 from 'pages/Page404/Page404'
import Spinner from 'shared/ui/Spinner/Spinner'
import toast from 'react-hot-toast'
import { checkAuth } from 'modules/Authorization/api/checkAuth'
import { setCurrentLocation } from 'modules/Locations/store/locationSlice'

const router = createHashRouter([
    {
        path: '/',
        element: <MainAsync />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tomorrow',
        element: <TomorrowAsync />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tenDays',
        element: <TenDaysAsync />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/signUp',
        element: <SignUpAsync />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/signIn',
        element: <SignInAsync />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/savedLocations',
        element: <SavedLocationsAsync />,
        errorElement: <ErrorPage />,
    },
    {
        path: '*',
        element: <Page404 />,
        errorElement: <ErrorPage />,
    },
])

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }

        if (storage('currentLocation')) {
            const { lat, lon, city, timezone, country } = storage('currentLocation')
            dispatch(
                setCurrentLocation({
                    lat: lat,
                    lon: lon,
                    city: city,
                    timezone: timezone,
                    country: country,
                })
            )
        } else {
            getLocation()
                .then((res) => res.city)
                .then((city) => {
                    getCoordinateLocation(city).then((location) => {
                        if (location.results) {
                            const { latitude, longitude, name, timezone, country } =
                                location.results[0]
                            dispatch(
                                setCurrentLocation({
                                    lat: latitude,
                                    lon: longitude,
                                    city: name,
                                    timezone: timezone,
                                    country: country,
                                })
                            )
                        } else {
                            dispatch(
                                setCurrentLocation({
                                    lat: 55.75222,
                                    lon: 37.61556,
                                    city: 'Москва',
                                    timezone: 'Europe/Moscow',
                                    country: 'Россия',
                                })
                            )
                            toast.error(
                                'Произошла ошибка при определении текущего местоположения. Пожалуйста воспользуйтесь поиском.'
                            )
                        }
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
