import { useCallback, useEffect } from 'react'
import { useHttp } from '../../api/http'
import { useAsync } from './use-async'
import { cleanObject } from '..'
import { IProject } from '../../types/project'
import { useQueryParam, useSetQueryParam } from './use-query-param'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAddConfig, useEditConfig } from './use-optConfig'

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
  return useQuery<IProject, Error>(
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
  // const queryClient = useQueryClient()
  const [searchParams] = useQueryParam(['name', 'personId'])
  const queryKey = ['projects', searchParams]
  return useMutation(
    (params: Partial<IProject>) =>
      client(`/projects/${params.id}`, { data: params, method: 'PATCH' }),
    useEditConfig(queryKey)
    // {
    //   onSuccess: () => queryClient.invalidateQueries('projects'),
    //   onMutate: (target) => {
    //     const prev = queryClient.getQueryData(queryKey)
    //     queryClient.setQueryData(queryKey, (old: any) => {
    //       console.log('old', old)
    //       return old.map((item: any) =>
    //         item.id === target.id ? { ...item, ...target } : item
    //       )
    //     })
    //     return { prev }
    //   },
    //   onError: (error, target, context) => {
    //     //回滚
    //     queryClient.setQueryData(queryKey, context?.prev)
    //     console.log(error)
    //   }
    // }
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
  // const queryClient = useQueryClient()
  const [searchParams] = useQueryParam(['name', 'personId'])
  const queryKey = ['projects', searchParams]
  return useMutation(
    (params?: Partial<IProject>) =>
      client(`/projects`, { data: params, method: 'POST' }),
    useAddConfig(queryKey)
  )
}

export const useProjectModel = () => {
  const [{ createProject }, setCreateProject] = useQueryParam(['createProject'])
  const [{ editProjectId }, setEditProjectId] = useQueryParam(['editProjectId'])
  const setQueryParam = useSetQueryParam()

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
    // setCreateProject({ createProject: undefined })
    // console.log(createProject)
    // setEditProjectId({ editProjectId: undefined })
    setQueryParam({ createProject: '', editProjectId: '' })
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
