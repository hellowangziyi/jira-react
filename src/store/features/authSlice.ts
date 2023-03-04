import { IUser } from '../../types/user'
import { createSlice } from '@reduxjs/toolkit'
import * as auth from '../../api/auth'
import { IAuthForm } from '../../types/form'
import { AppDispatch, RootState } from '..'
import { bootstrapUser } from '../../context/auth-context'

interface State {
  user: IUser | null
}

const initialState: State = {
  user: null
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

const { setUser } = authSlice.actions
export const authActions = authSlice.actions
export const selectUser = (state: RootState) => state.auth.user

// thunk返回的是一个函数
export const login = (form: IAuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)))

export const register = (form: IAuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)))

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)))

export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)))
