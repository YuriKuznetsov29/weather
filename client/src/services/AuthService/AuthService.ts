import $api from '../http/index'
import { AxiosResponse } from 'axios'
import { AuthResponse } from 'services/AuthService/types/AuthResponse'

export class AuthService {
    static async signIn(
        email: string,
        password: string
    ): Promise<AxiosResponse<AuthResponse, any>> {
        return $api.post<AuthResponse>('/auth/signInWithPassword', { email, password })
    }

    static async signUp(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/signUp', { email, password })
    }

    static async signOut(): Promise<void> {
        return $api.post('/auth/signOut')
    }
}
