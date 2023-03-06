import { QueryClient, QueryKey, useQueryClient } from 'react-query'

// 乐观更新
export const useOptConfig = (
  queryKey: QueryKey,
  callBack: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient()
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onMutate: (target: any) => {
      console.log('queryKey', queryKey)
      //保存以前的值 方便回滚
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callBack(target, old)
        // callback
        // return old.map((item: any) =>
        //   item.id === target.id ? { ...item, ...target } : item
        // )
      })
      return { previousItems }
    },
    onError: (error: any, target: any, context: any) => {
      queryClient.setQueryData(queryKey, context?.previousItems)
      console.log('error', error)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useOptConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  )

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
