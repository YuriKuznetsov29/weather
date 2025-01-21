import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import Container from 'shared/ui/Container/Container'
import { NavigationArrow, MagnifyingGlass } from '@phosphor-icons/react'
import { getCoordinateLocation, getLocation } from 'services/DataService/getData'
import { currentLocationSelector } from '../../store/selectors'
import { storage } from 'shared/lib/storage'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import Input from 'shared/ui/Input/Input'
import { getCurrentLocation } from '../../api/getCurrentLocation'
import styles from './SelectLocation.module.scss'
import { loadWeather } from 'modules/Weather/api/loadWeather'
import { CurrentLocation, setCurrentLocation } from 'modules/Locations/store/locationSlice'
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider/config/hooks'
import { ILocation } from 'services/DataService/types/locationCoordinates'
import { weatherDataStatus } from 'modules/Weather'
import { useNavigate } from 'react-router-dom'

const SelectLocation = () => {
    const [activeSearch, setActiveSearch] = useState(false)
    const [activeStyleSearch, setActiveStyleSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchRes, setSearchRes] = useState<ILocation[]>([])

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const location: CurrentLocation | null = useAppSelector(currentLocationSelector)
    const weatherLoadingStatus = useAppSelector(weatherDataStatus)

    const deferredQuery = useDeferredValue(searchValue)

    useEffect(() => {
        if (deferredQuery) {
            getCoordinateLocation(deferredQuery)
                .then((locations) => {
                    if ('results' in locations) {
                        setSearchRes(locations.results)
                    }
                })
                .catch(() => {
                    setSearchRes([])
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

    const startSearchLocation = (event: React.MouseEvent<HTMLFormElement>) => {
        if ((event.target as HTMLElement).dataset.type === 'inputLocation') {
            setActiveSearch(true)
            setActiveStyleSearch(true)
        } else if ((event.target as HTMLElement).dataset.type === 'getLocation') {
            dispatch(getCurrentLocation())
            clearFind()
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
                        data-testid="locationItem"
                        onClick={(event) => selectLocation(event)}
                    >
                        {`${country}, ${name}, ${country_code}`}
                    </div>
                )
            }
        })
    }, [searchRes, selectLocation])

    if (weatherLoadingStatus === 'error') {
        console.error('Произошла ошибка при загрузке данных погоды.')
        navigate('/error')
    }

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
                    <Input
                        inputClassName={classNames(`${styles.search__input}`, {
                            [styles.search__active]: activeStyleSearch,
                        })}
                        type="text"
                        placeholder="Поиск"
                        value={searchValue}
                        dataType="inputLocation"
                        dataTestid="inputTest"
                        onInput={(event) => searchLocation(event)}
                    ></Input>

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
