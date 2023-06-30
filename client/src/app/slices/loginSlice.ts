import { createSlice } from "@reduxjs/toolkit"
import { IUser } from '../../components/models/IUser'
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
    user: {} as IUser
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
        }
    },
})

export const { setAuthStatus, setSignInState, setSignUpState } = loginSlice.actions
export const loginReducer = loginSlice.reducer