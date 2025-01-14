import { createAsyncThunk } from "@reduxjs/toolkit"
import { RequestSavedLocationsData } from "../store/loginSlice"
import UserService from "services/UserService"
import { AxiosError } from "axios"

export const saveLocations = createAsyncThunk(
    'login/saveLocations',
    async ({ userId, savedLocations }: RequestSavedLocationsData) => {
        try {
            const response = await UserService.saveLocations(userId, savedLocations)
            return response.data.user
        } catch (e) {
            console.log(e)
            if (e instanceof AxiosError) {
                return e.response?.data.error.message
            }
        }
    }
)