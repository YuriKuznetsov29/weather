import $api from '../http/index'
import { AxiosResponse } from 'axios'
import { CurrentLocation } from 'app/redux/slices/locationSlice'
import { AuthResponse } from 'models/response/AuthResponse'
import { UserResponse } from 'models/response/UserResponse'

export default class UserService {
    static async saveLocations(
        userId: string,
        savedLocations: CurrentLocation[]
    ): Promise<AxiosResponse<UserResponse>> {
        return $api.patch<AuthResponse>(`/user/${userId}`, { savedLocations })
    }
}
