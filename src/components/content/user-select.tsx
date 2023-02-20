import React from 'react'
import { useUsers } from '../../shared/hooks/use-users'
import { IDSelect } from '../common/id-select'

export const userSelect = (props: React.ComponentProps<typeof IDSelect>) => {
  const { data: users } = useUsers()
  return <IDSelect options={users || []} {...props}></IDSelect>
}
