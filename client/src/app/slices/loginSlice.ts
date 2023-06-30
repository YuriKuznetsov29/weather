import { createSlice } from "@reduxjs/toolkit"

type LoginSlice = {
    authStatus: boolean
    signInState: boolean
    signUpState: boolean
}

const initialState: LoginSlice = {
    authStatus: false,
    signInState: false,
    signUpState: false
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
    },
})

export const { setAuthStatus, setSignInState, setSignUpState } = loginSlice.actions
export const loginReducer = loginSlice.reducer