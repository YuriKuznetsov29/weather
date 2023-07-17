import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { IUser } from "../../components/models/IUser"
import { AuthService } from "services/AuthService"
import axios, { AxiosError } from "axios"
import { AuthResponse } from "components/models/response/AuthResponse"
import { API_URL } from "../../http/index"
import UserService from "services/UserService"
import { CurrentLocation } from "./locationSlice"

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
            if (e instanceof AxiosError) {
                return e.response?.data.error.message
            }
        }
    }
)

export const signIn = createAsyncThunk(
    "login/signIn",
    async ({ email, password }: RequestAuthData) => {
        try {
            const response = await AuthService.signIn(email, password)
            localStorage.setItem("token", response.data.accessToken)
            return response.data
        } catch (e) {
            console.log(e)
            if (e instanceof AxiosError) {
                return e.response?.data.error.message
            }
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

export const saveLocations = createAsyncThunk(
    "login/saveLocations",
    async ({userId, savedLocations}: RequestSavedLocationsData) => {
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

export interface RequestSavedLocationsData {
    userId: string
    savedLocations: CurrentLocation[]
}
interface RequestAuthData {
    email: string
    password: string
}

type LoginSlice = {
    authStatus: boolean
    signInState: boolean
    signUpState: boolean
    user: IUser
    status: "idle" | "loading" | "finished" | "error"
    authCheckStatus: "idle" | "loading" | "finished" | "error"
    serverErrors: string
}

const initialState: LoginSlice = {
    authStatus: false,
    signInState: false,
    signUpState: false,
    user: {} as IUser,
    status: "idle",
    authCheckStatus: "idle",
    serverErrors: ''
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
            state.serverErrors = ''
        },
        setSignUpState: (state) => {
            state.signUpState = !state.signUpState
            state.serverErrors = ''
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.status = "loading"
            })
            .addCase(signUp.rejected, (state) => {
                state.status = "error"
            })
            .addCase(signUp.fulfilled, (state, action) => {
                console.log('user' ,action.payload?.user)
                if (action.payload?.user) {
                    state.authStatus = true
                    state.user = action.payload.user
                    state.status = "finished"
                    state.serverErrors = ''
                } else {
                    state.status = "error"
                    state.serverErrors = action.payload
                }
            })
            .addCase(signIn.pending, (state) => {
                state.status = "loading"
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(signIn.fulfilled, (state, action) => {
                if (action.payload?.user) {
                    state.authStatus = true
                    state.user = action.payload.user
                    state.status = "finished"
                    state.serverErrors = ''
                } else {
                    state.status = "error"
                    state.serverErrors = action.payload
                }
            })
            .addCase(signOut.fulfilled, (state) => {
                state.authStatus = false
                state.user = {} as IUser
            })
            .addCase(checkAuth.pending, (state) => {
                state.authCheckStatus = "loading"
            })
            .addCase(checkAuth.rejected, (state) => {
                state.authCheckStatus = "error"
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload) {
                    state.authStatus = true
                    state.user = action.payload.user
                    state.authCheckStatus = "finished"
                }
            })
            .addCase(saveLocations.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload
                }
            })
    },
})

export const { setAuthStatus, setSignInState, setSignUpState, setUser } = loginSlice.actions
export const loginReducer = loginSlice.reducer
