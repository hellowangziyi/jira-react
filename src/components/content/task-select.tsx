import React from 'react'
import { useTasks } from '../../shared/hooks/use-task'
import { IDSelect } from '../common/id-select'

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IDSelect>
) => {
  const { data: tasks } = useTasks()
  return <IDSelect options={tasks || []} {...props}></IDSelect>
}
