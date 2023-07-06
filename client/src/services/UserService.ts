import $api from "components/http"
import { AxiosResponse } from "axios"
import { CurrentLocation } from "app/slices/locationSlice"
import { AuthResponse } from "components/models/response/AuthResponse"
import { UserResponse } from "components/models/response/UserResponse"


export default class UserService {

    static async saveLocations(userId: string, savedLocations: CurrentLocation[]): Promise<AxiosResponse<UserResponse>> {
        return $api.patch<AuthResponse>(`/user/${userId}`, { savedLocations })
    }
}