import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { cleanObject } from '..'
import { useHttp } from '../../api/http'
import { useProjectIdinUrl } from '../../screens/kanban/utils'
import { IKanban } from '../../types/kanban'
import { useAddConfig } from './use-optConfig'
import { useQueryParam } from './use-query-param'

export const useKanBans = (params?: Partial<IKanban>) => {
  const client = useHttp()
  return useQuery(['kanbans', params], () =>
    client('/kanbans', {
      data: cleanObject(params || {})
    })
  )
}

export const useKanbanSearchParams = () => ({ projectId: useProjectIdinUrl() })

export const useKanbanQueryKey = () => ['kanbans']

export const useAddKanban = () => {
  const client = useHttp()
  const queryKey = useKanbanQueryKey()
  return useMutation(
    (params?: Partial<IKanban>) =>
      client('/kanbans', { method: 'POST', data: params }),
    useAddConfig(queryKey)
  )
}
