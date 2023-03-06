import { useCallback, useReducer, useState } from 'react'
import { useMountedRef } from './use-mountedRef'

interface IState<D> {
  error: null | Error
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}
interface IConfig {
  throwError?: boolean
}

const defaultState: IState<null> = {
  error: null,
  data: null,
  stat: 'idle'
}

const defaultConfig: IConfig = {
  throwError: true
}

export const useAsync = <D>(initialState?: IState<D>, config?: IConfig) => {
  // const [state, setState] = useState<IState<D>>({
  //   ...defaultState,
  //   ...initialState
  // })
  const [state, dispatch] = useReducer(
    (state: IState<D>, action: Partial<IState<D>>) => ({ ...state, ...action }),
    { ...defaultState, ...initialState }
  )
  const [retry, setRetry] = useState(() => () => {})

  const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback(
      (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
      [mountedRef, dispatch]
    )
  }
  const safeDispatch = useSafeDispatch(dispatch)

  const setData = useCallback(
    (data: D) => {
      safeDispatch({ data, stat: 'success', error: null })
    },
    [safeDispatch]
  )
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        data: null,
        stat: 'error',
        error
      }),
    [safeDispatch]
  )

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise类型数据')
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          // runConfig也要重新传入，不然只会生效一次
          run(runConfig?.retry(), runConfig)
        }
      })
      safeDispatch({ stat: 'loading' })
      return promise
        .then((data) => {
          setData(data)
          return data
        })
        .catch((error) => {
          setError(error)
          return Promise.reject(error)
        })
    },
    [setData]
  )

  return {
    setData,
    setError,
    run,
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    isIdle: state.stat === 'idle',
    retry,
    ...state
  }
}
