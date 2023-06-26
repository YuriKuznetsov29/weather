import Container from 'components/Container/Container'
import { ReactElement, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { currentLocation } from 'app/selectors'
import { CurrentLocation } from 'app/slices/locationSlice'
import { storage } from 'services/storage'
import { Thermometer } from '@phosphor-icons/react'
import { getWetherImage } from 'services/tranformData'
import { getWetherDaily } from 'services/getData'
import { setCurrentLocation } from 'app/slices/locationSlice'
import Location from './Location'

import styles from './RecentLocations.module.scss'

const RecentLocations = () => {
    const [locationElement, setLocationElement] = useState<ReactElement[]>([])

    const dispatch = useAppDispatch()
    const currLocation: CurrentLocation | null = useAppSelector(currentLocation)
    const [locations, setLocations] = useState<CurrentLocation[]>([])


    useEffect(() => {
        if (storage('recentLocations')) {
            setLocations(storage('recentLocations'))
        } 
    }, [])

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
            testRender()
            // setLocationElement(testRender())
            // renderLocations()
        }
    }, [locations])

    const addLocation = () => {
        if (currLocation) {
            let check = true
            locations.forEach(location => {
                if (JSON.stringify(location) === JSON.stringify(currLocation)) {
                    check = false
                }
            })
            if (locations.length < 3 && check) {
                // locations.push(currLocation)
                // setLocations([...locations, currLocation])
                setLocations(locations.concat(currLocation))
            } else if (check && locations.length === 3) {
                // locations.shift()
                // locations.push(currLocation)
                    // setLocations([locations[1], locations[2], currLocation])

                    setLocations(locations.slice(1).concat(currLocation))
            }
        }
    }

    // function adaptiveContent(city: string, country: string) {
    //     if (document.documentElement.clientWidth > 650) {
    //         return( 
    //             <>
    //                 <div className={styles.recent_locations__item_city} >{city}</div>
    //                 <div className={styles.recent_locations__item_country}>{country}</div>
    //             </>
    //         )
    //     } else {
    //         return (
    //         <div className={styles.recent_locations__item_city} >
    //             {city}, <div className={styles.recent_locations__item_country}>{country}</div>
    //         </div>)
    //     }
    // }

    // const selectRecent = (event: React.MouseEvent<HTMLDivElement>) => {
    //     const location = (event.target as HTMLDivElement).dataset.recentlocation?.split(',')
    //     if (Array.isArray(location)) {
    //         dispatch(setCurrentLocation({lat: +location?.[0], lon: +location?.[1], city: location?.[2], timezone: location?.[3], country: location?.[4]}))
    //     }
    // }

    //data-recentLocation="${lat},${lon},${city},${timezone},${country}" size={24} color="#deb25c" weight="thin"
    // const renderLocations = () => {
    //     const locationsElements: ReactElement[] = []
    //     locations.forEach(async (location, i) => {
    //         const {lat, lon, city, timezone, country} = location
    //         const {sunrise, sunset, weathercode, utcOffset, currentTempRound, realFeel} = await getWetherDaily(lat, lon, timezone)
    //                 const image = getWetherImage(sunrise, sunset, weathercode, utcOffset)
    //                 locationsElements.push(
    //                     <>  
    //                         <div 
    //                             key={i}
    //                             className={styles.recent_locations__item} 
    //                             data-type="recentItem" 
    //                             data-recentlocation={`${lat},${lon},${city},${timezone},${country}`}
    //                             onClick={(event) => selectRecent(event)}>

    //                             {adaptiveContent(city, country)}
    //                                 <div className={styles.recent_locations__item_data}>
    //                                     <i className={`wi ${image} ${styles.recent_icon}`}></i>
    //                                     <div className={styles.recent_locations__item_data_temp}>{currentTempRound}</div>
    //                                     <Thermometer className="ph-thin ph-thermometer" />
    //                                 </div>
    //                                 <div className={styles.recent_locations__item_realFeel}>
    //                                     <div className={styles.recent_locations__item_realFeel_note}>RealFeel</div>
    //                                     <div className={styles.recent_locations__item_realFeel_temp}>{realFeel}°C</div>
    //                                 </div>
                                
    //                         </div>
    //                     </>
    //                 )
    //         if (i+1 === locations.length) {
    //             setLocationElement(locationsElements)
    //         }
    //         debugger
    //     })
    // } 

    const testRender = () => {
        setLocationElement(locations.map((location, i) => {
            return (
                <Location key={i} location={location} />
            )
        }))
    }

    // const content = testRender()

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
                            {/* {content} */}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        
    )
}

export default RecentLocations