import qs from 'qs'
import * as auth from './auth'

const BASE_URL = import.meta.env.VITE_APP_API_URL
// const BASE_URL = 'http://localhost:3001'
const HTTP_AUTHENTICATION = 401

export interface Config extends RequestInit {
  data?: object
  token?: string
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config: RequestInit = {
    method: 'GET',
    headers: {
      Authorizationa: token ? `Bear ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
      ...headers
    },
    ...customConfig
  }
  if (config.method?.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  console.log('BASE', BASE_URL)
  return window
    .fetch(`${BASE_URL}${endpoint}`, config)
    .then(async (response) => {
      if (response.status === HTTP_AUTHENTICATION) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({ message: 'Please login again.' })
      }
      const data = await response.json()
      return response.ok ? data : Promise.reject(data)
    })
}
