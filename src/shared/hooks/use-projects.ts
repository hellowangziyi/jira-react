import { useEffect } from 'react'
import { useHttp } from '../../api/http'
import { useAsync } from './use-async'
import { cleanObject } from '..'
import { IProject } from '../../types/project'
import { useQueryParam } from './use-query-param'

export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<IProject[]>()
  const fetchProject = () =>
    client('/projects', { data: cleanObject(param || {}) })
  useEffect(() => {
    // retry 重新刷新页面 需要一个函数
    run(fetchProject(), { retry: fetchProject })
  }, [param])

  return result
}

export const useEditProject = () => {
  const { run, ...asyncRes } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<IProject>) => {
    return run(
      client(`/projects/${params.id}`, { data: params, method: 'PATCH' })
    )
  }
  return {
    mutate,
    ...asyncRes
  }
}

export const useAddProject = () => {
  const { run, ...rest } = useAsync()
  const client = useHttp()
  const mutate = (params?: Partial<IProject>) => {
    return run(
      client(`/projects/${params?.id}`, {
        data: params,
        method: 'POST'
      })
    )
  }
  return {
    mutate,
    ...rest
  }
}

export const useProjectModel = () => {
  const [{ creatProject }, setCreatProject] = useQueryParam(['creatProject'])

  const open = () => setCreatProject({ creatProject: true })
  const close = () => setCreatProject({ creatProject: undefined })

  return {
    open,
    close,
    projectModalOpen: creatProject === 'true'
  }
}
