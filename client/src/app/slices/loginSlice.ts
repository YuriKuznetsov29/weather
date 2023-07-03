import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { IUser } from "../../components/models/IUser"
import { AuthService } from "services/AuthService"
import axios from "axios"
import { AuthResponse } from "components/models/response/AuthResponse"
import { API_URL } from "components/http"

export const signUp = createAsyncThunk(
    "login/signUp",
    async ({ email, password }: RequestAuthData) => {
        console.log(email, password)
        try {
            const response = await AuthService.signUp(email, password)
            localStorage.setItem("token", response.data.accessToken)
            return response.data
        } catch (e: unknown) {
            console.log(e)
        }
    }
)

export const signIn = createAsyncThunk(
    "login/signIn",
    async ({ email, password }: RequestAuthData) => {
        console.log(email, password)
        try {
            const response = await AuthService.signIn(email, password)
            console.log(response)
            localStorage.setItem("token", response.data.accessToken)
            return response.data
        } catch (e: unknown) {
            console.log(e)
        }
    }
)

export const signOut = createAsyncThunk(
    "login/signOut",
    async () => {
        try {
            await AuthService.signOut()
            localStorage.removeItem("token")
        } catch (e: unknown) {
            console.log(e)
        }
    }
)

export const checkAuth = createAsyncThunk(
    "login/checkAuth",
    async () => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/token`, {withCredentials: true})
            localStorage.setItem("token", response.data.accessToken)
            return response.data
        } catch (e: unknown) {
            console.log(e)
        }
    }
)

interface RequestAuthData {
    email: string
    password: string
}

type LoginSlice = {
    authStatus: boolean
    signInState: boolean
    signUpState: boolean
    user: IUser
}

const initialState: LoginSlice = {
    authStatus: false,
    signInState: false,
    signUpState: false,
    user: {} as IUser,
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setAuthStatus: (state) => {
            state.authStatus = !state.authStatus
        },
        setSignInState: (state) => {
            state.signInState = !state.signInState
        },
        setSignUpState: (state) => {
            state.signUpState = !state.signUpState
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(loadWeather.pending, (state) => {
            //     state.status = "loading"
            // })
            // .addCase(loadWeather.rejected, (state) => {
            //     state.status = "error"
            // })
            .addCase(signUp.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload) {
                    state.authStatus = true
                    state.user = action.payload.user
                }
            })
            .addCase(signIn.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload) {
                    state.authStatus = true
                    state.user = action.payload.user
                }
            })
            .addCase(signOut.fulfilled, (state) => {
                state.authStatus = false
                state.user = {} as IUser
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload) {
                    state.authStatus = true
                    state.user = action.payload.user
                }
            })
    },
})

export const { setAuthStatus, setSignInState, setSignUpState, setUser } = loginSlice.actions
export const loginReducer = loginSlice.reducer
