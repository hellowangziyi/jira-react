import React from 'react'
import { Button, Input } from 'antd'
import { useState } from 'react'
import { useAddTasks } from '../../shared/hooks/use-task'
import { KanbanItem } from './kanbanCol'
import { useProjectIdinUrl } from './utils'

export const AddTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('')
  const [addModel, setAddModel] = useState(false)
  //   const projectId = useProjectIdinUrl()

  const { mutateAsync: add } = useAddTasks()
  const toggle = () => setAddModel((addModel) => !addModel)
  const submit = async () => {
    await add({ name, kanbanId })
    setName('')
  }
  if (!addModel) {
    // 不在编辑状态
    return <Button onClick={toggle}>+添加任务</Button>
  }
  return (
    <KanbanItem>
      <Input
        placeholder={'想要做些什么...'}
        onChange={(e) => setName(e.target.value)}
        autoFocus={true}
        onBlur={toggle}
        onPressEnter={submit}
      ></Input>
    </KanbanItem>
  )
}
