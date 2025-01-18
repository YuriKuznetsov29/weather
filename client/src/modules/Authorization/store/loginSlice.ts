import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../../models/IUser'
import { signUp } from '../api/signUp'
import { signIn } from '../api/signIn'
import { signOut } from '../api/signOut'
import { checkAuth } from '../api/checkAuth'
import { saveLocations } from '../api/saveLocations'
import { CurrentLocation } from 'modules/Locations'

export interface RequestSavedLocationsData {
    userId: string
    savedLocations: CurrentLocation[]
}
type LoginSlice = {
    authStatus: boolean
    signInState: boolean
    signUpState: boolean
    user: IUser
    status: 'idle' | 'loading' | 'finished' | 'error'
    authCheckStatus: 'idle' | 'loading' | 'finished' | 'error'
    serverErrors: string
}

const initialState: LoginSlice = {
    authStatus: false,
    signInState: false,
    signUpState: false,
    user: {} as IUser,
    status: 'idle',
    authCheckStatus: 'idle',
    serverErrors: '',
}

const loginSlice = createSlice({
    name: 'login',
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
                state.status = 'loading'
                state.serverErrors = ''
            })
            .addCase(signUp.rejected, (state) => {
                state.status = 'error'
            })
            .addCase(signUp.fulfilled, (state, action) => {
                console.log('user', action.payload?.user)
                if (action.payload?.user) {
                    state.authStatus = true
                    state.user = action.payload.user
                    state.status = 'finished'
                    state.serverErrors = ''
                } else {
                    state.status = 'error'
                    state.serverErrors = action.payload
                }
            })
            .addCase(signIn.pending, (state) => {
                state.status = 'loading'
                state.serverErrors = ''
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'error'
            })
            .addCase(signIn.fulfilled, (state, action) => {
                if (action.payload?.user) {
                    state.authStatus = true
                    state.user = action.payload.user
                    state.status = 'finished'
                    state.serverErrors = ''
                } else {
                    state.status = 'error'
                    state.serverErrors = action.payload
                }
            })
            .addCase(signOut.fulfilled, (state) => {
                state.authStatus = false
                state.user = {} as IUser
            })
            .addCase(checkAuth.pending, (state) => {
                state.authCheckStatus = 'loading'
            })
            .addCase(checkAuth.rejected, (state) => {
                state.authCheckStatus = 'error'
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload) {
                    state.authStatus = true
                    state.user = action.payload.user
                    state.authCheckStatus = 'finished'
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
