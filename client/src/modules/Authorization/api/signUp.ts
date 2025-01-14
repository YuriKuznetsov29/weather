import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { AuthService } from "services/AuthService"

interface RequestAuthData {
    email: string
    password: string
}

export const signUp = createAsyncThunk(
    'login/signUp',
    async ({ email, password }: RequestAuthData) => {
        console.log(email, password)
        try {
            const response = await AuthService.signUp(email, password)
            localStorage.setItem('token', response.data.accessToken)
            return response.data
        } catch (e: unknown) {
            console.log(e)
            if (e instanceof AxiosError) {
                return e.response?.data.error.message
            }
        }
    }
)