import { RootState } from 'app/providers/StoreProvider/config/store'

export const signUpSelector = (state: RootState) => state.login.signUpState
export const signInSelector = (state: RootState) => state.login.signInState
export const authStatusSelector = (state: RootState) => state.login.authStatus
export const userSelector = (state: RootState) => state.login.user
export const statusSelector = (state: RootState) => state.login.status
export const statusAuthCheckSelector = (state: RootState) => state.login.authCheckStatus
export const serverErrorsSelector = (state: RootState) => state.login.serverErrors
