export interface ITask {
  id: number
  name: string
  processorId: number // 经办人id
  projectId: number
  epicId: number // 任务组id
  kanbanId: number
  typeId: number //任务的类型id
  note: string
}
