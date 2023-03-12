import { Button, Input } from 'antd'
import React from 'react'
import { IDSelect } from '../../components/common/id-select'
import { Row } from '../../components/common/lib'
import { TaskTypeSelect } from '../../components/content/task-select'
import { useSetQueryParam } from '../../shared/hooks/use-query-param'
import { useTasksSearchParams } from '../../shared/hooks/use-task'

export const KanbanSearch = () => {
  const { processorId, projectId, typeId, name, epicId } =
    useTasksSearchParams()
  const setQueryParam = useSetQueryParam()
  const reset = () => {
    setQueryParam({
      processorId: undefined,
      projectId: undefined,
      typeId: undefined,
      name: undefined,
      epicId: undefined
    })
  }

  return (
    <Row gap={true} marginBottom={2}>
      <Input
        value={name}
        placeholder={'任务名'}
        style={{ width: '20rem' }}
        onChange={(evt) => setQueryParam({ name: evt.target.value })}
      ></Input>
      <TaskTypeSelect
        value={typeId}
        defaultOptionName="任务状态"
        onChange={(id) => setQueryParam({ typeId: id })}
      ></TaskTypeSelect>
      <IDSelect value={projectId} defaultOptionName="任务组"></IDSelect>
      <IDSelect value={processorId} defaultOptionName="经办人"></IDSelect>
      <Button onClick={reset}>重置</Button>
    </Row>
  )
}
