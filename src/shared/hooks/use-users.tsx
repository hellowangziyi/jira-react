import { useEffect } from 'react'
import { cleanObject } from '..'
import { useHttp } from '../../api/http'
import { IUser } from '../../types/user'
import { useAsync } from './use-async'
import { useMount } from './use-mount'

export const useUsers = (param?: Partial<IUser>) => {
  const client = useHttp()
  const { run, ...result } = useAsync()
  useEffect(() => {
    run(client('/users', { data: cleanObject(param || {}) }))
  }, [param])
  return result
}
