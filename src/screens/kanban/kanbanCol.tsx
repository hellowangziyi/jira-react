import styled from '@emotion/styled'
import React from 'react'
import { useTasks, useTasksSearchParams } from '../../shared/hooks/use-task'
import { IKanban } from '../../types/kanban'
import { ITask } from '../../types/task'
import bug from '../../assets/bug.svg'
import task from '../../assets/task.svg'
import { AddTask } from './addTask'

export const KanbanCol = ({ kanban }: { kanban: IKanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter((item: ITask) => item.kanbanId === kanban.id)
  return (
    <KanbanColContainer>
      <h3>{kanban.name}</h3>
      {tasks?.map((task: ITask) => {
        return (
          <KanbanItem key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.id}></TaskTypeIcon>
          </KanbanItem>
        )
      })}
      <AddTask kanbanId={kanban.id}></AddTask>
    </KanbanColContainer>
  )
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const types = [
    { id: 1, name: 'bug' },
    { id: 2, name: 'task' }
  ]
  const icon = types.find((item) => item.id === id)?.name
  return <img src={icon === 'bug' ? bug : task} style={{ width: '16px' }}></img>
}

export const KanbanColContainer = styled.div`
  width: calc(100% / 4);
  display: flex;
  flex-direction: column;
  background-color: #f4f5f7;
  border-radius: 4px;
  padding: 12px;
  margin-right: 24px;
`
export const KanbanItem = styled.div`
  height: 100px;
  width: 100%;
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 10px;

  overflow: scroll;
  /* flex: 1; */
  ::-webkit-scrollbar {
    display: none;
  }
`
