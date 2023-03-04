import React, { createContext, useCallback, useContext, useState } from 'react'
import { ReactNode } from 'react'
import * as auth from '../api/auth'
import { http } from '../api/http'
import { useMount } from '../shared/hooks/use-mount'
import { useDispatch, useSelector } from 'react-redux'

import { IAuthForm, IRegisterForm } from '../types/form'
import { IUser } from '../types/user'
import { useAsync } from '../shared/hooks/use-async'
import { FullLoadingPage } from '../components/common/lib'
import * as authStore from '../store/features/authSlice'

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('/me', { token })
    user = data.user
  }
  return user
}
// const AuthContext = createContext<
//   | {
//       user: IUser | null
//       login: (form: IAuthForm) => Promise<void>
//       register: (form: IRegisterForm) => Promise<void>
//       logout: () => Promise<void>
//     }
//   | undefined
// >(undefined)

// AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    isLoading,
    data: user,
    setData: setUser
  } = useAsync<IUser | null>()

  const dispatch: (...args: any[]) => Promise<IUser> = useDispatch()
  // const { login, logout, register, bootstrap } = useAuth()
  // 验证接口不可用
  useMount(() => {
    run(dispatch(authStore.bootstrap()))
  })

  // const [user, setUser] = useState<IUser | null>(null)
  // const login = (form: IAuthForm) => auth.login(form).then(setUser)
  // const register = (form: IRegisterForm) => auth.register(form).then(setUser)
  // const logout = () => auth.logout().then(() => setUser(null))

  if (isLoading) {
    return <FullLoadingPage></FullLoadingPage>
  }
  return (
    // <AuthContext.Provider
    //   value={{ login, logout, register, user }}
    //   children={children}
    // ></AuthContext.Provider>
    <div>{children}</div>
  )
}

export const useAuth = () => {
  // const context = useContext(AuthContext)
  const dispatch: (...args: any[]) => Promise<IUser> = useDispatch()
  const login = useCallback(
    (form: IAuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  )
  const register = useCallback(
    (form: IAuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  )
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
  const user = useSelector(authStore.selectUser)
  return { login, logout, register, user }
}
