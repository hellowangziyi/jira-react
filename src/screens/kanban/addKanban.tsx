import { Button, Input } from 'antd'
import { useAddKanban } from '../../shared/hooks/use-kanban'
import { KanbanColContainer } from './kanbanCol'

export const AddKanban = () => {
  const { mutateAsync: addKanbanMutate } = useAddKanban()
  const add = (val) => {
    console.log(val)
    addKanbanMutate(val)
  }
  return (
    <KanbanColContainer>
      <Input
        placeholder="创建看板"
        onPressEnter={(evt) => {
          add({ name: evt.target.value })
          evt.target.value = ''
        }}
      ></Input>
    </KanbanColContainer>
  )
}
