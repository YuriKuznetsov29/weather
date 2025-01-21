import axios from 'axios'
import { AuthResponse } from 'services/AuthService/types/AuthResponse'

export const API_URL = `http://webdev.batgen.ru:8080/api`

//84.38.183.52

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await axios.get<AuthResponse>(`${API_URL}/auth/token`, {
                    withCredentials: true,
                })
                localStorage.setItem('token', response.data.accessToken)
                return $api.request(originalRequest)
            } catch (e) {
                console.log('user in not autorized')
            }
        }
        throw error
    }
)

export default $api
