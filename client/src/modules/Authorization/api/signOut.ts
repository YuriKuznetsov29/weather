import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthService } from "services/AuthService/AuthService"

export const signOut = createAsyncThunk('login/signOut', async () => {
    try {
        await AuthService.signOut()
        localStorage.removeItem('token')
    } catch (e: unknown) {
        console.log(e)
    }
})