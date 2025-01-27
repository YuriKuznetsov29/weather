import Container from 'shared/ui/Container/Container'
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { useAppSelector } from 'app/providers/StoreProvider/config/hooks'
import { storage } from 'shared/lib/storage'
import Location from '../Location/Location'
import { currentLocationSelector } from '../../store/selectors'
import styles from './RecentLocations.module.scss'
import { CurrentLocation } from 'modules/Locations/store/locationSlice'

const RecentLocations = () => {
    const [locationElement, setLocationElement] = useState<ReactElement[]>([])

    const currLocation: CurrentLocation | null = useAppSelector(currentLocationSelector)
    const [locations, setLocations] = useState<CurrentLocation[]>(storage('recentLocations') || [])

    useEffect(() => {
        if (locations.length > 0) {
            addLocation()
        } else if (currLocation && !storage('recentLocations')) {
            setLocations([currLocation])
        }
    }, [currLocation])

    useEffect(() => {
        if (locations.length > 0) {
            storage('recentLocations', locations)
            renderLocations()
        }
    }, [locations])

    const addLocation = () => {
        if (currLocation) {
            let check = true
            locations.forEach((location) => {
                if (JSON.stringify(location) === JSON.stringify(currLocation)) {
                    check = false
                }
            })
            if (locations.length < 3 && check) {
                setLocations(locations.concat(currLocation))
            } else if (check && locations.length === 3) {
                setLocations(locations.slice(1).concat(currLocation))
            }
        }
    }

    const renderLocations = () => {
        setLocationElement(
            locations.map((location, i) => {
                return <Location key={i} location={location} />
            })
        )
    }

    return (
        <div className={styles.recent_locations} id="recent">
            <Container>
                <div className={styles.recent_locations__inner}>
                    <div className={styles.recent_locations__wrapper}>
                        <div className={styles.recent_location__title}>НЕДАВНИЕ МЕСТОПОЛОЖЕНИЯ</div>
                    </div>
                    <div className={styles.recent_locations__inner}>
                        <div className={styles.recent_locations__wrapper} id="recentWrapper">
                            {locationElement}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default RecentLocations
