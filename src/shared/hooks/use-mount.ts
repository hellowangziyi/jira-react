import { useEffect } from 'react'

type IFunction = (...args: any[]) => any
export const useMount = <T extends IFunction = () => void>(callback: T) => {
  useEffect(callback, [])
}
