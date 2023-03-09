import { Query, QueryKey, useMutation, useQueryClient } from 'react-query'
import { useQueryParam } from './use-query-param'

export const useOptConfig = (
  queryKey: QueryKey,
  cb: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient()
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onMutate: (target: any) => {
      const prev = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        console.log('old', old)
        return cb(target, old)
        // old.map((item: any) =>
        //   item.id === target.id ? { ...item, ...target } : item
        // )
      })
      return { prev }
    },
    onError: (error: Error, target: any, context: any) => {
      //回滚
      queryClient.setQueryData(queryKey, context?.prev)
      console.log(error)
    }
  }
}

export const useEditConfig = (queryKey: QueryKey) =>
  useOptConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  )

export const useAddConfig = (queryKey: QueryKey) =>
  useOptConfig(queryKey, (target, old) => (old ? [...old, target] : []))

export const useDeleteConfig = (queryKey: QueryKey) =>
  useOptConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  )
