import $api from "components/http"
import { AxiosResponse } from "axios"
import { AuthResponse } from "components/models/response/AuthResponse"

export class AuthService {
    static async signIn(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/signInWithPassword', {email, password})
    }

    static async signUn(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/signUp', {email, password})
    }
    static async signOut(): Promise<void> {
        return $api.post('/signOut')
    }
}