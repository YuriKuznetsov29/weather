import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { AuthService } from "services/AuthService/AuthService"

interface RequestAuthData {
    email: string
    password: string
}

export const signIn = createAsyncThunk(
    'login/signIn',
    async ({ email, password }: RequestAuthData) => {
        try {
            const response = await AuthService.signIn(email, password)
            localStorage.setItem('token', response.data.accessToken)
            return response.data
        } catch (e) {
            console.log(e)
            if (e instanceof AxiosError) {
                return e.response?.data.error.message
            }
        }
    }
)