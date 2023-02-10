import { useEffect } from 'react'
import { useHttp } from '../../api/http'
import { useAsync } from './use-async'
import { cleanObject } from '..'
import { IProject } from '../../types/project'

export const usePorjects = (param?: Partial<IProject>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<IProject[]>()
  useEffect(() => {
    run(client('/projects', { data: cleanObject(param || {}) }))
  }, [param])

  return result
}
