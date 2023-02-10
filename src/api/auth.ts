import { IAuthForm, IRegisterForm } from '../types/form'
import { IUser } from '../types/user'
import { http } from './http'
const tokenName = 'jira_token'

export const getToken = () => window.localStorage.getItem(tokenName)

export const setToken = ({ user }: { user: IUser }) => {
  console.log('user', user)
  window.localStorage.setItem(tokenName, user.token || '')
  return user
}

export const login = (data: IAuthForm) => {
  return http('/login', { method: 'POST', data }).then(async (res) => {
    // if (res.status === 200) {
    //   return setToken(res.data)
    // } else {
    //   return Promise.reject(data)
    // }
    // console.log('token', res.token)
    if (res) {
      // 暂时伪造一下
      const user = {
        id: 12334566,
        name: 'admin',
        token: res.token
      }
      return setToken({ user })
    } else {
      return Promise.reject(await res.json())
    }
  })
}

export const register = (data: IRegisterForm) => {
  return http('/register', { method: 'POST', data }).then(async (res) => {
    if (res.status === 200) {
      return setToken(res.data)
    } else {
      return Promise.reject(await res.json())
    }
  })
}

export const logout = async () => window.localStorage.removeItem(tokenName)
