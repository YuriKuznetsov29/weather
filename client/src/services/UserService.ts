import $api from "components/http"
import { AxiosResponse } from "axios"
import { IUser } from "components/models/IUser"


export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}