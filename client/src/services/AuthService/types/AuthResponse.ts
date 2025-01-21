import { IUser } from '../../UserService/types/IUser'

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}
