import { useAppSelector, useAppDispatch } from 'app/providers/StoreProvider/config/hooks'
import { useNavigate } from 'react-router-dom'

import styles from './Header.module.scss'
import { authStatusSelector, userSelector } from 'modules/Authorization/store/selectors'
import { currentLocationSelector } from 'modules/Locations/store/selectors'
import { CurrentLocation } from 'modules/Locations'
import { saveLocations } from 'modules/Authorization/api/saveLocations'
import toast from 'react-hot-toast'

const StarSvg = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const auth = useAppSelector(authStatusSelector)
    const currentLocation = useAppSelector(currentLocationSelector)
    const { userId, savedLocations } = useAppSelector(userSelector)

    const checkInclude = () => {
        if (currentLocation && savedLocations) {
            return Boolean(
                savedLocations.find(
                    (location: CurrentLocation) => location.city === currentLocation.city
                )
            )
        }
        return false
    }

    const saveCurrentLocation = () => {
        if (Array.isArray(savedLocations) && auth && currentLocation) {
            const newLocations = checkInclude()
                ? savedLocations.filter((location) => location.city !== currentLocation.city)
                : savedLocations.concat([currentLocation])
            dispatch(saveLocations({ userId, savedLocations: newLocations as CurrentLocation[] }))
            if (checkInclude()) {
                toast.success('Локация удалена.')
            } else {
                toast.success('Локация сохранена.')
            }
        } else {
            navigate('/signIn')
            toast('Войдите или зарегистрируйтесь, чтобы сохранять локации.')
        }
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width="30"
            height="30"
            onClick={saveCurrentLocation}
        >
            <rect width="256" height="256" fill="none" />
            <path
                className={`${styles.star} ${checkInclude() && styles.activeStar}`}
                d="M135.34,28.9l23.23,55.36a8,8,0,0,0,6.67,4.88l59.46,5.14a8,8,0,0,1,4.54,14.07L184.13,147.7a8.08,8.08,0,0,0-2.54,7.89l13.52,58.54a8,8,0,0,1-11.89,8.69l-51.1-31a7.93,7.93,0,0,0-8.24,0l-51.1,31a8,8,0,0,1-11.89-8.69l13.52-58.54a8.08,8.08,0,0,0-2.54-7.89L26.76,108.35A8,8,0,0,1,31.3,94.28l59.46-5.14a8,8,0,0,0,6.67-4.88L120.66,28.9A8,8,0,0,1,135.34,28.9Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
            />
        </svg>
    )
}

export default StarSvg
