import $api from '../http/index'
import { AxiosResponse } from 'axios'
import { AuthResponse } from 'models/response/AuthResponse'
import { UserResponse } from 'models/response/UserResponse'
import { CurrentLocation } from 'modules/Locations'

export default class UserService {
    static async saveLocations(
        userId: string,
        savedLocations: CurrentLocation[]
    ): Promise<AxiosResponse<UserResponse>> {
        return $api.patch<AuthResponse>(`/user/${userId}`, { savedLocations })
    }
}
