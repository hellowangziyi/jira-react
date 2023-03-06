import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cleanObject } from '..'

export const useQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useMemo(
    () =>
      keys.reduce((pre, key) => {
        return { ...pre, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string }),
    [searchParams]
  )
  const setParams = (params: Partial<{ [key in K]: unknown }>) => {
    const obj = cleanObject({ ...Object.fromEntries(searchParams), ...params })
    return setSearchParams(obj)
  }
  return [params, setParams] as const
}
