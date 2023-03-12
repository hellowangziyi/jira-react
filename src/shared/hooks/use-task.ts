import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { cleanObject } from '..'
import { useHttp } from '../../api/http'
import { useProjectIdinUrl } from '../../screens/kanban/utils'
import { ITask } from '../../types/task'
import { useAddConfig } from './use-optConfig'
import { useQueryParam } from './use-query-param'

export const useTasks = (param?: Partial<ITask>) => {
  const client = useHttp()
  return useQuery(['tasks', param], () =>
    client('/tasks', { data: cleanObject(param || {}) })
  )
}

export const useTasksSearchParams = () => {
  const [param] = useQueryParam(['name', 'typeId', 'epicId', 'processorId'])
  const projectId = useProjectIdinUrl()

  return useMemo(
    () => ({
      projectId,
      name: param.name,
      typeId: Number(param.typeId) || undefined,
      epicId: Number(param.epicId) || undefined,
      processorId: Number(param.processorId) || undefined
    }),
    [param, projectId]
  )
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useAddTasks = () => {
  const client = useHttp()
  const queryKey = useTasksQueryKey()
  return useMutation(
    (params: Partial<ITask>) =>
      client('/tasks', { method: 'POST', data: params }),
    useAddConfig(queryKey)
  )
}
