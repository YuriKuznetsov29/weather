import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "http/index"
import { AuthResponse } from "models/response/AuthResponse"

export const checkAuth = createAsyncThunk('login/checkAuth', async () => {
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/auth/token`, {
            withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        return response.data
    } catch (e: unknown) {
        console.log(e)
    }
})