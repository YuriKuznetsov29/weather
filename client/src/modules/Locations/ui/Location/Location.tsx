import { getWetherImage } from 'helpers/transformData'
import { getWetherDaily } from 'services/DataService/getData'
import { useAppDispatch } from 'app/providers/StoreProvider/config/hooks'
import { memo, useEffect, useState } from 'react'
import { WeatherData } from 'helpers/transformData'
import { Thermometer } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { CurrentLocation, setCurrentLocation } from 'modules/Locations/store/locationSlice'
import styles from './Location.module.scss'

interface LocationProps {
    location: CurrentLocation
    redirect?: boolean
}

const Location = memo(({ location, redirect }: LocationProps) => {
    const [data, setData] = useState<WeatherData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { lat, lon, city, timezone, country } = location

    useEffect(() => {
        getWetherDaily(lat, lon, timezone)
            .then((res) => {
                setData(res)
            })
            .catch(() => {
                setData(null)
            })
            .finally(() => setIsLoading(false))
    }, [])

    function adaptiveContent(city: string, country: string) {
        if (document.documentElement.clientWidth > 650) {
            return (
                <>
                    <div className={styles.recent_locations__item_city}>{city}</div>
                    <div className={styles.recent_locations__item_country}>{country}</div>
                </>
            )
        } else {
            return (
                <div className={styles.recent_locations__item_city}>
                    {city}, <div className={styles.recent_locations__item_country}>{country}</div>
                </div>
            )
        }
    }

    const selectRecent = (event: React.MouseEvent<HTMLDivElement>) => {
        const location = (
            (event.target as HTMLDivElement).closest('[data-type=recentItem]') as HTMLDivElement
        ).dataset.recentlocation?.split(',')

        if (Array.isArray(location)) {
            dispatch(
                setCurrentLocation({
                    lat: +location?.[0],
                    lon: +location?.[1],
                    city: location?.[2],
                    timezone: location?.[3],
                    country: location?.[4],
                })
            )
            if (redirect) {
                navigate('/')
            }
        }
    }

    const renderLocation = () => {
        if (data) {
            const { sunrise, sunset, weathercode, utcOffset, currentTempRound, realFeel } =
                data.currentWeather
            const image = getWetherImage(sunrise, sunset, weathercode, utcOffset)
            return (
                <div
                    className={styles.recent_locations__item}
                    data-type="recentItem"
                    data-recentlocation={`${lat},${lon},${city},${timezone},${country}`}
                    onClick={(event) => selectRecent(event)}
                >
                    {adaptiveContent(city, country)}
                    <div className={styles.recent_locations__item_data}>
                        <i className={`wi ${image} ${styles.recent_icon}`}></i>
                        <div className={styles.recent_locations__item_data_temp}>
                            {currentTempRound}
                        </div>
                        <Thermometer className="ph-thin ph-thermometer" />
                    </div>
                    <div className={styles.recent_locations__item_realFeel}>
                        <div className={styles.recent_locations__item_realFeel_note}>RealFeel</div>
                        <div className={styles.recent_locations__item_realFeel_temp}>
                            {realFeel}°C
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    const content = renderLocation()

    if (isLoading) {
        return (
            <div className={styles.smallLoading}>
                <div className={styles.smallGradient}></div>
            </div>
        )
    }

    return <>{content}</>
})

export default Location
