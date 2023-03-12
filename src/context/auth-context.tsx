import React, { createContext, useContext, useState } from 'react'
import { ReactNode } from 'react'
import * as auth from '../api/auth'
import { http } from '../api/http'
import { useMount } from '../shared/hooks/use-mount'

import { IAuthForm, IRegisterForm } from '../types/form'
import { IUser } from '../types/user'
import { useAsync } from '../shared/hooks/use-async'
import { FullLoadingPage } from '../components/common/lib'
import { useQueryClient } from 'react-query'

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('/me', { token })
    user = data.user
  }
  return user
}
const AuthContext = createContext<
  | {
      user: IUser | null
      login: (form: IAuthForm) => Promise<void>
      register: (form: IRegisterForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    isLoading,
    data: user,
    setData: setUser
  } = useAsync<IUser | null>()
  // 验证接口不可用
  useMount(() => {
    run(bootstrapUser())
  })

  const queryClient = useQueryClient()
  // const [user, setUser] = useState<IUser | null>(null)
  const login = (form: IAuthForm) => auth.login(form).then(setUser)
  const register = (form: IRegisterForm) => auth.register(form).then(setUser)
  const logout = () =>
    auth.logout().then(() => {
      setUser(null)
      queryClient.clear()
    })

  if (isLoading) {
    return <FullLoadingPage></FullLoadingPage>
  }
  return (
    <AuthContext.Provider
      value={{ login, logout, register, user }}
      children={children}
    ></AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }
  return context
}
