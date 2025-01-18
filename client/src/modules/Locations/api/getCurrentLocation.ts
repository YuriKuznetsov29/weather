import { Dispatch, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { getCoordinateLocation, getLocation } from 'services/getData'
import { CurrentLocation } from '../store/locationSlice'

export const getCurrentLocation = createAsyncThunk<CurrentLocation, void, { rejectValue: string }>(
    'locations/getCurrentLocation',
    async (_, { rejectWithValue }) => {
        try {
            const { city } = await getLocation()

            if (city) {
                const location = await getCoordinateLocation(city)
                if (!location.results) {
                    toast.error(
                        'Произошла ошибка при определении текущего местоположения. Пожалуйста воспользуйтесь поиском.'
                    )
                    return rejectWithValue('error')
                }

                const { latitude, longitude, name, timezone, country } = location.results[0]

                return {
                    lat: latitude,
                    lon: longitude,
                    city: name,
                    timezone: timezone,
                    country: country,
                } as CurrentLocation
            }

            toast.error(
                'Произошла ошибка при определении текущего местоположения. Пожалуйста воспользуйтесь поиском.'
            )
            return rejectWithValue('error')
        } catch (error) {
            console.log(error)
            return rejectWithValue('error')
        }
    }
)
