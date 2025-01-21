import $api from '../http/index'
import { AxiosResponse } from 'axios'
import { AuthResponse } from 'services/AuthService/types/AuthResponse'
import { UserResponse } from 'services/UserService/types/UserResponse'
import { CurrentLocation } from 'modules/Locations'

export default class UserService {
    static async saveLocations(
        userId: string,
        savedLocations: CurrentLocation[]
    ): Promise<AxiosResponse<UserResponse>> {
        return $api.patch<AuthResponse>(`/user/${userId}`, { savedLocations })
    }
}
