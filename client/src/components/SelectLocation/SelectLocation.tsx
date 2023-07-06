/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import Container from "components/Container/Container"
import { NavigationArrow, MagnifyingGlass } from "@phosphor-icons/react"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { CurrentLocation, setCurrentLocation } from "app/slices/locationSlice"
import { loadWeather } from "app/slices/weatherSlice"
import { getCoordinateLocation, getLocation } from "services/getData"
import { currentLocationSelector } from "app/selectors"
import { storage } from "services/storage"

import styles from './SelectLocation.module.scss'

const SelectLocation = () => {
    const [activeSearch, setActiveSearch] = useState({})
    const [activeStyleSearch, setActiveStyleSearch] = useState({})
    const [searchValue, setSearchValue] = useState('')
    const [searchRes, setSearchRes] = useState([])

    const dispatch = useAppDispatch()
    const location: CurrentLocation | null = useAppSelector(currentLocationSelector)

    useEffect(() => {
        if (searchValue) {
            getCoordinateLocation(searchValue)
                .then(locations => {
                    if ("results" in locations) {
                        setSearchRes(locations.results)
                    }
                })
        }
    }, [searchValue])

    // useEffect(() => {
    //     if (storage('currentLocation')) {
    //         const {lat, lon, city, timezone, country} = storage('currentLocation')
    //         dispatch(setCurrentLocation({lat: lat, lon: lon, city: city, timezone: timezone, country: country}))
    //     } else {
    //         getCurrentLocation()
    //     }
    // }, [])

    useEffect(() => {
        if (location) {
            const {lat, lon, timezone, city, country} = location
            dispatch(loadWeather({lat: lat, lon: lon, timezone: timezone}))
            storage('currentLocation', {lat: lat, lon: lon, city: city, timezone: timezone, country: country})
        }
    }, [location])

    const getCurrentLocation = () => {
        getLocation()
            .then(res => res.city)
            .then(city => {
                getCoordinateLocation(city)
                .then(location => {
                    const {latitude, longitude, name, timezone, country} = location.results[0]
                    dispatch(setCurrentLocation({lat: latitude, lon: longitude, city: name, timezone: timezone, country: country}))
                    clearFind()
                })
            })
    }

    const startSearchLocation = (event: React.MouseEvent<HTMLFormElement>) => {
        if ((event.target as HTMLElement).dataset.type === 'inputLocation') {
            setActiveSearch(styles.active)
            setActiveStyleSearch(styles.search__active)
        } else if ((event.target as HTMLElement).dataset.type === 'getLocation') {
            getCurrentLocation()
        } 
        
    }

    const searchLocation = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchValue((event.target as HTMLInputElement).value)
    }

    const selectLocation = (event: React.MouseEvent<HTMLDivElement>) => {
        const location = (event.target as HTMLDivElement).dataset.location?.split(',')
        if (Array.isArray(location)) {
            dispatch(setCurrentLocation({lat: +location?.[0], lon: +location?.[1], city: location?.[2], timezone: location?.[3], country: location?.[4]}))
            clearFind()
        }
    }
    
    document.body.onclick = (event) => {
        if (!(event.target as HTMLElement).closest('#closeSearch')) {
            clearFind()
        }
    }

    const clearFind = () => {
        setSearchValue('')
        setSearchRes([])
        setActiveSearch({})
        setActiveStyleSearch({})
    }

    const renderResults = () => {
        return searchRes.map(location => {
            const {latitude, longitude, name, timezone, country, country_code, id} = location
            return <div 
                        className={styles.search__result} 
                        key={id} data-type="setLocation" 
                        data-location={`${latitude},${longitude},${name},${timezone},${country}`}
                        onClick={event => selectLocation(event)}>
                            {`${country}, ${name}, ${country_code}`}
                    </div>
        })
        
    }

    const results = renderResults()

    return (
        <form className={styles.search} id="select" onClick={((event) => startSearchLocation(event)) }>
            <Container>
                <div className={styles.search__wrapper} id="closeSearch">

                        <MagnifyingGlass className={`${styles.search__icon} ${activeStyleSearch}`} size={24}  weight="thin" />
                        <input className={`${styles.search__input} ${activeStyleSearch}`} type="text" placeholder="Поиск" value={searchValue} data-type="inputLocation" onInput={(event => searchLocation(event))}></input>

                    
                    <div className={styles.search__resultsWrapper}>

                        <div className={styles.search__wrapper}>
                            <div className={`${styles.search__btnCurrentLocation} ${activeSearch} ${searchRes.length > 0 ? styles.search__active : ''}`} data-type="getLocation">
                                <NavigationArrow className={styles.currentLocation__icon} size={24} weight="thin" data-type="getLocation"/>
                                Использовать текущее местоположение
                            </div>
                        </div>

                        <div className={styles.search__wrapper}>
                            <div className={styles.search__results} data-type="results">
                                {results}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </form>
        
    )
}

export default SelectLocation