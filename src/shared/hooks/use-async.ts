import { useCallback, useState } from 'react'

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
  const [state, setState] = useState<IState<D>>({
    ...defaultState,
    ...initialState
  })
  const setData = (data: D) => {
    setState({
      data,
      stat: 'success',
      error: null
    })
  }
  const setError = (error: Error) => {
    setState({
      data: null,
      stat: 'error',
      error
    })
  }
  const run = useCallback(
    (promise: Promise<D>) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise类型数据')
      }
      setState({ ...state, stat: 'loading' })
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
    ...state
  }
}
