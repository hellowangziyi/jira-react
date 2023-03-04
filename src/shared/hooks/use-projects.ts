import { useCallback, useEffect } from 'react'
import { useHttp } from '../../api/http'
import { useAsync } from './use-async'
import { cleanObject } from '..'
import { IProject } from '../../types/project'
import { useQueryParam } from './use-query-param'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { changeConfirmLocale } from 'antd/es/modal/locale'

// export const useProjects = (param?: Partial<IProject>) => {
//   const client = useHttp()
//   const { run, ...result } = useAsync<IProject[]>()
//   const fetchProject = () =>
//     client('/projects', { data: cleanObject(param || {}) })
//   useEffect(() => {
//     // retry 重新刷新页面 需要一个函数
//     run(fetchProject(), { retry: fetchProject })
//   }, [param])

//   return result
// }
export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp()
  return useQuery(['projects', param], () =>
    client('/projects', { data: cleanObject(param || {}) })
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<IProject[]>(
    ['projects', { id }],
    () => client(`/projects/${id}`),
    {
      //当id有值才触发
      enabled: Boolean(id)
    }
  )
}

// export const useEditProject = () => {
//   const { run, ...asyncRes } = useAsync()
//   const client = useHttp()
//   const mutate = (params: Partial<IProject>) => {
//     return run(
//       client(`/projects/${params.id}`, { data: params, method: 'PATCH' })
//     )
//   }
//   return {
//     mutate,
//     ...asyncRes
//   }
// }
export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<IProject>) =>
      client(`/projects/${params.id}`, { data: params, method: 'PATCH' }),
    { onSuccess: () => queryClient.invalidateQueries('projects') }
  )
}
// export const useAddProject = () => {
//   const { run, ...rest } = useAsync()
//   const client = useHttp()
//   const mutate = (params?: Partial<IProject>) => {
//     return run(
//       client(`/projects/${params?.id}`, {
//         data: params,
//         method: 'POST'
//       })
//     )
//   }
//   return {
//     mutate,
//     ...rest
//   }
// }
export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params?: Partial<IProject>) =>
      client(`/projects`, { data: params, method: 'POST' }),
    { onSuccess: () => queryClient.invalidateQueries('projects') }
  )
}

export const useProjectModel = () => {
  const [{ createProject }, setCreateProject] = useQueryParam(['createProject'])
  const [{ editProjectId }, setEditProjectId] = useQueryParam(['editProjectId'])

  const open = useCallback(
    () => setCreateProject({ createProject: true }),
    [setCreateProject]
  )
  const edit = useCallback(
    (id: number) => setEditProjectId({ editProjectId: id }),
    [setEditProjectId]
  )
  const close = useCallback(() => {
    console.log('close')
    setCreateProject({ createProject: undefined })
    console.log(createProject)
    setEditProjectId({ editProjectId: undefined })
  }, [setEditProjectId, setCreateProject])

  const { data: editingProject, isLoading } = useProject(Number(editProjectId))
  return {
    open,
    close,
    edit,
    projectModalOpen: createProject === 'true' || Boolean(editProjectId),
    editingProject,
    isLoading
  }
}
