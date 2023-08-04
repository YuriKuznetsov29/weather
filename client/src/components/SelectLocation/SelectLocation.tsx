import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import Container from 'shared/ui/Container/Container'
import { NavigationArrow, MagnifyingGlass } from '@phosphor-icons/react'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import { CurrentLocation, setCurrentLocation } from 'app/redux/slices/locationSlice'
import { loadWeather } from 'app/redux/slices/weatherSlice'
import { getCoordinateLocation, getLocation } from 'services/getData'
import { currentLocationSelector } from 'app/redux/selectors'
import { storage } from 'services/storage'
import classNames from 'classnames'

import styles from './SelectLocation.module.scss'

const SelectLocation = () => {
    const [activeSearch, setActiveSearch] = useState(false)
    const [activeStyleSearch, setActiveStyleSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchRes, setSearchRes] = useState([])

    const dispatch = useAppDispatch()
    const location: CurrentLocation | null = useAppSelector(currentLocationSelector)

    const deferredQuery = useDeferredValue(searchValue)

    useEffect(() => {
        if (deferredQuery) {
            getCoordinateLocation(deferredQuery).then((locations) => {
                if ('results' in locations) {
                    setSearchRes(locations.results)
                }
            })
        }
    }, [deferredQuery])

    useEffect(() => {
        if (location) {
            const { lat, lon, timezone, city, country } = location
            dispatch(loadWeather({ lat: lat, lon: lon, timezone: timezone }))
            storage('currentLocation', {
                lat: lat,
                lon: lon,
                city: city,
                timezone: timezone,
                country: country,
            })
        }
    }, [location])

    const getCurrentLocation = () => {
        getLocation()
            .then((res) => res.city)
            .then((city) => {
                getCoordinateLocation(city).then((location) => {
                    const { latitude, longitude, name, timezone, country } = location.results[0]
                    dispatch(
                        setCurrentLocation({
                            lat: latitude,
                            lon: longitude,
                            city: name,
                            timezone: timezone,
                            country: country,
                        })
                    )
                    clearFind()
                })
            })
    }

    const startSearchLocation = (event: React.MouseEvent<HTMLFormElement>) => {
        if ((event.target as HTMLElement).dataset.type === 'inputLocation') {
            setActiveSearch(true)
            setActiveStyleSearch(true)
        } else if ((event.target as HTMLElement).dataset.type === 'getLocation') {
            getCurrentLocation()
        }
    }

    const searchLocation = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchValue((event.target as HTMLInputElement).value)
    }

    const selectLocation = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const location = (event.target as HTMLDivElement).dataset.location?.split(',')
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
                clearFind()
            }
        },
        [searchRes]
    )

    document.body.onclick = (event) => {
        if (!(event.target as HTMLElement).closest('#closeSearch')) {
            clearFind()
        }
    }

    const clearFind = () => {
        setSearchValue('')
        setSearchRes([])
        setActiveSearch(false)
        setActiveStyleSearch(false)
    }

    const renderResults = useMemo(() => {
        return searchRes.map((location) => {
            const { latitude, longitude, name, timezone, country, country_code, id } = location
            if (latitude && longitude && name && timezone && country && country_code && id) {
                return (
                    <div
                        className={styles.search__result}
                        key={id}
                        data-type="setLocation"
                        data-location={`${latitude},${longitude},${name},${timezone},${country}`}
                        onClick={(event) => selectLocation(event)}
                    >
                        {`${country}, ${name}, ${country_code}`}
                    </div>
                )
            }
        })
    }, [searchRes, selectLocation])

    return (
        <form className={styles.search} id="select" onClick={(event) => startSearchLocation(event)}>
            <Container>
                <div className={styles.search__wrapper} id="closeSearch">
                    <MagnifyingGlass
                        className={classNames(`${styles.search__icon}`, {
                            [styles.search__active]: activeStyleSearch,
                        })}
                        weight="thin"
                    />
                    <input
                        className={classNames(`${styles.search__input}`, {
                            [styles.search__active]: activeStyleSearch,
                        })}
                        type="text"
                        placeholder="Поиск"
                        value={searchValue}
                        data-type="inputLocation"
                        onInput={(event) => searchLocation(event)}
                    ></input>

                    <div className={styles.search__resultsWrapper}>
                        <div className={styles.search__wrapper}>
                            <div
                                className={classNames(`${styles.search__btnCurrentLocation}`, {
                                    [styles.active]: activeSearch,
                                    [styles.search__active]: searchRes.length > 0,
                                })}
                                data-type="getLocation"
                            >
                                <NavigationArrow
                                    className={classNames(`${styles.currentLocation__icon}`, {
                                        [styles.search__active]: searchRes.length > 0,
                                    })}
                                    weight="thin"
                                    data-type="getLocation"
                                />
                                Использовать текущее местоположение
                            </div>
                        </div>

                        <div className={styles.search__wrapper}>
                            <div className={styles.search__results} data-type="results">
                                {renderResults}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </form>
    )
}

export default SelectLocation
